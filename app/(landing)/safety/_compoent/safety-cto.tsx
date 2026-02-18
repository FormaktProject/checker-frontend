export default function SafetyCTA() {
  return (
    <section className="w-full px-6 py-16 md:py-24 max-w-[1000px]">
      <div className="relative overflow-hidden rounded-3xl bg-[#0e1b2e] p-8 md:p-16 text-center">
        {/* Dot grid background pattern */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#13ec80 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Book Safely?</h2>
          <p className="text-slate-300 max-w-xl text-lg">
            Join thousands of satisfied users who trust CheckerIst for their property inspections. Safe, secure, and
            simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <a
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#13ec80] hover:bg-[#0fb360] text-[#111814] font-bold text-base transition-colors duration-200 min-w-[160px]"
              href="#"
            >
              Search Checkers
            </a>
            <a
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-sm transition-colors duration-200 border border-white/10 min-w-[160px]"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}