import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export function Footer() {
  const { lang } = useLang();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Ash photogRaf. {t('footer.rights', lang)}
        </p>
        <div className="footer-links">
          <a href="#home">{t('footer.privacy', lang)}</a>
          <a href="#home">{t('footer.terms', lang)}</a>
          <a href="#contact">{t('nav.contact', lang)}</a>
        </div>
      </div>
    </footer>
  );
}
