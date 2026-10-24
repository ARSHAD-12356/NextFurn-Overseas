import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES, PRODUCTS } from '../data/products.js';
import imgLounge from '../assets/products/lounge-corner.jpg';
import '../styles/our-products.css';

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 3500;
const formatINR = (n) => `\u20B9${n.toLocaleString('en-IN')}`;

function perViewFor(width) {
  if (width >= 940) return 4;
  if (width >= 700) return 3;
  if (width >= 460) return 2;
  return 1;
}

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'arrow-left': return <svg {...c} strokeWidth="2"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>;
    case 'heart': return <svg {...c}><path d="M12 20s-7-4.35-9.2-8.7C1.3 8.3 3.2 5 6.4 5c2 0 3.3 1.1 3.9 2.2h3.4C14.3 6.1 15.6 5 17.6 5c3.2 0 5.1 3.3 3.6 6.3C19 15.65 12 20 12 20z" /></svg>;
    case 'cart': return <svg {...c} strokeWidth="1.9"><path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" /><circle cx="10" cy="19.5" r="1.4" fill="currentColor" /><circle cx="17" cy="19.5" r="1.4" fill="currentColor" /></svg>;
    case 'check': return <svg {...c} strokeWidth="2.2"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
    case 'layers': return <svg {...c}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></svg>;
    case 'truck': return <svg {...c}><path d="M2 6h11v10H2z" /><path d="M13 9h4.5L21 12.5V16h-8z" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
    case 'headset': return <svg {...c}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /></svg>;
    default: return null;
  }
}

