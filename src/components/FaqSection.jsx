import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgHero from '../assets/products/lounge-corner.jpg';
import imgSupport from '../assets/banners/banner-1.jpg';
import '../styles/faq-section.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT = {
  phone: '+91 99909 26199',
  phoneHref: 'tel:+919990926199',
  phoneNote: 'N.K. Singh \u00B7 +91 96647 61989',
  email: 'nextfurn12@gmail.com',
  emailNote: 'Sales & product enquiries',
};

const ASK = `call ${CONTACT.phone} or email ${CONTACT.email}`;

/* Answers use the terms printed in the NextFurn Overseas 2026 price lists; anything not stated there
   points the visitor to the team instead of promising a policy. */
const FAQ = [
  { id: 'general', label: 'General Questions', icon: 'question', heading: ['Common Questions', 'About NextFurn'], items: [
    ['What is NextFurn Overseas?', 'NextFurn Overseas is a global furniture brand dedicated to creating modern, functional and elegant spaces for offices, institutions, healthcare facilities and public environments. We combine innovative design, premium quality and expert craftsmanship to deliver furniture solutions that inspire people and perform for generations.'],
    ['What types of furniture do you offer?', 'Our range covers office chairs and executive tables, modular workstations, sofas and lounge seating, education furniture, healthcare beds, public and waiting seating, cafeteria furniture and steel storage.'],
    ['Do you provide customized furniture solutions?', `Yes, we work on custom requirements. Share your space, quantities and preferred finishes with our team (${ASK}) and we will advise on options and pricing.`],
    ['How can I place an order?', `Note the model numbers you need (for example NF-GMS 1), then ${ASK}. We share a quotation or proforma invoice, and the order is confirmed on receipt of the advance payment.`],
    ['Do you ship internationally?', `Please share your delivery location with our team (${ASK}). Availability and transport are confirmed for each order; transportation and installation charges are extra as applicable.`],
    ['What is your warranty policy?', 'Warranty covers manufacturing defects only and is product-wise: office chairs in our NFSOC range carry a 3 year warranty, and our 2026 special collection carries 1 year. The applicable warranty is confirmed on your quotation.'],
    ['How can I contact your support team?', `Call N.K. Singh on ${CONTACT.phone} or Dheeraj Kashyap on +91 96647 61989, or email ${CONTACT.email}.`],
  ] },
  { id: 'products', label: 'Our Products', icon: 'chair', heading: ['Questions About', 'Our Products'], items: [
    ['What furniture categories are available?', 'Office furniture, sofa & lounge, education, healthcare, public seating, cafeteria and storage & utility \u2014 see the Our Products section above for featured models and prices.'],
    ['How can I compare product specifications?', 'Every product in our price lists has a model number, specification, size and price. Use the model numbers when you ask our team for a side-by-side comparison.'],
    ['Are product images representative of the actual furniture?', 'Yes, but colours and finishes shown are for reference only; the actual product may vary slightly.'],
  ] },
  { id: 'custom', label: 'Customization', icon: 'tools', heading: ['Questions About', 'Customization'], items: [
    ['Do you provide customized furniture solutions?', `Yes. Tell us about your space and requirements (${ASK}) and we will suggest suitable options.`],
    ['Can I request different sizes or finishes?', 'Many models are already listed in several sizes and upholsteries \u2014 for example leatherette or pure leather sofas, SS 202 or SS 304 seating, and multiple table sizes. For anything else, ask our team.'],
    ['How can I discuss a custom project?', `Share drawings, quantities and timelines by email at ${CONTACT.email}, or call ${CONTACT.phone}.`],
  ] },
  { id: 'ordering', label: 'Ordering & Payment', icon: 'card', heading: ['Ordering', '& Payment'], items: [
    ['How can I place an order?', `Send us the model numbers and quantities (${ASK}). We confirm availability and share a proforma invoice.`],
    ['How can I request a quotation?', `Email ${CONTACT.email} with the products, quantities and delivery location. Prices are exclusive of GST and other applicable taxes.`],
    ['Which payment terms apply?', 'Orders are taken against advance payment on the proforma invoice; for the 2026 special collection this is 50% with order confirmation and the balance before dispatch. Your exact terms are stated on the quotation.'],
    ['Can I change an order after confirming it?', 'As per our price list terms, orders once confirmed cannot be cancelled or modified, so please check quantities and finishes before confirming.'],
  ] },
  { id: 'shipping', label: 'Shipping & Delivery', icon: 'truck', heading: ['Shipping', '& Delivery'], items: [
    ['Do you ship internationally?', `Please contact us with your location (${ASK}); delivery options are confirmed per order.`],
    ['How long does delivery take?', 'For our 2026 special collection, delivery is 2 to 3 weeks from the date of order confirmation, subject to availability. Timelines for other ranges are confirmed on your quotation.'],
    ['Are transport and installation included?', 'No. Transportation and installation charges are extra as applicable.'],
    ['How can I check my order status?', `Call ${CONTACT.phone} or email ${CONTACT.email} with your order details.`],
  ] },
  { id: 'returns', label: 'Returns & Warranty', icon: 'box', heading: ['Returns', '& Warranty'], items: [
    ['What is your warranty policy?', 'Warranty is against manufacturing defects only and is product-wise \u2014 3 years on NFSOC office chairs and 1 year on the 2026 special collection.'],
    ['How do I report a damaged product?', `Please inspect goods on delivery and contact us right away (${ASK}). As per our terms, the company is not responsible for damage caused during transit.`],
    ['Can I return or replace a product?', `Confirmed orders cannot be cancelled or modified. For a manufacturing defect covered by warranty, contact us (${ASK}).`],
  ] },
  { id: 'care', label: 'Care & Maintenance', icon: 'gear', heading: ['Care', '& Maintenance'], items: [
    ['How should I care for wooden furniture?', 'Dust with a soft dry cloth, wipe spills straight away, and keep tables away from prolonged direct sunlight, heat and standing water.'],
    ['How can I clean upholstery?', 'Vacuum fabric regularly and blot spills rather than rubbing. Wipe leatherette and leather with a damp cloth and mild soap, then dry.'],
    ['How can I maintain furniture over time?', 'Check and tighten fittings periodically, keep chair castors and mechanisms free of dust, and avoid loading furniture beyond its intended use.'],
  ] },
  { id: 'partners', label: 'Partnerships', icon: 'users', heading: ['Business', '& Partnerships'], items: [
    ['Do you work with commercial projects?', 'Yes. Our ranges are made for offices, institutions, healthcare facilities and public spaces.'],
    ['How can businesses discuss bulk requirements?', `Email ${CONTACT.email} with your quantities and delivery location, or call ${CONTACT.phone}.`],
    ['How can I enquire about a partnership?', `Write to ${CONTACT.email} with a short note about your business and we will get back to you.`],
  ] },
];

