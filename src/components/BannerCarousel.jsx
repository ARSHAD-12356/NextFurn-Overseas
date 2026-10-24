import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import banner1 from '../assets/banners/banner-1.jpg';
import banner2 from '../assets/banners/banner-2.jpg';
import banner3 from '../assets/banners/banner-3.jpg';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import '../styles/banner-carousel.css';

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 4000;

const SLIDES = [
  {
    image: banner1,
    alt: 'Executive office with a walnut desk, leather chairs and a city view at sunset',
    focus: '62% 50%',
    title: [[['Design', false], ['Spaces', true]], [['That', false], ['Perform', false]]],
    text: 'Premium office, institutional, healthcare and public seating furniture \u2014 crafted for comfort, durability and modern spaces.',
    panelTitle: ['Executive', 'Furniture Collection'],
    panelText: 'A perfect blend of elegance, functionality and modern design for today\u2019s workspaces.',
    panelHref: '#products',
  },
  {
    image: banner2,
    alt: 'Hospital lobby with a beige multi-seat waiting bench, reception counter and lounge chairs',
    focus: '60% 55%',
    title: [[['Seating', false], ['Built', false]], [['for', false], ['Every', true], ['Visitor', true]]],
    text: 'Public seating and reception furniture for hospitals, offices and institutions \u2014 built for heavy daily use.',
    panelTitle: ['Public Seating', '& Healthcare Collection'],
    panelText: 'Waiting, lobby and reception seating that keeps busy spaces comfortable and organised.',
    panelHref: '#products',
  },
  {
    image: banner3,
    alt: 'Corporate lounge with a curved cream sofa, round coffee table and marble reception desk',
    focus: '58% 55%',
    title: [[['Lounges', false], ['That', false]], [['Welcome', true], ['Everyone', false]]],
    text: 'Sofas, lounge seating and reception desks that give lobbies, hotels and corporate spaces a warm first impression.',
    panelTitle: ['Lounge &', 'Reception Collection'],
    panelText: 'Comfortable sofas and statement reception counters for spaces that make a lasting impression.',
    panelHref: '#sofas',
  },
];

const FEATURES = [
  { icon: 'diamond', label: ['Premium', 'Quality'] },
  { icon: 'tools', label: ['Modern', 'Designs'] },
  { icon: 'gear', label: ['Custom', 'Solutions'] },
  { icon: 'users', label: ['Trusted', 'By 1000+ Clients'] },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chev-left': return <svg {...c} strokeWidth="2.2"><path d="m15 5-7 7 7 7" /></svg>;
    case 'chev-right': return <svg {...c} strokeWidth="2.2"><path d="m9 5 7 7-7 7" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></svg>;
    case 'tools': return <svg {...c}><path d="m4 20 9-9" /><path d="M13.5 4.5a4 4 0 0 0 5.6 5.6L21 12l-2 2-3.5-3.5" /><path d="m20 20-9-9" /><path d="M4 4l3 1 1 3L5 11 2 8z" /></svg>;
    case 'gear': return <svg {...c}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    default: return null;
  }
}

