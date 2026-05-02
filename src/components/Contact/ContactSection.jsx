import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function ContactSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const { lang } = useLang();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: ''
  });
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.errorName', lang) || 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errorEmail', lang) || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errorEmailInvalid', lang) || 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = t('contact.form.errorMessage', lang) || 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, formRef.current, {
      publicKey: publicKey,
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }, (err) => {
        setError(t('contact.form.error', lang));
        setLoading(false);
      });
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 40 : -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">{t('contact.label', lang)}</p>
            <h2 className="contact-headline">
              {(() => {
                const title = t('contact.titleAlt', lang);
                const highlightEn = 'Extraordinary';
                const highlightFr = 'extraordinaire';

                if (lang === 'en' && title.includes(highlightEn)) {
                  const parts = title.split(highlightEn);
                  return (
                    <>
                      {parts[0]}
                      <br />
                      <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{highlightEn}</span>
                      {parts[1]}
                    </>
                  );
                }

                if (lang === 'fr' && title.includes(highlightFr)) {
                  const parts = title.split(highlightFr);
                  return (
                    <>
                      {parts[0]}
                      <br />
                      <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{highlightFr}</span>
                      {parts[1]}
                    </>
                  );
                }

                return title;
              })()}
            </h2>
            <p className="contact-text">{t('contact.subtitle', lang)}</p>

            <div style={{ marginBottom: '32px' }} aria-label="Contact information">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--accent)' }} aria-hidden="true">✉</span>
                <a href="mailto:bssaraachraf@gmail.com" style={{ color: 'inherit' }}>bssaraachraf@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--accent)' }} aria-hidden="true">☎</span>
                <a href="tel:+212672932772" style={{ color: 'inherit' }}>+212672932772</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--accent)' }} aria-hidden="true">⌖</span>
                {t('contact.info.locationCity', lang)}
              </div>
            </div>

            <div className="contact-social-links" role="list" aria-label="Social media links">
              {[
                { icon: 'IG', label: 'Instagram', href: '#' },
                { icon: 'Be', label: 'Behance', href: '#' },
                { icon: 'Li', label: 'LinkedIn', href: '#' },
                { icon: 'Pi', label: 'Pinterest', href: '#' },
              ].map(({ icon, label, href }) => (
                <a key={icon} href={href} className="contact-social-link" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '60px 40px',
                  textAlign: 'center',
                  background: 'var(--surface-glass)',
                  border: '1px solid var(--surface-glass-border)',
                  borderRadius: 'var(--radius-lg)',
                }}
                role="alert"
                aria-live="polite"
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }} aria-hidden="true">📸</div>
                <h3 style={{ marginBottom: '12px', color: 'var(--accent)' }}>{t('contact.form.success', lang)}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.form.successDesc', lang)}
                </p>
              </motion.div>
            ) : (
              <form
                className="contact-form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {error && (
                  <div
                    style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '0.9rem', padding: '10px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '4px', border: '1px solid rgba(255, 77, 77, 0.2)' }}
                    role="alert"
                    aria-live="assertive"
                  >
                    {error}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">{t('contact.form.name', lang)} *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholderName', lang)}
                      required
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <span id="name-error" style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">{t('contact.form.email', lang)} *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholderEmail', lang)}
                      required
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <span id="email-error" style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone">{t('contact.form.phone', lang)}</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholderPhone', lang)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-service">{t('contact.form.service', lang)} *</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t('contact.form.serviceSelect', lang)}</option>
                      <option value="wedding">{t('services.items.weddings', lang)}</option>
                      <option value="fashion">{t('services.items.fashion', lang)}</option>
                      <option value="portrait">{t('services.items.portraits', lang)}</option>
                      <option value="event">{t('services.items.events', lang)}</option>
                      <option value="branding">{t('services.items.branding', lang)}</option>
                      <option value="product">{t('services.items.product', lang)}</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-date">{t('contact.form.date', lang)}</label>
                  <input
                    type="date"
                    id="contact-date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">{t('contact.form.message', lang)} *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.placeholderMessage', lang)}
                    rows={5}
                    required
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  ></textarea>
                  {errors.message && <span id="message-error" style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.message}</span>}
                </div>

                <button type="submit" className="btn-primary" disabled={loading} aria-label={loading ? t('contact.form.sending', lang) : t('contact.form.send', lang)}>
                  {loading ? t('contact.form.sending', lang) : t('contact.form.send', lang)}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
