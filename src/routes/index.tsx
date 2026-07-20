import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Wifi,
  Activity,
  Waves,
  AlertTriangle,
  Timer,
  TrendingDown,
  Gauge,
  Volume2,
  BatteryCharging,
  Radio,
  CloudUpload,
  GraduationCap,
  Building2,
  Plane,
  School,
  Hotel,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import heroDevice from "@/assets/hero-banner.jpg";
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

      {/* Impact strip */}
      <section className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-surface/40 p-6 md:grid-cols-4 md:p-8">
        {[
          { k: "700K+", v: "SCA deaths / year in India", i: AlertTriangle },
          { k: "< 10%", v: "Out-of-hospital survival today", i: TrendingDown },
          { k: "2–3×", v: "Survival with quality CPR", i: HeartPulse },
          { k: "< 4 min", v: "Window to prevent brain damage", i: Timer },
        ].map(({ k, v, i: Icon }) => (
          <div key={v} className="flex flex-col items-start gap-2">
            <Icon className="h-5 w-5 text-pulse" />
            <div className="font-display text-2xl font-bold md:text-3xl">{k}</div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {v}
            </div>
          </div>
        ))}
      </section>

      {/* The Problem */}
      <section className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <span className="eyebrow"><span className="pulse-dot" /> The problem</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Every second without a heartbeat costs a life.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Sudden Cardiac Arrest strikes without warning — in homes, offices,
            gyms and public spaces. Bystanders panic, compressions are too
            shallow or too slow, and survival drops 10% every minute help is
            delayed.
          </p>
        </div>
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {[
            {
              t: "Untrained bystanders freeze",
              d: "Fewer than 2 in 10 SCA victims receive any bystander CPR.",
            },
            {
              t: "Compressions are poor quality",
              d: "Depth, rate and recoil rarely meet AHA guidelines without feedback.",
            },
            {
              t: "No data reaches clinicians",
              d: "Emergency teams arrive blind — no record of what happened.",
            },
            {
              t: "AEDs alone aren't enough",
              d: "AEDs shock rhythms; only continuous quality CPR keeps blood flowing.",
            },
          ].map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-emerald">How it works</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            From panic to protocol in seconds.
          </h2>
          <p className="mt-5 text-muted-foreground">
            One-button activation. Multi-sensory guidance. Automatic reporting.
          </p>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Grab & place", d: "Snap PRAYAS onto the chest — the contour locks correct hand position.", i: HeartPulse },
            { n: "02", t: "Power on", d: "One press starts a real-time metronome and voice coaching.", i: Volume2 },
            { n: "03", t: "Compress with feedback", d: "LED ring, haptics and voice keep depth 5–6 cm and rate 100–120/min.", i: Gauge },
            { n: "04", t: "Auto-report", d: "Session syncs to Connect — PDF debrief and compliance log.", i: CloudUpload },
          ].map(({ n, t, d, i: Icon }) => (
            <li key={n} className="relative rounded-3xl border border-border bg-surface/50 p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold tracking-widest text-pulse">{n}</span>
                <Icon className="h-5 w-5 text-pulse" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <CtaLink to="/how-to-use" variant="outline">Full step-by-step guide <ArrowRight className="h-4 w-4" /></CtaLink>
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

      {/* Feature grid */}
      <section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow"><span className="pulse-dot" /> What's inside</span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Engineered for the worst 10 minutes of someone's life.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Every subsystem is designed for reliability under stress — resistant
            to sweat, blood, tremor and untrained hands.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { i: Gauge, t: "±1 mm depth precision", d: "Load-cell + IMU fusion tracks every compression to sub-millimeter accuracy." },
            { i: Volume2, t: "Trilingual voice coach", d: "English, Hindi and regional prompts guide untrained bystanders through every step." },
            { i: Radio, t: "Bluetooth 5.3 + LTE-M", d: "Streams live telemetry to Connect and to arriving EMS teams." },
            { i: BatteryCharging, t: "12-month standby", d: "USB-C, defibrillator-safe and IP67 rated for any deployment." },
            { i: ShieldCheck, t: "AHA 2025 aligned", d: "Depth, rate, recoil and fraction targets validated against the latest guidelines." },
            { i: GraduationCap, t: "Built-in training mode", d: "Simulated cycles with scoring — turn every fire drill into CPR practice." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-surface/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-emerald">Built for every environment</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Wherever hearts stop, PRAYAS belongs.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            { i: Building2, t: "Hospitals & EMS", d: "Code Blue teams, ambulances, ICUs." , to: "/applications" as const },
            { i: Hotel, t: "Hotels & venues", d: "Guest safety, staff readiness, brand trust.", to: "/hotels" as const },
            { i: School, t: "Schools & campuses", d: "Sports fields, dorms, staff rooms.", to: "/applications" as const },
            { i: Plane, t: "Transit & aviation", d: "Airports, metros, long-haul flights.", to: "/applications" as const },
          ].map(({ i: Icon, t, d, to }) => (
            <Link
              key={t}
              to={to}
              className="group flex flex-col rounded-3xl border border-border bg-surface/40 p-6 transition-colors hover:border-pulse/50 hover:bg-surface"
            >
              <Icon className="h-6 w-6 text-pulse" />
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-pulse">
                Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> What clinicians say</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Trusted by teams who cannot afford to miss.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              q: "PRAYAS turned our Code Blue drills into measurable science. Every compression is now logged.",
              n: "Dr. Anjali Mehta",
              r: "Head of Emergency Medicine",
            },
            {
              q: "Our front-desk staff went from nervous to confident in a single training session with the device.",
              n: "Rohan Kapoor",
              r: "GM, 5-star hotel group",
            },
            {
              q: "The best resuscitation coach we've deployed on ambulances. Data-driven and utterly reliable.",
              n: "Sameer Iyer",
              r: "Director, Urban EMS",
            },
          ].map((t) => (
            <figure key={t.n} className="flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8">
              <Quote className="h-6 w-6 text-pulse" />
              <blockquote className="mt-4 text-base leading-relaxed text-ink">"{t.q}"</blockquote>
              <figcaption className="mt-auto pt-6">
                <div className="font-display font-semibold">{t.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow-emerald">Questions we hear</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Straight answers before you deploy.
          </h2>
          <p className="mt-6 text-muted-foreground">
            More on procurement, service, and clinical validation on the FAQ page.
          </p>
          <CtaLink to="/faq" variant="outline" className="mt-6">Read the full FAQ</CtaLink>
        </div>
        <div className="space-y-3 md:col-span-7">
          {[
            { q: "Do untrained bystanders really use it correctly?", a: "Yes. Voice + LED + haptics coach depth and rate; no CPR training required." },
            { q: "Is it safe with an AED?", a: "PRAYAS is defibrillator-safe and pauses guidance automatically during shock delivery." },
            { q: "How is data protected?", a: "Sessions are encrypted end-to-end and stored on ISO 27001 compliant infrastructure." },
            { q: "What's the maintenance overhead?", a: "USB-C monthly top-up, quarterly visual inspection. Self-test runs on every power-on." },
          ].map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-surface/50 p-5 open:bg-surface">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-base font-semibold text-ink">{f.q}</span>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-pulse transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Newsroom / momentum */}
      <section className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 md:p-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow"><span className="pulse-dot" /> Momentum</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Backed by clinicians, engineers and institutions.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink to="/clinical-validation" variant="outline">Clinical validation</CtaLink>
            <CtaLink to="/patents" variant="outline">IP & patents</CtaLink>
            <CtaLink to="/investors" variant="outline">Investors</CtaLink>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { k: "R² = 0.984", v: "vs gold-standard manikin" },
            { k: "3 patents", v: "filed & pending" },
            { k: "AHA 2025", v: "guideline aligned" },
            { k: "IIT + BIRAC", v: "incubated & supported" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="font-display text-xl font-bold text-pulse md:text-2xl">{s.k}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
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
