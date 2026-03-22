'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Play,
  Radio,
  Video,
  Image as ImageIcon,
  Clock,
  Calendar,
  Youtube,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Globe,
  Moon,
} from 'lucide-react';

type TabType = 'live' | 'videos' | 'photos';
type CategoryType = 'all' | 'lectures' | 'prayers' | 'events' | 'documentaries';

interface MockVideo {
  id: number;
  title: string;
  category: CategoryType;
  duration: string;
  date: string;
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
  lectures: 'from-primary-600 to-primary-800',
  prayers: 'from-accent-500 to-accent-700',
  events: 'from-emerald-500 to-emerald-700',
  documentaries: 'from-indigo-500 to-indigo-700',
};

const categoryIcons: Record<string, React.ReactNode> = {
  lectures: <BookOpen className="w-8 h-8" />,
  prayers: <Moon className="w-8 h-8" />,
  events: <GraduationCap className="w-8 h-8" />,
  documentaries: <Globe className="w-8 h-8" />,
};

export function MediaCenterPage() {
  const t = useTranslations('media');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const mockVideos: MockVideo[] = useMemo(() => [
    { id: 1, title: isAr ? 'خطبة الجمعة' : 'Friday Sermon', category: 'prayers', duration: '45:00', date: '2026-03-21' },
    { id: 2, title: isAr ? 'محاضرة فضيلة الإمام الأكبر عن الوسطية' : 'Grand Imam Lecture on Moderation', category: 'lectures', duration: '1:20:00', date: '2026-03-18' },
    { id: 3, title: isAr ? 'حفل تخريج دفعة 2026' : 'Class of 2026 Graduation Ceremony', category: 'events', duration: '2:30:00', date: '2026-03-15' },
    { id: 4, title: isAr ? 'وثائقي: ألف عام من النور' : 'Documentary: A Thousand Years of Light', category: 'documentaries', duration: '52:00', date: '2026-03-10' },
    { id: 5, title: isAr ? 'ندوة الحوار بين الأديان' : 'Interfaith Dialogue Symposium', category: 'lectures', duration: '1:45:00', date: '2026-03-08' },
    { id: 6, title: isAr ? 'صلاة العيد من الجامع الأزهر' : 'Eid Prayer from Al-Azhar Mosque', category: 'prayers', duration: '1:00:00', date: '2026-03-05' },
    { id: 7, title: isAr ? 'مؤتمر التعليم الإسلامي الدولي' : 'International Islamic Education Conference', category: 'events', duration: '3:00:00', date: '2026-03-01' },
    { id: 8, title: isAr ? 'دروس رمضانية' : 'Ramadan Lessons', category: 'lectures', duration: '30:00', date: '2026-02-28' },
    { id: 9, title: isAr ? 'جولة في المكتبة الرقمية' : 'Digital Library Tour', category: 'documentaries', duration: '25:00', date: '2026-02-25' },
    { id: 10, title: isAr ? 'حفل افتتاح العام الدراسي' : 'Academic Year Opening Ceremony', category: 'events', duration: '1:30:00', date: '2026-02-20' },
    { id: 11, title: isAr ? 'محاضرة في علوم القرآن' : 'Lecture on Quranic Sciences', category: 'lectures', duration: '55:00', date: '2026-02-15' },
    { id: 12, title: isAr ? 'وثائقي: الأزهر والعالم' : 'Documentary: Al-Azhar and the World', category: 'documentaries', duration: '48:00', date: '2026-02-10' },
  ], [isAr]);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'all') return mockVideos;
    return mockVideos.filter((v) => v.category === selectedCategory);
  }, [selectedCategory, mockVideos]);

  const upcomingStreams = useMemo(() => [
    {
      title: isAr ? 'محاضرات فضيلة الإمام الأكبر' : 'Grand Imam Lectures',
      schedule: isAr ? 'كل ثلاثاء - 7:00 مساءً' : 'Every Tuesday - 7:00 PM',
      gradient: 'from-primary-600 to-primary-800',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: isAr ? 'حفلات التخريج' : 'Graduation Ceremonies',
      schedule: isAr ? 'يونيو 2026' : 'June 2026',
      gradient: 'from-accent-500 to-accent-700',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: isAr ? 'المؤتمرات الدولية' : 'International Conferences',
      schedule: isAr ? 'أبريل 2026' : 'April 2026',
      gradient: 'from-emerald-500 to-emerald-700',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: isAr ? 'برامج رمضان' : 'Ramadan Programs',
      schedule: isAr ? 'رمضان 1448 هـ' : 'Ramadan 1448 AH',
      gradient: 'from-indigo-500 to-indigo-700',
      icon: <Moon className="w-6 h-6" />,
    },
  ], [isAr]);

  const mockPhotos = useMemo(() => [
    { id: 1, title: isAr ? 'الجامع الأزهر الشريف' : 'Al-Azhar Mosque', category: isAr ? 'معالم' : 'Landmarks' },
    { id: 2, title: isAr ? 'حفل التخريج 2025' : 'Graduation 2025', category: isAr ? 'مناسبات' : 'Events' },
    { id: 3, title: isAr ? 'المكتبة الرقمية' : 'Digital Library', category: isAr ? 'مرافق' : 'Facilities' },
    { id: 4, title: isAr ? 'زيارة وفد دولي' : 'International Delegation Visit', category: isAr ? 'زيارات' : 'Visits' },
    { id: 5, title: isAr ? 'مؤتمر الحوار' : 'Dialogue Conference', category: isAr ? 'مؤتمرات' : 'Conferences' },
    { id: 6, title: isAr ? 'رحاب الجامعة' : 'University Campus', category: isAr ? 'معالم' : 'Landmarks' },
    { id: 7, title: isAr ? 'صلاة الجمعة' : 'Friday Prayer', category: isAr ? 'عبادات' : 'Worship' },
    { id: 8, title: isAr ? 'ندوة علمية' : 'Scientific Seminar', category: isAr ? 'مؤتمرات' : 'Conferences' },
    { id: 9, title: isAr ? 'الأنشطة الطلابية' : 'Student Activities', category: isAr ? 'طلاب' : 'Students' },
  ], [isAr]);

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: 'live', label: t('liveStreams'), icon: <Radio className="w-4 h-4" /> },
    { key: 'videos', label: t('videoLibrary'), icon: <Video className="w-4 h-4" /> },
    { key: 'photos', label: t('photoGallery'), icon: <ImageIcon className="w-4 h-4" /> },
  ];

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'lectures', label: t('lectures') },
    { key: 'prayers', label: t('prayers') },
    { key: 'events', label: t('events') },
    { key: 'documentaries', label: t('documentaries') },
  ];

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

          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                    : 'bg-white/10 text-sand-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Live Streams Tab */}
        {activeTab === 'live' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured Live Stream */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100">
                  {t('liveNow')}
                </h2>
              </div>

              <div className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-lg border border-sand-200 dark:border-navy-700">
                <div className="relative aspect-video bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                  <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                      <Play className="w-10 h-10 text-white ms-1" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                      {t('fridayPrayer')}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      LIVE
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-900 dark:text-sand-100 mb-2">
                    {t('fridayPrayer')}
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 text-sm">
                    {isAr ? 'كل جمعة - 12:00 ظهراً بتوقيت القاهرة' : 'Every Friday - 12:00 PM Cairo Time'}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Streams Grid */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
                {isAr ? 'بث قادم ومتكرر' : 'Upcoming & Recurring Streams'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingStreams.map((stream, i) => (
                  <motion.div
                    key={stream.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow"
                  >
                    <div className={`aspect-[16/10] bg-gradient-to-br ${stream.gradient} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                      <div className="relative z-10 text-white">
                        {stream.icon}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-navy-900 dark:text-sand-100 mb-1 text-sm">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sand-500 dark:text-sand-400 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {stream.schedule}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Library Tab */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Filters */}
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

            {/* Latest Videos Header */}
            <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
              {t('latestVideos')}
            </h2>

            {/* Video Grid */}
            {filteredVideos.length === 0 ? (
              <div className="text-center py-16 text-sand-500 dark:text-sand-400">
                {t('noVideos')}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className={`aspect-video bg-gradient-to-br ${categoryGradients[video.category] || 'from-navy-600 to-navy-800'} relative flex items-center justify-center`}>
                      <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                      <div className="relative z-10 text-white/70">
                        {categoryIcons[video.category] || <Video className="w-8 h-8" />}
                      </div>
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                          <Play className="w-7 h-7 text-white ms-0.5" />
                        </div>
                      </div>
                      {/* Duration badge */}
                      <div className="absolute bottom-2 end-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-2 start-2 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                        {t(video.category)}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-navy-900 dark:text-sand-100 mb-2 text-sm leading-snug line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sand-500 dark:text-sand-400 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(video.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Photo Gallery Tab */}
        {activeTab === 'photos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-6">
              {t('photoGallery')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-sand-200 to-sand-400 dark:from-navy-700 dark:to-navy-600 relative flex items-center justify-center">
                    <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                    <ImageIcon className="w-10 h-10 text-sand-400 dark:text-navy-500 relative z-10" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {/* Category label */}
                    <div className="absolute top-2 start-2 bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm text-navy-900 dark:text-sand-100 text-xs px-2.5 py-1 rounded-lg font-medium">
                      {photo.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 dark:text-sand-100 text-sm">
                      {photo.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* YouTube Channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
          <div className="relative z-10">
            <Youtube className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              {t('subscribe')}
            </h2>
            <p className="text-red-100 mb-6 max-w-lg mx-auto">
              {isAr
                ? 'تابعنا على يوتيوب لمشاهدة البث المباشر وآخر الفيديوهات'
                : 'Follow us on YouTube for live streams and the latest videos'}
            </p>
            <a
              href="https://www.youtube.com/@AlAzharUniversity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg"
            >
              <Youtube className="w-5 h-5" />
              {t('subscribe')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
