"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const clients = [
  {
    name: "Renton Fitness",
    logo: "/assets/Renton_Rehab_logo.svg",
    url: "https://rentonfitness.it",
  },
]

export function ClientsSection() {
  return (
    <section id="clients" className="py-20 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Chi mi ha già scelto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aziende e professionisti che hanno scelto di collaborare con me
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex flex-col items-center justify-center bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-10 py-8 w-72 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-500 transition-all duration-300">

                <div className="w-full flex items-center justify-center mb-4">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={220}
                    height={80}
                    className="object-contain"
                    style={{ filter: "none" }}
                  />
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 dark:text-[#d4d4d8] group-hover:underline">
                  {client.url.replace("https://", "")}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
