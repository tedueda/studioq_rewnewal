import type { PropertyInfo } from '../types/review.ts';

export const properties: PropertyInfo[] = [
  {
    slug: 'sou-house-5',
    nameKey: 'properties.souHouse5.name',
    descriptionKey: 'properties.souHouse5.description',
    image: '/images/sou-house-5.jpg',
    beds24PropId: '',
    maxGuests: 10,
    bedrooms: 3,
    location: 'Osaka',
  },
  {
    slug: 'sou-house-3-4',
    nameKey: 'properties.souHouse34.name',
    descriptionKey: 'properties.souHouse34.description',
    image: '/images/sou-house-3-4.jpg',
    beds24PropId: '',
    maxGuests: 8,
    bedrooms: 2,
    location: 'Osaka',
  },
  {
    slug: 'sou-house-momodani',
    nameKey: 'properties.souHouseMomodani.name',
    descriptionKey: 'properties.souHouseMomodani.description',
    image: '/images/sou-house-momodani.jpg',
    beds24PropId: '',
    maxGuests: 6,
    bedrooms: 2,
    location: 'Osaka, Momodani',
  },
  {
    slug: 'sou-house-tsuruhashi',
    nameKey: 'properties.souHouseTsuruhashi.name',
    descriptionKey: 'properties.souHouseTsuruhashi.description',
    image: '/images/sou-house-tsuruhashi.jpg',
    beds24PropId: '',
    maxGuests: 8,
    bedrooms: 2,
    location: 'Osaka, Tsuruhashi',
  },
];

export function getPropertyBySlug(slug: string): PropertyInfo | undefined {
  return properties.find((p) => p.slug === slug);
}
