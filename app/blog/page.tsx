import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { BlogList } from "@/components/blog/blog-list";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Research — DeepTrace AI",
  description: "AI safety notes, deepfake awareness guides, misinformation reports, and product updates.",
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blog & Research"
        title="Notes from building a verification engine"
        body="Research findings, awareness guides, and product updates — published as we ship them."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <BlogList posts={BLOG_POSTS} />
        </div>
      </section>
    </main>
  );
}