function ProductCard({ product, inactive, liked, onLike, cart, onAdd }) {
  const [vi, setVi] = useState(0);
  const variant = product.variants[vi];
  const multi = product.variants.length > 1;
  const cartKey = `${product.id}:${variant.model}:${variant.label}`;
  const added = cart.has(cartKey);
  const tab = inactive ? -1 : 0;

  return (
    <article className="op-card" data-op-card>
      <div className="op-card__media">
        {product.variants.map((pv, i) => (
          <img key={pv.image} src={pv.image} alt={i === vi ? `${product.name} ${pv.label}` : ''} className={i === vi ? 'is-current' : ''} loading="lazy" decoding="async" width="800" height="640" />
        ))}
        {multi && (
          <span className="op-card__badge"><Icon name="layers" />{product.variants.length} Variants</span>
        )}
        <button type="button" className={`op-card__like${liked ? ' is-liked' : ''}`} aria-pressed={liked}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} tabIndex={tab} onClick={() => onLike(product.id)}>
          <Icon name="heart" />
        </button>
      </div>

      {multi ? (
        <div className="op-card__thumbs" role="group" aria-label={`${product.name} variants`}>
          {product.variants.map((pv, i) => (
            <button key={pv.image} type="button" className={`op-card__thumb${i === vi ? ' is-current' : ''}`} aria-pressed={i === vi}
              aria-label={`${pv.label} (${pv.model})`} tabIndex={tab} onClick={() => setVi(i)}>
              <img src={pv.image} alt="" loading="lazy" decoding="async" />
              <span>{pv.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="op-card__single"><span>{variant.label}</span></p>
      )}

      <div className="op-card__body">
        <p className="op-card__type">{product.type}</p>
        <h3 className="op-card__name">{product.name}{multi ? ` \u2013 ${variant.label}` : ''}</h3>
        <p className="op-card__desc">{product.desc}</p>
        <p className="op-card__price-row">
          <span className="op-card__price">{formatINR(variant.price)}</span>
          <span className="op-card__model">{variant.model}</span>
        </p>
        <button type="button" className={`op-card__cart${added ? ' is-added' : ''}`} tabIndex={tab} onClick={() => onAdd(cartKey)}>
          <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
          <Icon name={added ? 'check' : 'cart'} />
        </button>
      </div>
    </article>
  );
}

export default function OurProductsSection() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const viewportRef = useRef(null);
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liked, setLiked] = useState(() => new Set());
  const [cart, setCart] = useState(() => new Set());
  const touchX = useRef(null);

  const products = PRODUCTS.filter((p) => p.category === active);
  const pages = Math.max(1, products.length - perView + 1);
  const page = Math.min(index, pages - 1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setPerView(perViewFor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    document.addEventListener('visibilitychange', onVis);
    mq.addEventListener('change', onMq);
    return () => { document.removeEventListener('visibilitychange', onVis); mq.removeEventListener('change', onMq); };
  }, []);

  const go = (n) => setIndex(((n % pages) + pages) % pages);

  useEffect(() => {
    if (pages < 2 || paused || pageHidden || reducedMotion) return undefined;
    const id = setTimeout(() => go(page + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  });

  const choose = (id) => {
    setActive(id);
    setIndex(0);
    railRef.current?.querySelector(`[data-cat="${id}"]`)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
  };
  const stepCat = (d) => {
    const i = CATEGORIES.findIndex((c) => c.id === active);
    choose(CATEGORIES[(i + d + CATEGORIES.length) % CATEGORIES.length].id);
  };
  const toggle = (setter) => (key) => setter((s) => { const n = new Set(s); if (n.has(key)) n.delete(key); else n.add(key); return n; });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      const st = (t, start = 'top 82%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.from(q('[data-op-head]'), { autoAlpha: 0, y: 26, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(q('.op-head')[0], 'top 85%') });
      gsap.from(q('.op-rail'), { autoAlpha: 0, y: 30, scale: 0.98, duration: 1, ease: 'power3.out', scrollTrigger: st(q('.op-rail')[0], 'top 88%') });
      gsap.from(q('.op-cat'), { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.06, delay: 0.15, ease: 'power3.out', scrollTrigger: st(q('.op-rail')[0], 'top 88%') });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(q('.op-lower')[0]) })
        .from(q('.op-panel__shape'), { autoAlpha: 0, xPercent: -10, duration: 1.1, ease: 'expo.out' })
        .from(q('[data-op-panel]'), { autoAlpha: 0, x: -20, duration: 0.7, stagger: 0.08 }, '<0.2')
        .from(q('.op-tabs'), { autoAlpha: 0, y: 16, duration: 0.6 }, '<0.1')
        .from(q('[data-op-card]'), { autoAlpha: 0, y: 30, scale: 0.95, duration: 0.8, stagger: 0.09 }, '<0.1');
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="products" className="op-section" ref={sectionRef} aria-labelledby="op-title">
      <svg className="op-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="op-clip-corner" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 C0.86,0.18 0.62,0.46 0.42,0.72 C0.3,0.88 0.16,0.97 0,1 Z" />
          </clipPath>
          <clipPath id="op-clip-panel" clipPathUnits="objectBoundingBox">
            <path d="M0,0.06 C0.25,0.01 0.6,-0.01 0.82,0.05 C0.98,0.1 1,0.24 0.96,0.38 C0.9,0.56 0.84,0.72 0.86,0.86 C0.88,0.94 0.95,0.98 1,1 L0,1 Z" />
          </clipPath>
          <clipPath id="op-clip-panel-in" clipPathUnits="objectBoundingBox">
            <path d="M0,0.068 C0.25,0.018 0.59,0.004 0.8,0.062 C0.95,0.11 0.97,0.24 0.93,0.38 C0.87,0.56 0.81,0.72 0.83,0.86 C0.85,0.94 0.91,0.98 0.95,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="op-corner" aria-hidden="true"><img src={imgLounge} alt="" loading="lazy" /></div>
      <p className="op-script" aria-hidden="true">Solutions<br />for Every Space</p>

      <header className="op-head">
        <p className="op-eyebrow" data-op-head><span aria-hidden="true" />Our Products<span aria-hidden="true" /></p>
        <h2 id="op-title" className="op-title" data-op-head>Discover Our <span>Complete Range</span></h2>
        <p className="op-subtitle" data-op-head>
          From modern workspaces to comfortable lounges, healthcare solutions to institutional furniture,
          explore our wide range of premium furniture crafted for every space.
        </p>
      </header>

      <nav className="op-rail" aria-label="Product categories">
        <button type="button" className="op-round" aria-label="Previous category" onClick={() => stepCat(-1)}><Icon name="arrow-left" /></button>
        <ul className="op-rail__list" ref={railRef}>
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id}>
                <button type="button" data-cat={c.id} className={`op-cat${active === c.id ? ' is-active' : ''}`} aria-pressed={active === c.id} onClick={() => choose(c.id)}>
                  <span className="op-cat__img"><img src={c.image} alt="" loading="lazy" decoding="async" /></span>
                  <span className="op-cat__label">{c.label}</span>
                  <span className="op-cat__count">({count} Featured)</span>
                  <span className="op-cat__go" aria-hidden="true"><Icon name="arrow" /></span>
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className="op-round" aria-label="Next category" onClick={() => stepCat(1)}><Icon name="arrow" /></button>
      </nav>

      <div className="op-lower">
        <aside className="op-panel" aria-labelledby="op-panel-title">
          <div className="op-panel__shape" aria-hidden="true">
            <div className="op-panel__rim" />
            <div className="op-panel__fill" />
          </div>
          <div className="op-panel__content">
            <p className="op-panel__eyebrow" data-op-panel>Featured Products</p>
            <h3 id="op-panel-title" className="op-panel__title" data-op-panel>Top Picks<br />for Your Space</h3>
            <p className="op-panel__text" data-op-panel>Premium furniture designed for comfort, style and long lasting performance.</p>
            <ul className="op-panel__features" data-op-panel>
              <li><span><Icon name="diamond" /></span>Premium<br />Build Quality</li>
              <li><span><Icon name="truck" /></span>Wide<br />Product Range</li>
              <li><span><Icon name="headset" /></span>Trusted<br />By 1000+ Clients</li>
            </ul>
            <a href="#categories" className="op-btn" data-op-panel>
              <span>View All Products</span>
              <span className="op-btn__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </aside>

        <div className="op-products">
          <div className="op-tabs">
            <ul className="op-tabs__list" role="tablist" aria-label="Filter products">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button type="button" role="tab" aria-selected={active === c.id} className={`op-tab${active === c.id ? ' is-active' : ''}`} onClick={() => choose(c.id)}>
                    {c.label.replace(' Furniture', '')}
                  </button>
                </li>
              ))}
            </ul>
            <div className="op-tabs__arrows">
              <button type="button" className="op-round op-round--sm" aria-label="Previous products" onClick={() => go(page - 1)} disabled={pages < 2}><Icon name="arrow-left" /></button>
              <button type="button" className="op-round op-round--sm" aria-label="Next products" onClick={() => go(page + 1)} disabled={pages < 2}><Icon name="arrow" /></button>
            </div>
          </div>

          <div
            className="op-viewport"
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured products"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
              if (Math.abs(dx) > 40) go(page + (dx < 0 ? 1 : -1));
              touchX.current = null;
              setPaused(false);
            }}
          >
            <ul className="op-track" style={{ '--pv': perView, '--index': page }}>
              {products.map((p, i) => (
                <li key={p.id} className="op-slide">
                  <ProductCard
                    product={p}
                    inactive={i < page || i >= page + perView}
                    liked={liked.has(p.id)}
                    onLike={toggle(setLiked)}
                    cart={cart}
                    onAdd={toggle(setCart)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {pages > 1 && (
            <div className="op-dots">
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} type="button" className={`op-dot${i === page ? ' is-active' : ''}`} aria-label={`Go to slide ${i + 1}`} aria-current={i === page} onClick={() => go(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}