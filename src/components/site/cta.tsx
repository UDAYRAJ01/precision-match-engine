import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "pulse" | "ink" | "outline";

const styles: Record<Variant, string> = {
  pulse:
    "bg-pulse text-pulse-foreground shadow-sm hover:brightness-110",
  ink:
    "bg-ink text-primary-foreground shadow-sm hover:opacity-90",
  outline:
    "border border-border bg-background text-ink hover:bg-secondary",
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
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}