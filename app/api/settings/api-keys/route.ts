import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"
import { z } from "zod"

const apiKeySchema = z.object({
  openaiKey: z.string().min(1),
  openaiOrg: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { openaiKey, openaiOrg } = apiKeySchema.parse(body)

    // In a production environment, you should encrypt these keys before storing
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        apiKeys: {
          upsert: {
            create: {
              openaiKey,
              openaiOrg,
            },
            update: {
              openaiKey,
              openaiOrg,
            },
          },
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API key update error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}