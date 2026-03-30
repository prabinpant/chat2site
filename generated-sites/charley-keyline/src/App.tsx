import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const { scrollYProgress } = useScroll()
  const heroShift = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  const services = [
    {
      title: 'Residential',
      detail:
        'Rekeys, lock changes, move-in security updates, and hardware problems handled with clear answers and fair quotes.',
    },
    {
      title: 'Commercial',
      detail:
        'Mobile locksmith service for doors, cylinders, and day-to-day security hardware for businesses and properties.',
    },
    {
      title: 'Automotive',
      detail:
        'Lock and key help backed by years of transponder reference work across major vehicle manufacturers.',
    },
    {
      title: 'Safes',
      detail:
        'Safe opening and servicing done carefully, with the patience and precision this work requires.',
    },
  ]

  const proofPoints = [
    'Charles Eastwood, CRL',
    'Mobile-only locksmith operation',
    'Phoenix metro and Valley roots',
    'Now serving Apopka, Orlando, and Central Florida',
  ]

  return (
    <main className="bg-coal text-stone">
      <section className="relative isolate min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroShift }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(10,12,15,0.88)_12%,rgba(10,12,15,0.54)_46%,rgba(10,12,15,0.8)_100%)]" />
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,149,82,0.24),transparent_35%),linear-gradient(to_bottom,transparent_70%,rgba(17,19,22,1)_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 sm:px-10 lg:px-12">
          <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex items-center justify-between gap-6"
          >
            <div>
              <p className="font-display text-3xl tracking-[0.2em] text-white sm:text-4xl">
                Locksmith Charley
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.34em] text-stone/70">
                Charles Eastwood, CRL
              </p>
            </div>
            <a
              href="tel:8887175397"
              className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-brass hover:bg-brass hover:text-coal md:inline-flex"
            >
              888-717-5397
            </a>
          </motion.header>

          <div className="grid flex-1 items-end gap-12 pb-8 pt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.56fr)] lg:pb-16 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.44em] text-brass">
                Phoenix Metro and Orlando Area Mobile Locksmith
              </p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.9] text-white sm:text-7xl lg:text-[6.5rem]">
                Professional locksmith service with integrity.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-stone/82 sm:text-lg">
                We provide residential, commercial, automotive, safe opening,
                and servicing work with straightforward communication from the
                first call to the finished job.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:8887175397"
                  className="inline-flex items-center justify-center rounded-full bg-brass px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-coal transition hover:bg-[#d3ac67]"
                >
                  Call Now
                </a>
                <a
                  href="mailto:Orders@LocksmithCharley.com?subject=Quote%20Request"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
                >
                  Request a Quote
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              className="self-end border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            >
              <div className="space-y-4">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 border-b border-white/10 pb-4 text-sm uppercase tracking-[0.24em] text-stone/78 last:border-b-0 last:pb-0"
                  >
                    <span className="h-2 w-2 rounded-full bg-brass" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#14171b] px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.5fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-brass">
              Locksmith Work
            </p>
            <h2 className="mt-4 max-w-sm font-display text-4xl text-white sm:text-5xl">
              The work we do every day.
            </h2>
          </div>
          <div className="border-t border-white/10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[180px_1fr]"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.22em] text-white">
                  {service.title}
                </p>
                <p className="max-w-2xl text-base leading-7 text-stone/78">
                  {service.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe6d7] px-6 py-20 text-coal sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.9fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80"
              alt="Close-up of lock hardware and keyway"
              className="aspect-[4/5] w-full object-cover shadow-glow"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,19,22,0.3),transparent_45%)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs uppercase tracking-[0.36em] text-rust">
              About Charley
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              We built this business around direct answers and honest work.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-coal/78">
              We quote prices we believe are fair, and if a job turns out to be
              more complicated than expected, we explain what is happening
              before moving forward. That straightforward approach has always
              been part of how we do business.
            </p>
            <div className="mt-8 space-y-4 border-t border-coal/10 pt-8 text-base leading-7 text-coal/74">
              <p>
                Charles Eastwood has worked as a mobile-only locksmith for
                years, handling residential, commercial, automotive, and safe
                work while building a reputation around professionalism,
                integrity, and honor.
              </p>
              <p>
                In 2015 he was elected Southwest Director of ALOA Security
                Professionals Association and ran again unopposed in 2017.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-coal px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.36em] text-brass">
              High-Security Locks
            </p>
            <h2 className="mt-4 max-w-lg font-display text-4xl text-white sm:text-5xl">
              Better than ordinary security when the stakes are higher.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone/78">
              We explain the difference between ordinary security and
              high-security hardware, including lock grades 1, 2, and 3, so you
              can choose hardware that fits the real level of protection you
              need.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone/72">
              We have long specialized in ASSA high-security locks and
              restricted key control for customers who want more than basic
              consumer hardware.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="text-xs uppercase tracking-[0.36em] text-brass">
              Honest Pricing
            </p>
            <h2 className="mt-4 max-w-lg font-display text-4xl text-white sm:text-5xl">
              Unrealistically low service fees are a warning sign.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone/78">
              We have spent years warning customers about bait-and-switch
              locksmith scams. If a price sounds impossible before anyone even
              knows the job, there is usually a reason.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone/72">
              We tell you what we believe is fair, and if complications set in,
              we re-quote the work before going ahead. Clear communication comes
              first.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#1a1d22] px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.36em] text-brass">
              Automotive and Transponder Work
            </p>
            <h2 className="max-w-lg font-display text-4xl text-white sm:text-5xl">
              Vehicle key knowledge backed by years of reference work.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-stone/78">
              Our transponder information pages cover major makes including
              Acura, Honda, Ford, GM, Chrysler, Toyota, Nissan, Mazda, Kia,
              Hyundai, Mitsubishi, and more.
            </p>
            <p className="max-w-xl text-base leading-7 text-stone/72">
              That depth matters when a vehicle key problem is more than a
              simple duplicate.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1400&q=80"
              alt="Car key and ignition detail"
              className="aspect-[6/4] w-full object-cover shadow-glow"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(185,149,82,0.2),transparent_45%,rgba(17,19,22,0.28))]" />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#efe6d7] px-6 py-20 text-coal sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.36em] text-rust">
            Service Areas and Contact
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
                Serving the Phoenix area, the Valley, Apopka, and the Orlando
                area.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-coal/78">
                Call for residential, commercial, automotive, safe opening, and
                servicing work. If you want a quote, have your location and job
                details ready so we can help quickly.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-left">
              <a
                href="tel:8887175397"
                className="inline-flex min-w-[240px] items-center justify-between rounded-full bg-coal px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              >
                <span>Main Service Line</span>
                <span>888-717-5397</span>
              </a>
              <a
                href="tel:8003135397"
                className="inline-flex min-w-[240px] items-center justify-between rounded-full border border-coal/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-coal transition hover:border-coal"
              >
                <span>Media and Legal</span>
                <span>800-313-5397</span>
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-coal/10 pt-8 text-sm uppercase tracking-[0.22em] text-coal/64 md:flex-row md:items-center md:justify-between">
            <p>Orders@LocksmithCharley.com</p>
            <p>Fax 407-703-5202</p>
            <p>24 Hour Mobile Service</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
