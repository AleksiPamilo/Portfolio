"use client"

import ProjectForm from "@/components/ProjectForm"
import type { ProjectPayload } from "@/types/project"

export default function NewProjectPage() {
    async function createProject(data: ProjectPayload) {
        const res = await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            const body = await res.json().catch(() => ({}))
            throw new Error(body.error || "Create failed")
        }
    }

    return <div className="w-screen min-h-screen flex items-center justify-center">
        <ProjectForm onSubmit={createProject} submitLabel="Create Project" />
    </div>
}
