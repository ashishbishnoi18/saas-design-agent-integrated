import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground border-border",
        outline: "bg-transparent text-foreground border-border",
        accent: "bg-accent text-accent-foreground border-transparent",
        destructive: "bg-destructive text-destructive-foreground border-transparent",
        success: "bg-emerald-100 text-emerald-900 border-emerald-200",
        warn: "bg-amber-100 text-amber-900 border-amber-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
