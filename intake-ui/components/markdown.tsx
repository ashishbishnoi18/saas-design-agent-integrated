"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Tight markdown renderer for UI specs, evaluator verdicts, and pairwise
 * judgments. Defaults to a typographic light scheme that matches the rest of
 * the app — no syntax highlighting, no autolinks. Pass `dense` for verdict /
 * pairwise text where heading sizes can be smaller.
 */
export function Markdown({ children, className, dense = false }: { children: string; className?: string; dense?: boolean }) {
  return (
    <div className={cn("max-w-none text-[13px] leading-relaxed text-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...p }) => <h1 className={cn("font-semibold tracking-tight", dense ? "mt-4 mb-2 text-[15px]" : "mt-6 mb-3 text-lg")} {...p} />,
          h2: ({ node, ...p }) => <h2 className={cn("font-semibold tracking-tight", dense ? "mt-3 mb-1.5 text-[14px]" : "mt-5 mb-2.5 text-base")} {...p} />,
          h3: ({ node, ...p }) => <h3 className={cn("font-semibold", dense ? "mt-2.5 mb-1 text-[13px]" : "mt-4 mb-2 text-sm")} {...p} />,
          h4: ({ node, ...p }) => <h4 className="mt-3 mb-1 text-[13px] font-semibold text-muted-foreground uppercase tracking-wide" {...p} />,
          p: ({ node, ...p }) => <p className="my-2" {...p} />,
          ul: ({ node, ...p }) => <ul className="my-2 list-disc pl-5 marker:text-muted-foreground" {...p} />,
          ol: ({ node, ...p }) => <ol className="my-2 list-decimal pl-5 marker:text-muted-foreground" {...p} />,
          li: ({ node, ...p }) => <li className="my-0.5" {...p} />,
          blockquote: ({ node, ...p }) => <blockquote className="my-3 border-l-2 border-border pl-3 italic text-muted-foreground" {...p} />,
          code: ({ node, className: cls, ...p }) => {
            const isBlock = (cls || "").startsWith("language-");
            if (isBlock) {
              return <code className={cn("block overflow-auto scrollbar-thin rounded border border-border bg-muted/50 p-3 font-mono text-[12px] leading-snug", cls)} {...p} />;
            }
            return <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]" {...p} />;
          },
          pre: ({ node, ...p }) => <pre className="my-3 overflow-auto scrollbar-thin" {...p} />,
          table: ({ node, ...p }) => <div className="my-3 overflow-x-auto scrollbar-thin"><table className="w-full border-collapse text-[12px]" {...p} /></div>,
          th: ({ node, ...p }) => <th className="border-b border-border px-2 py-1 text-left font-semibold" {...p} />,
          td: ({ node, ...p }) => <td className="border-b border-border/60 px-2 py-1 align-top" {...p} />,
          a: ({ node, ...p }) => <a className="underline decoration-muted-foreground hover:decoration-foreground" target="_blank" rel="noreferrer" {...p} />,
          hr: () => <hr className="my-4 border-border" />,
          strong: ({ node, ...p }) => <strong className="font-semibold" {...p} />,
        }}
      >{children}</ReactMarkdown>
    </div>
  );
}
