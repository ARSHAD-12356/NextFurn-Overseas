import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import imgLounge from '../assets/banners/banner-3.jpg';
import '../styles/footer.css';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Site configuration: edit here ---------- */
// Contact details from the NextFurn Overseas 2026 price lists.
const CONTACT = {
  address: 'Kankarbagh, Patna, Bihar',
  addressNote: 'Corporate Office \u2013 A/3, PC Colony, 800020',
  phone: '+91 99909 26199',
  phoneHref: 'tel:+919990926199',
  phoneNote: 'N.K. Singh \u00B7 +91 96647 61989',
  email: 'nextfurn12@gmail.com',
  emailNote: 'Sales & product enquiries',
};

// Add profile URLs when they exist; icons without a URL render as inactive.
const SOCIAL = [
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'youtube', label: 'YouTube', url: '' },
  { id: 'pinterest', label: 'Pinterest', url: '' },
];

// `href: null` = page not built yet; the item shows but is not a link.
const COLUMNS = [
  { title: 'Quick Links', links: [
    { label: 'Home', href: '#' }, { label: 'About Us', href: null }, { label: 'Our Collections', href: '#products' },
    { label: 'Projects', href: null }, { label: 'Blog', href: null }, { label: 'Contact Us', href: '#contact' },
  ] },
  { title: 'Our Collections', links: [
    { label: 'Office Furniture', href: '#products' }, { label: 'Institutional Furniture', href: '#products' },
    { label: 'Healthcare Furniture', href: '#products' }, { label: 'Public Seating', href: '#products' },
    { label: 'Custom Furniture', href: '#contact' }, { label: 'Executive Collection', href: '#bestsellers' },
  ] },
  { title: 'Support', links: [
    { label: 'FAQs', href: null }, { label: 'Shipping & Delivery', href: null }, { label: 'Returns & Refunds', href: null },
    { label: 'Warranty Policy', href: null }, { label: 'Privacy Policy', href: null }, { label: 'Terms & Conditions', href: null },
  ] },
];

// Set to an API URL when a newsletter service exists. Until then, subscribing opens a pre-filled email.
const NEWSLETTER_ENDPOINT = null;

// Payment logos are decorative; set to false if these methods are not accepted.
const SHOW_PAYMENT_BADGES = true;

const FEATURES = [
  { icon: 'diamond', label: ['Premium', 'Quality'] },
  { icon: 'sofa', label: ['Modern', 'Designs'] },
  { icon: 'gear', label: ['Custom', 'Solutions'] },
  { icon: 'users', label: ['Trusted', 'By 1000+ Clients'] },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chev': return <svg {...c} strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg>;
    case 'mail': return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></svg>;
    case 'lock': return <svg {...c}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
    case 'pin': return <svg {...c}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>;
    case 'phone': return <svg {...c}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></svg>;
    case 'sofa': return <svg {...c}><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" /><path d="M5 17v2M19 17v2" /></svg>;
    case 'gear': return <svg {...c}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    case 'shield': return <svg {...c}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></svg>;
    case 'facebook': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" /></svg>;
    case 'instagram': return <svg {...c} strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" /></svg>;
    case 'linkedin': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 9h2.9v1.4c.4-.8 1.5-1.6 3-1.6 3.1 0 3.6 2 3.6 4.6V19h-3v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v5h-3z" /></svg>;
    case 'youtube': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" /></svg>;
    case 'pinterest': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.3 3C7.3 3 4.8 6.5 4.8 9.5c0 1.8.7 3.4 2.1 4 .2.1.4 0 .5-.3l.2-.8c.1-.3 0-.4-.2-.6a3.2 3.2 0 0 1-.7-2.1c0-2.8 2.1-5.2 5.4-5.2 2.9 0 4.6 1.8 4.6 4.2 0 3.1-1.4 5.8-3.5 5.8-1.1 0-2-.9-1.7-2.1.3-1.4 1-2.9 1-3.9 0-.9-.5-1.6-1.5-1.6-1.2 0-2.1 1.2-2.1 2.8 0 1 .4 1.7.4 1.7l-1.4 6c-.4 1.8-.1 3.9 0 4.1h.2c.1-.2 1.4-1.8 1.9-3.4l.7-2.9c.4.7 1.5 1.4 2.7 1.4 3.6 0 6-3.3 6-7.6C19.6 6.2 16.8 3 12.3 3z" /></svg>;
    default: return null;
  }
}

