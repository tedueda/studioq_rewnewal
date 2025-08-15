import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

// Inline SVG Icons
const IconSend: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconCheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconPhone: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.62 2.59a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.49-1.14a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.59.62A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMapPin: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    message: '',
    agreed: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = '無料相談・お問い合わせ - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '任意後見・遺言書・遺言信託に関する無料相談を承ります。大阪全域対応。まずはお気軽にお問い合わせください。');
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須項目です';
    }

    if (!formData.tel.trim()) {
      newErrors.tel = '電話番号は必須項目です';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須項目です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容は必須項目です';
    }

    if (!formData.agreed) {
      newErrors.agreed = 'プライバシーポリシーへの同意が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitError(null);
    setIsSending(true);
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Server-side validation errors
        if (data && data.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors }));
        }
        throw new Error(data && data.error ? data.error : '送信に失敗しました。時間をおいて再度お試しください。');
      }

      if (data && data.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
      }
    } catch (err: any) {
      setSubmitError(err?.message || '送信に失敗しました。');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
        
        <div className="max-w-container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-c-accent rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <IconCheckCircle className="w-12 h-12 text-c-cta" />
            </div>
            <h1 className="text-3xl font-bold text-c-primary mb-4">
              お問い合わせありがとうございました
            </h1>
            <p className="text-lg text-c-text leading-relaxed mb-8">
              お問い合わせ内容を確認いたしました。2営業日以内に担当者よりご連絡いたします。
              お急ぎの場合は、お電話でお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-c-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                トップページに戻る
              </a>
              <a
                href="tel:072-813-8548"
                className="bg-c-cta text-c-cta-contrast px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                072-813-8548
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          無料相談・お問い合わせ
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-c-primary mb-6">お問い合わせフォーム</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-c-text mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-c-primary ${
                      errors.name ? 'border-red-500' : 'border-c-line'
                    }`}
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tel" className="block text-sm font-bold text-c-text mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-c-primary ${
                      errors.tel ? 'border-red-500' : 'border-c-line'
                    }`}
                    placeholder="072-813-8548"
                  />
                  {errors.tel && (
                    <p className="text-red-500 text-sm mt-1">{errors.tel}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-c-text mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-c-primary ${
                      errors.email ? 'border-red-500' : 'border-c-line'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-c-text mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-c-primary ${
                      errors.message ? 'border-red-500' : 'border-c-line'
                    }`}
                    placeholder="任意後見について相談したい、遺言書作成について詳しく知りたい など"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-c-text">
                      <span className="text-red-500">*</span> 
                      個人情報の取り扱いについて同意いたします。
                      お預かりした個人情報は、お問い合わせへの回答およびサービスのご案内にのみ使用いたします。
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreed}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-c-cta text-c-cta-contrast py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <IconSend className="w-5 h-5 mr-2" />
                  {isSending ? '送信中…' : '送信する'}
                </button>

                {submitError && (
                  <p className="text-red-500 text-sm mt-3 text-center">{submitError}</p>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-c-bg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-c-primary mb-6">事業者情報</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <IconMapPin className="w-5 h-5 text-c-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-c-text">行政書士ソリスタサービス</p>
                    <p className="text-c-text">行政書士 三宅利紀</p>
                    <p className="text-c-text">〒572-0837 大阪府寝屋川市早子町13番7号 403</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <IconPhone className="w-5 h-5 text-c-primary mr-3" />
                  <div>
                    <p className="text-c-text">TEL：072-813-8548 / FAX：072-800-6869</p>
                    <p className="text-c-text">携帯：090-8375-0339</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <IconMail className="w-5 h-5 text-c-primary mr-3" />
                  <p className="text-c-text">gm-miyake@office.email.ne.jp</p>
                </div>

                <div className="flex items-start">
                  <IconClock className="w-5 h-5 text-c-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-c-text">営業時間</p>
                    <p className="text-c-text">平日 9:00〜18:00</p>
                    <p className="text-sm text-gray-600">土日祝は事前予約により対応可</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-c-line rounded-lg p-8">
              <h3 className="text-xl font-bold text-c-primary mb-4">お電話でのお問い合わせ</h3>
              <p className="text-c-text mb-4">
                お急ぎの場合や詳しいご相談をご希望の方は、お電話でお気軽にお問い合わせください。
              </p>
              <a
                href="tel:072-813-8548"
                className="flex items-center justify-center bg-c-cta text-c-cta-contrast px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                <IconPhone className="w-5 h-5 mr-2" />
                072-813-8548
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;