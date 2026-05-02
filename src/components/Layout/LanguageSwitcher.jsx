import { useLang } from '../../context/LanguageContext';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export function LanguageSwitcher() {
  const { lang, changeLang } = useLang();

  return (
    <div className="lang-switcher">
      {languages.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${lang === l.code ? 'lang-btn--active' : ''}`}
          onClick={() => changeLang(l.code)}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
