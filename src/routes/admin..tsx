import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState, useRef } from "react";
import { toast } from "sonner";
import {
  listAllSections, upsertSection, deleteSection, duplicateSection, reorderSection,
  type PageSection,
} from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/cms-upload.functions";

export const Route = createFileRoute("/admin/$page")({
  component: PageEditor,
});

const SECTION_TYPES = ["fields", "text", "richtext", "list", "image", "stat", "json"] as const;
type SectionType = (typeof SECTION_TYPES)[number];

type UpsertInput = {
  id?: string;
  page_slug: string;
  section_key: string;
  section_type: SectionType;
  sort_order: number;
  label: string | null;
  content: unknown;
  published: boolean;
};

const TEMPLATES: { key: string; label: string; type: SectionType; seed: unknown }[] = [
  { key: "hero", label: "Hero", type: "fields", seed: { eyebrow: "", title: "", subtitle: "", image: "" } },
  { key: "features", label: "Feature list", type: "list", seed: { items: [{ title: "", body: "", icon: "" }] } },
  { key: "stats", label: "Stats row", type: "list", seed: { items: [{ value: "", label: "" }] } },
  { key: "cta", label: "Call to action", type: "fields", seed: { title: "", subtitle: "", buttonLabel: "", buttonHref: "" } },
  { key: "testimonial", label: "Testimonial", type: "fields", seed: { quote: "", author: "", role: "", image: "" } },
  { key: "faq", label: "FAQ list", type: "list", seed: { items: [{ q: "", a: "" }] } },
];

