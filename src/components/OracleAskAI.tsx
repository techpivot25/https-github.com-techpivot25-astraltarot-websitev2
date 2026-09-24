import React, { useState } from 'react';
import { TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';
import { TarotCardView } from './TarotCardView';
import { GeminiChat } from './GeminiChat';
import { Sparkles, Send, RefreshCw, Compass, HelpCircle, ArrowRight, MessageSquare, Layers } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';

interface OracleAskAIProps {
  onOpenBooking: () => void;
}

export const OracleAskAI: React.FC<OracleAskAIProps> = ({ onOpenBooking }) => {
  const [oracleMode, setOracleMode] = useState<'chat' | 'spread'>('chat');
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<{ card: TarotCard; isReversed: boolean }[]>([]);
  const [readingAnswer, setReadingAnswer] = useState<string | null>(null);
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  const sampleQuestions = [
    'What should I know about my current relationship trajectory?',
    'Is it favorable to transition my career this season?',
    'What subconscious blockage is holding back my abundance?',
    'What lesson is my soul learning through this challenge?'
  ];

  const handleConsultOracle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsConsulting(true);
    setReadingAnswer(null);
    setDrawnCards([]);
    cosmicAudio.playCardFlip();

    setTimeout(() => {
      // Pick 3 cards
      const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
      const c1 = shuffled[0];
      const c2 = shuffled[1];
      const c3 = shuffled[2];

      const cards = [
        { card: c1, isReversed: Math.random() > 0.8 },
        { card: c2, isReversed: Math.random() > 0.8 },
        { card: c3, isReversed: Math.random() > 0.8 }
      ];

      setDrawnCards(cards);

      // Synthesize spiritual wisdom tailored to the question
      const synthesis = `Regarding your sacred inquiry: "${question.trim()}"\n\n` +
        `1. Primary Influence (${c1.name}${cards[0].isReversed ? ' Reversed' : ''}): ` +
        `${cards[0].isReversed ? c1.reversedMeaning : c1.uprightMeaning}\n\n` +
        `2. The Crucible & Hidden Factor (${c2.name}${cards[1].isReversed ? ' Reversed' : ''}): ` +
        `${c2.keywords.join(', ')}. This calls for you to honor ${c2.element} energy—balancing instinct with conscious intention.\n\n` +
        `3. The Cosmic Resolution (${c3.name}${cards[2].isReversed ? ' Reversed' : ''}): ` +
        `The universe answers with clarity: ${cards[2].isReversed ? c3.reversedMeaning : c3.uprightMeaning} ` +
        `Carry the affirmation: "${c3.cosmicAffirmation}"`;

      setReadingAnswer(synthesis);
      setIsConsulting(false);
      cosmicAudio.playCelebration();
    }, 1000);
  };

  return (
    <section id="oracle" className="py-20 bg-[#0a0c18] relative border-b border-[#232747]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e2348]/80 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Interactive Astral Oracle</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Ask the <span className="gold-text-gradient">Astral Oracle</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-3 font-sans">
            Converse with the Gemini-powered Celestial Oracle or draw three sacred tarot archetypes for spiritual clarity and destiny alignment.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center bg-[#111530] p-1 rounded-2xl border border-[#2b3360] mt-6 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setOracleMode('chat');
                cosmicAudio.playChime(640, 0.2);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                oracleMode === 'chat'
                  ? 'bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold shadow-md'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Multi-Turn Gemini Oracle</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/20 uppercase">Live AI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOracleMode('spread');
                cosmicAudio.playChime(540, 0.2);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                oracleMode === 'spread'
                  ? 'bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold shadow-md'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3-Card Arcana Spread</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Display */}
        {oracleMode === 'chat' ? (
          <div className="max-w-4xl mx-auto">
            <GeminiChat onOpenBooking={onOpenBooking} />
          </div>
        ) : (
          /* 3-Card Spread Container */
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#11142b] border-2 border-[#d4af37]/35 p-6 sm:p-10 shadow-2xl cosmic-glow">
            {/* Question Input Form */}
            <form onSubmit={handleConsultOracle} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about love, twin flame, career, destiny, or personal growth..."
                  className="w-full px-5 py-4 rounded-2xl bg-[#090b17] border border-[#2f3769] text-white placeholder-[#64748b] text-sm sm:text-base focus:outline-none focus:border-[#ffd700] transition-colors shadow-inner pr-32"
                />
                <button
                  type="submit"
                  disabled={isConsulting || !question.trim()}
                  className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-1.5 disabled:opacity-50"
                >
                  {isConsulting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Consult</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Suggested Sample Questions */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-[#94a3b8] flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#ffd700]" /> Suggested prompts:
                </span>
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="px-2.5 py-1 rounded-lg bg-[#181d3d] hover:bg-[#222954] text-[#cbd5e1] hover:text-white border border-[#2d3563] text-[11px] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </form>

            {/* Reading Result Area */}
            {drawnCards.length > 0 && readingAnswer && (
              <div className="mt-10 pt-8 border-t border-[#232747] space-y-8 animate-fadeIn">
                {/* Drawn Cards Row */}
                <div>
                  <span className="text-xs uppercase font-serif tracking-widest text-[#ffd700] block text-center mb-4">
                    Cards Drawn For Your Inquiry
                  </span>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {drawnCards.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <span className="text-[10px] text-[#a5b4fc] font-serif uppercase tracking-wider mb-1">
                          Card #{idx + 1}
                        </span>
                        <TarotCardView
                          card={item.card}
                          isFlipped={true}
                          isReversed={item.isReversed}
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synthesized Oracle Interpretation */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151936] to-[#0c0f24] border border-[#d4af37]/40 shadow-xl space-y-3">
                  <h4 className="font-serif font-bold text-lg text-[#fef08a] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#ffd700]" />
                    <span>The Oracle's Synthesis</span>
                  </h4>
                  <div className="text-sm text-[#e2e8f0] leading-relaxed whitespace-pre-line font-sans">
                    {readingAnswer}
                  </div>
                </div>

                {/* Reader Booking Upsell */}
                <div className="p-4 rounded-2xl bg-[#080914] border border-[#232747] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-white font-bold block font-serif">Have follow-up questions for this specific spread?</span>
                    <span className="text-[#94a3b8]">Connect with a certified tarot mystic for a private 1-on-1 audio/video call.</span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#eab308] text-[#07080f] font-bold hover:scale-105 transition-all shrink-0"
                  >
                    Book Live Reader
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
