import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";

const PAGES = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "products", label: "Products" },
  { slug: "technology", label: "Technology" },
  { slug: "applications", label: "Applications" },
  { slug: "clinical-validation", label: "Clinical" },
  { slug: "patents", label: "Patents" },
  { slug: "investors", label: "Investors" },
  { slug: "hotels", label: "Hotels" },
  { slug: "how-to-use", label: "How to Use" },
  { slug: "faq", label: "FAQ" },
  { slug: "contact", label: "Contact" },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | CPR PRAYAS™" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const currentPage = path.startsWith("/admin/") ? path.slice(7).split("/")[0] : "";
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="eyebrow"><span className="pulse-dot" /> Admin console</div>
          <h1 className="mt-1 font-display text-xl font-bold sm:text-2xl">Site content</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "bg-primary text-primary-foreground" }} className="rounded-full border border-border px-3 py-1.5 hover:border-pulse/40">Dashboard</Link>
          <Link to="/admin/demo-requests" activeProps={{ className: "bg-primary text-primary-foreground" }} className="rounded-full border border-border px-3 py-1.5 hover:border-pulse/40">Demo requests</Link>
          <a href="/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1.5 hover:border-pulse/40">View site ↗</a>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pages</div>
          <nav className="flex flex-wrap gap-1 lg:flex-col">
            {PAGES.map((p) => {
              const active = currentPage === p.slug;
              return (
                <Link
                  key={p.slug}
                  to="/admin/$page" params={{ page: p.slug }}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"}`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}