"use client"
import { useState, useCallback } from "react"

interface CheckerSidebarProps {
  onFilterChange?: (filters: any) => void
}

const specialtyTags = ["WiFi Test", "Plumbing", "Roofing", "Electrical", "Security", "Mold Check", "HVAC", "Structural"]
const propertyTypes = ["Residential", "Commercial", "Luxury Estates", "Industrial", "Vacation Rentals"]

export default function CheckerSidebar({ onFilterChange }: CheckerSidebarProps) {
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(500)
  const [minRating, setMinRating] = useState(0)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [distance, setDistance] = useState(25)

  const notify = useCallback(
    (patch: object) => {
      if (!onFilterChange) return
      onFilterChange({
        priceMin,
        priceMax,
        minRating,
        ...patch,
      })
    },
    [onFilterChange, priceMin, priceMax, minRating]
  )

  const toggleSpecialty = (tag: string) => {
    const next = selectedSpecialties.includes(tag)
      ? selectedSpecialties.filter((s) => s !== tag)
      : [...selectedSpecialties, tag]
    setSelectedSpecialties(next)
    notify({ specialties: next })
  }

  const toggleType = (type: string) => {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    setSelectedTypes(next)
    notify({ propertyTypes: next })
  }

  const handleReset = () => {
    setPriceMin(0)
    setPriceMax(500)
    setMinRating(0)
    setSelectedSpecialties([])
    setSelectedTypes([])
    setDistance(25)
    if (onFilterChange)
      onFilterChange({ priceMin: 0, priceMax: 500, minRating: 0, specialties: [], propertyTypes: [] })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header – only shown in the standalone sidebar, not inside the wrapper that already has the header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Refine</span>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* ── Price Range ── */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Price Range</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">$</span>
            <input
              type="number"
              min={0}
              max={priceMax}
              value={priceMin}
              onChange={(e) => {
                const v = Number(e.target.value)
                setPriceMin(v)
                notify({ priceMin: v })
              }}
              className="w-full rounded-xl border border-gray-100 bg-white py-2 pl-6 pr-2 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <span className="text-gray-400 text-sm">–</span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">$</span>
            <input
              type="number"
              min={priceMin}
              max={9999}
              value={priceMax}
              onChange={(e) => {
                const v = Number(e.target.value)
                setPriceMax(v)
                notify({ priceMax: v })
              }}
              className="w-full rounded-xl border border-gray-100 bg-white py-2 pl-6 pr-2 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        {/* dual thumb visual – simplified single thumb for max */}
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceMax}
          onChange={(e) => {
            const v = Number(e.target.value)
            setPriceMax(v)
            notify({ priceMax: v })
          }}
          className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-600"
        />
        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>$0</span>
          <span>$1,000+</span>
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ── Min Rating ── */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Minimum Rating</p>
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => {
                setMinRating(r)
                notify({ minRating: r })
              }}
              className={`flex flex-col items-center justify-center rounded-xl border py-2 text-xs font-bold transition-all ${
                minRating === r
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-100 bg-white text-gray-500 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {r === 0 ? (
                <span className="text-[10px] font-semibold">Any</span>
              ) : (
                <>
                  <span>{r}.0</span>
                  <span className="text-yellow-400">{"★".repeat(r)}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ── Property Type ── */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Property Type</p>
        <div className="space-y-2.5">
          {propertyTypes.map((type) => {
            const checked = selectedTypes.includes(type)
            return (
              <label key={type} className="group flex cursor-pointer items-center gap-3">
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    checked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {checked && (
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={checked} onChange={() => toggleType(type)} className="sr-only" />
                <span className={`text-sm font-medium transition-colors ${checked ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"}`}>
                  {type}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ── Specialties ── */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Specialties</p>
        <div className="flex flex-wrap gap-2">
          {specialtyTags.map((tag) => {
            const active = selectedSpecialties.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleSpecialty(tag)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "border-blue-200 bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ── Distance ── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Distance</p>
          <span className="text-xs font-semibold text-blue-600">Within {distance} km</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-600"
        />
        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>1 km</span>
          <span>100 km</span>
        </div>
      </section>
    </div>
  )
}