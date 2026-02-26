import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPropertyBySlug } from '../lib/properties.ts';
import ReviewsSection from '../components/ReviewsSection.tsx';

export default function PropertyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const property = slug ? getPropertyBySlug(slug) : undefined;

  if (!property) {
    return (
      <div className="container page-content">
        <h2>Property not found</h2>
        <Link to={`/${i18n.language}`}>{t('site.backToHome')}</Link>
      </div>
    );
  }

  return (
    <div className="property-page">
      <div className="property-hero">
        <img
          src={property.image}
          alt={t(property.nameKey)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop`;
          }}
        />
        <div className="property-hero-overlay">
          <h1>{t(property.nameKey)}</h1>
        </div>
      </div>

      <div className="container page-content">
        <Link to={`/${i18n.language}`} className="back-link">
          &larr; {t('site.backToHome')}
        </Link>

        <div className="property-details">
          <div className="property-info">
            <p className="property-description">{t(property.descriptionKey)}</p>
            <div className="property-meta-grid">
              <div className="meta-item">
                <span className="meta-label">{t('site.guests')}</span>
                <span className="meta-value">{property.maxGuests}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('site.bedrooms')}</span>
                <span className="meta-value">{property.bedrooms}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('site.location')}</span>
                <span className="meta-value">{property.location}</span>
              </div>
            </div>
          </div>

          <div className="property-booking">
            <h3>{t('site.bookNow')}</h3>
            <div className="beds24-iframe-container">
              {property.beds24PropId ? (
                <iframe
                  src={`https://beds24.com/booking2.php?propid=${property.beds24PropId}`}
                  title="Beds24 Booking"
                  width="100%"
                  height="600"
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="booking-placeholder">
                  <p>Booking system will be available soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <ReviewsSection propertySlug={property.slug} />
      </div>
    </div>
  );
}
