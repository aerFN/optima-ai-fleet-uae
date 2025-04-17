import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { User, Car, Award, Calendar, AlertCircle, Smartphone, Trophy, Zap } from "lucide-react";

export default function DriverProfile() {
  const [driver] = useState({
    id: "D-4587",
    name: "Mohammed Abdullah",
    role: "Senior Driver",
    joinDate: "2023-06-15",
    license: "UAE 7456321",
    licenseExpiry: "2026-08-24",
    phone: "+971 55 123 4567",
    email: "mohammed.a@awr.com",
    safetyScore: 87,
    vehicles: ["Toyota Land Cruiser", "Nissan Patrol"],
    vehicleIDs: ["V-12345", "V-12346"],
  });

  const safetyIncidents = [
    { date: "2025-02-18", type: "Harsh Braking", vehicle: "Toyota Land Cruiser", location: "Sheikh Zayed Road", severity: "Medium" },
    { date: "2025-01-25", type: "Speeding", vehicle: "Toyota Land Cruiser", location: "Emirates Road", severity: "High" },
    { date: "2024-12-03", type: "Phone Usage", vehicle: "Nissan Patrol", location: "Downtown Dubai", severity: "Medium" },
  ];

  const achievements = [
    { name: "Gold Safety Star", date: "2024-11", description: "3 consecutive months with no safety incidents" },
    { name: "Fuel Efficiency Champion", date: "2024-09", description: "Top 5% in fuel efficiency across fleet" },
    { name: "Perfect Attendance", date: "2024-08", description: "100% on-time rate for 6 months" },
  ];

  const safetyScoreData = {
    current: 87,
    previous: 82,
    average: 79,
    improvement: "+5",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{driver.name}</h1>
          <p className="text-muted-foreground">Driver ID: {driver.id} • {driver.role}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <CompetitiveBadge
            metric="60% Accident Reduction"
            ourValue="60%"
            competitorName="Falcon Trackers"
            competitorValue="45%"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overall Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-awr-primary" />
                <span className="text-3xl font-bold">{driver.safetyScore}</span>
              </div>
              <div className="text-xs rounded-md bg-green-100 text-green-700 px-2 py-1">
                <span>Top 30%</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-1">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: `${driver.safetyScore}%` }}></div>
            </div>
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">License Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-awr-primary" />
                <span className="text-sm font-medium">Expires</span>
              </div>
              <div className="text-sm font-bold">
                {new Date(driver.licenseExpiry).toLocaleDateString("en-AE", { year: "numeric", month: "short", day: "numeric" })}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t text-xs">
              <div className="flex items-center justify-between">
                <span>UAE License #: {driver.license}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Valid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Safety Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-awr-primary" />
                <span className="text-3xl font-bold">{safetyIncidents.length}</span>
              </div>
              <div className="text-xs rounded-md bg-amber-100 text-amber-700 px-2 py-1">
                <span>Last 90 days</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t text-sm">
              <p className="text-muted-foreground">Most recent: {safetyIncidents[0].type} on {new Date(safetyIncidents[0].date).toLocaleDateString("en-AE", { month: "short", day: "numeric" })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <User className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Safety Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
              <CardDescription>Personal and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{driver.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                  <p>{driver.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                  <p>{new Date(driver.joinDate).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p>{driver.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Contact Phone</p>
                  <p className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    {driver.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{driver.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Assigned Vehicles</CardTitle>
              <CardDescription>Current vehicle assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {driver.vehicles.map((vehicle, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-awr-primary/10">
                      <Car className="h-5 w-5 text-awr-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{vehicle}</p>
                      <p className="text-xs text-muted-foreground">ID: {driver.vehicleIDs[i]}</p>
                    </div>
                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-auto">View Details</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Score Trend</CardTitle>
              <CardDescription>Performance over time compared to fleet average</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm font-medium">Current Score</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{safetyScoreData.current}</span>
                    <span className="ml-2 text-sm text-green-600">{safetyScoreData.improvement} pts</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Fleet Average: {safetyScoreData.average}</p>
                  <p className="text-sm text-muted-foreground">Previous: {safetyScoreData.previous}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Safety score trend chart would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Safety Incidents</CardTitle>
              <CardDescription>Last 90 days of recorded events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyIncidents.map((incident, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{incident.type}</h4>
                          <Badge variant={
                            incident.severity === "High" ? "destructive" : 
                            incident.severity === "Medium" ? "warning" : 
                            "outline"
                          }>
                            {incident.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{new Date(incident.date).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">{incident.vehicle}</span>
                      </div>
                    </div>
                    <p className="text-sm">Location: {incident.location}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">View Details</button>
                      <button className="text-xs bg-accent hover:bg-accent/80 px-2 py-1 rounded">Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Safety Recommendations</CardTitle>
              <CardDescription>Personalized training based on driving patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-awr-primary/10 border border-awr-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-awr-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-awr-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Defensive Driving Course Recommended</h4>
                    <p className="text-sm">Based on recent harsh braking and speeding incidents, our AI suggests enrolling in a defensive driving course to improve safety skills.</p>
                    
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs bg-awr-primary text-white px-3 py-1.5 rounded-md">Enroll Now</button>
                      <button className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-md">Remind Later</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Additional Training Recommendations</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-awr-primary"></div>
                    <span className="text-sm">Eco-driving techniques for better fuel efficiency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-awr-primary"></div>
                    <span className="text-sm">Advanced vehicle handling in UAE weather conditions</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Achievements</CardTitle>
              <CardDescription>Recognition and rewards earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {new Date(achievement.date + "-01").toLocaleDateString("en-AE", { year: "numeric", month: "short" })}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-sm font-medium mb-3">Gamification Stats</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold text-awr-primary mt-1">1,250</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Rank</p>
                    <p className="text-2xl font-bold text-awr-primary mt-1">5th</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Badges</p>
                    <p className="text-2xl font-bold text-awr-primary mt-1">8</p>
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
