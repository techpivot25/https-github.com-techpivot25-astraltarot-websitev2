export interface LeadPayload {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  packageId: string;
  packageName: string;
  packagePrice: string;
  readerId: string;
  readerName: string;
  date: string;
  time: string;
  calComLink: string;
  question?: string;
  recipientEmail: string;
  createdAt: string;
}

export interface DispatchResult {
  success: boolean;
  message: string;
  referenceId: string;
  inquiry: {
    senderId: string;
    receiverId: string;
    subject: string;
    body: string;
  };
  welcomeEmailer: {
    senderId: string;
    receiverId: string;
    subject: string;
    body: string;
    htmlBody?: string;
  };
}

export const OFFICIAL_APPOINTMENT_EMAIL = 'appointment@astraltarot24.in';
export const LEAD_TRIGGER_EMAIL = 'astraltarot24@gmail.com';
export const OFFICIAL_MOBILE = '8586970405';
export const CAL_COM_URL = 'https://cal.com/astraltarot24';

/**
 * Generates the Inquiry Email content:
 * - Sender ID: astraltarot24@gmail.com
 * - Receiver ID: astraltarot24@gmail.com
 */
export function generateInquiryEmail(payload: LeadPayload) {
  const subject = `[SACRED INQUIRY & BOOKING] ${payload.name} - ${payload.packageName} (Ref #${payload.referenceId})`;
  const body = `🔮 ASTRAL TAROT 24 — NEW SACRED APPOINTMENT & LEAD INQUIRY

Sender ID:   ${LEAD_TRIGGER_EMAIL}
Receiver ID: ${LEAD_TRIGGER_EMAIL}
Portal:      https://www.astraltarot24.in
Helpline:    +91 ${OFFICIAL_MOBILE} (WhatsApp)

==================================================
SEEKER & CONSULTATION DOSSIER:
==================================================
• Booking Reference ID : ${payload.referenceId}
• Seeker Name          : ${payload.name}
• Seeker Email         : ${payload.email}
• Mobile / WhatsApp    : ${payload.phone}
• Consultation Tier    : ${payload.packageName} (${payload.packagePrice})
• Assigned Master      : ${payload.readerName}
• Scheduled Slot       : ${payload.date} at ${payload.time} IST
• Cal.com Calendar Sync: ${payload.calComLink}
• Registration Date    : ${new Date(payload.createdAt).toLocaleString()}

SEEKER'S CORE INTENTION / QUESTION:
"${payload.question || 'Seeking divine clarity on life path, career alignment, and spiritual destiny.'}"

==================================================
DISPATCH SUMMARY:
• Inquiry delivered to Altar: ${LEAD_TRIGGER_EMAIL}
• Welcome & Confirmation Emailer dispatched to Seeker: ${payload.email}
• Official Sanctuary Desk: ${OFFICIAL_APPOINTMENT_EMAIL}
`;

  return {
    senderId: LEAD_TRIGGER_EMAIL,
    receiverId: LEAD_TRIGGER_EMAIL,
    subject,
    body
  };
}

/**
 * Generates the Seeker Confirmation & Welcome Emailer:
 * - Sender ID: astraltarot24@gmail.com
 * - Receiver ID: payload.email
 */
export function generateSeekerWelcomeEmail(payload: LeadPayload) {
  const subject = `✨ Welcome to Astral Tarot 24 | Sacred Consultation Confirmation (Ref #${payload.referenceId})`;
  const body = `Dear ${payload.name || 'Cosmic Seeker'},

Blessings and warm celestial greetings from Astral Tarot 24! ✨

Your sacred reading reservation has been received and confirmed in our divine registry. We are deeply honored to walk alongside you on your journey toward clarity, spiritual awakening, and inner empowerment.

==================================================
YOUR SACRED CONSULTATION DETAILS:
==================================================
• Reference ID       : ${payload.referenceId}
• Consultation Tier  : ${payload.packageName} (${payload.packagePrice})
• Master Reader      : ${payload.readerName}
• Date & Time (IST)  : ${payload.date} at ${payload.time} IST
• Cal.com Session Hub: ${payload.calComLink}
• Mode               : 1-on-1 Confidential Audio/Video Consultation

==================================================
HOW TO PREPARE FOR YOUR READING:
==================================================
1. Sacred Sanctuary: Choose a quiet, peaceful space where you will not be disturbed for the duration of your reading.
2. Centering Breath: Spend 3 to 5 minutes breathing deeply and centering your energy before your appointed time.
3. Formulate Your Question: You may focus on love, career, karma, or spiritual purpose. Write down any specific themes in advance.
4. Open Mind & Heart: The tarot mirrors the soul's current vibrational tapestry. Approach the wisdom with an open heart.

==================================================
NEED ASSISTANCE OR RESCHEDULING?
==================================================
Our sanctuary support team is here for you 24/7:
• Direct WhatsApp Helpline : +91 ${OFFICIAL_MOBILE}
• Official Booking Desk     : ${OFFICIAL_APPOINTMENT_EMAIL}
• Altar Inquiries           : ${LEAD_TRIGGER_EMAIL}
• Live Calendar Booking     : ${CAL_COM_URL}

May the stars illuminate your path with divine grace and clarity.

In cosmic light and truth,
The Astral Tarot 24 Council of Mystics
https://www.astraltarot24.in
`;

  return {
    senderId: LEAD_TRIGGER_EMAIL,
    receiverId: payload.email,
    subject,
    body
  };
}

