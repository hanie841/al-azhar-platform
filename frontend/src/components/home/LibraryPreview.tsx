'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchLibraryItems } from '@/lib/api-fetchers';
import { mockLibraryItems } from '@/lib/mock-data';
import type { LibraryItem } from '@/lib/types';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

const typeLabels: Record<string, { ar: string; en: string }> = {
  manuscript: { ar: 'مخطوطة', en: 'Manuscript' },
  book: { ar: 'كتاب', en: 'Book' },
  thesis: { ar: 'رسالة', en: 'Thesis' },
  research: { ar: 'بحث', en: 'Research' },
  journal: { ar: 'مجلة', en: 'Journal' },
};

const typeColorMap: Record<string, string> = {
  manuscript: '#c9a84c',
  book: '#0d4f4f',
  thesis: '#8b6914',
  research: '#c44569',
  journal_article: '#155a5a',
};

export function LibraryPreview() {
  const t = useTranslations('library');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [items, setItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    fetchLibraryItems(locale, { per_page: 4 })
      .then((res) => setItems(res.data))
      .catch(() => {
        // Fall back to mock data, mapping to API shape
        setItems(
          mockLibraryItems.slice(0, 4).map((item) => ({
            id: item.id,
            slug: item.slug,
            title: isAr ? item.title_ar : item.title_en,
            subtitle: null,
            description: isAr ? item.description_ar : item.description_en,
            abstract: null,
            type: item.type,
            authors: [isAr ? item.author_ar : item.author_en],
            publisher: null,
            publication_year: item.year,
            edition: null,
            isbn: null,
            issn: null,
            doi: null,
            language: item.language,
            subjects: null,
            faculty: null,
            department: null,
            era: null,
            page_count: item.pages,
            access_level: item.access_level,
            file_path: null,
            cover_image: null,
            manuscript_images: null,
            views_count: item.views,
            downloads_count: item.downloads,
            published_at: null,
            created_at: '',
          }))
        );
      });
  }, [locale, isAr]);

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary-900 mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-sand-600 text-base sm:text-lg mb-8 sm:mb-14 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => {
            const coverColor = typeColorMap[item.type] ?? '#1a6b6b';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/library/${item.slug}` as any}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: coverColor + '22' }}
                  >
                    <BookOpen
                      className="w-16 h-16 opacity-30"
                      style={{ color: coverColor }}
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className="inline-block text-xs font-bold px-2 py-1 rounded-full mb-2 text-white"
                      style={{ backgroundColor: coverColor }}
                    >
                      {typeLabels[item.type]?.[isAr ? 'ar' : 'en'] || item.type}
                    </span>
                    <h3 className="font-serif text-base font-bold text-primary-900 line-clamp-2 mb-1 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-sand-500">
                      {item.authors?.[0] ?? ''}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/library"
            className="inline-flex items-center gap-2 border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-bold px-8 py-3 rounded-xl transition-all"
          >
            {t('browseLibrary')}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
