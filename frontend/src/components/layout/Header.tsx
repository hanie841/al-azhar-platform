'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { type Locale, localeNames, locales } from '@/i18n/config';
import { useRouter } from '@/i18n/navigation';
import { Menu, X, Search, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { useAuth } from '@/lib/auth-context';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { href: '/' as const, label: t('home') },
    { href: '/about/history' as const, label: t('history') },
    { href: '/faculties' as const, label: t('faculties') },
    { href: '/programs' as const, label: t('programs') },
    { href: '/library' as const, label: t('library') },
    { href: '/news' as const, label: t('news') },
    { href: '/media' as const, label: t('media') },
    { href: '/elearning' as const, label: t('elearning') },
    { href: '/about/leadership' as const, label: t('leadership') },
    { href: '/contact' as const, label: t('contact') },
  ];

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  }

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-navy-900/95 backdrop-blur-sm border-b border-sand-200 dark:border-navy-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Logo size={40} className="lg:w-12 lg:h-12" />
            <div className="hidden sm:block">
              <div className="font-serif text-primary-900 dark:text-sand-100 text-lg font-bold leading-tight">
                {t('siteName')}
              </div>
              <div className="text-xs text-sand-500 dark:text-sand-400">{t('siteTagline')}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
              aria-label={t('search')}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 p-2 text-gray-600 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{localeNames[locale]}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute end-0 mt-2 w-40 bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-sand-200 dark:border-navy-700 py-1 z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-start px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-navy-700 transition-colors ${
                        loc === locale ? 'text-primary-700 dark:text-primary-300 font-bold bg-primary-50 dark:bg-navy-700' : 'text-gray-700 dark:text-sand-300'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {!authLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="relative hidden sm:block">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute end-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-sand-200 dark:border-navy-700 py-1 z-50">
                        <div className="px-4 py-2 border-b border-sand-100 dark:border-navy-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-sand-100 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-sand-400 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={async () => {
                            setUserMenuOpen(false);
                            await logout();
                          }}
                          className="w-full flex items-center gap-2 text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {locale === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="py-4 border-t border-sand-200 dark:border-navy-700">
            <GlobalSearch onClose={handleSearchClose} />
          </div>
        )}

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-sand-200 dark:border-navy-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-sand-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!authLoading && (
              <div className="mt-2 pt-2 border-t border-sand-200 dark:border-navy-700">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-sand-400">
                      {user.name} ({user.email})
                    </div>
                    <button
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await logout();
                      }}
                      className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-3 py-3 text-base font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    {locale === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                )}
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
