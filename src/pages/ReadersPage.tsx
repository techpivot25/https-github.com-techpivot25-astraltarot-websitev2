import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CertifiedReaders } from '../components/CertifiedReaders';
import { CertifiedReader } from '../types';
import { Sparkles, ShieldCheck, Award, HeartHandshake, PhoneCall, Calendar } from 'lucide-react';
import { OFFICIAL_MOBILE, OFFICIAL_APPOINTMENT_EMAIL, LEAD_TRIGGER_EMAIL } from '../lib/leadService';

interface ReadersPageProps {
  onNavigate: (page: string) => void;
  onSelectReader: (reader: CertifiedReader) => void;
  onOpenBooking: () => void;
}

export const ReadersPage: React.FC<ReadersPageProps> = ({
  onNavigate,
  onSelectReader,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Master Mystics"
        title="Certified Master Mystics &"
        highlightedTitle="Spiritual Guides"
        badge="100% Verified Credentials"
        description="Meet India's preeminent Tarot Readers, Vedic Jyotish Acharyas, Clairvoyants, and Numerologists. Filter by specialization, explore authentic seeker ratings, and book your private consultation."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={onOpenBooking}
      />

      {/* Main Certified Readers Component */}
      <CertifiedReaders onSelectReader={onSelectReader} />

      {/* Reader Credentialing & Code of Ethics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1124] border border-[#232747] space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              The Astral Tarot 24 Mystic Pledge
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] mt-2">
              Every advisor on our platform undergoes a multi-month vetting process, background audit, and continuous seeker feedback evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-[#ffd700] font-semibold text-sm">
                <Award className="w-4 h-4" />
                <span>10+ Years Proven Lineage</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                We only accept practitioners with demonstrated mastery in classical Rider-Waite-Smith, Thoth, or Vedic Parashari traditions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Fear-Based Predictions</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                Our mystics are strictly committed to empowering, constructive guidance. We do not sell fear-based superstitions, curses, or deceptive upselling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-pink-400 font-semibold text-sm">
                <HeartHandshake className="w-4 h-4" />
                <span>Compassionate Sanctuary</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                Whether seeking closure from grief, clarity during career upheaval, or love healing, our readers hold non-judgmental space for your journey.
              </p>
            </div>
          </div>

          {/* Quick Helpline Support */}
          <div className="pt-4 border-t border-[#1e2447] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-[#cbd5e1]">
              Need help selecting the right reader for your situation?
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`tel:+91${OFFICIAL_MOBILE}`}
                className="text-[#ffd700] font-semibold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 {OFFICIAL_MOBILE}</span>
              </a>
              <span className="text-[#475569]">•</span>
              <a
                href={`mailto:${OFFICIAL_APPOINTMENT_EMAIL}`}
                className="text-[#cbd5e1] hover:text-white"
              >
                {OFFICIAL_APPOINTMENT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
