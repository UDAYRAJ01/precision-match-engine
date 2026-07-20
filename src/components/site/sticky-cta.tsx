import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Package, BookOpen, Building2, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  to: "/" | "/products" | "/how-to-use" | "/hotels" | "/contact";
  label: string;
  icon: typeof Home;
  exact?: boolean;
  primary?: boolean;
};

const TABS: Tab[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/products", label: "Products", icon: Package },
  { to: "/how-to-use", label: "How to", icon: BookOpen },
  { to: "/hotels", label: "Hotels", icon: Building2 },
  { to: "/contact", label: "Demo", icon: PhoneCall, primary: true },
];

export function StickyCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-2 mb-2 rounded-[1.75rem] border border-white/10 bg-background/85 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <ul className="grid grid-cols-5 px-1.5 py-1.5">
        {TABS.map(({ to, label, icon: Icon, exact, primary }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[0.66rem] font-semibold tracking-tight transition-colors",
                  primary
                    ? "text-pulse"
                    : active
                      ? "text-ink"
                      : "text-muted-foreground hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full transition-all",
                    primary
                      ? "h-12 w-12 -mt-5 bg-pulse text-pulse-foreground shadow-[0_10px_24px_-6px_color-mix(in_oklch,var(--pulse)_75%,transparent)] ring-4 ring-background"
                      : active
                        ? "h-9 w-9 bg-pulse/15 text-pulse"
                        : "h-9 w-9 bg-transparent",
                  )}
                >
                  <Icon className={cn(primary ? "h-5 w-5" : "h-[18px] w-[18px]")} strokeWidth={2.2} />
                </span>
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
    </nav>
  );
}