import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Star, ArrowRight, MapPin, Clock, Banknote } from 'lucide-react';

const Recruit = () => {
  const jobPositions = [
    {
      title: '理学療法士',
      type: '正社員',
      location: '都島本通り・枚方・富田林',
      salary: '月給 25万円〜35万円',
      description: 'リハビリ特化型デイサービスでの機能訓練業務',
      requirements: ['理学療法士国家資格', '実務経験3年以上優遇', '普通自動車免許'],
      benefits: ['昇給あり', '賞与年2回', '退職金制度', '研修制度充実']
    },
    {
      title: '作業療法士',
      type: '正社員',
      location: '枚方・富田林',
      salary: '月給 25万円〜35万円',
      description: '日常生活動作の改善サポート業務',
      requirements: ['作業療法士国家資格', '実務経験2年以上優遇', '普通自動車免許'],
      benefits: ['昇給あり', '賞与年2回', '退職金制度', '研修制度充実']
    },
    {
      title: '言語聴覚士',
      type: '正社員・パート',
      location: '富田林',
      salary: '月給 24万円〜32万円',
      description: '嚥下機能改善・言語機能向上サポート',
      requirements: ['言語聴覚士国家資格', '経験不問', '普通自動車免許'],
      benefits: ['昇給あり', '賞与年2回', '退職金制度', '研修制度充実']
    },
    {
      title: 'ケアマネジャー',
      type: '正社員',
      location: '池田',
      salary: '月給 22万円〜30万円',
      description: 'ケアプラン作成・サービス調整業務',
      requirements: ['介護支援専門員資格', '実務経験3年以上', '普通自動車免許'],
      benefits: ['昇給あり', '賞与年2回', '退職金制度', 'オンコール手当']
    },
    {
      title: '運動指導員',
      type: '正社員・パート',
      location: 'リハビス呉服',
      salary: '月給 20万円〜28万円',
      description: '介護予防フィットネス指導業務',
      requirements: ['健康運動指導士資格優遇', '経験不問', '普通自動車免許'],
      benefits: ['昇給あり', '賞与年2回', '資格取得支援', '研修制度充実']
    },
    {
      title: '介護職員',
      type: '正社員・パート',
      location: '全施設',
      salary: '月給 18万円〜26万円',
      description: '利用者様の日常生活サポート業務',
      requirements: ['介護職員初任者研修以上', '経験不問', '普通自動車免許優遇'],
      benefits: ['昇給あり', '賞与年2回', '資格取得支援', '研修制度充実']
    }
  ];

  const companyBenefits = [
    {
      icon: Banknote,
      title: '充実の待遇',
      description: '昇給・賞与年2回、退職金制度完備'
    },
    {
      icon: Star,
      title: '資格取得支援',
      description: '研修費用補助、勉強会参加支援'
    },
    {
      icon: Heart,
      title: '働きやすい環境',
      description: '有給取得率90%以上、残業少なめ'
    },
    {
      icon: Users,
      title: 'チームワーク',
      description: '風通しの良い職場環境、定期懇親会'
    }
  ];

  const employeeVoices = [
    {
      name: '田中 美佳',
      position: '理学療法士（入社3年目）',
      department: 'G・MOTO都島本通り',
      image: 'https://images.pexels.com/photos/5214020/pexels-photo-5214020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      comment: '利用者様一人ひとりに合わせたリハビリプログラムを考えるのがやりがいです。スタッフ同士の連携も良く、働きやすい環境です。'
    },
    {
      name: '山田 健一',
      position: 'ケアマネジャー（入社2年目）',
      department: 'ケアプラン池田',
      image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      comment: 'ご利用者様とご家族の生活を支えるケアプラン作成にやりがいを感じています。研修制度も充実していて、スキルアップできる環境です。'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">採用情報</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              一緒に高齢者の自立支援を支える<br />
              仲間を募集しています
            </p>
          </div>
        </div>
      </section>

      {/* Company Benefits */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">G・MOTOで働く魅力</h2>
            <p className="text-lg text-gray-600">
              やりがいと成長を感じられる職場環境をご用意しています
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-soft text-center hover:shadow-soft-lg transition-shadow">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">募集職種</h2>
          </div>
          <div className="space-y-8">
            {jobPositions.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-shadow">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="lg:flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-6">{job.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">勤務地</p>
                            <p className="font-medium text-gray-900">{job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Banknote className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">給与</p>
                            <p className="font-medium text-gray-900">{job.salary}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">勤務時間</p>
                            <p className="font-medium text-gray-900">9:00〜18:00</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">応募要件</h4>
                        <ul className="text-gray-700 space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>• {req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">福利厚生</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, benefitIndex) => (
                            <span
                              key={benefitIndex}
                              className="bg-accent text-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-64 flex-shrink-0">
                      <Link
                        to="/contact"
                        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors mb-3"
                      >
                        この職種に応募
                      </Link>
                      <p className="text-sm text-gray-600 text-center">
                        詳細はお気軽にお問い合わせください
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Voices */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">社員の声</h2>
            <p className="text-lg text-gray-600">
              実際に働くスタッフからのメッセージ
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {employeeVoices.map((voice, index) => (
              <div key={index} className="bg-white rounded-xl shadow-soft p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={voice.image}
                    alt={voice.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{voice.name}</h3>
                    <p className="text-primary font-medium">{voice.position}</p>
                    <p className="text-sm text-gray-600">{voice.department}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 leading-relaxed">
                  "{voice.comment}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">応募の流れ</h2>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-8">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">お問い合わせ</h3>
                  <p className="text-gray-700">お電話またはお問い合わせフォームからご連絡ください</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">書類選考</h3>
                  <p className="text-gray-700">履歴書・職務経歴書による書類選考を行います</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">面接・施設見学</h3>
                  <p className="text-gray-700">面接と併せて実際の職場環境をご見学いただけます</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">内定・入社</h3>
                  <p className="text-gray-700">内定後、入社日を調整し、研修からスタートします</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            一緒に働きませんか？
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            高齢者の笑顔と自立を支える、やりがいのある仕事です
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              採用についてお問い合わせ
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

export default Recruit;