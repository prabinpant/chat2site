import { motion } from 'framer-motion'
import { ArrowUpRight, Braces, Code2, Globe, Link2, MapPin } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const aboutBlocks = [
  'Currently working at Plantura.',
  'Likes solving problems and building things.',
  'Currently building Nepali Calendar App for the Mac.',
  'Happy to help when asked about anything.',
]

const workItems = [
  {
    name: 'mac-patro-native',
    href: 'https://github.com/ntn0de/mac-patro-native',
    summary: 'Nepali calendar for Mac',
    language: 'Swift',
    stars: '7',
    updated: 'Updated Jan 2, 2026',
  },
  {
    name: 'hamro-patro-scraper',
    href: 'https://github.com/ntn0de/hamro-patro-scraper',
    summary: 'TypeScript repository',
    language: 'TypeScript',
    stars: '3',
    updated: 'Updated Jan 13, 2026',
  },
  {
    name: 'blink-reminder',
    href: 'https://github.com/ntn0de/blink-reminder',
    summary: 'eye-care menu bar app',
    language: 'Swift',
    stars: '2',
    updated: 'Updated Feb 27, 2026',
  },
]

const connectLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ntn0de',
    detail: 'github.com/ntn0de',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sarojsubedi',
    detail: 'linkedin.com/in/sarojsubedi',
    icon: Link2,
  },
  {
    label: 'Website',
    href: 'https://ersaroj.com.np',
    detail: 'ersaroj.com.np',
    icon: Globe,
  },
]

function SectionIntro({
  label,
  title,
  body,
}: {
  label: string
  title: string
  body?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="max-w-3xl"
    >
      <p className="micro-label">{label}</p>
      <h2 className="mt-5 font-heading text-3xl tracking-[-0.04em] text-text md:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
          {body}
        </p>
      ) : null}
    </motion.div>
  )
}

function App() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80"
            alt="Minimal developer workspace"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,17,23,0.96)_0%,rgba(13,17,23,0.92)_45%,rgba(13,17,23,0.84)_100%)]" />
          <div className="absolute inset-0 bg-grain" />
        </div>

        <div className="section-shell relative flex min-h-screen items-center py-10">
          <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.4fr)_320px] lg:gap-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-4xl self-center"
            >
              <div className="mb-12 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/70 shadow-lift">
                  <Braces className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="micro-label">Saroj Subedi</p>
                  <p className="mt-1 text-sm text-muted">going slow and steady</p>
                </div>
              </div>

              <p className="micro-label">Intro</p>
              <h1 className="mt-5 max-w-4xl font-heading text-5xl leading-[0.94] tracking-[-0.06em] text-text sm:text-6xl lg:text-[5.8rem]">
                Hi , I&apos;m Saroj
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#c2cad3] md:text-xl">
                A passionate Software Developer from Nepal
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">
                Saroj Subedi is a calm, capable software developer focused on practical building with a measured pace.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-5 py-3 font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Selected work
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#connect"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-medium text-text transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Connect
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
              className="flex flex-col justify-end border border-line bg-surface/70 p-6 backdrop-blur-sm"
            >
              <div className="space-y-8">
                <div>
                  <p className="micro-label">Location</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-text">
                    <MapPin className="h-4 w-4 text-accent" />
                    Munich, Germany
                  </p>
                </div>
                <div>
                  <p className="micro-label">Current company</p>
                  <p className="mt-3 text-sm text-text">Plantura</p>
                </div>
                <div>
                  <p className="micro-label">Profile links</p>
                  <div className="mt-4 space-y-3">
                    {connectLinks.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border-b border-line pb-3 text-sm text-[#c2cad3] transition-colors duration-300 hover:text-accent"
                      >
                        <span>{label}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-line py-24 md:py-32">
        <div className="section-shell">
          <SectionIntro
            label="About"
            title="A precise public profile, kept intentionally simple."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div>
              {aboutBlocks.map((item, index) => (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={fadeUp}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                  className="py-7"
                >
                  <div className="divider-line" />
                  <p className="pt-7 text-xl leading-9 text-text md:text-2xl">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative overflow-hidden border border-line bg-surface/60"
            >
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80"
                alt="Quiet software building environment"
                className="h-[520px] w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,17,23,0.08),rgba(13,17,23,0.78))]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="micro-label">Profile sentiment</p>
                <p className="mt-3 max-w-xs text-lg leading-7 text-text">
                  going slow and steady
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-line py-24 md:py-32">
        <div className="section-shell">
          <SectionIntro
            label="Work"
            title="Selected repository references from GitHub."
            body="A narrow look at practical software building through public repositories rather than an exhaustive portfolio."
          />

          <div className="mt-16">
            {workItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                className="group block border-t border-line py-6 last:border-b"
              >
                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-mono text-lg text-text md:text-xl">{item.name}</h3>
                      <span className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                        {item.language}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#c2cad3]">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-muted">
                    <span>{item.stars} stars</span>
                    <span>{item.updated}</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="connect" className="border-t border-line py-24 md:py-32">
        <div className="section-shell">
          <div className="relative overflow-hidden border border-line bg-surface/70">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
              alt="Calm desktop setup"
              className="absolute inset-0 h-full w-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,27,34,0.9),rgba(13,17,23,0.98))]" />

            <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-end">
              <SectionIntro
                label="Connect"
                title="Direct paths to GitHub, LinkedIn, and the website."
                body="A clean handoff to the public profiles already associated with Saroj Subedi."
              />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="space-y-4"
              >
                {connectLinks.map(({ label, href, detail, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      'group flex items-center justify-between border border-line px-5 py-4 transition-colors duration-300',
                      'hover:border-accent hover:bg-background/40',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-text">{label}</p>
                        <p className="mt-1 text-sm text-muted">{detail}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
