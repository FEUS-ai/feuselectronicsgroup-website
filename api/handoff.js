import { resolveEvaluationHandoff } from './evaluationHandoff.js'

export default async function handler(req, res) {
  res.setHeader?.('Cache-Control', 'no-store')
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const result = await resolveEvaluationHandoff(req.query?.token)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(error.status || 502).json({
      error: error.message || 'Evaluation handoff is unavailable',
    })
  }
}
