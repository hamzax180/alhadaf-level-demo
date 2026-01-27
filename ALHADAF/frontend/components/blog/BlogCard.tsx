'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { BlogPost } from '../../lib/blog-data';

export default function BlogCard({ post }: { post: BlogPost }) {
    const locale = useLocale();
    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;

    return (
        <Link
            href={`/${locale}/blog/${post.slug}`}
            className="group block rounded-[2rem] border border-black/10 bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div className="h-56 overflow-hidden bg-gray-100 relative">
                <img
                    src={post.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold shadow-sm">
                    {post.date}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-extrabold text-[color:var(--brand-2)] mb-2 group-hover:text-[color:var(--brand-1)] transition-colors">
                    {title}
                </h3>
                <p className="text-[color:var(--muted)] leading-relaxed text-sm line-clamp-3">
                    {excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[color:var(--brand-1)] font-bold text-sm">
                    {locale === 'ar' ? 'اقرأ المزيد' : 'Read Article'}
                    <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </Link>
    );
}
