import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} — DeepTrace AI`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main>
      <article className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Blog &amp; Research
          </a>

          <span className="mt-6 block font-mono text-[11px] uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {post.category}
          </span>
          <h1 className="mt-2 text-balance font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 font-mono text-[11px] text-slate-400 dark:text-slate-600">
            {post.date} · {post.readTime}
          </p>

          <div className="prose-deeptrace mt-8 space-y-4">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
