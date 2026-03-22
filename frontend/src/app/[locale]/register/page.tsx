import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? 'إنشاء حساب' : 'Register',
    description: isAr
      ? 'إنشاء حساب جديد في جامعة الأزهر'
      : 'Create a new Al-Azhar University account',
  };
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-primary-900">
            {isAr ? 'إنشاء حساب' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isAr
              ? 'أنشئ حساباً جديداً للوصول إلى خدمات الجامعة'
              : 'Create a new account to access university services'}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6 sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
