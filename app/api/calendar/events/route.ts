import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { EventService } from "@/modules/agenda/services/event.service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const eventService = new EventService();

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  location: z.string().optional(),
  status: z.enum(["scheduled", "cancelled", "completed"]).default("scheduled")
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const data = eventSchema.parse(body);

    const event = await eventService.createEvent({
      ...data,
      userId: session.user.id
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to create event:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    const events = await eventService.getEvents({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      status: status as any
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}