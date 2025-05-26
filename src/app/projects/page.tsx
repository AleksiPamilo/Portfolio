import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Project } from "@/types/project"
import ProjectCard from "@/components/ProjectCard"

export const metadata: Metadata = { title: "All Projects" }

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { startDate: "desc" },
    })
    if (!projects.length) notFound()

    return (
        <main className="md:w-4/5 mx-auto py-12 px-4">
            <nav className="text-sm mb-6 text-muted-foreground">
                <Link href="/">Home</Link> / <span>Projects</span>
            </nav>

            <h1 className="text-3xl font-bold mb-8">All Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project as unknown as Project}
                    />
                ))}
            </div>
        </main>
    )
}