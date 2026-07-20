import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { listDemoRequests, type DemoRequest } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/demo-requests")({
  component: DemoRequestsInbox,
});

function DemoRequestsInbox() {
  const fn = useServerFn(listDemoRequests);
  const q = useQuery({ queryKey: ["admin", "demo-requests"], queryFn: () => fn() });
  const rows = (q.data ?? []) as DemoRequest[];
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      r.full_name.toLowerCase().includes(s) ||
      r.email.toLowerCase().includes(s) ||
      r.organization_type.toLowerCase().includes(s)
    );
  }, [rows, search]);

  function exportCsv() {
    const header = "Name,Email,Organization,Received\n";
    const body = filtered.map((r) =>
      [r.full_name, r.email, r.organization_type, r.created_at]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `demo-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Demo requests</h2>
          <div className="text-xs text-muted-foreground">{rows.length} total · {filtered.length} shown</div>
        </div>
        <div className="flex gap-2">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          />
          <button onClick={exportCsv} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Export CSV</button>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        {q.isLoading && <div className="p-4 text-sm text-muted-foreground">Loading…</div>}
        {!q.isLoading && filtered.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">No demo requests yet.</div>
        )}
        {filtered.length > 0 && (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Organization</th>
                <th className="px-4 py-2 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2 font-medium">{r.full_name}</td>
                  <td className="px-4 py-2"><a className="text-pulse hover:underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="px-4 py-2 text-muted-foreground">{r.organization_type}</td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