function FootLink({ link }) {
  const inner = <><span className="ft-chev"><Icon name="chev" /></span>{link.label}</>;
  return link.href
    ? <a className="ft-link" href={link.href}>{inner}</a>
    : <span className="ft-link is-pending" title="Page coming soon">{inner}</span>;
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (NEWSLETTER_ENDPOINT) {
      try {
        const res = await fetch(NEWSLETTER_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: value }) });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ type: 'ok', text: 'Thank you! You are subscribed.' });
        setEmail('');
      } catch {
        setStatus({ type: 'error', text: 'Could not subscribe right now. Please try again later.' });
      }
      return;
    }
    // No newsletter service yet: hand the request to the visitor's email app.
    const subject = encodeURIComponent('Newsletter subscription');
    const body = encodeURIComponent(`Please add ${value} to the NextFurn Overseas newsletter.`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus({ type: 'ok', text: 'Your email app has opened \u2014 send the message to complete your sign-up.' });
  };

  return (
    <div className="ft-news" data-ft-news>
      <div className="ft-news__copy">
        <p className="ft-eyebrow">Stay Connected<span aria-hidden="true" /></p>
        <h2 className="ft-news__title">Get Inspired with<br />Our Latest <span>Collections</span></h2>
        <p className="ft-news__text">Subscribe to our newsletter and be the first to know about new arrivals, exclusive designs and special offers.</p>
      </div>

      <form className="ft-form" onSubmit={onSubmit} noValidate>
        <label className="ft-form__field">
          <span className="visually-hidden">Email address</span>
          <Icon name="mail" />
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
            placeholder="Enter your email address" autoComplete="email" aria-invalid={status?.type === 'error' || undefined} />
          <button type="submit" className="ft-form__btn">
            <span>Subscribe</span>
            <span className="ft-form__circle"><Icon name="arrow" /></span>
          </button>
        </label>
        <p className={`ft-form__note${status ? ` is-${status.type}` : ''}`} role="status">
          {!status && <Icon name="lock" />}
          {status ? status.text : 'We respect your privacy. No spam, ever.'}
        </p>
      </form>

      <div className="ft-news__media" aria-hidden="true">
        <svg className="ft-defs" width="0" height="0" focusable="false">
          <defs>
            {/* Organic left edge of the photo; the rim is the same curve nudged left */}
            <clipPath id="ft-clip-img" clipPathUnits="objectBoundingBox">
              <path d="M0.02,0 H1 V1 H0.26 C0.16,0.9 0.13,0.62 0.1,0.4 C0.07,0.2 0.05,0.08 0.02,0 Z" />
            </clipPath>
            <clipPath id="ft-clip-rim" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H1 V1 H0.235 C0.135,0.9 0.105,0.62 0.075,0.4 C0.045,0.2 0.025,0.08 0,0 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="ft-news__rim" />
        <div className="ft-news__img"><img src={imgLounge} alt="" loading="lazy" decoding="async" /></div>
      </div>
    </div>
  );
}

