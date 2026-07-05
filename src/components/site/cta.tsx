import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "pulse" | "ink" | "outline";

const styles: Record<Variant, string> = {
  pulse:
    "bg-pulse text-pulse-foreground shadow-sm hover:bg-white",
  ink:
    "bg-ink text-background hover:opacity-90",
  outline:
    "border border-border bg-surface/60 text-ink hover:bg-surface",
};

export function CtaLink({
  to,
  variant = "pulse",
  className,
  children,
  ...rest
}: {
  to: ComponentProps<typeof Link>["to"];
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all",
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}