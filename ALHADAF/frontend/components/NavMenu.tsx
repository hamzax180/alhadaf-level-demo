'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { api } from '../lib/api';

type Category = { id: string; slug: string; nameEn: string; nameAr: string; imageUrl?: string | null };

interface NavMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function NavMenu({ isOpen, setIsOpen }: NavMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [cats, setCats] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api<Category[]>('/api/categories').then(setCats).catch(() => setCats([]));
    api<any[]>('/api/products').then((data) => setProducts(data.slice(0, 3))).catch(() => setProducts([]));
  }, []);

  const label = (c: Category) => (locale === 'ar' ? c.nameAr : c.nameEn);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3">
        <button className="px-4 py-2 rounded-2xl border border-black/10 bg-[color:var(--brand-3)] font-semibold">
          MENU
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Centered Trigger Buttons */}
      <div className="flex items-center justify-center gap-6 relative z-[50]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-6 py-2.5 rounded-2xl border transition-all duration-500 font-bold active:scale-95 flex items-center gap-2 ${isOpen
            ? 'bg-white text-[color:var(--brand-2)] border-white shadow-2xl scale-110'
            : 'bg-[color:var(--brand-3)] text-[color:var(--brand-2)] border-black/5 hover:bg-black/5'
            }`}
        >
          <span className="text-lg transition-transform duration-500" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
            {isOpen ? '✕' : '☰'}
          </span>
          {isOpen
            ? (locale === 'ar' ? 'إغلاق' : 'CLOSE')
            : (locale === 'ar' ? 'القائمة' : 'MENU')
          }
        </button>

        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          <a href={`/${locale}`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_home')}</a>
          <a href={`/${locale}/blog`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_blog')}</a>
          <a href={`/${locale}/offers`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_offers')}</a>
          <a href={`/${locale}/call-us`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_call')}</a>
          <a href={`/${locale}/who-we-are`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_who')}</a>
          <a href={`/${locale}/track`} className="px-3 py-2 rounded-xl hover:bg-black/5 transition">{t('nav_track')}</a>
        </nav>
      </div>

      <div
        className={`fixed left-1/2 -translate-x-1/2 top-[120px] w-[95%] max-w-5xl p-6 rounded-[3.5rem] border border-white/40 bg-white/60 shadow-[0_50px_100px_rgba(0,0,0,0.4)] transition-all duration-700 z-[1001] ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-20 invisible'
          }`}
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
        suppressHydrationWarning
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-h-[80vh] overflow-y-auto p-6 custom-scrollbar">
          {/* Categories Section */}
          <div className="lg:col-span-3">
            <div className="text-xs font-bold tracking-widest uppercase text-black/40 mb-4 px-2">
              {locale === 'ar' ? 'التصنيفات' : 'CATEGORIES'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <a
                href={`/${locale}`}
                className="group flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-white/80 border border-black/5 shadow-sm hover:bg-[color:var(--brand-1)] hover:text-white transition-all duration-300 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-16 h-16 mb-3 rounded-2xl bg-[color:var(--brand-3)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏠</div>
                <div className="font-extrabold text-lg">{t('nav_home')}</div>
              </a>

              {cats.length > 0 ? (
                cats.map((c, i) => (
                  <a
                    key={`cat-${c.id}`}
                    href={`/${locale}/category/${c.slug}`}
                    className="group flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-white/80 border border-black/5 shadow-sm hover:bg-[color:var(--brand-1)] hover:text-white transition-all duration-300 active:scale-95"
                    style={{ transitionDelay: `${i * 30}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-16 h-16 mb-3 rounded-2xl bg-white/50 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <img src={c.imageUrl || "/img/products/product-1.png"} alt="" className="w-10 h-10 object-contain opacity-50 group-hover:opacity-100" />
                    </div>
                    <div className="font-extrabold text-lg text-center">{label(c)}</div>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-sm text-black/40 font-medium italic animate-pulse">
                  {locale === 'ar' ? 'جاري التحميل...' : 'Loading categories...'}
                </div>
              )}

              <a
                href={`/${locale}/offers`}
                className="group flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <div className="text-3xl mb-1 animation-bounce">🎁</div>
                <div className="font-extrabold text-xl">{t('nav_offers')}</div>
                <div className="text-xs font-bold opacity-80 uppercase tracking-tighter">Limited Time</div>
              </a>
            </div>
          </div>

          {/* Featured Products Sidebar */}
          <div className="hidden lg:block border-l border-black/5 pl-8">
            <div className="text-xs font-bold tracking-widest uppercase text-black/40 mb-4">
              {locale === 'ar' ? 'منتجات مميزة' : 'FEATURED PRODUCTS'}
            </div>
            <div className="flex flex-col gap-4">
              {products.length > 0 ? products.map((p, i) => (
                <a
                  key={`feat-${p.id}`}
                  href={`/${locale}/product/${p.slug}`}
                  className="flex items-center gap-4 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-20 h-20 rounded-2xl bg-white border border-black/5 p-2 overflow-hidden flex-shrink-0 group-hover:shadow-md transition">
                    <img src={p.imageUrl || "/img/products/product-1.png"} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[color:var(--brand-2)] line-clamp-2 leading-tight group-hover:text-[color:var(--brand-1)] transition">{locale === 'ar' ? p.nameAr : p.nameEn}</div>
                    <div className="text-[color:var(--brand-1)] font-extrabold mt-1 text-sm">SAR {p.priceSar}</div>
                  </div>
                </a>
              )) : (
                <div className="text-sm text-black/20 italic">Loading...</div>
              )}
            </div>

            <a href={`/${locale}#categories`} className="mt-8 block p-4 rounded-2xl bg-black/5 text-center text-xs font-bold uppercase tracking-widest hover:bg-black/10 transition" onClick={() => setIsOpen(false)}>
              {locale === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
