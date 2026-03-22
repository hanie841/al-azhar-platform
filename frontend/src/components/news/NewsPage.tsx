'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchNews } from '@/lib/api-fetchers';
import type { NewsArticle } from '@/lib/types';
import { mockNews } from '@/lib/mock-data';
import { NewsCard } from './NewsCard';

export function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchNews(locale, { per_page: 50 })
      .then((res) => {
        if (!cancelled) {
          setArticles(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to mock data mapped to API shape
          const mapped: NewsArticle[] = mockNews.map((m) => ({
            id: m.id,
            slug: m.slug,
            title: isAr ? m.title_ar : m.title_en,
            excerpt: isAr ? m.excerpt_ar : m.excerpt_en,
            content: null,
            featured_image: m.image,
            category: {
              id: 0,
              slug: (isAr ? m.category_ar : m.category_en).toLowerCase().replace(/\s+/g, '-'),
              name: isAr ? m.category_ar : m.category_en,
            },
            views_count: 0,
            published_at: m.date,
            created_at: m.date,
          }));
          setArticles(mapped);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale, isAr]);

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category?.name).filter(Boolean) as string[]);
    return ['all', ...Array.from(cats)];
  }, [articles]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((a) => a.category?.name === selectedCategory);
  }, [selectedCategory, articles]);

  const featured = filtered[0];
  const rest = filtered.filter((n) => n.id !== featured?.id);

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
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-700 text-white'
                  : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300'
              }`}
            >
              {cat === 'all' ? t('allCategories') : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 dark:text-sand-400 text-lg">...</p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <NewsCard article={featured} large />
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noNews')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
