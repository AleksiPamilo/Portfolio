"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { SkillPayload } from "@/types/skills"
import { X } from "lucide-react"

type SkillFormProps = {
  onSubmit: (data: SkillPayload) => Promise<void>
  submitLabel: string
}

export default function SkillForm({ onSubmit, submitLabel }: SkillFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setIconPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function addTag() {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags((ts) => [...ts, t])
    setTagInput("")
  }

  function removeTag(i: number) {
    setTags((ts) => ts.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || tags.length === 0 || !file) {
      toast.error("All fields + icon + ≥1 tag required")
      return
    }

    setBusy(true)

    try {
      const fd = new FormData()
      fd.append("files", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      })
      const body = await res.json()
      if (!res.ok || !body.urls?.[0]) {
        throw new Error(body.message || "Icon upload failed")
      }

      const iconUrl = body.urls[0]

      await onSubmit({ title, description, tags, icon: iconUrl })

      toast.success("Skill created")
      setTitle("")
      setDescription("")
      setTags([])
      setTagInput("")
      setFile(null)
      setIconPreview("")
    } catch (err) {
      console.error(err)
      toast.error((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{submitLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 flex-wrap">
              {tags.map((t, i) => (
                <Badge key={i} variant="outline" className="flex items-center">
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="ml-1 text-xs"
                  >
                    <X />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="New tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button type="button" onClick={addTag}>
                Add Tag
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
            {iconPreview && (
              <img
                src={iconPreview}
                alt="Icon preview"
                className="h-8 w-8 mt-2 rounded border"
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Saving…" : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
