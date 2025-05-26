import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const skills = await prisma.skill.findMany({ orderBy: { title: "asc" } })
    return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
    const unauthorized = await requireAuth(req)
    if (unauthorized) return unauthorized

    const { title, description, icon, tags } = await req.json() as {
        title?: string
        description?: string
        icon?: string
        tags?: string[]
    }

    if (!title?.trim() || !description?.trim() || !icon?.trim() || !Array.isArray(tags)) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    try {
        const skill = await prisma.skill.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                icon: icon.trim(),
                tags,
            },
        })
        return NextResponse.json(skill, { status: 201 })
    } catch (e) {
        if ((e as { code: string }).code === "P2002") {
            return NextResponse.json({ error: "Skill already exists" }, { status: 409 })
        }
        console.error(e)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}