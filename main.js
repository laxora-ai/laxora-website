// ============================================================
// FORM ENDPOINT
// Replace FORM_ID_TODO with a real Formspree ID, or replace
// this entire URL with the future API Gateway endpoint.
// ============================================================
const FORM_ENDPOINT = 'https://formspree.io/f/FORM_ID_TODO';

// ============================================================
// NAV: scrolled border + mobile disclosure
// ============================================================
(function initNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!header || !toggle || !links) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      const firstLink = links.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ============================================================
// SCROLL ANIMATIONS: fade-up via IntersectionObserver
// ============================================================
(function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();

// ============================================================
// FORM: validation, honeypot, submission
// ============================================================
(function initForm() {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('form-status');
  const successEl = document.getElementById('form-success');
  const btnLabel = submitBtn.querySelector('.btn-label');
  const btnSubmitting = submitBtn.querySelector('.btn-submitting');

  const validators = {
    full_name: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    office_name: (v) => v.trim().length >= 2 ? '' : 'Please enter your office name.',
    office_type: (v) => v ? '' : 'Please select an office type.',
    work_email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid work email.',
  };

  function getField(name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function getErrorEl(name) {
    const id = name.replace(/_/g, '-') + '-error';
    return document.getElementById(id);
  }

  function showError(name, msg) {
    const el = getField(name);
    const errEl = getErrorEl(name);
    if (!el || !errEl) return;
    el.classList.toggle('invalid', !!msg);
    errEl.textContent = msg;
    if (msg) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  }

  function validateAll() {
    let valid = true;
    for (const [name, fn] of Object.entries(validators)) {
      const el = getField(name);
      if (!el) continue;
      const msg = fn(el.value);
      showError(name, msg);
      if (msg) valid = false;
    }
    return valid;
  }

  Object.keys(validators).forEach((name) => {
    const el = getField(name);
    if (!el) return;
    el.addEventListener('blur', () => {
      showError(name, validators[name](el.value));
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) {
        showError(name, validators[name](el.value));
      }
    });
  });

  function setSubmitting(state) {
    submitBtn.disabled = state;
    btnLabel.hidden = state;
    btnSubmitting.hidden = !state;
  }

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    statusEl.textContent = "You're on the waitlist. We'll be in touch soon.";
    statusEl.classList.remove('sr-only');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: bot filled the hidden field
    const honeypot = form.querySelector('[name="company_website"]');
    if (honeypot && honeypot.value.trim()) {
      showSuccess();
      return;
    }

    if (!validateAll()) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      statusEl.textContent = 'Please fix the errors above before submitting.';
      statusEl.classList.remove('sr-only');
      return;
    }

    setSubmitting(true);
    statusEl.textContent = '';
    statusEl.classList.add('sr-only');

    // Placeholder endpoint — show success but warn in console
    if (FORM_ENDPOINT.includes('FORM_ID_TODO')) {
      console.warn(
        '[Laxora] FORM_ENDPOINT is not configured. Submissions are not being captured. ' +
        'Update FORM_ENDPOINT in main.js with a real Formspree ID or API Gateway URL.'
      );
      await new Promise((r) => setTimeout(r, 700));
      showSuccess();
      setSubmitting(false);
      return;
    }

    const data = {
      full_name: getField('full_name').value.trim(),
      office_name: getField('office_name').value.trim(),
      office_type: getField('office_type').value,
      work_email: getField('work_email').value.trim(),
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showSuccess();
      } else {
        throw new Error('Server responded ' + res.status);
      }
    } catch (err) {
      statusEl.textContent =
        'Something went wrong. Please try again or email us at hello@laxora.ai.';
      statusEl.classList.remove('sr-only');
      console.error('[Laxora] Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  });
})();
