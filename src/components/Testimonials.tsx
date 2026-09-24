import React from 'react';
import { SEEKER_REVIEWS } from '../data/servicesData';
import { Sparkles, Star, Quote, ShieldCheck, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#070810] via-[#0c0e22] to-[#080914] relative border-b border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Real Seeker Journeys</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Loved By Seekers <span className="gold-text-gradient">Across India & The World</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Read authentic experiences from individuals whose relationships, careers, and spiritual trajectories were illuminated by Astral Tarot 24.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SEEKER_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-3xl bg-[#11142b]/90 border border-[#24294a] hover:border-[#d4af37]/40 shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#ffd700]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffd700]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#64748b]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed italic mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#232747] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{rev.author}</h4>
                  <span className="text-[11px] text-[#94a3b8] flex items-center gap-1 font-sans">
                    <MapPin className="w-3 h-3 text-[#d4af37]" /> {rev.location}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1b2040] text-[#a5b4fc] border border-[#2e376a]">
                  {rev.service.split(' (')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional 2 reviews in wide row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEEKER_REVIEWS.slice(3, 5).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#0d1024] border border-[#1e2348] flex items-start space-x-4 text-left"
            >
              <Quote className="w-8 h-8 text-[#d4af37]/40 shrink-0 mt-1" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex text-[#ffd700]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">• {rev.location}</span>
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed italic mb-2">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="flex justify-between items-center text-xs">
                  <strong className="text-white font-serif">{rev.author}</strong>
                  <span className="text-[10px] text-[#fef08a]">{rev.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
