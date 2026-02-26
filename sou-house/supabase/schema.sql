-- ============================================
-- Sou House Reviews Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1) Create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_slug text NOT NULL,
  nickname text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  language text NOT NULL,
  country text NULL,
  stayed_month text NULL,       -- e.g. "2026-02"
  source text NULL,             -- e.g. "direct"
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2) Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_reviews_property_status ON reviews (property_slug, status);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews (status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews (created_at DESC);

-- 3) Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 4) RLS Policies

-- Anyone can SELECT approved reviews (public read)
CREATE POLICY "Public can view approved reviews"
  ON reviews
  FOR SELECT
  USING (status = 'approved');

-- Anyone can INSERT reviews (but only as 'pending')
CREATE POLICY "Anyone can submit reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (status = 'pending');

-- Authenticated users (admin) can SELECT all reviews
CREATE POLICY "Admins can view all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users (admin) can UPDATE reviews
CREATE POLICY "Admins can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users (admin) can DELETE reviews
CREATE POLICY "Admins can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Seed Data (Optional - for testing)
-- ============================================

-- INSERT INTO reviews (property_slug, nickname, rating, comment, language, status, source) VALUES
-- ('sou-house-5', 'Tanaka', 5, 'とても素敵な宿泊施設でした。清潔で広く、大阪観光に最適なロケーションです。また利用したいと思います。', 'ja', 'approved', 'direct'),
-- ('sou-house-5', 'John', 4, 'Great location and very clean. The host was responsive and helpful. Would definitely recommend to families visiting Osaka.', 'en', 'approved', 'direct'),
-- ('sou-house-3-4', 'Kim', 5, '오사카에서 최고의 숙소였습니다. 깨끗하고 넓으며, 역에서도 가깝습니다. 다음에도 꼭 다시 오고 싶습니다.', 'ko', 'approved', 'direct'),
-- ('sou-house-momodani', 'Zhang', 4, '桃谷站附近的好住所，干净舒适。交通非常便利，去哪里都很方便。推荐给来大阪旅游的朋友们。', 'zh-hans', 'approved', 'direct'),
-- ('sou-house-tsuruhashi', 'Chen', 5, '鶴橋地區的美食真的太棒了！住宿環境很好，房東也很友善。非常推薦這個地方給喜歡日本美食的旅客。', 'zh-hant', 'approved', 'direct'),
-- ('sou-house-5', 'Pending User', 3, 'This is a pending review that should not be visible to the public until it is approved by an admin.', 'en', 'pending', 'direct');
