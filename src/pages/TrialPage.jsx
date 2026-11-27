import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import CommercialNotice from '../components/CommercialNotice'
import EvaluationChoices from '../components/EvaluationChoices'
import { ENTERPRISE_INTAKE_URL } from '../data/evaluationOffer'

export default function TrialPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai evaluation routes" description="Choose a free 14-day synthetic sandbox or a guided 14-day enterprise evaluation. No automatic billing or conversion." />
    <header><p className="commercial-eyebrow">Evaluate with evidence</p><h1>Two ways to evaluate. One explicit start event.</h1>
      <p>Start hands-on with a private synthetic workspace, or begin the guided enterprise route for a customer-specific controlled trial. Both routes show when the 14-day clock starts and both keep paid service behind package selection, proposal acceptance and billing authorization.</p>
      <EvaluationChoices sandboxPrimary />
    </header>
    <CommercialNotice />
    <section><h2>What starts the clock</h2><ol className="commercial-list">
      <li><strong>Free sandbox:</strong> the backend starts 14 days only after the verified evaluator's private synthetic workspace is usable. Refresh and retries do not reset it.</li>
      <li><strong>Enterprise evaluation:</strong> the customer administrator activates the approved scope after readiness acceptance and onboarding. Start and expiry come from that authorized command, not this website.</li>
      <li><strong>Paid service:</strong> both routes require an explicit package selection, signed proposal and billing authorization. No evaluation path creates an invoice, quote, subscription or charge.</li>
    </ol><p><strong>No hidden start event. No auto-billing.</strong> SQL1-FEG and customer production targets are outside the free sandbox.</p></section>
    <section><h2>During the evaluation</h2><p>Work within the approved scope and effective privileges. Record results, reviewer effort and spend against the agreed baseline. Scope changes are reviewed, and access can be paused or revoked at any time.</p></section>
    <section><h2>Day 12–14: decide deliberately</h2><p>Review value and readiness together on Call 4. Convert only after an approved commercial proposal, explicit customer consent and the governed lifecycle decision. Extension requires review and approval; it is not a browser entitlement. If you stop or the trial expires, follow the agreed offboarding and retained-records plan.</p><p>Value is measured against your own baseline; no ROI figure or service level is promised in advance.</p></section>
    <section><h2>Continue on the right route</h2><p>Use the sandbox for the governed synthetic workflow. Use the direct assisted intake for customer targets, readiness, discovery, proposal and controlled activation.</p><div className="commercial-actions"><a href="https://app.feuselectronicsgroup.com/?start=sandbox" className="btn-primary">Try the free sandbox</a><a href={ENTERPRISE_INTAKE_URL} className="btn-secondary">Evaluate FEUS for my team</a><Link to="/pricing">View plans and pricing</Link></div></section>
  </div>
}
