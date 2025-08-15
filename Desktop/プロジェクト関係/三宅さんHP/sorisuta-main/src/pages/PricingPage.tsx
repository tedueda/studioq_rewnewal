import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const PricingPage: React.FC = () => {
  React.useEffect(() => {
    document.title = '料金案内（大阪で任意後見・遺言書・遺言信託を依頼する場合） - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '大阪で任意後見・遺言書・遺言信託を依頼する場合の料金案内。基本報酬、実費、目安合計を明確にご提示いたします。');
    }
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: '料金案内' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          料金案内（大阪で任意後見・遺言書・遺言信託を依頼する場合）
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-c-text leading-relaxed mb-8">
            明確で分かりやすい料金体系を心がけています。お客様の状況に応じて個別にお見積もりいたします。
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-c-primary mb-6 border-b border-c-line pb-2">
              基本料金表
            </h2>
            {/* Detailed pricing table inserted from provided attachment. Please verify the figures. */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm md:text-base">
                <caption className="text-left text-gray-600 mb-2">
                  各種契約関係に要する費用（後見人候補者として受任する場合）
                </caption>
                <thead>
                  <tr>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom min-w-[14rem] w-[14rem]">契約名称</th>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom">契約締結時費用<br className="hidden md:block" />（契約書作成・1回限り）</th>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom">判断能力がある間にかかる業務費用（毎月）</th>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom">判断能力がなくなった時の費用（1回限り）</th>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom">判断能力がなくなった間に係る業務費用（毎月）</th>
                    <th className="bg-c-subtle text-c-text p-3 text-left border border-c-line align-bottom">死亡後の費用（1回限り）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">① 見守り契約</td>
                    <td className="p-3 border border-c-line">6万円</td>
                    <td className="p-3 border border-c-line">月額 6千円〜1万円</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">② 財産管理等委任契約</td>
                    <td className="p-3 border border-c-line">12万円 + 公正証書作成実費</td>
                    <td className="p-3 border border-c-line">月額 3万円〜<br /><span className="text-xs text-gray-600">※管理対象財産の額により変動します</span></td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">③ 任意後見契約</td>
                    <td className="p-3 border border-c-line">25万円 + 公正証書作成実費</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line">20万円<br /><span className="text-xs text-gray-600">（任意後見監督人選任申立費用含む）</span></td>
                    <td className="p-3 border border-c-line">月額 3万円〜<br /><span className="text-xs text-gray-600">※管理対象財産の額により変動します</span></td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">④ 遺言書</td>
                    <td className="p-3 border border-c-line">15万円〜 + 公正証書作成実費</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">⑤ 遺言書執行</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line">対象財産のうち相続財産額の3%（最低5万円）<br /><span className="text-xs text-gray-600">※状況により決定</span></td>
                    <td className="p-3 border border-c-line">〜70万円まで</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-c-line min-w-[14rem] w-[14rem]">⑥ 死後事務委任契約</td>
                    <td className="p-3 border border-c-line">12万円〜20万円</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                  <tr className="bg-c-bg">
                    <td className="p-3 border border-c-line font-bold min-w-[14rem] w-[14rem]">概算合計</td>
                    <td className="p-3 border border-c-line">70万円〜 + 公正証書作成実費</td>
                    <td className="p-3 border border-c-line">月 6千円〜</td>
                    <td className="p-3 border border-c-line">20万円</td>
                    <td className="p-3 border border-c-line">月 3万円〜<br /><span className="text-xs text-gray-600">（＋任意後見監督人報酬A相当）</span></td>
                    <td className="p-3 border border-c-line text-center">—</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">※ 契約ごとの費用になりますので、複数後見・遺言の場合は変動します。また、各費用に取得手数料実費及び消費税は含みません。</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">サービス内容</th>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">基本報酬</th>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">実費</th>
                    <th className="bg-c-subtle text-c-text p-4 text-left border border-c-line">目安合計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-c-line">
                      <strong>任意後見契約書作成</strong><br />
                      <span className="text-sm text-gray-600">契約書作成から公証役場手続きまで</span>
                    </td>
                    <td className="p-4 border border-c-line">150,000円</td>
                    <td className="p-4 border border-c-line">
                      公正証書作成手数料<br />
                      約30,000円
                    </td>
                    <td className="p-4 border border-c-line bg-c-accent">
                      <strong>約180,000円</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">
                      <strong>遺言書作成</strong><br />
                      <span className="text-sm text-gray-600">自筆証書遺言・公正証書遺言</span>
                    </td>
                    <td className="p-4 border border-c-line">100,000円〜</td>
                    <td className="p-4 border border-c-line">
                      公正証書の場合<br />
                      約20,000円〜
                    </td>
                    <td className="p-4 border border-c-line bg-c-accent">
                      <strong>約120,000円〜</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">
                      <strong>遺言信託文書作成</strong><br />
                      <span className="text-sm text-gray-600">信託銀行連携・執行支援含む</span>
                    </td>
                    <td className="p-4 border border-c-line">200,000円〜</td>
                    <td className="p-4 border border-c-line">
                      信託銀行手数料<br />
                      別途
                    </td>
                    <td className="p-4 border border-c-line bg-c-accent">
                      <strong>約200,000円〜</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-c-line">
                      <strong>任意後見人報酬</strong><br />
                      <span className="text-sm text-gray-600">後見開始後の月額報酬</span>
                    </td>
                    <td className="p-4 border border-c-line">30,000円/月</td>
                    <td className="p-4 border border-c-line">
                      監督人報酬<br />
                      約20,000円/月
                    </td>
                    <td className="p-4 border border-c-line bg-c-accent">
                      <strong>約50,000円/月</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-c-bg rounded-lg p-6">
              <h3 className="text-xl font-bold text-c-primary mb-4">料金に含まれるもの</h3>
              <ul className="space-y-2 text-c-text">
                <li className="flex items-start">
                  <span className="text-c-cta mr-2">✓</span>
                  初回相談（2時間まで）
                </li>
                <li className="flex items-start">
                  <span className="text-c-cta mr-2">✓</span>
                  契約書・遺言書の作成
                </li>
                <li className="flex items-start">
                  <span className="text-c-cta mr-2">✓</span>
                  公証役場での手続き同席
                </li>
                <li className="flex items-start">
                  <span className="text-c-cta mr-2">✓</span>
                  契約後の定期連絡
                </li>
                <li className="flex items-start">
                  <span className="text-c-cta mr-2">✓</span>
                  専門家との連携調整
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-c-line p-6">
              <h3 className="text-xl font-bold text-c-primary mb-4">追加料金が発生する場合</h3>
              <ul className="space-y-2 text-c-text">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  複雑な財産構成の場合（+50,000円〜）
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  出張相談（交通費実費）
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  緊急対応が必要な場合（+30,000円〜）
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  他士業との連携が必要な場合（各士業への報酬）
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">重要な注意事項</h3>
            <ul className="space-y-3 text-sm text-yellow-800">
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">!</span>
                <span>
                  <strong>個別見積もり：</strong>お客様の状況により料金が変動する場合があります。詳細は面談時にご説明いたします。
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">!</span>
                <span>
                  <strong>実費について：</strong>公証役場手数料、印紙代、交通費等は別途実費をいただきます。
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">!</span>
                <span>
                  <strong>専門職連携：</strong>司法書士、税理士等との連携が必要な場合、各専門家への報酬が別途発生します。
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">!</span>
                <span>
                  <strong>支払方法：</strong>銀行振込、現金払いに対応。分割払いについてはご相談ください。
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-lg text-c-text mb-6">
              お客様に最適なプランをご提案するため、まずは無料相談をご利用ください。
            </p>
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              無料相談・お見積もり依頼
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;