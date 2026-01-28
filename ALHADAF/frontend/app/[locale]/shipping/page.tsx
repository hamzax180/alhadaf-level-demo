'use client';

import Container from '../../../components/Container';
import { useLocale } from 'next-intl';

export default function ShippingPage() {
    const locale = useLocale();

    return (
        <Container>
            <div className="py-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-[color:var(--brand-2)]">
                    {locale === 'ar' ? 'تفاصيل الشحن والتوصيل' : 'Shipping & Delivery'}
                </h1>

                <div className="prose prose-lg text-gray-600">
                    {locale === 'ar' ? (
                        <>
                            <p>نحن نقوم بالشحن إلى جميع مناطق المملكة العربية السعودية.</p>
                            <h3>مدة التوصيل</h3>
                            <ul className="list-disc pl-5 mb-4">
                                <li>الرياض: خلال 24 ساعة</li>
                                <li>باقي المدن: 2-5 أيام عمل</li>
                            </ul>
                            <h3>تكلفة الشحن</h3>
                            <p>الشحن مجاني للطلبات التي تزيد عن 500 ريال سعودي. للطلبات الأقل، رسوم الشحن هي 25 ريال.</p>
                        </>
                    ) : (
                        <>
                            <p>We ship to all regions across the Kingdom of Saudi Arabia.</p>
                            <h3 className="font-bold text-xl mt-6 mb-2">Delivery Time</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>Riyadh: Within 24 hours</li>
                                <li>Other Cities: 2-5 business days</li>
                            </ul>
                            <h3 className="font-bold text-xl mt-6 mb-2">Shipping Cost</h3>
                            <p>Free shipping for orders over 500 SAR. For orders below that, a flat rate of 25 SAR applies.</p>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
