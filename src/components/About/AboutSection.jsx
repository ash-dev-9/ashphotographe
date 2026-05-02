import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function AboutSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-grid"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Image side */}
          <motion.div
            className="about-image-wrapper"
            custom={0}
            variants={fadeUp}
          >
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=800&fit=crop&q=80"
              alt="Ash — Professional Photographer"
              loading="lazy"
            />
            <div className="about-image-frame" />
            <div className="about-image-accent" />
          </motion.div>

          {/* Content side */}
          <div className="about-content">
            <motion.div custom={1} variants={fadeUp}>
              <p className="section-label">{t('about.label', lang)}</p>
            </motion.div>

            <motion.h2 custom={2} variants={fadeUp} className="section-title">
              {t('about.title', lang).split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </motion.h2>

            <motion.p custom={3} variants={fadeUp} className="about-bio">
              {t('about.bio1', lang)}
            </motion.p>

            <motion.p custom={4} variants={fadeUp} className="about-bio">
              {t('about.bio2', lang)}
            </motion.p>

            <motion.div custom={5} variants={fadeUp} className="about-stats">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.shoots', lang)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={12} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.years', lang)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={300} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.clients', lang)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={25} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.countries', lang)}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
