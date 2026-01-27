'use client';

import Container from '../../../components/Container';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-[#74ae3d] tracking-wide inline-block relative px-4">
            - {t('contact_title')} -
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Form Section */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={`${t('contact_name')} *`}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#74ae3d] text-sm text-gray-600 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={`${t('contact_email')} *`}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#74ae3d] text-sm text-gray-600 transition-colors"
                dir="ltr"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder={t('contact_phone')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#74ae3d] text-sm text-gray-600 transition-colors"
                dir="ltr"
              />
            </div>
            <div>
              <textarea
                rows={5}
                placeholder={`${t('contact_message')} *`}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#74ae3d] text-sm text-gray-600 transition-colors resize-none"
              />
            </div>
            <div>
              <button
                className="px-8 py-3 bg-[#74ae3d] text-white text-sm font-bold uppercase hover:bg-[#629433] transition-colors"
              >
                {t('contact_send')}
              </button>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col gap-6 text-gray-500 font-light text-sm pt-2">
            <div className="flex items-center gap-4 group">
              <div className="w-8 flex justify-center">
                <span className="text-[#74ae3d] text-xl">✉</span>
              </div>
              <span className="group-hover:text-[#74ae3d] transition-colors">
                {t('contact_info_email')}
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 flex justify-center">
                <span className="text-[#74ae3d] text-xl">📞</span>
              </div>
              <span className="group-hover:text-[#74ae3d] transition-colors" dir="ltr">
                +966 114955627 :Tel
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 flex justify-center">
                <span className="text-[#74ae3d] text-xl">📠</span>
              </div>
              <span className="group-hover:text-[#74ae3d] transition-colors" dir="ltr">
                +966 114958689 :Fax
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-8 flex justify-center">
                <span className="text-[#74ae3d] text-xl">📍</span>
              </div>
              <span className="group-hover:text-[#74ae3d] transition-colors">
                {t('contact_info_address')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
