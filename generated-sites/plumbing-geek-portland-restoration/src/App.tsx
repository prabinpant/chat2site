import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BookOpenText,
  Hammer,
  Mail,
  MapPinned,
  Phone,
  Pipette,
  Search,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { useRef } from 'react'

const services = [
  {
    icon: Wrench,
    title: 'Repair and troubleshooting',
    description:
      'Leak tracing, fixture problems, drain issues, and the kind of diagnosis that starts with how the system works.',
  },
  {
    icon: Pipette,
    title: 'Vintage fixture restoration',
    description:
      'Repair-first work for period sinks, faucets, and fittings when preservation makes more sense than gutting a room.',
  },
  {
    icon: ShieldCheck,
    title: 'Code-conscious corrections',
    description:
      'Practical updates for older plumbing that respect the house while bringing unsafe or failed work back into line.',
  },
  {
    icon: Search,
    title: 'Old-house consultation',
    description:
      'Straight answers for owners weighing repair versus replacement, compatibility, venting, drainage, and long-term durability.',
  },
]

const knowledgeNotes = [
  {
    title: 'Plumbing vents',
    summary:
      'Why airflow matters, what good venting prevents, and how code follows physical laws more than trends.',
  },
  {
    title: 'Washing machine drains',
    summary:
      'Standpipes, trap issues, and the common mistakes that turn a simple laundry hookup into a recurring mess.',
  },
  {
    title: 'Antique faucet repair',
    summary:
      'The details that decide whether a fixture deserves rebuilding, selective parts work, or a more serious restoration.',
  },
]

const principles = [
  "Portland plumber with verified local roots through Brian's Plumbing Works",
  'Forty-plus years of field experience referenced on the live Plumbing-Geek site',
  'Vintage plumbing restoration presented as a core specialty, not an add-on',
]

const motionEase = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: motionEase },
}