export default function BannerCarousel() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef(null);
  const slide = SLIDES[index];

  const go = useCallback((n) => setIndex(((n % SLIDES.length) + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    document.addEventListener('visibilitychange', onVis);
    mq.addEventListener('change', onMq);
    return () => { document.removeEventListener('visibilitychange', onVis); mq.removeEventListener('change', onMq); };
  }, []);

  // Runs continuously; one timeout per slide change, so manual navigation restarts the countdown
  useEffect(() => {
    if (pageHidden || reducedMotion) return undefined;
    const id = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, pageHidden, reducedMotion, go]);

  // Section entrance when it first scrolls into view
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' } })
        .from(section, { autoAlpha: 0, scale: 0.985, duration: 0.9 })
        .from(q('.bn-brand'), { autoAlpha: 0, y: 16, duration: 0.8 }, '<0.2')
        .from(q('.bn-features li'), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, '<0.3')
        .from(q('.bn-cats'), { autoAlpha: 0, duration: 0.6 }, '<0.2');
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="bn-section"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="NextFurn collections"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <svg className="bn-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="bn-clip-panel" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V1 C0.86,0.93 0.62,0.86 0.34,0.8 C0.14,0.76 0.03,0.66 0.01,0.48 C0,0.3 0,0.12 0,0 Z" />
          </clipPath>
          <clipPath id="bn-clip-panel-rim" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V1.03 C0.86,0.96 0.6,0.885 0.32,0.825 C0.11,0.785 -0.015,0.68 -0.025,0.48 C-0.03,0.3 -0.03,0.12 -0.03,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Backgrounds: all three stay mounted (loaded once), only the active one is visible */}
      <div className="bn-bgs" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={s.image} className={`bn-bg${i === index ? ' is-active' : ''}`}>
            <img src={s.image} alt="" style={{ objectPosition: s.focus }} decoding="async" />
          </div>
        ))}
      </div>
      <div className="bn-shade" aria-hidden="true" />

      <div className="bn-content">
        <div className="bn-brand">
          <img className="bn-brand__icon" src={logoIcon} alt="" width="553" height="466" />
          <img className="bn-brand__word" src={logoWordmark} alt="NextFurn Overseas" width="900" height="184" />
        </div>

        <div className="bn-copy" key={index} aria-live="polite">
          <p className="bn-tagline"><span aria-hidden="true" />Furniture That Inspires<span aria-hidden="true" /></p>
          {/* Always two lines, so the logo and copy keep the same position on every slide */}
          <h2 className="bn-title">
            {slide.title.map((line, li) => (
              <span key={li} className="bn-line">
                {line.map(([word, accent], wi) => (
                  <span key={word} className={`bn-word${accent ? ' is-accent' : ''}`} style={{ '--w': li * 2 + wi }}>{word} </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="bn-text">{slide.text}</p>
          <a href="#products" className="bn-cta">
            <span>Explore Collections</span>
            <span className="bn-cta__circle"><Icon name="arrow" /></span>
          </a>
        </div>

        <ul className="bn-features">
          {FEATURES.map((f) => (
            <li key={f.icon}>
              <span className="bn-features__icon"><Icon name={f.icon} /></span>
              <span>{f.label[0]}<br />{f.label[1]}</span>
            </li>
          ))}
        </ul>

        <p className="bn-cats">Office<i aria-hidden="true">|</i>Institutional<i aria-hidden="true">|</i>Healthcare<i aria-hidden="true">|</i>Public Seating</p>
      </div>

      <aside className="bn-panel" key={`panel-${index}`}>
        <div className="bn-panel__rim" aria-hidden="true" />
        <div className="bn-panel__body">
          <h3 className="bn-panel__title">{slide.panelTitle[0]}<br />{slide.panelTitle[1]}</h3>
          <span className="bn-panel__line" aria-hidden="true" />
          <p className="bn-panel__text">{slide.panelText}</p>
          <a href={slide.panelHref} className="bn-panel__go" aria-label={`Explore ${slide.panelTitle.join(' ')}`}><Icon name="arrow" /></a>
        </div>
      </aside>

      <button type="button" className="bn-nav bn-nav--prev" aria-label="Previous banner" onClick={() => go(index - 1)}><Icon name="chev-left" /></button>
      <button type="button" className="bn-nav bn-nav--next" aria-label="Next banner" onClick={() => go(index + 1)}><Icon name="chev-right" /></button>

      <div className="bn-dots">
        {SLIDES.map((s, i) => (
          <button key={s.image} type="button" className={`bn-dot${i === index ? ' is-active' : ''}`} aria-label={`Show banner ${i + 1}`} aria-current={i === index} onClick={() => go(i)} />
        ))}
      </div>

    </section>
  );
}