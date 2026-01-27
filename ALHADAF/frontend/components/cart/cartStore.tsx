'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';

type CartItem = {
  id: string;
  qty: number;
  product: { id: string; slug: string; nameEn: string; nameAr: string; priceSar: number; imageUrl?: string | null; depth?: string; descriptionEn?: string; descriptionAr?: string; }
};

type Cart = { id: string; items: CartItem[] };

type Ctx = {
  cart: Cart | null;
  refresh: () => Promise<void>;
  add: (productId: string, qty?: number) => Promise<void>;
  updateQty: (itemId: string, qty: number) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cartId');
    if (saved) setCartId(saved);
  }, []);

  useEffect(() => {
    if (!cartId) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  const handleCartError = (err: any) => {
    if (err.message?.includes('Cart not found')) {
      console.warn('Cart not found on server, resetting local cart...');
      localStorage.removeItem('cartId');
      setCartId(null);
      setCart(null);
      return true;
    }
    return false;
  };

  async function ensureCart() {
    if (cartId) return cartId;
    try {
      const c = await api<Cart>('/api/cart', { method: 'POST' });
      localStorage.setItem('cartId', c.id);
      setCartId(c.id);
      return c.id;
    } catch (err) {
      console.error('Failed to create cart', err);
      throw err;
    }
  }

  async function refresh() {
    if (!cartId) return;
    try {
      const c = await api<Cart>(`/api/cart/${cartId}`);
      setCart(c);
    } catch (err) {
      if (!handleCartError(err)) throw err;
    }
  }

  async function add(productId: string, qty = 1) {
    try {
      const id = await ensureCart();
      await api(`/api/cart/${id}/items`, { method: 'POST', body: JSON.stringify({ productId, qty }) });
      await refresh();
    } catch (err) {
      if (handleCartError(err)) {
        // Retry once if cart was reset
        const id = await ensureCart();
        await api(`/api/cart/${id}/items`, { method: 'POST', body: JSON.stringify({ productId, qty }) });
        await refresh();
      } else {
        throw err;
      }
    }
  }

  async function updateQty(itemId: string, qty: number) {
    if (!cartId) return;
    try {
      await api(`/api/cart/${cartId}/items/${itemId}`, { method: 'PATCH', body: JSON.stringify({ qty }) });
      await refresh();
    } catch (err) {
      if (!handleCartError(err)) throw err;
    }
  }

  async function remove(itemId: string) {
    if (!cartId) return;
    try {
      await api(`/api/cart/${cartId}/items/${itemId}`, { method: 'DELETE' });
      await refresh();
    } catch (err) {
      if (!handleCartError(err)) throw err;
    }
  }

  const value = useMemo(() => ({ cart, refresh, add, updateQty, remove }), [cart, cartId]);

  return <CartCtx.Provider value={value as any}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
