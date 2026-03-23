'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Play,
  Headphones,
  Clock,
  Calendar,
  Mic,
  Users,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

type CategoryType = 'all' | 'islamicSciences' | 'arabicLanguage' | 'campusLife' | 'interviews' | 'history';

interface PodcastEpisode {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  duration: number;
  date: string;
  category: Exclude<CategoryType, 'all'>;
  featured?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const categoryGradients: Record<string, string> = {
  islamicSciences: 'from-primary-600 to-primary-800',
  arabicLanguage: 'from-accent-500 to-accent-700',
  campusLife: 'from-emerald-500 to-emerald-700',
  interviews: 'from-indigo-500 to-indigo-700',
  history: 'from-amber-600 to-amber-800',
};

const EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    titleAr: 'تفسير سورة الفاتحة - معاني وأسرار',
    titleEn: 'Interpreting Surah Al-Fatiha - Meanings & Secrets',
    descAr: 'رحلة تدبرية في أعظم سورة في القرآن الكريم مع فضيلة الشيخ',
    descEn: 'A reflective journey through the greatest surah in the Holy Quran with the esteemed Sheikh',
    duration: 45,
    date: '2026-03-20',
    category: 'islamicSciences',
    featured: true,
  },
  {
    id: 2,
    titleAr: 'الأحاديث النبوية في الأخلاق',
    titleEn: 'Prophetic Hadiths on Ethics & Morality',
    descAr: 'مناقشة أهم الأحاديث النبوية التي تؤسس لمنظومة الأخلاق الإسلامية',
    descEn: 'Discussion of the most important Prophetic hadiths that establish Islamic ethical framework',
    duration: 38,
    date: '2026-03-18',
    category: 'islamicSciences',
  },
  {
    id: 3,
    titleAr: 'حوار مع عميد كلية اللغة العربية',
    titleEn: 'Interview with the Dean of Arabic Language Faculty',
    descAr: 'حوار شامل حول مستقبل تعليم اللغة العربية وتحدياته في العصر الحديث',
    descEn: 'A comprehensive dialogue about the future and challenges of Arabic language education',
    duration: 52,
    date: '2026-03-15',
    category: 'interviews',
  },
  {
    id: 4,
    titleAr: 'الأزهر في العصر الفاطمي',
    titleEn: 'Al-Azhar in the Fatimid Era',
    descAr: 'استكشاف تاريخ تأسيس الأزهر ودوره في نشر العلم والمعرفة',
    descEn: 'Exploring the founding history of Al-Azhar and its role in spreading knowledge',
    duration: 41,
    date: '2026-03-12',
    category: 'history',
  },
  {
    id: 5,
    titleAr: 'قواعد النحو العربي - المبتدأ والخبر',
    titleEn: 'Arabic Grammar Rules - Subject & Predicate',
    descAr: 'شرح مبسط لأهم قواعد النحو العربي مع أمثلة من القرآن الكريم',
    descEn: 'Simplified explanation of key Arabic grammar rules with examples from the Quran',
    duration: 35,
    date: '2026-03-10',
    category: 'arabicLanguage',
  },
  {
    id: 6,
    titleAr: 'يوم في حياة طالب أزهري',
    titleEn: 'A Day in the Life of an Al-Azhar Student',
    descAr: 'طالب من ماليزيا يحكي تجربته اليومية في جامعة الأزهر',
    descEn: 'A Malaysian student shares his daily experience at Al-Azhar University',
    duration: 28,
    date: '2026-03-08',
    category: 'campusLife',
  },
  {
    id: 7,
    titleAr: 'أصول الفقه الإسلامي',
    titleEn: 'Foundations of Islamic Jurisprudence',
    descAr: 'مدخل إلى علم أصول الفقه ومناهج الاستنباط عند الأئمة الأربعة',
    descEn: 'An introduction to Islamic jurisprudence methodology and the four schools of thought',
    duration: 48,
    date: '2026-03-05',
    category: 'islamicSciences',
  },
  {
    id: 8,
    titleAr: 'البلاغة العربية - فن التشبيه',
    titleEn: 'Arabic Rhetoric - The Art of Simile',
    descAr: 'دراسة في فنون البلاغة العربية وجمالياتها في الأدب والقرآن',
    descEn: 'A study of Arabic rhetoric arts and their aesthetics in literature and the Quran',
    duration: 33,
    date: '2026-03-03',
    category: 'arabicLanguage',
  },
  {
    id: 9,
    titleAr: 'قصص طلاب من أفريقيا',
    titleEn: 'Stories from African Students',
    descAr: 'طلاب من نيجيريا والسنغال يتحدثون عن تجربتهم في الأزهر',
    descEn: 'Students from Nigeria and Senegal share their experiences at Al-Azhar',
    duration: 36,
    date: '2026-03-01',
    category: 'campusLife',
  },
  {
    id: 10,
    titleAr: 'المخطوطات الإسلامية في مكتبة الأزهر',
    titleEn: 'Islamic Manuscripts in Al-Azhar Library',
    descAr: 'جولة في كنوز المخطوطات النادرة المحفوظة في مكتبة الأزهر',
    descEn: 'A tour of the rare manuscript treasures preserved in Al-Azhar Library',
    duration: 44,
    date: '2026-02-27',
    category: 'history',
  },
  {
    id: 11,
    titleAr: 'حوار مع خريج أزهري ناجح',
    titleEn: 'Interview with a Successful Al-Azhar Graduate',
    descAr: 'قصة نجاح ملهمة لخريج أزهري أصبح عالماً مؤثراً في مجتمعه',
    descEn: 'An inspiring success story of an Al-Azhar graduate who became an influential scholar',
    duration: 40,
    date: '2026-02-25',
    category: 'interviews',
  },
  {
    id: 12,
    titleAr: 'الأزهر ودوره في الحوار بين الأديان',
    titleEn: 'Al-Azhar and Interfaith Dialogue',
    descAr: 'كيف يقود الأزهر جهود الحوار بين الأديان والثقافات حول العالم',
    descEn: 'How Al-Azhar leads interfaith and intercultural dialogue efforts worldwide',
    duration: 50,
    date: '2026-02-22',
    category: 'history',
  },
];

