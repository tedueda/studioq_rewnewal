import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const IconChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconChevronUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const FaqPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  React.useEffect(() => {
    document.title = 'よくある質問（FAQ） - 行政書士ソリスタサービス';
    
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', '大阪で任意後見・遺言書・遺言信託に関するよくある質問。家族を任意後見人にできるか、開始のタイミング、費用などについてお答えします。');
    }

    // Add FAQ structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const faqs = [
    {
      question: '大阪で任意後見契約をするには？',
      answer: '大阪府内の公証役場で任意後見契約を締結します。まずは当事務所にご相談いただき、契約内容を検討した上で、公証役場での手続きをサポートいたします。大阪市内をはじめ、府内全域で対応可能です。'
    },
    {
      question: '遺言書と遺言信託の違いは？',
      answer: '遺言書は財産の分割方法を記した文書ですが、遺言信託は遺言書の作成から保管、執行まで一体的にサービスを提供する制度です。遺言信託では執行時の手続きがスムーズで、複雑な相続にも対応できます。'
    },
    {
      question: '家族を任意後見人にできますか？',
      answer: 'はい、可能です。配偶者、子、兄弟姉妹など信頼できる家族を任意後見人として選任できます。ただし、家庭裁判所により任意後見監督人が選任され、後見人の事務を監督することになります。'
    },
    {
      question: 'どのタイミングで後見が開始しますか？',
      answer: '任意後見は、本人の判断能力が低下し、家庭裁判所に任意後見監督人選任の申立てを行って、監督人が選任された時点で開始されます。契約締結と実際の開始には時間的な間隔があります。'
    },
    {
      question: '費用はどのくらいかかりますか？',
      answer: 'お客様の状況により変動しますので、詳しくはお見積もりをご依頼ください。'
    },
    {
      question: '契約後にキャンセルはできますか？',
      answer: '任意後見契約は公正証書で作成され、開始前であれば公証役場での解約手続きにより終了できます。ただし、一度開始された任意後見を終了させるには、家庭裁判所の許可が必要になります。'
    },
    {
      question: '他の専門家との連携はありますか？',
      answer: '必要に応じて司法書士（登記手続き）、税理士（税務申告）、弁護士（法的トラブル）等と連携いたします。お客様の状況に最適な専門家ネットワークでサポートします。'
    },
    {
      question: '遠方でも相談できますか？',
      answer: '大阪府以外でも出張相談も承ります。また、初回はオンライン相談も可能です。お客様のご都合に合わせて柔軟に対応いたしますので、まずはお気軽にご連絡ください。'
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'よくある質問' }]} />
      
      <div className="max-w-container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-c-primary mb-8">
          よくある質問（FAQ）
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-c-text leading-relaxed mb-8">
            任意後見・遺言書・遺言信託に関してよくお寄せいただく質問をまとめました。<br />
            その他のご質問がございましたら、お気軽にお問い合わせください。
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-c-line rounded-lg shadow-sm">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={openItems.has(index)}
                >
                  <h3 className="text-lg font-bold text-c-text pr-4">
                    Q. {faq.question}
                  </h3>
                  {openItems.has(index) ? (
                    <IconChevronUp className="w-5 h-5 text-c-primary flex-shrink-0" />
                  ) : (
                    <IconChevronDown className="w-5 h-5 text-c-primary flex-shrink-0" />
                  )}
                </button>
                
                {openItems.has(index) && (
                  <div className="px-6 pb-6 border-t border-c-line bg-c-bg">
                    <div className="pt-4">
                      <p className="text-c-text leading-relaxed">
                        <span className="text-c-primary font-bold">A. </span>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-c-text mb-6">
              上記以外のご質問やより詳しい内容については、お気軽にご相談ください。
            </p>
            <a
              href="/contact"
              className="inline-block bg-c-cta text-c-cta-contrast px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              個別のご質問・ご相談
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;