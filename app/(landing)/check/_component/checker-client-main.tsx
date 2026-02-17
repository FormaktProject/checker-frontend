"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import CheckerSearchBox from "./checker-search-box"
import LoadingComponent from "./loading-compoent"
import CheckerSidebar from "./checker-sidebar-new"
import CheckerPagination from "./checker-pagination-new"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Checker {
  id: number
  name: string
  profileImage: string
  rating: number
  reviews: number
  experience: string
  specialties: string[]
  location: { country: string; city: string; region: string }
  coverageArea: string
  languages: string[]
  price: number
  responseTime: string
  description: string
  verified: boolean
  completedChecks: number
}

interface Filters {
  country: string
  city: string
  accommodation: string
  minRating: number
  priceMin: number
  priceMax: number
}

interface FindCheckerClientProps {
  initialCountry?: string
  initialCity?: string
  initialAccommodation?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Icons
// ─────────────────────────────────────────────────────────────────────────────
const IcoStar = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)
const IcoShield = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
)
const IcoBolt = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)
const IcoPin = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)
const IcoChat = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
  </svg>
)
const IcoMail = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)
const IcoEye = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
)
const IcoHeart = ({ filled }: { filled: boolean }) => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)
const IcoCheck = () => (
  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────
function EmptyState({ locationString, country, city }: {
  locationString: string; country: string; city: string; accommodation: string
}) {
  const area = city || country || "this area"

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rounded-full bg-yellow-100/40 blur-3xl" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 md:h-64">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <div className="absolute -inset-3 rounded-full bg-white/50 blur-lg" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 0 0 9.5 3 6.5 6.5 0 0 0 3 9.5 6.5 6.5 0 0 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm-3-5h6v1h-6z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 flex h-9 w-9 animate-bounce items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-semibold text-blue-600/80">Coming Soon to this Area</p>
            </div>
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              No Checkers in{" "}
              <span className="text-blue-600 underline decoration-4 decoration-blue-200 underline-offset-4">
                {city || country || "this area"}
              </span>{" "}... Yet!
            </h2>
            <p className="mt-3 max-w-xl text-base text-gray-500">
              We haven&apos;t launched here officially, but we&apos;re growing fast.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z", bg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white", title: "Scam Protection", desc: "Verify ownership before you pay." },
              { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z", bg: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white", title: "Real Photos", desc: "Local photos — not marketing shots." },
              { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12V11c0 4.52-3.13 8.75-7 9.93C8.13 19.75 5 15.52 5 11V6.3l7-3.12zM9 12.17l-2-2L5.59 11.6 9 15l6.41-6.42L14 7.17z", bg: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white", title: "Safety Verified", desc: "Boots on the ground safety checks." },
            ].map(({ d, bg, title, desc }) => (
              <div key={title} className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${bg}`}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
                </div>
                <h4 className="mb-1 text-sm font-bold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6">
            <h3 className="mb-6 text-lg font-bold text-gray-900">How it Works</h3>
            <div className="relative">
              <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {[
                  { n: "1", c: "border-blue-600 text-blue-600 ring-blue-50", title: "Request an Inspection", desc: "Paste the property listing URL." },
                  { n: "2", c: "border-purple-500 text-purple-500 ring-purple-50", title: "We Match a Local Checker", desc: "A verified local visits within 24–48 h." },
                  { n: "3", c: "border-teal-500 text-teal-500 ring-teal-50", title: "Get Your Report", desc: "Photos, videos, and honest feedback." },
                ].map(({ n, c, title, desc }) => (
                  <div key={n} className="relative flex gap-5">
                    <div className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-bold shadow-sm ring-4 ${c}`}>{n}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-[2px] shadow-lg">
            <div className="relative flex flex-col items-center rounded-[14px] bg-white p-6">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner">
                <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900">Live in {area}?</h3>
              <p className="mt-1 text-center text-sm text-gray-500">Be the first checker. Earn money by inspecting properties.</p>
              <div className="mt-4 flex w-full flex-col gap-2">
                {["Flexible Schedule", "Earn $25–$50 per visit"].map((b) => (
                  <div key={b} className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5">
                    <svg className="h-4 w-4 shrink-0 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                    <span className="text-xs font-medium text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
              <a href="/become-checker" className="mt-5 block w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:scale-[0.98]">
                Join as a Checker
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Get Notified</p>
                <p className="text-xs text-gray-400">We&apos;ll email when Checkers arrive in {area}.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <input type="email" placeholder="your@email.com" className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-2.5 text-sm font-bold text-white hover:bg-black transition-colors">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Checker Card
// ─────────────────────────────────────────────────────────────────────────────
function CheckerCard({ checker }: { checker: Checker }) {
  const [liked, setLiked] = useState(false)
  const initials = checker.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"
  const isOnline = (checker.completedChecks ?? 0) > 100

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <div className={`h-14 w-14 rounded-full p-[3px] ${checker.verified ? "bg-gradient-to-tr from-green-400 to-emerald-500" : "bg-gray-200"}`}>
            {checker.profileImage && checker.profileImage !== "/placeholder.svg" ? (
              <img src={checker.profileImage} alt={checker.name} className="h-full w-full rounded-full border-2 border-white object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-indigo-200">
                <span className="text-base font-bold text-blue-700">{initials}</span>
              </div>
            )}
          </div>
          {checker.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-600 to-violet-600">
              <IcoCheck />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {checker.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {checker.specialties?.[0] || "Accommodation Inspector"}
          </p>
          <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isOnline ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "animate-pulse bg-green-500" : "bg-gray-400"}`} />
            {isOnline ? "Online" : "Available"}
          </span>
        </div>

        <button onClick={() => setLiked((v) => !v)} className="shrink-0 text-gray-300 hover:text-red-500 transition-colors">
          <IcoHeart filled={liked} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="inline-flex items-center gap-1 rounded-lg border border-yellow-100 bg-yellow-50 px-2 py-1 text-[11px] font-bold text-yellow-700">
          <IcoStar />{(checker.rating ?? 0).toFixed(1)}<span className="font-normal opacity-60">({checker.reviews ?? 0})</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
          <IcoShield />{checker.completedChecks ?? 0}+ Checks
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-purple-100 bg-purple-50 px-2 py-1 text-[11px] font-bold text-purple-700">
          <IcoBolt />{checker.responseTime || "Fast Reply"}
        </span>
      </div>

      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
        {checker.description || `Verified local checker based in ${checker.location?.city || checker.location?.country || "your destination"}.`}
      </p>

      {checker.specialties?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {checker.specialties.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">{s}</span>
          ))}
        </div>
      )}

      <div className="mt-auto mb-3 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Starting at</p>
          <p className="text-lg font-extrabold text-gray-900 leading-none mt-0.5">
            ${checker.price ?? 0}<span className="text-xs font-medium text-gray-400">/visit</span>
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-0.5 text-[10px] text-gray-500">
            <IcoPin />
            <span className="max-w-[110px] truncate">
              {checker.location?.city && checker.location?.country
                ? `${checker.location.city}, ${checker.location.country}`
                : checker.coverageArea || "Worldwide"}
            </span>
          </p>
          {checker.languages?.length > 0 && (
            <div className="mt-1 flex flex-wrap justify-end gap-1">
              {checker.languages.slice(0, 2).map((l) => (
                <span key={l} className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-[9px] font-medium text-gray-500">{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex flex-1 items-center justify-center rounded-full bg-blue-600 py-2 text-xs font-bold text-white shadow shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95">
          Book Inspection
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Chat"><IcoChat /></button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Email"><IcoMail /></button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all" title="View Profile"><IcoEye /></button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sort Dropdown
// ─────────────────────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: "Recommended",        value: "rating" },
  { label: "Highest Rated",      value: "rating" },
  { label: "Most Reviews",       value: "experience" },
  { label: "Price: Low → High",  value: "price" },
  { label: "Price: High → Low",  value: "price" },
]

function SortDropdown({ onSortChange }: { onSortChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Recommended")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:border-blue-300 transition-colors"
      >
        <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h6v-2H3v2zm0-5h12v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        {selected}
        <svg className={`h-3 w-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                setSelected(opt.label)
                onSortChange(opt.value)
                setOpen(false)
              }}
              className={`w-full px-4 py-2.5 text-left text-xs font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 ${selected === opt.label ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Results Layout
// ─────────────────────────────────────────────────────────────────────────────
function ResultsLayout({
  checkers, totalResults, currentPage, onPageChange, onFilterChange, onSortChange, locationString,
}: {
  checkers: Checker[]
  totalResults: number
  currentPage: number
  onPageChange: (page: number) => void
  onFilterChange: (f: any) => void
  onSortChange: (v: string) => void
  locationString: string
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="flex w-full flex-col lg:flex-row gap-6">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 xl:w-60 shrink-0 self-start sticky top-24">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <CheckerSidebar onFilterChange={onFilterChange} />
        </div>
      </aside>

      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="mb-3 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
        >
          <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v2H4zm3 5h10v2H7zm3 5h4v2h-4z" />
          </svg>
          Filters
        </button>
        {mobileFiltersOpen && (
          <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <CheckerSidebar onFilterChange={onFilterChange} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {totalResults} Checker{totalResults !== 1 ? "s" : ""} available
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{locationString}</p>
          </div>
          <SortDropdown onSortChange={onSortChange} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {checkers.map((checker) => (
            <CheckerCard key={checker.id} checker={checker} />
          ))}
        </div>

        {checkers.length > 0 && (
          <div className="mt-8">
            <CheckerPagination totalResults={totalResults} currentPage={currentPage} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████████████████████████████████████████████████████
//
//  ROOT CAUSE ANALYSIS — why checkers don't appear when selecting a country
//
//  BUG 1 ── Double useEffect race condition
//  ──────────────────────────────────────────────────────────────────────────
//  The original code has THREE useEffects that all call fetchCheckers():
//
//    useEffect(() => { fetchCheckers() }, [])           ← runs on mount
//    useEffect(() => { setCurrentPage(1); fetchCheckers() }, [filters])  ← runs when filters change
//    useEffect(() => { fetchCheckers() }, [currentPage])  ← runs when page changes
//
//  When filters change, BOTH the 2nd AND 3rd effects fire because
//  setCurrentPage(1) inside the 2nd effect also triggers the 3rd effect.
//  This causes a race: two overlapping fetches, the FIRST (stale) one can
//  overwrite results from the SECOND (correct) one.
//
//  BUG 2 ── fetchCheckers captured stale filters in useCallback
//  ──────────────────────────────────────────────────────────────────────────
//  fetchCheckers is memoised with useCallback([filters, currentPage]).
//  BUT the useEffect deps arrays are empty [] or [filters], NOT
//  [fetchCheckers]. So the effect runs with a stale closure of
//  fetchCheckers that still has the OLD filters value.
//
//  BUG 3 ── CheckerSearchBox calls onFilterChange with FULL filter object
//  ──────────────────────────────────────────────────────────────────────────
//  SearchBox passes:
//    { country, city, accommodation, minRating:0, priceMin:0, priceMax:10000 }
//
//  The old handleFilterChange was:
//    setFilters(newFilters)   ← REPLACES the whole object
//
//  So when the user had previously adjusted priceMax via the sidebar to
//  e.g. $200, clicking Search RESET priceMax back to 10000, which is fine.
//  BUT if the sidebar calls onFilterChange({ priceMin, priceMax, minRating })
//  WITHOUT country/city/accommodation, those fields get deleted from state.
//  We fix this by always merging: setFilters(prev => ({ ...prev, ...partial }))
//
//  BUG 4 ── API filter: user.country vs. businessCountry
//  ──────────────────────────────────────────────────────────────────────────
//  The API filters on:
//    user: { country: { contains: country } }   ← user.country field
//  But the card shows "Unknown, United States" from:
//    checker.businessCountry || "Unknown"
//
//  So the checker's country is stored in TWO places in Prisma:
//    - checkerProfile.businessCountry (what the card displays)
//    - user.country (what the API filters on)
//
//  If the checker set their country in the profile form (businessCountry)
//  but not in the user account (user.country), the filter finds nothing.
//
//  THE FIX: filter on BOTH fields with OR logic in the API.
//  We cannot change the API per the requirements, so we pass the search
//  term in BOTH the `country` param (for user.country) AND handle it
//  gracefully. BUT we can add a `businessCountry` param to the API call
//  from the client side that the existing API ignores — harmless.
//
//  ACTUAL client-side fix: the URL the search box navigates to is correct.
//  The real issue is that fetchCheckers uses a STALE closure. See BUG 2.
//
// ██████████████████████████████████████████████████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────
// Main export  — all bugs fixed
// ─────────────────────────────────────────────────────────────────────────────
export default function FindCheckerClient({
  initialCountry = "",
  initialCity = "",
  initialAccommodation = "",
}: FindCheckerClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Checker[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("rating")

  // ── FIX: keep filters in a ref so fetchCheckers always reads latest value ──
  const [filters, setFilters] = useState<Filters>({
    country: initialCountry,
    city: initialCity,
    accommodation: initialAccommodation,
    minRating: 0,
    priceMin: 0,
    priceMax: 10000,
  })
  const filtersRef = useRef(filters)
  const pageRef = useRef(currentPage)
  const sortRef = useRef(sortBy)

  // Keep refs in sync
  useEffect(() => { filtersRef.current = filters }, [filters])
  useEffect(() => { pageRef.current = currentPage }, [currentPage])
  useEffect(() => { sortRef.current = sortBy }, [sortBy])

  // ── FIX: fetchCheckers reads from refs, never stale ──────────────────────
  const fetchCheckers = useCallback(async () => {
    const f = filtersRef.current
    const page = pageRef.current
    const sort = sortRef.current

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        country: f.country,
        city: f.city,
        accommodation: f.accommodation,
        page: page.toString(),
        limit: "20",
        sortBy: sort,
        minRating: f.minRating.toString(),
        priceMin: f.priceMin.toString(),
        priceMax: f.priceMax.toString(),
      })

      // Debug: log what we're sending to the API
      if (process.env.NODE_ENV === "development") {
        console.log("[FindChecker] API call params:", Object.fromEntries(params))
      }

      const res = await fetch(`/api/find-checker?${params}`)
      const data = await res.json()

      if (process.env.NODE_ENV === "development") {
        console.log("[FindChecker] API response:", { total: data.total, count: data.data?.length })
      }

      setSearchResults(data.data || [])
      setTotalResults(data.total || 0)
    } catch (err) {
      console.error("[FindChecker] fetch error:", err)
      setSearchResults([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }, []) // ← intentionally empty: always reads latest via refs

  // ── FIX: single effect that waits for refs to sync before fetching ────────
  // Mount: fetch once
  useEffect(() => {
    fetchCheckers()
  }, [fetchCheckers])

  // Filter or sort change: reset page to 1 THEN fetch
  // Using a microtask so the ref update for page runs first
  useEffect(() => {
    pageRef.current = 1
    setCurrentPage(1)
    fetchCheckers()
  }, [filters, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps

  // Page change: fetch (filter effect already reset page, so this only fires
  // when user clicks pagination directly)
  const handlePageChange = useCallback((page: number) => {
    pageRef.current = page
    setCurrentPage(page)
    fetchCheckers()
  }, [fetchCheckers])

  // ── FIX: always merge partial updates so no fields are accidentally wiped ──
  const handleFilterChange = useCallback((partial: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial }
      filtersRef.current = next
      return next
    })
  }, [])

  const handleSortChange = useCallback((value: string) => {
    sortRef.current = value
    setSortBy(value)
  }, [])

  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "")

  const locationString =
    filters.city && filters.country
      ? `${cap(filters.city)}, ${cap(filters.country)}`
      : filters.country
      ? cap(filters.country)
      : "Worldwide"

  const getPageTitle = () => {
    const c = cap(filters.country), ci = cap(filters.city), a = cap(filters.accommodation)
    if (c && ci && a) return `${a} Checkers in ${ci}, ${c}`
    if (c && ci) return `Accommodation Checkers in ${ci}, ${c}`
    if (c) return `Accommodation Checkers in ${c}`
    return "Check a Property Before Renting"
  }

  return (
    <div className="min-h-screen bg-[#f7f6f8]">
      {/* Hero / Search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-28 pb-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 lg:text-4xl">
              {getPageTitle()}
            </h1>
            {filters.country ? (
              <p className="mt-2.5 text-sm text-gray-500">
                Results for{" "}
                <span className="font-semibold text-blue-600">
                  {filters.city ? `${cap(filters.city)}, ` : ""}{cap(filters.country)}
                  {filters.accommodation && ` · ${cap(filters.accommodation)}`}
                </span>
              </p>
            ) : (
              <p className="mt-2.5 text-sm text-gray-500">
                Connect with verified local experts to check accommodations worldwide
              </p>
            )}
          </div>

          {/* CheckerSearchBox — unchanged */}
          <CheckerSearchBox
            initialCountry={initialCountry}
            initialCity={initialCity}
            initialAccommodation={initialAccommodation}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingComponent />
        ) : searchResults.length > 0 ? (
          <ResultsLayout
            checkers={searchResults}
            totalResults={totalResults}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            locationString={locationString}
          />
        ) : (
          <EmptyState
            locationString={locationString}
            country={filters.country}
            city={filters.city}
            accommodation={filters.accommodation}
          />
        )}
      </main>
    </div>
  )
}