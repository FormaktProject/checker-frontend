import { Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mb-16">
      <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg lg:flex-row">
        <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-3/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img
            alt="Tropical vacation resort with palm trees and blue pool"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-NA7LiqHltUPy5Hv5-FysQ9UVV0_uq76e77kvLcmqFqd00Po8Lq8sd_7nyciF9ZuF8Cz21ggdw1phX_oB_LnG0gfg7siSfuECMZw6WqOF0EKVPXFNDnzHn5FZAQzcGHIZQEon-zUb7Rh8py7fVuoQLLLzOX2oUCybCL1M3OYLGmDtM0Tl9JiskpoMhnBdQXRURDJzLJpFD570zad_aP8LqpLDcH7PhbHjTD7rQ0AZU18L0lLwlLtcFcs6CG5Fni_KNznYpxowxk8"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#197fe6] backdrop-blur-sm">
              Featured
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 lg:w-2/5 lg:p-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
            <span>•</span>
            <span className="text-[#197fe6] font-medium">Safety First</span>
          </div>
          <h1 className="font-serif mb-4 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
            Expert Travel Tips: How to Spot a Rental Scam in 2024
          </h1>
          <p className="mb-6 text-slate-600 font-serif text-lg leading-relaxed">
            Learn the essential red flags to watch out for when booking your next vacation rental to ensure a safe and stress-free trip. Don&apos;t let a scam ruin your holiday.
          </p>
          <div className="flex items-center gap-3 border-t border-slate-100 pt-6">
            <img
              alt="Portrait of Sarah Jenkins author"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm8-54xvW2qKKKEkpLzjGPdRgxbqUAihGGvKSNbF1eEk26VUCF7EsazssraaH2VncWTm-GTF1ZHmPuV6P1dOHk9FxdLLvsA33bQlHNvDU7z9wTPbfXOAeVvKd4wiKOW-kjuZ15XJo92uTdvbxI14zJSGbCPZ-V2zdjU6FYB1OA_FKKIGKENRaDFbzoAYZFr3xsx2kJcLfDhmN6mmCfPr0nKv3EzYlQZcigsa6uDTt8XpFEjBEXFzA0enaUksT2Zz_Q4pOjBxe-UlQ"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
              <p className="text-xs text-slate-500">Travel Safety Expert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}