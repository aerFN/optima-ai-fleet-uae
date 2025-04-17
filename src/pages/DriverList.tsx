
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { Search, Filter, User, Car, AlertTriangle, Shield, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

// Driver mock data
const driversData = [
  {
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
    vehicleIDs: ["V-001", "V-004"],
    incidents: [
      { date: "2025-02-18", type: "Harsh Braking", severity: "Medium" },
      { date: "2025-01-25", type: "Speeding", severity: "High" },
    ],
    status: "active",
  },
  {
    id: "D-4588",
    name: "Ahmed Hassan",
    role: "Driver",
    joinDate: "2023-08-20",
    license: "UAE 8923475",
    licenseExpiry: "2026-10-15",
    phone: "+971 55 234 5678",
    email: "ahmed.h@awr.com",
    safetyScore: 92,
    vehicles: ["Nissan Altima"],
    vehicleIDs: ["V-002"],
    incidents: [],
    status: "active",
  },
  {
    id: "D-4589",
    name: "Fahad Khalid",
    role: "Driver",
    joinDate: "2023-09-05",
    license: "UAE 6754321",
    licenseExpiry: "2025-12-30",
    phone: "+971 55 345 6789",
    email: "fahad.k@awr.com",
    safetyScore: 85,
    vehicles: ["Mitsubishi Fuso"],
    vehicleIDs: ["V-003"],
    incidents: [
      { date: "2024-12-03", type: "Phone Usage", severity: "Medium" },
    ],
    status: "active",
  },
  {
    id: "D-4590",
    name: "Saeed Mohammed",
    role: "Senior Driver",
    joinDate: "2023-05-10",
    license: "UAE 9087654",
    licenseExpiry: "2026-07-18",
    phone: "+971 55 456 7890",
    email: "saeed.m@awr.com",
    safetyScore: 95,
    vehicles: ["Nissan Patrol"],
    vehicleIDs: ["V-004"],
    incidents: [],
    status: "active",
  },
  {
    id: "D-4591",
    name: "Khalid Rahman",
    role: "Driver",
    joinDate: "2024-01-15",
    license: "UAE 8123456",
    licenseExpiry: "2027-01-15",
    phone: "+971 55 567 8901",
    email: "khalid.r@awr.com",
    safetyScore: 88,
    vehicles: ["Toyota Camry"],
    vehicleIDs: ["V-006"],
    incidents: [
      { date: "2025-03-01", type: "Harsh Braking", severity: "Low" },
    ],
    status: "active",
  },
  {
    id: "D-4592",
    name: "Hassan Tariq",
    role: "Driver",
    joinDate: "2023-11-20",
    license: "UAE 7345678",
    licenseExpiry: "2026-11-20",
    phone: "+971 55 678 9012",
    email: "hassan.t@awr.com",
    safetyScore: 81,
    vehicles: ["Ford Explorer"],
    vehicleIDs: ["V-007"],
    incidents: [
      { date: "2025-02-10", type: "Speeding", severity: "Medium" },
      { date: "2025-01-05", type: "Lane Departure", severity: "Low" },
    ],
    status: "on leave",
  },
  {
    id: "D-4593",
    name: "Omar Saeed",
    role: "Driver",
    joinDate: "2023-07-05",
    license: "UAE 6543219",
    licenseExpiry: "2026-07-05",
    phone: "+971 55 789 0123",
    email: "omar.s@awr.com",
    safetyScore: 79,
    vehicles: ["Isuzu NPR"],
    vehicleIDs: ["V-008"],
    incidents: [
      { date: "2025-03-05", type: "Tailgating", severity: "High" },
      { date: "2025-02-20", type: "Harsh Braking", severity: "Medium" },
      { date: "2025-01-15", type: "Speeding", severity: "Medium" },
    ],
    status: "active",
  },
  {
    id: "D-4594",
    name: "Ali Mohammed",
    role: "Senior Driver",
    joinDate: "2022-12-10",
    license: "UAE 5432198",
    licenseExpiry: "2025-12-10",
    phone: "+971 55 890 1234",
    email: "ali.m@awr.com",
    safetyScore: 94,
    vehicles: ["Lexus ES"],
    vehicleIDs: ["V-009"],
    incidents: [],
    status: "active",
  },
];

export default function DriverList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [driverStatus, setDriverStatus] = useState("all");
  const [safetyFilter, setSafetyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter and sort drivers
  const filteredDrivers = driversData.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = driverStatus === "all" || driver.status.toLowerCase() === driverStatus.toLowerCase();
    
    const matchesSafety = safetyFilter === "all" || 
                        (safetyFilter === "excellent" && driver.safetyScore >= 90) ||
                        (safetyFilter === "good" && driver.safetyScore >= 80 && driver.safetyScore < 90) ||
                        (safetyFilter === "average" && driver.safetyScore >= 70 && driver.safetyScore < 80) ||
                        (safetyFilter === "poor" && driver.safetyScore < 70);
    
    return matchesSearch && matchesStatus && matchesSafety;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "id") {
      return a.id.localeCompare(b.id);
    } else if (sortBy === "safety") {
      return b.safetyScore - a.safetyScore;
    } else if (sortBy === "incidents") {
      return b.incidents.length - a.incidents.length;
    }
    return 0;
  });

  const getSafetyColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-green-400";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Driver Management</h1>
          <p className="text-muted-foreground">Manage and monitor your drivers</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-awr-primary/5 text-awr-primary">
            Total: {driversData.length} Drivers
          </Badge>
          <CompetitiveBadge
            metric="60% Accident Reduction"
            ourValue="60%"
            competitorName="Falcon Trackers"
            competitorValue="45%"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drivers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          variant="outline" 
          className="flex gap-2" 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </Button>
        
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="safety">Safety Score</SelectItem>
              <SelectItem value="incidents">Incidents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isFiltersOpen && (
        <Card className="border border-dashed animate-fade-in">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Driver Status</label>
                <Select value={driverStatus} onValueChange={setDriverStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Safety Score</label>
                <Select value={safetyFilter} onValueChange={setSafetyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Safety Score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="excellent">Excellent (90+)</SelectItem>
                    <SelectItem value="good">Good (80-89)</SelectItem>
                    <SelectItem value="average">Average (70-79)</SelectItem>
                    <SelectItem value="poor">Poor (Below 70)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => {
                    setDriverStatus("all");
                    setSafetyFilter("all");
                    setSearchTerm("");
                  }}
                >
                  Clear All
                </Button>
                <Button onClick={() => setIsFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {filteredDrivers.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-muted-foreground">No drivers match your filters</p>
            <Button 
              variant="link" 
              onClick={() => {
                setDriverStatus("all");
                setSafetyFilter("all");
                setSearchTerm("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredDrivers.map(driver => (
            <Card key={driver.id} className="hover:bg-accent/40 transition-colors group">
              <CardContent className="p-0">
                <Link to={`/drivers/${driver.id}`} className="block p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full flex-shrink-0 bg-awr-primary/10 text-awr-primary flex items-center justify-center">
                      <User strokeWidth={1.5} className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{driver.name}</h3>
                            <Badge variant="outline" className="text-xs font-normal">
                              {driver.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {driver.role} • {driver.email}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0">
                          <Badge variant={driver.status === 'active' ? 'success' : 'outline'} className="capitalize">
                            {driver.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Safety Score: {driver.safetyScore}</span>
                            <Shield size={14} className={
                              driver.safetyScore >= 90 ? "text-green-500" :
                              driver.safetyScore >= 80 ? "text-green-400" :
                              driver.safetyScore >= 70 ? "text-yellow-500" :
                              "text-red-500"
                            } />
                          </div>
                          <Progress value={driver.safetyScore} className="h-2" indicatorClassName={getSafetyColor(driver.safetyScore)} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Car size={14} className="text-slate-400" />
                          <span className="text-sm">
                            {driver.vehicles.length} Vehicle{driver.vehicles.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {driver.incidents.length > 0 ? (
                            <div className="flex items-center gap-2 text-amber-600">
                              <AlertTriangle size={14} />
                              <span className="text-sm">
                                {driver.incidents.length} Incident{driver.incidents.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-green-600">
                              <Shield size={14} />
                              <span className="text-sm">No incidents</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center self-center">
                      <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
