#!/usr/bin/env bash
# Idempotent dependency setup for the echo-path monorepo.
# Safe to run repeatedly; each component is only set up when its manifest exists.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# --- backend (FastAPI / Python) ---
if [ -f "$repo_root/backend/requirements.txt" ]; then
  echo "[install] Setting up backend Python environment"

  # The default base image may ship Python without the venv/ensurepip module.
  # Install it on demand so `python3 -m venv` works on a fresh VM.
  if ! python3 -c "import ensurepip" >/dev/null 2>&1; then
    echo "[install] python3 venv support missing; installing it"
    pyver="$(python3 -c 'import sys; print(f"{sys.version_info[0]}.{sys.version_info[1]}")')"
    sudo apt-get update -y
    sudo apt-get install -y "python${pyver}-venv" || sudo apt-get install -y python3-venv
  fi

  cd "$repo_root/backend"
  python3 -m venv venv
  ./venv/bin/python -m pip install --upgrade pip
  ./venv/bin/pip install -r requirements.txt
fi

# --- mobile-app (added when a Node/Expo app lands) ---
if [ -f "$repo_root/mobile-app/package.json" ]; then
  echo "[install] Installing mobile-app dependencies"
  cd "$repo_root/mobile-app"
  if [ -f package-lock.json ]; then npm ci; else npm install; fi
fi

echo "[install] Done"
