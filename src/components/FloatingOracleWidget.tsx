import React, { useState } from 'react';
import { Sparkles, X, Bot, ChevronUp, MessageCircle, ExternalLink, Calendar } from 'lucide-react';
import { GeminiChat } from './GeminiChat';
import { cosmicAudio } from '../lib/audio';
import { CAL_COM_URL } from '../lib/leadService';

interface FloatingOracleWidgetProps {
  onOpenBooking: () => void;
  onNavigateOracle?: () => void;
}

export const FloatingOracleWidget: React.FC<FloatingOracleWidgetProps> = ({
  onOpenBooking,
  onNavigateOracle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      cosmicAudio.playChime(720, 0.3);
    } else {
      cosmicAudio.playChime(480, 0.2);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[420px] md:w-[460px] shadow-2xl rounded-3xl overflow-hidden border-2 border-[#d4af37]/50 bg-[#0a0d1d] animate-fadeIn">
          {/* Header Bar with Close */}
          <div className="bg-gradient-to-r from-[#121636] via-[#1a214d] to-[#121636] px-4 py-3 border-b border-[#2d3668] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] to-[#fef08a] p-0.5 shadow-md">
                <div className="w-full h-full rounded-[10px] bg-[#070810] flex items-center justify-center text-[#ffd700]">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Astral Oracle AI</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#ffd700] text-black font-bold">
                    Gemini
                  </span>
                </h4>
                <p className="text-[10px] text-[#94a3b8]">Live Multi-Turn Spiritual Guidance</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {onNavigateOracle && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateOracle();
                  }}
                  className="px-2 py-1 rounded-lg text-[10px] font-semibold text-[#ffd700] hover:bg-[#1f2654] border border-[#d4af37]/30 transition-all"
                  title="Open full page"
                >
                  Full View
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#141938] hover:bg-[#202754] text-[#cbd5e1] hover:text-white flex items-center justify-center transition-colors border border-[#2d3668]"
                aria-label="Close Oracle Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gemini Chat Component Body */}
          <div className="max-h-[75vh] overflow-y-auto">
            <GeminiChat
              onOpenBooking={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              title="Celestial Oracle"
              className="border-none rounded-none shadow-none"
            />
          </div>
        </div>
      )}

      {/* Floating Trigger Pill / Orb */}
      <button
        type="button"
        onClick={handleToggle}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#997316] via-[#c59b27] to-[#eab308] text-[#07080f] font-bold text-xs sm:text-sm shadow-xl shadow-[#d4af37]/40 hover:scale-105 active:scale-95 transition-all border border-[#fff5d0]/50"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07080f] animate-pulse" />
        <div className="w-5 h-5 rounded-full bg-[#07080f] text-[#ffd700] flex items-center justify-center">
          <Sparkles className="w-3 h-3" />
        </div>
        <span className="font-serif tracking-wide">
          {isOpen ? 'Close Oracle' : 'Ask Oracle AI'}
        </span>
        <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/30 text-white font-mono hidden sm:inline">
          Gemini
        </span>
      </button>
    </div>
  );
};
