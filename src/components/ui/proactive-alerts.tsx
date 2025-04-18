
import React, { useState, useEffect } from "react";
import { AlertTriangle, Route, Wrench, Bot, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "maintenance" | "route" | "safety" | "info";
  title: string;
  description: string;
  action?: () => void;
}

export function ProactiveAlerts() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState(false);

  useEffect(() => {
    const handleShowOptiBot = () => setIsVisible(true);
    window.addEventListener('showOptiBot', handleShowOptiBot);
    return () => window.removeEventListener('showOptiBot', handleShowOptiBot);
  }, []);

  const handleMaintenanceDemo = () => {
    setCurrentDemo("maintenance");
    toast({
      title: "Maintenance Scheduled",
      description: "Vehicle #001 maintenance scheduled for tomorrow at 9 AM",
      variant: "default",
    });
  };

  const handleRouteDemo = () => {
    setCurrentDemo("route");
    toast({
      title: "Routes Updated",
      description: "3 vehicles rerouted via Al Khail Road",
      variant: "default",
    });
  };

  const handleAIExplanation = () => {
    setShowAIExplanation(true);
    setTimeout(() => setShowAIExplanation(false), 10000); // 10-second overlay
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="h-8 w-8 text-awr-primary" />
            <div>
              <h2 className="text-xl font-semibold">Hi! I'm OptiBot</h2>
              <p className="text-sm text-muted-foreground">Let's optimize your fleet!</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3" 
              onClick={handleMaintenanceDemo}
            >
              <Wrench className="h-5 w-5 text-amber-500" />
              <div className="text-left">
                <div className="font-medium">Predictive Maintenance Demo</div>
                <div className="text-sm text-muted-foreground">See how AI predicts vehicle issues</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3" 
              onClick={handleRouteDemo}
            >
              <Route className="h-5 w-5 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">Route Optimization Demo</div>
                <div className="text-sm text-muted-foreground">Watch AI reroute around hazards</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3" 
              onClick={handleAIExplanation}
            >
              <Info className="h-5 w-5 text-green-500" />
              <div className="text-left">
                <div className="font-medium">How does AI work?</div>
                <div className="text-sm text-muted-foreground">See the tech behind OptiBot</div>
              </div>
            </Button>
          </div>

          {currentDemo === "maintenance" && (
            <div className="mt-6 p-4 border rounded-lg bg-amber-50">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Maintenance Alert
              </h3>
              <p className="mt-2 text-sm">Vehicle #001 – High battery failure risk in 3 days.</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => setCurrentDemo(null)}>
                Schedule Maintenance
              </Button>
            </div>
          )}

          {currentDemo === "route" && (
            <div className="mt-6 p-4 border rounded-lg bg-blue-50">
              <h3 className="font-medium flex items-center gap-2">
                <Route className="h-4 w-4 text-blue-500" />
                Route Alert
              </h3>
              <p className="mt-2 text-sm">Sandstorm on Sheikh Zayed Road. Reroute via Al Khail Road to save 13% fuel?</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => setCurrentDemo(null)}>
                Confirm Reroute
              </Button>
            </div>
          )}
        </div>

        <div className="text-center p-4 border-t">
          <span className="text-xs text-muted-foreground">Demo Mode - Simulating Real-Time Data</span>
        </div>
      </div>

      {showAIExplanation && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-8">
          <div className="bg-white rounded-lg p-6 max-w-lg">
            <h3 className="text-xl font-semibold mb-4">AI Technology Behind OptiBot</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Gradient Boosting Model (GBM)</h4>
                  <p className="text-sm text-muted-foreground">Predicts maintenance needs with 95% accuracy using sensor data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Deep Reinforcement Learning (DRL)</h4>
                  <p className="text-sm text-muted-foreground">Optimizes routes in real-time based on traffic and weather</p>
                </div>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={() => setShowAIExplanation(false)}>
              Got it!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
