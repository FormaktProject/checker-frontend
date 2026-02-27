import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  slug: string;
  image: string;
  imageAlt: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
}

// Maps category names to a Tailwind color class pair
const categoryColorMap: Record<string, string> = {
  Safety: "bg-blue-50 text-blue-700",
  "Travel Business": "bg-emerald-50 text-emerald-700",
  Reviews: "bg-purple-50 text-purple-700",
  Budget: "bg-orange-50 text-orange-700",
  "Travel Tips": "bg-sky-50 text-sky-700",
  "Digital Nomad": "bg-teal-50 text-teal-700",
  "Local Insights": "bg-emerald-50 text-emerald-700",
};

export default function BlogCard({
  slug,
  image,
  imageAlt,
  category,
  categoryColor,
  title,
  excerpt,
  date,
}: BlogCardProps) {
  const colorClass =
    categoryColorMap[category] ??
    {
      blue: "bg-blue-50 text-blue-700",
      emerald: "bg-emerald-50 text-emerald-700",
      purple: "bg-purple-50 text-purple-700",
      orange: "bg-orange-50 text-orange-700",
    }[categoryColor] ??
    "bg-blue-50 text-blue-700";

  return (
    <article className="group flex flex-col h-full bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      <Link href={`/blog/${slug}`} className="relative h-56 overflow-hidden block">
        <Image
          alt={imageAlt}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold shadow-sm ${colorClass}`}>
            {category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/blog/${slug}`}>
          <h2 className="font-serif mb-3 text-xl font-bold leading-tight text-slate-900 group-hover:text-[#197fe6] transition-colors">
            {title}
          </h2>
        </Link>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 font-serif line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-xs font-medium text-slate-400">{date}</span>
          <Link
            href={`/blog/${slug}`}
            className="group/link flex items-center text-sm font-semibold text-[#197fe6]"
          >
            Read More
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}