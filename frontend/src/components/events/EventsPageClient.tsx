'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { mockEvents } from '@/lib/mock-data';
import { fetchEvents } from '@/lib/api-fetchers';
import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/lib/types';
import { useEffect, useState } from 'react';

export function EventsPageClient() {
  const t = useTranslations('events');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [events, setEvents] = useState<Event[] | null>(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    fetchEvents(locale)
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
        );
        setEvents(sorted);
      })
      .catch(() => {
        setUseMock(true);
      });
  }, [locale]);

  // Mock data fallback: convert old shape to Event type
  const mockEventsConverted: Event[] = mockEvents.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: isAr ? e.title_ar : e.title_en,
    description: isAr ? e.description_ar : e.description_en,
    location: isAr ? e.location_ar : e.location_en,
    featured_image: null,
    starts_at: e.date,
    ends_at: e.end_date,
    created_at: e.date,
  }));

  const mockCategories: Record<number, string> = {};
  const mockStatuses: Record<number, string> = {};
  mockEvents.forEach((e) => {
    mockCategories[e.id] = e.category;
    mockStatuses[e.id] = e.status;
  });

  const displayEvents = useMock ? mockEventsConverted : events;

  if (!displayEvents) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
        <div className="bg-navy-900 relative overflow-hidden">
          <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-sand-500 dark:text-sand-400">
          {isAr ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </div>
    );
  }

  const now = new Date();
  const upcoming = displayEvents.filter((e) => new Date(e.starts_at) > now);
  const past = displayEvents.filter((e) => new Date(e.starts_at) <= now);

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
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Upcoming */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-6"
        >
          {t('upcoming')}
        </motion.h2>
        <div className="space-y-4 mb-16">
          {upcoming.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard
                event={event}
                category={useMock ? mockCategories[event.id] : undefined}
                status="upcoming"
              />
            </motion.div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-center text-sand-500 dark:text-sand-400 py-10">{t('noUpcoming')}</p>
          )}
        </div>

        <div className="section-divider max-w-md mx-auto mb-16" />

        {/* Past */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-6"
        >
          {t('past')}
        </motion.h2>
        <div className="space-y-4">
          {past.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard
                event={event}
                category={useMock ? mockCategories[event.id] : undefined}
                status="past"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
