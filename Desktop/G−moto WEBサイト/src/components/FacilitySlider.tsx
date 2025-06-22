import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const FacilitySlider = () => {
  const facilities = [
    {
      slug: 'miyakojima',
      name: 'リハプライド GMOTO都島本通り',
      type: 'リハビリ特化型デイサービス',
      address: '大阪市都島区都島本通5-15-16',
      tel: '06-6922-6030',
      capacity: '午前15名・午後15名',
      image: '/images/store/miyakojima3.jpg'
    },
    {
      slug: 'hirakata',
      name: 'リハプライド 枚方',
      type: 'リハビリ特化型デイサービス',
      address: '大阪府枚方市田口3-4-1',
      tel: '072-805-5888',
      capacity: '午前18名・午後18名',
      image: '/images/store/hirakata.jpg'
    },
    {
      slug: 'tondabayashi',
      name: 'リハプライド 富田林',
      type: 'リハビリ特化型デイサービス',
      address: '大阪府富田林市宮町2-9-49',
      tel: '0721-23-8822',
      capacity: '午前18名・午後18名',
      image: '/images/store/tondabayashi.jpg'
    },
    {
      slug: 'gofuku',
      name: 'リハビス呉服',
      type: '介護予防フィットネス',
      address: '大阪府池田市室町７−３',
      capacity: '定員15名',
      image: '/images/store/rihabisu_ikeda.webp'
    },
    {
      slug: 'ikeda',
      name: 'じもとケアプランセンター池田',
      type: 'ケアプランセンター',
      address: '大阪府池田市室町7-3 リハビス呉服2階',
      capacity: 'ケアマネ数：常勤1名',
      image: '/images/store/keaplan_center.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= facilities.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, facilities.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const visibleFacilities = facilities.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFacilities.map((facility) => (
          <div key={facility.slug} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {facility.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600" data-component-name="FacilitySlider">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm" data-component-name="FacilitySlider">{facility.address}</span>
                </div>
                {facility.slug === 'ikeda' && (
                  <div className="flex items-center text-gray-600" data-component-name="FacilitySlider">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm" data-component-name="FacilitySlider">072-752-8133</span>
                  </div>
                )}
                {facility.slug === 'gofuku' && (
                  <div className="flex items-center text-gray-600" data-component-name="FacilitySlider">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm" data-component-name="FacilitySlider">072-752-8133</span>
                  </div>
                )}
                {facility.tel && facility.slug !== 'ikeda' && facility.slug !== 'gofuku' && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{facility.tel}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">定員：{facility.capacity}</span>
                </div>
              </div>
              {(facility.slug === 'ikeda' || facility.slug === 'gofuku') ? (
                <button
                  className="inline-block w-full text-center bg-primary text-white py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                  disabled
                >
                  詳細を見る
                </button>
              ) : facility.slug === 'miyakojima' ? (
                <a
                  href="https://www.rehapride.co.jp/gmmiyako/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  詳細を見る
                </a>
              ) : facility.slug === 'hirakata' ? (
                <a
                  href="https://www.rehapride.co.jp/hirakata/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  詳細を見る
                </a>
              ) : facility.slug === 'tondabayashi' ? (
                <a
                  href="https://www.rehapride.co.jp/tondabayashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  詳細を見る
                </a>
              ) : (
                <Link
                  to={`/facilities/${facility.slug}`}
                  className="inline-block w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  詳細を見る
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {facilities.length > itemsPerPage && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FacilitySlider;