'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchNews } from '@/lib/api-fetchers';
import { mockNews } from '@/lib/mock-data';
import type { NewsArticle } from '@/lib/types';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export function FeaturedNews() {
  const t = useTranslations('news');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchNews(locale, { per_page: 3 })
      .then((res) => setArticles(res.data))
      .catch(() => {
        // Fall back to mock data, mapping to API shape
        setArticles(
          mockNews.slice(0, 3).map((article) => ({
            id: article.id,
            slug: article.slug,
            title: isAr ? article.title_ar : article.title_en,
            excerpt: isAr ? article.excerpt_ar : article.excerpt_en,
            content: null,
            featured_image: article.image,
            category: {
              id: 0,
              slug: '',
              name: isAr ? article.category_ar : article.category_en,
            },
            views_count: 0,
            published_at: article.date,
            created_at: article.date,
          }))
        );
      });
  }, [locale, isAr]);

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white dark:bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary-900 dark:text-primary-200 mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-sand-600 dark:text-sand-400 text-base sm:text-lg mb-8 sm:mb-14 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/news/${article.slug}` as any}
                className="group block bg-sand-50 dark:bg-navy-900 rounded-2xl overflow-hidden hover:shadow-lg dark:shadow-navy-900/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-6xl opacity-20 font-serif text-primary-700">
                    {article.title.charAt(0)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent-100 text-accent-700">
                      {article.category?.name ?? ''}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-sand-500 dark:text-sand-400">
                      <Calendar className="w-3 h-3" />
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-2 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-200 font-bold transition-colors"
          >
            {tCommon('viewAll')}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
