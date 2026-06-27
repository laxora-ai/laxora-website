'use client'

import { useState, useRef } from 'react'

const FORM_ENDPOINT = 'https://formspree.io/f/FORM_ID_TODO'

type Fields = {
  full_name: string
  office_name: string
  office_type: string
  work_email: string
}

type Errors = Partial<Record<keyof Fields, string>>

const VALIDATORS: Record<keyof Fields, (v: string) => string> = {
  full_name:   (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
  office_name: (v) => v.trim().length >= 2 ? '' : 'Please enter your office name.',
  office_type: (v) => v ? '' : 'Please select an office type.',
  work_email:  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid work email.',
}

const EMPTY: Fields = { full_name: '', office_name: '', office_type: '', work_email: '' }

export default function WaitlistForm() {
  const [fields, setFields]       = useState<Fields>(EMPTY)
  const [errors, setErrors]       = useState<Errors>({})
  const [touched, setTouched]     = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [serverError, setServerError] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  function validate(name: keyof Fields, value: string) {
    return VALIDATORS[name](value)
  }

  function handleChange(name: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [name]: value }))
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validate(name, value) }))
  }

  function handleBlur(name: keyof Fields) {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: validate(name, fields[name]) }))
  }

  function validateAll(): boolean {
    const next: Errors = {}
    let valid = true
    for (const key of Object.keys(VALIDATORS) as (keyof Fields)[]) {
      const msg = validate(key, fields[key])
      next[key] = msg
      if (msg) valid = false
    }
    setErrors(next)
    setTouched({ full_name: true, office_name: true, office_type: true, work_email: true })
    return valid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (honeypotRef.current?.value.trim()) {
      setSuccess(true)
      return
    }

    if (!validateAll()) {
      const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setSubmitting(true)
    setServerError('')

    if (FORM_ENDPOINT.includes('FORM_ID_TODO')) {
      console.warn('[Laxora] FORM_ENDPOINT not configured — submissions not captured.')
      await new Promise((r) => setTimeout(r, 700))
      setSuccess(true)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name:   fields.full_name.trim(),
          office_name: fields.office_name.trim(),
          office_type: fields.office_type,
          work_email:  fields.work_email.trim(),
        }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        throw new Error(`Server responded ${res.status}`)
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again or email us at hello@laxora.ai.')
      console.error('[Laxora] Form submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  function fieldClass(name: keyof Fields) {
    const invalid = errors[name] && touched[name]
    return [
      'w-full h-11 px-3 rounded-btn border text-sm text-heading bg-white outline-none',
      'transition-all duration-150 focus:ring-2 focus:ring-accent/20',
      invalid
        ? 'border-red-400 focus:border-red-400'
        : 'border-border focus:border-accent',
    ].join(' ')
  }

  return (
    <section id="waitlist" className="py-20 bg-bg-alt" aria-labelledby="waitlist-heading">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto">

          {!success ? (
            <>
              <div className="mb-8 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get early access</span>
                <h2 id="waitlist-heading" className="text-3xl font-bold text-heading tracking-tight">
                  Get early access.
                </h2>
                <p className="text-body mt-3">
                  Tell us about your practice and we'll reach out as onboarding opens.
                </p>
              </div>

              {serverError && (
                <p role="alert" className="mb-4 text-sm text-red-600 text-center">
                  {serverError}
                </p>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-heading mb-1.5">
                      Full name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text" id="full-name" name="full_name"
                      autoComplete="name" required aria-required="true"
                      aria-invalid={!!(errors.full_name && touched.full_name)}
                      aria-describedby="full-name-error"
                      value={fields.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      onBlur={() => handleBlur('full_name')}
                      className={fieldClass('full_name')}
                    />
                    {errors.full_name && touched.full_name && (
                      <span id="full-name-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.full_name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="office-name" className="block text-sm font-medium text-heading mb-1.5">
                      Office name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text" id="office-name" name="office_name"
                      autoComplete="organization" required aria-required="true"
                      aria-invalid={!!(errors.office_name && touched.office_name)}
                      aria-describedby="office-name-error"
                      value={fields.office_name}
                      onChange={(e) => handleChange('office_name', e.target.value)}
                      onBlur={() => handleBlur('office_name')}
                      className={fieldClass('office_name')}
                    />
                    {errors.office_name && touched.office_name && (
                      <span id="office-name-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.office_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="office-type" className="block text-sm font-medium text-heading mb-1.5">
                      Office type <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="office-type" name="office_type"
                      required aria-required="true"
                      aria-invalid={!!(errors.office_type && touched.office_type)}
                      aria-describedby="office-type-error"
                      value={fields.office_type}
                      onChange={(e) => handleChange('office_type', e.target.value)}
                      onBlur={() => handleBlur('office_type')}
                      className={fieldClass('office_type')}
                    >
                      <option value="" disabled>Select office type</option>
                      <option value="dental">Dental office</option>
                      <option value="physician">Physician office</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.office_type && touched.office_type && (
                      <span id="office-type-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.office_type}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="work-email" className="block text-sm font-medium text-heading mb-1.5">
                      Work email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email" id="work-email" name="work_email"
                      autoComplete="email" required aria-required="true"
                      aria-invalid={!!(errors.work_email && touched.work_email)}
                      aria-describedby="work-email-error"
                      value={fields.work_email}
                      onChange={(e) => handleChange('work_email', e.target.value)}
                      onBlur={() => handleBlur('work_email')}
                      className={fieldClass('work_email')}
                    />
                    {errors.work_email && touched.work_email && (
                      <span id="work-email-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.work_email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website">Website</label>
                  <input
                    type="text" id="company_website" name="company_website"
                    ref={honeypotRef} tabIndex={-1} autoComplete="off"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-11 w-full sm:w-auto px-6 rounded-btn bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium transition-colors duration-150"
                  >
                    {submitting ? 'Sending…' : 'Request early access'}
                  </button>
                  <p className="text-xs text-muted">
                    🔒 Built with patient privacy and data security as first principles.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4" aria-hidden="true" focusable="false">
                <circle cx="24" cy="24" r="22" stroke="#0F766E" strokeWidth="2" />
                <path d="M14 24l7 7 13-14" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-xl font-bold text-heading mb-2">✅ You&apos;re on the list!</h2>
              <p className="text-body">We&apos;ll reach out as onboarding opens for your practice type.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
