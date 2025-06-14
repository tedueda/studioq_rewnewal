require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');
const moment = require('moment');
const axios = require('axios');

// OpenAI APIの設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// キーワードリスト
const keywords = [
  '4K映像制作',
  'グリーンスクリーン撮影',
  'バーチャルスタジオ',
  'ライブ配信',
  'マルチカメラ撮影',
  'RGB照明',
  '防音スタジオ',
  'クロマキー合成',
  'VFX撮影',
  'プロフェッショナル撮影機材'
];

// ブログのカテゴリー
const categories = [
  '撮影テクニック',
  '機材レビュー',
  'スタジオ活用術',
  '映像制作のコツ',
  'ライブ配信ガイド'
];

// 日付フォーマット
moment.locale('ja');
const today = moment().format('YYYY-MM-DD');
const displayDate = moment().format('YYYY年MM月DD日');

// ランダムにキーワードとカテゴリーを選択
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const selectedKeyword = process.argv[2] || getRandomItem(keywords);
const selectedCategory = getRandomItem(categories);

// ブログ記事のファイル名を生成
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ぁ-んァ-ン一-龠]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// ブログ記事を生成する関数
async function generateBlogPost() {
  try {
    console.log(`キーワード「${selectedKeyword}」に関する記事を生成中...`);

    // OpenAI APIを使用して記事を生成
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたはプロフェッショナルな映像制作スタジオ「スタジオQ」のブログライターです。技術的に正確で、SEO対策された、読者に価値を提供するブログ記事を書いてください。"
        },
        {
          role: "user",
          content: `「${selectedKeyword}」をメインキーワードとして、カテゴリー「${selectedCategory}」に関連するブログ記事を書いてください。
          
          記事には以下の要素を含めてください：
          - HTML形式で記述
          - タイトル（h1タグ）
          - 導入部分
          - 3-5つのセクション（h2タグ）
          - 各セクションには実用的なアドバイスや情報
          - まとめ
          - 関連キーワードを自然に含める
          - 1500-2000文字程度
          - 読者へのCTA（お問い合わせや予約を促す）
          
          スタジオQは最新の4K映像制作設備と高品質グリーンスクリーンを備えたプロフェッショナルなバーチャルスタジオです。`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    // 生成された記事の内容
    const blogContent = completion.choices[0].message.content;
    
    // タイトルを抽出（h1タグから）
    const titleMatch = blogContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1] : `${selectedKeyword}に関する${selectedCategory}`;
    
    // スラグを生成
    const slug = generateSlug(title);
    
    // ブログ記事のHTMLを作成
    const blogPostHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${title} - スタジオQが提供する${selectedCategory}に関する情報">
    <meta name="keywords" content="${selectedKeyword},${selectedCategory},スタジオQ,映像制作,撮影技術">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="${title} - スタジオQブログ">
    <meta property="og:description" content="${title} - スタジオQが提供する${selectedCategory}に関する情報">
    <meta property="og:image" content="https://studioq.co.jp/images/studioq_logo_white.png">
    <meta property="og:url" content="https://studioq.co.jp/blog/${slug}.html">
    <meta property="og:type" content="article">
    <title>${title} - スタジオQブログ</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="blog-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="canonical" href="https://studioq.co.jp/blog/${slug}.html">
    <!-- 構造化データ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${title}",
      "image": "https://studioq.co.jp/images/studioq_logo_white.png",
      "editor": "スタジオQ",
      "genre": "${selectedCategory}",
      "keywords": "${selectedKeyword}",
      "url": "https://studioq.co.jp/blog/${slug}.html",
      "datePublished": "${today}",
      "dateCreated": "${today}",
      "dateModified": "${today}",
      "description": "${title} - スタジオQが提供する${selectedCategory}に関する情報",
      "articleBody": "${title}に関する記事",
      "publisher": {
        "@type": "Organization",
        "name": "スタジオQ",
        "logo": {
          "@type": "ImageObject",
          "url": "https://studioq.co.jp/images/studioq_logo_white.png"
        }
      }
    }
    </script>
