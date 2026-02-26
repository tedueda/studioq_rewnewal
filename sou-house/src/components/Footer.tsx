import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          &copy; {new Date().getFullYear()} {t('site.title')}. {t('site.footer')}
        </p>
      </div>
    </footer>
  );
}
