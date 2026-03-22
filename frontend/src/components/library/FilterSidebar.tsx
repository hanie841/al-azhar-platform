'use client';

import { useTranslations } from 'next-intl';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const types = ['all', 'manuscript', 'book', 'thesis', 'research', 'journal'];
const languages = ['all', 'ar', 'en', 'fr'];

const languageLabels: Record<string, { ar: string; en: string }> = {
  all: { ar: 'جميع اللغات', en: 'All Languages' },
  ar: { ar: 'العربية', en: 'Arabic' },
  en: { ar: 'الإنجليزية', en: 'English' },
  fr: { ar: 'الفرنسية', en: 'French' },
};

export function FilterSidebar({
  selectedType,
  onTypeChange,
  selectedLanguage,
  onLanguageChange,
  isOpen,
  onToggle,
}: FilterSidebarProps) {
  const t = useTranslations('library');

  const typeLabels: Record<string, string> = {
    all: t('allTypes'),
    manuscript: t('manuscripts'),
    book: t('books'),
    thesis: t('theses'),
    research: t('research'),
    journal: t('journals'),
  };

  const typeColors: Record<string, string> = {
    manuscript: 'bg-accent-100 text-accent-700 border-accent-300',
    book: 'bg-primary-100 text-primary-700 border-primary-300',
    thesis: 'bg-rose-100 text-rose-600 border-rose-300',
    research: 'bg-blue-100 text-blue-700 border-blue-300',
    journal: 'bg-green-100 text-green-700 border-green-300',
    all: 'bg-sand-100 text-sand-700 border-sand-300',
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 rounded-xl text-sm font-medium text-sand-700 hover:border-primary-300 transition-colors"
      >
        <Filter className="w-4 h-4" />
        {t('filters')}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'fixed inset-0 z-50 bg-black/50 lg:static lg:bg-transparent' : 'hidden lg:block'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onToggle();
        }}
      >
        <div
          className={`${
            isOpen
              ? 'fixed end-0 top-0 bottom-0 w-80 bg-white dark:bg-navy-800 shadow-2xl p-6 overflow-y-auto z-50 lg:static lg:shadow-none lg:p-0'
              : ''
          } lg:w-full`}
        >
          {isOpen && (
            <button
              onClick={onToggle}
              className="lg:hidden absolute top-4 end-4 p-2 hover:bg-sand-100 dark:hover:bg-navy-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="space-y-6">
            {/* Type filter */}
            <div>
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-3">
                {t('filterByType')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedType === type
                        ? typeColors[type] + ' ring-2 ring-offset-1 ring-primary-300'
                        : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border-sand-200 dark:border-navy-700 hover:border-sand-400'
                    }`}
                  >
                    {typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Language filter */}
            <div>
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-3">
                {t('filterByLanguage')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedLanguage === lang
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border-primary-300 ring-2 ring-offset-1 ring-primary-300'
                        : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border-sand-200 dark:border-navy-700 hover:border-sand-400'
                    }`}
                  >
                    {languageLabels[lang]?.en || lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
