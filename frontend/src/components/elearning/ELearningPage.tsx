'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  Users,
  Play,
  Star,
  Filter,
  ChevronRight,
  Globe,
  FileText,
  Scroll,
  Scale,
  Languages,
  Landmark,
  Moon,
} from 'lucide-react';

type CategoryType = 'all' | 'quran' | 'hadith' | 'fiqh' | 'arabic' | 'theology' | 'history';
type LevelType = 'beginner' | 'intermediate' | 'advanced';

interface Course {
  id: number;
  title: string;
  category: CategoryType;
  level: LevelType;
  lessons: number;
  hours: number;
  students: number;
  instructor: string;
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
  quran: 'from-emerald-600 to-emerald-800',
  hadith: 'from-amber-600 to-amber-800',
  fiqh: 'from-indigo-600 to-indigo-800',
  arabic: 'from-primary-600 to-primary-800',
  theology: 'from-violet-600 to-violet-800',
  history: 'from-rose-600 to-rose-800',
};

const categoryIcons: Record<string, React.ReactNode> = {
  quran: <Scroll className="w-8 h-8" />,
  hadith: <FileText className="w-8 h-8" />,
  fiqh: <Scale className="w-8 h-8" />,
  arabic: <Languages className="w-8 h-8" />,
  theology: <Moon className="w-8 h-8" />,
  history: <Landmark className="w-8 h-8" />,
};

const levelColors: Record<LevelType, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

