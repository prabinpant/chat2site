import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  CircuitBoard,
  Cpu,
  MapPin,
  Mountain,
  Sparkles,
  Tickets,
} from 'lucide-react'
import { cn } from './lib/utils'

const principleCards = [
  {
    label: 'Regional momentum',
    value: '2 days',
    body: 'A concentrated AI conference for builders across Nepal and the wider region.',
  },
  {
    label: 'Build culture',
    value: '9 talks',
    body: 'Production lessons spanning security, LLM architecture, observability, and design leadership.',
  },
  {
    label: 'Community format',
    value: '1 hike',
    body: 'Day two extends the conference into Jagdol Putali Danda for a beginner-friendly community hike.',
  },
]

const audienceCards = [
  {
    title: 'Engineers',
    icon: Cpu,
    body: 'See how teams are shipping enterprise RAG, evaluation workflows, secure AI systems, and production-grade architectures.',
    signal: 'Architecture, observability, security, infra tradeoffs',
  },
  {
    title: 'Designers',
    icon: Sparkles,
    body: 'Learn how AI is changing research, workflow velocity, and strategic decision-making without reducing design to output.',
    signal: 'Leadership, systems thinking, AI-assisted design ops',
  },
  {
    title: 'Builders',
    icon: BrainCircuit,
    body: 'Connect product, engineering, and business perspectives around practical AI adoption and future-facing execution.',
    signal: 'Market fit, collaboration, AI-ready teams',
  },
]

const speakers = [
  {
    name: 'Amit Timalsina',
    role: 'AI Consultant | Founder, Blintic AI & Algentech',
    talk: 'Automating Clinical Trial Reviews using Generative AI',
    image: 'https://ai.wwktm.com/2026/speakers/amit.jpeg',
  },
  {
    name: 'Vlad Dyachenko',
    role: 'Platform Engineer | OSS Contributor',
    talk: 'The Perfect Programming Language for the AI Era: How Should It Look?',
    image: 'https://ai.wwktm.com/2026/speakers/vlad.jpeg',
  },
  {
    name: 'Sayantika Banik',
    role: 'Founder, DataJourneyHQ | Open Source Maintainer',
    talk: 'The Art & Science of Designing LLM Systems',
    image: 'https://ai.wwktm.com/2026/speakers/sayantika.png',
  },
  {
    name: 'Dijup Tuladhar',
    role: 'Sr. Principal Product Designer, Infinite | Founder, Chordpedia',
    talk: 'AI is redefining design leadership: from execution to strategic, high-leverage decisions',
    image: 'https://ai.wwktm.com/2026/speakers/dijup.jpeg',
  },
  {
    name: 'Manu Chatterjee',
    role: 'VP & Head of AI, Leapfrog Technology',
    talk: 'What AI Actually Does: From Unstructured Chaos to Intelligent Systems',
    image: 'https://ai.wwktm.com/2026/speakers/manu.jpeg',
  },
  {
    name: 'Saugat Acharya',
    role: 'Principal Engineer, Laudio | OSS & Tech Enthusiast',
    talk: 'Evalobility: Why PMs, Designers, and Engineers Now Share the Same Dashboard',
    image: 'https://ai.wwktm.com/2026/speakers/saugat.jpeg',
  },
  {
    name: 'Pranjal Timsina',
    role: 'Synapse Technologies | Kanoon AI',
    talk: 'AI & Security',
    image: 'https://ai.wwktm.com/2026/speakers/pranjal.jpeg',
  },
  {
    name: 'Haihao Liu',
    role: 'ML Researcher, Algoverse | Founder, Ternity Education',
    talk: 'Building humanity-first AI for the 22nd century',
    image: 'https://ai.wwktm.com/2026/speakers/haihao.jpeg',
  },
  {
    name: 'Dr. Dovan Rai',
    role: 'Director of R&D, Body & Data',
    talk: 'Does AI Understand? AI, Understanding, and Agency',
    image: 'https://ai.wwktm.com/2026/speakers/dovan.jpeg',
  },
  {
    name: 'Aayush',
    role: 'Full Stack Developer | Stand-up comedian | Storyteller',
    talk: 'Panel discussion',
    image: 'https://ai.wwktm.com/2026/speakers/aayush.jpeg',
  },
  {
    name: 'Alok Khatri',
    role: 'Moderator | AI adoption & learning',
    talk: 'Who owns AI in an organization',
    image: 'https://ai.wwktm.com/2026/speakers/alok.jpeg',
  },
  {
    name: 'Hempal Shrestha',
    role: 'Panelist | Technologist, technopreneur, and social researcher',
    talk: 'Who owns AI in an organization',
    image: 'https://ai.wwktm.com/2026/speakers/hempal.jpeg',
  },
  {
    name: 'Prajani KC',
    role: 'Panelist | IT project management & strategy',
    talk: 'Who owns AI in an organization',
    image: 'https://ai.wwktm.com/2026/speakers/prajani.jpeg',
  },
  {
    name: 'Roshan Pokhrel',
    role: 'Panelist | Director of Product Security, Logpoint',
    talk: 'Who owns AI in an organization',
    image: 'https://ai.wwktm.com/2026/speakers/roshan.jpeg',
  },
] as const

