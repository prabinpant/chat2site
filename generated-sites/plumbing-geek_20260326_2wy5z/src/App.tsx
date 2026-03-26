import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock3, Gavel, MapPin, Phone, Scale, ShieldCheck } from 'lucide-react'

const smoothEase = [0.22, 1, 0.36, 1] as const

const navigation = [
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Attorney', href: '#attorney' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Contact', href: '#contact' },
]

const practiceGroups = [
  {
    title: 'Divorce, Custody & Family Law',
    summary:
      'Representation for divorce, custody, support, domestic violence restraining orders, modifications, and enforcement matters.',
    items: [
      'Divorce and legal marital separation',
      'Child custody, visitation, and timesharing',
      'Child support and back child support',
      'Adoptions, paternity, and guardianship',
      'Restraining orders and orders of protection',
    ],
  },
  {
    title: 'Aggressive Criminal Defense & DWI',
    summary:
      'Defense for felony and misdemeanor charges, probation violations, DWI, drug cases, violent crimes, and white collar matters.',
    items: [
      'Felony and misdemeanor charges',
      'DWI, DUI, and serious traffic crimes',
      'Drug and narcotic crimes',
      'Violent crimes and domestic violence allegations',
      'Probation violations and juvenile offenses',
    ],
  },
  {
    title: 'Business Disputes & Civil Lawsuits',
    summary:
      'Counsel for breach of contract, partnership disputes, employment matters, civil rights claims, and commercial transactions.',
    items: [
      'Business and civil lawsuits',
      'Contract negotiation, drafting, and review',
      'Business formation and joint ventures',
      'Employment disputes and wrongful termination',
      'Civil rights and unfair competition claims',
    ],
  },
  {
    title: 'Personal Injury, Wrongful Death & Medical Malpractice',
    summary:
      'Advocacy for serious injury claims, wrongful death cases, and negligence by doctors, nurses, hospitals, and pharmacies.',
    items: [
      'Serious personal injury claims',
      'Wrongful death cases',
      'Birth injury and negligent delivery',
      'Hospital, clinic, and pharmacy negligence',
      'Failure to properly diagnose illness or disease',
    ],
  },
]

const serviceHighlights = [
  'Free phone consultations',
  'Same-day appointments',
  'Home, hospital, and jail visits',
  'Reasonable fees and payment plans',
  'No legal fee until you win in qualifying injury cases',
]

const credibilityPoints = [
  'Managing Attorney Robert Don Lohbeck has more than 25 years of courtroom trial experience.',
  'Former Special Assistant Attorney General and former lawyer for New Mexico law enforcement agencies.',
  'Cases in the U.S. Supreme Court, federal courts, New Mexico appellate and district courts, and California courts.',
  'Licensed in New Mexico and California, with arbitration and mediation experience.',
  'Trusted by individuals, families, small businesses, Fortune 500 companies, government entities, and tribal clients.',
]

const coverageRegions = [
  {
    title: 'Central New Mexico',
    places:
      'Albuquerque, Rio Rancho, Los Lunas, Belen, Socorro, Edgewood, Estancia, Moriarty, Ruidoso, Santa Rosa, Grants, Gallup, Clovis, and Portales.',
  },
  {
    title: 'Northern New Mexico',
    places:
      'Santa Fe, Los Alamos, Espanola, Taos, Farmington, Las Vegas, Raton, Chama, Angel Fire, Red River, and surrounding counties.',
  },
  {
    title: 'Southern New Mexico',
    places:
      'Las Cruces, Roswell, Alamogordo, Carlsbad, Hobbs, Silver City, Deming, Lordsburg, Hatch, and nearby communities.',
  },
]

