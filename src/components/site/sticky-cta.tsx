import { Link } from "@tanstack/react-router";
import { Phone, Mail, CalendarCheck } from "lucide-react";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.5)]">
      <div className="container-page grid grid-cols-3 gap-2 py-2.5">
        <a
          href="tel:+919999999999"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-surface-elevated sm:text-sm"
        >
          <Phone className="h-4 w-4 text-pulse" />
          <span>Call</span>
        </a>
        <a
          href="mailto:contact@cprprayas.com"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-surface-elevated sm:text-sm"
        >
          <Mail className="h-4 w-4 text-pulse" />
          <span>Email</span>
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-pulse px-3 py-2.5 text-xs font-semibold text-pulse-foreground transition-opacity hover:opacity-90 sm:text-sm"
        >
          <CalendarCheck className="h-4 w-4" />
          <span>Request demo</span>
        </Link>
      </div>
    </div>
  );
}