import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgHero from '../assets/blog/blog-hero.jpg';
import imgOffice from '../assets/blog/office-open.jpg';
import imgHealth from '../assets/blog/healthcare.jpg';
import imgInstitute from '../assets/blog/institute.jpg';
import imgAuditorium from '../assets/blog/auditorium.jpg';
import imgRestaurant from '../assets/blog/restaurant.jpg';
import imgExecutive from '../assets/blog/executive.jpg';
import imgWorkspace from '../assets/blog/workspace.jpg';
import '../styles/blog-section.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'nextfurn12@gmail.com';
// Set to an API URL when a newsletter service exists; until then subscribing opens a pre-filled email.
const NEWSLETTER_ENDPOINT = null;

const CATEGORIES = [
  { id: 'all', label: 'All Posts', icon: 'grid' },
  { id: 'Office Furniture', label: 'Office Furniture', icon: 'chair' },
  { id: 'Healthcare', label: 'Healthcare', icon: 'cross' },
  { id: 'Institutional', label: 'Institutional', icon: 'building' },
  { id: 'Public Seating', label: 'Public Seating', icon: 'users' },
  { id: 'Design Trends', label: 'Design Trends', icon: 'palette' },
  { id: 'Product Guides', label: 'Product Guides', icon: 'doc' },
  { id: 'Industry Insights', label: 'Industry Insights', icon: 'chart' },
];

/* Sample articles from the design reference (dates and read times are placeholders).
   Replace with real posts and set `href` once article pages exist; without it the
   "Read More" links show as coming soon instead of linking nowhere. */
const POSTS = [
  { id: 'office-productivity', featured: true, cats: ['Office Furniture', 'Design Trends'], title: 'How Modern Office Furniture Boosts Productivity and Well-being', excerpt: 'Discover how thoughtfully designed office spaces can improve focus, collaboration and employee satisfaction in today\u2019s workplace.', date: '15 Mar 2025', read: '8 min read', image: imgOffice, alt: 'Open-plan office with modular workstations and a city view', href: null },
  { id: 'healing-spaces', cats: ['Healthcare', 'Industry Insights'], title: 'Designing Healing Spaces: The Role of Furniture in Healthcare', excerpt: 'Learn how ergonomics, comfort and thoughtful design contribute to better patient experiences.', date: '10 Mar 2025', read: '6 min read', image: imgHealth, alt: 'Hospital room with a patient bed and visitor chair', href: null },
  { id: 'education-furniture', cats: ['Institutional', 'Product Guides'], title: 'Choosing the Right Furniture for Educational Institutions', excerpt: 'A complete guide to selecting durable, functional and flexible furniture for modern learning spaces.', date: '08 Mar 2025', read: '7 min read', image: imgInstitute, alt: 'Training hall with rows of desks and chairs', href: null },
  { id: 'public-seating', cats: ['Public Seating', 'Design Trends'], title: 'Public Seating Solutions for Modern Spaces', excerpt: 'Explore innovative seating designs that combine durability, aesthetics and user comfort.', date: '05 Mar 2025', read: '5 min read', image: imgAuditorium, alt: 'Lecture auditorium with tiered seating', href: null },
  { id: 'sustainable', cats: ['Design Trends', 'Industry Insights'], title: 'Sustainable Furniture Trends for a Greener Future', excerpt: 'Materials, finishes and design choices that make furniture last longer and waste less.', date: '03 Mar 2025', read: '5 min read', image: imgRestaurant, alt: 'Restaurant with green velvet chairs and plants', href: null },
  { id: 'executive-office', cats: ['Office Furniture', 'Design Trends'], title: 'Executive Office Design Ideas for Modern Leaders', excerpt: 'Desk, seating and storage ideas for cabins that balance presence and practicality.', date: '28 Feb 2025', read: '6 min read', image: imgExecutive, alt: 'Executive cabin with a wooden desk and shelving', href: null },
  { id: 'future-workspaces', cats: ['Office Furniture', 'Industry Insights'], title: 'The Future of Workspaces: Trends to Watch', excerpt: 'Flexible layouts, hybrid work and the furniture that supports them.', date: '20 Feb 2025', read: '5 min read', image: imgWorkspace, alt: 'Minimal office desk by a window with a skyline view', href: null },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'grid': return <svg {...c}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>;
    case 'chair': return <svg {...c}><path d="M7 3h10v7a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z" /><path d="M5 9h2M17 9h2M12 13v4M8 21l4-4 4 4" /></svg>;
    case 'cross': return <svg {...c}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
    case 'building': return <svg {...c}><path d="M4 21V4h10v17M14 9h6v12M2 21h20" /><path d="M7 8h1M10 8h1M7 12h1M10 12h1M7 16h1M10 16h1M17 13h1M17 17h1" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    case 'palette': return <svg {...c}><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.3-1-1.6-1-2.8 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.3 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7" r="1" /></svg>;
    case 'doc': return <svg {...c}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>;
    case 'chart': return <svg {...c}><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V9M16 16v-6M15 6l3-2" /></svg>;
    case 'search': return <svg {...c} strokeWidth="2"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
    case 'close': return <svg {...c} strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case 'calendar': return <svg {...c}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>;
    case 'clock': return <svg {...c}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    case 'star': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;
    case 'mail': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v.4l-9 5.8-9-5.8z" /><path d="M3 9.2v8.3A1.5 1.5 0 0 0 4.5 19h15a1.5 1.5 0 0 0 1.5-1.5V9.2l-9 5.8z" /></svg>;
    default: return null;
  }
}

