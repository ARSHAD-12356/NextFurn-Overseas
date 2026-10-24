import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/bestseller-section.css';

import imgFeather from '../assets/bestseller/feather-hb.jpg';
import imgTitan from '../assets/bestseller/titan.jpg';
import imgBravo from '../assets/bestseller/bravo.jpg';
import imgDitto from '../assets/bestseller/ditto-grey.jpg';
import imgNF001 from '../assets/bestseller/chair-nf-001.jpg';
import imgRevival from '../assets/bestseller/table-revival.jpg';
import imgMartini from '../assets/bestseller/table-martini.jpg';
import imgCharm from '../assets/bestseller/table-charm.jpg';
import imgColton from '../assets/bestseller/table-colton.jpg';
import imgEmerson from '../assets/bestseller/table-emerson.jpg';
import imgDiplomat from '../assets/bestseller/sofa-diplomat-3.jpg';
import imgRegal from '../assets/bestseller/sofa-regal-2.jpg';
import imgViking from '../assets/bestseller/sofa-viking-3.jpg';
import imgEquino from '../assets/bestseller/sofa-equino-3.jpg';
import imgSirena from '../assets/bestseller/sofa-sirena-3.jpg';
import imgLounge from '../assets/products/lounge-corner.jpg';

gsap.registerPlugin(ScrollTrigger);

/* Prices and photos come from the NextFurn Overseas price lists (w.e.f. 01 May 2026):
   chairs from the NFSOC list and the special collection, tables and sofas from the 2026 collection.
   Each photo is the price list's own product image, upscaled to HD. Where a model has a leather and a
   leatherette price, the leatherette (starting) price is shown and named in `category`.
   Ratings are placeholders. Add `mrp` to show a struck-through price and discount badge.
   Order mixes the three categories so every slide of the carousel shows variety. */
const PRODUCTS = [
  { id: 'nf9', model: 'NF9', badge: 'Bestseller', badgeIcon: 'crown', category: 'Mesh High-Back Chair', name: 'Feather NF HB Chair', rating: 4.5, reviews: 120, price: 11550, image: imgFeather, href: '#office-furniture' },
  { id: 'colton', model: 'NF-COLTON 1', badge: 'Top Rated', badgeIcon: 'star', category: 'Office Table', name: 'Colton Executive Table', rating: 4.5, reviews: 41, price: 367980, image: imgColton, href: '#office-furniture' },
  { id: 'diplomat-3', model: 'NF-DIPLOMAT 3', badge: 'Trending', badgeIcon: 'flame', category: 'Sofa · Leatherette', name: 'Diplomat 3 Seater Sofa', rating: 4.5, reviews: 63, price: 50400, image: imgDiplomat, href: '#sofas' },
  { id: 'nf24', model: 'NF24', badge: 'Best Value', badgeIcon: 'tag', category: 'Executive Chair', name: 'Titan NF Chair', rating: 4.5, reviews: 86, price: 17850, image: imgTitan, href: '#office-furniture' },
  { id: 'charm', model: 'NF-CHARM 1', badge: 'Bestseller', badgeIcon: 'crown', category: 'Office Table', name: 'Charm Executive Table', rating: 4.5, reviews: 38, price: 305145, image: imgCharm, href: '#office-furniture' },
  { id: 'regal-2', model: 'NF-REGAL 2', badge: 'Top Rated', badgeIcon: 'star', category: 'Sofa · Leatherette', name: 'Regal 2 Seater Sofa', rating: 4.5, reviews: 57, price: 58950, image: imgRegal, href: '#sofas' },
  { id: 'nf-001', model: 'NF-001', badge: 'Trending', badgeIcon: 'flame', category: 'Executive Chair · Leatherette', name: 'NF-001 High Back Chair', rating: 4.5, reviews: 49, price: 40635, image: imgNF001, href: '#office-furniture' },
  { id: 'martini', model: 'NF-MARTINI 1', badge: 'Popular', badgeIcon: 'flame', category: 'Office Table', name: 'Martini Executive Table', rating: 4.5, reviews: 29, price: 500085, image: imgMartini, href: '#office-furniture' },
  { id: 'sirena-3', model: 'NF-SIRENA 3', badge: 'Best Value', badgeIcon: 'tag', category: 'Sofa · Leatherette', name: 'Sirena 3 Seater Sofa', rating: 4.5, reviews: 44, price: 46260, image: imgSirena, href: '#sofas' },
  { id: 'nf15', model: 'NF15', badge: 'Best Value', badgeIcon: 'tag', category: 'Mid-Back Mesh Chair', name: 'Bravo NF Chair', rating: 4.5, reviews: 72, price: 8925, image: imgBravo, href: '#office-furniture' },
  { id: 'emerson', model: 'NF-EMERSON 1', badge: 'Best Value', badgeIcon: 'tag', category: 'Office Table', name: 'Emerson Executive Table', rating: 4.5, reviews: 33, price: 194760, image: imgEmerson, href: '#office-furniture' },
  { id: 'viking-3', model: 'NF-VIKING 3', badge: 'Popular', badgeIcon: 'flame', category: 'Sofa · Leatherette', name: 'Viking 3 Seater Sofa', rating: 4.5, reviews: 52, price: 41805, image: imgViking, href: '#sofas' },
  { id: 'nf2', model: 'NF2', badge: 'Popular', badgeIcon: 'flame', category: 'Task Chair', name: 'Ditto NF Grey Chair', rating: 4.5, reviews: 98, price: 8275, image: imgDitto, href: '#office-furniture' },
  { id: 'revival', model: 'NF-REVIVAL 1', badge: 'Trending', badgeIcon: 'flame', category: 'Office Table', name: 'Revival Executive Table', rating: 4.5, reviews: 27, price: 265365, image: imgRevival, href: '#office-furniture' },
  { id: 'equino-3', model: 'NF-EQUINO 3', badge: 'Bestseller', badgeIcon: 'crown', category: 'Sofa · Leatherette', name: 'Equino 3 Seater Sofa', rating: 4.5, reviews: 61, price: 32310, image: imgEquino, href: '#sofas' },
];

