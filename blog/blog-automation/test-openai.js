const OpenAIBlogGenerator = require('./openai-integration');
require('dotenv').config();

async function testOpenAIIntegration() {
  console.log('OpenAI統合テストを開始...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('エラー: OPENAI_API_KEYが設定されていません');
    console.log('.envファイルを作成し、OpenAI APIキーを設定してください');
    return;
  }
  
  try {
    const generator = new OpenAIBlogGenerator();
    
    console.log('テスト記事を生成中...');
    const testKeyword = '4K映像制作';
    const options = {
      category: '映像技術',
      author: 'スタジオQ 技術チーム'
    };
    
    const content = await generator.generateSEOOptimizedContent(testKeyword, options);
    
    console.log('\n=== 生成結果 ===');
    console.log('タイトル:', content.title);
    console.log('概要:', content.excerpt);
    console.log('SEOスコア:', content.seo_score);
    console.log('キーワード:', content.keywords.join(', '));
    console.log('文字数:', content.content.length);
    console.log('\n構造化データ:');
    console.log(JSON.stringify(content.structuredData, null, 2));
    
    console.log('\n✅ OpenAI統合テスト完了');
    
  } catch (error) {
    console.error('❌ テスト失敗:', error.message);
  }
}

if (require.main === module) {
  testOpenAIIntegration();
}

module.exports = testOpenAIIntegration;
