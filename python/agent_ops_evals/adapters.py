"""How a case prompt reaches the agent. One target per run. No other hosts."""

from __future__ import annotations

import asyncio
import importlib
import inspect
import json
import subprocess
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Any

from pydantic import BaseModel, Field

from agent_ops_evals.config import (
    CliTarget,
    EvalConfig,
    HttpTarget,
    PydanticAiTarget,
    PythonTarget,
    render_template,
)
from agent_ops_evals.errors import ConfigError
from agent_ops_evals.jsonpath import lookup


class ToolCall(BaseModel):
    name: str
    arguments: Any = None


class AgentOutput(BaseModel):
    reply: str
    tool_calls: list[ToolCall] = Field(default_factory=list)


class _RejectRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        raise RuntimeError(f"refusing to follow a redirect from the agent to {newurl}")


def build_adapter(config: EvalConfig) -> "Adapter":
    target = config.target
    if isinstance(target, HttpTarget):
        return HttpAdapter(target)
    if isinstance(target, CliTarget):
        return CliAdapter(target)
    if isinstance(target, PythonTarget):
        return PythonAdapter(target, require_agent=False)
    if isinstance(target, PydanticAiTarget):
        return PythonAdapter(target, require_agent=True)
    raise ConfigError(f"unsupported target type {target.type!r}")


class Adapter:
    """Live calls only. Dry-run never constructs a network or process call through run()."""

    description: str

    async def run(self, prompt: str) -> AgentOutput:
        raise NotImplementedError


@dataclass
class HttpAdapter(Adapter):
    target: HttpTarget

    def __post_init__(self) -> None:
        self.description = f"http {self.target.url}"

    async def run(self, prompt: str) -> AgentOutput:
        return await asyncio.wait_for(asyncio.to_thread(self._once, prompt), self.target.timeout_s + 1)

    def _once(self, prompt: str) -> AgentOutput:
        variables = {"input": prompt, "text": prompt}
        body = render_template(self.target.request, variables)
        data = json.dumps(body).encode("utf-8")
        headers = {"Content-Type": "application/json", "Accept": "application/json", **self.target.headers}
        request = urllib.request.Request(self.target.url, data=data, method=self.target.method, headers=headers)
        opener = urllib.request.build_opener(_RejectRedirect)
        try:
            with opener.open(request, timeout=self.target.timeout_s) as response:
                raw = response.read(1_000_001)
        except RuntimeError:
            raise
        except urllib.error.HTTPError as exc:
            detail = exc.read(500).decode("utf-8", "replace")
            raise RuntimeError(f"agent returned HTTP {exc.code}: {detail}") from exc
        except urllib.error.URLError as exc:
            raise RuntimeError(f"could not reach the agent at {self.target.url}: {exc.reason}") from exc
        if len(raw) > 1_000_000:
            raise RuntimeError("agent response is larger than 1 MB; refusing to score it")
        text = raw.decode("utf-8", "replace")
        try:
            payload = json.loads(text)
        except json.JSONDecodeError:
            if self.target.response_path not in ("$.reply", "$"):
                raise RuntimeError(
                    f"agent response is not JSON, so response_path {self.target.response_path} cannot be read"
                ) from None
            return AgentOutput(reply=text)
        reply, found = lookup(payload, self.target.response_path)
        if not found:
            raise RuntimeError(f"response_path {self.target.response_path} was not in the agent response")
        if not isinstance(reply, str):
            reply = json.dumps(reply, ensure_ascii=False)
        tools: list[ToolCall] = []
        if self.target.tool_calls_path:
            raw_tools, tools_found = lookup(payload, self.target.tool_calls_path)
            if not tools_found:
                raise RuntimeError(f"tool_calls_path {self.target.tool_calls_path} was not in the agent response")
            tools = normalize_tools(raw_tools)
        return AgentOutput(reply=reply, tool_calls=tools)


@dataclass
class CliAdapter(Adapter):
    target: CliTarget

    def __post_init__(self) -> None:
        shown = " ".join(self.target.command)
        self.description = f"cli {shown}"

    async def run(self, prompt: str) -> AgentOutput:
        return await asyncio.wait_for(asyncio.to_thread(self._once, prompt), self.target.timeout_s + 1)

    def _once(self, prompt: str) -> AgentOutput:
        variables = {"input": prompt, "text": prompt}
        command = [str(render_template(part, variables)) for part in self.target.command]
        try:
            completed = subprocess.run(
                command,
                capture_output=True,
                timeout=self.target.timeout_s,
                cwd=self.target.cwd,
                check=False,
            )
        except subprocess.TimeoutExpired as exc:
            raise RuntimeError(f"cli agent timed out after {self.target.timeout_s}s") from exc
        except OSError as exc:
            raise RuntimeError(f"could not start the cli agent ({command[0]}): {exc}") from exc
        if completed.returncode != 0:
            err = completed.stderr.decode("utf-8", "replace")[:500]
            raise RuntimeError(f"cli agent exited {completed.returncode}: {err}")
        stdout = completed.stdout.decode("utf-8", "replace")
        return parse_stdio(stdout)


