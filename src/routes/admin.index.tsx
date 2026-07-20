import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAllSections, type PageSection } from "@/lib/cms.functions";

const KNOWN_PAGES = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "products", label: "Products" },
  { slug: "technology", label: "Technology" },
  { slug: "applications", label: "Applications" },
  { slug: "clinical-validation", label: "Clinical Validation" },
  { slug: "patents", label: "Patents" },
  { slug: "investors", label: "Investors" },
  { slug: "hotels", label: "Hotels" },
  { slug: "how-to-use", label: "How to Use" },
  { slug: "faq", label: "FAQ" },
  { slug: "contact", label: "Contact" },
];

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const fn = useServerFn(listAllSections);
  const q = useQuery({ queryKey: ["admin", "sections"], queryFn: () => fn() });
  const sections = (q.data ?? []) as PageSection[];

  const counts = new Map<string, { total: number; drafts: number }>();
  for (const s of sections) {
    const c = counts.get(s.page_slug) ?? { total: 0, drafts: 0 };
    c.total++;
    if (!s.published) c.drafts++;
    counts.set(s.page_slug, c);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {KNOWN_PAGES.map((p) => {
        const c = counts.get(p.slug) ?? { total: 0, drafts: 0 };
        return (
          <Link
            key={p.slug}
            to="/admin/$page" params={{ page: p.slug }}
            className="card-surface group block p-5 transition-colors hover:border-pulse/40"
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-semibold">{p.label}</div>
              <span className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {c.total} section{c.total === 1 ? "" : "s"}{c.drafts ? ` • ${c.drafts} draft` : ""}
            </div>
            <div className="mt-4 text-xs font-medium text-pulse group-hover:underline">Edit content →</div>
          </Link>
        );
      })}
    </div>
  );
}