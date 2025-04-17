
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CompetitiveBadgeProps {
  metric: string;
  ourValue: string;
  competitorName: string;
  competitorValue: string;
  className?: string;
}

export function CompetitiveBadge({
  metric,
  ourValue,
  competitorName,
  competitorValue,
  className,
}: CompetitiveBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("inline-block", className)}>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center text-xs gap-1 rounded-full bg-awr-primary text-white px-3 py-1">
          <span className="font-medium">{metric}</span>
          <ChevronDownIcon className={cn(
            "h-3 w-3 transition-transform",
            isExpanded ? "rotate-180" : ""
          )} />
        </div>

        {/* Dropdown/Popover */}
        <div className={cn(
          "absolute left-0 top-full mt-1 p-3 rounded-lg shadow-lg bg-card z-10 w-52 border animate-scale-in",
          isExpanded ? "block" : "hidden"
        )}>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">FleetAIOptima Advantage</h4>
          
          <div className="space-y-2">
            {/* Our performance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-awr-primary"></div>
                <span className="text-xs">FleetAIOptima</span>
              </div>
              <span className="text-xs font-bold">{ourValue}</span>
            </div>
            
            {/* Competitor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <span className="text-xs text-muted-foreground">{competitorName}</span>
              </div>
              <span className="text-xs text-muted-foreground">{competitorValue}</span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-[10px] text-muted-foreground">
              Data based on comparative analysis of fleet management solutions in UAE market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
