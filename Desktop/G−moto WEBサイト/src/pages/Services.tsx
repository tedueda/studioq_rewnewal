import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Calendar, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">私たちのサービス</h1>
        <div className="space-y-16">
          {/* 1. リハビリ特化型デイサービス */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-10 space-y-6 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center"><Heart className="w-7 h-7 mr-2 text-primary" />リハビリ特化型デイサービス</h2>
              <p className="whitespace-pre-line text-lg text-gray-700 mb-4">
要支援1から要介護5の高齢者が介護保険を利用して通えるリハビリ特化型デイサービスです。専門マシンと科学的プログラムで軽負荷かつ安全・楽しく運動機能を回復していきます。
『外出や寝たきりの不安』をお持ちのご自身やご家族のために『自立した生活と自信の回復』のために以下を中心に安全で無理のないリハビリプログラムをご用意しています。
</p>
              <Link to="/services/rehabilitation-dayservice" className="inline-flex items-center text-primary font-semibold hover:underline">
                詳しく見る <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/service/service01.jpg" alt="リハビリ特化型デイサービス" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
            </div>
          </div>

          {/* 2. 介護予防フィットネス */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-10 space-y-6 md:space-y-0">
            <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
              <img src="/images/service/service02.jpg" alt="介護予防フィットネス" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center"><Target className="w-7 h-7 mr-2 text-primary" />介護予防フィットネス</h2>
              <p className="whitespace-pre-line text-lg text-gray-700 mb-4">
高齢者が 要介護状態になるのを未然に防ぐ ことを目的とした、運動中心の通所型サービス（デイサービス） です。
医療リハビリとは異なり、病気やケガの治療後ではなく、健康寿命の延伸や日常生活能力の維持・向上を目指します。
運動機能の維持・向上を目的としたフィットネスを中心に 要支援・要介護の方も無理なく楽しめるプログラムで、認知症予防や仲間づくりにも最適です。
</p>
              <Link to="/services/fitness" className="inline-flex items-center text-primary font-semibold hover:underline">
                詳しく見る <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 3. ケアプランセンター */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-10 space-y-6 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center"><Calendar className="w-7 h-7 mr-2 text-primary" /><span>ケアプランセンター<br />（居宅介護支援事業所）</span></h2>
              <p className="whitespace-pre-line text-lg text-gray-700 mb-4">
自宅で暮らす高齢者が介護サービスを適切に利用できるように、計画（ケアプラン）を立て、手続きを支援してくれる介護の専門窓口です。

経験豊富なケアマネジャーが、ご利用者様一人ひとりに合わせた最適なケアプランを作成。 介護サービスの調整やご家族のサポートもトータルで行います。
</p>
              <Link to="/services/careplan" className="inline-flex items-center text-primary font-semibold hover:underline">
                詳しく見る <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/service/service03.jpg" alt="ケアプランセンター" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
            </div>
          </div>
        </div>
        <div className="text-center mt-16">
          <Link
            to="/facilities"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors shadow-lg"
          >
            施設一覧を見る
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;