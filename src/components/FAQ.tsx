'use client'
import { useState } from 'react'
const faqs = [
 ['What scheduling systems does Laxora integrate with?', "We're actively building integrations. Reach out to tell us which system you use and we'll prioritize it."],
 ['Is Laxora HIPAA compliant?', 'Yes. We sign a BAA with every practice and all data is handled according to HIPAA requirements.'],
 ["What happens when Laxora can't answer something?", 'Laxora escalates to your team with context so they can follow up — nothing falls through the cracks.'],
 ["Do patients know they're talking to AI?", 'You control how Laxora introduces itself. Most practices prefer transparency, and patients respond well when the AI is fast and helpful.'],
 ['How long does setup take?', 'Most practices are live within 24 hours of onboarding.'],
 ['What does it cost?', "We're in early access. Reach out and we'll discuss pricing based on your practice size and needs."],
]
export default function FAQ(){ const [open,setOpen]=useState(0); return <section id="faq" className="py-20" aria-labelledby="faq-heading"><div className="max-w-3xl mx-auto px-6"><span className="text-xs font-semibold uppercase tracking-widest text-accent">FAQ</span><h2 id="faq-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">Questions practices ask before signing up.</h2><div className="mt-8">{faqs.map(([q,a],i)=><div key={q} className="border-b border-border"><button className="flex w-full items-center justify-between py-5 text-left font-semibold text-heading" onClick={()=>setOpen(open===i?-1:i)}>{q}<span className={`transition ${open===i?'rotate-180':''}`}>⌄</span></button><div className={`grid transition-all duration-300 ${open===i?'grid-rows-[1fr] pb-5':'grid-rows-[0fr]'}`}><p className="overflow-hidden text-body">{a}</p></div></div>)}</div></div></section>}
