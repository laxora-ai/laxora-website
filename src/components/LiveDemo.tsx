'use client'

import { useState } from 'react'

const replies: Record<string, string> = {
  'Do you accept my insurance?': "We work with most major plans. If you let me know your insurance provider, I can confirm your coverage and get you booked right away.",
  'I need to reschedule my appointment': "No problem at all — life happens. I have a few openings this week. Do mornings or afternoons work better for you?",
  'What are your hours?': "We're here Monday through Friday, 8 AM to 5 PM. That said, you can reach me any time — I'll make sure nothing slips through.",
  'Can I be seen this week?': "Let's make that happen. I have openings as early as tomorrow. Do you have a preferred time, or should I find the first available slot?",
}

export default function LiveDemo() {
  const [question, setQuestion] = useState('Do you take Delta Dental?')
  const [typing, setTyping] = useState(false)
  function ask(q: string) {
    setQuestion(q); setTyping(true); window.setTimeout(() => setTyping(false), 900)
  }
  return (
    <section id="live-demo" className="py-20 bg-bg-alt" aria-labelledby="demo-heading">
      <div className="max-w-container mx-auto px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">See it in action</span>
        <h2 id="demo-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">Ask Laxora anything a patient would.</h2>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white p-5 text-left shadow-sm">
          <div className="space-y-4 min-h-[210px]">
            <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-sm text-white">{question}</div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">L</div>
              <div className="max-w-[82%] rounded-2xl rounded-bl-sm bg-[#F0F4F3] px-4 py-3 text-sm text-heading">{typing ? <span className="typing-dots">•••</span> : replies[question]}</div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.keys(replies).map((q) => <button key={q} onClick={() => ask(q)} className="rounded-full border border-border px-3 py-2 text-sm text-body transition hover:border-accent hover:text-accent active:scale-[.97]">{q}</button>)}
          </div>
          <p className="mt-4 text-center text-xs font-medium text-muted">Powered by Laxora AI</p>
        </div>
        <p className="mt-5 text-body">This is exactly how Laxora responds to your patients — across SMS, web chat, and phone.</p>
      </div>
    </section>
  )
}
