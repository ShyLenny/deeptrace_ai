"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

const CATEGORIES = ["All", "AI Safety", "Deepfake Awareness", "Misinformation Reports", "Product Updates"] as const;

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <div>
      <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              category === cat
                ? "border-slate-900 bg-slate-900 text-slate-50 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              {post.category}
            </span>
            <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{post.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 font-mono text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-600">
              <span>
                {post.date} · {post.readTime}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 dark:text-slate-600" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
