import React from 'react';
import { CERTIFIED_READERS } from '../data/servicesData';
import { CertifiedReader } from '../types';
import { Sparkles, Star, Award, MessageCircle, Calendar } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface CertifiedReadersProps {
  onSelectReader: (reader: CertifiedReader) => void;
}

export const CertifiedReaders: React.FC<CertifiedReadersProps> = ({ onSelectReader }) => {
  return (
    <section id="readers" className="py-20 bg-[#070810] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Vetted High Priestesses & Astrologers</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Meet Our <span className="gold-text-gradient">Master Readers</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Every practitioner on Astral Tarot 24 has over a decade of rigorous spiritual initiation, 
            certified credentials in Western Hermeticism or Vedic Jyotish, and thousands of verified seeker consultations.
          </p>
        </div>

        {/* Readers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFIED_READERS.map((reader) => (
            <div
              key={reader.id}
              className="rounded-3xl bg-[#11142b]/90 border border-[#24294a] hover:border-[#d4af37]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
            >
              <div>
                {/* Header with Avatar and Status */}
                <div className="relative mb-5 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#c59b27] via-[#eab308] to-[#fef08a] shadow-lg mb-3">
                    <img
                      src={reader.avatar}
                      alt={reader.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                    {/* Live Online Badge */}
                    <div
                      className={`absolute bottom-0 right-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md ${
                        reader.isAvailable
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/60'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${reader.isAvailable ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                      <span>{reader.isAvailable ? 'Online' : 'In Session'}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#fef08a] transition-colors">
                    {reader.name}
                  </h3>
                  <p className="text-xs text-[#a5b4fc] font-medium font-sans mt-0.5">
                    {reader.title}
                  </p>

                  {/* Rating & Experience */}
                  <div className="flex items-center space-x-2 mt-2 text-xs">
                    <span className="flex items-center text-[#ffd700] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#ffd700] mr-1" />
                      {reader.rating}
                    </span>
                    <span className="text-[#64748b]">•</span>
                    <span className="text-[#cbd5e1]">{reader.reviewCount} Reviews</span>
                  </div>
                </div>

                {/* Specialty Pill */}
                <div className="p-2.5 rounded-xl bg-[#090b17] border border-[#1e2348] text-center mb-4">
                  <span className="text-[10px] text-[#94a3b8] block uppercase tracking-wider font-serif">Specialty Focus</span>
                  <span className="text-xs font-semibold text-[#fef08a]">{reader.specialty}</span>
                </div>

                <p className="text-xs text-[#cbd5e1] leading-relaxed mb-4 line-clamp-3">
                  {reader.bio}
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {reader.languages.map((lang, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#191e40] text-[#cbd5e1] border border-[#2d3566]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  cosmicAudio.playChime(768, 0.4);
                  onSelectReader(reader);
                }}
                className="w-full py-2.5 rounded-xl bg-[#1a1e3b] hover:bg-gradient-to-r hover:from-[#c59b27] hover:to-[#eab308] text-[#fef08a] hover:text-[#07080f] font-bold text-xs tracking-wide border border-[#d4af37]/30 transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book with {reader.name.split(' ')[1] || reader.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
