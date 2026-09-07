const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiOrigin = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'

export async function fetchResource(resource) {
  const response = await fetch(`${apiOrigin}/api/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export function displayName(user) { return user?.profile?.displayName || user?.username || 'Unknown athlete' }