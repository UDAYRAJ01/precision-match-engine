import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  bordered = true,
  surface,
  children,
}: {
  id?: string;
  className?: string;
  bordered?: boolean;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-y",
        bordered && "border-t border-border",
        surface && "bg-surface",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "mx-0 text-left",
      )}
    >
      {eyebrow && (
        <div className={cn("mb-4 flex", align === "center" ? "justify-center" : "")}>
          <span className="eyebrow">
            <span className="pulse-dot" /> {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function DeviceMock({
  label = "CPR PRAYAS™",
  tone = "pulse",
}: {
  label?: string;
  tone?: "pulse" | "emerald" | "ink";
}) {
  const toneClass =
    tone === "emerald"
      ? "from-emerald/25 to-emerald/5"
      : tone === "ink"
        ? "from-ink/25 to-ink/5"
        : "from-pulse/25 to-pulse/5";
  return (
    <div className="relative isolate flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface-elevated">
      <div className={cn("absolute inset-8 rounded-[36%] bg-gradient-to-br opacity-70 blur-2xl", toneClass)} />
      <div className="relative flex h-3/5 w-3/5 items-center justify-center rounded-[32%] border border-border/60 bg-background shadow-xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="pulse-dot" />
          <span className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
            {label}
          </span>
          <div className="mt-3 h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-2/3 animate-pulse bg-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}