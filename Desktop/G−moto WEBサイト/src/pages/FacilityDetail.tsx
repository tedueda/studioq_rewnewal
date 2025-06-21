import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Users, ArrowLeft, X } from 'lucide-react';

const FacilityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const facilityData: { [key: string]: any } = {
    miyakojima: {
      name: 'G・MOTO都島本通り',
      type: 'リハビリ特化型デイサービス',
      address: '〒534-0001 大阪市都島区本通4-15-8',
      phone: '06-1234-5678',
      capacity: '定員25名',
      hours: '月〜土 9:00〜16:00（日祝休み）',
      heroImage: 'https://images.pexels.com/photos/6111694/pexels-photo-6111694.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/6111694/pexels-photo-6111694.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/6111477/pexels-photo-6111477.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      features: [
        { title: '理学療法士常駐', description: '経験豊富な理学療法士が個別リハビリを提供' },
        { title: '最新機器完備', description: '効果的な機能訓練のための最新リハビリ機器' },
        { title: '送迎サービス', description: 'ご自宅までの安全な送迎サービス' }
      ],
      schedule: [
        { time: '9:00', activity: 'お迎え・健康チェック' },
        { time: '9:30', activity: '朝の体操・レクリエーション' },
        { time: '10:30', activity: '個別機能訓練' },
        { time: '12:00', activity: '昼食・休憩' },
        { time: '13:30', activity: '集団リハビリ・口腔体操' },
        { time: '15:00', activity: 'おやつ・入浴' },
        { time: '16:00', activity: 'お送り' }
      ],
      pricing: '要介護1〜5: 1回 700円〜1,200円（1割負担の場合）'
    },
    hirakata: {
      name: 'G・MOTO枚方',
      type: 'リハビリ特化型デイサービス',
      address: '〒573-0000 枚方市○○町1-2-3',
      phone: '072-123-4567',
      capacity: '定員20名',
      hours: '月〜土 9:00〜16:00（日祝休み）',
      heroImage: 'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/6111694/pexels-photo-6111694.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/6111477/pexels-photo-6111477.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      features: [
        { title: '作業療法士常駐', description: '日常生活動作の改善をサポート' },
        { title: '集団リハビリ', description: 'グループでの楽しいリハビリプログラム' },
        { title: '入浴サービス', description: '安全で快適な入浴サポート' }
      ],
      schedule: [
        { time: '9:00', activity: 'お迎え・健康チェック' },
        { time: '9:30', activity: '朝の体操・レクリエーション' },
        { time: '10:30', activity: '集団リハビリ・作業療法' },
        { time: '12:00', activity: '昼食・休憩' },
        { time: '13:30', activity: '個別機能訓練' },
        { time: '15:00', activity: 'おやつ・入浴' },
        { time: '16:00', activity: 'お送り' }
      ],
      pricing: '要介護1〜5: 1回 700円〜1,200円（1割負担の場合）'
    },
    tondabayashi: {
      name: 'G・MOTO富田林',
      type: 'リハビリ特化型デイサービス',
      address: '〒584-0000 富田林市○○町4-5-6',
      phone: '0721-123-4567',
      capacity: '定員18名',
      hours: '月〜土 9:00〜16:00（日祝休み）',
      heroImage: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      features: [
        { title: '言語聴覚士常駐', description: '嚥下機能改善・言語機能向上をサポート' },
        { title: '口腔ケア', description: '専門スタッフによる口腔機能訓練' },
        { title: '栄養指導', description: '管理栄養士による個別栄養指導' }
      ],
      schedule: [
        { time: '9:00', activity: 'お迎え・健康チェック' },
        { time: '9:30', activity: '朝の体操・口腔体操' },
        { time: '10:30', activity: '言語聴覚訓練・嚥下訓練' },
        { time: '12:00', activity: '昼食・栄養指導' },
        { time: '13:30', activity: '個別機能訓練' },
        { time: '15:00', activity: 'おやつ・口腔ケア' },
        { time: '16:00', activity: 'お送り' }
      ],
      pricing: '要介護1〜5: 1回 700円〜1,200円（1割負担の場合）'
    },
    gofuku: {
      name: 'リハビス呉服',
      type: '介護予防フィットネス',
      address: '〒530-0000 大阪市○○区呉服町7-8-9',
      phone: '06-2345-6789',
      capacity: '定員15名',
      hours: '月〜金 10:00〜15:00（土日祝休み）',
      heroImage: 'https://images.pexels.com/photos/6111477/pexels-photo-6111477.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/6111477/pexels-photo-6111477.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      features: [
        { title: '認知症予防', description: '脳トレーニングと運動の組み合わせプログラム' },
        { title: 'グループ運動', description: '楽しく続けられるグループフィットネス' },
        { title: '専門指導', description: '運動指導士による安全なプログラム提供' }
      ],
      schedule: [
        { time: '10:00', activity: '受付・健康チェック' },
        { time: '10:30', activity: 'ウォーミングアップ' },
        { time: '11:00', activity: '有酸素運動・筋力トレーニング' },
        { time: '12:00', activity: '昼食・休憩' },
        { time: '13:00', activity: '脳トレーニング・認知症予防' },
        { time: '14:30', activity: 'クールダウン・ストレッチ' },
        { time: '15:00', activity: '終了' }
      ],
      pricing: '要支援1・2: 1回 300円〜500円（1割負担の場合）'
    },
    ikeda: {
      name: 'ケアプラン池田',
      type: 'ケアプランセンター',
      address: '〒563-0000 池田市○○町10-11-12',
      phone: '072-234-5678',
      capacity: 'ケアマネジャー5名',
      hours: '月〜金 9:00〜18:00（土日祝休み）',
      heroImage: 'https://images.pexels.com/photos/8865994/pexels-photo-8865994.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop',
      gallery: [
        'https://images.pexels.com/photos/8865994/pexels-photo-8865994.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
      ],
      features: [
        { title: '個別相談', description: '一人ひとりに寄り添った丁寧な相談対応' },
        { title: 'サービス調整', description: '最適な介護サービスの組み合わせを提案' },
        { title: '24時間対応', description: '緊急時の相談・対応も可能' }
      ],
      schedule: [
        { time: '9:00', activity: '訪問・相談受付開始' },
        { time: '10:00', activity: 'ケアプラン作成・見直し' },
        { time: '13:00', activity: 'サービス事業所との連携' },
        { time: '15:00', activity: 'ご利用者・ご家族との面談' },
        { time: '17:00', activity: 'モニタリング・記録作成' },
        { time: '18:00', activity: '業務終了（緊急対応除く）' }
      ],
      pricing: '介護保険適用（自己負担なし）'
    }
  };

  const facility = facilityData[slug || ''];

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">施設が見つかりません</h1>
          <Link to="/facilities" className="text-primary hover:text-primary-hover">
            施設一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={facility.heroImage}
          alt={facility.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to="/facilities"
              className="inline-flex items-center text-white mb-6 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              施設一覧に戻る
            </Link>
            <div className="text-white">
              <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                {facility.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{facility.name}</h1>
              <p className="text-xl opacity-90">{facility.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Info */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">サービスの特徴</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {facility.features.map((feature: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
                      <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Schedule */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1日の流れ</h2>
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                  {facility.schedule.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`flex flex-col sm:flex-row sm:items-center p-4 ${
                        index !== facility.schedule.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0 sm:w-1/4">
                        <Clock className="w-5 h-5 text-primary" />
                        <time className="font-semibold text-primary">{item.time}</time>
                      </div>
                      <div className="sm:w-3/4">
                        <span className="text-gray-700">{item.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">フォトギャラリー</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {facility.gallery.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden shadow-soft cursor-pointer hover:shadow-soft-lg transition-shadow"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${facility.name} 写真 ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">施設概要</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">住所</p>
                      <p className="text-gray-900">{facility.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">電話番号</p>
                      <a href={`tel:${facility.phone}`} className="text-primary hover:text-primary-hover">
                        {facility.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">定員</p>
                      <p className="text-gray-900">{facility.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">営業時間</p>
                      <p className="text-gray-900">{facility.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-2">料金目安</h4>
                  <p className="text-sm text-gray-600">{facility.pricing}</p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                  >
                    見学予約・お問い合わせ
                  </Link>
                  <a
                    href={`tel:${facility.phone}`}
                    className="block w-full text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    電話で問い合わせ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">アクセス</h2>
          </div>
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.123456789!2d135.52!3d34.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQxJzI0LjAiTiAxMzXCsDMxJzEyLjAiRQ!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${facility.name}のアクセスマップ`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="拡大画像"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityDetail;