'use client';

import { useState, useEffect } from 'react';
import Container from '../../../components/Container';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

type Offer = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  imageUrl: string;
  endsAt: Date;
  badge: string;
};

// Demo offers data
const demoOffers: Offer[] = [
  {
    id: '1',
    slug: 'torofert-20-20-20',
    nameEn: 'TOROFERT 20-20-20+T.E. Bundle',
    nameAr: 'حزمة توروفيرت 20-20-20',
    descriptionEn: 'Buy 3 bags get 1 FREE! Premium NPK fertilizer with trace elements.',
    descriptionAr: 'اشترِ 3 أكياس واحصل على 1 مجاناً! سماد NPK عالي الجودة مع عناصر نادرة.',
    originalPrice: 720,
    discountPrice: 540,
    discountPercent: 25,
    imageUrl: '/img/products/torofert.jpg',
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    badge: 'HOT DEAL'
  },
  {
    id: '2',
    slug: 'seeds-combo',
    nameEn: 'Seeds Starter Combo Pack',
    nameAr: 'حزمة بذور البداية',
    descriptionEn: 'Cucumber + Tomato F1 hybrid seeds combo. Perfect for greenhouse.',
    descriptionAr: 'بذور خيار + طماطم هجين F1. مثالية للبيوت المحمية.',
    originalPrice: 180,
    discountPrice: 130,
    discountPercent: 28,
    imageUrl: '/img/products/seeds-tomato.png',
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    badge: 'BEST VALUE'
  },
  {
    id: '3',
    slug: 'irrigation-kit',
    nameEn: 'Complete Drip Irrigation Kit',
    nameAr: 'طقم الري بالتنقيط الكامل',
    descriptionEn: 'Everything you need for 100m² greenhouse irrigation system.',
    descriptionAr: 'كل ما تحتاجه لنظام ري بيت محمي 100 متر مربع.',
    originalPrice: 450,
    discountPrice: 320,
    discountPercent: 29,
    imageUrl: '/img/products/humic.jpg',
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    badge: 'LIMITED'
  },
  {
    id: '4',
    slug: 'ferromax-iron',
    nameEn: 'FerroMax Iron Chelate 6% EDDHA',
    nameAr: 'فيروماكس حديد مخلب 6%',
    descriptionEn: 'Buy 2 Get 1 Free! Best iron solution for calcareous soils.',
    descriptionAr: 'اشترِ 2 واحصل على 1 مجاناً! أفضل حل للحديد للتربة الكلسية.',
    originalPrice: 390,
    discountPrice: 260,
    discountPercent: 33,
    imageUrl: '/img/products/ferromax.jpg',
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    badge: 'FLASH SALE'
  },
  {
    id: '5',
    slug: 'green-power-12-12-36',
    nameEn: 'GREEN POWER 12-12-36 Mega Pack',
    nameAr: 'جرين باور 12-12-36 ميجا باك',
    descriptionEn: '10kg bag at the price of 8kg! High potassium for fruit crops.',
    descriptionAr: 'كيس 10 كجم بسعر 8 كجم! بوتاسيوم عالي لمحاصيل الفاكهة.',
    originalPrice: 195,
    discountPrice: 156,
    discountPercent: 20,
    imageUrl: '/img/products/green-power.jpg',
    endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days
    badge: 'SAVE 20%'
  },
  {
    id: '6',
    slug: 'torophoska-blue',
    nameEn: 'Torophoska Blue Granular Bulk',
    nameAr: 'توروفوسكا أزرق بالجملة',
    descriptionEn: 'Order 5 bags get free delivery! Chlorine-free granular fertilizer.',
    descriptionAr: 'اطلب 5 أكياس واحصل على توصيل مجاني! سماد محبب خالي من الكلور.',
    originalPrice: 750,
    discountPrice: 600,
    discountPercent: 20,
    imageUrl: '/img/products/torophoska.jpg',
    endsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days
    badge: 'FREE DELIVERY'
  }
];

function CountdownTimer({ endsAt, t }: { endsAt: Date; t: any }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endsAt.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  return (
    <div className="flex gap-1 text-xs">
      <div className="bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">
        {String(timeLeft.days).padStart(2, '0')}
        <span className="text-[10px] opacity-70 ms-0.5">{t('offers_days')}</span>
      </div>
      <div className="bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">
        {String(timeLeft.hours).padStart(2, '0')}
        <span className="text-[10px] opacity-70 ms-0.5">{t('offers_hours')}</span>
      </div>
      <div className="bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">
        {String(timeLeft.minutes).padStart(2, '0')}
        <span className="text-[10px] opacity-70 ms-0.5">{t('offers_minutes')}</span>
      </div>
      <div className="bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">
        {String(timeLeft.seconds).padStart(2, '0')}
        <span className="text-[10px] opacity-70 ms-0.5">{t('offers_seconds')}</span>
      </div>
    </div>
  );
}

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Container>
      <div className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[color:var(--brand-2)] mb-2">
            🎁 {t('offers_title')}
          </h1>
          <p className="text-gray-500 text-lg">{t('offers_subtitle')}</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoOffers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                    {offer.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-green-500 text-white text-sm font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                    -{offer.discountPercent}%
                  </span>
                </div>

                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 group-hover:scale-105 transition-transform">
                  <img
                    src={offer.imageUrl}
                    alt={locale === 'ar' ? offer.nameAr : offer.nameEn}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-[color:var(--brand-2)] mb-2 line-clamp-1">
                  {locale === 'ar' ? offer.nameAr : offer.nameEn}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {locale === 'ar' ? offer.descriptionAr : offer.descriptionEn}
                </p>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-[color:var(--brand-1)]">
                    {offer.discountPrice} {t('currency')}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {offer.originalPrice} {t('currency')}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    {t('offers_save')} {offer.originalPrice - offer.discountPrice} {t('currency')}
                  </span>
                </div>

                {/* Countdown */}
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1 font-medium">{t('offers_ends_in')}:</div>
                  <CountdownTimer endsAt={offer.endsAt} t={t} />
                </div>

                {/* CTA Button */}
                <Link
                  href={`/${locale}/product/${offer.slug}`}
                  className="block w-full py-3 bg-gradient-to-r from-[color:var(--brand-1)] to-emerald-500 text-white text-center font-bold rounded-2xl hover:from-[#0a6b48] hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                >
                  {t('offers_add_to_cart')} 🛒
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <div className="text-3xl font-extrabold mb-2">
            {locale === 'ar' ? '🌟 عروض جديدة كل أسبوع!' : '🌟 New Offers Every Week!'}
          </div>
          <p className="text-white/80">
            {locale === 'ar'
              ? 'تابعنا للحصول على أفضل العروض والخصومات على منتجاتنا الزراعية'
              : 'Follow us for the best deals and discounts on our agricultural products'}
          </p>
        </div>
      </div>
    </Container>
  );
}