interface PodcastSeries {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  episodeCount: number;
  gradient: string;
  icon: React.ReactNode;
}

const SERIES: PodcastSeries[] = [
  {
    titleAr: 'أصوات الأزهر',
    titleEn: 'Voices of Al-Azhar',
    descAr: 'حوارات مع علماء وأساتذة الأزهر حول قضايا معاصرة',
    descEn: 'Interviews with Al-Azhar scholars on contemporary issues',
    episodeCount: 24,
    gradient: 'from-primary-600 to-primary-800',
    icon: <Mic className="w-8 h-8" />,
  },
  {
    titleAr: 'التراث الإسلامي',
    titleEn: 'Islamic Heritage',
    descAr: 'رحلات عميقة في تاريخ الحضارة الإسلامية وإنجازاتها',
    descEn: 'Historical deep dives into Islamic civilization and its achievements',
    episodeCount: 18,
    gradient: 'from-amber-600 to-amber-800',
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    titleAr: 'أضواء على الطلاب',
    titleEn: 'Student Spotlight',
    descAr: 'قصص ملهمة من الحياة الطلابية في جامعة الأزهر',
    descEn: 'Inspiring stories from campus life at Al-Azhar University',
    episodeCount: 15,
    gradient: 'from-emerald-500 to-emerald-700',
    icon: <Users className="w-8 h-8" />,
  },
];

function WaveformBars() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[0.4, 0.7, 0.5, 1, 0.6, 0.8, 0.3, 0.9, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3].map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-current opacity-40"
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
}

