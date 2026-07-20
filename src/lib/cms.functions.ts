import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
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
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (isAdmin.error || !isAdmin.data) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("page_sections")
      .select("*")
      .order("page_slug", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as unknown as PageSection[];
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) return { isAdmin: false, userId: context.userId };
    return { isAdmin: Boolean(data), userId: context.userId };
  });

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  page_slug: z.string().min(1).max(80),
  section_key: z.string().min(1).max(120),
  section_type: z.enum(["text", "richtext", "list", "image", "stat", "json"]).default("text"),
  sort_order: z.number().int().default(0),
  label: z.string().max(200).nullable().optional(),
  content: z.unknown(),
  published: z.boolean().default(true),
});

export const upsertSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => upsertSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (isAdmin.error || !isAdmin.data) throw new Error("Forbidden");

    const row = {
      page_slug: data.page_slug,
      section_key: data.section_key,
      section_type: data.section_type,
      sort_order: data.sort_order,
      label: data.label ?? null,
      content: data.content as never,
      published: data.published,
      updated_by: context.userId,
    };

    if (data.id) {
      const { data: updated, error } = await context.supabase
        .from("page_sections")
        .update(row)
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw error;
      return updated;
    }
    const { data: inserted, error } = await context.supabase
      .from("page_sections")
      .insert(row)
      .select("*")
      .single();
    if (error) throw error;
    return inserted;
  });

export const deleteSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (isAdmin.error || !isAdmin.data) throw new Error("Forbidden");
    const { error } = await context.supabase.from("page_sections").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });