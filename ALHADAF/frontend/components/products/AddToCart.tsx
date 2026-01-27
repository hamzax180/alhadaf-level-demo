'use client';

import { useCart } from '../cart/cartStore';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AddToCart({ productId, inStock }: { productId: string; inStock: boolean }) {
  const t = useTranslations();
  const cart = useCart();
  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={!inStock || loading}
      onClick={async () => {
        setLoading(true);
        try { await cart.add(productId, 1); } finally { setLoading(false); }
      }}
      className="w-full rounded-2xl px-5 py-3 font-semibold text-white bg-[color:var(--brand-1)] disabled:opacity-50"
    >
      {inStock ? (loading ? '...' : t('common_addToCart')) : t('out_of_stock')}
    </button>
  );
}
