
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Car, 
  User, 
  Code, 
  Settings, 
  LogOut, 
  Bell
} from "lucide-react";

// Logo component for FleetAIOptima
const Logo = () => (
  <div className="flex items-center gap-2 px-4 py-3">
    <div className="relative h-8 w-8 overflow-hidden">
      <div className="absolute inset-0 rounded-full bg-awr-primary flex items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-white animate-pulse-soft"></div>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-foreground leading-none">FleetAIOptima</span>
      <span className="text-xs text-muted-foreground">by AWR</span>
    </div>
  </div>
);

const navigationItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Map View", path: "/map", icon: Map },
  { name: "Vehicles", path: "/vehicles", icon: Car },
  { name: "Drivers", path: "/drivers", icon: User },
  { name: "Automation", path: "/automation", icon: Code },
  { name: "Settings", path: "/settings", icon: Settings },
];

interface NavItemProps {
  item: {
    name: string;
    path: string;
    icon: React.ElementType;
  };
  isActive: boolean;
}

// NavItem with hover and active state styling
const NavItem = ({ item, isActive }: NavItemProps) => {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
        "hover:bg-accent group",
        isActive ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon size={18} className={cn(
        "flex-shrink-0 transition-colors",
        isActive ? "text-awr-primary" : "text-muted-foreground group-hover:text-foreground"
      )} />
      <span>{item.name}</span>
      {item.name === "Dashboard" && (
        <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full bg-awr-primary/10 text-awr-primary">
          New
        </span>
      )}
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-card fixed left-0 top-0 z-20">
      {/* Logo */}
      <Logo />
      
      {/* UAE Tailored Badge */}
      <div className="mx-4 mb-4 p-2 rounded-lg bg-awr-primary/10 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-awr-primary animate-pulse-soft" />
        <span className="text-xs font-medium text-awr-primary">Tailored for UAE by AWR</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto py-2 px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={
                currentPath === item.path ||
                (item.path !== "/" && currentPath.startsWith(item.path))
              }
            />
          ))}
        </div>
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent text-sm">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground">Notifications</span>
          </div>
          <span className="h-5 w-5 rounded-full bg-awr-primary flex items-center justify-center text-[10px] text-white font-medium">
            3
          </span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-awr-primary flex items-center justify-center text-white font-medium">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Ahmad Mohammed</p>
            <p className="text-xs text-muted-foreground truncate">Fleet Manager</p>
          </div>
          <LogOut size={18} className="text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
