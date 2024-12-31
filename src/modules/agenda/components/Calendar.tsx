"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventList } from './EventList';
import { EventDialog } from './EventDialog';
import { formatDate } from '../utils/date';

export function Calendar() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, isLoading, fetchEvents } = useCalendar();

  useEffect(() => {
    fetchEvents({
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    });
  }, [currentDate, fetchEvents]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  if (isLoading) {
    return <div>Loading calendar...</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {formatDate(currentDate)}
        </h2>
        <EventDialog onSave={console.log} defaultDate={currentDate} />
      </div>
      
      <CalendarHeader
        view={view}
        onViewChange={setView}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
      />
      
      <div className="mt-4">
        <CalendarGrid
          view={view}
          events={events}
          currentDate={currentDate}
          onDateClick={console.log}
        />
      </div>
      
      <div className="mt-6">
        <EventList events={events} />
      </div>
    </Card>
  );
}