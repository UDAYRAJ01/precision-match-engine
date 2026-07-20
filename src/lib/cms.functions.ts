import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };
export type SectionContent = { [k: string]: JsonValue } | JsonValue[];
export type PageSection = {
  id: string;
  page_slug: string;
  section_key: string;
  section_type: string;
  sort_order: number;
  label: string | null;
  content: SectionContent;
  published: boolean;
  updated_at: string;
};

function publicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPageSections = createServerFn({ method: "GET" })
  .inputValidator((input: { page: string }) => z.object({ page: z.string().min(1).max(80) }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: rows, error } = await sb
      .from("page_sections")
      .select("*")
      .eq("page_slug", data.page)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) return [] as PageSection[];
    return (rows ?? []) as unknown as PageSection[];
  });

export const listAllSections = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("page_sections")
      .select("*")
      .order("page_slug", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as unknown as PageSection[];
  });

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  page_slug: z.string().min(1).max(80),
  section_key: z.string().min(1).max(120),
  section_type: z.enum(["fields", "text", "richtext", "list", "image", "stat", "json"]).default("fields"),
  sort_order: z.number().int().default(0),
  label: z.string().max(200).nullable().optional(),
  content: z.unknown(),
  published: z.boolean().default(true),
});

export const upsertSection = createServerFn({ method: "POST" })
  .inputValidator((input) => upsertSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      page_slug: data.page_slug,
      section_key: data.section_key,
      section_type: data.section_type,
      sort_order: data.sort_order,
      label: data.label ?? null,
      content: data.content as never,
      published: data.published,
      updated_by: null,
    };

    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("page_sections")
        .update(row)
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw error;
      return updated;
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("page_sections")
      .insert(row)
      .select("*")
      .single();
    if (error) throw error;
    return inserted;
  });

export const deleteSection = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("page_sections").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export type DemoRequest = {
  id: string;
  full_name: string;
  email: string;
  organization_type: string;
  created_at: string;
};

export const listDemoRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return (data ?? []) as unknown as DemoRequest[];
  });

export const duplicateSection = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: src, error: e1 } = await supabaseAdmin
      .from("page_sections").select("*").eq("id", data.id).single();
    if (e1 || !src) throw e1 ?? new Error("Not found");
    const { data: ins, error: e2 } = await supabaseAdmin.from("page_sections").insert({
      page_slug: src.page_slug,
      section_key: `${src.section_key}-copy-${Math.random().toString(36).slice(2, 6)}`,
      section_type: src.section_type,
      sort_order: src.sort_order + 1,
      label: src.label ? `${src.label} (copy)` : null,
      content: src.content as never,
      published: false,
      updated_by: null,
    }).select("*").single();
    if (e2) throw e2;
    return ins;
  });

export const reorderSection = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; sort_order: number }) =>
    z.object({ id: z.string().uuid(), sort_order: z.number().int() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("page_sections").update({ sort_order: data.sort_order }).eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });