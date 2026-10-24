import { useEffect, useState, useRef } from 'react';
import logo from '../../Assets/logo.png';
import imgOffice from '../assets/categories/cat-office.jpg';
import imgSchool from '../assets/categories/cat-school.jpg';
import imgHospital from '../assets/categories/cat-hospital.jpg';
import imgHotel from '../../Assets/4th slide img.jpg';
import imgRestaurant from '../assets/categories/cat-restaurant.png';
import imgTraining from '../assets/categories/cat-institute.jpg';
import imgModular from '../assets/categories/cat-modular.png';
import '../styles/header.css';

const PRODUCT_CATEGORIES = [
  {
    id: 'office',
    image: imgOffice,
    title: 'Office Furniture',
    desc: 'Ergonomic chairs, desks, workstations and more for modern offices.',
    href: '#office-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Office Chair icon */}
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
    id: 'school',
    image: imgSchool,
    title: 'School & Educational Furniture',
    desc: 'Durable, safe and smart furniture for better learning.',
    href: '#school-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Graduation cap & book */}
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'hospital',
    image: imgHospital,
    title: 'Hospital Furniture',
    desc: 'High-quality furniture for hospitals and healthcare spaces.',
    href: '#hospital-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Hospital bed with medical cross */}
        <path d="M2 4v16" />
        <path d="M2 14h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8" />
        <path d="M22 10v10" />
        <circle cx="6" cy="10" r="1.5" />
        <path d="M14 6v4" />
        <path d="M12 8h4" />
      </svg>
    ),
  },
  {
    id: 'hotel',
    image: imgHotel,
    title: 'Hotel & Hospitality Furniture',
    desc: 'Elegant and comfortable furniture for premium hospitality.',
    href: '#hotel-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Luxury cloche / bed */}
        <path d="M3 17h18" />
        <path d="M4 17a8 8 0 0 1 16 0" />
        <path d="M12 9V6" />
        <circle cx="12" cy="5" r="1" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    image: imgRestaurant,
    title: 'Restaurant & Café Furniture',
    desc: 'Stylish, strong and comfortable furniture for dining spaces.',
    href: '#restaurant-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Dining table & chairs */}
        <path d="M8 21v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8" />
        <path d="M6 7h12" />
        <path d="M12 7v4" />
        <path d="M4 14h2" />
        <path d="M18 14h2" />
      </svg>
    ),
  },
  {
    id: 'training',
    image: imgTraining,
    title: 'Training & Institutional Furniture',
    desc: 'Perfect solutions for training rooms, seminar halls and institutions.',
    href: '#training-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Seminar presentation screen and group */}
        <path d="M3 3h18v10H3z" />
        <path d="M12 13v5" />
        <path d="M8 21h8" />
        <path d="M7 7h5" />
      </svg>
    ),
  },
  {
    id: 'modular',
    image: imgModular,
    title: 'Modular Workstations',
    desc: 'Modern, space-saving and productive workstation solutions.',
    href: '#modular-workstations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Modular workstation pod */}
        <rect x="3" y="4" width="8" height="7" rx="1.5" />
        <rect x="13" y="4" width="8" height="7" rx="1.5" />
        <rect x="3" y="13" width="8" height="7" rx="1.5" />
        <rect x="13" y="13" width="8" height="7" rx="1.5" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Product Category', href: '#products', isDropdown: true },
  { label: 'Investor', href: '#investor' },
  { label: 'Career', href: '#career' },
  { label: 'Brochures', href: '#brochures' },
];

