import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, ExternalLink, Sparkles, Sun, Moon, Sunrise } from 'lucide-react';
import { cosmicAudio } from '../lib/audio';
import { useTranslation } from '../context/LanguageContext';

interface TimeSlot {
  id: string;
  time: string; // e.g. "10:00 AM IST"
  shortValue: string; // e.g. "10:00"
  label: string;
  phase: 'morning' | 'noon' | 'afternoon' | 'twilight' | 'midnight';
  badge?: string;
  status: 'available' | 'filling-fast' | 'popular';
}

const ALL_TIME_SLOTS: TimeSlot[] = [
  // Morning
  { id: 't-1000', time: '10:00 AM IST', shortValue: '10:00 AM', label: 'Morning Dew • Surya Dawn', phase: 'morning', status: 'available' },
  { id: 't-1115', time: '11:15 AM IST', shortValue: '11:15 AM', label: 'Clarity & Divine Purpose', phase: 'morning', status: 'available' },

  // Solar Zenith
  { id: 't-1230', time: '12:30 PM IST', shortValue: '12:30 PM', label: 'Solar Zenith • Truth & Vision', phase: 'noon', badge: 'High Energy', status: 'popular' },
  { id: 't-1400', time: '02:00 PM IST', shortValue: '02:00 PM', label: 'Midday Soul Alignment', phase: 'noon', status: 'available' },

  // Afternoon
  { id: 't-1600', time: '04:00 PM IST', shortValue: '04:00 PM', label: 'Afternoon Alignment', phase: 'afternoon', badge: 'Popular', status: 'popular' },
  { id: 't-1700', time: '05:00 PM IST', shortValue: '05:00 PM', label: 'Karmic Clearing', phase: 'afternoon', status: 'filling-fast' },

  // Twilight
  { id: 't-1830', time: '06:30 PM IST', shortValue: '06:30 PM', label: 'Sandhya Twilight • Twin Flame', phase: 'twilight', badge: 'Auspicious', status: 'filling-fast' },
  { id: 't-1930', time: '07:30 PM IST', shortValue: '07:30 PM', label: 'Intuitive Awakening', phase: 'twilight', status: 'popular' },

  // Midnight
  { id: 't-2115', time: '09:15 PM IST', shortValue: '09:15 PM', label: 'Astral Vision', phase: 'midnight', status: 'available' },
  { id: 't-2200', time: '10:00 PM IST', shortValue: '10:00 PM', label: 'Midnight Celestial • Deep Arcana', phase: 'midnight', badge: 'Silent Hour', status: 'filling-fast' },
];

interface CalendarTimeSlotPickerProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
  selectedTime: string; // e.g. "04:00 PM"
  onTimeChange: (time: string) => void;
  calComUrl?: string;
}

