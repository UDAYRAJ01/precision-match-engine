import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, ShieldCheck, Wifi, Activity, Waves } from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import heroDevice from "@/assets/prayas-device-hero.png";
import productOne from "@/assets/prayas-device-front.png";
import productPro from "@/assets/prayas-device-side.png";
import productConnect from "@/assets/product-connect.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="container-page space-y-24 py-16 md:py-24">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pulse/25 bg-surface px-3 py-1">
          <span className="pulse-dot" />
          <span className="font-display text-xs font-medium uppercase tracking-wider text-pulse">
            Clinical Grade MedTech
          </span>
        </div>

        <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
          Intelligent CPR
          <br />
          <span className="bg-gradient-to-r from-emerald to-pulse bg-clip-text text-transparent">
            Guidance Systems.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Precision metronome, depth feedback, and real-time analytics engineered for
          professional responders. CPR PRAYAS™ bridges the gap between effort and outcomes.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CtaLink to="/contact" className="shadow-[0_0_28px_color-mix(in_oklch,var(--pulse)_35%,transparent)]">
            Request demo <ArrowRight className="h-4 w-4" />
          </CtaLink>
          <CtaLink to="/products" variant="outline">View products</CtaLink>
        </div>
        <div className="relative mt-16 w-full max-w-5xl">
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-pulse/20 via-transparent to-emerald/20 blur-3xl" />
          <img
            src={heroDevice}
            alt="CPR PRAYAS™ intelligent guidance device with glowing feedback ring"
            width={1600}
            height={1200}
            className="relative w-full rounded-3xl border border-border shadow-2xl"
          />
        </div>
      </section>

      {/* Bento grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* PRAYAS ONE — large */}
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 md:col-span-8">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-pulse">
              <HeartPulse className="h-4 w-4" /> PRAYAS ONE
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold">The Core Guidance Device</h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Single-responder pocket device with high-fidelity haptic feedback, 110 BPM
              metronome, and visual depth indicators. IP67, defibrillator-safe.
            </p>
            <CtaLink to="/products" variant="outline" className="mt-6">Learn more</CtaLink>
          </div>
          <img
            src={productOne}
            alt="CPR PRAYAS™ One pocket device"
            loading="lazy"
            width={1200}
            height={1200}
            className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 rounded-3xl object-cover opacity-90 shadow-xl md:h-72 md:w-72"
          />
        </div>

        {/* PRO */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface/60 md:col-span-4">
          <img
            src={productPro}
            alt="CPR PRAYAS™ Pro clinical device"
            loading="lazy"
            width={1200}
            height={1200}
            className="h-48 w-full object-cover"
          />
          <div className="p-8">
            <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-pulse">
              <ShieldCheck className="h-4 w-4" /> PRO
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold">Enterprise Fleet</h3>
            <p className="mt-4 text-muted-foreground">
              Centralized management for hospital departments, Code Blue teams, and EMS
              services with 360° LED rings and live telemetry.
            </p>
          </div>
        </div>

        {/* CONNECT — inverted card */}
        <div className="relative overflow-hidden rounded-3xl bg-pulse p-8 text-pulse-foreground md:col-span-4">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest opacity-80">
              <Wifi className="h-4 w-4" /> CONNECT
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold">Cloud Analytics</h3>
            <p className="mt-4 font-medium">
              Post-event debriefing with automated PDF reporting and AHA 2025
              compliance tracking across your entire fleet.
            </p>
          </div>
          <img
            src={productConnect}
            alt="CPR PRAYAS™ Connect app"
            loading="lazy"
            width={1200}
            height={1200}
            className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-3xl object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        {/* Clinical Accuracy */}
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 md:col-span-8 md:flex-row">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-pulse">
              <Waves className="h-4 w-4" /> CLINICAL ACCURACY
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold">Validated to gold standard</h3>
            <p className="mt-4 text-muted-foreground">
              Validated against gold-standard manikins with ±2 mm depth precision and
              sub-millisecond rhythm tracking across rigid floors and hospital mattresses.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 md:w-auto">
            <div className="rounded-2xl border border-border bg-background/50 p-6">
              <div className="font-display text-3xl font-bold text-pulse">98%</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Accuracy
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/50 p-6">
              <div className="font-display text-3xl font-bold text-pulse">2.5×</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Survival ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-surface/40 p-8 text-center md:grid-cols-4">
        {[
          "AHA 2025 Aligned",
          "ISO 13485",
          "BIRAC Supported",
          "IIT MedTech Incubation",
        ].map((l) => (
          <div key={l} className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {l}
          </div>
        ))}
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-surface-elevated to-surface p-12 md:p-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pulse/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald/20 blur-3xl" />
        <div className="relative z-10 flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <Activity className="h-5 w-5 text-pulse" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-pulse">
                Institutional deployment
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Ready to modernize your emergency response?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Join leading hospitals, school districts, hotel groups, and transit networks
              using CPR PRAYAS™ to save lives through data-driven resuscitation.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <CtaLink to="/contact">Contact sales <ArrowRight className="h-4 w-4" /></CtaLink>
            <CtaLink to="/applications" variant="outline">See deployments</CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
}
