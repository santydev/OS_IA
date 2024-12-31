import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { EventService } from "@/modules/agenda/services/event.service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const eventService = new EventService();

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.string().transform(str => new Date(str)).optional(),
  endDate: z.string().transform(str => new Date(str)).optional(),
  location: z.string().optional(),
  status: z.enum(["scheduled", "cancelled", "completed"]).optional()
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const data = updateEventSchema.parse(body);

    const event = await eventService.updateEvent(params.id, data);
    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to update event:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await eventService.deleteEvent(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}