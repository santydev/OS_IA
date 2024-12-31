"use client";

import { CalendarEvent } from '../types';
import { CalendarDay } from './CalendarDay';
import { getMonthDays } from '../utils/date';

interface CalendarGridProps {
  view: 'month' | 'week' | 'day';
  events: CalendarEvent[];
  currentDate: Date;
  onDateClick?: (date: Date) => void;
}

export function CalendarGrid({ view, events, currentDate, onDateClick }: CalendarGridProps) {
  const days = getMonthDays(currentDate);
  const currentMonth = currentDate.getMonth();

  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((date, i) => (
          <CalendarDay
            key={i}
            date={date}
            events={events}
            isCurrentMonth={date.getMonth() === currentMonth}
            onClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
}