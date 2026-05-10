"use client";

import { useEffect, useRef } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIEWPORT_WIDTHS, type Viewport } from "./viewport-switcher";

/**
 * Renders a wireframe HTML inside a sandboxed iframe at the chosen viewport
 * width. Wireframes are gray-box (no JS), so allow-same-origin alone is
 * sufficient for styles to apply without granting script execution.
 *
 * The iframe is centered horizontally inside its container; if the
 * container is wider than the viewport width, padding shows the device
 * frame. If the container is narrower, the iframe will horizontally scroll
 * inside its row, preserving the actual layout the architect produced.
 *
 * `onScrollTo` and `scrollToY` props let the parent sync scroll across
 * multiple frames in the Compare view.
 */
export interface WireframeFrameHandle {
  scrollTo: (y: number) => void;
  getScrollY: () => number;
}

export function WireframeFrame({
  src,
  viewport,
  className,
  onScroll,
}: {
  src?: string;
  viewport: Viewport;
  className?: string;
  onScroll?: (y: number) => void;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const lastEmittedY = useRef<number>(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const handler = () => {
      raf = 0;
      try {
        const y = el.contentWindow?.scrollY ?? 0;
        if (y !== lastEmittedY.current) {
          lastEmittedY.current = y;
          onScroll?.(y);
        }
      } catch { /* cross-origin guard */ }
    };
    const onScrollEvent = () => {
      if (raf) return;
      raf = requestAnimationFrame(handler);
    };
    let detached: (() => void) | undefined;
    const attach = () => {
      try {
        const win = el.contentWindow;
        if (!win) return;
        win.addEventListener("scroll", onScrollEvent, { passive: true });
        detached = () => win.removeEventListener("scroll", onScrollEvent);
      } catch { /* cross-origin */ }
    };
    el.addEventListener("load", attach);
    attach();
    return () => {
      el.removeEventListener("load", attach);
      if (raf) cancelAnimationFrame(raf);
      detached?.();
    };
  }, [onScroll, src]);

  if (!src) {
    return (
      <div className={cn("flex items-center justify-center rounded border border-dashed border-border bg-muted/40 text-muted-foreground", className)}>
        <ImageOff className="mr-2 h-5 w-5" /> wireframe missing
      </div>
    );
  }

  const width = VIEWPORT_WIDTHS[viewport];
  return (
    <div className={cn("relative h-full w-full overflow-auto scrollbar-thin bg-muted/30", className)}>
      <div className="mx-auto py-4" style={{ width: `${width}px`, maxWidth: "100%" }}>
        <iframe
          ref={ref}
          src={src}
          title="wireframe"
          sandbox="allow-same-origin"
          className="block h-[calc(100vh-220px)] w-full rounded border border-border bg-white shadow-sm"
          style={{ minHeight: "640px" }}
        />
      </div>
    </div>
  );
}

/**
 * Imperative scroll target used by the Compare view to sync two iframes.
 * Kept as a separate function so consumers don't have to forwardRef.
 */
export function scrollFrame(iframe: HTMLIFrameElement | null | undefined, y: number) {
  try {
    iframe?.contentWindow?.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  } catch { /* ignore */ }
}
