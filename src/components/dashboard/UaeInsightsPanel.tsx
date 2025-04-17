
import { cn } from "@/lib/utils";
import { AlertCircle, CloudSun, Clock, CornerRightDown, MapPin, ThermometerIcon, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InsightItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  location: string;
  time: string;
  priority?: "normal" | "alert";
  trend?: "up" | "down" | "stable";
}

const insights: InsightItem[] = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "Traffic Density",
    value: "High",
    location: "Dubai, Sheikh Zayed Road",
    time: "Live",
    priority: "alert",
    trend: "up"
  },
  {
    icon: <CloudSun className="h-4 w-4" />,
    label: "Weather Alert",
    value: "Sandstorm Warning",
    location: "Abu Dhabi Area",
    time: "Next 24h",
    priority: "alert"
  },
  {
    icon: <ThermometerIcon className="h-4 w-4" />,
    label: "Temperature",
    value: "38°C",
    location: "Dubai",
    time: "Current",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    label: "Avg. Transit Time",
    value: "-12%",
    location: "UAE National Routes",
    time: "Today",
    trend: "down"
  }
];

export function UaeInsightsPanel({ className }: { className?: string }) {
  return (
    <Card className={cn("border-awr-primary/20", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-awr-primary" />
              UAE Insights
            </CardTitle>
            <CardDescription>Real-time local intelligence</CardDescription>
          </div>
          <Badge variant="outline" className="bg-awr-primary/10 hover:bg-awr-primary/15 text-awr-primary border-awr-primary/20 gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-awr-primary animate-pulse-soft"></div>
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={cn(
              "flex items-start gap-3 px-3 py-2 rounded-lg",
              insight.priority === "alert" ? "bg-awr-danger/5 border border-awr-danger/10" : "hover:bg-accent"
            )}
          >
            <div className={cn(
              "mt-0.5 p-1.5 rounded-md",
              insight.priority === "alert" ? "bg-awr-danger/10 text-awr-danger" : "bg-accent text-muted-foreground"
            )}>
              {insight.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium">{insight.label}</p>
                  {insight.priority === "alert" && 
                    <AlertCircle className="h-3.5 w-3.5 text-awr-danger" />
                  }
                </div>
                
                <div className="flex items-center gap-1 text-sm font-medium">
                  {insight.trend && (
                    <CornerRightDown 
                      className={cn(
                        "h-3 w-3",
                        insight.trend === "up" ? "text-awr-danger rotate-180" : 
                        insight.trend === "down" ? "text-awr-success" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span className={cn(
                    insight.priority === "alert" ? "text-awr-danger" : ""
                  )}>
                    {insight.value}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{insight.location}</span>
                <span>{insight.time}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 text-center">
          <button className="text-xs text-awr-primary hover:underline">
            View All Insights
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
