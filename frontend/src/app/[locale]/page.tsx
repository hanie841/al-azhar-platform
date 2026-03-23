import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsCounter } from '@/components/home/StatsCounter';
import { QuickLinks } from '@/components/home/QuickLinks';
import { TimelinePreview } from '@/components/home/TimelinePreview';
import { LibraryPreview } from '@/components/home/LibraryPreview';
import { FeaturedNews } from '@/components/home/FeaturedNews';
import { PrayerTimesWidget } from '@/components/widgets/PrayerTimesWidget';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsCounter />
      {/* Prayer Times Widget - compact card section */}
      <section className="py-8 sm:py-12 bg-sand-50 dark:bg-navy-900">
        <div className="max-w-sm mx-auto px-4 sm:px-6">
          <PrayerTimesWidget compact />
        </div>
      </section>
      <QuickLinks />
      <TimelinePreview />
      <LibraryPreview />
      <FeaturedNews />
    </>
  );
}
