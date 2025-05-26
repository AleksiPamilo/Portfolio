export interface Project {
    id: string
    title: string
    slug: string
    description: string
    images: string[]
    tech: string[]
    url?: string
    repo?: string
    repoUrl?: string
    startDate: string
    endDate?: string
    createdAt: string
}

export type ProjectPayload = {
    title: string
    slug: string
    description: string
    images: string[]
    tech: string[]
    url?: string
    repo?: string | null
    startDate: string
    endDate?: string
}