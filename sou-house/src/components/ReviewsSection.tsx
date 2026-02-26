import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchApprovedReviews } from '../lib/reviewsApi.ts';
import type { Review, ReviewFilters } from '../types/review.ts';
import StarRating from './StarRating.tsx';
import ReviewFormModal from './ReviewFormModal.tsx';

interface ReviewsSectionProps {
  propertySlug: string;
}

const LANGUAGE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: 'JA' },
  { value: 'ko', label: 'KO' },
  { value: 'zh-hans', label: 'ZH-CN' },
  { value: 'zh-hant', label: 'ZH-TW' },
];

const RATING_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
  { value: '1', label: '1' },
];

function formatDate(dateStr: string, locale: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'zh-hans' ? 'zh-CN' : locale === 'zh-hant' ? 'zh-TW' : locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function ReviewsSection({ propertySlug }: ReviewsSectionProps) {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<ReviewFilters>({
    language: 'all',
    rating: 'all',
  });

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchApprovedReviews(propertySlug, filters);
      setReviews(result.reviews);
      setAverageRating(result.averageRating);
      setTotalCount(result.totalCount);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  }, [propertySlug, filters]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleFilterChange = (key: keyof ReviewFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReviewSubmitted = () => {
    setShowForm(false);
    loadReviews();
  };

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>{t('reviews.title')}</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          {t('reviews.write')}
        </button>
      </div>

      {totalCount > 0 && (
        <div className="reviews-summary">
          <div className="reviews-average">
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <span className="average-number">{averageRating.toFixed(1)}</span>
            <span className="review-count">
              ({t('reviews.totalReviews', { count: totalCount })})
            </span>
          </div>
        </div>
      )}

      <div className="reviews-filters">
        <div className="filter-group">
          <label>{t('reviews.filters.language')}:</label>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value === 'all' ? t('reviews.filters.all') : opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('reviews.filters.rating')}:</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value === 'all'
                  ? t('reviews.filters.all')
                  : '\u2605'.repeat(parseInt(opt.value, 10))}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="reviews-loading">
          <div className="spinner"></div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="reviews-empty">{t('reviews.noReviews')}</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <span className="review-nickname">{review.nickname}</span>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-meta">
                <span className="review-date">
                  {formatDate(review.created_at, i18n.language)}
                </span>
                <span className="review-lang">{review.language.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ReviewFormModal
          propertySlug={propertySlug}
          onClose={() => setShowForm(false)}
          onSubmitted={handleReviewSubmitted}
        />
      )}
    </section>
  );
}
