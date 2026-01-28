'use client';

import Container from '../../../components/Container';
import { useLocale } from 'next-intl';

export default function TermsPage() {
    const locale = useLocale();

    return (
        <Container>
            <div className="py-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-[color:var(--brand-2)]">
                    {locale === 'ar' ? 'الشروط والخصوصية' : 'Terms & Privacy'}
                </h1>

                <div className="prose prose-lg text-gray-600">
                    {locale === 'ar' ? (
                        <>
                            <p>نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
                            <h3>جمع البيانات</h3>
                            <p>نقوم بجمع البيانات اللازمة لمعالجة طلباتك وتوصيلها، مثل الاسم والعنوان ورقم الهاتف.</p>
                            <h3>الأمان</h3>
                            <p>نستخدم تقنيات أمان متقدمة لحماية معلوماتك من الوصول غير المصرح به.</p>
                        </>
                    ) : (
                        <>
                            <p>We respect your privacy and are committed to protecting your personal data.</p>
                            <h3 className="font-bold text-xl mt-6 mb-2">Data Collection</h3>
                            <p>We collect data necessary to process and deliver your orders, such as name, address, and phone number.</p>
                            <h3 className="font-bold text-xl mt-6 mb-2">Security</h3>
                            <p>We use advanced security technologies to protect your information from unauthorized access.</p>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
