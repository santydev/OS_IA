"use client";

import { useState, useCallback } from "react";
import { getTimeRangeFilter, filterEvents } from "../utils/filters";
import { CalendarEvent, EventFilter } from "../types";

export function useCalendarFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    timeRange: "month"
  });

  const applyFilters = useCallback((events: CalendarEvent[]) => {
    let filteredEvents = [...events];

    // Apply search filter
    if (searchQuery) {
      filteredEvents = filterEvents(filteredEvents, searchQuery);
    }

    // Apply status filter
    if (activeFilters.status !== "all") {
      filteredEvents = filteredEvents.filter(
        event => event.status === activeFilters.status
      );
    }

    // Apply time range filter
    const { startDate, endDate } = getTimeRangeFilter(activeFilters.timeRange);
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startDate) >= startDate && 
               new Date(event.endDate) <= endDate
    );

    return filteredEvents;
  }, [searchQuery, activeFilters]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    applyFilters
  };
}