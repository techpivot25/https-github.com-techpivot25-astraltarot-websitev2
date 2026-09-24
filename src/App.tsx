import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DailyDrawPage } from './pages/DailyDrawPage';
import { TarotSpreadsPage } from './pages/TarotSpreadsPage';
import { HoroscopePage } from './pages/HoroscopePage';
import { BirthChartPage } from './pages/BirthChartPage';
import { OraclePage } from './pages/OraclePage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingPage } from './pages/BookingPage';
import { FloatingOracleWidget } from './components/FloatingOracleWidget';
import { CertifiedReader } from './types';
import { cosmicAudio } from './lib/audio';

const VALID_PAGES = [
  'home',
  'daily',
  'spreads',
  'horoscope',
  'birthchart',
  'oracle',
  'services',
  'booking'
];

export default function App() {
  const getInitialPage = (): string => {
    if (typeof window === 'undefined') return 'home';
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    return VALID_PAGES.includes(rawHash) ? rawHash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [selectedReaderId, setSelectedReaderId] = useState<string | undefined>();
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>();

  // Synchronize with URL hash changes (browser back/forward & direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    const targetPage = VALID_PAGES.includes(pageId) ? pageId : 'home';
    setCurrentPage(targetPage);
    window.location.hash = `#/${targetPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (packageId?: string, readerId?: string) => {
    cosmicAudio.playChime(780, 0.5);
    setSelectedPackageId(packageId);
    setSelectedReaderId(readerId);
    handleNavigate('booking');
  };

  const handleSelectReader = (reader: CertifiedReader) => {
    cosmicAudio.playChime(840, 0.5);
    setSelectedReaderId(reader.id);
    handleNavigate('booking');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'booking':
        return (
          <BookingPage
            onNavigate={handleNavigate}
            preselectedPackageId={selectedPackageId}
            preselectedReaderId={selectedReaderId}
          />
        );
      case 'daily':
        return (
          <DailyDrawPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'spreads':
        return (
          <TarotSpreadsPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'horoscope':
        return (
          <HoroscopePage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'birthchart':
        return (
          <BirthChartPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'oracle':
        return (
          <OraclePage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onNavigate={handleNavigate}
            preselectedPackageId={selectedPackageId}
            preselectedReaderId={selectedReaderId}
            onOpenBooking={handleOpenBooking}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectReader={handleSelectReader}
          />
        );
    }
  };

  return (
    <div className="site-wrapper min-h-screen bg-[#07080f] text-[#e2e4f0] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-[#fff5d0] flex flex-col justify-between transition-colors duration-300">
      {/* Top Fixed / Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Area with Motion Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with page navigation links */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Gemini AI Oracle Widget */}
      <FloatingOracleWidget
        onOpenBooking={() => handleOpenBooking()}
        onNavigateOracle={() => handleNavigate('oracle')}
      />
    </div>
  );
}