const BENEFITS = [
  { icon: 'truck', title: 'Fast & Reliable Support', text: 'Quick answers to your queries' },
  { icon: 'shield', title: 'Trusted Guidance', text: 'From experts in furniture solutions' },
  { icon: 'gear', title: 'Detailed Information', text: 'Products, customization & more' },
  { icon: 'users', title: 'Personalized Assistance', text: 'We\u2019re here for you always' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chev': return <svg {...c} strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg>;
    case 'question': return <svg {...c} strokeWidth="1.9"><path d="M9.2 9a3 3 0 1 1 4.3 2.7c-.9.4-1.5 1.2-1.5 2.1v.4" /><circle cx="12" cy="17.6" r="0.6" fill="currentColor" /></svg>;
    case 'chair': return <svg {...c}><path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" /><path d="M4 12a2 2 0 0 1 4 0v2h8v-2a2 2 0 0 1 4 0v4H4z" /><path d="M6 16v4M18 16v4" /></svg>;
    case 'tools': return <svg {...c}><path d="m4 20 9-9" /><path d="M13.5 4.5a4 4 0 0 0 5.6 5.6L21 12l-2 2-3.5-3.5" /><path d="m20 20-9-9" /><path d="M4 4l3 1 1 3L5 11 2 8z" /></svg>;
    case 'card': return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>;
    case 'truck': return <svg {...c}><path d="M2 6h11v10H2z" /><path d="M13 9h4.5L21 12.5V16h-8z" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
    case 'box': return <svg {...c}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.3l8 4.5" /></svg>;
    case 'gear': return <svg {...c}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    case 'shield': return <svg {...c}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></svg>;
    case 'headset': return <svg {...c}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.7-1.8 2.5-5 2.5" /></svg>;
    case 'phone': return <svg {...c}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case 'mail': return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></svg>;
    default: return null;
  }
}