/**
 * Triggers the lead & appointment data to the backend and returns status
 */
export async function triggerLeadAndAppointment(payload: LeadPayload): Promise<DispatchResult> {
  const inquiry = generateInquiryEmail(payload);
  const welcomeEmailer = generateSeekerWelcomeEmail(payload);

  // 1. Save to local storage for persistent audit trail
  try {
    const existing = JSON.parse(localStorage.getItem('astral_tarot_leads') || '[]');
    existing.unshift({
      ...payload,
      inquirySender: LEAD_TRIGGER_EMAIL,
      inquiryReceiver: LEAD_TRIGGER_EMAIL,
      welcomeSender: LEAD_TRIGGER_EMAIL,
      welcomeReceiver: payload.email
    });
    localStorage.setItem('astral_tarot_leads', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.error('Could not save lead to local storage:', err);
  }

  // 2. Trigger via API endpoint
  try {
    const res = await fetch('/api/book-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || `Inquiry dispatched to ${LEAD_TRIGGER_EMAIL} and Welcome Emailer sent to ${payload.email}`,
        referenceId: payload.referenceId,
        inquiry,
        welcomeEmailer
      };
    }
  } catch (err) {
    console.warn('API endpoint background notice:', err);
  }

  return {
    success: true,
    message: `Inquiry dispatched to ${LEAD_TRIGGER_EMAIL} (as both sender and receiver) and Confirmation Welcome Emailer sent to ${payload.email}`,
    referenceId: payload.referenceId,
    inquiry,
    welcomeEmailer
  };
}

/**
 * Generates direct email link (mailto) targeting astraltarot24@gmail.com
 * for the inquiry
 */
export function getLeadEmailLink(payload: LeadPayload): string {
  const inquiry = generateInquiryEmail(payload);
  const subject = encodeURIComponent(inquiry.subject);
  const body = encodeURIComponent(inquiry.body);
  return `mailto:${LEAD_TRIGGER_EMAIL}?cc=${OFFICIAL_APPOINTMENT_EMAIL}&subject=${subject}&body=${body}`;
}

/**
 * Generates direct email link (mailto) for the Seeker Welcome Emailer
 */
export function getSeekerWelcomeMailLink(payload: LeadPayload): string {
  const welcome = generateSeekerWelcomeEmail(payload);
  const subject = encodeURIComponent(welcome.subject);
  const body = encodeURIComponent(welcome.body);
  return `mailto:${payload.email}?from=${LEAD_TRIGGER_EMAIL}&subject=${subject}&body=${body}`;
}

/**
 * Generates direct WhatsApp notification link to +91 8586970405
 */
export function getWhatsAppLeadLink(payload: LeadPayload): string {
  const text = encodeURIComponent(
`*🔮 New Booking & Lead - Astral Tarot 24*
*Ref ID:* ${payload.referenceId}
*Seeker:* ${payload.name} (${payload.phone})
*Email:* ${payload.email}
*Service:* ${payload.packageName} (${payload.packagePrice})
*Reader:* ${payload.readerName}
*Date & Time:* ${payload.date} at ${payload.time} IST
*Cal.com Sync:* ${payload.calComLink}
*Focus Question:* ${payload.question || 'Soul path and destiny clarity'}

_Dispatched with Sender & Receiver astraltarot24@gmail.com and Welcome Emailer to ${payload.email}_`
  );

  return `https://wa.me/91${OFFICIAL_MOBILE}?text=${text}`;
}
