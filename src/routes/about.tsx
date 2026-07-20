import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { CmsPageBanner } from "@/components/site/cms-page-banner";
import bannerAbout from "@/assets/banner-about.jpg";
import sectionTeam from "@/assets/section-about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CPR PRAYAS™ | Brand Origin & Engineering Collaboration" },
      { name: "description", content: "CPR PRAYAS™ is an Indian MedTech company developing intelligent CPR guidance technologies born from academic engineering research and clinical collaboration." },
      { property: "og:title", content: "About CPR PRAYAS™" },
      { property: "og:description", content: "Engineered to give every heart a second chance at life — our mission, brand pillars, and origin story." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageBanner
        image={bannerAbout}
        eyebrow="Corporate profile & mission"
        title={<>Engineered to give every heart <span className="text-pulse">a second chance at life.</span></>}
        subtitle="CPR PRAYAS™ is an Indian MedTech company developing intelligent CPR guidance technologies that empower anyone — from trained healthcare professionals to everyday bystanders — to save lives during cardiac emergencies."
      />

      <Section surface>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Our origin & mission</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Sudden Cardiac Arrest strikes millions worldwide each year, yet out-of-hospital
              survival rates remain under 10%. The barrier isn't a lack of willingness — it is
              a lack of immediate real-time feedback during chest compressions.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Born from research collaboration across premier engineering institutes and medical
              clinical advisors, CPR PRAYAS™ transforms complex resuscitation protocols into
              intuitive, multi-sensory guidance. "Prayas" represents our earnest effort to
              elevate bystander action into effective resuscitation.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
            <img
              src={sectionTeam}
              alt="CPR PRAYAS engineers and clinicians collaborating in a MedTech R&D lab"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="What we stand for" title="Core brand pillars" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            ["Life First", "Every sensor calibration and ergonomic curve is engineered with a single imperative: saving human lives."],
            ["Clinical Precision", "Strictly grounded in AHA 2025 guidelines for compression depth (5–6 cm) and rate (100–120 BPM)."],
            ["Universal Accessibility", "Eliminating complexity so untrained bystanders achieve high-performance CPR instantly."],
            ["Engineered Trust", "Continuous validation through academic whitepapers and robust medical manufacturing."],
          ].map(([title, body]) => (
            <div key={title} className="card-surface p-8">
              <h3 className="font-display text-lg font-semibold text-pulse">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <CtaLink to="/contact">Partner with CPR PRAYAS™</CtaLink>
        </div>
      </Section>
    </>
  );
}