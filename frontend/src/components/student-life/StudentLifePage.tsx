'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Mic2,
  FlaskConical,
  Globe,
  Trophy,
  Palette,
  Building2,
  Library,
  Dumbbell,
  UtensilsCrossed,
  Heart,
  Moon,
  Briefcase,
  GraduationCap,
  DollarSign,
  Headphones,
  Bus,
  Calendar,
  Star,
  Quote,
  ChevronRight,
  ClipboardCheck,
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

interface Club {
  icon: React.ReactNode;
  nameKey: string;
  descKey: string;
  members: number;
  gradient: string;
}

interface Facility {
  icon: React.ReactNode;
  nameKey: string;
  descKey: string;
  gradient: string;
}

interface ServiceItem {
  icon: React.ReactNode;
  nameKey: string;
}

interface EventItem {
  month: string;
  monthAr: string;
  nameKey: string;
  descKey: string;
  gradient: string;
}

interface Testimonial {
  nameKey: string;
  programKey: string;
  quoteKey: string;
  countryKey: string;
}

export function StudentLifePage() {
  const t = useTranslations('studentLife');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const clubs: Club[] = useMemo(
    () => [
      {
        icon: <BookOpen className="w-7 h-7" />,
        nameKey: 'club1Name',
        descKey: 'club1Desc',
        members: 1200,
        gradient: 'from-emerald-600 to-emerald-800',
      },
      {
        icon: <Mic2 className="w-7 h-7" />,
        nameKey: 'club2Name',
        descKey: 'club2Desc',
        members: 450,
        gradient: 'from-amber-600 to-amber-800',
      },
      {
        icon: <FlaskConical className="w-7 h-7" />,
        nameKey: 'club3Name',
        descKey: 'club3Desc',
        members: 680,
        gradient: 'from-indigo-600 to-indigo-800',
      },
      {
        icon: <Globe className="w-7 h-7" />,
        nameKey: 'club4Name',
        descKey: 'club4Desc',
        members: 950,
        gradient: 'from-violet-600 to-violet-800',
      },
      {
        icon: <Trophy className="w-7 h-7" />,
        nameKey: 'club5Name',
        descKey: 'club5Desc',
        members: 2100,
        gradient: 'from-rose-600 to-rose-800',
      },
      {
        icon: <Palette className="w-7 h-7" />,
        nameKey: 'club6Name',
        descKey: 'club6Desc',
        members: 380,
        gradient: 'from-primary-600 to-primary-800',
      },
    ],
    [],
  );

  const facilities: Facility[] = useMemo(
    () => [
      {
        icon: <Building2 className="w-7 h-7" />,
        nameKey: 'facility1Name',
        descKey: 'facility1Desc',
        gradient: 'from-primary-500 to-primary-700',
      },
      {
        icon: <Library className="w-7 h-7" />,
        nameKey: 'facility2Name',
        descKey: 'facility2Desc',
        gradient: 'from-accent-500 to-accent-700',
      },
      {
        icon: <Dumbbell className="w-7 h-7" />,
        nameKey: 'facility3Name',
        descKey: 'facility3Desc',
        gradient: 'from-emerald-500 to-emerald-700',
      },
      {
        icon: <UtensilsCrossed className="w-7 h-7" />,
        nameKey: 'facility4Name',
        descKey: 'facility4Desc',
        gradient: 'from-amber-500 to-amber-700',
      },
      {
        icon: <Heart className="w-7 h-7" />,
        nameKey: 'facility5Name',
        descKey: 'facility5Desc',
        gradient: 'from-rose-500 to-rose-700',
      },
      {
        icon: <Moon className="w-7 h-7" />,
        nameKey: 'facility6Name',
        descKey: 'facility6Desc',
        gradient: 'from-indigo-500 to-indigo-700',
      },
    ],
    [],
  );

  const services: ServiceItem[] = useMemo(
    () => [
      { icon: <ClipboardCheck className="w-5 h-5" />, nameKey: 'service1' },
      { icon: <Briefcase className="w-5 h-5" />, nameKey: 'service2' },
      { icon: <DollarSign className="w-5 h-5" />, nameKey: 'service3' },
      { icon: <Globe className="w-5 h-5" />, nameKey: 'service4' },
      { icon: <Headphones className="w-5 h-5" />, nameKey: 'service5' },
      { icon: <Bus className="w-5 h-5" />, nameKey: 'service6' },
    ],
    [],
  );

  const events: EventItem[] = useMemo(
    () => [
      {
        month: 'September',
        monthAr: 'سبتمبر',
        nameKey: 'event1Name',
        descKey: 'event1Desc',
        gradient: 'from-emerald-500 to-emerald-700',
      },
      {
        month: 'Ramadan',
        monthAr: 'رمضان',
        nameKey: 'event2Name',
        descKey: 'event2Desc',
        gradient: 'from-amber-500 to-amber-700',
      },
      {
        month: 'March',
        monthAr: 'مارس',
        nameKey: 'event3Name',
        descKey: 'event3Desc',
        gradient: 'from-indigo-500 to-indigo-700',
      },
      {
        month: 'June',
        monthAr: 'يونيو',
        nameKey: 'event4Name',
        descKey: 'event4Desc',
        gradient: 'from-rose-500 to-rose-700',
      },
    ],
    [],
  );

  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        nameKey: 'testimonial1Name',
        programKey: 'testimonial1Program',
        quoteKey: 'testimonial1Quote',
        countryKey: 'testimonial1Country',
      },
      {
        nameKey: 'testimonial2Name',
        programKey: 'testimonial2Program',
        quoteKey: 'testimonial2Quote',
        countryKey: 'testimonial2Country',
      },
      {
        nameKey: 'testimonial3Name',
        programKey: 'testimonial3Program',
        quoteKey: 'testimonial3Quote',
        countryKey: 'testimonial3Country',
      },
    ],
    [],
  );

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
            <Users className="w-4 h-4" />
            {t('title')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            {t('heroTitle')}
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
              { value: '50+', label: t('clubsStat') },
              { value: '50,000+', label: t('dormStudentsStat') },
              { value: '100+', label: t('eventsStat') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sand-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Section 1 - Student Clubs & Organizations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-3">
            {t('clubs')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => (
            <motion.div
              key={club.nameKey}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-all group"
            >
              <div
                className={`h-2 bg-gradient-to-r ${club.gradient}`}
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${club.gradient} flex items-center justify-center text-white shrink-0`}
                  >
                    {club.icon}
                  </div>
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-xs font-medium px-3 py-1 rounded-full">
                    <Users className="w-3 h-3" />
                    {club.members.toLocaleString()} {t('members')}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-900 dark:text-sand-100 mb-2">
                  {t(club.nameKey)}
                </h3>
                <p className="text-sand-600 dark:text-sand-400 text-sm leading-relaxed mb-4">
                  {t(club.descKey)}
                </p>
                <button className="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  {t('joinClub')}
                  <ChevronRight
                    className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 2 - Campus Facilities */}
      <div className="bg-white dark:bg-navy-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-3">
              {t('facilities')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, i) => (
              <motion.div
                key={facility.nameKey}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${facility.gradient} flex items-center justify-center mx-auto mb-4 text-white`}
                >
                  {facility.icon}
                </div>
                <h3 className="font-serif font-bold text-navy-900 dark:text-sand-100 mb-2">
                  {t(facility.nameKey)}
                </h3>
                <p className="text-sand-600 dark:text-sand-400 text-sm leading-relaxed">
                  {t(facility.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3 - Student Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100 mb-3">
            {t('services')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.nameKey}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-white dark:bg-navy-800 rounded-xl p-5 shadow-sm border border-sand-200 dark:border-navy-700 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                {service.icon}
              </div>
              <span className="font-medium text-navy-900 dark:text-sand-100 text-sm">
                {t(service.nameKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 4 - Annual Events */}
      <div className="bg-white dark:bg-navy-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <Calendar className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100">
              {t('events')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.nameKey}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-all"
              >
                <div
                  className={`bg-gradient-to-br ${event.gradient} px-6 py-4 text-center`}
                >
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                    {isAr ? event.monthAr : event.month}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-navy-900 dark:text-sand-100 mb-2">
                    {t(event.nameKey)}
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 text-sm leading-relaxed">
                    {t(event.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5 - Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Star className="w-6 h-6 text-accent-500" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100">
            {t('testimonials')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.nameKey}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-md border border-sand-200 dark:border-navy-700 relative"
            >
              <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800 absolute top-4 end-4" />
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-serif font-bold text-lg mb-3">
                  {t(testimonial.nameKey).charAt(0)}
                </div>
                <h4 className="font-serif font-bold text-navy-900 dark:text-sand-100">
                  {t(testimonial.nameKey)}
                </h4>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  {t(testimonial.programKey)}
                </p>
                <p className="text-xs text-sand-500 dark:text-sand-400">
                  {t(testimonial.countryKey)}
                </p>
              </div>
              <p className="text-sand-600 dark:text-sand-300 text-sm leading-relaxed italic">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
          <div className="relative z-10">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              {t('ctaTitle')}
            </h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              {t('ctaDescription')}
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
              <GraduationCap className="w-5 h-5" />
              {t('learnMore')}
              <ChevronRight
                className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
