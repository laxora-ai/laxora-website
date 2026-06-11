const FOOTER_LINKS = [
  { href: '#what-we-do',   label: 'What we do' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#who-we-serve', label: 'Who we serve' },
  { href: '#team',         label: 'Team' },
  { href: '#waitlist',     label: 'Join the waitlist' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="max-w-container mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <a href="/" className="flex items-center gap-2 mb-2" aria-label="Laxora home">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
              <rect width="28" height="28" rx="7" fill="#0F766E" />
              <text
                x="14" y="20.5"
                fontFamily="var(--font-geist-sans),system-ui,sans-serif"
                fontSize="15" fontWeight="800"
                fill="white" textAnchor="middle"
              >
                L
              </text>
            </svg>
            <span className="text-heading font-semibold text-[15px] tracking-tight">Laxora</span>
          </a>
          <p className="text-xs text-muted">&copy; 2026 Laxora</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-body hover:text-heading transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