const BENEFITS = [
  { icon: 'truck', title: 'Fast Delivery', text: 'Safe & Secure Shipping' },
  { icon: 'shield', title: 'Premium Quality', text: 'Built to Last' },
  { icon: 'headset', title: 'Dedicated Support', text: '24/7 Customer Care' },
  { icon: 'badge', title: 'Customer Favorite', text: 'Highly Rated Products' },
];

const AUTOPLAY_MS = 2500;
const SLIDE_MS = 550;

const formatINR = (n) => `\u20B9${n.toLocaleString('en-IN')}`;
const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

function perViewFor(width) {
  if (width >= 940) return 4;
  if (width >= 700) return 3;
  if (width >= 460) return 2;
  return 1;
}

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow':
      return <svg {...common} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'arrow-left':
      return <svg {...common} strokeWidth="2"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>;
    case 'heart':
      return <svg {...common}><path d="M12 20s-7-4.35-9.2-8.7C1.3 8.3 3.2 5 6.4 5c2 0 3.3 1.1 3.9 2.2h3.4C14.3 6.1 15.6 5 17.6 5c3.2 0 5.1 3.3 3.6 6.3C19 15.65 12 20 12 20z" /></svg>;
    case 'crown':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7z" /></svg>;
    case 'tag':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9zm5-4.5A1.5 1.5 0 1 0 8 10.5 1.5 1.5 0 0 0 8 7.5z" /></svg>;
    case 'flame':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M12 2c1 3.5 5 6 5 11a5 5 0 0 1-10 0c0-2.2 1-3.8 2.3-5 .2 1.8 1.1 3 2.4 3.4C11 9 11 5.2 12 2z" /></svg>;
    case 'star':
      return <svg {...common} fill="currentColor" stroke="none"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;
    case 'truck':
      return <svg {...common}><path d="M2 6h11v10H2z" /><path d="M13 9h4.5L21 12.5V16h-8z" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
    case 'shield':
      return <svg {...common}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></svg>;
    case 'headset':
      return <svg {...common}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.7-1.8 2.5-5 2.5" /></svg>;
    case 'badge':
      return <svg {...common}><path d="m12 2.8 2.3 1.7 2.8-.2.9 2.7 2.4 1.5-.8 2.7.8 2.7-2.4 1.5-.9 2.7-2.8-.2L12 21.2l-2.3-1.7-2.8.2-.9-2.7-2.4-1.5.8-2.7-.8-2.7 2.4-1.5.9-2.7 2.8.2z" /><path d="m8.7 12.2 2.2 2.2 4.4-4.6" /></svg>;
    default:
      return null;
  }
}

