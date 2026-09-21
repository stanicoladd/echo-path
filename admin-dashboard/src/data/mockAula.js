export const mockInstitution = {
  id: 'um-sbe',
  name: 'Maastricht University - School of Business and Economics',
  short_name: 'UM SBE',
}

export const mockAula = {
  id: 'aula',
  name: 'Aula',
  floor: 'Ground floor',
  configured: true,
  description: 'Main lecture and event hall.',
  infrastructure: [
    {
      id: 'entrance-aula',
      type: 'entrance',
      name: 'Main Aula Entrance',
      accessible: true,
      location: 'rear-left',
      notes: 'Wide, step-free Aula entrance.',
    },
    {
      id: 'stairs-1',
      type: 'stairs',
      name: 'Main Aula Stairs',
      accessible: false,
      location: 'front-right',
      notes: 'Avoid for reduced mobility.',
    },
    {
      id: 'ramp-1',
      type: 'ramp',
      name: 'Aula Entrance Ramp',
      accessible: true,
      location: 'left of the main stairs',
      notes: 'Wheelchair accessible.',
    },
  ],
}
