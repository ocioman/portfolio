"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Coffee, Radar } from "lucide-react"
import {
  SiC,
  SiCplusplus,
  SiMysql,
  SiDart,
  SiFlutter,
  SiPostgresql,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPhp,
  SiGnubash,
  SiSupabase,
  SiWireshark,
  SiMetasploit,
  SiLinux,
  SiMacos
} from "@icons-pack/react-simple-icons"

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
  "C++": { icon: SiCplusplus, color: "#5A9FD4" },
  "Java": { icon: Coffee, color: "#f89820" },
  "MySQL": { icon: SiMysql, color: "#F29111" },
  "Dart": { icon: SiDart, color: "#00B4AB" },
  "Flutter": { icon: SiFlutter, color: "#42A5F5" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss, color: "#1572B6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "Bash": { icon: SiGnubash, color: "#4EAA25" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Wireshark": { icon: SiWireshark, color: "#1679A7" },
  "Nmap": { icon: Radar, color: "#1679A7" },
  "Metasploit": { icon: SiMetasploit, color: "#E12828" },
}

const skillCategories = [
  {
    level: "Avanzato",
    color: "text-foreground",
    borderColor: "border-zinc-200 dark:border-zinc-700",
    skills: ["C", "C++", "Java", "MySQL"],
  },
  {
    level: "Intermedio",
    color: "text-foreground",
    borderColor: "border-zinc-200 dark:border-zinc-700",
    skills: ["Dart", "Flutter", "PostgreSQL", "HTML", "CSS", "JavaScript", "Supabase", "PHP"],
  },
  {
    level: "Base",
    color: "text-foreground",
    borderColor: "border-zinc-200 dark:border-zinc-700",
    skills: ["Bash", "Wireshark", "Nmap", "Metasploit"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Competenze Tecniche
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un panorama delle tecnologie e degli strumenti che utilizzo nello sviluppo software
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.level} variants={itemVariants}>
              <Card className={`h-full bg-white dark:bg-zinc-900/50 ${category.borderColor} border`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">
                    {category.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => {
                      const iconData = languageIcons[skill] || languageIcons["C"]
                      const IconComponent = iconData.icon
                      
                      return (
                        <div
                          key={skill}
                          className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group"
                          title={skill}
                        >
                          <IconComponent 
                            className="w-8 h-8" 
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
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-foreground">
                Sistemi Operativi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  Windows
                </span>
                <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  Debian Linux
                </span>
                <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  macOS
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
