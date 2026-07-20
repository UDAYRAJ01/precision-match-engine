import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { Check } from "lucide-react";
import productOne from "@/assets/product-one.jpg";
import productPro from "@/assets/product-pro.jpg";
import productConnect from "@/assets/product-connect.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Ecosystem | CPR PRAYAS™ One, Pro & Connect" },
      { name: "description", content: "Intelligent hardware guidance devices, mobile applications, and cloud resuscitation analytics — the CPR PRAYAS™ connected product platform." },
      { property: "og:title", content: "CPR PRAYAS™ Products" },
      { property: "og:description", content: "One, Pro, and Connect — a connected resuscitation platform for bystanders, hospitals, and hospitality." },
    ],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  {
    id: "one",
    eyebrow: "Ultra-portable device",
    name: "CPR PRAYAS™ One",
    image: productOne,
    desc: "Designed for bystanders and first-aid deployment in schools, hotels, public transit, and emergency kits. Compact, pocket-sized, instantly operational with single-button activation and real-time audio guidance.",
    features: [
      "High-decibel acoustic metronome (110 BPM target)",
      "Dynamic force-sensing surface compensating for soft ground",
      "One-touch Adult / Infant calibration toggle",
      "IP67 waterproof, impact-resistant polycarbonate casing",
    ],
    cta: "Order CPR PRAYAS™ One",
  },
  {
    id: "pro",
    eyebrow: "Clinical grade system",
    name: "CPR PRAYAS™ Pro",
    image: productPro,
    desc: "Engineered for hospital Code Blue teams, EMS ambulances, and accredited resuscitation simulation centers requiring continuous telemetry monitoring and defibrillator isolation.",
    features: [
      "360° high-luminance RGB LED force guidance ring",
      "Defibrillator shock immunity tested to 360J",
      "Wi-Fi and Bluetooth telemetry to central dashboards",
      "Continuous code-blue event black-box logging",
    ],
    cta: "Request clinical evaluation unit",
    reverse: true,
  },
  {
    id: "connect",
    eyebrow: "Companion telemetry app",
    name: "CPR PRAYAS™ Connect",
    image: productConnect,
    desc: "The software bridge connecting PRAYAS hardware to emergency dispatchers and cloud institutional dashboards. Real-time CPR compression graphs via Bluetooth Low Energy (BLE 5.2).",
    features: [
      "Real-time visual ECG and depth oscilloscope graphs",
      "One-tap 108 / 911 dispatcher SOS with GPS coordinates",
      "Automated post-resuscitation PDF debrief reports",
      "iOS App Store & Android Google Play compatibility",
    ],
    cta: "Request beta access",
  },
];

function ProductsPage() {
  return (
    <>
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Hardware & software ecosystem</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The connected resuscitation <span className="text-pulse">product platform</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Intelligent hardware guidance devices, mobile applications, and cloud
            resuscitation analytics dashboards.
          </p>
        </div>
      </Section>

      {PRODUCTS.map((p, i) => (
        <Section key={p.id} id={p.id} surface={i % 2 === 0}>
          <div className={`grid items-center gap-14 lg:grid-cols-2 ${p.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <span className="eyebrow-emerald">{p.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{p.name}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaLink to="/contact">{p.cta}</CtaLink>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1200}
                height={1200}
                className="w-full rounded-3xl border border-border shadow-xl"
              />
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}