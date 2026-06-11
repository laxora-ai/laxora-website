import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        heading:        '#0f172a',
        body:           '#475569',
        muted:          '#94a3b8',
        accent:         '#0f766e',
        'accent-hover': '#0d6b62',
        border:         '#e2e8f0',
        'bg-alt':       '#fafaf8',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        btn:  '8px',
      },
      maxWidth: {
        container: '1100px',
      },
      keyframes: {
        'ring-pulse': {
          '0%':   { boxShadow: '0 0 0 0 rgba(15, 118, 110, 0.35)' },
          '70%':  { boxShadow: '0 0 0 8px rgba(15, 118, 110, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(15, 118, 110, 0)' },
        },
      },
      animation: {
        'ring-pulse': 'ring-pulse 1.2s ease-out 0.4s both',
      },
    },
  },
  plugins: [],
}

export default config
