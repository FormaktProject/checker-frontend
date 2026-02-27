import { Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../[slug]/_components/blogpost";


export default function HeroSection() {
  // Always use the Bali driver post as the featured hero
  const featured = blogPosts.find(
    (p) => p.slug === "bali-driver-travel-sales-lesson"
  ) ?? blogPosts[0];

  const formattedDate = new Date(featured.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="mb-16">
      <Link
        href={`/blog/${featured.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg lg:flex-row"
      >
        {/* Cover image */}
        <div className="relative h-[350px] w-full overflow-hidden lg:h-[650px] lg:w-3/5">
          <div className="absolute inset-0 bg-gradient-to-t  from-black/20 to-transparent z-10" />
          <Image
            alt={featured.coverImageAlt}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            src={featured.coverImage}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#197fe6] backdrop-blur-sm">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 lg:w-2/5 lg:p-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{featured.readingTimeMinutes} min read</span>
            <span>•</span>
            <span className="text-[#197fe6] font-medium">{featured.category}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <h1 className="font-serif mb-4 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl group-hover:text-[#197fe6] transition-colors">
            {featured.title}
          </h1>

          <p className="mb-6 text-slate-600 font-serif text-lg leading-relaxed line-clamp-3">
            {featured.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 border-t border-slate-100 pt-6">
            <Image
              alt={`Portrait of ${featured.author.name}`}
              className="rounded-full object-cover ring-2 ring-white"
              src={featured.author.avatar}
              width={40}
              height={40}
              sizes="40px"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{featured.author.name}</p>
              <p className="text-xs text-slate-500">{featured.author.role}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {featured.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}