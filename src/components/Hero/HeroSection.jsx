import { useEffect, useRef, useState } from 'react';
import { Scene3D } from './Scene3D';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function HeroSection() {
  const [showFlash, setShowFlash] = useState(false);
  const heroRef = useRef(null);
  const { lang } = useLang();

  // Animate hero text on mount
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.hero-animate');
    if (!els) return;

    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 600 + i * 200);
    });
  }, []);

  const handleClick = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 350);
  };

  return (
    <section className="hero" id="home" onClick={handleClick} ref={heroRef}>
      <Scene3D />

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-subtitle hero-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {t('hero.subtitle', lang)}
        </p>
        <h1 className="hero-title hero-animate" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          Ash <span className="accent">photogRaf</span>
        </h1>
        <p className="hero-description hero-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {t('hero.description', lang)}
        </p>
        <div className="hero-buttons hero-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <a href="#portfolio" className="btn-primary" onClick={(e) => { e.stopPropagation(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t('hero.viewPortfolio', lang)}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className="btn-outline" onClick={(e) => { e.stopPropagation(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t('hero.bookSession', lang)}
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator hero-animate" style={{ opacity: 0, transition: 'opacity 1s ease 2s' }}>
        <span>{t('hero.scroll', lang)}</span>
        <div className="scroll-line" />
      </div>

      {showFlash && <div className="camera-flash" />}
    </section>
  );
}
