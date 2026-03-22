'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';

export function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
      setError(err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-sand-200 mb-1">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm dark:shadow-navy-900/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
          placeholder={t('emailPlaceholder')}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-sand-200 mb-1">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm dark:shadow-navy-900/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors dark:bg-navy-800 dark:border-navy-700 dark:text-sand-100 dark:placeholder-sand-500"
          placeholder={t('passwordPlaceholder')}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? t('loggingIn') : t('loginButton')}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-sand-300">
        {t('noAccount')}{' '}
        <Link href="/register" className="font-medium text-primary-700 dark:text-primary-300 hover:text-primary-800">
          {t('registerLink')}
        </Link>
      </p>
    </form>
  );
}
