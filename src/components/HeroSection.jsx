import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from './Header.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import ScrollIndicator from './ScrollIndicator.jsx';
import RoomCarousel, { createRoomLoop } from './RoomCarousel.jsx';
import '../styles/hero.css';

const CAPTION = ['Interiors.', 'Places & Spaces.', 'Furniture.'];

export default function HeroSection() {
  const rootRef = useRef(null);
  const contentTlRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia(root);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root);

      // Replayable content reveal sequence for the left-side hero text & buttons
      const animateHeroContent = () => {
        if (contentTlRef.current) {
          contentTlRef.current.kill();
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          q('[data-hero-anim="eyebrow"]'),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.65 }
        )
          .fromTo(
            q('.hero__title-line'),
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1 },
            '-=0.45'
          )
          .fromTo(
            q('[data-hero-anim="subtitle"]'),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            '-=0.5'
          )
          .fromTo(
            q('[data-hero-anim="desc"]'),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            '-=0.5'
          )
          .fromTo(
            q('.hero__btn'),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 },
            '-=0.45'
          );

        contentTlRef.current = tl;
        return tl;
      };

      // Create carousel loop with callback to re-animate content on slide change
      const roomLoop = createRoomLoop(root, () => {
        animateHeroContent();
      });

      // Master entrance timeline
      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
        .from(q('[data-anim="nav"]'), { autoAlpha: 0, y: 14, duration: 0.75, stagger: 0.06 }, '-=0.35')
        .from(q('[data-anim="showcase"]'), { autoAlpha: 0, y: 80, duration: 1.4, ease: 'expo.out' }, '-=0.5')
        .from(q('.hero__content-glow'), { autoAlpha: 0, duration: 1.1, ease: 'power2.out' }, '-=0.9')
        .from(q('.hero__shade'), { autoAlpha: 0, duration: 1.1, ease: 'power1.out' }, '-=0.9')
        .add(() => {
          animateHeroContent();
        }, '-=0.6')
        .from(q('.hero__caption span'), { autoAlpha: 0, y: 12, duration: 0.75, stagger: 0.08 }, '-=0.5')
        .from(q('[data-anim="scroll"]'), { autoAlpha: 0, y: 14, scale: 0.85, duration: 0.85 }, '-=0.4')
        .add(() => roomLoop?.start());

      return () => {
        roomLoop?.kill();
        contentTlRef.current?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" ref={rootRef} aria-labelledby="hero-title">
      <AnnouncementBar />
      <Header />

      <div className="hero__stage">
        <h1 id="hero-title" className="visually-hidden">
          NextFurn — Complete Furniture Solutions For Every Environment
        </h1>

        <RoomCarousel />

        {/* Left-side content panel */}
        <div className="hero__content" data-anim="content">

          <div className="hero__heading-group">
            <span className="hero__copper-accent-bar" aria-hidden="true" />
            <div className="hero__heading-body">
              <p className="hero__eyebrow" data-hero-anim="eyebrow">
                PREMIUM QUALITY &nbsp;|&nbsp; LASTING COMFORT
              </p>
              <h2 className="hero__title" data-hero-anim="title">
                <span className="hero__title-line hero__title-line--green">Complete Furniture</span>
                <span className="hero__title-line hero__title-line--copper">Solutions</span>
              </h2>
            </div>
          </div>

          <h3 className="hero__subtitle" data-hero-anim="subtitle">
            For Every Environment
          </h3>

          <p className="hero__description" data-hero-anim="desc">
            Manufacturing smart, durable and stylish furniture for offices, schools, hospitals, hotels, restaurants and more.
          </p>

          <div className="hero__actions" data-hero-anim="actions">
            <a href="#products" className="hero__btn hero__btn--primary">
              <span>Our Collection</span>
              <svg className="hero__btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 12h15" />
                <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--secondary">
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        <div className="hero__shade" aria-hidden="true" />

        <ScrollIndicator targetId="categories" />

        <p className="hero__caption">
          {CAPTION.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

