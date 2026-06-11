import FadeUp from './FadeUp'

const CARDS = [
  {
    title: 'Dental offices',
    description:
      'From solo practices to multi-location groups. Recall reminders, hygiene scheduling, new-patient intake, and the daily call volume that keeps your front desk tied up.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 13 12 13 22" />
      </svg>
    ),
  },
  {
    title: 'Physician offices',
    description:
      'Primary care and specialty clinics. Appointment management, refill and referral questions routed to the right place, and follow-ups that do not fall through the cracks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 bg-bg-alt" aria-labelledby="who-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Who we serve
          </span>
          <h2 id="who-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Built for the way practices actually run.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="bg-white rounded-card border border-border p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-heading mb-3">{card.title}</h3>
                <p className="text-body leading-relaxed">{card.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
