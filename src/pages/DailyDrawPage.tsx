import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DailyCardDrawer } from '../components/DailyCardDrawer';
import { Sparkles, BookOpen, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface DailyDrawPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const DailyDrawPage: React.FC<DailyDrawPageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Divination Altars"
        title="Daily Tarot Card"
        highlightedTitle="Draw & Meditation"
        badge="24/7 Daily Soul Guidance"
        description="Ground your morning prana and draw a celestial card from the 78 Sacred Arcana. Reveal planetary transits, elemental associations, upright and reversed wisdom for today."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Altar Component */}
      <DailyCardDrawer onOpenBooking={onOpenBooking} />

      {/* Ritual Guide & Deeper Practices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Morning Sacred Breathing</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Take three deep breaths before pressing the Shuffle Altar button. Focus your mind on a single intention, letting subconscious symbols flow effortlessly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Upright vs. Reversed</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Reversed cards are not negative omens; they represent internal reflections, subconscious blockages, or lessons requiring your gentle awareness today.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Evening Journaling</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              At dusk, return to your card's affirmation. Reflect on how its archetypal energy materialized through conversations, synchronous events, and dreams.
            </p>
          </div>
        </div>

        {/* Cross Link to Spreads */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#121633] via-[#1a1738] to-[#121633] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-white">Seeking Multi-Card Clarity?</h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">
              Explore our 3-Card Timeline, 5-Card Cross of Truth, or 10-Card Celtic Cross spread rooms.
            </p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChime(640, 0.4);
              onNavigate('spreads');
            }}
            className="px-6 py-3 rounded-xl bg-[#1e244d] hover:bg-[#283066] text-[#fef08a] border border-[#d4af37]/40 font-semibold text-xs flex items-center gap-2 transition-all shrink-0"
          >
            <Compass className="w-4 h-4 text-[#ffd700]" />
            <span>Open Tarot Spreads</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ffd700]" />
          </button>
        </div>
      </section>
    </div>
  );
};
