
import React, { useState, useEffect } from "react";
import { AlertTriangle, Route, Wrench, Bot, Info, X, MapPin, CheckCircle, AlertOctagon, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
      title: "⚠️ Maintenance Alert",
      description: "Vehicle #DXB-001 (Toyota Hilux) - Battery health critical",
    });
    
    setTimeout(() => {
      toast({
        title: "✅ Maintenance Scheduled",
        description: "Mechanic Ali (Dubai Garage) assigned. Estimated savings: $760",
      });
    }, 2000);
  };

  const handleRouteDemo = () => {
    setCurrentDemo("route");
    toast({
      title: "🌪️ Sandstorm Alert",
      description: "3 vehicles rerouted via Al Khail Road. Fuel savings: 13%",
    });
  };

  const handleHighRiskVehicles = () => {
    toast({
      title: "High Risk Vehicles Detected",
      description: "3 vehicles require immediate attention",
    });
  };

  const handleUnsafeDrivers = () => {
    toast({
      title: "Driver Safety Alert",
      description: "2 drivers flagged for speeding incidents this week",
    });
  };

  const handleAIExplanation = () => {
    setShowAIExplanation(true);
    setTimeout(() => setShowAIExplanation(false), 10000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
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
            <div className="relative">
              <Bot className="h-8 w-8 text-awr-primary" />
              <Badge variant="success" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                🇦🇪
              </Badge>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hi! I'm OptiBot</h2>
              <p className="text-sm text-muted-foreground">Let's optimize your UAE fleet!</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 group hover:border-amber-500 hover:bg-amber-50" 
              onClick={handleMaintenanceDemo}
            >
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200">
                <Wrench className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Predictive Maintenance Demo</div>
                <div className="text-sm text-muted-foreground">Watch AI prevent vehicle failures</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 group hover:border-blue-500 hover:bg-blue-50" 
              onClick={handleRouteDemo}
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Route Optimization Demo</div>
                <div className="text-sm text-muted-foreground">Smart rerouting during sandstorms</div>
              </div>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-start gap-2 hover:border-red-500 hover:bg-red-50" 
                onClick={handleHighRiskVehicles}
              >
                <AlertOctagon className="h-4 w-4 text-red-500" />
                <span>High Risk Vehicles</span>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start gap-2 hover:border-orange-500 hover:bg-orange-50" 
                onClick={handleUnsafeDrivers}
              >
                <Car className="h-4 w-4 text-orange-500" />
                <span>Unsafe Drivers</span>
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 group hover:border-green-500 hover:bg-green-50" 
              onClick={handleAIExplanation}
            >
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200">
                <Info className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">How does AI work?</div>
                <div className="text-sm text-muted-foreground">See the tech behind OptiBot</div>
              </div>
            </Button>
          </div>

          {currentDemo === "maintenance" && (
            <div className="mt-6 p-4 border rounded-lg bg-amber-50 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Maintenance Scheduled</h3>
              </div>
              <p className="text-sm">Mechanic Ali assigned to Vehicle #DXB-001</p>
              <p className="text-sm text-green-600 font-medium mt-2">Potential savings: $760</p>
            </div>
          )}

          {currentDemo === "route" && (
            <div className="mt-6 p-4 border rounded-lg bg-blue-50 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Reroute Complete</h3>
              </div>
              <p className="text-sm">3 vehicles rerouted via Al Khail Road</p>
              <div className="flex gap-4 mt-2">
                <p className="text-sm text-blue-600 font-medium">Fuel saved: 13%</p>
                <p className="text-sm text-green-600 font-medium">On-time: 100%</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center p-4 border-t">
          <span className="text-xs text-muted-foreground">Demo Mode - Simulating UAE Fleet Data</span>
        </div>
      </div>

      {showAIExplanation && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-8 animate-fade-in">
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
                  <p className="text-sm text-muted-foreground">Optimizes routes in real-time based on UAE traffic and weather</p>
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
