import { AULA_ROUTE } from '../data/mockSbe.js';

// Deterministic, profile-specific translation of the Aula walk.
// The same waypoints (AULA_ROUTE) produce different guidance per profile.
// tone: 'info' | 'success' | 'caution' | 'warning' | 'emergency'
// speakable: whether the step is meant to be read aloud (visual impairment).

const GUIDANCE = {
  visual_impairment: {
    lobby: {
      title: 'Entrance ahead',
      detail: 'You are at the Aula entrance. Face forward and continue.',
      tone: 'info',
      icon: 'entrance',
      speakable: true,
    },
    corridor: {
      title: 'Continue forward',
      detail: 'Walk straight for about ten meters along the corridor.',
      tone: 'info',
      icon: 'forward',
      speakable: true,
    },
    junction: {
      title: 'Stairs ahead — keep right',
      detail: 'Stairs are ahead on the left. Keep to the right to stay on the level path.',
      tone: 'caution',
      icon: 'right',
      speakable: true,
    },
    ramp: {
      title: 'Obstacle ahead — move right',
      detail: 'A support pillar is directly ahead. Move slightly right to pass it.',
      tone: 'warning',
      icon: 'obstacle',
      speakable: true,
    },
    toilet: {
      title: 'Accessible toilet on your left',
      detail: 'An accessible toilet is on your left if you need it. Otherwise continue.',
      tone: 'info',
      icon: 'toilet',
      speakable: true,
    },
    hall: {
      title: 'Hall entrance ahead',
      detail: 'The Aula hall entrance is straight ahead. The emergency exit is on your right.',
      tone: 'info',
      icon: 'entrance',
      speakable: true,
    },
  },

  reduced_mobility: {
    lobby: {
      title: 'Step-free entrance',
      detail: 'You are at the accessible Aula entrance. The automatic door opens ahead.',
      tone: 'success',
      icon: 'entrance',
      speakable: false,
    },
    corridor: {
      title: 'Level path ahead',
      detail: 'The corridor is flat and step-free for about ten meters.',
      tone: 'info',
      icon: 'forward',
      speakable: false,
    },
    junction: {
      title: 'Stairs ahead — accessible route continues right',
      detail: 'Do not take the central stairs. The accessible route turns right.',
      tone: 'warning',
      icon: 'right',
      speakable: false,
    },
    ramp: {
      title: 'Ramp available',
      detail: 'Take the ramp on the right up to hall level. An elevator is also available nearby.',
      tone: 'success',
      icon: 'ramp',
      speakable: false,
    },
    toilet: {
      title: 'Accessible toilet on the left',
      detail: 'A wheelchair-accessible toilet with support rails is on your left.',
      tone: 'info',
      icon: 'toilet',
      speakable: false,
    },
    hall: {
      title: 'Accessible hall entrance ahead',
      detail: 'The step-free entrance to the Aula hall is ahead. The accessible emergency exit is on the right.',
      tone: 'success',
      icon: 'entrance',
      speakable: false,
    },
  },

  deaf_hard_of_hearing: {
    lobby: {
      title: 'Aula entrance',
      detail: 'You are at the Aula entrance. Follow the visual signs forward.',
      tone: 'info',
      icon: 'entrance',
      speakable: false,
    },
    corridor: {
      title: 'Continue forward',
      detail: 'Walk straight along the corridor and follow the overhead direction signs.',
      tone: 'info',
      icon: 'forward',
      speakable: false,
    },
    junction: {
      title: 'Keep to the main route',
      detail: 'Stairs are ahead-left and a ramp is on the right. Both reach the hall.',
      tone: 'info',
      icon: 'forward',
      speakable: false,
    },
    ramp: {
      title: 'Caution: obstacle ahead',
      detail: 'A support pillar narrows the path. Pass it on the right.',
      tone: 'warning',
      icon: 'obstacle',
      speakable: false,
    },
    toilet: {
      title: 'Accessible toilet on the left',
      detail: 'An accessible toilet is on your left if you need it.',
      tone: 'info',
      icon: 'toilet',
      speakable: false,
    },
    hall: {
      title: 'Emergency exit on your right',
      detail: 'Aula hall is ahead. In an emergency, exit right — the alarm here is a flashing visual signal, so no audio cue is needed.',
      tone: 'emergency',
      icon: 'exit',
      speakable: false,
    },
  },
};

export function generateGuidance(profileId) {
  const table = GUIDANCE[profileId];
  if (!table) {
    return [];
  }
  return AULA_ROUTE.map((waypoint, index) => {
    const step = table[waypoint.id];
    return {
      waypointId: waypoint.id,
      index,
      total: AULA_ROUTE.length,
      ...step,
    };
  });
}
