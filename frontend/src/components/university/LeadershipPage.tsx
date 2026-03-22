'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchPeople } from '@/lib/api-fetchers';
import type { Person } from '@/lib/types';
import { mockPeople } from '@/lib/mock-data';
import { PersonCard } from './PersonCard';

export function LeadershipPage() {
  const t = useTranslations('leadership');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPeople(locale)
      .then((data) => {
        if (!cancelled) {
          setPeople(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to mock data mapped to API shape
          const mapped: Person[] = mockPeople.map((m) => ({
            id: m.id,
            slug: m.slug,
            name: isAr ? m.name_ar : m.name_en,
            title: isAr ? m.title_ar : m.title_en,
            bio: isAr ? m.bio_ar : m.bio_en,
            photo: null,
            era: null,
            is_historical: false,
            is_current_leadership: m.role === 'president' || m.role === 'vice_president',
            order: m.id,
            created_at: '',
          }));
          setPeople(mapped);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale, isAr]);

  const currentLeaders = people.filter((p) => p.is_current_leadership);
  const historicalPeople = people.filter((p) => p.is_historical);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 dark:text-sand-400 text-lg">...</p>
          </div>
        ) : (
          <>
            {/* Current Leadership */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-8 text-center"
            >
              {t('currentLeadership')}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
              {currentLeaders.slice(0, 2).map((person, i) => (
                <PersonCard key={person.id} person={person} index={i} />
              ))}
            </div>

            {/* Remaining current leaders as vice presidents section */}
            {currentLeaders.length > 2 && (
              <>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-8 text-center"
                >
                  {t('vicePresidents')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {currentLeaders.slice(2).map((person, i) => (
                    <PersonCard key={person.id} person={person} index={i} />
                  ))}
                </div>
              </>
            )}

            {/* Historical scholars */}
            <div className="section-divider max-w-md mx-auto mb-16" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4 text-center"
            >
              {t('historicalScholars')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center text-sand-500 dark:text-sand-400 mb-8"
            >
              {t('historicalScholarsDesc')}
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {historicalPeople.length > 0 ? (
                historicalPeople.map((person, i) => (
                  <Link key={person.id} href={`/people/${person.slug}`} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-navy-800 rounded-xl p-4 text-center border border-sand-100 dark:border-navy-800 hover:shadow-md transition-shadow"
                    >
                      <div className="w-14 h-14 rounded-full bg-sand-200 flex items-center justify-center mx-auto mb-3">
                        <span className="font-serif text-lg text-sand-600 dark:text-sand-400">{person.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-serif text-sm font-bold text-primary-900 dark:text-primary-200 mb-1">{person.name}</h3>
                      <p className="text-xs text-sand-400 dark:text-sand-500">{person.era || ''}</p>
                    </motion.div>
                  </Link>
                ))
              ) : (
                // Fallback hardcoded historical scholars when API returns none
                [
                  { name: isAr ? 'الإمام الشافعي' : 'Imam Al-Shafi\'i', era: '767-820' },
                  { name: isAr ? 'ابن خلدون' : 'Ibn Khaldun', era: '1332-1406' },
                  { name: isAr ? 'الشيخ محمد عبده' : 'Sheikh Muhammad Abduh', era: '1849-1905' },
                  { name: isAr ? 'الشيخ محمود شلتوت' : 'Sheikh Mahmoud Shaltout', era: '1893-1963' },
                ].map((scholar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-navy-800 rounded-xl p-4 text-center border border-sand-100 dark:border-navy-800"
                  >
                    <div className="w-14 h-14 rounded-full bg-sand-200 flex items-center justify-center mx-auto mb-3">
                      <span className="font-serif text-lg text-sand-600 dark:text-sand-400">{scholar.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-primary-900 dark:text-primary-200 mb-1">{scholar.name}</h3>
                    <p className="text-xs text-sand-400 dark:text-sand-500">{scholar.era}</p>
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
