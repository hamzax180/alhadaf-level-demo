'use client';

import Container from '../../../components/Container';
import { useLocale } from 'next-intl';

export default function WholesalePage() {
    const locale = useLocale();

    return (
        <Container>
            <div className="py-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-[color:var(--brand-2)]">
                    {locale === 'ar' ? 'طلبات الجملة' : 'Wholesale'}
                </h1>

                <div className="prose prose-lg text-gray-600">
                    {locale === 'ar' ? (
                        <>
                            <p>نقدم أسعاراً خاصة للمزارع الكبرى والموزعين.</p>
                            <h3>لماذا تتعامل معنا؟</h3>
                            <ul className="list-disc pl-5 mb-4">
                                <li>أسعار تنافسية.</li>
                                <li>منتجات أصلية وموثوقة.</li>
                                <li>دعم فني زراعي متخصص.</li>
                            </ul>
                            <p>للاستفسارات حول الجملة، يرجى التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.</p>
                        </>
                    ) : (
                        <>
                            <p>We offer special pricing for large farms and distributors.</p>
                            <h3 className="font-bold text-xl mt-6 mb-2">Why Partner With Us?</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                                <li>Competitive pricing.</li>
                                <li>Authentic and reliable products.</li>
                                <li>Specialized agricultural technical support.</li>
                            </ul>
                            <p>For wholesale inquiries, please contact us directly via phone or email.</p>
                        </>
                    )}
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-lg mb-2">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
                    <p>Email: sales@alhadaf-level.com</p>
                    <p>Tel: +966 11 123 4567</p>
                </div>
            </div>
        </Container>
    );
}
