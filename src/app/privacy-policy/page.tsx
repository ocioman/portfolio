"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Shield, HardDrive, Globe, Cookie, UserCheck, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container max-w-4xl mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Torna alla Home
          </Link>

          <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase block mb-2">
            Informativa sul trattamento dei dati personali
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text bg-gradient-to-r from-foreground to-zinc-500 dark:to-zinc-400 mb-4">
            Privacy Policy
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* 1. Informazioni generali */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-zinc-900 border-transparent dark:border-transparent shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      1. Informazioni generali
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Il presente sito web è gestito da <strong>Andreotta Lorenzo</strong>, in qualità di Titolare del Trattamento. La protezione dei tuoi dati è una priorità: questo sito è progettato per ridurre al minimo la raccolta di informazioni personali.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Dati raccolti (Log di sistema) */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-zinc-900 border-transparent dark:border-transparent shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shrink-0">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      2. Dati raccolti (Log di sistema)
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Sebbene questo sito non utilizzi cookie di tracciamento o servizi di terze parti (come Google Analytics o font esterni), la navigazione comporta l'invio automatico di alcuni dati tecnici necessari al funzionamento della rete.
                    </p>
                    <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-xl p-4 md:p-5 border border-zinc-150 dark:border-zinc-800/80 space-y-3">
                      <div>
                        <span className="font-semibold text-foreground text-sm block mb-1">Tipologia di dati:</span>
                        <span className="text-muted-foreground text-sm">Indirizzo IP, tipo di browser, data e ora dell'accesso.</span>
                      </div>
                      <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-2">
                        <span className="font-semibold text-foreground text-sm block mb-1">Finalità:</span>
                        <span className="text-muted-foreground text-sm">Questi dati vengono elaborati esclusivamente per garantire la sicurezza del sito (es. prevenzione di attacchi informatici) e per finalità tecniche di corretta erogazione dei contenuti.</span>
                      </div>
                      <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-2">
                        <span className="font-semibold text-foreground text-sm block mb-1">Base giuridica:</span>
                        <span className="text-muted-foreground text-sm">Il trattamento si basa sul Legittimo Interesse del titolare a mantenere il sito sicuro e funzionante (Art. 6.1.f del GDPR).</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Hosting e Trasferimento Dati */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-zinc-900 border-transparent dark:border-transparent shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      3. Hosting e Trasferimento Dati
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Il sito è ospitato sulla piattaforma <strong>Vercel (Vercel Inc.)</strong>. I dati tecnici di navigazione potrebbero transitare su server situati al di fuori dello Spazio Economico Europeo, ma sono protetti secondo gli standard previsti dal GDPR attraverso gli accordi sul trattamento dati (DPA) sottoscritti dal fornitore.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. Cookie e Tracciamento */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-zinc-900 border-transparent dark:border-transparent shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shrink-0">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      4. Cookie e Tracciamento
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Questo sito non utilizza cookie.
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-4">
                      <li>Nessun cookie di profilazione.</li>
                      <li>Nessun cookie statistico di terze parti.</li>
                      <li>Nessun cookie tecnico (poiché non sono necessarie sessioni o salvataggio di preferenze).</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed bg-zinc-50 dark:bg-zinc-950/50 rounded-xl p-4 border border-zinc-150 dark:border-zinc-800/80 text-sm italic">
                      Dato che non viene effettuato alcun tracciamento o salvataggio di cookie, non è necessaria l'esposizione di un banner del consenso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 5. Diritti dell'interessato */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-zinc-900 border-transparent dark:border-transparent shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      5. Diritti dell'interessato
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      In quanto utente, hai il diritto di richiedere l'accesso ai tuoi dati, la loro rettifica o cancellazione, nei limiti previsti dalla legge.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50 shrink-0">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-sm">Contatto Titolare:</span>
                      </div>
                      <a
                        href="mailto:info@lorenzoandreotta.dev"
                        className="text-sm text-foreground hover:underline font-medium transition-colors"
                      >
                        info@lorenzoandreotta.dev
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
