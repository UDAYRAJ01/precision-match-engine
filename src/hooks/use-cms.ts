import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import { listPageSections, type PageSection } from "@/lib/cms.functions";

export function useCmsContent(page: string) {
  const fn = useServerFn(listPageSections);
  const q = useQuery({
    queryKey: ["cms", "page", page],
    queryFn: () => fn({ data: { page } }),
    staleTime: 30_000,
  });
  const map = useMemo(() => {
    const m = new Map<string, Record<string, unknown>>();
    for (const s of (q.data ?? []) as PageSection[]) {
      if (s.content && typeof s.content === "object" && !Array.isArray(s.content)) {
        m.set(s.section_key, s.content as Record<string, unknown>);
      }
    }
    return m;
  }, [q.data]);

  function get<T extends Record<string, unknown>>(key: string, defaults: T): T {
    const c = map.get(key);
    if (!c) return defaults;
    const merged: Record<string, unknown> = { ...defaults };
    for (const k of Object.keys(defaults)) {
      const v = c[k];
      if (typeof v === "string" && v.trim() === "") continue;
      if (v !== undefined && v !== null) merged[k] = v;
    }
    return merged as T;
  }
  return { get, loading: q.isLoading };
}