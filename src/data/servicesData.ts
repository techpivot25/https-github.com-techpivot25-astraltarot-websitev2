import { CertifiedReader, ServicePackage, SeekerReview } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'astral-express',
    title: 'Astral Express Clarity',
    duration: '15 Minutes',
    price: '₹999',
    originalPrice: '₹1,499',
    badge: 'Quick Answers',
    description: 'Perfect for single urgent dilemmas, immediate love or career crossroad questions, and swift cosmic alignment.',
    features: [
      '1 to 2 Specific Life Questions',
      '3-Card Tarot Spread Analysis',
      'Audio & Video Session with Master Reader',
      'Personalized Daily Cosmic Affirmation',
      'Same-day Priority Slot Scheduling'
    ]
  },
  {
    id: 'celestial-destiny',
    title: 'Celestial Destiny & Deep Spread',
    duration: '30 Minutes',
    price: '₹1,899',
    originalPrice: '₹2,799',
    badge: 'Most Popular',
    popular: true,
    description: 'Our signature in-depth exploration uncovering karmic roots, relationship trajectories, and next 6-month timeline.',
    features: [
      'Multi-Spread Celtic Cross & Timeline',
      'Love, Career, & Financial Breakdown',
      'Chakra & Auric Energy Reading',
      'Recorded Session Summary PDF',
      'Remedial Astrological Guidance',
      '24/7 Follow-up Chat with Reader'
    ]
  },
  {
    id: 'cosmic-blueprint',
    title: 'Cosmic Soul Map & Life Mastery',
    duration: '60 Minutes',
    price: '₹3,499',
    originalPrice: '₹4,999',
    badge: 'Full Transformation',
    description: 'Comprehensive spiritual immersion combining Advanced Tarot, Vedic Kundli/Birth Chart synthesis, and Karmic clearing.',
    features: [
      'Complete 10-Card Master Celtic Cross',
      'Birth Chart & Planetary Transit Synergy',
      'Twin Flame & Karmic Ties Diagnostic',
      'Personalized Crystal & Gemstone Advice',
      'Full Video Recording & Detailed Dossier',
      'Direct Priority Line to Senior Reader for 30 Days'
    ]
  },
  {
    id: 'twin-flame',
    title: 'Twin Flame & Sacred Union',
    duration: '45 Minutes',
    price: '₹2,599',
    originalPrice: '₹3,699',
    badge: 'Love Special',
    description: 'Specialized deep-dive for soulmates, twin flames in separation or union, third-party blockages, and sacred reconciliations.',
    features: [
      'Both Partners\' Subconscious Alignment',
      'Obstacles, Illusions, & Hidden Feelings',
      'Timeline to Reunion / Harmonization',
      'Telepathic & Energetic Cord Clearing Advice',
      'Astrological Synastry Snapshot'
    ]
  }
];

export const CERTIFIED_READERS: CertifiedReader[] = [
  {
    id: 'elena-varma',
    name: 'Master Elena Varma',
    title: 'Senior High Priestess & Astrotarot Mystic',
    experience: '18+ Years Experience',
    specialty: 'Love, Twin Flames & Karmic Cycles',
    rating: 4.98,
    reviewCount: 2840,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: 'Initiated in sacred Himalayan and Western hermetic traditions. Known for razor-sharp predictive clarity and deep emotional compassion.',
    hourlyRate: '₹1,899',
    isAvailable: true,
    languages: ['English']
  },
  {
    id: 'aarav-shastri',
    name: 'Aarav Shastri',
    title: 'Vedic Astrologer & Tarot Alchemist',
    experience: '14+ Years Experience',
    specialty: 'Career, Wealth & Business Destiny',
    rating: 4.95,
    reviewCount: 1920,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Blending ancient Jyotish wisdom with modern Tarot archetypes. Trusted advisor to entrepreneurs, executives, and creatives across India and overseas.',
    hourlyRate: '₹1,899',
    isAvailable: true,
    languages: ['English', 'Sanskrit']
  },
  {
    id: 'selene-thorne',
    name: 'Selene Thorne',
    title: 'Akashic Reader & Celestial Intuitive',
    experience: '12+ Years Experience',
    specialty: 'Past Lives, Spiritual Awakening & Healing',
    rating: 4.97,
    reviewCount: 1640,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    bio: 'Specializing in ancestral clearing, dream revelations, and psychic mediumship. Helping seekers unlock their true soul blueprint.',
    hourlyRate: '₹1,999',
    isAvailable: false,
    languages: ['English', 'French']
  },
  {
    id: 'maya-kapoor',
    name: 'Maya Kapoor',
    title: 'Relationship Empath & Oracle Mystic',
    experience: '9+ Years Experience',
    specialty: 'Soulmate Reconciliation & Marriage Timing',
    rating: 4.92,
    reviewCount: 1180,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: 'Gentle, soothing presence with pinpoint accuracy in deciphering complex romantic knots and uncovering hidden intentions.',
    hourlyRate: '₹1,499',
    isAvailable: true,
    languages: ['English']
  }
];

