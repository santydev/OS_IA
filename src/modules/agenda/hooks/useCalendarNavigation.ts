"use client";

import { useState, useCallback } from 'react';

export function useCalendarNavigation() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const navigateToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  }, []);

  const navigateToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  }, []);

  return {
    currentDate,
    navigateToToday,
    navigateToPreviousMonth,
    navigateToNextMonth
  };
}