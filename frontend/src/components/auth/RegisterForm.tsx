'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';

export function RegisterForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      router.push('/');
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
      setError(err.message || t('registerFailed'));
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('name')}
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          placeholder={t('namePlaceholder')}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          placeholder={t('emailPlaceholder')}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          placeholder={t('passwordPlaceholder')}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
          {t('confirmPassword')}
        </label>
        <input
          id="password_confirmation"
          type="password"
          required
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="block w-full rounded-lg border border-sand-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          placeholder={t('confirmPasswordPlaceholder')}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? t('registering') : t('registerButton')}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t('hasAccount')}{' '}
        <Link href="/login" className="font-medium text-primary-700 hover:text-primary-800">
          {t('loginLink')}
        </Link>
      </p>
    </form>
  );
}
