"use client"

import { Github, Linkedin, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function CornerActions() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <footer className="fixed bottom-4 right-4 flex space-x-4 z-50">
            <Link href="https://github.com/aleksipamilo" target="_blank">
                <Github className="h-6 w-6 hover:text-green-400" />
            </Link>
            <Link href="https://linkedin.com/in/aleksipamilo" target="_blank">
                <Linkedin className="h-6 w-6 hover:text-green-400" />
            </Link>
            <button className="hover:cursor-pointer" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>
        </footer>
    )
}