const practiceAreas = [
  {
    title: 'Divorce',
    description:
      'We handle contested divorce, custody disputes, visitation, support, and restraining order matters with direct advice and steady courtroom preparation.',
  },
  {
    title: 'Family Law',
    description:
      'When your family is under pressure, we move quickly to protect your rights, your children, and the long-term decisions that will shape your future.',
  },
  {
    title: 'Criminal Defense',
    description:
      'If you are facing criminal charges or a DWI case, we prepare an aggressive defense early and fight to protect your record, freedom, and reputation.',
  },
  {
    title: 'Personal Injury',
    description:
      'We represent injured clients and families in serious injury and wrongful death claims, building the record needed to pursue accountability and recovery.',
  },
]

const trustPoints = [
  '25+ years of courtroom trial experience',
  'Free consultations',
  'Same-day appointments available',
  'Payment plans available',
  'Albuquerque office serving clients across New Mexico',
]

const contactItems = [
  {
    label: 'Call',
    value: '(505) 888-5200',
    href: 'tel:5058885200',
  },
  {
    label: 'Visit',
    value: '2155 Louisiana Blvd. NE, Albuquerque, New Mexico 87110',
    href: 'https://maps.google.com/?q=2155+Louisiana+Blvd+NE+Albuquerque+NM+87110',
  },
  {
    label: 'Availability',
    value: 'Free consultations, same-day appointments, and payment plans',
    href: '#contact',
  },
]

