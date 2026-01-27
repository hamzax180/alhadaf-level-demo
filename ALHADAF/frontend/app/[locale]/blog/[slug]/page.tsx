'use client';

import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import Container from '../../../../components/Container';
import { blogPosts } from '../../../../lib/blog-data';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);
    const locale = useLocale();

    if (!post) {
        notFound();
    }

    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const content = locale === 'ar' ? post.contentAr : post.contentEn;

    return (
        <article className="py-12 md:py-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[color:var(--brand-3)] text-[color:var(--brand-1)] font-bold text-sm mb-4">
                            {post.date}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-[color:var(--brand-2)] leading-tight mb-6">
                            {title}
                        </h1>
                    </div>

                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-black/5">
                        <img src={post.image} alt={title} className="w-full h-auto object-cover max-h-[600px]" />
                    </div>

                    <div
                        className="prose prose-lg prose-headings:font-bold prose-headings:text-[color:var(--brand-2)] prose-a:text-[color:var(--brand-1)] mx-auto"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </Container>
        </article>
    );
}
