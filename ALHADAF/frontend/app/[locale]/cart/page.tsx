'use client';

import Container from '../../../components/Container';
import { useCart } from '../../../components/cart/cartStore';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function CartPage() {
  const { cart, updateQty, remove } = useCart();
  const t = useTranslations();
  const locale = useLocale();
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subtotal = (cart?.items || []).reduce((s, it) => s + it.product.priceSar * it.qty, 0);
  const discount = promoStatus === 'success' ? subtotal * 0.10 : 0; // 10% discount check
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
    }
  };

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-extrabold text-[color:var(--brand-2)] mb-8">{t('cart_title')}</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-6">{t('cart_empty')}</h2>
            <Link href={`/${locale}`} className="inline-block px-8 py-3 rounded-2xl bg-[color:var(--brand-1)] text-white font-bold hover:scale-105 transition-transform">
              {locale === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map(it => (
                <div key={it.id} className="group rounded-[1.5rem] border border-black/5 bg-white p-4 flex gap-4 items-center hover:shadow-md transition-all duration-300">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center p-2 border border-black/5">
                    {it.product.imageUrl ? (
                      <img src={it.product.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <span className="text-2xl">🌱</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/${locale}/product/${it.product.slug}`} className="font-bold text-lg text-[color:var(--brand-2)] hover:text-[color:var(--brand-1)] truncate block">
                      {locale === 'ar' ? it.product.nameAr : it.product.nameEn}
                    </Link>
                    <div className="text-sm text-gray-400 font-medium mt-1">
                      {t('currency')} {it.product.priceSar}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="font-bold text-lg text-[color:var(--brand-1)]">
                      {t('currency')} {it.product.priceSar * it.qty}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-red-50 hover:text-red-500 transition font-bold"
                        onClick={() => it.qty > 1 ? updateQty(it.id, it.qty - 1) : remove(it.id)}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{it.qty}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-green-50 hover:text-green-500 transition font-bold"
                        onClick={() => updateQty(it.id, it.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl">
                <h3 className="font-extrabold text-xl mb-6 flex items-center gap-2">
                  <span>🧾</span> {t('checkout_summary')}
                </h3>

                {/* Subtotal */}
                <div className="flex justify-between text-gray-500 mb-2">
                  <span>{locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>{t('currency')} {subtotal}</span>
                </div>

                {/* Discount section */}
                <div className="mb-6">
                  {promoStatus === 'success' && (
                    <div className="flex justify-between text-green-600 font-bold mb-2 animate-pulse">
                      <span>{locale === 'ar' ? 'خصم (SAVE10)' : 'Discount (SAVE10)'}</span>
                      <span>- {t('currency')} {discount}</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <input
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm outline-none transition ${promoStatus === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-[color:var(--brand-1)]'}`}
                      placeholder={locale === 'ar' ? 'كود الخصم (جرب SAVE10)' : 'Promo Code (Try SAVE10)'}
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        if (promoStatus !== 'idle') setPromoStatus('idle');
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition"
                    >
                      {locale === 'ar' ? 'تطبيق' : 'Apply'}
                    </button>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-gray-800 text-lg">{t('total')}</span>
                  <span className="font-extrabold text-3xl text-[color:var(--brand-1)]">
                    <span className="text-sm text-gray-400 font-normal mr-1">{t('currency')}</span>
                    {total}
                  </span>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  className="block w-full text-center py-4 rounded-2xl bg-[color:var(--brand-1)] text-white font-bold text-lg shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 transition-all active:scale-95"
                >
                  {t('checkout_button')} →
                </Link>

                <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-2xl" title="Mada">💳</span>
                  <span className="text-2xl" title="Visa">💳</span>
                  <span className="text-2xl" title="Apple Pay">🍎</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
