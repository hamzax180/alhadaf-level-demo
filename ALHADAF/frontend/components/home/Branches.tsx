'use client';

import { useTranslations } from 'next-intl';

export default function Branches() {
  const t = useTranslations();
  return (
    <div className="py-10">
      <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">{t('home_sections_branches')}</div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {["Riyadh"].map((city) => (
          <div key={city} className="rounded-[1.25rem] border border-black/10 bg-white p-5">
            <div className="font-extrabold text-[color:var(--brand-2)]">{city}</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">Sat–Thu: 9 AM – 10 PM</div>
          </div>
        ))}
      </div>
    </div>
  );
}
