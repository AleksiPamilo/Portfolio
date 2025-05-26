import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10)
    const skip = (page - 1) * pageSize

    try {
        const [totalCount, projects] = await Promise.all([
            prisma.project.count(),
            prisma.project.findMany({
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
            }),
        ])
        return NextResponse.json({ totalCount, projects })
    } catch (err) {
        console.error("GET /api/admin/projects", err)
        return NextResponse.json(
            { error: "Failed to load projects" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    let body: {
        title: string
        slug: string
        description: string
        images: string[]
        tech?: string[]
        url?: string
        repo?: string
        startDate: string
        endDate?: string
    }
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    try {
        const project = await prisma.project.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                images: body.images,
                tech: body.tech,
                url: body.url,
                repo: body.repo,
                startDate: new Date(body.startDate + "-01"),
                endDate: body.endDate ? new Date(body.endDate + "-01") : null,
            },
        })
        return NextResponse.json(project, { status: 201 })
    } catch (err) {
        console.error("POST /api/admin/projects", err)
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        )
    }
}
