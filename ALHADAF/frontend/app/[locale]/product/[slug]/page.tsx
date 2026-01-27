'use client';

import { useEffect, useState } from 'react';
import Container from '../../../../components/Container';
import { api } from '../../../../lib/api';
import AddToCart from '../../../../components/products/AddToCart';

export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<any>(`/api/products/${params.slug}`)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <Container><div className="py-10">Loading...</div></Container>;
  if (!product) return <Container><div className="py-10">Product not found.</div></Container>;

  const name = params.locale === 'ar' ? product.nameAr : product.nameEn;
  const catName = params.locale === 'ar' ? product.category?.nameAr : product.category?.nameEn;

  return (
    <Container>
      <div className="py-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-black/10 bg-white p-4 shadow-sm">
          <div className="h-80 rounded-[1.25rem] bg-[color:var(--brand-3)] border border-black/5 flex items-center justify-center">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={name} className="max-h-80 object-contain" />
            ) : (
              <span className="text-[color:var(--muted)]">Image</span>
            )}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-black/10 bg-white p-6 shadow-sm">
          <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">{catName}</div>
          <h1 className="mt-2 text-3xl font-extrabold text-[color:var(--brand-2)]">{name}</h1>
          <div className="mt-3 text-2xl font-extrabold">SAR {product.priceSar}</div>
          <div className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
            {params.locale === 'ar' ? product.descriptionAr : product.descriptionEn}
          </div>

          <div className="mt-6">
            <AddToCart productId={product.id} inStock={product.inStock} />
          </div>
        </div>
      </div>
    </Container>
  );
}
