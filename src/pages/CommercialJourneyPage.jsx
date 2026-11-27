import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import CommercialNotice from '../components/CommercialNotice'
import UseCaseStories from '../components/UseCaseStories'
import EvaluationChoices from '../components/EvaluationChoices'
import { JOURNEY_CALLS } from '../data/commercialJourney'

export default function CommercialJourneyPage() {
  return <div className="commercial-page">
    <SEO title="FEUS.ai evaluation journey" description="Choose a 14-day synthetic sandbox that starts when its workspace is ready, or a guided enterprise evaluation that starts after readiness and administrator activation. No automatic billing." />
    <header>
      <p className="commercial-eyebrow">From business intent to verified value</p>
      <h1>A useful first conversation.<br />A controlled path to adoption.</h1>
      <p>Explore FEUS.ai around your actual workload, governance needs and evidence, with a clear decision at every step.</p>
      <EvaluationChoices sandboxPrimary />
      <p className="commercial-small">Returning customer? Use the existing <a href="https://app.feuselectronicsgroup.com/">Sign in</a> path.</p>
    </header>
    <CommercialNotice />
    <section aria-labelledby="calls-title"><h2 id="calls-title">Four conversations, with clear decisions</h2>
      <ol className="commercial-grid">{JOURNEY_CALLS.map(call => <li className="commercial-card" key={call.title}>
        <h3>{call.title}</h3><p className="commercial-timing">{call.timing}</p><p>{call.detail}</p>
      </li>)}</ol>
    </section>
    <UseCaseStories />
    <section><h2>Choose the route that fits your team</h2><div className="commercial-grid">
      <article className="commercial-card"><h3>Hosted browser route</h3><p>The production service on Microsoft Azure, used from the browser with Microsoft Entra ID sign-in. No editor or Git is needed for ordinary users. Customer SQL execution is delivered through the Expert route.</p><Link to="/readiness#hosted">Hosted readiness</Link></article>
      <article className="commercial-card"><h3>Expert installed route</h3><p>For DBA/operator-led work in your environment through VS Code. We confirm installed dependencies, gateway wiring and effective target privileges with you. It runs from a FEUS-provided distribution checkout that we set up with you.</p><Link to="/readiness#expert">Expert readiness</Link></article>
    </div></section>
    <section><h2>Agree the commercial scope that fits</h2><p>Users, resources, capabilities, support and entitlements are negotiated for your customer-specific pack. Package pricing is approved and quoted in your scoped proposal; contact sales to start.</p><div className="commercial-actions"><Link to="/packages" className="btn-secondary">Compare engagement options</Link><Link to="/readiness" className="btn-secondary">Review your readiness pack</Link></div></section>
  </div>
}
