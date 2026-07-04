import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ORGS = [
  { value: "", label: "Select sector" },
  { value: "hospital", label: "Hospital / Clinical Network" },
  { value: "school", label: "Educational Institution / School" },
  { value: "hotel", label: "Hotel & Hospitality Group" },
  { value: "transit", label: "Airport / Railway Infrastructure" },
  { value: "investor", label: "Investor / Distribution Partner" },
  { value: "corporate", label: "Corporate / Industrial Facility" },
  { value: "other", label: "Other" },
];

export function DemoForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const full_name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const organization_type = String(form.get("org") ?? "").trim();

    if (!full_name || !email || !organization_type) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("demo_requests").insert({
      full_name,
      email,
      organization_type,
    });
    setSubmitting(false);

    if (error) {
      toast.error("We couldn't submit your request. Please try again.");
      return;
    }
    toast.success(`Thank you, ${full_name}! Our team will reach out within 24 hours.`);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Full name
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Dr. / Mr. / Ms. Name"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-pulse focus:outline-none focus:ring-2 focus:ring-pulse/30"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Institutional email
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="name@organization.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-pulse focus:outline-none focus:ring-2 focus:ring-pulse/30"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Organization type
        </label>
        <select
          name="org"
          required
          defaultValue=""
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-pulse focus:outline-none focus:ring-2 focus:ring-pulse/30"
        >
          {ORGS.map((o) => (
            <option key={o.value} value={o.value} disabled={o.value === ""}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pulse px-5 py-3 text-sm font-semibold text-pulse-foreground shadow-sm transition hover:brightness-110 disabled:opacity-70"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Submitting…" : "Submit RFP & request demo"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Our MedTech deployment team responds within 24 hours.
      </p>
    </form>
  );
}