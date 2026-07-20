import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { checkIsAdmin, bootstrapFirstAdmin } from "@/lib/cms.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin | CPR PRAYAS™" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const check = useServerFn(checkIsAdmin);
  const bootstrap = useServerFn(bootstrapFirstAdmin);
  const nav = useNavigate();
  const q = useQuery({ queryKey: ["isAdmin"], queryFn: () => check(), retry: false });

  if (q.isLoading) return <div className="p-8 text-sm text-muted-foreground">Checking access…</div>;
  if (!q.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        <h1 className="text-xl font-bold">Not an admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account is signed in but doesn't have admin access. Contact the site owner to be added.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">User ID: <code>{q.data?.userId}</code></p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={async () => {
              try { await bootstrap(); toast.success("You are now admin"); q.refetch(); }
              catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
            }}
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >Claim first admin</button>
          <button
            onClick={async () => { await supabase.auth.signOut(); nav({ to: "/auth" }); }}
            className="rounded-full border border-border px-4 py-2 text-xs"
          >Sign out</button>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          "Claim first admin" only works if no admin exists yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow"><span className="pulse-dot" /> Admin console</div>
          <h1 className="mt-2 font-display text-2xl font-bold">Site content</h1>
        </div>
        <div className="flex gap-2 text-xs">
          <Link to="/admin" className="rounded-full border border-border px-3 py-1.5">All pages</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); nav({ to: "/auth", replace: true }); }}
            className="rounded-full border border-border px-3 py-1.5"
          >Sign out</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}