import React from 'react';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

const Company = () => {
  const companyInfo = [
    { label: '会社名', value: '株式会社G・MOTO' },
    { label: '代表取締役', value: '金城 明雄' },
    { label: '設立', value: '2018年4月' },
    { label: '資本金', value: '300万円' },
    { label: '従業員数', value: '45名（2024年3月現在）' },
    { label: '事業内容', value: 'リハビリ特化型デイサービス、介護予防フィットネス、ケアプランセンター' },
  ];

  const history = [
    { year: '2018年4月', event: '株式会社G・MOTO設立' },
    { year: '2018年7月', event: 'G・MOTO都島本通り開設' },
    { year: '2019年3月', event: 'G・MOTO枚方開設' },
    { year: '2020年1月', event: 'G・MOTO富田林開設' },
    { year: '2021年6月', event: 'リハビス呉服（介護予防フィットネス）開設' },
    { year: '2022年4月', event: 'ケアプラン池田開設' },
    { year: '2023年10月', event: '従業員数40名突破' },
    { year: '2024年1月', event: '利用者数累計1,000名突破' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">会社情報</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              2018年の設立以来、高齢者の自立支援を通して<br />
              地域社会に貢献し続けています
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">会社概要</h2>
          </div>
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="divide-y divide-gray-200">
              {companyInfo.map((info, index) => (
                <div key={index} className="px-6 py-4 flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0">
                    {info.label}
                  </dt>
                  <dd className="text-sm text-gray-900 sm:w-2/3">
                    {info.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* President Message */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">代表挨拶</h2>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/3">
                <div className="w-64 h-64 mx-auto bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5214020/pexels-photo-5214020.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="代表取締役 金城明雄"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-900">金城 明雄</h3>
                  <p className="text-gray-600">代表取締役</p>
                </div>
              </div>
              <div className="lg:w-2/3">
                <blockquote className="text-lg leading-relaxed text-gray-700 space-y-4">
                  <p>
                    私たちG・MOTOは、「昨日より今日、今日より明日」という信念のもと、
                    地域のご高齢者が自信と笑顔を取り戻すお手伝いをしています。
                  </p>
                  <p>
                    リハビリ特化型デイサービス、介護予防フィットネス、そしてケアプランセンター。
                    この三位一体のサービスで、ご利用者様とそのご家族の暮らしを支えることが
                    私たちの使命です。
                  </p>
                  <p>
                    スタッフ一同、プロフェッショナルとしての技術と、
                    温かい心でサービスを提供し続けてまいります。
                    皆様の健やかな毎日のために、私たちG・MOTOにお任せください。
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">沿革</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-primary"></div>
            <div className="space-y-8">
              {history.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2"></div>
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <time className="text-primary font-semibold">{item.year}</time>
                    </div>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Access Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">アクセス</h2>
          </div>
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">本社所在地</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">〒534-0001</p>
                      <p className="text-gray-700">大阪府大阪市都島区本通4-15-8</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <p className="text-gray-700">TEL: 06-1234-5678</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <p className="text-gray-700">info@g-moto.co.jp</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">交通アクセス</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• JR大阪環状線「桜ノ宮駅」徒歩8分</li>
                    <li>• 地下鉄谷町線「都島駅」徒歩10分</li>
                    <li>• 駐車場完備（5台）</li>
                  </ul>
                </div>
              </div>
              <div className="h-80 lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.123456789!2d135.52!3d34.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQxJzI0LjAiTiAxMzXCsDMxJzEyLjAiRQ!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="株式会社G・MOTO本社所在地"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;