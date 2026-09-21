# ECHO PATH — Visitor App (`/mobile-app`)

Mobile-first web app for the ECHO PATH visitor experience. Institutions publish
accessibility information about a physical space; visitors pick an accessibility
profile and receive a personalized, manually-advanced navigation simulation of
the same space.

This is **Developer 1**'s component. It owns only `/mobile-app` and does not
touch `/backend`, `/admin-dashboard`, or the repository root `README.md`.

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

## User flow

1. **Landing** — ECHO PATH branding with `Visitor` / `Institution` roles.
   Visitor continues.
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
