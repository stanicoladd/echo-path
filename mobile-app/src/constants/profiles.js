// Accessibility profiles for ECHO PATH.
// IMPORTANT: these IDs are part of the shared cross-team contract and must match
// the backend exactly. Do not rename: visual_impairment, deaf_hard_of_hearing,
// reduced_mobility.
export const PROFILES = [
  {
    id: 'visual_impairment',
    label: 'Visual Impairment',
    short: 'Visual',
    tagline: 'Large high-contrast directions with optional spoken guidance.',
    icon: 'eye',
  },
  {
    id: 'deaf_hard_of_hearing',
    label: 'Deaf / Hard of Hearing',
    short: 'Deaf / HoH',
    tagline: 'Visual-first information with emphasized emergency alerts.',
    icon: 'ear',
  },
  {
    id: 'reduced_mobility',
    label: 'Wheelchair / Reduced Mobility',
    short: 'Reduced mobility',
    tagline: 'Step-free routes that avoid stairs and prioritize ramps and lifts.',
    icon: 'wheelchair',
  },
];

export const PROFILE_IDS = PROFILES.map((p) => p.id);

export function getProfile(id) {
  return PROFILES.find((p) => p.id === id) ?? null;
}
