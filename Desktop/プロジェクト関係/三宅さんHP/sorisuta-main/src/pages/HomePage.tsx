import React from 'react';
import HeroSlider from '../components/HeroSlider';

const HomePage: React.FC = () => {
  React.useEffect(() => {
    document.title = '大阪 任意後見・遺言信託サポート｜行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '大阪で任意後見・遺言書・遺言信託のご相談は行政書士ソリスタサービスへ。行政書士がわかりやすくサポートします。無料相談受付中。');
    }
  }, []);

  return (
    <>
      <HeroSlider />
      
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-c-primary mb-4">
              安心の任意後見サポート
            </h2>
            <p className="text-lg text-c-text max-w-2xl mx-auto">
              将来への不安を解消し、あなたらしい人生を送るために。
              専門の行政書士が丁寧にサポートいたします。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-c-accent rounded-lg">
              <div className="w-16 h-16 bg-c-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-c-primary mb-2">安心の制度</h3>
              <p className="text-c-text">
                法的に保護された任意後見制度で、将来の財産管理を安心してお任せいただけます。
              </p>
            </div>

            <div className="text-center p-6 bg-c-accent rounded-lg">
              <div className="w-16 h-16 bg-c-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-c-primary mb-2">専門サポート</h3>
              <p className="text-c-text">
                経験豊富な行政書士が、お客様一人ひとりに最適なプランをご提案いたします。
              </p>
            </div>

            <div className="text-center p-6 bg-c-accent rounded-lg">
              <div className="w-16 h-16 bg-c-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-c-primary mb-2">明確な料金</h3>
              <p className="text-c-text">
                わかりやすい料金体系で、追加費用の心配なく安心してご利用いただけます。
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              無料相談のご予約
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
