import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { PropertyInfo } from '../types/review.ts';

interface PropertyCardProps {
  property: PropertyInfo;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t, i18n } = useTranslation();

  return (
    <Link
      to={`/${i18n.language}/property/${property.slug}`}
      className="property-card"
    >
      <div className="property-card-image">
        <img
          src={property.image}
          alt={t(property.nameKey)}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop`;
          }}
        />
      </div>
      <div className="property-card-body">
        <h3>{t(property.nameKey)}</h3>
        <p className="property-card-desc">{t(property.descriptionKey)}</p>
        <div className="property-card-meta">
          <span>{t('site.guests')}: {property.maxGuests}</span>
          <span>{t('site.bedrooms')}: {property.bedrooms}</span>
          <span>{property.location}</span>
        </div>
      </div>
    </Link>
  );
}
