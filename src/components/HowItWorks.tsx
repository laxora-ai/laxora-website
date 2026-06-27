import { Fragment } from 'react'
import FadeUp from './FadeUp'

const STEPS = [
  {
    number: '1',
    title: 'Connect',
    description: 'Laxora plugs into your existing scheduling system and phone lines. No ripping out your current stack.',
  },
  {
    number: '2',
    title: 'Automate',
    description: 'Laxora starts answering, booking, and following up under rules you configure. You stay in control.',
  },
  {
    number: '3',
    title: 'Focus',
    description:
      'Your front desk handles the exceptions and human moments. Laxora handles the repetitive 80%.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" aria-labelledby="how-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            How it works
          </span>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Simple to start, designed to stay out of your way.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr_48px_1fr] items-start">
          {STEPS.map((step, i) => (
            <Fragment key={step.title}>
              <FadeUp
                delay={i * 0.08}
                className="group flex flex-row md:flex-col items-start gap-5 pb-10 md:pb-0"
              >
                <div className="w-10 h-10 rounded-full border-2 border-accent text-accent font-bold text-sm flex items-center justify-center shrink-0 transition duration-150 group-hover:bg-accent group-hover:text-white">
                  {step.number}
                </div>
                <div className="md:mt-5">
                  <h3 className="text-base font-semibold text-heading mb-1">{step.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>

              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:flex items-start justify-center pt-5"
                  aria-hidden="true"
                >
                  <div className="w-full h-px bg-border" />
                </div>
              )}
            </Fragment>
          ))}
        </div><div className="mt-10 inline-flex rounded-xl border border-border bg-bg-alt px-4 py-3 text-sm text-body">📅 Most practices are live within 24 hours.</div>
      </div>
    </section>
  )
}
