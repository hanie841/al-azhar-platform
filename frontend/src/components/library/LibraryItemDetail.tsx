'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BookOpen, Download, Quote, Bookmark, Eye, Lock, Unlock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { LibraryItem } from '@/lib/types';

const typeLabels: Record<string, { ar: string; en: string }> = {
  manuscript: { ar: 'مخطوطة', en: 'Manuscript' },
  book: { ar: 'كتاب', en: 'Book' },
  thesis: { ar: 'رسالة', en: 'Thesis' },
  research: { ar: 'بحث', en: 'Research' },
  journal: { ar: 'مجلة', en: 'Journal' },
  journal_article: { ar: 'مقال علمي', en: 'Journal Article' },
};

const typeColors: Record<string, string> = {
  manuscript: '#c9a84c',
  book: '#0d4f4f',
  thesis: '#8b6914',
  research: '#c44569',
  journal_article: '#155a5a',
};

const langLabels: Record<string, { ar: string; en: string }> = {
  ar: { ar: 'العربية', en: 'Arabic' },
  en: { ar: 'الإنجليزية', en: 'English' },
  fr: { ar: 'الفرنسية', en: 'French' },
};

export function LibraryItemDetail({ item }: { item: LibraryItem }) {
  const t = useTranslations('library');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const color = typeColors[item.type] ?? '#1a6b6b';
  const isFree = item.access_level === 'free' || item.access_level === 'open';

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t('backToLibrary')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Cover */}
            <div className="lg:w-96 flex-shrink-0">
              <div
                className="h-64 lg:h-full min-h-[320px] flex items-center justify-center"
                style={{ backgroundColor: color + '18' }}
              >
                <BookOpen
                  className="w-24 h-24 opacity-25"
                  style={{ color }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-6 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    {typeLabels[item.type]?.[isAr ? 'ar' : 'en'] || item.type}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                    isFree
                      ? 'bg-green-100 text-green-700'
                      : 'bg-rose-100 text-rose-600'
                  }`}>
                    {isFree ? (
                      <Unlock className="w-3 h-3" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                    {isFree
                      ? (isAr ? 'متاح' : 'Open Access')
                      : (isAr ? 'مقيد' : 'Restricted')}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 mb-2">
                  {item.title}
                </h1>

                <p className="text-lg text-sand-600 mb-6">
                  {item.authors?.join(', ') ?? ''}
                </p>

                <p className="text-sand-700 leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-sand-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-sand-500 mb-1">{isAr ? 'السنة' : 'Year'}</div>
                    <div className="font-bold text-primary-900">{item.publication_year ?? '-'}</div>
                  </div>
                  <div className="bg-sand-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-sand-500 mb-1">{isAr ? 'اللغة' : 'Language'}</div>
                    <div className="font-bold text-primary-900">
                      {langLabels[item.language]?.[isAr ? 'ar' : 'en'] || item.language}
                    </div>
                  </div>
                  <div className="bg-sand-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-sand-500 mb-1">{t('pages')}</div>
                    <div className="font-bold text-primary-900">{item.page_count ?? '-'}</div>
                  </div>
                  <div className="bg-sand-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-sand-500 mb-1">{t('views')}</div>
                    <div className="font-bold text-primary-900">{(item.views_count ?? 0).toLocaleString()}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <Eye className="w-4 h-4" />
                    {t('readOnline')}
                  </button>
                  <button className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                    {t('downloadPdf')}
                  </button>
                  <button className="flex items-center gap-2 border-2 border-sand-300 text-sand-700 hover:border-primary-300 hover:text-primary-700 font-bold px-6 py-3 rounded-xl transition-colors">
                    <Quote className="w-4 h-4" />
                    {t('cite')}
                  </button>
                  <button className="flex items-center gap-2 border-2 border-sand-300 text-sand-700 hover:border-primary-300 hover:text-primary-700 font-bold px-6 py-3 rounded-xl transition-colors">
                    <Bookmark className="w-4 h-4" />
                    {t('bookmark')}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related section placeholder */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-primary-900 mb-6">
            {isAr ? 'عناصر ذات صلة' : 'Related Items'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-sand-100 flex items-center justify-center h-40"
              >
                <p className="text-sand-400 text-sm">{isAr ? 'قريباً' : 'Coming Soon'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
