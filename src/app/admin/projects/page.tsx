"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Trash2, Edit, Plus } from "lucide-react"
import type { Project } from "@/types/project"

export default function AdminProjectsPage() {
    const { data: session } = useSession()
    const router = useRouter()

    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        async function load() {
            setLoading(true)
            try {
                const res = await fetch("/api/admin/projects")
                const body = await res.json()
                if (res.ok) {
                    setProjects(body.projects)
                } else {
                    console.error(body.error)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    async function handleDelete(id: string) {
        setBusy(true)
        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
            if (res.ok) {
                setProjects((ps) => ps.filter((p) => p.id !== id))
            } else {
                const body = await res.json()
                console.error(body.error)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setBusy(false)
            setDeletingId(null)
        }
    }

    if (!session) return null

    return (
        <div className="p-8 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.push("/admin/projects/new")}>
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Button>
                    <Button variant="outline" onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
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
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((proj) => (
                            <TableRow key={proj.id}>
                                <TableCell>{proj.title}</TableCell>
                                <TableCell>{proj.slug}</TableCell>
                                <TableCell>
                                    {new Date(proj.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            router.push(`/admin/projects/${proj.id}`)
                                        }
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Dialog
                                        open={deletingId === proj.id}
                                        onOpenChange={(open) => !open && setDeletingId(null)}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setDeletingId(proj.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                            <p className="mt-2">
                                                Are you sure you want to delete “{proj.title}”?
                                            </p>
                                            <DialogFooter className="mt-4 flex justify-end space-x-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setDeletingId(null)}
                                                    disabled={busy}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleDelete(proj.id)}
                                                    disabled={busy}
                                                >
                                                    {busy ? "Deleting…" : "Delete"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
