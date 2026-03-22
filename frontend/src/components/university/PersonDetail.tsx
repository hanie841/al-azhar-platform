'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Clock, Crown, BookOpen, User } from 'lucide-react';
import type { Person } from '@/lib/types';

export function PersonDetail({ person }: { person: Person }) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const gradient = person.is_current_leadership
    ? 'from-accent-500 to-accent-600'
    : 'from-sand-500 to-sand-600';

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/about/leadership"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'العودة للقيادات' : 'Back to Leadership'}
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {person.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {person.title}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {person.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 mb-4">
                  {isAr ? 'السيرة الذاتية' : 'Biography'}
                </h2>
                <p className="text-sand-700 leading-relaxed whitespace-pre-line">
                  {person.bio}
                </p>
              </motion.div>
            )}

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {person.era && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-sand-200 text-sm font-medium text-sand-700 shadow-sm">
                  <Clock className="w-4 h-4 text-accent-600" />
                  {person.era}
                </span>
              )}
              {person.is_current_leadership && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-xl border border-accent-200 text-sm font-medium text-accent-700 shadow-sm">
                  <Crown className="w-4 h-4 text-accent-600" />
                  {isAr ? 'القيادة الحالية' : 'Current Leadership'}
                </span>
              )}
              {person.is_historical && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-sand-100 rounded-xl border border-sand-200 text-sm font-medium text-sand-700 shadow-sm">
                  <BookOpen className="w-4 h-4 text-sand-500" />
                  {isAr ? 'شخصية تاريخية' : 'Historical Figure'}
                </span>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Person avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center"
            >
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}
              >
                <span className="text-white font-serif text-5xl font-bold">
                  {person.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-900 text-center">
                {person.name}
              </h3>
              <p className="text-sm text-accent-600 font-medium text-center">
                {person.title}
              </p>
            </motion.div>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-bold text-primary-900 mb-4">
                {isAr ? 'معلومات سريعة' : 'Quick Info'}
              </h3>
              <div className="space-y-4">
                {person.era && (
                  <div className="flex items-center gap-3 text-sm text-sand-600">
                    <Clock className="w-4 h-4 text-accent-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-sand-400">{isAr ? 'الحقبة' : 'Era'}</p>
                      <p className="font-medium text-sand-700">{person.era}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-sand-600">
                  <User className="w-4 h-4 text-accent-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-sand-400">{isAr ? 'الحالة' : 'Status'}</p>
                    <p className="font-medium text-sand-700">
                      {person.is_current_leadership
                        ? (isAr ? 'القيادة الحالية' : 'Current Leadership')
                        : person.is_historical
                          ? (isAr ? 'شخصية تاريخية' : 'Historical Figure')
                          : (isAr ? 'عضو' : 'Member')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
