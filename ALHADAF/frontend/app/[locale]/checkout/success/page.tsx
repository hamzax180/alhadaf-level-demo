'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Container from '../../../../components/Container';

export default function CheckoutSuccessPage() {
    const params = useSearchParams();
    const locale = useLocale();
    const orderId = params.get('orderId') || '12345';

    // Confetti effect state
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        // You could import a confetti library here if desired
    }, []);

    return (
        <div className="min-h-screen bg-green-500 relative overflow-hidden flex flex-col items-center justify-center text-white">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 text-9xl transform -rotate-12">🎉</div>
                <div className="absolute bottom-20 right-20 text-9xl transform rotate-12">🎊</div>
                <div className="absolute top-1/2 left-1/4 text-8xl transform rotate-45">✨</div>
            </div>

            <div className="relative z-10 text-center p-8 animate-fadeInUp">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
                    <span className="text-6xl text-green-500">✓</span>
                </div>

                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
                    {locale === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Order Placed Successfully!'}
                </h1>

                <p className="text-xl text-green-100 mb-12 max-w-lg mx-auto leading-relaxed">
                    {locale === 'ar'
                        ? `شكراً لتسوقك معنا. رقم طلبك هو #${orderId}. سنقوم بإرسال تفاصيل الشحن إلى بريدك الإلكتروني قريباً.`
                        : `Thank you for shopping with us. Your order #${orderId} has been confirmed. We'll verify your payment and ship your items soon.`}
                </p>

                <Link
                    href={`/${locale}`}
                    className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform active:scale-95"
                >
                    {locale === 'ar' ? 'العودة للمتجر' : 'Continue Shopping'}
                </Link>
            </div>

            <style jsx>{`
         @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
         }
         .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
         }
       `}</style>
        </div>
    );
}
