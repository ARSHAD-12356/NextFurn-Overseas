import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/sofa-section.css';

import imgHero from '../assets/sofas/sofa-hero.jpg';
import imgDiplomat3 from '../assets/sofas/pdf/diplomat-3.jpg';
import imgStephen3 from '../assets/sofas/pdf/stephen-3.jpg';
import imgAura3 from '../assets/sofas/pdf/aura-3.jpg';
import imgEquino3 from '../assets/sofas/pdf/equino-3.jpg';
import imgRegal2 from '../assets/sofas/pdf/regal-2.jpg';
import imgZap2 from '../assets/sofas/pdf/zap-2.jpg';
import imgRosemount2 from '../assets/sofas/pdf/rosemount-2.jpg';
import imgColumbia2 from '../assets/sofas/pdf/columbia-2.jpg';
import imgDiplomat1 from '../assets/sofas/pdf/diplomat-1.jpg';
import imgErgo4 from '../assets/sofas/pdf/ergo-4.jpg';
import imgZap1 from '../assets/sofas/pdf/zap-1.jpg';
import imgColumbia1 from '../assets/sofas/pdf/columbia-1.jpg';
import imgRegalL from '../assets/sofas/pdf/regal-l.jpg';
import thumbAll from '../assets/sofas/pdf/thumb-diplomat-3.jpg';
import thumbLShape from '../assets/sofas/pdf/thumb-regal-l.jpg';
import thumbThree from '../assets/sofas/pdf/thumb-aura-3.jpg';
import thumbTwo from '../assets/sofas/pdf/thumb-zap-2.jpg';
import thumbSingle from '../assets/sofas/pdf/thumb-ergo-4.jpg';

gsap.registerPlugin(ScrollTrigger);

// Categories as they appear in the NextFurn 2026 collection price list (sofa series)
const CATEGORIES = [
  { id: 'all', label: 'All Sofas', image: thumbAll },
  { id: 'l-shape', label: 'L-Shape Sofas', image: thumbLShape },
  { id: '3-seater', label: '3 Seater Sofas', image: thumbThree },
  { id: '2-seater', label: '2 Seater Sofas', image: thumbTwo },
  { id: '1-seater', label: 'Single Seater Sofas', image: thumbSingle },
];

/* Sofas, photos, prices and sizes from the NextFurn Overseas 2026 collection price list (w.e.f. 01 May 2026).
   `price` is the leatherette (starting) price; `leather` is the pure leather price where the list has one.
   Ratings are placeholders. */
const SOFAS = [
  { id: 'diplomat-3', category: '3-seater', name: 'NF-Diplomat 3 Seater Sofa', size: '2155 × 840 × 760 mm', price: 50400, leather: 126720, finish: 'Leatherette', rating: 4.5, reviews: 63, image: imgDiplomat3 },
  { id: 'regal-l', category: 'l-shape', name: 'NF-Regal L-Shape Sofa', size: '3600 × 3000 × 1000 mm', price: 167175, leather: 316395, finish: 'Asmara Leatherette', rating: 5, reviews: 28, image: imgRegalL },
  { id: 'zap-2', category: '2-seater', name: 'NF-Zap 2 Seater Sofa', size: '1280 × 755 × 740 mm', price: 39960, leather: 76050, finish: 'Leatherette', rating: 4.5, reviews: 47, image: imgZap2 },
  { id: 'ergo-4', category: '1-seater', name: 'NF-Ergo 4 Single Seater', size: '650 × 825 × 860 mm', price: 38610, finish: 'Leatherette', rating: 4.5, reviews: 36, image: imgErgo4 },
  { id: 'aura-3', category: '3-seater', name: 'NF-Aura 3 Seater Sofa', size: '2120 × 935 × 850 mm', price: 49770, leather: 158490, finish: 'Leatherette', rating: 4.5, reviews: 52, image: imgAura3 },
  { id: 'regal-2', category: '2-seater', name: 'NF-Regal 2 Seater Sofa', size: '1930 × 1000 × 730 mm', price: 58950, leather: 130140, finish: 'Leatherette', rating: 5, reviews: 57, image: imgRegal2 },
  { id: 'diplomat-1', category: '1-seater', name: 'NF-Diplomat Single Seater', size: '890 × 840 × 760 mm', price: 29970, leather: 74385, finish: 'Leatherette', rating: 4.5, reviews: 41, image: imgDiplomat1 },
  { id: 'stephen-3', category: '3-seater', name: 'NF-Stephen 3 Seater Sofa', size: '2120 × 900 × 850 mm', price: 59535, leather: 128115, finish: 'Asmara Leatherette', rating: 4.5, reviews: 33, image: imgStephen3 },
  { id: 'rosemount-2', category: '2-seater', name: 'NF-Rosemount 2 Seater Sofa', size: '1860 × 760 × 760 mm', price: 37755, leather: 99675, finish: 'Leatherette', rating: 4.5, reviews: 39, image: imgRosemount2 },
  { id: 'zap-1', category: '1-seater', name: 'NF-Zap Single Seater', size: '790 × 755 × 740 mm', price: 32895, leather: 60210, finish: 'Leatherette', rating: 4.5, reviews: 44, image: imgZap1 },
  { id: 'equino-3', category: '3-seater', name: 'NF-Equino 3 Seater Sofa', size: '1860 × 835 × 785 mm', price: 32310, leather: 101565, finish: 'Leatherette', rating: 4.5, reviews: 61, image: imgEquino3 },
  { id: 'columbia-2', category: '2-seater', name: 'NF-Columbia 2 Seater Sofa', size: '1450 × 755 × 750 mm', price: 26460, leather: 80460, finish: 'Leatherette', rating: 4.5, reviews: 58, image: imgColumbia2 },
  { id: 'columbia-1', category: '1-seater', name: 'NF-Columbia Single Seater', size: '865 × 755 × 750 mm', price: 19080, leather: 54720, finish: 'Leatherette', rating: 4.5, reviews: 49, image: imgColumbia1 },
];

