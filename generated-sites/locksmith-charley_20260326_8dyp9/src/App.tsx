import {
  ArrowUpRight,
  CarFront,
  KeyRound,
  Landmark,
  MapPinned,
  ShieldEllipsis,
  Vault,
} from 'lucide-react'

type ServiceSection = {
  id: string
  label: string
  title: string
  icon: typeof KeyRound
  image: string
  imageAlt: string
  tone: string
  summary: string
  quotes: string[]
}

const services: ServiceSection[] = [
  {
    id: 'residential',
    label: 'Residential',
    title: 'How SECURE is your nice new house?',
    icon: KeyRound,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Close view of residential lock hardware.',
    tone:
      'Residential Real Estate (REO) and residential locksmith work remain a core part of the Locksmith Charley identity.',
    summary:
      'The residential material centers on professional re-keying, construction-key exposure, and higher-security cylinder options.',
    quotes: [
      'If you bought your house from the builder and have not yet had it professionally re-keyed by a locksmith chances are that your house is not as secure as you think.',
      'The ONLY way to ensure the security that your family deserves is to have your house re-keyed to a new key and have all of the master pins removed from your locks OR replace your locks or cylinders with HIGH SECURITY locks or cylinders.',
      'You may also want to consider replacing your locks with HIGH SECURITY locks such as ASSA® or Schlage PRIMUS®.',
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    title: 'Ordinary security and high security',
    icon: Landmark,
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Commercial door hardware in brushed metal.',
    tone:
      'The commercial positioning stays technical and service-focused, anchored in grade classifications, restricted key control, and foreclosure support.',
    summary:
      'Verified source material emphasizes lock grades, high-security cylinders, and restricted duplication rather than generic sales copy.',
    quotes: [
      'In residential or commercial door lock applications there are 2 distinct types of locks - ordinary security and high security.',
      'There are 3 grades of locks - Grade 1 - commercial - industrial; Grade 2 - heavy duty residential / light duty commercial; Grade 3 - residential only / consumer expendable.',
      'Residential and Commercial Foreclosure Support.',
    ],
  },
  {
    id: 'automotive',
    label: 'Automotive',
    title: 'Transponder, VATS, and all-keys-lost work',
    icon: CarFront,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Automotive bodyline reflecting metallic light.',
    tone:
      'The original Phoenix material is heavily automotive, especially around transponder, VATS, ECU flashing, and code-cut keys.',
    summary:
      'This section keeps the legacy automotive scope visible while framing it for current Orlando service intent.',
    quotes: [
      'Automotive services include opening, making first key when all keys are lost, and re-keying to a new key.',
      'If you have a transponder vehicle it is ESSENTIAL to have spare keys on hand TO AVOID A VERY EXPENSIVE problem should your key be lost or stolen or broken.',
      'This service can save you $1000.00 or more versus the cost of a new ECM computer from the dealer!',
    ],
  },
  {
    id: 'safe',
    label: 'Safe',
    title: 'Safe opening and servicing',
    icon: Vault,
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vault mechanism and machined safe hardware.',
    tone:
      'Safe work is presented as specialist locksmithing: servicing, combination changes, diagnostics, drilling, moving, and proper container selection.',
    summary:
      'The source site positions safes as a distinct high-skill practice rather than an add-on.',
    quotes: [
      'I am trained and experienced to provide routine safe service, combination changing, and penetration of locked up containers.',
      'Mobile service to your location for routine safe servicing is as low as $125.00 (one lock on one door). Each additional lock or door is only $35.00 additional.',
      'If you have a safe and are having intermittent trouble opening it DO NOT LOCK IT - call 602-717-5397 for service instead.',
    ],
  },
]

const transitionPoints = [
  'Locksmith Charley Now serving Orlando Area.',
  "Charles Eastwood, CRL Locksmith Charley's Website - Apopka FL and Orlando 1-800-313-5397.",
  'Phoenix, or even my neighborhood.',
  'I continue to perform Residential, Commercial, and Automotive locksmith services and I also do SAFE OPENING and servicing which I would like to specialize in.',
]

function App() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      <section className="relative min-h-screen overflow-hidden bg-[#131A20] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(198,146,20,0.32),_transparent_32%)]" />
          <div className="absolute inset-y-0 right-[-10%] w-[58%] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_35%,rgba(198,146,20,0.18)_60%,rgba(255,255,255,0.02)_100%)] opacity-70" />
          <div className="absolute inset-y-[12%] right-[10%] w-32 border border-white/20" />
          <div className="absolute bottom-[16%] right-[18%] h-44 w-44 rotate-45 border border-brass/70" />
          <div className="absolute right-[8%] top-[18%] h-[46vh] w-[26vw] min-w-[220px] rounded-full border border-white/15" />
          <div className="absolute bottom-0 right-[20%] top-[24%] w-px bg-white/20" />
          <div className="absolute left-0 right-[40%] top-[18%] h-px bg-white/15" />
        </div>

        <div className="section-frame relative flex min-h-screen flex-col pb-12 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-heading text-3xl uppercase tracking-[0.14em] text-sand">
                Locksmith Charley
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                Charles Eastwood, CRL
              </p>
            </div>
            <a
              href="tel:18887175397"
              className="inline-flex items-center gap-2 border border-brass/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brass transition hover:bg-brass hover:text-ink"
            >
              1-888-717-5397
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-end lg:py-16">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">The Precision Keymaster</p>
              <h1 className="font-heading text-[5.3rem] uppercase leading-[0.88] tracking-[0.02em] text-sand sm:text-[6.8rem] lg:text-[9rem]">
                Locksmith
                <br />
                Charley
              </h1>
              <div className="mt-6 h-px max-w-2xl bg-white/15" />
              <div className="mt-8 grid gap-6 text-base leading-7 text-white/78 lg:grid-cols-[1.1fr_0.9fr]">
                <p>
                  Charles Eastwood, CRL locksmith service for residential,
                  commercial, automotive, and safe locksmith needs, with legacy
                  Phoenix, Arizona content and current Orlando, Florida service
                  relevance.
                </p>
                <p>
                  &ldquo;Locksmith Charley Now serving Orlando Area.&rdquo;
                  &nbsp;&ldquo;I do hold myself to a high degree of
                  professionalism, integrity and HONOR*.&rdquo;
                </p>
              </div>
            </div>

            <div className="relative flex flex-col justify-end gap-8 lg:pl-10">
              <div className="grid gap-5 text-sm uppercase tracking-[0.24em] text-white/58 sm:grid-cols-2">
                <span>Residential</span>
                <span>Commercial</span>
                <span>Automotive</span>
                <span>Safes</span>
              </div>
              <div className="metal-panel relative overflow-hidden border border-white/10 p-6 text-ink shadow-machined">
                <div className="absolute inset-x-0 top-0 h-px bg-brass/80" />
                <div className="absolute right-6 top-6 h-14 w-14 rounded-full border border-ink/20" />
                <p className="font-heading text-7xl uppercase leading-none tracking-[0.08em] text-[#24313B]">
                  CRL
                </p>
                <div className="mt-8 grid gap-4 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/78">
                  <p>
                    Charles Eastwood, CRL Locksmith Charley&apos;s Website -
                    Apopka FL and Orlando 1-800-313-5397
                  </p>
                  <p>
                    Work orders may also be sent in by E-mail to:
                    Orders@LocksmithCharley.com
                  </p>
                  <p>
                    Please include telephone numbers for confirmation call as
                    well as the address where the work needs to be done, the
                    nature of the work to be done, and if it involves a vehicle
                    the Year, Make, and Model of the vehicle involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {services.map((service, index) => {
        const Icon = service.icon
        const reverse = index % 2 === 1

        return (
          <section
            id={service.id}
            key={service.id}
            className={reverse ? 'bg-surface' : 'bg-sand'}
          >
            <div className="section-frame grid gap-12 py-20 lg:grid-cols-12 lg:items-start lg:py-28">
              <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                <div className="relative overflow-hidden border border-ink/10 shadow-machined">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,26,32,0.08),rgba(19,26,32,0.52))]" />
                  <div className="absolute inset-y-10 left-10 w-px bg-white/35" />
                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white">
                    <div>
                      <p className="eyebrow !text-white/70">{service.label}</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-white/82">
                        {service.summary}
                      </p>
                    </div>
                    <Icon size={34} className="text-brass" />
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                <div className="flex items-start justify-between gap-4 border-b border-ink/12 pb-5">
                  <div>
                    <p className="eyebrow">{service.label}</p>
                    <h2 className="section-title mt-3 max-w-3xl text-ink">
                      {service.title}
                    </h2>
                  </div>
                  <span className="font-heading text-6xl text-ink/12">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1fr]">
                  <p className="text-sm uppercase leading-6 tracking-[0.18em] text-ink/58">
                    {service.tone}
                  </p>
                  <div className="grid gap-5 text-base leading-8 text-ink/82">
                    {service.quotes.map((quote) => (
                      <p key={quote} className="border-l border-brass/55 pl-5">
                        &ldquo;{quote}&rdquo;
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="relative overflow-hidden bg-[#131A20] py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02),transparent_40%,rgba(198,146,20,0.14)_100%)]" />
        <div className="section-frame relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Phoenix to Orlando</p>
            <h2 className="mt-4 font-heading text-6xl uppercase leading-[0.9] tracking-[0.04em] text-sand md:text-8xl">
              Legacy, then
              <br />
              current service.
            </h2>
            <div className="mt-8 max-w-xl text-base leading-8 text-white/76">
              <p>
                The original site preserves Phoenix and Mesa references while
                the homepage also states Orlando and Apopka service. This
                updated page keeps both truths visible so the brand history
                reads as continuity rather than mismatch.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {transitionPoints.map((point, index) => (
              <div
                key={point}
                className="grid gap-4 border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:grid-cols-[80px_1fr]"
              >
                <div className="flex items-center gap-3 font-heading text-4xl text-brass">
                  {index === 0 ? (
                    <MapPinned size={28} />
                  ) : (
                    <ShieldEllipsis size={28} />
                  )}
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-sm leading-7 text-white/78">
                  &ldquo;{point}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
