import MainSection from "@/components/sections/Main"
import ProjectSection from "@/components/sections/Projects"
import SkillsSection from "@/components/sections/Skills"

export default function HomePage() {
  return (
    <main className="relative min-h-screen py-12">
      <MainSection />
      <ProjectSection />
      <SkillsSection />
    </main>
  )
}
