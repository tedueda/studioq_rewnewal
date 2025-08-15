import React from 'react';
// Logo image will be loaded from public assets

// Inline SVG Icon Components
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

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <img src="/assets/img/logo01.png" alt="行政書士ソリスタサービス" className="h-14 w-auto mb-4 bg-white" />
            <p className="text-sm mb-2">行政書士 三宅利紀</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <IconMapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>〒572-0837 大阪府寝屋川市早子町13番7号 403</span>
              </div>
              <div className="flex items-center">
                <IconPhone className="w-4 h-4 mr-2" />
                <span>
                  TEL：
                  <a href="tel:072-813-8548" className="hover:text-gray-300" aria-label="電話をかける 072-813-8548">
                    072-813-8548
                  </a>
                  {" / "}
                  FAX：
                  <a href="tel:072-800-6869" className="hover:text-gray-300" aria-label="FAX に電話 072-800-6869">
                    072-800-6869
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <IconPhone className="w-4 h-4 mr-2" />
                <span>
                  携帯：
                  <a href="tel:090-8375-0339" className="hover:text-gray-300" aria-label="携帯に電話 090-8375-0339">
                    090-8375-0339
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <IconMail className="w-4 h-4 mr-2" />
                <span>gm-miyake@office.email.ne.jp</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-gray-300">トップページ</a></li>
              <li><a href="/about" className="hover:text-gray-300">任意後見人制度とは</a></li>
              <li><a href="/scenes" className="hover:text-gray-300">必要になる場面</a></li>
              <li><a href="/services" className="hover:text-gray-300">遺言信託サービス</a></li>
              <li><a href="/flow" className="hover:text-gray-300">ご利用の流れ</a></li>
              <li><a href="/pricing" className="hover:text-gray-300">料金案内</a></li>
              <li><a href="/faq" className="hover:text-gray-300">よくある質問</a></li>
              <li><a href="/contact" className="hover:text-gray-300">お問い合わせ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">主なサービス</h3>
            <ul className="space-y-2 text-sm">
              <li>任意後見契約</li>
              <li>遺言書作成</li>
              <li>遺言信託の文書作成</li>
              <li>財産管理</li>
              <li>介護契約サポート</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 行政書士ソリスタサービス All Rights Reserved.</p>
        </div>
      </div>

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-c-cta p-4 md:hidden z-40">
        <div className="flex space-x-2">
          <a
            href="tel:072-813-8548"
            className="flex-1 bg-white text-c-cta text-center py-3 rounded-lg font-bold"
          >
            <IconPhone className="w-4 h-4 inline mr-2" />
            電話する
          </a>
          <a
            href="/contact"
            className="flex-1 bg-c-primary text-white text-center py-3 rounded-lg font-bold"
          >
            無料相談
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;