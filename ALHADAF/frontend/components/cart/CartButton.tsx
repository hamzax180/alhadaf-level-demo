'use client';

import Link from 'next/link';
import { useCart } from './cartStore';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function CartButton() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = cart?.items.reduce((s, it) => s + it.qty, 0) || 0;

  return (
    <a href={`/${locale}/cart`} className="px-4 py-2 rounded-2xl border border-black/10 hover:bg-black/5 font-semibold flex items-center gap-2 transition-colors">
      <span className="text-xl">🛒</span>
      <span>{t('cart_button')} {mounted && count > 0 ? `(${count})` : ''}</span>
    </a>
  );
}
