'use client';

import Container from '../../../components/Container';
import { useCart } from '../../../components/cart/cartStore';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function CartPage() {
  const { cart, updateQty, remove } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  const total = (cart?.items || []).reduce((s, it) => s + it.product.priceSar * it.qty, 0);

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-extrabold text-[color:var(--brand-2)]">{t('cart_title')}</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="mt-6 rounded-[1.25rem] border border-black/10 bg-white p-6 text-[color:var(--muted)]">
            {t('cart_empty')}
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3">
              {cart.items.map(it => (
                <div key={it.id} className="rounded-[1.25rem] border border-black/10 bg-white p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold">{locale === 'ar' ? it.product.nameAr : it.product.nameEn}</div>
                    <div className="text-sm text-[color:var(--muted)]">{t('currency')} {it.product.priceSar}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="w-20 rounded-xl border border-black/10 px-3 py-2"
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Number(e.target.value))}
                    />
                    <button className="px-3 py-2 rounded-xl border border-black/10 hover:bg-black/5" onClick={() => remove(it.id)}>{t('cart_remove')}</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-black/10 bg-white p-6 flex items-center justify-between">
              <div className="font-extrabold">{t('total')}: {t('currency')} {total}</div>
              <Link href={`/${locale}/checkout`} className="rounded-2xl px-5 py-3 font-semibold text-white bg-[color:var(--brand-1)]">{t('checkout_button')}</Link>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
