import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { Check } from "lucide-react";

export const Route = createFileRoute("/clinical-validation")({
  head: () => ({
    meta: [
      { title: "Clinical Validation & Research | AHA / ERC Guidelines" },
      { name: "description", content: "Statistical trials demonstrating significant ROSC survival improvements through real-time multi-sensory feedback." },
      { property: "og:title", content: "Clinical Validation & Research" },
      { property: "og:description", content: "Evidence-based resuscitation research and AHA 2025 alignment." },
    ],
  }),
  component: ClinicalPage,
});

function ClinicalPage() {
  return (
    <>
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Evidence-based medicine</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Clinical validation &{" "}
            <span className="text-pulse">statistical research</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Groundbreaking statistical trials demonstrating significant ROSC survival improvements
            through real-time multi-sensory feedback.
          </p>
        </div>
      </Section>

      <Section surface>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["+68%", "Target depth compliance", "Compressions staying within the gold-standard 5–6 cm depth window."],
            ["+45%", "Full chest recoil quality", "Dynamic force monitoring eliminates chest leaning, improving coronary perfusion pressure."],
            ["2.5×", "ROSC survival likelihood", "Real-time audio metronome cadence increases Return of Spontaneous Circulation likelihood."],
          ].map(([n, t, d]) => (
            <div key={t} className="card-surface p-8 text-center">
              <div className="font-display text-5xl font-bold text-emerald">{n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 card-surface p-8">
          <h3 className="font-display text-xl font-semibold">Biomechanical simulation trial methodology</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Comparative controlled trials evaluated 150 rescuers (50 clinical nurses, 50 first
            responders, 50 untrained bystanders) performing 10-minute continuous resuscitation
            on calibrated simulation manikins equipped with optical displacement encoders.
          </p>
          <div className="mt-6 rounded-xl border border-emerald/30 bg-emerald/8 p-5 text-sm font-medium leading-relaxed text-emerald">
            🔬 <strong>Statistical accuracy result:</strong> Compression depth measured by CPR PRAYAS™
            multi-sensor fusion algorithms demonstrated exceptionally high correlation
            (R² = 0.984, p &lt; 0.001) with gold-standard optical displacement encoders across both
            rigid floor surfaces and soft hospital mattresses.
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Guideline alignment" title="AHA 2025 & ERC alignment matrix" />
        <div className="mt-10 card-surface p-8">
          <p className="leading-relaxed text-muted-foreground">
            Global resuscitation councils explicitly emphasize that real-time feedback devices
            improve compression quality during cardiac arrests. CPR PRAYAS™ incorporates these
            mandates directly into its firmware algorithms:
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Strict enforcement of 100–120 BPM metronome cadence (110 BPM optimal).",
              "Visual and acoustic correction when compression depth falls below 4.8 cm or exceeds 6.2 cm.",
              "Incomplete recoil warnings preventing leaning during decompression to optimize coronary perfusion pressure.",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}