import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./blog-card";


const posts = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7R1nbwxVwlWTlangd7CL7ABfQaULRNCmjEhXfD1-_QD-I_IXFqqh84oT6sMTb9bVYa9Ci3FjWW-G_DfdbjzvGUvGwQpckSGE0faXNMsS5PblTAFyEQBvAYQpTkX0Payo9JAHB0xliZ2Zx9TOFLnEdl1S4_gRqyJNWKveoNneRXzIQxWMefQxfWGgumhZnsqhLHlHSsW-yueQ-lRgq19EJtL7EA07oaukjskrAifO_ktlOcz1zVjIMOikkk2jb263T3otAH0IhPxg",
    imageAlt: "Woman sitting alone in a coffee shop looking at a map",
    category: "Safety",
    categoryColor: "blue",
    title: "The Ultimate Guide to Solo Travel",
    excerpt: "Discover how to navigate the world on your own with confidence and essential safety tips for solo adventurers.",
    date: "Oct 12, 2023",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYEwiyA9RbUMy9cIBsdXcvTpLRDf5XWdbsAocB6XNIjhT8-5JlT8_whPRjtGNnjL1sUuAYrLo5bdvk1gp3DsrSuRJAdiMQEGDJGKx_a3G3FRbzCAXsP7XBX_7V8lIy-mYQ030eYHwP9TgWl7oDNuP47kUY_5LYW7iqgk5Z4SWWVOv8PJwWO9s6MoVFU3vFE6bti0iyI9fotvnPIiA2XFYTYeBhQIIHGWix0DsOg7bfdcOz3TISAi9khLJOUcPddHC1-srlj5IIy4o",
    imageAlt: "Quiet narrow street in Kyoto with traditional lanterns",
    category: "Local Insights",
    categoryColor: "emerald",
    title: "Hidden Cafes in Kyoto You Must Visit",
    excerpt: "Escape the tourist crowds and find your zen in these secret coffee spots known only to locals.",
    date: "Oct 08, 2023",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXUdYLH7sBWD3vSEymKsW7Q5goEE5uzCAB-fjRRzNy3vn-1sh5TeZ1Pol9aArtuWPiA1Em7pJPSGXVO2hx2Jn89X7E4LztYmdVJqaePfnfm-WDV88S_pVBu4aFMLIwjV7lB9XA5neknMcStJSNsmk4tLkEnWMnhAQIa_hNDxOyQEOf1WvRMTRqSNA0rvWo3wyKnpnYUrJ5fAGBmbyPSPlfTbRcnvM77ODJKuJeEg4_g-9mfTO34fduCGJ8AbzCxJKRp2lf5IOBzNY",
    imageAlt: "Close up of a premium credit card and travel documents",
    category: "Reviews",
    categoryColor: "purple",
    title: "Is CheckerIst Premium Worth It?",
    excerpt: "An in-depth look at the features and benefits of the premium subscription for frequent travelers.",
    date: "Sep 28, 2023",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSjizT7MTUX2oQztOmaTKChlahmgeHuu9t1zjOCie83a5sguHrfsNMFxyryrwhqC8CBvL7LYNPVA0DMtFvq_32teED6uH38qrbukLODFj3gA-XsULa5nfF9GF0AJDLs7LRcJnUKoQ_qXTn4wonbb2Y5P1las8niM1FIDBrFzRrhr7rX8raRWwj76t-GC2k2JJCQOcYj_EXo8l90z3UFVZ-HBZKrVwte1cLcpwRSms6YBh5UVoA-C6PfrckuOCgRfgOX327mV7rQ64",
    imageAlt: "Backpacker looking at a mountain range",
    category: "Budget",
    categoryColor: "orange",
    title: "Europe on a Shoestring: 2024 Edition",
    excerpt: "How to travel through Europe's most expensive cities without breaking the bank.",
    date: "Sep 15, 2023",
  },
];

export default function BlogGrid() {
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
        {posts.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav aria-label="Pagination" className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${
                page === 1
                  ? "border-[#197fe6] bg-[#197fe6] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2 text-slate-400">...</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}