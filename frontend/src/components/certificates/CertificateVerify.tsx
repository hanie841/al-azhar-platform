'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyCertificate } from '@/lib/api-fetchers';
import type { DigitalCertificate } from '@/lib/types';
import {
  ShieldCheck,
  ShieldX,
  Search,
  Award,
  Calendar,
  Hash,
  User,
  BookOpen,
  QrCode,
} from 'lucide-react';

export function CertificateVerify() {
  const t = useTranslations('certificate');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [certNumber, setCertNumber] = useState('');
  const [certificate, setCertificate] = useState<DigitalCertificate | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = useCallback(async () => {
    if (!certNumber.trim()) return;
    setLoading(true);
    setCertificate(null);
    setNotFound(false);

    try {
      const cert = await verifyCertificate(certNumber.trim());
      setCertificate(cert);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [certNumber]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVerify();
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck className="w-14 h-14 text-primary-400 mx-auto mb-5" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {t('title')}
            </h1>
            <p className="text-sand-400 text-lg max-w-xl mx-auto mb-8">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Search Field */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Hash className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} w-5 h-5 text-sand-400`} />
                <input
                  type="text"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-sand-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg`}
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={loading || !certNumber.trim()}
                className="px-6 py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">{t('verifying')}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">{t('verify')}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {/* Valid Certificate */}
          {certificate && (
            <motion.div
              key="valid"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border-2 border-green-200 dark:border-green-800 shadow-lg overflow-hidden"
            >
              {/* Valid Header */}
              <div className="bg-green-50 dark:bg-green-900/20 p-5 flex items-center gap-3 border-b border-green-200 dark:border-green-800">
                <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-bold text-green-700 dark:text-green-400">{t('valid')}</h2>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    {locale === 'ar' ? 'تم التحقق من صحة هذه الشهادة' : 'This certificate has been verified'}
                  </p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <Award className="w-16 h-16 text-primary-700 dark:text-primary-400 mx-auto mb-3" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-sand-100">
                    {certificate.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                    <p className="text-xs text-sand-500 dark:text-sand-400 mb-1 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {t('certificateNumber')}
                    </p>
                    <p className="font-mono font-medium text-gray-900 dark:text-sand-100">
                      {certificate.certificate_number}
                    </p>
                  </div>
                  <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                    <p className="text-xs text-sand-500 dark:text-sand-400 mb-1 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {t('certificateType')}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-sand-100 capitalize">
                      {certificate.certificate_type}
                    </p>
                  </div>
                  <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                    <p className="text-xs text-sand-500 dark:text-sand-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t('issuedAt')}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-sand-100">
                      {new Date(certificate.issued_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                    <p className="text-xs text-sand-500 dark:text-sand-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {t('expiresAt')}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-sand-100">
                      {certificate.expires_at
                        ? new Date(certificate.expires_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : t('noExpiry')}
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                {certificate.qr_code && (
                  <div className="mt-6 flex justify-center">
                    <div className="p-4 bg-white dark:bg-navy-700 rounded-xl border border-sand-200 dark:border-navy-600">
                      <p className="text-xs text-sand-500 dark:text-sand-400 mb-2 text-center flex items-center justify-center gap-1">
                        <QrCode className="w-3 h-3" />
                        {t('qrCode')}
                      </p>
                      <img
                        src={certificate.qr_code}
                        alt="QR Code"
                        className="w-32 h-32 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Invalid Certificate */}
          {notFound && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border-2 border-red-200 dark:border-red-800 shadow-lg overflow-hidden"
            >
              <div className="p-8 sm:p-12 text-center">
                <ShieldX className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{t('invalid')}</h2>
                <p className="text-sand-600 dark:text-sand-400 max-w-md mx-auto">
                  {t('invalidMessage')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
