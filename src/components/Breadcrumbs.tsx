import React from 'react';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

export interface BreadcrumbItem {
  label: string;
  pageId?: string;
  onClick?: () => void;
  isCurrent?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome: () => void;
  onNavigateBack?: () => void;
  backLabel?: string;
  showBack?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigateHome,
  onNavigateBack,
  backLabel = 'All Sanctuary Pages',
  showBack = true,
  className = ''
}) => {
  // Generate Schema.org JSON-LD BreadcrumbList
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Sanctuary Home',
        item: typeof window !== 'undefined' ? `${window.location.origin}/#home` : 'https://www.astraltarot24.in/#home'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: typeof window !== 'undefined' 
          ? (item.pageId ? `${window.location.origin}/#${item.pageId}` : window.location.href)
          : `https://www.astraltarot24.in/#${item.pageId || ''}`
      }))
    ]
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    cosmicAudio.playCardFlip();
    onNavigateHome();
  };

  const handleItemClick = (e: React.MouseEvent, item: BreadcrumbItem) => {
    e.preventDefault();
    if (item.onClick) {
      cosmicAudio.playChime(640, 0.3);
      item.onClick();
    }
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    cosmicAudio.playCardFlip();
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      onNavigateHome();
    }
  };

  return (
    <div className={`breadcrumbs-container flex flex-wrap items-center justify-between gap-3 ${className}`}>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />

      {/* Semantic Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center flex-wrap">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
          {/* Home Node */}
          <li className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="breadcrumb-home-link inline-flex items-center space-x-1.5 py-1 px-2 rounded-lg font-medium transition-all text-[#94a3b8] hover:text-[#ffd700] hover:bg-[#161a36]/60 cursor-pointer"
              title="Return to Sanctuary Home"
            >
              <Home className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sanctuary Home</span>
            </button>
          </li>

          {/* Subsequent Nodes */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1 || item.isCurrent;
            const ItemIcon = item.icon;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center space-x-1.5 sm:space-x-2">
                <ChevronRight className="breadcrumb-separator w-3.5 h-3.5 text-[#475569] shrink-0" aria-hidden="true" />
                
                {isLast ? (
                  <span
                    aria-current="page"
                    className="breadcrumb-current inline-flex items-center space-x-1.5 py-1 px-2.5 rounded-lg font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 shadow-xs"
                  >
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                  </span>
                ) : item.onClick ? (
                  <button
                    onClick={(e) => handleItemClick(e, item)}
                    className="breadcrumb-intermediate-link inline-flex items-center space-x-1.5 py-1 px-2 rounded-lg font-medium text-[#a5b4fc] hover:text-white hover:bg-[#1a1f3d]/60 transition-all cursor-pointer"
                  >
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span className="breadcrumb-category text-[#a5b4fc] font-medium py-1 px-1">
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5 inline mr-1" />}
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Back to Sanctuary or Previous Level Button */}
      {showBack && (
        <button
          onClick={handleBackClick}
          className="breadcrumb-back-btn inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-[#141833] border border-[#232747] text-[#cbd5e1] hover:text-white hover:border-[#d4af37]/50 shadow-xs cursor-pointer"
          title={backLabel}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>{backLabel}</span>
        </button>
      )}
    </div>
  );
};
