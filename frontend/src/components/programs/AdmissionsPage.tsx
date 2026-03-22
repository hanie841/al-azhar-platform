'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BookOpen, ClipboardCheck, FileText, Clock, Calendar, DollarSign, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export function AdmissionsPage() {
  const t = useTranslations('programs');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const steps = [
    { icon: BookOpen, title: t('step1Title'), desc: t('step1Desc'), num: '1' },
    { icon: ClipboardCheck, title: t('step2Title'), desc: t('step2Desc'), num: '2' },
    { icon: FileText, title: t('step3Title'), desc: t('step3Desc'), num: '3' },
    { icon: Clock, title: t('step4Title'), desc: t('step4Desc'), num: '4' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('admissions')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('admissionsSubtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* How to Apply */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 dark:text-primary-200 text-center mb-10"
          >
            {t('howToApply')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.num}
                  </div>
                  <Icon className="w-8 h-8 text-accent-600 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-sand-600 dark:text-sand-400">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Academic Calendar */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 dark:text-primary-200 text-center mb-10"
          >
            {t('academicCalendar')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 text-center"
            >
              <Calendar className="w-10 h-10 text-primary-700 dark:text-primary-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-1">
                {t('fallSemester')}
              </h3>
              <p className="text-sand-600 dark:text-sand-400 text-sm">{t('fallDates')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 text-center"
            >
              <Calendar className="w-10 h-10 text-accent-600 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-1">
                {t('springSemester')}
              </h3>
              <p className="text-sand-600 dark:text-sand-400 text-sm">{t('springDates')}</p>
            </motion.div>
          </div>
        </section>

        {/* Tuition & Fees */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 max-w-3xl mx-auto text-center"
          >
            <DollarSign className="w-12 h-12 text-accent-600 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-3">
              {t('tuition')}
            </h2>
            <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
              {t('tuitionDesc')}
            </p>
          </motion.div>
        </section>

        {/* Scholarships */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 max-w-3xl mx-auto text-center"
          >
            <Award className="w-12 h-12 text-primary-700 dark:text-primary-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-3">
              {t('scholarships')}
            </h2>
            <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
              {t('scholarshipsDesc')}
            </p>
          </motion.div>
        </section>

        {/* CTA to Programs */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-bold px-8 py-3 rounded-xl text-lg transition-colors"
            >
              {t('browsePrograms')}
              {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
