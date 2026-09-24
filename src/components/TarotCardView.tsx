import React from 'react';
import { TarotCard } from '../types';
import { Sparkles, Compass, Flame, Droplets, Wind, Mountain } from 'lucide-react';

interface TarotCardViewProps {
  card?: TarotCard;
  isFlipped: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDetailsOnHover?: boolean;
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  card,
  isFlipped,
  isReversed = false,
  onClick,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-28 h-44 sm:w-32 sm:h-52 text-xs',
    md: 'w-44 h-72 sm:w-52 sm:h-84 text-sm',
    lg: 'w-56 h-88 sm:w-64 sm:h-[420px] text-base'
  }[size];

  const getElementIcon = (element?: string) => {
    switch (element) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-sky-300" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-yellow-300" />;
    }
  };

  const toRoman = (num: number) => {
    const romanMap: Record<number, string> = {
      0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII',
      9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV', 16: 'XVI',
      17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX', 21: 'XXI', 22: 'A•C', 23: 'A•P', 24: 'A•S'
    };
    return romanMap[num] || String(num);
  };

  return (
    <div
      id={`tarot-card-${card ? card.id : 'back'}`}
      onClick={onClick}
      className={`perspective-1000 relative select-none ${sizeClasses} cursor-pointer group ${className}`}
    >
      <div
        className={`w-full h-full duration-700 preserve-3d transition-transform rounded-2xl shadow-2xl relative ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK */}
        <div className="absolute inset-0 backface-hidden rounded-2xl p-2.5 bg-gradient-to-b from-[#14182e] via-[#0d1021] to-[#080a14] border-2 border-[#d4af37]/40 shadow-inner flex flex-col items-center justify-between overflow-hidden group-hover:border-[#ffd700] transition-colors">
          {/* Ornate corner flourishes */}
          <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />

          {/* Top Mystic Banner */}
          <div className="w-full flex items-center justify-between px-2 pt-1">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 font-serif">Astral</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 font-serif">Tarot 24</span>
          </div>

          {/* Central Sacred Mandala */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center my-auto">
            {/* Outer Sacred Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/50 animate-[spin_60s_linear_infinite]" />
            {/* Inner Sacred Hexagram / Star */}
            <div className="absolute inset-2 rounded-full border border-[#8b5cf6]/40 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-[#d4af37]/60 rotate-45" />
              <div className="absolute w-16 h-16 sm:w-20 sm:h-20 border border-[#d4af37]/60 rotate-12" />
            </div>
            {/* Center Mystic Eye / Sun */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#937119] via-[#facc15] to-[#fef08a] p-0.5 shadow-lg shadow-[#d4af37]/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0b0c16] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#ffd700]" />
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="w-full text-center pb-1">
            <p className="text-[9px] text-[#a5b4fc]/70 uppercase tracking-widest font-sans">
              Tap to Reveal
            </p>
          </div>
        </div>

        {/* CARD FRONT */}
        {card && (
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-2.5 bg-gradient-to-b from-[#161a33] via-[#0f1226] to-[#0a0c1a] border-2 border-[#d4af37] flex flex-col justify-between overflow-hidden shadow-2xl ${
              isReversed ? 'rotate-180' : ''
            }`}
          >
            {/* Card Frame & Corner Accents */}
            <div className="absolute inset-1.5 rounded-xl border border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ffd700]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ffd700]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ffd700]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ffd700]" />

            {/* Top Header */}
            <div className="relative z-10 flex items-center justify-between px-1 pt-1">
              <span className="font-serif font-bold text-xs tracking-widest text-[#fef08a]">
                {toRoman(card.number)}
              </span>
              <div className="flex items-center space-x-1.5 bg-[#0b0c16]/80 px-2 py-0.5 rounded-full border border-[#d4af37]/30">
                {getElementIcon(card.element)}
                <span className="text-[10px] text-[#e2e4f0] font-sans font-medium">
                  {card.astrologicalRuler}
                </span>
              </div>
            </div>

            {/* Card Illustration Visualizer */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-2 py-1">
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center relative my-2"
                style={{
                  background: `radial-gradient(circle, ${card.glowColor}25 0%, transparent 70%)`
                }}
              >
                <div
                  className="w-16 h-16 sm:w-22 sm:h-22 rounded-full border border-[#ffd700]/50 flex items-center justify-center p-3 shadow-lg"
                  style={{
                    backgroundColor: '#0c0e1e',
                    boxShadow: `0 0 20px ${card.glowColor}40`
                  }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffd700]" />
                </div>
              </div>

              {/* Card Title */}
              <h4 className="font-serif font-bold text-[#fff5d0] text-sm sm:text-base leading-tight tracking-wide drop-shadow-md">
                {card.name}
              </h4>

              {/* Upright / Reversed Badge */}
              <div className="mt-1">
                <span
                  className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    isReversed
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isReversed ? 'Reversed' : 'Upright'}
                </span>
              </div>

              {/* Keywords Preview */}
              <div className="flex flex-wrap justify-center gap-1 mt-2 max-w-[90%]">
                {card.keywords.slice(0, 3).map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] text-[#cbd5e1] bg-[#1e2348]/60 px-1.5 py-0.5 rounded border border-[#3b4379]/40"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="relative z-10 flex items-center justify-between px-1 pb-1 border-t border-[#d4af37]/20 pt-1 text-[9px] text-[#94a3b8]">
              <span>{card.arcana} Arcana</span>
              <span className="text-[#fef08a]">{card.element}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