const detailSections = [
  {
    eyebrow: 'Why Clients Call',
    title: 'When the outcome matters, the quality of counsel changes everything.',
    body: [
      'The original site emphasized the same point repeatedly: you have a lot at stake, and the lawyer you choose can make the difference between winning and losing.',
      'Lawyers505.com offers pragmatic, strategic representation focused on results, clear advice, and the most efficient path to your legal goals.',
    ],
  },
  {
    eyebrow: 'Courtroom Depth',
    title: 'Experience from both sides of the courtroom.',
    body: [
      'The firm’s criminal defense positioning is grounded in direct experience with the rules, judges, police agencies, and evidentiary process inside New Mexico courts.',
      'That experience extends beyond criminal cases into family law, business disputes, civil litigation, and serious injury matters.',
    ],
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
    document.title =
      'Lawyers505.com | Albuquerque Lawyers for Family Law, Criminal Defense, Business Disputes, Injury and Medical Malpractice'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        'Lawyers505.com serves Albuquerque and New Mexico with family law, criminal defense, DWI, business disputes, civil lawsuits, personal injury, wrongful death, and medical malpractice representation.',
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="shrink-0">
            <img
              src="/original-site-images/lawyers505/logo.png"
              alt="Lawyers505.com"
              className="h-11 w-auto rounded-sm bg-white/95 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.2)] md:h-14"
            />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-stone-100 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:5058885200"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
          >
            <Phone className="h-4 w-4" />
            (505) 888-5200
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(110deg, rgba(18,20,23,0.82) 0%, rgba(18,20,23,0.54) 42%, rgba(18,20,23,0.24) 100%), url('/original-site-images/lawyers505/hero.jpg')",
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
                  Albuquerque, New Mexico
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                  Smart, aggressive legal representation built for difficult cases.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 md:text-xl">
                  Lawyers505.com handles family law, criminal defense, DWI, business disputes,
                  civil lawsuits, personal injury, wrongful death, and medical malpractice across
                  New Mexico.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:5058885200"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    Call For A Consultation
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
                  >
                    Contact The Firm
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, delay: shouldReduceMotion ? 0 : 0.15, ease: smoothEase }}
                className="grid gap-6 border-t border-white/15 pt-6 text-stone-100 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-300">Core Promise</p>
                  <p className="mt-3 text-2xl leading-tight text-white">
                    We know what it takes to win.
                  </p>
                </div>
                <div className="space-y-4 text-sm leading-7 text-stone-200">
                  <div className="flex items-start gap-3">
                    <Scale className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Former Special Assistant Attorney General with 25+ years of trial experience.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>Free phone consultations, same-day appointments, and practical case planning.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#d3b26d]" />
                    <span>2155 Louisiana Blvd. NE, Albuquerque, New Mexico 87110.</span>
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
                <div key={item} className="border-l border-stone-300/80 pl-4 text-sm leading-6 text-stone-700 first:border-l-0 first:pl-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="practice-areas" className="bg-stone-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Practice Areas
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Original firm focus, reorganized into a responsive modern layout.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                The old site spread this information across image-heavy buttons and preformatted
                text. The substance is preserved here in a format clients can actually scan.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-10 lg:grid-cols-2">
              {practiceGroups.map((group, index) => (
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
                  <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">{group.summary}</p>
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

        <section className="bg-[#181716] py-20 text-stone-100 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="relative overflow-hidden">
              <img
                src="/original-site-images/lawyers505/practice-overview.jpg"
                alt="Lawyers505 courtroom and consultation imagery from the original site"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-stone-300">Representative Matters</p>
                <p className="mt-2 text-xl leading-tight text-white">
                  Family law, criminal defense, civil litigation, business disputes, injury, and malpractice.
                </p>
              </div>
            </motion.div>

            <div className="space-y-10">
              {detailSections.map((section) => (
                <motion.div key={section.title} {...fadeInUp(shouldReduceMotion)}>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d3b26d]">{section.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="attorney" className="bg-[#f4f0e8] py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Attorney Profile
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Robert Don Lohbeck, Managing Attorney
              </h2>
              <p className="text-lg leading-8 text-stone-700">
                The original attorney profile focused on trial depth, broad litigation experience,
                and the ability to guide cases from investigation through courtroom presentation.
              </p>
              <div className="overflow-hidden border border-stone-300 bg-white">
                <img
                  src="/original-site-images/lawyers505/attorney.jpg"
                  alt="Robert Don Lohbeck from the original Lawyers505 site"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeInUp(shouldReduceMotion)} className="grid gap-5">
              {credibilityPoints.map((point) => (
                <div key={point} className="flex items-start gap-4 border-t border-stone-300 py-5 first:border-t-0 first:pt-0">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#b22222]" />
                  <p className="text-base leading-7 text-stone-800">{point}</p>
                </div>
              ))}
              <div className="border-t border-stone-300 pt-6">
                <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Also Preserved From The Original Site</p>
                <p className="mt-3 text-base leading-7 text-stone-700">
                  The firm describes long-standing working relationships with consultants, engineers,
                  scientists, medical authorities, financial professionals, and other specialists
                  throughout the United States when a case requires a broader expert team.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="coverage" className="bg-stone-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <motion.div {...fadeInUp(shouldReduceMotion)} className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b22222]">
                Serving New Mexico
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                Centrally located in Albuquerque, with representation across the state.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                The original site listed dozens of cities and counties. This condensed section keeps
                that statewide reach visible without the unusable text-wall layout.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {coverageRegions.map((region) => (
                <motion.div
                  key={region.title}
                  {...fadeInUp(shouldReduceMotion)}
                  className="border-t border-stone-300 pt-5"
                >
                  <div className="flex items-center gap-3">
                    <Gavel className="h-4 w-4 text-[#b22222]" />
                    <h3 className="text-xl font-semibold text-stone-900">{region.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-stone-700">{region.places}</p>
                </motion.div>
              ))}
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
                  Call first for the quickest response.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                  The original contact page explicitly asked prospective clients to call for the
                  fastest assistance. That guidance stays front and center here.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:5058885200"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b22222] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#921b1b]"
                  >
                    (505) 888-5200
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2155+Louisiana+Blvd+NE+Albuquerque+NM+87110"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-stone-900"
                  >
                    Get Directions
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-6 border-l-0 border-white/15 lg:border-l lg:pl-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Office</p>
                  <p className="mt-3 text-2xl text-white">2155 Louisiana Blvd. NE</p>
                  <p className="mt-1 text-lg text-stone-300">Albuquerque, New Mexico 87110</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Consultation Terms</p>
                  <p className="mt-3 text-base leading-7 text-stone-300">
                    Free consultations, reasonable fees, payment plans, and no legal fee until you
                    win in personal injury, wrongful death, and medical malpractice matters.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Important Notice</p>
                  <p className="mt-3 text-sm leading-7 text-stone-400">
                    Past successes do not guarantee future results. Information on this site is
                    general and educational in nature and is not legal advice.
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
