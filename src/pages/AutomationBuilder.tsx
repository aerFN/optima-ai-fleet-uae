
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { 
  Code, 
  Save, 
  Play, 
  Copy, 
  Trash2, 
  Workflow, 
  Zap, 
  Plus, 
  MessageSquarePlus,
  ListChecks,
  Wrench,
  BellRing,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";

// Automation node types
type NodeType = 'trigger' | 'condition' | 'action' | 'notification';

interface AutomationNode {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// Library of available nodes
const nodeLibrary: AutomationNode[] = [
  {
    id: 'fuel_low',
    type: 'trigger',
    title: 'Fuel Level Low',
    description: 'Triggers when a vehicle\'s fuel falls below 20%',
    icon: AlertTriangle,
    color: 'bg-awr-warning/20 border-awr-warning/30 text-awr-warning',
  },
  {
    id: 'maintenance_due',
    type: 'trigger',
    title: 'Maintenance Due',
    description: 'Triggers when maintenance is scheduled within 7 days',
    icon: Wrench,
    color: 'bg-awr-primary/20 border-awr-primary/30 text-awr-primary',
  },
  {
    id: 'driver_safety',
    type: 'trigger',
    title: 'Safety Incident',
    description: 'Triggers when driver has a safety violation',
    icon: AlertTriangle,
    color: 'bg-awr-danger/20 border-awr-danger/30 text-awr-danger',
  },
  {
    id: 'check_vehicle',
    type: 'condition',
    title: 'Check Vehicle Type',
    description: 'Evaluates the type of vehicle (SUV, Sedan, etc.)',
    icon: ListChecks,
    color: 'bg-indigo-100 border-indigo-200 text-indigo-700',
  },
  {
    id: 'check_location',
    type: 'condition',
    title: 'Check Location',
    description: 'Evaluates if vehicle is in a specific area',
    icon: ListChecks,
    color: 'bg-indigo-100 border-indigo-200 text-indigo-700',
  },
  {
    id: 'schedule_maintenance',
    type: 'action',
    title: 'Schedule Maintenance',
    description: 'Creates a maintenance appointment',
    icon: Wrench,
    color: 'bg-green-100 border-green-200 text-green-700',
  },
  {
    id: 'send_notification',
    type: 'notification',
    title: 'Send Notification',
    description: 'Sends an alert to specified users',
    icon: BellRing,
    color: 'bg-blue-100 border-blue-200 text-blue-700',
  },
  {
    id: 'email_manager',
    type: 'notification',
    title: 'Email Manager',
    description: 'Sends detailed report to fleet manager',
    icon: MessageSquarePlus,
    color: 'bg-blue-100 border-blue-200 text-blue-700',
  }
];

export default function AutomationBuilder() {
  const [activeNodes, setActiveNodes] = useState<AutomationNode[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState("fuel-alert");
  
  // Add node to workflow
  const addNode = (node: AutomationNode) => {
    setActiveNodes([...activeNodes, { ...node, id: `${node.id}-${Date.now()}` }]);
  };
  
  // Remove node from workflow
  const removeNode = (nodeId: string) => {
    setActiveNodes(activeNodes.filter(node => node.id !== nodeId));
  };
  
  // Sample pre-built workflows
  const workflows = [
    { id: "fuel-alert", name: "Fuel Alert", nodeCount: 3, status: "active" },
    { id: "maintenance", name: "Maintenance Scheduler", nodeCount: 5, status: "active" },
    { id: "driver-safety", name: "Driver Safety Monitor", nodeCount: 4, status: "draft" }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Automation Builder</h1>
          <p className="text-muted-foreground">Create custom workflows for your fleet operations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <CompetitiveBadge
            metric="31% Efficiency Gain"
            ourValue="31%"
            competitorName="Al Thuraya"
            competitorValue="21%"
          />
          <Badge variant="outline" className="bg-awr-primary/5 text-awr-primary">
            Drag & Drop Interface
          </Badge>
        </div>
      </div>
      
      <div className="bg-accent/20 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium">Current Workflow: <span className="text-awr-primary">Fuel Alert System</span></h2>
            <p className="text-sm text-muted-foreground">Last edited: 2 hours ago</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Play className="h-4 w-4" />
              <span>Activate</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Code className="h-4 w-4 text-muted-foreground" />
                Components
              </CardTitle>
              <CardDescription>Drag and drop to canvas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              <div className="space-y-1 mb-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Triggers</h3>
              </div>
              
              {nodeLibrary.filter(node => node.type === 'trigger').map(node => (
                <div 
                  key={node.id}
                  className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer hover:bg-accent ${node.color}`}
                  onClick={() => addNode(node)}
                >
                  <node.icon className="h-5 w-5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{node.title}</p>
                    <p className="text-xs truncate">{node.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="space-y-1 mt-4 mb-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conditions</h3>
              </div>
              
              {nodeLibrary.filter(node => node.type === 'condition').map(node => (
                <div 
                  key={node.id}
                  className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer hover:bg-accent ${node.color}`}
                  onClick={() => addNode(node)}
                >
                  <node.icon className="h-5 w-5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{node.title}</p>
                    <p className="text-xs truncate">{node.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="space-y-1 mt-4 mb-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</h3>
              </div>
              
              {nodeLibrary.filter(node => node.type === 'action' || node.type === 'notification').map(node => (
                <div 
                  key={node.id}
                  className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer hover:bg-accent ${node.color}`}
                  onClick={() => addNode(node)}
                >
                  <node.icon className="h-5 w-5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{node.title}</p>
                    <p className="text-xs truncate">{node.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Workflow className="h-4 w-4 text-muted-foreground" />
                Saved Workflows
              </CardTitle>
              <CardDescription>Your automation templates</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {workflows.map(workflow => (
                  <div 
                    key={workflow.id} 
                    className={`p-3 hover:bg-accent/50 cursor-pointer ${activeWorkflow === workflow.id ? 'bg-accent/70' : ''}`}
                    onClick={() => setActiveWorkflow(workflow.id)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{workflow.name}</p>
                      <Badge variant={workflow.status === "active" ? "success" : "outline"} className="text-xs">
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{workflow.nodeCount} components</p>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t">
                <Button variant="outline" className="w-full gap-1 text-xs h-8">
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Workflow</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-awr-primary" />
                    Workflow Canvas
                  </CardTitle>
                  <CardDescription>Drag components to build your automation</CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input placeholder="Search components..." className="max-w-[200px] h-8 text-sm" />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="min-h-[600px]">
              {activeNodes.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-2 max-w-md">
                    <Workflow className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                    <h3 className="text-lg font-medium">Start Building Your Workflow</h3>
                    <p className="text-muted-foreground">Drag components from the sidebar to create your automation flow. Start with a trigger, add conditions, and finish with actions.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {activeNodes.map((node, index) => (
                    <div key={node.id} className="relative flex">
                      {/* Connector line */}
                      {index > 0 && (
                        <div className="absolute top-0 left-6 -mt-4 w-0.5 h-4 bg-border"></div>
                      )}
                      
                      {/* Node item */}
                      <div className={`flex-1 p-4 rounded-lg border ${node.color}`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-background/80">
                            <node.icon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{node.title}</h3>
                              <Badge variant="outline">{node.type}</Badge>
                            </div>
                            <p className="text-sm mt-1">{node.description}</p>
                            
                            {/* Component settings - placeholders */}
                            {node.type === 'trigger' && (
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="text-xs">
                                  <span className="font-medium">Threshold:</span>
                                  <span className="ml-1">20%</span>
                                </div>
                                <div className="text-xs">
                                  <span className="font-medium">Applies to:</span>
                                  <span className="ml-1">All vehicles</span>
                                </div>
                              </div>
                            )}
                            
                            {node.type === 'condition' && (
                              <div className="mt-3 text-xs">
                                <span className="font-medium">Condition:</span>
                                <span className="ml-1">IF [Vehicle Type] = SUV THEN...</span>
                              </div>
                            )}
                            
                            {node.type === 'action' && (
                              <div className="mt-3 text-xs">
                                <span className="font-medium">Action:</span>
                                <span className="ml-1">Schedule maintenance at nearest service center</span>
                              </div>
                            )}
                            
                            {node.type === 'notification' && (
                              <div className="mt-3 text-xs">
                                <span className="font-medium">Recipients:</span>
                                <span className="ml-1">Fleet Manager, Vehicle Driver</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeNode(node.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add component button */}
                  {activeNodes.length > 0 && (
                    <div className="flex justify-center">
                      <Button variant="outline" className="mt-2 gap-1" onClick={() => {}}>
                        <Plus className="h-4 w-4" />
                        <span>Add Component</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
