import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Laxora — The AI front desk for healthcare practices',
  description:
    'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices. Join the waitlist for early access.',
  metadataBase: new URL('https://laxora.ai'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://laxora.ai/',
    title: 'Laxora — The AI front desk for healthcare practices',
    description:
      'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices.',
    images: [{ url: '/assets/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laxora — The AI front desk for healthcare practices',
    description:
      'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices.',
    images: ['/assets/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/assets/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-geist antialiased text-body bg-white">
        {children}
      </body>
    </html>
  )
}
