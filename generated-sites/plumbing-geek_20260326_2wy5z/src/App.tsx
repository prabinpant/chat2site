import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const navigationGroups = [
  {
    title: 'Vintage Plumbing',
    items: [
      { label: 'Restoration', href: 'http://www.plumbing-geek.com/antique-faucet-repair.html' },
      { label: 'Repair', href: 'http://www.plumbing-geek.com/vintageplumbing.html' },
      {
        label: 'Buy Vintage Fixtures',
        href: 'http://www.plumbing-geek.com/vintageplumbingfixtures.html',
      },
      { label: 'Standard', href: 'http://www.plumbing-geek.com/vintagestandardfixtures.html' },
      { label: 'Crane Co.', href: 'http://www.plumbing-geek.com/craneplumbingfixtures.html' },
    ],
  },
  {
    title: 'Hire Plumbing Geek',
    items: [
      { label: 'Brians Plumbing Works', href: 'http://www.plumbing-geek.com/brians-plumbing-works.html' },
      { label: 'FAQ', href: 'http://www.plumbing-geek.com/faq.html' },
      { label: 'Contact', href: 'http://www.plumbing-geek.com/contact-plumbing-geek.html' },
      { label: 'Portfolio', href: 'http://www.plumbing-geek.com/antique-plumbing-fixtures.html' },
      { label: 'About', href: 'http://www.plumbing-geek.com/about-me.html' },
      { label: 'Blog', href: 'http://blog.plumbing-geek.com' },
      {
        label: 'Find A Local Contractor',
        href: 'http://www.plumbing-geek.com/Find-A-Local-Contractor.html',
      },
    ],
  },
  {
    title: 'DIY Plumbing Guides',
    items: [
      { label: 'Plumbing Basics', href: 'http://www.plumbing-geek.com/plumbing-basics.html' },
      { label: 'DIY Guides', href: 'http://www.plumbing-geek.com/doityourselfplumbingrepair.html' },
      { label: 'Tools', href: 'http://www.plumbing-geek.com/plumbing-tool.html' },
      { label: 'Supplies', href: 'http://www.plumbing-geek.com/plumbing-supplies.html' },
      { label: 'Pipes', href: 'http://www.plumbing-geek.com/plumbing-pipes.html' },
      { label: 'Frozen Pipes', href: 'http://www.plumbing-geek.com/frozen-water-pipes.html' },
      { label: 'Clogged Drains', href: 'http://www.plumbing-geek.com/clogged-drains.html' },
      { label: 'Water Heater Info', href: 'http://www.plumbing-geek.com/water-heater-info.html' },
      { label: 'Emergency Plumbing', href: 'http://www.plumbing-geek.com/emergency-plumbing.html' },
    ],
  },
]

const articleParagraphs = [
  <>
    Who is a plumbing-geek? Anyone that finds beauty in a well-functioning plumbing
    system. That person you know who actually begins DIY plumbing projects when
    everything was working or the do it yourself plumbing guru everyone calls for
    advice are both plumbing geeks.
  </>,
  <>
    Because of plumbing&apos;s utilitarian nature, function is always more important
    than form. However, beauty and function are always attainable in plumbing.
  </>,
  <>One of my first vintage plumbing restoration projects. Pretty isn&apos;t it?</>,
  <>
    Plumbing should be essentially out-of-mind. You may not notice good plumbing but
    you <i>always</i> notice plumbing that <i>doesn&apos;t</i> work as it should. For
    example, you should NEVER have to explain to a guest how to use your plumbing...
    &quot;just jiggle the handle three times.&quot;
  </>,
  <>
    Plumbing is fundamental to our lifestyle. Yet few people really understand the
    plumbing systems in their homes.
  </>,
  <>
    Our mission is to help people understand the plumbing systems that serve them, in
    order to promote safety, sanitation, and knowledge. These are important for all
    home owners, but especially important for the DIY plumbing handyman. You may only
    be concerned about your drippy faucet, unaware of other unsafe conditions that
    could make your family sick if left unattended.
  </>,
  <>
    Plumbing codes are based on physical laws; the essential aspects of the plumbing
    code have not changed much in 100 years. Whether you have modern or vintage
    plumbing, your should have confidence that it&apos;s safe, sanitary, and efficient.
  </>,
  <>
    What&apos;s good plumbing? Plumbing is utilitarian... functional. You can compare
    plumbing that works well to a computer that runs well. When both are at their
    peak, you just &quot;use&quot; them without thinking about it. You shouldn&apos;t see
    either your plumber or computer tech very often <i>if they&apos;ve done their job right</i>.
  </>,
  <>
    I&apos;ve been a Portland plumbing contractor for forty years as of December 2024, as
    owner of <b>Brian&apos;s Plumbing Works.</b> After more than forty years as a
    journeyman plumber I&apos;ve seen the good, the bad, and the ugly side of plumbing.
  </>,
  <>
    I&apos;ve had the pleasure of restoring the beauty and function to vintage plumbing
    fixtures in many old homes in the Portland, Oregon area. In doing so, the
    original interior architecture of the homes has been preserved. Many of these
    customers were advised by other plumbers that a remodel was unavoidable because
    of the age of the fixtures.
  </>,
  <>
    The repair or restoration of fixtures is one way to practice <b>green plumbing,</b>{' '}
    and can be much more economical than replacing the fixture or remodeling the
    room.
  </>,
  <>
    <b>I&apos;m a plumbing-geek.</b> I love to repair fixtures. But I&apos;m always
    mindful that the fixture serves the customer, and so do I. My mission as a
    plumber has always been to be a servant of my client. And my personal philosophy
    has been that my needs will be met by serving the needs of others.
  </>,
  <>
    I hope the information you find here on Plumbing-Geek meets your needs. Whether
    you do your own plumbing or choose to hire a plumber, good luck with your
    project!
  </>,
  <>
    If you&apos;re a plumbing geek, or only have a specific need right now, I think
    you&apos;ll be happy with the information on this website. Please contact me with
    any questions or comments. Thank you.
  </>,
]

