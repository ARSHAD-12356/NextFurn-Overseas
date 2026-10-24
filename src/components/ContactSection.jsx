import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgBg from '../assets/banners/banner-2.jpg';
import logoIcon from '../assets/banners/logo-icon.png';
import '../styles/contact-section.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT = {
  phone: '+91 99909 26199',
  phoneHref: 'tel:+919990926199',
  phone2: '+91 96647 61989',
  phone2Href: 'tel:+919664761989',
  email: 'nextfurn12@gmail.com',
  address: 'Ground Floor, A/3, PC Colony, Kankarbagh, Patna \u2013 800020',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=PC+Colony+Kankarbagh+Patna+800020',
};

// Set to an API URL when an enquiry service exists; until then the form opens a pre-filled email.
const ENQUIRY_ENDPOINT = null;

const INTERESTS = ['Office Furniture', 'Sofa & Lounge', 'Education Furniture', 'Healthcare Furniture', 'Public Seating', 'Cafeteria Furniture', 'Storage & Utility', 'Custom Project'];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'phone': return <svg {...c}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case 'mail': return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></svg>;
    case 'pin': return <svg {...c}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>;
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'send': return <svg {...c} strokeWidth="1.9"><path d="M21 3 10 14" /><path d="m21 3-7 18-4-7-7-4z" /></svg>;
    case 'chev': return <svg {...c} strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
    default: return null;
  }
}

const EMPTY = { name: '', email: '', phone: '', company: '', interest: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !/^[+\d][\d\s-]{6,16}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!v.interest) e.interest = 'Please choose what you are interested in.';
  if (v.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).';
  return e;
}

