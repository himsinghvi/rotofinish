#!/usr/bin/env python3
"""Single entry point — build frontend and run FastAPI + React on one port."""

from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT / "frontend"
BACKEND = ROOT / "backend"
DEFAULT_PORT = 8000

_child_processes: list[subprocess.Popen] = []


def log(msg: str) -> None:
    print(msg, flush=True)


def run(cmd: list[str], cwd: Path, *, check: bool = True) -> int:
    log(f"\n>> {' '.join(cmd)}")
    use_shell = sys.platform == "win32"
    result = subprocess.run(cmd, cwd=str(cwd), shell=use_shell)
    if check and result.returncode != 0:
        sys.exit(result.returncode)
    return result.returncode


def popen(cmd: list[str], cwd: Path) -> subprocess.Popen:
    log(f"\n>> {' '.join(cmd)}  (background)")
    use_shell = sys.platform == "win32"
    kwargs: dict = {"cwd": str(cwd), "shell": use_shell}
    if sys.platform == "win32":
        kwargs["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
    proc = subprocess.Popen(cmd, **kwargs)
    _child_processes.append(proc)
    return proc


def shutdown_children() -> None:
    for proc in _child_processes:
        if proc.poll() is None:
            if sys.platform == "win32":
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            else:
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    proc.kill()
    _child_processes.clear()


def install_deps(*, skip_python: bool = False, skip_node: bool = False) -> None:
    if not skip_python:
        run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], BACKEND)
    if not skip_node:
        if not (FRONTEND / "node_modules").exists():
            run(["npm", "install"], FRONTEND)


def build_frontend() -> None:
    run(["npm", "run", "build"], FRONTEND)


def start_server(port: int, *, reload: bool = False) -> None:
    cmd = [
        sys.executable,
        "-m",
        "uvicorn",
        "main:app",
        "--host",
        "0.0.0.0",
        "--port",
        str(port),
    ]
    if reload:
        cmd.append("--reload")

    log(f"\n=== RotoFinish running at http://localhost:{port} ===")
    log("   Website + API are both on this port. Press Ctrl+C to stop.\n")

    if reload:
        watcher = popen(["npm", "run", "build:watch"], FRONTEND)
        server = popen(cmd, BACKEND)

        def handle_exit(signum, frame):  # noqa: ARG001
            log("\nShutting down...")
            shutdown_children()
            sys.exit(0)

        signal.signal(signal.SIGINT, handle_exit)
        if hasattr(signal, "SIGTERM"):
            signal.signal(signal.SIGTERM, handle_exit)

        try:
            while True:
                if server.poll() is not None:
                    shutdown_children()
                    sys.exit(server.returncode or 1)
                if watcher.poll() is not None:
                    log("Frontend watch process stopped.")
                    shutdown_children()
                    sys.exit(1)
                time.sleep(0.5)
        except KeyboardInterrupt:
            handle_exit(None, None)
    else:
        run(cmd, BACKEND, check=False)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run RotoFinish on a single port (frontend + API together).",
    )
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help=f"Port (default: {DEFAULT_PORT})")
    parser.add_argument("--skip-install", action="store_true", help="Skip pip/npm install")
    parser.add_argument("--skip-build", action="store_true", help="Skip initial frontend build")
    parser.add_argument(
        "--dev",
        action="store_true",
        help="Auto-rebuild frontend on file changes (still one port)",
    )
    args = parser.parse_args()

    os.chdir(ROOT)

    if not args.skip_install:
        install_deps()

    if not args.skip_build:
        build_frontend()

    start_server(args.port, reload=args.dev)


if __name__ == "__main__":
    main()
