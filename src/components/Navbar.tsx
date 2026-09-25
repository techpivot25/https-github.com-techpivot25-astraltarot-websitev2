import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Volume2, VolumeX, Menu, X, Calendar, PhoneCall } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBooking: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  activeSection?: string;
  setActiveSection?: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currentPage,
  onNavigate,
  activeSection,
  setActiveSection
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const currentTab = currentPage || activeSection || 'home';

  const handleToggleSound = () => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      cosmicAudio.playChime(720, 0.6);
    }
  };

  const handleToggleTheme = () => {
    toggleTheme();
    cosmicAudio.playChime(theme === 'dark' ? 840 : 540, 0.3);
  };

  const navItems = [
    { id: 'home', labelKey: 'nav.home', defaultLabel: 'Home' },
    { id: 'daily', labelKey: 'nav.daily', defaultLabel: 'Daily Draw' },
    { id: 'spreads', labelKey: 'nav.spreads', defaultLabel: 'Tarot Spreads' },
    { id: 'horoscope', labelKey: 'nav.horoscope', defaultLabel: 'Horoscopes' },
    { id: 'birthchart', labelKey: 'nav.birthchart', defaultLabel: 'Birth Chart' },
    { id: 'oracle', labelKey: 'nav.oracle', defaultLabel: 'Ask Oracle' },
    { id: 'services', labelKey: 'nav.services', defaultLabel: 'Services & Pricing' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (setActiveSection) {
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
    cosmicAudio.playChime(640, 0.4);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080914]/90 border-b border-[#232747]/80 transition-all">
      {/* Top Cosmic Ticker */}
      <div className="bg-gradient-to-r from-[#141833] via-[#1a1438] to-[#141833] border-b border-[#d4af37]/15 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#a5b4fc] text-[11px] sm:text-xs">
              <strong className="text-white font-medium">{t('brand.name')}:</strong> {t('header.liveSanctuary')}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-[11px] text-[#cbd5e1]">
            <a href="tel:+918586970405" className="flex items-center space-x-1 hover:text-[#ffd700] transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>+91 8586970405</span>
            </a>
            <span className="text-[#64748b]">•</span>
            <a href="mailto:appointment@astraltarot24.in" className="hover:text-[#ffd700] transition-colors">
              appointment@astraltarot24.in
            </a>
            <span className="text-[#64748b]">•</span>
            <span className="text-[#fef08a] font-medium">www.astraltarot24.in</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center space-x-2.5 group cursor-pointer shrink-0"
        >
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#c59b27] via-[#eab308] to-[#fef08a] p-[1.5px] shadow-md shadow-[#d4af37]/30 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Astral Tarot 24 Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
              Astral Tarot <span className="text-[#ffd700]">24</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#94a3b8] font-sans">
              {t('brand.tagline', 'Spiritual Enlightenment')}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === item.id
                  ? 'text-[#fef08a] bg-[#1a1e3b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-[#151930]'
              }`}
            >
              {t(item.labelKey, item.defaultLabel)}
            </button>
          ))}
        </nav>

        {/* Action Controls: Theme, Sound & Booking */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? t('theme.toggleLight', 'Switch to Light Mode') : t('theme.toggleDark', 'Switch to Dark Mode')}
            className="p-2 rounded-xl bg-[#141938] hover:bg-[#202754] text-[#cbd5e1] hover:text-[#ffd700] transition-colors border border-[#2b3464]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#ffd700]" />
            ) : (
              <Moon className="w-4 h-4 text-[#854d0e]" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute celestial chimes' : 'Mute celestial chimes'}
            title={isMuted ? 'Unmute celestial sounds' : 'Mute celestial sounds'}
            className="p-2 rounded-xl bg-[#141938] hover:bg-[#202754] text-[#94a3b8] hover:text-[#fef08a] transition-colors border border-[#2b3464]"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#ffd700]" />}
          </button>

          {/* Book Session CTA Button */}
          <button
            onClick={() => {
              cosmicAudio.playChime(880, 0.8);
              onOpenBooking();
            }}
            className="relative group overflow-hidden rounded-xl px-3 sm:px-4 py-2 bg-gradient-to-r from-[#b38827] via-[#eab308] to-[#dfb743] text-[#0b0c16] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-1.5 shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#0b0c16]" />
            <span>{t('nav.bookReading', 'Book Reading')}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 xl:hidden text-[#cbd5e1] hover:text-white hover:bg-[#151930] rounded-xl border border-[#2b3464]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0c18] border-b border-[#232747] px-4 py-4 space-y-2 animate-fadeIn">
          {/* Mobile Theme Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#232747]/60">
            <span className="text-xs text-[#94a3b8]">Appearance Theme:</span>
            <button
              onClick={handleToggleTheme}
              className="px-3 py-1.5 rounded-lg bg-[#141938] text-xs font-semibold text-[#fef08a] border border-[#d4af37]/30 flex items-center gap-1.5"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#ffd700]" /> : <Moon className="w-3.5 h-3.5 text-[#fef08a]" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                currentTab === item.id
                  ? 'text-[#ffd700] bg-[#1a1e3b] border border-[#d4af37]/40'
                  : 'text-[#cbd5e1] hover:bg-[#141830]'
              }`}
            >
              <span>{t(item.labelKey, item.defaultLabel)}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]/50" />
            </button>
          ))}
          <div className="pt-2 border-t border-[#232747]/60 flex flex-col gap-1.5 text-xs text-[#94a3b8] px-2">
            <div className="flex justify-between items-center">
              <span>{t('appointmentHotline', 'Appointment Hotline')}</span>
              <a href="tel:+918586970405" className="text-[#ffd700] font-bold flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> +91 8586970405
              </a>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span>{t('email', 'Email')}</span>
              <a href="mailto:appointment@astraltarot24.in" className="text-[#cbd5e1] hover:text-[#ffd700]">
                appointment@astraltarot24.in
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

