import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const unauthorized = await requireAuth(req)
  if (unauthorized) return unauthorized

  const { order } = await req.json() as {
    order: { id: string; order: number }[]
  }

  try {
    await prisma.$transaction(
      order.map(({ id, order }) =>
        prisma.skill.update({
          where: { id },
          data: { order },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Reorder failed" }, { status: 500 })
  }
}