export function ELearningPage() {
  const t = useTranslations('elearning');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const courses: Course[] = useMemo(() => [
    { id: 1, title: isAr ? 'مقدمة في علوم القرآن' : 'Introduction to Quranic Sciences', category: 'quran', level: 'beginner', lessons: 24, hours: 12, students: 3500, instructor: isAr ? 'د. أحمد محمد' : 'Dr. Ahmad Muhammad', featured: true },
    { id: 2, title: isAr ? 'أصول الفقه الإسلامي' : 'Foundations of Islamic Jurisprudence', category: 'fiqh', level: 'intermediate', lessons: 30, hours: 15, students: 2800, instructor: isAr ? 'د. محمد عبدالله' : 'Dr. Muhammad Abdullah', featured: true },
    { id: 3, title: isAr ? 'العربية لغير الناطقين بها' : 'Arabic for Non-Native Speakers', category: 'arabic', level: 'beginner', lessons: 40, hours: 20, students: 5200, instructor: isAr ? 'د. فاطمة حسن' : 'Dr. Fatima Hassan', featured: true },
    { id: 4, title: isAr ? 'تفسير القرآن الكريم' : 'Quran Interpretation (Tafsir)', category: 'quran', level: 'advanced', lessons: 36, hours: 18, students: 1900, instructor: isAr ? 'د. عمر يوسف' : 'Dr. Omar Youssef' },
    { id: 5, title: isAr ? 'علم الحديث والرواية' : 'Science of Hadith & Narration', category: 'hadith', level: 'intermediate', lessons: 28, hours: 14, students: 2100, instructor: isAr ? 'د. خالد إبراهيم' : 'Dr. Khaled Ibrahim' },
    { id: 6, title: isAr ? 'الفقه المقارن' : 'Comparative Jurisprudence', category: 'fiqh', level: 'advanced', lessons: 32, hours: 16, students: 1500, instructor: isAr ? 'د. سعيد أحمد' : 'Dr. Saeed Ahmad' },
    { id: 7, title: isAr ? 'النحو العربي' : 'Arabic Grammar (Nahw)', category: 'arabic', level: 'intermediate', lessons: 35, hours: 17, students: 3800, instructor: isAr ? 'د. ليلى محمود' : 'Dr. Layla Mahmoud' },
    { id: 8, title: isAr ? 'العقيدة الإسلامية' : 'Islamic Theology (Aqeedah)', category: 'theology', level: 'beginner', lessons: 20, hours: 10, students: 4200, instructor: isAr ? 'د. حسين علي' : 'Dr. Hussein Ali' },
    { id: 9, title: isAr ? 'تاريخ الحضارة الإسلامية' : 'History of Islamic Civilization', category: 'history', level: 'beginner', lessons: 25, hours: 12, students: 3100, instructor: isAr ? 'د. نور الدين' : 'Dr. Nour El-Din' },
    { id: 10, title: isAr ? 'أحكام التجويد' : 'Tajweed Rules', category: 'quran', level: 'beginner', lessons: 18, hours: 9, students: 6500, instructor: isAr ? 'الشيخ محمد جبريل' : 'Sheikh Muhammad Jibril' },
    { id: 11, title: isAr ? 'السيرة النبوية' : 'Biography of Prophet Muhammad', category: 'history', level: 'beginner', lessons: 22, hours: 11, students: 4800, instructor: isAr ? 'د. عائشة كمال' : 'Dr. Aisha Kamal' },
    { id: 12, title: isAr ? 'البلاغة العربية' : 'Arabic Rhetoric (Balagha)', category: 'arabic', level: 'advanced', lessons: 26, hours: 13, students: 1200, instructor: isAr ? 'د. طارق حسين' : 'Dr. Tariq Hussein' },
  ], [isAr]);

  const featuredCourses = useMemo(() => courses.filter((c) => c.featured), [courses]);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') return courses;
    return courses.filter((c) => c.category === selectedCategory);
  }, [selectedCategory, courses]);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'quran', label: t('quran') },
    { key: 'hadith', label: t('hadith') },
    { key: 'fiqh', label: t('fiqh') },
    { key: 'arabic', label: t('arabic') },
    { key: 'theology', label: t('theology') },
    { key: 'history', label: t('history') },
  ];

  const whyReasons = [
    { icon: <GraduationCap className="w-8 h-8" />, titleKey: 'reason1Title' as const, descKey: 'reason1Desc' as const, gradient: 'from-primary-500 to-primary-700' },
    { icon: <Award className="w-8 h-8" />, titleKey: 'reason2Title' as const, descKey: 'reason2Desc' as const, gradient: 'from-accent-500 to-accent-700' },
    { icon: <Clock className="w-8 h-8" />, titleKey: 'reason3Title' as const, descKey: 'reason3Desc' as const, gradient: 'from-emerald-500 to-emerald-700' },
    { icon: <BookOpen className="w-8 h-8" />, titleKey: 'reason4Title' as const, descKey: 'reason4Desc' as const, gradient: 'from-indigo-500 to-indigo-700' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            {t('free')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sand-300 mb-10 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: '50+', label: isAr ? 'دورة' : 'Courses' },
              { value: '10,000+', label: t('students') },
              { value: '7', label: isAr ? 'لغات' : 'Languages' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sand-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Learn with Al-Azhar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-3">
            {t('whyLearn')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyReasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mx-auto mb-4 text-white`}>
                {reason.icon}
              </div>
              <h3 className="font-serif font-bold text-navy-900 dark:text-sand-100 mb-2">
                {t(reason.titleKey)}
              </h3>
              <p className="text-sand-600 dark:text-sand-400 text-sm leading-relaxed">
                {t(reason.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Courses */}
      <div className="bg-white dark:bg-navy-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <Star className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100">
              {t('featuredCourses')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-lg border border-sand-200 dark:border-navy-700 hover:shadow-xl transition-all group"
              >
                {/* Card Header */}
                <div className={`aspect-[16/10] bg-gradient-to-br ${categoryGradients[course.category]} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                  <div className="relative z-10 text-white/80">
                    {categoryIcons[course.category]}
                  </div>
                  {/* FREE badge */}
                  <div className="absolute top-3 end-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {t('free')}
                  </div>
                  {/* Level badge */}
                  <div className={`absolute bottom-3 start-3 text-xs font-medium px-3 py-1 rounded-full ${levelColors[course.level]}`}>
                    {t(course.level)}
                  </div>
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                      <Play className="w-8 h-8 text-white ms-1" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-navy-900 dark:text-sand-100 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sand-500 dark:text-sand-400 text-sm mb-4 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    {course.instructor}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-sand-500 dark:text-sand-400 mb-5">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.lessons} {t('lessons')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.hours} {t('hours')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {course.students.toLocaleString()} {t('students')}
                    </span>
                  </div>

                  {/* Enroll Button */}
                  <button className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    {t('enrollNow')}
                    <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* All Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100">
            {t('allCourses')}
          </h2>
        </motion.div>

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

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 text-sand-500 dark:text-sand-400">
            {t('noCourses')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-all group cursor-pointer"
              >
                {/* Card Header */}
                <div className={`aspect-[16/10] bg-gradient-to-br ${categoryGradients[course.category] || 'from-navy-600 to-navy-800'} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                  <div className="relative z-10 text-white/70">
                    {categoryIcons[course.category] || <BookOpen className="w-8 h-8" />}
                  </div>
                  {/* FREE badge */}
                  <div className="absolute top-2 end-2 bg-accent-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {t('free')}
                  </div>
                  {/* Level badge */}
                  <div className={`absolute bottom-2 start-2 text-xs font-medium px-2.5 py-1 rounded-lg ${levelColors[course.level]}`}>
                    {t(course.level)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <h3 className="font-serif font-bold text-sm text-navy-900 dark:text-sand-100 mb-1.5 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sand-500 dark:text-sand-400 text-xs mb-3 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {course.instructor}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-sand-500 dark:text-sand-400 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.hours}{isAr ? 'س' : 'h'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>

                  {/* Enroll Button */}
                  <button className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 px-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5">
                    {t('enrollNow')}
                    <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
          <div className="relative z-10">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              {t('startLearning')}
            </h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              {isAr
                ? 'ابدأ رحلتك التعليمية مع الأزهر اليوم واحصل على شهادات معتمدة'
                : 'Start your learning journey with Al-Azhar today and earn accredited certificates'}
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
              <BookOpen className="w-5 h-5" />
              {t('allCourses')}
              <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
