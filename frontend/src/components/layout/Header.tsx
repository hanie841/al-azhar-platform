'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { type Locale, localeNames, locales } from '@/i18n/config';
import { useRouter } from '@/i18n/navigation';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { href: '/' as const, label: t('home') },
    { href: '/about/history' as const, label: t('history') },
    { href: '/faculties' as const, label: t('faculties') },
    { href: '/library' as const, label: t('library') },
    { href: '/news' as const, label: t('news') },
    { href: '/about/leadership' as const, label: t('leadership') },
    { href: '/global' as const, label: t('global') },
    { href: '/contact' as const, label: t('contact') },
  ];

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Logo size={40} variant="light" className="lg:w-12 lg:h-12" />
            <div className="hidden sm:block">
              <div className="font-serif text-primary-900 text-lg font-bold leading-tight">
                {t('siteName')}
              </div>
              <div className="text-xs text-sand-500">{t('siteTagline')}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{localeNames[locale]}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute end-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-sand-200 py-1 z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-start px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${
                        loc === locale ? 'text-primary-700 font-bold bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-sand-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
