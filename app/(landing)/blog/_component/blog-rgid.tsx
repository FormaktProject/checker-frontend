"use client";

import { useState } from "react";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

import BlogCard from "./blog-card";
import { blogPosts } from "../[slug]/_components/blogpost";

const POSTS_PER_PAGE = 4;

// Derive a stable color key from category name
function categoryColorKey(category: string): string {
  const map: Record<string, string> = {
    Safety: "blue",
    "Travel Business": "emerald",
    Reviews: "purple",
    Budget: "orange",
    "Travel Tips": "blue",
    "Digital Nomad": "emerald",
    "Local Insights": "emerald",
  };
  return map[category] ?? "blue";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginated = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="lg:col-span-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Latest Articles</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <LayoutGrid className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <List className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {paginated.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            image={post.coverImage}
            imageAlt={post.coverImageAlt}
            category={post.category}
            categoryColor={categoryColorKey(post.category)}
            title={post.title}
            excerpt={(post.excerpt || post.content.find((b) => b.type === "paragraph")?.text) ?? ""}
            date={formatDate(post.publishedAt)}
          />
        ))}
      </div>

      {/* Pagination — only show if more than one page */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "border-[#197fe6] bg-[#197fe6] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}