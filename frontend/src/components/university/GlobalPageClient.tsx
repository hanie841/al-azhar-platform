'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Users, GraduationCap, Handshake, BookOpen } from 'lucide-react';

export function GlobalPageClient() {
  const t = useTranslations('global');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const stats = [
    { value: '100+', label: t('countriesStat'), icon: Globe },
    { value: '65K', label: t('intlStudentsStat'), icon: Users },
    { value: '50+', label: t('partnersStat'), icon: Handshake },
    { value: '7', label: t('languagesStat'), icon: BookOpen },
  ];

  const regions = [
    { name: t('africa'), students: '25,000+', countries: '40+' },
    { name: t('asia'), students: '20,000+', countries: '30+' },
    { name: t('europe'), students: '5,000+', countries: '15+' },
    { name: t('americas'), students: '3,000+', countries: '10+' },
    { name: t('middleEast'), students: '12,000+', countries: '15+' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Globe className="w-16 h-16 text-accent-500 mx-auto mb-6" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,80 L0,40 Q720,0 1440,40 L1440,80 Z" fill="var(--color-sand-50)" />
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 text-center shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-800"
              >
                <Icon className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary-900 dark:text-primary-200 mb-1">{stat.value}</div>
                <div className="text-sm text-sand-600 dark:text-sand-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* World map description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-navy-800 rounded-2xl p-8 lg:p-12 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-800 mb-20"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 dark:text-primary-200 mb-6 text-center">
            {t('reachTitle')}
          </h2>
          <p className="text-sand-700 leading-relaxed text-center max-w-3xl mx-auto mb-10">
            {t('reachDescription')}
          </p>

          {/* Regions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {regions.map((region, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-sand-50 dark:bg-navy-900 rounded-xl p-4 text-center"
              >
                <h3 className="font-serif font-bold text-primary-900 dark:text-primary-200 mb-2">{region.name}</h3>
                <div className="text-sm text-sand-600 dark:text-sand-400">
                  <div className="font-bold text-accent-600">{region.students}</div>
                  <div>{t('studentsFrom')} {region.countries} {t('countries')}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner universities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 dark:text-primary-200 mb-8 text-center">
            {t('partnersTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Oxford University',
              'Cambridge University',
              'Sorbonne University',
              'University of Tokyo',
              'Harvard University',
              'Al-Qarawiyyin University',
              'University of Cape Town',
              'Peking University',
            ].map((uni, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-navy-800 rounded-xl p-4 text-center border border-sand-100 dark:border-navy-800 hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium text-sand-700">{uni}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Heritage preservation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary-700 rounded-2xl p-8 lg:p-12 text-white text-center"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            {t('heritageTitle')}
          </h2>
          <p className="text-primary-100 max-w-3xl mx-auto leading-relaxed">
            {t('heritageDescription')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
