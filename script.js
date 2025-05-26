// ナビゲーションメニューのトグル機能
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// data-background属性を使用して背景画像を設定する関数
function setBackgroundImages() {
    // スライドの背景画像を設定
    const slidesWithBackground = document.querySelectorAll('.slide[data-background]');
    slidesWithBackground.forEach(slide => {
        const bgUrl = slide.getAttribute('data-background');
        if (bgUrl) {
            slide.style.backgroundImage = `url('${bgUrl}')`;
        }
    });
    
    // ギャラリーサムネイルの背景画像を設定
    const thumbnailsWithBackground = document.querySelectorAll('.gallery-video-thumbnail[data-background]');
    thumbnailsWithBackground.forEach(thumbnail => {
        const bgUrl = thumbnail.getAttribute('data-background');
        if (bgUrl) {
            thumbnail.style.backgroundImage = `url('${bgUrl}')`;
        }
    });
}

// DOM読み込み後に背景画像を設定
document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImages();
});

// スクロール時のヘッダーの背景色変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ヒーローセクションのスライドショー機能
document.addEventListener('DOMContentLoaded', () => {
    // グローバル変数と要素の取得
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const videoSlide = document.querySelector('.video-slide');
    const heroVideo = document.getElementById('heroVideo');
    
    // 状態管理用の変数
    let currentSlide = 0;
    let slideInterval = null;
    let videoTimer = null;
    let pauseTimer = null;
    let isSlideShowRunning = false;
    let isVideoPlaying = false;
    
    // スライドショーを開始する関数
    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        isSlideShowRunning = true;
        
        slideInterval = setInterval(() => {
            // 動画スライドがアクティブな場合はスキップ
            if (isVideoSlideActive()) {
                return;
            }
            goToNextSlide();
        }, 4000);
        
        console.log('スライドショー開始');
    }
    
    // スライドショーを停止する関数
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        isSlideShowRunning = false;
        console.log('スライドショー停止');
    }
    
    // 動画スライドがアクティブかどうか確認する関数
    function isVideoSlideActive() {
        return videoSlide && videoSlide.classList.contains('active');
    }
    
    // 指定したスライドに移動する関数
    function goToSlide(index) {
        // 全てのスライドからactiveクラスを削除
        slides.forEach(slide => slide.classList.remove('active'));
        
        // 指定されたスライドをアクティブに
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        
        // 動画スライドがアクティブになった場合の処理
        if (isVideoSlideActive()) {
            handleVideoSlideActive();
        }
    }
    
    // 次のスライドに移動する関数
    function goToNextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    // 前のスライドに移動する関数
    function goToPrevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    // 動画スライドがアクティブになったときの処理
    function handleVideoSlideActive() {
        console.log('動画スライドがアクティブになりました');
        // スライドショーを一時停止
        const wasRunning = isSlideShowRunning;
        stopSlideshow();
        
        // 既存のタイマーをクリア
        clearAllTimers();
        
        // 動画を最初から再生
        if (heroVideo) {
            console.log('動画再生を開始します');
            heroVideo.currentTime = 0;
            
            // 動画の読み込みを確認
            const playPromise = heroVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 再生成功
                    isVideoPlaying = true;
                    console.log('動画再生開始: 8秒後に停止します');
                    
                    // 8秒後に動画を一時停止
                    videoTimer = setTimeout(() => {
                        if (isVideoSlideActive()) {
                            console.log('8秒経過: 動画を一時停止します');
                            heroVideo.pause();
                            isVideoPlaying = false;
                            
                            // 1秒間待機してからスライドショーの最初に戻る
                            console.log('1秒後に最初のスライドに戻ります');
                            pauseTimer = setTimeout(() => {
                                console.log('1秒経過: 最初のスライドに移動します');
                                // 最初のスライドに移動
                                goToSlide(0);
                                
                                // スライドショーを再開
                                if (wasRunning) {
                                    console.log('スライドショーを再開します');
                                    startSlideshow();
                                }
                            }, 1000);
                        }
                    }, 8000);
                }).catch(error => {
                    // 再生失敗
                    console.error('動画再生エラー:', error.message || '不明なエラー');
                    // エラー時は1秒後に次のスライドへ
                    pauseTimer = setTimeout(() => {
                        goToSlide(0);
                        if (wasRunning) {
                            startSlideshow();
                        }
                    }, 1000);
                });
            } else {
                // Promiseをサポートしていないブラウザの場合
                isVideoPlaying = true;
                
                // 8秒後に動画を一時停止
                videoTimer = setTimeout(() => {
                    if (isVideoSlideActive()) {
                        heroVideo.pause();
                        isVideoPlaying = false;
                        
                        // 1秒間待機してからスライドショーの最初に戻る
                        pauseTimer = setTimeout(() => {
                            // 最初のスライドに移動
                            goToSlide(0);
                            
                            // スライドショーを再開
                            if (wasRunning) {
                                startSlideshow();
                            }
                        }, 1000);
                    }
                }, 8000);
            }
        }
    }
    
    // 全てのタイマーをクリアする関数
    function clearAllTimers() {
        if (videoTimer) {
            clearTimeout(videoTimer);
            videoTimer = null;
        }
        
        if (pauseTimer) {
            clearTimeout(pauseTimer);
            pauseTimer = null;
        }
    }
    
    // ナビゲーションボタンのイベントリスナーを設定
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            goToPrevSlide();
            if (!isVideoSlideActive()) {
                stopSlideshow();
                startSlideshow();
            }
        });
        
        nextButton.addEventListener('click', () => {
            goToNextSlide();
            if (!isVideoSlideActive()) {
                stopSlideshow();
                startSlideshow();
            }
        });
    }
    
    // 初期化処理
    if (slides.length > 0) {
        // 最初のスライドをアクティブに
        goToSlide(0);
        
        // スライドショーを開始
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
            // data-video-url属性から動画URLを取得
            const videoUrl = videoThumbnail.getAttribute('data-video-url');
            
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
        console.log('動画ポップアップを作成します。URL:', videoUrl);
        
        // URLが空または無効な場合のエラーハンドリング
        if (!videoUrl) {
            console.error('動画URLが指定されていません');
            alert('動画URLが指定されていないため、再生できません。');
            return;
        }
        
        // URLの基本的な検証
        try {
            // URLが有効かチェック
            new URL(videoUrl);
        } catch (e) {
            console.error('無効なURL形式です:', videoUrl, e);
            alert('無効なURL形式のため、再生できません。');
            return;
        }
        
        // ポップアップオーバーレイを作成
        const overlay = document.createElement('div');
        overlay.className = 'video-popup-overlay';
        
        let videoElement;
        
        // YouTubeリンクかどうかを確認
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            console.log('YouTube動画として処理します');
            // YouTubeの埋め込みリンクに変換
            let youtubeEmbedUrl = videoUrl;
            let videoId = '';
            
            // 通常のYouTubeリンクを埋め込み用に変換
            if (videoUrl.includes('youtube.com/watch')) {
                try {
                    const urlObj = new URL(videoUrl);
                    videoId = urlObj.searchParams.get('v');
                    console.log('YouTube動画ID:', videoId);
                } catch (e) {
                    // URLパースエラーの場合のフォールバック
                    console.warn('YouTube URLのパースに失敗しました。正規表現で抽出を試みます:', e);
                    const match = videoUrl.match(/[?&]v=([^&]+)/);
                    videoId = match ? match[1] : '';
                    console.log('正規表現で抽出したYouTube動画ID:', videoId);
                }
            } else if (videoUrl.includes('youtu.be')) {
                // 短縮URLの場合
                videoId = videoUrl.split('/').pop().split('?')[0];
                console.log('短縮URLから抽出したYouTube動画ID:', videoId);
            }
            
            // 有効なビデオIDがある場合は埋め込みURLを生成
            if (videoId) {
                youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                console.log('YouTube埋め込みURL:', youtubeEmbedUrl);
                
                // iframeを作成
                videoElement = document.createElement('iframe');
                videoElement.setAttribute('src', youtubeEmbedUrl);
                videoElement.setAttribute('width', '100%');
                videoElement.setAttribute('height', '100%');
                videoElement.setAttribute('frameborder', '0');
                videoElement.setAttribute('allowfullscreen', 'true');
                videoElement.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                videoElement.className = 'popup-video youtube-video';
                
                // スタイルを直接設定して大きく表示
                videoElement.style.width = '90vw';
                videoElement.style.height = '80vh';
                videoElement.style.minHeight = '600px';
                videoElement.style.maxWidth = '1600px';
            } else {
                // ビデオIDが取得できない場合はエラーメッセージを表示
                console.error('YouTube動画IDを取得できませんでした:', videoUrl);
                videoElement = document.createElement('div');
                videoElement.textContent = 'YouTube動画IDを取得できませんでした。URLを確認してください。';
                videoElement.className = 'popup-video-error';
            }
        } else {
            console.log('通常の動画ファイルとして処理します');
            // 動画URLの検証
            if (!videoUrl.match(/\.(mp4|webm|ogg)($|\?)/i)) {
                console.warn('URLが標準的な動画形式ではありません:', videoUrl);
            }
            
            // 日本語ファイル名の処理
            let processedUrl = videoUrl;
            try {
                // URLが既にエンコードされているか確認
                const decodedUrl = decodeURIComponent(videoUrl);
                if (decodedUrl === videoUrl && videoUrl.match(/[^\x00-\x7F]/)) {
                    // 非ASCII文字を含み、まだエンコードされていない場合はエンコード
                    processedUrl = encodeURI(videoUrl);
                    console.log('URLをエンコードしました:', processedUrl);
                }
            } catch (e) {
                console.error('URL処理エラー:', e);
            }
            
            // 通常の動画ファイルの場合
            videoElement = document.createElement('video');
            
            // キャッシュバスターを追加（クエリパラメータがすでにある場合は&で追加）
            const cacheBuster = processedUrl.includes('?') ? `&t=${new Date().getTime()}` : `?t=${new Date().getTime()}`;
            const videoUrlWithCacheBuster = processedUrl + cacheBuster;
            console.log('キャッシュバスター付きURL:', videoUrlWithCacheBuster);
            
            // エラーハンドリングを追加
            videoElement.onerror = function(e) {
                // エラーコードに基づいたメッセージを生成
                let errorMessage = '動画の読み込みに失敗しました。';
                if (videoElement.error) {
                    const errorCode = videoElement.error.code;
                    switch(errorCode) {
                        case 1:
                            errorMessage += 'メディアの取得が中断されました。';
                            break;
                        case 2:
                            errorMessage += 'ネットワークエラーが発生しました。';
                            break;
                        case 3:
                            errorMessage += 'デコードエラーが発生しました。';
                            break;
                        case 4:
                            errorMessage += 'ファイル形式がサポートされていないか、見つかりません。';
                            break;
                    }
                    console.error('動画再生エラー:', errorMessage, videoElement.error);
                } else {
                    console.error('動画再生エラー: 詳細不明', e);
                }
                
                // エラーメッセージを表示
                const errorMsg = document.createElement('div');
                errorMsg.className = 'video-error-message';
                errorMsg.textContent = errorMessage;
                errorMsg.style.color = 'white';
                errorMsg.style.padding = '20px';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.backgroundColor = 'rgba(0,0,0,0.7)';
                if (videoElement.parentNode) {
                    videoElement.parentNode.appendChild(errorMsg);
                }
            };
            
            // source要素を使用して動画を読み込む
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', videoUrlWithCacheBuster);
            sourceElement.setAttribute('type', 'video/mp4');
            videoElement.appendChild(sourceElement);
            
            // WebM形式のソースも追加（可能であれば）
            if (processedUrl.toLowerCase().endsWith('.mp4')) {
                const webmUrl = processedUrl.replace(/\.mp4$/i, '.webm') + cacheBuster;
                const webmSource = document.createElement('source');
                webmSource.setAttribute('src', webmUrl);
                webmSource.setAttribute('type', 'video/webm');
                videoElement.appendChild(webmSource);
                console.log('WebMソースも追加しました:', webmUrl);
            }
            
            videoElement.setAttribute('controls', 'true');
            videoElement.setAttribute('autoplay', 'true');
            videoElement.setAttribute('playsinline', 'true'); // iOSでの再生をサポート
            videoElement.className = 'popup-video';
        }
        
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

// ヒーロービデオの制御は新しいスライドショー制御に統合されました