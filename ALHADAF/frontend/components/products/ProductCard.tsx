'use client';

import AddToCart from './AddToCart';
import { useLocale } from 'next-intl';

export default function ProductCard({ product }: { product: any }) {
  const locale = useLocale();
  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  return (
    <div className="rounded-[1.25rem] border border-black/10 bg-white p-4 shadow-sm hover:shadow-md transition">
      <a href={`/${locale}/product/${product.slug}`}>
        <div className="h-44 rounded-[1.25rem] bg-[color:var(--brand-3)] border border-black/5 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? <img src={product.imageUrl} alt={name} className="h-44 w-full object-contain" /> : <span className="text-[color:var(--muted)]">Image</span>}
        </div>
        <div className="mt-3 font-extrabold text-[color:var(--brand-2)]">{name}</div>
        <div className="mt-1 text-sm text-[color:var(--muted)] line-clamp-2">
          {locale === 'ar' ? product.descriptionAr : product.descriptionEn}
        </div>
      </a>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="font-extrabold">SAR {product.priceSar}</div>
        <AddToCart productId={product.id} inStock={product.inStock} />
      </div>
    </div>
  );
}