function Field({ id, label, error, children, full }) {
  return (
    <div className={`ct-field${error ? ' has-error' : ''}${full ? ' ct-field--full' : ''}`}>
      {children}
      <label htmlFor={id}>{label}</label>
      <span className="ct-field__line" aria-hidden="true" />
      {error && <span className="ct-field__error" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    setStatus(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.keys(er).length) {
      setStatus({ type: 'error', text: 'Please check the highlighted fields.' });
      return;
    }
    const details = [`Name: ${values.name}`, `Email: ${values.email}`];
    if (values.phone.trim()) details.push(`Phone: ${values.phone}`);
    if (values.company.trim()) details.push(`Company: ${values.company}`);
    details.push(`Interested in: ${values.interest}`);
    const lines = `${details.join('\n')}\n\n${values.message}`;

    if (ENQUIRY_ENDPOINT) {
      setSending(true);
      try {
        const res = await fetch(ENQUIRY_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ type: 'ok', text: 'Thank you! Your enquiry has been sent. Our team will get back to you soon.' });
        setValues(EMPTY);
      } catch {
        setStatus({ type: 'error', text: `Could not send right now. Please email ${CONTACT.email} or call ${CONTACT.phone}.` });
      } finally {
        setSending(false);
      }
      return;
    }
    // No enquiry service yet: hand the message to the visitor's email app, ready to send.
    const subject = encodeURIComponent(`Enquiry: ${values.interest} \u2014 ${values.name}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    setStatus({ type: 'ok', text: 'Your email app has opened with your enquiry \u2014 press send to reach our team.' });
  };

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' } })
        .from(q('.ct-bg img'), { scale: 1.1, duration: 1.6, ease: 'power2.out' })
        .from(q('[data-ct-info]'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, '<0.1')
        .from(q('.ct-form'), { autoAlpha: 0, y: 40, scale: 0.97, duration: 1 }, '<0.2')
        .from(q('.ct-field, .ct-chips, .ct-submit'), { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.05 }, '<0.3');
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="contact" className="ct" ref={ref} aria-labelledby="ct-title">
      <div className="ct-bg" aria-hidden="true"><img src={imgBg} alt="" loading="lazy" decoding="async" /></div>
      <div className="ct-shade" aria-hidden="true" />
      <svg className="ct-top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="ct-top__fill" d="M0,0 H1440 V40 C1180,110 900,120 720,90 C520,58 260,40 0,96 Z" />
        <path className="ct-top__line" d="M1440,40 C1180,110 900,120 720,90 C520,58 260,40 0,96" />
      </svg>
      <img className="ct-mark" src={logoIcon} alt="" aria-hidden="true" />

      <div className="ct-inner">
        <div className="ct-info">
          <p className="ct-eyebrow" data-ct-info>Contact Us<span aria-hidden="true" /></p>
          <h2 id="ct-title" className="ct-title" data-ct-info>Let&rsquo;s Create Spaces<br />That <span>Work for You</span></h2>
          <p className="ct-text" data-ct-info>
            Planning an office, school, hospital or public space? Tell us what you need and our team will help you choose the right
            furniture, finishes and quantities.
          </p>

          <ul className="ct-cards">
            <li data-ct-info>
              <span className="ct-cards__icon"><Icon name="phone" /></span>
              <span>
                <small>Call Us</small>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
              </span>
            </li>
            <li data-ct-info>
              <span className="ct-cards__icon"><Icon name="mail" /></span>
              <span>
                <small>Email Us</small>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </span>
            </li>
            <li data-ct-info>
              <span className="ct-cards__icon"><Icon name="pin" /></span>
              <span>
                <small>Corporate Office</small>
                <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">{CONTACT.address}</a>
              </span>
            </li>
          </ul>
        </div>

        <form className="ct-form" onSubmit={onSubmit} noValidate>
          <span className="ct-form__badge" aria-hidden="true"><img src={logoIcon} alt="" /></span>
          <h3 className="ct-form__title">Send Us an Enquiry</h3>
          <p className="ct-form__sub">We usually need your name, email and a short note to get started.</p>

          <div className="ct-grid">
            <Field id="ct-name" label="Full Name *" error={errors.name}>
              <input id="ct-name" value={values.name} onChange={set('name')} placeholder=" " autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'ct-name-err' : undefined} />
            </Field>
            <Field id="ct-email" label="Email Address *" error={errors.email}>
              <input id="ct-email" type="email" value={values.email} onChange={set('email')} placeholder=" " autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'ct-email-err' : undefined} />
            </Field>
            <Field id="ct-phone" label="Phone Number" error={errors.phone}>
              <input id="ct-phone" type="tel" value={values.phone} onChange={set('phone')} placeholder=" " autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'ct-phone-err' : undefined} />
            </Field>
            <Field id="ct-company" label="Company / Organisation">
              <input id="ct-company" value={values.company} onChange={set('company')} placeholder=" " autoComplete="organization" />
            </Field>
          </div>

          <div className={`ct-chips${errors.interest ? ' has-error' : ''}`} role="radiogroup" aria-label="Interested in">
            <span className="ct-chips__label">Interested in *</span>
            <div>
              {INTERESTS.map((it) => (
                <button key={it} type="button" role="radio" aria-checked={values.interest === it}
                  className={`ct-chip${values.interest === it ? ' is-active' : ''}`}
                  onClick={() => set('interest')({ target: { value: it } })}>
                  {it}
                </button>
              ))}
            </div>
            {errors.interest && <span className="ct-field__error">{errors.interest}</span>}
          </div>

          <Field id="ct-message" label="Your Message *" error={errors.message} full>
            <textarea id="ct-message" rows="4" value={values.message} onChange={set('message')} placeholder=" " aria-invalid={!!errors.message} aria-describedby={errors.message ? 'ct-message-err' : undefined} />
          </Field>

          <div className="ct-submit">
            <button type="submit" className="ct-btn" disabled={sending}>
              <span>{sending ? 'Sending\u2026' : 'Send Enquiry'}</span>
              <span className="ct-btn__circle"><Icon name="send" /></span>
            </button>
            {status && <p className={`ct-status is-${status.type}`} role="status">{status.text}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}