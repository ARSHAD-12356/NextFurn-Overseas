import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgOffice from '../assets/banners/banner-1.jpg';
import imgLounge from '../assets/banners/banner-3.jpg';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import '../styles/about-section.css';

gsap.registerPlugin(ScrollTrigger);

// Set this when a brand film exists; until then the play button is shown as "coming soon".
const STORY_VIDEO_URL = null;

const BADGE_ROWS = [
  { icon: 'diamond', label: 'Global Presence' },
  { icon: 'gear', label: 'Customized Solutions' },
  { icon: 'users', label: 'Trusted Partnerships' },
];

const STATS = [
  { icon: 'users', value: '1000+', title: 'Happy Clients', text: 'Trusted by organizations worldwide' },
  { icon: 'building', value: '50+', title: 'Project Categories', text: 'Offices, Healthcare, Institutions & More' },
  { icon: 'globe', value: '10+', title: 'Countries Served', text: 'Delivering quality across the globe' },
  { icon: 'shield', value: '98%', title: 'Client Satisfaction', text: 'Built on trust and quality' },
];

const FEATURES = [
  { icon: 'chair', title: 'Modern & Functional Designs', text: 'Beautiful furniture that fits real-world needs.' },
  { icon: 'gear', title: 'Premium Quality Materials', text: 'Built to last with global manufacturing standards.' },
  { icon: 'leaf', title: 'Sustainable Approach', text: 'Eco-friendly furniture for a greener future.' },
  { icon: 'users', title: 'Client-Centric Solutions', text: 'Tailored designs for every space and industry.' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'play': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></svg>;
    case 'gear': return <svg {...c}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    case 'building': return <svg {...c}><path d="M4 21V4h10v17M14 9h6v12M2 21h20" /><path d="M7 8h1M10 8h1M7 12h1M10 12h1M7 16h1M10 16h1M17 13h1M17 17h1" /></svg>;
    case 'globe': return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" /></svg>;
    case 'shield': return <svg {...c}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></svg>;
    case 'chair': return <svg {...c}><path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" /><path d="M4 12a2 2 0 0 1 4 0v2h8v-2a2 2 0 0 1 4 0v4H4z" /><path d="M6 16v4M18 16v4" /></svg>;
    case 'leaf': return <svg {...c}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 14 10" /></svg>;
    default: return null;
  }
}

/* Counts up to the value, holds it, then starts again; only while the stats bar is on screen. */
const COUNT_MS = 1600;
const HOLD_MS = 2500;

function Counter({ value }) {
  const [, num, suffix] = value.match(/^(\d+)(.*)$/);
  const target = Number(num);
  const ref = useRef(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    let hold = 0;
    let visible = false;

    const run = () => {
      cancelAnimationFrame(raf);
      clearTimeout(hold);
      if (!visible) return;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
        else hold = setTimeout(run, HOLD_MS);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else { cancelAnimationFrame(raf); clearTimeout(hold); setShown(target); }
    }, { threshold: 0.3 });
    io.observe(ref.current);

    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(hold); };
  }, [target]);

  return (
    <strong className="ab-stat__value" ref={ref} aria-label={value}>
      <span aria-hidden="true">{shown}{suffix}</span>
    </strong>
  );
}

function PlayButton({ url, label, className }) {
  const inner = <span className="ab-play__ring"><Icon name="play" /></span>;
  return url
    ? <a className={`ab-play ${className}`} href={url} target="_blank" rel="noopener noreferrer">{inner}<span>{label}</span></a>
    : <span className={`ab-play ${className} is-pending`} title="Video coming soon">{inner}<span>{label}</span></span>;
}

