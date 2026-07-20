import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().min(3).max(120),
  // base64 (no data: prefix)
  base64: z.string().min(10).max(8_000_000),
});

export const uploadCmsImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const bytes = Buffer.from(data.base64, "base64");
    const ext = (data.filename.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from("cms-images")
      .upload(key, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw error;
    return { url: `/api/public/cms-image/${key}`, path: key };
  });