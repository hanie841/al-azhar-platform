'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { fetchMsisPayments } from '@/lib/api-fetchers';
import type { MsisPayment } from '@/lib/types';
import {
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  User,
} from 'lucide-react';
import Link from 'next/link';

export function PaymentsPage() {
  const t = useTranslations('paymentsPage');
  const ts = useTranslations('student');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();

  const [payments, setPayments] = useState<MsisPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchMsisPayments(token, locale, { per_page: 100 })
      .then((res) => {
        if (!cancelled) setPayments(res.data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [token, isAuthenticated, locale]);

  const paidPayments = useMemo(() => payments.filter((p) => p.status === 'paid'), [payments]);
  const pendingPayments = useMemo(() => payments.filter((p) => p.status === 'pending'), [payments]);
  const overduePayments = useMemo(() => payments.filter((p) => p.status === 'overdue'), [payments]);

  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalBalance = totalPending + totalOverdue;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="w-3 h-3" />
            {t('paid')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="w-3 h-3" />
            {t('pending')}
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="w-3 h-3" />
            {t('overdue')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sand-100 text-sand-600 dark:bg-navy-700 dark:text-sand-400">
            {status}
          </span>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="animate-pulse text-sand-500 text-lg">{ts('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-sand-400 mb-4" />
          <p className="text-sand-600 dark:text-sand-400 text-lg">
            {locale === 'ar' ? 'يرجى تسجيل الدخول' : 'Please log in'}
          </p>
          <Link href={`/${locale}/auth/login`} className="mt-4 inline-block bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors">
            {locale === 'ar' ? 'تسجيل الدخول' : 'Log In'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sand-400 text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <DollarSign className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900 dark:text-sand-100">
              ${totalBalance.toLocaleString()}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('totalBalance')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              ${totalPaid.toLocaleString()}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('paid')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              ${totalPending.toLocaleString()}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('pending')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              ${totalOverdue.toLocaleString()}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('overdue')}</p>
          </div>
        </motion.div>

        {/* Outstanding Fees */}
        {(pendingPayments.length > 0 || overduePayments.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t('outstandingFees')}
            </h2>
            <div className="space-y-3">
              {[...overduePayments, ...pendingPayments].map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-sand-50 dark:bg-navy-900 rounded-lg border border-sand-100 dark:border-navy-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-sand-100 text-sm">
                      {t('amount')}: ${payment.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
                      {payment.payment_method}
                    </p>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payment History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 overflow-hidden"
        >
          <div className="p-5 border-b border-sand-200 dark:border-navy-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary-700 dark:text-primary-400" />
              {t('paymentHistory')}
            </h2>
          </div>

          {loading ? (
            <div className="animate-pulse p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-sand-100 dark:bg-navy-700 rounded" />
              ))}
            </div>
          ) : payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sand-50 dark:bg-navy-900 border-b border-sand-200 dark:border-navy-700">
                    <th className="text-start px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('amount')}</th>
                    <th className="text-start px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('method')}</th>
                    <th className="text-start px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('date')}</th>
                    <th className="text-start px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('receipt')}</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{ts('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, i) => (
                    <tr
                      key={payment.id}
                      className={`border-b border-sand-100 dark:border-navy-700 ${
                        i % 2 === 0 ? 'bg-white dark:bg-navy-800' : 'bg-sand-50/50 dark:bg-navy-850'
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-sand-100">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-sand-300 capitalize">
                        {payment.payment_method}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-sand-300">
                        {payment.paid_at
                          ? new Date(payment.paid_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')
                          : '--'}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-sand-300 font-mono text-xs">
                        {payment.receipt_number || '--'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <CreditCard className="w-16 h-16 mx-auto text-sand-300 dark:text-sand-600 mb-4" />
              <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noPayments')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
