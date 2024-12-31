"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  currentDate: Date;
}

export function CalendarControls({ onPrev, onNext, onToday, currentDate }: CalendarControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={onPrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={onToday}>
        Today
      </Button>
      <Button variant="outline" size="sm" onClick={onNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <span className="ml-4 text-sm font-medium">
        {currentDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        })}
      </span>
    </div>
  );
}