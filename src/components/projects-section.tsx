"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Coffee } from "lucide-react"
import { SiC, SiDart, SiFlutter, SiPhp } from "@icons-pack/react-simple-icons"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const languageIcons: Record<string, { icon: React.ElementType; color: string }> = {
  "C": { icon: SiC, color: "#5A9FD4" },
  "Java": { icon: Coffee, color: "#f89820" },
  "Dart": { icon: SiDart, color: "#00B4AB" },
  "Flutter": { icon: SiFlutter, color: "#42A5F5" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
}

const projects = [
  {
    title: "unilife",
    description: "L'app che Ca' Foscari non ha mai fatto. Flutter + BaaS per voti, esami e lezioni in un unico posto.",
    technologies: ["Dart", "Flutter"],
    github: "https://github.com/ocioman/unilife",
    color: "text-cyan-500 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-400/10",
  },
  {
    title: "smartlog",
    description: "Un semplice ma efficiente logbook per tracciare le progressioni in palestra. È BaaS-free grazie al backend realizzato in PHP (w/JSON).",
    technologies: ["Dart", "Flutter", "PHP"],
    github: "https://github.com/ocioman/smartlog",
    color: "text-violet-500 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-400/10",
  },
  {
    title: "Progetto-Interdisciplinare",
    description: "Applicativo grafico per una palestra fittizzia volto al consolidamento dell'utilizzo del pattern MVC.",
    technologies: ["Java"],
    github: "https://github.com/ocioman/Progetto-Interdisciplinare",
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-400/10",
  },
  {
    title: "gioco-rpg",
    description: "Un gioco RPG cli-style sviluppato per un esame universitario.",
    technologies: ["C"],
    github: "https://github.com/ocioman/gioco-rpg",
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-400/10",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-6 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Progetti Personali
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una raccolta dei miei progetti personali e accademici
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl text-foreground group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="text-muted-foreground hover:text-foreground -mt-2 -mr-2"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  </div>
                  <CardDescription className="text-muted-foreground pt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => {
                      const iconData = languageIcons[tech] || languageIcons["C"]
                      const TechIcon = iconData.icon
                      
                      return (
                        <div
                          key={tech}
                          className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          title={tech}
                        >
                          <TechIcon 
                            className="w-6 h-6" 
                            style={{ color: iconData.color }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            asChild
            className="border-zinc-300 dark:border-zinc-700 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <a
              href="https://github.com/ocioman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Vedi tutti i progetti su GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
