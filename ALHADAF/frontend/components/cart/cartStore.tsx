'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';

// CUSTOM EVENT FOR CART UPDATES
const CART_UPDATED_EVENT = 'cart-updated';

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

function getLocalCart(): Cart {
  if (typeof window === 'undefined') return { id: 'local', items: [] };
  const stored = localStorage.getItem('demo_cart');
  return stored ? JSON.parse(stored) : { id: 'local', items: [] };
}

function saveLocalCart(cart: Cart) {
  localStorage.setItem('demo_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    // Initial load
    setCart(getLocalCart());

    // Listen for updates
    const handleUpdate = () => setCart(getLocalCart());
    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
  }, []);

  async function refresh() {
    setCart(getLocalCart());
  }

  async function add(productId: string, qty = 1) {
    // We need to fetch product details to store them in cart (since we have no backend to hydrate)
    // In a real app backend does this. For demo we mock it by fetching from our mock API.
    const product = await api<any>(`/api/products/${productId}`);
    if (!product) return;

    const current = getLocalCart();
    const existingIdx = current.items.findIndex(i => i.product.id === productId);

    if (existingIdx >= 0) {
      current.items[existingIdx].qty += qty;
    } else {
      current.items.push({
        id: `item-${Date.now()}`,
        qty,
        product
      });
    }
    saveLocalCart(current);
  }

  async function updateQty(itemId: string, qty: number) {
    const current = getLocalCart();
    const idx = current.items.findIndex(i => i.id === itemId);
    if (idx >= 0) {
      if (qty <= 0) {
        current.items.splice(idx, 1);
      } else {
        current.items[idx].qty = qty;
      }
      saveLocalCart(current);
    }
  }

  async function remove(itemId: string) {
    const current = getLocalCart();
    const idx = current.items.findIndex(i => i.id === itemId);
    if (idx >= 0) {
      current.items.splice(idx, 1);
      saveLocalCart(current);
    }
  }

  const value = useMemo(() => ({ cart, refresh, add, updateQty, remove }), [cart]);

  return <CartCtx.Provider value={value as any}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
