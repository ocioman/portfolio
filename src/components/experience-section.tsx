"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  ShieldCheck
} from "lucide-react"

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

const experiences = [
  {
    title: "Web Developer",
    company: "Freelance",
    location: "Treviso, Italia",
    period: "Marzo 2026 – Oggi",
    icon: Briefcase,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-400/10",
    description: "Sviluppo di siti e applicativi web per le imprese",
    achievements: [],
  },
  {
    title: "Tecnico della Sicurezza IT (Erasmus+)",
    company: "IT Encore",
    location: "Madrid, Spagna",
    period: "Maggio 2024 – Giugno 2024",
    icon: ShieldCheck,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-400/10",
    description: "Esperienza formativa e professionale all'estero focalizzata sulle competenze IT",
    achievements: [
      "Ricerca, documentazione e risoluzione di vulnerabilità all'interno della rete aziendale",
      "Configurazione e gestione di macchine virtuali",
      "Implementazione e manutenzione di servizi di rete critici: NAT, VPN e Server Proxy",
    ],
  },
]

const education = [
  {
    title: "Laurea Triennale in Informatica (L-31)",
    institution: "Università Ca' Foscari",
    location: "Mestre (VE)",
    period: "Settembre 2025 – In corso",
    icon: GraduationCap,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-400/10",
    description: "Percorso di studi in Scienze e Tecnologie dell'Informazione",
  },
  {
    title: "Diploma di Perito Informatico",
    institution: "ITIS Max Planck",
    location: "Lancenigo di Villorba (TV)",
    period: "Settembre 2019 – Luglio 2025",
    icon: GraduationCap,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-400/10",
    description: "Istituto Tecnico Industriale Statale",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 md:px-6 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Esperienza & Formazione
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Il mio percorso professionale e accademico
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 relative"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-muted-foreground" />
            Esperienza Professionale
          </h3>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-zinc-400 dark:bg-zinc-500 transform -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                className="relative mb-8 w-full pl-12 md:pl-16"
              >

                {index === 0 ? (
                  <motion.div
                    className="absolute top-6 w-4 h-4 rounded-full bg-emerald-400 dark:bg-emerald-500 border-2 border-white dark:border-emerald-300 z-10 left-4 md:left-8 transform -translate-x-1/2"
                    animate={{
                      boxShadow: [
                        "0 0 0px 0px rgba(52, 211, 153, 0)",
                        "0 0 8px 4px rgba(52, 211, 153, 0.6)",
                        "0 0 0px 0px rgba(52, 211, 153, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ) : (
                  <div className="absolute top-6 w-4 h-4 rounded-full bg-zinc-400 dark:bg-zinc-600 border-2 border-white dark:border-zinc-500 z-10 left-4 md:left-8 transform -translate-x-1/2" />
                )}

                <Card className={`bg-white dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700 shadow-sm dark:shadow-none`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${exp.bgColor} flex-shrink-0`}>
                        <exp.icon className={`w-6 h-6 ${exp.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{exp.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {exp.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="border-zinc-300 dark:border-zinc-700 text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.period}
                      </Badge>
                      <Badge variant="outline" className="border-zinc-300 dark:border-zinc-700 text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {exp.location}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-foreground text-sm flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-muted-foreground" />
            Formazione
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <motion.div key={edu.title} variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700 shadow-sm dark:shadow-none">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${edu.bgColor}`}>
                        <edu.icon className={`w-6 h-6 ${edu.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{edu.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {edu.institution} • {edu.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="border-zinc-300 dark:border-zinc-700 text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {edu.period}
                    </Badge>
                    <p className="text-muted-foreground text-sm mt-3">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
