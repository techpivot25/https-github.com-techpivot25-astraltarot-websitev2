import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Compass, Award, ShieldAlert, ArrowRight } from 'lucide-react';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { cosmicAudio } from '../lib/audio';

interface AstrologyBirthChartProps {
  onOpenBooking: () => void;
}

export const AstrologyBirthChart: React.FC<AstrologyBirthChartProps> = ({ onOpenBooking }) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-07-15');
  const [birthTime, setBirthTime] = useState('14:30');
  const [birthPlace, setBirthPlace] = useState('New Delhi, India');
  const [calculated, setCalculated] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // Result state
  const [chartResult, setChartResult] = useState<{
    sunSign: typeof ZODIAC_SIGNS[0];
    moonSign: typeof ZODIAC_SIGNS[0];
    risingSign: typeof ZODIAC_SIGNS[0];
    dominantElement: string;
    lifePathArchetype: string;
    cosmicDestiny: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    cosmicAudio.playCardFlip();

    setTimeout(() => {
      // Calculate based on date
      const d = new Date(birthDate);
      const month = d.getMonth() + 1; // 1-12
      const day = d.getDate();

      // Determine Sun sign
      let sunIndex = 0;
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunIndex = 0; // Aries
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunIndex = 1; // Taurus
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunIndex = 2; // Gemini
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunIndex = 3; // Cancer
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunIndex = 4; // Leo
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunIndex = 5; // Virgo
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunIndex = 6; // Libra
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunIndex = 7; // Scorpio
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunIndex = 8; // Sagittarius
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunIndex = 9; // Capricorn
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunIndex = 10; // Aquarius
      else sunIndex = 11; // Pisces

      // Derive Moon & Rising algorithmically
      const moonIndex = (sunIndex + 4) % 12;
      const risingIndex = (sunIndex + 8) % 12;

      const sun = ZODIAC_SIGNS[sunIndex] || ZODIAC_SIGNS[0];
      const moon = ZODIAC_SIGNS[moonIndex] || ZODIAC_SIGNS[1];
      const rising = ZODIAC_SIGNS[risingIndex] || ZODIAC_SIGNS[2];

      setChartResult({
        sunSign: sun,
        moonSign: moon,
        risingSign: rising,
        dominantElement: sun.element,
        lifePathArchetype: `${sun.companionCard} & ${moon.companionCard}`,
        cosmicDestiny: `Your Sun in ${sun.name} gifts you radiant ${sun.vibe.toLowerCase()} energy, anchored by a deeply emotional ${moon.name} Moon. As you step out into the world, your ${rising.name} Ascendant projects poise and magnetic presence.`
      });

      setCalculating(false);
      setCalculated(true);
      cosmicAudio.playCelebration();
    }, 800);
  };

  return (
    <section id="birthchart" className="py-20 bg-[#080914] relative border-b border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Natal Kundli & Planetary Placements</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Celestial <span className="gold-text-gradient">Birth Chart Calculator</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Enter your exact birth parameters to calculate your sacred Sun, Moon, and Rising signs, along with your soul\'s ruling Tarot Guardian archetype.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 rounded-3xl bg-[#11142b] border-2 border-[#d4af37]/30 p-6 sm:p-8 shadow-2xl">
            <h3 className="font-serif font-bold text-xl text-white mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#ffd700]" />
              <span>Enter Birth Coordinates</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090b17] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Birth Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090b17] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Exact Time</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090b17] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Place / City of Birth</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, New Delhi, London"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090b17] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={calculating}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-sm tracking-wide shadow-lg shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className={`w-4 h-4 text-[#07080f] ${calculating ? 'animate-spin' : ''}`} />
                <span>{calculating ? 'Calculating Natal Placements...' : 'Generate Cosmic Birth Chart'}</span>
              </button>
            </form>
          </div>

          {/* Results / Visualizer Column */}
          <div className="lg:col-span-7">
            {chartResult ? (
              <div className="rounded-3xl bg-[#11142b] border-2 border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
                <div className="border-b border-[#232747] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#ffd700] uppercase font-serif tracking-widest block">
                      Natal Chart for {fullName || 'Cosmic Seeker'}
                    </span>
                    <h3 className="font-serif font-extrabold text-2xl text-white">
                      The Big Three & Soul Archetype
                    </h3>
                  </div>
                  <Award className="w-8 h-8 text-[#ffd700]" />
                </div>

                {/* Big Three Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sun */}
                  <div className="p-4 rounded-2xl bg-[#0b0c16] border border-[#ffd700]/30 text-center">
                    <span className="text-[10px] text-[#ffd700] uppercase font-bold tracking-wider block mb-1">
                      ☀️ Sun Sign
                    </span>
                    <span className="text-3xl block my-1">{chartResult.sunSign.symbol}</span>
                    <h4 className="font-serif font-bold text-white text-base">{chartResult.sunSign.name}</h4>
                    <p className="text-[10px] text-[#94a3b8] mt-1 font-sans">Core Ego & Purpose</p>
                  </div>

                  {/* Moon */}
                  <div className="p-4 rounded-2xl bg-[#0b0c16] border border-[#818cf8]/30 text-center">
                    <span className="text-[10px] text-sky-400 uppercase font-bold tracking-wider block mb-1">
                      🌙 Moon Sign
                    </span>
                    <span className="text-3xl block my-1">{chartResult.moonSign.symbol}</span>
                    <h4 className="font-serif font-bold text-white text-base">{chartResult.moonSign.name}</h4>
                    <p className="text-[10px] text-[#94a3b8] mt-1 font-sans">Subconscious Heart</p>
                  </div>

                  {/* Rising */}
                  <div className="p-4 rounded-2xl bg-[#0b0c16] border border-[#c084fc]/30 text-center">
                    <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider block mb-1">
                      🌅 Rising (Ascendant)
                    </span>
                    <span className="text-3xl block my-1">{chartResult.risingSign.symbol}</span>
                    <h4 className="font-serif font-bold text-white text-base">{chartResult.risingSign.name}</h4>
                    <p className="text-[10px] text-[#94a3b8] mt-1 font-sans">Outer Persona Mask</p>
                  </div>
                </div>

                {/* Life Path & Tarot Archetype */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#191e40] to-[#1a1438] border border-[#d4af37]/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#fef08a] font-serif font-bold">
                    <span>Ruling Tarot Guardian Cards:</span>
                    <span>{chartResult.lifePathArchetype}</span>
                  </div>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {chartResult.cosmicDestiny}
                  </p>
                </div>

                {/* Consult Reader for full Kundli */}
                <div className="p-4 rounded-2xl bg-[#080914] border border-[#232747] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-white font-bold block font-serif">Want a Full 30-Page Astrological Dossier?</span>
                    <span className="text-[#94a3b8]">Our certified Vedic astrologers cross-reference your D1, D9 Navamsha, and Mahadasha cycles.</span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2 rounded-xl bg-[#ffd700] text-[#07080f] font-bold hover:bg-yellow-400 transition-colors shrink-0"
                  >
                    Book Astro-Tarot Session
                  </button>
                </div>
              </div>
            ) : (
              /* Placeholder / Preview Wheel */
              <div className="rounded-3xl bg-[#11142b]/60 border-2 border-dashed border-[#28305c] p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#d4af37]/40 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                  <Compass className="w-12 h-12 text-[#d4af37]/60" />
                </div>
                <h4 className="font-serif font-bold text-xl text-white">Your Natal Blueprint Awaits</h4>
                <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md leading-relaxed font-sans">
                  Fill in your birth details on the left to reveal your unique cosmic trifecta (Sun, Moon, Rising) and your soul\'s dedicated Tarot Guardian.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
