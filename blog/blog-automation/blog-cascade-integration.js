const fs = require('fs');
const path = require('path');
const { createBlogPost } = require('./blog-generator.js');

/**
 * Blog Cascade Integration Module
 * Bridges the AI blog generation system with Studio Q's blog automation
 */

class BlogCascadeIntegration {
    constructor() {
        this.cascadeDir = path.join(__dirname, '..', '..', '..', 'blog_cascade');
        this.outputDir = path.join(__dirname, 'generated-posts');
        
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Convert blog_cascade generated content to studioq format
     * @param {Object} cascadeData - Data from blog_cascade system
     * @returns {Object} - Data formatted for studioq blog-generator
     */
    convertCascadeToStudioQ(cascadeData) {
        const slug = this.generateSlug(cascadeData.title || 'new-blog-post');
        
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '.');
        
        const category = this.extractCategory(cascadeData.mainKeyword || cascadeData.targetAudience);
        
        const content = this.convertContentToHTML(cascadeData);
        
        return {
            title: cascadeData.title || 'AI生成ブログ記事',
            slug: slug,
            date: date,
            category: category,
            image: this.selectFeaturedImage(cascadeData),
            excerpt: cascadeData.metaDescription || this.generateExcerpt(content),
            content: content,
            author: 'スタジオQ AIチーム',
            seoTitle: cascadeData.title,
            metaDescription: cascadeData.metaDescription,
            structuredData: cascadeData.jsonLd || this.generateStructuredData(cascadeData)
        };
    }

    /**
     * Generate URL-friendly slug from title
     * @param {string} title - Blog post title
     * @returns {string} - URL-friendly slug
     */
    generateSlug(title) {
        const timestamp = Math.floor(Date.now() / 1000);
        const baseSlug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 30);
        
        return baseSlug ? `${timestamp}-${baseSlug}` : `blog-post-${timestamp}`;
    }

    /**
     * Extract category from keywords
     * @param {string} keyword - Main keyword or target audience
     * @returns {string} - Category name
     */
    extractCategory(keyword) {
        if (!keyword) return 'その他';
        
        const categoryMap = {
            '映像制作': ['映像', '動画', 'ビデオ', '撮影'],
            '音響技術': ['音響', '音声', 'オーディオ', 'サウンド'],
            'ライブ配信': ['ライブ', '配信', 'ストリーミング'],
            'バーチャルプロダクション': ['バーチャル', 'VR', 'AR', 'グリーンスクリーン'],
            '機材紹介': ['カメラ', '機材', '設備', 'レンズ'],
            '撮影テクニック': ['テクニック', '技術', 'コツ', '方法']
        };

        for (const [category, keywords] of Object.entries(categoryMap)) {
            if (keywords.some(k => keyword.includes(k))) {
                return category;
            }
        }

        return 'その他';
    }

    /**
     * Convert blog_cascade content structure to HTML
     * @param {Object} cascadeData - Blog cascade data
     * @returns {string} - HTML content
     */
    convertContentToHTML(cascadeData) {
        if (cascadeData.content) {
            return cascadeData.content;
        }

        let html = '';
        
        if (cascadeData.sections) {
            cascadeData.sections.forEach((section, index) => {
                if (section.heading) {
                    html += `<h2>${section.heading}</h2>\n\n`;
                }
                
                if (section.content) {
                    html += `<p>${section.content}</p>\n\n`;
                }
                
                if (section.image) {
                    html += `<div class="section-image">\n`;
                    html += `  <img src="../images/${section.image}" alt="${section.heading || 'セクション画像'}">\n`;
                    html += `</div>\n\n`;
                }
            });
        }

        if (!html) {
            html = '<p>AI生成されたブログ記事の内容がここに表示されます。</p>';
        }

        return html;
    }

    /**
     * Select appropriate featured image
     * @param {Object} cascadeData - Blog cascade data
     * @returns {string} - Image filename
     */
    selectFeaturedImage(cascadeData) {
        if (cascadeData.featuredImage) {
            return cascadeData.featuredImage;
        }

        const defaultImages = {
            '映像制作': 'slide1.jpg',
            '音響技術': 'tascam02-1-jpg.webp',
            'ライブ配信': 'bl04.png',
            'バーチャルプロダクション': 'cropped-slide3-2_1920-jpg.webp',
            '機材紹介': 'slide4-2_1920-jpg.webp',
            '撮影テクニック': 'top3-1.jpg'
        };

        const category = this.extractCategory(cascadeData.mainKeyword || cascadeData.targetAudience);
        return defaultImages[category] || 'slide1.jpg';
    }

    /**
     * Generate excerpt from content
     * @param {string} content - HTML content
     * @returns {string} - Excerpt text
     */
    generateExcerpt(content) {
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.substring(0, 100) + '...';
    }

    /**
     * Generate JSON-LD structured data
     * @param {Object} cascadeData - Blog cascade data
     * @returns {string} - JSON-LD script tag
     */
    generateStructuredData(cascadeData) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": cascadeData.title,
            "description": cascadeData.metaDescription,
            "author": {
                "@type": "Organization",
                "name": "スタジオQ"
            },
            "publisher": {
                "@type": "Organization",
                "name": "スタジオQ",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://studioq.jp/images/studioq_logo_white.png"
                }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://studioq.jp/blog/${this.generateSlug(cascadeData.title)}.html`
            }
        };

        return `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`;
    }

    /**
     * Process blog_cascade output and create Studio Q blog post
     * @param {Object} cascadeData - Data from blog_cascade
     * @returns {Promise<string>} - Path to created blog post
     */
    async processAndPublish(cascadeData) {
        try {
            const studioQData = this.convertCascadeToStudioQ(cascadeData);
            
            const jsonPath = path.join(this.outputDir, `${studioQData.slug}.json`);
            fs.writeFileSync(jsonPath, JSON.stringify(studioQData, null, 2));
            
            console.log(`Generated blog data saved to: ${jsonPath}`);
            
            const blogPostPath = await createBlogPost(studioQData);
            
            console.log(`Blog post created and published: ${blogPostPath}`);
            
            return blogPostPath;
        } catch (error) {
            console.error('Error processing blog_cascade data:', error);
            throw error;
        }
    }

    /**
     * Batch process multiple blog posts
     * @param {Array} cascadeDataArray - Array of blog_cascade data
     * @returns {Promise<Array>} - Array of created blog post paths
     */
    async batchProcess(cascadeDataArray) {
        const results = [];
        
        for (const cascadeData of cascadeDataArray) {
            try {
                const result = await this.processAndPublish(cascadeData);
                results.push(result);
            } catch (error) {
                console.error(`Failed to process blog post: ${cascadeData.title}`, error);
                results.push(null);
            }
        }
        
        return results;
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    
    const integration = new BlogCascadeIntegration();
    
    if (command === 'process') {
        const dataPath = args[1];
        if (!dataPath) {
            console.error('Usage: node blog-cascade-integration.js process <data-file.json>');
            process.exit(1);
        }
        
        try {
            const cascadeData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            integration.processAndPublish(cascadeData)
                .then(result => {
                    console.log('Integration completed successfully:', result);
                })
                .catch(error => {
                    console.error('Integration failed:', error);
                    process.exit(1);
                });
        } catch (error) {
            console.error('Error reading data file:', error);
            process.exit(1);
        }
    } else {
        console.log(`
Usage:
  node blog-cascade-integration.js process <data-file.json>
  
  data-file.json: JSON file containing blog_cascade generated data
        `);
    }
}

module.exports = BlogCascadeIntegration;
