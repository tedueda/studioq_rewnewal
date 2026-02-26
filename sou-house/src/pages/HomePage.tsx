import { useTranslation } from 'react-i18next';
import { properties } from '../lib/properties.ts';
import PropertyCard from '../components/PropertyCard.tsx';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{t('site.title')}</h1>
            <p className="hero-subtitle">{t('site.heroTagline')}</p>
            <p className="hero-desc">{t('site.description')}</p>
          </div>
        </div>
      </section>

      <section className="properties-section" id="properties">
        <div className="container">
          <h2>{t('site.properties')}</h2>
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