function AccordionItem({ q, a, open, onToggle, id }) {
  return (
    <li className={`fq-item${open ? ' is-open' : ''}`}>
      <h4 className="fq-item__head">
        <button type="button" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          <span className="fq-item__q" aria-hidden="true">Q</span>
          <span className="fq-item__title">{q}</span>
          <span className="fq-item__toggle" aria-hidden="true"><i /><i /></span>
        </button>
      </h4>
      <div className="fq-item__panel" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
        <div><p>{a}</p></div>
      </div>
    </li>
  );
}

export default function FaqSection() {
  const ref = useRef(null);
  const [catId, setCatId] = useState(FAQ[0].id);
  const [openIndex, setOpenIndex] = useState(0);
  const cat = FAQ.find((c) => c.id === catId);

  const choose = (id) => {
    setCatId(id);
    setOpenIndex(0);
  };

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const st = (t, start = 'top 80%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(q('.fq-hero')[0]) })
        .from(q('.fq-hero__img img'), { autoAlpha: 0, scale: 1.08, duration: 1.3 })
        .from(q('[data-fq-hero]'), { autoAlpha: 0, y: 22, duration: 0.8, stagger: 0.1 }, '<0.1')
        .from(q('.fq-help'), { autoAlpha: 0, x: 26, duration: 0.8 }, '<0.3');
      gsap.from(q('.fq-benefit'), { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: st(q('.fq-benefits')[0], 'top 90%') });
      gsap.from(q('.fq-cat'), { autoAlpha: 0, x: -16, duration: 0.5, stagger: 0.05, ease: 'power3.out', scrollTrigger: st(q('.fq-main')[0]) });
      gsap.from(q('.fq-center'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: st(q('.fq-main')[0]) });
      gsap.from(q('.fq-card'), { autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: st(q('.fq-main')[0]) });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="faq" className="fq" ref={ref} aria-labelledby="fq-title">
      <svg className="fq-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="fq-clip-hero" clipPathUnits="objectBoundingBox">
            <path d="M0.12,0 H1 V1 H0.02 C0.1,0.86 0.16,0.7 0.14,0.5 C0.12,0.32 0.08,0.14 0.12,0 Z" />
          </clipPath>
          <clipPath id="fq-clip-hero-rim" clipPathUnits="objectBoundingBox">
            <path d="M0.112,0 H1 V1 H0.008 C0.088,0.86 0.148,0.7 0.128,0.5 C0.108,0.32 0.068,0.14 0.112,0 Z" />
          </clipPath>
          <clipPath id="fq-clip-card-img" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.62 C0.86,0.72 0.66,0.8 0.42,0.84 C0.24,0.87 0.1,0.93 0,1 Z" />
          </clipPath>
          <clipPath id="fq-clip-card-rim" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.66 C0.86,0.76 0.66,0.84 0.42,0.88 C0.24,0.91 0.1,0.97 0,1.04 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ---------- Hero ---------- */}
      <div className="fq-hero">
        <div className="fq-hero__media" aria-hidden="true">
          <div className="fq-hero__rim" />
          <div className="fq-hero__img"><img src={imgHero} alt="" loading="lazy" decoding="async" /></div>
        </div>
        <div className="fq-hero__content">
          <p className="fq-eyebrow" data-fq-hero>FAQ<span aria-hidden="true" /></p>
          <h2 id="fq-title" className="fq-hero__title" data-fq-hero>Frequently Asked<br /><span>Questions</span></h2>
          <p className="fq-hero__text" data-fq-hero>
            Find quick answers to common questions about our furniture collections, customization, ordering process, shipping and more.
            If you need further assistance, our team is always here to help.
          </p>
        </div>
        <aside className="fq-help">
          <span className="fq-help__icon"><Icon name="headset" /></span>
          <div>
            <h3>Need More Help?</h3>
            <p>Our team is always ready to assist you with any questions.</p>
            <a className="fq-btn fq-btn--sm" href="#contact"><span>Contact Support</span><span className="fq-btn__circle"><Icon name="arrow" /></span></a>
          </div>
        </aside>
      </div>

      {/* ---------- Benefits strip ---------- */}
      <ul className="fq-benefits">
        {BENEFITS.map((b) => (
          <li key={b.title} className="fq-benefit">
            <span className="fq-benefit__icon"><Icon name={b.icon} /></span>
            <span><strong>{b.title}</strong><span>{b.text}</span></span>
          </li>
        ))}
      </ul>

      {/* ---------- Main ---------- */}
      <div className="fq-main">
        <nav className="fq-cats" aria-label="FAQ categories">
          <ul>
            {FAQ.map((c) => (
              <li key={c.id}>
                <button type="button" className={`fq-cat${c.id === catId ? ' is-active' : ''}`} aria-pressed={c.id === catId} onClick={() => choose(c.id)}>
                  <span className="fq-cat__icon"><Icon name={c.icon} /></span>
                  <span className="fq-cat__label">{c.label}</span>
                  <span className="fq-cat__chev"><Icon name="chev" /></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fq-center" aria-live="polite">
          <p className="fq-eyebrow fq-eyebrow--dark">{cat.label}<span aria-hidden="true" /></p>
          <h3 className="fq-center__title">{cat.heading[0]} <span>{cat.heading[1]}</span></h3>
          <ul className="fq-list" key={catId}>
            {cat.items.map(([q, a], i) => (
              <AccordionItem key={q} id={`fq-${catId}-${i}`} q={q} a={a} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            ))}
          </ul>
        </div>

        <aside className="fq-card">
          <div className="fq-card__media" aria-hidden="true">
            <div className="fq-card__rim" />
            <div className="fq-card__img"><img src={imgSupport} alt="" loading="lazy" decoding="async" /></div>
          </div>
          <div className="fq-card__body">
            <h3 className="fq-card__title">Still Have <span>Questions?</span></h3>
            <p>Our team is here to help you with product selection, customization, orders, shipping or any other inquiries.</p>
            <ul className="fq-card__contact">
              <li><span className="fq-card__ic"><Icon name="phone" /></span><span><a href={CONTACT.phoneHref}><strong>{CONTACT.phone}</strong></a>{CONTACT.phoneNote}</span></li>
              <li><span className="fq-card__ic"><Icon name="mail" /></span><span><a href={`mailto:${CONTACT.email}`}><strong>{CONTACT.email}</strong></a>{CONTACT.emailNote}</span></li>
            </ul>
            <a className="fq-btn" href="#contact"><span>Contact Us</span><span className="fq-btn__circle"><Icon name="arrow" /></span></a>
          </div>
        </aside>
      </div>

      <svg className="fq-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="fq-wave-g" x1="0" x2="1">
            <stop offset="0" stopColor="#b85a22" stopOpacity="0" />
            <stop offset="0.2" stopColor="#c87935" />
            <stop offset="0.5" stopColor="#e6a34a" />
            <stop offset="0.8" stopColor="#c87935" />
            <stop offset="1" stopColor="#b85a22" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,20 C260,80 520,86 760,62 C1000,38 1220,40 1440,70" fill="none" stroke="url(#fq-wave-g)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  );
}