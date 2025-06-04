const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class OpenAIBlogGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    this.config = {
      model: process.env.OPENAI_MODEL || 'gpt-4',
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7
    };
  }

  buildPrompt(keyword, options = {}) {
    const category = options.category || process.env.DEFAULT_CATEGORY || '技術情報';
    const siteName = process.env.SITE_NAME || 'スタジオQ';
    
    return `あなたは${siteName}の専門的なブログライターです。以下の要件に従って、高品質なブログ記事を作成してください。

【記事要件】
- キーワード: ${keyword}
- カテゴリー: ${category}
- 対象読者: 映像制作・音響技術に興味のあるクリエイター
- 文字数: 1500-2000文字
- 文体: 専門的だが親しみやすい

【記事構成】
1. 導入部分（問題提起・興味を引く内容）
2. 主要コンテンツ（3-4つのセクション）
3. 実践的なアドバイス・具体例
4. まとめ（行動を促す内容）

【SEO要件】
- キーワードを自然に含める（密度2-3%）
- 見出しにキーワードを含める
- 読みやすい段落構成
- 専門用語の適切な説明

【出力形式】
以下のJSON形式で出力してください：

{
  "title": "魅力的なタイトル（キーワードを含む）",
  "excerpt": "記事の概要（150文字以内）",
  "content": "HTML形式の記事本文（h2, h3, p, ul, li, strongタグを使用）",
  "meta_description": "SEO用メタディスクリプション（160文字以内）",
  "keywords": ["キーワード1", "キーワード2", "キーワード3"],
  "seo_score": 85
}

記事を作成してください。`;
  }

  async generateBlogContent(keyword, options = {}) {
    try {
      console.log(`OpenAI APIを使用してブログ記事を生成中: ${keyword}`);
      
      const prompt = this.buildPrompt(keyword, options);
      
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          {
            role: "system",
            content: "あなたは専門的なブログライターです。高品質で読みやすく、SEOに最適化された記事を作成します。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature
      });

      const content = response.choices[0].message.content;
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('OpenAI APIからの応答がJSON形式ではありません');
      }
      
      const generatedContent = JSON.parse(jsonMatch[0]);
      
      return this.validateAndEnhanceContent(generatedContent, keyword, options);
      
    } catch (error) {
      console.error('OpenAI API呼び出しエラー:', error);
      throw error;
    }
  }

  validateAndEnhanceContent(content, keyword, options) {
    const baseUrl = process.env.BASE_URL || 'https://studioq.jp';
    
    const enhanced = {
      title: content.title || `${keyword}について`,
      excerpt: content.excerpt || `${keyword}に関する専門的な情報をお届けします。`,
      content: content.content || '<p>コンテンツを生成できませんでした。</p>',
      meta_description: content.meta_description || content.excerpt || `${keyword}について詳しく解説します。`,
      keywords: content.keywords || [keyword],
      seo_score: content.seo_score || 70,
      category: options.category || process.env.DEFAULT_CATEGORY || '技術情報',
      author: options.author || process.env.DEFAULT_AUTHOR || 'スタジオQ',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      image: options.image || process.env.DEFAULT_IMAGE || 'slide1.jpg'
    };

    enhanced.slug = this.generateSlug(enhanced.title);
    enhanced.structured_data = this.generateStructuredData(enhanced, baseUrl);
    
    return enhanced;
  }

  generateSlug(title) {
    const date = new Date().toISOString().split('T')[0];
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${date}-${randomStr}`;
  }

  async generateSEOOptimizedContent(keyword, options = {}) {
    const content = await this.generateBlogContent(keyword, options);
    
    return content;
  }

  generateStructuredData(content, baseUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": content.title,
      "description": content.meta_description,
      "author": {
        "@type": "Organization",
        "name": content.author
      },
      "publisher": {
        "@type": "Organization",
        "name": process.env.SITE_NAME || "スタジオQ",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/studioq_logo-1.png`
        }
      },
      "datePublished": content.date.replace(/\./g, '-'),
      "dateModified": content.date.replace(/\./g, '-'),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${content.slug}.html`
      },
      "image": `${baseUrl}/images/${content.image}`,
      "keywords": Array.isArray(content.keywords) ? content.keywords.join(', ') : content.keywords
    };
  }
}

module.exports = OpenAIBlogGenerator;
