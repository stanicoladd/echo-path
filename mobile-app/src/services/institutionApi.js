// Read-only data service for the Institution portal.
//
// Mock-first so the unified demo works with no backend. The shape matches the
// planned FastAPI endpoints, so integration later needs no UI changes:
//   GET /api/institutions/maastricht-university
//   GET /api/spaces/aula

import { AULA_SPACE, INSTITUTION } from '../data/mockInstitution.js';

const USE_BACKEND = false;

function resolve(value, source = 'mock') {
  const clone =
    typeof structuredClone === 'function'
      ? structuredClone(value)
      : JSON.parse(JSON.stringify(value));
  return Promise.resolve({ data: clone, source });
}

export async function fetchInstitutionOrg() {
  if (USE_BACKEND) {
    // Future: return { data: await (await fetch(`${API}/api/institutions/maastricht-university`)).json(), source: 'live' };
  }
  return resolve(INSTITUTION);
}

export async function fetchAulaSpace() {
  if (USE_BACKEND) {
    // Future: return { data: await (await fetch(`${API}/api/spaces/aula`)).json(), source: 'live' };
  }
  return resolve(AULA_SPACE);
}
