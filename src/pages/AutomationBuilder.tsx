
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Code, Save, Zap, PlusCircle, Info, Send, Calendar, AlertTriangle, Car, ArrowRight, Check } from "lucide-react";

export default function AutomationBuilder() {
  const [activeWorkflow, setActiveWorkflow] = useState("fuel-alerts");
  
  const workflows = [
    { 
      id: "fuel-alerts", 
      name: "Fuel Level Alerts", 
      description: "Send notifications when fuel levels are low",
      lastEdited: "2025-04-12",
      status: "active" 
    },
    { 
      id: "maintenance-scheduler", 
      name: "Auto Maintenance Scheduler", 
      description: "Schedule maintenance based on AI predictions",
      lastEdited: "2025-04-05",
      status: "active" 
    },
    { 
      id: "driver-alerts", 
      name: "Driver Safety Alerts", 
      description: "Alert managers on safety violations",
      lastEdited: "2025-03-28",
      status: "draft" 
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Automation Builder</h1>
          <p className="text-muted-foreground">Create and manage intelligent workflows for your fleet operations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <CompetitiveBadge
            metric="31% Efficiency Gain"
            ourValue="31%"
            competitorName="Al Thuraya"
            competitorValue="20%"
          />
        </div>
      </div>

      <Tabs defaultValue="builder" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="builder" className="gap-2">
              <Code className="h-4 w-4" />
              <span>Workflow Builder</span>
            </TabsTrigger>
            <TabsTrigger value="workflows" className="gap-2">
              <Zap className="h-4 w-4" />
              <span>My Workflows</span>
            </TabsTrigger>
          </TabsList>
          
          <Button className="gap-2" size="sm">
            <Save className="h-4 w-4" />
            <span>Save Workflow</span>
          </Button>
        </div>
        
        <TabsContent value="builder" className="p-0 border-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Actions</CardTitle>
                  <CardDescription>Drag and drop to build workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2">TRIGGERS</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Car className="h-4 w-4 text-awr-primary" />
                      <span className="text-sm">Vehicle Status Change</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Safety Alert Triggered</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Maintenance Due</span>
                    </div>
                  </div>
                  
                  <p className="text-xs font-medium text-muted-foreground mt-4 mb-2">ACTIONS</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Send className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Send Notification</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Schedule Maintenance</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Check className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Mark Status Resolved</span>
                    </div>
                  </div>
                  
                  <p className="text-xs font-medium text-muted-foreground mt-4 mb-2">CONDITIONS</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <Code className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">If Condition</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent/50">
                      <ArrowRight className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">Wait Until</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">AI Insights</CardTitle>
                    <Badge className="bg-awr-primary text-white">New</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-awr-primary/5 rounded-lg p-3 border border-awr-primary/20 space-y-2">
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-awr-primary/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-3 w-3 text-awr-primary" />
                      </div>
                      <p className="text-sm font-medium">Workflow Improvement</p>
                    </div>
                    <p className="text-xs">Add a refueling alert when fuel drops below 15% to prevent unexpected stops.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs mt-1">
                      Apply Suggestion
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">Predicted efficiency improvement: +4.5%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Workflow Canvas</CardTitle>
                      <CardDescription>Build your automation workflow</CardDescription>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Info className="h-4 w-4" />
                          <span>Help</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium">How to Build a Workflow</h4>
                          <p className="text-sm text-muted-foreground">Drag actions from the left panel and connect them to create automated processes.</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Start with a trigger event</span>
                            </li>
                            <li className="flex gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Add conditions to control flow</span>
                            </li>
                            <li className="flex gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>End with actions to take</span>
                            </li>
                          </ul>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Workflow Builder Canvas (placeholder for drag-and-drop interface) */}
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg h-[600px] flex flex-col items-center justify-center">
                    {/* This would be replaced with an actual workflow builder UI */}
                    <div className="text-center space-y-2">
                      <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                        <PlusCircle className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="font-medium">Start Building Your Workflow</h3>
                      <p className="text-sm text-muted-foreground max-w-md">Drag items from the Actions panel and drop them here to start building your automation workflow.</p>
                    </div>
                    
                    {/* Sample workflow nodes (would be dynamic in real implementation) */}
                    <div className="absolute top-[200px] left-[200px] bg-white border rounded-md p-3 w-60 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Car className="h-3 w-3 text-blue-500" />
                        </div>
                        <span className="font-medium text-sm">Fuel Level Below 20%</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-[280px] left-[240px] h-10 w-1 bg-slate-300"></div>
                    
                    <div className="absolute top-[300px] left-[200px] bg-white border rounded-md p-3 w-60 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Send className="h-3 w-3 text-green-500" />
                        </div>
                        <span className="font-medium text-sm">Send Alert to Driver</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Workflows</CardTitle>
                <Button size="sm" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Workflow</span>
                </Button>
              </div>
              <CardDescription>View and manage your automation workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div 
                    key={workflow.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      activeWorkflow === workflow.id ? 'border-awr-primary bg-awr-primary/5' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setActiveWorkflow(workflow.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-awr-primary/10 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-awr-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{workflow.name}</h3>
                          <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        </div>
                      </div>
                      <Badge variant={workflow.status === 'active' ? 'success' : 'outline'}>
                        {workflow.status === 'active' ? 'Active' : 'Draft'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <span>Last edited: {new Date(workflow.lastEdited).toLocaleDateString("en-AE", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <div className="flex gap-2">
                        <button className="text-awr-primary hover:underline">Edit</button>
                        <button className="text-awr-primary hover:underline">Clone</button>
                        <button className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="max-w-lg text-center">
              <p className="text-muted-foreground">Automation workflows increase operational efficiency by 31% compared to manual processes.</p>
              <p className="text-sm text-muted-foreground mt-1">The AI-driven recommendations can further improve efficiency by analyzing your fleet's unique patterns.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
