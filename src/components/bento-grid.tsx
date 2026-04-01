"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export function BentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card className="h-full bg-gradient-to-br from-zinc-200 to-zinc-300 border-zinc-300 dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-700">
          <CardContent className="flex flex-col justify-center h-full p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Lorenzo Andreotta
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Software Developer
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="h-full bg-zinc-100 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700">
          <CardContent className="flex flex-col justify-center h-full p-6">
            <Quote className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm text-foreground italic leading-relaxed">
              "Ho iniziato a programmare per risolvere i miei problemi. Ora lo faccio anche per quelli degli altri."
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-3">
        <Card className="h-full bg-zinc-100 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700">
          <CardContent className="flex items-center justify-center gap-3 h-full p-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Posizione attuale</p>
              <p className="text-lg font-semibold text-foreground">Studente @ Università Ca' Foscari</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
