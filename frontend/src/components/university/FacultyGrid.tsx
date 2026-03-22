'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchFaculties, fetchOrgStructure } from '@/lib/api-fetchers';
import type { Faculty, OrgUnit } from '@/lib/types';
import { mockFaculties } from '@/lib/mock-data';
import { FacultyCard } from './FacultyCard';
import { SearchBar } from '@/components/library/SearchBar';

const types = ['all', 'faculty', 'institute', 'center', 'hospital'];

export function FacultyGrid() {
  const t = useTranslations('faculties');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Collect hospitals from org-structure tree
    function collectHospitals(units: OrgUnit[]): Faculty[] {
      const hospitals: Faculty[] = [];
      for (const u of units) {
        if (u.type === 'hospital') {
          hospitals.push({
            id: u.id + 10000, // offset to avoid ID collision
            slug: u.slug,
            name: u.name,
            description: u.description,
            dean_message: null,
            featured_image: null,
            departments_count: 0,
            created_at: u.created_at,
            type: 'hospital',
          } as Faculty & { type: string });
        }
        if (u.children) {
          hospitals.push(...collectHospitals(u.children));
        }
      }
      return hospitals;
    }

    Promise.all([
      fetchFaculties(locale),
      fetchOrgStructure(locale).catch(() => []),
    ])
      .then(([facultyData, orgData]) => {
        if (!cancelled) {
          const hospitals = collectHospitals(orgData);
          setFaculties([...facultyData, ...hospitals]);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const mapped: Faculty[] = mockFaculties.map((m) => ({
            id: m.id,
            slug: m.slug,
            name: isAr ? m.name_ar : m.name_en,
            description: isAr ? m.description_ar : m.description_en,
            dean_message: null,
            featured_image: null,
            departments_count: m.departments_count,
            created_at: '',
          }));
          setFaculties(mapped);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale, isAr]);

  const typeLabels: Record<string, string> = {
    all: t('filterAll'),
    faculty: t('filterFaculty'),
    institute: t('filterInstitute'),
    center: t('filterCenter'),
    hospital: t('filterHospital'),
  };

  const filtered = useMemo(() => {
    return faculties.filter((f) => {
      const matchesSearch =
        !search ||
        f.name.toLowerCase().includes(search.toLowerCase());
      // API doesn't return a `type` field, so skip type filter unless data has it
      const matchesType = selectedType === 'all' || (f as any).type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [search, selectedType, faculties]);

  return (
    <div className="min-h-screen bg-sand-50">
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
        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-sand-600 border border-sand-200 hover:border-primary-300'
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg">...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((faculty, i) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <FacultyCard faculty={faculty} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg">{isAr ? 'لم يتم العثور على نتائج' : 'No results found'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
