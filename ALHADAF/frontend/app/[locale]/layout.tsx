import '../globals.css';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getMessages } from './messages';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Providers from './Providers';
import AIChatWidget from '../../components/AIChatWidget';

export const metadata = {
  title: 'Alhadaf Level',
  description: 'Full range of fertilizers and seeds for agriculture'
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  if (!['en', 'ar'].includes(locale) || !messages) notFound();

  return (
    <html lang={locale} dir={dir}>
      <body className="antialiased">
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  );
}
