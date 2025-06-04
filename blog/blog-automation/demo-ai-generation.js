const { MockOpenAIBlogGenerator } = require('./test-openai-mock');
const { createBlogPost } = require('./blog-generator');
require('dotenv').config();

async function demoAIGeneration() {
  console.log('=== OpenAI ブログ自動生成デモ ===\n');
  
  const keywords = [
    '4K映像制作技術',
    'ライブ配信スタジオ設備',
    '音響技術とマイク選び',
    'グリーンスクリーン撮影のコツ'
  ];
  
  const generator = new MockOpenAIBlogGenerator();
  
  for (const keyword of keywords) {
    try {
      console.log(`📝 "${keyword}" の記事を生成中...`);
      
      const content = await generator.generateSEOOptimizedContent(keyword, {
        category: '技術情報',
        author: 'スタジオQ 技術チーム'
      });
      
      const outputPath = await createBlogPost(content);
      
      console.log(`✅ 記事生成完了: ${content.title}`);
      console.log(`   ファイル: ${outputPath}`);
      console.log(`   SEOスコア: ${content.seo_score}`);
      console.log(`   キーワード: ${content.keywords.join(', ')}`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ "${keyword}" の生成に失敗:`, error.message);
    }
  }
  
  console.log('=== デモ完了 ===');
  console.log('生成されたファイルは ../blog/ ディレクトリで確認できます。');
}

if (require.main === module) {
  demoAIGeneration();
}

module.exports = demoAIGeneration;
