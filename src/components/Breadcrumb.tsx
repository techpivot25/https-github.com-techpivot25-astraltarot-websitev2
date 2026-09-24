import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

export interface BreadcrumbItem {
  label: string;
  pageId?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (pageId: string) => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  className = ''
}) => {
  const handleItemClick = (e: React.MouseEvent, pageId?: string) => {
    e.preventDefault();
    if (pageId && onNavigate) {
      cosmicAudio.playChime(640, 0.2);
      onNavigate(pageId);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-1.5 text-xs text-[#94a3b8] ${className}`}
    >
      {/* Root Home Item */}
      <button
        type="button"
        onClick={(e) => handleItemClick(e, 'home')}
        className="inline-flex items-center space-x-1.5 py-1 px-2.5 rounded-lg bg-[#121630]/60 hover:bg-[#1c224a] text-[#cbd5e1] hover:text-[#ffd700] border border-[#262e5b]/60 transition-all font-sans"
        title="Go to Sanctuary Home"
      >
        <Home className="w-3.5 h-3.5 text-[#ffd700]" />
        <span className="font-medium">Sanctuary Home</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1 || item.active;

        return (
          <React.Fragment key={`${item.label}-${idx}`}>
            <ChevronRight className="w-3.5 h-3.5 text-[#475569] shrink-0" />

            {isLast || !item.pageId ? (
              <span
                className="py-1 px-2.5 rounded-lg bg-[#181d3d]/50 text-[#ffd700] font-semibold border border-[#d4af37]/30 tracking-wide font-sans shadow-sm"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={(e) => handleItemClick(e, item.pageId)}
                className="py-1 px-2 rounded-lg hover:bg-[#161a36] text-[#cbd5e1] hover:text-[#fef08a] transition-colors font-medium font-sans"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