export function PodcastsPage() {
  const t = useTranslations('podcasts');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'islamicSciences', label: t('islamicSciences') },
    { key: 'arabicLanguage', label: t('arabicLanguage') },
    { key: 'campusLife', label: t('campusLife') },
    { key: 'interviews', label: t('interviews') },
    { key: 'history', label: t('history') },
  ];

  const featuredEpisode = EPISODES.find((ep) => ep.featured)!;

  const filteredEpisodes = useMemo(() => {
    const nonFeatured = EPISODES.filter((ep) => !ep.featured);
    if (selectedCategory === 'all') return nonFeatured;
    return nonFeatured.filter((ep) => ep.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-primary-600/20 flex items-center justify-center mx-auto mb-6"
          >
            <Headphones className="w-10 h-10 text-primary-400" />
          </motion.div>
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
            className="text-lg text-sand-300 mb-4 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Episode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
            {t('featured')}
          </h2>
          <div className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-lg border border-sand-200 dark:border-navy-700">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary-600 to-primary-800 relative flex items-center justify-center p-8 min-h-[200px]">
                <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="w-10 h-10 text-white ms-1" />
                  </div>
                  <div className="text-white/60">
                    <WaveformBars />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-3 py-1 rounded-full w-fit mb-3">
                  <Headphones className="w-3.5 h-3.5" />
                  {t('featured')}
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-3">
                  {isAr ? featuredEpisode.titleAr : featuredEpisode.titleEn}
                </h3>
                <p className="text-sand-600 dark:text-sand-400 mb-4 leading-relaxed">
                  {isAr ? featuredEpisode.descAr : featuredEpisode.descEn}
                </p>
                <div className="flex items-center gap-4 text-sand-500 dark:text-sand-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredEpisode.duration} {t('minutes')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredEpisode.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <button className="mt-5 inline-flex items-center gap-2 bg-primary-600 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-colors w-fit shadow-md shadow-primary-600/20">
                  <Play className="w-4 h-4" />
                  {t('listen')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
            {t('allEpisodes')}
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                    : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-sand-300 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Episodes Grid */}
          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-16 text-sand-500 dark:text-sand-400">
              {t('allEpisodes')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((episode, i) => (
                <motion.div
                  key={episode.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  {/* Gradient header with waveform */}
                  <div className={`aspect-[16/9] bg-gradient-to-br ${categoryGradients[episode.category] || 'from-navy-600 to-navy-800'} relative flex items-center justify-center`}>
                    <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                    {/* Waveform decoration */}
                    <div className="absolute bottom-0 inset-x-0 h-12 flex items-end justify-center gap-[2px] px-4 pb-3">
                      {Array.from({ length: 30 }, (_, idx) => {
                        const h = Math.sin(idx * 0.5) * 0.4 + 0.3 + Math.random() * 0.3;
                        return (
                          <div
                            key={idx}
                            className="w-[2px] rounded-full bg-white/30"
                            style={{ height: `${h * 100}%` }}
                          />
                        );
                      })}
                    </div>
                    {/* Play button overlay */}
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors group-hover:scale-110 transform duration-200">
                        <Play className="w-7 h-7 text-white ms-0.5" />
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 start-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                      {t(episode.category)}
                    </div>
                    {/* Duration badge */}
                    <div className="absolute top-3 end-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration} {t('minutes')}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 dark:text-sand-100 mb-2 text-sm leading-snug line-clamp-2">
                      {isAr ? episode.titleAr : episode.titleEn}
                    </h3>
                    <p className="text-sand-500 dark:text-sand-400 text-xs mb-3 line-clamp-2">
                      {isAr ? episode.descAr : episode.descEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sand-500 dark:text-sand-400 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(episode.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <button className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                        <Play className="w-3.5 h-3.5" />
                        {t('listen')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Podcast Series Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
            {t('series')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERIES.map((series, i) => (
              <motion.div
                key={series.titleEn}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow"
              >
                <div className={`bg-gradient-to-br ${series.gradient} p-6 relative`}>
                  <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                  <div className="relative z-10 text-white">
                    {series.icon}
                    <h3 className="text-lg font-serif font-bold mt-3">
                      {isAr ? series.titleAr : series.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sand-600 dark:text-sand-400 text-sm mb-4 leading-relaxed">
                    {isAr ? series.descAr : series.descEn}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-sand-500 dark:text-sand-400">
                      {series.episodeCount} {t('episodes')}
                    </span>
                    <button className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      <Play className="w-3.5 h-3.5" />
                      {t('listen')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
          <div className="relative z-10">
            <Headphones className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              {t('subscribe')}
            </h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              {isAr
                ? 'استمع إلى بودكاست الأزهر على منصتك المفضلة'
                : 'Listen to Al-Azhar Podcasts on your favorite platform'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Apple Podcasts', 'Spotify', 'Google Podcasts'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg text-sm"
                >
                  <Headphones className="w-4 h-4" />
                  {platform}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
