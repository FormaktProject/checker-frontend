"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  ChevronRight,
  CalendarDays,
  Clock,
  Share2,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";
import { BlogPost, ContentBlock } from "./blog";


/* ─── helpers ──────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── Icon resolver for data-driven icons ──────────────── */
function BlockIcon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? "w-5 h-5 text-[#0bda84] shrink-0";
  switch (name) {
    case "check_circle":
      return <CheckCircle2 className={cls} />;
    case "lightbulb":
      return <Lightbulb className={cls} />;
    default:
      return null;
  }
}

/* ─── Content block renderer ───────────────────────────── */

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-6 text-slate-600 font-body leading-relaxed text-base md:text-lg">
          {block.text}
        </p>
      );

    case "heading2":
      return (
        <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2 text-[#0d1c16]">
          {block.icon && (
            <BlockIcon name={block.icon} className="w-6 h-6 text-[#0bda84] shrink-0" />
          )}
          {block.text}
        </h2>
      );

    case "heading3":
      return (
        <h3 className="text-xl font-bold mt-8 mb-4 text-[#0d1c16]">
          {block.text}
        </h3>
      );

    case "proTip":
      return (
        <div className="my-10 bg-[#e7f4ee] border-l-4 border-[#0bda84] p-6 rounded-r-xl">
          <h4 className="text-[#0d1c16] font-bold text-lg mb-2 flex items-center gap-2">
            <BlockIcon name={block.icon} className="w-5 h-5 text-[#0bda84] shrink-0" />
            {block.title}
          </h4>
          <p className="font-body text-slate-700 m-0 text-sm md:text-base leading-relaxed">
            {block.text}
          </p>
        </div>
      );

    case "bulletList":
      return (
        <ul className="list-none space-y-3 mb-8 pl-0">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 text-[#0bda84] shrink-0 mt-1" />
              <span className="text-slate-600 font-body text-base">
                <strong className="text-[#0d1c16]">{item.label}:</strong>{" "}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );

    case "imageWithCaption":
      return (
        <div className="w-full rounded-xl overflow-hidden my-10 shadow-sm border border-gray-100">
          <div className="relative w-full h-64">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <div className="p-4 bg-gray-50 text-center">
              <p className="text-sm text-slate-500 italic">{block.caption}</p>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

/* ─── Related Article Card ─────────────────────────────── */

function RelatedCard({
  article,
}: {
  article: NonNullable<BlogPost["relatedArticles"]>[number];
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          src={article.coverImage}
          alt={article.coverImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-[#0bda84] uppercase tracking-wider mb-2">
          {article.category}
        </span>
        <h4 className="text-base font-bold text-[#0d1c16] mb-2 leading-tight group-hover:text-[#0bda84] transition-colors">
          {article.title}
        </h4>
        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

/* ─── Share Sidebar Button ──────────────────────────────── */

function ShareBtn({
  children,
  hoverClass,
}: {
  children: React.ReactNode;
  hoverClass: string;
}) {
  return (
    <button
      className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-200 shadow-sm hover:shadow-md ${hoverClass}`}
    >
      {children}
    </button>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <div className="relative flex flex-col min-h-screen w-full mt-16 overflow-x-hidden bg-[#f5f8f7]">
     

      {/* ── Article ── */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 md:px-0 py-8 md:py-12">

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-1.5 mb-6 items-center text-sm">
          <Link href="/" className="text-[#499c7a] hover:text-[#0bda84] font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#499c7a]" />
          <Link href="/blog" className="text-[#499c7a] hover:text-[#0bda84] font-medium transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4 text-[#499c7a]" />
          <span className="text-[#0d1c16] font-medium">{post.category}</span>
        </nav>

        <article className="flex flex-col">
          {/* Title */}
          <h1 className="font-serif text-[#0d1c16] text-3xl md:text-5xl font-bold leading-tight mb-6 text-center md:text-left">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 ring-2 ring-[#e7f4ee]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  quality={85}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0d1c16]">
                  {post.author.name}
                </span>
                <span className="text-xs text-[#499c7a]">
                  {post.author.role}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm text-[#499c7a]">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTimeMinutes} min read
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-10 relative shadow-md">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Social share sidebar — desktop */}
          <div className="hidden lg:flex flex-col fixed left-[calc(50%-500px)] top-64 gap-3 z-10">
            <ShareBtn hoverClass="hover:text-[#0bda84] hover:border-[#0bda84]">
              <Share2 className="w-4 h-4" />
            </ShareBtn>
            <ShareBtn hoverClass="hover:text-[#1DA1F2] hover:border-[#1DA1F2]">
              <Twitter className="w-4 h-4" />
            </ShareBtn>
            <ShareBtn hoverClass="hover:text-[#0A66C2] hover:border-[#0A66C2]">
              <Linkedin className="w-4 h-4" />
            </ShareBtn>
          </div>

          {/* Lead paragraph 
          <p className="text-xl md:text-2xl font-body leading-relaxed text-slate-700 mb-8">
            {post.excerpt}
          </p>*/}

          {/* Dynamic content blocks */}
          <div className="max-w-none">
            {post.content.map((block, idx) => (
              <RenderBlock key={idx} block={block} />
            ))}
          </div>

          {/* Mobile share */}
          <div className="lg:hidden flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <span className="text-sm font-bold text-[#0d1c16]">Share:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#e7f4ee] flex items-center justify-center text-slate-500 hover:text-[#0bda84] transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#e8f4fd] flex items-center justify-center text-slate-500 hover:text-[#1DA1F2] transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#e8f0fb] flex items-center justify-center text-slate-500 hover:text-[#0A66C2] transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 mb-16">
            {post.tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="px-3 py-1 bg-gray-100 text-[#499c7a] text-sm rounded-full font-medium hover:bg-[#e7f4ee] hover:text-[#0bda84] transition-colors"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </article>
      </main>

      {/* ── Related Articles ── */}
      {post.relatedArticles && post.relatedArticles.length > 0 && (
        <section className="bg-[#f8fcfa] py-16 px-4 md:px-10 border-t border-[#e7f4ee]">
          <div className="max-w-[960px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0d1c16] mb-2">
                  Continue Reading
                </h3>
                <p className="text-[#499c7a] text-sm">
                  More guides to keep you safe on the road.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-1.5 text-[#0bda84] font-bold hover:underline text-sm"
              >
                View all articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedArticles.map((article) => (
                <RelatedCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter Footer ── */}
      <footer className="bg-[#0d1c16] text-white py-16 px-4 md:px-10">
        <div className="max-w-[960px] mx-auto text-center">
          <div className="w-12 h-12 bg-[#0bda84]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-[#0bda84]" />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Don&apos;t travel without us
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Join 50,000+ travelers getting the latest safety tips, scam alerts,
            and destination guides delivered to their inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0bda84] focus:border-transparent text-sm"
              placeholder="Enter your email address"
              type="email"
            />
            <button className="px-6 py-3 rounded-lg bg-[#0bda84] hover:bg-[#058f55] text-[#0d1c16] font-bold transition-colors text-sm">
              Subscribe
            </button>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>© 2026 CheckerIst. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}