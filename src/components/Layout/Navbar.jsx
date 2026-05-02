import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useMousePosition';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 50;
  const { lang } = useLang();

  const links = [
    { href: '#home', key: 'home', label: t('nav.home', lang) },
    { href: '#about', key: 'about', label: t('nav.about', lang) },
    { href: '#portfolio', key: 'portfolio', label: t('nav.portfolio', lang) },
    { href: '#services', key: 'services', label: t('nav.services', lang) },
    { href: '#pricing', key: 'pricing', label: t('nav.pricing', lang) },
    { href: '#testimonials', key: 'testimonials', label: t('nav.testimonials', lang) },
    { href: '#process', key: 'process', label: t('nav.process', lang) },
    { href: '#contact', key: 'contact', label: t('nav.contact', lang) },
  ];

  const handleClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.focus();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        id="navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => handleClick(e, '#home')}
            aria-label="Ash photogRaf - Home"
          >
            Ash <span>photogRaf</span>
          </a>

          <ul className="navbar-links" role="list">
            {links.map((link) => (
              <li key={link.href} role="listitem">
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />

          <a
            href="#contact"
            className="btn-primary navbar-cta"
            onClick={(e) => handleClick(e, '#contact')}
            aria-label={t('nav.bookNow', lang)}
          >
            {t('nav.bookNow', lang)}
          </a>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <LanguageSwitcher />
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-primary"
              onClick={(e) => handleClick(e, '#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: '20px' }}
              aria-label={t('nav.bookSession', lang)}
            >
              {t('nav.bookSession', lang)}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
