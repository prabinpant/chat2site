import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Droplets, Hammer, Phone, Wrench } from 'lucide-react'

const heroImage =
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1400&q=80'
const serviceImage =
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80'
const restorationImage =
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
const projectOneImage =
  'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1400&q=80'
const projectTwoImage =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'
const projectThreeImage =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80'

const servicePhrases = [
  'Residential plumbing service',
  'Drips, leaks, piping, fixtures',
  'Appliance installs and remodeling help',
]

const services = [
  {
    icon: Wrench,
    title: 'Home plumbing service',
    body:
      "Brian's Plumbing Works does residential plumbing: the plumbing in your home, from stopping drips and leaks to replacing piping and fixtures.",
  },
  {
    icon: Droplets,
    title: 'Safe, sanitary, efficient systems',
    body:
      'The work reflects the long-running Plumbing-Geek standard that good plumbing should be safe, sanitary, efficient, and essentially out-of-mind when it is done right.',
  },
  {
    icon: Hammer,
    title: 'Portland service since 1984',
    body:
      'Since 1984, Brian has served the Portland, Oregon metropolitan area, bringing practical repair knowledge shaped by more than forty years as a journeyman plumber.',
  },
]

const projects = [
  {
    title: 'Antique wall hung sink restoration project',
    body:
      'A fixture-led restoration reference that reflects the focus on preserving original bathroom architecture while returning working order and finish integrity.',
    image: projectOneImage,
  },
  {
    title: 'Victorian toilet repair',
    body:
      'A repair reference centered on delicate disassembly, period mechanics, and keeping an old fixture in service rather than forcing replacement.',
    image: projectTwoImage,
  },
  {
    title: 'Antique American Standard bathtub restoration',
    body:
      'A restoration reference tied to bench work, parts knowledge, and the patient techniques required when a vintage bathtub assembly has to be brought back correctly.',
    image: projectThreeImage,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -90])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08])

  return (
    <main className="overflow-hidden">
      <section
        id="top"
        className="relative min-h-screen border-b border-ink/10 bg-ink text-bone"
      >
        <div className="absolute inset-0">
          <motion.img
            src={heroImage}
            alt="Close crop of restored plumbing hardware"
            className="h-full w-full object-cover opacity-35"
            style={{ y: heroY, scale: heroScale }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,36,38,0.92)_0%,rgba(31,36,38,0.7)_48%,rgba(31,36,38,0.32)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(166,90,58,0.25),transparent_34%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between border-b border-bone/15 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/25">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-3xl leading-none tracking-[0.08em]">
                  Plumbing-Geek
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-bone/70">
                  Brian&apos;s Plumbing Works
                </p>
              </div>
            </div>
            <a
              href="tel:503-656-6192"
              className="hidden items-center gap-2 border border-bone/20 px-4 py-3 text-sm uppercase tracking-[0.22em] text-bone transition hover:border-bone/50 md:flex"
            >
              <Phone className="h-4 w-4" />
              503-656-6192
            </a>
          </header>

          <div className="grid flex-1 items-end gap-12 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)] lg:py-20">
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14 } },
              }}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.3em] text-bone/70"
              >
                Portland, Oregon plumbing contractor
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mt-5 max-w-4xl font-heading text-[4.2rem] uppercase leading-[0.82] tracking-[0.02em] text-balance sm:text-[5.8rem] lg:text-[7.8rem]"
              >
                Plumbing-Geek
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl font-heading text-2xl leading-tight text-bone/85 sm:text-3xl"
              >
                Brian&apos;s Plumbing Works doing business as Plumbing-Geek,
                specializing in plumbing services and vintage plumbing restoration.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-4 text-sm uppercase tracking-[0.22em] text-bone/80 sm:flex-row sm:flex-wrap"
              >
                <span>Oregon CCB License #46846</span>
                <span className="hidden sm:inline">/</span>
                <span>Since 1984</span>
                <span className="hidden sm:inline">/</span>
                <span>Forty years in Portland as of December 2024</span>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="tel:503-656-6192"
                  className="inline-flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.22em] text-bone transition hover:bg-[#934a30]"
                >
                  <Phone className="h-4 w-4" />
                  Call 503-656-6192
                </a>
                <a
                  href="#references"
                  className="inline-flex items-center justify-center gap-3 border border-bone/20 px-6 py-4 text-sm uppercase tracking-[0.22em] text-bone transition hover:border-bone/50"
                >
                  View Project References
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="justify-self-end"
            >
              <div className="relative overflow-hidden border border-bone/15 bg-bone/5 p-3 shadow-plate backdrop-blur-sm">
                <img
                  src={restorationImage}
                  alt="Vintage porcelain and exposed pipe detail"
                  className="h-[26rem] w-full max-w-[32rem] object-cover sm:h-[32rem]"
                />
                <div className="absolute inset-x-3 bottom-3 border-t border-bone/20 bg-ink/75 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.26em] text-bone/65">
                    Vintage Plumbing Restoration
                  </p>
                  <p className="mt-2 max-w-sm font-heading text-3xl leading-none">
                    Original fixtures. Working order. Historic sensitivity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-bone">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.28em] text-accent"
            >
              Plumbing Services
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-heading text-[3.2rem] uppercase leading-[0.86] tracking-[0.04em] text-balance sm:text-[4.6rem]"
            >
              Plumbing that works quietly and correctly.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="mt-10 space-y-5 border-l border-ink/15 pl-5 sm:pl-8"
            >
              {servicePhrases.map((phrase) => (
                <p
                  key={phrase}
                  className="font-heading text-2xl leading-none text-ink/88 sm:text-3xl"
                >
                  {phrase}
                </p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } } }}
            className="grid gap-10"
          >
            <motion.p variants={fadeUp} className="max-w-xl text-base leading-8 text-ink/78">
              The current Plumbing-Geek materials describe a practical service
              range: small repairs, leaks, fixture work, piping replacement,
              some appliance installs, and help with remodeling. The emphasis is
              not sales language. It is competent residential plumbing carried
              out by a Portland contractor whose standard is that you should not
              have to think about the plumbing once it is right.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="grid gap-8 border-t border-ink/10 pt-8"
            >
              {services.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="grid gap-3 md:grid-cols-[56px_minmax(0,1fr)] md:items-start"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/12 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl leading-none text-ink">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-ink/74">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-surface/55">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(12% 0 12% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <img
              src={serviceImage}
              alt="Close view of working plumbing tools and pipework"
              className="h-full min-h-[26rem] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col justify-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.28em] text-accent"
            >
              Vintage Plumbing Restoration
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-3xl font-heading text-[3.2rem] uppercase leading-[0.86] tracking-[0.04em] text-balance sm:text-[4.8rem]"
            >
              Repair and restoration for fixtures made around 1965 and older.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-ink/78"
            >
              Plumbing-Geek describes this specialty as the repair and
              restoration of vintage plumbing fixtures: antique toilets, vintage
              bathtubs, vintage faucets, and old water systems that define the
              house. The work is preservation-minded, grounded in patience,
              tools, technique, and the mechanical intuition needed when a part
              cannot simply be forced, cut out, or replaced.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-ink/78"
            >
              The existing business materials frame restoration as both practical
              and historically sensitive. It can preserve original interior
              architecture, keep sound fixtures out of landfills, and often
              avoid the assumption that a remodel is unavoidable because of age.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent">
                  Craft
                </p>
                <p className="mt-3 font-heading text-3xl leading-none">
                  Disassembly
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent">
                  Mindset
                </p>
                <p className="mt-3 font-heading text-3xl leading-none">
                  Preservation
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent">
                  Outcome
                </p>
                <p className="mt-3 font-heading text-3xl leading-none">
                  Working integrity
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="references" className="bg-bone">
        <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.28em] text-accent"
            >
              Recent Project References
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-heading text-[3.2rem] uppercase leading-[0.86] tracking-[0.04em] text-balance sm:text-[4.8rem]"
            >
              Current references drawn from Plumbing-Geek restoration content.
            </motion.h2>
          </motion.div>

          <div className="mt-12 space-y-16 lg:space-y-24">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
                className="grid gap-6 border-t border-ink/10 pt-8 lg:grid-cols-12 lg:items-end"
              >
                <motion.div
                  variants={fadeUp}
                  className={`overflow-hidden lg:col-span-7 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-[20rem] w-full object-cover sm:h-[28rem]"
                  />
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">
                    Reference {index + 1}
                  </p>
                  <h3 className="mt-4 max-w-lg font-heading text-4xl leading-[0.92] text-balance sm:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-ink/76">
                    {project.body}
                  </p>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ink text-bone">
        <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-10 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.28em] text-bone/65"
              >
                Contact &amp; License
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-5 max-w-4xl font-heading text-[3.2rem] uppercase leading-[0.84] tracking-[0.04em] sm:text-[5rem]"
              >
                Brian&apos;s Plumbing Works dba Plumbing-Geek
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-8 text-bone/75"
              >
                Active in the Portland, Oregon area, with direct phone contact
                and license information presented exactly where it is needed.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start justify-end gap-5"
            >
              <a
                href="tel:503-656-6192"
                className="font-heading text-[3.2rem] leading-none text-balance text-bone transition hover:text-[#d78b67] sm:text-[5rem]"
              >
                503-656-6192
              </a>
              <p className="text-sm uppercase tracking-[0.28em] text-bone/65">
                Oregon CCB License #46846
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default App
