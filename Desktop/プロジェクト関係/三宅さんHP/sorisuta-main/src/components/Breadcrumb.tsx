import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const IconChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-gray-100 py-3" aria-label="パンくずナビゲーション">
      <div className="max-w-container mx-auto px-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-c-primary hover:underline">
              ホーム
            </a>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <IconChevronRight className="w-4 h-4 text-c-line" />
              {item.href ? (
                <a href={item.href} className="text-c-primary hover:underline">
                  {item.label}
                </a>
              ) : (
                <span className="text-c-text">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;