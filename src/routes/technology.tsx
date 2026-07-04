import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology & Sensor Architecture | CPR PRAYAS™" },
      { name: "description", content: "Multi-sensor fusion, ARM Cortex-M4 firmware, and real-time Kalman filtering deliver zero-latency CPR guidance." },
      { property: "og:title", content: "CPR PRAYAS™ Technology" },
      { property: "og:description", content: "Precision sensor architecture and real-time algorithmic intelligence." },
    ],
  }),
  component: TechPage,
});

const LAYERS = [
  ["01", "Piezo-resistive force sensing matrix", "Micro-calibrated pressure sensors alongside 6-axis accelerometers measure exact vertical displacement across a 10–60 kg pressure gradient."],
  ["02", "6-DOF inertial measurement unit", "High-frequency dual 3-axis accelerometers tracking 3D motion vectors to calculate precise 5.0–6.0 cm displacement with ±1 mm accuracy."],
  ["03", "ARM Cortex-M4 floating-point processor", "32-bit CPU running custom Kalman filtering at 500 Hz for zero latency between compression and audio feedback."],
  ["04", "Full chest recoil transducers", "Monitors residual force during decompression, alerting rescuers if pressure exceeds 2.5 kg between compressions."],
];

const SPECS: [string, string, string][] = [
  ["Target applications", "Schools, Hotels, Transit, Homes", "Hospitals, EMS, Simulation Labs"],
  ["Processing core", "32-bit ARM Cortex-M4 @ 120 MHz", "Dual-core ARM Cortex-M4 @ 120 MHz"],
  ["Depth guidance range", "0–8.0 cm (±2 mm)", "0–8.0 cm (±1 mm)"],
  ["Rate guidance range", "100–120 BPM metronome", "40–180 BPM adaptive telemetry"],
  ["Audio output", "85 dB water-resistant speaker", "95 dB adjustable clinical speaker"],
  ["Visual feedback", "Tri-color status LED", "360° high-luminance RGB LED array"],
  ["Wireless telemetry", "Bluetooth Low Energy (BLE 5.2)", "BLE 5.2 + Wi-Fi 802.11 b/g/n"],
  ["Battery", "LiFePO4 3.7V / 1800 mAh", "LiFePO4 + magnetic dock"],
  ["Ingress & disinfectant", "IP67 waterproof & dustproof", "IP65 clinical washdown"],
  ["Warranty", "3-year commercial", "5-year enterprise clinical"],
];

function TechPage() {
  return (
    <>
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Biomechanical engineering</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Precision sensor architecture &{" "}
            <span className="text-pulse">real-time algorithmic intelligence</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Multi-sensor hardware arrays fused with embedded microcontrollers deliver
            zero-latency resuscitation guidance.
          </p>
        </div>
      </Section>

      <Section surface>
        <SectionHeader eyebrow="Sensor fusion" title="The 4-layer sensing pipeline" subtitle="Isolating true sternal displacement from soft mattress sag." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {LAYERS.map(([n, t, d]) => (
            <div key={n} className="card-surface p-8">
              <div className="font-display text-xs font-bold tracking-widest text-pulse">LAYER {n}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Specifications" title="Hardware specification matrix" subtitle="Exhaustive comparison between CPR PRAYAS™ One and Pro." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse card-surface overflow-hidden">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-6 py-4 font-display text-sm font-semibold">Parameter</th>
                <th className="px-6 py-4 font-display text-sm font-semibold">CPR PRAYAS™ One</th>
                <th className="px-6 py-4 font-display text-sm font-semibold text-pulse">CPR PRAYAS™ Pro</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map(([p, a, b], i) => (
                <tr key={p} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="border-t border-border px-6 py-3.5 text-sm font-semibold">{p}</td>
                  <td className="border-t border-border px-6 py-3.5 text-sm text-muted-foreground">{a}</td>
                  <td className="border-t border-border px-6 py-3.5 text-sm text-muted-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}