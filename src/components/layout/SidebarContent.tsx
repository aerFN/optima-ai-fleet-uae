
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Car,
  Map,
  User,
  Gauge,
  Bot,
  Settings,
  Headphones,
  ExternalLink
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SidebarContent = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: Gauge },
    { name: "Map View", path: "/map", icon: Map },
    { name: "Vehicles", path: "/vehicles", icon: Car },
    { name: "Drivers", path: "/drivers", icon: User },
    { name: "Automation", path: "/automation", icon: Bot },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-awr-primary flex items-center justify-center text-white font-bold text-xl select-none">
            F
          </div>
          <span className="font-semibold text-lg">FleetAIOptima</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="px-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent ${
                      isActive(item.path) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex flex-col space-y-4">
          <div className="bg-awr-primary/10 rounded-md p-3 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Headphones className="w-4 h-4 text-awr-primary" />
              <span className="font-medium text-awr-primary">Support</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Need help with FleetAIOptima? Contact our 24/7 support team.
            </p>
            <Link
              to="/settings"
              className="flex items-center justify-center gap-1 bg-awr-primary text-white text-xs py-1 px-3 rounded-md"
            >
              <span>Contact Support</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
