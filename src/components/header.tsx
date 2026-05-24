"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, X, AlignRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Progetti", href: "#projects" },
  { label: "Esperienza", href: "#experience" },
  { label: "Contatti", href: "#contact" },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")

  React.useEffect(() => {
    setIsMounted(true)

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const sections = navItems.map(item => document.getElementById(item.href.substring(1))).filter(Boolean)
    
    sections.forEach(sec => {
      if(sec) observer.observe(sec)
    })

    return () => {
      sections.forEach(sec => {
        if(sec) observer.unobserve(sec)
      })
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <div className="flex h-[3.25rem] w-full max-w-[54rem] items-center justify-between rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-[#0c0c0e]/70 backdrop-blur-xl px-2 shadow-sm transition-all duration-300">
        
        <a href="#home" className="group ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.04]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-[60%] h-[60%]"
            viewBox="0 0 202 176" 
            fill="none"
          >
            <path d="M188 0H157.5L56.7694 175.5H202L187 148.5H103L130 102.5L143 125.5H173L144.5 76L188 0Z" fill="#FFFEFE"/>
            <path d="M101 0L0 175.5H30L101 52.5L109 64.5L124 39L101 0Z" fill="white"/>
          </svg>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
        
        <div className="flex shrink-0 items-center gap-1.5 mr-1">
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" strokeWidth={2} />
              ) : (
                <Moon className="h-[18px] w-[18px]" strokeWidth={2} />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden h-9 w-9 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px]" strokeWidth={2} />
            ) : (
              <AlignRight className="h-[18px] w-[18px]" strokeWidth={2} />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[4.5rem] w-full max-w-[54rem] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl p-4 shadow-lg origin-top animate-in fade-in zoom-in-95">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
