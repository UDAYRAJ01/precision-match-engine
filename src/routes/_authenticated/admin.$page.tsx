import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { listAllSections, upsertSection, deleteSection, type PageSection } from "@/lib/cms.functions";

export const Route = createFileRoute("/_authenticated/admin/$page")({
  component: PageEditor,
});

const SECTION_TYPES = ["text", "richtext", "list", "image", "stat", "json"] as const;

function PageEditor() {
  const { page } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listAllSections);
  const upsertFn = useServerFn(upsertSection);
  const deleteFn = useServerFn(deleteSection);

  const q = useQuery({ queryKey: ["admin", "sections"], queryFn: () => listFn() });
  const pageSections = useMemo(
    () => ((q.data ?? []) as PageSection[]).filter((s) => s.page_slug === page),
    [q.data, page],
  );

  const upsertM = useMutation({
    mutationFn: (payload: Parameters<typeof upsertFn>[0]) => upsertFn(payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "sections"] }); toast.success("Saved"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "sections"] }); toast.success("Deleted"); },
  });

  return (
    <div>
      <div className="mb-4 text-xs text-muted-foreground">
        <Link to="/admin" className="hover:text-pulse">← All pages</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{page}</span>
      </div>

      <div className="space-y-4">
        {pageSections.length === 0 && (
          <div className="card-surface p-6 text-sm text-muted-foreground">
            No sections yet for <code>{page}</code>. Add your first section below.
          </div>
        )}
        {pageSections.map((s) => (
          <SectionRow
            key={s.id}
            section={s}
            onSave={(patch) => upsertM.mutate({ data: { ...s, ...patch } })}
            onDelete={() => { if (confirm("Delete this section?")) deleteM.mutate(s.id); }}
          />
        ))}

        <NewSectionRow
          pageSlug={page}
          nextOrder={(pageSections.at(-1)?.sort_order ?? 0) + 10}
          onCreate={(payload) => upsertM.mutate({ data: payload })}
        />
      </div>
    </div>
  );
}

type UpsertInput = Parameters<ReturnType<typeof useServerFn<typeof upsertSection>>>[0]["data"];

function SectionRow({
  section, onSave, onDelete,
}: { section: PageSection; onSave: (patch: Partial<UpsertInput>) => void; onDelete: () => void }) {
  const [label, setLabel] = useState(section.label ?? "");
  const [sortOrder, setSortOrder] = useState(section.sort_order);
  const [published, setPublished] = useState(section.published);
  const [type, setType] = useState(section.section_type);
  const [content, setContent] = useState(JSON.stringify(section.content, null, 2));
  const [err, setErr] = useState<string | null>(null);

  function save() {
    try {
      const parsed = JSON.parse(content);
      setErr(null);
      onSave({
        label: label || null,
        sort_order: sortOrder,
        published,
        section_type: type as UpsertInput["section_type"],
        content: parsed,
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  return (
    <div className="card-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <code className="rounded bg-muted px-2 py-0.5 text-xs">{section.section_key}</code>
        <select
          value={type} onChange={(e) => setType(e.target.value)}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          {SECTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-20 rounded border border-border bg-background px-2 py-1 text-xs" title="Order"
        />
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published
        </label>
        <div className="ml-auto flex gap-2">
          <button onClick={save} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Save</button>
          <button onClick={onDelete} className="rounded-full border border-border px-3 py-1 text-xs">Delete</button>
        </div>
      </div>
      <input
        value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional)"
        className="mt-3 w-full rounded border border-border bg-background px-3 py-2 text-sm"
      />
      <textarea
        value={content} onChange={(e) => setContent(e.target.value)}
        spellCheck={false} rows={Math.min(20, Math.max(6, content.split("\n").length))}
        className="mt-2 w-full rounded border border-border bg-background px-3 py-2 font-mono text-xs"
      />
      {err && <div className="mt-2 text-xs text-destructive">JSON error: {err}</div>}
    </div>
  );
}

function NewSectionRow({
  pageSlug, nextOrder, onCreate,
}: { pageSlug: string; nextOrder: number; onCreate: (payload: UpsertInput) => void }) {
  const [key, setKey] = useState("");
  const [type, setType] = useState<UpsertInput["section_type"]>("text");
  const [label, setLabel] = useState("");

  function create() {
    if (!key.trim()) { toast.error("section_key required"); return; }
    const seed: Record<string, unknown> =
      type === "text" ? { text: "" }
      : type === "richtext" ? { html: "" }
      : type === "list" ? { items: [] }
      : type === "image" ? { src: "", alt: "" }
      : type === "stat" ? { value: "", label: "" }
      : {};
    onCreate({
      page_slug: pageSlug,
      section_key: key.trim(),
      section_type: type,
      sort_order: nextOrder,
      label: label || null,
      content: seed as never,
      published: true,
    });
    setKey(""); setLabel("");
  }

  return (
    <div className="card-surface border-dashed p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add new section</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={key} onChange={(e) => setKey(e.target.value)} placeholder="section_key (e.g. hero)"
          className="flex-1 min-w-[180px] rounded border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional)"
          className="flex-1 min-w-[180px] rounded border border-border bg-background px-3 py-2 text-sm"
        />
        <select
          value={type} onChange={(e) => setType(e.target.value as UpsertInput["section_type"])}
          className="rounded border border-border bg-background px-2 py-1 text-sm"
        >
          {SECTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={create} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Add</button>
      </div>
    </div>
  );
}