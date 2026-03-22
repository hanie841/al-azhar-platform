'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar } from 'lucide-react';

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: { id: number; slug: string; name: string } | null;
  published_at: string | null;
  created_at: string;
}

export function NewsCard({ article, large = false }: { article: Article; large?: boolean }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const dateStr = article.published_at ?? article.created_at;

  return (
    <Link
      href={`/news/${article.slug}` as any}
      className="group block bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:shadow-navy-900/50 transition-all duration-300 hover:-translate-y-1 border border-sand-100 dark:border-navy-800"
    >
      <div
        className={`${large ? 'h-64' : 'h-48'} bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-900/30 flex items-center justify-center`}
      >
        <span className="text-6xl opacity-15 font-serif text-primary-700 dark:text-primary-300">
          {article.title.charAt(0)}
        </span>
      </div>
      <div className={`${large ? 'p-6' : 'p-5'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent-100 text-accent-700">
            {article.category?.name ?? ''}
          </span>
          <span className="flex items-center gap-1 text-xs text-sand-500 dark:text-sand-400">
            <Calendar className="w-3 h-3" />
            {new Date(dateStr).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <h3
          className={`font-serif font-bold text-primary-900 dark:text-primary-200 mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors ${
            large ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {article.title}
        </h3>
        <p className={`text-sand-600 dark:text-sand-400 ${large ? 'text-base' : 'text-sm'} line-clamp-2`}>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
