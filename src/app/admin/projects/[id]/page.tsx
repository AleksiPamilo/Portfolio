"use client"

import React, { useEffect, useState } from "react"
import ProjectForm from "@/components/ProjectForm"
import type { ProjectPayload } from "@/types/project"

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)
    const [initial, setInitial] = useState<ProjectPayload & { images: string[] } | null>(null)

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then((r) => r.ok ? r.json() : Promise.reject("Load failed"))
            .then((p) => setInitial(p))
            .catch(console.error)
    }, [id])

    async function updateProject(data: ProjectPayload) {
        const res = await fetch(`/api/admin/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            const body = await res.json().catch(() => ({}))
            throw new Error(body.error || "Update failed")
        }
    }

    if (!initial) {
        return <p className="text-center mt-8">Loading…</p>
    }

    return <div className="w-screen min-h-screen flex items-center justify-center">
        <ProjectForm initial={initial} onSubmit={updateProject} submitLabel="Update Project" />
    </div>
}
