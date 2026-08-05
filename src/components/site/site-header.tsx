import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/how-to-use", label: "How to use" },
  { to: "/applications", label: "Applications" },
  { to: "/hotels", label: "Hotels" },
  { to: "/clinical-validation", label: "Clinical" },
  { to: "/patents", label: "Patents" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight">
          <span className="pulse-dot" />
          <span className="text-ink">
            CPR PRAYAS<sup className="ml-0.5 text-[0.55em] text-pulse font-semibold">™</sup>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-border bg-surface/60 px-1.5 py-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-background text-ink shadow-sm" }}
              activeOptions={{ exact: false }}
              className="rounded-full px-3.5 py-1.5 text-[0.82rem] font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-pulse px-4 py-2 text-[0.82rem] font-semibold text-pulse-foreground shadow-sm transition hover:brightness-110"
          >
            Request demo
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border transition-[max-height] duration-300",
          open ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-accent text-pulse" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-pulse px-4 py-2.5 text-center text-sm font-semibold text-pulse-foreground"
          >
            Request demo
          </Link>
        </nav>
      </div>
    </header>
  );
}