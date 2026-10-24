import { useEffect } from 'react';
import gsap from 'gsap';
import officeDesk from '../assets/rooms/office-desk.webp';
import slide2 from '../../Assets/2nd slide img.png';
import slide3 from '../../Assets/3rd slide img.png';
import slide4 from '../../Assets/4th slide img.jpg';
import slide5 from '../../Assets/5th slide img.png';
import slide6 from '../../Assets/6th slide img.jpg';
import slide7 from '../../Assets/7th slide img.png';

const SLIDES = [
  {
    src: officeDesk,
    alt: 'Executive office desk with wood accents and city view',
    position: 'center 72%',
  },
  {
    src: slide2,
    alt: 'School and educational furniture solution',
    position: 'center center',
  },
  {
    src: slide3,
    alt: 'Hospital and healthcare furniture spaces',
    position: 'center center',
  },
  {
    src: slide4,
    alt: 'Hotel and premium hospitality furniture',
    position: 'center center',
  },
  {
    src: slide5,
    alt: 'Restaurant and cafe dining furniture',
    position: 'center center',
  },
  {
    src: slide6,
    alt: 'Training and institutional room furniture',
    position: 'center center',
  },
  {
    src: slide7,
    alt: 'Modular workstations and productive office furniture',
    position: 'center center',
  },
];

const HOLD = 7.5; // Display duration per slide before crossfading
const FADE_DURATION = 1.3; // Duration of smooth opacity crossfade
const ZOOM_DURATION = 8.8; // Duration of gentle Ken Burns zoom

/**
 * Creates the cinematic Ken Burns slider loop:
 * - Each incoming slide smoothly crossfades in with opacity (1.3s)
 * - The active image gently zooms from scale(1.00) to scale(1.045) over 8.8s
 * - Stacked layers prevent any blank frames or flashing
 * - Calls onSlideChange on every transition to synchronize hero content animation
 */
export function createRoomLoop(scope, onSlideChange) {
  const slides = gsap.utils.toArray('[data-slide]', scope);
  if (slides.length < 2) return null;

  const images = slides.map((slide) => slide.querySelector('img'));
  let index = 0;
  let timer = null;
  let currentZoomTween = null;

  // Initialize slides: slide 0 is visible at scale 1, all others hidden
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      autoAlpha: i === 0 ? 1 : 0,
      zIndex: i === 0 ? 1 : 0,
    });
    if (images[i]) {
      gsap.set(images[i], { scale: 1 });
    }
  });

  // Start gentle Ken Burns zoom on initial slide 0
  if (images[0]) {
    currentZoomTween = gsap.to(images[0], {
      scale: 1.045,
      duration: ZOOM_DURATION,
      ease: 'sine.inOut',
    });
  }

  const step = () => {
    const nextIndex = (index + 1) % slides.length;
    const currentSlide = slides[index];
    const nextSlide = slides[nextIndex];
    const currentImg = images[index];
    const nextImg = images[nextIndex];

    // Position next slide on top (zIndex: 2), current on (zIndex: 1)
    gsap.set(nextSlide, { zIndex: 2 });
    gsap.set(currentSlide, { zIndex: 1 });
    if (nextImg) {
      gsap.set(nextImg, { scale: 1 });
    }

    // Trigger hero content entrance animation on slide change
    if (typeof onSlideChange === 'function') {
      onSlideChange(nextIndex);
    }

    // 1. Smooth crossfade in for next slide
    gsap.fromTo(
      nextSlide,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: FADE_DURATION,
        ease: 'power2.inOut',
      }
    );

    // 2. Slow Ken Burns zoom on incoming image
    if (currentZoomTween) currentZoomTween.kill();
    if (nextImg) {
      currentZoomTween = gsap.to(nextImg, {
        scale: 1.045,
        duration: ZOOM_DURATION,
        ease: 'sine.inOut',
      });
    }

    // 3. Smooth crossfade out for outgoing slide
    gsap.to(currentSlide, {
      autoAlpha: 0,
      duration: FADE_DURATION,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 0 });
        if (currentImg) {
          gsap.set(currentImg, { scale: 1 });
        }
        index = nextIndex;
        // Schedule next transition
        timer = gsap.delayedCall(HOLD, step);
      },
    });
  };

  return {
    start() {
      if (!timer) {
        timer = gsap.delayedCall(HOLD, step);
      }
    },
    kill() {
      timer?.kill();
      currentZoomTween?.kill();
      gsap.killTweensOf(slides);
      gsap.killTweensOf(images);
      slides.forEach((slide, i) => {
        gsap.set(slide, { clearProps: 'zIndex,opacity,visibility' });
        if (images[i]) {
          gsap.set(images[i], { clearProps: 'transform' });
        }
      });
    },
  };
}

export default function RoomCarousel() {
  // Preload remaining slides in the background for instant transitions
  useEffect(() => {
    SLIDES.slice(1).forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  return (
    <div
      className="hero__showcase"
      data-anim="showcase"
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured rooms"
    >
      <div className="showcase__window">
        {SLIDES.map((slide, i) => (
          <figure
            key={slide.src}
            className={`showcase__slide${i === 0 ? ' is-active' : ''}`}
            data-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={{ objectPosition: slide.position }}
              fetchPriority={i <= 1 ? 'high' : 'auto'}
              loading={i <= 1 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