export const CalendarTimeSlotPicker: React.FC<CalendarTimeSlotPickerProps> = ({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  calComUrl = 'https://cal.com/astraltarot24'
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'picker' | 'calcom'>('picker');

  // Month navigation state
  const initialDate = useMemo(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  }, [selectedDate]);

  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth()); // 0-indexed

  // Today for comparison
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    cosmicAudio.playChime(520, 0.2);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    cosmicAudio.playChime(640, 0.2);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: { dayNumber: number; dateString: string; isPast: boolean; isToday: boolean }[] = [];

    for (let day = 1; day <= totalDays; day++) {
      const monthStr = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateString = `${currentYear}-${monthStr}-${dayStr}`;

      const thisDate = new Date(currentYear, currentMonth, day);
      thisDate.setHours(0, 0, 0, 0);

      const isPast = thisDate < today;
      const isToday = thisDate.getTime() === today.getTime();

      days.push({
        dayNumber: day,
        dateString,
        isPast,
        isToday
      });
    }

    return { firstDayIndex, days };
  }, [currentYear, currentMonth, today]);

  const handleSelectDate = (dateStr: string, isPast: boolean) => {
    if (isPast) return;
    cosmicAudio.playCardFlip();
    onDateChange(dateStr);
  };

  const handleSelectTime = (slot: TimeSlot) => {
    cosmicAudio.playChime(720, 0.3);
    onTimeChange(slot.shortValue);
  };

  const setRelativeDay = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    setCurrentYear(yyyy);
    setCurrentMonth(target.getMonth());
    onDateChange(dateStr);
    cosmicAudio.playChime(600, 0.2);
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'Select a date';
    try {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      return selectedDate;
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  return (
    <div className="space-y-3 rounded-2xl bg-[#0a0d1f] border border-[#2e3767] p-4 sm:p-5 shadow-xl">
      {/* Header with Mode Tabs and Cal.com URL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1f2549]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#182046] flex items-center justify-center border border-[#d4af37]/40 text-[#ffd700]">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
              <span>Interactive Calendar & Time Slots</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1e2952] text-[#ffd700] border border-[#d4af37]/40">
                cal.com Live Sync
              </span>
            </h4>
            <p className="text-[11px] text-[#94a3b8]">
              Reserve your sacred 1-on-1 reading in real time
            </p>
          </div>
        </div>

        {/* View Switcher: Interactive Picker vs Live Cal.com Scheduler */}
        <div className="flex items-center bg-[#070914] p-1 rounded-xl border border-[#232a52]">
          <button
            type="button"
            onClick={() => setActiveTab('picker')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'picker'
                ? 'bg-[#1e254e] text-[#fef08a] border border-[#d4af37]/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Altar Slots
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calcom')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'calcom'
                ? 'bg-[#1e254e] text-[#fef08a] border border-[#d4af37]/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <span>cal.com Portal</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#ffd700]" />
          </button>
        </div>
      </div>

      {activeTab === 'calcom' ? (
        /* Cal.com Live Embed & Direct Hub */
        <div className="space-y-3 py-2">
          <div className="p-3.5 rounded-xl bg-[#0e1430] border border-[#3b4578] flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-[#ffd700]">Official Booking Hub:</span>
                <span className="text-xs text-white font-mono">cal.com/astraltarot24</span>
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1">
                You can browse live calendar availability, verify mystic availability slots, or select your preferred date.
              </p>
            </div>
            <a
              href={calComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shrink-0"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#2b3360] bg-[#070810] h-[340px] relative shadow-inner">
            <iframe
              src={calComUrl}
              title="cal.com/astraltarot24 scheduler"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-[#94a3b8]">
              Selected on Altar: <strong className="text-white">{formattedSelectedDate}</strong> at <strong className="text-[#fef08a]">{selectedTime} IST</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('picker')}
              className="text-[#ffd700] hover:underline font-semibold"
            >
              ← Back to Altar Slot Picker
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Calendar & Time Slots View */
        <div className="space-y-4">
          {/* Quick Date Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-medium text-[#94a3b8] mr-1">Quick Select:</span>
            <button
              type="button"
              onClick={() => setRelativeDay(0)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-[#141938] hover:bg-[#1f2754] text-[#cbd5e1] hover:text-white border border-[#2c3563] transition-all"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setRelativeDay(1)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-[#141938] hover:bg-[#1f2754] text-[#cbd5e1] hover:text-white border border-[#2c3563] transition-all"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setRelativeDay(2)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-[#141938] hover:bg-[#1f2754] text-[#cbd5e1] hover:text-white border border-[#2c3563] transition-all"
            >
              In 2 Days
            </button>
            <button
              type="button"
              onClick={() => setRelativeDay(5)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-[#141938] hover:bg-[#1f2754] text-[#cbd5e1] hover:text-white border border-[#2c3563] transition-all"
            >
              Upcoming Weekend
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Monthly Calendar (5 cols) */}
            <div className="lg:col-span-6 rounded-xl bg-[#070914] p-3.5 border border-[#252c54] flex flex-col justify-between">
              {/* Calendar Month Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#ffd700]" />
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="w-7 h-7 rounded-lg bg-[#141836] hover:bg-[#202654] text-[#cbd5e1] flex items-center justify-center border border-[#2b3360] transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-7 h-7 rounded-lg bg-[#141836] hover:bg-[#202654] text-[#cbd5e1] flex items-center justify-center border border-[#2b3360] transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day of Week Labels */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <span key={d} className="text-[10px] font-bold text-[#64748b] uppercase">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty cells before month begins */}
                  {Array.from({ length: calendarDays.firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8" />
                  ))}

                  {/* Month Days */}
                  {calendarDays.days.map((dayObj) => {
                    const isSelected = selectedDate === dayObj.dateString;
                    return (
                      <button
                        key={dayObj.dateString}
                        type="button"
                        disabled={dayObj.isPast}
                        onClick={() => handleSelectDate(dayObj.dateString, dayObj.isPast)}
                        className={`h-8 w-full rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center relative ${
                          isSelected
                            ? 'bg-gradient-to-tr from-[#c59b27] via-[#eab308] to-[#fef08a] text-[#07080f] font-extrabold shadow-md shadow-[#d4af37]/40 scale-105 z-10'
                            : dayObj.isPast
                            ? 'text-[#333d6b] cursor-not-allowed opacity-40'
                            : 'text-[#cbd5e1] hover:text-white hover:bg-[#192048] cursor-pointer'
                        }`}
                      >
                        <span>{dayObj.dayNumber}</span>
                        {dayObj.isToday && !isSelected && (
                          <span className="w-1 h-1 rounded-full bg-[#ffd700] absolute bottom-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Summary Tag */}
              <div className="mt-3 pt-2 border-t border-[#181d3d] flex items-center justify-between text-[11px]">
                <span className="text-[#94a3b8]">Active Date:</span>
                <span className="text-[#fef08a] font-semibold">{formattedSelectedDate}</span>
              </div>
            </div>

            {/* Right: Interactive Time Slots (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>Select Time Slot (IST)</span>
                  </span>
                  <span className="text-[10px] text-[#94a3b8]">
                    Current Selection: <strong className="text-[#ffd700]">{selectedTime || '04:00 PM'}</strong>
                  </span>
                </div>

                {/* Slots Grid with Phase Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                  {ALL_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.shortValue || selectedTime === slot.time;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => handleSelectTime(slot)}
                        className={`p-2 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#181f4a] border-[#ffd700] shadow-md shadow-[#d4af37]/20 ring-1 ring-[#ffd700]'
                            : 'bg-[#090c1a] border-[#222950] hover:border-[#3d4782] hover:bg-[#10142c]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            {slot.phase === 'morning' && <Sunrise className="w-3 h-3 text-amber-300" />}
                            {slot.phase === 'noon' && <Sun className="w-3 h-3 text-yellow-400" />}
                            {slot.phase === 'afternoon' && <Sun className="w-3 h-3 text-orange-300" />}
                            {slot.phase === 'twilight' && <Moon className="w-3 h-3 text-purple-300" />}
                            {slot.phase === 'midnight' && <Sparkles className="w-3 h-3 text-indigo-300" />}
                            <span className={`text-xs font-bold ${isSelected ? 'text-[#fef08a]' : 'text-white'}`}>
                              {slot.time}
                            </span>
                          </div>

                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#ffd700] flex items-center justify-center text-[#07080f]">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="text-[#94a3b8] truncate max-w-[110px]">{slot.label}</span>
                          {slot.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#262c5c] text-[#fef08a] border border-[#d4af37]/30">
                              {slot.badge}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Synchronization Notice */}
              <div className="p-2.5 rounded-xl bg-[#0c1024] border border-[#232a52] flex items-center justify-between text-[11px] mt-2">
                <div className="flex items-center space-x-1.5 text-[#cbd5e1]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Synced: <strong className="text-[#fef08a]">cal.com/astraltarot24</strong>
                  </span>
                </div>
                <a
                  href={calComUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffd700] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
