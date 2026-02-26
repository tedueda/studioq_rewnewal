import { supabase } from './supabaseClient.ts';
import type { Review, ReviewFormData, ReviewFilters } from '../types/review.ts';

export async function fetchApprovedReviews(
  propertySlug: string,
  filters?: ReviewFilters
): Promise<{ reviews: Review[]; averageRating: number; totalCount: number }> {
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('property_slug', propertySlug)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (filters?.language && filters.language !== 'all') {
    query = query.eq('language', filters.language);
  }

  if (filters?.rating && filters.rating !== 'all') {
    query = query.eq('rating', parseInt(filters.rating, 10));
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const reviews = (data as Review[]) || [];
  const totalCount = reviews.length;
  const averageRating =
    totalCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount
      : 0;

  return { reviews, averageRating, totalCount };
}

export async function createReview(
  payload: ReviewFormData
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('reviews').insert({
    property_slug: payload.property_slug,
    nickname: payload.nickname,
    rating: payload.rating,
    comment: payload.comment,
    language: payload.language,
    status: 'pending',
    source: 'direct',
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function fetchAllReviews(
  statusFilter?: string
): Promise<Review[]> {
  let query = supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data as Review[]) || [];
}

export async function adminApproveReview(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('reviews')
    .update({ status: 'approved' })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function adminRejectReview(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('reviews')
    .update({ status: 'rejected' })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
