'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchLeaveRequests, submitLeaveRequest } from '@/lib/api-fetchers';
import type { LeaveRequest } from '@/lib/types';
import {
  CalendarDays,
  ChevronLeft,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Calendar,
  FileText,
  Trash2,
} from 'lucide-react';

const LEAVE_TYPES = [
  { value: 'annual', labelEn: 'Annual', labelAr: 'سنوية' },
  { value: 'sick', labelEn: 'Sick', labelAr: 'مرضية' },
  { value: 'personal', labelEn: 'Personal', labelAr: 'شخصية' },
  { value: 'academic', labelEn: 'Academic', labelAr: 'أكاديمية' },
  { value: 'maternity', labelEn: 'Maternity', labelAr: 'أمومة' },
  { value: 'emergency', labelEn: 'Emergency', labelAr: 'طارئة' },
];

const STATUS_CONFIG: Record<string, { color: string; icon: typeof Clock; labelEn: string; labelAr: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: Clock, labelEn: 'Pending', labelAr: 'قيد المراجعة' },
  approved: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: CheckCircle2, labelEn: 'Approved', labelAr: 'موافق عليها' },
  rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: XCircle, labelEn: 'Rejected', labelAr: 'مرفوضة' },
};

export function LeaveRequestsPage() {
  const t = useTranslations('faculty');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formType, setFormType] = useState('annual');
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [formReason, setFormReason] = useState('');

  useEffect(() => {
    loadRequests();
  }, [locale]);

  const loadRequests = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchLeaveRequests(token, locale)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => {
        setRequests([]);
        setLoading(false);
      });
  };

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    if (!formStart || !formEnd || !formReason.trim()) {
      setError(isRtl ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await submitLeaveRequest(token, {
        leave_type: formType,
        start_date: formStart,
        end_date: formEnd,
        reason: formReason,
      });
      setSuccess(isRtl ? 'تم تقديم الطلب بنجاح' : 'Leave request submitted successfully');
      setShowForm(false);
      setFormType('annual');
      setFormStart('');
      setFormEnd('');
      setFormReason('');
      loadRequests();
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError(isRtl ? 'فشل في تقديم الطلب' : 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/faculty"
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-4 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-8 h-8 text-gold-400" />
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {isRtl ? 'طلبات الإجازة' : 'Leave Requests'}
                </h1>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-medium py-2 px-4 rounded-xl text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                {isRtl ? 'طلب جديد' : 'New Request'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-sm text-green-700 dark:text-green-400 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {success}
          </motion.div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
            <button onClick={() => setError(null)} className="ms-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Leave Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                    {isRtl ? 'طلب إجازة جديد' : 'New Leave Request'}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-1 text-sand-400 hover:text-sand-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmitLeave} className="space-y-4">
                  {/* Leave Type */}
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">
                      {isRtl ? 'نوع الإجازة' : 'Leave Type'}
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {LEAVE_TYPES.map((lt) => (
                        <option key={lt.value} value={lt.value}>
                          {isRtl ? lt.labelAr : lt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">
                        {isRtl ? 'من تاريخ' : 'Start Date'}
                      </label>
                      <input
                        type="date"
                        value={formStart}
                        onChange={(e) => setFormStart(e.target.value)}
                        className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">
                        {isRtl ? 'إلى تاريخ' : 'End Date'}
                      </label>
                      <input
                        type="date"
                        value={formEnd}
                        onChange={(e) => setFormEnd(e.target.value)}
                        min={formStart}
                        className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">
                      {isRtl ? 'السبب' : 'Reason'}
                    </label>
                    <textarea
                      value={formReason}
                      onChange={(e) => setFormReason(e.target.value)}
                      rows={4}
                      placeholder={isRtl ? 'اكتب سبب الإجازة...' : 'Describe the reason for leave...'}
                      className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-sand-100 dark:bg-navy-700 text-sand-600 dark:text-sand-400 hover:bg-sand-200 transition-all"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-primary-700 text-white hover:bg-primary-800 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      {isRtl ? 'تقديم الطلب' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leave Requests List */}
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req, i) => {
              const cfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
              const StatusIcon = cfg.icon;
              const typeInfo = LEAVE_TYPES.find((lt) => lt.value === req.leave_type);
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${cfg.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {isRtl ? cfg.labelAr : cfg.labelEn}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sand-100 dark:bg-navy-700 text-sand-600 dark:text-sand-400">
                        {isRtl ? typeInfo?.labelAr : typeInfo?.labelEn || req.leave_type}
                      </span>
                    </div>
                    {req.duration_days && (
                      <span className="text-sm font-medium text-navy-900 dark:text-white">
                        {req.duration_days} {isRtl ? 'يوم' : `day${req.duration_days > 1 ? 's' : ''}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-sand-600 dark:text-sand-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-sand-400" />
                      {new Date(req.start_date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>-</span>
                    <span>
                      {new Date(req.end_date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-sand-600 dark:text-sand-400">{req.reason}</p>

                  {req.rejection_reason && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-400">
                      <XCircle className="w-4 h-4 inline-block me-1" />
                      {isRtl ? 'سبب الرفض:' : 'Rejection reason:'} {req.rejection_reason}
                    </div>
                  )}

                  {req.approved_at && req.status === 'approved' && (
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-3.5 h-3.5 inline-block me-1" />
                      {isRtl ? 'تمت الموافقة في' : 'Approved on'}{' '}
                      {new Date(req.approved_at).toLocaleDateString(locale)}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <CalendarDays className="w-16 h-16 mx-auto text-sand-300 dark:text-navy-600 mb-4" />
            <p className="text-lg text-sand-500 dark:text-sand-400">
              {isRtl ? 'لا توجد طلبات إجازة' : 'No leave requests yet'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              {isRtl ? 'تقديم طلب إجازة' : 'Submit Leave Request'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
