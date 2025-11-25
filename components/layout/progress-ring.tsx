export default function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
      {/* Background circle */}
      <circle cx="100" cy="100" r={radius} stroke="#e2e8f0" strokeWidth="8" fill="none" />
      {/* Progress circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="url(#gradient)"
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
