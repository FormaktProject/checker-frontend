

import { CheckerProfile, LANGUAGE_LEVEL, LANGUAGE_MAP } from "./types-checker";

interface AboutSectionProps {
  checker: CheckerProfile;
  location:string
}

export function AboutSection({ checker, location }: AboutSectionProps) {
  const paragraphs = checker.description.split("\n\n").filter(Boolean);
  const firstName = checker.user.firstName;

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">About {firstName} - {checker.professionalTitle} in {location}</h2>

      <div className="text-slate-600 leading-relaxed space-y-4 mb-8">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Certifications */}
      {checker.certifications.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {checker.certifications.map((cert) => (
              <span
                key={cert.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10"
              >
                {cert.isVerified && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {checker.user.languages.map((code) => { 
            const level = LANGUAGE_LEVEL[code] ?? "Proficient";
            return (
              <span
                key={code}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 text-sm font-medium border border-slate-100"
              >
                
                {code}
                <span className="text-slate-400 text-xs">({level})</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}