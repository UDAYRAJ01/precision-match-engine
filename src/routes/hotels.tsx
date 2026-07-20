import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { PageBanner } from "@/components/site/page-banner";
import bannerHotels from "@/assets/banner-hotels.jpg";
import {
  Check,
  AlertTriangle,
  Hotel,
  Radio,
  Volume2,
  MapPin,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Building2,
  ArrowDown,
  Award,
  Cpu,
  Activity,
  BadgeCheck,
} from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/hotels")({
  head: () => ({
    meta: [
      { title: "Hotel Safety | CPR PRAYAS™ Hospitality Emergency Response" },
      { name: "description", content: "Revolutionizing emergency response in hotels. PRAYAS CPR Audio Feedback Device for guest and staff safety across reception, gym, pool, banquet, and conference areas." },
      { property: "og:title", content: "PRAYAS Hospitality Safety" },
      { property: "og:description", content: "Guided CPR support for hotel teams during the first critical minutes of a medical emergency." },
    ],
  }),
  component: HotelsPage,
});

function HotelsPage() {
  return (
    <>
      <PageBanner
        image={bannerHotels}
        eyebrow="Hospitality safety"
        title={<>Revolutionizing emergency response <span className="text-pulse">in hotels</span></>}
        subtitle="A professional PRAYAS pitch for guest and staff safety — helping hotels respond confidently during the first critical minutes of a medical emergency through guided CPR support."
      />
      <Section bordered={false}>
        <div className="flex justify-center">
          <CtaLink to="/contact">Request hotel demo</CtaLink>
        </div>
      </Section>

      {/* 01 - CHALLENGE */}
      <SectionBlock
        n="01"
        eyebrow="The hospitality challenge"
        title="Hotel emergency response challenge"
        surface
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 text-pulse">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">What needs to improve</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Hotels operate 24×7 with guests spread across guest rooms,
              restaurants, banquet halls, swimming pools, fitness centers, spas,
              conference rooms, and public spaces. During a medical emergency,
              every second matters — yet trained responders and medical teams
              may not be immediately available.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A structured emergency response system helps staff act confidently
              until professional medical responders arrive.
            </p>
          </div>
          <BulletCard
            title="Current challenges"
            items={[
              "Medical emergencies can occur anywhere on premises",
              "Different departments must coordinate quickly",
              "Staff confidence varies during emergencies",
              "Ambulance response may take several minutes",
              "Guest safety directly influences hotel reputation",
              "Prepared hotels build trust with guests & corporate clients",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 02 - WHY PRAYAS FITS */}
      <SectionBlock
        n="02"
        eyebrow="Operational fit"
        title="Why PRAYAS fits hotel operations"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 text-pulse">
              <Hotel className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">PRAYAS fit</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              PRAYAS is a CPR Audio Feedback Device designed to support trained
              hotel staff during the first critical minutes of a cardiac
              emergency. It provides step-by-step voice guidance, helping
              responders maintain proper CPR rhythm and compression quality
              while waiting for emergency medical services.
            </p>
            <p className="mt-4 rounded-xl border border-border/60 bg-background/60 p-4 text-sm italic text-muted-foreground">
              "A simple tool for the first critical minutes — improving
              confidence, consistency, and emergency readiness without replacing
              certified medical response."
            </p>
          </div>
          <BulletCard
            title="Key advantages"
            items={[
              "Guided CPR technique",
              "Audio-assisted instructions",
              "Real-time compression feedback",
              "Easy operation after basic training",
              "Supports hotel emergency SOPs",
              "Improves team coordination",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 03 - INTRODUCING PRAYAS */}
      <SectionBlock
        n="03"
        eyebrow="The device"
        title="Introducing PRAYAS"
        subtitle="CPR Audio Feedback Device designed for guided emergency support."
        surface
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <FeatureCard
            icon={<Volume2 className="h-6 w-6" />}
            title="Real-time guidance"
            body="Voice prompts guide responders through correct CPR rhythm and compression quality."
          />
          <FeatureCard
            icon={<Radio className="h-6 w-6" />}
            title="Portable support"
            body="Compact design for easy storage, transportation, and rapid deployment anywhere in the hotel."
          />
          <FeatureCard
            icon={<GraduationCap className="h-6 w-6" />}
            title="Training ready"
            body="Simple enough to become part of routine staff emergency preparedness programs."
          />
        </div>
        <div className="mt-8">
          <BulletCard
            title="Recommended placement"
            columns={2}
            items={[
              "Front Desk",
              "Reception",
              "Security Office",
              "Lobby",
              "Gym",
              "Swimming Pool",
              "Banquet Hall",
              "Conference Area",
              "Restaurant",
              "Spa",
              "Staff Medical Room",
              "Concierge",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 04 - WORKFLOW */}
      <SectionBlock
        n="04"
        eyebrow="Response workflow"
        title="Hotel emergency response workflow"
        subtitle="How PRAYAS supports staff during the first critical minutes."
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {WORKFLOW.map((step, i) => (
            <div key={step.title}>
              <div className="card-surface flex items-start gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pulse text-pulse-foreground font-display font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
              {i < WORKFLOW.length - 1 && (
                <div className="flex justify-center py-2 text-muted-foreground">
                  <ArrowDown className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          <p className="mt-6 text-center text-sm italic text-muted-foreground">
            PRAYAS provides calm, structured guidance during the most critical
            minutes — without replacing certified medical response.
          </p>
        </div>
      </SectionBlock>

      {/* 05 - BENEFITS */}
      <SectionBlock
        n="05"
        eyebrow="Outcomes"
        title="Benefits for hotels"
        surface
      >
        <div className="grid gap-6 md:grid-cols-3">
          <BenefitCard
            icon={<Users className="h-6 w-6" />}
            audience="Guests"
            title="Safety confidence"
            body="Visible emergency preparedness reassures guests, families, and corporate visitors."
          />
          <BenefitCard
            icon={<ShieldCheck className="h-6 w-6" />}
            audience="Staff"
            title="Clear emergency protocol"
            body="Guided instructions reduce uncertainty and improve confidence during response."
          />
          <BenefitCard
            icon={<Building2 className="h-6 w-6" />}
            audience="Brand"
            title="Stronger duty of care"
            body="Demonstrates commitment to guest wellbeing and responsible hospitality management."
          />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <BulletCard
            title="Brand benefits"
            items={[
              "Enhanced guest trust",
              "Better service quality perception",
              "Stronger brand reputation",
              "Competitive differentiation",
              "Improved guest satisfaction",
              "Supports premium hospitality standards",
            ]}
          />
          <BulletCard
            title="Operational benefits"
            items={[
              "Faster emergency response",
              "Better staff coordination",
              "Consistent CPR guidance",
              "Supports emergency drills",
              "Improved preparedness across departments",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 06 - IMPLEMENTATION */}
      <SectionBlock
        n="06"
        eyebrow="Rollout"
        title="Implementation plan"
        subtitle="Practical steps for successful deployment."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <StepCard
            step="01"
            icon={<MapPin className="h-5 w-5" />}
            title="Place"
            body="Install devices at strategic high-footfall locations."
            items={[
              "Lobby",
              "Reception & Front Desk",
              "Gym & Pool area",
              "Banquet Hall",
              "Restaurant",
              "Conference Rooms",
              "Security & Staff Medical Room",
            ]}
          />
          <StepCard
            step="02"
            icon={<GraduationCap className="h-5 w-5" />}
            title="Train"
            body="CPR awareness and PRAYAS device training for key hotel personnel."
            items={[
              "Front Office & Security",
              "Housekeeping",
              "F&B and Banquet Operations",
              "Recreation & Duty Managers",
              "Engineering Supervisors",
              "Includes drills & simulations",
            ]}
          />
          <StepCard
            step="03"
            icon={<ClipboardCheck className="h-5 w-5" />}
            title="Review"
            body="Maintain readiness through regular inspection and refresher training."
            items={[
              "Monthly device inspection",
              "Battery & accessory checks",
              "Quarterly refresher sessions",
              "Mock emergency drills",
              "Maintenance log updates",
              "SOP compliance reviews",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 07 - RETURN ON VALUE */}
      <SectionBlock
        n="07"
        eyebrow="Return on value"
        title="Why hotels should invest"
        surface
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 text-pulse">
              <Award className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">Value delivered</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              PRAYAS helps hotels strengthen guest safety while supporting staff
              with clear emergency guidance — an investment in preparedness that
              elevates every dimension of hospitality service.
            </p>
          </div>
          <BulletCard
            title="Business outcomes"
            columns={2}
            items={[
              "Better emergency preparedness",
              "Increased guest confidence",
              "Improved staff readiness",
              "Supports ESG & safety initiatives",
              "Enhanced brand reputation",
              "Demonstrates duty of care",
              "Adds value to premium services",
              "Alignment with global standards",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 08 - INSTALLATION LOCATIONS */}
      <SectionBlock
        n="08"
        eyebrow="Coverage map"
        title="Ideal installation locations"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {LOCATIONS.map((loc) => (
            <div key={loc} className="card-surface flex items-center gap-2 px-4 py-3 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-pulse" />
              <span>{loc}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 09 - TRAINING */}
      <SectionBlock
        n="09"
        eyebrow="Enablement"
        title="Training & certification"
        surface
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <BulletCard
            title="Training program"
            items={[
              "CPR fundamentals",
              "Hands-on practice",
              "Device familiarization",
              "Emergency workflow",
              "Mock drills",
              "Refresher training",
            ]}
          />
          <BulletCard
            title="Participants"
            items={[
              "Front Office",
              "Security",
              "Housekeeping",
              "F&B",
              "Banquet",
              "Recreation",
              "Duty Managers",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 10 - CONCLUSION */}
      {/* 10 - COMPETITIVE COMPARISON */}
      <SectionBlock
        n="10"
        eyebrow="Competitive edge"
        title="Why PRAYAS vs. other CPR feedback devices"
        subtitle="How PRAYAS compares to global alternatives like CPRmeter2 and similar imported devices."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse card-surface overflow-hidden">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-6 py-4 font-display text-sm font-semibold">Parameter</th>
                <th className="px-6 py-4 font-display text-sm font-semibold text-pulse">CPR PRAYAS™</th>
                <th className="px-6 py-4 font-display text-sm font-semibold">CPRmeter2 / Imported</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([p, a, b], i) => (
                <tr key={p} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="border-t border-border px-6 py-3.5 text-sm font-semibold">{p}</td>
                  <td className="border-t border-border px-6 py-3.5 text-sm">{a}</td>
                  <td className="border-t border-border px-6 py-3.5 text-sm text-muted-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>

      {/* 11 - CLINICAL ACCURACY */}
      <SectionBlock
        n="11"
        eyebrow="Clinical accuracy"
        title="Is PRAYAS clinically accurate?"
        subtitle="Validated against gold-standard optical displacement encoders across rigid and soft surfaces."
        surface
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["R² = 0.984", "Correlation with gold-standard encoders", "Multi-sensor fusion matches optical reference measurements at p < 0.001."],
            ["±1 mm", "Depth measurement accuracy", "True sternal displacement isolated from soft mattress sag."],
            ["500 Hz", "Sensor sampling rate", "Zero perceptible latency between compression and audio feedback."],
          ].map(([n, t, d]) => (
            <div key={t} className="card-surface p-8 text-center">
              <div className="font-display text-4xl font-bold text-emerald">{n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <BulletCard
            title="Trial highlights"
            columns={2}
            items={[
              "150 rescuers evaluated (clinical nurses, first responders, bystanders)",
              "10-minute continuous CPR simulation protocol",
              "+68% target depth compliance (5–6 cm)",
              "+45% full chest recoil quality",
              "2.5× higher ROSC survival likelihood",
              "Validated on rigid floors and soft hospital mattresses",
            ]}
          />
        </div>
      </SectionBlock>

      {/* 12 - HOW IT WORKS */}
      <SectionBlock
        n="12"
        eyebrow="Technology"
        title="How PRAYAS works"
        subtitle="A four-layer sensing pipeline powered by embedded edge AI."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={<Activity className="h-6 w-6" />}
            title="Piezo-resistive force matrix"
            body="Micro-calibrated pressure sensors measure vertical displacement across a 10–60 kg gradient."
          />
          <FeatureCard
            icon={<Cpu className="h-6 w-6" />}
            title="6-DOF inertial measurement unit"
            body="Dual 3-axis accelerometers track 3D motion vectors for ±1 mm depth precision."
          />
          <FeatureCard
            icon={<Radio className="h-6 w-6" />}
            title="ARM Cortex-M4 processor"
            body="32-bit CPU running custom Kalman filtering at 500 Hz for real-time feedback."
          />
          <FeatureCard
            icon={<Volume2 className="h-6 w-6" />}
            title="Multi-sensory feedback"
            body="Voice prompts, metronome cadence, and LED status guide correct CPR rhythm and depth."
          />
        </div>
      </SectionBlock>

      {/* 13 - STANDARDS & CERTIFICATIONS */}
      <SectionBlock
        n="13"
        eyebrow="Compliance"
        title="Standards, guidelines & certifications"
        subtitle="Aligned with global resuscitation councils and medical device regulations."
        surface
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <BulletCard
            title="Guideline alignment"
            items={[
              "AHA 2025 Guidelines for CPR & ECC",
              "ERC (European Resuscitation Council) 2021+",
              "ILCOR consensus on real-time feedback devices",
              "100–120 BPM metronome cadence (110 BPM optimal)",
              "5.0–6.0 cm compression depth enforcement",
              "Full chest recoil monitoring",
            ]}
          />
          <BulletCard
            title="Regulatory & IP"
            items={[
              "CDSCO (India) medical device registration",
              "CE MDR (EU 2017/745) preparation",
              "US FDA 510(k) pathway in progress",
              "ISO 13485 quality management alignment",
              "IP67 waterproof & dustproof rated",
              "Indian Patent Office specification filed + PCT pending",
            ]}
          />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {["AHA 2025", "ERC 2021", "CDSCO", "CE MDR"].map((b) => (
            <div key={b} className="card-surface flex items-center justify-center gap-2 p-5">
              <BadgeCheck className="h-5 w-5 text-emerald" />
              <span className="font-display text-sm font-semibold">{b}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* 14 - INVESTMENT */}
      <SectionBlock
        n="14"
        eyebrow="Investment"
        title="Pricing & commercial models"
        subtitle="Flexible procurement options for single properties, chains, and enterprise rollouts."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <PriceCard
            tier="PRAYAS One"
            audience="Single property"
            price="Starter"
            features={[
              "Device unit + accessories",
              "IP67 rated hardware",
              "3-year commercial warranty",
              "Basic staff training included",
              "Standard placement kit",
            ]}
          />
          <PriceCard
            tier="PRAYAS Pro"
            audience="Hotel chain / enterprise"
            price="Enterprise"
            highlight
            features={[
              "Fleet deployment (multi-property)",
              "BLE + Wi-Fi telemetry",
              "5-year enterprise warranty",
              "Full staff certification program",
              "Quarterly refresher & drills",
              "Central dashboard & reporting",
            ]}
          />
          <PriceCard
            tier="Custom"
            audience="Group / distributor"
            price="On request"
            features={[
              "Volume pricing & AMC",
              "Co-branded training material",
              "Dedicated account manager",
              "SLA-backed maintenance",
              "Onsite installation support",
            ]}
          />
        </div>
        <p className="mt-6 text-center text-sm italic text-muted-foreground">
          Contact us for a detailed quotation and property-specific ROI briefing.
        </p>
      </SectionBlock>

      {/* 15 - CONCLUSION */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-emerald">Conclusion</span>
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Creating safer <span className="text-pulse">hospitality experiences</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            PRAYAS enables hotels to respond confidently during the first
            critical minutes of a medical emergency through guided CPR support,
            structured emergency workflows, and staff preparedness. By
            integrating PRAYAS into hotel operations, hotels strengthen guest
            safety, improve operational readiness, reinforce duty of care, and
            elevate service excellence.
          </p>
          <p className="mt-8 font-display text-2xl font-bold tracking-tight">
            Thank you.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            PRAYAS — CPR Audio Feedback Device · Making every critical minute count.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink to="/contact">Request hotel demo</CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- helpers ---------- */

function SectionBlock({
  n,
  eyebrow,
  title,
  subtitle,
  surface,
  children,
}: {
  n: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <Section surface={surface}>
      <div className="mb-10 flex flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10 font-display font-bold text-pulse">
            {n}
          </div>
          <span className="eyebrow-emerald">{eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </Section>
  );
}

function BulletCard({
  title,
  items,
  columns = 1,
}: {
  title: string;
  items: string[];
  columns?: 1 | 2;
}) {
  return (
    <div className="card-surface p-8">
      <h3 className="font-display text-lg font-semibold text-pulse">{title}</h3>
      <ul
        className={`mt-5 grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      >
        {items.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card-surface p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function BenefitCard({
  icon,
  audience,
  title,
  body,
}: {
  icon: ReactNode;
  audience: string;
  title: string;
  body: string;
}) {
  return (
    <div className="card-surface p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {audience}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  body,
  items,
}: {
  step: string;
  icon: ReactNode;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className="card-surface flex h-full flex-col p-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-pulse">{step}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
          {icon}
        </div>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <ul className="mt-5 space-y-2">
        {items.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const WORKFLOW = [
  {
    title: "Identify emergency",
    body: "Recognize the medical emergency and immediately alert Front Desk, Security, or Duty Manager.",
  },
  {
    title: "Retrieve PRAYAS device",
    body: "Nearest trained staff member brings the CPR Audio Feedback Device to the emergency location.",
  },
  {
    title: "Begin guided CPR",
    body: "Follow the device's voice prompts while emergency medical services are on the way.",
  },
  {
    title: "Handover to medical professionals",
    body: "Continue support until ambulance personnel or healthcare professionals take over patient care.",
  },
];

const LOCATIONS = [
  "Reception",
  "Front Desk",
  "Concierge",
  "Security Office",
  "Lobby",
  "Gym",
  "Swimming Pool",
  "Banquet Hall",
  "Conference Centre",
  "Restaurant",
  "Rooftop Lounge",
  "Spa",
  "Kids Activity Area",
  "Staff Medical Room",
];

const COMPARISON: [string, string, string][] = [
  ["Origin", "Made in India — designed for local + global markets", "Imported, high customs & shipping costs"],
  ["Real-time voice guidance", "Multilingual voice + metronome + LED", "Metronome + basic display"],
  ["Depth accuracy", "±1 mm (multi-sensor fusion, R² 0.984)", "±2–3 mm on soft surfaces"],
  ["Soft-surface correction", "Filters mattress sag automatically", "Limited or none"],
  ["Fatigue prediction (edge AI)", "Prompts rescuer rotation", "Not available"],
  ["Connectivity", "BLE 5.2 + Wi-Fi telemetry (Pro)", "BLE only"],
  ["Ingress rating", "IP67 waterproof & dustproof", "Typically IP54"],
  ["Warranty", "3-year commercial / 5-year enterprise", "1–2 years standard"],
  ["Pricing", "~40–60% lower TCO for Indian buyers", "Premium import pricing"],
  ["Support & training", "Local team, onsite drills, refresher SLA", "Distributor-only, remote support"],
];

function PriceCard({
  tier,
  audience,
  price,
  features,
  highlight,
}: {
  tier: string;
  audience: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`card-surface flex h-full flex-col p-8 ${
        highlight ? "ring-2 ring-pulse" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {audience}
        </span>
        {highlight && (
          <span className="rounded-full bg-pulse px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-pulse-foreground">
            Popular
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold">{tier}</h3>
      <p className="mt-2 font-display text-lg font-semibold text-pulse">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <CtaLink to="/contact">Request quote</CtaLink>
      </div>
    </div>
  );
}