'use client';

import Container from '../../components/Container';
import CategoryTiles from '../../components/home/CategoryTiles';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import OffersStrip from '../../components/home/OffersStrip';
import FAQ from '../../components/home/FAQ';
import Reviews from '../../components/home/Reviews';
import Branches from '../../components/home/Branches';
import HeroSlider from '../../components/home/HeroSlider';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <section className="py-8 bg-[color:var(--brand-3)]">
        <Container>
          <HeroSlider />
        </Container>
      </section>

      <section id="categories">
        <Container>
          <CategoryTiles />
          <FeaturedProducts />
          <OffersStrip />
          <FAQ />
          <Reviews />
          <Branches />
        </Container>
      </section>
    </>
  );
}