const sidebarSections = [
  {
    title: 'Vintage Plumbing',
    items: [
      { label: 'Shop', href: 'http://www.plumbing-geek.com/shop.html' },
      { label: 'Restoration', href: 'http://www.plumbing-geek.com/antique-faucet-repair.html' },
      { label: 'Repair', href: 'http://www.plumbing-geek.com/vintageplumbing.html' },
      { label: 'Blog', href: 'http://blog.plumbing-geek.com/' },
    ],
  },
  {
    title: 'Top DIY Guides',
    items: [
      { label: 'Frozen Pipes', href: 'http://www.plumbing-geek.com/frozen-water-pipes.html' },
      { label: 'Emergency Plumbing', href: 'http://www.plumbing-geek.com/emergency-plumbing.html' },
      { label: 'Washing Machine Pipes', href: 'http://www.plumbing-geek.com/washing-machine-pipes.html' },
      { label: 'Washing Machine Drains', href: 'http://www.plumbing-geek.com/washing-machine-drain.html' },
      { label: 'Clogged Pipes', href: 'http://www.plumbing-geek.com/clogged-pipes.html' },
      { label: 'Solvent Cement', href: 'http://www.plumbing-geek.com/solvent-cement.html' },
      { label: 'Solder Copper Pipe', href: 'http://www.plumbing-geek.com/soldering-copper-pipe.html' },
    ],
  },
  {
    title: "DIY's by Category",
    items: [
      { label: 'Plumbing Basics', href: 'http://www.plumbing-geek.com/plumbing-basics.html' },
      { label: 'DIY Guides', href: 'http://www.plumbing-geek.com/doityourselfplumbingrepair.html' },
      { label: 'Plumbing Tools', href: 'http://www.plumbing-geek.com/plumbing-tool.html' },
      { label: 'Plumbing Supplies', href: 'http://www.plumbing-geek.com/plumbing-supplies.html' },
      { label: 'Plumbing Pipes', href: 'http://www.plumbing-geek.com/plumbing-pipes.html' },
      { label: 'Frozen Pipes', href: 'http://www.plumbing-geek.com/frozen-water-pipes.html' },
      { label: 'Clogged Drains', href: 'http://www.plumbing-geek.com/clogged-drains.html' },
      { label: 'Water Heaters', href: 'http://www.plumbing-geek.com/water-heater-info.html' },
      { label: 'Emergency Plumbing', href: 'http://www.plumbing-geek.com/emergency-plumbing.html' },
    ],
  },
]

const footerLinks = [
  { label: 'Home', href: 'http://www.plumbing-geek.com/' },
  { label: 'Contact', href: 'http://www.plumbing-geek.com/contact-plumbing-geek.html' },
  { label: 'About', href: 'http://www.plumbing-geek.com/about-me.html' },
  { label: 'Privacy', href: 'http://www.plumbing-geek.com/privacy-policy.html' },
  { label: 'Disclaimer', href: 'http://www.plumbing-geek.com/disclaimer.html' },
  { label: 'Site Map', href: 'http://www.plumbing-geek.com/site-map.html' },
]

