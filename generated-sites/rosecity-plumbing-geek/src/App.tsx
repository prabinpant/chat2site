import { useEffect } from 'react'

const services = [
  {
    title: 'Residential plumbing service',
    text: 'We work on the plumbing in your home, from drips and leaks to fixture replacement, piping work, and the repairs that keep daily life moving.',
  },
  {
    title: 'Remodel plumbing',
    text: 'We help with bathroom renovations, larger remodels, and the plumbing decisions that need to fit both the room and the way you live in it.',
  },
  {
    title: 'Vintage fixture restoration',
    text: 'We repair and restore vintage faucets, valves, drains, tubs, lavatories, and toilets that many plumbers would rather tear out and replace.',
  },
  {
    title: 'Shipped bench work',
    text: 'Since 2012, we have accepted restoration projects that can be shipped to our Gladstone shop, then rebuilt, tested, and sent back ready for installation.',
  },
]

const serviceAreas = [
  'Portland',
  'Oregon City',
  'Gladstone',
  'West Linn',
  'Lake Oswego',
  'Beaverton',
  'Clackamas',
  'Gresham',
  'Tigard',
  'Tualatin',
]

const projectNotes = [
  'Crane pedestal lavatory restoration',
  'Speakman shower system brought back to full function',
  'Victorian toilet repair',
  'American Standard bathtub restoration',
]

