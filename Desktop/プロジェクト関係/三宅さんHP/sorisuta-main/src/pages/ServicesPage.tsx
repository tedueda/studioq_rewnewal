import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const IconScroll: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 4h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6" />
    <path d="M7 4h6a2 2 0 0 1 2 2v14H9a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2z" />
    <path d="M7 17a2 2 0 0 0 2 2" />
  </svg>
);

const ServicesPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '任意後見人の主なサービス - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '任意後見人の主なサービス内容をご紹介。貴重品管理、収入支出管理、生活・介護契約サポート、遺言信託の文書作成サービスまで幅広く対応。');
    }
  }, []);


  return (
    <>
      <Breadcrumb items={[{ label: 'サービス内容' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          遺言書の信託サービス
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="mb-8 grid md:grid-cols-2 gap-6 items-start">
            <div>
              <img
                src="/assets/img/hero02.jpg"
                alt="サービスの概要画像"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-lg text-c-text leading-relaxed">
                任意後見人は、ご本人が将来に備えて安心できるよう、専門家や金融機関と連携しながら遺言信託の文書作成を支援します。これにより、財産の承継方法を明確にし、相続時の争いや混乱を未然に防ぎます。
              </p>
            </div>
          </div>


          {/* 遺言信託の文書作成サービス特集 */}
          <div id="will-trust" className="bg-c-accent rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <IconScroll className="w-8 h-8 text-c-cta mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-c-primary">
                遺言信託の文書作成サービス
              </h2>
            </div>
            
            

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-c-primary mb-4 flex items-center">
                  <span className="bg-c-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  ご本人の意思確認と資産整理
                </h3>
                <p className="text-c-text leading-relaxed">
                  面談で承継希望（相続人・受遺者・寄付先）をヒアリング。資産（預貯金・不動産・有価証券等）をリスト化し、整理いたします。
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-c-primary mb-4 flex items-center">
                  <span className="bg-c-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  遺言内容の設計と法的有効性
                </h3>
                <p className="text-c-text leading-relaxed">
                  弁護士・司法書士と連携し、自筆証書遺言／公正証書遺言の形式を選択。遺留分・税務面を考慮して分割方法を具体化します。
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-c-primary mb-4 flex items-center">
                  <span className="bg-c-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  信託銀行等との連携
                </h3>
                <p className="text-c-text leading-relaxed">
                  保管・執行の契約を整備し、執行時の手順・必要書類・期限を明確化。信頼できる金融機関との連携体制を構築します。
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-c-primary mb-4 flex items-center">
                  <span className="bg-c-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  定期見直し
                </h3>
                <p className="text-c-text leading-relaxed">
                  家族構成・資産・法改正の変化に応じて更新。最新の意思反映を担保し、常に最適な内容を維持します。
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-c-primary mb-4 flex items-center">
                  <span className="bg-c-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  発生時のスムーズな執行支援
                </h3>
                <p className="text-c-text leading-relaxed">
                  遺言執行者や信託銀行と連携し、名義変更・分配を迅速実施。相続トラブル防止のため説明・合意形成も支援いたします。
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              サービス内容についてご相談
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;