import FadeUp from './FadeUp'

const items = [
  ['HIPAA Compliant', 'All patient data is handled in accordance with HIPAA requirements. We sign BAAs.'],
  ['End-to-End Encrypted', 'Messages and call data are encrypted in transit and at rest.'],
  ['No Data Selling', 'Your patient data is never sold or used to train third-party models.'],
]

export default function TrustSecurity() {
  return (
    <section id="security" className="py-20 bg-[#0D1B2A] text-white" aria-labelledby="security-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#58D3B6]">Security & compliance</span>
          <h2 id="security-heading" className="mt-2 text-3xl font-bold tracking-tight">Built with patient privacy as a first principle.</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A7F64]">✓</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-white/75">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-[#1A7F64]/20 border border-[#1A7F64]/40 p-4 text-sm text-white/90">
          We sign a Business Associate Agreement (BAA) with every practice.
        </div>
      </div>
    </section>
  )
}
