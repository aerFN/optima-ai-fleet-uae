
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Users, 
  Database, 
  Key, 
  Bell, 
  Lock, 
  LogOut, 
  Check, 
  ChevronRight, 
  Building2
} from "lucide-react";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(true);
  const [blockchainVerificationEnabled, setBlockchainVerificationEnabled] = useState(true);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Settings & Compliance</h1>
          <p className="text-muted-foreground">Manage account settings, UAE compliance, and security</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-awr-primary/5 text-awr-primary font-medium px-3 py-1 flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            <span>UAE Compliant</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="account" className="flex gap-2 py-2 h-auto">
            <Users className="h-4 w-4" />
            <div className="text-left">
              <p>Account</p>
              <p className="text-xs text-muted-foreground font-normal">User management</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 py-2 h-auto">
            <Shield className="h-4 w-4" />
            <div className="text-left">
              <p>Security</p>
              <p className="text-xs text-muted-foreground font-normal">Access & permissions</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex gap-2 py-2 h-auto">
            <Building2 className="h-4 w-4" />
            <div className="text-left">
              <p>UAE Compliance</p>
              <p className="text-xs text-muted-foreground font-normal">Local regulations</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex gap-2 py-2 h-auto">
            <Database className="h-4 w-4" />
            <div className="text-left">
              <p>Data</p>
              <p className="text-xs text-muted-foreground font-normal">Backup & protection</p>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Ahmad Mohammed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="ahmad.m@awr.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Fleet Manager" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Operations" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button size="sm">Add User</Button>
                </div>
                
                <div className="space-y-3">
                  {["Fatima Hassan", "Mohammed Al Qasim", "Sarah Ahmed"].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <span className="font-medium text-slate-500">{user.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-medium">{user}</p>
                          <p className="text-xs text-muted-foreground">{["Operations Manager", "Driver Coordinator", "Data Analyst"][i]}</p>
                        </div>
                      </div>
                      <button className="text-sm text-awr-primary hover:underline">Edit Permissions</button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notifications" 
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                    <Label htmlFor="notifications">
                      {notificationsEnabled ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </div>
                
                {notificationsEnabled && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notif" className="rounded" defaultChecked />
                      <label htmlFor="email-notif" className="text-sm">Email notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notif" className="rounded" defaultChecked />
                      <label htmlFor="sms-notif" className="text-sm">SMS notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="app-notif" className="rounded" defaultChecked />
                      <label htmlFor="app-notif" className="text-sm">In-app notifications</label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage password and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Button className="mt-2">Update Password</Button>
              </div>
              
              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <Button variant="outline">Enable</Button>
                </div>
                <p className="text-sm text-muted-foreground">Add an extra layer of security by enabling two-factor authentication.</p>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Access Logs</h3>
                <div className="space-y-3">
                  {[
                    { user: "Ahmad Mohammed", action: "Login", date: "2025-04-17 08:32 AM", ip: "185.76.xxx.xxx" },
                    { user: "Ahmad Mohammed", action: "Password Changed", date: "2025-04-10 02:15 PM", ip: "185.76.xxx.xxx" },
                    { user: "Ahmad Mohammed", action: "Login", date: "2025-04-10 09:05 AM", ip: "185.76.xxx.xxx" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-accent/30">
                      <div>
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{log.action}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{log.date} • IP: {log.ip}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                
                <Button variant="link" className="mt-2 p-0">View all access logs</Button>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Dubai, UAE • Chrome on Windows</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">Active</Badge>
                  </div>
                  
                  <div className="flex justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">Dubai, UAE • FleetAIOptima App on iOS</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Logout</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>UAE Compliance Settings</CardTitle>
                  <CardDescription>Manage compliance with local UAE regulations</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0 flex items-center gap-1 px-3 py-1">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Compliant</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Compliance Alert</h3>
                    <p className="text-sm">The UAE Transport Authority has updated its fleet data regulations. Your system is currently compliant, but will require updates by June 30, 2025.</p>
                    
                    <div className="mt-3">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Localization</h3>
                <p className="text-sm text-muted-foreground">UAE regulations require certain data to be stored locally within the country.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Data Storage Location</h4>
                      <Badge className="bg-green-100 text-green-700 border-0">Compliant</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">UAE Data Center (Abu Dhabi)</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Data Encryption</h4>
                      <Badge className="bg-green-100 text-green-700 border-0">Compliant</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">AES-256 Encryption</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Blockchain Verification</h3>
                    <p className="text-sm text-muted-foreground">Secure audit trail using blockchain technology</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="blockchain" 
                      checked={blockchainVerificationEnabled}
                      onCheckedChange={setBlockchainVerificationEnabled}
                    />
                    <Label htmlFor="blockchain">
                      {blockchainVerificationEnabled ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </div>
                
                {blockchainVerificationEnabled && (
                  <div className="border rounded-md mt-3">
                    <div className="p-3 border-b bg-slate-50">
                      <h4 className="font-medium">Recent Verification Records</h4>
                    </div>
                    <div className="p-3 space-y-2">
                      {[
                        { type: "Driver Log", hash: "0x7f2c8d...", timestamp: "2025-04-17 09:15" },
                        { type: "Maintenance Record", hash: "0x3a1b5c...", timestamp: "2025-04-16 14:32" },
                        { type: "Route Optimization", hash: "0x9e4d2a...", timestamp: "2025-04-15 11:47" }
                      ].map((record, i) => (
                        <div key={i} className="text-sm flex justify-between items-center">
                          <div>
                            <span className="font-medium">{record.type}</span>
                            <span className="text-xs text-muted-foreground ml-2">{record.timestamp}</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">{record.hash}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Driver Certification</h3>
                <p className="text-sm text-muted-foreground">Track driver certifications required by UAE transport authorities</p>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-slate-50 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">Driver Name</th>
                        <th className="px-4 py-3 text-left">Certification</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Expiry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {[
                        { name: "Mohammed Abdullah", cert: "UAE Commercial License", status: "Valid", expiry: "2026-08-24" },
                        { name: "Ahmed Hassan", cert: "UAE Commercial License", status: "Valid", expiry: "2025-11-15" },
                        { name: "Fatima Al Zaabi", cert: "UAE Commercial License", status: "Expiring Soon", expiry: "2025-05-30" }
                      ].map((driver, i) => (
                        <tr key={i} className="hover:bg-accent/30">
                          <td className="px-4 py-3">{driver.name}</td>
                          <td className="px-4 py-3">{driver.cert}</td>
                          <td className="px-4 py-3">
                            <Badge variant={driver.status === "Valid" ? "success" : "warning"}>{driver.status}</Badge>
                          </td>
                          <td className="px-4 py-3">{new Date(driver.expiry).toLocaleDateString("en-AE")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-center p-4 mt-4">
                <Badge variant="outline" className="px-4 py-2 bg-awr-primary/5 text-awr-primary border-awr-primary/20 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-medium">Exclusive to AWR – UAE Compliant Data Control</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your data backup and protection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Automated Data Backup</h3>
                  <p className="text-sm text-muted-foreground">Schedule regular backups of your fleet data</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="data-backup" 
                    checked={dataBackupEnabled}
                    onCheckedChange={setDataBackupEnabled}
                  />
                  <Label htmlFor="data-backup">
                    {dataBackupEnabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
              
              {dataBackupEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <select id="backup-frequency" className="w-full border rounded-md px-3 py-2">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention Period</Label>
                    <select id="retention-period" className="w-full border rounded-md px-3 py-2">
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Recent Backups</h3>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-slate-50 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Size</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {[
                        { date: "2025-04-17", size: "1.2 GB", status: "Completed" },
                        { date: "2025-04-16", size: "1.2 GB", status: "Completed" },
                        { date: "2025-04-15", size: "1.1 GB", status: "Completed" }
                      ].map((backup, i) => (
                        <tr key={i} className="hover:bg-accent/30">
                          <td className="px-4 py-3">{new Date(backup.date).toLocaleDateString("en-AE")}</td>
                          <td className="px-4 py-3">{backup.size}</td>
                          <td className="px-4 py-3">
                            <Badge variant="success">{backup.status}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-awr-primary hover:underline text-xs">Download</button>
                              <button className="text-awr-primary hover:underline text-xs">Restore</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button>Create Manual Backup</Button>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Data Export</h3>
                <p className="text-sm text-muted-foreground mb-4">Export your fleet data for reporting or analysis</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 hover:bg-accent/30 cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="h-5 w-5 text-awr-primary" />
                      <h4 className="font-medium">Vehicle Data</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Export vehicle telemetry, maintenance, and location data</p>
                    <Button size="sm" variant="outline" className="w-full">Export CSV</Button>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-accent/30 cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-awr-primary" />
                      <h4 className="font-medium">Driver Data</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Export driver profiles, safety scores, and performance data</p>
                    <Button size="sm" variant="outline" className="w-full">Export CSV</Button>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-accent/30 cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <SettingsIcon className="h-5 w-5 text-awr-primary" />
                      <h4 className="font-medium">System Logs</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Export system logs, audit trails, and usage statistics</p>
                    <Button size="sm" variant="outline" className="w-full">Export CSV</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Data Protection Notice</h4>
                    <p className="text-sm">Your data is stored securely in UAE data centers in compliance with local regulations. All fleet data is encrypted and protected according to UAE data protection laws.</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="destructive" className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Request Data Deletion</span>
                      </Button>
                      <Button size="sm" variant="outline">Privacy Policy</Button>
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
