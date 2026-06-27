import FadeUp from './FadeUp'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen py-24 md:py-32" aria-labelledby="hero-heading">
      <div className="max-w-container mx-auto px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeUp>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">AI front desk · Early access</p>
            <h1 id="hero-heading" className="mb-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading md:text-6xl">The AI front desk modern practices trust.</h1>
            <p className="mb-8 max-w-[560px] text-lg leading-relaxed text-body">Laxora answers calls, books appointments, and handles routine front-office work — 24/7 — so your staff can focus on the people in the room.</p>
            <div className="mb-5 flex flex-wrap gap-3">
              <a href="#waitlist" className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 font-medium text-white transition hover:scale-[1.02] hover:bg-accent-hover">Join the waitlist</a>
              <a href="#live-demo" className="inline-flex h-11 items-center justify-center rounded-full border border-heading px-6 font-medium text-heading transition hover:bg-heading hover:text-white">See how it works</a>
            </div>
            <p className="text-sm text-muted">🔒 HIPAA compliant · No credit card required · Setup in 1 day</p>
          </FadeUp>
          <FadeUp delay={0.1} className="w-full">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg" aria-label="Animated Laxora chat demo">
              <div className="flex items-center gap-1.5 border-b border-border bg-bg-alt px-4 py-3"><span className="h-3 w-3 rounded-full bg-[#ff5f57]"/><span className="h-3 w-3 rounded-full bg-[#febc2e]"/><span className="h-3 w-3 rounded-full bg-[#28c840]"/><span className="ml-3 text-xs font-semibold text-heading">Laxora</span></div>
              <div className="hero-chat p-5 min-h-[340px]">
                <div className="chat-msg user">Can I get a cleaning Thursday at 2?</div>
                <div className="chat-msg typing"><span className="avatar">L</span><span className="typing-dots">•••</span></div>
                <div className="chat-msg bot-card"><strong>✓ Appointment confirmed</strong><br/>Booked for Thursday at 2:00 PM. A reminder will go out Wednesday morning.</div>
                <div className="chat-msg user thanks">Perfect, thanks!</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
