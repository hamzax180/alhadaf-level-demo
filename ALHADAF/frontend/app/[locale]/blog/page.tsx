'use client';

import Container from '../../../components/Container';
import { blogPosts } from '../../../lib/blog-data';
import BlogCard from '../../../components/blog/BlogCard';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();

  return (
    <Container>
      <div className="py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-[color:var(--brand-2)] mb-4">
            {t('blog_title')}
          </h1>
          <p className="text-xl text-[color:var(--muted)]">
            {t('blog_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Container>
  );
}
