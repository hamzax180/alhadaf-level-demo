'use client';

import { useState } from 'react';
import Container from '../../../components/Container';
import { useTranslations, useLocale } from 'next-intl';

type TrackingStep = {
  status: string;
  date: string;
  location: string;
  completed: boolean;
  current: boolean;
};

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Demo tracking data - generates based on order number
  const generateDemoTracking = (orderNum: string): TrackingStep[] => {
    const hash = orderNum.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const currentStep = (hash % 4); // 0-3 determines which step is current

    const steps = [
      {
        status: t('track_status_processing'),
        date: '2026-01-25 10:30',
        location: locale === 'ar' ? 'مستودع الرياض' : 'Riyadh Warehouse',
        completed: currentStep >= 0,
        current: currentStep === 0,
      },
      {
        status: t('track_status_shipped'),
        date: '2026-01-26 14:15',
        location: locale === 'ar' ? 'مركز الفرز - جدة' : 'Sorting Center - Jeddah',
        completed: currentStep >= 1,
        current: currentStep === 1,
      },
      {
        status: t('track_status_out_for_delivery'),
        date: '2026-01-27 08:45',
        location: locale === 'ar' ? 'مركز التوصيل المحلي' : 'Local Delivery Hub',
        completed: currentStep >= 2,
        current: currentStep === 2,
      },
      {
        status: t('track_status_delivered'),
        date: '2026-01-28 16:00',
        location: locale === 'ar' ? 'تم التسليم للعميل' : 'Delivered to Customer',
        completed: currentStep >= 3,
        current: currentStep === 3,
      },
    ];

    return steps;
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsTracking(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsTracking(false);
      setShowResult(true);
    }, 800);
  };

  const trackingSteps = showResult ? generateDemoTracking(orderNumber) : [];
  const estimatedDelivery = '2026-01-28';

  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[color:var(--brand-2)]">
            {t('track_title')}
          </h1>
          <p className="mt-2 text-sm text-amber-600 bg-amber-50 inline-block px-4 py-2 rounded-full">
            ⚠️ {t('track_demo_note')}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="mb-10">
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder={t('track_placeholder')}
              className="flex-1 px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[color:var(--brand-1)] transition-colors"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={isTracking || !orderNumber.trim()}
              className="px-8 py-4 bg-[color:var(--brand-1)] text-white text-lg font-bold rounded-2xl hover:bg-[#0a6b48] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isTracking ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <span>🔍</span>
                  {t('track_button')}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tracking Result */}
        {showResult && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 animate-fadeIn">
            {/* Order Info Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-gray-100 mb-8">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {t('track_order_number')}
                </div>
                <div className="text-2xl font-extrabold text-[color:var(--brand-2)]" dir="ltr">
                  #{orderNumber}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {t('track_estimated_delivery')}
                </div>
                <div className="text-lg font-bold text-[color:var(--brand-1)]">
                  {estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="relative">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4 mb-6 last:mb-0">
                  {/* Timeline Line & Dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-4 flex-shrink-0 transition-all ${step.current
                          ? 'bg-[color:var(--brand-1)] border-[color:var(--brand-1)] scale-125 shadow-lg shadow-green-200'
                          : step.completed
                            ? 'bg-[color:var(--brand-1)] border-[color:var(--brand-1)]'
                            : 'bg-gray-200 border-gray-300'
                        }`}
                    >
                      {step.completed && (
                        <span className="text-white text-[10px] flex items-center justify-center w-full h-full">
                          ✓
                        </span>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 min-h-[40px] ${step.completed ? 'bg-[color:var(--brand-1)]' : 'bg-gray-200'
                          }`}
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className={`flex-1 pb-4 ${step.current ? 'transform scale-105 origin-left' : ''}`}>
                    <div
                      className={`font-bold text-lg ${step.current
                          ? 'text-[color:var(--brand-1)]'
                          : step.completed
                            ? 'text-[color:var(--brand-2)]'
                            : 'text-gray-400'
                        }`}
                    >
                      {step.status}
                      {step.current && (
                        <span className="inline-block ms-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
                          {locale === 'ar' ? 'الحالي' : 'Current'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span dir="ltr">{step.date}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                      <span>📍</span> {step.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Location Card */}
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                {t('track_current_location')}
              </div>
              <div className="text-lg font-bold text-[color:var(--brand-2)]">
                {trackingSteps.find(s => s.current)?.location || trackingSteps[trackingSteps.length - 1]?.location}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </Container>
  );
}
