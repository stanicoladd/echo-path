// Read-only data service for the Institution Portal.
//
// Tries the ECHO PATH FastAPI backend first, then falls back to bundled mock
// data so the demo always works even with no backend running. The fallback is
// intentional: a reliable demo matters more than live integration here.
//
// Endpoints (read-only):
//   GET /api/institutions/maastricht-university
//   GET /api/spaces/aula

import { AULA_SPACE, INSTITUTION } from '../data/mockInstitution.js';

// Configurable via Vite env (VITE_API_BASE); defaults to a local FastAPI dev
// server. Set to an empty string to skip the network entirely.
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';
const TIMEOUT_MS = 1500;

async function tryFetch(path) {
  if (!API_BASE) {
    return null;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    // Network error, CORS, timeout, or backend down — fall back to mock.
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchInstitution() {
  const live = await tryFetch('/api/institutions/maastricht-university');
  if (live) {
    return { data: live, source: 'live' };
  }
  return { data: INSTITUTION, source: 'mock' };
}

export async function fetchAula() {
  const live = await tryFetch('/api/spaces/aula');
  if (live) {
    return { data: live, source: 'live' };
  }
  return { data: AULA_SPACE, source: 'mock' };
}
