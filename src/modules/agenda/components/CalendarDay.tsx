"use client";

import { CalendarEvent } from '../types';
import { isSameDay } from '../utils/date';

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  onClick?: (date: Date) => void;
}

export function CalendarDay({ date, events, isCurrentMonth, onClick }: CalendarDayProps) {
  const dayEvents = events.filter(event => isSameDay(new Date(event.startDate), date));
  const isToday = isSameDay(date, new Date());

  return (
    <div
      onClick={() => onClick?.(date)}
      className={`min-h-[100px] bg-white p-2 cursor-pointer hover:bg-gray-50 ${
        !isCurrentMonth ? 'opacity-50' : ''
      }`}
    >
      <span className={`text-sm ${
        isToday ? 'bg-primary text-primary-foreground rounded-full px-2 py-1' : 
        'text-gray-500'
      }`}>
        {date.getDate()}
      </span>
      
      <div className="mt-1 space-y-1">
        {dayEvents.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 rounded truncate bg-blue-100 text-blue-800"
          >
            {event.title}
          </div>
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-gray-500">
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}