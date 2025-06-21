import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const slides = [
    {
      image: '/images/slider/kv_001.png',
      alt: 'ヒーロースライダー画像1'
    },
    {
      image: '/images/slider/kv_002.png',
      alt: 'ヒーロースライダー画像2'
    },
    {
      image: '/images/slider/kv_003.png',
      alt: 'ヒーロースライダー画像3'
    },
    {
      image: '/images/slider/kv_004.png',
      alt: 'ヒーロースライダー画像4'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;