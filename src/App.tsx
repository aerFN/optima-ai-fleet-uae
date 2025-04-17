
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import VehicleDetails from "./pages/VehicleDetails";
import VehicleList from "./pages/VehicleList";
import DriverProfile from "./pages/DriverProfile";
import DriverList from "./pages/DriverList";
import AutomationBuilder from "./pages/AutomationBuilder";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { VoiceAssistant } from "./components/ui/voice-assistant";
import { useState, useEffect } from "react";
import { GuidedTour } from "./components/ui/guided-tour";

const queryClient = new QueryClient();

// Tour steps configuration for guided tour
const tourSteps = [
  {
    target: "nav a[href='/']",
    title: "Dashboard",
    content: "View your fleet's key performance metrics and analytics at a glance.",
    position: "right"
  },
  {
    target: "nav a[href='/map']",
    title: "Interactive Map",
    content: "Track your vehicles in real-time with AI-optimized routes and traffic analysis.",
    position: "right"
  },
  {
    target: "nav a[href='/vehicles']",
    title: "Vehicle Management",
    content: "View detailed information about each vehicle in your fleet.",
    position: "right"
  },
  {
    target: "nav a[href='/drivers']",
    title: "Driver Management",
    content: "Monitor driver safety scores and behavior analytics.",
    position: "right"
  }
];

const App = () => {
  const [showTour, setShowTour] = useState(false);
  
  // Show guided tour for first-time users
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      // Wait for the components to render before starting tour
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('hasSeenTour', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/vehicles" element={<VehicleList />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/drivers" element={<DriverList />} />
              <Route path="/drivers/:id" element={<DriverProfile />} />
              <Route path="/automation" element={<AutomationBuilder />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Voice Assistant */}
          <VoiceAssistant />
          
          {/* Guided Tour */}
          {showTour && (
            <GuidedTour 
              steps={tourSteps} 
              onClose={handleCloseTour}
              isOpen={showTour}
            />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
