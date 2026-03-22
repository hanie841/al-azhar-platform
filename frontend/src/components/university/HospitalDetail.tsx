'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, HeartPulse, Mail, Phone, Clock, AlertCircle } from 'lucide-react';
import type { OrgUnit } from '@/lib/types';

export function HospitalDetail({ hospital }: { hospital: OrgUnit }) {
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
            {isAr ? 'العودة للكليات والمستشفيات' : 'Back to Faculties & Hospitals'}
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {hospital.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-600">
              <HeartPulse className="w-4 h-4" />
              {isAr ? 'مستشفى' : 'Hospital'}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {hospital.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                  {isAr ? 'نبذة عن المستشفى' : 'About the Hospital'}
                </h2>
                <p className="text-sand-700 leading-relaxed">
                  {hospital.description}
                </p>
              </motion.div>
            )}

            {/* Head / Director */}
            {hospital.head && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                  {isAr ? 'مدير المستشفى' : 'Hospital Director'}
                </h2>
                <div className="flex items-center gap-4">
                  {hospital.head.photo ? (
                    <img
                      src={hospital.head.photo}
                      alt={hospital.head.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <HeartPulse className="w-8 h-8 text-rose-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200">
                      {hospital.head.name}
                    </p>
                    {hospital.head.title && (
                      <p className="text-sand-500 dark:text-sand-400 text-sm">{hospital.head.title}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Children / Departments */}
            {hospital.children && hospital.children.length > 0 && (
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
                  {hospital.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center gap-3 p-4 bg-sand-50 dark:bg-navy-900 rounded-xl"
                    >
                      <HeartPulse className="w-5 h-5 text-rose-500" />
                      <span className="text-sand-700 font-medium">{child.name}</span>
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
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>{hospital.slug}@azhar.edu.eg</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                  <Phone className="w-4 h-4 text-rose-500" />
                  <span>+20 2 2345 6789</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-rose-600 text-white rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold">
                  {isAr ? 'معلومات الطوارئ' : 'Emergency Info'}
                </h3>
              </div>
              <p className="text-rose-100 text-sm mb-4">
                {isAr
                  ? 'للحالات الطارئة، يرجى الاتصال بقسم الطوارئ مباشرة'
                  : 'For emergencies, please contact the emergency department directly'}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{isAr ? 'متاح ٢٤ ساعة' : 'Available 24/7'}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
