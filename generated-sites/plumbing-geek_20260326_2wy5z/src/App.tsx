import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Droplets } from 'lucide-react'

const sections = [
  {
    label: 'Plumbing contractor work',
    title: 'Plumbing contractor',
    body: "Brian's Plumbing Works, doing business as Plumbing-Geek, serves Portland, Oregon as a plumbing contractor.",
    image:
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Workshop plumbing tools and fittings',
  },
  {
    label: 'Vintage plumbing restoration',
    title: 'Vintage plumbing restoration',
    body: "Brian's Plumbing Works, doing business as Plumbing-Geek, is also a vintage plumbing restoration business.",
    image:
      'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Restored vintage metal plumbing fixture detail',
  },
]

const projects = [
  {
    title: 'Recent projects',
    text: 'Content referencing recent projects reinforces that the business is active and currently working on notable plumbing and restoration jobs.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    alt: 'Copper piping installation detail',
    className: 'md:col-span-5 md:pt-16',
  },
  {
    title: 'Portland, Oregon',
    text: "Brian's Plumbing Works, doing business as Plumbing-Geek, continues to connect plumbing contractor work with vintage plumbing restoration in Portland, Oregon.",
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    alt: 'Historic bathroom fixture and tile detail',
    className: 'md:col-span-4',
  },
  {
    title: 'Active work',
    text: 'The recent-projects section keeps the emphasis on current work without resorting to dated layout patterns or boxed portfolio tiles.',
    image:
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=80',
    alt: 'Industrial pipe fittings and restoration tools',
    className: 'md:col-span-3 md:-mt-20',
  },
]

function App() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, shouldReduceMotion ? 1 : 1.06])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, shouldReduceMotion ? 0 : -40])

  return (
    <main className="bg-background text-text">
      <section className="relative min-h-screen overflow-hidden border-b border-text/15 bg-text text-background">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(31,26,23,0.88),rgba(31,26,23,0.45)_45%,rgba(31,26,23,0.72))]" />
          <img
            src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1800&q=80"
            alt="Vintage plumbing workshop with brass and iron fittings"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-x-0 top-0 z-20 h-40 bg-[linear-gradient(180deg,rgba(31,26,23,0.68),transparent)]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between border-b border-background/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-background/30 bg-background/10 backdrop-blur-sm">
                <Droplets className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-2xl uppercase tracking-[0.18em]">Plumbing-Geek</p>
                <p className="text-sm uppercase tracking-[0.28em] text-background/70">
                  Brian&apos;s Plumbing Works
                </p>
              </div>
            </div>
            <a
              href="tel:503-656-6192"
              className="font-heading text-sm uppercase tracking-[0.22em] text-background/90 transition hover:text-white"
            >
              503-656-6192
            </a>
          </div>

          <motion.div
            className="grid gap-12 pb-10 pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-end lg:gap-16 lg:pb-12"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-4xl">
              <p className="mb-5 font-heading text-sm uppercase tracking-[0.34em] text-background/70">
                Portland, Oregon
              </p>
              <h1 className="font-heading text-[clamp(4.5rem,14vw,11rem)] uppercase leading-[0.88] tracking-[-0.05em] text-background">
                Brian&apos;s Plumbing Works
              </h1>
              <p className="mt-4 max-w-xl font-heading text-[clamp(1.6rem,3vw,2.7rem)] uppercase leading-[0.95] tracking-[0.08em] text-accent">
                Doing business as Plumbing-Geek
              </p>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-background/82 sm:text-xl">
                Portland, Oregon plumbing contractor and vintage plumbing restoration business.
              </p>
            </div>

            <motion.div
              className="max-w-sm self-end border-t border-background/25 pt-6"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-heading text-sm uppercase tracking-[0.28em] text-background/60">
                Call
              </p>
              <a
                href="tel:503-656-6192"
                className="mt-2 inline-flex items-center gap-3 font-heading text-4xl uppercase tracking-[0.02em] text-background transition hover:text-accent"
              >
                503-656-6192
                <ArrowUpRight className="h-8 w-8" />
              </a>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-background/70">
                Brian&apos;s Plumbing Works, doing business as Plumbing-Geek.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-text/15 px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Experience &amp; license</p>
            <div className="mt-5 border-t border-text/20 pt-8">
              <p className="font-heading text-[clamp(6rem,18vw,12rem)] leading-none tracking-[-0.06em] text-text">
                40
              </p>
              <p className="mt-4 max-w-2xl font-body text-2xl leading-tight sm:text-3xl">
                Forty years of experience as of December 2024.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end border-t border-text/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10">
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-text/55">Oregon CCB</p>
            <p className="mt-3 font-heading text-5xl uppercase leading-none tracking-[-0.04em] text-accent">
              #46846
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text/74">
              Oregon CCB License #46846.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-text/15 px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-text/15 pb-5">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Services</p>
              <h2 className="mt-3 font-heading text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.05em]">
                Two exact disciplines
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-lg leading-relaxed text-text/72 lg:block">
              Plumbing contractor work and vintage plumbing restoration, presented without generic service grids.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                className="group"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={section.image}
                    alt={section.alt}
                    className="h-[420px] w-full object-cover object-center grayscale-[12%] transition duration-700 group-hover:scale-[1.03]"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4 border-t border-text/20 pt-5">
                  <div>
                    <p className="font-heading text-sm uppercase tracking-[0.28em] text-accent">
                      {section.label}
                    </p>
                    <h3 className="mt-3 font-heading text-4xl uppercase leading-none tracking-[-0.04em]">
                      {section.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-2 h-6 w-6 shrink-0 text-text/45 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </div>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-text/76">{section.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-text/15 bg-surface/55 px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Recent projects</p>
            <h2 className="mt-3 font-heading text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.05em]">
              Active work, current references
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text/76">
              Content referencing recent projects reinforces that the business is active and currently working on notable plumbing and restoration jobs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-start">
            {projects.map((project, index) => (
              <motion.figure
                key={project.title}
                className={project.className}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.1 }}
              >
                <div className="overflow-hidden bg-text">
                  <motion.img
                    src={project.image}
                    alt={project.alt}
                    className="h-[280px] w-full object-cover object-center md:h-[340px]"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
                <figcaption className="border-t border-text/20 pt-4">
                  <p className="font-heading text-sm uppercase tracking-[0.28em] text-accent">
                    {project.title}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-text/76">{project.text}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-text px-6 py-20 text-background sm:px-8 lg:px-12 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(176,122,59,0.28), transparent 42%), url(https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1600&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="relative mx-auto max-w-5xl border-y border-background/20 py-12 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.34em] text-background/65">Contact</p>
          <h2 className="mt-4 font-heading text-[clamp(3.2rem,10vw,7rem)] uppercase leading-[0.88] tracking-[-0.05em]">
            503-656-6192
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-background/78">
            Brian&apos;s Plumbing Works, doing business as Plumbing-Geek, Portland, Oregon.
          </p>
          <p className="mt-4 font-heading text-lg uppercase tracking-[0.18em] text-accent">
            Oregon CCB License #46846
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