function Stars({ rating }) {
  return (
    <span className="bs-card__stars" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="bs-star" style={{ '--fill': `${fill * 100}%` }} aria-hidden="true">
            <Icon name="star" />
            <span className="bs-star__fill"><Icon name="star" /></span>
          </span>
        );
      })}
    </span>
  );
}

function ProductCard({ product, isVisible, isClone, liked, onToggleLike }) {
  return (
    <li className={`bs-slide${isVisible ? ' is-visible' : ''}`} aria-hidden={isClone || !isVisible ? 'true' : undefined}>
      <article className="bs-card" data-bs-card>
        <div className="bs-card__media">
          <img
            src={product.image}
            alt={product.name}
            className={product.fit === 'contain' ? 'is-contain' : undefined}
            style={product.focus ? { objectPosition: product.focus } : undefined}
            loading="lazy"
            decoding="async"
            width="400"
            height="500"
          />
          <span className={`bs-card__badge bs-card__badge--${product.badgeIcon}`}>
            <Icon name={product.badgeIcon} />
            {product.badge}
          </span>
          <button
            type="button"
            className={`bs-card__like${liked ? ' is-liked' : ''}`}
            aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={liked}
            tabIndex={isClone || !isVisible ? -1 : 0}
            onClick={() => onToggleLike(product.id)}
          >
            <Icon name="heart" />
          </button>
        </div>

        <div className="bs-card__body">
          <p className="bs-card__category">{product.category}</p>
          <h3 className="bs-card__name">{product.name}</h3>
          <p className="bs-card__rating">
            <Stars rating={product.rating} />
            <span className="bs-card__reviews">({product.reviews})</span>
          </p>
          <p className="bs-card__price-row">
            <span className="bs-card__price">{formatINR(product.price)}</span>
            {product.mrp && (
              <>
                <s className="bs-card__mrp">{formatINR(product.mrp)}</s>
                <span className="bs-card__off">{discount(product)}% OFF</span>
              </>
            )}
          </p>
          <a href={product.href} className="bs-card__btn" tabIndex={isClone || !isVisible ? -1 : 0}>
            <span>View Details</span>
            <span className="bs-card__btn-circle"><Icon name="arrow" /></span>
          </a>
        </div>
      </article>
    </li>
  );
}

