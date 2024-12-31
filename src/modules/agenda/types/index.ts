export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: string[];
  status: 'scheduled' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFilter {
  startDate?: Date;
  endDate?: Date;
  status?: CalendarEvent['status'];
}