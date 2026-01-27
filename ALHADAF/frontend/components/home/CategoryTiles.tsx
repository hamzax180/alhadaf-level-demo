'use client';

import Link from 'next/link';
import { api } from '../../lib/api';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Category = { id: string; slug: string; nameEn: string; nameAr: string; imageUrl?: string | null };

export default function CategoryTiles() {
  const t = useTranslations();
  const locale = useLocale();
  const [cats, setCats] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api<Category[]>('/api/categories').then(setCats).catch(() => setCats([]));
  }, []);

  const label = (c: Category) => (locale === 'ar' ? c.nameAr : c.nameEn);

  if (!mounted) return null;

  return (
    <div className="py-12">
      <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">{t('home_sections_categories')}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map(c => (
          <a
            key={c.id}
            href={`/${locale}/category/${c.slug}`}
            className="rounded-[1.25rem] border border-black/10 bg-white shadow-sm p-5 hover:shadow-md transition flex flex-col items-center text-center"
          >
            <div className="w-full h-32 mb-4 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
              <img src={c.imageUrl || "/img/products/product-1.png"} alt={label(c)} className="w-full h-full object-contain opacity-90 group-hover:opacity-100" />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="font-extrabold text-[color:var(--brand-2)] text-left">{label(c)}</div>
              <span className="text-[color:var(--brand-1)] font-bold">→</span>
            </div>
            <div className="mt-2 text-sm text-[color:var(--muted)] w-full text-left">{t('common_viewAll')}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
