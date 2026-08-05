import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
            <span className="pulse-dot" />
            CPR PRAYAS<sup className="text-[0.55em] text-pulse ml-0.5">™</sup>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Engineered to give every heart a second chance at life. Intelligent real-time
            CPR guidance for hospitals, schools, transit hubs, and everyday bystanders.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="eyebrow-emerald">AHA 2025</span>
            <span className="eyebrow-emerald">ISO 13485</span>
            <span className="eyebrow-emerald">Startup India</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-ink">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-ink">Products</Link></li>
            <li><Link to="/applications" className="hover:text-ink">Applications</Link></li>
            <li><Link to="/clinical-validation" className="hover:text-ink">Clinical Validation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-ink">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-ink">About</Link></li>
            <li><Link to="/patents" className="hover:text-ink">Patents & IP</Link></li>
            <li><Link to="/faq" className="hover:text-ink">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} CPR PRAYAS™ MedTech. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-ink">Admin</Link>
            <span className="hidden text-border md:inline">|</span>
            <p className="hidden md:inline">Kanpur, India · contact@cprprayas.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}