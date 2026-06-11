import FadeUp from './FadeUp'

const CARDS = [
  {
    title: 'Scheduling',
    description:
      'Patients book, reschedule, and confirm visits at any hour. Your calendar stays full and your phones stay quiet.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="3" width="18" height="17" rx="2" />
        <path d="M7 1v4M15 1v4M2 9h18" />
        <path d="M7 14h.01M11 14h.01M15 14h.01M7 18h.01M11 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Patient Q&A',
    description:
      'Instant, accurate answers about hours, insurance, prep instructions, and follow-ups. Patients get help in the channels they already use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Workflow automation',
    description:
      'Intake, reminders, recalls, and routine follow-ups run on their own. Your team sets the rules and stays in control.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 bg-bg-alt" aria-labelledby="what-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            What we do
          </span>
          <h2 id="what-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Three things your front desk spends most of its time on.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="bg-white rounded-card border border-border p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold text-heading mb-2">{card.title}</h3>
                <p className="text-sm text-body leading-relaxed">{card.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
