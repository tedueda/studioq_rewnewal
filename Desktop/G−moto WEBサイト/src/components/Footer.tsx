import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-poppins">G</span>
              </div>
              <div>
                <div className="text-lg font-bold">株式会社G・MOTO</div>
                <div className="text-sm text-gray-400">高齢者の自立支援パートナー</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              「昨日より今日、今日より明日」の思いを胸に、<br />
              地域のご高齢者が自信と笑顔を取り戻すお手伝いを続けています。
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">大阪府大阪市都島区本通4-15-8</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">06-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">info@g-moto.co.jp</span>
              </div>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-primary transition-colors">
                トップ
              </Link>
              <Link to="/company" className="block text-gray-300 hover:text-primary transition-colors">
                会社情報
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-primary transition-colors">
                事業紹介
              </Link>
              <Link to="/facilities" className="block text-gray-300 hover:text-primary transition-colors">
                施設案内
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-primary transition-colors">
                お問い合わせ
              </Link>
              <Link to="/recruit" className="block text-gray-300 hover:text-primary transition-colors">
                採用情報
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サービス</h3>
            <nav className="space-y-2">
              <Link to="/facilities/miyakojima" className="block text-gray-300 hover:text-primary transition-colors">
                都島本通り
              </Link>
              <Link to="/facilities/hirakata" className="block text-gray-300 hover:text-primary transition-colors">
                枚方
              </Link>
              <Link to="/facilities/tondabayashi" className="block text-gray-300 hover:text-primary transition-colors">
                富田林
              </Link>
              <Link to="/facilities/gofuku" className="block text-gray-300 hover:text-primary transition-colors">
                リハビス呉服
              </Link>
              <Link to="/facilities/ikeda" className="block text-gray-300 hover:text-primary transition-colors">
                ケアプラン池田
              </Link>
            </nav>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-400">フォローしてください</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 株式会社G・MOTO All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;