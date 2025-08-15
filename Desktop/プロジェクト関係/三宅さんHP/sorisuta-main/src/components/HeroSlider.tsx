import React, { useState, useEffect } from 'react';

const IconChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/assets/img/hero01.jpg',
      alt: '安心感のある人物写真＋キャッチ',
      title: (
        <>
          大阪で任意後見・遺言書
          <br />
          遺言信託のご相談
        </>
      ),
      subtitle: '行政書士ソリスタサービスが丁寧にサポートします',
    },
    {
      image: '/assets/img/hero02.jpg',
      alt: '任意後見・遺言信託の要点',
      title: '将来への備えは今から始める',
      subtitle: '任意後見と遺言信託で安心の将来設計を',
    },
    {
      image: '/assets/img/hero03.jpg',
      alt: '無料相談CTA・大阪全域対応',
      title: '無料相談受付中',
      subtitle: '大阪全域対応・まずはお気軽にご相談ください',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-gray-300"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${slide.image})`,
            }}
            role="img"
            aria-label={slide.alt}
          >
            <div className="max-w-container mx-auto px-6 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <a
                  href="tel:072-813-8548"
                  className="inline-block bg-c-cta text-c-cta-contrast px-6 py-3 rounded-lg text-base font-bold hover:bg-opacity-90 transition-colors"
                  aria-label="電話をかける"
                >
                  無料相談のお申し込み
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
        aria-label="前のスライド"
      >
        <IconChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
        aria-label="次のスライド"
      >
        <IconChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`スライド ${index + 1}へ`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;