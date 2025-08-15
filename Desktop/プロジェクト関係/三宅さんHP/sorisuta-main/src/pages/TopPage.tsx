import React from 'react';
import HeroSlider from '../components/HeroSlider';

// Inline SVG Icon components
const IconFileText: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const IconUsers: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconShield: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconHeart: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const TopPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '大阪 任意後見・遺言信託サポート｜行政書士ソリスタサービス';

    // Add structured data
    // const structuredData = {
    //   "@context": "https://schema.org",
    //   "@type": "LocalBusiness",
    //   "name": "行政書士ソリスタサービス",
    //   "description": "大阪で任意後見・遺言書・遺言信託のご相談は行政書士ソリスタサービスへ。行政書士がわかりやすくサポートします。無料相談受付中。",
    //   "url": "https://solista-service.example.com/",
    // };

    // const script = document.createElement('script');
    // script.type = 'application/ld+json';
    // script.textContent = JSON.stringify(structuredData);
    // document.head.appendChild(script);

    // return () => {
    //   document.head.removeChild(script);
    // };
  }, []);

  return (
    <>
      {/* <HeroSlider /> */}
      
      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-c-primary mb-4">
            将来に備える"今"の一歩
          </h2>
          <p className="text-lg mb-8 text-c-text leading-relaxed">
            行政書士がわかりやすく伴走します。まずは無料相談から始めませんか？
          </p>
          
          {/* Added image at the bottom of this section as requested */}
          <div className="mt-10">
            <img
              src="/assets/img/kouken100.jpg"
              alt="任意後見・遺言信託の比較図"
              className="mx-auto max-w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* New Info Section under the image */}
      <section className="py-12 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">① 見守り契約とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                電話や訪問で、定期的に心身の状態や生活状況を確認する。緊急時対応の窓口となる。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">② 財産管理等委任契約とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                病気・怪我での入院・在宅療養や高齢で銀行等の手続きができなくなった場合に通帳などを預かり入出金の管理を代わりに行う。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">③ 任意後見契約とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                万が一認知症になった時に財産管理や身上監護をしてくれる後見人をあらかじめ決めておく。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">④ 遺言書作成とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                自分の財産を「誰に・どこに・どのくらい」分けるのかを意思表示。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">⑤ 死後事務委任契約とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                自身が亡くなった後の葬儀・納骨・遺品整理など、やって欲しい事を決めて必要な手続きについてあらかじめ委任しておく。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-c-primary mb-2">⑥ 遺言執行とは・・・</h3>
              <p className="text-c-text leading-relaxed">
                遺言で決めたことを実行する人をあらかじめ決めて、滞りなく進めて遺言内容を達成する。
              </p>
            </div>
            <p className="text-c-text leading-relaxed mt-6">
              ①～⑥の事柄について、すべてご説明をお聞きいただいて、ご自身にとって必要なまのを選択することができます。
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-c-bg">
        <div className="max-w-container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-c-primary mb-12">
            任意後見・遺言信託をわかりやすくサポート
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-c-primary mb-4">
                <IconFileText className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">任意後見人制度とは？</h3>
              <p className="text-sm mb-4 text-c-text leading-relaxed">
                将来の判断能力低下に備え、信頼できる人へ生活・財産管理を任せる契約制度の基礎知識
              </p>
              <a href="/about" className="text-c-primary font-medium flex items-center hover:underline">
                詳しく見る <IconArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Scenes */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-c-primary mb-4">
                <IconUsers className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">困ることと解決</h3>
              <p className="text-sm mb-4 text-c-text leading-relaxed">
                認知症などで困ることと、任意後見で解決できることを比較してご説明
              </p>
              <a href="/scenes" className="text-c-primary font-medium flex items-center hover:underline">
                詳しく見る <IconArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-c-primary mb-4">
                <IconShield className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">遺言信託サービス</h3>
              <p className="text-sm mb-4 text-c-text leading-relaxed">
                専門家や金融機関と連携しながら遺言信託の文書作成を支援します。
              </p>
              <a href="/services" className="text-c-primary font-medium flex items-center hover:underline">
                詳しく見る <IconArrowRight className="w-4 h-4 ml-1" />
              </a>
              
            </div>

            {/* Flow */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-c-primary mb-4">
                <IconClock className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">ご利用の流れ</h3>
              <p className="text-sm mb-4 text-c-text leading-relaxed">
                相談から契約、監督人選任、後見開始まで、わかりやすい流れをご説明
              </p>
              <a href="/flow" className="text-c-primary font-medium flex items-center hover:underline">
                詳しく見る <IconArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-c-primary mb-12">
            選ばれる理由
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-c-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IconCheckCircle className="w-8 h-8 text-c-cta" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">わかりやすい説明</h3>
              <p className="text-c-text leading-relaxed">
                複雑な制度もわかりやすく丁寧にご説明します。疑問点はお気軽にお尋ねください。
              </p>
            </div>

            <div className="text-center">
              <div className="bg-c-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IconHeart className="w-8 h-8 text-c-cta" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">親身なサポート</h3>
              <p className="text-c-text leading-relaxed">
                お客様一人ひとりの状況に合わせて、最適なプランをご提案いたします。
              </p>
            </div>

            <div className="text-center">
              <div className="bg-c-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IconUsers className="w-8 h-8 text-c-cta" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-c-text">大阪全域対応</h3>
              <p className="text-c-text leading-relaxed">
                大阪府内全域で対応可能。お客様のご都合に合わせて出張相談も承ります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-c-primary text-white">
        <div className="max-w-container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            まずは無料相談から
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            お気軽にご連絡ください。あなたの将来の安心をサポートします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              無料相談のお申し込み
            </a>
            <a
              href="tel:072-813-8548"
              className="bg-white text-c-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              072-813-8548
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopPage;