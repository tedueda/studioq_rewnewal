import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
  { code: 'ko', label: 'KO' },
  { code: 'zh-hans', label: 'ZH-CN' },
  { code: 'zh-hant', label: 'ZH-TW' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const supportedLangs = ['en', 'ja', 'ko', 'zh-hans', 'zh-hant'];
    if (supportedLangs.includes(pathParts[0])) {
      pathParts[0] = langCode;
    } else {
      pathParts.unshift(langCode);
    }
    navigate('/' + pathParts.join('/'));
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to={`/${i18n.language}`} className="header-logo">
          {t('site.title')}
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link
            to={`/${i18n.language}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('site.properties')}
          </Link>
          <div className="lang-switcher">
            <span className="lang-label">{t('site.language')}:</span>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
                onClick={() => {
                  changeLanguage(lang.code);
                  setMenuOpen(false);
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
