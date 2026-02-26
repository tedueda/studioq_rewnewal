-- ============================================
-- Seed Data for Testing
-- Run this AFTER schema.sql
-- ============================================

INSERT INTO reviews (property_slug, nickname, rating, comment, language, status, source) VALUES
('sou-house-5', 'Tanaka', 5, 'とても素敵な宿泊施設でした。清潔で広く、大阪観光に最適なロケーションです。また利用したいと思います。', 'ja', 'approved', 'direct'),
('sou-house-5', 'John', 4, 'Great location and very clean. The host was responsive and helpful. Would definitely recommend to families visiting Osaka.', 'en', 'approved', 'direct'),
('sou-house-5', 'Sarah', 5, 'Absolutely loved this place! Spacious rooms, well-equipped kitchen, and the neighborhood is so charming. Perfect for our family trip.', 'en', 'approved', 'direct'),
('sou-house-3-4', 'Kim', 5, '오사카에서 최고의 숙소였습니다. 깨끗하고 넓으며, 역에서도 가깝습니다. 다음에도 꼭 다시 오고 싶습니다.', 'ko', 'approved', 'direct'),
('sou-house-3-4', 'Yamamoto', 4, '友人グループで利用しました。設備が整っていて快適でした。駅からも近く便利な立地です。おすすめです。', 'ja', 'approved', 'direct'),
('sou-house-momodani', 'Zhang', 4, '桃谷站附近的好住所，干净舒适。交通非常便利，去哪里都很方便。推荐给来大阪旅游的朋友们。', 'zh-hans', 'approved', 'direct'),
('sou-house-momodani', 'Mike', 5, 'Wonderful stay near Momodani station. Very convenient for exploring Osaka. The place was spotless and had everything we needed.', 'en', 'approved', 'direct'),
('sou-house-tsuruhashi', 'Chen', 5, '鶴橋地區的美食真的太棒了！住宿環境很好，房東也很友善。非常推薦這個地方給喜歡日本美食的旅客。', 'zh-hant', 'approved', 'direct'),
('sou-house-tsuruhashi', 'Park', 4, '츠루하시의 음식 문화가 정말 좋았습니다. 숙소도 깨끗하고 편안했습니다. 다음에 오사카에 오면 다시 이용하겠습니다.', 'ko', 'approved', 'direct'),
('sou-house-5', 'Pending User', 3, 'This is a pending review that should not be visible to the public. Admins need to approve it first before it appears.', 'en', 'pending', 'direct'),
('sou-house-3-4', 'Test Rejected', 2, 'This review was rejected by admin and should not be visible to the public on the property page at all.', 'en', 'rejected', 'direct');
