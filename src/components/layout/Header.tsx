
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [searchInput, setSearchInput] = useState("");
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-card px-6 md:px-4">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <Menu size={20} />
      </Button>
      
      {/* Search bar */}
      <div className="w-full max-w-md relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search vehicles, drivers, routes..."
          className="w-full bg-background pl-9 rounded-xl"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        {/* Live Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-awr-success/10 rounded-full">
          <span className="h-2 w-2 rounded-full bg-awr-success animate-pulse-soft"></span>
          <span className="text-xs font-medium text-awr-success">Live Data Active</span>
        </div>
        
        {/* AI Assistant Button */}
        <Button size="sm" className="hidden md:flex gap-2 items-center bg-awr-primary hover:bg-awr-primary/90">
          <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse-soft"></div>
          </div>
          <span>AI Assistant</span>
        </Button>
        
        {/* Notifications */}
        <Button variant="outline" size="icon">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-awr-primary flex items-center justify-center text-[10px] text-white font-medium">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