@dataclass
class PythonAdapter(Adapter):
    target: PythonTarget | PydanticAiTarget
    require_agent: bool

    def __post_init__(self) -> None:
        kind = "pydantic_ai" if self.require_agent else "python"
        self.description = f"{kind} {self.target.callable}"
        self._obj: Any = None

    def load(self) -> None:
        """Import the callable. Dry-run does not call this."""
        if self._obj is not None:
            return
        module_name, attr_path = self.target.callable.split(":", 1)
        try:
            module = importlib.import_module(module_name)
        except ImportError as exc:
            raise ConfigError(
                f"could not import {module_name!r} ({exc}). It must be on PYTHONPATH when you pass --live."
            ) from exc
        obj: Any = module
        for part in attr_path.split("."):
            if not hasattr(obj, part):
                raise ConfigError(f"{self.target.callable!r} has no attribute {part!r} on {type(obj).__name__}.")
            obj = getattr(obj, part)
        if self.require_agent and not _is_pydantic_ai_agent(obj):
            raise ConfigError(
                f"{self.target.callable!r} is not a pydantic_ai.Agent. "
                "Point target.callable at an Agent instance, or use type: python for a plain function."
            )
        self._obj = obj

    async def run(self, prompt: str) -> AgentOutput:
        self.load()
        obj = self._obj
        if _is_pydantic_ai_agent(obj):
            return await _run_pydantic_ai(obj, prompt, self.target.timeout_s)
        if inspect.iscoroutinefunction(obj):
            result = await asyncio.wait_for(obj(prompt), self.target.timeout_s)
            return coerce_output(result)
        result = await asyncio.wait_for(asyncio.to_thread(obj, prompt), self.target.timeout_s + 1)
        return coerce_output(result)


def target_description(config: EvalConfig) -> str:
    target = config.target
    if isinstance(target, HttpTarget):
        return f"http {target.url}"
    if isinstance(target, CliTarget):
        return "cli " + " ".join(target.command)
    return f"{target.type} {target.callable}"


def _is_pydantic_ai_agent(obj: Any) -> bool:
    try:
        from pydantic_ai import Agent
    except ImportError:
        return False
    return isinstance(obj, Agent)


async def _run_pydantic_ai(agent: Any, prompt: str, timeout_s: float) -> AgentOutput:
    try:
        result = await asyncio.wait_for(agent.run(prompt), timeout_s)
    except TimeoutError as exc:
        raise RuntimeError(f"pydantic_ai agent timed out after {timeout_s}s") from exc
    output = result.output
    reply = output if isinstance(output, str) else str(output)
    messages = result.all_messages() if hasattr(result, "all_messages") else []
    return AgentOutput(reply=reply, tool_calls=tool_calls_from_messages(messages))


def tool_calls_from_messages(messages: Any) -> list[ToolCall]:
    found: list[ToolCall] = []
    for message in messages or []:
        for part in getattr(message, "parts", ()) or ():
            kind = getattr(part, "part_kind", None)
            if kind != "tool-call" and type(part).__name__ != "ToolCallPart":
                continue
            args = getattr(part, "args", None)
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except json.JSONDecodeError:
                    pass
            name = getattr(part, "tool_name", None)
            if isinstance(name, str) and name:
                found.append(ToolCall(name=name, arguments=args))
    return found


def coerce_output(result: Any) -> AgentOutput:
    if isinstance(result, AgentOutput):
        return result
    if isinstance(result, str):
        return AgentOutput(reply=result)
    if isinstance(result, tuple) and len(result) == 2:
        reply, tools = result
        return AgentOutput(reply=str(reply), tool_calls=normalize_tools(tools))
    if isinstance(result, dict):
        reply = result.get("reply", result.get("output", result.get("message", "")))
        return AgentOutput(reply="" if reply is None else str(reply), tool_calls=normalize_tools(result.get("tool_calls", [])))
    if hasattr(result, "output") and hasattr(result, "all_messages"):
        output = result.output
        reply = output if isinstance(output, str) else str(output)
        return AgentOutput(reply=reply, tool_calls=tool_calls_from_messages(result.all_messages()))
    raise RuntimeError(
        f"agent returned {type(result).__name__}. Return a string, a dict with 'reply' and optional 'tool_calls', or (reply, tool_calls)."
    )


def parse_stdio(stdout: str) -> AgentOutput:
    stripped = stdout.strip()
    if stripped.startswith("{"):
        try:
            payload = json.loads(stripped)
        except json.JSONDecodeError:
            payload = None
        if isinstance(payload, dict) and any(key in payload for key in ("reply", "output", "message", "tool_calls")):
            return coerce_output(payload)
    return AgentOutput(reply=stdout)


def normalize_tools(tools: Any) -> list[ToolCall]:
    if tools is None:
        return []
    if isinstance(tools, str):
        if not tools.strip():
            return []
        return [ToolCall(name=tools.strip())]
    if not isinstance(tools, list):
        raise RuntimeError("tool_calls must be a list of names or objects")
    out: list[ToolCall] = []
    for item in tools:
        if isinstance(item, str):
            out.append(ToolCall(name=item))
            continue
        if isinstance(item, ToolCall):
            out.append(item)
            continue
        if not isinstance(item, dict):
            raise RuntimeError(f"tool call must be a string or object (got {type(item).__name__})")
        if isinstance(item.get("function"), dict):
            name = item["function"].get("name")
            args = item["function"].get("arguments")
        else:
            name = item.get("name", item.get("tool"))
            if isinstance(name, dict):
                name = name.get("name")
            args = item.get("arguments", item.get("args", item.get("input")))
        if not isinstance(name, str) or not name.strip():
            raise RuntimeError(f"tool call is missing a name: {item!r}")
        if isinstance(args, str):
            try:
                args = json.loads(args)
            except json.JSONDecodeError:
                pass
        out.append(ToolCall(name=name.strip(), arguments=args))
    return out
