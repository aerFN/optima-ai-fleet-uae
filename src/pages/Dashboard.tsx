
import { CardTitle, Card, CardContent, CardHeader } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { UaeInsightsPanel } from "@/components/dashboard/UaeInsightsPanel";
import { LineChart } from "@/components/dashboard/charts/LineChart";
import { BarChart } from "@/components/dashboard/charts/BarChart";
import { PieChart } from "@/components/dashboard/charts/PieChart";
import { CompetitiveBadge } from "@/components/ui/competitive-badge";
import { Fuel, Wrench, ShieldAlert } from "lucide-react";

// Sample data for fuel consumption chart
const fuelConsumptionData = [
  {
    id: "Fleet Average",
    data: [
      { x: "Jan", y: 24 },
      { x: "Feb", y: 23 },
      { x: "Mar", y: 20 },
      { x: "Apr", y: 22 },
      { x: "May", y: 19 },
      { x: "Jun", y: 17 },
      { x: "Jul", y: 15 },
      { x: "Aug", y: 14 },
      { x: "Sep", y: 13 },
      { x: "Oct", y: 11 },
      { x: "Nov", y: 12 },
      { x: "Dec", y: 10 },
    ],
  },
  {
    id: "Industry Average",
    data: [
      { x: "Jan", y: 24 },
      { x: "Feb", y: 24 },
      { x: "Mar", y: 23 },
      { x: "Apr", y: 25 },
      { x: "May", y: 24 },
      { x: "Jun", y: 25 },
      { x: "Jul", y: 23 },
      { x: "Aug", y: 24 },
      { x: "Sep", y: 23 },
      { x: "Oct", y: 22 },
      { x: "Nov", y: 23 },
      { x: "Dec", y: 22 },
    ],
  },
];

// Sample data for maintenance costs
const maintenanceCostData = [
  {
    month: "Jan",
    "Preventive": 20000,
    "Reactive": 15000,
    "Predictive": 5000,
  },
  {
    month: "Feb",
    "Preventive": 19000,
    "Reactive": 13000,
    "Predictive": 7000,
  },
  {
    month: "Mar",
    "Preventive": 18000,
    "Reactive": 11000,
    "Predictive": 9000,
  },
  {
    month: "Apr",
    "Preventive": 17500,
    "Reactive": 8000,
    "Predictive": 10500,
  },
  {
    month: "May",
    "Preventive": 17000,
    "Reactive": 6000,
    "Predictive": 12000,
  },
  {
    month: "Jun",
    "Preventive": 16500,
    "Reactive": 4500,
    "Predictive": 13500,
  },
];

// Sample data for safety incidents
const safetyIncidentData = [
  {
    id: "Speeding",
    label: "Speeding",
    value: 38,
    color: "#F44336",
  },
  {
    id: "Harsh Braking",
    label: "Harsh Braking",
    value: 25,
    color: "#FF9800",
  },
  {
    id: "Lane Departure",
    label: "Lane Departure",
    value: 15,
    color: "#FFEB3B",
  },
  {
    id: "Tailgating",
    label: "Tailgating",
    value: 12,
    color: "#9C27B0",
  },
  {
    id: "Phone Usage",
    label: "Phone Usage",
    value: 10,
    color: "#E91E63",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: </span>
          <span className="text-sm">Today, 2:30 PM GST</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Fuel Savings"
          value="13%"
          icon={<Fuel size={18} />}
          trend={{ value: 4, isUpward: true, isPositive: true }}
          description="vs. previous quarter"
          variant="highlight"
          competitor={{
            name: "Fleetroot",
            value: "10%"
          }}
        />
        <KpiCard
          title="Downtime Reduction"
          value="30%"
          icon={<Wrench size={18} />}
          trend={{ value: 7, isUpward: true, isPositive: true }}
          variant="success"
          competitor={{
            name: "Al Rasid",
            value: "22%"
          }}
        />
        <KpiCard
          title="Accident Risk Reduction"
          value="60%"
          icon={<ShieldAlert size={18} />}
          trend={{ value: 12, isUpward: true, isPositive: true }}
          variant="success"
          competitor={{
            name: "Falcon Trackers",
            value: "45%"
          }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fuel Consumption */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Fuel Consumption Trends</CardTitle>
              <CompetitiveBadge
                metric="13% Better"
                ourValue="13% Savings"
                competitorName="Fleetroot"
                competitorValue="10% Savings"
              />
            </div>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={fuelConsumptionData} 
              height={300} 
              yAxisLabel="L/100km"
              xAxisLabel="Month"
            />
          </CardContent>
        </Card>

        {/* UAE Insights Panel */}
        <UaeInsightsPanel />

        {/* Maintenance Costs */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Maintenance Cost Breakdown</CardTitle>
              <CompetitiveBadge
                metric="95% Accuracy"
                ourValue="95%"
                competitorName="Al Rasid"
                competitorValue="85%"
              />
            </div>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={maintenanceCostData}
              keys={["Preventive", "Reactive", "Predictive"]}
              indexBy="month"
              height={300}
              colors={["#64B5F6", "#F44336", "#4CAF50"]}
              axisLeftLabel="AED"
              axisBottomLabel="Month"
            />
          </CardContent>
        </Card>

        {/* Safety Incidents */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Safety Incident Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={safetyIncidentData} 
              height={300}
              enableArcLinkLabels={false}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Footer Tag */}
      <div className="mt-8 pt-4 border-t text-center">
        <div className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-full">
          <span className="text-xs text-muted-foreground">Developed by AWR for UAE's fleet management needs</span>
        </div>
      </div>
    </div>
  );
}