const schedule = {
  day1: [
    { time: '8:30 am', title: 'Doors open', speaker: 'Arrival + check-in', type: 'Arrival' },
    { time: '9:15 am', title: 'Welcome + opening talk', speaker: 'Ai Conf 2026', type: 'Opening' },
    { time: '9:45 am', title: 'What AI Actually Does: From Unstructured Chaos to Intelligent Systems', speaker: 'Manu Chatterjee', type: 'Talk' },
    { time: '10:15 am', title: 'Automating Clinical Trial Reviews using Generative AI', speaker: 'Amit Timalsina', type: 'Talk' },
    { time: '10:50 am', title: 'The Art & Science of Designing LLM Systems', speaker: 'Sayantika Banik', type: 'Talk' },
    { time: '11:20 am', title: 'Building humanity-first AI for the 22nd century', speaker: 'Haihao Liu', type: 'Talk' },
    { time: '11:50 am', title: 'Does AI Understand? AI, Understanding, and Agency', speaker: 'Dr. Dovan Rai', type: 'Talk' },
    { time: '12:20 pm', title: 'Lunch / break / networking', speaker: 'Conversations, resets, hallway sessions', type: 'Break' },
    { time: '1:40 pm', title: 'The Perfect Programming Language for the AI Era: How Should It Look?', speaker: 'Vlad Dyachenko', type: 'Talk' },
    { time: '2:10 pm', title: 'Evalobility: Why PMs, Designers, and Engineers Now Share the Same Dashboard', speaker: 'Saugat Acharya', type: 'Talk' },
    { time: '2:45 pm', title: 'AI & Security', speaker: 'Pranjal Timsina', type: 'Talk' },
    { time: '3:15 pm', title: 'AI Is Redefining Design Leadership', speaker: 'Dijup Tuladhar', type: 'Talk' },
    { time: '3:50 pm', title: 'Panel discussion: Who owns AI in an organization', speaker: 'Alok Khatri, Hempal Shrestha, Prajani KC, Roshan Pokhrel', type: 'Panel' },
    { time: '4:40 pm', title: 'Closing', speaker: 'Conference wrap-up', type: 'Closing' },
  ],
  day2: [
    { time: '7:00 am', title: 'Meet at The Plaza and drive to the hike starting point', speaker: 'Transport to Jagdol Putali Danda', type: 'Meet-up' },
    { time: '8:00 am', title: 'Start hike', speaker: 'Beginner-friendly 6-7 km community trail', type: 'Community hike' },
    { time: '10:30 am', title: 'Untraining the Algorithm: Mindful Art in Nature', speaker: 'Facilitated by artist Kailash K Shrestha', type: 'Activity' },
    { time: '12:30 pm', title: 'Light snacks + rest at Ultimate Venue Resort', speaker: 'Bring your own water, warm clothes, and comfortable shoes', type: 'Refresh' },
    { time: '3:00 pm', title: 'Drive back to meeting point', speaker: 'Optional community return trip', type: 'Return' },
  ],
} as const

