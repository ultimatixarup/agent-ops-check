<!-- Excerpt from microsoft/ai-agents-for-beginners @ 92d833e, .agents/skills/azure-openai-to-responses/references/cheat-sheet.md (MIT). Used as a false-positive regression fixture. -->
## Tool use

- Define functions in `tools` with the **flat Responses API format** — `name`, `description`, and `parameters` at the top level (not nested under `function`).
- When the model asks to call a tool, execute it in your app and include the tool result in the next request as a `function_call_output` item within `input`.
- Keep schemas minimal; validate inputs before execution.
- When using `strict: true`, all properties must be listed in `required` and `additionalProperties: false` is mandatory.

> **⚠️ `pydantic_function_tool()` is incompatible**: The `openai.pydantic_function_tool()` helper still generates the old Chat Completions nested format (`{"type": "function", "function": {"name": ...}}`). Do not use it with `responses.create()`. Define tool schemas manually or write a wrapper to flatten the output.

### Tool definition format

The Responses API uses a **flat** tool format — `name`, `description`, `parameters` are top-level keys (not nested under `function`).

**Before (Chat Completions — nested):**
```python
tools = [{"type": "function", "function": {"name": "lookup_weather", "parameters": {...}}}]
```

**After (Responses API — flat):**
```python
tools = [{"type": "function", "name": "lookup_weather", "parameters": {...}}]
