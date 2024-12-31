"use client";

import { CalendarEvent } from '../types';

interface EventStatusBadgeProps {
  status: CalendarEvent['status'];
}

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    scheduled: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}>
      {status}
    </span>
  );
}