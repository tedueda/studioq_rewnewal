const fs = require('fs');
const path = require('path');

const CONFIG = {
  blogDir: path.join(__dirname, '..'),
  indexPath: path.join(__dirname, '..', '..', 'index.html'),
  templatesDir: path.join(__dirname, 'templates'),
  imagesDir: path.join(__dirname, '..', 'images'),
  queuePath: path.join(__dirname, 'blog-queue.json'),
  maxBlogPreviewItems: 4,
  siteUrl: 'https://studioq.co.jp',
  siteName: 'Studio Q',
  siteNameJa: 'スタジオQ'
};

function generateSlug(title) {
  const date = new Date().toISOString().split('T')[0];
  const slug = title
    .toLowerCase()
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${date}-${slug || Math.random().toString(36).substring(2, 8)}`;
}

function generateMetaDescription(theme, target, excerpt) {
  if (excerpt && excerpt.length > 0) {
    return excerpt.substring(0, 155);
  }
  return `${theme}について${target}向けに解説。大阪のプロフェッショナルバーチャルスタジオ「Studio Q」が最新情報をお届けします。`.substring(0, 155);
}

function generateKeywords(theme, category) {
  const baseKeywords = ['スタジオQ', 'Studio Q', 'バーチャルスタジオ', '大阪', '撮影スタジオ'];
  const themeKeywords = theme.split(/[、,\s]+/).filter(k => k.length > 0);
  const categoryKeywords = category ? [category] : [];
  return [...new Set([...themeKeywords, ...categoryKeywords, ...baseKeywords])].join(',');
}

function generateBlogPostingSchema(data) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.metaDescription,
    "image": data.images && data.images.length > 0
      ? `${CONFIG.siteUrl}/blog/images/${data.images[0]}`
      : `${CONFIG.siteUrl}/images/studioq_logo_white.png`,
    "author": {
      "@type": "Organization",
      "name": CONFIG.siteName,
      "url": CONFIG.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": CONFIG.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${CONFIG.siteUrl}/images/studioq_logo_white.png`
      }
    },
    "datePublished": data.isoDate,
    "dateModified": data.isoDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${CONFIG.siteUrl}/blog/${data.slug}.html`
    },
    "keywords": data.keywords
  }, null, 2);
}

function buildImageHtml(images, title) {
  if (!images || images.length === 0) return '';
  let html = '';
  images.forEach((img, index) => {
    const altText = `${title} - 画像${index + 1}`;
    html += `
                <figure class="blog-image-figure">
                    <img src="../blog/images/${img}" alt="${altText}" loading="lazy" width="800" height="450">
                </figure>`;
  });
  return html;
}

function distributeImagesInContent(content, images, title) {
  if (!images || images.length === 0) return content;

  const sections = content.split(/<h[23][^>]*>/);
  if (sections.length <= 1) {
    let imgHtml = '';
    images.forEach((img, i) => {
      imgHtml += `\n<figure class="blog-image-figure"><img src="../blog/images/${img}" alt="${title} - 画像${i + 1}" loading="lazy" width="800" height="450"></figure>\n`;
    });
    return content + imgHtml;
  }

  const h2h3Matches = content.match(/<h[23][^>]*>/g) || [];
  const totalHeadings = h2h3Matches.length;
  const interval = Math.max(1, Math.floor(totalHeadings / images.length));

  let imgIndex = 0;
  let headingCount = 0;
  let result = content;

  for (let i = 0; i < h2h3Matches.length && imgIndex < images.length; i++) {
    headingCount++;
    if (headingCount % interval === 0 && imgIndex < images.length) {
      const heading = h2h3Matches[i];
      const pos = result.indexOf(heading);
      if (pos !== -1) {
        const imgTag = `\n<figure class="blog-image-figure"><img src="../blog/images/${images[imgIndex]}" alt="${title} - 画像${imgIndex + 1}" loading="lazy" width="800" height="450"></figure>\n`;
        result = result.substring(0, pos) + imgTag + result.substring(pos);
        imgIndex++;
      }
    }
  }

  while (imgIndex < images.length) {
    result += `\n<figure class="blog-image-figure"><img src="../blog/images/${images[imgIndex]}" alt="${title} - 画像${imgIndex + 1}" loading="lazy" width="800" height="450"></figure>\n`;
    imgIndex++;
  }

  return result;
}

async function generateContentWithOpenAI(theme, target, wordCount, apiKey) {
  const prompt = `あなたはSEOに精通したプロのブログライターです。以下の条件でブログ記事を作成してください。

テーマ: ${theme}
ターゲット読者: ${target}
文字数: 約${wordCount}文字
ブランド: Studio Q（スタジオQ） - 大阪のプロフェッショナルバーチャル撮影スタジオ

