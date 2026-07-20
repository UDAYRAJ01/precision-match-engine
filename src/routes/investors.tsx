import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { PageBanner } from "@/components/site/page-banner";
import bannerInvestors from "@/assets/banner-investors.jpg";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investor Relations | CPR PRAYAS™" },
      { name: "description", content: "Market sizing, SaaS financial model, and Series A capital allocation for a $4.8B global resuscitation MedTech market." },
      { property: "og:title", content: "CPR PRAYAS™ Investor Relations" },
      { property: "og:description", content: "Disrupting the $4.8B global resuscitation MedTech market." },
    ],
  }),
  component: InvestorsPage,
});

const MARKET = [
  ["$4.8B", "Total addressable market", "Global emergency resuscitation equipment and CPR training market expanding across clinical and commercial sectors."],
  ["SaaS + B2B", "Hybrid revenue model", "Upfront hardware sales (45–60% margin) with recurring annual cloud telemetry subscriptions ($120/bed/yr).", true],
  ["ISO 13485", "Certified cleanroom production", "Class 8 cleanroom manufacturing and 100% automated robotic force-calibration testing."],
] as const;

const STREAMS = [
  ["📦", "Hardware sales", "Direct B2B institutional unit sales delivering 45–60% gross margins."],
  ["💻", "Recurring SaaS ARR", "Annual telemetry subscriptions for hospital Code Blue quality auditing and campus safety portals."],
  ["📜", "Consumables & certs", "Sanitized replacement covers and official QR-code digital student certification verification fees."],
];

const ALLOC = [
  ["Clinical trials & regulatory (FDA/CE)", "40%", "text-pulse"],
  ["Automated manufacturing scaling", "30%", "text-emerald"],
  ["Global B2B distribution", "20%", "text-ink"],
  ["R&D next-gen Edge AI", "10%", "text-muted-foreground"],
] as const;

function InvestorsPage() {
  return (
    <>
      <PageBanner
        image={bannerInvestors}
        eyebrow="Capital & growth portal"
        title={<>Disrupting the $4.8B global <span className="text-pulse">resuscitation MedTech market</span></>}
        subtitle="Partner with CPR PRAYAS™ in bringing scalable, high-margin resuscitation guidance technology to worldwide markets."
      />

      <Section surface>
        <div className="grid gap-6 md:grid-cols-3">
          {MARKET.map(([n, t, d, hi]) => (
            <div key={t as string} className={`card-surface p-8 ${hi ? "border-pulse/40 ring-1 ring-pulse/20" : ""}`}>
              <div className={`font-display text-4xl font-bold ${hi ? "text-pulse" : "text-ink"}`}>{n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Monetization" title="Multi-stream financial architecture" subtitle="A highly scalable business built for long-term recurring valuation." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STREAMS.map(([icon, t, d]) => (
            <div key={t} className="card-surface p-8">
              <div className="text-3xl">{icon}</div>
              <h4 className="mt-4 font-display text-lg font-semibold">{t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface>
        <div className="card-surface grid gap-10 p-10 md:grid-cols-2 md:p-14">
          <div>
            <span className="eyebrow">Series A financing round</span>
            <h3 className="mt-4 font-display text-3xl font-bold">Strategic capital deployment</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Growth capital accelerates global clinical validation trials, scales automated
              robotic manufacturing, and expands international distribution across APAC, EMEA,
              and North America.
            </p>
            <div className="mt-8">
              <CtaLink to="/contact">Request investor deck & data room</CtaLink>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            {ALLOC.map(([label, pct, color]) => (
              <div key={label} className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
                <span className="text-sm">{label}</span>
                <strong className={`font-display text-lg ${color}`}>{pct}</strong>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}