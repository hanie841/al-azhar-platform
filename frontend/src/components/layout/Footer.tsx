import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Locale } from '@/i18n/config';
import { Logo } from '@/components/ui/Logo';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('common');

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} variant="dark" />
              <div>
                <div className="font-serif text-lg font-bold">{t('siteName')}</div>
                <div className="text-sm text-gray-400">{t('siteTagline')}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              972 CE - Present
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-accent-400 font-bold mb-4">{t('about')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about/history" className="hover:text-white transition-colors">{t('history')}</Link></li>
              <li><Link href="/about/leadership" className="hover:text-white transition-colors">{t('leadership')}</Link></li>
              <li><Link href="/about/structure" className="hover:text-white transition-colors">{t('structure')}</Link></li>
              <li><Link href="/about/records" className="hover:text-white transition-colors">{t('records')}</Link></li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="font-serif text-accent-400 font-bold mb-4">{t('faculties')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/faculties" className="hover:text-white transition-colors">{t('faculties')}</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">{t('programs')}</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">{t('admissions')}</Link></li>
              <li><Link href="/library" className="hover:text-white transition-colors">{t('library')}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t('news')}</Link></li>
              <li><Link href="/media" className="hover:text-white transition-colors">{t('media')}</Link></li>
              <li><Link href="/elearning" className="hover:text-white transition-colors">{t('elearning')}</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">{t('events')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-accent-400 font-bold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Al-Azhar University, Cairo, Egypt</li>
              <li>info@azhar.edu.eg</li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-8 mb-6" />

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {t('siteName')}
        </div>
      </div>
    </footer>
  );
}
