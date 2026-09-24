import React from 'react';
import { SERVICE_PACKAGES } from '../data/servicesData';
import { ServicePackage } from '../types';
import { 
  Sparkles, Check, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { useTranslation } from '../context/LanguageContext';

interface ServicesAndBookingProps {
  onOpenBooking?: (packageId?: string) => void;
  preselectedPackageId?: string;
  preselectedReaderId?: string;
}

export const ServicesAndBooking: React.FC<ServicesAndBookingProps> = ({
  onOpenBooking
}) => {
  const { t } = useTranslation();

  const handlePackageClick = (pkg: ServicePackage) => {
    cosmicAudio.playChime(720, 0.4);
    if (onOpenBooking) {
      onOpenBooking(pkg.id);
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-gradient-to-b from-[#080914] via-[#0d1024] to-[#080914] relative border-b border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>24/7 Certified Spiritual Consultations</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Consultation <span className="gold-text-gradient">Services & Pricing</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Choose your sacred session format. Private, 100% confidential audio/video readings with our certified master mystics.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SERVICE_PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#181d3d] via-[#10142c] to-[#0a0d1e] border-2 border-[#ffd700] shadow-2xl cosmic-glow scale-105 z-10'
                    : 'bg-[#0e1124] border border-[#232747] hover:border-[#ffd700]/50 hover:bg-[#12152b]'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${
                        isPopular
                          ? 'bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f]'
                          : 'bg-[#1b2042] text-[#fef08a] border border-[#d4af37]/40'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-center pt-2 pb-4 border-b border-[#232747]">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-1.5 text-xs text-[#a5b4fc] mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{pkg.duration} Live Consultation</span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-center space-x-2">
                      <span className="font-serif font-extrabold text-3xl sm:text-4xl text-[#fef08a]">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-[#94a3b8] line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium block mt-1">
                      Save ₹{parseInt(pkg.originalPrice.replace(/\D/g, '')) - parseInt(pkg.price.replace(/\D/g, ''))} Today
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#cbd5e1] leading-relaxed my-5 font-sans">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] uppercase font-serif tracking-wider text-[#94a3b8] block">
                      Included in Session:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-[#cbd5e1]">
                          <Check className="w-3.5 h-3.5 text-[#ffd700] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Booking Navigation Action */}
                <button
                  type="button"
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                    isPopular
                      ? 'bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] hover:scale-105 active:scale-95 shadow-[#d4af37]/30'
                      : 'bg-[#1a1e3b] text-[#fef08a] hover:bg-[#252a54] border border-[#d4af37]/30 hover:border-[#ffd700]'
                  }`}
                >
                  <span>Book Session Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 100% Satisfaction & Security Banner */}
        <div className="rounded-2xl bg-[#0e1124] border border-[#232747] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-[#ffd700] shrink-0" />
            <div>
              <strong className="text-white block font-serif text-sm">Astral Tarot 24 Sanctity Guarantee</strong>
              <span>If your reader does not connect with your energetic aura within the first 5 minutes, we reschedule or refund with zero hassle.</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3 py-1 rounded bg-[#161a36] text-[#cbd5e1] border border-[#293166]">SSL 256-bit Encrypted</span>
            <span className="px-3 py-1 rounded bg-[#161a36] text-[#fef08a] border border-[#293166]">UPI • Cards • NetBanking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
