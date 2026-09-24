import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CalendarTimeSlotPicker } from '../components/CalendarTimeSlotPicker';
import { SERVICE_PACKAGES, CERTIFIED_READERS } from '../data/servicesData';
import { ServicePackage, CertifiedReader } from '../types';
import { 
  Sparkles, ShieldCheck, CheckCircle2, PhoneCall, Calendar, Clock, 
  Copy, Check, ExternalLink, ArrowRight, Star, HeartHandshake, Lock, User
} from 'lucide-react';
import { 
  triggerLeadAndAppointment, LeadPayload, DispatchResult, 
  CAL_COM_URL, OFFICIAL_MOBILE, LEAD_TRIGGER_EMAIL, OFFICIAL_APPOINTMENT_EMAIL 
} from '../lib/leadService';
import { cosmicAudio } from '../lib/audio';
import confetti from 'canvas-confetti';

interface BookingPageProps {
  onNavigate: (page: string) => void;
  preselectedPackageId?: string;
  preselectedReaderId?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate,
  preselectedPackageId,
  preselectedReaderId
}) => {
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage>(() => {
    return SERVICE_PACKAGES.find((p) => p.id === preselectedPackageId) || SERVICE_PACKAGES[1];
  });

  const selectedReader: CertifiedReader = CERTIFIED_READERS.find((r) => r.id === preselectedReaderId) || CERTIFIED_READERS[0];

  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [bookingTime, setBookingTime] = useState('04:00 PM');
  const [seekerName, setSeekerName] = useState('');
  const [seekerEmail, setSeekerEmail] = useState('');
  const [seekerPhone, setSeekerPhone] = useState('');
  const [seekerQuestion, setSeekerQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [_dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [_lastPayload, setLastPayload] = useState<LeadPayload | null>(null);
  const [copiedWelcome, setCopiedWelcome] = useState(false);

  const handleSelectPackage = (pkg: ServicePackage) => {
    cosmicAudio.playChime(640, 0.35);
    setSelectedPkg(pkg);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    cosmicAudio.playChime(720, 0.4);

    const ref = `AST-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRefId(ref);

    const payload: LeadPayload = {
      referenceId: ref,
      name: seekerName || 'Cosmic Seeker',
      email: seekerEmail,
      phone: seekerPhone || OFFICIAL_MOBILE,
      packageId: selectedPkg.id,
      packageName: selectedPkg.title,
      packagePrice: selectedPkg.price,
      readerId: selectedReader.id,
      readerName: selectedReader.name,
      date: bookingDate,
      time: bookingTime,
      calComLink: `${CAL_COM_URL}/${selectedPkg.id}`,
      question: seekerQuestion,
      recipientEmail: LEAD_TRIGGER_EMAIL,
      createdAt: new Date().toISOString()
    };

    setLastPayload(payload);

    // Trigger lead & appointment dispatch
    const res = await triggerLeadAndAppointment(payload);
    setDispatchResult(res);

    setIsSubmitting(false);
    setBookingSuccess(true);
    cosmicAudio.playCelebration();

    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.4 }
      });
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyConfirmation = () => {
    const summary = `🔮 ASTRAL TAROT 24 — BOOKING CONFIRMATION
Reference ID: ${bookingRefId}
Seeker Name: ${seekerName}
Session: ${selectedPkg.title} (${selectedPkg.duration})
Price: ${selectedPkg.price}
Date & Time: ${bookingDate} at ${bookingTime} (IST)
WhatsApp Helpline: +91 ${OFFICIAL_MOBILE}
Direct Cal.com Link: ${CAL_COM_URL}/${selectedPkg.id}`;

    navigator.clipboard.writeText(summary);
    setCopiedWelcome(true);
    cosmicAudio.playChime(800, 0.3);
    setTimeout(() => setCopiedWelcome(false), 2500);
  };

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        category="Sacred Consultations"
        title="Book Your Sacred Reading"
        highlightedTitle="& Live Consultation"
        badge="cal.com Live Integration • 24/7 Priority"
        description="Reserve your private 1-on-1 audio/video consultation with an Astral Tarot 24 certified master mystic. Transparent pricing, zero hidden charges, and guaranteed confidential sanctuary."
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!bookingSuccess ? (
          <form onSubmit={handleConfirmBooking} className="space-y-12">
            {/* STEP 1: Select Consultation Tier */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] to-[#fef08a] text-[#07080f] font-bold text-sm flex items-center justify-center shadow-md">
                  1
                </span>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Select Your Consultation Session
                  </h3>
                  <p className="text-xs text-[#94a3b8]">
                    Choose the duration and depth of exploration that aligns with your inquiry.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICE_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => handleSelectPackage(pkg)}
                      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#15193d] border-[#ffd700] ring-2 ring-[#ffd700]/50 shadow-xl shadow-[#d4af37]/20 scale-[1.02]'
                          : 'bg-[#0e1124] border-[#232747] hover:border-[#3b4478] hover:bg-[#121630]'
                      }`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#b38827] via-[#eab308] to-[#dfb743] text-[#07080f] shadow-xs">
                          {pkg.badge}
                        </span>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-base text-white">
                            {pkg.title}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-[#ffd700] shrink-0" />
                          )}
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="font-serif font-extrabold text-2xl text-[#fef08a]">
                            {pkg.price}
                          </span>
                          <span className="text-xs text-[#94a3b8] line-through">
                            {pkg.originalPrice}
                          </span>
                          <span className="text-xs text-[#a5b4fc] font-medium ml-auto flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                            {pkg.duration}
                          </span>
                        </div>

                        <p className="text-xs text-[#cbd5e1] leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#232747]/60">
                        <ul className="space-y-1.5 text-[11px] text-[#cbd5e1]">
                          {pkg.features.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#ffd700] shrink-0 mt-0.5">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Interactive Date & Time Picker */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] to-[#fef08a] text-[#07080f] font-bold text-sm flex items-center justify-center shadow-md">
                  2
                </span>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Choose Your Preferred Date & Time Slot
                  </h3>
                  <p className="text-xs text-[#94a3b8]">
                    All time slots are displayed in Indian Standard Time (IST). Live cal.com sync guaranteed.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-[#0e1124] border border-[#232747] p-4 sm:p-8 shadow-xl">
                <CalendarTimeSlotPicker
                  selectedDate={bookingDate}
                  selectedTime={bookingTime}
                  onDateChange={setBookingDate}
                  onTimeChange={setBookingTime}
                />
              </div>
            </div>

            {/* STEP 3: Seeker Details & Intentions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] to-[#fef08a] text-[#07080f] font-bold text-sm flex items-center justify-center shadow-md">
                    3
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                      Your Details & Sacred Intentions
                    </h3>
                    <p className="text-xs text-[#94a3b8]">
                      Enter where we should dispatch your consultation link and reader dossier.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1124] border border-[#232747] shadow-xl space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={seekerName}
                      onChange={(e) => setSeekerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080a18] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={seekerEmail}
                        onChange={(e) => setSeekerEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080a18] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-[#ffd700]" />
                        <span>WhatsApp Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={seekerPhone}
                        onChange={(e) => setSeekerPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080a18] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                      Specific Question or Sacred Intention (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any specific dilemmas, areas of inquiry (love, career, marriage, finance), or intentions you wish to explore with your reader..."
                      value={seekerQuestion}
                      onChange={(e) => setSeekerQuestion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080a18] border border-[#2e3663] text-white text-sm focus:outline-none focus:border-[#ffd700] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Summary & Confirmation Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c59b27] to-[#fef08a] text-[#07080f] font-bold text-sm flex items-center justify-center shadow-md">
                    4
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                      Reservation Summary
                    </h3>
                    <p className="text-xs text-[#94a3b8]">
                      Verify details and confirm your consultation.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#121638] via-[#0d1028] to-[#0a0d20] border-2 border-[#d4af37]/40 shadow-2xl space-y-5">
                  <div className="border-b border-[#232747] pb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#94a3b8] uppercase font-serif tracking-wider">
                        Selected Package
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#1e2348] text-[#ffd700] font-semibold">
                        {selectedPkg.duration}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-xl text-white">
                      {selectedPkg.title}
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#cbd5e1]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
                        <span>Scheduled Date:</span>
                      </span>
                      <strong className="text-white font-serif">{bookingDate}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                        <span>Scheduled Time:</span>
                      </span>
                      <strong className="text-white font-serif">{bookingTime} (IST)</strong>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#232747]/60">
                      <span>Standard Consultation Fee:</span>
                      <span className="line-through text-[#94a3b8]">{selectedPkg.originalPrice}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-white text-sm">Total Investment:</span>
                      <span className="font-serif font-extrabold text-2xl text-[#fef08a]">
                        {selectedPkg.price}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#b38827] via-[#eab308] to-[#dfb743] text-[#07080f] font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-[#d4af37]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 text-[#07080f] ${isSubmitting ? 'animate-spin' : ''}`} />
                    <span>{isSubmitting ? 'Securing Priority Slot...' : 'Confirm & Schedule Sacred Session'}</span>
                    <ArrowRight className="w-4 h-4 text-[#07080f]" />
                  </button>

                  <div className="pt-2 border-t border-[#232747]/60 space-y-2 text-[11px] text-[#94a3b8]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#ffd700] shrink-0" />
                      <span>100% Confidentiality & Sanctity Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>256-bit Encrypted Priority Scheduling with cal.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* BOOKING SUCCESS SCREEN */
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#0e1124] border-2 border-[#d4af37] p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Check className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-serif tracking-widest text-[#ffd700] font-bold">
                Sacred Session Reserved
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-white">
                Blessings, {seekerName || 'Cosmic Seeker'}!
              </h3>
              <p className="text-sm text-[#cbd5e1] max-w-xl mx-auto">
                Your consultation request has been officially recorded and dispatched to our Master Reading Chamber.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141838] border border-[#2e3663] text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#232747]">
                <span className="text-[#94a3b8]">Reference ID:</span>
                <strong className="text-[#ffd700] font-mono text-sm font-bold">{bookingRefId}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Session Tier:</span>
                <span className="text-white font-semibold">{selectedPkg.title} ({selectedPkg.duration})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Scheduled Date:</span>
                <span className="text-white font-semibold">{bookingDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Scheduled Time:</span>
                <span className="text-white font-semibold">{bookingTime} (IST)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#232747]">
                <span className="text-[#94a3b8]">Investment:</span>
                <strong className="text-[#fef08a] font-serif text-sm">{selectedPkg.price}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`${CAL_COM_URL}/${selectedPkg.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b38827] via-[#eab308] to-[#dfb743] text-[#07080f] font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#07080f]" />
                <span>Add to Google / Apple Calendar via Cal.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyConfirmation}
                className="px-5 py-3 rounded-xl bg-[#1a214d] hover:bg-[#232c66] text-[#cbd5e1] border border-[#2e3663] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                {copiedWelcome ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#ffd700]" />}
                <span>{copiedWelcome ? 'Summary Copied!' : 'Copy Dossier'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#090b17] border border-[#232747] text-xs text-[#94a3b8] max-w-lg mx-auto space-y-1">
              <p>
                A priority lead confirmation has been generated and dispatched to <strong className="text-white">{OFFICIAL_APPOINTMENT_EMAIL}</strong>.
              </p>
              <p>
                Need immediate coordination? Contact our official WhatsApp helpline at{' '}
                <a href={`tel:+91${OFFICIAL_MOBILE}`} className="text-[#ffd700] font-bold underline">
                  +91 {OFFICIAL_MOBILE}
                </a>.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-6 py-2.5 rounded-xl bg-[#141833] hover:bg-[#1a1f42] text-xs text-white border border-[#232747] transition-colors cursor-pointer"
              >
                Return to Sanctuary Home
              </button>

              <button
                type="button"
                onClick={() => onNavigate('spreads')}
                className="px-6 py-2.5 rounded-xl bg-[#1a1e3b] hover:bg-[#23274d] text-xs text-[#fef08a] border border-[#d4af37]/40 transition-colors cursor-pointer"
              >
                Explore Tarot Spreads
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
