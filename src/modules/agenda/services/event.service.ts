import { prisma } from "@/lib/db";
import { CalendarEvent, EventFilter } from "../types";

export class EventService {
  async createEvent(data: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) {
    return prisma.event.create({
      data: {
        ...data,
        status: data.status.toUpperCase()
      }
    });
  }

  async updateEvent(id: string, data: Partial<CalendarEvent>) {
    return prisma.event.update({
      where: { id },
      data: {
        ...data,
        status: data.status?.toUpperCase()
      }
    });
  }

  async deleteEvent(id: string) {
    return prisma.event.delete({
      where: { id }
    });
  }

  async getEvents(filter?: EventFilter) {
    return prisma.event.findMany({
      where: {
        AND: [
          filter?.startDate ? {
            startDate: {
              gte: filter.startDate
            }
          } : {},
          filter?.endDate ? {
            endDate: {
              lte: filter.endDate
            }
          } : {},
          filter?.status ? {
            status: filter.status.toUpperCase()
          } : {}
        ]
      },
      orderBy: {
        startDate: 'asc'
      }
    });
  }
}