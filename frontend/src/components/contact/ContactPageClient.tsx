'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactPageClient() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await api('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage(isAr ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  const contactInfo = [
    { icon: MapPin, label: t('addressLabel'), value: t('addressValue') },
    { icon: Phone, label: t('phoneLabel'), value: '+20 2 2345 6789' },
    { icon: Mail, label: t('emailLabel'), value: 'info@azhar.edu.eg' },
    { icon: Clock, label: t('hoursLabel'), value: t('hoursValue') },
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-8">
              {t('infoTitle')}
            </h2>
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                    </div>
                    <div>
                      <div className="text-sm text-sand-500 dark:text-sand-400 mb-1">{item.label}</div>
                      <div className="font-medium text-primary-900 dark:text-primary-200">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="bg-sand-200 dark:bg-navy-800 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-sand-500 dark:text-sand-400">
                <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{isAr ? 'خريطة الموقع' : 'Map Location'}</p>
                <p className="text-xs mt-1">{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-8">
              {t('formTitle')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-sand-700 dark:text-sand-200 mb-1">{t('nameLabel')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-sand-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sand-700 dark:text-sand-200 mb-1">{t('emailFormLabel')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-sand-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sand-700 dark:text-sand-200 mb-1">{t('subjectLabel')}</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-sand-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sand-700 dark:text-sand-200 mb-1">{t('messageLabel')}</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-sand-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
                />
              </div>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  {t('successMessage')}
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === 'loading'
                  ? (isAr ? 'جاري الإرسال...' : 'Sending...')
                  : t('sendButton')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
