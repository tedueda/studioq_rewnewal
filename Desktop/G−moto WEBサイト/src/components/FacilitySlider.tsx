import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// スタイルを追加
import './FacilitySlider.css';

const FacilitySlider = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
      address: '大阪府枚方市田宮3-4-1',
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

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="swiper-custom-navigation flex justify-end space-x-2 mb-6">
        <button className="swiper-custom-prev bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-full p-2 shadow-md">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="swiper-custom-next bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-full p-2 shadow-md">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true
        }}
        slidesPerGroup={1}
        loop={true}
        speed={800}
        autoplay={{ 
          delay: 4000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          prevEl: '.swiper-custom-prev',
          nextEl: '.swiper-custom-next',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        className="facility-swiper"
        style={{ paddingBottom: 50, paddingTop: 20 }}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        updateOnWindowResize={true}
      >
        {facilities.map((facility) => (
          <SwiperSlide key={facility.slug}>
            {facility.slug === 'ikeda' || facility.slug === 'gofuku' ? (
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" style={{ margin: '0 auto' }}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 will-change-transform" 
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-12 pb-4 px-6">
                    <h3 className="text-xl font-bold text-white mb-1">{facility.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">{facility.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  {/* 施設名はイメージ上に移動したため削除 */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{facility.address}</span>
                    </div>
                    {facility.capacity && (
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{facility.capacity}</span>
                      </div>
                    )}
                  </div>
                  <button className="w-full bg-gray-200 text-gray-500 font-bold py-2.5 px-4 rounded-lg cursor-not-allowed transition-all" disabled>
                    詳細を見る
                  </button>
                </div>
              </div>
            ) : (
              <Link to={`/facilities/${facility.slug}`} className="block cursor-pointer">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" style={{ margin: '0 auto' }}>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 will-change-transform" 
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-12 pb-4 px-6">
                      <h3 className="text-xl font-bold text-white mb-1">{facility.name}</h3>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">{facility.type}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    {/* 施設名はイメージ上に移動したため削除 */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{facility.address}</span>
                      </div>
                      {facility.capacity && (
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="text-sm">{facility.capacity}</span>
                        </div>
                      )}
                      {facility.tel && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="text-sm">{facility.tel}</span>
                        </div>
                      )}
                    </div>
                    <div className="block w-full bg-primary text-white text-center font-semibold py-2.5 px-4 rounded-lg hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md">
                      詳細を見る
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FacilitySlider;