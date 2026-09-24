import React, { useState } from 'react';
import { Moon, Sparkles, Mail, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { useTranslation } from '../context/LanguageContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();

  const handleLinkClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      cosmicAudio.playChime(640, 0.4);
      onNavigate(page);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    cosmicAudio.playChime(880, 0.4);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#05060b] text-[#94a3b8] border-t border-[#232747] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1b203d]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={(e) => handleLinkClick(e, 'home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c59b27] via-[#eab308] to-[#fef08a] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-[#0b0c16] flex items-center justify-center">
                  <Moon className="w-4 h-4 text-[#ffd700]" />
                </div>
              </div>
              <span className="font-serif font-extrabold text-xl text-white tracking-wider">
                Astral Tarot <span className="text-[#ffd700]">24</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed max-w-sm font-sans">
              {t('brand.tagline', 'Unlock Your Spiritual Potential. Astral Tarot 24 is your premier celestial portal for authentic tarot divination, certified astrologers, and 24/7 psychic guidance.')}
            </p>

            <div className="text-xs text-[#a5b4fc] space-y-1.5">
              <p>🌐 Official Portal: <strong className="text-white">www.astraltarot24.in</strong></p>
              <p>📧 Bookings & Inquiries: <a href="mailto:appointment@astraltarot24.in" className="text-[#fef08a] hover:underline">appointment@astraltarot24.in</a></p>
              <p>📞 Helpline / WhatsApp: <a href="tel:+918586970405" className="text-white hover:text-[#ffd700] font-medium">+91 8586970405</a></p>
              <p>📍 Headquarters: New Delhi, India • Serving Global Seekers 24/7</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              {t('nav.spreads', 'Divination Altars')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'daily')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  {t('nav.daily', 'Daily Tarot Card Draw')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'spreads')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  Past • Present • Future Spread
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'spreads')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  Love & Soulmate Alignment
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'spreads')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  Celtic Cross (10 Cards)
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'oracle')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  {t('nav.oracle', 'Ask the Astral Oracle')}
                </button>
              </li>
            </ul>
          </div>

          {/* Horoscopes & Services */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              {t('nav.services', 'Astrology & Sessions')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'horoscope')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  {t('nav.horoscope', 'Daily 12 Zodiac Horoscopes')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'birthchart')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  {t('nav.birthchart', 'Natal Birth Chart Calculator')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  {t('nav.services', 'Services & Consultation Pricing')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  1-on-1 Consultation Packages
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  Twin Flame Reading (45m)
                </button>
              </li>
            </ul>
          </div>

          {/* Daily Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-3">
              Daily Astral Transits
            </h4>
            <p className="text-xs text-[#cbd5e1] mb-3 leading-relaxed">
              Receive your personalized astrological forecast & daily card pull every dawn.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300">
                ✨ Blessed! You are subscribed to daily morning astral transmissions.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e1124] border border-[#232747] text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#ffd700]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#d4af37] hover:bg-yellow-400 text-[#07080f] font-bold text-xs tracking-wide transition-all shadow-sm"
                >
                  Subscribe to Daily Insights
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 text-xs text-[#64748b] space-y-4">
          <p className="text-[11px] leading-relaxed">
            <strong>Spiritual Advisory Disclaimer:</strong> Tarot readings, horoscopes, and intuitive consultations provided by Astral Tarot 24 (www.astraltarot24.in) are designed for spiritual guidance, personal growth, and self-reflection. Services are intended for adults aged 18 and older. Our readings do not replace professional medical, legal, or licensed financial advice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#13162b] pt-4 text-[11px]">
            <p>© 2025–2026 Astral Tarot 24 (www.astraltarot24.in). All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Refund Policy</span>
              <span>•</span>
              <span className="text-[#d4af37]">Crafted with Celestial Harmony</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
