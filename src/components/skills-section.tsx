"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  SiC,
  SiCplusplus,
  SiDart,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiHtml5,
  SiCss,
  SiGnubash,
  SiGithub,
  SiGit,
  SiPostman,
  SiSupabase,
  SiJetbrains,
  SiNotion,
  SiObsidian,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiTailwindcss,
  SiFramer,
  SiPostgresql,
  SiMysql,
  SiNodedotjs,
  SiVercel,
  SiDebian,
  SiGooglegemini,
  SiWireshark,
  SiMetasploit,
  SiBurpsuite
} from "@icons-pack/react-simple-icons"

const AsmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <polygon points="6.5 2 17.5 2 23 12 17.5 22 6.5 22 1 12" />
    <text x="12" y="12" fontSize="7.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="central" fill="#ffffff">ASM</text>
  </svg>
)

type CustomImageProps = {
  src: string;
  alt: string;
  className?: string;
  invertInDark?: boolean;
}

const CustomImage = ({ src, alt, className, invertInDark }: CustomImageProps) => (
  <div className={`relative w-8 h-8 ${className || ""} ${invertInDark ? "dark:invert" : ""}`}>
    <Image src={src} alt={alt} fill className="object-contain" />
  </div>
)

type SkillItem = {
    name: string;
    icon?: React.ElementType;
    custom?: string;
    color?: string;
    adaptToTheme?: boolean;
    invertInDark?: boolean;
}

const skillCategories = [
  {
    id: "linguaggi",
    label: "Linguaggi",
    skills: [
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Assembly ArmV8", icon: AsmIcon, color: "#0091BD" },
      { name: "Java", custom: "/assets/Java.svg" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "Go", custom: "/assets/go.svg" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    skills: [
      { name: "GitHub", icon: SiGithub, adaptToTheme: true },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "VSCode", custom: "/assets/vscode.svg" },
      { name: "JetBrains", icon: SiJetbrains, adaptToTheme: true },
      { name: "Notion", icon: SiNotion, adaptToTheme: true },
      { name: "Obsidian", icon: SiObsidian, color: "#483699" },
      { name: "Next.js", icon: SiNextdotjs, adaptToTheme: true },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Vercel", icon: SiVercel, adaptToTheme: true },
      { name: "Windows", custom: "/assets/windows.svg" },
      { name: "Debian Linux", icon: SiDebian, color: "#A81D33" },
      { name: "macOS", custom: "/assets/apple.svg", invertInDark: true },
    ],
  },
  {
    id: "ai",
    label: "AI",
    skills: [
      { name: "Claude Code", custom: "/assets/claudecode-color.svg" },
      { name: "Gemini", icon: SiGooglegemini, color: "#8E75B2" },
      { name: "Antigravity", custom: "/assets/antigravity.svg" },
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    skills: [
      { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
      { name: "Nmap", custom: "/assets/nmap.svg", invertInDark: true },
      { name: "Metasploit", icon: SiMetasploit, color: "#227092" },
      { name: "Burp Suite", icon: SiBurpsuite, color: "#FF6633" },
    ],
  },
]

const ScrollRow = ({ skills }: { skills: SkillItem[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false)
  const lastXRef = useRef(0)
  
  useEffect(() => {
    let animationFrameId: number;

    const getSortedChildren = (el: HTMLElement) => {
        return Array.from(el.children).sort((a, b) => {
            const orderA = parseInt((a as HTMLElement).style.order || "0");
            const orderB = parseInt((b as HTMLElement).style.order || "0");
            return orderA - orderB;
        });
    }

    const scroll = () => {
      const el = scrollRef.current;
      const inner = innerRef.current;
      if (el && inner) {
        
        // Auto-scroll (solo se non interagisce)
        if (!activeTooltip && !isInteracting && !isDragging) {
            if (el.scrollWidth > el.clientWidth) {
                el.scrollLeft += 1;
            }
        }
        
        // Logica di riposizionamento infinito (eseguita sempre per supportare il drag continuo)
        if (el.scrollWidth > el.clientWidth) {
            let sorted = getSortedChildren(inner);
            
            // Se scorriamo a destra oltre il primo elemento, spostiamolo in fondo
            while (el.scrollLeft > (sorted[0] as HTMLElement).offsetWidth + 1) {
                const first = sorted[0] as HTMLElement;
                const last = sorted[sorted.length - 1] as HTMLElement;
                first.style.order = (parseInt(last.style.order || "0") + 1).toString();
                el.scrollLeft -= first.offsetWidth;
                sorted = getSortedChildren(inner);
            }
            
            // Se arriviamo al margine sinistro, prendiamo l'ultimo elemento e lo mettiamo all'inizio
            while (el.scrollLeft < 1) {
                const last = sorted[sorted.length - 1] as HTMLElement;
                const first = sorted[0] as HTMLElement;
                last.style.order = (parseInt(first.style.order || "0") - 1).toString();
                el.scrollLeft += last.offsetWidth;
                sorted = getSortedChildren(inner);
            }
        }
      }
      animationFrameId = requestAnimationFrame(scroll)
    }
    
    animationFrameId = requestAnimationFrame(scroll)
    
    const handleInteraction = () => {
        setIsInteracting(true);
        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }
        interactionTimeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
        }, 3000);
    }
    
    const el = scrollRef.current;
    if (el) {
        el.addEventListener('touchstart', handleInteraction, {passive: true});
        el.addEventListener('touchmove', handleInteraction, {passive: true});
        el.addEventListener('wheel', handleInteraction, {passive: true});
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (interactionTimeoutRef.current) {
          clearTimeout(interactionTimeoutRef.current);
      }
      if (el) {
          el.removeEventListener('touchstart', handleInteraction);
          el.removeEventListener('touchmove', handleInteraction);
          el.removeEventListener('wheel', handleInteraction);
      }
    }
  }, [activeTooltip, isInteracting, isDragging])
  
  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setIsInteracting(true)
    lastXRef.current = e.pageX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const currentX = e.pageX
    const deltaX = currentX - lastXRef.current
    lastXRef.current = currentX
    // Moltiplicatore per rendere il drag più reattivo (su mouse un po' di più)
    const multiplier = e.pointerType === 'mouse' ? 2 : 1.5;
    scrollRef.current.scrollLeft -= deltaX * multiplier
  }

  const handlePointerUpOrLeave = (e?: React.PointerEvent | React.MouseEvent) => {
    setIsDragging(false)
    if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
    }, 3000);
  }

  return (
    <div 
        className="w-full relative"
        onMouseLeave={() => { setActiveTooltip(null); handlePointerUpOrLeave(); }}
    >
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        
        <div 
            ref={scrollRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrLeave}
            onPointerCancel={handlePointerUpOrLeave}
            className={`flex overflow-hidden touch-pan-y scrollbar-hide px-4 md:px-24 py-16 items-center whitespace-nowrap ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollBehavior: "auto" }}
        >
            <div ref={innerRef} className="flex flex-shrink-0 mx-auto">
                {skills.map((skill, idx) => (
                    <div 
                        key={`${skill.name}-${idx}`} 
                        style={{ order: idx }}
                        className="pr-4 md:pr-8 flex-shrink-0"
                    >
                        <div 
                            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm transition-all border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 group ${isDragging ? 'pointer-events-none' : 'hover:shadow-md'}`}
                            onClick={() => !isDragging && setActiveTooltip(activeTooltip === skill.name + idx ? null : skill.name + idx)}
                            onMouseEnter={() => !isDragging && setActiveTooltip(skill.name + idx)}
                            onMouseLeave={() => setActiveTooltip(null)}
                        >
                            {skill.custom ? (
                                <CustomImage src={skill.custom} alt={skill.name} invertInDark={skill.invertInDark} className={`transition-transform duration-300 ${isDragging ? '' : 'group-hover:scale-110'}`} />
                            ) : skill.icon ? (
                                <skill.icon 
                                    className={`w-8 h-8 transition-transform duration-300 ${isDragging ? '' : 'group-hover:scale-110'} ${skill.adaptToTheme ? 'text-zinc-900 dark:text-zinc-100' : ''}`} 
                                    style={skill.adaptToTheme ? undefined : { color: skill.color }} 
                                />
                            ) : null}
                            
                            <AnimatePresence>
                                {activeTooltip === skill.name + idx && !isDragging && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                                        exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute -top-12 left-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-sm font-medium rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none"
                                    >
                                        {skill.name}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const activeSkills = skillCategories.find(c => c.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
            Competenze & Tecnologie
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Il mio arsenale di strumenti, linguaggi e framework che utilizzo per dare vita alle idee.
          </p>
        </motion.div>

        {/* Categories Menu */}
        <div className="relative max-w-fit mx-auto mb-8">
          {/* Glow effect behind the tabs to make glassmorphism pop */}
          <div className="absolute inset-0 -top-6 -bottom-6 -left-12 -right-12 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-[3rem] blur-2xl opacity-70 dark:opacity-40 z-0"></div>
          
          <div className="relative flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm z-10">
              {skillCategories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-4 py-2 text-sm md:text-base font-medium rounded-xl transition-colors duration-200 ${
                        activeCategory === cat.id 
                            ? "text-zinc-900 dark:text-zinc-100" 
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                    {activeCategory === cat.id && (
                        <motion.div 
                            layoutId="activeCategoryPill"
                            className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                </button>
            ))}
          </div>
        </div>

        {/* Skills Row with Auto-Scroll */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                <ScrollRow skills={activeSkills} />
            </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
