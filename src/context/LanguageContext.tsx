import React, { createContext, useContext, useEffect } from 'react';

export type Language = 'en';

interface LanguageContextType {
  language: Language;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<string, string> = {
  // Brand & Header
  'brand.name': 'Astral Tarot 24',
  'brand.tagline': 'Spiritual Enlightenment & Astrotarot',
  'header.liveSanctuary': '24/7 Live Sanctuary: Certified Astrotarot Mystics Online Now',
  'header.phone': '+91 8586970405',
  'header.email': 'appointment@astraltarot24.in',
  'header.domain': 'www.astraltarot24.in',

  // Navigation
  'nav.home': 'Home',
  'nav.daily': 'Daily Draw',
  'nav.spreads': 'Tarot Spreads',
  'nav.horoscope': 'Horoscopes',
  'nav.birthchart': 'Birth Chart',
  'nav.oracle': 'Ask Oracle',
  'nav.services': 'Services & Pricing',
  'nav.readers': 'Master Readers',
  'nav.bookReading': 'Book Reading',

  // Hero Section
  'hero.badge': 'Divine Consciousness • 78 Sacred Arcana • Vedic Astrology',
  'hero.title1': 'Unlock Your',
  'hero.title2': 'Spiritual Potential',
  'hero.subtitle': 'Experience transformative tarot insights, celestial horoscopes, Kundli birth chart blueprints, and confidential 1-on-1 consultations with world-renowned spiritual mystics.',
  'hero.exploreTarot': 'Explore Tarot Spreads',
  'hero.askOracle': 'Ask Astral Oracle AI',
  'hero.drawToday': "Draw Today's Card",
  'hero.statReadings': '150,000+ Sacred Readings',
  'hero.statRating': '4.9/5 Divine Star Rating',
  'hero.statReaders': '25+ Certified Masters',
  'hero.statSupport': '24/7 Spiritual Guidance',

  // Daily Card Draw
  'daily.headerBadge': 'Sacred Morning Ritual',
  'daily.title': 'Daily Sacred Card Draw',
  'daily.subtitle': 'Breathe deeply, center your heart, and unveil the cosmic wisdom meant for your soul today.',
  'daily.drawButton': 'Shuffle & Draw Card',
  'daily.drawAgain': 'Draw Another Card',
  'daily.cardMeaning': 'Archetype & Interpretation',
  'daily.reversedMeaning': 'Shadow / Reversed Aspect',
  'daily.cosmicAffirmation': 'Cosmic Affirmation',
  'daily.element': 'Cosmic Element',
  'daily.astrology': 'Planetary Ruler',

  // Tarot Spreads
  'spreads.headerBadge': 'Sacred Geometry of the Cards',
  'spreads.title': 'Sacred Tarot Spreads',
  'spreads.subtitle': 'Select a spread tailored to illuminate your current life phase, love alignment, or destiny crossroads.',
  'spreads.celticTitle': 'The Celtic Cross (10 Cards)',
  'spreads.celticDesc': 'The supreme ancient spread offering complete 360-degree clarity on current forces, subconscious roots, and final outcome.',
  'spreads.threeCardTitle': 'Three-Card Chronology (Past, Present, Future)',
  'spreads.threeCardDesc': 'A foundational layout revealing where your energy originates, where you stand now, and the impending outcome.',
  'spreads.loveTitle': 'Twin Flame & Love Alignment (5 Cards)',
  'spreads.loveDesc': 'Unveil karmic soul contracts, emotional resonances, and the next evolutionary phase of your relationship.',
  'spreads.careerTitle': 'Abundance & Career Crossroads (7 Cards)',
  'spreads.careerDesc': 'Pinpoint hidden career opportunities, financial flow blockages, and strategic actions for success.',
  'spreads.dealCards': 'Deal Spread Cards',

  // Horoscopes
  'horoscope.headerBadge': 'Cosmic Transits & Ephemeris',
  'horoscope.title': 'Celestial Daily Horoscopes',
  'horoscope.subtitle': 'Harmonize your actions with planetary alignments, lunar cycles, and zodiac energies.',
  'horoscope.selectSign': 'Select Your Zodiac Sign',
  'horoscope.love': 'Love & Relationships',
  'horoscope.career': 'Career & Prosperity',
  'horoscope.spirit': 'Spirit & Energy',
  'horoscope.luckyNumber': 'Lucky Number',
  'horoscope.luckyColor': 'Lucky Color',
  'horoscope.cosmicTip': 'Cosmic Wisdom',

  // Birth Chart / Kundli
  'birthchart.headerBadge': 'Vedic Astrology Engine',
  'birthchart.title': 'Vedic Kundli & Birth Chart',
  'birthchart.subtitle': 'Calculate your exact Ascendant (Lagna), Moon Sign (Rashi), planetary placements, and cosmic houses.',
  'birthchart.fullName': 'Full Name',
  'birthchart.dob': 'Date of Birth',
  'birthchart.tob': 'Time of Birth',
  'birthchart.pob': 'City / Place of Birth',
  'birthchart.calculate': 'Calculate Vedic Chart',
  'birthchart.ascendant': 'Ascendant (Lagna)',
  'birthchart.moonSign': 'Moon Sign (Rashi)',
  'birthchart.sunSign': 'Sun Sign (Surya)',
  'birthchart.currentDasha': 'Current Mahadasha',

  // Oracle & Gemini AI
  'oracle.headerBadge': 'Interactive Astral Oracle',
  'oracle.title': 'Ask the Astral Oracle',
  'oracle.subtitle': 'Converse with the Gemini-powered Celestial Oracle or draw three sacred tarot archetypes for spiritual clarity.',
  'oracle.chatTab': 'Multi-Turn Gemini Oracle',
  'oracle.spreadTab': '3-Card Arcana Spread',
  'oracle.placeholder': 'Ask about love, twin flame, career, destiny, or personal growth...',
  'oracle.consult': 'Consult',
  'oracle.suggested': 'Suggested prompts:',
  'oracle.cardsDrawn': 'Cards Drawn For Your Inquiry',
  'oracle.synthesis': "The Oracle's Synthesis",
  'oracle.bookUpsell': 'Have follow-up questions? Connect with a certified master reader for a private 1-on-1 session.',
  'oracle.bookButton': 'Book Live Reader',

  // Services & Booking
  'booking.headerBadge': 'Sacred Consultations',
  'booking.title': 'Book Your Sacred Reading',
  'booking.subtitle': 'Connect 1-on-1 with master tarot mystics, Vedic astrologers, and numerology guides.',
  'booking.step1': '1. Choose Consultation Package',
  'booking.step2': '2. Select Master Reader',
  'booking.step3': '3. Preferred Date & Time (Cal.com)',
  'booking.step4': '4. Seeker Details',
  'booking.calComNotice': 'Official Cal.com appointment schedule synced with our master readers.',
  'booking.openCalCom': 'Open in cal.com/astraltarot24',
  'booking.fullName': 'Your Full Name',
  'booking.email': 'Email Address',
  'booking.phone': 'WhatsApp / Phone Number',
  'booking.focusArea': 'Primary Life Area / Topic',
  'booking.inquiry': 'Your Specific Questions / Context',
  'booking.confirm': 'Confirm & Reserve Consultation',
  'booking.guarantee': '100% Confidential • Live Video/Audio Call • Recorded Session',
  'booking.successTitle': 'Sacred Consultation Reserved!',
  'booking.successDesc': 'Your appointment has been registered and dispatched to both inquiry inbox and your email.',

  // Readers
  'readers.headerBadge': 'Sanctuary of Masters',
  'readers.title': 'Certified Master Readers',
  'readers.subtitle': 'Our readers undergo rigorous multi-generational vetting in tarot, Vedic astrology, and intuitive counseling.',
  'readers.bookWith': 'Book Session With',
  'readers.experience': 'Experience',
  'readers.specialties': 'Specialties',
  'readers.languages': 'Languages',
  'readers.verified': 'Verified Master',

  // Footer & Common
  'footer.description': 'Astral Tarot 24 is a sanctuary for spiritual enlightenment, sacred tarot readings, astrological calculations, and confidential master consultations.',
  'footer.quickLinks': 'Quick Navigation',
  'footer.contactUs': 'Contact & Sanctuary',
  'footer.rights': 'All Sacred Rights Reserved.',
  'footer.disclaimer': 'Disclaimer: Tarot readings and astrology are metaphysical arts for spiritual self-reflection and guidance. All sessions are 100% private and confidential.',
  'theme.toggleDark': 'Switch to Dark Mode',
  'theme.toggleLight': 'Switch to Light Mode',
  'lang.en': 'English'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      localStorage.removeItem('astral_tarot_lang');
      document.documentElement.lang = 'en';
    } catch {
      // ignore
    }
  }, []);

  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language: 'en', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
