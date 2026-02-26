import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createReview } from '../lib/reviewsApi.ts';
import {
  validateNickname,
  validateComment,
  validateRating,
  checkRateLimit,
  recordSubmission,
} from '../lib/validation.ts';
import StarRating from './StarRating.tsx';

interface ReviewFormModalProps {
  propertySlug: string;
  onClose: () => void;
  onSubmitted: () => void;
}

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh-hans', label: '简体中文' },
  { value: 'zh-hant', label: '繁體中文' },
];

export default function ReviewFormModal({
  propertySlug,
  onClose,
  onSubmitted,
}: ReviewFormModalProps) {
  const { t, i18n } = useTranslation();

  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [language, setLanguage] = useState(i18n.language);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nicknameError = validateNickname(nickname);
    if (nicknameError) newErrors.nickname = t(`reviews.${nicknameError}`);

    const ratingError = validateRating(rating);
    if (ratingError) newErrors.rating = t(`reviews.${ratingError}`);

    const commentError = validateComment(comment);
    if (commentError) newErrors.comment = t(`reviews.${commentError}`);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    if (!checkRateLimit(propertySlug)) {
      setSubmitError(t('reviews.validation.rateLimited'));
      return;
    }

    setSubmitting(true);

    const result = await createReview({
      property_slug: propertySlug,
      nickname: nickname.trim(),
      rating,
      comment: comment.trim(),
      language,
    });

    setSubmitting(false);

    if (result.success) {
      recordSubmission(propertySlug);
      setSubmitted(true);
      setTimeout(() => {
        onSubmitted();
      }, 3000);
    } else {
      setSubmitError(t('reviews.validation.submitError'));
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="review-success">
            <p>{t('reviews.pendingThanks')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t('reviews.form.title')}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="nickname">{t('reviews.form.nickname')}</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={t('reviews.form.nicknamePlaceholder')}
              maxLength={30}
            />
            {errors.nickname && <span className="field-error">{errors.nickname}</span>}
          </div>

          <div className="form-group">
            <label>{t('reviews.form.rating')}</label>
            <StarRating rating={rating} interactive onRate={setRating} size="lg" />
            {errors.rating && <span className="field-error">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="comment">{t('reviews.form.comment')}</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('reviews.form.commentPlaceholder')}
              rows={5}
              maxLength={1000}
            />
            <span className="char-count">{comment.length}/1000</span>
            {errors.comment && <span className="field-error">{errors.comment}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="language">{t('reviews.form.language')}</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {submitError && <div className="form-error">{submitError}</div>}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('reviews.form.cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? t('reviews.form.submitting') : t('reviews.form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
