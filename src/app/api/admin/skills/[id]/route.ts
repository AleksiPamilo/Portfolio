import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const { id } = await params

    if (!id) {
        return NextResponse.json({ error: "ID Is required" }, { status: 400 })
    }

    const { title, description, tags } = await req.json() as {
        title?: string
        description?: string
        tags?: string[]
    }
    if (!title?.trim() || !description?.trim() || !Array.isArray(tags)) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    try {
        const skill = await prisma.skill.update({
            where: { id: id },
            data: { title: title.trim(), description: description.trim(), tags },
        })
        return NextResponse.json(skill)
    } catch (e) {
        if ((e as { code: string }).code === "P2025") {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }
        if ((e as { code: string }).code === "P2002") {
            return NextResponse.json({ error: "Title in use" }, { status: 409 })
        }
        console.error(e)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const { id } = await params

    if (!id) {
        return NextResponse.json({ error: "ID Is required" }, { status: 400 })
    }

    try {
        await prisma.skill.delete({ where: { id: id } })
        return NextResponse.json({ success: true })
    } catch (e) {
        if ((e as { code: string }).code === "P2025") {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }
        console.error(e)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}