function Foliage({ side }) {
  return (
    <svg className={`ft-leaves ft-leaves--${side}`} viewBox="0 0 220 420" aria-hidden="true">
      <defs>
        <linearGradient id={`ft-leaf-${side}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f9a45" />
          <stop offset="1" stopColor="#1f5c2c" />
        </linearGradient>
      </defs>
      <g fill={`url(#ft-leaf-${side})`}>
        <path d="M10 420C14 330 50 260 120 225c-28 52-58 120-74 195z" />
        <path d="M0 330c30-60 80-96 150-106-46 30-90 70-118 120z" opacity=".85" />
        <path d="M30 420c40-60 92-100 170-112-56 30-102 70-136 112z" opacity=".75" />
        <path d="M0 200c40-30 92-38 140-20-50 6-96 26-128 58z" opacity=".7" />
        <path d="M18 270C24 190 64 130 136 100c-30 50-60 104-86 176z" opacity=".9" />
      </g>
      <g fill="none" stroke="#7fbf6a" strokeWidth="1.2" opacity=".55">
        <path d="M14 418c20-78 50-140 104-190" /><path d="M22 268c18-60 46-114 112-164" /><path d="M4 328c34-48 76-80 140-100" />
      </g>
    </svg>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      gsap.from(q('[data-ft-news]'), { autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.from(q('.ft-news__img img'), { scale: 1.12, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.from(q('[data-ft-col]'), { autoAlpha: 0, y: 26, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: q('.ft-main')[0], start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.from(q('.ft-col__line'), { scaleX: 0, transformOrigin: 'left center', duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: q('.ft-main')[0], start: 'top 85%', toggleActions: 'play none none reverse' } });
    });
    return () => mm.revert();
  }, []);

  return (
    <footer id="site-footer" className="ft" ref={ref}>
      <Newsletter />

      <div className="ft-body">
        <svg className="ft-map" viewBox="0 0 1000 500" aria-hidden="true">
          <defs>
            <pattern id="ft-dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.6" fill="#7aa48e" /></pattern>
          </defs>
          <g fill="url(#ft-dots)">
            <path d="M80 90c60-40 170-50 240-20 30 14 20 50-10 70-30 20-40 50-70 70-30 20-60 10-80-20-20-30-60-40-80-60s-20-30 0-40z" />
            <path d="M260 280c40-10 80 10 90 50 10 50-20 110-50 140-20 20-40 0-40-30s-30-60-20-100c4-30 0-55 20-60z" />
            <path d="M440 90c40-30 110-30 140-10 20 14 0 40-20 50-30 14-20 40-50 40s-60-20-70-40c-6-14-10-30 0-40z" />
            <path d="M470 210c40-20 100-10 120 30 20 40 10 100-20 140-30 40-60 30-70 0-10-34-30-60-40-100-6-30-10-56 10-70z" />
            <path d="M580 80c80-40 230-40 320 0 40 18 30 60-10 80-50 24-60 60-110 70-60 12-90-20-130-30-40-10-90-10-100-40-10-30 0-60 30-80z" />
            <path d="M800 320c40-16 100-10 120 20 14 24-10 60-50 66-40 6-80-6-90-30-8-20 0-46 20-56z" />
          </g>
        </svg>
        <Foliage side="left" />
        <Foliage side="right" />

        <div className="ft-main">
          <div className="ft-brand" data-ft-col>
            <div className="ft-logo">
              <img className="ft-logo__icon" src={logoIcon} alt="" width="553" height="466" loading="lazy" />
              <img className="ft-logo__word" src={logoWordmark} alt="NextFurn Overseas" width="900" height="184" loading="lazy" />
            </div>
            <p className="ft-tagline"><span aria-hidden="true" />Furniture That Inspires<span aria-hidden="true" /></p>
            <p className="ft-brand__text">
              NextFurn Overseas is a global furniture brand dedicated to creating modern, functional and elegant spaces for offices,
              institutions, healthcare facilities and public environments.
            </p>
            <ul className="ft-social">
              {SOCIAL.map((s) => (
                <li key={s.id}>
                  {s.url
                    ? <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon name={s.id} /></a>
                    : <span className="is-pending" title={`${s.label} \u2014 coming soon`} aria-label={`${s.label} (coming soon)`}><Icon name={s.id} /></span>}
                </li>
              ))}
            </ul>
            <ul className="ft-features">
              {FEATURES.map((f) => (
                <li key={f.icon}><span className="ft-features__icon"><Icon name={f.icon} /></span>{f.label[0]}<br />{f.label[1]}</li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="ft-col" aria-label={col.title} data-ft-col>
              <h3 className="ft-col__title">{col.title}</h3>
              <span className="ft-col__line" aria-hidden="true" />
              <ul>{col.links.map((l) => <li key={l.label}><FootLink link={l} /></li>)}</ul>
            </nav>
          ))}

          <div className="ft-col ft-contact" data-ft-col>
            <h3 className="ft-col__title">Get In Touch</h3>
            <span className="ft-col__line" aria-hidden="true" />
            <ul>
              <li><span className="ft-contact__icon"><Icon name="pin" /></span><span><strong>{CONTACT.address}</strong>{CONTACT.addressNote}</span></li>
              <li><span className="ft-contact__icon"><Icon name="phone" /></span><span><a href={CONTACT.phoneHref}><strong>{CONTACT.phone}</strong></a>{CONTACT.phoneNote}</span></li>
              <li><span className="ft-contact__icon"><Icon name="mail" /></span><span><a href={`mailto:${CONTACT.email}`}><strong>{CONTACT.email}</strong></a>{CONTACT.emailNote}</span></li>
            </ul>
            <a className="ft-cta" href={`mailto:${CONTACT.email}`}>
              <span>Contact Us</span>
              <span className="ft-cta__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </div>

        <div className="ft-bottom">
          <p>&copy; {year} NextFurn Overseas. All rights reserved.</p>
          <p className="ft-bottom__slogan">Designing Better Spaces Across the World<span aria-hidden="true" /></p>
          {SHOW_PAYMENT_BADGES && (
            <div className="ft-pay" aria-label="Payment options">
              <span className="ft-pay__visa">VISA</span>
              <span className="ft-pay__mc" aria-label="Mastercard"><i /><i /></span>
              <span className="ft-pay__paypal">PayPal</span>
              <span className="ft-pay__secure"><Icon name="shield" />Secure<br />Payments</span>
            </div>
          )}
        </div>

        <svg className="ft-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="ft-wave-g" x1="0" x2="1">
              <stop offset="0" stopColor="#8a4517" />
              <stop offset="0.3" stopColor="#e6a34a" />
              <stop offset="0.55" stopColor="#c87935" />
              <stop offset="0.8" stopColor="#f0b866" />
              <stop offset="1" stopColor="#8a4517" />
            </linearGradient>
          </defs>
          <path className="ft-wave__fill" d="M0,60 C240,110 420,10 720,52 C1000,92 1200,20 1440,64 L1440,120 L0,120 Z" />
          <path className="ft-wave__line" d="M0,60 C240,110 420,10 720,52 C1000,92 1200,20 1440,64" stroke="url(#ft-wave-g)" />
        </svg>
      </div>
    </footer>
  );
}