const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// 設定
const CONFIG = {
  blogDir: path.join(__dirname, '..'),
  indexPath: path.join(__dirname, '..', 'index.html'),
  templatesDir: path.join(__dirname, 'templates'),
  maxBlogPreviewItems: 3 // トップページに表示する最大ブログ記事数
};

/**
 * 新しいブログ記事を作成する
 * @param {Object} blogData - ブログ記事のデータ
 * @returns {Promise<string>} - 作成されたブログ記事のパス
 */
async function createBlogPost(blogData) {
  // デフォルト値とマージ
  const data = {
    title: '新しいブログ記事',
    slug: generateSlug(blogData.title || '新しいブログ記事'),
    date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    category: 'その他',
    image: 'slide1.jpg',
    excerpt: 'ブログ記事の概要',
    content: '<p>ブログ記事の内容</p>',
    author: 'スタジオQ',
    ...blogData
  };

  // テンプレートを読み込む（SEO対応の場合は専用テンプレートを使用）
  const templateName = data.structured_data ? 'blog-post-seo-template.html' : 'blog-post-template.html';
  const templatePath = path.join(CONFIG.templatesDir, templateName);
  let template = fs.readFileSync(templatePath, 'utf8');

  // テンプレート変数を置換
  template = template
    .replace(/{{title}}/g, data.title)
    .replace(/{{date}}/g, data.date)
    .replace(/{{category}}/g, data.category)
    .replace(/{{image}}/g, data.image)
    .replace(/{{content}}/g, data.content)
    .replace(/{{author}}/g, data.author)
    .replace(/{{slug}}/g, data.slug)
    .replace(/{{meta_description}}/g, data.meta_description || data.excerpt)
    .replace(/{{keywords}}/g, Array.isArray(data.keywords) ? data.keywords.join(', ') : '')
    .replace(/{{structured_data}}/g, data.structured_data ? JSON.stringify(data.structured_data, null, 2) : '')
    .replace(/{{base_url}}/g, process.env.BASE_URL || 'https://studioq.jp')
    .replace(/{{seo_score}}/g, data.seo_score || '');

  // ファイルを保存
  const outputPath = path.join(CONFIG.blogDir, `${data.slug}.html`);
  fs.writeFileSync(outputPath, template);
  
  console.log(`ブログ記事を作成しました: ${outputPath}`);
  
  // トップページを更新
  await updateIndexPage({
    title: data.title,
    slug: data.slug,
    date: data.date,
    category: data.category,
    image: data.image,
    excerpt: data.excerpt
  });
  
  return outputPath;
}

/**
 * トップページのブログセクションを更新する
 * @param {Object} blogData - 新しいブログ記事のデータ
 */
async function updateIndexPage(blogData) {
  // index.htmlを読み込む
  const indexHtml = fs.readFileSync(CONFIG.indexPath, 'utf8');
  const dom = new JSDOM(indexHtml);
  const document = dom.window.document;
  
  // ブログプレビューグリッドを取得
  const blogGrid = document.querySelector('.blog-preview-grid');
  if (!blogGrid) {
    console.error('ブログプレビューグリッドが見つかりません');
    return;
  }
  
  // 新しいブログカードを作成
  const newBlogCard = document.createElement('article');
  newBlogCard.className = 'blog-card';
  
  // 日付を整形（YYYY.MM.DD形式）
  const formattedDate = blogData.date.includes('-') 
    ? blogData.date.replace(/-/g, '.') 
    : blogData.date;
  
  newBlogCard.innerHTML = `
    <div class="blog-image">
      <img src="images/${blogData.image}" alt="${blogData.title}">
      <div class="blog-date">${formattedDate}</div>
    </div>
    <div class="blog-content">
      <h3 class="blog-title">${blogData.title}</h3>
      <p class="blog-excerpt">${blogData.excerpt}</p>
      <div class="blog-footer">
        <span class="blog-category">${blogData.category}</span>
        <a href="blog/${blogData.slug}.html" class="blog-link">続きを読む <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  `;
  
  // 最新の記事を先頭に追加
  blogGrid.insertBefore(newBlogCard, blogGrid.firstChild);
  
  // 表示する記事数を制限
  const blogCards = blogGrid.querySelectorAll('.blog-card');
  for (let i = CONFIG.maxBlogPreviewItems; i < blogCards.length; i++) {
    blogGrid.removeChild(blogCards[i]);
  }
  
  // 更新したHTMLを保存
  fs.writeFileSync(CONFIG.indexPath, dom.serialize());
  console.log('トップページを更新しました');
}

/**
 * タイトルからスラグ（URLフレンドリーな文字列）を生成
 * @param {string} title - ブログ記事のタイトル
 * @returns {string} - 生成されたスラグ
 */
function generateSlug(title) {
  // 日本語タイトルの場合はローマ字変換などが必要
  // ここでは簡易的に日付とランダム文字列を使用
  const date = new Date().toISOString().split('T')[0];
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${date}-${randomStr}`;
}

// コマンドライン引数からブログデータを取得する例
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'create') {
    // JSONファイルからブログデータを読み込む
    const dataPath = args[1] || path.join(__dirname, 'blog-data.json');
    const blogData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    createBlogPost(blogData)
      .then(outputPath => {
        console.log('ブログ記事の作成と公開が完了しました');
      })
      .catch(err => {
        console.error('エラーが発生しました:', err);
      });
  } else if (command === 'generate-ai') {
    const OpenAIBlogGenerator = require('./openai-integration');
    require('dotenv').config();
    
    const keyword = args[1];
    if (!keyword) {
      console.error('エラー: キーワードを指定してください');
      console.log('使用方法: node blog-generator.js generate-ai "キーワード" [カテゴリー]');
      process.exit(1);
    }
    
    const options = {
      category: args[2] || process.env.DEFAULT_CATEGORY || '技術情報',
      author: process.env.DEFAULT_AUTHOR || 'スタジオQ'
    };
    
    const generator = new OpenAIBlogGenerator();
    generator.generateSEOOptimizedContent(keyword, options)
      .then(content => {
        return createBlogPost(content);
      })
      .then(outputPath => {
        console.log('OpenAI APIによるブログ記事の生成と公開が完了しました');
        console.log(`出力ファイル: ${outputPath}`);
      })
      .catch(err => {
        console.error('エラーが発生しました:', err.message);
        if (err.message.includes('API key')) {
          console.log('\n💡 ヒント: OpenAI APIキーが正しく設定されていない可能性があります。');
          console.log('   .envファイルでOPENAI_API_KEYを確認してください。');
          console.log('   テスト用にはモックテストを実行してください: npm run test-mock');
        }
      });
  } else {
    console.log(`
使用方法:
  node blog-generator.js create [data-file.json]
  node blog-generator.js generate-ai "キーワード" [カテゴリー]
    
  create: JSONファイルからブログ記事を作成
    data-file.json: ブログ記事のデータを含むJSONファイル（省略時はblog-data.jsonを使用）
    
  generate-ai: OpenAI APIを使用してブログ記事を自動生成
    キーワード: 記事生成のベースとなるキーワード（必須）
    カテゴリー: 記事のカテゴリー（省略時は環境変数またはデフォルト値を使用）
    
  テスト:
    npm run test-mock: モックテスト（OpenAI APIキー不要）
    npm run test-integration: 完全統合テスト
    npm run test: 実際のOpenAI APIテスト（APIキー必要）
    `);
  }
}

module.exports = {
  createBlogPost,
  updateIndexPage,
  generateSlug
};
