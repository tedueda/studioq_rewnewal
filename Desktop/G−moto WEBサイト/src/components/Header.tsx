import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'トップ' },
    { path: '/services', label: '事業紹介' },
    { path: '/facilities', label: '施設案内' },
    { path: '/company', label: '会社概要' },
    { path: '/contact', label: 'お問い合わせ' },
    { path: '/recruit', label: '採用情報' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/images/logo/media1.jpg" alt="G・MOTOロゴ" className="object-contain w-full h-full" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">株式会社G・MOTO</div>
              <div className="text-sm text-gray-600 hidden sm:block">高齢者の自立支援パートナー</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-accent'
                    : 'text-gray-700 hover:text-primary hover:bg-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:06-1234-5678"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">06-1234-5678</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-accent'
                      : 'text-gray-700 hover:text-primary hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:06-1234-5678"
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors mt-4"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">06-1234-5678</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;