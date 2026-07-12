import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader, DeviceMock } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import {
  Phone,
  Power,
  Hand,
  HeartPulse,
  Volume2,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Battery,
  Shield,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/how-to-use")({
  head: () => ({
    meta: [
      { title: "How to Use CPR PRAYAS™ | Step-by-Step Device Guide" },
      { name: "description", content: "Learn how to use CPR PRAYAS™ in an emergency. Step-by-step CPR guidance, voice feedback, LED indicators, and best practices for bystanders and healthcare teams." },
      { property: "og:title", content: "How to Use CPR PRAYAS™" },
      { property: "og:description", content: "Step-by-step guide to real-time CPR feedback with PRAYAS." },
    ],
  }),
  component: HowToUsePage,
});

function HowToUsePage() {
  return (
    <>
      {/* HERO */}
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Quick-start guide</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            How to use <span className="text-pulse">CPR PRAYAS™</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            PRAYAS turns panic into protocol. From the moment you find an
            unresponsive person to the arrival of professional help, the device
            guides every compression with voice, light, and haptic feedback.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to="/contact">Book a hands-on demo</CtaLink>
            <CtaLink to="/technology" variant="outline">See the technology</CtaLink>
          </div>
        </div>
      </Section>

      {/* STEP-BY-STEP */}
      <SectionBlock
        n="01"
        eyebrow="Emergency protocol"
        title="Follow these steps"
        subtitle="Designed for both trained responders and first-time bystanders."
        surface
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StepCard
            step="1"
            icon={<Shield className="h-5 w-5" />}
            title="Ensure safety"
            body="Check the scene for hazards. Make sure the person, you, and bystanders are safe before approaching."
          />
          <StepCard
            step="2"
            icon={<Activity className="h-5 w-5" />}
            title="Check responsiveness"
            body="Tap the person's shoulders firmly and shout. Look for normal breathing — gasping is not normal breathing."
          />
          <StepCard
            step="3"
            icon={<Phone className="h-5 w-5" />}
            title="Call for help"
            body="Dial your local emergency number. Put the call on speaker so the dispatcher can guide you while PRAYAS handles compressions."
          />
          <StepCard
            step="4"
            icon={<Hand className="h-5 w-5" />}
            title="Position the device"
            body="Place PRAYAS on the lower half of the sternum, in line with the nipples. The hand-grip contour shows the correct orientation."
          />
          <StepCard
            step="5"
            icon={<Power className="h-5 w-5" />}
            title="Power on & follow voice"
            body="Press the power button once. PRAYAS begins counting down and coaching compression depth, rate, and recoil."
          />
          <StepCard
            step="6"
            icon={<HeartPulse className="h-5 w-5" />}
            title="Compress until help arrives"
            body="Push hard and fast (5–6 cm deep, 100–120 per minute). Swap rescuers every 2 minutes if another person is available."
          />
        </div>
      </SectionBlock>

      {/* FEEDBACK GUIDE */}
      <SectionBlock
        n="02"
        eyebrow="Understand the feedback"
        title="Voice, LED & haptic cues"
        subtitle="Real-time corrections keep compressions clinically effective."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 text-pulse">
              <Volume2 className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">Voice prompts</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {[
                ["Push deeper", "Compression is under 5 cm — increase force."],
                ["Push softer", "Compression exceeds 6 cm — reduce force slightly."],
                ["Faster", "Rate below 100/min — speed up to the metronome."],
                ["Slower", "Rate above 120/min — slow down for full recoil."],
                ["Good compressions", "Depth and rate are within AHA guidelines."],
                ["Switch rescuer", "Fatigue detected; swap with another responder."],
              ].map(([prompt, meaning]) => (
                <li key={prompt} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pulse/10 text-[10px] font-bold text-pulse">
                    ♪
                  </span>
                  <span>
                    <strong className="text-ink">{prompt}</strong>
                    <span className="block text-muted-foreground">{meaning}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
            <div className="card-surface p-8">
              <div className="flex items-center gap-3 text-emerald">
                <CheckCircle className="h-6 w-6" />
                <h3 className="font-display text-xl font-semibold">Green LED ring</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Steady green glow means depth, rate, and chest recoil are all
                within the AHA 2025 target zone. Keep doing exactly what you are
                doing.
              </p>
            </div>
            <div className="card-surface p-8">
              <div className="flex items-center gap-3 text-pulse">
                <AlertCircle className="h-6 w-6" />
                <h3 className="font-display text-xl font-semibold">Amber pulse alert</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Amber flashes warn that one parameter is drifting — depth is
                shallow, rate is too fast, or recoil is incomplete. Adjust until
                the prompt returns to green.
              </p>
            </div>
            <div className="card-surface p-8">
              <div className="flex items-center gap-3 text-destructive">
                <XCircle className="h-6 w-6" />
                <h3 className="font-display text-xl font-semibold">Red stop cue</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A red ring plus an urgent tone indicates hands-off, AED arrival,
                or a critical safety pause. Follow the dispatcher or AED
                instructions.
              </p>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* DO'S & DON'TS */}
      <SectionBlock
        n="03"
        eyebrow="Best practices"
        title="Do's & don'ts"
        subtitle="Small habits make a big difference in CPR quality."
        surface
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <BulletCard
            title="Do"
            items={[
              "Place the device on a firm, flat surface or a backboard when possible",
              "Lock your elbows and use your body weight for compressions",
              "Allow full chest recoil between compressions",
              "Keep the device centered on the lower sternum",
              "Follow the metronome beat for consistent rate",
              "Swap rescuers every 2 minutes to maintain quality",
            ]}
          />
          <BulletCard
            title="Don't"
            items={[
              "Do not lean on the chest between compressions",
              "Do not place PRAYAS over the ribs, abdomen, or upper sternum",
              "Do not ignore amber alerts — adjust immediately",
              "Do not stop compressions unless instructed by help or AED",
              "Do not use on infants or children under the device's pediatric threshold",
              "Do not submerge the device; it is water-resistant, not dive-proof",
            ]}
          />
        </div>
      </SectionBlock>

      {/* TRAINING MODE */}
      <SectionBlock
        n="04"
        eyebrow="Practice mode"
        title="Train without a live emergency"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 text-pulse">
              <GraduationCap className="h-6 w-6" />
              <h3 className="font-display text-xl font-semibold">Built-in training mode</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Hold the power button for 3 seconds to enter Training Mode. The
              device runs a 2-minute guided compression cycle with simulated
              feedback, no emergency call triggers, and a summary score at the
              end.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Practice compressions on a manikin or firm cushion",
                "Receive the same voice and LED feedback as live mode",
                "Review depth, rate, and recoil scores after each session",
                "Use the mobile app to track team training history",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <DeviceMock tone="emerald" label="TRAINING MODE" />
          </div>
        </div>
      </SectionBlock>

      {/* BATTERY & CARE */}
      <SectionBlock
        n="05"
        eyebrow="Device care"
        title="Battery, storage & maintenance"
        surface
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TipCard
            icon={<Battery className="h-5 w-5" />}
            title="Charge monthly"
            body="A full charge lasts up to 12 months in standby. Charge via USB-C after each real-use event."
          />
          <TipCard
            icon={<RefreshCw className="h-5 w-5" />}
            title="Self-test on power-on"
            body="PRAYAS runs a sensor and battery diagnostic every time it wakes. Wait for the ready tone before starting CPR."
          />
          <TipCard
            icon={<Shield className="h-5 w-5" />}
            title="Store in the wall case"
            body="Keep the device in its marked wall-mounted case near AEDs or first-aid stations for instant access."
          />
          <TipCard
            icon={<AlertCircle className="h-5 w-5" />}
            title="Inspect quarterly"
            body="Check for cracks, dirt, or liquid ingress. Wipe the surface with a medical-grade disinfectant wipe."
          />
        </div>
      </SectionBlock>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-emerald">Ready to deploy?</span>
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Train your team with <span className="text-pulse">CPR PRAYAS™</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book a live demonstration and certification workshop for your hospital,
            hotel, school, or corporate campus.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to="/contact">Request demo</CtaLink>
            <CtaLink to="/faq" variant="outline">Read FAQ</CtaLink>
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

function StepCard({
  step,
  icon,
  title,
  body,
}: {
  step: string;
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card-surface flex h-full flex-col p-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-pulse">{step}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
          {icon}
        </div>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-auto pt-5">
        <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
      </div>
    </div>
  );
}

function BulletCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="card-surface p-8">
      <h3 className="font-display text-lg font-semibold text-pulse">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            {title === "Do" ? (
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TipCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card-surface p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
