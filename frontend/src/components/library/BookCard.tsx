'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BookOpen, Eye, Download, Lock } from 'lucide-react';

interface BookCardProps {
  item: {
    id: number;
    slug: string;
    title: string;
    type: string;
    authors: string[] | null;
    publication_year: number | null;
    access_level: string;
    views_count: number;
    downloads_count: number;
  };
}

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

export function BookCard({ item }: BookCardProps) {
  const locale = useLocale();
  const color = typeColors[item.type] ?? '#1a6b6b';

  return (
    <Link
      href={`/library/${item.slug}` as any}
      className="group block bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-navy-900/50 hover:shadow-lg dark:hover:shadow-navy-900/50 transition-all duration-300 hover:-translate-y-1 border border-sand-100 dark:border-navy-800"
    >
      <div
        className="h-44 flex items-center justify-center relative"
        style={{ backgroundColor: color + '18' }}
      >
        <BookOpen className="w-14 h-14 opacity-25" style={{ color }} />
        {item.access_level === 'restricted' && (
          <div className="absolute top-3 end-3 bg-rose-500 text-white p-1.5 rounded-full">
            <Lock className="w-3 h-3" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            {typeLabels[item.type]?.[locale === 'ar' ? 'ar' : 'en'] || item.type}
          </span>
          <span className="text-xs text-sand-500 dark:text-sand-400">{item.publication_year}</span>
        </div>
        <h3 className="font-serif text-sm font-bold text-primary-900 dark:text-primary-200 line-clamp-2 mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-sand-500 dark:text-sand-400 mb-3">
          {item.authors?.[0] ?? ''}
        </p>
        <div className="flex items-center gap-4 text-xs text-sand-400 dark:text-sand-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {item.views_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" /> {item.downloads_count.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
