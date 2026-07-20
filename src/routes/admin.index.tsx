import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { listAllSections, listDemoRequests, type PageSection, type DemoRequest } from "@/lib/cms.functions";

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
  const fnSections = useServerFn(listAllSections);
  const fnDemo = useServerFn(listDemoRequests);
  const qs = useQuery({ queryKey: ["admin", "sections"], queryFn: () => fnSections() });
  const qd = useQuery({ queryKey: ["admin", "demo-requests"], queryFn: () => fnDemo() });
  const sections = (qs.data ?? []) as PageSection[];
  const demos = (qd.data ?? []) as DemoRequest[];
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const m = new Map<string, { total: number; drafts: number }>();
    for (const s of sections) {
      const c = m.get(s.page_slug) ?? { total: 0, drafts: 0 };
      c.total++; if (!s.published) c.drafts++;
      m.set(s.page_slug, c);
    }
    return m;
  }, [sections]);

  const totalSections = sections.length;
  const totalDrafts = sections.filter((s) => !s.published).length;

  const recent = useMemo(
    () => [...sections].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 6),
    [sections],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return sections.filter((s) =>
      s.page_slug.toLowerCase().includes(q) ||
      s.section_key.toLowerCase().includes(q) ||
      (s.label ?? "").toLowerCase().includes(q) ||
      JSON.stringify(s.content).toLowerCase().includes(q)
    ).slice(0, 30);
  }, [sections, search]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Pages" value={KNOWN_PAGES.length} />
        <Stat label="Sections" value={totalSections} />
        <Stat label="Drafts" value={totalDrafts} accent={totalDrafts > 0} />
        <Stat label="Demo requests" value={demos.length} />
      </div>

      <div className="card-surface p-4">
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sections by page, key, label, or content…"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {filtered && (
          <div className="mt-3 space-y-1">
            {filtered.length === 0 && <div className="text-xs text-muted-foreground">No matches.</div>}
            {filtered.map((s) => (
              <Link key={s.id} to="/admin/$page" params={{ page: s.page_slug }}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted">
                <span><code className="text-xs">{s.page_slug}</code> · {s.label || s.section_key}</span>
                <span className="text-xs text-muted-foreground">{s.published ? "live" : "draft"}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">All pages</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {KNOWN_PAGES.map((p) => {
            const c = counts.get(p.slug) ?? { total: 0, drafts: 0 };
            return (
              <Link
                key={p.slug}
                to="/admin/$page" params={{ page: p.slug }}
                className="card-surface group block p-4 transition-colors hover:border-pulse/40"
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-base font-semibold">{p.label}</div>
                  <span className="text-[11px] text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {c.total} section{c.total === 1 ? "" : "s"}
                  {c.drafts ? <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-500">{c.drafts} draft</span> : null}
                </div>
                <div className="mt-3 text-xs font-medium text-pulse group-hover:underline">Edit →</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recently edited</h2>
        <div className="card-surface divide-y divide-border/60">
          {recent.length === 0 && <div className="p-4 text-xs text-muted-foreground">No sections yet.</div>}
          {recent.map((s) => (
            <Link key={s.id} to="/admin/$page" params={{ page: s.page_slug }}
              className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted/50">
              <span className="truncate">
                <code className="text-xs text-muted-foreground">{s.page_slug}</code>
                <span className="mx-2 text-muted-foreground">·</span>
                {s.label || s.section_key}
              </span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {new Date(s.updated_at).toLocaleDateString()} {s.published ? "" : "· draft"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-2xl font-bold ${accent ? "text-amber-500" : ""}`}>{value}</div>
    </div>
  );
}