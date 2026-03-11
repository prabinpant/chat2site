import {
  ArrowUpRight,
  ChevronRight,
  Clock3,
  Command,
  Cpu,
  Database,
  FileCode2,
  FolderGit2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Search,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Project = {
  name: string
  description: string
  language: string
  updated: string
  tags: string[]
  problem: string
  architecture: string
  screenshots: string[]
  github: string
  demo?: string
}

type Experiment = {
  name: string
  path: string
  concept: string
  explored: string
  insight: string
}

type StackGroup = {
  label: string
  icon: typeof FileCode2
  items: string[]
}

const bootLines = [
  'bootloader:init devos@aaryash-shakya',
  'kernel:mount /projects /experiments /notes',
  'service:sync github profile metadata',
  'module:load repository explorer',
  'module:load command palette',
  'session:ready',
]

const projects: Project[] = [
  {
    name: 'build-mcp-server',
    description: 'Convert a project idea into a custom MCP server workflow.',
    language: 'TypeScript',
    updated: 'recently updated',
    tags: ['mcp', 'tooling', 'automation', 'ai'],
    problem:
      'Removes repetitive setup around standing up custom MCP servers by turning intent into a working system entrypoint faster.',
    architecture:
      'A TypeScript-first workflow that treats project intent as input, then composes server scaffolding, tool wiring, and execution surfaces around it.',
    screenshots: ['prompt-schema.ts', 'server-runtime.ts', 'transport-bridge.ts'],
    github: 'https://github.com/Aaryash-Shakya',
  },
  {
    name: 'experiments-index',
    description: 'A structured surface for testing developer workflows, interfaces, and system ideas.',
    language: 'JavaScript',
    updated: 'active lab',
    tags: ['prototypes', 'ui', 'systems'],
    problem:
      'Keeps experimentation visible instead of burying prototypes behind finished-product polish.',
    architecture:
      'Organized as lightweight modules, each isolating one idea, one constraint, and one engineering question to validate quickly.',
    screenshots: ['lab-shell.tsx', 'command-router.ts', 'results-log.md'],
    github: 'https://github.com/Aaryash-Shakya',
  },
]

const experiments: Experiment[] = [
  {
    name: 'protocol-surface',
    path: 'lab/protocol-surface.ts',
    concept: 'How interfaces behave when command-first navigation is the default.',
    explored: 'Terminal patterns, palette routing, and low-friction developer UX.',
    insight: 'The fastest interfaces often win by reducing explanation, not adding decoration.',
  },
  {
    name: 'repo-as-product',
    path: 'lab/repo-as-product.md',
    concept: 'Presenting work as an inspectable system instead of a sales page.',
    explored: 'Repository metaphors, markdown rendering, and system-state storytelling.',
    insight: 'Engineering depth reads better when visitors can inspect structure, dependencies, and decisions.',
  },
  {
    name: 'ai-tooling-loop',
    path: 'lab/ai-tooling-loop.ts',
    concept: 'Shortening the path from idea to tool using AI-assisted infrastructure.',
    explored: 'Prompt-driven generation, automation layers, and dev tooling feedback loops.',
    insight: 'The leverage is not only generation speed; it is how quickly the loop exposes design mistakes.',
  },
]

const timeline = [
  { year: 'System Event 01', text: 'Shift toward building tools, not just interfaces.' },
  { year: 'System Event 02', text: 'Started exploring AI-assisted workflows and protocol-driven developer tooling.' },
  { year: 'System Event 03', text: 'Built and shipped experimentation-first projects with repository-style thinking.' },
  { year: 'System Event 04', text: 'Continues iterating on systems, prototypes, and dev-centric interfaces.' },
]

const stackGroups: StackGroup[] = [
  { label: 'Frontend', icon: FileCode2, items: ['React', 'TypeScript', 'Tailwind CSS', 'UI Systems'] },
  { label: 'Backend', icon: Cpu, items: ['Node.js', 'API Workflows', 'Automation', 'Protocol Design'] },
  { label: 'Databases', icon: Database, items: ['Structured Data Models', 'Persistence Layers', 'Data Flows'] },
  { label: 'Developer Tools', icon: Wrench, items: ['GitHub', 'CLI UX', 'Build Pipelines', 'Repository Tooling'] },
  { label: 'AI / Experimental', icon: Sparkles, items: ['MCP', 'LLM Workflows', 'Rapid Prototyping', 'Human-in-the-loop Tools'] },
]

const featureCards = [
  {
    title: 'Repository Explorer',
    description: 'Projects are surfaced like repos with languages, tags, update state, and drill-down architecture notes.',
    icon: FolderGit2,
  },
  {
    title: 'Command Navigation',
    description: 'A palette and mini terminal route visitors through the site using verbs instead of standard CTA buttons.',
    icon: Command,
  },
  {
    title: 'README Rendering',
    description: 'The about section reads like documentation: precise, inspectable, and oriented around how things are built.',
    icon: FileCode2,
  },
]

const commandHints = ['about', 'projects', 'experiments', 'timeline', 'stack', 'contact', 'github']

function App() {
  const [bootIndex, setBootIndex] = useState(0)
  const [bootComplete, setBootComplete] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [terminalInput, setTerminalInput] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0])
  const [terminalLog, setTerminalLog] = useState<string[]>([
    '$ help',
    'available commands: about, projects, experiments, timeline, stack, contact, github',
  ])

  useEffect(() => {
    if (bootComplete) {
      return
    }

    if (bootIndex < bootLines.length) {
      const timer = window.setTimeout(() => {
        setBootIndex((current) => current + 1)
      }, 360)

      return () => window.clearTimeout(timer)
    }

    const completeTimer = window.setTimeout(() => {
      setBootComplete(true)
    }, 520)

    return () => window.clearTimeout(completeTimer)
  }, [bootComplete, bootIndex])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredCommands = useMemo(() => {
    const normalized = commandInput.trim().toLowerCase()
    if (!normalized) {
      return commandHints
    }

    return commandHints.filter((command) => command.includes(normalized))
  }, [commandInput])

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase()
    if (!command) {
      return
    }

    const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const openUrl = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    if (command === 'about') {
      scrollTo('about')
    } else if (command === 'projects') {
      scrollTo('projects')
    } else if (command === 'experiments') {
      scrollTo('experiments')
    } else if (command === 'timeline') {
      scrollTo('timeline')
    } else if (command === 'stack') {
      scrollTo('stack')
    } else if (command === 'contact') {
      scrollTo('contact')
    } else if (command === 'github') {
      openUrl('https://github.com/Aaryash-Shakya')
    } else {
      setTerminalLog((current) => [...current, `$ ${rawCommand}`, `command not found: ${rawCommand}`])
      return
    }

    setTerminalLog((current) => [...current, `$ ${rawCommand}`, `executed: ${command}`])
  }

  const handlePaletteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(commandInput)
    setPaletteOpen(false)
    setCommandInput('')
  }

  const handleTerminalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(terminalInput)
    setTerminalInput('')
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          color-scheme: dark;
          --bg: #050816;
          --panel: rgba(8, 15, 32, 0.78);
          --panel-strong: rgba(10, 18, 38, 0.96);
          --line: rgba(148, 163, 184, 0.18);
          --soft: rgba(59, 130, 246, 0.16);
          --brand: #3b82f6;
          --text: #e2e8f0;
          --muted: #94a3b8;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          min-width: 320px;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 28%),
            radial-gradient(circle at top right, rgba(15, 23, 42, 0.9), transparent 35%),
            linear-gradient(180deg, #040712 0%, #050816 45%, #030611 100%);
          color: var(--text);
          font-family: 'Geist', 'Segoe UI', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .font-mono-ui {
          font-family: 'IBM Plex Mono', 'SFMono-Regular', monospace;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_42%)]" />
      </div>

      {!bootComplete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030611]/95 px-4">
          <div className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-[rgba(5,8,22,0.94)] p-5 shadow-[0_40px_120px_rgba(2,6,23,0.75)] backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.35em] text-blue-300">boot interface</p>
                <h1 className="mt-2 text-2xl font-semibold text-white sm:text-4xl">Aaryash Shakya DevOS</h1>
              </div>
              <button
                type="button"
                onClick={() => setBootComplete(true)}
                className="font-mono-ui rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-400/40 hover:text-white"
              >
                skip boot
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 font-mono-ui text-xs text-slate-500">/build me/devos.boot</span>
              </div>

              <div className="space-y-2 font-mono-ui text-sm text-slate-300">
                {bootLines.slice(0, bootIndex).map((line) => (
                  <div key={line} className="flex gap-3">
                    <span className="text-blue-400">$</span>
                    <span>{line}</span>
                  </div>
                ))}
                <div className="flex gap-3 text-blue-300">
                  <span>$</span>
                  <span className="inline-block h-5 w-2 animate-pulse rounded-sm bg-blue-400/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {paletteOpen ? (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[rgba(8,15,32,0.94)] shadow-[0_40px_120px_rgba(2,6,23,0.7)]">
            <form onSubmit={handlePaletteSubmit} className="border-b border-white/10 p-4 sm:p-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  value={commandInput}
                  onChange={(event) => setCommandInput(event.target.value)}
                  placeholder="Type a command..."
                  autoFocus
                  className="font-mono-ui w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setPaletteOpen(false)}
                  className="rounded-full p-1 text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close command palette"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="p-3">
              {filteredCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => {
                    runCommand(command)
                    setPaletteOpen(false)
                    setCommandInput('')
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-white/5"
                >
                  <div>
                    <p className="font-mono-ui text-sm text-white">{command}</p>
                    <p className="text-xs text-slate-500">navigate DevOS</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(5,8,22,0.82)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_20px_60px_rgba(59,130,246,0.15)]">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.34em] text-blue-300">devos</p>
                <p className="text-sm text-slate-300">Aaryash Shakya</p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {[
                ['about', 'README'],
                ['projects', 'Repos'],
                ['experiments', 'Lab'],
                ['timeline', 'Timeline'],
                ['contact', 'Contact'],
              ].map(([href, label]) => (
                <a key={href} href={`#${href}`} className="font-mono-ui text-xs uppercase tracking-[0.24em] text-slate-400 transition hover:text-white">
                  {label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400/40 hover:text-white"
            >
              <Command className="h-4 w-4" />
              <span className="font-mono-ui hidden sm:inline">command</span>
              <span className="font-mono-ui rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">cmd+k</span>
            </button>
          </div>
        </header>

        <main id="top" className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
          <section className="grid gap-6 pt-6 lg:grid-cols-[1.12fr_0.88fr] lg:pt-10">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,32,0.92),rgba(4,7,18,0.92))] p-6 shadow-[0_30px_120px_rgba(2,6,23,0.5)] sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-mono-ui text-[11px] uppercase tracking-[0.3em] text-blue-300">
                  boot complete
                </span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 font-mono-ui text-[11px] uppercase tracking-[0.3em] text-emerald-300">
                  session active
                </span>
              </div>

              <p className="font-mono-ui text-xs uppercase tracking-[0.36em] text-slate-500">/build me a site</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                A developer portfolio that feels more like inspecting a live system than browsing a resume.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                DevOS is a repository-like interface for exploring how Aaryash Shakya builds: tool-first thinking,
                experiments in progress, and an engineering mindset centered on systems, iteration, and developer UX.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ['explore projects', 'projects'],
                  ['view experiments', 'experiments'],
                  ['about developer', 'about'],
                  ['contact', 'contact'],
                ].map(([label, target]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => runCommand(target)}
                    className="font-mono-ui rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                  >
                    $ {label}
                  </button>
                ))}
                <a
                  href="https://github.com/Aaryash-Shakya"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono-ui inline-flex items-center gap-2 rounded-2xl border border-blue-400/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-200 transition hover:bg-blue-500/15"
                >
                  $ open GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {featureCards.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-medium text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.84)] shadow-[0_30px_100px_rgba(2,6,23,0.5)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="font-mono-ui text-xs text-slate-500">session/overview.json</p>
                </div>

                <div className="space-y-4 p-5">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">profile signal</p>
                    <p className="mt-3 text-2xl font-semibold text-white">Builder of tools, interfaces, and experiments.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">current mode</p>
                      <p className="mt-2 text-sm text-slate-200">Exploring developer tooling and system-driven product surfaces.</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">primary color</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-[#3b82f6]" />
                        <span className="font-mono-ui text-sm text-slate-200">#3b82f6</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-4">
                    <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-blue-200">command palette</p>
                    <p className="mt-2 text-sm text-blue-50">Use `Cmd/Ctrl + K` or the terminal below to move through sections.</p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleTerminalSubmit}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.84)] shadow-[0_30px_100px_rgba(2,6,23,0.45)]"
              >
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">mini terminal</p>
                </div>

                <div className="space-y-2 px-5 py-4 font-mono-ui text-sm text-slate-300">
                  {terminalLog.slice(-6).map((line, index) => (
                    <p key={`${line}-${index}`}>{line}</p>
                  ))}
                </div>

                <div className="border-t border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="font-mono-ui text-blue-400">$</span>
                    <input
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      placeholder="type a command"
                      className="font-mono-ui w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section id="about" className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">README.md</p>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
              <div className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
                <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-blue-300">about developer</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">Documentation over self-promotion.</h2>
                <p className="text-sm leading-7 text-slate-400">
                  This portfolio is intentionally structured like a codebase. The point is not a polished list of achievements;
                  it is the logic underneath the work.
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 text-slate-300">
                  <p className="font-mono-ui text-sm text-slate-500"># Aaryash Shakya</p>
                  <p className="mt-4 text-sm leading-7">
                    Builds software that feels usable by developers first: tools, experiments, interfaces, and systems that
                    reduce friction between an idea and a working implementation.
                  </p>
                  <p className="mt-4 text-sm leading-7">
                    Interested in problems where workflow design matters as much as implementation detail: developer tooling,
                    command surfaces, AI-assisted systems, and repository-like product experiences.
                  </p>
                  <p className="mt-4 text-sm leading-7">
                    Curiosity leans toward software as an evolving lab. Ship something small, inspect the behavior, keep the
                    useful abstractions, and repeat.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-5 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">repository explorer</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Projects</h2>
                </div>
                <FolderGit2 className="h-5 w-5 text-blue-300" />
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className={`w-full rounded-[28px] border p-5 text-left transition ${
                      selectedProject?.name === project.name
                        ? 'border-blue-400/40 bg-blue-500/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono-ui text-sm text-white">{project.name}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{project.description}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-slate-500" />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                        {project.language}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-3.5 w-3.5" />
                        {project.updated}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono-ui rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">
                  {selectedProject?.name ?? 'repo-preview'}
                </p>
              </div>

              {selectedProject ? (
                <div className="space-y-6 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{selectedProject.name}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{selectedProject.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-ui inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-200 transition hover:border-blue-400/30 hover:text-white"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                      {selectedProject.demo ? (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono-ui inline-flex items-center gap-2 rounded-2xl border border-blue-400/25 bg-blue-500/10 px-4 py-3 text-xs uppercase tracking-[0.22em] text-blue-200"
                        >
                          Demo
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                      <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">problem solved</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{selectedProject.problem}</p>
                    </div>
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                      <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">architecture</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{selectedProject.architecture}</p>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                    <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">screenshots / file views</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {selectedProject.screenshots.map((shot) => (
                        <div key={shot} className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          </div>
                          <p className="font-mono-ui text-xs text-blue-300">{shot}</p>
                          <div className="mt-4 space-y-2">
                            <div className="h-2 rounded-full bg-white/10" />
                            <div className="h-2 w-4/5 rounded-full bg-blue-400/30" />
                            <div className="h-2 w-3/5 rounded-full bg-white/10" />
                            <div className="h-2 w-2/5 rounded-full bg-white/10" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          <section id="experiments" className="mt-8 rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-5 shadow-[0_30px_100px_rgba(2,6,23,0.45)] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">lab / experiments</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Directory of ongoing exploration</h2>
              </div>
              <Workflow className="h-5 w-5 text-blue-300" />
            </div>

            <div className="space-y-4">
              {experiments.map((experiment) => (
                <div key={experiment.name} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-ui text-sm text-blue-300">{experiment.path}</p>
                      <h3 className="mt-2 text-lg font-medium text-white">{experiment.name}</h3>
                    </div>
                    <span className="font-mono-ui rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      active
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">concept</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{experiment.concept}</p>
                    </div>
                    <div>
                      <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">explored</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{experiment.explored}</p>
                    </div>
                    <div>
                      <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">key insight</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{experiment.insight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="timeline" className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">activity timeline</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Growth through shipped systems.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The progression reads like a change log: projects launched, interfaces refined, experiments run, and tooling explored.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-400" />
                      {index !== timeline.length - 1 ? <div className="mt-2 h-full w-px bg-white/10" /> : null}
                    </div>
                    <div className="pb-5">
                      <p className="font-mono-ui text-xs uppercase tracking-[0.22em] text-blue-300">{item.year}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="stack" className="mt-8 rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-5 shadow-[0_30px_100px_rgba(2,6,23,0.45)] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">system modules</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Tech stack as dependencies</h2>
              </div>
              <Layers3 className="h-5 w-5 text-blue-300" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {stackGroups.map((group) => {
                const Icon = group.icon

                return (
                  <div key={group.label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-medium text-white">{group.label}</h3>
                    <div className="mt-4 space-y-2">
                      {group.items.map((item) => (
                        <p key={item} className="font-mono-ui text-xs uppercase tracking-[0.16em] text-slate-400">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="contact" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">terminal output</p>
              <div className="mt-5 rounded-[28px] border border-white/10 bg-black/25 p-5 font-mono-ui text-sm text-slate-300">
                <p>$ whois aaryash-shakya</p>
                <p className="mt-3">developer: Aaryash Shakya</p>
                <p>focus: tooling, systems, experimentation</p>
                <p>status: open to interesting builds and technical conversations</p>
                <p className="mt-3">$ contact --list</p>
                <p>github: github.com/Aaryash-Shakya</p>
                <p>email: hello@aaryash.dev</p>
                <p>linkedin: linkedin.com/in/aaryash-shakya</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[rgba(8,15,32,0.82)] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <p className="font-mono-ui text-xs uppercase tracking-[0.28em] text-slate-500">links</p>
              <div className="mt-5 space-y-4">
                <a
                  href="https://github.com/Aaryash-Shakya"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm font-medium text-white">GitHub</p>
                      <p className="font-mono-ui text-xs text-slate-500">github.com/Aaryash-Shakya</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </a>

                <a
                  href="mailto:hello@aaryash.dev"
                  className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <p className="font-mono-ui text-xs text-slate-500">hello@aaryash.dev</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/aaryash-shakya"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm font-medium text-white">LinkedIn</p>
                      <p className="font-mono-ui text-xs text-slate-500">linkedin.com/in/aaryash-shakya</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p className="font-mono-ui">Aaryash Shakya DevOS / production build / dark interface / responsive shell</p>
            <p className="font-mono-ui">navigate with commands: about projects experiments timeline stack contact github</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