function ArrowRight() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function ChevronDown({ className = '' }) {
  return (
    <svg className={`chevron-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0].href);
  const [previewIndex, setPreviewIndex] = useState(0);
  const dropdownCloseTimeoutRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleMouseEnter = () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 120);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };

  const close = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`site-header${menuOpen ? ' is-open' : ''}`}>
      <a href="/" className="site-header__logo" aria-label="NextFurn — home">
        <img src={logo} alt="NextFurn Overseas" width="2051" height="767" />
      </a>

      <nav className="site-header__nav" aria-label="Primary">
        <ul>
          {NAV_LINKS.map((link) => {
            if (link.isDropdown) {
              return (
                <li
                  key={link.label}
                  data-anim="nav"
                  className={`nav-item--dropdown${dropdownOpen ? ' is-open' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`nav-link nav-link--dropdown${dropdownOpen ? ' is-active' : ''}`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="nav-link__chevron" />
                  </button>

                  <div
                    className={`cat-menu${dropdownOpen ? ' is-visible' : ''}`}
                    role="menu"
                    aria-label="Product Categories"
                  >
                    <div className="cat-menu__list">
                      <p className="cat-menu__eyebrow">
                        <span>Product Categories</span>
                        <span className="cat-menu__count">0{PRODUCT_CATEGORIES.length}</span>
                      </p>

                      <ul>
                        {PRODUCT_CATEGORIES.map((category, i) => (
                          <li key={category.id} style={{ '--i': i }}>
                            <a
                              href={category.href}
                              className={`cat-menu__item${previewIndex === i ? ' is-current' : ''}`}
                              role="menuitem"
                              onMouseEnter={() => setPreviewIndex(i)}
                              onFocus={() => setPreviewIndex(i)}
                              onClick={() => {
                                setActive('#products');
                                setDropdownOpen(false);
                              }}
                            >
                              <span className="cat-menu__icon">{category.icon}</span>
                              <span className="cat-menu__title">{category.title}</span>
                              <svg className="cat-menu__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" />
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={PRODUCT_CATEGORIES[previewIndex].href}
                      className="cat-menu__preview"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => {
                        setActive('#products');
                        setDropdownOpen(false);
                      }}
                    >
                      {PRODUCT_CATEGORIES.map((category, i) => (
                        <img
                          key={category.id}
                          src={category.image}
                          alt=""
                          loading="lazy"
                          className={`cat-menu__img${previewIndex === i ? ' is-current' : ''}`}
                        />
                      ))}
                      <span className="cat-menu__preview-body" key={previewIndex}>
                        <span className="cat-menu__preview-num">
                          {String(previewIndex + 1).padStart(2, '0')} / 0{PRODUCT_CATEGORIES.length}
                        </span>
                        <span className="cat-menu__preview-title">{PRODUCT_CATEGORIES[previewIndex].title}</span>
                        <span className="cat-menu__preview-desc">{PRODUCT_CATEGORIES[previewIndex].desc}</span>
                        <span className="cat-menu__preview-link">
                          Explore range
                          <ArrowRight />
                        </span>
                      </span>
                    </a>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.label} data-anim="nav">
                <a
                  href={link.href}
                  className={`nav-link${active === link.href ? ' is-active' : ''}`}
                  aria-current={active === link.href ? 'true' : undefined}
                  onClick={() => setActive(link.href)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cart and account entry points; there is no store backend yet, so they lead to the
          product range and the enquiry form. */}
      <div className="site-header__icons" data-anim="nav">
        <a href="#products" className="site-header__icon" aria-label="Cart — browse products">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" />
            <circle cx="10" cy="19.5" r="1.3" />
            <circle cx="17" cy="19.5" r="1.3" />
          </svg>
        </a>
        <a href="#contact" className="site-header__icon" aria-label="Account — contact our team">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.8" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
          </svg>
        </a>
      </div>

      <a href="#contact" className="site-header__contact" data-anim="nav">
        <span>CONTACT US</span>
        <ArrowRight />
      </a>

      <button
        type="button"
        className="site-header__toggle"
        data-anim="nav"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="site-header__toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
        <span className="site-header__toggle-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <ul className="mobile-menu__list">
          {NAV_LINKS.map((link, i) => {
            if (link.isDropdown) {
              return (
                <li key={link.label} style={{ '--i': i }} className="mobile-menu__dropdown-wrapper">
                  <button
                    type="button"
                    className="mobile-menu__accordion-trigger"
                    aria-expanded={mobileCategoryOpen}
                    onClick={() => setMobileCategoryOpen((prev) => !prev)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`mobile-menu__chevron${mobileCategoryOpen ? ' is-rotated' : ''}`} />
                  </button>

                  <div className={`mobile-menu__categories${mobileCategoryOpen ? ' is-expanded' : ''}`}>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <a
                        key={category.id}
                        href={category.href}
                        className="mobile-category-item"
                        onClick={close}
                      >
                        <span className="mobile-category-item__icon">{category.icon}</span>
                        <div>
                          <span className="mobile-category-item__title">{category.title}</span>
                          <span className="mobile-category-item__desc">{category.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </li>
              );
            }

            return (
              <li key={link.label} style={{ '--i': i }}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            );
          })}
          <li style={{ '--i': NAV_LINKS.length }}>
            <a href="#contact" className="mobile-menu__contact" onClick={close}>
              <span>CONTACT US</span>
              <ArrowRight />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

