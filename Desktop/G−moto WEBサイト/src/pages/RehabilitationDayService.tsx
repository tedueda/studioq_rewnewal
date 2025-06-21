import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Target, ArrowRight, CheckCircle, Clock, Activity, Brain, Zap } from 'lucide-react';
import FacilitySlider from '../components/FacilitySlider';

const RehabilitationDayService = () => {
  const differences = [
    {
      title: '一般的なデイサービス',
      features: [
        '入浴・食事・レクリエーション中心',
        '集団での活動が主体',
        '機能維持が目的',
        '介護職員が中心'
      ],
      color: 'bg-gray-100'
    },
    {
      title: 'リハビリ特化型デイサービス',
      features: [
        '個別機能訓練が中心',
        '一人ひとりに合わせたプログラム',
        '機能改善・向上が目的',
        '専門職（PT・OT・ST）が常駐'
      ],
      color: 'bg-primary'
    }
  ];

  const selfSupportCare = [
    {
      icon: Target,
      title: '個別性の重視',
      description: 'お一人おひとりの状態や目標に合わせたオーダーメイドのケアプランを作成します。'
    },
    {
      icon: Activity,
      title: '機能改善への取り組み',
      description: '現在の機能を維持するだけでなく、積極的な機能改善を目指します。'
    },
    {
      icon: Brain,
      title: '根拠に基づいたケア',
      description: '科学的根拠に基づいた介護手法で、効果的なサポートを提供します。'
    },
    {
      icon: Zap,
      title: '自立への意欲向上',
      description: 'ご利用者様の「できる」を増やし、自立への意欲を高めます。'
    }
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">リハビリ特化型デイサービス</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              専門職による個別機能訓練で<br />
              「昨日より今日、今日より明日」の向上を目指します
            </p>
          </div>
        </div>
      </section>

      {/* What is Rehabilitation Day Service */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">リハビリ特化型デイサービスとは？</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                リハビリ特化型デイサービスは、理学療法士（PT）・作業療法士（OT）・言語聴覚士（ST）などの
                専門職が常駐し、個別機能訓練を中心としたサービスを提供するデイサービスです。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                従来のデイサービスとは異なり、機能の維持だけでなく、積極的な機能改善・向上を目指し、
                ご利用者様の「できること」を増やすことに重点を置いています。
              </p>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="font-bold text-primary mb-3">G・MOTOの特徴</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">専門職による個別評価・プログラム作成</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">最新のリハビリ機器を完備</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">定期的な効果測定と計画見直し</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6111694/pexels-photo-6111694.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="リハビリ特化型デイサービスの様子"
                className="w-full h-96 object-cover rounded-xl shadow-soft-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Differences */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">他のデイサービスとの違い</h2>
            <p className="text-lg text-gray-600">
              従来のデイサービスとリハビリ特化型デイサービスの違いをご紹介します
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differences.map((service, index) => (
              <div key={index} className={`${service.color === 'bg-primary' ? 'bg-primary text-white' : 'bg-white'} rounded-xl p-8 shadow-soft`}>
                <h3 className={`text-xl font-bold mb-6 ${service.color === 'bg-primary' ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${service.color === 'bg-primary' ? 'bg-white' : 'bg-gray-400'}`}></div>
                      <span className={service.color === 'bg-primary' ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-soft">
            <h3 className="text-xl font-bold text-gray-900 mb-4">G・MOTOが選ばれる理由</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">専門性の高さ</h4>
                <p className="text-sm text-gray-600">国家資格を持つ専門職が個別にサポート</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">個別対応</h4>
                <p className="text-sm text-gray-600">一人ひとりの状態に合わせたプログラム</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">継続的支援</h4>
                <p className="text-sm text-gray-600">定期的な評価と計画の見直し</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Support Care */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">自立支援介護とは</h2>
            <p className="text-lg text-gray-600">
              G・MOTOが実践する自立支援介護の考え方をご紹介します
            </p>
          </div>

          <div className="mb-12">
            <div className="bg-gradient-to-r from-primary to-accent text-white p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold mb-4">自立支援介護の理念</h3>
              <p className="text-lg leading-relaxed">
                自立支援介護とは、ご利用者様の残存機能を最大限に活用し、
                「できること」を増やすことで、その人らしい生活の実現を目指す介護の考え方です。
                単に介護を受けるのではなく、ご自身の力で生活できる部分を増やしていくことを重視しています。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selfSupportCare.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-soft">
            <h3 className="text-xl font-bold text-gray-900 mb-6">自立支援介護の効果</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-gray-700">機能改善を実感された方の割合</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">92%</div>
                <p className="text-gray-700">サービス満足度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <p className="text-gray-700">日常生活動作の向上を実感</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rehabilitation Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">リハビリプログラム</h2>
            <p className="text-lg text-gray-600">
              専門職による多彩なリハビリプログラムをご用意しています
            </p>
          </div>

          <div className="space-y-12">
            {rehabPrograms.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-soft">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.programs.map((program, programIndex) => (
                    <div key={programIndex} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <h4 className="font-bold text-gray-900 mb-3">{program.name}</h4>
                      <p className="text-gray-700">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

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
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">リハビリ特化型デイサービス施設</h2>
            <p className="text-lg text-gray-600">
              大阪エリア3拠点でリハビリ特化型デイサービスを提供しています
            </p>
          </div>
          <FacilitySlider />
          <div className="text-center mt-8">
            <Link
              to="/facilities"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              すべての施設を見る
              <ArrowRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            まずは施設見学からはじめませんか？
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            実際のリハビリプログラムをご覧いただき、<br />
            ご利用者様に最適なサービスをご提案いたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              施設見学を予約する
            </Link>
            <a
              href="tel:06-1234-5678"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              電話で相談: 06-1234-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RehabilitationDayService;