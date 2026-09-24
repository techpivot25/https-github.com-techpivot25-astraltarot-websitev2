import React, { useState } from 'react';
import { TarotCard } from '../types';
import { TAROT_DECK, SPREAD_CONFIGS } from '../data/tarotDeck';
import { TarotCardView } from './TarotCardView';
import { Sparkles, RefreshCw, Eye, CheckCircle2, Heart, Briefcase, HelpCircle, ArrowRight, Compass } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import confetti from 'canvas-confetti';

interface TarotSpreadsProps {
  onOpenBooking: () => void;
}

interface DrawnSpreadCard {
  card: TarotCard;
  isFlipped: boolean;
  isReversed: boolean;
  positionTitle: string;
  positionDesc: string;
}

export const TarotSpreads: React.FC<TarotSpreadsProps> = ({ onOpenBooking }) => {
  const [activeSpreadKey, setActiveSpreadKey] = useState<string>('three');
  const [spreadCards, setSpreadCards] = useState<DrawnSpreadCard[]>([]);
  const [isDealing, setIsDealing] = useState<boolean>(false);
  const [selectedSpreadCard, setSelectedSpreadCard] = useState<DrawnSpreadCard | null>(null);

  const currentConfig = SPREAD_CONFIGS[activeSpreadKey] || SPREAD_CONFIGS.three;

  const dealSpread = (spreadKey = activeSpreadKey) => {
    setIsDealing(true);
    setSelectedSpreadCard(null);
    cosmicAudio.playCardFlip();

    const config = SPREAD_CONFIGS[spreadKey] || SPREAD_CONFIGS.three;

    // Shuffle and pick unique cards
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const pickedCards = shuffled.slice(0, config.cardCount);

    const initialCards: DrawnSpreadCard[] = pickedCards.map((card, idx) => ({
      card,
      isFlipped: false,
      isReversed: Math.random() > 0.8,
      positionTitle: config.positions[idx]?.title || `Position ${idx + 1}`,
      positionDesc: config.positions[idx]?.description || ''
    }));

    setSpreadCards(initialCards);

    // Staggered dealing flip
    setTimeout(() => {
      setIsDealing(false);
      cosmicAudio.playChime(640, 0.5);
    }, 400);
  };

  const flipCard = (index: number) => {
    setSpreadCards((prev) => {
      const updated = [...prev];
      const target = updated[index];
      if (target) {
        target.isFlipped = !target.isFlipped;
        if (target.isFlipped) {
          cosmicAudio.playCardFlip();
          setSelectedSpreadCard(target);
        }
      }
      return updated;
    });
  };

  const revealAll = () => {
    cosmicAudio.playCelebration();
    setSpreadCards((prev) =>
      prev.map((c) => ({
        ...c,
        isFlipped: true
      }))
    );
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  // Elemental calculation
  const elementCounts = spreadCards.reduce(
    (acc, curr) => {
      if (curr.isFlipped) {
        acc[curr.card.element] = (acc[curr.card.element] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <section id="spreads" className="py-20 bg-[#070810] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Sacred Divination Altars</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Comprehensive <span className="gold-text-gradient">Tarot Spreads</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Choose your altar layout below. Each spread positions the cards into specific cosmic intersections to illuminate timelines, soulmate affinities, and life crossroads.
          </p>
        </div>

        {/* Spread Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { key: 'three', label: 'Past • Present • Future', icon: Compass },
            { key: 'love', label: 'Love & Soulmate', icon: Heart },
            { key: 'career', label: 'Career & Wealth', icon: Briefcase },
            { key: 'celtic', label: 'Celtic Cross (10 Cards)', icon: Sparkles }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeSpreadKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSpreadKey(item.key);
                  dealSpread(item.key);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] shadow-lg shadow-[#d4af37]/30 scale-105'
                    : 'bg-[#121528] text-[#cbd5e1] hover:text-white hover:bg-[#1b203d] border border-[#232747]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spread Altar Mat */}
        <div className="rounded-3xl bg-gradient-to-b from-[#11142b] via-[#0b0d1e] to-[#070914] border-2 border-[#d4af37]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Altar Corner Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/50" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/50" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/50" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/50" />

          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#232747] mb-8">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#fef08a] flex items-center gap-2">
                <span>{currentConfig.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1b2040] text-[#cbd5e1] border border-[#3b4379]">
                  {currentConfig.cardCount} Cards
                </span>
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 font-sans">{currentConfig.description}</p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => dealSpread(activeSpreadKey)}
                disabled={isDealing}
                className="px-4 py-2 rounded-xl bg-[#1a1e3b] hover:bg-[#252a52] text-xs font-semibold text-[#fef08a] border border-[#d4af37]/30 transition-all flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDealing ? 'animate-spin' : ''}`} />
                <span>Reshuffle & Deal</span>
              </button>

              {spreadCards.length > 0 && (
                <button
                  onClick={revealAll}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#07080f] text-xs font-bold hover:bg-yellow-400 transition-all flex items-center space-x-1.5 shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal All</span>
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {spreadCards.length === 0 ? (
            <div className="text-center py-16">
              <button
                onClick={() => dealSpread(activeSpreadKey)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-sm tracking-wide shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all"
              >
                Deal {currentConfig.name} Cards
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center mb-10">
                {spreadCards.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-2 group">
                    <div className="text-center">
                      <span className="text-[11px] font-semibold text-[#fef08a] uppercase tracking-wider block font-serif">
                        {item.positionTitle}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] block max-w-[140px] truncate">
                        {item.positionDesc}
                      </span>
                    </div>

                    <TarotCardView
                      card={item.card}
                      isFlipped={item.isFlipped}
                      isReversed={item.isReversed}
                      size="sm"
                      onClick={() => flipCard(idx)}
                    />

                    <span className="text-[10px] text-[#a5b4fc]/70 uppercase font-sans tracking-wide">
                      {item.isFlipped ? (
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Revealed
                        </span>
                      ) : (
                        'Tap to Flip'
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selected Card Focus Drawer / Modal */}
              {selectedSpreadCard && selectedSpreadCard.isFlipped && (
                <div className="p-6 rounded-2xl bg-[#141830] border border-[#d4af37]/40 shadow-xl mb-6 animate-fadeIn">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="shrink-0 mx-auto md:mx-0">
                      <TarotCardView
                        card={selectedSpreadCard.card}
                        isFlipped={true}
                        isReversed={selectedSpreadCard.isReversed}
                        size="sm"
                      />
                    </div>
                    <div className="space-y-3 text-left w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#232747] pb-2">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#ffd700] font-serif font-bold">
                            Position: {selectedSpreadCard.positionTitle}
                          </span>
                          <h4 className="font-serif font-extrabold text-xl text-white">
                            {selectedSpreadCard.card.name} ({selectedSpreadCard.isReversed ? 'Reversed' : 'Upright'})
                          </h4>
                        </div>
                        <span className="text-xs text-[#a5b4fc] bg-[#1d2248] px-2.5 py-1 rounded border border-[#3b4379]">
                          {selectedSpreadCard.card.element} • {selectedSpreadCard.card.astrologicalRuler}
                        </span>
                      </div>

                      <p className="text-sm text-[#cbd5e1] leading-relaxed">
                        {selectedSpreadCard.isReversed
                          ? selectedSpreadCard.card.reversedMeaning
                          : selectedSpreadCard.card.uprightMeaning}
                      </p>

                      <div className="p-3 rounded-xl bg-[#090c1a] border border-[#232747] text-xs">
                        <strong className="text-[#fef08a] block mb-1">Position Meaning in this Spread:</strong>
                        <p className="text-[#cbd5e1]">
                          This placement addresses: <em>{selectedSpreadCard.positionDesc}</em>. Reflect upon how{' '}
                          {selectedSpreadCard.card.name} illuminates this exact sphere of your journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Elemental Synergy Balance & Reader Consultation Banner */}
              <div className="mt-8 pt-6 border-t border-[#232747] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-[#94a3b8] font-semibold uppercase tracking-wider font-serif">
                    Elemental Balance:
                  </span>
                  {['Fire', 'Water', 'Air', 'Earth'].map((elem) => (
                    <span
                      key={elem}
                      className="px-2.5 py-1 rounded-md bg-[#161a36] text-white border border-[#2a3059]"
                    >
                      {elem}: <strong className="text-[#ffd700]">{elementCounts[elem] || 0}</strong>
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#eab308] text-[#07080f] font-bold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all flex items-center space-x-2 shrink-0 shadow-md shadow-[#d4af37]/20"
                >
                  <span>Discuss Spread With a Master Reader</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
