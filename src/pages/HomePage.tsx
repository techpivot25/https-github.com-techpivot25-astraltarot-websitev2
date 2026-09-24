import React from 'react';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { SpiritualWisdom } from '../components/SpiritualWisdom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CertifiedReader } from '../types';
import { 
  Sparkles, Compass, Eye, Sun, Calendar, 
  MessageSquare, ShieldCheck, ArrowRight, PhoneCall 
} from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: (packageId?: string, readerId?: string) => void;
  onSelectReader: (reader: CertifiedReader) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectReader: _onSelectReader
}) => {
  const altarPortals = [
    {
      id: 'daily',
      title: 'Daily Tarot Card Draw',
      category: 'Instant Divination',
      desc: 'Connect with the 78 Arcana deck for illuminated clarity, upright/reversed meanings, and divine advice.',
      icon: Eye,
      accent: 'from-amber-400 to-yellow-500',
      tag: 'Most Popular'
    },
    {
      id: 'spreads',
      title: 'Sacred Tarot Spreads',
      category: 'Multi-Card Altar',
      desc: '3-Card Timeline, 5-Card Cross of Truth, and comprehensive 10-Card Celtic Cross for destiny analysis.',
      icon: Compass,
      accent: 'from-yellow-400 to-amber-600',
      tag: '4 Spreads'
    },
    {
      id: 'horoscope',
      title: '12 Zodiac Horoscopes',
      category: 'Daily Celestial Guide',
      desc: 'Planetary transits, lucky numbers, love compatibility, and daily cosmic advice for every zodiac sign.',
      icon: Sun,
      accent: 'from-amber-300 to-yellow-500',
      tag: 'Updated Daily'
    },
    {
      id: 'birthchart',
      title: 'Natal Birth Chart',
      category: 'Vedic & Western Astrology',
      desc: 'Calculate your Ascendant, Moon Sign, Sun placement, and 12-house natal celestial blueprint.',
      icon: Calendar,
      accent: 'from-yellow-400 to-amber-500',
      tag: 'Free Calculator'
    },
    {
      id: 'oracle',
      title: 'Ask Astral Oracle',
      category: 'Spiritual Seer Altar',
      desc: 'Ask your profound questions regarding love, career, or soul purpose and receive channeled prophecy.',
      icon: MessageSquare,
      accent: 'from-purple-400 to-amber-400',
      tag: 'AI Oracle'
    },
    {
      id: 'services',
      title: 'Services & Pricing',
      category: '1-on-1 Consultations',
      desc: 'Private video/audio readings. Integrated with cal.com live scheduling and email triggers to astraltarot24@gmail.com.',
      icon: ShieldCheck,
      accent: 'from-emerald-400 to-yellow-400',
      tag: 'cal.com Sync'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <Hero
        onScrollToDaily={() => onNavigate('daily')}
        onScrollToSpreads={() => onNavigate('spreads')}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Sanctuary Altars Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sanctuary Breadcrumbs Ribbon */}
        <div className="mb-8 p-3 rounded-2xl bg-[#0e1124]/70 border border-[#232747]/60 shadow-xs">
          <Breadcrumbs
            items={[
              { label: 'Sanctuary Altars Directory', isCurrent: true }
            ]}
            onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            showBack={false}
          />
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1b1f3d] border border-[#d4af37]/35 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Dedicated Sacred Pages</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Explore All <span className="gold-text-gradient">Divination Altars</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Each altar in our sanctuary offers a focused, dedicated portal for your spiritual growth. Click any chamber below to enter.
          </p>
        </div>

        {/* Grid of Altar Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {altarPortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                onClick={() => {
                  cosmicAudio.playChime(720, 0.4);
                  onNavigate(portal.id);
                }}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#0e1124]/90 border border-[#232747] hover:border-[#ffd700]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/15 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#171b38] border border-[#2e3663] group-hover:border-[#d4af37]/60 flex items-center justify-center text-[#ffd700] transition-colors shadow-inner">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1b2042] text-[#fef08a] border border-[#d4af37]/30">
                      {portal.tag}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-[#a5b4fc] uppercase tracking-wider font-serif block mb-1">
                    {portal.category}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#ffd700] transition-colors mb-2">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-sans">
                    {portal.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1c2140] flex items-center justify-between text-xs font-semibold text-[#fef08a] group-hover:text-[#ffd700] transition-colors">
                  <span>Enter Dedicated Altar</span>
                  <ArrowRight className="w-4 h-4 text-[#ffd700] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact / Booking Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#141838] via-[#1a1438] to-[#121630] border-2 border-[#d4af37]/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase font-serif tracking-widest text-[#ffd700] font-bold">
              Personalized 1-on-1 Guidance
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Ready for Deep Soul Awakening?
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-xl">
              Book your private consultation with cal.com live scheduling. Instant lead dispatch to{' '}
              <strong className="text-[#ffd700]">astraltarot24@gmail.com</strong> or reach our helpline at{' '}
              <strong className="text-white">+91 8586970405</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+918586970405"
              className="px-5 py-3 rounded-xl bg-[#181d3d] hover:bg-[#202752] border border-[#2e3663] text-white text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#ffd700]" />
              <span>Call +91 8586970405</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all"
            >
              Book Sacred Reading
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Sacred Wisdom FAQs */}
      <SpiritualWisdom />
    </div>
  );
};