</head>
<body>
    <!-- ヘッダーとナビゲーション -->
    <header>
        <div class="logo">
            <a href="../index.html"><img src="../images/studioq_logo_white.png" alt="スタジオQ" class="logo-image"></a>
        </div>
        <nav>
            <ul>
                <li><a href="../index.html#home">ホーム</a></li>
                <li><a href="../index.html#about">スタジオについて</a></li>
                <li><a href="../index.html#gallery">ギャラリー</a></li>
                <li><a href="../index.html#contact">お問い合わせ</a></li>
                <li><a href="index.html" class="active">ブログ</a></li>
            </ul>
        </nav>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </header>

    <!-- ブログ記事 -->
    <section class="blog-post">
        <div class="container">
            <div class="blog-header">
                <div class="blog-meta">
                    <span class="blog-category">${selectedCategory}</span>
                    <span class="blog-date">${displayDate}</span>
                </div>
                <div class="breadcrumbs" aria-label="パンくずリスト">
                    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="../index.html"><span itemprop="name">ホーム</span></a>
                            <meta itemprop="position" content="1" />
                        </li>
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="index.html"><span itemprop="name">ブログ</span></a>
                            <meta itemprop="position" content="2" />
                        </li>
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <span itemprop="name">${title}</span>
                            <meta itemprop="position" content="3" />
                        </li>
                    </ol>
                </div>
            </div>
            
            <article class="blog-content">
                ${blogContent}
                
                <div class="blog-cta">
                    <h3>スタジオQで最高の映像制作体験を</h3>
                    <p>最新の設備と技術で、あなたのクリエイティブなビジョンを実現します。スタジオツアーや詳細については、お気軽にお問い合わせください。</p>
                    <div class="cta-buttons">
                        <a href="../index.html#contact" class="btn btn-primary">お問い合わせ</a>
                        <a href="../index.html#pricing" class="btn btn-secondary">料金プラン</a>
                    </div>
                </div>
                
                <div class="blog-tags">
                    <span class="tag-label">関連タグ:</span>
                    <a href="tag-${generateSlug(selectedKeyword)}.html" class="tag">${selectedKeyword}</a>
                    <a href="category-${generateSlug(selectedCategory)}.html" class="tag">${selectedCategory}</a>
                    <a href="tag-studioq.html" class="tag">スタジオQ</a>
                </div>
                
                <div class="blog-share">
                    <span class="share-label">この記事をシェア:</span>
                    <a href="https://twitter.com/intent/tweet?url=https://studioq.co.jp/blog/${slug}.html&text=${encodeURIComponent(title)}" target="_blank" class="share-button twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://studioq.co.jp/blog/${slug}.html" target="_blank" class="share-button facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://studioq.co.jp/blog/${slug}.html&title=${encodeURIComponent(title)}" target="_blank" class="share-button linkedin"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </article>
            
            <div class="related-posts">
                <h3>関連記事</h3>
                <div class="related-posts-grid">
                    <!-- 関連記事はブログインデックス更新時に動的に生成されます -->
                    <p>他の記事を読み込み中...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- フッター -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="../images/studioq_logo_white.png" alt="スタジオQ" class="footer-logo-image">
                    <p>最新の技術と創造性で、あなたのビジョンを現実に</p>
                </div>
                <div class="footer-links">
                    <h4>サイトマップ</h4>
                    <ul>
                        <li><a href="../index.html#home">ホーム</a></li>
                        <li><a href="../index.html#about">スタジオについて</a></li>
                        <li><a href="../index.html#gallery">ギャラリー</a></li>
                        <li><a href="../index.html#contact">お問い合わせ</a></li>
                        <li><a href="index.html">ブログ</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>お問い合わせ</h4>
                    <p><i class="fas fa-map-marker-alt"></i> 東京都〇〇区〇〇町1-2-3</p>
                    <p><i class="fas fa-phone"></i> 03-XXXX-XXXX</p>
                    <p><i class="fas fa-envelope"></i> info@studioq.co.jp</p>
                </div>
                <div class="footer-social">
                    <h4>フォローする</h4>
                    <div class="social-icons">
                        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} スタジオQ All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>`;

    // ブログディレクトリが存在しない場合は作成
    const blogDir = path.join(process.cwd(), 'blog');
    await fs.ensureDir(blogDir);

    // ブログ記事を保存
    const filePath = path.join(blogDir, `${slug}.html`);
    await fs.writeFile(filePath, blogPostHTML);

    console.log(`ブログ記事「${title}」を生成しました: ${filePath}`);
    
    // ブログインデックスを更新
    await updateBlogIndex(slug, title, selectedCategory, displayDate);
    
    return {
      title,
      slug,
      category: selectedCategory,
      date: displayDate,
      path: filePath
    };
  } catch (error) {
    console.error('ブログ記事の生成中にエラーが発生しました:', error);
    throw error;
  }
}

// ブログインデックスを更新する関数
async function updateBlogIndex(newSlug, newTitle, newCategory, newDate) {
  try {
    const indexPath = path.join(process.cwd(), 'blog', 'index.html');
    let indexContent;
    
    // インデックスファイルが存在するか確認
    try {
      indexContent = await fs.readFile(indexPath, 'utf8');
    } catch (error) {
      // インデックスファイルが存在しない場合は新規作成
      indexContent = createNewBlogIndex();
    }
    
    // 新しい記事のHTMLを生成
    const newPostHTML = `
    <div class="blog-card">
        <div class="blog-card-image">
            <a href="${newSlug}.html">
                <img src="../images/blog-placeholder.jpg" alt="${newTitle}" loading="lazy">
            </a>
            <span class="blog-category">${newCategory}</span>
        </div>
        <div class="blog-card-content">
            <h3><a href="${newSlug}.html">${newTitle}</a></h3>
            <div class="blog-meta">
                <span class="blog-date">${newDate}</span>
            </div>
            <p class="blog-excerpt">${newTitle}に関する記事です。詳細はこちらをクリック。</p>
            <a href="${newSlug}.html" class="read-more">続きを読む <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>`;
    
    // 記事リストの先頭に新しい記事を追加
    const blogListMatch = indexContent.match(/<div class="blog-grid">([\s\S]*?)<\/div><!-- end blog-grid -->/);
    if (blogListMatch) {
      const updatedBlogList = `<div class="blog-grid">${newPostHTML}${blogListMatch[1]}</div><!-- end blog-grid -->`;
      indexContent = indexContent.replace(blogListMatch[0], updatedBlogList);
    } else {
      // blog-gridが見つからない場合の処理
      const containerMatch = indexContent.match(/<div class="container">([\s\S]*?)<\/div><!-- end container -->/);
      if (containerMatch) {
        const updatedContainer = `<div class="container">
            <h1 class="page-title">スタジオQブログ</h1>
            <p class="page-subtitle">最新の撮影テクニックやスタジオの活用方法をご紹介</p>
            <div class="blog-grid">${newPostHTML}</div><!-- end blog-grid -->
        </div><!-- end container -->`;
        indexContent = indexContent.replace(containerMatch[0], updatedContainer);
      }
    }
    
    // 更新したインデックスを保存
    await fs.writeFile(indexPath, indexContent);
    console.log('ブログインデックスを更新しました');
  } catch (error) {
    console.error('ブログインデックスの更新中にエラーが発生しました:', error);
  }
}

// 新しいブログインデックスを作成する関数
function createNewBlogIndex() {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="スタジオQブログ - 最新の撮影テクニックやスタジオの活用方法をご紹介">
    <meta name="keywords" content="スタジオQ,ブログ,映像制作,撮影技術,バーチャルスタジオ,グリーンスクリーン">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="スタジオQブログ">
    <meta property="og:description" content="最新の撮影テクニックやスタジオの活用方法をご紹介">
    <meta property="og:image" content="https://studioq.co.jp/images/studioq_logo_white.png">
    <meta property="og:url" content="https://studioq.co.jp/blog/">
    <meta property="og:type" content="website">
    <title>スタジオQブログ - 最新の撮影テクニックや活用方法</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="blog-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="canonical" href="https://studioq.co.jp/blog/">
</head>
<body>
    <!-- ヘッダーとナビゲーション -->
    <header>
        <div class="logo">
            <a href="../index.html"><img src="../images/studioq_logo_white.png" alt="スタジオQ" class="logo-image"></a>
        </div>
        <nav>
            <ul>
                <li><a href="../index.html#home">ホーム</a></li>
                <li><a href="../index.html#about">スタジオについて</a></li>
                <li><a href="../index.html#gallery">ギャラリー</a></li>
                <li><a href="../index.html#contact">お問い合わせ</a></li>
                <li><a href="index.html" class="active">ブログ</a></li>
            </ul>
        </nav>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </header>

    <!-- ブログ一覧 -->
    <section class="blog-listing">
        <div class="container">
            <h1 class="page-title">スタジオQブログ</h1>
            <p class="page-subtitle">最新の撮影テクニックやスタジオの活用方法をご紹介</p>
            
            <div class="blog-filters">
                <div class="search-box">
                    <input type="text" placeholder="ブログ記事を検索..." id="blog-search">
                    <button type="button" id="search-button"><i class="fas fa-search"></i></button>
                </div>
                <div class="category-filter">
                    <select id="category-select">
                        <option value="">すべてのカテゴリー</option>
                        <option value="撮影テクニック">撮影テクニック</option>
                        <option value="機材レビュー">機材レビュー</option>
                        <option value="スタジオ活用術">スタジオ活用術</option>
                        <option value="映像制作のコツ">映像制作のコツ</option>
                        <option value="ライブ配信ガイド">ライブ配信ガイド</option>
                    </select>
                </div>
            </div>
            
            <div class="blog-grid">
                <!-- ブログ記事がここに追加されます -->
            </div><!-- end blog-grid -->
            
            <div class="pagination">
                <button class="prev-page" disabled><i class="fas fa-chevron-left"></i> 前のページ</button>
                <span class="page-info">1 / 1</span>
                <button class="next-page" disabled>次のページ <i class="fas fa-chevron-right"></i></button>
            </div>
        </div><!-- end container -->
    </section>

    <!-- CTAセクション -->
    <section class="blog-cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>スタジオQで最高の映像制作体験を</h2>
                <p>最新の設備と技術で、あなたのクリエイティブなビジョンを実現します。スタジオツアーや詳細については、お気軽にお問い合わせください。</p>
                <div class="cta-buttons">
                    <a href="../index.html#contact" class="btn btn-primary">お問い合わせ</a>
                    <a href="../index.html#pricing" class="btn btn-secondary">料金プラン</a>
                </div>
            </div>
        </div>
    </section>

    <!-- フッター -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="../images/studioq_logo_white.png" alt="スタジオQ" class="footer-logo-image">
                    <p>最新の技術と創造性で、あなたのビジョンを現実に</p>
                </div>
                <div class="footer-links">
                    <h4>サイトマップ</h4>
                    <ul>
                        <li><a href="../index.html#home">ホーム</a></li>
                        <li><a href="../index.html#about">スタジオについて</a></li>
                        <li><a href="../index.html#gallery">ギャラリー</a></li>
                        <li><a href="../index.html#contact">お問い合わせ</a></li>
                        <li><a href="index.html">ブログ</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>お問い合わせ</h4>
                    <p><i class="fas fa-map-marker-alt"></i> 東京都〇〇区〇〇町1-2-3</p>
                    <p><i class="fas fa-phone"></i> 03-XXXX-XXXX</p>
                    <p><i class="fas fa-envelope"></i> info@studioq.co.jp</p>
                </div>
                <div class="footer-social">
                    <h4>フォローする</h4>
                    <div class="social-icons">
                        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} スタジオQ All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../js/main.js"></script>
    <script src="blog.js"></script>
</body>
</html>`;
}

// メイン関数
async function main() {
  try {
    await generateBlogPost();
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプトを実行
main();
