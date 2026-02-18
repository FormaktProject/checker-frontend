import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  image: string;
  imageAlt: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogCard({
  image,
  imageAlt,
  category,
  categoryColor,
  title,
  excerpt,
  date,
}: BlogCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <article className="group flex flex-col h-full bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      <div className="relative h-56 overflow-hidden">
        <img
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold shadow-sm ${colorMap[categoryColor] || colorMap.blue}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-serif mb-3 text-xl font-bold leading-tight text-slate-900 group-hover:text-[#197fe6] transition-colors">
          {title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 font-serif">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-xs font-medium text-slate-400">{date}</span>
          <a className="group/link flex items-center text-sm font-semibold text-[#197fe6]" href="#">
            Read More
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
}