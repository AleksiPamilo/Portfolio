"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (res?.error) {
            setError("Invalid credentials")
        } else {
            router.push("/admin/projects")
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-screen h-screen flex items-center justify-center">
            <div className="w-md space-y-2 p-6">
                {error && <p className="text-red-600">{error}</p>}
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">Sign In</Button>
            </div>
        </form>
    )
}
