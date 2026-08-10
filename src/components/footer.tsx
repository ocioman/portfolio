"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Mail, Code, Phone, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isPrivacyPolicy = pathname === "/privacy-policy"
  // /csvjsonize shows the privacy link (same as home)

  return (
    <footer id="contact" className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contatti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Sono sempre interessato a nuove opportunità e collaborazioni
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
        >
          {/* GitHub */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">GitHub</h3>
              <p className="text-muted-foreground text-sm mb-3">@ocioman</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-zinc-300 dark:border-zinc-700 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <a
                  href="https://github.com/ocioman"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visita profilo
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* LeetCode */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Code className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">LeetCode</h3>
              <p className="text-muted-foreground text-sm mb-3">@ocioman</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-zinc-300 dark:border-zinc-700 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <a
                  href="https://leetcode.com/u/ocioman/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vedi soluzioni
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">Email</h3>
              <p className="text-muted-foreground text-sm mb-3">info@lorenzoandreotta.dev</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-zinc-300 dark:border-zinc-700 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <a href="mailto:info@lorenzoandreotta.dev">
                  Invia email
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">Telefono</h3>
              <p className="text-muted-foreground text-sm mb-3">+39 3927715488</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-zinc-300 dark:border-zinc-700 text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <a href="tel:+393927715488">
                  Chiama ora
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Lorenzo Andreotta. Tutti i diritti riservati.
              {!isPrivacyPolicy && (
                <>
                  {" "} -{" "}
                  <Link href="/privacy-policy" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