function App() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-display text-[0.72rem] uppercase tracking-[0.38em] text-stone-300/80">
              Brian&apos;s Plumbing Works
            </span>
            <span className="mt-2 font-display text-2xl tracking-[0.08em] text-stone-50">
              Plumbing-Geek
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-stone-300/80 lg:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#restoration" className="transition hover:text-white">
              Restoration
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1800&q=80"
              alt="Vintage brass sink fixtures in warm light"
              className="hero-image h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,24,0.9)_0%,rgba(17,24,24,0.72)_38%,rgba(17,24,24,0.28)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(194,150,93,0.24),transparent_34%),linear-gradient(180deg,rgba(10,15,15,0.1)_0%,rgba(10,15,15,0.72)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-12 pt-32 md:px-8 md:pb-16 lg:grid-cols-[minmax(0,44rem)_1fr] lg:px-10 lg:pb-20">
            <div className="max-w-3xl">
              <p className="hero-copy mb-5 text-sm uppercase tracking-[0.32em] text-amber-200/75">
                Portland plumbing service and vintage fixture restoration since 1984
              </p>
              <h1 className="hero-copy hero-delay-1 font-display text-5xl leading-[0.92] text-stone-50 sm:text-6xl lg:text-[5.5rem]">
                Plumbing that works right, and old fixtures worth keeping.
              </h1>
              <p className="hero-copy hero-delay-2 mt-6 max-w-xl text-base leading-7 text-stone-200/88 sm:text-lg">
                We handle everyday plumbing repairs, remodel work, and the restoration of vintage fixtures
                with respect for the way older Portland homes were built.
              </p>

              <div className="hero-copy hero-delay-3 mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:5036566192"
                  className="inline-flex items-center justify-center rounded-full bg-amber-200 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Call 503-656-6192
                </a>
                <a
                  href="#restoration"
                  className="inline-flex items-center justify-center rounded-full border border-stone-200/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-50 transition duration-300 hover:-translate-y-0.5 hover:border-stone-50 hover:bg-stone-50/10"
                >
                  See restoration work
                </a>
              </div>
            </div>

            <div className="hero-copy hero-delay-4 flex items-end lg:justify-end">
              <div className="w-full max-w-sm border-l border-stone-100/15 pl-5 text-sm leading-7 text-stone-200/82 backdrop-blur-[2px] lg:mb-6">
                <p>We are family-owned, licensed, bonded, and fully insured.</p>
                <p className="mt-4">
                  Brian is now in semi-retirement, focused on the repair and restoration of fixtures from
                  roughly 1965 and earlier.
                </p>
                <p className="mt-4 text-amber-100">Oregon CCB #46846</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-800 bg-stone-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-4 lg:px-10">
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Service area</p>
              <p className="mt-3 text-lg text-stone-100">Portland metro and surrounding communities</p>
            </div>
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Availability</p>
              <p className="mt-3 text-lg text-stone-100">We answer calls between 9am and 7pm.</p>
            </div>
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Fixture shipping</p>
              <p className="mt-3 text-lg text-stone-100">Bench projects can be shipped to our Gladstone shop.</p>
            </div>
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Reply window</p>
              <p className="mt-3 text-lg text-stone-100">We usually respond to email inquiries within 48 hours.</p>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#f2ede4] text-stone-900">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">What we do</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-stone-950 md:text-5xl">
                We fix the plumbing you rely on and the vintage pieces you do not want to lose.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-stone-700">
                Other plumbers often see old fixtures as a demolition problem. We see function, materials,
                and a room that should still make sense when the work is done.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  data-reveal
                  className="reveal border-t border-stone-400/40 pt-5"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <h3 className="font-display text-2xl text-stone-950">{service.title}</h3>
                  <p className="mt-4 leading-7 text-stone-700">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="restoration" className="relative overflow-hidden bg-stone-900">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
            <div className="lg:pr-8">
              <div className="sticky top-10" data-reveal>
                <div className="reveal overflow-hidden rounded-[2rem] border border-stone-700/70 bg-stone-800/50">
                  <img
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80"
                    alt="Close-up of polished plumbing valves and tools"
                    className="h-[24rem] w-full object-cover object-center md:h-[34rem]"
                  />
                </div>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-300/82">
                  We restore faucets, drains, trims, and shower systems with the patience that old plumbing
                  demands, including sourcing parts, machining solutions, and coordinating re-plating when it
                  belongs on the job.
                </p>
              </div>
            </div>

            <div>
              <div data-reveal className="reveal">
                <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">Restoration</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-white md:text-5xl">
                  We would rather bring an old fixture back than tell you to rip out the room around it.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">
                  We have restored the beauty and function of vintage plumbing fixtures in old Portland-area
                  homes, preserving original interiors that other contractors said had to be remodeled away.
                </p>
              </div>

              <div className="mt-12 space-y-8">
                <div data-reveal className="reveal border-l border-amber-200/30 pl-6">
                  <h3 className="font-display text-2xl text-stone-50">Older homes need the right approach</h3>
                  <p className="mt-3 leading-7 text-stone-300">
                    Vintage plumbing is part of the look and feel of neighborhoods full of older houses.
                    Keeping original fixtures in service helps preserve the architectural integrity of the home.
                  </p>
                </div>
                <div data-reveal className="reveal border-l border-amber-200/30 pl-6">
                  <h3 className="font-display text-2xl text-stone-50">Repair can be practical, not sentimental</h3>
                  <p className="mt-3 leading-7 text-stone-300">
                    Restoration is one form of green plumbing, and it can be more economical than replacing a
                    fixture or remodeling an entire room when the core piece is worth saving.
                  </p>
                </div>
                <div data-reveal className="reveal border-l border-amber-200/30 pl-6">
                  <h3 className="font-display text-2xl text-stone-50">Bench work takes real process</h3>
                  <p className="mt-3 leading-7 text-stone-300">
                    Most shipped projects begin with photos and history, then move through disassembly,
                    appraisal, parts sourcing, machine or plating work, reassembly, and pressure testing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#d6c3a6] text-stone-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-28">
            <div data-reveal className="reveal">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-700/70">About Brian</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                I founded Brian&apos;s Plumbing Works in 1984 and still take the work personally.
              </h2>
            </div>
            <div data-reveal className="reveal text-lg leading-8 text-stone-800">
              <p>
                I started out as a mechanic, relocated to Portland with my family in 1968, served in the US
                Navy, and entered plumbing work in 1978. By 1984 I was licensed and self-employed.
              </p>
              <p className="mt-5">
                Through the years I have worked on every kind of plumbing problem, but the greatest challenge
                and satisfaction has been the repair and restoration of vintage plumbing fixtures. That is the
                work I continue to seek out.
              </p>
              <p className="mt-5">
                We have served Portland-area homeowners since 1984, and today we focus our energy where our
                experience matters most: skilled residential service, remodel plumbing, and old fixtures that
                deserve a second life.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f4ee] text-stone-900">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-10 lg:py-28">
            <div data-reveal className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Selected work</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-stone-950 md:text-5xl">
                  Fixtures and systems we talk about with pride
                </h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-stone-700">
                We have documented projects ranging from pedestal lavatories to shower systems, tubs, toilets,
                and hard-to-find trim that had to be repaired instead of replaced.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {projectNotes.map((note, index) => (
                <figure
                  key={note}
                  data-reveal
                  className="reveal group overflow-hidden rounded-[1.6rem] bg-stone-950 text-stone-50"
                  style={{ transitionDelay: `${index * 110}ms` }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${
                        [
                          'photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=900&q=80',
                          'photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
                          'photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
                          'photo-1564540583246-934409427776?auto=format&fit=crop&w=900&q=80',
                        ][index]
                      }`}
                      alt={note}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="px-6 py-5">
                    <p className="font-display text-2xl">{note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-950 text-stone-50">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10">
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-stone-700 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-stone-800 bg-stone-950 text-stone-50">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-28">
            <div data-reveal className="reveal max-w-3xl">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">Contact</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                If you need plumbing service or have an old fixture worth saving, call us.
              </h2>
              <p className="mt-6 text-lg leading-8 text-stone-300">
                We work throughout the Portland metro area, and for restoration projects we often begin with a
                phone conversation followed by photos and project history by email or text.
              </p>
            </div>

            <div data-reveal className="reveal lg:justify-self-end">
              <div className="rounded-[2rem] border border-stone-700/80 bg-stone-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-400">Brian&apos;s Plumbing Works</p>
                <a
                  href="tel:5036566192"
                  className="mt-4 block font-display text-4xl text-amber-100 transition hover:text-white"
                >
                  503-656-6192
                </a>
                <p className="mt-4 max-w-sm leading-7 text-stone-300">
                  Portland, Oregon metro area
                  <br />
                  Calls answered 9am to 7pm
                  <br />
                  Oregon CCB #46846
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
