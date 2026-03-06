"use client"
import { useState, useCallback, useEffect } from "react"

interface CheckerSidebarProps {
  onFilterChange?: (filters: any) => void
}

export default function CheckerSidebar({ onFilterChange }: CheckerSidebarProps) {
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(500)
  const [minRating, setMinRating] = useState(0)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [distance, setDistance] = useState(25)
  const [specialtyTags, setSpecialtyTags] = useState<string[]>([])

  // ── Fetch unique specialty categories from the DB ─────────────────────────
  useEffect(() => {
    fetch("/api/find-checker?type=specialties")
      .then((r) => r.json())
      .then((json) => {
        if (Array.isArray(json.data) && json.data.length > 0) {
          setSpecialtyTags(json.data)
        }
      })
      .catch(() => {/* silently ignore – list stays empty */})
  }, [])

  const notify = useCallback(
    (patch: object) => {
      if (!onFilterChange) return
      onFilterChange({
        priceMin,
        priceMax,
        minRating,
        selectedSpecialties,
        ...patch,
      })
    },
    [onFilterChange, priceMin, priceMax, minRating, selectedSpecialties]
  )

  const toggleSpecialty = (tag: string) => {
    const next = selectedSpecialties.includes(tag)
      ? selectedSpecialties.filter((s) => s !== tag)
      : [...selectedSpecialties, tag]
    setSelectedSpecialties(next)
    notify({ specialties: next })
  }

  const handleReset = () => {
    setPriceMin(0)
    setPriceMax(500)
    setMinRating(0)
    setSelectedSpecialties([])
    setDistance(25)
    if (onFilterChange)
      onFilterChange({
        priceMin: 0,
        priceMax: 10000,
        minRating: 0,
        specialties: [],
      })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
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
          className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-gray-200 accent-teal-600"
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
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => {
                setMinRating(r)
                notify({ minRating: r })
              }}
              className={`flex flex-col items-center justify-center rounded-xl border py-2 text-xs font-bold transition-all ${
                minRating === r
                  ? "border-teal-500 bg-teal-50 text-teal-700"
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

      {/* ── Specialties (dynamic from DB) ── */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Specialties</p>
        {specialtyTags.length === 0 ? (
          <p className="text-[11px] text-gray-400">Loading…</p>
        ) : (
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
        )}
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