export default function BestsellerSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const pendingIndexRef = useRef(null);
  const total = PRODUCTS.length;

  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liked, setLiked] = useState(() => new Set());

  // Visible card count follows the carousel width, not the window
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

  // Track = products + clones of the first `perView`, so the loop wraps without a visible jump
  const slides = [...PRODUCTS, ...PRODUCTS.slice(0, perView)];
  const activeDot = index % total;

  const goTo = useCallback((next) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, total));
  }, [total]);

  const prev = () => {
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }
    // Jump silently to the clone of slide 0, then slide back one step
    pendingIndexRef.current = total - 1;
    setAnimate(false);
    setIndex(total);
  };

  // After sliding onto the clones, snap back to the real first slide
  const onTrackTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (index >= total) {
      setAnimate(false);
      setIndex(index - total);
    }
  };

  // Re-enable the transition two frames after a silent jump (so the jump never animates)
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
    if (hovered || pageHidden || reducedMotion) return undefined;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, hovered, pageHidden, reducedMotion, next]);

  const toggleLike = (id) => {
    setLiked((prevSet) => {
      const nextSet = new Set(prevSet);
      if (nextSet.has(id)) nextSet.delete(id);
      else nextSet.add(id);
      return nextSet;
    });
  };

  // Scroll-in animation, matching the category section
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      const reveal = (targets, vars, trigger, start = 'top 85%') =>
        gsap.from(targets, {
          ease: 'power3.out',
          ...vars,
          scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' },
        });

      reveal(q('[data-bs-head]'), { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.12 }, q('.bs-section__header')[0]);
      reveal(q('.bs-panel__shape'), { xPercent: -14, autoAlpha: 0, duration: 1.3, ease: 'expo.out' }, q('.bs-panel')[0], 'top 80%');
      reveal(q('.bs-panel__photo img'), { scale: 1.15, duration: 1.6, ease: 'power2.out' }, q('.bs-panel')[0], 'top 80%');
      reveal(q('[data-bs-panel-item]'), { autoAlpha: 0, x: -24, duration: 0.8, stagger: 0.1, delay: 0.25 }, q('.bs-panel')[0], 'top 80%');
      reveal(q('[data-bs-card]'), { autoAlpha: 0, y: 60, duration: 0.95, stagger: 0.1 }, q('.bs-carousel')[0], 'top 82%');
      reveal(q('.bs-controls > *'), { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1 }, q('.bs-controls')[0], 'top 95%');
      reveal(q('.bs-bar'), { autoAlpha: 0, y: 50, duration: 1, ease: 'expo.out' }, q('.bs-bar')[0], 'top 92%');
      reveal(q('[data-bs-benefit]'), { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.12, delay: 0.2 }, q('.bs-bar')[0], 'top 92%');
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="bestsellers" className="bs-section" ref={sectionRef} aria-labelledby="bs-section-title">
      <svg className="bs-section__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* Left panel, traced from the reference: photo region (outer edge), copper rim
              (gap to the inner edge) and the cream blob that holds the copy */}
          <clipPath id="bs-clip-outer" clipPathUnits="objectBoundingBox">
            <path d="M0,0.02 C0.15,-0.01 0.3,0 0.43,0 C0.6,0 0.78,0.1 0.83,0.23 C0.88,0.36 0.86,0.55 0.89,0.7 C0.91,0.82 0.95,0.92 1,1 L0,1 Z" />
          </clipPath>
          <clipPath id="bs-clip-inner" clipPathUnits="objectBoundingBox">
            <path d="M0,0.025 C0.15,-0.005 0.3,0.005 0.42,0.005 C0.58,0.005 0.755,0.1 0.805,0.23 C0.855,0.36 0.835,0.55 0.86,0.7 C0.88,0.82 0.915,0.92 0.955,1 L0,1 Z" />
          </clipPath>
          <clipPath id="bs-clip-cream" clipPathUnits="objectBoundingBox">
            <path d="M0,0.024 C0.15,-0.006 0.32,0.003 0.48,0.006 C0.65,0.024 0.73,0.14 0.73,0.3 C0.73,0.44 0.7,0.53 0.6,0.6 C0.48,0.67 0.25,0.66 0,0.64 Z" />
          </clipPath>
          {/* Stacked layout: the blob covers the copy and swoops down to the right */}
          <clipPath id="bs-clip-cream-mobile" clipPathUnits="objectBoundingBox">
            <path d="M0,0.024 C0.15,-0.006 0.32,0.003 0.48,0.006 C0.63,0.026 0.75,0.13 0.775,0.27 C0.8,0.41 0.74,0.51 0.6,0.56 C0.42,0.6 0.2,0.59 0,0.57 Z" />
          </clipPath>
          <clipPath id="bs-clip-bar" clipPathUnits="objectBoundingBox">
            <path d="M0,0.42 C0.02,0.08 0.05,0.02 0.1,0.02 H0.94 C0.975,0.02 0.995,0.12 1,0.34 V0.78 C0.99,0.96 0.96,1 0.91,1 H0.08 C0.03,1 0.008,0.94 0,0.76 Z" />
          </clipPath>
        </defs>
      </svg>

      <header className="bs-section__header">
        <p className="bs-section__eyebrow" data-bs-head>
          <span className="bs-section__eyebrow-line" aria-hidden="true" />
          Bestseller Products
          <span className="bs-section__eyebrow-line" aria-hidden="true" />
        </p>
        <h2 id="bs-section-title" className="bs-section__title" data-bs-head>
          Our <span className="bs-section__title-accent">Bestselling</span> Furniture
        </h2>
        <p className="bs-section__subtitle" data-bs-head>
          Most loved furniture pieces chosen by our customers for their quality, comfort and style.
        </p>
        <a href="#categories" className="bs-pill bs-section__all" data-bs-head>
          <span>View All Products</span>
          <span className="bs-pill__circle"><Icon name="arrow" /></span>
        </a>
      </header>

      <div className="bs-section__body">
        <aside className="bs-panel" aria-labelledby="bs-panel-title">
          <div className="bs-panel__shape" aria-hidden="true">
            <div className="bs-panel__rim" />
            <div className="bs-panel__photo">
              <img src={imgLounge} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="bs-panel__cream-wrap">
              <div className="bs-panel__cream" />
            </div>
            <svg className="bs-panel__line" viewBox="0 0 1 1" preserveAspectRatio="none">
              <path d="M0,0.02 C0.15,-0.01 0.3,0 0.43,0 C0.6,0 0.78,0.1 0.83,0.23 C0.88,0.36 0.86,0.55 0.89,0.7 C0.91,0.82 0.95,0.92 1,1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="bs-panel__content">
            <p className="bs-panel__eyebrow" data-bs-panel-item>Popular Choices</p>
            <h3 id="bs-panel-title" className="bs-panel__title" data-bs-panel-item>
              Furniture
              <br />
              That <span>Everyone</span>
              <br />
              <span>Loves</span>
            </h3>
            <span className="bs-panel__divider" aria-hidden="true" data-bs-panel-item />
            <p className="bs-panel__text" data-bs-panel-item>
              Discover our most popular and top-rated furniture pieces, trusted by hundreds of happy customers.
            </p>
            <a href="#categories" className="bs-pill" data-bs-panel-item>
              <span>Explore Collection</span>
              <span className="bs-pill__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </aside>

        <div
          className="bs-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Bestselling products"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div className="bs-carousel__viewport" ref={viewportRef}>
            <ul
              className={`bs-carousel__track${animate ? '' : ' no-anim'}`}
              style={{ '--pv': perView, '--index': index, '--slide-ms': `${SLIDE_MS}ms` }}
              onTransitionEnd={onTrackTransitionEnd}
              aria-live={hovered ? 'polite' : 'off'}
            >
              {slides.map((product, i) => (
                <ProductCard
                  key={`${product.id}-${i}`}
                  product={product}
                  isClone={i >= total}
                  isVisible={i >= index && i < index + perView}
                  liked={liked.has(product.id)}
                  onToggleLike={toggleLike}
                />
              ))}
            </ul>
          </div>

          <div className="bs-controls">
            <div className="bs-dots" role="tablist" aria-label="Choose product">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  className={`bs-dot${activeDot === i ? ' is-active' : ''}`}
                  aria-selected={activeDot === i}
                  aria-label={`Show ${p.name}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="bs-arrows">
              <button type="button" className="bs-arrow bs-arrow--prev" aria-label="Previous products" onClick={prev}>
                <Icon name="arrow-left" />
              </button>
              <button type="button" className="bs-arrow bs-arrow--next" aria-label="Next products" onClick={next}>
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="bs-bar" aria-label="Why customers choose NextFurn">
        {BENEFITS.map((b) => (
          <li key={b.title} className="bs-benefit" data-bs-benefit>
            <span className="bs-benefit__icon"><Icon name={b.icon} /></span>
            <span>
              <strong className="bs-benefit__title">{b.title}</strong>
              <span className="bs-benefit__text">{b.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}