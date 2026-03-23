'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// --- Animated Counter ---
function AnimatedCounter({ value, suffix = '', prefix = '', delay = 0 }: {
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// --- Stat Icons (SVG paths) ---
const statIcons: Record<string, string> = {
  founded: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  faculties: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  students: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  professors: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  staff: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  internationalStudents: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  countries: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  hospitals: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M12 7v4m-2-2h4',
  researchCenters: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  libraryBooks: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  annualGraduates: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  campuses: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
};

// --- Timeline Icon ---
function TimelineIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7m0 6v7" />
    </svg>
  );
}

export function StatisticsDashboard() {
  const t = useTranslations('statistics');

  const stats = [
    { key: 'founded', value: 970, suffix: ' CE', icon: statIcons.founded, delay: 0 },
    { key: 'faculties', value: 82, suffix: '', icon: statIcons.faculties, delay: 0.05 },
    { key: 'students', value: 500, suffix: 'K+', icon: statIcons.students, delay: 0.1 },
    { key: 'professors', value: 18, suffix: 'K+', icon: statIcons.professors, delay: 0.15 },
    { key: 'staff', value: 35, suffix: 'K+', icon: statIcons.staff, delay: 0.2 },
    { key: 'internationalStudents', value: 40, suffix: 'K+', icon: statIcons.internationalStudents, delay: 0.25 },
    { key: 'countries', value: 100, suffix: '+', icon: statIcons.countries, delay: 0.3 },
    { key: 'hospitals', value: 7, suffix: '', icon: statIcons.hospitals, delay: 0.35 },
    { key: 'researchCenters', value: 50, suffix: '+', icon: statIcons.researchCenters, delay: 0.4 },
    { key: 'libraryBooks', value: 2, suffix: 'M+', icon: statIcons.libraryBooks, delay: 0.45 },
    { key: 'annualGraduates', value: 100, suffix: 'K+', icon: statIcons.annualGraduates, delay: 0.5 },
  ];

  const milestones = [
    { year: '970 CE', key: 'milestone970' },
    { year: '988 CE', key: 'milestone988' },
    { year: '1961', key: 'milestone1961' },
    { year: '2000s', key: 'milestone2000s' },
    { year: '2020s', key: 'milestone2020s' },
  ];

  const rankings = [
    { key: 'oldestUniversity', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { key: 'largestIslamicUniversity', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { key: 'topIslamicStudies', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-primary-800 to-primary-900 dark:from-navy-800 dark:to-navy-900 overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                viewport={{ once: true, margin: '-30px' }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-sand-200 dark:border-navy-700 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-600 dark:text-primary-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={stat.icon} />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800 dark:text-primary-200 mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                </div>
                <div className="text-sm text-sand-600 dark:text-sand-400 font-medium">
                  {t(stat.key)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-16 sm:py-24 bg-white dark:bg-navy-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-primary-900 dark:text-primary-100 mb-12 sm:mb-16"
          >
            {t('milestones')}
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute start-6 sm:start-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-navy-600 -translate-x-1/2" />

            <div className="space-y-10 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.key}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-4 sm:gap-0 ${
                    index % 2 === 0
                      ? 'sm:flex-row sm:text-end'
                      : 'sm:flex-row-reverse sm:text-start'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:pe-10' : 'sm:ps-10'} ps-10 sm:ps-0`}>
                    <div className="bg-white dark:bg-navy-800 rounded-xl p-4 sm:p-5 shadow-sm border border-sand-200 dark:border-navy-700">
                      <div className="text-sm font-bold text-accent-600 dark:text-accent-400 mb-1">
                        {milestone.year}
                      </div>
                      <p className="text-sand-700 dark:text-sand-300 text-sm sm:text-base">
                        {t(milestone.key)}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute start-6 sm:start-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400 border-4 border-white dark:border-navy-800 ring-2 ring-primary-200 dark:ring-navy-600 z-10 mt-5" />

                  {/* Spacer for desktop */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rankings / Distinctions */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-primary-900 dark:text-primary-100 mb-12 sm:mb-16"
          >
            {t('rankings')}
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {rankings.map((ranking, index) => (
              <motion.div
                key={ranking.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-white dark:from-navy-800 dark:to-navy-800/50 rounded-2xl p-6 sm:p-8 text-center border border-primary-100 dark:border-navy-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-accent-600 dark:text-accent-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={ranking.icon} />
                  </svg>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-primary-800 dark:text-primary-200">
                  {t(ranking.key)}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
