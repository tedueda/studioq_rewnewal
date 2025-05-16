const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// 設定
const CONFIG = {
  blogDir: path.join(__dirname, '..', 'blog'),
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

  // テンプレートを読み込む
  const templatePath = path.join(CONFIG.templatesDir, 'blog-post-template.html');
  let template = fs.readFileSync(templatePath, 'utf8');

  // テンプレート変数を置換
  template = template
    .replace(/{{title}}/g, data.title)
    .replace(/{{date}}/g, data.date)
    .replace(/{{category}}/g, data.category)
    .replace(/{{image}}/g, data.image)
    .replace(/{{content}}/g, data.content)
    .replace(/{{author}}/g, data.author);

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
  } else {
    console.log(`
使用方法:
  node blog-generator.js create [data-file.json]
    
  data-file.json: ブログ記事のデータを含むJSONファイル（省略時はblog-data.jsonを使用）
    `);
  }
}

module.exports = {
  createBlogPost,
  updateIndexPage
};
