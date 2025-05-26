import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const { id } = await params

    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        )
    }

    let body: {
        title: string
        slug: string
        description: string
        images: string[]
        tech: string[]
        url?: string
        repo?: string
    }
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    try {
        const project = await prisma.project.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                images: body.images,
                tech: body.tech,
                url: body.url,
                repo: body.repo,
            },
        })
        return NextResponse.json(project)
    } catch (err) {
        console.error("PUT /api/admin/projects/[id]", err)
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json(
                { error: "Project ID is required" },
                { status: 400 }
            )
        }

        await prisma.project.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("DELETE /api/admin/projects/[id]", err)
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        )
    }
}