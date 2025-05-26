"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Project } from "@/types/project"
import { formatDuration } from "@/lib/formatDate"

type Props = { project: Project }

export default function ProjectCard({ project }: Props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Card className="mx-4">
            <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {formatDuration(project.startDate, project.endDate)}
                </p>
            </CardHeader>
            <CardContent className="space-y-3">
                <p>{project.description}</p>

                {project.images[0] && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className="mt-2 w-full h-48 overflow-hidden cursor-pointer">
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="object-cover rounded-md w-full h-full hover:cursor-zoom-in"
                                />
                            </div>
                        </DialogTrigger>

                        <DialogTitle className="sr-only">Image View</DialogTitle>
                        <DialogContent className="min-w-screen h-screen fixed flex items-center justify-center" noCloseIcon>
                            <DialogClose asChild className="cursor-zoom-out">
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="object-contain w-full h-full rounded-md"
                                />
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                )
                }
            </CardContent >
            <CardFooter className="flex justify-end">
                <Button
                    variant="ghost"
                    onClick={() => router.push(`/projects/${project.slug}`)}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card >
    )
}
