
import React, { useState } from "react";
import { AlertTriangle, Check, Route, Wrench, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "maintenance" | "route" | "safety";
  title: string;
  description: string;
  action?: () => void;
}

export function ProactiveAlerts() {
  const [alerts] = useState<Alert[]>([
    {
      id: "maint-001",
      type: "maintenance",
      title: "Predictive Maintenance Alert",
      description: "Vehicle #001 – High battery failure risk in 3 days.",
      action: () => handleMaintenanceSchedule(),
    },
    {
      id: "route-001",
      type: "route",
      title: "Route Optimization Alert",
      description: "Sandstorm on Sheikh Zayed Road. Reroute via Al Khail Road to save 13% fuel?",
      action: () => handleReroute(),
    },
  ]);

  const handleMaintenanceSchedule = () => {
    toast({
      title: "Maintenance Scheduled",
      description: "Vehicle #001 maintenance scheduled for tomorrow at 9 AM",
      variant: "default",
    });
  };

  const handleReroute = () => {
    toast({
      title: "Routes Updated",
      description: "3 vehicles rerouted via Al Khail Road",
      variant: "default",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 w-80 space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Bot className="h-5 w-5 text-awr-primary" />
          <h3 className="font-medium">OptiBot Alerts</h3>
        </div>
        
        {alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-3 hover:bg-accent/40">
            <div className="flex items-start gap-3">
              {alert.type === "maintenance" && <Wrench className="h-5 w-5 text-amber-500" />}
              {alert.type === "route" && <Route className="h-5 w-5 text-blue-500" />}
              {alert.type === "safety" && <AlertTriangle className="h-5 w-5 text-red-500" />}
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={alert.action}>
                    Take Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2 border-t">
          <span className="text-xs text-muted-foreground">Demo Mode - Simulating Real-Time Data</span>
        </div>
      </div>
    </div>
  );
}
