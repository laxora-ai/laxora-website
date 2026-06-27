export default function Testimonials() {
  return (
    <section className="py-20" aria-labelledby="feedback-heading">
      <div className="max-w-container mx-auto px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">Early feedback</span>
        <h2 id="feedback-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">What early practices are saying.</h2>
        <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 shadow-sm">
          <p className="text-xl font-semibold text-heading">“Built with patient privacy and data security as first principles.”</p>
          <p className="mt-4 text-body">— Laxora Team</p>
          <a href="#waitlist" className="mt-6 inline-flex h-11 items-center justify-center rounded-btn bg-accent px-6 font-medium text-white hover:bg-accent-hover">Be among the first practices. Join the waitlist.</a>
        </div>
      </div>
    </section>
  )
}
