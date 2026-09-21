# ECHO PATH — Unified Mobile App (`/mobile-app`)

One mobile-first web app for the whole ECHO PATH experience. From the landing
screen you pick a role:

- **Visitor** — pick an accessibility profile and receive a personalized,
  manually-advanced navigation simulation of a space (the SBE Aula).
- **Institution** — an Institution Portal where Maastricht University reviews
  its faculties, the mapped Aula space, its accessibility infrastructure, and a
  3D mapping preview.

Both sides live in this single app and share the same visual language. It does
not touch `/backend` or the repository root `README.md`.

## Stack

- React 19 + Vite (JavaScript)
- No routing/state libraries — a tiny hash router and `localStorage` keep the
  dependency footprint minimal.

## Run

```bash
cd mobile-app
npm install      # first time only
npm run dev      # start the dev server (http://localhost:5173)
```

Open the printed URL. The app is fully usable with **no backend** — all data is
mock data (`src/data/mockSbe.js`).

## Build & lint

```bash
npm run build    # production build into dist/
npm run lint     # oxlint
npm run preview  # serve the production build locally
```

## Visitor flow

1. **Landing** — ECHO PATH branding with `Visitor` / `Institution` roles.
2. **Profile** — choose one of exactly three profiles (saved to `localStorage`):
   Visual Impairment, Deaf / Hard of Hearing, Wheelchair / Reduced Mobility.
3. **Institutions** — Maastricht University SBE is *Echo Path Enabled*; UMC+,
   City Hall and Library are disabled *Coming Soon* examples.
4. **SBE detail** — Aula accessibility summary (entrances, elevator, accessible
   toilet, stairs, emergency exit, …) + `Start Accessible Mode`.
5. **Accessible Mode** — the Aula walk as a manual `Previous` / `Next`
   simulation. The **same** Aula data produces different guidance per profile;
   switch profiles in-screen to compare. Visual-impairment steps offer optional
   browser text-to-speech (`Speak`), which is hidden when unsupported.

> The walking guidance is an explicit simulation, not real indoor positioning.

## Institution flow

1. **Landing** → **Institution**.
2. **Institution Portal** (`#/portal`) — Maastricht University overview, summary
   stats, and the six faculties (FASoS, FHML, LAW, FPN, FSE = *Not mapped*;
   **SBE** = *Active / Mapped*). A badge shows whether data is *Live API* or
   *Demo data*.
3. **Aula space** (`#/portal/aula`) — tap SBE to open the Aula: status badges
   (`3D Mapped`, `Accessibility Mapping: Active`), demo-only `Scan New Space`
   and `Add Infrastructure` actions, the four infrastructure cards (entrance,
   stairs = barrier, emergency exit, ramp), and a **3D Mapping** preview with a
   *3D Map Available* indicator.

The Institution Portal reads data from `src/services/institutionApi.js`, which
is mock-first (same shape as `GET /api/institutions/maastricht-university` and
`GET /api/spaces/aula`) so the demo works with no backend.

## Backend integration (not enabled yet)

`src/services/api.js` is mock-first with a `USE_BACKEND` flag. When the backend
is ready, implement the `fetch` branches; the mock branch remains as a fallback
so the demo never breaks. Expected endpoints:

```
GET /api/institutions
GET /api/institutions/um-sbe
GET /api/spaces/aula
GET /api/guidance/aula?profile=<visual_impairment|deaf_hard_of_hearing|reduced_mobility>
```

## Shared data contract

The mock data follows the frozen `institution -> spaces -> infrastructure`
shape (fields: `id`, `type`, `accessible`, `location`, `notes`). Profile IDs are
`visual_impairment`, `deaf_hard_of_hearing`, `reduced_mobility`.
