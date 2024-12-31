"use client";

import { CalendarEvent } from '../types';
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">{event.title}</h4>
          {event.description && (
            <p className="text-sm text-gray-500 mt-1">{event.description}</p>
          )}
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(event.startDate).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(event.startDate).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          event.status === 'completed' ? 'bg-green-100 text-green-800' :
          event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {event.status}
        </span>
      </div>
    </Card>
  );
}