'use client';

import { useTranslations } from 'next-intl';

const reviews = [
  { name: "Ahmed", city: "Tabuk", text: "Fast delivery and great quality. Will buy again." },
  { name: "Sara", city: "Riyadh", text: "Support was helpful and the experience was smooth." },
  { name: "Khaled", city: "Jeddah", text: "Excellent packaging and clear instructions." },
];

export default function Reviews() {
  const t = useTranslations();
  return (
    <div className="py-10">
      <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">{t('home_sections_reviews')}</div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-[1.25rem] border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-2xl leading-none text-[color:var(--muted)]">“</div>
            <div className="mt-2 text-sm">{r.text}</div>
            <div className="mt-4 text-sm font-bold text-[color:var(--brand-2)]">{r.name}</div>
            <div className="text-xs text-[color:var(--muted)]">{r.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
