'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchPeople } from '@/lib/api-fetchers';
import type { Person } from '@/lib/types';
import { mockPeople } from '@/lib/mock-data';
import { PersonCard } from './PersonCard';
import { Crown } from 'lucide-react';

const formerPresidents = [
  { nameAr: 'أ.د/ محمد البهي', nameEn: 'Prof. Muhammad Al-Bahi', era: '1961 – 1964', order: 1 },
  { nameAr: 'أ.د/ أحمد حسن الباقوري', nameEn: 'Prof. Ahmad Hassan Al-Baqouri', era: '1964 – 1969', order: 2 },
  { nameAr: 'أ.د/ بدوي عبد اللطيف عوض', nameEn: 'Prof. Badawi Abdel Latif Awad', era: '1969 – 1974', order: 3 },
  { nameAr: 'أ.د/ محمد حسن فايد', nameEn: 'Prof. Muhammad Hassan Fayed', era: '1974 – 1979', order: 4 },
  { nameAr: 'أ.د/ عوض الله جاد حجازي', nameEn: 'Prof. Awadallah Gad Hegazy', era: '1979 – 1980', order: 5 },
  { nameAr: 'أ.د/ محمد الطيب النجار', nameEn: 'Prof. Muhammad Al-Tayyeb Al-Naggar', era: '1980 – 1983', order: 6 },
  { nameAr: 'أ.د/ محمد السعدي فرهود', nameEn: 'Prof. Muhammad Al-Saadi Farhoud', era: '1983 – 1987', order: 7 },
  { nameAr: 'أ.د/ عبد الفتاح حسيني الشيخ', nameEn: 'Prof. Abdel Fattah Husseini Al-Sheikh', era: '1987 – 1995', order: 8 },
  { nameAr: 'أ.د/ أحمد عمر هاشم', nameEn: 'Prof. Ahmad Omar Hashem', era: '1995 – 2003', order: 9 },
  { nameAr: 'أ.د/ أحمد الطيب', nameEn: 'Prof. Ahmad Al-Tayyeb', era: '2003 – 2010', order: 10 },
  { nameAr: 'أ.د/ عبد الله الحسيني', nameEn: 'Prof. Abdullah Al-Husseini', era: '2010 – 2011', order: 11 },
  { nameAr: 'أ.د/ أسامة العبد', nameEn: 'Prof. Osama Al-Abd', era: '2011 – 2014', order: 12 },
  { nameAr: 'أ.د/ محمد عبد الشافي', nameEn: 'Prof. Muhammad Abdel Shafi', era: '2014', note_ar: 'قائم بالأعمال', note_en: 'Acting', order: 13 },
  { nameAr: 'أ.د/ عبد الحي عزب', nameEn: 'Prof. Abdel Hai Azab', era: '2014 – 2015', order: 14 },
  { nameAr: 'أ.د/ إبراهيم الهدهد', nameEn: 'Prof. Ibrahim Al-Hudhud', era: '2015 – 2017', note_ar: 'قائم بالأعمال', note_en: 'Acting', order: 15 },
  { nameAr: 'أ.د/ أحمد حسني', nameEn: 'Prof. Ahmad Hosny', era: '2017', note_ar: 'قائم بالأعمال', note_en: 'Acting', order: 16 },
  { nameAr: 'أ.د/ محمد المحرصاوي', nameEn: 'Prof. Muhammad Al-Mahrasawi', era: '2017 – 2025', order: 17 },
];

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

            {/* Former University Presidents */}
            <div className="section-divider max-w-md mx-auto mb-16" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Crown className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 text-center">
                  {isAr ? 'رؤساء الجامعة السابقون' : 'Former University Presidents'}
                </h2>
              </div>
              <p className="text-center text-sand-500 dark:text-sand-400 mb-10 text-sm">
                {isAr ? 'منذ إعادة تنظيم الجامعة بالقانون 103 لسنة 1961' : 'Since the university reorganization under Law 103 of 1961'}
              </p>

              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className={`absolute top-0 bottom-0 ${isAr ? 'right-6 sm:right-8' : 'left-6 sm:left-8'} w-0.5 bg-amber-200 dark:bg-amber-800`} />

                  <div className="space-y-4">
                    {formerPresidents.map((p, i) => {
                      const name = isAr ? p.nameAr : p.nameEn;
                      const note = isAr ? (p as any).note_ar : (p as any).note_en;
                      const initials = isAr
                        ? p.nameAr.replace('أ.د/ ', '').charAt(0)
                        : p.nameEn.replace('Prof. ', '').charAt(0);

                      return (
                        <motion.div
                          key={p.order}
                          initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          viewport={{ once: true }}
                          className={`relative flex items-center gap-4 ${isAr ? 'pr-0' : 'pl-0'}`}
                        >
                          {/* Timeline dot */}
                          <div className={`relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-600 flex items-center justify-center`}>
                            <span className="font-serif text-sm sm:text-base font-bold text-amber-700 dark:text-amber-300">{initials}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 bg-white dark:bg-navy-800 rounded-xl p-4 border border-sand-100 dark:border-navy-700 shadow-sm">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                                #{p.order}
                              </span>
                              <span className="text-xs text-sand-500 dark:text-sand-400">{p.era}</span>
                              {note && (
                                <span className="text-xs text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-full">
                                  {note}
                                </span>
                              )}
                            </div>
                            <h3 className="font-serif text-sm sm:text-base font-bold text-primary-900 dark:text-primary-200 mt-1">
                              {name}
                            </h3>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Current president at end of timeline */}
                    <motion.div
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: formerPresidents.length * 0.04 }}
                      viewport={{ once: true }}
                      className="relative flex items-center gap-4"
                    >
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500 dark:bg-amber-600 border-2 border-amber-600 dark:border-amber-500 flex items-center justify-center shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30">
                        <span className="font-serif text-sm sm:text-base font-bold text-white">
                          {isAr ? 'س' : 'S'}
                        </span>
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-navy-800 rounded-xl p-4 border-2 border-amber-400 dark:border-amber-600 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white bg-amber-500 px-2 py-0.5 rounded-full">
                            #18
                          </span>
                          <span className="text-xs text-sand-500 dark:text-sand-400">
                            {isAr ? '2025 – حتى تاريخه' : '2025 – Present'}
                          </span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-bold">
                            {isAr ? 'الحالي' : 'Current'}
                          </span>
                        </div>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-primary-900 dark:text-primary-200 mt-1">
                          {isAr ? 'أ.د/ سلامة داود' : 'Prof. Salama Dawood'}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

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
