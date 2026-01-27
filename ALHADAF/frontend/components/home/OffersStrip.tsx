'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function OffersStrip() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="pb-10">
      <div className="rounded-[1.25rem] bg-[color:var(--brand-2)] text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-white/70">{t('home_sections_offers')}</div>
          <div className="mt-2 text-2xl font-extrabold">{t('home_sections_offers')}</div>
          <div className="mt-2 text-white/70 text-sm">{t('home_hero_subtitle')}</div>
        </div>
        <Link
          href={`/${locale}/offers`}
          className="rounded-2xl bg-[color:var(--brand-1)] px-5 py-3 font-semibold w-fit hover:bg-[#0a6b48] transition-colors"
        >
          {t('browse_offers')}
        </Link>
      </div>
    </div>
  );
}
