export type ArcanaType = 'Major' | 'Minor';
export type ElementType = 'Fire' | 'Water' | 'Air' | 'Earth';

export interface TarotCard {
  id: string;
  number: number;
  name: string;
  arcana: ArcanaType;
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  astrologicalRuler: string;
  element: ElementType;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  cosmicAffirmation: string;
  symbolism: string;
  glowColor: string;
}

export type SpreadType = 'single' | 'three' | 'love' | 'career' | 'celtic';

export interface SpreadPosition {
  title: string;
  description: string;
}

export interface SpreadConfig {
  id: SpreadType;
  name: string;
  cardCount: number;
  description: string;
  positions: SpreadPosition[];
}

export interface ZodiacColorTheme {
  primary: string;
  secondary?: string;
  name: string;
  meaning: string;
  bgGradient: string;
  unselectedIconBg: string;
  borderHover: string;
  activeTextColor: string;
  glowColor: string;
  themeHex: string;
  secondaryHex?: string;
  emblemBg: string;
  emblemBorder: string;
}

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: ElementType;
  dateRange: string;
  planet: string;
  luckyNumber: number;
  luckyColor: string;
  vibe: string;
  horoscope: {
    general: string;
    love: string;
    career: string;
    wellness: string;
  };
  companionCard: string;
  colorTheme: ZodiacColorTheme;
}

export interface CertifiedReader {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  hourlyRate: string;
  isAvailable: boolean;
  languages: string[];
}

export interface ServicePackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  originalPrice: string;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface SeekerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  service: string;
}
