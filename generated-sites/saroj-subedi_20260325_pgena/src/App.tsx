import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  CloudCog,
  Code2,
  Cpu,
  Gauge,
  Globe,
  Mail,
  MapPin,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const portraitUrl = 'https://ersaroj.com.np/images/portrait.png'

const navItems = [
  { label: 'Profile', href: '#profile' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Connect', href: '#connect' },
]

const metrics = [
  { value: '700K+', label: 'monthly users', detail: 'through Plantura commerce systems' },
  { value: '9+', label: 'years building', detail: 'web products, teams, and architecture' },
  { value: '40+', label: 'projects shipped', detail: 'delivery across Nepal, Australia, and Germany' },
]

const capabilities = [
  {
    title: 'Shopify systems',
    body: 'Custom Shopify apps, functions, checkout extensibility, and conversion-focused storefront architecture for high-volume merchants.',
    icon: ShoppingCart,
  },
  {
    title: 'Architecture',
    body: 'ERP, CRM, and middleware engineering across Node.js, React, Remix, AWS, Cloudflare, and legacy modernization work.',
    icon: Cpu,
  },
  {
    title: 'Performance',
    body: 'Core Web Vitals, database optimization, server-side tracking, CI/CD, testing, and practical reliability at scale.',
    icon: Gauge,
  },
  {
    title: 'Native experiments',
    body: 'Swift/macOS side projects built around everyday utility, calm UX, and lightweight system-level performance.',
    icon: BrainCircuit,
  },
]

const interests = [
  'Solving hard product problems with direct, maintainable systems.',
  'Shipping working software instead of letting ideas sit in design limbo.',
  'Mentoring, code review, and helping teams make clearer technical decisions.',
  'Native macOS hobby work around calendars, focus, and healthier computing habits.',
]

const projects = [
  {
    name: 'Order Undo',
    type: 'Published Shopify app',
    href: 'https://apps.shopify.com/order-undo',
    summary:
      'A conversion-recovery app that lets customers edit or cancel orders after purchase, cutting support load while improving retention.',
    stack: ['Shopify', 'React', 'RemixJS', 'Checkout', 'Customer Accounts'],
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Retail packaging and order preparation workspace',
  },
  {
    name: 'Mac Patro',
    type: 'Open-source macOS utility',
    href: 'https://github.com/ntn0de/mac-patro-native',
    summary:
      'A lightweight native Nepali date app for the macOS menu bar, built for fast system integration and everyday usefulness.',
    stack: ['Swift', 'macOS', 'AppKit', 'Menu Bar'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Close-up of a laptop workspace used for building native apps',
  },
  {
    name: 'Blink Reminder',
    type: 'Open-source eye-care app',
    href: 'https://github.com/ntn0de/blink-reminder',
    summary:
      'A minimal menu bar app for the 20-20-20 rule with overlay and notification modes, designed to reduce digital eye strain.',
    stack: ['Swift', 'macOS', 'Wellbeing', 'Homebrew'],
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    alt: 'Creative workstation with screens and ambient lighting',
  },
]

const experience = [
  {
    period: '03/2023 - Present',
    location: 'Munich, Germany',
    role: 'Software Developer (Web)',
    company: 'Plantura GmbH',
    detail:
      'Maintains a Shopify commerce stack serving 700K+ monthly users, builds custom apps and order flows with React and Node.js, integrates ERP and mobile APIs, and supports CI/CD plus Playwright end-to-end coverage across multiple locales.',
  },
  {
    period: '04/2020 - 11/2022',
    location: 'Sydney, Australia',
    role: 'Developer Team Lead',
    company: 'Performance PODs',
    detail:
      'Led delivery across Laravel, React, AWS, WordPress, and Shopify projects while mentoring developers, guiding design decisions, and coordinating distributed product work.',
  },
  {
    period: '2016 - 2021',
    location: 'Kathmandu and Lalitpur, Nepal',
    role: 'Builder across consulting, backend, QA, and web development roles',
    company: 'B Technology, Genesis Web Technology, EIS Nepal, Phi L’Agence',
    detail:
      'Worked across e-commerce, school management, Laravel, Vue, Java Spring Boot, WordPress, API integrations, and performance improvements before moving into larger architecture and leadership responsibilities.',
  },
]

const links = [
  { label: 'Website', href: 'https://ersaroj.com.np', detail: 'official portfolio', icon: Globe },
  { label: 'GitHub', href: 'https://github.com/ntn0de', detail: 'open-source work', icon: Code2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sarojsubedi/', detail: 'career profile', icon: BriefcaseBusiness },
  { label: 'Email', href: 'mailto:hello@ersaroj.com.np', detail: 'project inquiries', icon: Mail },
]

function SectionLead({
  kicker,
  title,
  body,
}: {
  kicker: string
  title: string
  body: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="max-w-3xl"
    >
      <p className="eyebrow">{kicker}</p>
      <h2 className="mt-5 max-w-4xl font-heading text-4xl uppercase leading-[0.92] tracking-[0.04em] text-text md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">{body}</p>
    </motion.div>
  )
}

function App() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.92])
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 90])

  return (
    <main className="relative overflow-hidden bg-background text-text">
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <div className="pointer-events-none absolute inset-0 bg-circuit-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-30" />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between border border-line bg-background/82 px-4 py-3 backdrop-blur-md md:px-5">
          <div>
            <p className="font-heading text-lg uppercase tracking-[0.2em] text-text">Saroj Subedi</p>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">retro systems dossier</p>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-[0.28em] text-muted transition-colors duration-300 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section className="relative min-h-screen border-b border-line pt-24">
        <div className="absolute inset-x-0 top-0 h-[72vh] bg-[radial-gradient(circle_at_top_left,rgba(255,77,109,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,245,212,0.2),transparent_30%),linear-gradient(180deg,rgba(7,11,20,0.2),rgba(7,11,20,0.95))]" />

        <div className="relative grid min-h-[calc(100vh-6rem)] lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
          <div className="flex items-center px-6 py-12 md:px-10 lg:px-14">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <p className="eyebrow">Visual thesis / retro cyborg control deck</p>
              <h1 className="mt-5 max-w-5xl font-heading text-[3.3rem] uppercase leading-[0.84] tracking-[0.04em] text-text sm:text-[4.8rem] lg:text-[7rem]">
                Saroj
                <br />
                builds
                <br />
                growth systems.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-soft md:text-2xl">
                Technical architect and product engineer focused on Shopify scale, resilient integrations, and native macOS side projects.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
                Based on his official profile and public work, Saroj Subedi combines commerce engineering, performance tuning, and practical product thinking with a steady interest in utility-driven software.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#projects" className="action-button action-button--primary">
                  Explore projects
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#connect" className="action-button">
                  Contact links
                </a>
              </div>

              <div className="mt-14 grid gap-3 md:grid-cols-3">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.12 + index * 0.08, ease: 'easeOut' }}
                    className="border border-line bg-panel px-4 py-5"
                  >
                    <p className="font-heading text-4xl uppercase tracking-[0.08em] text-accent">{metric.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-text">{metric.label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{metric.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div style={{ scale: heroScale, y: heroY }} className="relative overflow-hidden border-l border-line">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,77,109,0.16),transparent_38%),linear-gradient(135deg,rgba(0,245,212,0.18),transparent_58%),linear-gradient(180deg,rgba(7,11,20,0.1),rgba(7,11,20,0.9))]" />
            <img
              src={portraitUrl}
              alt="Portrait of Saroj Subedi"
              className="h-full min-h-[540px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.06),rgba(7,11,20,0.55)_55%,rgba(7,11,20,0.95))]" />
            <div className="absolute left-0 top-0 h-28 w-28 bg-accent" />
            <div className="absolute bottom-0 right-0 h-32 w-32 bg-highlight" />
            <div className="absolute bottom-8 left-8 max-w-sm border border-line bg-background/78 p-5 backdrop-blur-sm">
              <p className="eyebrow">Primary focus</p>
              <p className="mt-3 text-lg leading-7 text-text">
                Shopify apps, ERP integrations, checkout systems, and performance engineering for fast-moving commerce teams.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="profile" className="section-shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <SectionLead
            kicker="Profile"
            title="One engineer. Two lanes. Client scale and personal utilities."
            body="The public record shows a developer comfortable with high-traffic commerce systems by day and focused, human-scale side projects by habit. That mix defines the site’s direction."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="border border-line bg-panel p-6"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <div>
                  <p className="eyebrow">Base</p>
                  <p className="mt-1 text-base text-text">Munich, Germany</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Blocks className="h-4 w-4 text-highlight" />
                <div>
                  <p className="eyebrow">Current role</p>
                  <p className="mt-1 text-base text-text">Software Developer (Web), Plantura GmbH</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CloudCog className="h-4 w-4 text-accent" />
                <div>
                  <p className="eyebrow">Academic base</p>
                  <p className="mt-1 text-base text-text">B.E. Computer Engineering, Himalaya College of Engineering</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
          {capabilities.map(({ title, body, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="bg-panel px-6 py-8"
            >
              <Icon className="h-7 w-7 text-accent" />
              <h3 className="mt-6 font-heading text-2xl uppercase tracking-[0.08em] text-text">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="bg-panel px-6 py-8 md:px-8">
            <p className="eyebrow">Interests and habits</p>
            <div className="mt-6 space-y-6">
              {interests.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                  className="border-t border-line pt-6 first:border-t-0 first:pt-0"
                >
                  <p className="text-xl leading-8 text-text md:text-2xl">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative min-h-[28rem] overflow-hidden bg-[#0f1729]"
          >
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Circuit board and cybernetic hardware detail"
              className="h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,20,0.25),rgba(7,11,20,0.92)),linear-gradient(180deg,transparent,rgba(255,77,109,0.22))]" />
            <div className="absolute left-6 top-6 w-16 border-t-4 border-accent" />
            <div className="absolute bottom-6 right-6 w-16 border-b-4 border-highlight" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="eyebrow">Interaction thesis</p>
              <p className="mt-3 max-w-sm text-lg leading-7 text-text">
                Large image planes, rigid color blocks, and scroll-based reveals keep the page feeling mechanical instead of ornamental.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="border-y border-line py-24 md:py-32">
        <div className="section-shell grid gap-14 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLead
              kicker="Projects"
              title="Public work with narrative weight."
              body="Each project below reflects a different side of Saroj’s practice: merchant operations, native utility, and wellbeing-driven software."
            />
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
                className="grid gap-px border border-line bg-line xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)]"
              >
                <div className="relative min-h-[26rem] overflow-hidden bg-[#111827]">
                  <img src={project.image} alt={project.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.16),rgba(7,11,20,0.74))]" />
                  <div className={cn('absolute top-0 h-20 w-20', index % 2 === 0 ? 'left-0 bg-accent' : 'right-0 bg-highlight')} />
                </div>

                <div className="bg-panel px-6 py-8 md:px-8 md:py-10">
                  <p className="eyebrow">{project.type}</p>
                  <h3 className="mt-4 font-heading text-4xl uppercase leading-none tracking-[0.08em] text-text md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg">{project.summary}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.stack.map((tag) => (
                      <span key={tag} className="border border-line bg-background px-3 py-2 text-xs uppercase tracking-[0.24em] text-soft">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={project.href} target="_blank" rel="noreferrer" className="action-link mt-10 inline-flex">
                    Open project
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-shell py-24 md:py-32">
        <SectionLead
          kicker="Experience"
          title="A path from Nepal web builds to multinational commerce infrastructure."
          body="The timeline below compresses the official experience into the throughline that matters most: increasing technical scope, broader systems responsibility, and stronger product judgment."
        />

        <div className="mt-14 space-y-px border border-line bg-line">
          {experience.map((item, index) => (
            <motion.article
              key={item.role}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="grid gap-8 bg-panel px-6 py-8 md:grid-cols-[220px_minmax(0,1fr)] md:px-8"
            >
              <div>
                <p className="font-heading text-xl uppercase tracking-[0.08em] text-accent">{item.period}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">{item.location}</p>
              </div>
              <div>
                <h3 className="font-heading text-3xl uppercase leading-tight tracking-[0.06em] text-text">{item.role}</h3>
                <p className="mt-3 text-lg text-soft">{item.company}</p>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted">{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="connect" className="border-t border-line pb-20 pt-24 md:pb-24 md:pt-28">
        <div className="section-shell">
          <div className="grid gap-px border border-line bg-line xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="relative overflow-hidden bg-panel px-6 py-10 md:px-10 md:py-14">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,77,109,0.12),transparent_40%),linear-gradient(180deg,transparent,rgba(0,245,212,0.08))]" />
              <div className="relative">
                <SectionLead
                  kicker="Connect"
                  title="Ready for selective builds and serious technical problem solving."
                  body="The official site positions Saroj as available for select projects. This page keeps that focus, then routes directly to the channels already attached to his public identity."
                />
                <div className="mt-10 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-soft">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Research basis: official site, public GitHub profile, and public project repositories.
                </div>
              </div>
            </div>

            <div className="bg-background px-6 py-8 md:px-8 md:py-10">
              <div className="space-y-4">
                {links.map(({ label, href, detail, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="group flex items-center justify-between border border-line bg-panel px-5 py-4 transition-colors duration-300 hover:border-accent"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-text">{label}</p>
                        <p className="mt-1 text-sm text-muted">{detail}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
