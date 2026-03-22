'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, GraduationCap, Calendar, Building, User, Mail, Phone } from 'lucide-react';
import type { Faculty } from '@/lib/types';

export function FacultyDetail({ faculty }: { faculty: Faculty }) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/faculties"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isAr ? 'العودة للكليات' : 'Back to Faculties'}
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {faculty.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 text-gray-400"
          >
            <span className="flex items-center gap-1">
              <Building className="w-4 h-4" /> {faculty.departments_count} {isAr ? 'أقسام' : 'Departments'}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
            >
              <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                {isAr ? 'نبذة عن الكلية' : 'About the Faculty'}
              </h2>
              <p className="text-sand-700 leading-relaxed">
                {faculty.description}
              </p>
            </motion.div>

            {/* Dean's message */}
            {faculty.dean_message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                  {isAr ? 'كلمة العميد' : "Dean's Message"}
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sand-500 dark:text-sand-400 text-sm mb-3">{isAr ? 'عميد الكلية' : 'Dean'}</p>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      {faculty.dean_message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Departments */}
            {faculty.departments_count > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                  {isAr ? 'الأقسام' : 'Departments'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: faculty.departments_count }, (_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-sand-50 dark:bg-navy-900 rounded-xl"
                    >
                      <GraduationCap className="w-5 h-5 text-accent-600" />
                      <span className="text-sand-700 font-medium">
                        {isAr ? `القسم ${i + 1}` : `Department ${i + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50"
            >
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-4">
                {isAr ? 'معلومات الاتصال' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                  <Mail className="w-4 h-4 text-accent-600" />
                  <span>{faculty.slug}@azhar.edu.eg</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                  <Phone className="w-4 h-4 text-accent-600" />
                  <span>+20 2 2345 6789</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary-700 text-white rounded-2xl p-6"
            >
              <h3 className="font-serif text-lg font-bold mb-2">
                {isAr ? 'التقديم والقبول' : 'Admissions'}
              </h3>
              <p className="text-primary-100 text-sm mb-4">
                {isAr
                  ? 'تعرف على شروط القبول والتقديم لهذه الكلية'
                  : 'Learn about admission requirements and application process'}
              </p>
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors">
                {isAr ? 'قدّم الآن' : 'Apply Now'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
