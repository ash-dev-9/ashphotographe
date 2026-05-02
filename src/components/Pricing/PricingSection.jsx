import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t, translations } from '../../data/translations';

const packKeys = ['essentiel', 'premium', 'luxe', 'surMesure'];
const prices = { essentiel: '1 500', premium: '3 500', luxe: '7 000', surMesure: null };
const currency = 'MAD';

const icons = {
  essentiel: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  premium: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  luxe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  surMesure: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    </svg>
  ),
};

function PricingCard({ packKey, index, lang }) {
  const name = t(`pricing.packs.${packKey}.name`, lang);
  const desc = t(`pricing.packs.${packKey}.desc`, lang);
  const features = translations.pricing.packs[packKey].features[lang] || translations.pricing.packs[packKey].features.fr;
  const price = prices[packKey];
  const isHighlighted = packKey === 'premium';
  const isCustom = packKey === 'surMesure';

  return (
    <motion.div
      className={`pricing-card ${isHighlighted ? 'pricing-card--highlighted' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {isHighlighted && <div className="pricing-badge">{t('pricing.popular', lang)}</div>}
      <div className="pricing-icon">{icons[packKey]}</div>
      <h3 className="pricing-name">{name}</h3>
      <p className="pricing-description">{desc}</p>
      <div className="pricing-price">
        <span className="pricing-amount">{isCustom ? t('pricing.contactMe', lang) : price}</span>
        {!isCustom && <span className="pricing-currency">{currency}</span>}
      </div>
      <div className="pricing-divider" />
      <ul className="pricing-features">
        {features.map((feature, i) => (
          <li key={i} className="pricing-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={isCustom
          ? '#contact'
          : `https://wa.me/+212672932772?text=${encodeURIComponent(`Bonjour Ash, je suis intéressé(e) par le pack ${name} à ${price} ${currency}.`)}`
        }
        className={`pricing-cta ${isHighlighted ? 'btn-primary' : 'btn-outline'}`}
      >
        {isCustom ? t('pricing.contactMe', lang) : t('pricing.book', lang)}
      </a>
    </motion.div>
  );
}

export default function PricingSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>{t('pricing.label', lang)}</p>
          <h2 className="section-title">{t('pricing.title', lang)}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {t('pricing.subtitle', lang)}
          </p>
        </motion.div>

        <div className="pricing-grid">
          {packKeys.map((key, i) => (
            <PricingCard key={key} packKey={key} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
