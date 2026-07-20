import { cn } from "@/lib/utils";

export function PageBanner({
  image,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="container-page relative py-20 sm:py-28 lg:py-32">
        <div
          className={cn(
            "max-w-2xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <span className="eyebrow">
              <span className="pulse-dot" /> {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}