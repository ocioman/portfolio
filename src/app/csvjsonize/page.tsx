"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { ArrowLeft, Upload, Download, Copy, Check, AlertCircle, FileJson, FileText, Zap, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    Go: new () => {
      importObject: WebAssembly.Imports
      run: (instance: WebAssembly.Instance) => Promise<void>
    }
    goSerialize: (csv: string) => { result?: string; error?: string }
    goDeserialize: (json: string) => { result?: string; error?: string }
  }
}

type ConversionType = "csv-to-json" | "json-to-csv" | null

interface ConversionResult {
  output: string
  error: string | null
  executionMs: number
}

export default function CsvJsonizePage() {
  const [wasmReady, setWasmReady] = useState(false)
  const [wasmError, setWasmError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [conversionType, setConversionType] = useState<ConversionType>(null)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLTextAreaElement>(null)

  // Load WASM
  useEffect(() => {
    async function loadWasm() {
      try {
        // Load wasm_exec.js
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script")
          script.src = "/wasm/wasm_exec.js"
          script.onload = () => resolve()
          script.onerror = () => reject(new Error("Failed to load wasm_exec.js"))
          document.head.appendChild(script)
        })

        const go = new window.Go()
        const response = await fetch("/wasm/converter.wasm")
        const buffer = await response.arrayBuffer()
        const { instance } = await WebAssembly.instantiate(buffer, go.importObject)
        go.run(instance) // non-blocking
        setWasmReady(true)
      } catch (err) {
        setWasmError(err instanceof Error ? err.message : "Errore nel caricamento del WASM")
      }
    }
    loadWasm()
  }, [])

  const detectFileType = (name: string, content: string): ConversionType => {
    const ext = name.split(".").pop()?.toLowerCase()
    if (ext === "csv") return "csv-to-json"
    if (ext === "json") return "json-to-csv"
    // Fallback: try to detect by content
    const trimmed = content.trimStart()
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) return "json-to-csv"
    return "csv-to-json"
  }

  const handleFile = useCallback((file: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setFileContent(content)
      setFileName(file.name)
      setConversionType(detectFileType(file.name, content))
      setResult(null)
    }
    reader.readAsText(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleConvert = () => {
    if (!fileContent || !conversionType || !wasmReady) return
    setIsConverting(true)

    // Use setTimeout to allow the UI to update before blocking WASM call
    setTimeout(() => {
      const start = performance.now()
      let res: { result?: string; error?: string }

      try {
        if (conversionType === "csv-to-json") {
          res = window.goSerialize(fileContent)
        } else {
          res = window.goDeserialize(fileContent)
        }
      } catch (err) {
        res = { error: err instanceof Error ? err.message : "Errore sconosciuto" }
      }

      const end = performance.now()
      setResult({
        output: res.result ?? "",
        error: res.error ?? null,
        executionMs: Math.round((end - start) * 100) / 100,
      })
      setIsConverting(false)
    }, 50)
  }

  const handleCopy = async () => {
    if (!result?.output) return
    await navigator.clipboard.writeText(result.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!result?.output) return
    const ext = conversionType === "csv-to-json" ? "json" : "csv"
    const mimeType = conversionType === "csv-to-json" ? "application/json" : "text/csv"
    const baseName = fileName ? fileName.replace(/\.[^.]+$/, "") : "output"
    const blob = new Blob([result.output], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${baseName}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setFileName(null)
    setFileContent(null)
    setConversionType(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const conversionLabel =
    conversionType === "csv-to-json"
      ? { from: "CSV", to: "JSON", fromColor: "text-foreground", toColor: "text-foreground" }
      : conversionType === "json-to-csv"
        ? { from: "JSON", to: "CSV", fromColor: "text-foreground", toColor: "text-foreground" }
        : null

  return (
    <main className="min-h-screen bg-background">
      <section className="container max-w-4xl mx-auto px-4 pt-16 pb-48 md:pt-24 md:pb-64">
        {/* Back button + Header */}
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
            Demo interattiva
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            csvJSONize
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Converti i tuoi file CSV ↔ JSON direttamente nel browser, senza server. Il codice Go viene
            eseguito come{" "}
            <span className="font-semibold text-foreground">WebAssembly: </span> zero upload, zero latenza di rete.
          </p>
        </motion.div>



        {/* Upload area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 p-12
              ${isDragging
                ? "border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 scale-[1.01]"
                : fileContent
                  ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />

            <AnimatePresence mode="wait">
              {fileContent ? (
                <motion.div
                  key="file-loaded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                    {conversionType === "json-to-csv" ? (
                      <FileJson className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <FileText className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{fileName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {fileContent.length.toLocaleString()} caratteri · clicca per cambiare file
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                    <Upload className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Trascina qui il tuo file o clicca per selezionarlo
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Supporta file <strong>.csv</strong> e <strong>.json</strong></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Conversion type indicator + convert button */}
        <AnimatePresence>
          {fileContent && conversionLabel && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              {/* Conversion badge */}
              <Card className="flex-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                <CardContent className="flex items-center justify-center gap-3 py-4 px-6">
                  <span className={`text-lg font-bold ${conversionLabel.fromColor}`}>
                    {conversionLabel.from}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-xl">→</span>
                  <span className={`text-lg font-bold ${conversionLabel.toColor}`}>
                    {conversionLabel.to}
                  </span>
                </CardContent>
              </Card>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); handleReset() }}
                  className="border-zinc-300 dark:border-zinc-700 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 h-11 w-11 rounded-xl"
                  title="Ricomincia"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleConvert}
                  disabled={!wasmReady || isConverting}
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-6 h-11 font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Conversione…
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Converti
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {result.error ? (
                <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-700 dark:text-red-400 mb-1">Errore di conversione</h3>
                      <p className="text-sm text-red-600 dark:text-red-400/80 font-mono">{result.error}</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                  <CardContent className="p-0">
                    {/* Result header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">Output</span>
                        {/* Execution time badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300">
                            {result.executionMs < 1
                              ? `< 1 ms`
                              : `${result.executionMs.toLocaleString("it-IT")} ms`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopy}
                          className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                              Copiato!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1.5" />
                              Copia
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownload}
                          className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Scarica
                        </Button>
                      </div>
                    </div>

                    {/* Output textarea */}
                    <textarea
                      ref={outputRef}
                      readOnly
                      value={result.output}
                      className="w-full bg-transparent text-sm font-mono text-foreground p-5 resize-none focus:outline-none min-h-[300px] max-h-[500px] overflow-auto"
                      style={{ lineHeight: "1.6" }}
                    />

                    {/* Stats footer */}
                    <div className="px-5 py-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        {result.output.length.toLocaleString("it-IT")} caratteri
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {result.output.split("\n").length.toLocaleString("it-IT")} righe
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  )
}