function App() {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = 'Let the plumbing-geek help you with your home plumbing projects.'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        'Let the plumbing-geek help you with your DIY plumbing projects.',
      )
    }

    const scriptId = 'plumbing-geek-cse'
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = 'https://cse.google.com/cse.js?cx=001486685281190327539:xueyvg1uzcc'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <main className="bg-background text-text">
      <section className="relative overflow-hidden border-b border-text/15 bg-text text-background">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(31,26,23,0.78),rgba(31,26,23,0.58)_38%,rgba(31,26,23,0.88)),url('/original-site-images/cranepedlav4.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-patina opacity-70" aria-hidden="true" />

        <motion.div
          className="relative mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border-b border-background/20 pb-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <a
                  href="http://www.plumbing-geek.com/"
                  className="font-heading text-[clamp(2.8rem,8vw,5.8rem)] uppercase leading-[0.88] tracking-[-0.05em]"
                >
                  Plumbing Geek
                </a>
                <p className="mt-3 max-w-xl font-heading text-lg uppercase tracking-[0.22em] text-accent sm:text-xl">
                  Vintage Plumbing Restoration
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-heading text-sm uppercase tracking-[0.18em] text-background/80">
                <a href="http://www.plumbing-geek.com/">Home</a>
                <a href="http://www.plumbing-geek.com/shop.html">Shop</a>
              </div>
            </div>
          </div>

          <nav className="grid gap-8 border-b border-background/15 py-8 md:grid-cols-3">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <p className="font-heading text-lg uppercase tracking-[0.16em] text-accent">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-background/84">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="transition hover:text-white"
                        target={item.href.startsWith('http://blog.') ? '_blank' : undefined}
                        rel={item.href.startsWith('http://blog.') ? 'noreferrer' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </motion.div>
      </section>

      <section className="px-6 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.7fr)]">
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-center font-heading text-[clamp(2.8rem,7vw,5.6rem)] uppercase leading-[0.92] tracking-[-0.05em]">
              The Plumbing-Geek Talks DIY Plumbing
            </h1>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-text/82 sm:text-xl">
              <p>{articleParagraphs[0]}</p>
              <p>{articleParagraphs[1]}</p>

              <figure className="my-10 overflow-hidden border border-text/10 bg-surface shadow-dry">
                <motion.img
                  src="/original-site-images/cranepedlav4.jpg"
                  alt="One of my first vintage plumbing restoration projects"
                  className="w-full object-cover"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                />
              </figure>
              <p>{articleParagraphs[2]}</p>

              <figure className="my-10 overflow-hidden border border-text/10 bg-surface shadow-dry">
                <motion.img
                  src="/original-site-images/cranepedlav2.jpg"
                  alt="Vintage plumbing restoration project detail"
                  className="w-full object-cover"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                />
              </figure>

              {articleParagraphs.slice(3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.article>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-text/12 bg-surface/65 p-6 shadow-dry backdrop-blur-sm">
              <div
                className="cse-shell border-b border-text/12 pb-8"
                dangerouslySetInnerHTML={{ __html: '<gcse:search></gcse:search>' }}
              />

              <div className="space-y-8 pt-8">
                {sidebarSections.map((section) => (
                  <section key={section.title}>
                    <h2 className="font-heading text-2xl uppercase tracking-[0.12em] text-text">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-3 text-lg leading-relaxed">
                      {section.items.map((item) => (
                        <div key={item.label}>
                          <a
                            href={item.href}
                            className="transition hover:text-accent"
                            target={item.href.startsWith('http://blog.') ? '_blank' : undefined}
                            rel={item.href.startsWith('http://blog.') ? 'noreferrer' : undefined}
                          >
                            {item.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}

                <section className="border-t border-text/12 pt-8">
                  <h2 className="font-heading text-2xl uppercase tracking-[0.12em] text-text">
                    Your Donations Help
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-text/76">
                    The Plumbing Geek is now spending an hour or more a day helping people
                    by answering your questions via email or phone. Please consider the
                    value of my help and help me as well with a donation in the amount of
                    your choosing.
                  </p>

                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                    className="mt-6"
                  >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="DZTZW7544B2EA" />
                    <input
                      type="image"
                      src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                      name="submit"
                      alt="PayPal - The safer, easier way to pay online!"
                      className="h-auto max-w-full"
                    />
                    <img
                      alt=""
                      src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                      width="1"
                      height="1"
                      className="sr-only"
                    />
                  </form>
                </section>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-text/15 bg-text px-6 py-8 text-background sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-base text-background/82">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-base text-background/72">Copyright 2021 - plumbing-geek.com</p>
        </div>
      </footer>
    </main>
  )
}

export default App
