import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Flower2,
  Mail,
  MapPin,
  Phone,
  TimerReset,
} from 'lucide-react'

const services = [
  'Birthdays',
  'Anniversaries',
  'Get Well',
  'Weddings',
  'Congratulations',
  'Thank You',
  'Sympathy',
  'Just Because',
]

const staples = [
  'Roses',
  'Carnations',
  'chrysanthemum',
  'Snapdragons',
  'Gerbera Daisies',
  'Larkspur',
  'gypsophila',
  'Misty',
  'Monte Casino',
  'Nova Belgie',
  'Stock',
  'Lisianthus',
  'other filler flowers',
]

const hours = [
  'Monday-Friday: 8:00 am - 5:00 pm',
  'Saturday: 8:00 am - 3:00 pm',
  'Sunday: Closed',
]

function App() {
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08])

  return (
    <main className="overflow-hidden bg-background text-text">
      <section
        id="top"
        className="relative min-h-screen bg-[#1f1a16] text-surface"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,22,18,0.78)_0%,rgba(28,22,18,0.45)_42%,rgba(28,22,18,0.3)_100%)]" />
        </motion.div>

        <div className="absolute -left-12 top-32 h-40 w-40 rounded-full bg-accent/35 blur-3xl" />
        <div className="absolute bottom-16 right-0 h-56 w-56 rounded-full bg-[#95a58d]/30 blur-3xl" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
            <a
              href="#top"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-surface/85"
            >
              <Flower2 className="h-5 w-5" />
              <span>Appleway Florist &amp; Greenhouse</span>
            </a>
            <nav className="hidden gap-8 text-xs uppercase tracking-[0.28em] text-surface/70 md:flex">
              <a href="#legacy">Since 1952</a>
              <a href="#information">Information</a>
            </nav>
          </header>

          <div className="flex flex-1 items-end px-6 pb-16 pt-8 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.36em] text-surface/70">
                Spokane Valley, Washington
              </p>
              <h1 className="max-w-4xl font-heading text-6xl leading-[0.88] text-surface sm:text-7xl md:text-8xl lg:text-[7rem]">
                Appleway Florist &amp; Greenhouse
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-surface/86 md:text-lg">
                Welcome to our informational webpage! Please browse the
                information about our family business. Click the order now
                button below to connect with our ecommerce website that is full
                of floral bouquet pictures sure to delight.
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.28em] text-surface/78">
                Established and Family owned since 1952
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://www.applewayflorist.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-surface px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-text transition hover:bg-white"
                >
                  Order Now
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#information"
                  className="inline-flex items-center justify-center rounded-full border border-surface/45 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-surface transition hover:border-surface hover:bg-surface/10"
                >
                  Florist &amp; Greenhouse Information
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="legacy" className="relative px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-accent/16 blur-3xl" />
            <p className="relative font-heading text-[7rem] leading-none text-soil/90 sm:text-[8rem] lg:text-[10rem]">
              1952
            </p>
            <div className="relative mt-6 max-w-md overflow-hidden rounded-[2rem] bg-surface p-4 shadow-glow">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80"
                  alt="Flowers arranged inside a greenhouse"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="lg:pt-12"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-soil/55">
              Family-Owned Since 1952
            </p>
            <p className="mt-6 max-w-2xl font-heading text-4xl leading-tight text-text sm:text-5xl">
              Established and Family owned since 1952, let Appleway Florist and
              Greenhouses be your florist in the Spokane Washington area.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-text/78">
              Specializing in fresh flower bouquets, basket gardens, custom silk
              bouquets, and sympathy arrangements, Appleway has over 15,000
              square feet of greenhouses growing many varieties of hanging
              baskets and bedding plants.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-text/78">
              With experienced designers on staff at any time, you can be sure
              your selection is given the professional attention it deserves.
              Also choose from our large selection of balloons, plush animals,
              candy, fruit items and gift items. At Appleway, your satisfaction
              is guaranteed 100%
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="information"
        className="relative border-t border-text/10 bg-surface px-6 py-20 md:px-10 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-soil/55">
                Florist &amp; Greenhouse Information
              </p>
              <h2 className="mt-5 max-w-3xl font-heading text-4xl leading-tight text-text sm:text-5xl">
                Making Everyday... A Special Occasion.
              </h2>
              <p className="mt-8 max-w-3xl text-base leading-8 text-text/78">
                Your satisfaction is our priority! For the freshest flowers
                available in the Spokane area, Contact us to find out what
                colors and flower types are available.
              </p>

              <div className="mt-10 border-t border-text/10 pt-8">
                <p className="text-xs uppercase tracking-[0.28em] text-soil/55">
                  Staples in our fresh flower cooler are
                </p>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm leading-7 text-text/72">
                  {staples.map((item, index) => (
                    <span key={item}>
                      {item}
                      {index < staples.length - 1 ? ',' : '.'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-text/10 pt-8">
                <p className="text-xs uppercase tracking-[0.28em] text-soil/55">
                  Shop online now for
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm uppercase tracking-[0.2em] text-text/74">
                  {services.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <p className="mt-10 max-w-3xl text-base leading-8 text-text/78">
                Offering same day delivery, when your order is placed by 1PM!
                Place an order online 24 hours a day click here
              </p>
            </div>

            <div className="space-y-10">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80"
                  alt="Floral arrangement in warm natural light"
                  className="h-[26rem] w-full object-cover"
                />
              </div>

              <div className="grid gap-8 border-t border-text/10 pt-10 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-accent" />
                    <a
                      href="http://maps.google.com/?q=SPOKANE+VALLEY,+11006+E+SPRAGUE+AVE+,+WA,+99206"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-7 text-text/76 transition hover:text-text"
                    >
                      11006 E SPRAGUE AVE
                      <br />
                      SPOKANE VALLEY, WA 99206
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-accent" />
                    <div className="text-sm leading-7 text-text/76">
                      <a href="tel:509-924-5050">509-924-5050</a>
                      <br />
                      <a href="tel:888-345-1145">888-345-1145</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-accent" />
                    <a
                      href="mailto:info@applewayflorist.com"
                      className="text-sm leading-7 text-text/76 transition hover:text-text"
                    >
                      info@applewayflorist.com
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <TimerReset className="mt-1 h-5 w-5 text-accent" />
                    <div className="text-sm leading-7 text-text/76">
                      {hours.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:items-start">
                    <a
                      href="https://www.applewayflorist.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-text px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-surface transition hover:bg-soil"
                    >
                      Place a Floral Order Now
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/applewayflorist"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-[0.28em] text-soil/60 transition hover:text-text"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default App
