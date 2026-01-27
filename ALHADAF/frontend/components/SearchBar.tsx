'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../lib/api';

type Product = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  priceSar: number;
  imageUrl?: string | null;
  category?: {
    nameEn: string;
    nameAr: string;
  };
};

export default function SearchBar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    const trimmed = q.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await api<{ query: string; results: Product[] }>(`/api/search?q=${encodeURIComponent(trimmed)}`);
        setSuggestions(data.results.slice(0, 6)); // Limit to 6 suggestions
        setIsOpen(data.results.length > 0);
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
      }
      setIsLoading(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [q]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    setIsOpen(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(v)}`);
  };

  const handleSuggestionClick = (slug: string) => {
    setIsOpen(false);
    setQ('');
    router.push(`/${locale}/product/${slug}`);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form
        className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={t('home_search_placeholder')}
          className="flex-1 outline-none text-sm min-w-[200px]"
        />
        {isLoading ? (
          <div className="px-3 py-2 text-gray-400 animate-spin">⏳</div>
        ) : (
          <button className="px-3 py-2 rounded-xl bg-[color:var(--brand-1)] text-white text-sm font-semibold" type="submit">
            {t('search_button')}
          </button>
        )}
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-[9999] animate-fadeIn">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product.slug)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
              >
                {/* Product Image */}
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={locale === 'ar' ? product.nameAr : product.nameEn}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xl opacity-30">🌱</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[color:var(--brand-2)] truncate">
                    {locale === 'ar' ? product.nameAr : product.nameEn}
                  </div>
                  {product.category && (
                    <div className="text-xs text-gray-400 truncate">
                      {locale === 'ar' ? product.category.nameAr : product.category.nameEn}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-sm font-bold text-[color:var(--brand-1)] flex-shrink-0">
                  {t('currency')} {product.priceSar}
                </div>
              </button>
            ))}
          </div>

          {/* View All Results */}
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-gray-50 text-center text-sm font-medium text-[color:var(--brand-1)] hover:bg-gray-100 transition-colors"
          >
            {locale === 'ar' ? `عرض جميع النتائج لـ "${q}"` : `View all results for "${q}"`} →
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
