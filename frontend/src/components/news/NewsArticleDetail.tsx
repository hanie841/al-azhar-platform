'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Calendar, Share2, Facebook, Twitter } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';

export function NewsArticleDetail({ article }: { article: NewsArticle }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const dateStr = article.published_at ?? article.created_at;

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero image */}
      <div className="bg-gradient-to-br from-primary-200 to-primary-300 h-64 lg:h-96 flex items-center justify-center">
        <span className="text-8xl opacity-15 font-serif text-primary-700">
          {article.title.charAt(0)}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-10"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sand-500 hover:text-primary-700 transition-colors mb-6 text-sm"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'العودة للأخبار' : 'Back to News'}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent-100 text-accent-700">
              {article.category?.name ?? ''}
            </span>
            <span className="flex items-center gap-1 text-sm text-sand-500">
              <Calendar className="w-4 h-4" />
              {new Date(dateStr).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none text-sand-700 leading-relaxed mb-8">
            {article.excerpt && (
              <p className="text-lg font-medium text-sand-800 mb-4">
                {article.excerpt}
              </p>
            )}
            {article.content && (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            )}
            {!article.content && (
              <>
                <p>
                  {isAr
                    ? 'تأتي هذه الخطوة في إطار رؤية جامعة الأزهر نحو التطوير والتحديث المستمر، مع الحفاظ على هويتها العريقة وتراثها العلمي الممتد لأكثر من ألف عام.'
                    : 'This step comes within the framework of Al-Azhar University\'s vision towards continuous development and modernization, while preserving its prestigious identity and scientific heritage spanning over a thousand years.'}
                </p>
              </>
            )}
          </div>

          {/* Share buttons */}
          <div className="border-t border-sand-200 pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-sand-500 flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                {isAr ? 'مشاركة' : 'Share'}
              </span>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
