'use client';

import { useState, useEffect } from 'react';
import Container from '../../../components/Container';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { api } from '../../../lib/api';

type Product = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceSar: number;
  imageUrl?: string | null;
  category?: {
    nameEn: string;
    nameAr: string;
    slug: string;
  };
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const t = useTranslations();
  const locale = useLocale();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!q.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await api<{ query: string; results: Product[] }>(`/api/search?q=${encodeURIComponent(q)}`);
        setResults(data.results);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      }
      setLoading(false);
    }

    fetchResults();
  }, [q]);

  return (
    <Container>
      <div className="py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[color:var(--brand-2)]">{t('search_title')}</h1>
          <div className="mt-2 flex items-center gap-2 text-gray-500">
            <span>{t('search_query')}:</span>
            <span className="font-bold text-[color:var(--brand-1)]">"{q}"</span>
            {!loading && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {results.length} {t('search_results_count')}
              </span>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin text-5xl mb-4">🔍</div>
            <div className="text-gray-500">{locale === 'ar' ? 'جاري البحث...' : 'Searching...'}</div>
          </div>
        )}

        {/* No results */}
        {!loading && results.length === 0 && q && (
          <div className="text-center py-16 bg-gray-50 rounded-3xl">
            <div className="text-6xl mb-4">😕</div>
            <div className="text-xl font-bold text-gray-700">{t('search_no_results')}</div>
            <p className="mt-2 text-gray-500">
              {locale === 'ar'
                ? `لم نجد منتجات تطابق "${q}". جرب كلمات بحث أخرى.`
                : `We couldn't find products matching "${q}". Try different keywords.`}
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/product/${p.slug}`}
                className="group rounded-3xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 group-hover:scale-105 transition-transform">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={locale === 'ar' ? p.nameAr : p.nameEn}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-5xl opacity-30">🌱</div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category Badge */}
                  {p.category && (
                    <div className="text-xs text-[color:var(--brand-1)] font-medium mb-1">
                      {locale === 'ar' ? p.category.nameAr : p.category.nameEn}
                    </div>
                  )}

                  {/* Name */}
                  <div className="font-bold text-[color:var(--brand-2)] line-clamp-1 group-hover:text-[color:var(--brand-1)] transition-colors">
                    {locale === 'ar' ? p.nameAr : p.nameEn}
                  </div>

                  {/* Description */}
                  <div className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {locale === 'ar' ? p.descriptionAr : p.descriptionEn}
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-extrabold text-lg text-[color:var(--brand-1)]">
                      {t('currency')} {p.priceSar}
                    </span>
                    <span className="text-xs text-white bg-[color:var(--brand-1)] px-3 py-1.5 rounded-full font-medium group-hover:bg-[#0a6b48] transition-colors">
                      {t('common_viewAll')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
