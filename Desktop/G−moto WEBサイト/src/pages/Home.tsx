
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Users, Calendar, ArrowRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import ServiceCard from '../components/ServiceCard';
import FacilitySlider from '../components/FacilitySlider';

const Home = () => {
  const services = [
    {
      icon: Heart,
      title: 'リハビリ特化型デイサービス',
      description: `シニアフィットネスの要素を取り入れリハビリに特化した新しいスタイルの通所介護（デイサービス）です。

要支援１から要介護５の方が、介護保険を使って運動機能の回復を目指してリハビリ専門の機器とプログラムを利用し、リハビリ運動を実施しています。`,
      link: '/services/rehabilitation-dayservice'
    },
    {
      icon: Users,
      title: '介護予防フィットネス',
      description: `高齢者が 要介護状態になるのを未然に防ぐ ことを目的とした、運動中心の通所型サービス（デイサービス） です。

医療リハビリとは異なり、病気やケガの治療後ではなく、健康寿命の延伸や日常生活能力の維持・向上を目指します。`,
      link: '/services#fitness'
    },
    {
      icon: Calendar,
      title: 'ケアプランセンター',
      description: `自宅で暮らす高齢者が介護サービスを適切に利用できるように、計画（ケアプラン）を立て、手続きを支援します。

近隣のリハビリ型デイサービスや、訪問介護事業者と連携しながら、ご本人に最適なプランを“地元”で支えることを理念にしています。`,
      link: '/services#careplan'
    }
  ];

  const news = [
    {
      date: '2024.03.15',
      title: '富田林店の新サービス開始のお知らせ',
      category: 'お知らせ'
    },
    {
      date: '2024.03.10',
      title: '春の健康フェア開催決定',
      category: 'イベント'
    },
    {
      date: '2024.03.05',
      title: '採用情報を更新しました',
      category: '採用'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              昨日より今日、<br />今日より明日を。
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              高齢者の自立支援を温かくサポート
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-hover transition-colors shadow-lg"
            >
              施設見学予約
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 services-section">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              私たちのサービス
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              リハビリ・フィットネス・ケアプランの三位一体のサービスで、<br />
              ご本人とご家族の暮らしを支えます
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 facilities-section">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              施設紹介
            </h2>
            <p className="text-lg text-gray-600">
              大阪エリア5拠点でサービスを提供しています
            </p>
          </div>
          <FacilitySlider />
          <div className="text-center mt-8">
            <Link
              to="/facilities"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              すべての施設を見る
              <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* President Message */}
      <section className="py-16 president-message-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              代表メッセージ
            </h2>
            <blockquote className="text-lg leading-relaxed text-gray-700 mb-8 text-left" data-component-name="Home">
              「私たちは『昨日より今日、今日より明日』の思いを胸に、地域のご高齢者が自信と笑顔を取り戻すお手伝いを続けてきました。リハビリ特化型デイサービス、介護予防フィットネス、そしてケアプランセンター。──これら三位一体のサービスで、ご本人とご家族の暮らしを支えます。」
            </blockquote>
            <footer className="text-gray-600">
              <strong>代表取締役　金城 明雄</strong>
            </footer>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 news-section">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              お知らせ
            </h2>
            <Link
              to="/news"
              className="text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              すべてのお知らせ
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {news.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center p-6 ${
                  index !== news.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <time className="text-primary font-medium">{item.date}</time>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
                <h3 className="sm:ml-6 font-medium text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6" data-component-name="Home">まずはお気軽にご相談ください</h2>
          <p className="text-xl text-black mb-8 opacity-90" data-component-name="Home">施設見学・サービス利用のご相談など、何でもお聞かせください</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              お問い合わせフォーム
            </Link>
            <a
              href="tel:06-1234-5678"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              電話で相談: 06-1234-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;