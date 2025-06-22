import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const rehabPrograms = [
  {
    category: '運動器機能向上',
    programs: [
      { name: '筋力トレーニング', description: '個別の筋力レベルに応じた安全で効果的な筋力強化' },
      { name: 'バランス訓練', description: '転倒予防のための動的・静的バランス能力の向上' },
      { name: '歩行訓練', description: '歩行の安定性と持久力の改善を目指した訓練' },
      { name: '関節可動域訓練', description: '関節の柔軟性維持・改善のためのストレッチング' }
    ]
  },
  {
    category: '認知機能向上',
    programs: [
      { name: '認知課題訓練', description: '記憶力・注意力・判断力の維持・向上を図る課題' },
      { name: 'デュアルタスク', description: '運動と認知課題を同時に行う複合的な訓練' },
      { name: '回想法', description: '過去の体験を語り合うことで認知機能を刺激' },
      { name: '脳トレーニング', description: '楽しみながら脳を活性化させるゲーム形式の訓練' }
    ]
  },
  {
    category: '口腔機能向上',
    programs: [
      { name: '口腔体操', description: '口腔周囲筋の筋力向上と機能改善' },
      { name: '嚥下訓練', description: '安全な食事摂取のための嚥下機能の改善' },
      { name: '発声練習', description: '声の出しやすさと明瞭度の向上' },
      { name: '口腔ケア指導', description: '口腔衛生の維持・改善のための指導' }
    ]
  }
];

const RehabPrograms = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">リハビリプログラム</h2>
        <div className="mx-auto max-w-3xl w-full md:w-3/5 px-2 md:px-0">
          <p className="text-lg text-gray-600 text-left">
            専門職による多彩なリハビリプログラムをご用意しています
          </p>
          <p className="text-lg text-gray-600 text-left mt-2">
            リハビリ型デイサービスは本人のやる気を促し、確かな変化・成果を更なる目標につなぐことで、このリハビリ型デイサービスは「本人が行きたい」と望まれるのが大きな特徴です。
          </p>
        </div>
      </div>
      <section className="mt-20 bg-orange-50 rounded-2xl py-12 px-4 md:px-12 shadow">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 border-b-2 border-primary inline-block">リハビリ型デイサービス：半日型の主な流れ</h2>
        <p className="text-gray-700 text-lg mb-8 mt-2">午前の部（9：00〜12：00）の場合</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">1</div>
            <img src="/images/rehabili/reha01.png" alt="利用者お迎え" className="rounded-lg w-full h-64 object-cover mb-2" />
            <div className="text-sm text-gray-700">利用者の皆さんを迎えに行きます</div>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">2</div>
            <img src="/images/rehabili/reha02.png" alt="バイタルチェック" className="rounded-lg w-full h-64 object-cover mb-2" />
            <div className="text-sm text-gray-700">開始前のバイタルチェック<br/>(血圧・脈拍)</div>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">3</div>
            <img src="/images/rehabili/reha03.png" alt="準備運動" className="rounded-lg w-full h-64 object-cover mb-2" />
            <div className="text-sm text-gray-700">トレーニング前の準備運動</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow md:col-span-3">
    <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">4</div>
    <div className="flex flex-row gap-4 w-full mb-2">
      <img src="/images/rehabili/reha04.png" alt="リハビリ運動1" className="rounded-lg object-cover h-64 w-1/3" />
      <img src="/images/rehabili/reha05.png" alt="リハビリ運動2" className="rounded-lg object-cover h-64 w-1/3" />
      <img src="/images/rehabili/reha06.png" alt="リハビリ運動3" className="rounded-lg object-cover h-64 w-1/3" />
    </div>
    <div className="text-sm text-gray-700 text-center">一人ひとりに合わせたプログラムに則り、マシーンを利用したリハビリ運動（随時水分補給・休息）</div>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
    <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">5</div>
    <img src="/images/rehabili/reha07.png" alt="再度バイタルチェック" className="rounded-lg w-full h-64 object-cover mb-2" />
    <div className="text-sm text-gray-700">再度バイタルチェック<br/>(血圧・脈拍)</div>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
    <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">6</div>
    <img src="/images/rehabili/reha08.png" alt="トレーニングの締め" className="rounded-lg w-full h-64 object-cover mb-2" />
    <div className="text-sm text-gray-700">トレーニングの締めは座ったままの太極拳</div>
  </div>
  <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
    <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">7</div>
    <img src="/images/rehabili/reha09.png" alt="お送り" className="rounded-lg w-full h-64 object-cover mb-2" />
    <div className="text-sm text-gray-700">自宅までお送りします</div>
  </div>
</div>

        {/* --- 1日型デイサービスの主な流れセクション --- */}
        <section className="mt-20 bg-orange-50 rounded-2xl py-12 px-4 md:px-12 shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 border-b-2 border-primary inline-block">リハビリ型デイサービス：1日型の主な流れ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* 1 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">1</div>
              <img src="/images/rehabili/reha11.png" alt="利用者お迎え" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">利用者の皆さんを迎えに行きます</div>
            </div>
            {/* 2 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">2</div>
              <img src="/images/rehabili/reha12.png" alt="バイタルチェック" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">開始前のバイタルチェック<br/>(血圧・脈拍)</div>
            </div>
            {/* 3 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">3</div>
              <img src="/images/rehabili/reha13.png" alt="準備運動" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">トレーニング前の準備運動</div>
            </div>
            {/* 4 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">4</div>
              <img src="/images/rehabili/reha14.png" alt="リハビリ運動" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">マシンを利用したリハビリ運動</div>
            </div>
            {/* 5 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">5</div>
              <img src="/images/rehabili/reha15.png" alt="再度バイタルチェック" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">再度バイタルチェック<br/>(血圧・脈拍)</div>
            </div>
            {/* 6 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">6</div>
              <img src="/images/rehabili/reha16.png" alt="口腔体操" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">口腔体操</div>
            </div>
            {/* 7 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">7</div>
              <img src="/images/rehabili/reha17.png" alt="昼食タイム" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">昼食タイム</div>
            </div>
            {/* 8 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">8</div>
              <img src="/images/rehabili/reha18.png" alt="座って大接拳" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">座って大接拳</div>
            </div>
            {/* 9 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">9</div>
              <img src="/images/rehabili/reha19.png" alt="入浴タイム" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">入浴タイム</div>
            </div>
            {/* 10 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">10</div>
              <img src="/images/rehabili/reha20.png" alt="様々なレクリエーション" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">様々なレクリエーション</div>
            </div>
            {/* 11 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">11</div>
              <img src="/images/rehabili/reha21.png" alt="おやつ＆ティータイム" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">おやつを食べながらのティータイム</div>
            </div>
            {/* 12 */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <div className="bg-pink-400 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-2">12</div>
              <img src="/images/rehabili/reha22.png" alt="お送り" className="rounded-lg w-full h-64 object-cover mb-2" />
              <div className="text-sm text-gray-700 text-center">自宅までお送りします</div>
            </div>
          </div>
        </section>

        <div className="mt-12 bg-primary text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">個別プログラムの作成</h3>
          <p className="text-lg mb-6">
            ご利用者様の状態や目標に合わせて、上記のプログラムを組み合わせた
            オーダーメイドのリハビリプログラムを作成いたします。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            プログラムについて相談する
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  </section>
);

export default RehabPrograms;
