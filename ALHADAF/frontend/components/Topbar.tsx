'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Topbar() {
  const t = useTranslations();
  const locale = useLocale();
  const other = locale === 'ar' ? 'en' : 'ar';

  return (
    <div className="bg-[color:var(--brand-2)] text-white/90 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span>{t('topbar_language')}:</span>
          <a className="underline underline-offset-4" href={`/${other}`}>{other.toUpperCase()}</a>
          <span className="mx-2 opacity-40">|</span>
          <span>{t('topbar_currency')}: {locale === 'ar' ? 'ر.س' : 'SAR'}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="text-lg">🌱</span>
            <span className="text-xs opacity-70">{locale === 'ar' ? 'مساعد الزراعة الذكي متاح' : 'AI Agriculture Expert Available'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
