"use client"

import { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export default function ContactDialog() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState("")

    function validateFields() {
        const errors: { [key: string]: string } = {}
        if (name.trim().length < 2) errors.name = "Name must be at least 2 characters"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) errors.email = "Please enter a valid email"
        if (title.trim().length < 5) errors.title = "Title must be at least 5 characters"
        if (message.trim().length < 10) errors.message = "Message must be at least 10 characters"
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSubmitError("")
        setSubmitSuccess("")

        if (!validateFields()) return

        setLoading(true)
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, title, message }),
            })

            if (!response.ok) {
                const err = await response.json().catch(() => null)
                throw new Error(err?.error || "Network response was not ok")
            }

            setSubmitSuccess("Message sent successfully!")
            setName("")
            setEmail("")
            setTitle("")
            setMessage("")
            setFieldErrors({})
        } catch (error) {
            setSubmitError((error as Error).message || "Failed to send message. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="max-md:w-full">Contact Me</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contact Me</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            maxLength={50}
                            onChange={(e) => {
                                setName(e.target.value)
                                setFieldErrors((fe) => ({ ...fe, name: "" }))
                            }}
                        />
                        {fieldErrors.name && (
                            <p className="text-sm text-destructive">{fieldErrors.name}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            maxLength={100}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setFieldErrors((fe) => ({ ...fe, email: "" }))
                            }}
                        />
                        {fieldErrors.email && (
                            <p className="text-sm text-destructive">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            maxLength={100}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setFieldErrors((fe) => ({ ...fe, title: "" }))
                            }}
                        />
                        {fieldErrors.title && (
                            <p className="text-sm text-destructive">{fieldErrors.title}</p>
                        )}
                    </div>

                    <div className="space-y-1.5 w-full">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            value={message}
                            maxLength={1000}
                            className="w-full resize-y break-words break-all whitespace-normal"
                            onChange={(e) => {
                                setMessage(e.target.value)
                                setFieldErrors((fe) => ({ ...fe, message: "" }))
                            }}
                            rows={4}
                        />
                        {fieldErrors.message && (
                            <p className="text-sm text-destructive">{fieldErrors.message}</p>
                        )}
                    </div>

                    {submitError && (
                        <p className="text-sm text-destructive">{submitError}</p>
                    )}
                    {submitSuccess && (
                        <p className="text-sm text-success">{submitSuccess}</p>
                    )}

                    <DialogFooter>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex gap-2 text-muted-foreground">
                                <Link href="https://github.com/aleksipamilo" target="_blank">
                                    <Github className="h-6 w-6 hover:text-green-400" />
                                </Link>
                                <Link href="https://linkedin.com/in/aleksipamilo" target="_blank">
                                    <Linkedin className="h-6 w-6 hover:text-green-400" />
                                </Link>
                            </div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