function App() {
  const restorationRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: restorationRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '8%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16])

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-[0.72rem] uppercase tracking-[0.28em] text-paper/72 sm:px-8 lg:px-12">
          <a href="#top" className="font-body transition hover:text-paper">
            Plumbing-Geek PDX
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#services" className="transition hover:text-paper">
              Services
            </a>
            <a href="#restoration" className="transition hover:text-paper">
              Restoration
            </a>
            <a href="#notes" className="transition hover:text-paper">
              Notes
            </a>
            <a href="#contact" className="transition hover:text-paper">
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
              alt="Restored vintage bathroom interior"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,24,35,0.92)_15%,rgba(10,24,35,0.72)_48%,rgba(10,24,35,0.35)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(173,129,74,0.32),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(52,122,119,0.24),transparent_24%)]" />
            <div className="absolute inset-0 blueprint-grid opacity-40" />
          </div>

          <div className="relative z-10 w-full px-5 pb-10 pt-24 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,680px)_1fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: motionEase }}
                className="max-w-2xl"
              >
                <p className="mb-5 text-[0.76rem] uppercase tracking-[0.35em] text-copper-light">
                  Brian&apos;s Plumbing Works, DBA Plumbing-Geek
                </p>
                <h1 className="max-w-xl font-display text-[3.2rem] leading-[0.94] tracking-[-0.05em] text-paper sm:text-[4.6rem] lg:text-[6rem]">
                  Portland plumbing for old houses, hard problems, and fixtures worth saving.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-paper/76 sm:text-lg">
                  A premium local practice built around diagnosis, restoration judgment, and the practical teaching voice that made Plumbing-Geek useful long before this redesign.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="http://www.plumbing-geek.com/contact-plumbing-geek.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-copper-light"
                  >
                    Contact Brian
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+15036566192"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/24 bg-paper/8 px-6 py-3 text-sm font-semibold text-paper backdrop-blur-sm transition hover:bg-paper/14"
                  >
                    <Phone className="h-4 w-4" />
                    503-656-6192
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.15, ease: motionEase }}
                className="grid gap-5 self-end border-t border-paper/15 pt-5 text-sm text-paper/72 lg:pl-10"
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="font-display text-3xl text-paper">40+</p>
                    <p className="mt-1 leading-6">Years in the trade, according to the live Plumbing-Geek site.</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-paper">CCB 46846</p>
                    <p className="mt-1 leading-6">Verified Oregon contractor number listed on the current contact page.</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-paper">PDX metro</p>
                    <p className="mt-1 leading-6">Built for homeowners, restorers, and old-house clients across Portland.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-iron-light/10 bg-ink-2">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
            <p className="text-sm uppercase tracking-[0.3em] text-copper-light">What makes this shop different</p>
            <div className="grid gap-4 text-sm text-paper/72 sm:grid-cols-3">
              {principles.map((item) => (
                <p key={item} className="border-l border-paper/12 pl-4 leading-6">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-paper text-ink">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.62fr_1.38fr] lg:px-12">
            <motion.div {...fadeUp}>
              <p className="section-label">Services</p>
              <h2 className="mt-4 max-w-sm font-display text-4xl leading-tight text-ink sm:text-5xl">
                Modern plumbing skill with an old-house conscience.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-iron">
                The site needed to sell trust quickly, but not at the cost of specificity. These services stay grounded in diagnosis, materials, and repair judgment.
              </p>
            </motion.div>

            <div className="divide-y divide-ink/10 border-t border-ink/10">
              {services.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                  whileHover={{ x: 8 }}
                  className="grid gap-4 py-6 md:grid-cols-[100px_1fr_auto] md:items-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-copper-soft text-copper-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-iron">{description}</p>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 text-copper-deep md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="restoration"
          ref={restorationRef}
          className="relative overflow-hidden bg-ink text-paper"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(173,129,74,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(50,104,110,0.28),transparent_36%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-28">
            <motion.div {...fadeUp} className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-[2rem] border border-paper/12 bg-paper/6 p-3 backdrop-blur-sm">
                <motion.img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
                  alt="Vintage clawfoot-style bathroom detail"
                  style={{ y: imageY, scale: imageScale }}
                  className="h-[24rem] w-full rounded-[1.35rem] object-cover object-center sm:h-[34rem]"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 lg:order-2 lg:pl-10">
              <p className="section-label text-copper-light">Vintage restoration</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-paper sm:text-5xl">
                Some fixtures deserve repair. Some rooms deserve restraint.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-paper/72">
                Plumbing-Geek's niche is not nostalgia for its own sake. It is knowing when an original fixture can be restored safely, when compatibility matters more than convenience, and when replacement would erase something that still has useful life.
              </p>
              <div className="mt-10 space-y-7 border-l border-paper/12 pl-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-copper-light">Preservation</p>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-paper/72">
                    Old homes in Portland often need a plumber who understands materials, proportions, and what should stay in place.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-copper-light">Judgment</p>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-paper/72">
                    Repair-versus-replace decisions are handled as technical choices, not sales opportunities.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-copper-light">Durability</p>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-paper/72">
                    Work is framed around sanitation, code realities, and long-term function instead of cosmetic quick fixes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="notes" className="bg-[#ebe3d2] text-ink">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
            <motion.div {...fadeUp} className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="section-label">Plumbing notes</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                  The "Geek" part should feel earned.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-iron">
                The reference site wins trust because it teaches. This section keeps that editorial instinct visible by surfacing the subjects Brian is known for explaining clearly.
              </p>
            </motion.div>

            <div className="mt-6 divide-y divide-ink/10">
              {knowledgeNotes.map((note, index) => (
                <motion.a
                  key={note.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                  whileHover={{ x: 8 }}
                  href="http://www.plumbing-geek.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid gap-4 py-6 md:grid-cols-[220px_1fr_auto] md:items-center"
                >
                  <div className="inline-flex items-center gap-3 text-copper-deep">
                    <BookOpenText className="h-5 w-5" />
                    <span className="text-sm uppercase tracking-[0.22em]">Field note</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{note.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-iron">{note.summary}</p>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 text-copper-deep md:block" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper text-ink">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:px-12">
            <motion.div {...fadeUp}>
              <p className="section-label">About Brian</p>
              <h2 className="mt-4 max-w-sm font-display text-4xl leading-tight text-ink sm:text-5xl">
                A local contractor with a field-guide habit.
              </h2>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div>
                <p className="max-w-2xl text-lg leading-8 text-iron">
                  The original site speaks with the cadence of someone who has spent decades fixing avoidable mistakes and explaining why they happened. That voice is the brand: direct, patient, technical, and still firmly in service of the client.
                </p>
                <div className="mt-8 grid gap-5 border-t border-ink/10 pt-6 sm:grid-cols-3">
                  <div>
                    <Hammer className="h-5 w-5 text-copper-deep" />
                    <p className="mt-3 text-sm leading-6 text-iron">Repair-first thinking where it protects the house and the budget.</p>
                  </div>
                  <div>
                    <MapPinned className="h-5 w-5 text-copper-deep" />
                    <p className="mt-3 text-sm leading-6 text-iron">Grounded in Portland's older housing stock and restoration-sensitive work.</p>
                  </div>
                  <div>
                    <ShieldCheck className="h-5 w-5 text-copper-deep" />
                    <p className="mt-3 text-sm leading-6 text-iron">Clear-eyed about code, safety, sanitation, and the limits of a quick patch.</p>
                  </div>
                </div>
              </div>
              <div className="border-l border-ink/10 pl-6">
                <p className="text-sm uppercase tracking-[0.22em] text-copper-deep">Verified from the live site</p>
                <p className="mt-4 text-sm leading-7 text-iron">
                  Portland metro contractor
                  <br />
                  Brian&apos;s Plumbing Works
                  <br />
                  Oregon CCB #46846
                </p>
                <a
                  href="http://www.plumbing-geek.com/about-me.html"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-copper-deep"
                >
                  Read the original About page
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-ink-2 text-paper">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(173,129,74,0.2),transparent_32%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
            <motion.div {...fadeUp}>
              <p className="section-label text-copper-light">Contact</p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-paper sm:text-5xl">
                Start with the problem, the fixture, or the room you&apos;re trying to save.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-paper/72">
                The live Plumbing-Geek contact page promises a reply within 48 hours by email and lists phone support between 9am and 7pm Pacific. This redesign keeps that path direct.
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-5 border-t border-paper/12 pt-6 sm:grid-cols-2">
              <a
                href="tel:+15036566192"
                className="group rounded-[1.75rem] border border-paper/12 bg-paper/6 p-6 transition hover:bg-paper/10"
              >
                <Phone className="h-5 w-5 text-copper-light" />
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-paper/56">Call</p>
                <p className="mt-2 font-display text-3xl text-paper">503-656-6192</p>
                <p className="mt-3 text-sm leading-7 text-paper/72">
                  Brian&apos;s Plumbing Works phone line, as listed on the current contact page.
                </p>
              </a>
              <a
                href="http://www.plumbing-geek.com/contact-plumbing-geek.html"
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.75rem] border border-paper/12 bg-paper/6 p-6 transition hover:bg-paper/10"
              >
                <Mail className="h-5 w-5 text-copper-light" />
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-paper/56">Message</p>
                <p className="mt-2 font-display text-3xl text-paper">Use the contact form</p>
                <p className="mt-3 text-sm leading-7 text-paper/72">
                  Reach the existing form directly for restoration questions, plumbing problems, or project details.
                </p>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
