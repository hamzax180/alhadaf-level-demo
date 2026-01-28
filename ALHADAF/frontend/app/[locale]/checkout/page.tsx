'use client';

import Container from '../../../components/Container';
import { useCart } from '../../../components/cart/cartStore';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { api } from '../../../lib/api';

// Moyasar Test Mode Configuration
const MOYASAR_PUBLISHABLE_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your test key

declare global {
  interface Window {
    Moyasar: any;
  }
}

export default function CheckoutPage() {
  const { cart, refresh } = useCart();
  const t = useTranslations();
  const locale = useLocale();
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '' });
  const [done, setDone] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = (cart?.items || []).reduce((s, it) => s + it.product.priceSar * it.qty, 0);

  // Load Moyasar script
  useEffect(() => {
    if (step === 'payment') {
      const script = document.createElement('script');
      script.src = 'https://cdn.moyasar.com/mpf/1.12.0/moyasar.js';
      script.async = true;
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.moyasar.com/mpf/1.12.0/moyasar.css';
      document.head.appendChild(link);

      script.onload = () => {
        initMoyasar();
      };

      return () => {
        document.body.removeChild(script);
        document.head.removeChild(link);
      };
    }
  }, [step]);

  const initMoyasar = () => {
    if (typeof window !== 'undefined' && window.Moyasar) {
      window.Moyasar.init({
        element: '.moyasar-form',
        amount: total * 100, // Amount in halalas
        currency: 'SAR',
        description: `Order - ${cart?.id}`,
        publishable_api_key: MOYASAR_PUBLISHABLE_KEY,
        callback_url: `${window.location.origin}/${locale}/checkout/callback`,
        methods: ['creditcard', 'applepay', 'stcpay'],
        apple_pay: {
          country: 'SA',
          label: 'Alhadaf Level',
          validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
        },
        on_completed: async function (payment: any) {
          console.log('Payment completed:', payment);
          await handlePaymentSuccess(payment);
        },
        on_failure: function (error: any) {
          console.error('Payment failed:', error);
          setErr(locale === 'ar' ? 'فشل الدفع. يرجى المحاولة مرة أخرى.' : 'Payment failed. Please try again.');
          setIsProcessing(false);
        }
      });
    }
  };

  const handlePaymentSuccess = async (payment: any) => {
    setIsProcessing(true);
    try {
      const res = await api<any>(`/api/cart/${cart?.id}/checkout`, {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          paymentId: payment.id,
          paymentStatus: payment.status
        })
      });
      setDone(res.order);
      await refresh();
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
    setIsProcessing(false);
  };

  const proceedToPayment = () => {
    if (!form.name || !form.phone || !form.city || !form.address) {
      setErr(locale === 'ar' ? 'يرجى تعبئة جميع الحقول' : 'Please fill all fields');
      return;
    }
    setErr(null);
    setStep('payment');
  };

  // Demo mode - simulate payment without real gateway
  const handleDemoPayment = async () => {
    setIsProcessing(true);
    setErr(null);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const res = await api<any>(`/api/cart/${cart?.id}/checkout`, {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          paymentId: `demo_${Date.now()}`,
          paymentStatus: 'paid'
        })
      });
      console.log('Order done, redirecting...');
      // IMPORTANT: Using window.location.href or router.push to force navigation
      window.location.href = `/${locale}/checkout/success?orderId=${res.order.id}`;
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
    setIsProcessing(false);
  };

  return (
    <Container>
      <div className="py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[color:var(--brand-2)]">{t('checkout_title')}</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mt-6 mb-8">
          <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[color:var(--brand-1)]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step === 'details' ? 'bg-[color:var(--brand-1)]' : 'bg-gray-300'}`}>1</div>
            <span className="font-medium">{t('checkout_customer_details')}</span>
          </div>
          <div className="h-px bg-gray-300 flex-1"></div>
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[color:var(--brand-1)]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step === 'payment' ? 'bg-[color:var(--brand-1)]' : 'bg-gray-300'}`}>2</div>
            <span className="font-medium">{t('checkout_secure_payment')}</span>
          </div>
        </div>

        {!cart || cart.items.length === 0 ? (
          <div className="mt-6 rounded-[1.25rem] border border-black/10 bg-white p-6 text-[color:var(--muted)]">
            {t('cart_empty')}
          </div>
        ) : done ? (
          <div className="mt-6 rounded-3xl border-2 border-green-200 bg-green-50 p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <div className="font-extrabold text-2xl text-green-700">{t('checkout_order_success')}</div>
            <div className="mt-4 text-gray-600">
              <div className="text-sm">{t('checkout_order_id')}</div>
              <div className="font-mono text-lg font-bold text-[color:var(--brand-2)]">{done.id}</div>
            </div>
            <div className="mt-4 text-xl font-bold text-[color:var(--brand-1)]">
              {t('total')}: {t('currency')} {done.totalSar}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column - Form */}
            <div className="md:col-span-2">
              {step === 'details' ? (
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                  <div className="font-extrabold text-lg mb-4 flex items-center gap-2">
                    <span className="text-xl">👤</span> {t('checkout_customer_details')}
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">{t('checkout_name')} *</label>
                      <input
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-1)]"
                        placeholder={t('checkout_name')}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">{t('checkout_phone')} *</label>
                      <input
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-1)]"
                        placeholder="05xxxxxxxx"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">{t('checkout_city')} *</label>
                      <input
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-1)]"
                        placeholder={t('checkout_city')}
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">{t('checkout_address')} *</label>
                      <textarea
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-1)] min-h-[100px]"
                        placeholder={t('checkout_address')}
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                    </div>

                    {err && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">⚠️ {err}</div>}

                    <button
                      className="w-full rounded-2xl px-5 py-4 font-bold text-white bg-gradient-to-r from-[color:var(--brand-1)] to-emerald-500 hover:from-[#0a6b48] hover:to-emerald-600 transition-all shadow-lg text-lg"
                      onClick={proceedToPayment}
                    >
                      {locale === 'ar' ? 'متابعة للدفع ←' : 'Continue to Payment →'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                  <div className="font-extrabold text-lg mb-4 flex items-center gap-2">
                    <span className="text-xl">🔒</span> {t('checkout_secure_payment')}
                  </div>

                  {/* Demo Payment Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                      <span>⚠️</span> {locale === 'ar' ? 'وضع الاختبار' : 'Test Mode'}
                    </div>
                    <p className="text-sm text-amber-600">
                      {locale === 'ar'
                        ? 'هذا وضع اختباري. لن يتم خصم أي مبالغ حقيقية. استخدم بطاقة الاختبار: 4111111111111111'
                        : 'This is test mode. No real charges will be made. Use test card: 4111 1111 1111 1111'}
                    </p>
                  </div>

                  {/* Demo Payment Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleDemoPayment}
                        disabled={isProcessing}
                        className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-[color:var(--brand-1)] bg-[color:var(--brand-1)] text-white hover:bg-[#0a6b48] transition-all disabled:opacity-50"
                      >
                        <span className="text-2xl">💳</span>
                        <span className="font-bold">{locale === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</span>
                      </button>
                      <button
                        onClick={handleDemoPayment}
                        disabled={isProcessing}
                        className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[color:var(--brand-1)] transition-all disabled:opacity-50"
                      >
                        <span className="text-2xl">🍎</span>
                        <span className="font-bold">Apple Pay</span>
                      </button>
                    </div>
                    <button
                      onClick={handleDemoPayment}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[color:var(--brand-1)] transition-all disabled:opacity-50"
                    >
                      <span className="text-2xl">📱</span>
                      <span className="font-bold">STC Pay</span>
                    </button>

                    {isProcessing && (
                      <div className="text-center py-4">
                        <div className="inline-block animate-spin text-4xl">⏳</div>
                        <div className="mt-2 text-gray-500">{locale === 'ar' ? 'جاري معالجة الدفع...' : 'Processing payment...'}</div>
                      </div>
                    )}

                    {err && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">⚠️ {err}</div>}

                    <button
                      className="w-full text-gray-500 text-sm hover:text-gray-700"
                      onClick={() => setStep('details')}
                    >
                      ← {locale === 'ar' ? 'العودة لبيانات العميل' : 'Back to customer details'}
                    </button>
                  </div>

                  {/* Moyasar Form Container (hidden for now, uncomment when you have API key) */}
                  {/* <div className="moyasar-form"></div> */}
                </div>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="md:col-span-1">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg sticky top-24">
                <div className="font-extrabold text-lg mb-4 flex items-center gap-2">
                  <span className="text-xl">🛒</span> {t('checkout_summary')}
                </div>
                <div className="space-y-3">
                  {cart.items.map(it => (
                    <div key={it.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{locale === 'ar' ? it.product.nameAr : it.product.nameEn} × {it.qty}</span>
                      <span className="font-medium">{t('currency')} {it.product.priceSar * it.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-600">{t('total')}</span>
                  <span className="font-extrabold text-xl text-[color:var(--brand-1)]">{t('currency')} {total}</span>
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                    <span>🔒 {locale === 'ar' ? 'آمن' : 'Secure'}</span>
                    <span>💳 Mada</span>
                    <span>🍎 Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
