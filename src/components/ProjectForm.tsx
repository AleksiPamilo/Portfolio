"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { ProjectPayload } from "@/types/project"
import { Trash, X } from "lucide-react"

export type ProjectFormProps = {
    initial?: ProjectPayload & { images: string[] }
    onSubmit: (data: ProjectPayload & { images: string[] }) => Promise<void>
    submitLabel: string
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

export default function ProjectForm({
    initial,
    onSubmit,
    submitLabel,
}: ProjectFormProps) {
    const router = useRouter()
    const [title, setTitle] = useState(initial?.title || "")
    const [slug, setSlug] = useState(initial?.slug || "")
    const [description, setDescription] = useState(initial?.description || "")
    const [techs, setTechs] = useState<string[]>(initial?.tech || [])
    const [newTech, setNewTech] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [url, setUrl] = useState(initial?.url || "")
    const [repo, setRepo] = useState(initial?.repo || "")
    const [busy, setBusy] = useState(false)

    const makeMonthValue = (iso?: string) => iso ? new Date(iso).toISOString().slice(0, 7) : ""
    const [startDate, setStartDate] = useState(() => makeMonthValue(initial?.startDate))
    const [endDate, setEndDate] = useState(() => makeMonthValue(initial?.endDate))

    const [originalImages, setOriginalImages] = useState<string[]>(() => initial?.images || [])
    const [previews, setPreviews] = useState<string[]>([])
    const [primaryIndex, setPrimaryIndex] = useState(0)

    const lastAutoSlug = useRef(slugify(initial?.title || ""))

    useEffect(() => {
        const newSlug = slugify(title)
        if (slug === lastAutoSlug.current || !slug) {
            setSlug(newSlug)
            lastAutoSlug.current = newSlug
        }
    }, [title, slug])

    useEffect(() => {
        const urls = files.map((f) => URL.createObjectURL(f))
        setPreviews(urls)
        return () => urls.forEach((u) => URL.revokeObjectURL(u))
    }, [files])

    function handleTechKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && newTech.trim()) {
            e.preventDefault()

            const candidate = newTech.trim()
            if (!techs.includes(candidate)) {
                setTechs((t) => [...t, candidate])
            }

            setNewTech("")
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setBusy(true)

        const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/i
        const repoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/

        if (url && !urlPattern.test(url)) {
            toast.error("Live URL must start with http:// or https://")
            setBusy(false)
            return
        }
        if (repo && !repoPattern.test(repo)) {
            toast.error("Repo must be in the form user/repo")
            setBusy(false)
            return
        }

        try {
            let imageUrls = [...(initial?.images || [])]

            if (files.length) {
                const fd = new FormData()
                files.forEach((f) => fd.append("files", f))
                const r = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: fd,
                })
                const body = await r.json()
                if (!r.ok) throw new Error(body.message || "Upload failed")
                imageUrls = imageUrls.concat(body.urls)
            }

            if (primaryIndex > 0 && primaryIndex < imageUrls.length) {
                const [picked] = imageUrls.splice(primaryIndex, 1)
                imageUrls.unshift(picked)
            }

            await onSubmit({
                title,
                slug,
                description,
                images: imageUrls,
                url: url || undefined,
                repo: repo.trim() !== "" ? repo : null,
                tech: techs,
                startDate,
                endDate: endDate || undefined,
            })

            toast.success(`${submitLabel} successful!`)
            router.push("/admin/projects")
        } catch (err) {
            console.error(err)
            toast.error((err as Error).message)
        } finally {
            setBusy(false)
        }
    }

    async function handleDeleteImage(src: string) {
        const filename = src.split("/").pop()!
        console.log("filename===", filename)
        try {
            const res = await fetch(`/api/admin/upload?filename=${filename}`, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("Delete failed")
            setOriginalImages((imgs) => imgs.filter((u) => u !== src))
            setPreviews((imgs) => imgs.filter((u) => u !== src))
            toast.success("Image deleted")
        } catch (err) {
            console.error(err)
            toast.error((err as Error).message)
        }
    }

    const combined = [...originalImages, ...previews]

    return (
        <div className="w-3/5 flex flex-col items-center justify-center space-y-4 p-4">
            <div className="mx-auto w-3/5">
                <Button
                    variant="outline"
                    onClick={() => router.push("/admin/projects")}
                >
                    Back to projects
                </Button>
            </div>
            <Card className="mx-auto w-3/5">
                <CardHeader>
                    <CardTitle>{submitLabel}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="auto-generated from title"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                maxLength={191}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <p className="text-right text-sm text-muted-foreground">
                                {description.length}/191
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="tech">Technologies</Label>
                            <div className="flex gap-2 flex-wrap mb-2">
                                {techs.map((t, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center space-x-1 border text-sm px-2 py-1 rounded"
                                    >
                                        <span>{t}</span>
                                        <button
                                            type="button"
                                            onClick={() => setTechs((ts) => ts.filter((_, idx) => idx !== i))}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            <X />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    id="tech"
                                    value={newTech}
                                    onKeyDown={handleTechKey}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    placeholder="Add technology and press Enter"
                                />
                                <Button
                                    type="button"
                                    onClick={() => {
                                        const candidate = newTech.trim()
                                        if (candidate && !techs.includes(candidate)) {
                                            setTechs((t) => [...t, candidate])
                                        }
                                        setNewTech("")
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {combined.length > 0 && (
                            <div className="space-y-1.5">
                                <Label>Choose primary image</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {combined.map((src, i) => (
                                        <div key={src} className="relative">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(src)}
                                                className="absolute top-1 right-1 z-10 bg-white p-1 rounded-full shadow hover:cursor-pointer hover:scale-125"
                                                aria-label="Delete image"
                                            >
                                                <Trash className="h-4 w-4 text-red-600" />
                                            </button>

                                            <label className="block cursor-pointer">
                                                <img
                                                    src={src}
                                                    alt={`Preview ${i + 1}`}
                                                    className={`rounded-md border-2 ${primaryIndex === i ? "border-blue-600" : "border-transparent"
                                                        }`}
                                                />
                                                <input
                                                    type="radio"
                                                    name="primary"
                                                    checked={primaryIndex === i}
                                                    onChange={() => setPrimaryIndex(i)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="images">Upload images</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setFiles(
                                        e.target.files ? Array.from(e.target.files) : []
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="startDate">Start</Label>
                            <Input
                                id="startDate"
                                type="month"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="endDate">
                                End (leave blank if ongoing)
                            </Label>
                            <Input
                                id="endDate"
                                type="month"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="url">Live URL (optional)</Label>
                            <Input
                                id="url"
                                value={url}
                                pattern="https?://[^\s$.?#].[^\s]*"
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="repo">Repo URL (optional)</Label>
                            <Input
                                id="repo"
                                value={repo}
                                pattern="[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+"
                                placeholder="user/repo"
                                onChange={(e) => setRepo(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={busy}
                            className="w-full"
                        >
                            {busy ? "Saving…" : submitLabel}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
