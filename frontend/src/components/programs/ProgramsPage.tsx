'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchPrograms, fetchFaculties } from '@/lib/api-fetchers';
import type { AcademicProgram, Faculty } from '@/lib/types';
import { ProgramCard } from './ProgramCard';
import { SearchBar } from '@/components/library/SearchBar';

const degreeLevels = ['all', 'bachelor', 'master', 'doctorate', 'diploma'];

export function ProgramsPage() {
  const t = useTranslations('programs');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetchPrograms(locale).then((res) => res.data),
      fetchFaculties(locale).catch(() => []),
    ])
      .then(([programData, facultyData]) => {
        if (!cancelled) {
          setPrograms(programData);
          setFaculties(facultyData);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPrograms([]);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [locale]);

  const levelLabels: Record<string, string> = {
    all: t('filterAll'),
    bachelor: t('filterBachelor'),
    master: t('filterMaster'),
    doctorate: t('filterDoctorate'),
    diploma: t('filterDiploma'),
  };

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
      const matchesLevel =
        selectedLevel === 'all' || p.degree_level === selectedLevel;
      const matchesFaculty =
        selectedFaculty === 'all' || (p.faculty && String(p.faculty.id) === selectedFaculty);
      return matchesSearch && matchesLevel && matchesFaculty;
    });
  }, [search, selectedLevel, selectedFaculty, programs]);

  const isAr = locale === 'ar';

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
            className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <SearchBar value={search} onChange={setSearch} placeholder={t('searchPlaceholder')} />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Degree level filters */}
          <div className="flex flex-wrap gap-2">
            {degreeLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedLevel === level
                    ? 'bg-primary-700 text-white'
                    : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300'
                }`}
              >
                {levelLabels[level]}
              </button>
            ))}
          </div>

          {/* Faculty filter dropdown */}
          {faculties.length > 0 && (
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 focus:outline-none focus:border-primary-500"
            >
              <option value="all">{t('faculty')}: {t('filterAll')}</option>
              {faculties.map((f) => (
                <option key={f.id} value={String(f.id)}>
                  {f.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary-200 dark:border-primary-800 border-t-primary-700 dark:border-t-primary-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