export default function AboutSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const st = (t, start = 'top 80%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(q('.ab-hero')[0]) })
        .from(q('.ab-hero__media img'), { autoAlpha: 0, scale: 1.08, duration: 1.4 })
        .from(q('[data-ab-hero]'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, '<0.1')
        .from(q('.ab-badge'), { autoAlpha: 0, scale: 0.9, duration: 0.8 }, '<0.3')
        .from(q('.ab-caption'), { autoAlpha: 0, x: 24, duration: 0.7 }, '<0.2');
      gsap.from(q('.ab-stat'), { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(q('.ab-stats')[0], 'top 90%') });
      gsap.from(q('[data-ab-why]'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(q('.ab-why')[0]) });
      gsap.from(q('.ab-card'), { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(q('.ab-cards')[0], 'top 88%') });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(q('.ab-story')[0]) })
        .from(q('.ab-story__media'), { autoAlpha: 0, x: -30, duration: 1 })
        .from(q('[data-ab-story]'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, '<0.2');
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="ab" ref={ref} aria-labelledby="ab-title">
      <svg className="ab-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* Office photo: organic left edge that sweeps out from under the green panel */}
          <clipPath id="ab-clip-office" clipPathUnits="objectBoundingBox">
            <path d="M0.04,0 H1 V1 H0.1 C0.06,0.86 0.07,0.7 0.04,0.55 C0.01,0.4 0,0.24 0.02,0.1 C0.025,0.05 0.03,0.02 0.04,0 Z" />
          </clipPath>
          <clipPath id="ab-clip-office-rim" clipPathUnits="objectBoundingBox">
            <path d="M0.034,0 H1 V1 H0.094 C0.054,0.86 0.064,0.7 0.034,0.55 C0.004,0.4 -0.006,0.24 0.014,0.1 C0.019,0.05 0.024,0.02 0.034,0 Z" />
          </clipPath>
          {/* Lounge photo: big curved right edge */}
          <clipPath id="ab-clip-lounge" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.86 C0.93,0.08 0.98,0.24 0.97,0.42 C0.96,0.62 0.9,0.78 0.94,0.9 C0.96,0.95 0.98,0.98 1,1 H0 Z" />
          </clipPath>
          <clipPath id="ab-clip-lounge-rim" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.875 C0.945,0.08 0.995,0.24 0.985,0.42 C0.975,0.62 0.915,0.78 0.955,0.9 C0.975,0.95 0.99,0.98 1.01,1 H0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ---------- Divider between the banner carousel and About ---------- */}
      <div className="ab-divider" aria-hidden="true">
        <span className="ab-divider__line" />
        <span className="ab-divider__badge"><img src={logoIcon} alt="" width="553" height="466" loading="lazy" /></span>
        <span className="ab-divider__text">Know Us Better</span>
        <span className="ab-divider__line" />
      </div>

      {/* ---------- Hero ---------- */}
      <div className="ab-hero">
        <div className="ab-hero__media" aria-hidden="true">
          <div className="ab-hero__rim" />
          <div className="ab-hero__img"><img src={imgOffice} alt="" loading="lazy" decoding="async" /></div>
        </div>

        <div className="ab-hero__content">
          <p className="ab-eyebrow" data-ab-hero>About NextFurn Overseas<span aria-hidden="true" /></p>
          <h2 id="ab-title" className="ab-hero__title" data-ab-hero>Designing<br /><span>Better Spaces</span><br />Across the World</h2>
          <p className="ab-hero__text" data-ab-hero>
            NextFurn Overseas is a global furniture brand dedicated to creating modern, functional and elegant spaces for offices,{' '}
            <span>institutions, healthcare facilities and public environments.</span> We combine world-class design, quality craftsmanship
            and innovative solutions to transform the way people work, learn, heal and connect.
          </p>
          <div className="ab-hero__actions" data-ab-hero>
            <a className="ab-btn" href="#products"><span>Our Collections</span><span className="ab-btn__circle"><Icon name="arrow" /></span></a>
            <PlayButton url={STORY_VIDEO_URL} label="Watch Our Story" className="ab-play--inline" />
          </div>
        </div>

        <div className="ab-badge">
          <p className="ab-badge__years"><strong>10+</strong><span>Years of<br />Excellence</span></p>
          <ul>
            {BADGE_ROWS.map((r) => (
              <li key={r.label}><span className="ab-badge__icon"><Icon name={r.icon} /></span>{r.label}</li>
            ))}
          </ul>
        </div>

        <a className="ab-caption" href="#products">
          <span>Furniture That Inspires<br />People &amp; Spaces</span>
          <span className="ab-caption__go"><Icon name="arrow" /></span>
        </a>
      </div>

      {/* ---------- Stats bar ---------- */}
      <ul className="ab-stats" aria-label="NextFurn in numbers">
        {STATS.map((s) => (
          <li key={s.title} className="ab-stat">
            <span className="ab-stat__icon"><Icon name={s.icon} /></span>
            <span>
              <Counter value={s.value} />
              <span className="ab-stat__title">{s.title}</span>
              <span className="ab-stat__text">{s.text}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* ---------- Why choose ---------- */}
      <div className="ab-why">
        <div className="ab-why__head">
          <div data-ab-why>
            <p className="ab-eyebrow ab-eyebrow--dark">Why Choose NextFurn<span aria-hidden="true" /></p>
            <h3 className="ab-why__title">More Than Furniture<br /><span>We Create Possibilities</span></h3>
          </div>
          <p className="ab-why__text" data-ab-why>
            We deliver thoughtfully designed furniture solutions that enhance productivity, comfort and well-being. Our focus is on quality,
            sustainability and long-term value, making us a preferred partner for modern spaces across the world.
          </p>
          <p className="ab-why__script" aria-hidden="true" data-ab-why>Built for<br />Better Tomorrow</p>
        </div>

        <ul className="ab-cards">
          {FEATURES.map((f) => (
            <li key={f.title} className="ab-card">
              <span className="ab-card__icon"><Icon name={f.icon} /></span>
              <span>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Our story ---------- */}
      <div className="ab-story">
        <div className="ab-story__media">
          <div className="ab-story__rim" aria-hidden="true" />
          <div className="ab-story__img"><img src={imgLounge} alt="Corporate lounge with sofas, coffee tables and a marble reception desk" loading="lazy" decoding="async" /></div>
        </div>

        <div className="ab-story__content">
          <p className="ab-eyebrow" data-ab-story>Our Story<span aria-hidden="true" /></p>
          <h3 className="ab-story__title" data-ab-story>A Global Vision<br /><span>Rooted in Quality</span></h3>
          <p className="ab-story__text" data-ab-story>
            What started as a passion for well-designed furniture has grown into a global brand serving diverse industries. At{' '}
            <strong>NextFurn Overseas</strong>, we believe that great spaces create greater possibilities. Our journey is driven by a
            commitment to quality, innovation and long-term partnerships.
          </p>
          <a className="ab-btn" href="#contact" data-ab-story><span>Learn More About Us</span><span className="ab-btn__circle"><Icon name="arrow" /></span></a>
        </div>

        <div className="ab-story__brand" data-ab-story>
          <div className="ab-brandcard">
            <img className="ab-brandcard__icon" src={logoIcon} alt="" width="553" height="466" loading="lazy" />
            <img className="ab-brandcard__word" src={logoWordmark} alt="NextFurn Overseas" width="900" height="184" loading="lazy" />
          </div>
          <blockquote className="ab-quote">
            <span className="ab-quote__mark" aria-hidden="true">&ldquo;</span>
            <p>Designing spaces that enhance lives and transform communities across the world.</p>
            <footer>&mdash; NextFurn Overseas</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}