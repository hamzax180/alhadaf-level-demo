'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function CartButton() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
    const id = localStorage.getItem('cartId');
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/api/cart/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(c => setCount((c?.items || []).reduce((s: any, it: any) => s + it.qty, 0)))
      .catch(() => { });
  }, []);

  return (
    <a href={`/${locale}/cart`} className="px-4 py-2 rounded-2xl border border-black/10 hover:bg-black/5 font-semibold">
      {t('cart_button')} {mounted && count > 0 ? `(${count})` : ''}
    </a>
  );
}
