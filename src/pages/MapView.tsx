
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { MapboxMap } from "@/components/map/MapboxMap";
import { 
  Car, 
  Package2, 
  Navigation, 
  Filter, 
  ChevronDown, 
  Cloud, 
  CloudSun, 
  Thermometer, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function MapView() {
  const [vehicleType, setVehicleType] = useState("all");
  const [vehicleStatus, setVehicleStatus] = useState("all");
  const [mapScenario, setMapScenario] = useState<"normal" | "heavy">("normal");

  // Handle scenario toggle
  const handleScenarioChange = (scenario: "normal" | "heavy") => {
    setMapScenario(scenario);
    toast({
      title: `Switched to ${scenario === "normal" ? "Normal Traffic" : "Heavy Traffic"} scenario`,
      description: scenario === "normal" 
        ? "Showing standard routes with regular traffic conditions." 
        : "Showing AI-optimized routes to avoid heavy traffic areas.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Interactive Map</h1>
          <p className="text-muted-foreground">Real-time vehicle tracking with AI-optimized routes</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <CompetitiveBadge
            metric="13% Fuel Savings"
            ourValue="13%"
            competitorName="Fleetroot"
            competitorValue="10%"
          />
          <Badge variant="outline" className="bg-awr-primary/5 text-awr-primary">
            UAE Traffic Integration
          </Badge>
        </div>
      </div>

      <div className="bg-accent/20 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-awr-primary rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Fuel Savings</p>
              <p className="text-2xl font-bold">13%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-awr-success rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Downtime Reduction</p>
              <p className="text-2xl font-bold">30%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Accident Risk Reduction</p>
              <p className="text-2xl font-bold">60%</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium whitespace-nowrap">Traffic Scenario:</span>
            <div className="flex rounded-md overflow-hidden">
              <Button
                variant={mapScenario === "normal" ? "default" : "outline"}
                className={`rounded-r-none ${mapScenario === "normal" ? '' : 'text-muted-foreground'}`}
                onClick={() => handleScenarioChange("normal")}
              >
                Normal Day
              </Button>
              <Button
                variant={mapScenario === "heavy" ? "default" : "outline"}
                className={`rounded-l-none ${mapScenario === "heavy" ? '' : 'text-muted-foreground'}`}
                onClick={() => handleScenarioChange("heavy")}
              >
                Heavy Traffic Day
              </Button>
            </div>
          </div>
          {mapScenario === "heavy" && (
            <p className="text-xs text-right mt-1 text-awr-primary">AI routes shown as dashed blue lines</p>
          )}
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="map" className="gap-2">
              <Navigation className="h-4 w-4" />
              <span>Live Map</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2">
              <Navigation className="h-4 w-4" />
              <span>Route History</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground hidden md:inline">Filters:</span>
            </div>
            
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={vehicleStatus} onValueChange={setVehicleStatus}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="transit">In Transit</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="map" className="p-0 border-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <MapboxMap scenario={mapScenario} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">What-If Simulator</CardTitle>
                  <CardDescription>Adjust variables to see impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Traffic Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className={`px-3 py-1.5 text-xs rounded-md border ${mapScenario === 'normal' && 'bg-accent font-medium'}`} onClick={() => handleScenarioChange("normal")}>Low</button>
                      <button className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent">Medium</button>
                      <button className={`px-3 py-1.5 text-xs rounded-md border ${mapScenario === 'heavy' && 'bg-accent font-medium'}`} onClick={() => handleScenarioChange("heavy")}>High</button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Load</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent">Light</button>
                      <button className="px-3 py-1.5 text-xs rounded-md border bg-accent font-medium">Normal</button>
                      <button className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent">Heavy</button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Route Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-1.5 text-xs rounded-md border bg-accent font-medium">Efficient</button>
                      <button className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent">Fastest</button>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Fuel Savings:</span>
                      <span className="font-bold text-awr-success">{mapScenario === 'heavy' ? '19.2%' : '13.2%'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Time Savings:</span>
                      <span className="font-bold text-awr-success">{mapScenario === 'heavy' ? '24.5%' : '18.5%'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">UAE Insights</CardTitle>
                  <CardDescription>Real-time local information</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex gap-3 p-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Traffic Alert</p>
                        <p className="text-xs text-muted-foreground">Heavy traffic on Sheikh Zayed Road</p>
                        <p className="text-xs text-muted-foreground">Dubai • Live</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <CloudSun className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Weather Alert</p>
                        <p className="text-xs text-muted-foreground">Sandstorm warning in effect</p>
                        <p className="text-xs text-muted-foreground">Abu Dhabi • Next 24h</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Thermometer className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Temperature</p>
                        <p className="text-xs text-muted-foreground">Currently 38°C / 100.4°F</p>
                        <p className="text-xs text-muted-foreground">Dubai • 15 min ago</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Transit Time</p>
                        <p className="text-xs text-muted-foreground">12% faster than average</p>
                        <p className="text-xs text-muted-foreground">UAE National Routes • Today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Nearby Vehicles</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 hover:bg-accent/50 cursor-pointer">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          i === 2 ? 'bg-amber-100' : 'bg-green-100'
                        }`}>
                          {i !== 3 ? (
                            <Car className={`h-5 w-5 ${i === 2 ? 'text-amber-500' : 'text-green-500'}`} />
                          ) : (
                            <Package2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {i === 1 && "Toyota Land Cruiser"}
                            {i === 2 && "Nissan Altima"}
                            {i === 3 && "Mitsubishi Fuso"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {i === 1 && "In transit • Dubai to Abu Dhabi"}
                            {i === 2 && "Idle • Sheikh Zayed Road"}
                            {i === 3 && "In transit • Dubai to Sharjah"}
                          </p>
                        </div>
                        <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="routes">
          <div className="flex items-center justify-center h-80 bg-accent/30 rounded-lg">
            <p className="text-muted-foreground">Route history visualization would appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
