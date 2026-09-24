import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesAndBooking } from '../components/ServicesAndBooking';
import { Sparkles, Calendar, ShieldCheck, Mail, PhoneCall, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { CAL_COM_URL, LEAD_TRIGGER_EMAIL, OFFICIAL_MOBILE, OFFICIAL_APPOINTMENT_EMAIL } from '../lib/leadService';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  preselectedPackageId?: string;
  preselectedReaderId?: string;
  onOpenBooking: (pkgId?: string, readerId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  preselectedPackageId,
  preselectedReaderId,
  onOpenBooking
}) => {
  return (
    <div className="space-y-12">
      <PageHeader
        category="Sacred Consultations"
        title="Consultation Services"
        highlightedTitle="& Sacred Pricing"
        badge="cal.com Live Scheduling Enabled"
        description="Private 1-on-1 video and audio consultations with certified Tarot Grandmasters and Vedic Astrologers. Transparent pricing, zero hidden charges, and guaranteed confidential sanctuary."
        onNavigateHome={() => onNavigate('home')}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Booking Integration Notice Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#121738] via-[#1a1c47] to-[#121738] border border-[#d4af37]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-[#cbd5e1]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="font-semibold text-white block">
                Official Lead & Booking Channels Active:
              </span>
              <span className="text-[11px] text-[#94a3b8]">
                Leads dispatched to <strong className="text-[#ffd700]">{LEAD_TRIGGER_EMAIL}</strong> • Confirmed at{' '}
                <strong className="text-white">{OFFICIAL_APPOINTMENT_EMAIL}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`tel:+91${OFFICIAL_MOBILE}`}
              className="px-3 py-1.5 rounded-lg bg-[#0e1124] border border-[#2e3663] text-white hover:text-[#ffd700] font-medium flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>+91 {OFFICIAL_MOBILE}</span>
            </a>

            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#232c66] hover:bg-[#2e3a85] text-[#fef08a] border border-[#d4af37]/50 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>cal.com/astraltarot24</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Services & Booking Component */}
      <ServicesAndBooking
        onOpenBooking={onOpenBooking}
        preselectedPackageId={preselectedPackageId}
        preselectedReaderId={preselectedReaderId}
      />

      {/* Consultation Guarantees and Preparation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1124] border border-[#232747] space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              The Astral Tarot 24 Sanctuary Standard
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] mt-2">
              Every consultation is conducted within strict ethical, confidential, and professional boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                <Lock className="w-4 h-4" />
                <span>100% Encrypted & Private</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                Your personal queries, audio/video sessions, and natal charts are strictly confidential. We never record or store personal sessions without explicit request.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-[#ffd700] font-semibold text-sm">
                <Calendar className="w-4 h-4" />
                <span>cal.com Guaranteed Scheduling</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                Choose your exact time slot in your timezone. Automatic Google Meet/Zoom room links and calendar invitations are dispatched instantly upon confirmation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141833] border border-[#262c54] space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Clarity Guarantee</span>
              </div>
              <p className="text-[#cbd5e1] leading-relaxed">
                If for any reason you do not resonate with your reader within the first 10 minutes of a session, we will reschedule you with another senior master free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
