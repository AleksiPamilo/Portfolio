"use client"

import SkillForm from "@/components/SkillForm"
import type { SkillPayload } from "@/types/skills"

export default function NewSkillPage() {
  async function createSkill(data: SkillPayload) {
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || "Create failed")
    }
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-4">
      <SkillForm onSubmit={createSkill} submitLabel="Create Skill" />
    </div>
  )
}
