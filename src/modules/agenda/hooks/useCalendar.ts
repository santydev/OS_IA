"use client";

import { useState, useCallback } from 'react';
import { CalendarEvent, EventFilter } from '../types';

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = useCallback(async (filter?: EventFilter) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/calendar/events?' + new URLSearchParams({
        ...filter,
        startDate: filter?.startDate?.toISOString(),
        endDate: filter?.endDate?.toISOString(),
      }));
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    events,
    isLoading,
    fetchEvents
  };
}