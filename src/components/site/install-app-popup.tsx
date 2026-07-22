import { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "prayas-install-dismissed-at";
const SHOW_AFTER_MS = 4000;
const REMIND_AFTER_MS = 1000 * 60 * 60 * 24 * 3; // 3 days

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS
    window.navigator.standalone === true
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
}

export function InstallAppPopup() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) return;

    const last = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (last && Date.now() - last < REMIND_AFTER_MS) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    if (isIOS()) {
      setIos(true);
      const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onBIP);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 lg:bottom-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pulse/10 text-pulse">
            <Smartphone className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-ink">
                Install CPR PRAYAS App
              </h3>
              <button
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted-foreground">
              {ios
                ? "Tap Share in Safari, then 'Add to Home Screen' to install PRAYAS as an app."
                : "Add PRAYAS to your home screen for one-tap access — works offline-ready and feels native."}
            </p>
            {!ios && deferred && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={install}
                  className="inline-flex items-center gap-1.5 rounded-full bg-pulse px-4 py-2 text-[0.8rem] font-semibold text-pulse-foreground shadow-sm transition hover:brightness-110"
                >
                  <Download className="h-3.5 w-3.5" />
                  Install App
                </button>
                <button
                  onClick={close}
                  className="rounded-full px-3 py-2 text-[0.8rem] font-medium text-muted-foreground hover:text-ink"
                >
                  Not now
                </button>
              </div>
            )}
            {ios && (
              <button
                onClick={close}
                className="mt-3 rounded-full bg-secondary px-4 py-2 text-[0.8rem] font-medium text-ink hover:bg-secondary/70"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}