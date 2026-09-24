import React, { useState } from 'react';
import { TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { TarotCardView } from './TarotCardView';
import { Sparkles, RefreshCw, Heart, Briefcase, Compass, Copy, Check, Share2, BookOpen } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import confetti from 'canvas-confetti';

interface DailyCardDrawerProps {
  onOpenBooking: () => void;
}

export const DailyCardDrawer: React.FC<DailyCardDrawerProps> = ({ onOpenBooking }) => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'love' | 'career' | 'symbolism'>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  const drawCard = () => {
    setIsShuffling(true);
    setIsFlipped(false);
    cosmicAudio.playCardFlip();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
      const chosenCard = TAROT_DECK[randomIndex] || TAROT_DECK[0];
      const reversed = Math.random() > 0.78; // 22% reversed

      setSelectedCard(chosenCard);
      setIsReversed(reversed);
      setIsShuffling(false);

      setTimeout(() => {
        setIsFlipped(true);
        cosmicAudio.playCelebration();
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ffd700', '#c59b27', '#8b5cf6', '#38bdf8']
          });
        } catch {
          // ignore
        }
      }, 400);
    }, 600);
  };

  const handleCopyAffirmation = () => {
    if (!selectedCard) return;
    navigator.clipboard.writeText(`"${selectedCard.cosmicAffirmation}" - Astral Tarot 24 (www.astraltarot24.in)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="daily" className="py-20 bg-gradient-to-b from-[#080914] via-[#0d1024] to-[#080914] relative border-t border-b border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Sacred Daily Communion</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Draw Your Daily <span className="gold-text-gradient">Cosmic Card</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Every day carries a celestial signature. Tap below to shuffle the astral deck and receive your personalized divine guidance for the day.
          </p>
        </div>

        {/* Interactive Card Stage */}
        <div className="bg-[#101328]/80 backdrop-blur-md rounded-3xl border border-[#d4af37]/30 p-6 sm:p-10 shadow-2xl cosmic-glow">
          {!selectedCard || !isFlipped ? (
            /* Pre-Draw / Deck State */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
              <div className="relative">
                {/* Visual deck preview */}
                <div className={`transition-all duration-500 ${isShuffling ? 'scale-95 animate-pulse' : 'hover:scale-105'}`}>
                  <TarotCardView
                    isFlipped={false}
                    size="lg"
                    onClick={drawCard}
                  />
                </div>
              </div>

              <div className="max-w-md">
                <h3 className="font-serif font-bold text-xl text-white mb-2">
                  {isShuffling ? 'Shuffling Celestial Energies...' : 'The Astral Deck is Ready'}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
                  Clear your thoughts, take one deep breath, and click to draw your card for today.
                </p>

                <button
                  onClick={drawCard}
                  disabled={isShuffling}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-sm tracking-wide shadow-lg shadow-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 text-[#07080f] ${isShuffling ? 'animate-spin' : ''}`} />
                  <span>{isShuffling ? 'Consulting the Stars...' : 'Draw My Card Now'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Post-Draw / Revealed Reading State */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Card Visualization Column */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
                <TarotCardView
                  card={selectedCard}
                  isFlipped={true}
                  isReversed={isReversed}
                  size="lg"
                />

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={drawCard}
                    className="px-4 py-2 rounded-lg bg-[#1a1e3b] hover:bg-[#23274d] text-xs font-semibold text-[#fef08a] border border-[#d4af37]/30 transition-all flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Draw Again</span>
                  </button>
                  <button
                    onClick={handleCopyAffirmation}
                    className="px-4 py-2 rounded-lg bg-[#1a1e3b] hover:bg-[#23274d] text-xs font-semibold text-white border border-[#232747] transition-all flex items-center space-x-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />}
                    <span>{copied ? 'Affirmation Copied!' : 'Copy Affirmation'}</span>
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Header Info */}
                <div className="border-b border-[#232747]/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#ffd700] uppercase tracking-wider font-serif">
                      Card #{selectedCard.number} • {selectedCard.arcana} Arcana
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      isReversed
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {isReversed ? 'Reversed Placement' : 'Upright Placement'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#1e2348] text-[#a5b4fc] border border-[#2f376e]">
                      Ruler: {selectedCard.astrologicalRuler}
                    </span>
                  </div>

                  <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
                    {selectedCard.name}
                  </h3>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedCard.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#181d3d] text-[#e2e8f0] border border-[#2f376e]/50"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#232747] space-x-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
                      activeTab === 'overview'
                        ? 'border-[#ffd700] text-[#fef08a]'
                        : 'border-transparent text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>Core Guidance</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('love')}
                    className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
                      activeTab === 'love'
                        ? 'border-[#ffd700] text-[#fef08a]'
                        : 'border-transparent text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Love & Twin Flames</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('career')}
                    className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
                      activeTab === 'career'
                        ? 'border-[#ffd700] text-[#fef08a]'
                        : 'border-transparent text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Career & Wealth</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('symbolism')}
                    className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center space-x-1.5 ${
                      activeTab === 'symbolism'
                        ? 'border-[#ffd700] text-[#fef08a]'
                        : 'border-transparent text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Symbolism</span>
                  </button>
                </div>

                {/* Tab Content Panels */}
                <div className="min-h-[140px] text-sm text-[#cbd5e1] leading-relaxed">
                  {activeTab === 'overview' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="text-base text-white font-serif italic">
                        &ldquo;{isReversed ? selectedCard.reversedMeaning : selectedCard.uprightMeaning}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-[#cbd5e1]">
                        {isReversed
                          ? 'This reversed energy invites you to look inward. Do not force external doors open today; resolve subtle internal hesitations or unvoiced emotions first.'
                          : 'This upright archetype signals active cosmic alignment. Trust the synchronicities occurring around you and act with clear confidence.'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'love' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-4 rounded-xl bg-[#141833]/80 border border-[#f43f5e]/30 text-xs sm:text-sm">
                        <strong className="text-pink-300 font-semibold block mb-1">Romantic Energy:</strong>
                        <p>{selectedCard.loveMeaning}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'career' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-4 rounded-xl bg-[#141833]/80 border border-[#38bdf8]/30 text-xs sm:text-sm">
                        <strong className="text-sky-300 font-semibold block mb-1">Financial & Vocation Trajectory:</strong>
                        <p>{selectedCard.careerMeaning}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'symbolism' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-4 rounded-xl bg-[#141833]/80 border border-[#c084fc]/30 text-xs sm:text-sm">
                        <strong className="text-purple-300 font-semibold block mb-1">Esoteric Symbolism:</strong>
                        <p>{selectedCard.symbolism}</p>
                        <p className="mt-2 text-xs text-[#94a3b8]">
                          Element: <span className="text-[#ffd700]">{selectedCard.element}</span> • Astrological Ruling Body: <span className="text-[#ffd700]">{selectedCard.astrologicalRuler}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Daily Cosmic Affirmation Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c1638] via-[#1b1f3d] to-[#1c1638] border border-[#d4af37]/40 shadow-inner flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#fef08a] font-bold block mb-1">
                      Today\'s Cosmic Affirmation
                    </span>
                    <p className="font-serif italic text-white text-sm sm:text-base font-medium">
                      &ldquo;{selectedCard.cosmicAffirmation}&rdquo;
                    </p>
                  </div>
                  <button
                    onClick={handleCopyAffirmation}
                    title="Copy Affirmation"
                    className="p-2 rounded-lg bg-[#0c0e1e] hover:bg-[#252a54] text-[#ffd700] transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Need Deep Interpretation CTA */}
                <div className="p-3.5 rounded-xl bg-[#090b16] border border-[#232747] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
                  <span>Want deeper insights into how this card intersects your birth chart?</span>
                  <button
                    onClick={onOpenBooking}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ffd700] text-[#07080f] font-semibold hover:bg-yellow-400 transition-colors shrink-0"
                  >
                    Consult Senior Reader
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
