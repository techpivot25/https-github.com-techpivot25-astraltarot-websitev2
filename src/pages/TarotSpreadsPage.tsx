import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { TarotSpreads } from '../components/TarotSpreads';
import { Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface TarotSpreadsPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const TarotSpreadsPage: React.FC<TarotSpreadsPageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Divination Altars"
        title="Sacred Tarot Spreads"
        highlightedTitle="& Arcana Chamber"
        badge="Multi-Card Sacred Geometries"
        description="Select your chosen inquiry spread: 3-Card Temporal Flow (Past, Present, Future), 5-Card Cross of Truth, 7-Card Horseshoe, or the Master 10-Card Celtic Cross. Shuffle and reveal deep subconscious currents."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Tarot Spreads Component */}
      <TarotSpreads onOpenBooking={onOpenBooking} />

      {/* Spread Architectural Foundations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#171b38] flex items-center justify-center text-[#ffd700]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-white">Card Positional Synthesis</h4>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Cards in a spread do not speak in isolation. Notice how elemental affinities (Fire, Water, Air, Earth) interact between adjacent positions to indicate harmony or friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#171b38] flex items-center justify-center text-[#ffd700]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-white">Major vs. Minor Dominance</h4>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              A high concentration of Major Arcana indicates fated, soul-level evolutionary cycles, whereas Minor Arcana cards reflect daily circumstances and personal choices under your control.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#171b38] flex items-center justify-center text-[#ffd700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-white">Karmic Free Will</h4>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              The outcome card depicts the most probable trajectory if current thought patterns and energetic momentum persist. Shifting your consciousness immediately alters future potential.
            </p>
          </div>
        </div>

        {/* CTA to Consult a Master Reader */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#141838] via-[#1a1438] to-[#121630] border border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-white">Need a Certified Mystic to Interpret?</h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">
              Consult directly with our verified Tarot grandmasters for deeper psychic and astrological clarity.
            </p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChime(640, 0.4);
              onOpenBooking();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-[#07080f]" />
            <span>Book Private Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#07080f]" />
          </button>
        </div>
      </section>
    </div>
  );
};
