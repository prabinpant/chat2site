import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Clock3,
  House,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Vault,
} from 'lucide-react'

const smoothEase = [0.22, 1, 0.36, 1] as const

const navigation = [
  { label: 'Residential', href: '#residential' },
  { label: 'Service Lines', href: '#services' },
  { label: 'About Charley', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const contentGroups = [
  {
    title: 'Residential locksmith work',
    summary:
      'The reference site emphasizes practical home security help: lock repairs, strike adjustments, lockout entry, re-keying, and thoughtful keying plans for daily household use.',
    items: [
      'Re-keying for new homeowners and tenants',
      'House lockouts and lock opening',
      'Lock and deadbolt installation',
      'Gate, maid, and service-access keying ideas',
      'High-security residential lock options',
    ],
  },
  {
    title: 'Commercial and industrial service',
    summary:
      'Commercial coverage centers on ongoing lock maintenance and access planning, from re-key and master-key work to hardware upgrades and electronic access control.',
    items: [
      'Commercial re-keying and master-keying',
      'Lock repairs and strike adjustments',
      'Business lockout and malfunction response',
      'Electric strikes, mag locks, and keypads',
      'Card readers, CCTV, and security hardware',
    ],
  },
  {
    title: 'Safes and specialty security',
    summary:
      'Charley’s original site also covers safe opening, servicing, buying guidance, fire-versus-burglary ratings, and combination-dialing help for common lock bodies.',
    items: [
      'Safe opening and servicing',
      'Burglary and fire safe guidance',
      'Combination dialing assistance',
      'New and used safe sourcing',
      'Proper container selection by risk',
    ],
  },
  {
    title: 'Consumer guidance and trust',
    summary:
      'A consistent theme across the site is fair quoting, realistic service fees, and warning customers about bait-and-switch scammers posing as legitimate locksmiths.',
    items: [
      'Fair quotes with re-quote if complications arise',
      'Consumer scam awareness',
      'High-security lock education',
      'Honest explanation of service pricing',
      'Direct phone and email contact',
    ],
  },
]

const serviceHighlights = [
  'Residential, commercial, and safe locksmith service',
  'Mobile locksmith support with direct contact numbers',
  'High-security lock options for home and business',
  'Scam-awareness and realistic quote guidance',
  'Reference site now notes Orlando-area service',
]

const credibilityPoints = [
  'Charles "Locksmith Charley" Eastwood describes a long mobile-locksmith career shaped by varied work across multiple cities before establishing his present operation.',
  'The site presents Charley as a hands-on specialist serving residential, commercial, automotive legacy requests, and safe opening or servicing work.',
  'He writes plainly about professionalism, integrity, and honor, with an emphasis on quoting fairly and keeping customers informed when complications change the job.',
  'His biography highlights public advocacy against locksmith scammers and court-and-media efforts to expose bait-and-switch operators.',
  'The reference site also notes his election as Southwest Director of ALOA Security Professionals Association, reinforcing his standing in the trade.',
]

const guideSections = [
  {
    title: 'Why honest pricing is part of the service',
    body:
      'Charley’s site is unusually direct about pricing: the quote should be fair, the bill should usually match it, and customers should be told immediately when a job becomes more complex than expected.',
  },
  {
    title: 'How the site frames better security',
    body:
      'Instead of generic promises, the original content explains how re-keying, master-key planning, strike adjustments, and high-security hardware solve specific access and control problems.',
  },
  {
    title: 'What the education pages add',
    body:
      'Beyond service pages, the site teaches people how to think about safes, builder keys, duplicate control, and scam red flags so they can make better decisions before they buy.',
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
    document.title = 'Locksmith Charley | Residential, Commercial, and Safe Locksmith Service'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        'Locksmith Charley offers residential, commercial, and safe locksmith guidance with direct contact, honest pricing language, and Orlando-area branding from the reference site.',
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="shrink-0 text-white">
            <div className="rounded-sm border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="font-['Oswald'] text-2xl uppercase tracking-[0.16em]">
                Locksmith Charley
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-300">
                Residential • Commercial • Safes
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
            href="tel:18003135397"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
          >
            <Phone className="h-4 w-4" />
            1-800-313-5397
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(110deg, rgba(18,20,23,0.88) 0%, rgba(18,20,23,0.58) 42%, rgba(18,20,23,0.28) 100%), url('https://images.unsplash.com/photo-1759564225887-e2e2e27f8972?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=2200')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(178,34,34,0.28),transparent_32%)]" />
          <div className="relative flex min-h-[100svh] items-end px-5 pb-12 pt-28 md:px-8 md:pb-20">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: smoothEase }}
                className="max-w-3xl"
              >
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-stone-200">
                  Orlando Area Locksmith
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                  Locksmith Charley for homes, businesses, and safe service.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 md:text-xl">
                  Rebuilt from the original Locksmith Charley site, this page keeps the same core
                  coverage: residential and commercial lock work, safe expertise, fair quoting, and
                  practical security guidance from Charles Eastwood, CRL.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:18887175397"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    24-Hour Mobile Service
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.locksmithcharley.com/about_locksmithcharley.htm"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
                  >
                    Read Charley&apos;s Story
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
                <div className="flex items-center gap-4">
                  <img
                    src="/reference-site-assets/locksmith-charley/lc1.jpg"
                    alt="Charles Eastwood of Locksmith Charley"
                    className="h-24 w-24 rounded-sm object-cover object-top ring-1 ring-white/20"
                  />
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-stone-300">
                      Charles Eastwood, CRL
                    </p>
                    <p className="mt-2 text-2xl leading-tight text-white">
                      Direct, specialist locksmith service with fair-quote messaging.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-sm leading-7 text-stone-200">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Residential, commercial, safe, and specialty security coverage.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>24-hour mobile-service messaging appears on the original homepage.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>The homepage currently says Charley is serving the Orlando area.</span>
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

        <section id="residential" className="bg-stone-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Site Overview
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                The original Locksmith Charley content, reorganized into the current layout.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                The section coverage stays intact: home service, commercial work, safe expertise,
                and consumer education about realistic security pricing and scam prevention.
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

        <section id="services" className="bg-[#181716] py-20 text-stone-100 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div
              {...fadeInUp(shouldReduceMotion)}
              className="relative overflow-hidden"
              whileInView={shouldReduceMotion ? undefined : { scale: [0.98, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: smoothEase }}
            >
              <img
                src="https://images.unsplash.com/photo-1685537710889-84750d9fec12?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800"
                alt="Vintage door lock and keys"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-stone-300">
                  Security Guidance
                </p>
                <p className="mt-2 text-xl leading-tight text-white">
                  Re-keying, key control, and hardware choices are presented as practical decisions,
                  not vague promises.
                </p>
              </div>
            </motion.div>

            <div className="space-y-10">
              {guideSections.map((section) => (
                <motion.div key={section.title} {...fadeInUp(shouldReduceMotion)}>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d3b26d]">
                    Locksmith Charley
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
                About Charley
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Charles Eastwood, CRL, the locksmith behind the original site
              </h2>
              <p className="text-lg leading-8 text-stone-700">
                Charley’s biography mixes personal history, trade credibility, and consumer
                advocacy, presenting him as both a working locksmith and a vocal critic of scam
                operators in the industry.
              </p>
              <div className="overflow-hidden border border-stone-300 bg-white">
                <img
                  src="/reference-site-assets/locksmith-charley/lc1.jpg"
                  alt="Portrait of Charles Eastwood"
                  className="w-full object-cover object-top"
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
                  The recurring message is simple: quote honestly, explain complications clearly,
                  and help customers make smart security decisions instead of selling on confusion.
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
                Practical locksmith help, not bait-and-switch copy.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                The original site speaks to customers who need real lock work now and to people who
                want to understand re-keying, safe selection, and the difference between realistic
                service fees and scam pricing.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <House className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">Residential service</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Re-key a home, improve day-to-day key control, open a locked house, or upgrade
                  vulnerable hardware without losing sight of how the household actually uses it.
                </p>
              </motion.div>
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">Commercial systems</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Businesses get maintenance, re-keying, master-key strategy, and access-control
                  planning grounded in hardware realities instead of sales jargon.
                </p>
              </motion.div>
              <motion.div
                {...fadeInUp(shouldReduceMotion)}
                className="border-t border-stone-300 pt-5"
              >
                <div className="flex items-center gap-3">
                  <Vault className="h-4 w-4 text-[#b22222]" />
                  <h3 className="text-xl font-semibold text-stone-900">Safes and security</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-stone-700">
                  Safe pages explain why fire and burglary ratings serve different purposes and when
                  opening, servicing, or replacing a container is the better move.
                </p>
              </motion.div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="overflow-hidden border border-stone-300 bg-white p-4">
                <img
                  src="/reference-site-assets/locksmith-charley/house.jpg"
                  alt="Residential locksmith service"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-stone-300 bg-white p-4">
                <img
                  src="/reference-site-assets/locksmith-charley/commercial.jpg"
                  alt="Commercial locksmith service"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-stone-300 bg-white p-4">
                <img
                  src="/reference-site-assets/locksmith-charley/safe.jpg"
                  alt="Safe locksmith service"
                  className="aspect-[4/3] w-full object-contain"
                />
              </div>
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
                  Need a quote, a lock opened, or help with a safe?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                  The original site invites customers to call for mobile service, send work orders
                  by email, and use direct contact instead of anonymous lead forms. This version
                  keeps that same direct-contact approach.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:18003135397"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    1-800-313-5397
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:Orders@LocksmithCharley.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-stone-900"
                  >
                    Email Work Order
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-6 border-l-0 border-white/15 lg:border-l lg:pl-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">
                    Primary Numbers
                  </p>
                  <p className="mt-3 text-2xl text-white">1-800-313-5397</p>
                  <p className="mt-1 text-lg text-stone-300">24-hour line: 888-717-5397</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Email</p>
                  <p className="mt-3 text-base leading-7 text-stone-300">
                    Orders@LocksmithCharley.com for work orders and{' '}
                    <a href="mailto:charley@locksmithcharley.com" className="text-white underline">
                      charley@locksmithcharley.com
                    </a>{' '}
                    for direct questions.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">
                    Consumer Note
                  </p>
                  <div className="mt-3 flex items-start gap-3 text-sm leading-7 text-stone-400">
                    <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <p>
                      The reference site strongly warns against unrealistically low advertised
                      service fees and positions clear, realistic quoting as a trust signal.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">
                    Reference Pages
                  </p>
                  <div className="mt-3 grid gap-2 text-sm text-stone-300">
                    <a
                      href="https://www.locksmithcharley.com/residential.html"
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-white"
                    >
                      Residential services
                    </a>
                    <a
                      href="https://www.locksmithcharley.com/commercial.html"
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-white"
                    >
                      Commercial services
                    </a>
                    <a
                      href="https://www.locksmithcharley.com/safes.html"
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-white"
                    >
                      Safe information
                    </a>
                  </div>
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
