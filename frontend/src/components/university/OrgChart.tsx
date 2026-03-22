'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { fetchOrgStructure } from '@/lib/api-fetchers';
import type { OrgUnit } from '@/lib/types';

const typeColors: Record<string, string> = {
  grand_imam: 'bg-accent-500 text-white border-accent-600',
  head: 'bg-accent-500 text-white border-accent-600',
  presidency: 'bg-primary-700 text-white border-primary-800',
  president: 'bg-primary-700 text-white border-primary-800',
  vp: 'bg-primary-500 text-white border-primary-600',
  vice_president: 'bg-primary-500 text-white border-primary-600',
  faculty: 'bg-primary-100 text-primary-800 border-primary-200',
  institute: 'bg-accent-100 text-accent-800 border-accent-200',
  center: 'bg-sand-100 text-sand-800 border-sand-200',
  hospital: 'bg-rose-100 text-rose-700 border-rose-200',
  council: 'bg-amber-100 text-amber-800 border-amber-200',
  sector: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  media: 'bg-sky-100 text-sky-800 border-sky-200',
};

function OrgNodeComponent({ node, depth = 0 }: { node: OrgUnit; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const colors = typeColors[node.type] || typeColors.center;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className={`rounded-xl p-4 border-2 ${colors} min-w-[180px] max-w-[250px] text-center cursor-pointer`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="font-serif text-sm font-bold mb-1">
          {node.name}
        </div>
        {node.head && (
          <div className="flex items-center justify-center gap-1 text-xs opacity-80">
            <User className="w-3 h-3" />
            {node.head.name}
          </div>
        )}
        {hasChildren && (
          <div className="mt-1">
            {expanded ? (
              <ChevronUp className="w-4 h-4 mx-auto opacity-60" />
            ) : (
              <ChevronDown className="w-4 h-4 mx-auto opacity-60" />
            )}
          </div>
        )}
      </motion.div>

      {hasChildren && expanded && (
        <>
          <div className="w-0.5 h-6 bg-sand-300" />
          <div className="flex flex-wrap justify-center gap-4 relative">
            {node.children!.length > 1 && (
              <div className="absolute top-0 h-0.5 bg-sand-300" style={{ width: '80%', left: '10%' }} />
            )}
            {node.children!.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-sand-300" />
                <OrgNodeComponent node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function OrgChart() {
  const t = useTranslations('structure');
  const locale = useLocale();
  const [units, setUnits] = useState<OrgUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchOrgStructure(locale)
      .then((data) => {
        if (!cancelled) {
          setUnits(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [locale]);

  // Find the Grand Imam node (top of hierarchy) or build a virtual root
  const rootNode: OrgUnit | null = units.length === 1
    ? units[0]
    : units.length > 1
      ? {
          id: 0,
          slug: 'al-azhar',
          type: 'head',
          name: locale === 'ar' ? 'الأزهر الشريف' : 'Al-Azhar',
          description: null,
          order: 0,
          children: units,
          created_at: '',
        }
      : null;

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
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Org chart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-x-auto">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg">...</p>
          </div>
        ) : rootNode ? (
          <div className="min-w-[600px] flex justify-center">
            <OrgNodeComponent node={rootNode} />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sand-500 text-lg">
              {locale === 'ar' ? 'لا توجد بيانات' : 'No data available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
