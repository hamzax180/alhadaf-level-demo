'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const items = [
  {
    qEn: "How long does delivery take?", aEn: "Major cities: 24–48 hours. Other regions: 2–5 business days (shipping provider).",
    qAr: "خلال كم يوم يوصل الطلب؟", aAr: "داخل المدن الكبرى: 24-48 ساعة. باقي المناطق: 2-5 أيام عمل حسب شركة الشحن."
  },
  {
    qEn: "Can I return a product?", aEn: "Yes, within 7 days if the product is unopened and in its original condition.",
    qAr: "هل يمكنني استرجاع المنتج؟", aAr: "نعم خلال 7 أيام بشرط أن يكون المنتج بحالته الأصلية ولم يُفتح."
  },
  {
    qEn: "Do you have branches?", aEn: "Yes, our main branch is located in Riyadh.",
    qAr: "هل لديكم فروع؟", aAr: "نعم، فرعنا الرئيسي يقع في الرياض."
  }
];

export default function FAQ() {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="py-10">
      <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">{t('home_sections_faq')}</div>
      <div className="mt-4 grid gap-3">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-[1.25rem] border border-black/10 bg-white p-5">
            <button className="w-full flex items-center justify-between gap-3 font-bold"
              onClick={() => setOpen(open === idx ? null : idx)}>
              <span>{locale === 'ar' ? it.qAr : it.qEn}</span>
              <span className="text-[color:var(--brand-1)]">{open === idx ? '−' : '+'}</span>
            </button>
            {open === idx && (
              <div className="mt-3 text-sm text-[color:var(--muted)]">
                {locale === 'ar' ? it.aAr : it.aEn}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
