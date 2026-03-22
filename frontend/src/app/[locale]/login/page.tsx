import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? 'تسجيل الدخول' : 'Login',
    description: isAr
      ? 'تسجيل الدخول إلى حسابك في جامعة الأزهر'
      : 'Login to your Al-Azhar University account',
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-primary-900">
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isAr
              ? 'أدخل بياناتك للوصول إلى حسابك'
              : 'Enter your credentials to access your account'}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
