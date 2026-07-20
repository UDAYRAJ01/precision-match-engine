import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, useRef } from "react";
import { toast } from "sonner";
import { listAllSections, upsertSection, deleteSection, type PageSection } from "@/lib/cms.functions";
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

function PageEditor() {
  const { page } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listAllSections);
  const upsertFn = useServerFn(upsertSection);
  const deleteFn = useServerFn(deleteSection);

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

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div>
          <Link to="/admin" className="hover:text-pulse">← All pages</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{page}</span>
        </div>
        <a
          href={page === "home" ? "/" : `/${page}`}
          target="_blank" rel="noreferrer"
          className="rounded-full border border-border px-3 py-1 hover:text-pulse"
        >
          Open live page ↗
        </a>
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
            onSave={(patch) => upsertM.mutate({
              id: s.id,
              page_slug: s.page_slug,
              section_key: s.section_key,
              section_type: (patch.section_type ?? s.section_type) as SectionType,
              sort_order: patch.sort_order ?? s.sort_order,
              label: patch.label ?? s.label ?? null,
              content: patch.content ?? s.content,
              published: patch.published ?? s.published,
            })}
            onDelete={() => { if (confirm("Delete this section?")) deleteM.mutate(s.id); }}
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
  section, onSave, onDelete,
}: { section: PageSection; onSave: (patch: Partial<UpsertInput>) => void; onDelete: () => void }) {
  const [label, setLabel] = useState(section.label ?? "");
  const [sortOrder, setSortOrder] = useState(section.sort_order);
  const [published, setPublished] = useState(section.published);
  const [type, setType] = useState<SectionType>(section.section_type as SectionType);
  const [content, setContent] = useState<unknown>(section.content);
  const [advanced, setAdvanced] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(section.content, null, 2));
  const [err, setErr] = useState<string | null>(null);

  function save() {
    let finalContent = content;
    if (advanced) {
      try { finalContent = JSON.parse(jsonText); setErr(null); }
      catch (e) { setErr(e instanceof Error ? e.message : "Invalid JSON"); return; }
    }
    onSave({
      label: label || null,
      sort_order: sortOrder,
      published,
      section_type: type,
      content: finalContent,
    });
  }

  return (
    <div className="card-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <code className="rounded bg-muted px-2 py-0.5 text-xs">{section.section_key}</code>
        <select
          value={type} onChange={(e) => setType(e.target.value as SectionType)}
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
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)} />
          Advanced (JSON)
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

      {advanced ? (
        <>
          <textarea
            value={jsonText} onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false} rows={Math.min(20, Math.max(6, jsonText.split("\n").length))}
            className="mt-3 w-full rounded border border-border bg-background px-3 py-2 font-mono text-xs"
          />
          {err && <div className="mt-2 text-xs text-destructive">JSON error: {err}</div>}
        </>
      ) : (
        <FieldEditor value={content} type={type} onChange={setContent} />
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
        Empty. Use "Add field" below or toggle Advanced (JSON).
        <AddFieldRow onAdd={(k, kind) => onChange({ ...value, [k]: kind === "image" ? "" : "" })} />
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
      <AddFieldRow onAdd={(k, kind) => onChange({ ...value, [k]: kind === "image" ? "" : "" })} />
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
  const long = typeof value === "string" && value.length > 80;
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

function AddFieldRow({ onAdd }: { onAdd: (key: string, kind: "text" | "image") => void }) {
  const [k, setK] = useState("");
  const [kind, setKind] = useState<"text" | "image">("text");
  return (
    <div className="mt-3 flex flex-wrap gap-2 border-t border-border/40 pt-3">
      <input
        value={k} onChange={(e) => setK(e.target.value)} placeholder="new field name (e.g. title)"
        className="flex-1 min-w-[160px] rounded border border-border bg-background px-3 py-2 text-xs"
      />
      <select value={kind} onChange={(e) => setKind(e.target.value as "text" | "image")}
        className="rounded border border-border bg-background px-2 py-1 text-xs">
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>
      <button
        onClick={() => { if (k.trim()) { onAdd(k.trim(), kind); setK(""); } }}
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
        <div className="overflow-hidden rounded border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <button
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="ml-auto text-xs text-muted-foreground hover:text-destructive"
              >Remove</button>
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

  function create() {
    if (!key.trim()) { toast.error("section_key required"); return; }
    const seed: unknown =
      type === "fields" ? { title: "", subtitle: "", image: "" }
      : type === "text" ? { text: "" }
      : type === "richtext" ? { html: "" }
      : type === "list" ? { items: [] }
      : type === "image" ? { image: "", alt: "" }
      : type === "stat" ? { value: "", label: "" }
      : {};
    onCreate({
      page_slug: pageSlug,
      section_key: key.trim(),
      section_type: type,
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
          value={key} onChange={(e) => setKey(e.target.value)} placeholder="section_key (e.g. hero)"
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
        <button onClick={create} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Add</button>
      </div>
    </div>
  );
}