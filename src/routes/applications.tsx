import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { Hospital, GraduationCap, Plane, Building2, Check } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Institutional Solutions | Hospitals, Schools & Transit" },
      { name: "description", content: "CPR PRAYAS™ deployments across hospital wards, educational institutions, public transit hubs, and hospitality." },
      { property: "og:title", content: "CPR PRAYAS™ Applications" },
      { property: "og:description", content: "Standardized resuscitation across every enterprise environment." },
    ],
  }),
  component: AppsPage,
});

const SECTORS: {
  id: string;
  eyebrow: string;
  icon: ReactNode;
  title: string;
  body: string;
  features: string[];
  cta: string;
  reverse?: boolean;
}[] = [
  {
    id: "hospitals",
    eyebrow: "Clinical ward deployment",
    icon: <Hospital className="h-6 w-6" />,
    title: "Hospitals & Code Blue teams",
    body: "In general wards, CPR is often initiated by junior nursing staff before the Code Blue team arrives. CPR PRAYAS™ Pro standardizes compression depth and rate, logging telemetry to central quality dashboards for post-event debriefing.",
    features: [
      "Crash cart & bedside emergency readiness integration",
      "360° RGB LED force rings readable from any bed angle",
      "Defibrillator isolation transformer (360J shock immune)",
      "Automated Wi-Fi incident debriefing reports",
    ],
    cta: "Request hospital pilot program",
  },
  {
    id: "schools",
    eyebrow: "Educational safety",
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Schools & educational foundations",
    body: "Integrating hands-on CPR training into mandatory physical education and health safety curricula. Students receive instant green-light feedback and QR-code scannable digital certification badges.",
    features: [
      "Gamified learning with real-time green light feedback",
      "QR-code scannable digital certification badges",
      "Campus-wide safety readiness tracking portal",
      "Train-the-trainer model for PE faculty",
    ],
    cta: "School curriculum information",
    reverse: true,
  },
  {
    id: "transit",
    eyebrow: "Transit infrastructure",
    icon: <Plane className="h-6 w-6" />,
    title: "Airports & mass transit hubs",
    body: "High-density transit terminals feature public AEDs, but bystanders often hesitate. CPR PRAYAS™ One pierces terminal noise with an 85 dB speaker, issuing spoken directives to guide any passenger through resuscitation.",
    features: [
      "Co-located inside public AED wall cabinets",
      "85 dB speaker for high-noise environments",
      "Bilingual spoken prompts",
      "Zero-training bystander operation",
    ],
    cta: "Request public infrastructure quote",
  },
  {
    id: "hospitality",
    eyebrow: "Corporate & hospitality",
    icon: <Building2 className="h-6 w-6" />,
    title: "Hotels, resorts & corporate campuses",
    body: "Guest and employee safety is non-negotiable. Deploy CPR PRAYAS™ One across every floor and event venue for immediate bystander response before EMS arrival.",
    features: [
      "Discreet cabinet or first-aid kit integration",
      "Multi-lingual acoustic prompts for global guests",
      "Compliance-friendly documentation & audits",
      "Bulk enterprise procurement discounts",
    ],
    cta: "Request enterprise fleet quote",
    reverse: true,
  },
];

function AppsPage() {
  return (
    <>
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Sector deployments</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Standardized resuscitation across <span className="text-pulse">every environment</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            CPR PRAYAS™ is tailored for hospital wards, educational institutions, transit hubs,
            and corporate hospitality safety.
          </p>
        </div>
      </Section>

      {SECTORS.map((s, i) => (
        <Section key={s.id} id={s.id} surface={i % 2 === 0}>
          <div className={`grid items-center gap-14 lg:grid-cols-2 ${s.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <span className="eyebrow-emerald">{s.eyebrow}</span>
              <h2 className="mt-4 flex items-center gap-3 font-display text-3xl font-bold sm:text-4xl">
                <span className="text-pulse">{s.icon}</span> {s.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-6 space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaLink to="/contact">{s.cta}</CtaLink>
              </div>
            </div>
            <div className="card-surface flex aspect-[4/3] items-center justify-center p-10">
              <div className="text-6xl text-pulse/70">{s.icon}</div>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}