// Mock data for the ECHO PATH Institution Portal.
//
// Shape mirrors the read-only API responses the dashboard consumes:
//   GET /api/institutions/maastricht-university  -> INSTITUTION
//   GET /api/spaces/aula                          -> AULA_SPACE
// When the FastAPI backend is unavailable, the dashboard falls back to this
// data so the demo always works (see services/api.js).

export const INSTITUTION = {
  id: 'maastricht-university',
  name: 'Maastricht University',
  shortName: 'UM',
  location: 'Maastricht, Netherlands',
  type: 'University',
  faculties: [
    {
      id: 'fasos',
      code: 'FASoS',
      name: 'Faculty of Arts and Social Sciences',
      status: 'not_mapped',
    },
    {
      id: 'fhml',
      code: 'FHML',
      name: 'Faculty of Health, Medicine and Life Sciences',
      status: 'not_mapped',
    },
    {
      id: 'law',
      code: 'LAW',
      name: 'Faculty of Law',
      status: 'not_mapped',
    },
    {
      id: 'fpn',
      code: 'FPN',
      name: 'Faculty of Psychology and Neuroscience',
      status: 'not_mapped',
    },
    {
      id: 'fse',
      code: 'FSE',
      name: 'Faculty of Science and Engineering',
      status: 'not_mapped',
    },
    {
      id: 'sbe',
      code: 'SBE',
      name: 'School of Business and Economics',
      status: 'active',
      spaces: ['aula'],
    },
  ],
};

export const AULA_SPACE = {
  id: 'aula',
  name: 'Aula',
  facultyCode: 'SBE',
  facultyName: 'School of Business and Economics',
  status3d: '3D Mapped',
  accessibilityMapping: 'Active',
  threeD: {
    available: true,
    capturedAt: '2026-09-18',
    coverage: 'Ground floor · main hall',
  },
  infrastructure: [
    {
      id: 'main-entrance',
      name: 'Main Aula Entrance',
      type: 'entrance',
      accessible: true,
      location: 'Front',
      notes: 'Step-free main entrance with automatic doors.',
    },
    {
      id: 'main-stairs',
      name: 'Main Aula Stairs',
      type: 'stairs',
      accessible: false,
      location: 'Central',
      notes: 'Central staircase — barrier for wheelchair users. Use the accessible route.',
    },
    {
      id: 'emergency-exit',
      name: 'Aula Emergency Exit',
      type: 'emergency_exit',
      accessible: true,
      location: 'Right',
      notes: 'Step-free emergency exit with flashing visual alarm.',
    },
    {
      id: 'accessible-route',
      name: 'Aula Accessible Route',
      type: 'ramp',
      accessible: true,
      location: 'Right',
      notes: 'Ramp providing the step-free accessible route to hall level.',
    },
  ],
};