要件:
1. SEOに最適化されたタイトル（h1タグ用、60文字以内）
2. メタディスクリプション（155文字以内）
3. カテゴリー名（短く、2-5文字程度）
4. 記事の概要/リード文（200文字以内）
5. 本文（HTMLタグ付き、h2/h3で構造化、約${wordCount}文字）

本文のルール:
- h2タグで大きなセクションを区切る（3-5個）
- h3タグでサブセクションを作る
- ul/liタグでリストを活用
- strongタグで重要なキーワードを強調
- 内部リンクとして以下を自然に含める:
  - <a href="../index.html#contact">お問い合わせ</a>
  - <a href="../studio_fee.html">料金プラン</a>
  - <a href="../index.html#gallery">ギャラリー</a>
- スタジオQの強み（4K撮影、グリーンスクリーン、防音設備、天井高5M）を自然に盛り込む
- 最後にCTAセクションを含める

以下のJSON形式で出力してください:
{
  "title": "SEO最適化されたタイトル",
  "metaDescription": "メタディスクリプション",
  "category": "カテゴリー名",
  "excerpt": "記事の概要",
  "content": "HTMLタグ付きの本文"
}

重要: 純粋なJSONのみを出力してください。マークダウンのコードブロック記法は使わないでください。`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'あなたはSEO専門のブログライターです。日本語で高品質なブログ記事をJSON形式で出力します。マークダウンのコードブロック記法（```）は絶対に使わず、純粋なJSONのみを出力してください。'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  let rawContent = result.choices[0].message.content.trim();
  rawContent = rawContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  return JSON.parse(rawContent);
}

async function createBlogPost(blogData) {
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];
  const displayDate = isoDate.replace(/-/g, '.');

  const data = {
    title: blogData.title || '新しいブログ記事',
    slug: blogData.slug || generateSlug(blogData.title || '新しいブログ記事'),
    date: displayDate,
    isoDate: isoDate,
    category: blogData.category || 'その他',
    images: blogData.images || [],
    excerpt: blogData.excerpt || '',
    content: blogData.content || '<p>ブログ記事の内容</p>',
    author: blogData.author || CONFIG.siteNameJa,
    metaDescription: blogData.metaDescription || '',
    target: blogData.target || '',
    theme: blogData.theme || ''
  };

  if (!data.metaDescription) {
    data.metaDescription = generateMetaDescription(data.theme, data.target, data.excerpt);
  }
  data.keywords = generateKeywords(data.theme || data.title, data.category);

  const contentWithImages = distributeImagesInContent(data.content, data.images, data.title);

  const featuredImage = data.images && data.images.length > 0
    ? `../blog/images/${data.images[0]}`
    : '../images/studioq_logo_white.png';

  const ogImage = data.images && data.images.length > 0
    ? `${CONFIG.siteUrl}/blog/images/${data.images[0]}`
    : `${CONFIG.siteUrl}/images/studioq_logo_white.png`;

  const schemaJson = generateBlogPostingSchema(data);

  const templatePath = path.join(CONFIG.templatesDir, 'blog-post-seo-template.html');
  let template = fs.readFileSync(templatePath, 'utf8');

  template = template
    .replace(/{{title}}/g, data.title)
    .replace(/{{date}}/g, data.date)
    .replace(/{{isoDate}}/g, data.isoDate)
    .replace(/{{category}}/g, data.category)
    .replace(/{{featuredImage}}/g, featuredImage)
    .replace(/{{ogImage}}/g, ogImage)
    .replace(/{{content}}/g, contentWithImages)
    .replace(/{{author}}/g, data.author)
    .replace(/{{metaDescription}}/g, data.metaDescription)
    .replace(/{{keywords}}/g, data.keywords)
    .replace(/{{slug}}/g, data.slug)
    .replace(/{{siteUrl}}/g, CONFIG.siteUrl)
    .replace(/{{schemaJson}}/g, schemaJson)
    .replace(/{{excerpt}}/g, data.excerpt);

  const outputPath = path.join(CONFIG.blogDir, `${data.slug}.html`);
  fs.writeFileSync(outputPath, template);
  console.log(`Blog post created: ${outputPath}`);

  await updateIndexPage({
    title: data.title,
    slug: data.slug,
    date: data.date,
    category: data.category,
    image: data.images && data.images.length > 0 ? `blog/images/${data.images[0]}` : 'images/studioq_logo_white.png',
    excerpt: data.excerpt
  });

  return outputPath;
}

