"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Mail, Code, Phone, ExternalLink, FileText, Download } from "lucide-react"
import { SpecularButton } from "./specular-button"

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12"
        >
          {/* GitHub */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-5 xl:p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">GitHub</h3>
              <p className="text-muted-foreground text-sm mb-3">@ocioman</p>
              <SpecularButton asChild className="h-9 px-3 text-xs">
                <a
                  href="https://github.com/ocioman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Visita profilo
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </SpecularButton>
            </CardContent>
          </Card>

          {/* LeetCode */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-5 xl:p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Code className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">LeetCode</h3>
              <p className="text-muted-foreground text-sm mb-3">@ocioman</p>
              <SpecularButton asChild className="h-9 px-3 text-xs">
                <a
                  href="https://leetcode.com/u/ocioman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Vedi soluzioni
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </SpecularButton>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-5 xl:p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">Email</h3>
              <p className="text-muted-foreground text-sm mb-3 truncate max-w-full" title="info@lorenzoandreotta.dev">info@lorenzoandreotta.dev</p>
              <SpecularButton asChild className="h-9 px-3 text-xs">
                <a href="mailto:info@lorenzoandreotta.dev" className="flex items-center">
                  Invia email
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </SpecularButton>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-5 xl:p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">Telefono</h3>
              <p className="text-muted-foreground text-sm mb-3">+39 3927715488</p>
              <SpecularButton asChild className="h-9 px-3 text-xs">
                <a href="tel:+393927715488" className="flex items-center">
                  Chiama ora
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </SpecularButton>
            </CardContent>
          </Card>

          {/* CV */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors sm:col-span-2 lg:col-span-1 sm:max-w-xs sm:mx-auto sm:w-full lg:max-w-none">
            <CardContent className="flex flex-col items-center justify-center p-5 xl:p-6">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <FileText className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold mb-1">Curriculum Vitae</h3>
              <p className="text-muted-foreground text-sm mb-3">Scarica il mio CV</p>
              <div className="flex items-center gap-2">
                <SpecularButton asChild className="h-9 px-3 text-xs">
                  <a
                    href="/cv/cv_et_studiorum_andreotta.pdf"
                    download="cv_et_studiorum_andreotta.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    IT
                    <Download className="w-3.5 h-3.5 ml-1" />
                  </a>
                </SpecularButton>
                <SpecularButton asChild className="h-9 px-3 text-xs">
                  <a
                    href="/cv/cv_et_studiorum_andreotta_en.pdf"
                    download="cv_et_studiorum_andreotta_en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    EN
                    <Download className="w-3.5 h-3.5 ml-1" />
                  </a>
                </SpecularButton>
              </div>
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
