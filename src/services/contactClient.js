const unavailable = 'Online inquiries are unavailable. Please email info@feuselectronicsgroup.com directly.'

export async function readContactAvailability(transport = fetch) {
  try {
    const response = await transport('/api/contact', { signal: AbortSignal.timeout(6000) })
    if (!response.ok) return false
    return (await response.json()).available === true
  } catch { return false }
}

export async function sendContact(payload, transport = fetch) {
  let response
  try {
    response = await transport('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new Error('The request timed out or could not reach the server. Delivery is unknown; check before retrying or use direct email.')
  }
  let body
  try { body = await response.json() } catch { throw new Error('The server returned an invalid response. Delivery is unknown; use direct email.') }
  if (!response.ok) throw new Error(response.status === 503 ? unavailable : body.error || 'The inquiry was not accepted. Please use direct email.')
  if (body.success !== true || body.delivery !== 'provider_accepted') throw new Error('The server did not confirm provider acceptance. Delivery is unknown; use direct email.')
  if (body.handoffRecorded === false) {
    throw new Error('The provider accepted this workflow inquiry, but its deduplication receipt is still pending. A retry is safe and will reuse the provider delivery key; if you do not retry, use direct email and mention the accepted submission.')
  }
  return body
}

export async function readEvaluationHandoff(token, transport = fetch) {
  if (!/^[A-Za-z0-9_-]{32,96}$/.test(token || '')) return null
  try {
    const response = await transport(`/api/handoff?token=${encodeURIComponent(token)}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return null
    const body = await response.json()
    return body.completed === true ||
      (body.completed === false && typeof body.email === 'string')
      ? body
      : null
  } catch {
    return null
  }
}
