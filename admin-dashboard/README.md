# ECHO PATH — Institution Portal (`/admin-dashboard`)

The institution/admin side of ECHO PATH: a polished, demo-ready B2B SaaS
dashboard where an institution reviews the accessibility mapping of its spaces.
This is **Developer 2**'s component and is isolated from `/mobile-app` and
`/backend`.

## Stack

- React 19 + Vite (JavaScript)
- No routing/state libraries — single-page dashboard with local state only.

## Run

```bash
cd admin-dashboard
npm install      # first time only
npm run dev      # http://localhost:5173  (use --port to change)
```

## Build & lint

```bash
npm run build
npm run lint
npm run preview
```

## What it shows

- **ECHO PATH — Institution Portal** with **Maastricht University** as the
  current institution.
- All six faculties: FASoS, FHML, LAW, FPN, FSE (Not mapped) and **SBE**
  (Active / Mapped).
- SBE is expandable → reveals the **Aula** space (Status: `3D Mapped`,
  Accessibility Mapping: `Active`).
- **Infrastructure** cards: Main Aula Entrance (entrance, accessible), Main Aula
  Stairs (stairs, barrier), Aula Emergency Exit (emergency_exit, accessible),
  Aula Accessible Route (ramp, accessible).
- Prominent **Scan New Space** and **+ Add Infrastructure** actions (demo-only).
- A **3D Mapping** section for the Aula with a preview placeholder and a
  **3D Map Available** indicator, ready for the real scan screenshot/video.

## Data source (read-only, with fallback)

`src/services/api.js` first tries the FastAPI backend, then falls back to bundled
mock data so the demo always works with no backend running:

```
GET /api/institutions/maastricht-university
GET /api/spaces/aula
```

Point it at a running backend with a Vite env var:

```bash
VITE_API_BASE=http://localhost:8000 npm run dev
```

A badge in the top bar shows whether data is **Live API** or **Demo data**.
This dashboard performs read-only calls only and never writes to the backend.
