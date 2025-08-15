import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Logo image will be loaded from public assets

// Inline SVG Icon Components (replacing lucide-react)
const IconMenu: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconPhone: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.62 2.59a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.49-1.14a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.59.62A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'トップ' },
    { path: '/about', label: '制度とは' },
    { path: '/scenes', label: '必要になる場面' },
    { path: '/services', label: '遺言信託サービス' },
    { path: '/flow', label: '流れ' },
    { path: '/pricing', label: '料金' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'お問い合わせ' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="行政書士ソリスタサービス ホーム">
            <img src="/assets/img/logo01.png" alt="行政書士ソリスタサービス" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-c-primary ${
                  location.pathname === item.path
                    ? 'text-c-primary'
                    : 'text-c-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Phone Button */}
          <a
            href="tel:072-813-8548"
            className="hidden md:flex items-center bg-c-cta text-c-cta-contrast px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            aria-label="電話をかける"
          >
            <IconPhone className="w-4 h-4 mr-2" />
            072-813-8548
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-c-primary ${
                  location.pathname === item.path
                    ? 'text-c-primary'
                    : 'text-c-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:072-813-8548"
              className="flex items-center bg-c-cta text-c-cta-contrast px-4 py-2 rounded-lg mt-4 w-fit"
            >
              <IconPhone className="w-4 h-4 mr-2" />
              072-813-8548
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;