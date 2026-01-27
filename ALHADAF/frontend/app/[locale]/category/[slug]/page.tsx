'use client';

import { useEffect, useState } from 'react';
import Container from '../../../../components/Container';
import ProductCard from '../../../../components/products/ProductCard';
import { api } from '../../../../lib/api';

type Product = {
  id: string; slug: string;
  nameEn: string; nameAr: string;
  descriptionEn: string; descriptionAr: string;
  priceSar: number;
  inStock: boolean; imageUrl?: string | null;
};

export default function CategoryPage({ params }: { params: { locale: string; slug: string } }) {
  const [data, setData] = useState<{ category: any; products: Product[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ category: any; products: Product[] }>(`/api/categories/${params.slug}/products`)
      .then(setData)
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <Container><div className="py-10">Loading...</div></Container>;
  if (!data || !data.category) return <Container><div className="py-10">Category not found.</div></Container>;

  const name = params.locale === 'ar' ? data.category.nameAr : data.category.nameEn;

  return (
    <Container>
      <div className="py-10">
        <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">
          {params.locale === 'ar' ? 'تصنيف' : 'Category'}
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-[color:var(--brand-2)]">{name}</h1>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </Container>
  );
}
