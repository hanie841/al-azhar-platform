'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchTimeline } from '@/lib/api-fetchers';
import type { TimelineEra } from '@/lib/types';
import { mockTimelineEras } from '@/lib/mock-data';
import { EraSection } from './EraSection';

const ERA_COLORS = ['#c9a84c', '#1a6b6b', '#c44569', '#0d4f4f'];

export function TimelinePage() {
  const t = useTranslations('timeline');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [eras, setEras] = useState<TimelineEra[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTimeline(locale)
      .then((data) => {
        if (!cancelled) {
          setEras(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to mock data mapped to API shape
          const mapped: TimelineEra[] = mockTimelineEras.map((m) => ({
            id: m.id,
            slug: m.slug,
            name: isAr ? m.name_ar : m.name_en,
            description: isAr ? m.description_ar : m.description_en,
            start_year: m.year_start,
            end_year: m.year_end,
            order: m.id,
            events: m.events.map((e) => ({
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
          }));
          setEras(mapped);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale, isAr]);

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* Era navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {eras.map((era, idx) => (
              <a
                key={era.slug}
                href={`#${era.slug}`}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
                style={{ borderColor: ERA_COLORS[idx % ERA_COLORS.length] + '60' }}
              >
                {era.name}
              </a>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,80 L0,40 Q720,0 1440,40 L1440,80 Z" fill="var(--color-sand-50)" />
          </svg>
        </div>
      </div>

      {/* Timeline content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg">...</p>
          </div>
        ) : (
          eras.map((era) => (
            <EraSection key={era.id} era={era} />
          ))
        )}
      </div>
    </div>
  );
}
