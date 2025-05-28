"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { X, Plus } from "lucide-react"
import type { Skill } from "@/types/skills"
import { MaskedIcon } from "@/components/MaskedIcon"

export default function AdminSkillsPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  function moveSkill(index: number, direction: -1 | 1) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= skills.length) return

    const reordered = [...skills]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(newIndex, 0, moved)

    setSkills(reordered)
    updateOrder(reordered)
  }

  async function updateOrder(updatedSkills: Skill[]) {
    const orderPayload = updatedSkills.map((skill, i) => ({
      id: skill.id,
      order: i,
    }))

    try {
      const res = await fetch("/api/admin/skills/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderPayload }),
      })

      if (!res.ok) {
        console.error("Failed to save new order")
      }
    } catch (err) {
      console.error("Reorder API error", err)
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
    if (res.ok) {
      setSkills((s) => s.filter((sk) => sk.id !== id))
    } else {
      const body = await res.json().catch(() => ({}))
      console.error(body.error || "Delete failed")
    }
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/admin/skills/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Skill
          </Button>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            Sign Out
          </Button>
        </div>
      </header>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((sk, i) => (
              <TableRow key={sk.id}>
                <TableCell>
                  <MaskedIcon src={sk.icon} className="h-6 w-6 rounded" />
                </TableCell>
                <TableCell>{sk.title}</TableCell>
                <TableCell>{sk.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {sk.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveSkill(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveSkill(i, 1)}
                    disabled={i === skills.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(sk.id)}
                    aria-label="Delete"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
