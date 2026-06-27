import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import HowItWorks from '@/components/HowItWorks'
import WhoWeServe from '@/components/WhoWeServe'
import SocialProofBar from '@/components/SocialProofBar'
import LiveDemo from '@/components/LiveDemo'
import TrustSecurity from '@/components/TrustSecurity'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <SocialProofBar />
        <WhatWeDo />
        <LiveDemo />
        <HowItWorks />
        <WhoWeServe />
        <TrustSecurity />
        <Testimonials />
        <FAQ />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  )
}
