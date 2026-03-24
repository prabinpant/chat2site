import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Cpu,
  Globe,
  LayoutGrid,
  MapPinned,
  MessageSquareShare,
  Mic2,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Tickets,
} from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { cn } from './lib/utils'

const meta = [
  'Kathmandu, Nepal',
  'Two-day international conference',
  'Date reveal in progress',
  'Waitlist opening soon',
]

const whyStats = [
  { value: '2 days', label: 'Talks, conversations, and social ritual' },
  { value: 'Global + local', label: 'Speakers and builders from Kathmandu outward' },
  { value: 'Community-rooted', label: 'Built by the WWKTM ecosystem year-round' },
]

const formatDays = [
  {
    day: 'Day 01',
    title: 'Talks with altitude',
    detail:
      'A concentrated editorial program of web architecture, design systems, AI on the web, developer tooling, product thinking, and open internet questions.',
    moments: ['Opening summit keynote', 'Track sessions', 'Editorial lounge', 'Evening community social'],
  },
  {
    day: 'Day 02',
    title: 'Kathmandu in motion',
    detail:
      'A day shaped around slower conversations, city context, collaborative sessions, and the signature WWKTM social energy that extends beyond the stage.',
    moments: ['Breakfast roundtables', 'Hands-on workshops', 'Community hike / city route', 'Closing dinner'],
  },
]

const speakers = [
  {
    name: 'Akash Adhikari',
    role: 'Hungry Programmer. Literally and metaphorically.',
    image: '/speakers/akash-adhikari.jpeg',
    topic: 'Frontend craft',
    note: 'Part of the original WWKTM speaker roster, representing the maker energy at the heart of the conference.',
  },
  {
    name: 'Chathu Vishwajith',
    role: 'Auth0 Ambassador, ColomboJS',
    image: '/speakers/chathu-vishwajith.jpeg',
    topic: 'Identity and DX',
    note: 'A reminder that the WWKTM room is regional and international by design, not only local.',
  },
  {
    name: 'Denis Radin',
    role: 'JavaScript Engineer at Evolution Gaming. Organizing JSNation, React Amsterdam',
    image: '/speakers/denis-radin.jpeg',
    topic: 'Global web platforms',
    note: 'Signals WWKTM’s ability to connect Kathmandu with major global JavaScript communities.',
  },
  {
    name: 'Oliver Szimmetat',
    role: 'Security Engineering Manager at Uber',
    image: '/speakers/oliver-szimmetat.jpeg',
    topic: 'Security and scale',
    note: 'Adds depth on platform reliability, trust, and web systems that operate beyond demo scale.',
  },
  {
    name: 'Sonika Manandhar',
    role: 'Earthling, Computer Engineer, Space Enthusiast',
    image: '/speakers/sonika-manandhar.jpg',
    topic: 'Internet culture',
    note: 'The kind of interdisciplinary voice that keeps WWKTM from feeling like a narrow developer event.',
  },
  {
    name: 'Tanmay Chaudhry',
    role: 'SRE@Adobe. Server Herder. Golang Stormtrooper. I dev some ops.',
    image: '/speakers/tanmay-chaudhry.jpg',
    topic: 'Platform engineering',
    note: 'Represents the operations and systems layer that sits underneath ambitious web experiences.',
  },
]

const tracks = [
  {
    icon: LayoutGrid,
    title: 'Frontend craft',
    blurb: 'Interfaces, rendering strategies, performance budgets, animation systems, and web-native polish.',
    themes: 'React architecture, motion, accessibility, design-to-code',
  },
  {
    icon: Cpu,
    title: 'Platform engineering',
    blurb: 'The infrastructure, observability, runtime, and scaling decisions behind durable web products.',
    themes: 'Edge delivery, cloud patterns, resilience, reliability',
  },
  {
    icon: Sparkles,
    title: 'AI for the web',
    blurb: 'Practical application of AI in products, workflows, interfaces, search, and content systems.',
    themes: 'Agents, LLM UX, AI-assisted building, automation',
  },
  {
    icon: ScanSearch,
    title: 'Design systems',
    blurb: 'Editorial structure, component logic, tokens, and the craft of making teams faster without losing taste.',
    themes: 'Tokens, systems thinking, brand consistency, tooling',
  },
  {
    icon: ShieldCheck,
    title: 'Open internet',
    blurb: 'Security, privacy, public infrastructure, governance, and the long-term health of the web.',
    themes: 'Trust, standards, governance, internet freedom',
  },
  {
    icon: MessageSquareShare,
    title: 'Developer experience',
    blurb: 'How teams learn, document, collaborate, ship, and sustain momentum as products and communities grow.',
    themes: 'Tooling, docs, team workflows, product engineering',
  },
]

