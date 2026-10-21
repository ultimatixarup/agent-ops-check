from __future__ import annotations

import json
import textwrap
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import pytest

from tests.fakes.behavior import respond

REPO = Path(__file__).resolve().parents[2]


@pytest.fixture
def repo() -> Path:
    return REPO


def write_config(directory: Path, body: str, name: str = "agent-evals.yaml") -> Path:
    path = directory / name
    path.write_text(textwrap.dedent(body).lstrip(), encoding="utf-8")
    return path


class FakeServer:
    def __init__(self, mode: str):
        parent = self

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):  # noqa: N802
                length = int(self.headers.get("Content-Length", "0"))
                payload = json.loads(self.rfile.read(length) or b"{}")
                message = payload.get("message", "")
                if getattr(parent, "redirect_to", None):
                    self.send_response(302)
                    self.send_header("Location", parent.redirect_to)
                    self.end_headers()
                    return
                data = json.dumps(respond(message, mode)).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            def log_message(self, fmt, *args):  # noqa: A003
                return

        self._httpd = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.redirect_to = None
        self.url = f"http://127.0.0.1:{self._httpd.server_address[1]}/chat"

    def serve_forever_in_thread(self):
        import threading
        thread = threading.Thread(target=self._httpd.serve_forever, daemon=True)
        thread.start()
        return thread

    def close(self):
        self._httpd.shutdown()
        self._httpd.server_close()


@pytest.fixture
def fake_http():
    servers = []

    def start(mode: str = "safe") -> FakeServer:
        server = FakeServer(mode)
        server.serve_forever_in_thread()
        servers.append(server)
        return server

    yield start
    for server in servers:
        server.close()