export const SEEKER_REVIEWS: SeekerReview[] = [
  {
    id: 'rev-1',
    author: 'Pooja Deshmukh',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'Yesterday',
    service: 'Celestial Destiny (30 Mins)',
    text: 'I was in deep despair regarding a career deadlock and confusing feelings for someone. Master Elena picked up exact dates and scenarios without me uttering a word. Two weeks later, everything unfolded exactly as her cards revealed. Astral Tarot 24 is genuinely a sanctuary of real spiritual light.'
  },
  {
    id: 'rev-2',
    author: 'Rohan Malhotra',
    location: 'New Delhi',
    rating: 5,
    date: '3 days ago',
    service: 'Cosmic Soul Map (60 Mins)',
    text: 'Aarav Shastri combined my birth chart with the Celtic Cross spread so seamlessly. His guidance saved my startup from a catastrophic partnership and redirected our strategy. The accuracy is 100% genuine and the energetic peace after the session was priceless.'
  },
  {
    id: 'rev-3',
    author: 'Ananya Sen',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '1 week ago',
    service: 'Twin Flame & Sacred Union',
    text: 'My counterpart had ghosted me for 4 months. Maya predicted that on the next full moon, he would reach out with an apology. On that exact evening, my phone rang. The insights helped me stay grounded rather than desperate. Eternally grateful.'
  },
  {
    id: 'rev-4',
    author: 'Vikramaditya Rao',
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: '2 weeks ago',
    service: 'Daily Astral Tarot Draw',
    text: 'I draw my card every morning before market opening. The synchronicity is chillingly accurate day after day. The interface is gorgeous, calming, and deeply spiritual.'
  },
  {
    id: 'rev-5',
    author: 'Dr. Sarah Jenkins',
    location: 'London, UK (Seeker)',
    rating: 5,
    date: '2 weeks ago',
    service: 'Celestial Destiny (30 Mins)',
    text: 'As a skeptic who studies cognitive science, I wanted to see if tarot had depth. Selene read my past trauma and unspoken ambitions with precision that defies coincidences. Astral Tarot 24 is top tier.'
  }
];

export const FAQS = [
  {
    question: 'How do online Tarot readings work at Astral Tarot 24?',
    answer: 'You can experience instant automated interactive readings anytime 24/7 on our portal, or book a live 1-on-1 private video or audio consultation with our verified master tarot readers. In live sessions, your reader connects deeply with your auric energy to unveil comprehensive timelines and spiritual remedies.'
  },
  {
    question: 'Are the card draws truly random and spiritually aligned?',
    answer: 'Yes. Our digital deck uses true quantum entropy algorithms synchronized with real-time planetary transit timestamps, ensuring that the card pulled resonates with your energetic resonance at the exact second you click.'
  },
  {
    question: 'What is the difference between Upright and Reversed Tarot cards?',
    answer: 'An Upright card represents direct, harmonious, and externalized manifestations of that archetype. A Reversed card does not mean "bad luck"—rather, it indicates blocked energy, internal subconscious processing, or an invitation to pause and address underlying fears.'
  },
  {
    question: 'Can I book a consultation from outside India?',
    answer: 'Absolutely. Astral Tarot 24 serves seekers globally across the US, UK, Canada, UAE, Singapore, and Australia. Our readers offer sessions across all international time zones around the clock (24/7).'
  },
  {
    question: 'What should I prepare before my Tarot session?',
    answer: 'Find a calm, quiet room. Take three deep diaphragmatic breaths, set a clear heart intention, and have a notebook ready. Feel free to bring specific questions about love, career, or life transitions.'
  }
];
