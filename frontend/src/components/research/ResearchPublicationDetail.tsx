'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  Quote,
  Calendar,
  BookOpen,
  Users,
  Tag,
  FileText,
} from 'lucide-react';
import type { ResearchPublication } from '@/lib/types';
import { fetchResearchPublications } from '@/lib/api-fetchers';
import { ResearchCard } from './ResearchCard';

const areaColors: Record<string, string> = {
  'Islamic Studies': '#c9a84c',
  Science: '#0d4f4f',
  Medicine: '#c44569',
  Engineering: '#155a5a',
  Humanities: '#8b6914',
  Law: '#6c3483',
  Education: '#1a6b6b',
  Agriculture: '#2e7d32',
};

export function ResearchPublicationDetail({ publication }: { publication: ResearchPublication }) {
  const t = useTranslations('research');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const areaColor = areaColors[publication.research_area ?? ''] ?? '#1a6b6b';

  const [related, setRelated] = useState<ResearchPublication[]>([]);

  useEffect(() => {
    if (publication.research_area) {
      fetchResearchPublications(locale, { research_area: publication.research_area, per_page: 4 })
        .then((res) => {
          setRelated(res.data.filter((p) => p.id !== publication.id).slice(0, 4));
        })
        .catch(() => {
          // silently fail for related
        });
    }
  }, [locale, publication.research_area, publication.id]);

  const formattedDate = publication.publication_date
    ? new Date(publication.publication_date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'العودة للبحث العلمي' : 'Back to Research'}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-lg dark:shadow-navy-900/50 overflow-hidden">
          <div
            className="h-2 w-full"
            style={{ backgroundColor: areaColor }}
          />

          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badges */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {publication.publication_type && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sand-100 dark:bg-navy-700 text-sand-700 dark:text-sand-300">
                      {t(publication.publication_type === 'journal_article' ? 'journalArticle'
                          : publication.publication_type === 'conference_paper' ? 'conferencePaper'
                          : publication.publication_type === 'book' ? 'book'
                          : publication.publication_type === 'thesis' ? 'thesis'
                          : 'report')}
                    </span>
                  )}
                  {publication.research_area && (
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: areaColor }}
                    >
                      {publication.research_area}
                    </span>
                  )}
                  {publication.is_featured && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
                      {t('featured')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 dark:text-primary-200 mb-4 leading-tight">
                  {publication.title}
                </h1>

                {/* Authors */}
                {publication.authors && publication.authors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-sand-500 dark:text-sand-400 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('authors')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {publication.authors.map((author, i) => (
                        <span
                          key={i}
                          className="inline-block text-sm bg-sand-50 dark:bg-navy-900 text-sand-700 dark:text-sand-300 px-3 py-1.5 rounded-lg"
                        >
                          {author}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Abstract */}
                {publication.abstract && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-sand-500 dark:text-sand-400 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t('abstract')}
                    </h3>
                    <p className="text-sand-700 dark:text-sand-300 leading-relaxed text-base">
                      {publication.abstract}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {publication.pdf_url && (
                    <a
                      href={publication.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {t('downloadPdf')}
                    </a>
                  )}
                  {publication.external_url && (
                    <a
                      href={publication.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('viewExternal')}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Metadata Sidebar */}
            <div className="lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-s border-sand-100 dark:border-navy-700 p-6 lg:p-8 bg-sand-50/50 dark:bg-navy-900/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-5"
              >
                {publication.journal_name && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {t('journal')}
                    </div>
                    <div className="text-sm font-medium text-primary-900 dark:text-primary-200">
                      {publication.journal_name}
                    </div>
                  </div>
                )}

                {formattedDate && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {t('publishedDate')}
                    </div>
                    <div className="text-sm font-medium text-primary-900 dark:text-primary-200">
                      {formattedDate}
                    </div>
                  </div>
                )}

                {publication.doi && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1">
                      {t('doi')}
                    </div>
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline break-all"
                    >
                      {publication.doi}
                    </a>
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1 flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    {t('citations')}
                  </div>
                  <div className="text-sm font-medium text-primary-900 dark:text-primary-200">
                    {publication.citation_count.toLocaleString()}
                  </div>
                </div>

                {publication.research_area && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      {t('researchArea')}
                    </div>
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: areaColor }}
                    >
                      {publication.research_area}
                    </span>
                  </div>
                )}

                {publication.publication_type && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1">
                      {t('publicationType')}
                    </div>
                    <div className="text-sm font-medium text-primary-900 dark:text-primary-200">
                      {t(publication.publication_type === 'journal_article' ? 'journalArticle'
                          : publication.publication_type === 'conference_paper' ? 'conferencePaper'
                          : publication.publication_type === 'book' ? 'book'
                          : publication.publication_type === 'thesis' ? 'thesis'
                          : 'report')}
                    </div>
                  </div>
                )}

                {publication.faculty && (
                  <div>
                    <div className="text-xs font-bold text-sand-400 dark:text-sand-500 mb-1">
                      {isAr ? 'الكلية' : 'Faculty'}
                    </div>
                    <div className="text-sm font-medium text-primary-900 dark:text-primary-200">
                      {publication.faculty.name}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related Research */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-6">
              {t('relatedResearch')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ResearchCard publication={pub} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
