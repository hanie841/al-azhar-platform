'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

interface OrgNode {
  id: string;
  name_ar: string;
  name_en: string;
  type: string;
  head_ar?: string;
  head_en?: string;
  children?: OrgNode[];
}

const orgData: OrgNode = {
  id: 'grand-imam',
  name_ar: 'شيخ الأزهر الشريف',
  name_en: 'Grand Imam of Al-Azhar',
  type: 'head',
  head_ar: 'أ.د. أحمد الطيب',
  head_en: 'Prof. Ahmad Al-Tayyeb',
  children: [
    {
      id: 'president',
      name_ar: 'رئيس الجامعة',
      name_en: 'University President',
      type: 'president',
      head_ar: 'أ.د. محمد المحرصاوي',
      head_en: 'Prof. Muhammad Al-Mahrasawi',
      children: [
        {
          id: 'vp-academic',
          name_ar: 'نائب رئيس الجامعة للشؤون الأكاديمية',
          name_en: 'VP for Academic Affairs',
          type: 'vp',
          head_ar: 'أ.د. عبدالحليم منصور',
          head_en: 'Prof. Abdel Halim Mansour',
          children: [
            { id: 'theology', name_ar: 'كلية أصول الدين', name_en: 'Faculty of Theology', type: 'faculty' },
            { id: 'sharia', name_ar: 'كلية الشريعة والقانون', name_en: 'Faculty of Sharia & Law', type: 'faculty' },
            { id: 'arabic', name_ar: 'كلية اللغة العربية', name_en: 'Faculty of Arabic', type: 'faculty' },
            { id: 'medicine', name_ar: 'كلية الطب', name_en: 'Faculty of Medicine', type: 'faculty' },
            { id: 'engineering', name_ar: 'كلية الهندسة', name_en: 'Faculty of Engineering', type: 'faculty' },
          ],
        },
        {
          id: 'vp-research',
          name_ar: 'نائب رئيس الجامعة للدراسات العليا',
          name_en: 'VP for Graduate Studies',
          type: 'vp',
          head_ar: 'أ.د. أحمد حسني',
          head_en: 'Prof. Ahmad Hosny',
          children: [
            { id: 'research-center', name_ar: 'مركز البحث العلمي', name_en: 'Scientific Research Center', type: 'center' },
            { id: 'library', name_ar: 'المكتبة المركزية', name_en: 'Central Library', type: 'center' },
          ],
        },
        {
          id: 'vp-community',
          name_ar: 'نائب رئيس الجامعة لخدمة المجتمع',
          name_en: 'VP for Community Service',
          type: 'vp',
          head_ar: 'أ.د. يوسف عامر',
          head_en: 'Prof. Youssef Amer',
          children: [
            { id: 'hospital', name_ar: 'المستشفى الجامعي', name_en: 'University Hospital', type: 'hospital' },
            { id: 'community', name_ar: 'مركز خدمة المجتمع', name_en: 'Community Service Center', type: 'center' },
          ],
        },
      ],
    },
    {
      id: 'research-academy',
      name_ar: 'مجمع البحوث الإسلامية',
      name_en: 'Islamic Research Academy',
      type: 'institute',
      children: [
        { id: 'fatwa', name_ar: 'دار الإفتاء', name_en: 'Dar Al-Ifta', type: 'center' },
        { id: 'daawa', name_ar: 'قطاع الدعوة', name_en: 'Da\'wa Sector', type: 'center' },
      ],
    },
  ],
};

const typeColors: Record<string, string> = {
  head: 'bg-accent-500 text-white border-accent-600',
  president: 'bg-primary-700 text-white border-primary-800',
  vp: 'bg-primary-500 text-white border-primary-600',
  faculty: 'bg-primary-100 text-primary-800 border-primary-200',
  institute: 'bg-accent-100 text-accent-800 border-accent-200',
  center: 'bg-sand-100 text-sand-800 border-sand-200',
  hospital: 'bg-rose-100 text-rose-700 border-rose-200',
};

function OrgNodeComponent({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const locale = useLocale();
  const isAr = locale === 'ar';
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
          {isAr ? node.name_ar : node.name_en}
        </div>
        {node.head_ar && (
          <div className="flex items-center justify-center gap-1 text-xs opacity-80">
            <User className="w-3 h-3" />
            {isAr ? node.head_ar : node.head_en}
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
            {/* Horizontal connector */}
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
        <div className="min-w-[600px] flex justify-center">
          <OrgNodeComponent node={orgData} />
        </div>
      </div>
    </div>
  );
}