const schedule = [
  {
    time: '09:00',
    dayOne: 'Doors, coffee, summit radio',
    dayTwo: 'Breakfast circles and city departures',
  },
  {
    time: '10:00',
    dayOne: 'Opening keynote: the web from Kathmandu outward',
    dayTwo: 'Workshop labs: AI interfaces, design systems, platform practice',
  },
  {
    time: '11:30',
    dayOne: 'Track sessions across frontend, platform, and internet culture',
    dayTwo: 'Community conversations and maker critiques',
  },
  {
    time: '13:00',
    dayOne: 'Lunch and ecosystem meetups',
    dayTwo: 'Shared meal and partner roundtables',
  },
  {
    time: '14:30',
    dayOne: 'Editorial interviews, panels, and demos',
    dayTwo: 'Kathmandu social experience / signature route',
  },
  {
    time: '17:30',
    dayOne: 'Closing notes and evening social',
    dayTwo: 'Return, reflections, and closing gathering',
  },
]

const supporters = [
  'Web Weekend Kathmandu',
  'BarCamp Kathmandu',
  'AI Conf',
  'Tech Kura Kani',
  'GDG Kathmandu',
  'WordPress Kathmandu',
  'Kathmandu Post',
]

const heroNotes = [
  'Editorial talks and live demos',
  'Builders, designers, and internet operators',
  'A Kathmandu-hosted room with international range',
]

const speakerMoments = [
  'Archive-backed roster',
  'Regional and global voices',
  'Security, systems, frontend, and culture',
]

function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.38em] text-ink/55">
      <span className="h-px w-10 bg-accent" />
      {children}
    </div>
  )
}

