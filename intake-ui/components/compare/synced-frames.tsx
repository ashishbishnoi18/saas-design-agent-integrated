"use client";

import { useEffect, useRef } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIEWPORT_WIDTHS, type Viewport } from "@/components/results/viewport-switcher";

/**
 * A pair of sandboxed iframes side-by-side with optional synced scroll.
 *
 * When `synced` is true, scrolling either iframe sets the other to the same
 * scrollY. We guard against feedback loops by remembering which side caused
 * the most recent scroll and ignoring the echoed event from the other side.
 *
 * Each iframe loads its wireframe at the chosen viewport width (the same
 * width Playwright captured at), so the architect's responsive layout
 * renders at the intended breakpoint.
 */
export function SyncedFrames({
  srcA,
  srcB,
  viewport,
  synced,
}: {
  srcA?: string;
  srcB?: string;
  viewport: Viewport;
  synced: boolean;
}) {
  const refA = useRef<HTMLIFrameElement>(null);
  const refB = useRef<HTMLIFrameElement>(null);
  const driver = useRef<"A" | "B" | null>(null);
  const restoreTimer = useRef<number | null>(null);

  // Attach scroll listeners to each iframe's contentWindow once it loads.
  useEffect(() => {
    const wires: Array<() => void> = [];
    function attach(side: "A" | "B", iframe: HTMLIFrameElement | null) {
      if (!iframe) return;
      const onLoad = () => {
        try {
          const win = iframe.contentWindow;
          if (!win) return;
          const handler = () => {
            if (!synced) return;
            if (driver.current && driver.current !== side) {
              // We're being scrolled by the other side's sync — ignore to
              // avoid feedback. Reset the marker shortly after.
              return;
            }
            driver.current = side;
            const y = win.scrollY;
            const other = side === "A" ? refB.current : refA.current;
            try {
              other?.contentWindow?.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
            } catch { /* cross-origin */ }
            if (restoreTimer.current) window.clearTimeout(restoreTimer.current);
            restoreTimer.current = window.setTimeout(() => { driver.current = null; }, 80);
          };
          win.addEventListener("scroll", handler, { passive: true });
          wires.push(() => win.removeEventListener("scroll", handler));
        } catch { /* cross-origin guard */ }
      };
      iframe.addEventListener("load", onLoad);
      wires.push(() => iframe.removeEventListener("load", onLoad));
      // If already loaded (e.g. cached), attach immediately.
      try { if (iframe.contentDocument?.readyState === "complete") onLoad(); } catch { /* ignore */ }
    }
    attach("A", refA.current);
    attach("B", refB.current);
    return () => { wires.forEach((fn) => fn()); };
  }, [synced, srcA, srcB]);

  const width = VIEWPORT_WIDTHS[viewport];

  return (
    <div className="grid h-full min-h-0 grid-cols-2 gap-2 bg-muted/30 p-2">
      <Pane innerRef={refA} src={srcA} width={width} />
      <Pane innerRef={refB} src={srcB} width={width} />
    </div>
  );
}

function Pane({ innerRef, src, width }: { innerRef: React.RefObject<HTMLIFrameElement>; src?: string; width: number }) {
  if (!src) {
    return (
      <div className="flex items-center justify-center rounded border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        <ImageOff className="mr-2 h-5 w-5" /> wireframe missing
      </div>
    );
  }
  return (
    <div className={cn("h-full overflow-auto scrollbar-thin rounded border border-border bg-background")}>
      <div className="mx-auto py-3" style={{ width: `${width}px`, maxWidth: "100%" }}>
        <iframe
          ref={innerRef}
          src={src}
          title="wireframe"
          sandbox="allow-same-origin"
          className="block h-[calc(100vh-220px)] w-full rounded border border-border bg-white"
          style={{ minHeight: "640px" }}
        />
      </div>
    </div>
  );
}
