import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUpRight, Crosshair } from 'lucide-react'

const popularLinks = [
  ['Fastest Shipping Lead Apparel.', 'https://www.pnwx.com/Accessories/LeadProducts/Aprons/Infab/LightningFast/'],
  ['Most Comfortable Aprons.', 'https://www.pnwx.com/Accessories/LeadProducts/Aprons/Infab/Revolution/'],
  ['Surgical Radiation Reducing Gloves.', 'https://www.pnwx.com/Accessories/LeadProducts/Gloves/Proguard/'],
  ['Line-Pair Resolution Test Phantoms.', 'https://www.pnwx.com/Accessories/Phantoms/Test/LinePair/'],
  ['Lead Glass.', 'https://www.pnwx.com/Accessories/LeadProducts/Windows/'],
  ['System Test Phantoms.', 'https://www.pnwx.com/Accessories/Phantoms/Test/'],
  ['Lead Curtains.', 'https://www.pnwx.com/Accessories/LeadProducts/Blockers-Shields/Curtains/'],
  ['Resolution Test Tools/Phantoms.', 'https://www.pnwx.com/Accessories/Phantoms/Test/Fluoroscopy/'],
  ['X-Ray Merchant Boards.', 'https://www.pnwx.com/Accessories/PatAsst/MerchantBoards/'],
  ['ACR accredited Medium MRI Phantom.', 'https://www.pnwx.com/Accessories/Phantoms/MRI/Pro-Project/ACR-Medium/'],
  ['Small Animal Immobilizers.', 'https://www.pnwx.com/Accessories/PosAides/Pet-Sitioner/'],
  ['Mobile Lead Barriers.', 'https://www.pnwx.com/Accessories/LeadProducts/MobileBarriers/Infab/'],
  ['X-Ray Table Pads.', 'https://www.pnwx.com/Accessories/PatAsst/TablePads/X-Ray/'],
  ['Silver Recovery Systems.', 'https://www.pnwx.com/Equipment/DarkEquip/Rotex/'],
  ['X-Ray Grids.', 'https://www.pnwx.com/Parts/Grids/'],
] as const

const fadeInUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="overflow-hidden bg-background text-text">
      <section className="relative min-h-svh border-b border-text/10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,247,244,0.96)_0%,rgba(245,247,244,0.88)_44%,rgba(14,90,107,0.16)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[52%] border-l border-text/10 bg-surface/40 lg:block" />
        <div className="relative grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col justify-between px-6 pb-10 pt-6 sm:px-8 lg:px-12 lg:pb-12 lg:pt-8"
          >
            <div className="flex items-center justify-between border-b border-text/10 pb-4">
              <div className="flex items-center gap-3">
                <Crosshair className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.28em] text-text/72">
                  Pacific Northwest X-Ray Inc.
                </span>
              </div>
              <a
                href="#contact"
                className="text-sm uppercase tracking-[0.22em] text-accent transition-colors hover:text-text"
              >
                503-667-3000
              </a>
            </div>

            <div className="max-w-2xl py-12 sm:py-16 lg:py-20">
              <img
                src="/pnwx_ani.gif"
                alt="Pacific Northwest X-Ray Inc."
                className="mb-8 h-auto w-[17rem] max-w-full sm:w-[20rem]"
              />
              <h1 className="max-w-4xl font-heading text-[3.4rem] leading-[0.9] tracking-[-0.05em] text-text sm:text-[4.8rem] lg:text-[6.5rem]">
                Pacific Northwest X-Ray Inc.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text/78 sm:text-xl">
                X-Ray - radiology equipment, supplies, parts and accessories!
              </p>
            </div>

            <div className="grid gap-6 border-t border-text/10 pt-5 text-sm uppercase tracking-[0.22em] text-text/66 sm:grid-cols-2">
              <a href="#search" className="transition-colors hover:text-accent">
                Search for X-Ray Products.
              </a>
              <a href="#catalog" className="transition-colors hover:text-accent">
                This web site is our catalog! No printed catalog is available.
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative flex min-h-[20rem] items-center justify-center border-t border-text/10 px-6 py-12 lg:min-h-svh lg:border-l lg:border-t-0 lg:px-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(14,90,107,0.18),transparent_44%),linear-gradient(180deg,rgba(231,236,232,0.45),rgba(231,236,232,0.16))]" />
            <div className="relative w-full max-w-2xl">
              <div className="border border-text/10 bg-background/72 p-4 backdrop-blur-sm sm:p-6">
                <img
                  src="/pnwx.gif"
                  alt="X-Ray - radiology equipment, supplies, parts and accessories!"
                  className="w-full"
                />
              </div>
              <div className="mt-6 border-t border-text/10 pt-4 text-xs uppercase tracking-[0.28em] text-text/56">
                pnwx.com - Pacific Northwest X-Ray Inc.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="search"
        {...fadeInUp}
        className="border-b border-text/10 px-6 py-14 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-4 h-px w-16 bg-accent" />
            <h2 className="max-w-md font-heading text-4xl leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Search for X-Ray Products.
            </h2>
          </div>
          <form
            action="https://www.pnwx.com/Search/"
            method="post"
            className="grid gap-4 border-t border-text/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <input
              type="text"
              name="SearchWords"
              maxLength={75}
              aria-label="Search for X-Ray Products."
              className="w-full border-0 border-b border-text/20 bg-transparent px-0 pb-4 text-xl text-text outline-none transition-colors placeholder:text-text/35 focus:border-accent sm:text-2xl"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 border border-accent px-5 py-3 text-sm uppercase tracking-[0.24em] text-accent transition-colors hover:bg-accent hover:text-background"
            >
              Go!
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </form>
        </div>
      </motion.section>

      <motion.section
        {...fadeInUp}
        className="border-b border-text/10 px-6 py-14 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-text/10 pb-5">
          <h2 className="max-w-3xl font-heading text-4xl leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            ...Or select from some of our most popular....
          </h2>
        </div>
        <div className="columns-1 gap-10 sm:columns-2 lg:columns-3">
          {popularLinks.map(([label, href]) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="group mb-5 flex break-inside-avoid items-start justify-between gap-4 border-b border-text/10 py-4"
            >
              <span className="font-heading text-[1.9rem] leading-[1] tracking-[-0.035em] text-text sm:text-[2.2rem]">
                {label}
              </span>
              <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-text/36 transition-colors group-hover:text-accent" />
            </motion.a>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="catalog"
        {...fadeInUp}
        className="border-b border-text/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="border-y border-text/10 py-8 sm:py-10">
          <p className="max-w-5xl font-heading text-[3rem] leading-[0.92] tracking-[-0.045em] text-text sm:text-[4.2rem] lg:text-[6rem]">
            This web site is our catalog! No printed catalog is available.
          </p>
        </div>
      </motion.section>

      <motion.footer
        id="contact"
        {...fadeInUp}
        className="px-6 py-14 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 h-px w-16 bg-accent" />
            <h2 className="font-heading text-4xl leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Pacific Northwest X-Ray Inc.
            </h2>
          </div>
          <div className="space-y-6 border-t border-text/10 pt-6">
            <p className="text-lg leading-relaxed text-text/78 sm:text-xl">
              P.O. Box 625, Gresham, OR 97030 U.S.A.
            </p>
            <div className="space-y-5">
              <p className="font-heading text-[2.2rem] leading-[0.95] tracking-[-0.04em] sm:text-[3rem] lg:text-[4rem]">
                503-667-3000
              </p>
              <div className="space-y-1 text-sm uppercase tracking-[0.24em] text-text/64">
                <p>Toll Free U.S.A: 800-827-9729</p>
                <p>Fax : 503-666-8855</p>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </main>
  )
}

export default App
