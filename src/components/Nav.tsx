'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#who-we-serve', label: 'Who we serve' },
  { href: '#security', label: 'Security' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-white/70 backdrop-blur'
      }`}
    >
      <nav
        className="max-w-container mx-auto px-6 h-16 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Laxora home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
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

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-base text-body hover:text-heading transition-colors duration-150"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-btn bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-150"
          >
            Join the waitlist
          </a>
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-heading"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect y="3" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="9" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="15" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-white px-6 py-3 flex flex-col"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-body hover:text-heading py-3 min-h-[44px] flex items-center transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 mb-3 inline-flex items-center justify-center h-11 px-4 rounded-btn bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-150"
            onClick={() => setMenuOpen(false)}
          >
            Join the waitlist
          </a>
        </div>
      )}
    </header>
  )
}