const BENEFITS = [
  { icon: 'brush', label: ['Stylish', 'Designs'] },
  { icon: 'fabric', label: ['Premium', 'Fabric'] },
  { icon: 'comfort', label: ['Long Lasting', 'Comfort'] },
  { icon: 'variety', label: ['Wide', 'Variety'] },
];

const AUTOPLAY_MS = 2200;
const SLIDE_MS = 500;

const formatINR = (n) => `\u20B9${n.toLocaleString('en-IN')}`;

function perViewFor(width) {
  if (width >= 900) return 4;
  if (width >= 660) return 3;
  if (width >= 420) return 2;
  return 1;
}

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow':
      return <svg {...common} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'arrow-left':
      return <svg {...common} strokeWidth="2"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>;
    case 'heart':
      return <svg {...common} strokeWidth="1.8"><path d="M12 20s-7-4.35-9.2-8.7C1.3 8.3 3.2 5 6.4 5c2 0 3.3 1.1 3.9 2.2h3.4C14.3 6.1 15.6 5 17.6 5c3.2 0 5.1 3.3 3.6 6.3C19 15.65 12 20 12 20z" /></svg>;
    case 'cart':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" fill="none" stroke="currentColor" strokeWidth="1.9" /><circle cx="10" cy="19.5" r="1.6" /><circle cx="17" cy="19.5" r="1.6" /></svg>;
    case 'star':
      return <svg {...common} fill="currentColor" stroke="none"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;
    case 'brush':
      return <svg {...common}><path d="M14.5 4.5 19.5 9.5 11 18l-5-5z" /><path d="M6 13c-2 0-3 1.5-3 3.2 0 1.4-.5 2.3-1 2.8 2.5.5 6 .2 7-3" /><path d="m13 6 5 5" /></svg>;
    case 'fabric':
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16" /></svg>;
    case 'comfort':
      return <svg {...common}><path d="M12 7.5c-1-1.6-3.6-1.6-4.3.3-.6 1.8 1.4 3.2 4.3 5 2.9-1.8 4.9-3.2 4.3-5-.7-1.9-3.3-1.9-4.3-.3z" /><path d="M3 15.5c1.8 0 3.4.6 4.6 1.6h4.2a1.6 1.6 0 0 1 0 3.2H8" /><path d="M11.8 20.3h4.6l4.2-3.2a1.4 1.4 0 0 0-1.8-2.1l-3 1.9" /></svg>;
    case 'variety':
      return <svg {...common}><rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="3.5" /><rect x="4" y="13" width="7" height="7" rx="3.5" /><rect x="13" y="13" width="7" height="7" rx="1.6" /></svg>;
    default:
      return null;
  }
}

