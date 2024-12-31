import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get module metrics from the database
    const moduleMetrics = await prisma.moduleMetrics.findMany({
      orderBy: { timestamp: "desc" },
      take: 1
    })

    // Calculate system metrics
    const metrics = {
      totalCpuUsage: moduleMetrics[0]?.cpu_usage || 0,
      totalMemoryUsage: moduleMetrics[0]?.memory_usage || 0,
      activeModules: await prisma.module.count({
        where: { status: "ACTIVE" }
      }),
      totalModules: await prisma.module.count(),
      uptime: process.uptime()
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Failed to fetch system metrics:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}