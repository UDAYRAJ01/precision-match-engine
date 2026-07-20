import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CmsPageBanner } from "@/components/site/cms-page-banner";
import bannerFaq from "@/assets/banner-faq.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | CPR PRAYAS™ Knowledge Base & Support" },
      { name: "description", content: "Everything about device mechanics, AHA compliance, battery maintenance, and institutional deployment of CPR PRAYAS™." },
      { property: "og:title", content: "CPR PRAYAS™ FAQ" },
      { property: "og:description", content: "Master repository of device, clinical, procurement, and telemetry answers." },
    ],
  }),
  component: FaqPage,
});

const CATEGORIES: { n: string; title: string; items: [string, string][] }[] = [
  {
    n: "1",
    title: "Device mechanics & force sensor calibration",
    items: [
      ["How does CPR PRAYAS™ measure compression depth without external reference frames?",
       "A proprietary multi-sensor fusion algorithm combines piezo-resistive force sensor arrays with 6-DOF IMUs to isolate sternal displacement from underlying surface movement."],
      ["Can CPR PRAYAS™ be used on a soft hospital mattress?",
       "Yes. The embedded 32-bit ARM Cortex-M4 microcontroller executes real-time Kalman filtering at 500 Hz to compensate for mattress compression artifact."],
      ["How do rescuers switch between Adult and Infant modes?",
       "A single tactile toggle recalibrates sensor sensitivity and firmware thresholds instantly (5.0–6.0 cm for adults, 4.0 cm for infants)."],
      ["What is the calibrated pressure operating range of the force sensor matrix?",
       "The force array is calibrated across a pneumatic gradient from 10 kg to 60 kg with ±1 mm displacement resolution."],
    ],
  },
  {
    n: "2",
    title: "Clinical guidelines & AHA compliance",
    items: [
      ["Is CPR PRAYAS™ compliant with AHA 2025 resuscitation guidelines?",
       "Yes. The internal metronome guides compressions strictly at 110 BPM and monitors depth within 5.0–6.0 cm for adults and 4.0 cm for infants."],
      ["Does CPR PRAYAS™ replace an AED?",
       "No. CPR PRAYAS™ guides manual chest compressions to maintain cardiac refill and cerebral blood flow, working alongside AED defibrillators."],
      ["How does the device detect incomplete chest recoil?",
       "If residual pressure exceeding 2.5 kg is detected at peak release, the sensors trigger an acoustic prompt: 'Release chest fully.'"],
    ],
  },
  {
    n: "3",
    title: "Institutional procurement & warranty",
    items: [
      ["What warranty coverage is provided for institutional fleets?",
       "One includes a 3-year limited commercial warranty; Pro includes a 5-year enterprise clinical warranty with rapid cross-exchange."],
      ["Are volume discounts available for large school districts or hotel chains?",
       "Yes. We offer tiered enterprise pricing and customized RFP packages for multi-facility fleet deployments."],
    ],
  },
  {
    n: "4",
    title: "Mobile app & cloud telemetry",
    items: [
      ["How does CPR PRAYAS™ Connect communicate with hardware?",
       "Via Bluetooth Low Energy (BLE 5.2) featuring zero-pairing instant emergency connection protocols."],
      ["Can CPR PRAYAS™ Cloud sync telemetry with hospital EHR?",
       "Yes. Cloud telemetry APIs support HL7 and FHIR interoperability for automatic Code Blue incident logging."],
    ],
  },
];

function FaqPage() {
  return (
    <>
      <PageBanner
        image={bannerFaq}
        eyebrow="Knowledge base & support"
        title={<>Answers on device mechanics, <span className="text-pulse">clinical operation & deployment</span></>}
        subtitle="Everything about device mechanics, AHA compliance, battery maintenance, and institutional deployment."
      />

      <Section surface>
        <div className="mx-auto max-w-3xl space-y-14">
          {CATEGORIES.map((cat) => (
            <div key={cat.n}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10 font-display font-bold text-pulse">
                  {cat.n}
                </div>
                <h2 className="font-display text-2xl font-bold">{cat.title}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {cat.items.map(([q, a], idx) => (
                  <AccordionItem
                    key={q}
                    value={`${cat.n}-${idx}`}
                    className="card-surface px-5"
                  >
                    <AccordionTrigger className="text-left font-display text-base font-semibold">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}