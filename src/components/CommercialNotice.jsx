import { Link } from 'react-router-dom'

/** Short, positive explanation of how a FEUS.ai engagement runs. */
export default function CommercialNotice() {
  return <aside className="commercial-notice" aria-label="How FEUS.ai engagements work">
    <strong>How engagements work</strong>
    <p>The free sandbox is synthetic-only and starts when the private workspace is usable. Enterprise engagements follow intro → discovery → customer-specific readiness pack → onboarding → administrator activation → 14-day controlled trial → value review → your plan. There is no automatic billing: paid service requires package selection, final terms and explicit billing authorization.</p>
    <Link to="/journey">The evaluation journey</Link>
    {' · '}<Link to="/packages">Plans and pricing</Link>
  </aside>
}
