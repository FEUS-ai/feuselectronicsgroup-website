import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = (path) => readFileSync(join(root, path), 'utf8')
const contractBytes = read('src/data/evaluationOffer.json')
const normalizedContractBytes = contractBytes.replace(/\r\n/g, '\n')
const contract = JSON.parse(contractBytes)
const source = JSON.parse(read('.github/evaluation-offer-source.json'))

assert.equal(contract.contract_version, source.contract_version)
assert.equal(
  createHash('sha256').update(normalizedContractBytes).digest('hex').toUpperCase(),
  source.sha256,
)
assert.equal(contract.offers.free_sandbox.duration_days, 14)
assert.equal(contract.offers.enterprise_evaluation.duration_days, 14)
assert.equal(contract.offers.free_sandbox.automatic_billing, false)
assert.equal(contract.offers.enterprise_evaluation.automatic_billing, false)
assert.equal(contract.offers.free_sandbox.start_event, 'verified_private_workspace_ready')
assert.equal(
  contract.offers.enterprise_evaluation.start_event,
  'administrator_activation_after_readiness_acceptance',
)

const surfaces = [
  'src/pages/HomePage.jsx',
  'src/pages/FeusAiPage.jsx',
  'src/pages/TrialPage.jsx',
  'src/pages/CommercialJourneyPage.jsx',
  'src/pages/GetStartedPage.jsx',
  'src/components/Navbar.jsx',
].map(read).join('\n')

assert.match(surfaces, /Try the free sandbox/)
assert.match(surfaces, /Evaluate FEUS for my team/)
assert.match(surfaces, /Sign in/)
assert.match(surfaces, /SANDBOX_SIGNUP_URL/)
assert.doesNotMatch(read('src/pages/TrialPage.jsx'), /does not create accounts or activate trials/i)
assert.doesNotMatch(read('src/pages/GetStartedPage.jsx'), /not open to the public/i)

console.log(`Evaluation offer contract ${contract.contract_version} is synchronized`)
