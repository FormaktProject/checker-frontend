import { Lock, CheckCircle, Shield, ShieldCheck } from "lucide-react";

const badges = [
  { icon: Lock, label: "SSL Secure" },
  { icon: CheckCircle, label: "Stripe" },
  { icon: Shield, label: "AES-256" },
  { icon: ShieldCheck, label: "Norton" },
];

export default function TrustBadges() {
  return (
    <section className="w-full bg-slate-50 py-12 border-y border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-slate-500 font-medium mb-8">
          Trusted by industry leaders and secured by top technologies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-2xl font-bold text-slate-700">
              <Icon className="w-6 h-6" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}