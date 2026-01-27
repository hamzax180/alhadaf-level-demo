'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const slides = [
    {
        image: '/img/banner-1.png',
        titleKey: 'slide_1_title',
        subKey: 'slide_1_sub',
    },
    {
        image: '/img/banner-2.png',
        titleKey: 'slide_2_title',
        subKey: 'slide_2_sub',
    },
    {
        image: '/img/banner-3.png',
        titleKey: 'slide_3_title',
        subKey: 'slide_3_sub',
    }
];

export default function HeroSlider() {
    const t = useTranslations();
    const locale = useLocale();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-[1.25rem] border border-black/10 shadow-xl bg-white">
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img src={slide.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                        <div className={`max-w-2xl transform transition-transform duration-1000 ${idx === current ? 'translate-y-0' : 'translate-y-10'
                            }`}>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                                {t(slide.titleKey)}
                            </h2>
                            <p className="mt-4 text-lg md:text-xl text-white/90 font-medium">
                                {t(slide.subKey)}
                            </p>
                            <div className="mt-8">
                                <a
                                    href="#categories"
                                    className="px-8 py-4 rounded-2xl bg-[color:var(--brand-1)] text-white font-bold hover:scale-105 transition active:scale-95 inline-block"
                                >
                                    {locale === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 transition-all duration-300 rounded-full ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
