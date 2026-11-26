import { ArrowRight, Building2, FlaskConical } from 'lucide-react'
import {
  ENTERPRISE_INTAKE_URL,
  ENTERPRISE_LABEL,
  SANDBOX_LABEL,
  SANDBOX_SIGNUP_URL,
} from '../data/evaluationOffer'

export default function EvaluationChoices({ sandboxPrimary = false }) {
  const cards = [
    {
      key: 'sandbox',
      icon: FlaskConical,
      eyebrow: 'Self-service · 14 days',
      title: SANDBOX_LABEL,
      detail: 'Start when your private US-hosted synthetic workspace is usable. Inspect one setting, review the exact plan, approve it in this session, verify the readback and restore it.',
      href: SANDBOX_SIGNUP_URL,
      secondary: 'Synthetic data only. No production target, checkout or automatic charge.',
      primary: sandboxPrimary,
    },
    {
      key: 'enterprise',
      icon: Building2,
      eyebrow: 'Guided enterprise evaluation · 14 days',
      title: ENTERPRISE_LABEL,
      detail: 'Start with readiness acceptance, scoped onboarding and administrator activation. Connect the evaluation to your actual workflow without bypassing identity, policy or target qualification.',
      href: ENTERPRISE_INTAKE_URL,
      secondary: 'Readiness comes first. The controlled clock starts only after successful administrator activation.',
      primary: !sandboxPrimary,
    },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {cards.map(({ key, icon: Icon, eyebrow, title, detail, href, secondary, primary }) => (
        <article key={key} className={`commercial-card ${primary ? 'ring-2 ring-feus-500/50' : ''}`}>
          <Icon className="h-6 w-6 text-feus-700" aria-hidden="true" />
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-feus-700">{eyebrow}</p>
          <h3 className="mt-2">{title}</h3>
          <p className="mt-3">{detail}</p>
          <p className="mt-3 text-sm font-medium text-slate-600">{secondary}</p>
          <a className={primary ? 'btn-primary mt-6 inline-flex' : 'btn-secondary mt-6 inline-flex'} href={href}>
            {title}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  )
}
