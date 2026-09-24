import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AstrologyBirthChart } from '../components/AstrologyBirthChart';
import { Sparkles, Calendar, Compass, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface BirthChartPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const BirthChartPage: React.FC<BirthChartPageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Vedic & Western Astrology"
        title="Natal Birth Chart"
        highlightedTitle="& Kundali Calculator"
        badge="Planetary Degrees & Ephemeris"
        description="Input your birth date, precise birth time, and birthplace to calculate your Ascendant (Lagna), Moon Sign (Rashi), Sun placement, and complete 12-house planetary configurations."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Birth Chart Component */}
      <AstrologyBirthChart onOpenBooking={onOpenBooking} />

      {/* Educational Guide: The 12 Sacred Bhavas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 rounded-3xl bg-[#0e1124] border border-[#232747] space-y-6">
          <div className="flex items-center space-x-3 text-[#ffd700]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif font-bold text-xl text-white">
              The 4 Pillars of Your Birth Chart Blueprint
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#141833] border border-[#262c54] space-y-1.5">
              <span className="text-[#ffd700] font-bold block text-sm">1. Dharma Houses (1, 5, 9)</span>
              <p className="text-[#cbd5e1] leading-relaxed">
                Governs life purpose, soul identity, divine fortune, intelligence, creativity, and spiritual destiny.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141833] border border-[#262c54] space-y-1.5">
              <span className="text-emerald-400 font-bold block text-sm">2. Artha Houses (2, 6, 10)</span>
              <p className="text-[#cbd5e1] leading-relaxed">
                Rules material wealth, profession, daily work ethic, public legacy, obstacles overcome, and economic abundance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141833] border border-[#262c54] space-y-1.5">
              <span className="text-pink-400 font-bold block text-sm">3. Kama Houses (3, 7, 11)</span>
              <p className="text-[#cbd5e1] leading-relaxed">
                Governs desires, romantic unions, marriage partnerships, creative ambition, networking, and highest social aspirations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141833] border border-[#262c54] space-y-1.5">
              <span className="text-indigo-400 font-bold block text-sm">4. Moksha Houses (4, 8, 12)</span>
              <p className="text-[#cbd5e1] leading-relaxed">
                Rules subconscious liberation, occult insight, emotional peace, ancestral karma, intuition, and transcendence.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Consultation */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#141838] via-[#1a1438] to-[#121630] border border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-white">Want a Grand Vedic Kundali Consultation?</h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">
              Schedule our comprehensive 60-min or 90-min birth chart analysis with a senior Vedic Pandit.
            </p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChime(640, 0.4);
              onNavigate('services');
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#07080f]" />
            <span>View Consultation Packages</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#07080f]" />
          </button>
        </div>
      </section>
    </div>
  );
};
