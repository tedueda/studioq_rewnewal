import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, Phone } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      slug: 'miyakojima',
      name: 'G・MOTO都島本通り',
      type: 'リハビリ特化型デイサービス',
      address: '大阪市都島区本通4-15-8',
      phone: '06-1234-5678',
      capacity: '定員25名',
      hours: '9:00〜16:00',
      image: 'https://images.pexels.com/photos/6111694/pexels-photo-6111694.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: ['理学療法士常駐', '個別リハビリ', '送迎サービス']
    },
    {
      slug: 'hirakata',
      name: 'G・MOTO枚方',
      type: 'リハビリ特化型デイサービス',
      address: '枚方市○○町1-2-3',
      phone: '072-123-4567',
      capacity: '定員20名',
      hours: '9:00〜16:00',
      image: 'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: ['作業療法士常駐', '集団リハビリ', '入浴サービス']
    },
    {
      slug: 'tondabayashi',
      name: 'G・MOTO富田林',
      type: 'リハビリ特化型デイサービス',
      address: '富田林市○○町4-5-6',
      phone: '0721-123-4567',
      capacity: '定員18名',
      hours: '9:00〜16:00',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: ['言語聴覚士常駐', '口腔ケア', '栄養指導']
    },
    {
      slug: 'gofuku',
      name: 'リハビス呉服',
      type: '介護予防フィットネス',
      address: '大阪市○○区呉服町7-8-9',
      phone: '06-2345-6789',
      capacity: '定員15名',
      hours: '10:00〜15:00',
      image: 'https://images.pexels.com/photos/6111477/pexels-photo-6111477.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: ['認知症予防', 'グループ運動', '脳トレーニング']
    },
    {
      slug: 'ikeda',
      name: 'ケアプラン池田',
      type: 'ケアプランセンター',
      address: '池田市○○町10-11-12',
      phone: '072-234-5678',
      capacity: 'ケアマネ5名',
      hours: '9:00〜18:00',
      image: 'https://images.pexels.com/photos/8865994/pexels-photo-8865994.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: ['個別相談', 'サービス調整', '24時間対応']
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
                      <span className="text-sm">{facility.hours}</span>
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
                    <Link
                      to={`/facilities/${facility.slug}`}
                      className="flex-1 text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                    >
                      詳細を見る
                    </Link>
                    <a
                      href={`tel:${facility.phone}`}
                      className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                      電話する
                    </a>
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