import { ShieldCheck, Clock, Handshake } from "lucide-react";

const steps = [
  {
    icon: ShieldCheck,
    step: "Step 01",
    title: "Identity Shield",
    description:
      "Before a checker can accept your request, they must pass our rigorous ID verification. We check government databases to ensure they are who they say they are.",
    align: "right" as const,
  },
  {
    icon: Clock,
    step: "Step 02",
    title: "Escrow Protection",
    description:
      "You pay upfront, but we hold the money. The funds are kept secure in our escrow vault and are not released to the checker until the job is marked complete.",
    align: "left" as const,
  },
  {
    icon: Handshake,
    step: "Step 03",
    title: "Quality Guarantee",
    description:
      "If the report isn't delivered or doesn't match the description, our dispute resolution team steps in. We guarantee a fair outcome or your money back.",
    align: "right" as const,
  },
];

export default function SafetyProcess() {
  return (
    <section className="w-full py-16 md:py-24 max-w-[800px] px-6">
      <div className="text-center mb-16">
        <span className="text-[#13ec80] font-bold tracking-wider uppercase text-sm">How It Works</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0e1b2e] mt-2">Secure Process Flow</h2>
      </div>

      <div className="relative">
        {/* Vertical gradient line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#13ec80] via-[#13ec80]/50 to-transparent -translate-x-1/2 z-0" />

        {steps.map(({ icon: Icon, step, title, description, align }, index) => (
          <div
            key={step}
            className={`relative z-10 grid grid-cols-[64px_1fr] md:grid-cols-2 gap-8 ${
              index < steps.length - 1 ? "mb-16" : ""
            } items-center group`}
          >
            {/* Icon node */}
            <div
              className={`flex justify-center ${
                align === "right" ? "md:justify-end md:pr-8 md:order-1" : "md:justify-start md:pl-8 md:order-2"
              } order-1`}
            >
              <div className="size-16 rounded-full bg-white border-4 border-[#13ec80] flex items-center justify-center shadow-[0_0_40px_-10px_rgba(19,236,128,0.5)]">
                <Icon className="w-6 h-6 text-[#13ec80]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Content card */}
            <div
              className={`${
                align === "right" ? "md:order-2" : "md:order-1 md:text-right"
              } order-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100`}
            >
              <div className="text-[#13ec80] font-bold text-sm mb-1 uppercase tracking-wide">{step}</div>
              <h3 className="text-xl font-bold text-[#0e1b2e] mb-2">{title}</h3>
              <p className="text-slate-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}