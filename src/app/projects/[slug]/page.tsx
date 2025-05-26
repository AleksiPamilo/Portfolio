import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { formatDuration } from "@/lib/formatDate"
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/ImageCarousel"
import { Project } from "@/types/project"
import Link from "next/link"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } })
    return project
        ? { title: project.title, description: project.description }
        : { title: "Project not found" }
}

export default async function ProjectPage({ params }: Params) {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
        where: { slug },
        select: {
            title: true,
            description: true,
            images: true,
            tech: true,
            url: true,
            repo: true,
            startDate: true,
            endDate: true,
        }
    }) as unknown as Project
    if (!project) notFound()

    const repoUrl = project.repo ? `https://github.com/${project.repo}` : null

    return (
        <main className="w-screen min-h-screen flex items-center justify-center">
            <div className="max-w-7xl mx-auto py-12 px-4">
                <nav className="text-sm mb-6 text-muted-foreground">
                    <Link href="/">Home</Link> /{" "}
                    <Link href="/projects">Projects</Link> /{" "}
                    <span>{project.title}</span>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-8">
                    <div className="lg:col-span-2">
                        <ImageCarousel images={(project?.images as string[]) || []} alt={project.title} />
                    </div>

                    <aside className="space-y-6">
                        <h1 className="text-3xl font-bold">{project.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            {formatDuration(
                                project.startDate,
                                project.endDate
                            )}
                        </p>
                        <p className="leading-relaxed">{project.description}</p>

                        {Array.isArray(project?.tech) && project.tech?.length > 0 && (
                            <div>
                                <h2 className="font-semibold">Technologies</h2>
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    {project.tech.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex space-x-4">
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    <Button>Live Site</Button>
                                </a>
                            )}
                            {repoUrl && (
                                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline">View Code</Button>
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}