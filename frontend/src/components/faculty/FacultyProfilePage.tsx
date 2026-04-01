'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchMyFacultyProfile } from '@/lib/api-fetchers';
import type { FacultyProfile } from '@/lib/types';
import {
  User,
  ChevronLeft,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Clock,
  Briefcase,
  Edit3,
  Save,
  X,
  Award,
  Globe,
  FileText,
  Beaker,
} from 'lucide-react';

const DAYS_AR: Record<string, string> = {
  Sunday: 'الأحد', Monday: 'الاثنين', Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء', Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت',
};

export function FacultyProfilePage() {
  const t = useTranslations('faculty');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editable fields
  const [editBio, setEditBio] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editOffice, setEditOffice] = useState('');
  const [editResearch, setEditResearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in');
      setLoading(false);
      return;
    }
    fetchMyFacultyProfile(token, locale)
      .then((data) => {
        setProfile(data);
        setEditBio(data.bio || '');
        setEditPhone(data.phone || '');
        setEditOffice(data.office_location || '');
        setEditResearch(data.research_interests?.join(', ') || '');
        setLoading(false);
      })
      .catch(() => {
        setError(isRtl ? 'لم يتم العثور على الملف الشخصي' : 'Profile not found');
        setLoading(false);
      });
  }, [locale, isRtl]);

  const handleSave = () => {
    // In production, this would call an API to update the profile.
    // For now, we update the local state.
    if (profile) {
      setProfile({
        ...profile,
        bio: editBio || null,
        phone: editPhone || null,
        office_location: editOffice || null,
        research_interests: editResearch ? editResearch.split(',').map((s) => s.trim()).filter(Boolean) : null,
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <p className="text-lg text-sand-600 dark:text-sand-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/faculty"
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-6 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
            </Link>

            <div className="flex items-center gap-5">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.user?.name || ''}
                  className="w-20 h-20 rounded-full object-cover border-3 border-gold-400"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-700/30 flex items-center justify-center border-3 border-gold-400">
                  <User className="w-10 h-10 text-gold-400" />
                </div>
              )}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {profile.user?.name || (isRtl ? 'عضو هيئة التدريس' : 'Faculty Member')}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {profile.title && (
                    <span className="text-gold-400 text-sm">{profile.title}</span>
                  )}
                  {profile.academic_rank && (
                    <span className="text-sand-400 text-sm">| {profile.academic_rank}</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-sand-400">
                  {profile.faculty && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {profile.faculty.name}
                    </span>
                  )}
                  {profile.department && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {profile.department.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white">
                  {isRtl ? 'نبذة تعريفية' : 'Biography'}
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 text-sm text-primary-700 dark:text-primary-400 hover:underline"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isRtl ? 'تعديل' : 'Edit'}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                    >
                      <Save className="w-4 h-4" />
                      {isRtl ? 'حفظ' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditBio(profile.bio || '');
                        setEditPhone(profile.phone || '');
                        setEditOffice(profile.office_location || '');
                        setEditResearch(profile.research_interests?.join(', ') || '');
                      }}
                      className="flex items-center gap-1 text-sm text-sand-500 hover:underline"
                    >
                      <X className="w-4 h-4" />
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                )}
              </div>
              {editing ? (
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={5}
                  placeholder={isRtl ? 'اكتب نبذة تعريفية...' : 'Write your biography...'}
                  className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                />
              ) : (
                <p className="text-sm text-sand-600 dark:text-sand-300 leading-relaxed">
                  {profile.bio || (isRtl ? 'لا توجد نبذة بعد' : 'No biography added yet')}
                </p>
              )}
            </motion.div>

            {/* Contact & Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4">
                {isRtl ? 'معلومات الاتصال' : 'Contact Information'}
              </h2>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'البريد الإلكتروني' : 'Email'}
                    </p>
                    <p className="text-sm text-navy-900 dark:text-white">
                      {profile.user?.email || '-'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'الهاتف' : 'Phone'}
                    </p>
                    {editing ? (
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full rounded-lg border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-sm text-navy-900 dark:text-white">
                        {profile.phone || '-'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'موقع المكتب' : 'Office Location'}
                    </p>
                    {editing ? (
                      <input
                        type="text"
                        value={editOffice}
                        onChange={(e) => setEditOffice(e.target.value)}
                        className="w-full rounded-lg border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-sm text-navy-900 dark:text-white">
                        {profile.office_location || '-'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Research Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {isRtl ? 'اهتمامات بحثية' : 'Research Interests'}
              </h2>
              {editing ? (
                <div>
                  <input
                    type="text"
                    value={editResearch}
                    onChange={(e) => setEditResearch(e.target.value)}
                    placeholder={isRtl ? 'فصل بين الاهتمامات بفاصلة' : 'Separate interests with commas'}
                    className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-sand-400 mt-1">
                    {isRtl ? 'مثال: ذكاء اصطناعي, تعلم آلي' : 'Example: AI, Machine Learning, NLP'}
                  </p>
                </div>
              ) : profile.research_interests && profile.research_interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.research_interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  {isRtl ? 'لم يتم إضافة اهتمامات بحثية بعد' : 'No research interests added yet'}
                </p>
              )}
            </motion.div>

            {/* Qualifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-500" />
                {isRtl ? 'المؤهلات العلمية' : 'Qualifications'}
              </h2>
              {profile.qualifications && profile.qualifications.length > 0 ? (
                <div className="space-y-3">
                  {profile.qualifications.map((q, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-sand-50 dark:bg-navy-900"
                    >
                      <GraduationCap className="w-5 h-5 text-primary-700 dark:text-primary-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-navy-900 dark:text-white">
                          {q.degree}
                        </p>
                        <p className="text-xs text-sand-500 dark:text-sand-400">
                          {q.institution} - {q.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  {isRtl ? 'لا توجد مؤهلات مسجلة' : 'No qualifications recorded'}
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {isRtl ? 'ساعات المكتب' : 'Office Hours'}
              </h2>
              {profile.office_hours && profile.office_hours.length > 0 ? (
                <div className="space-y-2">
                  {profile.office_hours.map((oh, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-sand-100 dark:border-navy-700 last:border-0"
                    >
                      <span className="text-sm font-medium text-navy-900 dark:text-white">
                        {isRtl ? DAYS_AR[oh.day] || oh.day : oh.day}
                      </span>
                      <span className="text-sm text-sand-500 dark:text-sand-400">
                        {oh.start} - {oh.end}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  {isRtl ? 'غير محددة' : 'Not set'}
                </p>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-navy-900 dark:text-white mb-4">
                {isRtl ? 'إحصائيات' : 'Statistics'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400">
                    <FileText className="w-4 h-4" />
                    {isRtl ? 'المنشورات' : 'Publications'}
                  </span>
                  <span className="text-lg font-bold text-navy-900 dark:text-white">
                    {profile.publications_count}
                  </span>
                </div>
                {profile.employee_id && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400">
                      <Briefcase className="w-4 h-4" />
                      {isRtl ? 'الرقم الوظيفي' : 'Employee ID'}
                    </span>
                    <span className="text-sm font-mono text-navy-900 dark:text-white">
                      {profile.employee_id}
                    </span>
                  </div>
                )}
                {profile.specialization && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400">
                      <BookOpen className="w-4 h-4" />
                      {isRtl ? 'التخصص' : 'Specialization'}
                    </span>
                    <span className="text-sm text-navy-900 dark:text-white text-end max-w-[150px] truncate">
                      {profile.specialization}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {isRtl ? 'روابط خارجية' : 'External Links'}
              </h2>
              <div className="space-y-2">
                {[
                  { label: 'Google Scholar', icon: GraduationCap, href: '#' },
                  { label: 'ORCID', icon: User, href: '#' },
                  { label: 'Scopus', icon: BookOpen, href: '#' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-sand-50 dark:bg-navy-900 hover:bg-sand-100 dark:hover:bg-navy-700 transition-all text-sm text-sand-600 dark:text-sand-400 hover:text-primary-700 dark:hover:text-primary-400"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
