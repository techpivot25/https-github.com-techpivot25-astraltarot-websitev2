import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ZodiacHoroscope } from '../components/ZodiacHoroscope';
import { Sparkles, Calendar, Compass, Flame, Droplets, Wind, Mountain, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface HoroscopePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const HoroscopePage: React.FC<HoroscopePageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Vedic & Western Astrology"
        title="Daily 12 Zodiac"
        highlightedTitle="Horoscopes & Planetary Forecast"
        badge="Calculated Every Sunrise"
        description="Daily astrological transits, planetary rulers, companion tarot archetypes, lucky numbers, and love-career compatibility for all 12 sun and moon signs."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Horoscope Component */}
      <ZodiacHoroscope onNavigate={onNavigate} />

      {/* Elemental Astrological Alchemy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="font-serif font-bold text-2xl text-white">
            The 4 Primordial Zodiac Elements
          </h3>
          <p className="text-xs sm:text-sm text-[#cbd5e1] mt-1">
            Every sign belongs to an elemental triplicity governing personality, motivation, and spiritual instinct.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-[#140e14] border border-amber-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400">
              <Flame className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Fire Signs</h4>
            </div>
            <p className="text-[11px] font-mono text-[#fef08a]">Aries • Leo • Sagittarius</p>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Passionate, dynamic, and intuitive initiators. Fueled by enthusiasm, courage, and divine inspiration.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1411] border border-emerald-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Mountain className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Earth Signs</h4>
            </div>
            <p className="text-[11px] font-mono text-emerald-300">Taurus • Virgo • Capricorn</p>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Grounded, practical, and patient builders. Masters of manifestation, material stability, and persistent mastery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e121e] border border-sky-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400">
              <Wind className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Air Signs</h4>
            </div>
            <p className="text-[11px] font-mono text-sky-300">Gemini • Libra • Aquarius</p>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Intellectual, communicative, and visionary connectors. Driven by ideas, philosophy, social synthesis, and harmony.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#101026] border border-indigo-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Droplets className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Water Signs</h4>
            </div>
            <p className="text-[11px] font-mono text-indigo-300">Cancer • Scorpio • Pisces</p>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Empathetic, psychic, and deeply emotional healers. Guided by gut instinct, ancestral memory, and mystical depths.
            </p>
          </div>
        </div>

        {/* Cross link to Birth Chart */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#141838] via-[#1a1438] to-[#121630] border border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-white">Know Beyond Your Sun Sign?</h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">
              Calculate your exact Ascendant (Rising Sign), Moon placement, and 12-house natal geometry.
            </p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChime(640, 0.4);
              onNavigate('birthchart');
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#07080f]" />
            <span>Open Birth Chart Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#07080f]" />
          </button>
        </div>
      </section>
    </div>
  );
};
