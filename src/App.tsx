import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/vehicles" element={<ComingSoon title="Vehicles Management" />} />
            <Route path="/drivers" element={<ComingSoon title="Driver Profiles" />} />
            <Route path="/automation" element={<ComingSoon title="Automation Builder" />} />
            <Route path="/settings" element={<ComingSoon title="Settings & Compliance" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Temporary component for routes under development
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-2xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground mb-4">This feature is under development for the FleetAIOptima prototype.</p>
    <div className="w-20 h-20 rounded-full border-4 border-t-awr-primary border-r-awr-primary border-b-awr-primary/30 border-l-awr-primary/30 animate-spin-slow"></div>
  </div>
);

export default App;
