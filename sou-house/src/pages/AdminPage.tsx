import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient.ts';
import {
  fetchAllReviews,
  adminApproveReview,
  adminRejectReview,
} from '../lib/reviewsApi.ts';
import type { Review } from '../types/review.ts';
import StarRating from '../components/StarRating.tsx';
import type { Session } from '@supabase/supabase-js';

export default function AdminPage() {
  const { t } = useTranslation();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllReviews(statusFilter);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (session) {
      loadReviews();
    }
  }, [session, loadReviews]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const allowedEmails = (
      import.meta.env.VITE_ADMIN_EMAIL_ALLOWLIST as string || ''
    )
      .split(',')
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);

    if (allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase())) {
      setLoginError(t('admin.loginError'));
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError(t('admin.loginError'));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    const result = await adminApproveReview(id);
    if (result.success) {
      await loadReviews();
    }
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    const result = await adminRejectReview(id);
    if (result.success) {
      await loadReviews();
    }
    setActionLoading(null);
  };

  if (!session) {
    return (
      <div className="admin-page">
        <div className="container page-content">
          <div className="admin-login-card">
            <h2>{t('admin.login')}</h2>
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="admin-email">{t('admin.email')}</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="admin-password">{t('admin.password')}</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <div className="form-error">{loginError}</div>}
              <button type="submit" className="btn btn-primary">
                {t('admin.loginButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'badge-approved';
      case 'rejected':
        return 'badge-rejected';
      default:
        return 'badge-pending';
    }
  };

  return (
    <div className="admin-page">
      <div className="container page-content">
        <div className="admin-header">
          <h2>{t('admin.title')}</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>
            {t('admin.logout')}
          </button>
        </div>

        <div className="admin-filters">
          <label>{t('admin.filterByStatus')}:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t('admin.all')}</option>
            <option value="pending">{t('admin.pending')}</option>
            <option value="approved">{t('admin.approved')}</option>
            <option value="rejected">{t('admin.rejected')}</option>
          </select>
        </div>

        {loading ? (
          <div className="reviews-loading">
            <div className="spinner"></div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="reviews-empty">{t('admin.noReviews')}</p>
        ) : (
          <div className="admin-reviews-table">
            <table>
              <thead>
                <tr>
                  <th>{t('admin.property')}</th>
                  <th>{t('reviews.form.nickname')}</th>
                  <th>{t('reviews.form.rating')}</th>
                  <th>{t('reviews.form.comment')}</th>
                  <th>{t('reviews.filters.language')}</th>
                  <th>{t('admin.status')}</th>
                  <th>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="td-property">{review.property_slug}</td>
                    <td>{review.nickname}</td>
                    <td>
                      <StarRating rating={review.rating} size="sm" />
                    </td>
                    <td className="td-comment">{review.comment}</td>
                    <td>{review.language.toUpperCase()}</td>
                    <td>
                      <span className={`status-badge ${statusBadgeClass(review.status)}`}>
                        {t(`admin.${review.status}`)}
                      </span>
                    </td>
                    <td className="td-actions">
                      {review.status !== 'approved' && (
                        <button
                          className="btn btn-sm btn-approve"
                          onClick={() => handleApprove(review.id)}
                          disabled={actionLoading === review.id}
                        >
                          {t('admin.approve')}
                        </button>
                      )}
                      {review.status !== 'rejected' && (
                        <button
                          className="btn btn-sm btn-reject"
                          onClick={() => handleReject(review.id)}
                          disabled={actionLoading === review.id}
                        >
                          {t('admin.reject')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
