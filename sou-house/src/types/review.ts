export interface Review {
  id: string;
  property_slug: string;
  nickname: string;
  rating: number;
  comment: string;
  language: string;
  country: string | null;
  stayed_month: string | null;
  source: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ReviewFormData {
  property_slug: string;
  nickname: string;
  rating: number;
  comment: string;
  language: string;
}

export interface ReviewFilters {
  language: string;
  rating: string;
}

export type PropertySlug =
  | 'sou-house-5'
  | 'sou-house-3-4'
  | 'sou-house-momodani'
  | 'sou-house-tsuruhashi';

export interface PropertyInfo {
  slug: PropertySlug;
  nameKey: string;
  descriptionKey: string;
  image: string;
  beds24PropId: string;
  maxGuests: number;
  bedrooms: number;
  location: string;
}