function Meta({ post, small }) {
  return (
    <p className={`bl-meta${small ? ' bl-meta--sm' : ''}`}>
      <span><Icon name="calendar" />{post.date}</span>
      <span><Icon name="clock" />{post.read}</span>
    </p>
  );
}

function ReadLink({ post, label }) {
  const inner = <>{label}<span className="bl-read__circle"><Icon name="arrow" /></span></>;
  return post.href
    ? <a className="bl-read" href={post.href}>{inner}</a>
    : <span className="bl-read is-pending" title="Full article coming soon">{inner}</span>;
}

function Cats({ post }) {
  return <p className="bl-cats">{post.cats.map((c, i) => <span key={c}>{i > 0 && <i aria-hidden="true">|</i>}{c}</span>)}</p>;
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
    const subject = encodeURIComponent('Blog newsletter subscription');
    const body = encodeURIComponent(`Please add ${value} to the NextFurn Overseas newsletter.`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus({ type: 'ok', text: 'Your email app has opened \u2014 send the message to complete your sign-up.' });
  };

  return (
    <aside className="bl-news" aria-labelledby="bl-news-title">
      <div className="bl-news__head">
        <span className="bl-news__icon"><Icon name="mail" /></span>
        <h3 id="bl-news-title">Stay Updated<br />with Our Latest Insights</h3>
      </div>
      <p className="bl-news__text">Subscribe to our newsletter for design tips, industry updates and exclusive content.</p>
      <form className="bl-news__form" onSubmit={onSubmit} noValidate>
        <label>
          <span className="visually-hidden">Email address</span>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus(null); }} placeholder="Enter your email address" autoComplete="email" aria-invalid={status?.type === 'error' || undefined} />
        </label>
        <button type="submit" aria-label="Subscribe"><Icon name="arrow" /></button>
      </form>
      {status && <p className={`bl-news__status is-${status.type}`} role="status">{status.text}</p>}
    </aside>
  );
}

