"use client"

import { useEffect, useState } from "react"
import ProjectCard from "../ProjectCard"
import Link from "next/link"
import { Button } from "../ui/button"
import type { Project } from "@/types/project"

export default function ProjectSection() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        fetch("/api/projects?limit=5")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch(console.error)
    }, [])

    return (
        <section id="projects" className="max-w-3xl mx-auto py-12">
            <div className="relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-gray-300">
                {projects.map((project, idx) => {
                    const isEven = idx % 2 === 0
                    return (
                        <div
                            key={project.id}
                            className={`mb-12 flex w-full ${isEven ? "justify-start" : "justify-end"
                                }`}
                        >
                            <div className="w-full md:w-1/2 relative">
                                <ProjectCard project={project} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="text-center mt-8 space-x-4">
                <Link href="/projects">
                    <Button>View All Projects</Button>
                </Link>
                <Link href="https://github.com/aleksipamilo" target="_blank">
                    <Button variant="secondary">View GitHub</Button>
                </Link>
            </div>
        </section>
    )
}