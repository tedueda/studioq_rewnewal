import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    type: 'inquiry',
    name: '',
    email: '',
    phone: '',
    facility: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('お問い合わせありがとうございます。3営業日以内にご連絡いたします。');
    setFormData({
      type: 'inquiry',
      name: '',
      email: '',
      phone: '',
      facility: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: '電話でのお問い合わせ',
      content: '06-1234-5678',
      subtitle: '受付時間: 平日 9:00〜18:00'
    },
    {
      icon: Mail,
      title: 'メールでのお問い合わせ',
      content: 'info@g-moto.co.jp',
      subtitle: '24時間受付（返信は営業時間内）'
    },
    {
      icon: MapPin,
      title: '本社所在地',
      content: '〒534-0001 大阪市都島区本通4-15-8',
      subtitle: '最寄り駅: JR桜ノ宮駅 徒歩8分'
    }
  ];

  const faqItems = [
    {
      question: '見学は無料ですか？',
      answer: 'はい、施設見学は無料です。事前にご予約をお願いします。'
    },
    {
      question: '送迎はありますか？',
      answer: 'デイサービスでは送迎サービスを提供しています。送迎範囲については各施設にお問い合わせください。'
    },
    {
      question: '体験利用はできますか？',
      answer: '1日体験利用が可能です。ケアマネジャーと相談の上、お申し込みください。'
    },
    {
      question: '料金はどのくらいかかりますか？',
      answer: '介護度によって異なります。詳しくは各施設ページの料金目安をご確認いただくか、直接お問い合わせください。'
    },
    {
      question: '職員の採用はしていますか？',
      answer: '随時採用を行っています。採用情報ページをご確認いただくか、お電話でお問い合わせください。'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">お問い合わせ</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              施設見学・サービス利用・採用に関するご相談など<br />
              お気軽にお問い合わせください
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-soft p-8 text-center hover:shadow-soft-lg transition-shadow">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <p className="text-lg text-primary font-semibold mb-2">{info.content}</p>
                <p className="text-sm text-gray-600">{info.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせフォーム</h2>
            <p className="text-lg text-gray-600">
              以下のフォームにご記入いただき、送信してください
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-900 mb-2">
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="inquiry">サービス利用相談</option>
                  <option value="visit">施設見学予約</option>
                  <option value="recruitment">採用について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="山田 太郎"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="06-1234-5678"
                  />
                </div>
              </div>

              {/* Facility */}
              <div>
                <label htmlFor="facility" className="block text-sm font-semibold text-gray-900 mb-2">
                  関心のある施設
                </label>
                <select
                  id="facility"
                  name="facility"
                  value={formData.facility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  <option value="miyakojima">G・MOTO都島本通り</option>
                  <option value="hirakata">G・MOTO枚方</option>
                  <option value="tondabayashi">G・MOTO富田林</option>
                  <option value="gofuku">リハビス呉服</option>
                  <option value="ikeda">ケアプラン池田</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="お問い合わせ内容をご記入ください"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <>送信中...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">よくあるご質問</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-soft overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                        +
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-soft p-8">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">受付時間</h2>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-primary">平日: 9:00〜18:00</strong>
              </p>
              <p className="text-gray-600">
                土日祝日はお休みをいただいております<br />
                緊急時は各施設まで直接お電話ください
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;