import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { PageBanner } from "@/components/site/page-banner";
import bannerPatents from "@/assets/banner-patents.jpg";

export const Route = createFileRoute("/patents")({
  head: () => ({
    meta: [
      { title: "Patents & Intellectual Property | CPR PRAYAS™" },
      { name: "description", content: "Proprietary patent architecture and global IP protection roadmap for CPR PRAYAS™ innovations." },
      { property: "og:title", content: "CPR PRAYAS™ Patents & IP" },
      { property: "og:description", content: "Multi-sensor fusion claims and global regulatory filings." },
    ],
  }),
  component: PatentsPage,
});

const CLAIMS = [
  ["Patent claim 01", "Multi-sensor fusion displacement algorithm", "Proprietary algorithm combining piezo-resistive force sensor arrays with 6-axis IMUs to accurately calculate true sternal displacement while filtering soft mattress sag."],
  ["Patent claim 02", "Dual-mode mechanical & electronic switching", "Integrated single-touch toggle that simultaneously alters internal spring resistance and recalibrates firmware thresholds for pediatric vs. adult modes."],
  ["Patent claim 03", "Edge AI rescuer fatigue prediction", "Machine learning regression model on embedded ARM microcontrollers tracking force-decay slopes to predict rescuer exhaustion and prompt rotation."],
];

function PatentsPage() {
  return (
    <>
      <PageBanner
        image={bannerPatents}
        eyebrow="MedTech IP portfolio"
        title={<>Proprietary patent architecture & <span className="text-pulse">global IP protection roadmap</span></>}
        subtitle="Securing core technological innovations across international emergency medicine jurisdictions."
      />

      <Section surface>
        <SectionHeader eyebrow="Portfolio" title="Core patent claims" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CLAIMS.map(([tag, title, body]) => (
            <div key={tag} className="card-surface p-8">
              <div className="font-display text-xs font-bold tracking-widest text-pulse uppercase">{tag}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card-surface p-10 text-center md:p-14">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Global regulatory & IP filings roadmap
          </h3>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Indian Patent Office complete specification filed; PCT international patent
            applications pending across EMEA, US, and Southeast Asian territories alongside
            CDSCO, CE MDR (2017/745), and US FDA 510(k) preparation.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink to="/contact">Request IP briefing</CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}