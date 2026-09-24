import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  category: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  badge?: string;
  onNavigateHome: () => void;
  onNavigateBack?: () => void;
  onOpenBooking?: () => void;
  breadcrumbItems?: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  title,
  highlightedTitle,
  description,
  badge,
  onNavigateHome,
  onNavigateBack,
  onOpenBooking,
  breadcrumbItems
}) => {
  const defaultItems: BreadcrumbItem[] = [
    { label: category },
    { label: title, isCurrent: true }
  ];

  const items = breadcrumbItems || defaultItems;

  return (
    <div className="pt-6 sm:pt-8 pb-8 sm:pb-12 border-b border-[#232747]/60 bg-gradient-to-b from-[#0e1124] to-[#080914] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Full Breadcrumb Navigation Bar & Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs
            items={items}
            onNavigateHome={onNavigateHome}
            onNavigateBack={onNavigateBack}
            backLabel="All Sanctuary Pages"
            showBack={true}
            className="w-full sm:w-auto"
          />

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#b38827] via-[#eab308] to-[#dfb743] text-[#07080f] font-semibold text-xs shadow-md shadow-[#d4af37]/20 hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#07080f]" />
              <span>Book Reading</span>
            </button>
          )}
        </div>

        {/* Title and Intro */}
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1b1f3d] border border-[#d4af37]/35 text-[#fef08a] text-[11px] font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {title}{' '}
            {highlightedTitle && (
              <span className="gold-text-gradient">{highlightedTitle}</span>
            )}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl font-sans">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
