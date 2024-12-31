"use client";

import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';

export function useEventFilters() {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    dateRange: {
      start: null as Date | null,
      end: null as Date | null
    }
  });

  const filterEvents = useCallback((events: CalendarEvent[]) => {
    return events.filter(event => {
      // Status filter
      if (filters.status !== 'all' && event.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start && new Date(event.startDate) < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && new Date(event.endDate) > filters.dateRange.end) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    filterEvents
  };
}