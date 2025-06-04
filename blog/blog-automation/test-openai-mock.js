const OpenAIBlogGenerator = require('./openai-integration');
require('dotenv').config();

class MockOpenAIBlogGenerator extends OpenAIBlogGenerator {
  async generateBlogContent(keyword, options = {}) {
    console.log(`モック: OpenAI APIを使用してブログ記事を生成中: ${keyword}`);
    
    const mockContent = {
      title: `${keyword}の完全ガイド - プロが教える最新技術`,
      excerpt: `${keyword}について、スタジオQの専門チームが詳しく解説します。最新の技術動向から実践的なアドバイスまで、プロフェッショナルな視点でお届けします。`,
      content: `
        <h2>${keyword}とは</h2>
        <p>${keyword}は、現代の映像制作において重要な技術の一つです。スタジオQでは、最新の${keyword}技術を活用して、高品質な映像制作サービスを提供しています。</p>
        
        <h3>主な特徴</h3>
        <ul>
          <li>高解像度での映像制作が可能</li>
          <li>プロフェッショナルな品質を実現</li>
          <li>効率的なワークフローを構築</li>
        </ul>
        
        <h3>実践的なアドバイス</h3>
        <p>スタジオQでは、${keyword}を活用した映像制作において、以下のポイントを重視しています：</p>
        <ol>
          <li><strong>適切な機材選択</strong>: 目的に応じた最適な機材を選定</li>
          <li><strong>環境設定</strong>: 撮影環境の最適化</li>
          <li><strong>後処理技術</strong>: 高品質な仕上がりを実現</li>
        </ol>
        
        <h2>まとめ</h2>
        <p>${keyword}は、映像制作の可能性を大きく広げる技術です。スタジオQでは、これらの技術を駆使して、お客様のニーズに応える高品質な映像制作を行っています。</p>
      `,
      meta_description: `${keyword}について、スタジオQの専門チームが詳しく解説。最新技術から実践的なアドバイスまで、プロの視点でお届けします。`,
      keywords: [keyword, "映像制作", "スタジオQ", "プロフェッショナル", "技術"],
      seo_score: 88
    };
    
    return this.validateAndEnhanceContent(mockContent, keyword, options);
  }
}

async function testMockOpenAIIntegration() {
  console.log('OpenAI統合モックテストを開始...');
  
  try {
    const generator = new MockOpenAIBlogGenerator();
    
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
    console.log('スラグ:', content.slug);
    console.log('\n構造化データ:');
    console.log(JSON.stringify(content.structured_data, null, 2));
    
    console.log('\n✅ OpenAI統合モックテスト完了');
    return content;
    
  } catch (error) {
    console.error('❌ テスト失敗:', error.message);
    throw error;
  }
}

if (require.main === module) {
  testMockOpenAIIntegration();
}

module.exports = { testMockOpenAIIntegration, MockOpenAIBlogGenerator };
