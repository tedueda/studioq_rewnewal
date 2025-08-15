import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const ScenesPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '認知症などで困ること＋任意後見で解決できること - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '認知症などで困ることと任意後見で解決できることを比較。お金の管理、医療同意、介護契約、詐欺防止等について詳しくご説明します。');
    }
  }, []);

  const problems = [
    {
      category: 'お金の管理',
      problem: '銀行での手続きができなくなる',
      solution: '後見人が代理で金融機関手続きを実行'
    },
    {
      category: '医療同意',
      problem: '医療行為の同意ができなくなる',
      solution: '医療契約や治療方針の決定をサポート'
    },
    {
      category: '介護契約',
      problem: '介護サービスの契約ができない',
      solution: '適切な介護サービス選択・契約を支援'
    },
    {
      category: '詐欺防止',
      problem: '悪質商法の被害に遭いやすくなる',
      solution: '不適切な契約の取り消しや予防対策'
    },
    {
      category: '不動産管理',
      problem: '不動産の管理や処分ができない',
      solution: '適切な不動産管理・売却手続きを実行'
    },
    {
      category: '行政手続き',
      problem: '年金や保険の手続きが困難',
      solution: '各種行政手続きを代行・サポート'
    }
  ];

  return (
    <>
      <Breadcrumb items={[{ label: '必要になる場面' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          認知症になった場合のサポート
        </h1>
        {/* トップ画像ブロック削除 */}
        
        <div className="prose prose-lg max-w-none">
          <div className="mb-10 grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-lg text-c-text leading-relaxed">
                なぜ必要？
                <br /><br />
                急に認知症になって、判断力が低下すると様々な場面で困ることが生じます。
                <br /><br />
                例えば、
                <br /><br />
                ・銀行の手続き
                <br />
                ・不動産の売却や管理
                <br />
                ・介護サービスの契約
                <br />
                ・医療・入院の手続き
                <br /><br />
                などが、自分一人ではできなくなります。
                <br /><br />
                その時に任意後見人制度を利用して「信頼できる人」にあらかじめお願いしておけば、家族や周囲の負担も減り、自分の意思に沿ったサポートを受けられます。
              </p>
            </div>
            <div>
              <img
                src="/assets/img/koukenn01.png"
                alt="任意後見の説明図"
                className="mx-auto max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6 border-b border-c-line pb-2">
              任意後見人制度で解決できること
            </h2>

            {/* 画像（テーブル上部に配置） */}
            <div className="mb-8 space-y-6">
              <img 
                src="/assets/img/kouken10.jpg" 
                alt="任意後見のサポート例（追加画像）"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            {/* 画像の内容を反映した比較テーブル */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-1/2 bg-c-subtle text-c-text p-4 text-left border border-c-line">困ること</th>
                    <th className="w-1/2 bg-c-accent text-c-text p-4 text-left border border-c-line">任意後見でできること</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-c-line">銀行口座・年金の管理ができない</td>
                    <td className="p-4 border border-c-line">後見人が口座管理・年金手続きを代行</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">公共料金・税金の支払い忘れ</td>
                    <td className="p-4 border border-c-line">料金・税金を期限内に支払い</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">介護サービス・施設入所の契約が難しい</td>
                    <td className="p-4 border border-c-line">介護契約・施設入所を手続き</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">医療行為の同意ができない</td>
                    <td className="p-4 border border-c-line">医療同意や入院手続きを代行</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">詐欺・不要契約のリスクが高い</td>
                    <td className="p-4 border border-c-line">契約内容を確認し、被害を予防</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">不動産の売却・賃貸・判断ができない</td>
                    <td className="p-4 border border-c-line">不動産の売買・賃貸契約を代理</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="hidden">
              {problems.map((item, index) => (
                <div key={index} className="border border-c-line rounded-lg overflow-hidden">
                  <div className="bg-c-subtle p-4">
                    <h3 className="text-lg font-bold text-c-text">{item.category}</h3>
                  </div>
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 bg-red-50 border-r border-c-line">
                      <h4 className="font-bold text-red-600 mb-2">困ること</h4>
                      <p className="text-c-text">{item.problem}</p>
                    </div>
                    <div className="p-6 bg-c-accent">
                      <h4 className="font-bold text-c-cta mb-2">任意後見で解決</h4>
                      <p className="text-c-text">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-c-bg rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6">早期準備の重要性</h2>
            
            <div className="space-y-4 text-c-text leading-relaxed">
              <p>
                任意後見制度は、判断能力があるうちに準備しておく制度です。認知症の症状が進行してからでは利用できません。
              </p>
              <p>
                また、家族だけでは解決が難しい法的な問題も、専門的な知識を持つ後見人が対応することで、スムーズに解決できます。
              </p>
              <p>
                大阪エリアで任意後見をお考えの方は、お早めにご相談ください。一人ひとりの状況に応じた最適なプランをご提案いたします。
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              将来への備えについてご相談
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScenesPage;