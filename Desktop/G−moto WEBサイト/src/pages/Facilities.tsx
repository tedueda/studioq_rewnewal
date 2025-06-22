import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, Phone } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      slug: 'miyakojima',
      name: 'リハプライド GMOTO都島本通り',
      type: 'リハビリ特化型デイサービス',
      address: '大阪市都島区都島本通5-15-16',
      phone: '06-6922-6030',
      capacity: '午前15名・午後15名',
      hours: `【午前】 9：00～12：15\n【午後】13：30～16：45\n月から金\n12/30～1/3を除く`,
      image: '/images/store/miyakojima3.jpg',
      features: [
  '座ってできるリハビリ専用マシンを使い、車椅子の方も安心して運動可能。見学時にマシン体験ができ、効果の違いを実感できます。見学・送迎無料、スタッフ一同が笑顔でサポートします。'
]
    },
    {
      slug: 'hirakata',
      name: 'リハプライド 枚方',
      type: 'リハビリ特化型デイサービス',
      address: '大阪府枚方市田口3-4-1',
      phone: '072-805-5888',
      capacity: '午前18名・午後18名',
      hours: `営業時間\n毎週：月曜日～金曜日　土曜は午前のみ営業\n1単位目：午前：　９：００ ～ １２：１５\n2単位目：午後：１３：３０ ～ １６：４５`,
      image: '/images/store/hirakata.jpg',
      features: ['作業療法士常駐', '集団リハビリ', '入浴サービス']
    },
    {
      slug: 'tondabayashi',
      name: 'リハプライド 富田林',
      type: 'リハビリ特化型デイサービス',
      address: '大阪府富田林市宮町2-9-49',
      phone: '0721-23-8822',
      capacity: '午前18名・午後18名',
      hours: `営業時間\n月曜日～土曜日（祝日含む）\n12/31～1/3を除く\n\n【半日型】\n9：00～12：15　　\n13：30～16：45\n\n【1日型】\n9：30～16：45`,
      image: '/images/store/tondabayashi.jpg',
      features: [
  '座ってできるリハビリ専用マシンを用意し、車椅子の方も安心して運動可能。見学・送迎無料で、スタッフが笑顔でサポートします。'
]
    },
    {
      slug: 'gofuku',
      name: 'リハビス呉服',
      type: 'リハビリ特化型デイサービス',
      address: '大阪府池田市室町７−３',
      phone: '072-752-8133',
      capacity: '定員15名',
      hours: '平日：09時00分〜17時00分\n土曜：09時00分〜17時00分\n日曜：定休日\n定休日他：12/29〜1/3',
      image: '/images/store/rihabisu_ikeda.webp',
      features: ['歩行練習やマシントレーニング、国家資格者による施術も受けられます']
    },
    {
      slug: 'ikeda',
      name: 'じもとケアプランセンター池田',
      type: 'ケアプランセンター',
      address: '大阪府池田市室町7-3 リハビス呉服2階',
      phone: '072-752-8133',
      capacity: 'ケアマネ数：常勤1名',
      hours: `営業日：月～金\n営業時間：9:00～17:00 \n定休日：土日祝、お盆、年末年始`,
      image: '/images/store/keaplan_center.jpg',
      features: [
  '利用者の心身状態や環境に合わせたケアプランを作成し、多様な事業者との連携を図ります。'
]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">施設案内</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              大阪エリア5拠点で<br />
              多様なサービスを提供しています
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div key={facility.slug} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {facility.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{facility.name}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{facility.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{facility.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{facility.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm whitespace-pre-line">{facility.hours}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">特徴</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-accent text-primary px-2 py-1 rounded text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {facility.slug === 'miyakojima' ? (
                      <a
                        href="https://www.rehapride.co.jp/gmmiyako/"
                        className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        詳細を見る
                      </a>
                    ) : facility.slug === 'hirakata' ? (
                      <a
                        href="https://www.rehapride.co.jp/hirakata/"
                        className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        詳細を見る
                      </a>
                    ) : facility.slug === 'gofuku' ? (
                      <button
                        className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
                        disabled
                      >
                        詳細を見る
                      </button>
                    ) : facility.slug === 'ikeda' ? (
                      <button
                        className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
                        disabled
                      >
                        詳細を見る
                      </button>
                    ) : (
                      <a
                        href="https://www.rehapride.co.jp/tondabayashi/"
                        className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        詳細を見る
                      </a>
                    )}
                    {facility.slug === 'miyakojima' ? (
                      <a
                        href="tel:06-6922-6030"
                        className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        電話する
                      </a>
                    ) : facility.slug === 'hirakata' ? (
                      <a
                        href="tel:072-805-5888"
                        className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        電話する
                      </a>
                    ) : facility.slug === 'gofuku' ? (
                      <a
                        href="tel:072-752-8133"
                        className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        電話する
                      </a>
                    ) : facility.slug === 'ikeda' ? (
                      <a
                        href="tel:072-752-8133"
                        className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        電話する
                      </a>
                    ) : (
                      <a
                        href={`tel:${facility.phone}`}
                        className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        電話する
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">サービス提供地域</h2>
            <p className="text-lg text-gray-600">
              以下の地域にお住まいの方にサービスを提供しています
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-soft p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">大阪市内</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 都島区</li>
                  <li>• 北区</li>
                  <li>• 福島区</li>
                  <li>• 中央区</li>
                  <li>• 東淀川区</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">北河内地域</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 枚方市</li>
                  <li>• 寝屋川市</li>
                  <li>• 交野市</li>
                  <li>• 四条畷市</li>
                  <li>• 大東市</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">南河内地域</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 富田林市</li>
                  <li>• 河内長野市</li>
                  <li>• 松原市</li>
                  <li>• 羽曳野市</li>
                  <li>• 藤井寺市</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-4 bg-accent rounded-lg">
              <p className="text-primary font-medium text-center">
                その他の地域についても対応可能な場合がございます。お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            施設見学をご希望の方へ
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            実際の施設をご覧いただき、サービス内容について詳しくご説明いたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              見学予約フォーム
            </Link>
            <a
              href="tel:06-1234-5678"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              電話で予約: 06-1234-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;