function Stars({ rating }) {
  return (
    <span className="sofa-card__stars" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="sofa-star" style={{ '--fill': `${Math.max(0, Math.min(1, rating - i)) * 100}%` }} aria-hidden="true">
          <Icon name="star" />
          <span className="sofa-star__fill"><Icon name="star" /></span>
        </span>
      ))}
    </span>
  );
}

function SofaCard({ sofa, isVisible, isClone, liked, onToggleLike, added, onAdd }) {
  const inactive = isClone || !isVisible;
  return (
    <li className={`sofa-slide${isVisible ? ' is-visible' : ''}`} aria-hidden={inactive ? 'true' : undefined}>
      <article className="sofa-card" data-sofa-card>
        <div className="sofa-card__media">
          <img src={sofa.image} alt={sofa.name} loading="lazy" decoding="async" width="1200" height="750" />
          <button
            type="button"
            className={`sofa-card__like${liked ? ' is-liked' : ''}`}
            aria-label={liked ? `Remove ${sofa.name} from wishlist` : `Add ${sofa.name} to wishlist`}
            aria-pressed={liked}
            tabIndex={inactive ? -1 : 0}
            onClick={() => onToggleLike(sofa.id)}
          >
            <Icon name="heart" />
          </button>
        </div>
        <div className="sofa-card__body">
          <h3 className="sofa-card__name">{sofa.name}</h3>
          <p className="sofa-card__rating">
            <Stars rating={sofa.rating} />
            <span className="sofa-card__reviews">({sofa.reviews})</span>
          </p>
          <p className="sofa-card__size">{sofa.size}</p>
          <p className="sofa-card__price-row">
            <span className="sofa-card__price">{formatINR(sofa.price)}</span>
            <span className="sofa-card__off">{sofa.finish}</span>
          </p>
          {sofa.leather && <p className="sofa-card__alt">Pure Leather {formatINR(sofa.leather)}</p>}
          <button
            type="button"
            className={`sofa-card__cart${added ? ' is-added' : ''}`}
            tabIndex={inactive ? -1 : 0}
            onClick={() => onAdd(sofa.id)}
          >
            <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
            <Icon name="cart" />
          </button>
        </div>
      </article>
    </li>
  );
}

