import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
}

interface GuidedTourProps {
  steps: TourStep[];
  onClose: () => void;
  isOpen: boolean;
}

export function GuidedTour({ steps, onClose, isOpen }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    
    const positionTooltip = () => {
      const step = steps[currentStep];
      const targetElement = document.querySelector(step.target);
      
      if (!targetElement) return;
      
      const targetRect = targetElement.getBoundingClientRect();
      const position = step.position;
      
      let style: React.CSSProperties = {
        position: "absolute",
        zIndex: 1000,
      };
      
      switch(position) {
        case "top":
          style.top = `${targetRect.top - 10 - 120}px`;
          style.left = `${targetRect.left + targetRect.width/2 - 150}px`;
          break;
        case "bottom":
          style.top = `${targetRect.bottom + 10}px`;
          style.left = `${targetRect.left + targetRect.width/2 - 150}px`;
          break;
        case "left":
          style.top = `${targetRect.top + targetRect.height/2 - 60}px`;
          style.left = `${targetRect.left - 10 - 300}px`;
          break;
        case "right":
          style.top = `${targetRect.top + targetRect.height/2 - 60}px`;
          style.left = `${targetRect.right + 10}px`;
          break;
      }
      
      setPopupStyle(style);
    };
    
    positionTooltip();
    
    // Highlight the target element
    const targetElement = document.querySelector(steps[currentStep].target);
    if (targetElement) {
      targetElement.classList.add('tour-highlight');
    }
    
    return () => {
      const targetElement = document.querySelector(steps[currentStep].target);
      if (targetElement) {
        targetElement.classList.remove('tour-highlight');
      }
    };
  }, [currentStep, isOpen, steps]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/5 pointer-events-auto"></div>
      <div 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 w-[300px] pointer-events-auto animate-fade-in border"
        style={popupStyle}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm">{steps[currentStep].title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X size={14} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{steps[currentStep].content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </span>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button 
                size="sm" 
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={onClose}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
