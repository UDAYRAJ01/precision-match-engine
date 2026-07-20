import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | CPR PRAYAS™" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow"><span className="pulse-dot" /> Admin console</div>
          <h1 className="mt-2 font-display text-2xl font-bold">Site content</h1>
        </div>
        <div className="flex gap-2 text-xs">
          <Link to="/admin" className="rounded-full border border-border px-3 py-1.5">All pages</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}