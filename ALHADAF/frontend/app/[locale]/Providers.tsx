'use client';

import { NextIntlClientProvider } from 'next-intl';
import { CartProvider } from '../../components/cart/cartStore';

export default function Providers({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Riyadh"
    >
      <CartProvider>
        {children}
      </CartProvider>
    </NextIntlClientProvider>
  );
}
