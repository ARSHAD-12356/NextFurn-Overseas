import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/category-section.css';

import img01 from '../assets/categories/cat-office.jpg';
import img02 from '../assets/categories/cat-modular.png';
import img03 from '../assets/categories/cat-education.jpg';
import img04 from '../assets/categories/cat-restaurant.png';
import img05 from '../assets/categories/cat-institute.jpg';
import img06 from '../assets/categories/cat-school.jpg';
import img07 from '../assets/categories/cat-hospital.jpg';

const CATEGORIES = [
  {
    number: '01',
    title: 'Office Furniture',
    desc: 'Stylish & ergonomic furniture for modern workspaces.',
    image: img01,
    alt: 'Executive office with walnut desk, leather chair and city view',
    theme: 'green',
    href: '#office-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Executive office chair */}
        <path d="M7 3h10v8a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V3z" />
        <path d="M5 9h2" />
        <path d="M17 9h2" />
        <path d="M12 14v4" />
        <path d="M8 21l4-3 4 3" />
        <circle cx="8" cy="21" r="1" />
        <circle cx="16" cy="21" r="1" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Modular Workstation',
    desc: 'Flexible and efficient workstations for productive teams.',
    image: img02,
    alt: 'Modern open-plan office with modular workstations and green divider screens',
    theme: 'copper',
    href: '#modular-workstation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Modular workstation with desk and monitor */}
        <rect x="3" y="14" width="18" height="4" rx="1" />
        <path d="M5 18v3M19 18v3" />
        <path d="M8 6h8v5H8z" />
        <path d="M12 11v3" />
        <path d="M3 14h18" />
        <path d="M7 3h10" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Education Furniture',
    desc: 'Smart and durable furniture for better learning environments.',
    image: img03,
    alt: 'School classroom with wooden student desks, chairs and chalkboard',
    theme: 'green',
    href: '#education-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Graduation mortarboard and book */}
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Resturant & Cafe Furniture',
    desc: 'Inviting furniture for great food and better conversations.',
    image: img04,
    alt: 'Restaurant and cafe interior with wooden tables and warm pendant lighting',
    theme: 'copper',
    href: '#restaurant-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Fork, spoon and dining dining utensils */}
        <path d="M18 2v20M18 2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3M6 2v6a3 3 0 0 0 3 3v11M6 2a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Institute Furniture',
    desc: 'Functional and modern furniture for institutes and training centers.',
    image: img05,
    alt: 'Institute seminar and training hall with long rows of tables and presentation screen',
    theme: 'green',
    href: '#institute-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Classical institute / university columns facade */}
        <path d="M3 21h18M3 10h18M12 3l9 4H3l9-4z" />
        <path d="M6 10v7M10 10v7M14 10v7M18 10v7" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'School & Educational Furniture',
    desc: 'Smart and durable furniture for better learning environments.',
    image: img06,
    alt: 'Colorful kindergarten classroom with small bright student desks and chairs',
    theme: 'copper',
    href: '#school-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Child study desk and chair */}
        <rect x="4" y="13" width="16" height="4" rx="1" />
        <path d="M6 17v4M18 17v4" />
        <path d="M7 6h10a2 2 0 0 1 2 2v5H5V8a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Hospital Furniture',
    desc: 'Comfort, safety and functionality for healthcare spaces.',
    image: img07,
    alt: 'Modern hospital patient room with adjustable medical bed and clinical equipment',
    theme: 'green',
    href: '#hospital-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Medical hospital bed with health cross */}
        <path d="M2 4v16" />
        <path d="M2 14h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8" />
        <path d="M22 10v10" />
        <circle cx="6" cy="10" r="1.5" />
        <path d="M14 6v4" />
        <path d="M12 8h4" />
      </svg>
    ),
  },
];

gsap.registerPlugin(ScrollTrigger);

