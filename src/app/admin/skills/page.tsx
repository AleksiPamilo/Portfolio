"use client"

import { useState, useEffect } from "react"
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
import { toast } from "sonner"
import { X } from "lucide-react"
import type { Skill } from "@/types/skills"

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [iconUrl, setIconUrl] = useState("")
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        fetch("/api/admin/skills")
            .then((r) => r.json())
            .then(setSkills)
            .catch(console.error)
    }, [])

    function addTag() {
        const t = tagInput.trim()
        if (t && !tags.includes(t)) setTags((ts) => [...ts, t])
        setTagInput("")
    }

    function removeTag(i: number) {
        setTags((ts) => ts.filter((_, idx) => idx !== i))
    }

    async function handleUploadIcon() {
        if (!file) return toast.error("Please select a file first")
        setBusy(true)
        try {
            const fd = new FormData()
            fd.append("files", file)
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            const body = await res.json()
            if (!res.ok) throw new Error(body.message || "Upload failed")
            setIconUrl(body.urls[0])
            toast.success("Icon uploaded!")
        } catch (e) {
            console.error(e)
            toast.error((e as Error).message)
        } finally {
            setBusy(false)
        }
    }

    async function handleCreate() {
        if (!title.trim() || !description.trim() || tags.length === 0 || !iconUrl) {
            return toast.error("All fields + icon + ≥1 tag required")
        }

        console.log(iconUrl)
        setBusy(true)
        try {
            const res = await fetch("/api/admin/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, tags, icon: iconUrl }),
            })
            const body = await res.json()
            if (res.ok) {
                setSkills((s) => [...s, body])
                setTitle("")
                setDescription("")
                setTags([])
                setIconUrl("")
                setFile(null)
                toast.success("Skill added")
            } else {
                toast.error(body.error)
            }
        } catch (e) {
            console.error(e)
            toast.error((e as Error).message)
        } finally {
            setBusy(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this skill?")) return
        const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
        if (res.ok) {
            setSkills((s) => s.filter((sk) => sk.id !== id))
            toast.success("Deleted")
        } else {
            const body = await res.json().catch(() => ({}))
            toast.error(body.error || "Failed")
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-8 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add a New Skill</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="tags">Tags (e.g. “Websites”)</Label>
                        <div className="flex gap-2 flex-wrap">
                            {Array.isArray(tags) && tags.length > 0 && tags.map((t, i) => (
                                <Badge key={i} variant="outline" className="flex items-center">
                                    {t}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(i)}
                                        className="ml-1 text-xs"
                                    >
                                        &times;
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
                            <Button onClick={addTag}>Add Tag</Button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="icon">Icon (SVG/PNG)</Label>
                        <input
                            id="icon"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUploadIcon}
                            disabled={busy || !file}
                        >
                            Upload Icon
                        </Button>
                        {iconUrl && (
                            <img
                                src={iconUrl}
                                alt="Icon preview"
                                className="h-8 w-8 mt-2 rounded"
                            />
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreate} disabled={busy}>
                        {busy ? "Saving…" : "Create Skill"}
                    </Button>
                </CardFooter>
            </Card>

            <div className="space-y-2">
                {Array.isArray(skills) && skills.length > 0 && skills.map((sk) => (
                    <Card key={sk.id}>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={sk.icon}
                                    alt={`${sk.title} icon`}
                                    className="h-6 w-6 rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{sk.title}</h3>
                                    <p className="text-sm">{sk.description}</p>
                                    <div className="flex gap-1 mt-1">
                                        {sk.tags.map((t) => (
                                            <Badge key={t} variant="outline">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(sk.id)}
                            >
                                <X />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
