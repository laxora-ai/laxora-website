import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import HowItWorks from '@/components/HowItWorks'
import WhoWeServe from '@/components/WhoWeServe'
import Team from '@/components/Team'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <WhoWeServe />
        <Team />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  )
}
