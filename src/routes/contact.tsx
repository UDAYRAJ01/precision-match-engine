import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/section";
import { DemoForm } from "@/components/site/demo-form";
import { Mail, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & RFP Demo | CPR PRAYAS™" },
      { name: "description", content: "Request a live institutional demo or submit an RFP procurement quotation for CPR PRAYAS™." },
      { property: "og:title", content: "Contact CPR PRAYAS™" },
      { property: "og:description", content: "Connect with our MedTech clinical deployment team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Section bordered={false}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow"><span className="pulse-dot" /> Partner with us</span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Request a live institutional demo &{" "}
            <span className="text-pulse">RFP procurement quotation</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Connect with our MedTech clinical deployment team to evaluate CPR PRAYAS™ for your
            hospital, school district, hotel group, or emergency network.
          </p>
        </div>
      </Section>

      <Section surface>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="card-surface p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">Partner with CPR PRAYAS™</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Join leading healthcare networks, educational foundations, and emergency
              authorities in standardizing high-quality resuscitation technology.
            </p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pulse" />
                <div>
                  <div className="font-semibold text-ink">Headquarters</div>
                  <div className="text-muted-foreground">CPR Innovation Hub, Kanpur, India</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-pulse" />
                <div>
                  <div className="font-semibold text-ink">Institutional sales</div>
                  <a href="mailto:contact@cprprayas.com" className="text-muted-foreground hover:text-pulse">contact@cprprayas.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-pulse" />
                <div>
                  <div className="font-semibold text-ink">Global licensing</div>
                  <a href="mailto:partners@cprprayas.com" className="text-muted-foreground hover:text-pulse">partners@cprprayas.com</a>
                </div>
              </li>
            </ul>
          </div>

          <div className="card-surface p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">Request institutional live demo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete the form and our MedTech team will follow up within 24 hours.
            </p>
            <div className="mt-8">
              <DemoForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}