'use client';

import Container from './Container';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-16 bg-[color:var(--brand-2)] text-white">
      <Container>
        <div className="py-10 grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-white/70 text-xs font-bold tracking-widest uppercase">{t('company_name')}</div>
            <div className="mt-2 text-xl font-extrabold">{t('home_hero_title')}</div>
            <p className="mt-3 text-white/70 text-sm">
              {t('home_hero_subtitle')}
            </p>
          </div>

          <div>
            <div className="text-white/70 text-xs font-bold tracking-widest uppercase">{t('footer_quicklinks')}</div>
            <ul className="mt-3 grid gap-2 text-sm text-white/85">
              <li><a className="hover:underline" href={`/${useLocale()}/shipping`}>{t('footer_shipping')}</a></li>
              <li><a className="hover:underline" href={`/${useLocale()}/returns`}>{t('footer_returns')}</a></li>
              <li><a className="hover:underline" href={`/${useLocale()}/terms`}>{t('footer_terms')}</a></li>
              <li><a className="hover:underline" href={`/${useLocale()}/track`}>{t('footer_track')}</a></li>
              <li><a className="hover:underline" href={`/${useLocale()}/wholesale`}>{t('footer_wholesale')}</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white/70 text-xs font-bold tracking-widest uppercase">{t('footer_newsletter_title')}</div>
            <p className="mt-3 text-white/70 text-sm">{t('footer_newsletter_subtitle')}</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-1 rounded-2xl px-3 py-2 text-sm text-black outline-none" placeholder={t('footer_email_placeholder')} />
              <button className="rounded-2xl px-4 py-2 text-sm font-semibold bg-[color:var(--brand-1)]">{t('footer_subscribe')}</button>
            </form>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 text-sm text-white/60">
          © {new Date().getFullYear()} {t('company_name')}. {t('footer_rights')}
        </div>
      </Container>
    </footer>
  );
}
