import { CalendarEvent } from '../types';

export function sortEventsByDate(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function filterUpcomingEvents(events: CalendarEvent[]): CalendarEvent[] {
  const now = new Date();
  return events.filter(event => new Date(event.startDate) >= now);
}

export function groupEventsByStatus(events: CalendarEvent[]) {
  return events.reduce((acc, event) => {
    if (!acc[event.status]) {
      acc[event.status] = [];
    }
    acc[event.status].push(event);
    return acc;
  }, {} as Record<CalendarEvent['status'], CalendarEvent[]>);
}