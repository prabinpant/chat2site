import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Clock3,
  Droplets,
  Hammer,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

const smoothEase = [0.22, 1, 0.36, 1] as const

const navigation = [
  { label: 'Vintage Plumbing', href: '#vintage-plumbing' },
  { label: 'DIY Guides', href: '#guides' },
  { label: 'About Brian', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const contentGroups = [
  {
    title: 'Vintage Plumbing',
    summary:
      'The original site centers on restoration, repair, and sourcing for older fixtures that many plumbers would rather replace.',
    items: ['Restoration', 'Repair', 'Buy Vintage Fixtures', 'Standard', 'Crane Co.'],
  },
  {
    title: 'Hire Plumbing Geek',
    summary:
      'Brian’s Plumbing Works and the core service pages focus on restoration questions, project planning, and direct homeowner help.',
    items: [
      "Brian's Plumbing Works",
      'FAQ',
      'Contact',
      'Portfolio',
      'About and Blog',
    ],
  },
  {
    title: 'Top DIY Guides',
    summary:
      'The reference site highlights practical homeowner topics that solve common plumbing problems without turning the page into a text wall.',
    items: [
      'Frozen Pipes',
      'Emergency Plumbing',
      'Washing Machine Pipes',
      'Washing Machine Drains',
      'Clogged Pipes',
    ],
  },
  {
    title: 'DIY By Category',
    summary:
      'Broader navigation on the original site organizes repair knowledge into foundations, tools, materials, and plumbing system topics.',
    items: [
      'Plumbing Basics',
      'DIY Guides',
      'Plumbing Tools',
      'Plumbing Supplies',
      'Water Heaters',
    ],
  },
]

const serviceHighlights = [
  'Vintage plumbing restoration and repair',
  'DIY plumbing guidance for homeowners',
  'Portland, Oregon metro area contractor',
  'Phone support from 9am to 7pm Pacific',
  'Safety, sanitation, and knowledge first',
]

const credibilityPoints = [
  'Brian Marrone is originally from Long Island, New York and started working with tools at age twelve.',
  'He relocated to Portland, Oregon in 1968, served in the U.S. Navy Hospital Corps, and later entered the plumbing trade in 1978.',
  "By 1984 he was licensed and founded Brian's Plumbing Works, which he still owns and operates.",
  'His work increasingly focused on the repair and restoration of vintage plumbing fixtures in older Portland-area homes.',
  'The site’s philosophy is that good plumbing should be safe, sanitary, efficient, and essentially out of mind when it is working right.',
]

const guideSections = [
  {
    title: 'Why restoration matters',
    body:
      'The original site makes the case that repair and restoration can preserve the original architecture of a home, avoid unnecessary remodeling, and support a more economical form of green plumbing.',
  },
  {
    title: 'What the site is for',
    body:
      'Plumbing-Geek exists to help homeowners understand the systems that serve them, whether they are working on a drippy faucet, troubleshooting a fixture, or deciding when to hire a plumber.',
  },
  {
    title: 'What good plumbing looks like',
    body:
      'The reference copy repeatedly comes back to function: you should not have to explain your plumbing to a guest, and when a system is doing its job well, you barely think about it.',
  },
]

function fadeInUp(reducedMotion: boolean) {
  return {
    initial: { opacity: 0, y: reducedMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reducedMotion ? 0.01 : 0.7, ease: smoothEase },
  }
}

function App() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  useEffect(() => {
    document.title = 'Plumbing Geek | Vintage Plumbing Restoration and DIY Plumbing Guides'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        'Plumbing Geek shares vintage plumbing restoration expertise, DIY plumbing guides, and Portland-based help from Brian’s Plumbing Works.',
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="shrink-0 text-white">
            <div className="rounded-sm border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="font-['Oswald'] text-2xl uppercase tracking-[0.16em]">Plumbing Geek</p>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-300">
                Vintage Plumbing Restoration
              </p>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-stone-100 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:15036566192"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
          >
            <Phone className="h-4 w-4" />
            (503) 656-6192
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(110deg, rgba(18,20,23,0.84) 0%, rgba(18,20,23,0.56) 42%, rgba(18,20,23,0.24) 100%), url('/original-site-images/cranepedlav4.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(178,34,34,0.28),transparent_32%)]" />
          <div className="relative flex min-h-[100svh] items-end px-5 pb-12 pt-28 md:px-8 md:pb-20">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.7fr)] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: smoothEase }}
                className="max-w-3xl"
              >
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-stone-200">
                  Portland, Oregon
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                  Vintage plumbing restoration and DIY guidance from the Plumbing Geek.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 md:text-xl">
                  Plumbing Geek helps homeowners understand the plumbing systems that
                  serve them, with restoration know-how, repair insight, and practical DIY
                  plumbing guidance grounded in decades of field experience.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:15036566192"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    Call Brian&apos;s Plumbing Works
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="http://www.plumbing-geek.com/contact-plumbing-geek.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
                  >
                    Open Original Contact Page
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.9,
                  delay: shouldReduceMotion ? 0 : 0.15,
                  ease: smoothEase,
                }}
                className="grid gap-6 border-t border-white/15 pt-6 text-stone-100 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-300">Core Promise</p>
                  <p className="mt-3 text-2xl leading-tight text-white">
                    Safe, sanitary, efficient plumbing and better-informed homeowners.
                  </p>
                </div>
                <div className="space-y-4 text-sm leading-7 text-stone-200">
                  <div className="flex items-start gap-3">
                    <Wrench className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Portland plumbing contractor for forty years as of December 2024.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Phone calls answered from 9am to 7pm U.S. Pacific time.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Based in the Portland, Oregon metro area and helping people well beyond it.</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200 bg-[#f4f0e8]">
          <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
            <div className="grid gap-4 md:grid-cols-5">
              {serviceHighlights.map((item) => (
                <div
                  key={item}
                  className="border-l border-stone-300/80 pl-4 text-sm leading-6 text-stone-700 first:border-l-0 first:pl-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="vintage-plumbing" className="bg-stone-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Site Overview
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                The original Plumbing-Geek content, reorganized into the current layout.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                Instead of unrelated legal copy, this section now follows the real site structure:
                vintage plumbing, homeowner help, and the DIY topics that Plumbing-Geek is known for.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-10 lg:grid-cols-2">
              {contentGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  {...fadeInUp(shouldReduceMotion)}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.7,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: smoothEase,
                  }}
                  className="border-t border-stone-300 pt-6"
                >
                  <h3 className="text-2xl font-semibold text-stone-900">{group.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
                    {group.summary}
                  </p>
                  <ul className="mt-6 grid gap-3 text-sm leading-6 text-stone-800 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b22222]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="guides" className="bg-[#181716] py-20 text-stone-100 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="relative overflow-hidden">
              <img
                src="/original-site-images/cranepedlav2.jpg"
                alt="Restored vintage Crane pedestal lavatory"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-stone-300">
                  Restoration Plumbing
                </p>
                <p className="mt-2 text-xl leading-tight text-white">
                  Repairing older fixtures can preserve beauty, function, and the original character
                  of a home.
                </p>
              </div>
            </motion.div>

            <div className="space-y-10">
              {guideSections.map((section) => (
                <motion.div key={section.title} {...fadeInUp(shouldReduceMotion)}>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d3b26d]">
                    Plumbing Geek
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                    {section.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#f4f0e8] py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                About Brian
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Brian Marrone, owner of Brian&apos;s Plumbing Works
              </h2>
              <p className="text-lg leading-8 text-stone-700">
                The reference site’s biography combines trade experience, restoration work, and a
                service-first philosophy built around helping homeowners solve plumbing problems.
              </p>
              <div className="overflow-hidden border border-stone-300 bg-white">
                <img
                  src="/original-site-images/cranepedlav4.jpg"
                  alt="Vintage plumbing restoration example from Plumbing Geek"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeInUp(shouldReduceMotion)} className="grid gap-5">
              {credibilityPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-4 border-t border-stone-300 py-5 first:border-t-0 first:pt-0"
                >
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#b22222]" />
                  <p className="text-base leading-7 text-stone-800">{point}</p>
                </div>
              ))}
              <div className="border-t border-stone-300 pt-6">
                <p className="text-sm uppercase tracking-[0.22em] text-stone-500">
                  Original Site Philosophy
                </p>
                <p className="mt-3 text-base leading-7 text-stone-700">
                  Brian describes himself as a plumbing geek who loves to repair fixtures, while
                  staying mindful that the fixture serves the customer first and the work should meet
                  the needs of others.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-stone-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Why People Visit
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Practical plumbing help, not filler.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                The original homepage speaks directly to two audiences: homeowners doing their own
                plumbing and people who need a specialist to restore or repair older fixtures.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <Droplets className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">DIY plumbing</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Learn the basics, solve common problems, and understand the safety issues behind
                  the fixtures and pipes in your home.
                </p>
              </motion.div>
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <Hammer className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">Restoration work</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Restore vintage fixtures instead of replacing them when repair is the better path
                  for the room, the budget, and the architecture.
                </p>
              </motion.div>
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">Working knowledge</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Plumbing codes follow physical laws, so the site emphasizes fundamentals that stay
                  useful across both modern and vintage plumbing systems.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#181716] py-20 text-stone-100 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div
              {...fadeInUp(shouldReduceMotion)}
              className="grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#d3b26d]">Contact</p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                  Questions about a plumbing problem or a vintage fixture?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                  The original contact page invites questions by email or phone, notes a 48-hour
                  email response window, and recommends the FAQ first for common restoration
                  questions.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:15036566192"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    (503) 656-6192
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="http://www.plumbing-geek.com/contact-plumbing-geek.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-stone-900"
                  >
                    Use Original Contact Form
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-6 border-l-0 border-white/15 lg:border-l lg:pl-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Phone Hours</p>
                  <p className="mt-3 text-2xl text-white">9am to 7pm</p>
                  <p className="mt-1 text-lg text-stone-300">U.S. Pacific time zone</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Service Base</p>
                  <p className="mt-3 text-base leading-7 text-stone-300">
                    Brian&apos;s Plumbing Works is based in the Portland, Oregon metro area, with
                    homeowners from other locations also using the site for guidance.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">
                    Contractor License
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-400">
                    Oregon CCB #46846. The reference site also asks visitors to double-check their
                    email address so responses are not lost.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
