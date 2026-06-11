import FadeUp from './FadeUp'

export default function Hero() {
  return (
    <section id="hero" className="py-20 md:py-28" aria-labelledby="hero-heading">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Copy */}
          <FadeUp className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              AI front desk · Early access
            </p>
            <h1
              id="hero-heading"
              className="text-[2.25rem] md:text-[2.75rem] font-bold text-heading leading-[1.15] tracking-tight mb-5"
            >
              The AI front desk for modern healthcare practices.
            </h1>
            <p className="text-body text-lg leading-relaxed mb-8 max-w-[520px]">
              Laxora answers patient calls and messages, books and reschedules appointments, and takes
              routine front-office work off your team&apos;s plate. Your staff stays focused on the
              people in the room.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center h-11 px-6 rounded-btn bg-accent hover:bg-accent-hover text-white font-medium transition-colors duration-150"
              >
                Join the waitlist
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-11 px-6 rounded-btn border border-border text-heading hover:border-heading font-medium transition-colors duration-150"
              >
                See how it works
              </a>
            </div>
            <p className="text-sm text-muted">
              Now onboarding early dental and physician practices.
            </p>
          </FadeUp>

          {/* Booking mock */}
          <FadeUp delay={0.1} className="flex-1 min-w-0 w-full max-w-[420px] md:max-w-none">
            <div className="rounded-card border border-border bg-white shadow-sm overflow-hidden" aria-hidden="true">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-bg-alt">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-medium text-muted">Laxora</span>
              </div>

              {/* Chat timeline */}
              <div className="p-5 flex flex-col gap-4">
                {/* Patient */}
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-body">JS</span>
                  </div>
                  <div className="bg-[#f1f5f9] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-heading">Can I get a cleaning Thursday at 2?</p>
                    <span className="text-[10px] text-muted mt-1 block">2:14 PM</span>
                  </div>
                </div>

                {/* Laxora confirmation — ring-pulse fires once on page load */}
                <div className="flex justify-end">
                  <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] animate-ring-pulse">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6.25" stroke="#0F766E" strokeWidth="1.5" />
                        <path d="M4 7l2 2 4-4" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs font-semibold text-accent">Appointment confirmed</span>
                    </div>
                    <p className="text-sm text-heading">
                      Booked for Thursday at 2:00 PM with Dr. Chen. A reminder will go out Wednesday morning.
                    </p>
                    <span className="text-[10px] text-muted mt-1 block">2:14 PM · Laxora</span>
                  </div>
                </div>

                {/* Patient reply */}
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-body">JS</span>
                  </div>
                  <div className="bg-[#f1f5f9] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-heading">Perfect, thanks!</p>
                    <span className="text-[10px] text-muted mt-1 block">2:15 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
