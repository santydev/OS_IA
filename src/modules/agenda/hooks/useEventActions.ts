import { useState } from 'react';
import { CalendarEvent } from '../types';

export function useEventActions() {
  const [isLoading, setIsLoading] = useState(false);

  const createEvent = async (event: Partial<CalendarEvent>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      return await response.json();
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, event: Partial<CalendarEvent>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/calendar/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      return await response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createEvent,
    updateEvent,
  };
}