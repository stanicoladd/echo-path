const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const payload = await response.json()
      message = payload.detail || message
    } catch {
      // Keep the useful status-based fallback.
    }
    throw new Error(typeof message === 'string' ? message : 'Request failed')
  }

  return response.json()
}

const typeNames = {
  entrance: 'Entrance',
  automatic_door: 'Automatic Door',
  ramp: 'Ramp',
  stairs: 'Stairs',
  elevator: 'Elevator',
  emergency_exit: 'Emergency Exit',
  accessible_toilet: 'Accessible Toilet',
  obstacle: 'Obstacle',
}

const localNames = new Map()

function normalizeInfrastructure(item) {
  return {
    id: item.id,
    type: item.type,
    name:
      item.name ||
      localNames.get(item.id) ||
      `Aula ${typeNames[item.type] || 'Infrastructure'}`,
    accessible: item.accessible,
    location: item.location || '',
    notes: item.notes || '',
  }
}

function normalizeSpace(space) {
  return {
    ...space,
    infrastructure: (space.infrastructure || []).map(normalizeInfrastructure),
  }
}

// The current shared backend predates the frozen `name` field and requires
// `confirmed`. Keep that temporary mismatch contained in this service.
function toCurrentBackendPayload(data, includeId = true) {
  localNames.set(data.id, data.name)
  const payload = {
    type: data.type,
    accessible: data.accessible,
    location: data.location || 'Not specified',
    notes: data.notes,
    confirmed: true,
  }
  return includeId ? { id: data.id, ...payload } : payload
}

export function checkHealth() {
  return request('/api/health')
}

export function getInstitution() {
  return request('/api/institutions/um-sbe')
}

export async function getAula() {
  return normalizeSpace(await request('/api/spaces/aula'))
}

export function addInfrastructure(data) {
  return request('/api/spaces/aula/infrastructure', {
    method: 'POST',
    body: JSON.stringify(toCurrentBackendPayload(data)),
  })
}

export function updateInfrastructure(id, data) {
  return request(`/api/spaces/aula/infrastructure/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(toCurrentBackendPayload({ ...data, id }, false)),
  })
}

export { BASE_URL }
