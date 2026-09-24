import React from 'react';
import { Sparkles, Compass, Shield, Users, Star, ArrowRight, Eye } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { useTranslation } from '../context/LanguageContext';

interface HeroProps {
  onScrollToDaily: () => void;
  onScrollToSpreads: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToDaily,
  onScrollToSpreads,
  onOpenBooking
}) => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Nebula glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366f1]/12 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#d4af37]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[110px]" />

        {/* Constellation & Twinkling Stars */}
        <div className="absolute top-12 left-10 w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-twinkle" />
        <div className="absolute top-32 right-20 w-2 h-2 rounded-full bg-[#ffd700] animate-twinkle-delay-1" />
        <div className="absolute top-64 left-1/3 w-1 h-1 rounded-full bg-white animate-twinkle-delay-2" />
        <div className="absolute bottom-20 left-16 w-2 h-2 rounded-full bg-[#c084fc] animate-twinkle" />
        <div className="absolute bottom-32 right-32 w-1.5 h-1.5 rounded-full bg-[#67e8f9] animate-twinkle-delay-1" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1b1f3b]/80 border border-[#d4af37]/35 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="text-xs font-medium text-[#fef08a] tracking-wide uppercase font-sans">
                {t('hero.badge', 'Official Domain: www.astraltarot24.in')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
              {t('hero.title1', 'Unlock Your')} <br className="hidden sm:inline" />
              <span className="gold-text-gradient drop-shadow-lg">
                {t('hero.title2', 'Spiritual Potential')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#cbd5e1] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {t('hero.subtitle', 'Welcome to Astral Tarot 24. Step into a realm of illuminated clarity, 24/7 live psychic divination, precision Vedic astrology, and transformative tarot spreads.')}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  cosmicAudio.playChime(640, 0.5);
                  onScrollToDaily();
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center space-x-2.5"
              >
                <Eye className="w-5 h-5 text-[#07080f]" />
                <span>{t('hero.drawToday', "Draw Your Daily Card")}</span>
                <ArrowRight className="w-4 h-4 text-[#07080f]" />
              </button>

              <button
                onClick={() => {
                  cosmicAudio.playChime(768, 0.5);
                  onScrollToSpreads();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#13162b] border border-[#d4af37]/40 text-[#fef08a] font-semibold text-sm sm:text-base hover:bg-[#1a1f3d] hover:border-[#ffd700] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4 text-[#ffd700]" />
                <span>{t('hero.exploreTarot', 'Explore Tarot Spreads')}</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-8 border-t border-[#232747]/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="p-3 rounded-lg bg-[#0e1124]/60 border border-[#232747]/40">
                <div className="flex items-center space-x-1.5 text-[#ffd700] font-bold text-lg sm:text-xl font-serif">
                  <Users className="w-4 h-4" />
                  <span>50K+</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{t('hero.statReadings', 'Seekers Guided')}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1124]/60 border border-[#232747]/40">
                <div className="flex items-center space-x-1.5 text-[#ffd700] font-bold text-lg sm:text-xl font-serif">
                  <Star className="w-4 h-4 fill-[#ffd700]" />
                  <span>99.4%</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{t('hero.statRating', 'Verified Accuracy')}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1124]/60 border border-[#232747]/40">
                <div className="flex items-center space-x-1.5 text-[#ffd700] font-bold text-lg sm:text-xl font-serif">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-0.5" />
                  <span>24 / 7</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{t('hero.statSupport', 'Master Readers')}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1124]/60 border border-[#232747]/40">
                <div className="flex items-center space-x-1.5 text-[#ffd700] font-bold text-lg sm:text-xl font-serif">
                  <Shield className="w-4 h-4" />
                  <span>100%</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{t('booking.guarantee', '100% Confidential')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visualizer Preview Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141833] via-[#0e1126] to-[#080a18] border-2 border-[#d4af37]/40 shadow-2xl cosmic-glow flex flex-col items-center text-center">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-[#07080f] font-bold text-xs rounded-full uppercase tracking-wider shadow-md">
                Live Portal
              </div>

              {/* Decorative Compass Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2a1b4e] to-[#121528] border border-[#ffd700]/40 flex items-center justify-center mb-4 shadow-inner">
                <Sparkles className="w-8 h-8 text-[#ffd700] animate-pulse" />
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2">
                Daily Astral Oracle
              </h3>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mb-6 leading-relaxed">
                Connect with the cosmic consciousness. Focus on your heart\'s question and pull a sacred card from the 78-card celestial deck.
              </p>

              {/* Glowing Interactive Deck Stack */}
              <div
                onClick={() => {
                  cosmicAudio.playCardFlip();
                  onScrollToDaily();
                }}
                className="relative w-40 h-60 sm:w-48 sm:h-72 cursor-pointer group mb-6 transition-transform hover:scale-105"
              >
                {/* Simulated Stack layers */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#8b5cf6] opacity-30 blur-md group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-2 left-2 w-full h-full rounded-2xl bg-[#090b16] border border-[#303866]" />
                <div className="absolute top-1 left-1 w-full h-full rounded-2xl bg-[#0e1124] border border-[#3e4882]" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#151a36] via-[#0e1126] to-[#080a18] border-2 border-[#ffd700] flex flex-col items-center justify-between p-4 shadow-2xl group-hover:border-[#fff5d0]">
                  <span className="text-[10px] text-[#ffd700] uppercase tracking-widest font-serif">Astral Tarot 24</span>
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#ffd700]/60 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#fef08a]" />
                  </div>
                  <span className="text-[10px] text-[#a5b4fc] tracking-wider uppercase font-sans animate-pulse">
                    ✨ Click to Draw ✨
                  </span>
                </div>
              </div>

              {/* Booking Shortcut */}
              <div className="w-full pt-4 border-t border-[#232747]/80 flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Need 1-on-1 guidance?</span>
                <button
                  onClick={onOpenBooking}
                  className="text-[#fef08a] hover:text-white font-semibold underline underline-offset-4 decoration-[#d4af37]"
                >
                  Book Live Reader →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
