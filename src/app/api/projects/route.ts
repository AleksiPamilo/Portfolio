import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const limit = parseInt(searchParams.get("limit") || "0", 10)

        const rows = await prisma.project.findMany({
            orderBy: { startDate: "desc" },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                images: true,
                url: true,
                repo: true,
                startDate: true,
                endDate: true,
                createdAt: true,
            },
            ...(limit > 0 ? { take: limit } : {})
        })

        const projects = rows.map((p) => ({
            ...p,
            repoUrl: p.repo ? `https://github.com/${p.repo}` : undefined
        }))

        return NextResponse.json(projects)
    } catch (err) {
        console.error("GET /api/projects error:", err)
        return NextResponse.json(
            { error: "Unable to fetch projects" },
            { status: 500 }
        )
    }
}