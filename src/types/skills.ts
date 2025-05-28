export interface Skill {
    id: string
    title: string
    description: string
    icon: string
    tags: string[]
    createdAt: Date
}

export type SkillPayload = {
  title: string
  description: string
  tags: string[]
  icon: string
}