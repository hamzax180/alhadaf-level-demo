'use client';

import Container from '../../../components/Container';
import { useLocale } from 'next-intl';

export default function ReturnsPage() {
    const locale = useLocale();

    return (
        <Container>
            <div className="py-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-[color:var(--brand-2)]">
                    {locale === 'ar' ? 'سياسة الاسترجاع' : 'Return Policy'}
                </h1>

                <div className="prose prose-lg text-gray-600">
                    {locale === 'ar' ? (
                        <>
                            <p>رضاكم هو هدفنا. إذا لم تكن راضياً عن منتجاتنا، يمكنك استرجاعها خلال 7 أيام من الاستلام.</p>
                            <h3>شروط الاسترجاع</h3>
                            <ul className="list-disc pl-5 mb-4">
                                <li>أن يكون المنتج في حالته الأصلية وتغليفه الأصلي.</li>
                                <li>وجود فاتورة الشراء.</li>
                                <li>المنتجات القابلة للتلف (مثل بعض البذور المفتوحة) قد لا تكون قابلة للاسترجاع.</li>
                            </ul>
                            <p>لطلب الاسترجاع، يرجى التواصل معنا عبر صفحة "اتصل بنا".</p>
                        </>
                    ) : (
                        <>
                            <p>Your satisfaction is our goal. If you are not satisfied with our products, you can return them within 7 days of receipt.</p>
                            <h3 className="font-bold text-xl mt-6 mb-2">Return Conditions</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>The product must be in its original condition and packaging.</li>
                                <li>Proof of purchase is required.</li>
                                <li>Perishable items (like certain opened seeds) may not be returnable.</li>
                            </ul>
                            <p>To request a return, please contact us via the "Call Us" page.</p>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
