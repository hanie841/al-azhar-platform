'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  MapPin,
  Building2,
  BookOpen,
  Landmark,
  Library,
  ScrollText,
  Stethoscope,
  Hospital,
  Home,
  Users,
} from 'lucide-react';
import { TourStop } from './TourStop';
import type { TourStopData } from './TourStop';

const AUTOPLAY_INTERVAL = 8000;

export function VirtualTourPage() {
  const t = useTranslations('tour');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [currentStop, setCurrentStop] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [tourComplete, setTourComplete] = useState(false);

  const tourStops: TourStopData[] = useMemo(
    () => [
      {
        id: 1,
        nameKey: 'Al-Azhar Mosque',
        nameAr: '\u0627\u0644\u062c\u0627\u0645\u0639 \u0627\u0644\u0623\u0632\u0647\u0631',
        descriptionEn:
          'The heart of Al-Azhar University and one of the most important mosques in the Islamic world. Founded in 970 CE by the Fatimid dynasty, it has served as a center for Islamic learning for over a millennium.',
        descriptionAr:
          '\u0642\u0644\u0628 \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u0648\u0623\u062d\u062f \u0623\u0647\u0645 \u0627\u0644\u0645\u0633\u0627\u062c\u062f \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a. \u062a\u0623\u0633\u0633 \u0639\u0627\u0645 970\u0645 \u0639\u0644\u0649 \u064a\u062f \u0627\u0644\u062f\u0648\u0644\u0629 \u0627\u0644\u0641\u0627\u0637\u0645\u064a\u0629\u060c \u0648\u0642\u062f \u0638\u0644 \u0645\u0631\u0643\u0632\u0627\u064b \u0644\u0644\u062a\u0639\u0644\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0644\u0623\u0643\u062b\u0631 \u0645\u0646 \u0623\u0644\u0641 \u0639\u0627\u0645.',
        funFactEn:
          'Al-Azhar Mosque is considered the oldest degree-granting university in the world, predating the University of Bologna by over a century.',
        funFactAr:
          '\u064a\u0639\u062a\u0628\u0631 \u0627\u0644\u062c\u0627\u0645\u0639 \u0627\u0644\u0623\u0632\u0647\u0631 \u0623\u0642\u062f\u0645 \u062c\u0627\u0645\u0639\u0629 \u062a\u0645\u0646\u062d \u062f\u0631\u062c\u0627\u062a \u0639\u0644\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u060c \u062d\u064a\u062b \u0633\u0628\u0642\u062a \u062c\u0627\u0645\u0639\u0629 \u0628\u0648\u0644\u0648\u0646\u064a\u0627 \u0628\u0623\u0643\u062b\u0631 \u0645\u0646 \u0642\u0631\u0646.',
        year: '970 CE',
        gradient: 'from-primary-600 to-primary-900',
        icon: <Landmark className="w-16 h-16" />,
      },
      {
        id: 2,
        nameKey: 'The Main Courtyard',
        nameAr: '\u0627\u0644\u0635\u062d\u0646 \u0627\u0644\u0631\u0626\u064a\u0633\u064a',
        descriptionEn:
          'The expansive main courtyard has witnessed centuries of scholarly discourse and communal prayer. Its elegant arcades and open space have hosted generations of students from across the globe.',
        descriptionAr:
          '\u0634\u0647\u062f \u0627\u0644\u0635\u062d\u0646 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u0627\u0644\u0648\u0627\u0633\u0639 \u0642\u0631\u0648\u0646\u0627\u064b \u0645\u0646 \u0627\u0644\u062d\u0648\u0627\u0631 \u0627\u0644\u0639\u0644\u0645\u064a \u0648\u0627\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u062c\u0645\u0627\u0639\u064a\u0629. \u0627\u0633\u062a\u0636\u0627\u0641\u062a \u0623\u0631\u0648\u0642\u062a\u0647 \u0627\u0644\u0623\u0646\u064a\u0642\u0629 \u0648\u0641\u0636\u0627\u0624\u0647 \u0627\u0644\u0631\u062d\u0628 \u0623\u062c\u064a\u0627\u0644\u0627\u064b \u0645\u0646 \u0627\u0644\u0637\u0644\u0627\u0628 \u0645\u0646 \u0645\u062e\u062a\u0644\u0641 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0639\u0627\u0644\u0645.',
        funFactEn:
          'In medieval times, students would form study circles (halaqat) in the courtyard, each led by a renowned scholar. Some circles attracted hundreds of students.',
        funFactAr:
          '\u0641\u064a \u0627\u0644\u0639\u0635\u0648\u0631 \u0627\u0644\u0648\u0633\u0637\u0649\u060c \u0643\u0627\u0646 \u0627\u0644\u0637\u0644\u0627\u0628 \u064a\u0634\u0643\u0644\u0648\u0646 \u062d\u0644\u0642\u0627\u062a \u062f\u0631\u0627\u0633\u064a\u0629 \u0641\u064a \u0627\u0644\u0635\u062d\u0646\u060c \u0643\u0644 \u0645\u0646\u0647\u0627 \u064a\u0642\u0648\u062f\u0647\u0627 \u0639\u0627\u0644\u0645 \u0634\u0647\u064a\u0631. \u0628\u0639\u0636 \u0627\u0644\u062d\u0644\u0642\u0627\u062a \u0643\u0627\u0646\u062a \u062a\u0633\u062a\u0642\u0637\u0628 \u0645\u0626\u0627\u062a \u0627\u0644\u0637\u0644\u0627\u0628.',
        gradient: 'from-amber-500 to-amber-800',
        icon: <MapPin className="w-16 h-16" />,
      },
      {
        id: 3,
        nameKey: 'The Minaret of Qaytbay',
        nameAr: '\u0645\u0626\u0630\u0646\u0629 \u0642\u0627\u064a\u062a\u0628\u0627\u064a',
        descriptionEn:
          'A masterpiece of Mamluk architecture, this 15th-century minaret was built under Sultan Qaytbay. Its intricate stonework and elegant proportions make it one of the finest examples of Islamic architecture in Cairo.',
        descriptionAr:
          '\u062a\u062d\u0641\u0629 \u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0645\u0645\u0644\u0648\u0643\u064a\u0629\u060c \u0628\u064f\u0646\u064a\u062a \u0647\u0630\u0647 \u0627\u0644\u0645\u0626\u0630\u0646\u0629 \u0641\u064a \u0627\u0644\u0642\u0631\u0646 \u0627\u0644\u062e\u0627\u0645\u0633 \u0639\u0634\u0631 \u0641\u064a \u0639\u0647\u062f \u0627\u0644\u0633\u0644\u0637\u0627\u0646 \u0642\u0627\u064a\u062a\u0628\u0627\u064a. \u062a\u062c\u0639\u0644\u0647\u0627 \u0632\u062e\u0627\u0631\u0641\u0647\u0627 \u0627\u0644\u062d\u062c\u0631\u064a\u0629 \u0627\u0644\u0645\u0639\u0642\u062f\u0629 \u0648\u0646\u0633\u0628\u0647\u0627 \u0627\u0644\u0623\u0646\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629 \u0645\u0646 \u0623\u0631\u0648\u0639 \u0623\u0645\u062b\u0644\u0629 \u0627\u0644\u0639\u0645\u0627\u0631\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u0642\u0627\u0647\u0631\u0629.',
        funFactEn:
          'Sultan Qaytbay was so impressed by Al-Azhar that he personally funded the minaret\'s construction. The double-finial design at its top was revolutionary for its time.',
        funFactAr:
          '\u0643\u0627\u0646 \u0627\u0644\u0633\u0644\u0637\u0627\u0646 \u0642\u0627\u064a\u062a\u0628\u0627\u064a \u0645\u0639\u062c\u0628\u0627\u064b \u0628\u0627\u0644\u0623\u0632\u0647\u0631 \u0644\u062f\u0631\u062c\u0629 \u0623\u0646\u0647 \u0645\u0648\u0651\u0644 \u0628\u0646\u0627\u0621 \u0627\u0644\u0645\u0626\u0630\u0646\u0629 \u0634\u062e\u0635\u064a\u0627\u064b. \u0643\u0627\u0646 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0642\u0645\u0629 \u0627\u0644\u0645\u0632\u062f\u0648\u062c\u0629 \u062b\u0648\u0631\u064a\u0627\u064b \u0641\u064a \u0639\u0635\u0631\u0647.',
        year: '1468 CE',
        gradient: 'from-stone-500 to-stone-800',
        icon: <Building2 className="w-16 h-16" />,
      },
      {
        id: 4,
        nameKey: 'The Central Library',
        nameAr: '\u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064a\u0629',
        descriptionEn:
          'Home to one of the most significant collections of Islamic manuscripts and rare books in the world. The library houses over 100,000 volumes, including manuscripts dating back to the earliest centuries of Islam.',
        descriptionAr:
          '\u062a\u0636\u0645 \u0648\u0627\u062d\u062f\u0629 \u0645\u0646 \u0623\u0647\u0645 \u0645\u062c\u0645\u0648\u0639\u0627\u062a \u0627\u0644\u0645\u062e\u0637\u0648\u0637\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0648\u0627\u0644\u0643\u062a\u0628 \u0627\u0644\u0646\u0627\u062f\u0631\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645. \u062a\u062d\u062a\u0648\u064a \u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0639\u0644\u0649 \u0623\u0643\u062b\u0631 \u0645\u0646 100,000 \u0645\u062c\u0644\u062f\u060c \u0628\u0645\u0627 \u0641\u064a \u0630\u0644\u0643 \u0645\u062e\u0637\u0648\u0637\u0627\u062a \u062a\u0639\u0648\u062f \u0625\u0644\u0649 \u0627\u0644\u0642\u0631\u0648\u0646 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0644\u0625\u0633\u0644\u0627\u0645.',
        funFactEn:
          'The library contains a handwritten Quran from the 7th century, one of the oldest known complete copies in existence.',
        funFactAr:
          '\u062a\u062d\u062a\u0648\u064a \u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0639\u0644\u0649 \u0645\u0635\u062d\u0641 \u0645\u062e\u0637\u0648\u0637 \u064a\u0639\u0648\u062f \u0625\u0644\u0649 \u0627\u0644\u0642\u0631\u0646 \u0627\u0644\u0633\u0627\u0628\u0639\u060c \u0648\u0647\u0648 \u0645\u0646 \u0623\u0642\u062f\u0645 \u0627\u0644\u0646\u0633\u062e \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0639\u0631\u0648\u0641\u0629 \u0641\u064a \u0627\u0644\u0648\u062c\u0648\u062f.',
        gradient: 'from-emerald-600 to-emerald-900',
        icon: <Library className="w-16 h-16" />,
      },
      {
        id: 5,
        nameKey: 'Faculty of Islamic Studies',
        nameAr: '\u0643\u0644\u064a\u0629 \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629',
        descriptionEn:
          'The oldest and most prestigious faculty at Al-Azhar, continuing a tradition of Islamic scholarship that dates back to the founding of the mosque. It remains the gold standard for Islamic education worldwide.',
        descriptionAr:
          '\u0623\u0642\u062f\u0645 \u0648\u0623\u0639\u0631\u0642 \u0643\u0644\u064a\u0629 \u0641\u064a \u0627\u0644\u0623\u0632\u0647\u0631\u060c \u062a\u0648\u0627\u0635\u0644 \u062a\u0642\u0644\u064a\u062f\u0627\u064b \u0639\u0644\u0645\u064a\u0627\u064b \u0625\u0633\u0644\u0627\u0645\u064a\u0627\u064b \u064a\u0639\u0648\u062f \u0625\u0644\u0649 \u062a\u0623\u0633\u064a\u0633 \u0627\u0644\u062c\u0627\u0645\u0639. \u0644\u0627 \u062a\u0632\u0627\u0644 \u0627\u0644\u0645\u0639\u064a\u0627\u0631 \u0627\u0644\u0630\u0647\u0628\u064a \u0644\u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u062d\u0648\u0644 \u0627\u0644\u0639\u0627\u0644\u0645.',
        funFactEn:
          'Graduates of this faculty include some of the most influential Islamic scholars in history, and its degree is recognized and respected in Muslim communities across all continents.',
        funFactAr:
          '\u064a\u0636\u0645 \u062e\u0631\u064a\u062c\u0648 \u0647\u0630\u0647 \u0627\u0644\u0643\u0644\u064a\u0629 \u0628\u0639\u0636 \u0623\u0643\u062b\u0631 \u0627\u0644\u0639\u0644\u0645\u0627\u0621 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u064a\u0646 \u062a\u0623\u062b\u064a\u0631\u0627\u064b \u0641\u064a \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u060c \u0648\u062f\u0631\u062c\u062a\u0647\u0627 \u0627\u0644\u0639\u0644\u0645\u064a\u0629 \u0645\u0639\u062a\u0631\u0641 \u0628\u0647\u0627 \u0641\u064a \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0645\u0633\u0644\u0645\u0629 \u0639\u0628\u0631 \u062c\u0645\u064a\u0639 \u0627\u0644\u0642\u0627\u0631\u0627\u062a.',
        year: '975 CE',
        gradient: 'from-indigo-600 to-indigo-900',
        icon: <BookOpen className="w-16 h-16" />,
      },
      {
        id: 6,
        nameKey: 'The Manuscript Museum',
        nameAr: '\u0645\u062a\u062d\u0641 \u0627\u0644\u0645\u062e\u0637\u0648\u0637\u0627\u062a',
        descriptionEn:
          'A treasure trove of Islamic heritage, the Manuscript Museum preserves rare documents spanning over a thousand years. From illuminated Qurans to scientific treatises, each piece tells a story of human knowledge and artistry.',
        descriptionAr:
          '\u0643\u0646\u0632 \u0645\u0646 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u060c \u064a\u062d\u0641\u0638 \u0645\u062a\u062d\u0641 \u0627\u0644\u0645\u062e\u0637\u0648\u0637\u0627\u062a \u0648\u062b\u0627\u0626\u0642 \u0646\u0627\u062f\u0631\u0629 \u062a\u0645\u062a\u062f \u0639\u0628\u0631 \u0623\u0643\u062b\u0631 \u0645\u0646 \u0623\u0644\u0641 \u0639\u0627\u0645. \u0645\u0646 \u0627\u0644\u0645\u0635\u0627\u062d\u0641 \u0627\u0644\u0645\u0632\u062e\u0631\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0639\u0644\u0645\u064a\u0629\u060c \u0643\u0644 \u0642\u0637\u0639\u0629 \u062a\u062d\u0643\u064a \u0642\u0635\u0629 \u0645\u0646 \u0642\u0635\u0635 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0648\u0627\u0644\u0641\u0646.',
        funFactEn:
          'The museum holds manuscripts in over 40 languages, including Arabic, Persian, Turkish, Urdu, and Malay, reflecting the global reach of Islamic scholarship.',
        funFactAr:
          '\u064a\u062d\u062a\u0648\u064a \u0627\u0644\u0645\u062a\u062d\u0641 \u0639\u0644\u0649 \u0645\u062e\u0637\u0648\u0637\u0627\u062a \u0628\u0623\u0643\u062b\u0631 \u0645\u0646 40 \u0644\u063a\u0629\u060c \u0645\u0646\u0647\u0627 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0641\u0627\u0631\u0633\u064a\u0629 \u0648\u0627\u0644\u062a\u0631\u0643\u064a\u0629 \u0648\u0627\u0644\u0623\u0631\u062f\u064a\u0629 \u0648\u0627\u0644\u0645\u0627\u0644\u064a\u0632\u064a\u0629\u060c \u0645\u0645\u0627 \u064a\u0639\u0643\u0633 \u0627\u0644\u0627\u0646\u062a\u0634\u0627\u0631 \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0644\u0644\u0639\u0644\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a.',
        gradient: 'from-rose-600 to-rose-900',
        icon: <ScrollText className="w-16 h-16" />,
      },
      {
        id: 7,
        nameKey: 'Faculty of Medicine',
        nameAr: '\u0643\u0644\u064a\u0629 \u0627\u0644\u0637\u0628',
        descriptionEn:
          'One of Egypt\'s leading medical schools, combining modern medical education with the university\'s tradition of holistic learning. It produces skilled physicians who serve communities across the Middle East and Africa.',
        descriptionAr:
          '\u0648\u0627\u062d\u062f\u0629 \u0645\u0646 \u0623\u0628\u0631\u0632 \u0643\u0644\u064a\u0627\u062a \u0627\u0644\u0637\u0628 \u0641\u064a \u0645\u0635\u0631\u060c \u062a\u062c\u0645\u0639 \u0628\u064a\u0646 \u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0637\u0628\u064a \u0627\u0644\u062d\u062f\u064a\u062b \u0648\u062a\u0642\u0644\u064a\u062f \u0627\u0644\u062c\u0627\u0645\u0639\u0629 \u0641\u064a \u0627\u0644\u062a\u0639\u0644\u0645 \u0627\u0644\u0634\u0627\u0645\u0644. \u062a\u062e\u0631\u0651\u062c \u0623\u0637\u0628\u0627\u0621 \u0645\u0647\u0631\u0629 \u064a\u062e\u062f\u0645\u0648\u0646 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0648\u0623\u0641\u0631\u064a\u0642\u064a\u0627.',
        funFactEn:
          'Al-Azhar\'s medical curriculum uniquely integrates medical ethics rooted in Islamic principles, producing doctors known for their compassionate approach to patient care.',
        funFactAr:
          '\u064a\u062f\u0645\u062c \u0627\u0644\u0645\u0646\u0647\u062c \u0627\u0644\u0637\u0628\u064a \u0644\u0644\u0623\u0632\u0647\u0631 \u0628\u0634\u0643\u0644 \u0641\u0631\u064a\u062f \u0623\u062e\u0644\u0627\u0642\u064a\u0627\u062a \u0627\u0644\u0637\u0628 \u0627\u0644\u0645\u062a\u062c\u0630\u0631\u0629 \u0641\u064a \u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629\u060c \u0645\u0645\u0627 \u064a\u0646\u062a\u062c \u0623\u0637\u0628\u0627\u0621 \u0645\u0639\u0631\u0648\u0641\u064a\u0646 \u0628\u0646\u0647\u062c\u0647\u0645 \u0627\u0644\u0631\u062d\u064a\u0645 \u0641\u064a \u0631\u0639\u0627\u064a\u0629 \u0627\u0644\u0645\u0631\u0636\u0649.',
        year: '1961',
        gradient: 'from-teal-600 to-teal-900',
        icon: <Stethoscope className="w-16 h-16" />,
      },
      {
        id: 8,
        nameKey: 'The University Hospital',
        nameAr: '\u0627\u0644\u0645\u0633\u062a\u0634\u0641\u0649 \u0627\u0644\u062c\u0627\u0645\u0639\u064a',
        descriptionEn:
          'Serving the local community and beyond, Al-Azhar University Hospital provides comprehensive healthcare while training the next generation of medical professionals. It offers subsidized care to underserved populations.',
        descriptionAr:
          '\u064a\u062e\u062f\u0645 \u0627\u0644\u0645\u0633\u062a\u0634\u0641\u0649 \u0627\u0644\u062c\u0627\u0645\u0639\u064a \u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0627\u0644\u0645\u062d\u0644\u064a \u0648\u0645\u0627 \u0628\u0639\u062f\u0647\u060c \u0648\u064a\u0648\u0641\u0631 \u0631\u0639\u0627\u064a\u0629 \u0635\u062d\u064a\u0629 \u0634\u0627\u0645\u0644\u0629 \u0645\u0639 \u062a\u062f\u0631\u064a\u0628 \u0627\u0644\u062c\u064a\u0644 \u0627\u0644\u0642\u0627\u062f\u0645 \u0645\u0646 \u0627\u0644\u0645\u0647\u0646\u064a\u064a\u0646 \u0627\u0644\u0637\u0628\u064a\u064a\u0646. \u064a\u0642\u062f\u0645 \u0631\u0639\u0627\u064a\u0629 \u0645\u062f\u0639\u0648\u0645\u0629 \u0644\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0623\u0643\u062b\u0631 \u0627\u062d\u062a\u064a\u0627\u062c\u0627\u064b.',
        funFactEn:
          'The hospital treats over 2 million patients annually, making it one of the busiest teaching hospitals in the Middle East.',
        funFactAr:
          '\u064a\u0639\u0627\u0644\u062c \u0627\u0644\u0645\u0633\u062a\u0634\u0641\u0649 \u0623\u0643\u062b\u0631 \u0645\u0646 2 \u0645\u0644\u064a\u0648\u0646 \u0645\u0631\u064a\u0636 \u0633\u0646\u0648\u064a\u0627\u064b\u060c \u0645\u0645\u0627 \u064a\u062c\u0639\u0644\u0647 \u0645\u0646 \u0623\u0643\u062b\u0631 \u0627\u0644\u0645\u0633\u062a\u0634\u0641\u064a\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0627\u0632\u062f\u062d\u0627\u0645\u0627\u064b \u0641\u064a \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637.',
        gradient: 'from-cyan-600 to-cyan-900',
        icon: <Hospital className="w-16 h-16" />,
      },
      {
        id: 9,
        nameKey: 'The Student City',
        nameAr: '\u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u062c\u0627\u0645\u0639\u064a\u0629',
        descriptionEn:
          'Home to thousands of international students from over 100 countries, the Student City is a vibrant multicultural community. It provides accommodation, dining, and recreational facilities for students from around the world.',
        descriptionAr:
          '\u0645\u0648\u0637\u0646 \u0644\u0622\u0644\u0627\u0641 \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u064a\u0646 \u0645\u0646 \u0623\u0643\u062b\u0631 \u0645\u0646 100 \u062f\u0648\u0644\u0629\u060c \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u062c\u0627\u0645\u0639\u064a\u0629 \u0645\u062c\u062a\u0645\u0639 \u0646\u0627\u0628\u0636 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u062b\u0642\u0627\u0641\u0627\u062a. \u062a\u0648\u0641\u0631 \u0627\u0644\u0633\u0643\u0646 \u0648\u0627\u0644\u0637\u0639\u0627\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u062a\u0631\u0641\u064a\u0647\u064a\u0629 \u0644\u0644\u0637\u0644\u0627\u0628 \u0645\u0646 \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0639\u0627\u0644\u0645.',
        funFactEn:
          'Students from Africa, Asia, Europe, and the Americas all live together, creating one of the most diverse university communities in the Middle East.',
        funFactAr:
          '\u064a\u0639\u064a\u0634 \u0637\u0644\u0627\u0628 \u0645\u0646 \u0623\u0641\u0631\u064a\u0642\u064a\u0627 \u0648\u0622\u0633\u064a\u0627 \u0648\u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u062a\u064a\u0646 \u0645\u0639\u0627\u064b\u060c \u0645\u0645\u0627 \u064a\u062e\u0644\u0642 \u0648\u0627\u062d\u062f\u0627\u064b \u0645\u0646 \u0623\u0643\u062b\u0631 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u062c\u0627\u0645\u0639\u064a\u0629 \u062a\u0646\u0648\u0639\u0627\u064b \u0641\u064a \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637.',
        gradient: 'from-violet-600 to-violet-900',
        icon: <Home className="w-16 h-16" />,
      },
      {
        id: 10,
        nameKey: 'The Conference Center',
        nameAr: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0624\u062a\u0645\u0631\u0627\u062a',
        descriptionEn:
          'A modern facility that hosts international conferences, interfaith dialogues, and academic symposiums. It represents Al-Azhar\'s commitment to global engagement and scholarly exchange in the 21st century.',
        descriptionAr:
          '\u0645\u0631\u0641\u0642 \u062d\u062f\u064a\u062b \u064a\u0633\u062a\u0636\u064a\u0641 \u0627\u0644\u0645\u0624\u062a\u0645\u0631\u0627\u062a \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0648\u062d\u0648\u0627\u0631\u0627\u062a \u0627\u0644\u0623\u062f\u064a\u0627\u0646 \u0648\u0627\u0644\u0646\u062f\u0648\u0627\u062a \u0627\u0644\u0639\u0644\u0645\u064a\u0629. \u064a\u0645\u062b\u0644 \u0627\u0644\u062a\u0632\u0627\u0645 \u0627\u0644\u0623\u0632\u0647\u0631 \u0628\u0627\u0644\u0627\u0646\u062e\u0631\u0627\u0637 \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0648\u0627\u0644\u062a\u0628\u0627\u062f\u0644 \u0627\u0644\u0639\u0644\u0645\u064a \u0641\u064a \u0627\u0644\u0642\u0631\u0646 \u0627\u0644\u062d\u0627\u062f\u064a \u0648\u0627\u0644\u0639\u0634\u0631\u064a\u0646.',
        funFactEn:
          'The center has hosted historic interfaith dialogues between Muslim, Christian, and Jewish leaders, promoting peace and understanding between civilizations.',
        funFactAr:
          '\u0627\u0633\u062a\u0636\u0627\u0641 \u0627\u0644\u0645\u0631\u0643\u0632 \u062d\u0648\u0627\u0631\u0627\u062a \u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0628\u064a\u0646 \u0627\u0644\u0623\u062f\u064a\u0627\u0646 \u0628\u064a\u0646 \u0642\u0627\u062f\u0629 \u0645\u0633\u0644\u0645\u064a\u0646 \u0648\u0645\u0633\u064a\u062d\u064a\u064a\u0646 \u0648\u064a\u0647\u0648\u062f\u060c \u0645\u0639\u0632\u0632\u0627\u064b \u0627\u0644\u0633\u0644\u0627\u0645 \u0648\u0627\u0644\u062a\u0641\u0627\u0647\u0645 \u0628\u064a\u0646 \u0627\u0644\u062d\u0636\u0627\u0631\u0627\u062a.',
        gradient: 'from-sky-600 to-sky-900',
        icon: <Users className="w-16 h-16" />,
      },
    ],
    []
  );

  const goToStop = useCallback(
    (index: number) => {
      if (index < 0 || index >= tourStops.length) return;
      setDirection(index > currentStop ? 1 : -1);
      setCurrentStop(index);
      setTourComplete(false);
    },
    [currentStop, tourStops.length]
  );

  const nextStop = useCallback(() => {
    if (currentStop < tourStops.length - 1) {
      setDirection(1);
      setCurrentStop((prev) => prev + 1);
    } else {
      setTourComplete(true);
      setIsAutoPlaying(false);
    }
  }, [currentStop, tourStops.length]);

  const prevStop = useCallback(() => {
    if (currentStop > 0) {
      setDirection(-1);
      setCurrentStop((prev) => prev - 1);
      setTourComplete(false);
    }
  }, [currentStop]);

  const restartTour = useCallback(() => {
    setDirection(-1);
    setCurrentStop(0);
    setTourComplete(false);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || tourComplete) return;
    const timer = setInterval(nextStop, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoPlaying, tourComplete, nextStop]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        isRtl ? prevStop() : nextStop();
      } else if (e.key === 'ArrowLeft') {
        isRtl ? nextStop() : prevStop();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStop, prevStop, isRtl]);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sand-300 mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Tour Progress Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto"
          >
            {tourStops.map((stop, index) => (
              <button
                key={stop.id}
                onClick={() => goToStop(index)}
                title={isRtl ? stop.nameAr : stop.nameKey}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  index === currentStop
                    ? 'bg-primary-600 text-white scale-110 shadow-lg shadow-primary-600/40'
                    : index < currentStop
                      ? 'bg-primary-400/50 text-white hover:bg-primary-500'
                      : 'bg-white/20 text-sand-300 hover:bg-white/30'
                }`}
              >
                {stop.id}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Tour Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={prevStop}
              disabled={currentStop === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-navy-800 text-navy-700 dark:text-sand-300 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isRtl ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
              {t('previousStop')}
            </button>
            <button
              onClick={nextStop}
              disabled={currentStop === tourStops.length - 1 && !tourComplete}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-primary-600/20"
            >
              {t('nextStop')}
              {isRtl ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Autoplay button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
                isAutoPlaying
                  ? 'bg-accent-600 text-white shadow-accent-600/20'
                  : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-sand-300 border border-sand-200 dark:border-navy-700 hover:border-accent-300'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  {t('pause')}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {t('autoPlay')}
                </>
              )}
            </button>

            {/* Stop counter */}
            <div className="text-sm text-sand-500 dark:text-sand-400 font-medium">
              {t('stop')} {currentStop + 1} {t('of')} {tourStops.length}
            </div>
          </div>
        </div>

        {/* Tour Stop Content */}
        {!tourComplete ? (
          <AnimatePresence mode="wait" custom={direction}>
            <TourStop
              key={tourStops[currentStop].id}
              stop={tourStops[currentStop]}
              totalStops={tourStops.length}
              direction={direction}
            />
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-4">
                {t('tourComplete')}
              </h2>
              <p className="text-navy-600 dark:text-sand-400 text-lg mb-8 leading-relaxed">
                {t('tourCompleteText')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={restartTour}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('restartTour')}
                </button>
                <a
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white dark:bg-navy-800 text-navy-700 dark:text-sand-300 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  {t('planVisit')}
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stop Sidebar / Jump Navigation */}
        {!tourComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-lg font-serif font-bold text-navy-900 dark:text-sand-100 mb-4">
              {t('jumpTo')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {tourStops.map((stop, index) => (
                <button
                  key={stop.id}
                  onClick={() => goToStop(index)}
                  className={`text-start p-3 rounded-xl text-sm transition-all border ${
                    index === currentStop
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-400'
                      : 'bg-white dark:bg-navy-800 border-sand-200 dark:border-navy-700 text-navy-700 dark:text-sand-300 hover:border-primary-200 dark:hover:border-primary-700'
                  }`}
                >
                  <span className="font-bold text-xs text-sand-400 dark:text-sand-500">
                    {stop.id}.
                  </span>
                  <div className="font-medium truncate mt-0.5">
                    {isRtl ? stop.nameAr : stop.nameKey}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
