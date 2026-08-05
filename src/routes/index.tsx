import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Wifi,
  Activity,
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
  Play,
  Layers,
  Droplets,
  Users,
  Stethoscope,
  Ambulance,
  Briefcase,
} from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import heroDevice from "@/assets/hero-banner.jpg";
import { useCmsContent } from "@/hooks/use-cms";
import productOne from "@/assets/prayas-device-front.png";
import productPro from "@/assets/prayas-device-side.png";
import productConnect from "@/assets/product-connect.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { get } = useCmsContent("home");
  const hero = get("hero", {
    eyebrow: "Smart CPR Guidance Device",
    title: "CPR PRAYAS™",
    subtitle: "A Smart Device That Helps Save Lives During Cardiac Arrest",
    description:
      "When someone's heart suddenly stops, every second matters. CPR PRAYAS™ guides you step by step to perform the right CPR with voice instructions, light signals, and vibration feedback—so even in a stressful situation, you can give better CPR until medical help arrives.",
    image: heroDevice,
  });

  return (
    <div className="container-page space-y-16 py-10 sm:space-y-20 sm:py-16 md:space-y-24 md:py-24">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center">
        <span className="app-chip order-1">
          <span className="pulse-dot" />
          {hero.eyebrow}
        </span>

        <h1 className="h-display order-3 mt-6 sm:order-2 sm:mt-8">
          {hero.title ? (
            <span className="bg-gradient-to-r from-emerald to-pulse bg-clip-text text-transparent">
              {hero.title}
            </span>
          ) : (
            <>
              Intelligent CPR
              <br />
              <span className="bg-gradient-to-r from-emerald to-pulse bg-clip-text text-transparent">
                Guidance Systems.
              </span>
            </>
          )}
        </h1>

        <p className="text-lede order-4 mt-6 max-w-3xl sm:order-3 sm:mt-8">
          {hero.subtitle}
        </p>

        {hero.description && (
          <p className="order-5 mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:order-4">
            {hero.description}
          </p>
        )}

        <div className="order-6 mt-8 flex w-full flex-col gap-3 sm:order-5 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
          <CtaLink
            to="/how-to-use"
            className="justify-center shadow-[0_0_28px_color-mix(in_oklch,var(--pulse)_35%,transparent)]"
          >
            <Play className="h-4 w-4" /> Watch How It Works
          </CtaLink>
          <CtaLink
            to="/products"
            variant="outline"
            className="justify-center"
          >
            View Products
          </CtaLink>
        </div>

        <div className="relative order-2 mt-6 w-full max-w-5xl sm:order-6 sm:mt-16">
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-pulse/20 via-transparent to-emerald/20 blur-3xl sm:-inset-8" />
          <img
            src={hero.image}
            alt="CPR PRAYAS™ intelligent guidance device with glowing feedback ring"
            width={1600}
            height={1200}
            className="relative w-full rounded-2xl border border-border shadow-2xl sm:rounded-3xl"
          />
        </div>
      </section>

      {/* Every Minute Counts */}
      <section className="app-card grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6 md:grid-cols-4 md:p-8">
        {[
          {
            k: "700,000+",
            v: "People die from Sudden Cardiac Arrest every year in India.",
            i: AlertTriangle,
          },
          {
            k: "Less than 10%",
            v: "People survive when CPR is delayed.",
            i: TrendingDown,
          },
          {
            k: "2–3 Times",
            v: "Better chances with good quality CPR.",
            i: HeartPulse,
          },
          {
            k: "Within 4 Minutes",
            v: "The brain starts getting damaged if blood flow doesn't return.",
            i: Timer,
          },
        ].map(({ k, v, i: Icon }) => (
          <div
            key={v}
            className="flex flex-col items-start gap-1.5 rounded-2xl bg-background/30 p-3 sm:gap-2 sm:bg-transparent sm:p-0"
          >
            <Icon className="h-4 w-4 text-pulse sm:h-5 sm:w-5" />
            <div className="font-display text-xl font-bold sm:text-2xl md:text-3xl">
              {k}
            </div>
            <div className="text-[0.65rem] font-medium uppercase leading-snug tracking-wider text-muted-foreground sm:text-xs">
              {v}
            </div>
          </div>
        ))}
      </section>

      {/* Why Is This Needed */}
      <section className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <span className="eyebrow">
            <span className="pulse-dot" /> Why Is This Needed?
          </span>
          <h2 className="h-section mt-4">
            When someone suddenly collapses because of cardiac arrest, most
            people don't know what to do.
          </h2>
          <p className="text-lede mt-5">
            People panic. CPR is often done incorrectly. Emergency teams don't
            know what happened before they arrive. That's why CPR PRAYAS™ was
            created.
          </p>
        </div>
        <div className="grid gap-3 sm:gap-4 md:col-span-7 md:grid-cols-2">
          {[
            {
              t: "Most people don't know CPR",
              d: "Many people want to help but don't know how.",
              i: Users,
            },
            {
              t: "CPR is often done incorrectly",
              d: "Pressing too fast, too slow, too hard or too softly reduces the chances of survival.",
              i: Activity,
            },
            {
              t: "Doctors don't know what happened",
              d: "There is usually no record of CPR before the ambulance arrives.",
              i: Stethoscope,
            },
            {
              t: "AED alone is not enough",
              d: "An AED helps only in certain situations. Continuous, good-quality CPR is still the most important part of saving a life.",
              i: HeartPulse,
            },
          ].map((p) => (
            <div key={p.t} className="app-card p-5 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pulse/12 text-pulse">
                <p.i className="h-5 w-5" />
              </div>
              <h3 className="h-card mt-4 text-ink">{p.t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How CPR PRAYAS™ Works */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-emerald">How It Works</span>
          <h2 className="h-section mt-4">How CPR PRAYAS™ Works</h2>
          <p className="text-lede mt-4">
            Simple steps that guide anyone to give better CPR when every second
            counts.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-14 md:grid-cols-4">
          {[
            {
              n: "Step 1",
              t: "Place the Device",
              d: "Simply place PRAYAS™ on the person's chest where instructed.",
              i: HeartPulse,
            },
            {
              n: "Step 2",
              t: "Press the Power Button",
              d: "The device immediately starts giving voice instructions and a CPR rhythm.",
              i: Volume2,
            },
            {
              n: "Step 3",
              t: "Follow the Guidance",
              d: "The lights, voice and vibration tell you how fast and how deep to press. You don't have to guess.",
              i: Gauge,
            },
            {
              n: "Step 4",
              t: "Save the Report",
              d: "After CPR, the session is automatically saved so hospitals and trainers can review it later.",
              i: CloudUpload,
            },
          ].map(({ n, t, d, i: Icon }) => (
            <li key={n} className="app-card p-5 sm:p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold tracking-widest text-pulse">
                  {n}
                </span>
                <Icon className="h-5 w-5 text-pulse" />
              </div>
              <h3 className="h-card mt-5">{t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Meet the Products */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="pulse-dot" /> Our Products
          </span>
          <h2 className="h-section mt-4">Meet the Products</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* PRAYAS ONE */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 md:col-span-7">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-pulse">
                <HeartPulse className="h-4 w-4" /> CPR PRAYAS™ ONE
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold">
                Compact CPR Guidance Device
              </h3>
              <p className="mt-4 max-w-md text-muted-foreground">
                A compact CPR guidance device for hospitals, ambulances, offices,
                schools and public places.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {[
                  "Voice guidance",
                  "CPR rhythm",
                  "Compression feedback",
                  "Easy one-button operation",
                  "Portable design",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald" />
                    {item}
                  </li>
                ))}
              </ul>
              <CtaLink to="/products" variant="outline" className="mt-6">
                Learn More
              </CtaLink>
            </div>
            <img
              src={productOne}
              alt="CPR PRAYAS™ One pocket device"
              loading="lazy"
              width={1200}
              height={1200}
              className="pointer-events-none absolute -bottom-8 -right-8 h-56 w-56 rounded-3xl object-cover opacity-90 shadow-xl md:h-64 md:w-64"
            />
          </div>

          {/* PRAYAS PRO */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface/60 md:col-span-5">
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
                <ShieldCheck className="h-4 w-4" /> CPR PRAYAS™ PRO
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold">
                For Professionals
              </h3>
              <p className="mt-4 text-muted-foreground">
                Designed for hospitals, emergency teams and ambulance services.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {[
                  "Live monitoring",
                  "Team management",
                  "Advanced reporting",
                  "Multi-device support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRAYAS CONNECT */}
          <div className="relative overflow-hidden rounded-3xl bg-pulse p-8 text-pulse-foreground md:col-span-12">
            <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest opacity-80">
                  <Wifi className="h-4 w-4" /> CPR PRAYAS™ CONNECT
                </div>
                <h3 className="mt-3 font-display text-3xl font-bold">
                  Cloud Platform
                </h3>
                <p className="mt-4 font-medium">
                  A cloud platform that stores CPR sessions and creates automatic
                  reports for hospitals and organizations.
                </p>
                <CtaLink to="/products" variant="outline" className="mt-6">
                  Explore Products
                </CtaLink>
              </div>
              <img
                src={productConnect}
                alt="CPR PRAYAS™ Connect app"
                loading="lazy"
                width={1200}
                height={1200}
                className="pointer-events-none h-56 w-full rounded-3xl object-cover opacity-60 mix-blend-luminosity md:h-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CPR PRAYAS™ */}
      <section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">
              <span className="pulse-dot" /> Why Choose Us
            </span>
            <h2 className="h-section mt-4">Why Choose CPR PRAYAS™?</h2>
          </div>
          <p className="text-lede max-w-md">
            Built to turn bystanders into confident responders and help teams
            perform better CPR.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-10 md:grid-cols-3">
          {[
            {
              i: Gauge,
              t: "Helps You Perform Better CPR",
              d: "Guides you through every compression.",
            },
            {
              i: Volume2,
              t: "Easy Voice Instructions",
              d: "Available in English, Hindi and regional languages.",
            },
            {
              i: Building2,
              t: "Works Anywhere",
              d: "Suitable for hospitals, schools, hotels, offices, factories and public places.",
            },
            {
              i: BatteryCharging,
              t: "Long Battery Life",
              d: "Ready whenever an emergency happens.",
            },
            {
              i: Droplets,
              t: "Built for Real Emergencies",
              d: "Water resistant, durable and safe to use with AEDs.",
            },
            {
              i: GraduationCap,
              t: "Practice Anytime",
              d: "Training mode helps staff and students learn CPR with confidence.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="app-card p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pulse/12 text-pulse">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="h-card mt-4">{t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Where Can It Be Used */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-emerald">Applications</span>
          <h2 className="h-section mt-4">Where Can It Be Used?</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-12 md:grid-cols-4">
          {[
            {
              i: Building2,
              t: "Hospitals & Ambulances",
              d: "Support doctors, nurses and emergency teams during CPR.",
              to: "/applications" as const,
            },
            {
              i: Hotel,
              t: "Hotels & Corporate Offices",
              d: "Protect guests and employees during medical emergencies.",
              to: "/hotels" as const,
            },
            {
              i: School,
              t: "Schools & Colleges",
              d: "Improve campus safety for students, teachers and sports events.",
              to: "/applications" as const,
            },
            {
              i: Plane,
              t: "Airports, Metro & Public Transport",
              d: "Be prepared for emergencies in crowded public spaces.",
              to: "/applications" as const,
            },
          ].map(({ i: Icon, t, d, to }) => (
            <Link
              key={t}
              to={to}
              className="app-card group flex flex-col p-5 transition-colors hover:border-pulse/50 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pulse/12 text-pulse">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="h-card mt-4">{t}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {d}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-widest text-pulse">
                Explore{" "}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="pulse-dot" /> Testimonials
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            What Our Users Say
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              q: "Our emergency team performs CPR with much more confidence now.",
              n: "Dr. Anjali Mehta",
              r: "Emergency Physician",
            },
            {
              q: "Even staff with no medical background learned CPR much faster.",
              n: "Rohan Kapoor",
              r: "Hotel General Manager",
            },
            {
              q: "A simple device that makes a big difference during emergencies.",
              n: "Sameer Iyer",
              r: "EMS Director",
            },
          ].map((t) => (
            <figure
              key={t.n}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8"
            >
              <Quote className="h-6 w-6 text-pulse" />
              <blockquote className="mt-4 text-base leading-relaxed text-ink">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-auto pt-6">
                <div className="font-display font-semibold">{t.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t.r}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow-emerald">FAQ</span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-muted-foreground">
            Quick answers to common questions. Read the full FAQ for more
            details.
          </p>
          <CtaLink to="/faq" variant="outline" className="mt-6">
            Read Full FAQ
          </CtaLink>
        </div>
        <div className="space-y-3 md:col-span-7">
          {[
            {
              q: "Can someone without CPR training use it?",
              a: "Yes. The device gives simple voice instructions throughout the CPR process.",
            },
            {
              q: "Can it be used with an AED?",
              a: "Yes. It is designed to work safely alongside AEDs.",
            },
            {
              q: "Is the data secure?",
              a: "Yes. All reports are stored securely.",
            },
            {
              q: "Does it require regular maintenance?",
              a: "Very little. It is designed for easy maintenance and long-term use.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-surface/50 p-5 open:bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-base font-semibold text-ink">
                  {f.q}
                </span>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-pulse transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 md:p-12">
        <div className="text-center">
          <span className="eyebrow">
            <span className="pulse-dot" /> Trusted By
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by Experts and Institutions
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { t: "Clinical Experts", i: Stethoscope },
            { t: "Research Institutions", i: GraduationCap },
            { t: "Hospitals", i: Building2 },
            { t: "Emergency Response Teams", i: Ambulance },
            { t: "MedTech Innovation Programs", i: Briefcase },
          ].map(({ t, i: Icon }) => (
            <div
              key={t}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background/60 p-5 text-center"
            >
              <Icon className="h-6 w-6 text-pulse" />
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t}
              </div>
            </div>
          ))}
        </div>
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
                Ready to Save More Lives?
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Whether you're a hospital, school, hotel, office, factory or
              emergency service.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              CPR PRAYAS™ helps your team respond faster and perform better CPR
              when every second matters.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <CtaLink to="/contact">
              Contact Sales <ArrowRight className="h-4 w-4" />
            </CtaLink>
            <CtaLink to="/demo" variant="outline">
              Request a Demo
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
}
