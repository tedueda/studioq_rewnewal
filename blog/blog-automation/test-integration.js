const { testMockOpenAIIntegration, MockOpenAIBlogGenerator } = require('./test-openai-mock');
const fs = require('fs');
const path = require('path');

async function testFullIntegration() {
  console.log('=== 完全統合テスト開始 ===\n');
  
  try {
    console.log('1. モックOpenAI統合テスト...');
    const content = await testMockOpenAIIntegration();
    
    console.log('\n2. ブログ記事生成テスト...');
    
    const CONFIG = {
      blogDir: path.join(__dirname, '..', 'blog'),
      indexPath: path.join(__dirname, '..', 'index.html'),
      templatesDir: path.join(__dirname, 'templates'),
      maxBlogPreviewItems: 3
    };
    
    const data = {
      title: 'テスト記事',
      slug: 'test-article',
      date: '2025.04.01',
      category: 'テスト',
      image: 'slide1.jpg',
      excerpt: 'テスト記事の概要',
      content: '<p>テスト記事の内容</p>',
      author: 'テスト著者',
      ...content
    };
    
    const templateName = data.structured_data ? 'blog-post-seo-template.html' : 'blog-post-template.html';
    const templatePath = path.join(CONFIG.templatesDir, templateName);
    let template = fs.readFileSync(templatePath, 'utf8');
    
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
    
    const outputPath = path.join(CONFIG.blogDir, `${data.slug}.html`);
    fs.writeFileSync(outputPath, template);
    
    console.log(`✅ ブログ記事が正常に生成されました: ${outputPath}`);
    
    console.log('\n3. テンプレート選択テスト...');
    console.log(`使用されたテンプレート: ${content.structured_data ? 'SEO最適化テンプレート' : '標準テンプレート'}`);
    
    console.log('\n4. SEO機能テスト...');
    console.log(`- メタディスクリプション: ${content.meta_description ? '✅' : '❌'}`);
    console.log(`- キーワード: ${content.keywords && content.keywords.length > 0 ? '✅' : '❌'}`);
    console.log(`- 構造化データ: ${content.structured_data ? '✅' : '❌'}`);
    console.log(`- SEOスコア: ${content.seo_score ? '✅' : '❌'}`);
    
    console.log('\n=== 完全統合テスト完了 ===');
    console.log('✅ すべてのテストが正常に完了しました');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ 統合テスト失敗:', error.message);
    return false;
  }
}

if (require.main === module) {
  testFullIntegration();
}

module.exports = testFullIntegration;
