import { createHash } from 'node:crypto'

const BASE_URL = 'https://app.feuselectronicsgroup.com'
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,96}$/

function endpoint(token, suffix = '') {
  if (!TOKEN_PATTERN.test(String(token || ''))) throw new Error('Invalid handoff token')
  return `${process.env.FEUS_RUNTIME_URL || BASE_URL}/api/v1/evaluation/handoff/${encodeURIComponent(token)}${suffix}`
}

async function jsonFetch(url, options = {}, transport = fetch) {
  const response = await transport(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    signal: AbortSignal.timeout(10000),
  })
  let body
  try { body = await response.json() } catch { body = {} }
  if (!response.ok) {
    const error = new Error(body.detail || 'Evaluation handoff is unavailable')
    error.status = response.status
    throw error
  }
  return body
}

export async function resolveEvaluationHandoff(token, transport = fetch) {
  return jsonFetch(endpoint(token), {}, transport)
}

export async function claimEvaluationHandoff(token, expectedEmail, transport = fetch) {
  const claimId = createHash('sha256')
    .update(`${token}\n${expectedEmail.trim().toLowerCase()}`)
    .digest('base64url')
  return jsonFetch(endpoint(token, '/claim'), {
    method: 'POST',
    body: JSON.stringify({
      expected_email: expectedEmail,
      claim_id: claimId,
    }),
  }, transport)
}

export async function completeEvaluationHandoff(token, expectedEmail, receipt, transport = fetch) {
  const claimId = createHash('sha256')
    .update(`${token}\n${expectedEmail.trim().toLowerCase()}`)
    .digest('base64url')
  return jsonFetch(endpoint(token, '/complete'), {
    method: 'POST',
    body: JSON.stringify({
      expected_email: expectedEmail,
      claim_id: claimId,
      delivery_receipt: receipt,
    }),
  }, transport)
}