// Cards are split into three viewport-sized "screens": heading + 2, then 3, then 2
const SCREENS = [
  CATEGORIES.slice(0, 2),
  CATEGORIES.slice(2, 5),
  CATEGORIES.slice(5),
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CategoryCard({ cat, index }) {
  const isReversed = index % 2 === 1;

  return (
    <article
      className={`cat-card cat-card--${cat.theme}${isReversed ? ' cat-card--reversed' : ''}${index === 0 ? ' cat-card--swoosh' : ''}`}
      data-cat-card
    >
      <div className="cat-card__content">
        <div className="cat-card__top" data-cat-item>
          <span className="cat-card__number">{cat.number}</span>
          <span className="cat-card__line" aria-hidden="true" />
        </div>

        <div className="cat-card__body">
          <div className="cat-card__icon" aria-hidden="true" data-cat-item>
            {cat.icon}
          </div>

          <div className="cat-card__text">
            <h3 className="cat-card__title" data-cat-item>{cat.title}</h3>
            <p className="cat-card__desc" data-cat-item>{cat.desc}</p>
            <a href={cat.href} className="cat-card__btn" data-cat-item>
              <span>Explore Now</span>
              <span className="cat-card__btn-circle">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="cat-card__accent" aria-hidden="true" />
      <div className="cat-card__media">
        <img
          src={cat.image}
          alt={cat.alt}
          className="cat-card__img"
          loading={index <= 1 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </article>
  );
}

export default function CategorySection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      gsap.from(q('[data-cat-head]'), {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('.cat-section__header')[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      });

      q('[data-cat-card]').forEach((card) => {
        const reversed = card.classList.contains('cat-card--reversed');
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        });

        tl.from(card, { autoAlpha: 0, y: 70, duration: 0.9 })
          .from(card.querySelector('.cat-card__media'), { xPercent: reversed ? -6 : 6, autoAlpha: 0, duration: 1.1 }, '<0.1')
          .from(card.querySelector('.cat-card__img'), { scale: 1.18, duration: 1.4, ease: 'power2.out' }, '<')
          .from(card.querySelector('.cat-card__accent'), { xPercent: reversed ? -10 : 10, autoAlpha: 0, duration: 1 }, '<0.1')
          .from(card.querySelectorAll('[data-cat-item]'), { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.07 }, '<0.1');
      });
    });

    return () => mm.revert();
  }, []);

  let cardIndex = 0;

  return (
    <section id="categories" className="cat-section" ref={sectionRef} aria-labelledby="cat-section-title">
      {/* Curved edges for the photo and its accent band, mirrored for reversed cards */}
      <svg className="cat-section__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="cat-clip-media" clipPathUnits="objectBoundingBox">
            <path d="M0.07,0 C0.15,0.03 0.1,0.6 0.19,0.87 C0.22,0.96 0.26,1 0.33,1 L1,1 L1,0 Z" />
          </clipPath>
          <clipPath id="cat-clip-media-rev" clipPathUnits="objectBoundingBox">
            <path d="M0.93,0 C0.85,0.03 0.9,0.6 0.81,0.87 C0.78,0.96 0.74,1 0.67,1 L0,1 L0,0 Z" />
          </clipPath>
          <clipPath id="cat-clip-accent" clipPathUnits="objectBoundingBox">
            <path d="M0.05,0 C0.13,0.03 0.075,0.61 0.16,0.89 C0.19,0.98 0.235,1 0.31,1 L1,1 L1,0 Z" />
          </clipPath>
          <clipPath id="cat-clip-accent-rev" clipPathUnits="objectBoundingBox">
            <path d="M0.95,0 C0.87,0.03 0.925,0.61 0.84,0.89 C0.81,0.98 0.765,1 0.69,1 L0,1 L0,0 Z" />
          </clipPath>
          <clipPath id="cat-clip-swoosh" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.445 C0.43,0.07 0.4,0.11 0.34,0.11 H0.06 C0.025,0.11 0.008,0.22 0,0.46 Z" />
          </clipPath>
        </defs>
      </svg>

      {SCREENS.map((group, screenIndex) => (
        <div key={screenIndex} className={`cat-section__screen cat-section__screen--${screenIndex + 1}`}>
          {screenIndex === 0 && (
            <header className="cat-section__header">
              <p className="cat-section__eyebrow" data-cat-head>
                <span className="cat-section__eyebrow-line" aria-hidden="true" />
                Our Categories
                <span className="cat-section__eyebrow-line" aria-hidden="true" />
              </p>
              <h2 id="cat-section-title" className="cat-section__title" data-cat-head>
                Explore Our <span className="cat-section__title-accent">Furniture Range</span>
              </h2>
              <p className="cat-section__subtitle" data-cat-head>
                Thoughtfully designed furniture solutions for every space and every need.
              </p>
            </header>
          )}

          <div className="cat-section__list">
            {group.map((cat) => {
              const i = cardIndex++;
              return <CategoryCard key={cat.number} cat={cat} index={i} />;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
