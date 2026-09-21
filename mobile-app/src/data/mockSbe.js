// Mock data for the ECHO PATH visitor app.
//
// The `institution -> spaces -> infrastructure` shape is the frozen shared
// schema agreed with the backend and admin dashboard teams. Field names here
// (id, type, accessible, location, notes) must not be renamed casually.

export const SBE_INSTITUTION = {
  id: 'um-sbe',
  name: 'Maastricht University - School of Business and Economics',
  shortName: 'UM — School of Business and Economics',
  status: 'enabled',
  address: 'Tongersestraat 53, Maastricht',
  spaces: [
    {
      id: 'aula',
      name: 'Aula',
      description: 'Main ceremonial hall used for lectures and events.',
      infrastructure: [
        {
          id: 'main-door',
          type: 'entrance',
          name: 'Main entrance',
          accessible: true,
          location: 'front',
          notes: 'Step-free main Aula entrance with automatic door.',
        },
        {
          id: 'auto-door-1',
          type: 'automatic door',
          name: 'Automatic door',
          accessible: true,
          location: 'front',
          notes: 'Opens automatically; wide enough for a wheelchair.',
        },
        {
          id: 'ramp-1',
          type: 'ramp',
          name: 'Hall ramp',
          accessible: true,
          location: 'right',
          notes: 'Gentle ramp up to hall level, on the accessible route.',
        },
        {
          id: 'stairs-1',
          type: 'stairs',
          name: 'Central stairs',
          accessible: false,
          location: 'front-left',
          notes: 'Avoid for reduced mobility; use the ramp on the right.',
        },
        {
          id: 'elevator-1',
          type: 'elevator',
          name: 'Passenger elevator',
          accessible: true,
          location: 'left',
          notes: 'Serves all Aula levels; near the accessible route.',
        },
        {
          id: 'toilet-1',
          type: 'accessible toilet',
          name: 'Accessible toilet',
          accessible: true,
          location: 'left',
          notes: 'Wheelchair-accessible toilet with support rails.',
        },
        {
          id: 'obstacle-1',
          type: 'obstacle',
          name: 'Support pillar',
          accessible: false,
          location: 'center',
          notes: 'Pillar narrows the corridor; pass on the right.',
        },
        {
          id: 'exit-1',
          type: 'emergency exit',
          name: 'Emergency exit',
          accessible: true,
          location: 'right',
          notes: 'Step-free emergency exit with visual (flashing) alarm.',
        },
      ],
    },
  ],
};

// Institution discovery list. Only SBE is active ("Echo Path Enabled").
// The others are intentionally shown as disabled "Coming Soon" examples.
export const INSTITUTIONS = [
  {
    id: 'um-sbe',
    name: 'Maastricht University — School of Business and Economics',
    category: 'University',
    status: 'enabled',
  },
  {
    id: 'maastricht-umc',
    name: 'Maastricht UMC+',
    category: 'Hospital',
    status: 'coming_soon',
  },
  {
    id: 'maastricht-city-hall',
    name: 'Maastricht City Hall',
    category: 'Public building',
    status: 'coming_soon',
  },
  {
    id: 'maastricht-library',
    name: 'Maastricht Library',
    category: 'Public building',
    status: 'coming_soon',
  },
];

// The physical walk through the Aula, expressed as profile-neutral waypoints.
// `generateGuidance` translates the SAME waypoints + infrastructure into
// different instruction sequences per accessibility profile.
export const AULA_ROUTE = [
  { id: 'lobby', kind: 'entrance' },
  { id: 'corridor', kind: 'path' },
  { id: 'junction', kind: 'stairs_ramp' },
  { id: 'ramp', kind: 'ramp_obstacle' },
  { id: 'toilet', kind: 'toilet' },
  { id: 'hall', kind: 'arrival_emergency' },
];

export function getSpace(institution, spaceId) {
  return institution.spaces.find((s) => s.id === spaceId) ?? null;
}
