import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Admin sign in | CPR PRAYAS™" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup" | "reset" | "update">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/auth",
        });
        if (error) throw error;
        toast.success("Password reset email sent");
        setMode("signin");
        return;
      }
      if (mode === "update") {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Password updated");
        nav({ to: "/admin" });
        return;
      }
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created");
      }
      nav({ to: redirect || "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <div className="w-full card-surface p-8">
        <h1 className="font-display text-2xl font-bold">
          {mode === "signin"
            ? "Admin sign in"
            : mode === "signup"
              ? "Create admin account"
              : mode === "reset"
                ? "Reset password"
                : "Set new password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "reset"
            ? "Enter your admin email to receive a secure reset link."
            : mode === "update"
              ? "Create a new password for your admin account."
              : "CPR PRAYAS™ site admin. Only invited users can edit content."}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode !== "update" && <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>}
          {mode !== "reset" && <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {mode === "update" ? "New password" : "Password"}
            </label>
            <input
              type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>}
          <button
            type="submit" disabled={busy}
            className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : mode === "reset"
                    ? "Send reset link"
                    : "Update password"}
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {mode === "signin" && <>
            <button type="button" onClick={() => setMode("signup")} className="text-muted-foreground hover:text-pulse">
              Need an account? Sign up
            </button>
            <button type="button" onClick={() => setMode("reset")} className="text-muted-foreground hover:text-pulse">
              Forgot password?
            </button>
          </>}
          {mode !== "signin" && <button type="button" onClick={() => setMode("signin")} className="text-muted-foreground hover:text-pulse">
            Back to sign in
          </button>}
        </div>
      </div>
    </div>
  );
}