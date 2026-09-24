import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { OracleAskAI } from '../components/OracleAskAI';
import { Sparkles, MessageSquare, Compass, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface OraclePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const OraclePage: React.FC<OraclePageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Spiritual Divination"
        title="Ask the Astral Oracle"
        highlightedTitle="& Celestial Seer"
        badge="Direct Cosmic Inquiry"
        description="Whisper your soul inquiry regarding romance, financial destiny, or career transitions. The Oracle channels timeless metaphysical archetypes, companion tarot arcana, and cosmic guidance."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Oracle Component */}
      <OracleAskAI onOpenBooking={onOpenBooking} />

      {/* Guidance for Asking the Oracle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Ask Open-Ended Questions</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Instead of binary yes/no questions ("Will I get this job?"), ask empowering inquiries ("What mindset and energy should I embody to thrive in my career interview?").
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Center on the Present</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              The Oracle mirrors your current energetic frequency. When you ask with sincere vulnerability, the archetypes mirror the exact blockages ready to be healed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1124] border border-[#232747] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181d3d] flex items-center justify-center text-[#ffd700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Honor the Divine Affirmation</h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Every Oracle reading concludes with a sacred chant or mantra. Meditate on the companion card to seal the energetic alignment into your nervous system.
            </p>
          </div>
        </div>

        {/* Cross link to Daily Card */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#121633] via-[#1a1738] to-[#121633] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-white">Prefer a Single Arcana Draw?</h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">
              Draw your daily guiding card from the 78 Arcana deck for focused morning reflection.
            </p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChime(640, 0.4);
              onNavigate('daily');
            }}
            className="px-6 py-3 rounded-xl bg-[#1e244d] hover:bg-[#283066] text-[#fef08a] border border-[#d4af37]/40 font-semibold text-xs flex items-center gap-2 transition-all shrink-0"
          >
            <Compass className="w-4 h-4 text-[#ffd700]" />
            <span>Draw Daily Card</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ffd700]" />
          </button>
        </div>
      </section>
    </div>
  );
};
