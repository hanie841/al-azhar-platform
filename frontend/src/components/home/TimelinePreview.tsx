'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchTimeline } from '@/lib/api-fetchers';
import { mockTimelineEras } from '@/lib/mock-data';
import type { TimelineEra } from '@/lib/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ERA_COLORS = ['#c9a84c', '#1a6b6b', '#c44569', '#0d4f4f'];

export function TimelinePreview() {
  const t = useTranslations('timeline');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [eras, setEras] = useState<TimelineEra[]>([]);

  useEffect(() => {
    fetchTimeline(locale)
      .then((data) => setEras(data))
      .catch(() => {
        // Fall back to mock data, mapping to API shape
        setEras(
          mockTimelineEras.map((era) => ({
            id: era.id,
            slug: era.slug,
            name: isAr ? era.name_ar : era.name_en,
            description: isAr ? era.description_ar : era.description_en,
            start_year: era.year_start,
            end_year: era.year_end,
            order: era.id,
            events: era.events.map((e) => ({
              id: e.id,
              slug: '',
              title: isAr ? e.title_ar : e.title_en,
              description: isAr ? e.description_ar : e.description_en,
              year: e.year,
              image: null,
              order: e.id,
              created_at: '',
            })),
            created_at: '',
          }))
        );
      });
  }, [locale, isAr]);

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-base sm:text-lg mb-8 sm:mb-14 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {eras.map((era, i) => {
            const color = ERA_COLORS[i % ERA_COLORS.length];
            return (
              <motion.div
                key={era.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-64 sm:w-80 snap-center"
              >
                <div
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm h-full hover:bg-white/10 transition-colors"
                  style={{ borderTopColor: color, borderTopWidth: '3px' }}
                >
                  <div className="text-sm font-bold mb-2" style={{ color }}>
                    {era.start_year} - {era.end_year}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {era.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {era.description}
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    {era.events.length} {t('events')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/about/history"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-accent-500/25"
          >
            {t('viewFullTimeline')}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
