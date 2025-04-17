
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LockKeyhole, Shield, Users, Bell, Globe, HardDrive, Key, Database, FileText, Smartphone as Phone } from "lucide-react";

export default function Settings() {
  const [userRole, setUserRole] = useState("fleet-manager");
  const [dataRegion, setDataRegion] = useState("uae");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account, compliance, and security settings</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-awr-success/10 text-awr-success border border-awr-success/20 flex gap-1 items-center">
            <div className="h-2 w-2 rounded-full bg-awr-success"></div>
            <span>UAE Compliant</span>
          </Badge>
          <Badge variant="outline" className="bg-awr-primary/10 text-awr-primary">
            AWR Secure
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Shield className="h-4 w-4" />
            <span>Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <LockKeyhole className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Ahmad Mohammed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="ahmad.m@awr.ae" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +971
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        className="rounded-l-none"
                        placeholder="55 123 4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={userRole} onValueChange={setUserRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fleet-manager">Fleet Manager</SelectItem>
                        <SelectItem value="dispatcher">Dispatcher</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="analyst">Data Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="gulf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gulf">Gulf Standard Time (GST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                        <SelectItem value="eastern">Eastern Standard Time (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ur">Urdu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose how dates are displayed
                    </p>
                  </div>
                  <Select defaultValue="mdy">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Distance Unit</Label>
                    <p className="text-sm text-muted-foreground">
                      Kilometers or miles
                    </p>
                  </div>
                  <Select defaultValue="km">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km">Kilometers (km)</SelectItem>
                      <SelectItem value="mi">Miles (mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Mobile App Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Link your mobile device
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Vehicle Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Maintenance, fuel, and location alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Driver Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Safety scores and behavior alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Route Optimizations</p>
                      <p className="text-sm text-muted-foreground">
                        AI-suggested route improvements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">
                        New features and maintenance notices
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <p className="text-sm font-medium">Notification Channels</p>
                  
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Email</Badge>
                        <span className="text-sm">ahmad.m@awr.ae</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">SMS</Badge>
                        <span className="text-sm">+971 55 123 4567</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">Mobile App</Badge>
                        <span className="text-sm">FleetAIOptima App</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning">Desktop</Badge>
                        <span className="text-sm">Browser Notifications</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-awr-primary" />
                UAE Regulatory Compliance
              </CardTitle>
              <CardDescription>Manage data compliance settings for UAE regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-awr-primary/10 border border-awr-primary/20 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-md bg-awr-primary/20">
                      <Shield className="h-5 w-5 text-awr-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AWR Exclusive Data Control</h4>
                      <p className="text-sm">Unlike competitors who use shared data models, FleetAIOptima keeps your fleet data exclusively within AWR's secure infrastructure in UAE-compliant data centers.</p>
                      
                      <div className="mt-3">
                        <Badge variant="success">UAE Compliant ✓</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Data Region</p>
                      <p className="text-sm text-muted-foreground">Select where your data is stored</p>
                    </div>
                    <Select value={dataRegion} onValueChange={setDataRegion}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">UAE (Dubai)</SelectItem>
                        <SelectItem value="uae-ad">UAE (Abu Dhabi)</SelectItem>
                        <SelectItem value="ksa">Saudi Arabia</SelectItem>
                        <SelectItem value="qatar">Qatar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Data Retention</p>
                      <p className="text-sm text-muted-foreground">How long to keep historical data</p>
                    </div>
                    <Select defaultValue="5y">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="3y">3 Years</SelectItem>
                        <SelectItem value="5y">5 Years</SelectItem>
                        <SelectItem value="7y">7 Years (UAE Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">GDPR Compliance</p>
                      <p className="text-sm text-muted-foreground">For international operations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="grid gap-4 pt-4 border-t">
                  <div>
                    <p className="font-medium mb-2">Compliance Reports</p>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">RTA Compliance Report</span>
                        </div>
                        <Badge variant="outline">Monthly</Badge>
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">UAE Federal Transport Authority</span>
                        </div>
                        <Badge variant="outline">Quarterly</Badge>
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Data Security Audit</span>
                        </div>
                        <Badge variant="outline">Annual</Badge>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage authentication and data protection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Two-Factor Authentication</p>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-awr-primary/10 rounded-md">
                          <Key className="h-5 w-5 text-awr-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">2FA is enabled</p>
                          <p className="text-xs text-muted-foreground">
                            Using authenticator app
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Password Settings</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <span className="text-sm">Change Password</span>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="text-sm">Password Expires</p>
                          <p className="text-xs text-muted-foreground">Every 90 days</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="font-medium mb-3">Blockchain Audit Trail</p>
                  <div className="bg-accent/30 p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-awr-primary/10 rounded-full">
                        <Database className="h-4 w-4 text-awr-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Enabled</p>
                        <p className="text-xs text-muted-foreground">All system changes are recorded securely</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-white/70 rounded-md shadow-sm">
                        <p className="text-xs font-medium">Last Record</p>
                        <p className="text-sm">10 min ago</p>
                      </div>
                      
                      <div className="p-2 bg-white/70 rounded-md shadow-sm">
                        <p className="text-xs font-medium">Block Height</p>
                        <p className="text-sm">1,342,918</p>
                      </div>
                      
                      <div className="p-2 bg-white/70 rounded-md shadow-sm">
                        <p className="text-xs font-medium">Status</p>
                        <p className="text-sm text-awr-success">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div>
                    <p className="font-medium mb-3">Data Security Features</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">End-to-end Encryption</span>
                        </div>
                        <Badge variant="success">Enabled</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Data Anonymization</span>
                        </div>
                        <Badge variant="success">Enabled</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Role-based Access Control</span>
                        </div>
                        <Badge variant="success">Enabled</Badge>
                      </div>
                    </div>
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