function App() {
  return (
    <div className="bg-[var(--ink)] text-[var(--sand-100)]">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-sm backdrop-blur-md sm:px-8">
          <a
            href="#top"
            className="group inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.42em] text-[var(--sand-200)]"
          >
            <span className="h-px w-10 bg-[var(--brass)] transition-all duration-300 group-hover:w-16" />
            Lawyers 505
          </a>
          <nav className="hidden items-center gap-8 text-[0.72rem] uppercase tracking-[0.3em] text-[var(--sand-300)] md:flex">
            <a href="#practice-areas" className="link-underline">
              Practice Areas
            </a>
            <a href="#about" className="link-underline">
              About
            </a>
            <a href="#contact" className="link-underline">
              Contact
            </a>
          </nav>
          <a
            href="tel:5058885200"
            className="rounded-full border border-[rgba(214,164,95,0.45)] bg-[rgba(12,24,38,0.62)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--sand-100)] transition hover:border-[var(--brass)] hover:bg-[rgba(12,24,38,0.85)]"
          >
            Call (505) 888-5200
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 hero-image"
            style={{
              backgroundImage:
                "linear-gradient(115deg, rgba(14,22,29,0.92) 14%, rgba(14,22,29,0.76) 42%, rgba(14,22,29,0.35) 100%), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,164,95,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(143,89,54,0.22),transparent_34%)]" />

          <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:items-center lg:pb-16">
            <div className="max-w-3xl">
              <p className="hero-kicker animate-rise [animation-delay:120ms]">
                Albuquerque Trial Lawyers
              </p>
              <div className="overflow-hidden">
                <h1 className="animate-rise [animation-delay:220ms] text-5xl font-semibold uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-8xl">
                  When the Outcome Matters, Put Lawyers 505 on Your Side
                </h1>
              </div>
              <p className="mt-6 max-w-xl animate-rise text-base leading-7 text-[var(--sand-200)] [animation-delay:340ms] sm:text-lg">
                We represent clients in Albuquerque and across New Mexico in
                divorce, criminal defense, personal injury, and family law
                matters. We are prepared, direct, and ready to fight for what
                matters most to you.
              </p>
              <div className="mt-10 flex animate-rise flex-col gap-4 [animation-delay:460ms] sm:flex-row">
                <a href="tel:5058885200" className="primary-action">
                  Call (505) 888-5200
                </a>
                <a href="#contact" className="secondary-action">
                  Request a Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[var(--desert)]/70">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-5 lg:gap-8">
            {trustPoints.map((point) => (
              <p
                key={point}
                className="text-sm uppercase tracking-[0.22em] text-[var(--sand-100)]/90"
              >
                {point}
              </p>
            ))}
          </div>
        </section>

        <section
          id="practice-areas"
          className="relative overflow-hidden bg-[var(--sand-100)] text-[var(--ink)]"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr,1.35fr] lg:py-28">
            <div className="lg:pr-10">
              <p className="section-label">Practice Areas</p>
              <h2 className="mt-4 max-w-sm text-4xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-5xl">
                Serious matters need clear strategy from the start.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[var(--stone)]">
                Our firm handles the cases that can change everything. We give
                clients direct answers, practical preparation, and strong
                representation in and out of court.
              </p>
            </div>

            <div className="divide-y divide-[rgba(12,24,38,0.14)] border-t border-[rgba(12,24,38,0.18)]">
              {practiceAreas.map((practice, index) => (
                <article
                  key={practice.title}
                  className="group grid gap-4 py-7 sm:grid-cols-[180px,1fr] sm:gap-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.36em] text-[var(--clay)]">
                      0{index + 1}
                    </p>
                    <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--ink)]">
                      {practice.title}
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr,auto] sm:items-end">
                    <p className="max-w-2xl text-base leading-7 text-[var(--stone)]">
                      {practice.description}
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-3 link-inline">
                      Speak With Us
                      <span aria-hidden="true">+</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--ink)]">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:py-28">
            <div className="order-2 lg:order-1">
              <p className="section-label text-[var(--brass)]">Why Clients Call</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-5xl">
                We know what is at stake, and we move with purpose.
              </h2>
              <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 text-[var(--sand-200)] sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-[0.1em] text-white">
                    Direct access
                  </h3>
                  <p className="mt-3 text-base leading-7">
                    We offer free consultations, same-day appointments when
                    available, and a straightforward first conversation about
                    what your case requires.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-[0.1em] text-white">
                    Courtroom focus
                  </h3>
                  <p className="mt-3 text-base leading-7">
                    Our published firm messaging is simple: experience,
                    commitment, and results backed by more than 25 years of
                    courtroom trial experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-[0.1em] text-white">
                    New Mexico reach
                  </h3>
                  <p className="mt-3 text-base leading-7">
                    We are based in Albuquerque and represent clients
                    throughout New Mexico, with a practical understanding of
                    how local courts and local timelines affect real cases.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-[0.1em] text-white">
                    Real flexibility
                  </h3>
                  <p className="mt-3 text-base leading-7">
                    When legal help cannot wait, payment plans and fast intake
                    options make it easier to get counsel in place without
                    delay.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="image-frame">
                <img
                  src="https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Albuquerque legal district streetscape at dusk"
                  className="h-[30rem] w-full object-cover sm:h-[38rem]"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-[linear-gradient(180deg,#eadfcd_0%,#f6f0e6_100%)] text-[var(--ink)]"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr,1.1fr] lg:py-28">
            <div>
              <p className="section-label">Attorney Profile</p>
              <h2 className="mt-4 text-4xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-5xl">
                Trial-ready representation built on long courtroom experience.
              </h2>
            </div>
            <div className="grid gap-8 lg:pl-8">
              <p className="text-lg leading-8 text-[var(--stone)]">
                Managing Attorney Robert Don Lohbeck is the attorney profile
                published on Lawyers 505. His profile identifies him as an
                Albuquerque lawyer handling divorce, child custody, restraining
                order, criminal defense, DWI, business, civil lawsuit,
                personal injury, wrongful death, and medical malpractice
                matters.
              </p>
              <p className="text-lg leading-8 text-[var(--stone)]">
                The published profile also states that Mr. Lohbeck is licensed
                to practice law in New Mexico and California and is qualified
                to practice before the American Arbitration Association.
              </p>
              <div className="grid gap-5 border-t border-[rgba(12,24,38,0.16)] pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--clay)]">
                    Name
                  </p>
                  <p className="mt-2 text-xl font-semibold uppercase tracking-[0.08em]">
                    Robert Don Lohbeck
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--clay)]">
                    Role
                  </p>
                  <p className="mt-2 text-xl font-semibold uppercase tracking-[0.08em]">
                    Managing Attorney
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--clay)]">
                    Admissions
                  </p>
                  <p className="mt-2 text-xl font-semibold uppercase tracking-[0.08em]">
                    NM, CA, AAA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-t border-white/10 bg-[var(--ink)]"
        >
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(135deg,rgba(214,164,95,0.08),transparent)] lg:block" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr,0.95fr] lg:gap-20 lg:py-28">
            <div>
              <p className="section-label text-[var(--brass)]">Contact Lawyers 505</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-5xl">
                Call now if you need answers, protection, or a plan for what
                comes next.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--sand-200)]">
                We represent people and families in Albuquerque and throughout
                New Mexico. If your case involves divorce, family law, criminal
                defense, or personal injury, contact us and we will talk
                through the next step.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="tel:5058885200" className="primary-action">
                  Call for a Free Consultation
                </a>
                <a
                  href="https://maps.google.com/?q=2155+Louisiana+Blvd+NE+Albuquerque+NM+87110"
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-action"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="grid gap-8 border-t border-[rgba(255,255,255,0.14)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {contactItems.map((item) => (
                <div key={item.label} className="border-b border-[rgba(255,255,255,0.1)] pb-7 last:border-b-0 last:pb-0">
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--brass)]">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-3 inline-block text-2xl font-semibold leading-snug text-white transition hover:text-[var(--sand-200)]"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
