import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

const stepKeys = ['consultation', 'planning', 'shoot', 'editing', 'delivery'];
const nums = ['01', '02', '03', '04', '05'];

export default function ProcessSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  return (
    <section className="process" id="process" ref={ref}>
      <div className="container">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">{t('process.label', lang)}</p>
          <h2 className="section-title">{t('process.title', lang)}</h2>
          <p className="section-subtitle">
            {t('process.subtitle', lang)}
          </p>
        </motion.div>

        <div className="process-steps">
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="process-step-number">{nums[i]}</div>
              <h4 className="process-step-title">{t(`process.steps.${key}.title`, lang)}</h4>
              <p className="process-step-desc">{t(`process.steps.${key}.desc`, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
