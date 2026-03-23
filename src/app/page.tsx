import { Header } from "@/components/header"
import { BentoGrid } from "@/components/bento-grid"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="py-20 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <BentoGrid />
        </div>
      </section>

      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <Footer />
    </main>
  )
}
