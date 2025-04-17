
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { Search, Sliders, Car, Filter, AlertTriangle, Clock, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

// Vehicle mock data
const vehiclesData = [
  { 
    id: 'V-001',
    type: 'SUV',
    model: 'Toyota Land Cruiser',
    status: 'in transit',
    fuel: 75,
    driver: 'Mohammed A.',
    route: 'Dubai - Abu Dhabi',
    efficiency: 'Good',
    location: 'Dubai Marina',
    lastMaintenance: '2025-03-12',
    nextMaintenance: '2025-06-15',
    safetyScore: 87,
    alerts: [],
  },
  { 
    id: 'V-002',
    type: 'Sedan',
    model: 'Nissan Altima',
    status: 'idle',
    fuel: 45,
    driver: 'Ahmed H.',
    route: 'Local',
    efficiency: 'Average',
    location: 'Sheikh Zayed Road',
    lastMaintenance: '2025-02-20',
    nextMaintenance: '2025-05-20',
    safetyScore: 92,
    alerts: [],
  },
  { 
    id: 'V-003',
    type: 'Truck',
    model: 'Mitsubishi Fuso',
    status: 'in transit',
    fuel: 60,
    driver: 'Fahad K.',
    route: 'Dubai - Sharjah',
    efficiency: 'Average',
    location: 'Sharjah Highway',
    lastMaintenance: '2025-01-05',
    nextMaintenance: '2025-04-05',
    safetyScore: 85,
    alerts: ['Maintenance Due in 5 days'],
  },
  { 
    id: 'V-004',
    type: 'SUV',
    model: 'Nissan Patrol',
    status: 'in transit',
    fuel: 82,
    driver: 'Saeed M.',
    route: 'Dubai - Al Ain',
    efficiency: 'Excellent',
    location: 'Al Ain Road',
    lastMaintenance: '2025-02-28',
    nextMaintenance: '2025-05-28',
    safetyScore: 95,
    alerts: [],
  },
  { 
    id: 'V-005',
    type: 'Van',
    model: 'Toyota HiAce',
    status: 'maintenance',
    fuel: 30,
    driver: 'Unassigned',
    route: 'N/A',
    efficiency: 'Poor',
    location: 'Service Center',
    lastMaintenance: '2025-03-15',
    nextMaintenance: '2025-04-01',
    safetyScore: 76,
    alerts: ['In Maintenance'],
  },
  { 
    id: 'V-006',
    type: 'Sedan',
    model: 'Toyota Camry',
    status: 'idle',
    fuel: 65,
    driver: 'Khalid R.',
    route: 'N/A',
    efficiency: 'Good',
    location: 'Dubai Marina',
    lastMaintenance: '2025-03-01',
    nextMaintenance: '2025-06-01',
    safetyScore: 88,
    alerts: [],
  },
  { 
    id: 'V-007',
    type: 'SUV',
    model: 'Ford Explorer',
    status: 'in transit',
    fuel: 55,
    driver: 'Hassan T.',
    route: 'Dubai - Fujairah',
    efficiency: 'Average',
    location: 'Fujairah Highway',
    lastMaintenance: '2025-02-15',
    nextMaintenance: '2025-05-15',
    safetyScore: 81,
    alerts: ['Low Fuel Alert'],
  },
  { 
    id: 'V-008',
    type: 'Truck',
    model: 'Isuzu NPR',
    status: 'idle',
    fuel: 40,
    driver: 'Omar S.',
    route: 'N/A',
    efficiency: 'Poor',
    location: 'Dubai Industrial City',
    lastMaintenance: '2025-01-20',
    nextMaintenance: '2025-04-20',
    safetyScore: 79,
    alerts: ['Maintenance Due Soon'],
  },
  { 
    id: 'V-009',
    type: 'Sedan',
    model: 'Lexus ES',
    status: 'in transit',
    fuel: 85,
    driver: 'Ali M.',
    route: 'Abu Dhabi - Dubai',
    efficiency: 'Excellent',
    location: 'Abu Dhabi',
    lastMaintenance: '2025-03-05',
    nextMaintenance: '2025-06-05',
    safetyScore: 94,
    alerts: [],
  },
  { 
    id: 'V-010',
    type: 'Van',
    model: 'Mercedes Sprinter',
    status: 'maintenance',
    fuel: 25,
    driver: 'Unassigned',
    route: 'N/A',
    efficiency: 'Average',
    location: 'Service Center',
    lastMaintenance: '2025-03-17',
    nextMaintenance: '2025-04-03',
    safetyScore: 72,
    alerts: ['Major Repair'],
  }
];

export default function VehicleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [vehicleStatus, setVehicleStatus] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter and sort vehicles
  const filteredVehicles = vehiclesData.filter(vehicle => {
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = vehicleType === "all" || vehicle.type.toLowerCase() === vehicleType.toLowerCase();
    const matchesStatus = vehicleStatus === "all" || vehicle.status.toLowerCase() === vehicleStatus.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "id") {
      return a.id.localeCompare(b.id);
    } else if (sortBy === "model") {
      return a.model.localeCompare(b.model);
    } else if (sortBy === "safety") {
      return b.safetyScore - a.safetyScore;
    } else if (sortBy === "fuel") {
      return b.fuel - a.fuel;
    }
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Vehicle Fleet</h1>
          <p className="text-muted-foreground">Manage and monitor your fleet vehicles</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-awr-primary/5 text-awr-primary">
            Total: {vehiclesData.length} Vehicles
          </Badge>
          <CompetitiveBadge
            metric="13% Fuel Savings"
            ourValue="13%"
            competitorName="Fleetroot"
            competitorValue="10%"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vehicles..."
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
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="model">Model</SelectItem>
              <SelectItem value="safety">Safety Score</SelectItem>
              <SelectItem value="fuel">Fuel Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isFiltersOpen && (
        <Card className="border border-dashed animate-fade-in">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
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
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Status</label>
                <Select value={vehicleStatus} onValueChange={setVehicleStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => {
                    setVehicleType("all");
                    setVehicleStatus("all");
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
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-muted-foreground">No vehicles match your filters</p>
            <Button 
              variant="link" 
              onClick={() => {
                setVehicleType("all");
                setVehicleStatus("all");
                setSearchTerm("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredVehicles.map(vehicle => (
            <Card key={vehicle.id} className="hover:bg-accent/40 transition-colors group">
              <CardContent className="p-0">
                <Link to={`/vehicles/${vehicle.id}`} className="block p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{
                      backgroundColor: vehicle.status === 'in transit' ? '#4CAF5010' : 
                                      vehicle.status === 'idle' ? '#FFC10710' : '#F4433610',
                      color: vehicle.status === 'in transit' ? '#4CAF50' : 
                              vehicle.status === 'idle' ? '#FFC107' : '#F44336',
                    }}>
                      <Car strokeWidth={1.5} className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{vehicle.model}</h3>
                            <Badge variant="outline" className="text-xs font-normal">
                              {vehicle.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Type: {vehicle.type} • Driver: {vehicle.driver}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0">
                          <Badge variant={
                            vehicle.status === 'in transit' ? 'success' : 
                            vehicle.status === 'idle' ? 'warning' : 'destructive'
                          } className="capitalize">
                            {vehicle.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-awr-primary"></div>
                          <span className="text-sm">
                            Fuel: {vehicle.fuel}%
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">
                            Safety Score: {vehicle.safetyScore}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {vehicle.alerts.length > 0 ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2 text-amber-600">
                                    <AlertTriangle size={14} />
                                    <span className="text-sm">
                                      {vehicle.alerts.length} Alert{vehicle.alerts.length > 1 ? 's' : ''}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    {vehicle.alerts.map((alert, i) => (
                                      <p key={i}>{alert}</p>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-slate-400" />
                              <span className="text-sm text-muted-foreground">
                                Next Maintenance: {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                              </span>
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
