"use client";

import { Search, Mail } from "lucide-react";

const categories = [
  { name: "Safety", count: 12 },
  { name: "Travel Hacks", count: 24 },
  { name: "Food", count: 8 },
  { name: "Reviews", count: 5 },
  { name: "Destinations", count: 18 },
];

const trending = [
  { rank: "01", title: "10 Common Tourist Traps in Paris", readTime: "3 min read" },
  { rank: "02", title: "Packing Light: A minimalist guide", readTime: "5 min read" },
  { rank: "03", title: "Best Travel Insurance of 2024", readTime: "10 min read" },
];

export default function Sidebar() {
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

      {/* Popular Categories Widget */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-serif mb-4 text-lg font-bold text-slate-900">Popular Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.name}
              className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-[#197fe6] transition-colors"
              href="#"
            >
              {cat.name}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                {cat.count}
              </span>
            </a>
          ))}
        </div>
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
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      {/* Trending Widget */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-serif mb-4 text-lg font-bold text-slate-900">Trending Now</h3>
        <div className="flex flex-col gap-4">
          {trending.map((item) => (
            <a key={item.rank} className="group flex gap-4 items-start" href="#">
              <span className="flex-shrink-0 font-serif text-2xl font-bold text-slate-200 group-hover:text-[#197fe6] transition-colors">
                {item.rank}
              </span>
              <div>
                <h4 className="font-medium text-slate-900 leading-snug group-hover:text-[#197fe6] transition-colors">
                  {item.title}
                </h4>
                <span className="text-xs text-slate-500 mt-1 block">{item.readTime}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}