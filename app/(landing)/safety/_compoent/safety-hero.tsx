import { ShieldCheck } from "lucide-react";

export default function SafetyHero() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="relative mb-8 group">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-[#13ec80]/30 rounded-full blur-[60px] transform scale-150 animate-pulse" />
        {/* Shield icon card */}
        <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-[2rem] p-8 shadow-[0_0_40px_-10px_rgba(19,236,128,0.5)] border border-white/50">
          <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-[#13ec80]" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0e1b2e] mb-6 max-w-3xl">
        Your Safety is{" "}
        <span className="text-[#13ec80] relative inline-block">
          Our Top Priority
          <svg
            className="absolute w-full h-3 -bottom-1 left-0 text-[#13ec80] opacity-30"
            fill="none"
            viewBox="0 0 200 9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.00025 6.99999C44.7571 2.37357 122.992 -2.14668 198 2.99999"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
        Discover how CheckerIst ensures a secure environment for property inspections and payments, giving you peace of
        mind with every transaction.
      </p>
    </section>
  );
}