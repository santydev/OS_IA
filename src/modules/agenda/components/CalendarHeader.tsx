"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CalendarHeaderProps {
  view: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarHeader({
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <CalendarIcon className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Calendar</h2>
      </div>
      
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
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={view === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('month')}
        >
          Month
        </Button>
        <Button
          variant={view === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('week')}
        >
          Week
        </Button>
        <Button
          variant={view === 'day' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('day')}
        >
          Day
        </Button>
      </div>
    </div>
  );
}