/**
 * ブログ自動管理システム
 * 最新3件のブログ記事を日付順に自動表示
 */

class BlogManager {
    constructor() {
        this.blogDataUrl = 'blog-data.json';
        this.previewContainer = null;
    }

    /**
     * ブログデータを取得
     */
    async fetchBlogData() {
        try {
            const response = await fetch(this.blogDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.posts;
        } catch (error) {
            console.error('ブログデータの取得に失敗しました:', error);
            return [];
        }
    }

    /**
     * 日付順にソートして最新3件を取得
     */
    getLatestPosts(posts, limit = 3) {
        return posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    /**
     * 日付をフォーマット
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    /**
     * ブログカードHTMLを生成
     */
    createBlogCardHTML(post) {
        return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="blog-date">${this.formatDate(post.date)}</div>
                </div>
                <div class="blog-content">
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-footer">
                        <span class="blog-category">${post.category}</span>
                        <a href="${post.url}" class="blog-link">続きを読む <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * ブログプレビューセクションを更新
     */
    async updateBlogPreview() {
        // プレビューコンテナを取得
        this.previewContainer = document.querySelector('.blog-preview-grid');
        
        if (!this.previewContainer) {
            console.error('ブログプレビューコンテナが見つかりません');
            return;
        }

        try {
            // ローディング表示
            this.previewContainer.innerHTML = '<div class="loading">ブログを読み込み中...</div>';

            // ブログデータを取得
            const posts = await this.fetchBlogData();
            
            if (posts.length === 0) {
                this.previewContainer.innerHTML = '<div class="error">ブログデータが見つかりません</div>';
                return;
            }

            // 最新3件を取得
            const latestPosts = this.getLatestPosts(posts, 3);

            // HTMLを生成
            const blogCardsHTML = latestPosts
                .map(post => this.createBlogCardHTML(post))
                .join('');

            // DOMを更新
            this.previewContainer.innerHTML = blogCardsHTML;

            console.log(`✅ ブログプレビューを更新しました (${latestPosts.length}件)`);

        } catch (error) {
            console.error('ブログプレビューの更新に失敗しました:', error);
            this.previewContainer.innerHTML = '<div class="error">ブログの読み込みに失敗しました</div>';
        }
    }

    /**
     * 初期化
     */
    init() {
        // DOMが読み込まれたら実行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateBlogPreview();
            });
        } else {
            this.updateBlogPreview();
        }
    }

    /**
     * 手動更新（管理者用）
     */
    async refresh() {
        console.log('🔄 ブログプレビューを手動更新中...');
        await this.updateBlogPreview();
    }
}

// グローバルインスタンスを作成
const blogManager = new BlogManager();

// 自動初期化
blogManager.init();

// 管理者用：コンソールからアクセス可能
window.blogManager = blogManager;

// エクスポート（モジュール使用時）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogManager;
}
