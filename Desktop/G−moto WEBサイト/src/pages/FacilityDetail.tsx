import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Users, ArrowLeft, X } from 'lucide-react';
import FacilityMap from '../components/FacilityMap';

const FacilityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const facilityData: { [key: string]: any } = {
    miyakojima: {
      name: 'リハプライド GMOTO都島本通り',
      type: 'リハビリ特化型デイサービス',
      address: '〒534-0001 大阪市都島区本通4-15-8',
      phone: '06-1234-5678',
      capacity: '定員25名',
      hours: '月〜土 9:00〜16:00（日祝休み）',
      heroImage: '/images/store/miyakojima3.jpg',
      gallery: [
        '/images/store/miyakojima3.jpg',
        '/images/store/miyakojima3.jpg',
        '/images/store/miyakojima3.jpg',
        '/images/store/miyakojima3.jpg'
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
      name: 'リハプライド 枚方',
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
      name: 'リハプライド 富田林',
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

  // URLのslugパラメータに基づいて施設情報を取得
  const facility = slug && facilityData[slug] ? facilityData[slug] : facilityData['tondabayashi'];

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
      {/* Hero Section - With Background */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 flex items-center" 
          style={{ 
            backgroundImage: 'url(/images/background/footerUp.svg)', 
            backgroundPosition: 'bottom', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'contain' 
          }}
        >
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
              {/* Facility Image */}
              <div className="mb-12">
                <img 
                  src={`/images/store/${slug}.jpg`} 
                  alt={`${facility.name} 施設写真`} 
                  className="w-full h-auto rounded-lg shadow-soft mb-8"
                  onError={(e) => {
                    // 画像が存在しない場合はプレースホルダー画像を表示
                    e.currentTarget.src = facility.heroImage;
                  }}
                />
              </div>
              
              {/* Features section removed */}
              
              {/* 施設情報 */}
              <div className="mb-12">
  {/* 2カラム（営業時間・料金） */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    {/* 営業時間 */}
    <div className="bg-orange-50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-orange-500 mb-4">営業時間</h2>
      <div className="text-gray-800">
        {facility.hours}
      </div>
    </div>
    {/* 料金 */}
    <div className="bg-orange-50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-orange-500 mb-4">料金</h2>
      <div className="text-gray-800">
  【半日型】<br />
  要介護１　420円／回<br />
  要介護２　482円／回<br />
  要介護３　545円／回<br />
  要介護４　605円／回<br />
  要介護５　669円／回<br />
  <br />
  【1日型】<br />
  要介護１　　759円／回<br />
  要介護２　　897円／回<br />
  要介護３　1,040円／回<br />
  要介護４　1,181円／回<br />
  要介護５　1,323円／回<br />
  <br />
  上記の金額は介護保険の負担割合が1割の場合になります。<br />
  加算、総合事業については、お問い合わせください。
</div>
    </div>
  </div>
  {/* 定員 */}
  <div className="mb-8">
    <h2 className="text-xl font-bold text-orange-500 mb-2">定員</h2>
    <div className="bg-orange-50 rounded-lg p-4 text-gray-800">
      {facility.capacity}
    </div>
  </div>
  {/* サービス提供エリア */}
  <div>
    <h2 className="text-xl font-bold text-orange-500 mb-2">サービス提供エリア</h2>
    <div className="bg-orange-50 rounded-lg p-4 text-gray-800">
      {slug === 'tondabayashi' ? '富田林市全域 河南町、千早赤阪村の一部' : 
       slug === 'miyakojima' ? '大阪市都島区、旭区、城東区、鶴見区の一部' : 
       slug === 'hirakata' ? '枚方市全域、寝屋川市の一部' : '施設周辺地域'}
    </div>
  </div>
  
  {/* 空き状況 */}
  <div className="mt-8">
    <h2 className="text-xl font-bold text-orange-500 mb-2">空き状況</h2>
    <div className="bg-orange-50 rounded-lg p-4 text-gray-800">
      <div className="text-gray-800 text-sm mb-2">
        午前（1単位目）、午後（2単位目）ともに若干余裕があります。（R3年12月現在）<br />
        &lt;サービス提供時間&gt;<br />
        半日型　午前 9:00～12:15、午後 13:30～16:45<br />
        1日型　午前 9:30～16:45
      </div>
      <div className="text-gray-700 text-xs mb-2">[表示記号案内] ○：空きあり、▲：残り1～3名、×：空きなし</div>
      <div className="overflow-x-auto">
        <table className="min-w-max w-full text-center border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-pink-100 text-gray-700">
              <th className="py-1 px-2 border-b"></th>
              <th className="py-1 px-2 border-b">月曜</th>
              <th className="py-1 px-2 border-b">火曜</th>
              <th className="py-1 px-2 border-b">水曜</th>
              <th className="py-1 px-2 border-b">木曜</th>
              <th className="py-1 px-2 border-b">金曜</th>
              <th className="py-1 px-2 border-b">土曜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-2 border-b font-semibold">午前</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
            </tr>
            <tr>
              <td className="py-1 px-2 border-b font-semibold">午後</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
            </tr>
            <tr>
              <td className="py-1 px-2 border-b font-semibold">全日</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
              <td className="py-1 px-2 border-b">○</td>
              <td className="py-1 px-2 border-b">△</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-xs text-gray-700 mt-2 flex flex-wrap gap-4">
        <span>○ 空きあり</span>
        <span>△ 空きわずか</span>
        <span>× 順番待ちです</span>
      </div>
    </div>
  </div>
</div>

              {/* Daily Schedule section removed */}

              {/* Contact Buttons */}
              <div className="mb-12 mt-8">
                <div className="space-y-3 max-w-md mx-auto">
                  <Link
                    to="/contact"
                    className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                  >
                    見学予約・お問い合わせ
                  </Link>
                  <a
                    href="tel:0721-23-8822"
                    className="block w-full text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    電話で問い合わせ
                  </a>
                </div>
              </div>

              {/* Photo Gallery section removed */}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-4">施設情報</h3>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">
                    {slug === 'tondabayashi' ? '大阪府・富田林市' : 
                     slug === 'miyakojima' ? '大阪府・都島区' : 
                     slug === 'hirakata' ? '大阪府・枚方市' : 
                     slug === 'gofuku' ? '大阪府・大阪市' : 
                     '大阪府・池田市'}
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">介護保険事業所番号</p>
                  <p className="text-gray-600">
                    {slug === 'tondabayashi' ? '2794900205' : 
                     slug === 'miyakojima' ? '2775001234' : 
                     slug === 'hirakata' ? '2712345678' : 
                     slug === 'gofuku' ? '2756789012' : 
                     '2734567890'}
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">住所</p>
                  <p className="text-gray-600">{facility.address}</p>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">メールアドレス</p>
                  <a href={`mailto:${slug}@rehapride.co.jp`} className="text-primary hover:underline">{slug}@rehapride.co.jp</a>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">電話番号</p>
                  <a href={`tel:${facility.phone}`} className="text-primary hover:underline">{facility.phone}</a>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-1">FAX</p>
                  <p className="text-gray-600">0721-23-8823</p>
                </div>

                {/* Contact buttons moved to main content */}
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
              <FacilityMap 
                address={facility.address} 
                title={`${facility.name}のアクセスマップ`}
                lat={slug === 'tondabayashi' ? 34.5 : 
                     slug === 'miyakojima' ? 34.7 : 
                     slug === 'hirakata' ? 34.825467 : 
                     slug === 'gofuku' ? 34.68 : 34.82}
                lng={slug === 'tondabayashi' ? 135.6 : 
                     slug === 'miyakojima' ? 135.53 : 
                     slug === 'hirakata' ? 135.678162 : 
                     slug === 'gofuku' ? 135.51 : 135.43}
              />
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