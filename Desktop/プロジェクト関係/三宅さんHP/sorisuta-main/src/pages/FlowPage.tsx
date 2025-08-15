import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const FlowPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '任意後見のご利用フローチャート - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '任意後見の手続きの流れを詳しくご説明。相談から契約、監督人選任、後見開始まで、わかりやすいフローチャートでご案内します。');
    }
  }, []);

  const steps = [
    {
      step: 1,
      title: '初回相談',
      description: '現在の状況やご要望をお聞きし、任意後見制度について詳しくご説明いたします。',
      duration: '1〜2回'
    },
    {
      step: 2,
      title: '契約内容の検討',
      description: '委任する事務の内容、報酬、その他の条件について具体的に検討・決定します。',
      duration: '2〜3週間'
    },
    {
      step: 3,
      title: '任意後見契約（公正証書作成）',
      description: '公証役場で公正証書による任意後見契約を締結します。',
      duration: '1日'
    },
    {
      step: 4,
      title: '契約後の定期連絡',
      description: '契約者の状況確認のため、定期的に連絡を取り続けます。',
      duration: '継続'
    },
    {
      step: 5,
      title: '判断能力の低下',
      description: '医師の診断等により判断能力の低下が確認された時点で次のステップへ。',
      duration: '-'
    },
    {
      step: 6,
      title: '監督人選任の申立て',
      description: '家庭裁判所に任意後見監督人選任の申立てを行います。',
      duration: '2〜3ヶ月'
    },
    {
      step: 7,
      title: '任意後見開始',
      description: '監督人が選任されると任意後見が開始され、契約内容に基づいて支援を行います。',
      duration: '継続'
    }
  ];

  return (
    <>
      <Breadcrumb items={[{ label: 'ご利用の流れ' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          任意後見のご利用フローチャート
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-c-text leading-relaxed mb-8">
            任意後見制度のご利用から開始まで、段階的なプロセスをわかりやすくご説明いたします。お客様のペースに合わせて進めてまいります。
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6 border-b border-c-line pb-2">
              手続きの流れ
            </h2>
            
            <div className="mb-8">
              <img 
                src="/assets/img/flow_niniko_16x9.png" 
                alt="任意後見の手続きの流れ（相談→契約→監督→開始）"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="bg-c-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-c-bg rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-bold text-c-text">{step.title}</h3>
                        <span className="text-sm text-c-primary bg-white px-3 py-1 rounded-full font-medium mt-2 md:mt-0">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-c-text leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-c-accent rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6">重要なポイント</h2>
            
            <div className="space-y-4 text-c-text">
              <div className="flex items-start">
                <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                <p className="leading-relaxed">
                  <strong>任意後見契約は判断能力があるうちに締結する必要があります。</strong>認知症等の症状が進行してからでは契約できません。
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                <p className="leading-relaxed">
                  <strong>契約から実際の開始まで時間があります。</strong>その間も定期的な連絡を通じて関係性を維持します。
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                <p className="leading-relaxed">
                  <strong>監督人が選任されてから正式に開始となります。</strong>監督人により適正な後見事務が確保されます。
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              手続きについてご相談
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowPage;