'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { mockRecords } from '@/lib/mock-data';
import { Trophy, Globe, Award, ScrollText, Monitor, Users } from 'lucide-react';

const iconMap: Record<string, any> = {
  globe: Globe,
  award: Award,
  scroll: ScrollText,
  monitor: Monitor,
  users: Users,
};

export function RecordsPageClient() {
  const t = useTranslations('records');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="w-16 h-16 text-accent-500 mx-auto mb-6" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {mockRecords.map((record, i) => {
            const Icon = iconMap[record.icon] || Award;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-sand-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`flex flex-col sm:flex-row ${!isEven ? 'sm:flex-row-reverse' : ''}`}>
                  {/* Stat side */}
                  <div className="sm:w-1/3 bg-gradient-to-br from-primary-700 to-primary-900 p-8 flex flex-col items-center justify-center text-white">
                    <Icon className="w-10 h-10 text-accent-400 mb-3" />
                    <motion.div
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                      viewport={{ once: true }}
                      className="text-4xl sm:text-5xl font-bold mb-1"
                    >
                      {record.stat}
                    </motion.div>
                    <div className="text-primary-200 text-sm">
                      {isAr ? record.stat_label_ar : record.stat_label_en}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="sm:w-2/3 p-8">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-900 mb-3">
                      {isAr ? record.title_ar : record.title_en}
                    </h3>
                    <p className="text-sand-600 leading-relaxed">
                      {isAr ? record.description_ar : record.description_en}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
