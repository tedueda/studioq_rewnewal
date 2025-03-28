// ナビゲーションメニューのトグル機能
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// スクロール時のヘッダーの背景色変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ヒーローセクションのスライドショー機能
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // 自動スライドショーの開始
    function startSlideshow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5秒ごとに次のスライドへ
    }

    // 自動スライドショーの停止
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // 次のスライドへ
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 前のスライドへ
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // イベントリスナーの設定
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow(); // クリック後に自動スライドショーを再開
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow(); // クリック後に自動スライドショーを再開
        });
    }

    // スライドショーの開始
    if (slides.length > 0) {
        startSlideshow();
    }
});

// Aboutセクションのスライドショー
document.addEventListener('DOMContentLoaded', () => {
    const aboutSlides = document.querySelectorAll('.about-slide');
    if (aboutSlides.length > 0) {
        let currentSlide = 0;
        
        // 5秒ごとにスライドを切り替える
        setInterval(() => {
            // 現在のスライドからactiveクラスを削除
            aboutSlides[currentSlide].classList.remove('active');
            
            // 次のスライドに移動（最後のスライドの場合は最初に戻る）
            currentSlide = (currentSlide + 1) % aboutSlides.length;
            
            // 新しいスライドにactiveクラスを追加
            aboutSlides[currentSlide].classList.add('active');
        }, 5000);
    }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // モバイルメニューを閉じる
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// フォーム送信処理（デモ用）
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('お問い合わせありがとうございます。近日中にご連絡いたします。');
        this.reset();
    });
}

// 紹介動画の再生機能
document.addEventListener('DOMContentLoaded', () => {
    const videoThumbnail = document.querySelector('.video-thumbnail');
    const latestVideoThumbnails = document.querySelectorAll('.latest-video-thumbnail');
    const galleryVideoThumbnails = document.querySelectorAll('.gallery-video-thumbnail');
    
    // 紹介動画セクションの動画サムネイル
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', () => {
            // 実際の動画URLを設定
            const videoUrl = "https://studioq.co.jp/wp-content/uploads/2023/10/info_studioq.mp4";
            
            createVideoPopup(videoUrl);
        });
    }
    
    // 最新映像セクションの動画サムネイル
    latestVideoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // data-video-url属性から動画URLを取得
            const videoUrl = thumbnail.getAttribute('data-video-url');
            
            createVideoPopup(videoUrl);
        });
    });
    
    // ギャラリーセクションの動画サムネイル
    galleryVideoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // data-video-url属性から動画URLを取得
            const videoUrl = thumbnail.getAttribute('data-video-url');
            
            createVideoPopup(videoUrl);
        });
    });
    
    // 動画ポップアップを作成する関数
    function createVideoPopup(videoUrl) {
        // ポップアップオーバーレイを作成
        const overlay = document.createElement('div');
        overlay.className = 'video-popup-overlay';
        
        // 動画要素を作成
        const videoElement = document.createElement('video');
        videoElement.setAttribute('src', videoUrl);
        videoElement.setAttribute('controls', 'true');
        videoElement.setAttribute('autoplay', 'true');
        videoElement.className = 'popup-video';
        
        // 閉じるボタンを作成
        const closeButton = document.createElement('button');
        closeButton.className = 'close-popup';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        // 閉じるボタンのクリックイベント
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.removeChild(overlay);
        });
        
        // オーバーレイのクリックイベント（動画の外側をクリックで閉じる）
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // 要素を追加
        overlay.appendChild(videoElement);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);
    }
});

// 画像の遅延読み込み
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
});