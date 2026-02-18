import { BadgeCheck, PiggyBank, Lock } from "lucide-react";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Verified Local Experts",
    description:
      "Every checker undergoes a strict identity verification process including ID checks and background screenings to ensure legitimacy.",
  },
  {
    icon: PiggyBank,
    title: "Protected Payments",
    description:
      "Funds are held in an escrow-like system and only released when you successfully receive the inspection report.",
  },
  {
    icon: Lock,
    title: "Data Confidentiality",
    description:
      "Your personal data and property details are encrypted using banking-grade security and handled with strict privacy protocols.",
  },
];

export default function SafetyPillars() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col gap-4 mb-12 text-center">
          <span className="text-[#13ec80] font-bold tracking-wider uppercase text-sm">Why Trust Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0e1b2e]">Safety Pillars</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We have built a three-layered security system to protect your inspections and funds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-[#f6f8f7] border border-slate-100 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300"
            >
              <div className="size-14 rounded-xl bg-white flex items-center justify-center text-[#13ec80] shadow-sm mb-2">
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0e1b2e]">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}