export default function BlogSection() {
  const ref = useRef(null);
  const searchRef = useRef(null);
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = POSTS.filter((p) =>
    (cat === 'all' || p.cats.includes(cat)) &&
    (!q || `${p.title} ${p.excerpt} ${p.cats.join(' ')}`.toLowerCase().includes(q)));
  const [lead, ...rest] = filtered;
  const side = rest.slice(0, 3);
  const shown = new Set([lead, ...side].filter(Boolean).map((p) => p.id));
  const latest = POSTS.filter((p) => !shown.has(p.id)).slice(0, 3);

  const toggleSearch = () => {
    setSearchOpen((o) => {
      if (o) setQuery('');
      else requestAnimationFrame(() => searchRef.current?.focus());
      return !o;
    });
  };

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const s = gsap.utils.selector(el);
      const st = (t, start = 'top 82%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(s('.bl-hero')[0]) })
        .from(s('.bl-hero__img img'), { autoAlpha: 0, scale: 1.08, duration: 1.3 })
        .from(s('[data-bl-hero]'), { autoAlpha: 0, y: 22, duration: 0.8, stagger: 0.1 }, '<0.1')
        .from(s('.bl-quote'), { autoAlpha: 0, x: 24, duration: 0.8 }, '<0.3');
      gsap.from(s('.bl-filters'), { autoAlpha: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: st(s('.bl-filters')[0], 'top 90%') });
      gsap.from(s('.bl-grid > *'), { autoAlpha: 0, y: 30, scale: 0.97, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(s('.bl-grid')[0]) });
      gsap.from(s('.bl-more > *'), { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(s('.bl-more')[0], 'top 90%') });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="blog" className="bl" ref={ref} aria-labelledby="bl-title">
      <svg className="bl-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* Lounge photo: curved left edge out of the green panel, curved right edge into the quote panel */}
          <clipPath id="bl-clip-hero" clipPathUnits="objectBoundingBox">
            <path d="M0.12,0 H0.72 C0.67,0.28 0.69,0.56 0.8,0.78 C0.88,0.92 0.95,0.98 1,1 H0.02 C0.09,0.84 0.15,0.66 0.14,0.46 C0.13,0.28 0.08,0.12 0.12,0 Z" />
          </clipPath>
          <clipPath id="bl-clip-hero-rim" clipPathUnits="objectBoundingBox">
            <path d="M0.112,0 H0.728 C0.678,0.28 0.698,0.56 0.808,0.78 C0.888,0.92 0.958,0.98 1.008,1 H0.008 C0.078,0.84 0.138,0.66 0.128,0.46 C0.118,0.28 0.068,0.12 0.112,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ---------- Hero ---------- */}
      <div className="bl-hero">
        <div className="bl-hero__media" aria-hidden="true">
          <div className="bl-hero__rim" />
          <div className="bl-hero__img"><img src={imgHero} alt="" loading="lazy" decoding="async" /></div>
        </div>
        <div className="bl-hero__content">
          <p className="bl-eyebrow" data-bl-hero>Our Blog<span aria-hidden="true" /></p>
          <h2 id="bl-title" className="bl-hero__title" data-bl-hero>Ideas, Insights &amp;<br />Inspiration for<br /><span>Better Spaces</span></h2>
          <p className="bl-hero__text" data-bl-hero>Explore expert insights, design trends, industry updates and practical guides to help you create modern, functional and inspiring spaces.</p>
        </div>
        <blockquote className="bl-quote">
          <span className="bl-quote__mark" aria-hidden="true">&ldquo;</span>
          <p>Good design creates better conversations.</p>
          <span className="bl-quote__line" aria-hidden="true" />
          <footer>&mdash; NextFurn Overseas</footer>
        </blockquote>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="bl-filters">
        <ul className="bl-filters__list" role="tablist" aria-label="Blog categories">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button type="button" role="tab" aria-selected={cat === c.id} className={`bl-pill${cat === c.id ? ' is-active' : ''}`} onClick={() => setCat(c.id)}>
                <Icon name={c.icon} />{c.label}
              </button>
            </li>
          ))}
        </ul>
        <div className={`bl-search${searchOpen ? ' is-open' : ''}`}>
          <input ref={searchRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" aria-label="Search articles" tabIndex={searchOpen ? 0 : -1} />
          <button type="button" className="bl-search__btn" aria-label={searchOpen ? 'Close search' : 'Search articles'} aria-expanded={searchOpen} onClick={toggleSearch}>
            <Icon name={searchOpen ? 'close' : 'search'} />
          </button>
        </div>
      </div>

      {/* ---------- Grid ---------- */}
      <div className="bl-grid" aria-live="polite">
        {!lead && <p className="bl-empty">No articles match your search. Try another keyword or category.</p>}
        {lead && (
          <article className="bl-card bl-card--lead">
            <div className="bl-card__media">
              <img src={lead.image} alt={lead.alt} loading="lazy" decoding="async" />
              {lead.featured && <span className="bl-badge"><Icon name="star" />Featured</span>}
              <Meta post={lead} />
            </div>
            <div className="bl-card__body">
              <Cats post={lead} />
              <h3 className="bl-card__title">{lead.title}</h3>
              <p className="bl-card__excerpt">{lead.excerpt}</p>
              <ReadLink post={lead} label="Read Full Article" />
            </div>
          </article>
        )}
        {side.map((p) => (
          <article key={p.id} className="bl-card">
            <div className="bl-card__media"><img src={p.image} alt={p.alt} loading="lazy" decoding="async" /></div>
            <div className="bl-card__body">
              <Cats post={p} />
              <h3 className="bl-card__title">{p.title}</h3>
              <p className="bl-card__excerpt">{p.excerpt}</p>
              <Meta post={p} small />
              <ReadLink post={p} label="Read More" />
            </div>
          </article>
        ))}
      </div>

      {/* ---------- More + newsletter ---------- */}
      <div className="bl-more">
        <div className="bl-more__head">
          <p className="bl-eyebrow bl-eyebrow--dark">More Articles</p>
          <h3>Latest from<br />Our Blog</h3>
        </div>
        <ul className="bl-mini">
          {latest.map((p) => (
            <li key={p.id} className="bl-mini__item">
              <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              <span>
                <strong>{p.title}</strong>
                <Meta post={p} small />
              </span>
            </li>
          ))}
        </ul>
        <Newsletter />
      </div>
    </section>
  );
}