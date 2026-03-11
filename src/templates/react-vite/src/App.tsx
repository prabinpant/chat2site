import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Megaphone,
  Shield,
  Sparkles,
  Vote,
} from 'lucide-react'

const features = [
  {
    icon: Flame,
    title: 'Smoke-tested slogans',
    description:
      'Every line is polished with theatrical confidence, because subtlety clearly never polls well in fictional politics.',
  },
  {
    icon: Megaphone,
    title: 'Campaign-grade sarcasm',
    description:
      'A sharp, satirical tone wraps the message in clean design, making the absurd feel suspiciously well-branded.',
  },
  {
    icon: Shield,
    title: 'Performance without drama',
    description:
      'Lean sections, responsive spacing, and simple structure keep the page fast, even when the promises are not.',
  },
]

const stats = [
  { value: '100%', label: 'fictional bravado' },
  { value: '3', label: 'polished sections' },
  { value: '24/7', label: 'campaign posturing' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_45%,#ffffff_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.14),transparent_62%)]" />

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3b82f6] text-white shadow-[0_18px_45px_-18px_rgba(59,130,246,0.85)]">
              <Vote className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">a website</p>
              <p className="text-sm font-semibold text-slate-900">Satire for a fictional campaign</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-950">
              Features
            </a>
            <a href="#footer" className="transition hover:text-slate-950">
              Footer
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#3b82f6]">
                <BadgeCheck className="h-4 w-4" />
                Fictional political satire presented with a straight face
              </div>

              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Kaushal Kishor Mishra for president, because apparently irony needed a campaign office.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                A modern landing page for a fictional, sharply sarcastic presidential run: all the confidence, all the
                polish, and just enough smoke in the air to suggest the ideas were brainstormed beside an overworked
                ashtray.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-18px_rgba(59,130,246,0.8)] transition hover:bg-blue-500"
                >
                  Review the platform
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#footer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Read the disclaimer
                </a>
              </div>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.8)] backdrop-blur"
                  >
                    <dt className="text-sm font-medium text-slate-500">{stat.label}</dt>
                    <dd className="mt-2 text-3xl font-semibold text-slate-950">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-blue-100 blur-2xl" />
              <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-slate-200/80 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_35px_90px_-35px_rgba(15,23,42,0.35)] sm:p-8">
                <div className="rounded-[1.75rem] bg-[linear-gradient(145deg,#0f172a_0%,#1e293b_60%,#334155_100%)] p-7 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.26em] text-blue-200">Campaign memo</p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight">
                        The vision is cloudy, but the branding is crisp.
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      <Sparkles className="h-5 w-5 text-blue-300" />
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <Flame className="h-4 w-4 text-orange-300" />
                      Signature trait: smoking-area strategy sessions dressed up as statesmanship
                    </div>
                    <p className="mt-4 text-2xl font-semibold">Promise everything. Clarify nothing. Smile anyway.</p>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      This page treats satire like a premium product: measured spacing, fast rendering, and copy so dry
                      it could probably run for office on its own.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] bg-white/6 p-4">
                      <p className="text-sm text-slate-300">Campaign energy</p>
                      <p className="mt-2 text-xl font-semibold">Unreasonably confident</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/6 p-4">
                      <p className="text-sm text-slate-300">Policy depth</p>
                      <p className="mt-2 text-xl font-semibold">Decorative at best</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b82f6]">Features</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Modern presentation for a campaign nobody should mistake for a policy paper.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Clean sections, responsive layouts, and focused visual hierarchy keep the experience professional, even
              when the premise is intentionally ridiculous.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_70px_-42px_rgba(15,23,42,0.85)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#3b82f6]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer id="footer" className="mt-16 border-t border-slate-200 bg-slate-50/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-lg font-semibold text-slate-950">a website</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              This is clearly fictional satire, not a factual political endorsement or biographical claim. It just
              happens to look alarmingly campaign-ready.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Sparkles className="h-4 w-4 text-[#3b82f6]" />
            Responsive, polished, and professionally unserious.
          </div>
        </div>
      </footer>
    </div>
  )
}
