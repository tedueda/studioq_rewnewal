import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '大阪の任意後見｜制度の基礎と法定後見との違い - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '任意後見は、将来の判断能力低下に備え、信頼できる人へ生活・財産管理を任せる契約です。大阪エリアでのサポート体制を整えています。');
    }
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: '任意後見人制度とは' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          任意後見人制度とは
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-c-text leading-relaxed mb-8">
            任意後見人制度とは、将来自分の判断力が低下したときに備えて、「この人に自分のことを任せたい」と、あらかじめ信頼できる人を決めておく制度です。
            <br />
            判断力が低下するのは、高齢による認知症や病気、事故など、誰にでも起こり得ることです。そのときに備えて、自分の希望通りに生活や財産管理をしてもらえるように準備するのが「任意後見人制度」です。
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6 border-b border-c-line pb-2">
              法定後見と任意後見の比較
            </h2>
            
            {/* 画像ブロック削除済み */}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">項目</th>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">法定後見</th>
                    <th className="bg-c-accent text-c-text p-4 text-left border border-c-line">任意後見</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-c-subtle text-c-text p-4 border border-c-line font-medium">開始時期</td>
                    <td className="p-4 border border-c-line">判断能力が不十分になってから</td>
                    <td className="bg-c-accent p-4 border border-c-line">判断能力があるうちに準備</td>
                  </tr>
                  <tr>
                    <td className="bg-c-subtle text-c-text p-4 border border-c-line font-medium">後見人の選任</td>
                    <td className="p-4 border border-c-line">家庭裁判所が決定</td>
                    <td className="bg-c-accent p-4 border border-c-line">本人が自由に選択</td>
                  </tr>
                  <tr>
                    <td className="bg-c-subtle text-c-text p-4 border border-c-line font-medium">契約内容の柔軟性</td>
                    <td className="p-4 border border-c-line">法律で定められた範囲</td>
                    <td className="bg-c-accent p-4 border border-c-line">本人の意思で自由に決定</td>
                  </tr>
                  <tr>
                    <td className="bg-c-subtle text-c-text p-4 border border-c-line font-medium">報酬</td>
                    <td className="p-4 border border-c-line">家庭裁判所が決定</td>
                    <td className="bg-c-accent p-4 border border-c-line">当事者間で自由に決定</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-c-bg rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6">任意後見制度の特徴</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-c-text mb-3">メリット</h3>
                <ul className="space-y-2 text-c-text">
                  <li className="flex items-start">
                    <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>信頼できる人を後見人として選べる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>委任内容を自由に決められる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>報酬額を事前に決められる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-c-cta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span>監督人により適正性が確保される</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-c-text mb-3">注意点</h3>
                <ul className="space-y-2 text-c-text">
                  <li className="flex items-start">
                    <span className="bg-c-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                    <span>公正証書での契約が必要</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-c-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                    <span>監督人への報酬も必要</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-c-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">!</span>
                    <span>判断能力があるうちに準備が必要</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              任意後見についてご相談
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;