import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Package, BookOpen, Building2, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/products", label: "Products", icon: Package },
  { to: "/how-to-use", label: "How to", icon: BookOpen },
  { to: "/hotels", label: "Hotels", icon: Building2 },
  { to: "/contact", label: "Demo", icon: PhoneCall, primary: true },
] as const;

export function StickyCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.55)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-1.5 pt-1.5">
        {TABS.map(({ to, label, icon: Icon, exact, primary }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[0.68rem] font-semibold tracking-tight transition-colors",
                  primary
                    ? "text-pulse"
                    : active
                      ? "text-ink"
                      : "text-muted-foreground hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all",
                    primary
                      ? "bg-pulse text-pulse-foreground shadow-[0_6px_20px_-6px_color-mix(in_oklch,var(--pulse)_70%,transparent)]"
                      : active
                        ? "bg-background text-ink"
                        : "bg-transparent",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}