function App() {
  const [activeSpeaker, setActiveSpeaker] = useState(speakers[0].name)
  const selectedSpeaker = speakers.find((speaker) => speaker.name === activeSpeaker) ?? speakers[0]

  return (
    <main className="relative overflow-hidden bg-paper text-ink">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_0%,rgba(72,189,240,0.16),transparent_30%),radial-gradient(circle_at_100%_10%,rgba(255,135,87,0.2),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.2),transparent_65%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.18]" />

      <header className="relative z-20 px-5 pt-5 md:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink/10 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
          <a href="#top" className="flex items-center gap-3">
            <img src="/asset_0.jpg" alt="WWKTM mark" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="font-heading text-lg font-bold tracking-[0.18em]">WWKTM</div>
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/50">The Alpine Web Atelier</div>
            </div>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-ink/70 lg:flex">
            <a href="#why-wwktm">Mission</a>
            <a href="#format">Format</a>
            <a href="#speakers">Speakers</a>
            <a href="#community">Community</a>
            <a href="#tickets">Tickets</a>
          </div>
          <a
            href="#tickets"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-accent"
          >
            Register interest
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <section id="top" className="relative min-h-screen px-5 pb-14 pt-10 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="relative z-10 pt-8 md:pt-14">
            <SectionLabel>Hero Summit</SectionLabel>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-accent">
              Kathmandu / Global web culture / Two-day experience
            </p>
            <h1 className="max-w-4xl font-heading text-[clamp(4rem,10vw,8.4rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] text-balance">
              WWKTM builds a sharper room for the modern web.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72 md:text-xl">
              The conference pairs technical depth with social texture: talks, critique, community ritual, and a
              distinct Kathmandu point of view on where the web goes next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {meta.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-ink/10 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-ink/72 shadow-soft"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#tickets"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-ink"
              >
                Join the waitlist
                <Tickets className="h-4 w-4" />
              </a>
              <a
                href="#schedule"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-ink transition hover:border-accent hover:text-accent"
              >
                View schedule preview
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-4 md:max-w-2xl md:grid-cols-3">
              {heroNotes.map((item, index) => (
                <div key={item} className="rounded-[1.8rem] border border-ink/8 bg-white/85 px-5 py-5 shadow-soft backdrop-blur">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">0{index + 1}</div>
                  <p className="mt-3 text-sm leading-6 text-ink/66">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-[40rem] items-center justify-center lg:justify-end"
          >
            <div className="absolute -left-6 top-16 hidden h-32 w-32 rounded-[2rem] border border-skyline/25 bg-white/60 shadow-soft md:block" />
            <div className="absolute -right-4 bottom-14 hidden h-24 w-24 rounded-[1.8rem] border border-accent/25 bg-accent/10 shadow-soft md:block" />
            <div className="relative w-full rounded-[2.8rem] border border-ink/8 bg-white/88 p-5 shadow-hero backdrop-blur">
              <div className="absolute inset-0 rounded-[2.8rem] bg-[linear-gradient(145deg,rgba(72,189,240,0.14),transparent_38%),linear-gradient(325deg,rgba(255,135,87,0.12),transparent_34%)]" />
              <div className="relative grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="overflow-hidden rounded-[2.2rem] bg-ink p-6 text-white">
                  <div className="flex items-center justify-between text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-white/72">
                    <span>WWKTM 2026</span>
                    <span>Kathmandu</span>
                  </div>
                  <div className="mt-10 rounded-[1.8rem] bg-white/8 px-6 py-8">
                    <img src="/asset_0.jpg" alt="WWKTM summit mark" className="mx-auto h-40 w-40 object-contain" />
                  </div>
                  <div className="mt-8 space-y-3">
                    <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">Visual anchor</p>
                    <p className="font-heading text-3xl font-bold uppercase leading-none tracking-[-0.04em]">
                      A cleaner mark-led hero.
                    </p>
                    <p className="text-sm leading-7 text-white/72">
                      The identity now carries the section instead of forcing a generic conference photo into the lead.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[2.2rem] border border-ink/8 bg-paper px-6 py-6">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">Program stance</p>
                      <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-ink/55 shadow-soft">
                        Editorial
                      </span>
                    </div>
                    <p className="mt-4 font-heading text-[2.25rem] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-ink">
                      Talks with context, not conference clutter.
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-7 text-ink/66">
                      WWKTM feels more premium when the hero behaves like a cover page: one symbol, one thesis, and a
                      clear entry path into the program.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.8rem] border border-ink/8 bg-white px-5 py-5">
                      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-accent">Format</p>
                      <p className="mt-3 text-sm leading-7 text-ink/66">
                        Keynotes, live demos, workshops, and social exchange over two days.
                      </p>
                    </div>
                    <div className="rounded-[1.8rem] border border-ink/8 bg-white px-5 py-5">
                      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-accent">Audience</p>
                      <p className="mt-3 text-sm leading-7 text-ink/66">
                        Engineers, designers, operators, and internet-minded builders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/8 bg-ink py-4 text-paper">
        <div className="marquee flex gap-6 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.35em]">
          {['Frontend craft', 'Design systems', 'AI on the web', 'Platform engineering', 'Open internet', 'Internet culture'].map(
            (item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-6">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ),
          )}
        </div>
      </section>

      <section id="why-wwktm" className="relative px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionLabel>Why WWKTM</SectionLabel>
            <h2 className="max-w-3xl font-heading text-[clamp(2.8rem,6vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
              From Kathmandu to the world, this is where the web meets community memory.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
              WWKTM exists to connect web technologists, designers, builders, and internet thinkers through stories,
              collaboration, and perspective. The conference is not positioned like a corporate developer summit; it
              behaves more like a cultural-tech festival with clarity, hospitality, and serious technical range.
            </p>
            <blockquote className="mt-10 max-w-2xl border-l-4 border-accent pl-6 font-heading text-2xl leading-10 text-ink">
              “Web Weekend aims to connect web technologists throughout the world.”
            </blockquote>
          </div>

          <div className="relative space-y-5">
            <div className="diagonal-panel rounded-[2.1rem] bg-white p-7 shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Mission note</p>
              <p className="mt-4 text-base leading-8 text-ink/72">
                The original WWKTM format paired global storytelling on one day with a second day of getting to know
                each other through shared experience. That DNA still defines the brand.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {whyStats.map((stat) => (
                <div key={stat.value} className="rounded-[1.8rem] border border-ink/8 bg-white px-6 py-5 shadow-soft">
                  <div className="font-heading text-3xl font-bold uppercase tracking-[-0.03em]">{stat.value}</div>
                  <p className="mt-2 text-sm leading-6 text-ink/62">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="format" className="bg-white px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <SectionLabel>Two-Day Format</SectionLabel>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-[clamp(2.6rem,5vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                A sharp first day, then a wider social field.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
                WWKTM is designed as a two-day experience that balances deep talks with human context. The structure
                keeps the conference premium, breathable, and unmistakably community-driven.
              </p>
            </div>
            <div className="text-sm font-bold uppercase tracking-[0.28em] text-ink/42">
              Talks / city / collaboration / community ritual
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {formatDays.map((item, index) => (
              <motion.article
                key={item.day}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28 }}
                className={cn(
                  'relative overflow-hidden rounded-[2.5rem] border border-ink/8 p-8 shadow-soft',
                  index === 0 ? 'bg-paper' : 'bg-[linear-gradient(160deg,#EAF6FD_0%,#FFF4EF_100%)]',
                )}
              >
                <div className="absolute right-6 top-6 h-16 w-16 rounded-[1.6rem] border border-ink/8 bg-white/80" />
                <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-accent">{item.day}</p>
                <h3 className="mt-4 font-heading text-4xl font-bold uppercase leading-none tracking-[-0.04em]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-ink/70">{item.detail}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {item.moments.map((moment) => (
                    <span
                      key={moment}
                      className="inline-flex rounded-full border border-ink/10 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/68"
                    >
                      {moment}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="speakers" className="px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <SectionLabel>Speaker Lineup</SectionLabel>
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,4.6rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                A lineup with real archive weight.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
                The speaker section now reads more like a curated program board: a live roster, one active profile,
                and community signals that show how WWKTM convenes beyond a single stage.
              </p>
            </div>
            <div className="max-w-sm rounded-[1.8rem] border border-ink/8 bg-white/80 px-5 py-5 text-sm leading-7 text-ink/58 shadow-soft">
              2026 names are still pending. The lineup uses confirmed speakers from WWKTM history to communicate
              caliber, range, and the kind of conversation the conference already knows how to host.
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.4rem] border border-ink/8 bg-white/90 p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">Program board</p>
                  <p className="mt-2 text-sm leading-6 text-ink/56">Select a speaker to read the archive note.</p>
                </div>
                <Mic2 className="h-5 w-5 text-ink/35" />
              </div>

              <div className="mt-6 space-y-3">
                {speakers.map((speaker, index) => (
                  <button
                    key={speaker.name}
                    type="button"
                    onClick={() => setActiveSpeaker(speaker.name)}
                    className={cn(
                      'flex w-full items-center gap-4 rounded-[1.8rem] border px-4 py-4 text-left transition duration-300 hover:-translate-y-1',
                      activeSpeaker === speaker.name
                        ? 'border-accent/45 bg-[linear-gradient(135deg,rgba(255,135,87,0.12),rgba(72,189,240,0.08))] shadow-soft'
                        : 'border-ink/8 bg-paper hover:border-ink/16 hover:bg-white',
                    )}
                  >
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-ink/32">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-16 w-16 rounded-[1.2rem] object-cover object-top"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-2xl font-bold uppercase leading-none tracking-[-0.04em]">
                          {speaker.name}
                        </h3>
                        <span className="rounded-full bg-white px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-skyline shadow-soft">
                          {speaker.topic}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink/62">{speaker.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2.4rem] border border-ink/8 bg-ink p-8 text-white shadow-hero">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSpeaker.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">
                          Featured speaker
                        </div>
                        <h3 className="mt-4 font-heading text-4xl font-bold uppercase leading-none tracking-[-0.04em]">
                          {selectedSpeaker.name}
                        </h3>
                      </div>
                      <div className="rounded-full border border-white/12 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-white/65">
                        {selectedSpeaker.topic}
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
                      <img
                        src={selectedSpeaker.image}
                        alt={selectedSpeaker.name}
                        className="h-72 w-full rounded-[2rem] object-cover object-top"
                      />
                      <div>
                        <p className="text-base leading-8 text-white/75">{selectedSpeaker.role}</p>
                        <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/62">
                          {selectedSpeaker.note}
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {speakerMoments.map((item) => (
                            <div
                              key={item}
                              className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/68"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid gap-6 md:grid-cols-[0.94fr_1.06fr]">
                <div className="rounded-[2rem] border border-ink/8 bg-white p-6 shadow-soft">
                  <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">Community adjacency</p>
                  <p className="mt-4 text-sm leading-7 text-ink/64">
                    WWKTM speakers sit inside a wider Kathmandu technology network, which is part of why the lineup
                    feels more textured than a standard conference roster.
                  </p>
                  <div className="mt-6 space-y-4 rounded-[1.6rem] bg-paper p-4">
                    <img
                      src="/Users/prabinpant/Documents/projects/arbyte/prompt2site/temp-uploads/asset_1774252941707_3d4rrd.jpg"
                      alt="AI Conf wordmark"
                      className="h-10 w-auto object-contain"
                    />
                    <img
                      src="/Users/prabinpant/Documents/projects/arbyte/prompt2site/temp-uploads/asset_1774252941902_tqgsw.jpg"
                      alt="BarCamp Kathmandu wordmark"
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-ink/8 bg-[linear-gradient(145deg,#FFFFFF_0%,#EEF8FD_52%,#FFF5EF_100%)] p-6 shadow-soft">
                  <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-accent">Lineup read</p>
                  <p className="mt-4 font-heading text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] text-ink">
                    Less gallery, more editorial roster.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink/64">
                    This composition makes the section easier to scan on first pass while still keeping one speaker in
                    focus for depth and context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <SectionLabel>Web Tracks</SectionLabel>
          <h2 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
            A programming system that maps the full surface of the modern web.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Each track is designed to hold a distinct conversation while still feeling part of one larger editorial
            thesis about where the web is headed.
          </p>

          <div className="mt-12 grid auto-rows-[1fr] gap-5 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <div
                key={track.title}
                className={cn(
                  'track-card rounded-[2rem] border border-ink/8 p-6 shadow-soft',
                  index % 3 === 0 && 'bg-paper',
                  index % 3 === 1 && 'bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F8FC_100%)]',
                  index % 3 === 2 && 'bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF4EF_100%)]',
                )}
              >
                <track.icon className="h-10 w-10 text-accent" />
                <h3 className="mt-8 font-heading text-3xl font-bold uppercase leading-none tracking-[-0.04em]">
                  {track.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-ink/70">{track.blurb}</p>
                <div className="mt-8 border-t border-ink/10 pt-4 text-xs font-bold uppercase tracking-[0.22em] text-ink/50">
                  Sample themes
                </div>
                <p className="mt-3 text-sm leading-7 text-ink/62">{track.themes}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="community" className="relative overflow-hidden px-5 py-24 md:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(72,189,240,0.08),transparent_40%),linear-gradient(320deg,rgba(255,135,87,0.12),transparent_30%)]" />
        <Reveal className="relative mx-auto max-w-7xl">
          <SectionLabel>Community Network</SectionLabel>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                WWKTM is the flagship node in a living event ecosystem.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
                BarCamp Kathmandu, AI Conf, and Tech Kura Kani make the community visible throughout the year. The
                conference becomes stronger because it is not the only moment that exists.
              </p>
            </div>
            <div className="max-w-sm text-sm leading-7 text-ink/55">
              Official visual references were pulled from WWKTM properties so the ecosystem rail reflects the actual
              brand family instead of generic placeholders.
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_1.05fr_0.9fr_1fr]">
            <div className="network-tile rounded-[2rem] bg-white p-6 shadow-soft">
              <img src="/wwktm-logo.png" alt="WWKTM logo" className="h-12 w-auto object-contain" />
              <p className="mt-10 text-sm font-bold uppercase tracking-[0.22em] text-accent">Flagship conference</p>
              <p className="mt-3 text-base leading-8 text-ink/68">
                The summit format for web technologies and everything around the web, anchored in Kathmandu and built
                for an international audience.
              </p>
            </div>
            <div className="network-tile rounded-[2rem] bg-white p-6 shadow-soft">
              <img
                src="/barcamp-kathmandu-logo-new.jpg"
                alt="BarCamp Kathmandu logo"
                className="h-12 w-auto max-w-full object-contain"
              />
              <p className="mt-10 text-sm font-bold uppercase tracking-[0.22em] text-accent">Community-powered</p>
              <p className="mt-3 text-base leading-8 text-ink/68">
                The unconference sibling. “Show Up. Speak Up.” is a different format, but it proves the same communal
                energy can sustain technical exchange.
              </p>
            </div>
            <div className="network-tile rounded-[2rem] bg-ink p-6 text-white shadow-hero">
              <img src="/aiconf-logo-new.jpg" alt="AI Conf logo" className="h-12 w-auto max-w-full object-contain" />
              <p className="mt-10 text-sm font-bold uppercase tracking-[0.22em] text-accent">Next chapter</p>
              <p className="mt-3 text-base leading-8 text-white/72">
                AI Conf 2026 extends the WWKTM community into applied AI for engineers, designers, and builders in
                Kathmandu.
              </p>
            </div>
            <div className="network-tile overflow-hidden rounded-[2rem] bg-white shadow-soft">
              <img src="/tkk-photo.jpeg" alt="Tech Kura Kani community" className="h-40 w-full object-cover" />
              <div className="p-6">
                <div className="font-heading text-4xl font-bold uppercase leading-none tracking-[-0.04em]">TKK</div>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-accent">Tech Kura Kani</p>
                <p className="mt-4 text-base leading-8 text-ink/68">
                  The recurring conversation layer: a community meetup format that keeps ideas moving between the major
                  events.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="schedule" className="bg-ink px-5 py-24 text-white md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <SectionLabel>Schedule Preview</SectionLabel>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                A fast read on pacing, not an overload of logistics.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                The schedule board behaves more like a newspaper-travel hybrid: clear rhythm, strong markers, and just
                enough detail to understand the two-day arc.
              </p>
            </div>
            <div className="text-sm font-bold uppercase tracking-[0.28em] text-white/45">
              Preview state / full schedule to follow
            </div>
          </div>

          <div className="mt-12 overflow-x-auto rounded-[2.3rem] border border-white/10 bg-white/6 shadow-hero">
            <div className="min-w-[48rem]">
              <div className="grid grid-cols-[120px_1fr_1fr] border-b border-white/10 text-xs font-extrabold uppercase tracking-[0.28em] text-white/45">
                <div className="sticky left-0 bg-ink/95 px-5 py-4 backdrop-blur">Time</div>
                <div className="px-5 py-4">Day 01 / Talks</div>
                <div className="px-5 py-4">Day 02 / Social + workshops</div>
              </div>
              {schedule.map((item) => (
                <div key={item.time} className="grid grid-cols-[120px_1fr_1fr] border-b border-white/8 last:border-b-0">
                  <div className="sticky left-0 flex items-center bg-ink/95 px-5 py-6 text-lg font-heading font-bold uppercase tracking-[0.06em] backdrop-blur">
                    {item.time}
                  </div>
                  <div className="px-5 py-6">
                    <span className="mb-3 inline-flex rounded-full bg-accent/18 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-accent">
                      Day 01
                    </span>
                    <p className="max-w-md text-base leading-8 text-white/78">{item.dayOne}</p>
                  </div>
                  <div className="px-5 py-6">
                    <span className="mb-3 inline-flex rounded-full bg-skyline/18 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-skyline">
                      Day 02
                    </span>
                    <p className="max-w-md text-base leading-8 text-white/78">{item.dayTwo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionLabel>Venue And City</SectionLabel>
            <h2 className="max-w-xl font-heading text-[clamp(2.7rem,5vw,4.3rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
              Kathmandu is part of the conference, not just the backdrop.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
              A global web conference in Nepal lands differently. Hospitality, pace, and perspective become part of
              the value. WWKTM leans into that rather than flattening it away.
            </p>
            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4">
                <MapPinned className="mt-1 h-5 w-5 text-accent" />
                <p className="text-base leading-8 text-ink/68">
                  Kathmandu, Nepal. Easy to orient around, rich in context, and memorable beyond the venue walls.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <CalendarDays className="mt-1 h-5 w-5 text-accent" />
                <p className="text-base leading-8 text-ink/68">
                  Two days designed to combine talks, local hospitality, and the signature WWKTM social experience.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="mt-1 h-5 w-5 text-accent" />
                <p className="text-base leading-8 text-ink/68">
                  An international web audience meets a city with its own point of view on technology, growth, and
                  community.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 h-32 w-14 -skew-x-[20deg] rounded-[1.6rem] bg-skyline shadow-soft md:-left-8" />
            <div className="absolute right-8 top-0 h-24 w-12 -skew-x-[20deg] rounded-[1.4rem] bg-accent shadow-soft" />
            <img
              src="/community-group.jpeg"
              alt="WWKTM community gathering"
              className="relative z-10 h-[36rem] w-full rounded-[2.8rem] object-cover shadow-hero"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <SectionLabel>Partners And Sponsors</SectionLabel>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,4.2rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                Collaborators who make exchange possible.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
                Sponsors at WWKTM should feel like enablers of knowledge exchange, local growth, and international
                connection rather than generic logo clutter.
              </p>
            </div>
            <div className="rounded-[1.8rem] bg-accent px-5 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white">
              Partner story format available
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supporters.map((name) => (
              <div
                key={name}
                className="flex min-h-[7rem] items-center justify-center rounded-[1.8rem] border border-ink/8 bg-paper px-5 py-6 text-center font-heading text-2xl font-bold uppercase tracking-[-0.03em] text-ink shadow-soft"
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="tickets" className="px-5 py-24 md:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-7xl rounded-[3rem] bg-ink px-6 py-10 text-white shadow-hero md:px-10 md:py-12">
          <SectionLabel>Tickets And Updates</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <h2 className="max-w-2xl font-heading text-[clamp(2.8rem,5vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                Secure your place before the next reveal.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
                Keep the conversion state clear: early bird when it opens, sold out when it’s gone, waitlist when the
                room is full. For now, the smart move is to join the update list.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_0.92fr]">
              <div className="rounded-[2rem] bg-white p-6 text-ink shadow-soft">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-accent">Current state</p>
                  <BadgeCheck className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-6 font-heading text-4xl font-bold uppercase leading-none tracking-[-0.04em]">
                  Waitlist
                </h3>
                <p className="mt-4 text-base leading-8 text-ink/68">
                  Ticket tiers, partner releases, and confirmed dates will be announced in sequence. Register interest
                  now to be first in line.
                </p>
                <a
                  href="mailto:hello@wwktm.com?subject=WWKTM%20Waitlist"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-ink"
                >
                  Join via email
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
                <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-skyline">Update rail</p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-white/72">
                  <p>Early bird: announced soon</p>
                  <p>Community updates: rolling</p>
                  <p>Newsletter cadence: only meaningful releases</p>
                </div>
                <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                  Prefer community chat? community.wwktm.com
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-ink/8 px-5 py-10 text-sm text-ink/55 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-bold uppercase tracking-[0.22em]">WWKTM / Kathmandu, Nepal / Community-first web culture</p>
          <p>
            Research references: wwktm.com/2018, barcamp.wwktm.com, ai.wwktm.com/2026, and official WWKTM community
            media.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
