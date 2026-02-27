"use client";

import { Search, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { blogPosts } from "../[slug]/_components/blogpost";


// ── Derive unique tags with post counts from real data ──────
function buildTagsFromPosts() {
  const countMap = new Map<string, { label: string; slug: string; count: number }>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      if (countMap.has(tag.slug)) {
        countMap.get(tag.slug)!.count += 1;
      } else {
        countMap.set(tag.slug, { label: tag.label, slug: tag.slug, count: 1 });
      }
    }
  }
  return Array.from(countMap.values()).sort((a, b) => b.count - a.count);
}

// ── Derive trending posts (most recent, skip the featured hero) ──
function buildTrending() {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)
    .map((p, idx) => ({
      rank: String(idx + 1).padStart(2, "0"),
      slug: p.slug,
      title: p.title,
      readTime: `${p.readingTimeMinutes} min read`,
    }));
}

const allTags = buildTagsFromPosts();
const trending = buildTrending();

export default function Sidebar() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Search Widget */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-serif mb-4 text-lg font-bold text-slate-900">Search Articles</h3>
        <div className="relative">
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-[#197fe6] focus:outline-none focus:ring-1 focus:ring-[#197fe6]"
            placeholder="What are you looking for?"
            type="text"
          />
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tags Widget — derived from real blogPosts */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-serif mb-4 text-lg font-bold text-slate-900">Browse by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag.slug}
              onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTag === tag.slug
                  ? "bg-[#197fe6] text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-[#197fe6]"
              }`}
            >
              {tag.label}
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                  activeTag === tag.slug
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {tag.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active tag filter result */}
        {activeTag && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3 font-medium">
              Posts tagged{" "}
              <span className="text-[#197fe6]">
                {allTags.find((t) => t.slug === activeTag)?.label}
              </span>
            </p>
            <div className="space-y-2">
              {blogPosts
                .filter((p) => p.tags.some((t) => t.slug === activeTag))
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="flex items-start gap-2 text-sm text-slate-700 hover:text-[#197fe6] transition-colors leading-snug"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#197fe6] shrink-0" />
                    {p.title}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Widget */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#197fe6] to-blue-600 p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="font-serif mb-2 text-xl font-bold">Stay Updated</h3>
          <p className="mb-6 text-sm text-blue-100 font-serif">
            Get the latest safety tips and travel hacks delivered straight to your inbox.
          </p>
          <div className="w-full space-y-3">
            <input
              className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your email address"
              type="email"
            />
            <button className="w-full rounded-lg bg-white py-3 text-sm font-bold text-[#197fe6] hover:bg-blue-50 transition-colors shadow-sm">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Trending Widget — real posts, most recent */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-serif mb-4 text-lg font-bold text-slate-900">Trending Now</h3>
        <div className="flex flex-col gap-4">
          {trending.map((item) => (
            <Link key={item.rank} href={`/blog/${item.slug}`} className="group flex gap-4 items-start">
              <span className="flex-shrink-0 font-serif text-2xl font-bold text-slate-200 group-hover:text-[#197fe6] transition-colors">
                {item.rank}
              </span>
              <div>
                <h4 className="font-medium text-slate-900 leading-snug group-hover:text-[#197fe6] transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-xs text-slate-500 mt-1 block">{item.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}