'use client';
import { useState, useEffect } from 'react';
import Container from './Container';
import Topbar from './Topbar';
import Link from 'next/link';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';
import CartButton from './cart/CartButton';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* 
        Truly Global Blur Overlay 
        Positioned outside the header tag to avoid any clipping glitches.
      */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: isMenuOpen ? 'blur(30px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: isMenuOpen ? 'blur(30px) saturate(180%)' : 'blur(0px)',
        }}
        onClick={() => setIsMenuOpen(false)}
      />

      <header
        className={`sticky top-0 z-[1000] transition-all duration-500 ${isMenuOpen
          ? 'bg-transparent border-transparent shadow-none'
          : 'backdrop-blur-xl bg-white/80 border-b border-black/5 shadow-sm'
          }`}
      >
        <div className={`transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <Topbar />
        </div>
        <Container>
          <div className={`py-3 flex items-center gap-3 justify-between transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
            <a href={`/${locale}`} className="flex items-center gap-3 font-extrabold">
              <img
                src="/img/logo.png"
                alt="Alhadaf Level"
                className="h-28 w-auto object-contain"
              />
              <span className="leading-tight hidden sm:block">
                <div className="text-sm text-[color:var(--muted)]">{t('company_name')}</div>
                <div className="text-lg font-extrabold text-[color:var(--brand-2)]">{t('company_tagline')}</div>
              </span>
            </a>
            <div className="hidden md:block flex-1 max-w-xl">
              <SearchBar />
            </div>
            <div className="flex items-center gap-2">
              <CartButton />
            </div>
          </div>

          <div className="pb-3 text-center">
            <NavMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          </div>

          {!isMenuOpen && (
            <div className="md:hidden pb-3 transition-all duration-300">
              <SearchBar />
            </div>
          )}
        </Container>
      </header>
    </>
  );
}
