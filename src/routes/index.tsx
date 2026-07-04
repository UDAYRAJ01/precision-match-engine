import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Activity, ShieldCheck, Wifi } from "lucide-react";
import { Section, SectionHeader, DeviceMock } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, color-mix(in oklch, var(--pulse) 12%, transparent), transparent 70%), radial-gradient(50% 50% at 10% 90%, color-mix(in oklch, var(--emerald) 10%, transparent), transparent 70%)",
          }}
        />
        <div className="container-page grid gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <span className="eyebrow"><span className="pulse-dot" /> MedTech Innovation Platform</span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Every second matters.
              <br />
              <span className="text-pulse">Every compression counts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CPR PRAYAS™ is an intelligent real-time CPR guidance ecosystem delivering
              clinical-grade resuscitation feedback during Sudden Cardiac Arrest —
              engineered for healthcare teams, first responders, and everyday bystanders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink to="/contact">Request live demo <ArrowRight className="h-4 w-4" /></CtaLink>
              <CtaLink to="/technology" variant="outline">Explore the technology</CtaLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-xs font-medium text-muted-foreground">
              <span>Engineered to AHA 2025 Guidelines</span>
              <span className="text-pulse">•</span>
              <span>Dual Adult & Infant modes</span>
              <span className="text-pulse">•</span>
              <span>Cloud resuscitation telemetry</span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <DeviceMock />
            <div className="mt-4 rounded-xl border border-emerald/25 bg-emerald/8 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-emerald">
              Real-time multi-sensor feedback
            </div>
          </div>
        </div>
      </section>

      {/* Trust / accreditation strip */}
      <div className="border-y border-border bg-surface">
        <div className="container-page grid grid-cols-2 gap-4 py-6 text-sm font-semibold text-ink md:grid-cols-4">
          <span>🏛️ IIT MedTech Incubation</span>
          <span>🧬 BIRAC Supported</span>
          <span>🏅 Startup India Flagship</span>
          <span>🛡️ ISO 13485 Certified</span>
        </div>
      </div>

      {/* Reality gap metrics */}
      <Section id="problem" bordered={false}>
        <SectionHeader
          eyebrow="The reality gap"
          title="Sudden cardiac arrest claims 6M+ lives every year"
          subtitle="The barrier to survival isn't willingness — it's the absence of real-time feedback during compressions."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: "< 10%", l: "Global out-of-hospital SCA survival rate", d: "Without immediate high-quality CPR, survival drops by 10% every minute." },
            { n: "70%", l: "Of unguided CPR compressions fail", d: "Rescuers compress too shallowly or fatigue within 60 seconds without guidance." },
            { n: "2.5×", l: "Increase in survival with audio guidance", d: "Real-time depth and rate cues dramatically improve return of spontaneous circulation.", highlight: true },
          ].map((m) => (
            <div key={m.l} className={`card-surface p-8 ${m.highlight ? "border-pulse/40 ring-1 ring-pulse/20" : ""}`}>
              <div className={`font-display text-5xl font-bold tracking-tight ${m.highlight ? "text-pulse" : "text-ink"}`}>{m.n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{m.l}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ecosystem */}
      <Section id="ecosystem" surface>
        <SectionHeader
          eyebrow="The platform"
          title="A connected resuscitation ecosystem"
          subtitle="More than a device — hardware, mobile, and cloud analytics designed for universal readiness."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: <HeartPulse className="h-6 w-6" />, name: "CPR PRAYAS™ One", desc: "Ultra-portable pocket CPR audio feedback device for bystanders, transit, hotels, and first-aid kits.", to: "/products" },
            { icon: <ShieldCheck className="h-6 w-6" />, name: "CPR PRAYAS™ Pro", desc: "Clinical-grade system with 360° RGB LED force rings, 360J shock immunity, and live Wi-Fi telemetry.", to: "/products", featured: true },
            { icon: <Wifi className="h-6 w-6" />, name: "CPR PRAYAS™ Connect", desc: "Companion mobile app relaying live CPR waveforms, dispatcher links, and training analytics via BLE 5.2.", to: "/products" },
          ].map((p) => (
            <div key={p.name} className={`card-surface flex flex-col p-8 ${p.featured ? "border-pulse/50 ring-1 ring-pulse/20" : ""}`}>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pulse/10 text-pulse">
                {p.icon}
              </div>
              {p.featured && <span className="eyebrow mb-2 self-start">Clinical grade</span>}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <CtaLink to={p.to} variant="outline" className="mt-6 self-start">Learn more</CtaLink>
            </div>
          ))}
        </div>
      </Section>

      {/* Four steps */}
      <Section>
        <SectionHeader
          eyebrow="How it works"
          title="Four steps to flawless resuscitation"
          subtitle="Intuitive multi-sensory guidance reducing emergency panic."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Instant placement", "Position device on the lower sternum as indicated by alignment icons."],
            ["02", "Follow metronome", "Begin compressions in sync with the clear 110 BPM acoustic pulse."],
            ["03", "Depth correction", "Real-time spoken prompts and LED rings guide exact 5–6 cm depth."],
            ["04", "Chest recoil alert", "Detects incomplete recoil, prompting rescuers to lift for cardiac refill."],
          ].map(([n, t, d]) => (
            <div key={n} className="card-surface p-6">
              <div className="font-display text-xs font-bold tracking-widest text-pulse">STEP {n}</div>
              <h4 className="mt-3 font-display text-base font-semibold">{t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section surface>
        <div className="card-surface flex flex-col items-center gap-6 p-10 text-center md:p-16">
          <Activity className="h-10 w-10 text-pulse" />
          <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Bring standardized resuscitation to your institution.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            Hospitals, school districts, hotel groups, and public transit networks
            partner with CPR PRAYAS™ to elevate every second of care.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink to="/contact">Request institutional demo <ArrowRight className="h-4 w-4" /></CtaLink>
            <CtaLink to="/applications" variant="outline">See deployments</CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