export default function SofaSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const stripRef = useRef(null);
  const pendingIndexRef = useRef(null);

  const [activeCat, setActiveCat] = useState('all');
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liked, setLiked] = useState(() => new Set());
  const [added, setAdded] = useState(() => new Set());

  const products = activeCat === 'all' ? SOFAS : SOFAS.filter((s) => s.category === activeCat);
  const total = products.length;
  const canSlide = total > perView;
  const slides = canSlide ? [...products, ...products.slice(0, perView)] : products;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setPerView(perViewFor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReducedMotion(mq.matches);
    onMotion();
    document.addEventListener('visibilitychange', onVisibility);
    mq.addEventListener('change', onMotion);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      mq.removeEventListener('change', onMotion);
    };
  }, []);

  const selectCategory = (id) => {
    setActiveCat(id);
    setAnimate(false);
    setIndex(0);
    const el = stripRef.current?.querySelector(`[data-cat="${id}"]`);
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  };

  const stepCategory = (dir) => {
    const i = CATEGORIES.findIndex((c) => c.id === activeCat);
    selectCategory(CATEGORIES[(i + dir + CATEGORIES.length) % CATEGORIES.length].id);
  };

  // Cards travel left -> right: step the index down, wrapping through the clones
  const step = useCallback(() => {
    if (!canSlide) return;
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }
    // Jump silently to the clone of the first card, then slide back one step
    pendingIndexRef.current = total - 1;
    setAnimate(false);
    setIndex(total);
  }, [canSlide, index, total]);

  const onTrackTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (index >= total) {
      setAnimate(false);
      setIndex(index - total);
    }
  };

  // Re-enable the transition two frames after a silent jump
  useEffect(() => {
    if (animate) return undefined;
    let inner;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setAnimate(true);
        if (pendingIndexRef.current !== null) {
          setIndex(pendingIndexRef.current);
          pendingIndexRef.current = null;
        }
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  // One timer per index change; nothing accumulates across renders
  useEffect(() => {
    if (!canSlide || hovered || pageHidden || reducedMotion) return undefined;
    const id = setTimeout(step, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, canSlide, hovered, pageHidden, reducedMotion, step]);

  const toggleIn = (setter) => (id) =>
    setter((prevSet) => {
      const nextSet = new Set(prevSet);
      if (nextSet.has(id)) nextSet.delete(id);
      else nextSet.add(id);
      return nextSet;
    });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      const st = (trigger, start = 'top 80%') => ({ trigger, start, toggleActions: 'play none none reverse' });
      const hero = q('.sofa-hero')[0];

      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(hero) })
        .from(q('.sofa-hero__photo'), { autoAlpha: 0, duration: 1.1 })
        .from(q('.sofa-hero__photo img'), { scale: 1.04, duration: 1.6, ease: 'power2.out' }, '<')
        .from(q('.sofa-hero__panel'), { autoAlpha: 0, xPercent: -6, duration: 1.1, ease: 'expo.out' }, '<0.1')
        .from(q('[data-sofa-hero-item]'), { autoAlpha: 0, y: 22, duration: 0.7, stagger: 0.08 }, '<0.2')
        .from(q('.sofa-hero__promo > *'), { autoAlpha: 0, scale: 0.94, duration: 0.8, stagger: 0.1 }, '<0.2');

      gsap.from(q('.sofa-strip'), { autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: st(q('.sofa-strip')[0], 'top 90%') });
      gsap.from(q('.sofa-strip__item'), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.05, delay: 0.15, ease: 'power3.out', scrollTrigger: st(q('.sofa-strip')[0], 'top 90%') });

      const feature = q('.sofa-feature')[0];
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(feature) })
        .from(q('.sofa-feature__shape'), { autoAlpha: 0, xPercent: -10, duration: 1.1, ease: 'expo.out' })
        .from(q('[data-sofa-feature-item]'), { autoAlpha: 0, x: -20, duration: 0.7, stagger: 0.08 }, '<0.2')
        .from(q('[data-sofa-card]'), { autoAlpha: 0, scale: 0.94, y: 30, duration: 0.8, stagger: 0.09 }, '<0.1');
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="sofas" className="sofa-section" ref={sectionRef} aria-labelledby="sofa-title">
      <svg className="sofa-section__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* Cream hero panel: bulging right edge that sweeps out under the photo at the bottom */}
          <clipPath id="sofa-clip-panel" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.81 C0.86,0.08 0.885,0.2 0.875,0.34 C0.865,0.5 0.84,0.66 0.85,0.76 C0.87,0.9 0.93,0.97 1,1 L0,1 Z" />
          </clipPath>
          {/* Green swoosh in the hero bottom-left that flows into the featured panel */}
          <clipPath id="sofa-clip-swoosh" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.3,0.05 0.62,0.32 1,1 L0,1 Z" />
          </clipPath>
          {/* Featured panel: one sculpted green shape */}
          <clipPath id="sofa-clip-feature" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.9 C0.965,0.05 0.975,0.16 0.975,0.3 C0.975,0.48 0.975,0.6 0.945,0.71 C0.905,0.86 0.845,0.95 0.77,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ---------- Hero ---------- */}
      <div className="sofa-hero">
        <div className="sofa-hero__photo">
          <img src={imgHero} alt="Cream modular L-shape sofa with walnut coffee table in a warm living room" decoding="async" />
        </div>

        <div className="sofa-hero__panel">
          <div className="sofa-hero__panel-bg" aria-hidden="true" />
          <div className="sofa-hero__swoosh" aria-hidden="true" />
          <svg className="sofa-hero__panel-line" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0.872,0.42 C0.862,0.55 0.84,0.66 0.85,0.76 C0.87,0.9 0.93,0.97 1,1" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="sofa-hero__content">
            <p className="sofa-eyebrow" data-sofa-hero-item>
              <span className="sofa-eyebrow__line" aria-hidden="true" />
              Sofa Collection
              <span className="sofa-eyebrow__line" aria-hidden="true" />
            </p>
            <h2 id="sofa-title" className="sofa-hero__title" data-sofa-hero-item>
              Premium Sofas
              <span>for Every Space</span>
            </h2>
            <p className="sofa-hero__text" data-sofa-hero-item>
              Comfort meets elegance with our wide range of sofas, designed to suit every home and lifestyle.
            </p>
            <ul className="sofa-hero__benefits" data-sofa-hero-item>
              {BENEFITS.map((b) => (
                <li key={b.icon}>
                  <span className="sofa-hero__benefit-icon"><Icon name={b.icon} /></span>
                  <span>{b.label[0]}<br />{b.label[1]}</span>
                </li>
              ))}
            </ul>
            <a href="#sofa-featured" className="sofa-btn" data-sofa-hero-item>
              <span>Explore Sofa Collection</span>
              <span className="sofa-btn__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </div>

        <div className="sofa-hero__promo">
          <p className="sofa-hero__script">Make Your <br />Home More Comfortable</p>
          <span className="sofa-hero__promo-line" aria-hidden="true" />
          <p className="sofa-hero__promo-label">Sofas for<br />modern living</p>
          <p className="sofa-hero__badge">
            <span>Up to</span>
            <strong>25%</strong>
            <span>Off</span>
          </p>
        </div>
      </div>

      {/* ---------- Category strip ---------- */}
      <nav className="sofa-strip" aria-label="Sofa categories">
        <button type="button" className="sofa-round sofa-round--light" aria-label="Previous category" onClick={() => stepCategory(-1)}>
          <Icon name="arrow-left" />
        </button>
        <ul className="sofa-strip__list" ref={stripRef}>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                data-cat={c.id}
                className={`sofa-strip__item${activeCat === c.id ? ' is-active' : ''}`}
                aria-pressed={activeCat === c.id}
                onClick={() => selectCategory(c.id)}
              >
                <span className="sofa-strip__thumb"><img src={c.image} alt="" loading="lazy" decoding="async" /></span>
                <span className="sofa-strip__label">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="sofa-round sofa-round--light" aria-label="Next category" onClick={() => stepCategory(1)}>
          <Icon name="arrow" />
        </button>
      </nav>

      {/* ---------- Featured sofas ---------- */}
      <div className="sofa-feature" id="sofa-featured">
        <div className="sofa-feature__panel">
          <div className="sofa-feature__shape" aria-hidden="true">
            <svg className="sofa-feature__leaves" viewBox="0 0 200 220" aria-hidden="true">
              <g fill="#2f6b47">
                <path d="M18 220C30 160 62 118 118 92c-30 40-56 84-70 128z" />
                <path d="M0 196c14-50 40-84 86-104-24 32-46 68-58 112z" opacity=".8" />
                <path d="M40 220c22-40 54-68 104-80-34 22-62 50-84 80z" opacity=".7" />
              </g>
              <g fill="none" stroke="#3f8159" strokeWidth="1.4" opacity=".7">
                <path d="M30 214c18-44 44-80 84-116" />
                <path d="M10 196c16-38 38-66 72-96" />
              </g>
            </svg>
          </div>
          <div className="sofa-feature__content">
            <p className="sofa-feature__eyebrow" data-sofa-feature-item>Featured Sofas</p>
            <h3 className="sofa-feature__title" data-sofa-feature-item>Bestselling<br />Sofa Collection</h3>
            <p className="sofa-feature__text" data-sofa-feature-item>
              Our most loved sofas, chosen for their comfort, quality and modern designs.
            </p>
            <a href="#sofas" className="sofa-btn sofa-btn--copper" data-sofa-feature-item onClick={() => setActiveCat('all')}>
              <span>View All Sofas</span>
              <span className="sofa-btn__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </div>

        <div
          className="sofa-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured sofas"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div className="sofa-carousel__viewport" ref={viewportRef}>
            <ul
              className={`sofa-carousel__track${animate ? '' : ' no-anim'}`}
              style={{ '--pv': perView, '--index': index, '--slide-ms': `${SLIDE_MS}ms` }}
              onTransitionEnd={onTrackTransitionEnd}
            >
              {slides.map((sofa, i) => (
                <SofaCard
                  key={`${activeCat}-${sofa.id}-${i}`}
                  sofa={sofa}
                  isClone={i >= total}
                  isVisible={i >= index && i < index + perView}
                  liked={liked.has(sofa.id)}
                  onToggleLike={toggleIn(setLiked)}
                  added={added.has(sofa.id)}
                  onAdd={toggleIn(setAdded)}
                />
              ))}
            </ul>
          </div>

          {canSlide && (
            <div className="sofa-dots" aria-hidden="true">
                {products.map((p, i) => (
                  <span key={p.id} className={`sofa-dot${index % total === i ? ' is-active' : ''}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}