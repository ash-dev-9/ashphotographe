import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

const serviceKeys = [
  { iconType: 'weddings', key: 'weddings' },
  { iconType: 'fashion', key: 'fashion' },
  { iconType: 'portraits', key: 'portraits' },
  { iconType: 'events', key: 'events' },
  { iconType: 'branding', key: 'branding' },
  { iconType: 'product', key: 'product' },
  { iconType: 'retouching', key: 'retouching' },
  { iconType: 'artDirection', key: 'artDirection' },
];

function ServiceIcon({ type }) {
  const props = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    weddings: (<svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
    fashion: (<svg {...props}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>),
    portraits: (<svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
    events: (<svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    branding: (<svg {...props}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>),
    product: (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>),
    retouching: (<svg {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>),
    artDirection: (<svg {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>),
  };
  return icons[type] || null;
}

function ServiceCard({ service, index, lang }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service-icon" style={{ color: 'var(--accent)' }}>
        <ServiceIcon type={service.iconType} />
      </div>
      <h4 className="service-name">{t(`services.items.${service.key}`, lang)}</h4>
      <p className="service-description">{t(`services.items.${service.key}Desc`, lang)}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>{t('services.label', lang)}</p>
          <h2 className="section-title">{t('services.title', lang)}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {t('services.subtitle', lang)}
          </p>
        </motion.div>

        <div className="services-grid">
          {serviceKeys.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