const faqs = [
  {
    question: 'When is Ai Conf 2026 happening?',
    answer:
      'Ai Conf 2026 runs on January 10-11, 2026. Day 1 is the talk program and panel discussion, and Day 2 is the signature community hike.',
  },
  {
    question: 'Where is the conference taking place?',
    answer:
      'The conference is anchored at The Plaza, Kathmandu, Nepal. The second day begins from The Plaza before the group heads to the Jagdol Putali Danda hike starting point.',
  },
  {
    question: 'Who should attend?',
    answer:
      'The event is built for engineers, designers, founders, product leaders, and people building the future with AI. The content is intentionally cross-disciplinary and practical.',
  },
  {
    question: 'What is the format across the two days?',
    answer:
      'Expect a focused day of talks, a panel, and networking on January 10, followed by a voluntary beginner-friendly hike with games, nature, and a mindful art activity on January 11.',
  },
  {
    question: 'Can I still get a ticket?',
    answer:
      'The conference is officially sold out. If you have a coupon you can redeem it directly, and everyone else can stay connected through the WWKTM community for updates and highlights.',
  },
]

function App() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1')
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <main className="relative overflow-hidden bg-ink text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,_rgba(255,84,54,0.2),_transparent_28%),radial-gradient(circle_at_85%_12%,_rgba(255,221,64,0.14),_transparent_22%),radial-gradient(circle_at_72%_78%,_rgba(86,156,214,0.16),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 topography opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] signal-grid opacity-40" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#hero" className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-text/90">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-white/5 shadow-glow">
            <CircuitBoard className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="font-display text-lg tracking-[0.26em]">Ai Conf</div>
            <div className="text-[10px] tracking-[0.34em] text-muted">Kathmandu 2026</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-muted lg:flex">
          <a href="#premise" className="transition hover:text-text">Premise</a>
          <a href="#speakers" className="transition hover:text-text">Speakers</a>
          <a href="#program" className="transition hover:text-text">Program</a>
          <a href="#venue" className="transition hover:text-text">Venue</a>
          <a href="#register" className="transition hover:text-text">Register</a>
        </nav>
      </header>

      <section id="hero" className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1.2fr)_24rem] lg:items-center lg:px-10 lg:pb-32">
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-accent/90"
          >
            WWKTM presents
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="max-w-4xl font-display text-[clamp(4rem,9vw,8.6rem)] uppercase leading-[0.9] tracking-[-0.06em]"
          >
            Ai Conf
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-text/78 lg:text-xl"
          >
            January 10-11 in Kathmandu, Nepal. A two-day regional conference for engineers, designers, and builders creating the future with AI.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <a
              href="https://community.wwktm.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-accent/30 bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#0b0b0d] transition hover:shadow-glow"
            >
              Join community
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#speakers"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm uppercase tracking-[0.22em] text-text/90 backdrop-blur-md transition hover:border-accent/30 hover:text-text"
            >
              View speakers
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.22, ease: 'easeOut' }}
          className="relative z-10 self-end lg:mb-10"
        >
          <div className="panel scanline overflow-hidden rounded-[2rem] p-7">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Conference brief</div>
                <div className="mt-2 font-display text-2xl uppercase tracking-[0.16em]">Kathmandu node</div>
              </div>
              <span className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-[#ffd567]">
                Sold out
              </span>
            </div>
            <div className="space-y-5 text-sm text-text/78">
              <div className="flex items-start gap-3 border-b border-white/10 pb-5">
                <Tickets className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted">Dates</div>
                  <div className="mt-1 text-base text-text">Jan 10-11, 2026</div>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-white/10 pb-5">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted">Venue</div>
                  <div className="mt-1 text-base text-text">The Plaza, Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mountain className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted">Day 2</div>
                  <div className="mt-1 text-base text-text">Community hike to Jagdol Putali Danda</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <a
                href="#register"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-xs uppercase tracking-[0.24em] text-text transition hover:border-accent/30"
              >
                Stay in the loop
              </a>
              <a
                href="https://tickets.wwktm.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full border border-accent/30 bg-accent/10 px-4 py-3 text-center text-xs uppercase tracking-[0.24em] text-accent transition hover:bg-accent/18"
              >
                Redeem coupon
              </a>
            </div>
          </div>
        </motion.aside>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden">
          <div className="horizon absolute inset-x-[-10%] bottom-0 h-full" />
        </div>
      </section>

      <section id="premise" className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
        >
          <p className="section-kicker">Conference premise</p>
          <h2 className="section-title mt-5 max-w-3xl">
            Nepal’s premier conference for people building the future with AI.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-text/76 lg:text-lg">
            This is the next chapter of Web Weekend Kathmandu: a premium yet approachable gathering where practical AI work, regional momentum, and cross-disciplinary collaboration share the same stage. The program is designed for people shipping real systems and making real decisions, not spectators collecting buzzwords.
          </p>
          <div className="mt-8 max-w-2xl border-l border-accent/30 pl-5 text-sm leading-7 text-muted">
            From building the web to building with and for AI, the conference keeps WWKTM’s inclusive, community-first DNA while raising the signal around trust, architecture, design leadership, and responsible implementation.
          </div>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-6 top-10 hidden h-px w-16 bg-gradient-to-r from-accent to-transparent lg:block" />
          <div className="space-y-4">
            {principleCards.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="panel rounded-[1.6rem] p-6"
              >
                <div className="flex items-end justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.28em] text-muted">{item.label}</div>
                  <div className="font-display text-3xl uppercase tracking-[-0.05em] text-accent">{item.value}</div>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-7 text-text/75">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap gap-3 border-y border-white/10 py-5 text-xs uppercase tracking-[0.28em] text-muted">
          {['Security + AI', 'Enterprise RAG', 'LLM system architecture', 'Observability and MLOps', 'Human-in-loop AI', 'Agents and tool-use'].map((topic) => (
            <span key={topic} className="text-text/72">
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section id="speakers" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="section-kicker">Speakers</p>
        <div className="mt-5 flex items-end justify-between gap-6">
          <h2 className="section-title max-w-4xl">The live speaker roster from the WWKTM 2026 conference site.</h2>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-text/76">
          Featured speakers, moderator, and panelists shown with the same headshots used on the reference site.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {speakers.map((speaker, index) => (
            <motion.article
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] shadow-soft transition hover:border-accent/30 hover:bg-white/[0.06]"
            >
              <div className="relative aspect-[4/4.5] overflow-hidden bg-[#15151b]">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(11,11,13,0.74)_100%)]" />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent/90">Speaker</p>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[-0.05em] text-text">{speaker.name}</h3>
                <p className="mt-3 text-sm leading-7 text-text/72">{speaker.role}</p>
                <div className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-[#ffd567]">{speaker.talk}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="audience" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="section-kicker">Audience matrix</p>
        <div className="mt-5 flex items-end justify-between gap-6">
          <h2 className="section-title max-w-3xl">Three operating modes. One shared AI surface.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {audienceCards.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.72, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-7 shadow-soft transition hover:border-accent/30 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-accent" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Module 0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-3xl uppercase tracking-[-0.05em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-text/75">{item.body}</p>
                <p className="mt-7 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.24em] text-muted">
                  {item.signal}
                </p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section id="program" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="section-kicker">Two-day program</p>
            <h2 className="section-title mt-5">Clear flow. Dense signal. Space for conversation.</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-text/72">
              Day 1 is talks plus panel. Day 2 is the community hike. The structure is ready for keynotes, technical sessions, collaboration, and real-world networking.
            </p>
            <div className="mt-8 flex gap-3">
              {(['day1', 'day2'] as const).map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    'rounded-full border px-5 py-3 text-xs uppercase tracking-[0.26em] transition',
                    activeDay === day
                      ? 'border-accent/40 bg-accent/12 text-accent'
                      : 'border-white/10 bg-white/5 text-muted hover:text-text',
                  )}
                >
                  {day === 'day1' ? 'Jan 10' : 'Jan 11'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[1.15rem] top-0 hidden h-full w-px bg-gradient-to-b from-accent/70 via-white/15 to-transparent md:block" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32 }}
                className="space-y-5"
              >
                {schedule[activeDay].map((item, index) => (
                  <motion.article
                    key={`${activeDay}-${item.time}-${item.title}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.03 }}
                    className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 md:ml-10 md:grid md:grid-cols-[8rem_minmax(0,1fr)] md:items-start md:gap-6"
                  >
                    <div className="mb-4 flex items-center gap-4 md:mb-0 md:block">
                      <div className="absolute left-0 top-8 hidden h-2.5 w-2.5 -translate-x-[1.38rem] rounded-full border border-accent/60 bg-accent/80 shadow-[0_0_20px_rgba(255,84,54,0.45)] md:block" />
                      <div className="font-display text-2xl tracking-[-0.05em] text-text">{item.time}</div>
                      <div className="text-[10px] uppercase tracking-[0.28em] text-muted">{item.type}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-accent/90">{activeDay === 'day1' ? 'Conference day' : 'Community day'}</div>
                      <h3 className="mt-2 text-lg font-semibold leading-7 text-text">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-text/72">{item.speaker}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="venue" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-surface shadow-soft">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[26rem]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80"
                alt="Mountain landscape near Kathmandu"
                className="absolute inset-0 h-full w-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.55),rgba(11,11,13,0.25)),linear-gradient(180deg,rgba(11,11,13,0.05),rgba(11,11,13,0.86))]" />
              <div className="absolute inset-0 topography opacity-55" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="section-kicker">Venue context</p>
                <h2 className="section-title mt-4 max-w-xl">Kathmandu as destination, atmosphere, and regional signal amplifier.</h2>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 p-8 lg:p-10">
              <p className="max-w-xl text-base leading-8 text-text/76">
                The conference brings future-facing AI conversations into a city with deep cultural texture and growing technical ambition. The Plaza anchors the main gathering, then the program opens into a voluntary community hike that makes the experience feel distinctly WWKTM.
              </p>
              <div className="grid gap-4">
                <div className="panel rounded-[1.4rem] p-5">
                  <div className="text-xs uppercase tracking-[0.28em] text-muted">Main venue</div>
                  <div className="mt-2 font-display text-2xl uppercase tracking-[0.08em]">The Plaza</div>
                  <div className="mt-2 text-sm leading-7 text-text/72">Kathmandu, Nepal. The arrival, talks, panel, and day-one networking hub.</div>
                </div>
                <div className="panel rounded-[1.4rem] p-5">
                  <div className="text-xs uppercase tracking-[0.28em] text-muted">Day-two route</div>
                  <div className="mt-2 font-display text-2xl uppercase tracking-[0.08em]">Jagdol Putali Danda</div>
                  <div className="mt-2 text-sm leading-7 text-text/72">A beginner-friendly 6-7 km hike with games, nature, and a mindful art activity in the open air.</div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/5Tc13KcsNq8xDmxEA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-accent"
              >
                Open venue map
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75 }}
          className="panel scanline relative overflow-hidden rounded-[2.2rem] px-8 py-14 lg:px-14"
        >
          <p className="section-kicker justify-center">Registration</p>
          <h2 className="section-title mx-auto mt-5 max-w-3xl">
            Ai Conf 2026 is sold out. The signal is still open.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text/76">
            Tickets are gone, but the conference is still the place to track if you are an engineer, designer, or builder operating in AI. Join the community for speaker updates, highlights, and future openings. If you have a coupon, redeem it directly.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://community.wwktm.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-accent/30 bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#0b0b0d] transition hover:shadow-glow"
            >
              Stay connected
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://tickets.wwktm.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm uppercase tracking-[0.22em] text-text transition hover:border-accent/30"
            >
              Redeem coupon
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.26em] text-muted">
            <span>Jan 10-11, 2026</span>
            <span>The Plaza, Kathmandu</span>
            <span>By Web Weekend Kathmandu</span>
            <span>Inclusive, community-first</span>
          </div>
        </motion.div>
      </section>

      <section id="faq" className="relative mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-soft lg:p-8">
          <p className="section-kicker">FAQ / Practical info</p>
          <h2 className="section-title mt-5 max-w-3xl">Direct answers for timing, format, and attendance.</h2>
          <div className="mt-10 divide-y divide-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={faq.question} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-text lg:text-lg">{faq.question}</span>
                    <ChevronDown className={cn('h-5 w-5 flex-none text-accent transition', isOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-5 text-sm leading-7 text-text/72">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
