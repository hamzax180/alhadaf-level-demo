'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useLocale, useTranslations } from 'next-intl';
import ProductCard from '../products/ProductCard';

type Product = {
    id: string; slug: string;
    nameEn: string; nameAr: string;
    descriptionEn: string; descriptionAr: string;
    priceSar: number;
    inStock: boolean; imageUrl?: string | null;
};

export default function FeaturedProducts() {
    const t = useTranslations();
    const [products, setProducts] = useState<Product[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        api<Product[]>('/api/products').then(setProducts).catch(() => setProducts([]));
    }, []);

    if (!mounted) return null;
    if (products.length === 0) return null;

    return (
        <div className="py-12">
            <div className="text-xs font-bold tracking-widest uppercase text-[color:var(--brand-1)]">
                {t('home_sections_products')}
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-[color:var(--brand-2)]">
                {t('home_sections_products_subtitle')}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 12).map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}
