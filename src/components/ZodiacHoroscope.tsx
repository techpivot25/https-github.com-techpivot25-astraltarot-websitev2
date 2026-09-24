import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { ZodiacSign } from '../types';
import { Sparkles, Heart, Briefcase, Activity, Compass, Flame, Droplets, Wind, Mountain, Palette } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface ZodiacHoroscopeProps {
  onSelectCompanionCard?: (cardName: string) => void;
  onNavigate?: (page: string) => void;
}

export const ZodiacHoroscope: React.FC<ZodiacHoroscopeProps> = ({ 
  onSelectCompanionCard: _onSelectCompanionCard,
  onNavigate 
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);

  const getElementBadge = (element: string) => {
    switch (element) {
      case 'Fire':
        return (
          <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <Flame className="w-3 h-3" /> <span>Fire Element</span>
          </span>
        );
      case 'Water':
        return (
          <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            <Droplets className="w-3 h-3" /> <span>Water Element</span>
          </span>
        );
      case 'Air':
        return (
          <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-500/40">
            <Wind className="w-3 h-3" /> <span>Air Element</span>
          </span>
        );
      case 'Earth':
        return (
          <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <Mountain className="w-3 h-3" /> <span>Earth Element</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="horoscope" className="py-16 sm:py-20 bg-gradient-to-b from-[#070810] via-[#0d1024] to-[#080914] relative border-t border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Planetary Transits & Constellations</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Daily Zodiac <span className="gold-text-gradient">Horoscopes</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Select your sun or rising sign to uncover today's planetary alignments, signature colors, romantic currents, and companion tarot archetype.
          </p>
        </div>

        {/* 12 Zodiac Wheel Buttons - Each with its distinct horoscope color theme */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5 mb-10">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            const theme = sign.colorTheme;

            return (
              <button
                key={sign.id}
                onClick={() => {
                  setSelectedSign(sign);
                  cosmicAudio.playChime(580, 0.35);
                }}
                className={`group relative p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? `zodiac-btn-active ${theme.activeTextColor} shadow-xl scale-105 font-bold ring-2 ring-white/60 z-10`
                    : `bg-[#121528] text-[#cbd5e1] border border-[#232747] ${theme.borderHover} hover:scale-[1.03]`
                }`}
                style={
                  isSelected 
                    ? { 
                        background: theme.emblemBg, 
                        boxShadow: `0 12px 28px -4px ${theme.glowColor}`,
                        color: theme.activeTextColor === 'text-white' ? '#ffffff' : '#07080f'
                      } 
                    : {}
                }
                title={`${sign.name}: ${theme.name} (${theme.meaning})`}
              >
                {/* Zodiac Symbol Emblem Container styled in the sign's specific color */}
                <div
                  className={`zodiac-symbol-badge w-10 h-10 rounded-xl flex items-center justify-center text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-110 shadow-xs ${
                    isSelected
                      ? 'bg-black/25 text-current backdrop-blur-xs ring-1 ring-white/30'
                      : `${theme.unselectedIconBg} border`
                  }`}
                  style={!isSelected ? { borderColor: theme.themeHex } : {}}
                >
                  <span className="font-serif leading-none">{sign.symbol}</span>
                </div>

                <span className="text-xs font-serif font-semibold truncate max-w-full">{sign.name}</span>
                <span className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-current/85' : 'text-[#94a3b8]'}`}>
                  {sign.dateRange.split(' - ')[0]}
                </span>

                {/* Subtle bottom indicator dot showing sign's color */}
                {!isSelected && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full mt-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: theme.themeHex }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Horoscope Display Box with Active Sign Theme Accents */}
        <div 
          className="rounded-3xl bg-[#101328]/90 backdrop-blur-md border-2 p-6 sm:p-10 shadow-2xl transition-colors duration-500"
          style={{ borderColor: `${selectedSign.colorTheme.themeHex}60` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sign Identity Card with Custom Color Emblem */}
            <div 
              className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-[#171b38] to-[#0f1226] border shadow-inner flex flex-col items-center text-center space-y-4 transition-all duration-500"
              style={{ borderColor: `${selectedSign.colorTheme.themeHex}40` }}
            >
              {/* Dual-Ring Emblem Circle (Referenced in user's image) */}
              <div 
                className="zodiac-main-emblem relative p-1.5 rounded-full shadow-2xl transition-all duration-500"
                style={{
                  background: selectedSign.colorTheme.emblemBg,
                  boxShadow: `0 0 35px -2px ${selectedSign.colorTheme.glowColor}`
                }}
              >
                <div 
                  className="w-20 h-20 rounded-full bg-[#0a0c18] flex items-center justify-center text-4xl shadow-inner border-2"
                  style={{ borderColor: selectedSign.colorTheme.emblemBorder }}
                >
                  <span 
                    className="drop-shadow-md font-serif"
                    style={{ color: selectedSign.colorTheme.themeHex }}
                  >
                    {selectedSign.symbol}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedSign.name}
                </h3>
                <p className="text-xs text-[#fef08a] font-medium tracking-wide mt-1 font-sans">
                  {selectedSign.dateRange}
                </p>
              </div>

              {/* Signature Zodiac Color Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shadow-xs transition-all max-w-full"
                style={{
                  backgroundColor: `${selectedSign.colorTheme.themeHex}18`,
                  borderColor: `${selectedSign.colorTheme.themeHex}55`,
                  color: selectedSign.colorTheme.themeHex
                }}
              >
                <Palette className="w-3.5 h-3.5 shrink-0" />
                <span className="font-semibold">{selectedSign.colorTheme.name}</span>
                <span className="text-[10px] opacity-80 font-normal hidden sm:inline truncate">
                  ({selectedSign.colorTheme.meaning})
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {getElementBadge(selectedSign.element)}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1e2348] text-[#cbd5e1] border border-[#3b4379]">
                  Ruler: {selectedSign.planet}
                </span>
              </div>

              {/* Cosmic Stats with Lucky Color details */}
              <div className="w-full grid grid-cols-2 gap-2 pt-4 border-t border-[#232747] text-left text-xs">
                <div className="p-2.5 rounded-lg bg-[#0b0d1e] border border-[#1f244a]">
                  <span className="text-[#94a3b8] block text-[10px] uppercase">Lucky Number</span>
                  <strong className="text-lg font-serif text-[#ffd700]">{selectedSign.luckyNumber}</strong>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0b0d1e] border border-[#1f244a]">
                  <span className="text-[#94a3b8] block text-[10px] uppercase">Zodiac Color</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/30" 
                      style={{ background: selectedSign.colorTheme.emblemBg }} 
                    />
                    <strong className="text-xs font-serif text-white truncate block">
                      {selectedSign.colorTheme.name}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Companion Tarot Card Box */}
              <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#20183b] to-[#161c3b] border border-[#d4af37]/30 text-left">
                <span className="text-[10px] text-[#fef08a] uppercase tracking-widest font-bold block mb-1">
                  Ruling Tarot Archetype
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-white">
                    {selectedSign.companionCard}
                  </span>
                  <Compass className="w-4 h-4 text-[#ffd700]" />
                </div>
              </div>
            </div>

            {/* Right Horoscope Text Panels */}
            <div className="lg:col-span-8 space-y-5">
              {/* General Cosmic Forecast */}
              <div 
                className="p-5 rounded-2xl bg-[#141833]/80 border transition-all duration-300"
                style={{ borderColor: `${selectedSign.colorTheme.themeHex}40` }}
              >
                <div className="flex items-center space-x-2 text-sm font-semibold mb-2 font-serif"
                  style={{ color: selectedSign.colorTheme.themeHex }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Today's Cosmic Energy & Vibe: {selectedSign.vibe}</span>
                </div>
                <p className="text-sm sm:text-base text-white leading-relaxed font-sans">
                  {selectedSign.horoscope.general}
                </p>
              </div>

              {/* Pillars: Love, Career, Wellness */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Love */}
                <div className="p-4 rounded-xl bg-[#13162b] border border-[#f43f5e]/30">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 font-sans">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Romance & Union</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {selectedSign.horoscope.love}
                  </p>
                </div>

                {/* Career */}
                <div className="p-4 rounded-xl bg-[#13162b] border border-[#38bdf8]/30">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 font-sans">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Career & Wealth</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {selectedSign.horoscope.career}
                  </p>
                </div>

                {/* Wellness */}
                <div className="p-4 rounded-xl bg-[#13162b] border border-[#34d399]/30">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-sans">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Mind & Vitality</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {selectedSign.horoscope.wellness}
                  </p>
                </div>
              </div>

              {/* Astrotarot Integration Tip with Direct Portal Action */}
              <div className="p-4 rounded-2xl bg-[#090b16] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <strong className="text-white block font-serif">Astrotarot Tip for {selectedSign.name}:</strong>
                  <span className="text-[#94a3b8]">
                    Carry the energy of {selectedSign.companionCard} throughout your day to amplify intuition and divine protection.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    cosmicAudio.playChime(640, 0.4);
                    if (onNavigate) {
                      onNavigate('daily');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1e244d] hover:bg-[#283063] text-[#fef08a] font-semibold border border-[#d4af37]/30 transition-all shrink-0 cursor-pointer"
                >
                  Draw Tarot Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
