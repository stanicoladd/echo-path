# ECHO PATH Institution Portal

React/Vite dashboard for managing Maastricht University SBE Aula accessibility
infrastructure.

## Start

```bash
cd admin-dashboard
cp .env.example .env
npm install
npm run dev
```

The dashboard expects the API at `http://localhost:8000` by default. Override it
with:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

When the API is unavailable, the header displays `Demo data` and all changes
remain local to the current browser session.

## Current backend compatibility

The dashboard keeps the frozen six-field infrastructure model in its UI. The
current backend does not store `name`, adds `confirmed`, and requires a
non-empty `location`; `src/services/api.js` contains that temporary adapter.
Names added during a live session are therefore not available to other clients
or after a browser refresh until the backend contract is aligned.

## Checks

```bash
npm run lint
npm run build
```