function PageEditor() {
  const { page } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listAllSections);
  const upsertFn = useServerFn(upsertSection);
  const deleteFn = useServerFn(deleteSection);
  const dupFn = useServerFn(duplicateSection);
  const reorderFn = useServerFn(reorderSection);

  const q = useQuery({ queryKey: ["admin", "sections"], queryFn: () => listFn() });
  const pageSections = useMemo(
    () => ((q.data ?? []) as PageSection[])
      .filter((s) => s.page_slug === page)
      .sort((a, b) => a.sort_order - b.sort_order),
    [q.data, page],
  );

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "sections"] });
    qc.invalidateQueries({ queryKey: ["cms", "page", page] });
  };

  const upsertM = useMutation({
    mutationFn: (payload: UpsertInput) => upsertFn({ data: payload }),
    onSuccess: () => { invalidate(); toast.success("Saved"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => { invalidate(); toast.success("Deleted"); },
  });
  const dupM = useMutation({
    mutationFn: (id: string) => dupFn({ data: { id } }),
    onSuccess: () => { invalidate(); toast.success("Duplicated"); },
  });
  const reorderM = useMutation({
    mutationFn: (v: { id: string; sort_order: number }) => reorderFn({ data: v }),
    onSuccess: () => invalidate(),
  });

  function move(idx: number, dir: -1 | 1) {
    const a = pageSections[idx];
    const b = pageSections[idx + dir];
    if (!a || !b) return;
    reorderM.mutate({ id: a.id, sort_order: b.sort_order });
    reorderM.mutate({ id: b.id, sort_order: a.sort_order });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">
          <Link to="/admin" className="hover:text-pulse">Dashboard</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{page}</span>
          <span className="ml-3 text-muted-foreground">· {pageSections.length} section{pageSections.length === 1 ? "" : "s"}</span>
        </div>
        <a
          href={page === "home" ? "/" : `/${page}`}
          target="_blank" rel="noreferrer"
          className="rounded-full border border-border px-3 py-1.5 text-xs hover:text-pulse"
        >
          Open live page ↗
        </a>
      </div>

      <div className="space-y-4">
        {pageSections.length === 0 && (
          <div className="card-surface p-6 text-sm text-muted-foreground">
            No sections yet for <code>{page}</code>. Pick a template below or add a custom section.
          </div>
        )}
        {pageSections.map((s, idx) => (
          <SectionRow
            key={s.id}
            index={idx}
            total={pageSections.length}
            section={s}
            onSave={(patch) => upsertM.mutate({
              id: s.id,
              page_slug: s.page_slug,
              section_key: patch.section_key ?? s.section_key,
              section_type: (patch.section_type ?? s.section_type) as SectionType,
              sort_order: patch.sort_order ?? s.sort_order,
              label: patch.label ?? s.label ?? null,
              content: patch.content ?? s.content,
              published: patch.published ?? s.published,
            })}
            onTogglePublish={() => upsertM.mutate({
              id: s.id, page_slug: s.page_slug, section_key: s.section_key,
              section_type: s.section_type as SectionType, sort_order: s.sort_order,
              label: s.label, content: s.content, published: !s.published,
            })}
            onDuplicate={() => dupM.mutate(s.id)}
            onDelete={() => { if (confirm("Delete this section?")) deleteM.mutate(s.id); }}
            onMove={(d) => move(idx, d)}
          />
        ))}

        <NewSectionRow
          pageSlug={page}
          nextOrder={(pageSections.at(-1)?.sort_order ?? 0) + 10}
          onCreate={(payload) => upsertM.mutate(payload)}
        />
      </div>
    </div>
  );
}

/* ---------- Row ---------- */

function SectionRow({
  section, index, total, onSave, onTogglePublish, onDuplicate, onDelete, onMove,
}: {
  section: PageSection; index: number; total: number;
  onSave: (patch: Partial<UpsertInput>) => void;
  onTogglePublish: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [label, setLabel] = useState(section.label ?? "");
  const [key, setKey] = useState(section.section_key);
  const [type, setType] = useState<SectionType>(section.section_type as SectionType);
  const [content, setContent] = useState<unknown>(section.content);
  const [advanced, setAdvanced] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(section.content, null, 2));
  const [err, setErr] = useState<string | null>(null);

  // Reset local state when the underlying section changes (e.g. after save).
  useEffect(() => {
    setLabel(section.label ?? "");
    setKey(section.section_key);
    setType(section.section_type as SectionType);
    setContent(section.content);
    setJsonText(JSON.stringify(section.content, null, 2));
  }, [section.id, section.updated_at]);

  const dirty =
    label !== (section.label ?? "") ||
    key !== section.section_key ||
    type !== section.section_type ||
    (advanced ? jsonText !== JSON.stringify(section.content, null, 2) : JSON.stringify(content) !== JSON.stringify(section.content));

  function save() {
    let finalContent = content;
    if (advanced) {
      try { finalContent = JSON.parse(jsonText); setErr(null); }
      catch (e) { setErr(e instanceof Error ? e.message : "Invalid JSON"); return; }
    }
    onSave({
      label: label || null,
      section_key: key,
      section_type: type,
      content: finalContent,
    });
  }

  return (
    <div className={`card-surface p-5 ${dirty ? "ring-1 ring-amber-500/40" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="rounded border border-border px-2 py-1 text-xs text-muted-foreground"
          title={collapsed ? "Expand" : "Collapse"}
        >{collapsed ? "▸" : "▾"}</button>
        <input
          value={key} onChange={(e) => setKey(e.target.value)}
          className="rounded border border-border bg-background px-2 py-1 font-mono text-xs"
          title="section_key"
        />
        <select
          value={type} onChange={(e) => setType(e.target.value as SectionType)}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          {SECTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${section.published ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"}`}>
          {section.published ? "Live" : "Draft"}
        </span>
        {dirty && <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-500">Unsaved</span>}

        <div className="ml-auto flex flex-wrap gap-1">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="rounded border border-border px-2 py-1 text-xs disabled:opacity-30" title="Move up">↑</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="rounded border border-border px-2 py-1 text-xs disabled:opacity-30" title="Move down">↓</button>
          <button onClick={onTogglePublish} className="rounded border border-border px-2 py-1 text-xs" title="Toggle publish">
            {section.published ? "Unpublish" : "Publish"}
          </button>
          <button onClick={onDuplicate} className="rounded border border-border px-2 py-1 text-xs">Duplicate</button>
          <label className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs">
            <input type="checkbox" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)} />
            JSON
          </label>
          <button onClick={save} disabled={!dirty} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground disabled:opacity-50">Save</button>
          <button onClick={onDelete} className="rounded-full border border-destructive/60 px-3 py-1 text-xs text-destructive">Delete</button>
        </div>
      </div>

      {!collapsed && (
        <>
          <input
            value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional — shown only in admin)"
            className="mt-3 w-full rounded border border-border bg-background px-3 py-2 text-sm"
          />
          {advanced ? (
            <>
              <textarea
                value={jsonText} onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false} rows={Math.min(24, Math.max(6, jsonText.split("\n").length))}
                className="mt-3 w-full rounded border border-border bg-background px-3 py-2 font-mono text-xs"
              />
              {err && <div className="mt-2 text-xs text-destructive">JSON error: {err}</div>}
            </>
          ) : (
            <FieldEditor value={content} type={type} onChange={setContent} />
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Field editor (per type) ---------- */

function FieldEditor({
  value, type, onChange,
}: { value: unknown; type: SectionType; onChange: (v: unknown) => void }) {
  if (type === "list") {
    const arr = Array.isArray(value)
      ? value as unknown[]
      : (value && typeof value === "object" && Array.isArray((value as { items?: unknown[] }).items))
        ? (value as { items: unknown[] }).items : [];
    return <ListEditor items={arr} onChange={(items) => onChange({ items })} />;
  }
  const obj: Record<string, unknown> = (value && typeof value === "object" && !Array.isArray(value))
    ? value as Record<string, unknown> : {};
  return <ObjectFieldEditor value={obj} onChange={onChange} />;
}

function ObjectFieldEditor({
  value, onChange,
}: { value: Record<string, unknown>; onChange: (v: Record<string, unknown>) => void }) {
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return (
      <div className="mt-3 rounded border border-dashed border-border p-3 text-xs text-muted-foreground">
        Empty. Use "Add field" below or toggle JSON.
        <AddFieldRow onAdd={(k) => onChange({ ...value, [k]: "" })} />
      </div>
    );
  }
  return (
    <div className="mt-3 space-y-3">
      {keys.map((k) => (
        <FieldRow
          key={k} name={k} value={value[k]}
          onChange={(v) => onChange({ ...value, [k]: v })}
          onRemove={() => { const n = { ...value }; delete n[k]; onChange(n); }}
        />
      ))}
      <AddFieldRow onAdd={(k) => onChange({ ...value, [k]: "" })} />
    </div>
  );
}

function isImageKey(name: string) {
  return /^(image|img|src|photo|banner|cover|icon|logo|thumbnail)/i.test(name);
}

function FieldRow({
  name, value, onChange, onRemove,
}: { name: string; value: unknown; onChange: (v: unknown) => void; onRemove: () => void }) {
  const stringVal = typeof value === "string" ? value : JSON.stringify(value);
  const image = isImageKey(name);
  const long = typeof value === "string" && (value.length > 80 || value.includes("\n"));
  return (
    <div className="rounded border border-border/60 p-3">
      <div className="flex items-center gap-2">
        <label className="text-xs font-mono text-muted-foreground">{name}</label>
        <button onClick={onRemove} className="ml-auto text-xs text-muted-foreground hover:text-destructive">Remove</button>
      </div>
      {image ? (
        <ImageField value={stringVal} onChange={onChange} />
      ) : long ? (
        <textarea
          value={stringVal} onChange={(e) => onChange(e.target.value)}
          rows={Math.min(10, Math.max(3, stringVal.split("\n").length + 1))}
          className="mt-2 w-full rounded border border-border bg-background px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={stringVal} onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded border border-border bg-background px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

function AddFieldRow({ onAdd }: { onAdd: (key: string) => void }) {
  const [k, setK] = useState("");
  return (
    <div className="mt-3 flex flex-wrap gap-2 border-t border-border/40 pt-3">
      <input
        value={k} onChange={(e) => setK(e.target.value)} placeholder="new field name (e.g. title, image, buttonHref)"
        className="flex-1 min-w-[160px] rounded border border-border bg-background px-3 py-2 text-xs"
      />
      <button
        onClick={() => { if (k.trim()) { onAdd(k.trim()); setK(""); } }}
        className="rounded-full border border-border px-3 py-1 text-xs"
      >Add field</button>
    </div>
  );
}

/* ---------- Image field ---------- */

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const uploadFn = useServerFn(uploadCmsImage);
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File) {
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5 MB"); return; }
    setBusy(true);
    try {
      const base64 = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => {
          const s = String(r.result);
          const i = s.indexOf(",");
          res(i >= 0 ? s.slice(i + 1) : s);
        };
        r.onerror = () => rej(r.error);
        r.readAsDataURL(file);
      });
      const out = await uploadFn({ data: { filename: file.name, contentType: file.type || "image/*", base64 } });
      onChange(out.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex flex-wrap gap-2">
        <input
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL or upload →"
          className="flex-1 min-w-[220px] rounded border border-border bg-background px-3 py-2 text-sm"
        />
        <button
          type="button" disabled={busy}
          onClick={() => ref.current?.click()}
          className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >{busy ? "Uploading…" : "Upload image"}</button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="rounded-full border border-border px-3 py-2 text-xs">Clear</button>
        )}
      </div>
      <input
        ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }}
      />
      {value && (
        <div className="overflow-hidden rounded border border-border bg-muted/30">
          <img src={value} alt="" className="max-h-52 w-auto" />
        </div>
      )}
    </div>
  );
}

/* ---------- List editor ---------- */

function ListEditor({ items, onChange }: { items: unknown[]; onChange: (v: unknown[]) => void }) {
  return (
    <div className="mt-3 space-y-2">
      {items.map((it, i) => {
        const isObj = it && typeof it === "object" && !Array.isArray(it);
        return (
          <div key={i} className="rounded border border-border/60 p-3">
            <div className="flex items-center gap-2 pb-2">
              <span className="text-xs text-muted-foreground">Item {i + 1}</span>
              <div className="ml-auto flex gap-1">
                <button onClick={() => { if (i === 0) return; const n = [...items]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; onChange(n); }} disabled={i === 0} className="rounded border border-border px-2 py-0.5 text-xs disabled:opacity-30">↑</button>
                <button onClick={() => { if (i === items.length - 1) return; const n = [...items]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; onChange(n); }} disabled={i === items.length - 1} className="rounded border border-border px-2 py-0.5 text-xs disabled:opacity-30">↓</button>
                <button
                  onClick={() => onChange(items.filter((_, j) => j !== i))}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-destructive"
                >Remove</button>
              </div>
            </div>
            {isObj ? (
              <ObjectFieldEditor
                value={it as Record<string, unknown>}
                onChange={(v) => onChange(items.map((x, j) => j === i ? v : x))}
              />
            ) : (
              <input
                value={typeof it === "string" ? it : JSON.stringify(it)}
                onChange={(e) => onChange(items.map((x, j) => j === i ? e.target.value : x))}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            )}
          </div>
        );
      })}
      <div className="flex gap-2 pt-1">
        <button onClick={() => onChange([...items, ""])} className="rounded-full border border-border px-3 py-1 text-xs">+ Text item</button>
        <button onClick={() => onChange([...items, { title: "", body: "" }])} className="rounded-full border border-border px-3 py-1 text-xs">+ Object item</button>
      </div>
    </div>
  );
}

/* ---------- New section ---------- */

function NewSectionRow({
  pageSlug, nextOrder, onCreate,
}: { pageSlug: string; nextOrder: number; onCreate: (payload: UpsertInput) => void }) {
  const [key, setKey] = useState("");
  const [type, setType] = useState<SectionType>("fields");
  const [label, setLabel] = useState("");

  function create(seedOverride?: unknown, seedType?: SectionType) {
    if (!key.trim()) { toast.error("section_key required"); return; }
    const finalType = seedType ?? type;
    const seed: unknown = seedOverride ?? (
      finalType === "fields" ? { title: "", subtitle: "", image: "" }
      : finalType === "text" ? { text: "" }
      : finalType === "richtext" ? { html: "" }
      : finalType === "list" ? { items: [] }
      : finalType === "image" ? { image: "", alt: "" }
      : finalType === "stat" ? { value: "", label: "" }
      : {}
    );
    onCreate({
      page_slug: pageSlug,
      section_key: key.trim(),
      section_type: finalType,
      sort_order: nextOrder,
      label: label || null,
      content: seed,
      published: true,
    });
    setKey(""); setLabel("");
  }

  return (
    <div className="card-surface border-dashed p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add new section</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={key} onChange={(e) => setKey(e.target.value)} placeholder="section_key (e.g. hero, features)"
          className="flex-1 min-w-[180px] rounded border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional)"
          className="flex-1 min-w-[180px] rounded border border-border bg-background px-3 py-2 text-sm"
        />
        <select
          value={type} onChange={(e) => setType(e.target.value as SectionType)}
          className="rounded border border-border bg-background px-2 py-1 text-sm"
        >
          {SECTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={() => create()} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Add</button>
      </div>

      <div className="mt-4 border-t border-border/60 pt-3">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Quick templates</div>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.key}
              onClick={() => { if (!key.trim()) setKey(t.key); setType(t.type); create(t.seed, t.type); }}
              className="rounded-full border border-border px-3 py-1 text-xs hover:border-pulse/40 hover:text-pulse"
              title={`Insert ${t.label} template`}
            >
              + {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
