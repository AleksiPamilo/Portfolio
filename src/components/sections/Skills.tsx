"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Skill } from "@/types/skills"
import { MaskedIcon } from "../MaskedIcon"

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        fetch("/api/skills")
            .then((res) => res.json())
            .then((json) => setSkills(json))
            .catch(console.error)
    }, [])

    return (
        <section className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5">
                {skills.length > 0 && skills.map(({ title, icon, description, tags }) => (
                    <Card key={title} className="gap-2">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <MaskedIcon
                                    src={icon}
                                    alt={`${title} icon`}
                                    className="h-5 w-5 rounded"
                                />

                                <CardTitle className="text-lg">{title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm leading-relaxed">{description}</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="px-2 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}