import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json(
                { error: "Project ID is required" },
                { status: 400 }
            )
        }

        const rows = await prisma.project.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                images: true,
                tech: true,
                url: true,
                repo: true,
                startDate: true,
                endDate: true,
                createdAt: true,
            },
        })

        const project = rows ? {
            ...rows,
            repoUrl: rows.repo ? `https://github.com/${rows.repo}` : undefined
        } : null

        return NextResponse.json(project)
    } catch (err) {
        console.error("GET /api/projects error:", err)
        return NextResponse.json(
            { error: "Unable to fetch projects" },
            { status: 500 }
        )
    }
}