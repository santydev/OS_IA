"use client";

import { CalendarEvent } from '../types';
import { EventCard } from './EventCard';

interface EventListProps {
  events: CalendarEvent[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Upcoming Events</h3>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}