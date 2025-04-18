
import React, { useState, useRef } from "react";
import { Mic, MicOff, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const commandsRef = useRef<HTMLDivElement>(null);
  
  const commands = [
    { command: "Show idle vehicles", description: "Displays all vehicles that are currently idle" },
    { command: "Show drivers with low safety scores", description: "Displays drivers with safety score below 80" },
    { command: "Show vehicles due for maintenance", description: "Lists vehicles with upcoming maintenance" },
    { command: "Switch to heavy traffic scenario", description: "Changes map view to show heavy traffic conditions" },
  ];

  const handleListen = () => {
    setIsListening(true);
    // This is a simulated voice recognition - in a real app this would use the Web Speech API
    setTimeout(() => {
      setIsListening(false);
      // Simulate a recognized command
      const randomCommand = commands[Math.floor(Math.random() * commands.length)].command;
      handleCommandRecognized(randomCommand);
    }, 2000);
  };

  const handleCommandRecognized = (command: string) => {
    toast({
      title: "Command recognized",
      description: `"${command}" - Processing your request...`,
    });
    
    // In a real app, we would execute the command here
    setTimeout(() => {
      toast({
        title: "Command executed",
        description: "Your request has been processed successfully.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <div 
            ref={commandsRef}
            className="bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-lg p-4 mb-2 w-64 backdrop-blur-sm border animate-fade-in"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Voice Commands</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
                <X size={14} />
              </Button>
            </div>
            <div className="space-y-3">
              {commands.map((cmd, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-awr-primary">{cmd.command}</p>
                  <p className="text-xs text-muted-foreground">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          onClick={() => isOpen ? handleListen() : setIsOpen(true)}
          className={`rounded-full h-14 w-14 shadow-lg ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-awr-primary hover:bg-awr-primary/90'}`}
        >
          {isListening ? (
            <Mic className="h-6 w-6 animate-pulse" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  );
}
