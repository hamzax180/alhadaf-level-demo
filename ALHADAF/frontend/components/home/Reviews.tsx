'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const reviews = [
  {
    nameEn: "Ahmed", nameAr: "أحمد",
    cityEn: "Tabuk", cityAr: "تبوك",
    textEn: "Professional products that actually deliver. My crop yield improved significantly.",
    textAr: "منتجات احترافية تقدم نتائج حقيقية. تحسن محصولي بشكل كبير.",
    stars: 5
  },
  {
    nameEn: "Sara", nameAr: "سارة",
    cityEn: "Riyadh", cityAr: "الرياض",
    textEn: "Customer service is outstanding. They really know their agriculture.",
    textAr: "خدمة العملاء متميزة. لديهم خبرة حقيقية في الزراعة.",
    stars: 5
  },
  {
    nameEn: "Khaled", nameAr: "خالد",
    cityEn: "Jeddah", cityAr: "جدة",
    textEn: "Excellent packaging and high quality seeds. Very satisfied with the results.",
    textAr: "تغليف ممتاز وبذور عالية الجودة. راضٍ جداً عن النتائج.",
    stars: 5
  },
  {
    nameEn: "Fahad", nameAr: "فهد",
    cityEn: "Al Jouf", cityAr: "الجوف",
    textEn: "The irrigation equipment is top notch. Delivery was fast and tracking was clear.",
    textAr: "معدات الري من الطراز الأول. كان التوصيل سريعاً والتتبع واضحاً.",
    stars: 5
  }
];

export default function Reviews() {
  const t = useTranslations();
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16">
      <div className="text-center mb-10">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--brand-1)] animate-fadeIn">
          {t('home_sections_reviews')}
        </div>
        <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--brand-2)]">
          {locale === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 h-[250px] md:h-[200px]">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`absolute inset-x-4 transition-all duration-700 ease-in-out transform ${i === current
              ? 'opacity-100 translate-y-0 scale-100 z-10'
              : 'opacity-0 translate-y-8 scale-95 -z-10'
              }`}
          >
            <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 md:p-10 shadow-2xl shadow-green-100/50 relative overflow-hidden group">
              {/* Decorative Quote Mark */}
              <div className="absolute top-4 right-8 text-8xl text-green-50 opacity-10 font-serif leading-none select-none">“</div>

              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(r.stars)].map((_, si) => (
                  <span key={si}>⭐</span>
                ))}
              </div>

              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-700 italic">
                "{locale === 'ar' ? r.textAr : r.textEn}"
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[color:var(--brand-2)] text-lg">
                    {locale === 'ar' ? r.nameAr : r.nameEn}
                  </div>
                  <div className="text-sm text-[color:var(--muted)] font-medium">
                    {locale === 'ar' ? r.cityAr : r.cityEn}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">
                  🌿
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="mt-12 flex justify-center gap-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 transition-all duration-300 rounded-full ${idx === current ? 'w-10 bg-[color:var(--brand-1)]' : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
