# Sou House (颯 House) - Osaka Vacation Rentals

Multi-language vacation rental website for 4 Sou House properties in Osaka, with an approval-based guest review system powered by Supabase.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Routing**: react-router-dom (language-prefixed routes: `/en`, `/ja`, `/ko`, `/zh-hans`, `/zh-hant`)
- **i18n**: i18next + react-i18next (5 languages)
- **Backend/DB**: Supabase (PostgreSQL + Auth + RLS)
- **Reviews**: Approval-based (pending -> approved/rejected)

## Properties

| Slug | Name |
|------|------|
| `sou-house-5` | Sou House 5 |
| `sou-house-3-4` | Sou House 3-4 |
| `sou-house-momodani` | Sou House Momodani |
| `sou-house-tsuruhashi` | Sou House Tsuruhashi |

## Getting Started

### 1. Install dependencies

```bash
cd sou-house
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:
   - `supabase/schema.sql` — Creates the `reviews` table with RLS policies
   - `supabase/seed.sql` — (Optional) Inserts sample review data for testing
3. Go to **Authentication > Users** and create an admin user (Email/Password)

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: restrict admin login to specific emails
VITE_ADMIN_EMAIL_ALLOWLIST=admin@example.com
```

You can find your Supabase URL and Anon Key at:
**Supabase Dashboard > Settings > API**

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173` — you'll be redirected to your detected language (e.g., `/ja`).

### 5. Build for production

```bash
npm run build
```

Output goes to `dist/`.

## Supabase Schema & RLS

### Table: `reviews`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| property_slug | text | NOT NULL |
| nickname | text | NOT NULL |
| rating | int | 1-5, NOT NULL |
| comment | text | NOT NULL |
| language | text | NOT NULL |
| country | text | nullable, future use |
| stayed_month | text | nullable, e.g. "2026-02" |
| source | text | nullable, e.g. "direct" |
| status | text | 'pending' / 'approved' / 'rejected' |
| created_at | timestamptz | auto |

### RLS Policies

| Policy | Role | Action | Rule |
|--------|------|--------|------|
| Public read | anon | SELECT | `status = 'approved'` only |
| Public submit | anon | INSERT | `status = 'pending'` only |
| Admin read | authenticated | SELECT | all rows |
| Admin update | authenticated | UPDATE | all rows |
| Admin delete | authenticated | DELETE | all rows |

## Admin Panel

1. Navigate to `/admin/reviews`
2. Log in with the Supabase Auth user you created
3. Filter by status (Pending / Approved / Rejected / All)
4. Approve or Reject individual reviews
5. Approved reviews appear on property pages immediately

## Security & Spam Prevention

- **URL detection**: Reviews containing URLs are blocked client-side
- **Rate limiting**: localStorage-based cooldown (10 min per property)
- **XSS prevention**: All user input is treated as plain text
- **RLS enforcement**: Only `approved` reviews visible via public API; only `pending` status allowed for inserts
- **Admin guard**: Optional email allowlist via `VITE_ADMIN_EMAIL_ALLOWLIST`

## Project Structure

```
sou-house/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── ReviewFormModal.tsx
│   │   └── StarRating.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PropertyPage.tsx
│   │   └── AdminPage.tsx
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   ├── reviewsApi.ts
│   │   ├── properties.ts
│   │   └── validation.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/{en,ja,ko,zh-hans,zh-hant}/common.json
│   ├── types/
│   │   └── review.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── schema.sql        # Table + RLS policies
│   └── seed.sql          # Sample data
├── .env.example
└── package.json
```

## Beds24 Booking Integration

Each property page has a placeholder for Beds24 booking iframe. To enable:

1. Get your Beds24 property IDs
2. Update `src/lib/properties.ts` with the `beds24PropId` values
3. The iframe will automatically render on each property page
