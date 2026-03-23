'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Users,
  ExternalLink,
} from 'lucide-react';
import { SocialPostCard, type SocialPost, type PlatformType } from './SocialPostCard';

type FilterType = 'all' | PlatformType;

interface SocialAccount {
  platform: PlatformType;
  handle: string;
  url: string;
  followersCount: string;
  followersLabel: string;
  icon: string;
  gradient: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export function SocialWallPage() {
  const t = useTranslations('social');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const accounts: SocialAccount[] = useMemo(() => [
    {
      platform: 'twitter' as PlatformType,
      handle: '@AlAzharUniv',
      url: 'https://twitter.com/AlAzharUniv',
      followersCount: '2.5M',
      followersLabel: t('followers'),
      icon: '\ud835\udd4f',
      gradient: 'from-gray-800 to-black',
    },
    {
      platform: 'facebook' as PlatformType,
      handle: 'Al-Azhar University',
      url: 'https://facebook.com/AlAzharUniversity',
      followersCount: '5M',
      followersLabel: t('followers'),
      icon: 'f',
      gradient: 'from-[#1877F2] to-[#0d5bbf]',
    },
    {
      platform: 'instagram' as PlatformType,
      handle: '@alazhar_university',
      url: 'https://instagram.com/alazhar_university',
      followersCount: '1.8M',
      followersLabel: t('followers'),
      icon: 'IG',
      gradient: 'from-[#E4405F] via-[#C13584] to-[#833AB4]',
    },
    {
      platform: 'youtube' as PlatformType,
      handle: 'Al-Azhar University',
      url: 'https://youtube.com/@AlAzharUniversity',
      followersCount: '800K',
      followersLabel: t('subscribers'),
      icon: '\u25b6',
      gradient: 'from-[#FF0000] to-[#cc0000]',
    },
    {
      platform: 'linkedin' as PlatformType,
      handle: 'Al-Azhar University',
      url: 'https://linkedin.com/school/al-azhar-university',
      followersCount: '500K',
      followersLabel: t('followers'),
      icon: 'in',
      gradient: 'from-[#0A66C2] to-[#074a8f]',
    },
  ], [t]);

  const mockPosts: SocialPost[] = useMemo(() => [
    {
      id: 1,
      platform: 'twitter',
      content: isAr
        ? '\u0641\u062e\u0631 \u0643\u0628\u064a\u0631 \u0628\u062a\u0642\u062f\u0645 \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u0641\u064a \u062a\u0635\u0646\u064a\u0641 QS \u0627\u0644\u0639\u0627\u0644\u0645\u064a 2026\u060c \u062d\u064a\u062b \u062d\u0642\u0642\u062a \u0627\u0644\u0645\u0631\u062a\u0628\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0639\u0627\u0644\u0645\u064a\u0627\u064b \u0641\u064a \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629. \u0623\u0644\u0641 \u0639\u0627\u0645 \u0645\u0646 \u0627\u0644\u0631\u064a\u0627\u062f\u0629! \ud83c\udf1f'
        : 'Proud to announce Al-Azhar University has advanced in the QS World Rankings 2026, achieving #1 globally in Islamic Studies. A thousand years of leadership!',
      hasImage: false,
      date: '2026-03-22',
      likes: 12500,
      shares: 4200,
      comments: 890,
      url: 'https://twitter.com/AlAzharUniv/status/example1',
    },
    {
      id: 2,
      platform: 'facebook',
      content: isAr
        ? '\u062d\u0641\u0644 \u062a\u062e\u0631\u064a\u062c \u062f\u0641\u0639\u0629 2026 - \u0623\u0643\u062b\u0631 \u0645\u0646 15,000 \u062e\u0631\u064a\u062c \u0648\u062e\u0631\u064a\u062c\u0629 \u0627\u0646\u0636\u0645\u0648\u0627 \u0625\u0644\u0649 \u0635\u0641\u0648\u0641 \u062e\u0631\u064a\u062c\u064a \u0627\u0644\u0623\u0632\u0647\u0631 \u0627\u0644\u0645\u0645\u062a\u062f\u0629 \u0639\u0628\u0631 \u0623\u0644\u0641 \u0639\u0627\u0645. \u0645\u0628\u0627\u0631\u0643 \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u0631\u064a\u062c\u064a\u0646 \u0648\u0623\u0633\u0631\u0647\u0645!'
        : 'Class of 2026 Graduation Ceremony - Over 15,000 graduates joined the ranks of Al-Azhar alumni spanning a thousand years. Congratulations to all graduates and their families!',
      hasImage: true,
      date: '2026-03-20',
      likes: 45000,
      shares: 8900,
      comments: 3200,
      url: 'https://facebook.com/AlAzharUniversity/posts/example2',
    },
    {
      id: 3,
      platform: 'instagram',
      content: isAr
        ? '\u0635\u0628\u0627\u062d \u0627\u0644\u0646\u0648\u0631 \u0645\u0646 \u0627\u0644\u062c\u0627\u0645\u0639 \u0627\u0644\u0623\u0632\u0647\u0631 \u0627\u0644\u0634\u0631\u064a\u0641 \ud83c\udf05 \u0645\u0646\u0638\u0631 \u0627\u0644\u0634\u0631\u0648\u0642 \u0639\u0644\u0649 \u0645\u0622\u0630\u0646 \u0627\u0644\u0623\u0632\u0647\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 #\u0627\u0644\u0623\u0632\u0647\u0631 #\u0627\u0644\u0642\u0627\u0647\u0631\u0629 #\u062a\u0631\u0627\u062b_\u0625\u0633\u0644\u0627\u0645\u064a'
        : 'Sunrise over the historic minarets of Al-Azhar Mosque. A thousand years of standing as a beacon of knowledge. #AlAzhar #Cairo #IslamicHeritage',
      hasImage: true,
      date: '2026-03-19',
      likes: 28000,
      shares: 5100,
      comments: 1500,
      url: 'https://instagram.com/p/example3',
    },
    {
      id: 4,
      platform: 'youtube',
      content: isAr
        ? '\ud83c\udf99\ufe0f \u0645\u062d\u0627\u0636\u0631\u0629 \u0641\u0636\u064a\u0644\u0629 \u0627\u0644\u0625\u0645\u0627\u0645 \u0627\u0644\u0623\u0643\u0628\u0631 \u062d\u0648\u0644 "\u0627\u0644\u0648\u0633\u0637\u064a\u0629 \u0641\u064a \u0627\u0644\u0625\u0633\u0644\u0627\u0645" - \u0643\u0644\u0645\u0629 \u0645\u0644\u0647\u0645\u0629 \u062a\u062f\u0639\u0648 \u0625\u0644\u0649 \u0627\u0644\u062d\u0648\u0627\u0631 \u0648\u0627\u0644\u062a\u0641\u0627\u0647\u0645 \u0628\u064a\u0646 \u0627\u0644\u062b\u0642\u0627\u0641\u0627\u062a. \u0634\u0627\u0647\u062f\u0648\u0627 \u0627\u0644\u0645\u062d\u0627\u0636\u0631\u0629 \u0643\u0627\u0645\u0644\u0629.'
        : 'Grand Imam\'s lecture on "Moderation in Islam" - An inspiring address calling for dialogue and understanding between cultures. Watch the full lecture.',
      hasImage: true,
      date: '2026-03-18',
      likes: 35000,
      shares: 12000,
      comments: 4500,
      url: 'https://youtube.com/watch?v=example4',
    },
    {
      id: 5,
      platform: 'linkedin',
      content: isAr
        ? '\u064a\u0633\u0639\u062f\u0646\u0627 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0639\u0646 \u0634\u0631\u0627\u0643\u0629 \u062c\u062f\u064a\u062f\u0629 \u0645\u0639 \u062c\u0627\u0645\u0639\u0629 \u0623\u0643\u0633\u0641\u0648\u0631\u062f \u0644\u062a\u0628\u0627\u062f\u0644 \u0627\u0644\u0623\u0628\u062d\u0627\u062b \u0641\u064a \u0645\u062c\u0627\u0644 \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0648\u062d\u0648\u0627\u0631 \u0627\u0644\u062d\u0636\u0627\u0631\u0627\u062a. \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0627\u0643\u0629 \u062a\u0641\u062a\u062d \u0622\u0641\u0627\u0642\u0627\u064b \u062c\u062f\u064a\u062f\u0629 \u0644\u0637\u0644\u0627\u0628\u0646\u0627 \u0648\u0628\u0627\u062d\u062b\u064a\u0646\u0627.'
        : 'Excited to announce a new research partnership with Oxford University for collaborative studies in Islamic scholarship and interfaith dialogue. This opens new horizons for our students and researchers.',
      hasImage: false,
      date: '2026-03-17',
      likes: 8900,
      shares: 2100,
      comments: 560,
      url: 'https://linkedin.com/posts/example5',
    },
    {
      id: 6,
      platform: 'twitter',
      content: isAr
        ? '\u0637\u0627\u0644\u0628\u0629 \u0645\u0646 \u0643\u0644\u064a\u0629 \u0627\u0644\u0637\u0628 \u0628\u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u062a\u0641\u0648\u0632 \u0628\u062c\u0627\u0626\u0632\u0629 \u0623\u0641\u0636\u0644 \u0628\u062d\u062b \u0637\u0628\u064a \u0641\u064a \u0645\u0624\u062a\u0645\u0631 \u0627\u0644\u0637\u0628 \u0627\u0644\u062f\u0648\u0644\u064a. \u0646\u0641\u062e\u0631 \u0628\u0637\u0644\u0627\u0628\u0646\u0627! \ud83c\udfc6'
        : 'Al-Azhar Medical student wins Best Research Paper at the International Medical Conference. We are proud of our students!',
      hasImage: false,
      date: '2026-03-16',
      likes: 9800,
      shares: 3400,
      comments: 720,
      url: 'https://twitter.com/AlAzharUniv/status/example6',
    },
    {
      id: 7,
      platform: 'facebook',
      content: isAr
        ? '\u0627\u0641\u062a\u062a\u0627\u062d \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u062f\u0648\u0644\u064a \u0644\u0644\u0645\u062e\u0637\u0648\u0637\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0641\u064a \u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0623\u0632\u0647\u0631. \u064a\u0636\u0645 \u0627\u0644\u0645\u0639\u0631\u0636 \u0623\u0643\u062b\u0631 \u0645\u0646 500 \u0645\u062e\u0637\u0648\u0637\u0629 \u0646\u0627\u062f\u0631\u0629 \u062a\u0639\u0648\u062f \u0644\u0623\u0643\u062b\u0631 \u0645\u0646 \u0623\u0644\u0641 \u0639\u0627\u0645. \u0627\u0644\u062f\u062e\u0648\u0644 \u0645\u062c\u0627\u0646\u064a.'
        : 'Grand opening of the International Islamic Manuscripts Exhibition at Al-Azhar Library. Features over 500 rare manuscripts dating back more than a thousand years. Free admission.',
      hasImage: true,
      date: '2026-03-15',
      likes: 32000,
      shares: 7800,
      comments: 2100,
      url: 'https://facebook.com/AlAzharUniversity/posts/example7',
    },
    {
      id: 8,
      platform: 'instagram',
      content: isAr
        ? '\u0645\u0646 \u0623\u062c\u0645\u0644 \u0632\u0648\u0627\u064a\u0627 \u0627\u0644\u062d\u0631\u0645 \u0627\u0644\u062c\u0627\u0645\u0639\u064a \ud83c\udfdb\ufe0f \u0627\u0644\u0623\u0639\u0645\u062f\u0629 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0627\u0644\u062a\u064a \u0634\u0647\u062f\u062a \u0639\u0644\u0649 \u0623\u0644\u0641 \u0639\u0627\u0645 \u0645\u0646 \u0627\u0644\u0639\u0644\u0645 \u0648\u0627\u0644\u0625\u064a\u0645\u0627\u0646 #\u0627\u0644\u0623\u0632\u0647\u0631_\u0627\u0644\u0634\u0631\u064a\u0641'
        : 'One of the most beautiful corners of our campus. The historic columns that have witnessed a thousand years of knowledge and faith. #AlAzharAlSharif',
      hasImage: true,
      date: '2026-03-14',
      likes: 22000,
      shares: 4300,
      comments: 980,
      url: 'https://instagram.com/p/example8',
    },
    {
      id: 9,
      platform: 'youtube',
      content: isAr
        ? '\ud83d\udcfa \u0648\u062b\u0627\u0626\u0642\u064a \u062c\u062f\u064a\u062f: "\u0627\u0644\u0623\u0632\u0647\u0631 - \u0623\u0644\u0641 \u0639\u0627\u0645 \u0645\u0646 \u0627\u0644\u0646\u0648\u0631" - \u0631\u062d\u0644\u0629 \u0639\u0628\u0631 \u062a\u0627\u0631\u064a\u062e \u0623\u0642\u062f\u0645 \u062c\u0627\u0645\u0639\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645 \u0645\u0646\u0630 \u062a\u0623\u0633\u064a\u0633\u0647\u0627 \u0639\u0627\u0645 970\u0645 \u0648\u062d\u062a\u0649 \u0627\u0644\u064a\u0648\u0645.'
        : 'New documentary: "Al-Azhar - A Thousand Years of Light" - A journey through the history of the oldest university in the world from its founding in 970 CE to today.',
      hasImage: true,
      date: '2026-03-13',
      likes: 58000,
      shares: 19000,
      comments: 7200,
      url: 'https://youtube.com/watch?v=example9',
    },
    {
      id: 10,
      platform: 'linkedin',
      content: isAr
        ? '\u0623\u0637\u0644\u0642\u062a \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0645\u0646\u062d \u0627\u0644\u062f\u0631\u0627\u0633\u064a\u0629 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0644\u0639\u0627\u0645 2026-2027. \u0641\u0631\u0635 \u0645\u062a\u0627\u062d\u0629 \u0644\u0637\u0644\u0627\u0628 \u0645\u0646 \u0623\u0643\u062b\u0631 \u0645\u0646 100 \u062f\u0648\u0644\u0629 \u0641\u064a \u0645\u062e\u062a\u0644\u0641 \u0627\u0644\u062a\u062e\u0635\u0635\u0627\u062a.'
        : 'Al-Azhar University has launched its International Scholarship Program for 2026-2027. Opportunities available for students from over 100 countries across various disciplines.',
      hasImage: false,
      date: '2026-03-12',
      likes: 15000,
      shares: 6200,
      comments: 1800,
      url: 'https://linkedin.com/posts/example10',
    },
    {
      id: 11,
      platform: 'twitter',
      content: isAr
        ? '\u0628\u064a\u0627\u0646 \u0641\u0636\u064a\u0644\u0629 \u0627\u0644\u0625\u0645\u0627\u0645 \u0627\u0644\u0623\u0643\u0628\u0631 \u0628\u0645\u0646\u0627\u0633\u0628\u0629 \u0627\u0644\u064a\u0648\u0645 \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0644\u0644\u0623\u062e\u0648\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629: "\u0627\u0644\u062d\u0648\u0627\u0631 \u0647\u0648 \u0627\u0644\u0637\u0631\u064a\u0642 \u0627\u0644\u0648\u062d\u064a\u062f \u0644\u0628\u0646\u0627\u0621 \u0639\u0627\u0644\u0645 \u064a\u0633\u0648\u062f\u0647 \u0627\u0644\u0633\u0644\u0627\u0645"'
        : 'Grand Imam\'s statement on the International Day of Human Fraternity: "Dialogue is the only path to building a world of peace."',
      hasImage: false,
      date: '2026-03-11',
      likes: 18000,
      shares: 7500,
      comments: 2300,
      url: 'https://twitter.com/AlAzharUniv/status/example11',
    },
    {
      id: 12,
      platform: 'facebook',
      content: isAr
        ? '\u0646\u062a\u0627\u0626\u062c \u0645\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0642\u0631\u0622\u0646 \u0627\u0644\u0643\u0631\u064a\u0645 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 2026 - \u0645\u0634\u0627\u0631\u0643\u0629 \u0645\u0646 42 \u062f\u0648\u0644\u0629 \u0648\u0641\u0648\u0632 \u0637\u0644\u0627\u0628 \u0645\u0646 \u0645\u0635\u0631 \u0648\u0645\u0627\u0644\u064a\u0632\u064a\u0627 \u0648\u0627\u0644\u0633\u0646\u063a\u0627\u0644 \u0628\u0627\u0644\u0645\u0631\u0627\u0643\u0632 \u0627\u0644\u0623\u0648\u0644\u0649.'
        : 'Results of the 2026 International Quran Competition - Participants from 42 countries with students from Egypt, Malaysia, and Senegal taking top positions.',
      hasImage: true,
      date: '2026-03-10',
      likes: 52000,
      shares: 15000,
      comments: 5800,
      url: 'https://facebook.com/AlAzharUniversity/posts/example12',
    },
    {
      id: 13,
      platform: 'instagram',
      content: isAr
        ? '\u0637\u0644\u0627\u0628 \u0645\u0646 50 \u062f\u0648\u0644\u0629 \u064a\u062c\u062a\u0645\u0639\u0648\u0646 \u0641\u064a \u064a\u0648\u0645 \u0627\u0644\u062b\u0642\u0627\u0641\u0627\u062a \u0627\u0644\u062f\u0648\u0644\u064a \ud83c\udf0d \u0627\u0644\u0623\u0632\u0647\u0631 \u064a\u062c\u0645\u0639 \u0627\u0644\u0639\u0627\u0644\u0645 \u0641\u064a \u0642\u0644\u0628 \u0627\u0644\u0642\u0627\u0647\u0631\u0629 #\u062a\u0646\u0648\u0639_\u062b\u0642\u0627\u0641\u064a #\u0627\u0644\u0623\u0632\u0647\u0631_\u0639\u0627\u0644\u0645\u064a\u0627'
        : 'Students from 50 countries gathered for International Culture Day. Al-Azhar brings the world together in the heart of Cairo. #CulturalDiversity #AlAzharGlobal',
      hasImage: true,
      date: '2026-03-09',
      likes: 19000,
      shares: 3600,
      comments: 1200,
      url: 'https://instagram.com/p/example13',
    },
    {
      id: 14,
      platform: 'youtube',
      content: isAr
        ? '\ud83c\udf93 \u062c\u0648\u0644\u0629 \u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0641\u064a \u0643\u0644\u064a\u0629 \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 - \u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u0623\u0643\u0627\u062f\u064a\u0645\u064a\u0629 \u0648\u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u0637\u0644\u0627\u0628\u064a\u0629 \u0648\u0641\u0631\u0635 \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0639\u0644\u0645\u064a.'
        : 'Virtual tour of the Faculty of Islamic Sciences - Learn about academic programs, student life, and research opportunities.',
      hasImage: true,
      date: '2026-03-08',
      likes: 14000,
      shares: 3800,
      comments: 920,
      url: 'https://youtube.com/watch?v=example14',
    },
    {
      id: 15,
      platform: 'linkedin',
      content: isAr
        ? '\u0646\u0634\u0631 \u0641\u0631\u064a\u0642 \u0628\u062d\u062b\u064a \u0645\u0646 \u0643\u0644\u064a\u0629 \u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0628\u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u0648\u0631\u0642\u0629 \u0628\u062d\u062b\u064a\u0629 \u0631\u0627\u0626\u062f\u0629 \u0641\u064a \u0645\u062c\u0644\u0629 Nature \u062d\u0648\u0644 \u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0641\u064a \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u062a\u062c\u062f\u062f\u0629.'
        : 'Al-Azhar Engineering faculty research team published a groundbreaking paper in Nature on AI applications in renewable energy.',
      hasImage: false,
      date: '2026-03-07',
      likes: 11000,
      shares: 4500,
      comments: 890,
      url: 'https://linkedin.com/posts/example15',
    },
    {
      id: 16,
      platform: 'twitter',
      content: isAr
        ? '\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0645\u0641\u062a\u0648\u062d \u0627\u0644\u0622\u0646 \u0644\u0644\u062f\u0648\u0631\u0627\u062a \u0627\u0644\u0645\u062c\u0627\u0646\u064a\u0629 \u0639\u0628\u0631 \u0645\u0646\u0635\u0629 \u0627\u0644\u062a\u0639\u0644\u0645 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a - \u062f\u0648\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0648\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0644\u0644\u062c\u0645\u064a\u0639 \ud83d\udcda'
        : 'Registration now open for free courses on our e-learning platform - Courses in Islamic Sciences and Arabic Language for everyone!',
      hasImage: false,
      date: '2026-03-06',
      likes: 7600,
      shares: 3200,
      comments: 540,
      url: 'https://twitter.com/AlAzharUniv/status/example16',
    },
    {
      id: 17,
      platform: 'facebook',
      content: isAr
        ? '\u0627\u0633\u062a\u0642\u0628\u0644 \u0641\u0636\u064a\u0644\u0629 \u0627\u0644\u0625\u0645\u0627\u0645 \u0627\u0644\u0623\u0643\u0628\u0631 \u0648\u0641\u062f\u0627\u064b \u0645\u0646 \u0627\u0644\u0641\u0627\u062a\u064a\u0643\u0627\u0646 \u0644\u0628\u062d\u062b \u062a\u0639\u0632\u064a\u0632 \u0627\u0644\u062d\u0648\u0627\u0631 \u0628\u064a\u0646 \u0627\u0644\u0623\u062f\u064a\u0627\u0646 \u0648\u062a\u0646\u0641\u064a\u0630 \u0648\u062b\u064a\u0642\u0629 \u0627\u0644\u0623\u062e\u0648\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629.'
        : 'Grand Imam received a Vatican delegation to discuss strengthening interfaith dialogue and implementing the Document on Human Fraternity.',
      hasImage: true,
      date: '2026-03-05',
      likes: 38000,
      shares: 9200,
      comments: 2800,
      url: 'https://facebook.com/AlAzharUniversity/posts/example17',
    },
    {
      id: 18,
      platform: 'instagram',
      content: isAr
        ? '\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0623\u0632\u0647\u0631 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u062a\u0636\u064a\u0641 10,000 \u0645\u062e\u0637\u0648\u0637\u0629 \u062c\u062f\u064a\u062f\u0629 \ud83d\udcdc \u0643\u0646\u0632 \u0645\u0639\u0631\u0641\u064a \u0645\u062a\u0627\u062d \u0644\u0644\u062c\u0645\u064a\u0639 #\u0627\u0644\u0645\u0643\u062a\u0628\u0629_\u0627\u0644\u0631\u0642\u0645\u064a\u0629 #\u062a\u0631\u0627\u062b'
        : 'Al-Azhar Digital Library adds 10,000 new manuscripts. A knowledge treasure accessible to all. #DigitalLibrary #Heritage',
      hasImage: true,
      date: '2026-03-04',
      likes: 16000,
      shares: 5400,
      comments: 1100,
      url: 'https://instagram.com/p/example18',
    },
  ], [isAr]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return mockPosts;
    return mockPosts.filter((p) => p.platform === activeFilter);
  }, [activeFilter, mockPosts]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'twitter', label: 'X / Twitter' },
    { key: 'facebook', label: 'Facebook' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'linkedin', label: 'LinkedIn' },
  ];

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {accounts.map((account) => (
              <a
                key={account.platform}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-colors text-sm"
              >
                <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${account.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {account.icon}
                </span>
                <span>{account.handle}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {accounts.map((account, i) => (
              <motion.a
                key={account.platform}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand-50 dark:hover:bg-navy-700 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${account.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {account.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-gray-900 dark:text-sand-100">
                    {account.followersCount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-sand-400 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {account.followersLabel}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs + Posts */}
      <section className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-sand-100 mb-8 text-center"
        >
          {t('latestPosts')}
        </motion.h2>

        {/* Platform Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-sand-300 hover:bg-gray-100 dark:hover:bg-navy-700 border border-gray-200 dark:border-navy-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-sand-400 py-12">
            {t('noResults')}
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filteredPosts.map((post, i) => (
              <SocialPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Follow Us CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            {t('followUs')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mb-8 max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {accounts.map((account) => (
              <a
                key={account.platform}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 transition-colors"
              >
                <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${account.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {account.icon}
                </span>
                <div className="text-start">
                  <p className="text-white font-medium text-sm">{account.handle}</p>
                  <p className="text-white/60 text-xs">{account.followersCount} {account.followersLabel}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
