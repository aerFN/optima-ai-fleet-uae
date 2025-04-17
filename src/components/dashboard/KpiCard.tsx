
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const kpiCardVariants = cva(
  "flex flex-col rounded-xl border p-5 transition-all hover:shadow-md bg-card",
  {
    variants: {
      variant: {
        default: "",
        highlight: "border-awr-primary bg-awr-primary/5",
        success: "border-awr-success bg-awr-success/5",
        warning: "border-awr-warning bg-awr-warning/5",
        danger: "border-awr-danger bg-awr-danger/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface KpiCardProps extends VariantProps<typeof kpiCardVariants> {
  title: string;
  value: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
  description?: string;
  competitor?: {
    name: string;
    value: string;
  };
}

export function KpiCard({
  title,
  value,
  icon,
  trend,
  className,
  description,
  competitor,
  variant,
}: KpiCardProps) {
  return (
    <div className={cn(kpiCardVariants({ variant }), className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>

      {trend && (
        <div className="flex items-center text-xs">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-1.5 py-0.5",
              trend.isPositive
                ? "bg-awr-success/10 text-awr-success"
                : "bg-awr-danger/10 text-awr-danger"
            )}
          >
            {trend.isUpward ? (
              <ArrowUpIcon className="h-3 w-3" />
            ) : (
              <ArrowDownIcon className="h-3 w-3" />
            )}
            <span className="font-medium">{Math.abs(trend.value)}%</span>
          </div>
          <span className="ml-1.5 text-muted-foreground">
            {trend.label || "vs. previous period"}
          </span>
        </div>
      )}

      {competitor && (
        <div className="mt-2 pt-2 border-t border-border text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{competitor.name}</span>
            <div className="flex gap-2 items-center">
              <span>{competitor.value}</span>
              <div className="w-4 h-4 rounded-full bg-awr-primary flex items-center justify-center">
                <ArrowUpIcon className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