async function updateIndexPage(blogData) {
  const indexHtml = fs.readFileSync(CONFIG.indexPath, 'utf8');

  const blogGridRegex = /<div class="blog-preview-grid">([\s\S]*?)<\/div>\s*\n\s*<div class="blog-more">/;
  const match = indexHtml.match(blogGridRegex);

  if (!match) {
    console.log('blog-preview-grid not found in index.html, skipping index update');
    return;
  }

  const formattedDate = blogData.date.includes('-')
    ? blogData.date.replace(/-/g, '.')
    : blogData.date;

  const newCard = `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${blogData.image}" alt="${blogData.title} - Studio Qブログ記事" loading="lazy">
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
            </article>`;

  const existingCards = match[1];
  const cardMatches = existingCards.match(/<article class="blog-card">[\s\S]*?<\/article>/g) || [];

  const allCards = [newCard, ...cardMatches].slice(0, CONFIG.maxBlogPreviewItems);
  const newGridContent = allCards.join('\n            ');

  const updatedHtml = indexHtml.replace(
    blogGridRegex,
    `<div class="blog-preview-grid">${newGridContent}\n        </div>\n        \n        <div class="blog-more">`
  );

  fs.writeFileSync(CONFIG.indexPath, updatedHtml);
  console.log('Index page updated with new blog preview');
}

async function processQueue(apiKey) {
  if (!fs.existsSync(CONFIG.queuePath)) {
    console.log('No blog queue found');
    return;
  }

  const queue = JSON.parse(fs.readFileSync(CONFIG.queuePath, 'utf8'));
  if (!queue.pending || queue.pending.length === 0) {
    console.log('No pending blog posts in queue');
    return;
  }

  const item = queue.pending.shift();
  console.log(`Processing: ${item.theme}`);

  try {
    const generated = await generateContentWithOpenAI(
      item.theme,
      item.target,
      item.wordCount,
      apiKey
    );

    const blogData = {
      ...generated,
      images: item.images || [],
      author: item.author || CONFIG.siteNameJa,
      theme: item.theme,
      target: item.target
    };

    const outputPath = await createBlogPost(blogData);

    if (!queue.completed) queue.completed = [];
    queue.completed.push({
      ...item,
      generatedTitle: generated.title,
      outputPath: outputPath,
      completedAt: new Date().toISOString()
    });

    fs.writeFileSync(CONFIG.queuePath, JSON.stringify(queue, null, 2));
    console.log('Queue updated');
  } catch (error) {
    console.error('Error processing queue item:', error);
    if (!queue.failed) queue.failed = [];
    queue.failed.push({
      ...item,
      error: error.message,
      failedAt: new Date().toISOString()
    });
    fs.writeFileSync(CONFIG.queuePath, JSON.stringify(queue, null, 2));
  }
}

function addToQueue(item) {
  let queue = { pending: [], completed: [], failed: [] };
  if (fs.existsSync(CONFIG.queuePath)) {
    queue = JSON.parse(fs.readFileSync(CONFIG.queuePath, 'utf8'));
  }
  if (!queue.pending) queue.pending = [];

  queue.pending.push({
    ...item,
    addedAt: new Date().toISOString()
  });

  fs.writeFileSync(CONFIG.queuePath, JSON.stringify(queue, null, 2));
  console.log(`Added to queue: ${item.theme}`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'generate') {
    const dataPath = args[1];
    if (!dataPath) {
      console.error('Usage: node blog-auto-generator.js generate <data-file.json>');
      process.exit(1);
    }
    const blogData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    createBlogPost(blogData)
      .then(() => console.log('Blog post generation complete'))
      .catch(err => { console.error('Error:', err); process.exit(1); });
  } else if (command === 'process-queue') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY environment variable is required');
      process.exit(1);
    }
    processQueue(apiKey)
      .then(() => console.log('Queue processing complete'))
      .catch(err => { console.error('Error:', err); process.exit(1); });
  } else if (command === 'add-to-queue') {
    const dataPath = args[1];
    if (!dataPath) {
      console.error('Usage: node blog-auto-generator.js add-to-queue <data-file.json>');
      process.exit(1);
    }
    const item = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    addToQueue(item);
  } else {
    console.log(`
StudioQ Blog Auto Generator

Usage:
  node blog-auto-generator.js generate <data-file.json>
    Generate a blog post from pre-made data (no AI needed)

  node blog-auto-generator.js process-queue
    Process the next pending item in the queue using OpenAI API
    Requires OPENAI_API_KEY environment variable

  node blog-auto-generator.js add-to-queue <data-file.json>
    Add a new blog request to the queue

Queue data format:
  {
    "theme": "テーマ",
    "target": "ターゲット読者",
    "wordCount": 3000,
    "images": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
    "author": "スタジオQ"
  }
    `);
  }
}

module.exports = {
  createBlogPost,
  updateIndexPage,
  processQueue,
  addToQueue,
  generateContentWithOpenAI,
  CONFIG
};
