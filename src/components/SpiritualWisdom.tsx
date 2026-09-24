import React, { useState } from 'react';
import { FAQS } from '../data/servicesData';
import { Sparkles, ChevronDown, BookOpen, Moon, Flame, Compass } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

export const SpiritualWisdom: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    cosmicAudio.playChime(540, 0.2);
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const wisdomArticles = [
    {
      title: 'How Tarot Divination Works',
      category: 'Esoteric Science',
      icon: Compass,
      readTime: '3 min read',
      excerpt: 'Tarot operates on Carl Jung\'s principle of synchronicity and quantum entanglement. The cards drawn reflect your subconscious field and current planetary trajectory.'
    },
    {
      title: 'Understanding Major vs Minor Arcana',
      category: 'Tarot Fundamentals',
      icon: BookOpen,
      readTime: '4 min read',
      excerpt: 'The 22 Major Arcana represent overarching spiritual soul milestones, while the 56 Minor Arcana detail everyday earthly experiences, relationships, and decisions.'
    },
    {
      title: 'Harnessing New & Full Moon Spreads',
      category: 'Lunar Magic',
      icon: Moon,
      readTime: '5 min read',
      excerpt: 'New Moons invite manifestation and planting intentions with Pentacles and Cups; Full Moons illuminate secrets, shedding old baggage with Swords and Wands.'
    }
  ];

  return (
    <section className="py-20 bg-[#070810] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Spiritual Knowledge & Insights</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Sacred Wisdom & <span className="gold-text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Deepen your understanding of ancient divination traditions and explore common questions regarding our 24/7 online tarot readings.
          </p>
        </div>

        {/* Wisdom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {wisdomArticles.map((art, idx) => {
            const Icon = art.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#11142b]/80 border border-[#232747] hover:border-[#d4af37]/50 transition-all hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffd700] px-2.5 py-1 rounded-full bg-[#181d3d] border border-[#2f3769]">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-[#64748b]">{art.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white mb-2.5">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#cbd5e1] leading-relaxed mb-6 font-sans">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-[#fef08a] pt-3 border-t border-[#232747]/60">
                  <Icon className="w-4 h-4 text-[#ffd700]" />
                  <span>Astral Study Guide</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#101328] border-2 border-[#d4af37]/35 p-6 sm:p-10 shadow-2xl">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-6 text-center">
            Common Inquiries About Astral Tarot 24
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#090b17] border border-[#232747] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-white hover:text-[#fef08a] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ffd700] transition-transform duration-300 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed border-t border-[#1d2245] font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
