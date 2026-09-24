import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, Bot, User, RefreshCw, Trash2, Copy, Check, 
  ExternalLink, MessageCircle, Phone, Calendar, Moon, Zap, Shield, HelpCircle
} from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { CAL_COM_URL, OFFICIAL_MOBILE, OFFICIAL_APPOINTMENT_EMAIL } from '../lib/leadService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatProps {
  onOpenBooking?: () => void;
  className?: string;
  title?: string;
}

const AI_MODELS = [
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    label: 'Balanced Oracle',
    desc: 'General tarot spreads, daily guidance & questions',
    badge: 'Recommended',
    icon: Sparkles
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    label: 'Deep Arcana Sage',
    desc: 'Complex karmic roots, Vedic astrology & life purpose',
    badge: 'Deep Inquiry',
    icon: Moon
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    label: 'Swift Messenger',
    desc: 'Rapid card definitions, symbol lookup & quick answers',
    badge: 'Ultra Fast',
    icon: Zap
  }
];

const STARTER_PROMPTS = [
  'What is the spiritual significance of The High Priestess and The Star together?',
  'I feel stuck at a career crossroads. What cosmic advice do you have?',
  'How do I interpret a reversed Ace of Cups in a relationship spread?',
  'What meditation or grounding ritual can align my solar plexus energy?'
];

export const GeminiChat: React.FC<GeminiChatProps> = ({
  onOpenBooking,
  className = '',
  title = 'Celestial Oracle AI'
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.5-flash');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Attempt to load previous session from localStorage
    try {
      const saved = localStorage.getItem('astral_tarot_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        text: `✨ Greetings, cosmic seeker. I am the Astral Tarot 24 Celestial Oracle, powered by Gemini.\n\nWhether you seek deep symbolic meaning behind tarot archetypes, cosmic insight into love, career and life transitions, or guidance on reading spreads, ask your sacred question below. How may the celestial arcana illuminate your path today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.5-flash'
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem('astral_tarot_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputMessage.trim();
    if (!query || isLoading) return;

    cosmicAudio.playCardFlip();

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Format history for backend Gemini API
      const apiPayloadMessages = updatedHistory.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiPayloadMessages,
          model: selectedModel
        })
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'The celestial oracle remains in sacred silence. May your heart hear what words cannot express.';

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel
      };

      setMessages((prev) => [...prev, assistantMessage]);
      cosmicAudio.playCelebration();
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'assistant',
        text: `The celestial veil momentarily ripples. Deepen your breath and listen to your inner intuition. Remember, our certified human readers are available 24/7 on WhatsApp (+91 ${OFFICIAL_MOBILE}) and live at cal.com/astraltarot24 for private readings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    cosmicAudio.playChime(480, 0.2);
    const initial: ChatMessage[] = [
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: `✨ The celestial slate is cleansed in the sacred ether. Speak whenever you are ready, seeker.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      }
    ];
    setMessages(initial);
    try {
      localStorage.removeItem('astral_tarot_chat_history');
    } catch {
      // ignore
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    cosmicAudio.playChime(760, 0.2);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`flex flex-col rounded-3xl bg-[#090c1a] border-2 border-[#d4af37]/35 shadow-2xl overflow-hidden ${className}`}>
      {/* Chat Top Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0c0f24] via-[#141938] to-[#0c0f24] border-b border-[#242b58] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#997316] via-[#d4af37] to-[#fef08a] p-0.5 shadow-lg shadow-[#d4af37]/20">
              <div className="w-full h-full rounded-[14px] bg-[#090b17] flex items-center justify-center text-[#ffd700]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090b17] absolute -bottom-0.5 -right-0.5 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-white text-base sm:text-lg tracking-wide">
                {title}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1d244f] text-[#ffd700] border border-[#d4af37]/30">
                Multi-Turn
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              Empowered by Google Gemini • Vedic & Tarot Wisdom
            </p>
          </div>
        </div>

        {/* Model Selector & Actions */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-[#070914] p-1 rounded-xl border border-[#262e5a]">
            {AI_MODELS.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedModel(m.id);
                    cosmicAudio.playChime(640, 0.15);
                  }}
                  title={`${m.name}: ${m.desc}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#1a214d] text-[#fef08a] border border-[#d4af37]/40 shadow-sm'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-[#141938] hover:bg-[#1f2754] text-[#94a3b8] hover:text-white border border-[#2b3464] transition-all"
            title="Clear conversation history"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[500px] min-h-[380px] space-y-4 bg-gradient-to-b from-[#080a16] to-[#0d1024]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-[#2b356a] text-[#ffd700] border border-[#d4af37]/40 shadow-md'
                    : 'bg-gradient-to-tr from-[#997316] to-[#fef08a] text-[#07080f] shadow-md shadow-[#d4af37]/20'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  isUser
                    ? 'bg-gradient-to-br from-[#1e2552] to-[#151a3d] text-white border border-[#3b4782] shadow-lg rounded-tr-sm'
                    : 'bg-[#0f132e] text-[#cbd5e1] border border-[#2d3668] shadow-lg rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-line font-sans text-white/95">
                  {msg.text}
                </div>

                {/* Footer details: time + copy action */}
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <span>{msg.timestamp}</span>
                    {!isUser && msg.modelUsed && (
                      <span className="text-[#ffd700]/70 font-mono">
                        • {msg.modelUsed.replace('gemini-', '')}
                      </span>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[#94a3b8] hover:text-[#ffd700] flex items-center gap-1 ml-2"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl shrink-0 bg-gradient-to-tr from-[#997316] to-[#fef08a] flex items-center justify-center text-[#07080f]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-sm bg-[#0f132e] border border-[#2d3668] text-xs text-[#ffd700] flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ffd700]" />
              <span className="font-serif italic">
                Consulting celestial transits & tarot archetypes...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Prompts */}
      <div className="px-4 py-2 bg-[#080a17] border-t border-[#1b2146] flex items-center space-x-2 overflow-x-auto text-[11px] no-scrollbar">
        <span className="text-[#64748b] shrink-0 flex items-center gap-1 font-medium">
          <HelpCircle className="w-3 h-3 text-[#ffd700]" /> Try:
        </span>
        {STARTER_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setInputMessage(prompt);
              cosmicAudio.playChime(600, 0.15);
            }}
            className="px-2.5 py-1 rounded-lg bg-[#111532] hover:bg-[#1a204b] text-[#cbd5e1] hover:text-white border border-[#262e5b] shrink-0 transition-colors truncate max-w-[280px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 sm:p-4 bg-[#0c0f24] border-t border-[#242b58] flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask the Oracle about cards, transits, twin flames, life purpose..."
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-2xl bg-[#070914] border border-[#2e3767] text-white placeholder-[#64748b] text-xs sm:text-sm focus:outline-none focus:border-[#ffd700] transition-colors pr-10"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-4 sm:px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Live Reader & cal.com Upsell Bar */}
      <div className="p-3 bg-[#070813] border-t border-[#171b38] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center space-x-2 text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Need deeper human clarity? Connect with our master mystics.
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={CAL_COM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-[#141938] hover:bg-[#1f2754] text-[#ffd700] border border-[#d4af37]/30 flex items-center gap-1 font-semibold transition-all"
          >
            <Calendar className="w-3 h-3" />
            <span>cal.com/astraltarot24</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#94a3b8]" />
          </a>

          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#c59b27] to-[#eab308] text-[#07080f] font-bold hover:scale-105 transition-all shadow-sm"
            >
              Book Sacred Reading
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
