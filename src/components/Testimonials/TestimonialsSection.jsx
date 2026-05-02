import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t, translations } from '../../data/translations';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  // Get items from translations
  const items = translations.testimonials.items;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const current = items[active];

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>{t('testimonials.label', lang)}</p>
          <h2 className="section-title">{t('testimonials.title', lang)}</h2>
          <p className="section-subtitle">
            {t('testimonials.subtitle', lang)}
          </p>
        </motion.div>

        <div className="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${lang}`}
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="testimonial-quote-mark">"</span>
              <div className="testimonial-stars">
                {'★'.repeat(current.stars)}
              </div>
              <p className="testimonial-text">{current.text[lang] || current.text.fr}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{current.name}</span>
                <span className="testimonial-role">{current.role[lang] || current.role.fr}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
