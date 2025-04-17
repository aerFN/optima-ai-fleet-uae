
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { Gauge, Calendar, Shield, Car, Wrench, AlertCircle } from "lucide-react";

export default function VehicleDetails() {
  const [selectedVehicle] = useState({
    id: "V-12345",
    name: "Toyota Land Cruiser",
    type: "SUV",
    status: "In Service",
    location: "Dubai Marina",
    lastMaintenance: "2025-03-12",
    nextMaintenance: "2025-06-15",
    fuelLevel: 72,
    mileage: 34521,
    efficiency: "Good",
  });

  const maintenanceHistory = [
    { date: "2025-03-12", type: "Regular Service", description: "Oil change, filter replacement, brake check", cost: 850 },
    { date: "2024-12-05", type: "Preventive", description: "Tire rotation, alignment", cost: 450 },
    { date: "2024-09-18", type: "Repair", description: "AC system repair", cost: 1200 },
  ];

  const safetyIssues = [
    { date: "2025-02-18", issue: "Harsh Braking", driver: "Mohammed A.", location: "Sheikh Zayed Road" },
    { date: "2025-01-25", issue: "Speeding", driver: "Mohammed A.", location: "Emirates Road" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{selectedVehicle.name}</h1>
          <p className="text-muted-foreground">Vehicle ID: {selectedVehicle.id} • Type: {selectedVehicle.type}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant={selectedVehicle.status === "In Service" ? "success" : "outline"} className="text-sm font-medium px-2 py-1">
            {selectedVehicle.status}
          </Badge>
          <CompetitiveBadge
            metric="95% Accuracy"
            ourValue="95%"
            competitorName="Al Rasid"
            competitorValue="85%"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Fuel Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-awr-primary" />
                <span className="text-3xl font-bold">{selectedVehicle.fuelLevel}%</span>
              </div>
              <div className="text-xs rounded-md bg-awr-primary/10 text-awr-primary px-2 py-1">
                <span>~ 450 km range</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last refueled: 3 days ago</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Maintenance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-awr-primary" />
                <span className="text-sm font-medium">Next Service</span>
              </div>
              <div className="text-sm font-bold text-awr-success">
                {new Date(selectedVehicle.nextMaintenance).toLocaleDateString("en-AE", { day: "numeric", month: "short" })}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center justify-between text-xs">
                <span>Maintenance Prediction Accuracy:</span>
                <span className="font-bold text-awr-success">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-awr-primary" />
                <span className="text-3xl font-bold">87</span>
              </div>
              <div className="text-xs rounded-md bg-amber-100 text-amber-700 px-2 py-1">
                <span>2 recent incidents</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-amber-500 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Car className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-2">
            <Wrench className="h-4 w-4" />
            <span>Maintenance History</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Safety Issues</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Detailed specifications and current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Registration</p>
                  <p>Dubai P 57123</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Assigned Driver</p>
                  <p>Mohammed Abdullah</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Year</p>
                  <p>2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Current Location</p>
                  <p>{selectedVehicle.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Mileage</p>
                  <p>{selectedVehicle.mileage.toLocaleString()} km</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Fuel Efficiency</p>
                  <p className="flex items-center gap-1">
                    {selectedVehicle.efficiency}
                    <Badge variant="outline" className="ml-2 bg-awr-primary/10 text-awr-primary text-xs">13% better than fleet avg</Badge>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">AI Maintenance Prediction</h4>
                <div className="bg-awr-success/10 border border-awr-success/20 rounded-lg p-4">
                  <p className="text-sm">Based on OBD data, this vehicle will need brake pad replacement in approximately 45 days (June 15). Scheduling maintenance now can prevent downtime.</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-xs bg-awr-success text-white px-3 py-1 rounded-md">Schedule Now</button>
                    <button className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-md">Remind Later</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Virtual Inspection</CardTitle>
              <CardDescription>3D vehicle view for remote checks (Simulated)</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="bg-slate-100 h-[300px] w-full rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">3D vehicle model would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Past service records and repairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceHistory.map((item, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{item.type}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{item.cost} AED</span>
                      </div>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-awr-primary hover:text-awr-primary/80 text-sm flex items-center gap-1 mx-auto">
                  View Full History
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Issues</CardTitle>
              <CardDescription>Recent safety incidents and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyIssues.map((issue, i) => (
                  <div key={i} className="flex border rounded-lg p-4 gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{issue.issue}</h4>
                        <span className="text-sm text-muted-foreground">{new Date(issue.date).toLocaleDateString("en-AE", { month: "short", day: "numeric" })}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Driver: {issue.driver}</p>
                      <p className="text-sm text-muted-foreground">Location: {issue.location}</p>
                      
                      <div className="mt-2 flex gap-2">
                        <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">View Details</button>
                        <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Send Alert</button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {safetyIssues.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No safety issues reported</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">AI Safety Recommendation</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm">Driver Mohammed A. has shown a pattern of harsh braking and speeding. Consider enrolling in the Defensive Driving Course to improve safety scores.</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-xs bg-amber-500 text-white px-3 py-1 rounded-md">Enroll Driver</button>
                    <button className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-md">Dismiss</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
