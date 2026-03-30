import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

const shopUrl = 'https://www.applewayflorist.com/'

const occasionLinks = [
  'Anniversary & Romance',
  'Birthday',
  'Get Well',
  'Make Someone Smile',
  'New Baby',
  "Designer's Choice",
]

const specialties = [
  'Fresh flower bouquets',
  'Basket gardens',
  'Custom silks',
  'Sympathy and funeral flowers',
  'Plants and European dish gardens',
  'Gift baskets and gourmet fruit baskets',
]

const serviceAreas = [
  'Spokane Valley',
  'Greenacres',
  'Liberty Lake',
  'Mead',
  'Millwood',
  'Mica',
  'Newman Lake',
  'Dishman',
  'Otis Orchards',
  'Rockford',
  'Valleyford',
  'Veradale',
]

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

function App() {
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.25], [0, 90])
  const greenhouseScale = useTransform(scrollYProgress, [0.2, 0.75], [1, 1.08])

  return (
    <main className="overflow-x-hidden text-moss">
      <section className="relative min-h-screen overflow-hidden bg-forest text-cream">
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(20,36,29,0.92)_18%,rgba(20,36,29,0.64)_52%,rgba(20,36,29,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,rgba(20,36,29,0)_0%,rgba(20,36,29,0.96)_100%)]" />
        </motion.div>

        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
            <a href="#top" className="max-w-xs">
              <p className="font-display text-3xl font-semibold tracking-[0.06em] text-cream md:text-4xl">
                Appleway
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-cream/70 md:text-sm">
                Florist & Greenhouse
              </p>
            </a>
            <nav className="hidden items-center gap-6 text-sm font-medium text-cream/80 lg:flex">
              <a href="#occasions" className="transition hover:text-white">
                Occasions
              </a>
              <a href="#greenhouse" className="transition hover:text-white">
                Greenhouse
              </a>
              <a href="#delivery" className="transition hover:text-white">
                Delivery
              </a>
              <a
                href="tel:5099245050"
                className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/60"
              >
                (509) 924-5050
              </a>
            </nav>
          </div>
        </header>

        <div
          id="top"
          className="relative z-10 flex min-h-screen items-end px-6 pb-12 pt-28 md:px-10 md:pb-16"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-end">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                },
              }}
              className="max-w-xl"
            >
              <motion.p
                variants={sectionReveal}
                className="mb-4 text-xs uppercase tracking-[0.36em] text-blush md:text-sm"
              >
                Family-owned since 1952
              </motion.p>
              <motion.h1
                variants={sectionReveal}
                className="font-display text-6xl font-semibold leading-[0.92] tracking-[-0.04em] text-cream sm:text-7xl md:text-8xl"
              >
                Flowers for life&apos;s special moments.
              </motion.h1>
              <motion.p
                variants={sectionReveal}
                className="mt-6 max-w-lg text-base leading-7 text-cream/82 md:text-lg"
              >
                We design fresh flowers, plants, sympathy pieces, wedding florals,
                and thoughtful gifts from our shop on Sprague Avenue, with same-day
                delivery available across Spokane Valley and nearby communities.
              </motion.p>
              <motion.div
                variants={sectionReveal}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href={shopUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-blush px-6 py-3 text-sm font-semibold text-forest transition hover:bg-[#f6e1dd]"
                >
                  Shop Flowers
                </a>
                <a
                  href="tel:5099245050"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-cream transition hover:border-white/60 hover:bg-white/5"
                >
                  Call (509) 924-5050
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' as const }}
              className="justify-self-end text-right"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-cream/60">
                Spokane Valley, Washington
              </p>
              <div className="mt-3 inline-flex flex-col items-end gap-3 border-t border-white/15 pt-4 text-sm text-cream/75 md:text-base">
                <p>11006 E. Sprague Ave. Spokane, WA 99206</p>
                <p>Mon-Fri 8:00 AM-5:00 PM | Sat 8:00 AM-3:00 PM | Sun Closed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-moss/10 bg-cream/70 px-6 py-5 backdrop-blur-sm md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-moss/80 md:grid-cols-3 md:gap-10">
          <p>Same-day delivery for orders received before 1:00 p.m. in the recipient&apos;s time zone.</p>
          <p>$15 local delivery fee per address. Sunday delivery is not available.</p>
          <p>Our online delivery area covers addresses within a 15-mile radius of our Spokane Valley shop.</p>
        </div>
      </section>

      <motion.section
        id="occasions"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-petal">What We Make</p>
            <h2 className="mt-4 max-w-md font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-forest md:text-6xl">
              Flowers, plants, and gifts chosen with care.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-moss/78">
              We help our customers celebrate, comfort, and connect with designs
              that feel personal. If you have a style, color, or flower in mind,
              we are happy to create a custom one-of-a-kind bouquet.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="border-b border-moss/15 pb-3 text-sm uppercase tracking-[0.28em] text-moss/55">
                Occasion Shopping
              </p>
              <div className="mt-5 space-y-4">
                {occasionLinks.map((item) => (
                  <motion.a
                    key={item}
                    href={shopUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 8 }}
                    className="flex items-center justify-between border-b border-moss/10 pb-4 text-lg text-forest transition"
                  >
                    <span>{item}</span>
                    <span className="text-sm uppercase tracking-[0.28em] text-petal">
                      Shop
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <p className="border-b border-moss/15 pb-3 text-sm uppercase tracking-[0.28em] text-moss/55">
                Specialty Services
              </p>
              <div className="mt-5 space-y-4">
                {specialties.map((item) => (
                  <p
                    key={item}
                    className="border-b border-moss/10 pb-4 text-lg leading-7 text-moss/85"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="greenhouse"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-forest px-6 py-20 text-cream md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            style={{ scale: greenhouseScale }}
            className="overflow-hidden rounded-[2rem] shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80"
              alt="Rows of flowers and greenery inside a bright greenhouse."
              className="h-[440px] w-full object-cover md:h-[620px]"
            />
          </motion.div>
          <div className="lg:sticky lg:top-24">
            <p className="text-sm uppercase tracking-[0.3em] text-blush">Our Greenhouse</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-cream md:text-6xl">
              Over 30,000 square feet of fresh color.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-cream/80">
              Our greenhouses are filled with hanging baskets, bedding plants, live
              plants, blooming baskets, and dish gardens. It is one of the things
              that sets us apart, and it gives us a fuller range of fresh seasonal
              color for gifts and for your own home.
            </p>
            <div className="mt-8 space-y-5 border-t border-white/15 pt-8 text-cream/82">
              <p>
                We also carry candles, plush animals, balloons, candy, greeting
                cards, fruit baskets, and other gift items so you can send
                something that feels complete.
              </p>
              <p>
                Our experienced designers are on staff to give every arrangement the
                professional attention it deserves.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div className="grid gap-8">
            <img
              src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80"
              alt="Soft white and blush floral arrangement for a memorial service."
              className="h-[320px] w-full rounded-[2rem] object-cover shadow-soft md:h-[420px]"
            />
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-petal">Sympathy</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-forest md:text-6xl">
                Gentle arrangements for difficult days.
              </h2>
              <p className="mt-5 text-base leading-7 text-moss/78">
                We create sympathy and funeral flowers with grace, care, and a steady
                hand. If you need help choosing a piece for the service or for the
                home, call us and we will walk through it with you.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <img
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
              alt="Wedding bouquet with white flowers and soft greenery."
              className="h-[320px] w-full rounded-[2rem] object-cover shadow-soft md:h-[420px]"
            />
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-petal">Weddings</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-forest md:text-6xl">
                Wedding flowers shaped around your day.
              </h2>
              <p className="mt-5 text-base leading-7 text-moss/78">
                From personal flowers to ceremony and reception pieces, we design
                wedding florals to suit your colors, style, and budget. We would love
                to help you plan something beautiful.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="delivery"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#e8dfd2] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-petal">Delivery Area</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-forest md:text-6xl">
                Same-day delivery throughout Spokane Valley and nearby communities.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-moss/78">
                We deliver locally throughout Spokane Valley and the surrounding
                area, and we accept online orders within a 15-mile radius of our
                store. For larger event orders or addresses outside that area, call
                us directly so we can help.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-4 border-t border-moss/15 pt-6 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pl-10">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="border-b border-moss/10 pb-4 text-lg text-moss/84"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
      >
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-petal">Visit The Shop</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-forest md:text-7xl">
            We stand behind every order with a 100% satisfaction guarantee.
          </h2>
          <div className="mt-8 grid gap-10 border-t border-moss/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl space-y-4 text-base leading-7 text-moss/78">
              <p>
                Visit us at 11006 E. Sprague Ave. in Spokane, or call us at
                {' '}
                <a className="font-semibold text-forest" href="tel:5099245050">
                  (509) 924-5050
                </a>
                {' '}
                or
                {' '}
                <a className="font-semibold text-forest" href="tel:8883451145">
                  (888) 345-1145
                </a>
                .
              </p>
              <p>
                We are open Monday through Friday from 8:00 AM to 5:00 PM, Saturday
                from 8:00 AM to 3:00 PM, and closed on Sunday.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={shopUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-moss"
              >
                Order Online
              </a>
              <a
                href="https://maps.google.com/?q=11006+E+Sprague+Ave,+Spokane,+WA+99206"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-moss/20 px-6 py-3 text-sm font-semibold text-forest transition hover:border-moss/50"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}

export default App
