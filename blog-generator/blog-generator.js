class BlogGeneratorUI {
    constructor() {
        this.currentStep = 1;
        this.formData = {};
        this.uploadedImages = [];
        this.generatedContent = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeImageUpload();
        
        if (window.location.pathname.includes('preview.html')) {
            this.initializePreviewPage();
        }
    }

    bindEvents() {
        const generateForm = document.getElementById('blog-generator-form');
        if (generateForm) {
            generateForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        const previewForm = document.getElementById('preview-form');
        if (previewForm) {
            previewForm.addEventListener('submit', (e) => this.handlePreviewSubmit(e));
        }

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }

        const validateJsonBtn = document.getElementById('validate-json');
        const formatJsonBtn = document.getElementById('format-json');
        
        if (validateJsonBtn) {
            validateJsonBtn.addEventListener('click', () => this.validateJson());
        }
        
        if (formatJsonBtn) {
            formatJsonBtn.addEventListener('click', () => this.formatJson());
        }

        this.bindPublishEvents();

        this.bindCharacterCounters();
    }

    bindCharacterCounters() {
        const titleInput = document.getElementById('preview-title');
        const descInput = document.getElementById('preview-meta-description');
        
        if (titleInput) {
            titleInput.addEventListener('input', () => {
                this.updateCharCounter('title-counter', titleInput.value.length);
            });
        }
        
        if (descInput) {
            descInput.addEventListener('input', () => {
                this.updateCharCounter('description-counter', descInput.value.length);
            });
        }
    }

    updateCharCounter(counterId, length) {
        const counter = document.getElementById(counterId);
        if (counter) {
            counter.textContent = length;
        }
    }

    initializeImageUpload() {
        const imageInputs = document.querySelectorAll('.image-input');
        imageInputs.forEach((input, index) => {
            input.addEventListener('change', (e) => this.handleImageUpload(e, index + 1));
        });
    }

    handleImageUpload(event, imageNumber) {
        const file = event.target.files[0];
        const preview = document.getElementById(`preview-${imageNumber}`);
        const label = event.target.nextElementSibling;

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズは5MB以下にしてください。');
                event.target.value = '';
                return;
            }

            if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
                alert('PNG または JPEG 形式の画像を選択してください。');
                event.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="プレビュー ${imageNumber}">
                    <button type="button" class="remove-image" onclick="blogGenerator.removeImage(${imageNumber})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                preview.classList.add('active');
                label.style.display = 'none';

                this.uploadedImages[imageNumber - 1] = {
                    file: file,
                    dataUrl: e.target.result,
                    name: file.name
                };
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage(imageNumber) {
        const preview = document.getElementById(`preview-${imageNumber}`);
        const input = document.getElementById(`image-${imageNumber}`);
        const label = input.nextElementSibling;

        preview.innerHTML = '';
        preview.classList.remove('active');
        label.style.display = 'flex';
        input.value = '';

        this.uploadedImages[imageNumber - 1] = null;
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.collectFormData();
        this.showLoadingModal();
        
        try {
            const generatedContent = await this.generateContent();
            this.generatedContent = generatedContent;
            
            this.navigateToPreview();
            
        } catch (error) {
            console.error('コンテンツ生成エラー:', error);
            this.hideLoadingModal();
            alert('記事の生成中にエラーが発生しました。もう一度お試しください。');
        }
    }

    validateForm() {
        const targetAudience = document.getElementById('target-audience').value.trim();
        
        if (!targetAudience) {
            alert('ターゲット層は必須項目です。');
            document.getElementById('target-audience').focus();
            return false;
        }

        return true;
    }

    collectFormData() {
        this.formData = {
            referenceUrl: document.getElementById('reference-url').value.trim(),
            targetAudience: document.getElementById('target-audience').value.trim(),
            mainKeyword: document.getElementById('main-keyword').value.trim(),
            totalLength: document.getElementById('total-length').value,
            images: this.uploadedImages.filter(img => img !== null)
        };
    }

    async generateContent() {
        this.updateProgress(20, 'OpenAI APIに接続中...');
        
        const keyword = this.formData.mainKeyword || this.formData.targetAudience;
        const options = {
            category: '技術情報',
            author: 'スタジオQ',
            targetAudience: this.formData.targetAudience,
            referenceUrl: this.formData.referenceUrl,
            wordCount: parseInt(this.formData.totalLength)
        };

        this.updateProgress(50, 'コンテンツを生成中...');

        const mockContent = await this.generateMockContent(keyword, options);
        
        this.updateProgress(80, '記事を最適化中...');
        
        const optimizedContent = this.optimizeContent(mockContent);
        
        this.updateProgress(100, '生成完了！');
        
        return optimizedContent;
    }

    async generateMockContent(keyword, options) {
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: `${keyword}の完全ガイド - プロが教える実践的テクニック`,
                    excerpt: `${keyword}について、${options.targetAudience}向けに詳しく解説します。実践的なアドバイスと具体例を交えて、わかりやすくお伝えします。`,
                    content: `
                        <h2>はじめに</h2>
                        <p>${keyword}は現代の映像制作において重要な技術です。この記事では、${options.targetAudience}の皆様に向けて、実践的な内容をお届けします。</p>
                        
                        <h2>基本的な概念</h2>
                        <p>${keyword}の基本的な概念について説明します。まず理解しておくべき重要なポイントを整理しましょう。</p>
                        
                        <h2>実践的なテクニック</h2>
                        <p>実際の制作現場で使える具体的なテクニックをご紹介します。これらの方法を活用することで、より効率的な作業が可能になります。</p>
                        
                        <h2>まとめ</h2>
                        <p>${keyword}について解説してきました。今回ご紹介した内容を参考に、ぜひ実際の制作に活用してください。</p>
                    `,
                    meta_description: `${keyword}について${options.targetAudience}向けに詳しく解説。実践的なテクニックと具体例を交えてわかりやすくお伝えします。`,
                    keywords: [keyword, '映像制作', '技術情報', 'スタジオQ'],
                    seo_score: 85,
                    category: options.category,
                    author: options.author,
                    date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
                    image: 'slide1.jpg'
                });
            }, 2000);
        });
    }

    optimizeContent(content) {
        const baseUrl = 'https://studioq.jp';
        
        content.slug = this.generateSlug(content.title);
        content.structured_data = this.generateStructuredData(content, baseUrl);
        
        return content;
    }

    generateSlug(title) {
        const date = new Date().toISOString().split('T')[0];
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `${date}-${randomStr}`;
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
                "name": "スタジオQ",
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

    showLoadingModal() {
        const modal = document.getElementById('loading-modal');
        if (modal) {
            modal.classList.add('active');
            this.updateProgress(0, 'OpenAI APIに接続中...');
        }
    }

    hideLoadingModal() {
        const modal = document.getElementById('loading-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    updateProgress(percentage, message) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = message;
        }
    }

    navigateToPreview() {
        sessionStorage.setItem('blogGeneratorData', JSON.stringify({
            formData: this.formData,
            generatedContent: this.generatedContent,
            uploadedImages: this.uploadedImages
        }));
        
        window.location.href = 'preview.html';
    }

    initializePreviewPage() {
        const savedData = sessionStorage.getItem('blogGeneratorData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.formData = data.formData;
            this.generatedContent = data.generatedContent;
            this.uploadedImages = data.uploadedImages;
            
            this.populatePreviewForm();
            this.initializeQuillEditors();
            this.displayUploadedImages();
        }
    }

    populatePreviewForm() {
        if (!this.generatedContent) return;

        document.getElementById('preview-title').value = this.generatedContent.title;
        document.getElementById('preview-meta-description').value = this.generatedContent.meta_description;
        document.getElementById('preview-json-ld').value = JSON.stringify(this.generatedContent.structured_data, null, 2);

        this.updateCharCounter('title-counter', this.generatedContent.title.length);
        this.updateCharCounter('description-counter', this.generatedContent.meta_description.length);
    }

    initializeQuillEditors() {
        if (!window.quillManager || !this.generatedContent) return;

        const sections = window.quillManager.parseContentToSections(this.generatedContent.content);

        for (let i = 1; i <= 4; i++) {
            const section = sections[i - 1] || { heading: `セクション ${i}`, content: '' };
            
            const headingElement = document.getElementById(`heading-${i}`);
            if (headingElement) {
                headingElement.textContent = section.heading;
            }
            
            window.quillManager.initializeEditor(`editor-${i}`, section.content);
        }
    }

    displayUploadedImages() {
        const imagesContainer = document.getElementById('uploaded-images');
        const imagesSection = document.getElementById('images-section');
        
        if (!imagesContainer || !this.uploadedImages.length) {
            if (imagesSection) {
                imagesSection.style.display = 'none';
            }
            return;
        }

        imagesContainer.innerHTML = '';
        
        this.uploadedImages.forEach((image, index) => {
            if (image) {
                const imageItem = document.createElement('div');
                imageItem.className = 'uploaded-image-item';
                imageItem.innerHTML = `
                    <img src="${image.dataUrl}" alt="${image.name}">
                    <div class="image-info">
                        <div class="image-name">${image.name}</div>
                        <div class="image-actions">
                            <button type="button" class="btn btn-secondary" onclick="blogGenerator.removeUploadedImage(${index})">
                                <i class="fas fa-trash"></i>
                                削除
                            </button>
                        </div>
                    </div>
                `;
                imagesContainer.appendChild(imageItem);
            }
        });
    }

    removeUploadedImage(index) {
        this.uploadedImages[index] = null;
        this.displayUploadedImages();
    }

    validateJson() {
        const jsonTextarea = document.getElementById('preview-json-ld');
        try {
            JSON.parse(jsonTextarea.value);
            alert('JSON形式は正しいです。');
        } catch (error) {
            alert('JSON形式にエラーがあります: ' + error.message);
        }
    }

    formatJson() {
        const jsonTextarea = document.getElementById('preview-json-ld');
        try {
            const parsed = JSON.parse(jsonTextarea.value);
            jsonTextarea.value = JSON.stringify(parsed, null, 2);
        } catch (error) {
            alert('JSON形式にエラーがあります: ' + error.message);
        }
    }

    handlePreviewSubmit(event) {
        event.preventDefault();
        this.showPublishModal();
    }

    bindPublishEvents() {
        const publishModal = document.getElementById('publish-modal');
        const successModal = document.getElementById('success-modal');
        const cancelPublish = document.getElementById('cancel-publish');
        const confirmPublish = document.getElementById('confirm-publish');
        const closeSuccess = document.getElementById('close-success');
        const copyUrl = document.getElementById('copy-url');

        if (cancelPublish) {
            cancelPublish.addEventListener('click', () => {
                publishModal.classList.remove('active');
            });
        }

        if (confirmPublish) {
            confirmPublish.addEventListener('click', () => this.publishArticle());
        }

        if (closeSuccess) {
            closeSuccess.addEventListener('click', () => {
                successModal.classList.remove('active');
                window.location.href = '../blog.html';
            });
        }

        if (copyUrl) {
            copyUrl.addEventListener('click', () => this.copyPublishedUrl());
        }

        const shareTwitter = document.getElementById('share-twitter');
        const shareFacebook = document.getElementById('share-facebook');
        const shareLinkedin = document.getElementById('share-linkedin');

        if (shareTwitter) {
            shareTwitter.addEventListener('click', () => this.shareOnTwitter());
        }

        if (shareFacebook) {
            shareFacebook.addEventListener('click', () => this.shareOnFacebook());
        }

        if (shareLinkedin) {
            shareLinkedin.addEventListener('click', () => this.shareOnLinkedin());
        }
    }

    showPublishModal() {
        const modal = document.getElementById('publish-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    async publishArticle() {
        const publishModal = document.getElementById('publish-modal');
        publishModal.classList.remove('active');

        try {
            const finalData = this.collectFinalData();
            
            const publishedUrl = await this.saveArticle(finalData);
            
            this.showSuccessModal(publishedUrl);
            
        } catch (error) {
            console.error('公開エラー:', error);
            alert('記事の公開中にエラーが発生しました。もう一度お試しください。');
        }
    }

    collectFinalData() {
        const title = document.getElementById('preview-title').value;
        const metaDescription = document.getElementById('preview-meta-description').value;
        const jsonLd = document.getElementById('preview-json-ld').value;

        const content = window.quillManager ? window.quillManager.generateContentFromSections() : this.generatedContent.content;

        return {
            ...this.generatedContent,
            title: title,
            meta_description: metaDescription,
            content: content,
            structured_data: JSON.parse(jsonLd),
            images: this.uploadedImages.filter(img => img !== null)
        };
    }

    async saveArticle(articleData) {
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const baseUrl = 'https://studioq.jp';
                const publishedUrl = `${baseUrl}/blog/${articleData.slug}.html`;
                resolve(publishedUrl);
            }, 1000);
        });
    }

    showSuccessModal(publishedUrl) {
        const modal = document.getElementById('success-modal');
        const urlInput = document.getElementById('published-url');
        
        if (modal && urlInput) {
            urlInput.value = publishedUrl;
            this.publishedUrl = publishedUrl;
            modal.classList.add('active');
        }
    }

    copyPublishedUrl() {
        const urlInput = document.getElementById('published-url');
        if (urlInput) {
            urlInput.select();
            document.execCommand('copy');
            alert('URLをコピーしました！');
        }
    }

    shareOnTwitter() {
        if (this.publishedUrl) {
            const text = encodeURIComponent(`新しいブログ記事を公開しました: ${this.generatedContent.title}`);
            const url = encodeURIComponent(this.publishedUrl);
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        }
    }

    shareOnFacebook() {
        if (this.publishedUrl) {
            const url = encodeURIComponent(this.publishedUrl);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        }
    }

    shareOnLinkedin() {
        if (this.publishedUrl) {
            const url = encodeURIComponent(this.publishedUrl);
            const title = encodeURIComponent(this.generatedContent.title);
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
        }
    }

    goBack() {
        window.location.href = 'index.html';
    }
}

window.blogGenerator = new BlogGeneratorUI();

document.addEventListener('DOMContentLoaded', () => {
    console.log('Blog Generator UI initialized');
});
