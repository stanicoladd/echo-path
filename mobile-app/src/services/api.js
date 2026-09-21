// Data service for the visitor app.
//
// This is intentionally mock-first. The app must stay fully usable with NO
// backend running. When backend integration begins later, flip USE_BACKEND to
// true and implement the fetch branches — the mock branch stays as a fallback
// so the demo never breaks.

import { INSTITUTIONS, SBE_INSTITUTION, getSpace } from '../data/mockSbe.js';
import { generateGuidance } from '../guidance/generateGuidance.js';

const USE_BACKEND = false;

// Simulate an async boundary so swapping in real fetch() calls later requires
// no changes in the calling components.
function resolve(value) {
  return Promise.resolve(structuredCloneSafe(value));
}

function structuredCloneSafe(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

export async function fetchInstitutions() {
  if (USE_BACKEND) {
    // Future: return (await fetch('/api/institutions')).json();
  }
  return resolve(INSTITUTIONS);
}

export async function fetchInstitution(id) {
  if (USE_BACKEND) {
    // Future: return (await fetch(`/api/institutions/${id}`)).json();
  }
  return resolve(id === SBE_INSTITUTION.id ? SBE_INSTITUTION : null);
}

export async function fetchSpace(spaceId) {
  if (USE_BACKEND) {
    // Future: return (await fetch(`/api/spaces/${spaceId}`)).json();
  }
  return resolve(getSpace(SBE_INSTITUTION, spaceId));
}

export async function fetchGuidance(spaceId, profileId) {
  if (USE_BACKEND) {
    // Future: return (await fetch(`/api/guidance/${spaceId}?profile=${profileId}`)).json();
  }
  return resolve(generateGuidance(profileId));
}
