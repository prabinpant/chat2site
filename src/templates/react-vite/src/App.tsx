const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

const features = [
  {
    title: 'Rooted in tradition',
    description:
      'Recipes draw from Nepali kitchens, mountain spice routes, and celebratory family feasts.',
  },
  {
    title: 'Local seasonal sourcing',
    description:
      'Fresh herbs, regional vegetables, and carefully selected meats shape a menu with real depth.',
  },
  {
    title: 'Warm modern dining',
    description:
      'A refined room with handcrafted details, soft lighting, and polished service from lunch through late dinner.',
  },
]

const menuCategories = [
  {
    title: 'Starters',
    items: [
      {
        name: 'Timur Crispy Potatoes',
        description: 'Golden potatoes, roasted garlic aioli, toasted timur pepper, fresh coriander.',
        price: '$8',
      },
      {
        name: 'Smoked Tomato Choila',
        description: 'Charred tomato relish with mustard oil, sesame, chili, and flatbread shards.',
        price: '$9',
      },
    ],
  },
  {
    title: 'Momos',
    items: [
      {
        name: 'Buff Momos',
        description: 'Classic Kathmandu-style dumplings with chili sesame chutney.',
        price: '$12',
      },
      {
        name: 'Himalayan Mushroom Momos',
        description: 'Wild mushroom filling, scallion oil, and a light roasted tomato broth.',
        price: '$11',
      },
    ],
  },
  {
    title: 'Main Dishes',
    items: [
      {
        name: 'Mustang Lamb Curry',
        description: 'Slow-braised lamb, black cardamom, fenugreek, and saffron basmati rice.',
        price: '$22',
      },
      {
        name: 'Everest Thakali Plate',
        description: 'Dal, seasonal tarkari, achar, saag, rice, and grilled market protein.',
        price: '$24',
      },
    ],
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Juju Dhau Cheesecake',
        description: 'Creamy Bhaktapur yogurt cheesecake with honey and pistachio crumble.',
        price: '$9',
      },
      {
        name: 'Spiced Kheer Brulee',
        description: 'Rice pudding custard with cardamom caramel and almond brittle.',
        price: '$8',
      },
    ],
  },
  {
    title: 'Drinks',
    items: [
      {
        name: 'Himalayan Masala Chiya',
        description: 'Slow-brewed milk tea with cardamom, cinnamon, and mountain honey.',
        price: '$5',
      },
      {
        name: 'Sea Buckthorn Spritz',
        description: 'Bright citrus, herbal soda, and a chilled golden finish.',
        price: '$7',
      },
    ],
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    alt: 'Nepali platter with curries and rice',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    alt: 'Restaurant dining room with warm lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    alt: 'Steamed momos served with dipping sauce',
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    alt: 'Chef plating a dish in a modern kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
    alt: 'Cocktail and dessert on a restaurant table',
  },
  {
    src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
    alt: 'Guests sharing food around a table',
  },
]

function App() {
  return (
    <div className="bg-[#f7efe3] text-[#2d1c18]">
      <style>{`
        :root {
          color-scheme: light;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          min-width: 320px;
          background: #f7efe3;
          color: #2d1c18;
          font-family: Georgia, "Times New Roman", serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(142,32,38,0.22),transparent_55%)]" />
        <div className="absolute inset-x-0 top-40 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_60%)]" />

        <header className="sticky top-0 z-50 border-b border-[#8f5f39]/15 bg-[#f7efe3]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8f5f39]/25 bg-[#7a2e2a] text-sm font-semibold uppercase tracking-[0.35em] text-[#f8ead2]">
                HS
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#8f5f39]">
                  Kathmandu, Nepal
                </p>
                <p className="font-sans text-lg font-semibold tracking-[0.08em] text-[#2d1c18]">
                  Himalayan Spice
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm font-medium text-[#5b3a2f] transition hover:text-[#7a2e2a]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#reservation"
              className="rounded-full bg-[#3b82f6] px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.25)] transition hover:bg-[#2563eb]"
            >
              Reserve Table
            </a>
          </div>
        </header>

        <main id="top">
          <section className="relative isolate">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1600&q=80"
                alt="Nepali cuisine served in a warm restaurant setting"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,20,16,0.84)_0%,rgba(33,20,16,0.62)_45%,rgba(33,20,16,0.5)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(122,46,42,0.18),rgba(33,20,16,0.12)_35%,rgba(33,20,16,0.72)_100%)]" />
            </div>

            <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.32em] text-[#f8ead2]">
                  Authentic Nepali & Himalayan fusion
                </div>
                <h1 className="mt-8 text-5xl font-semibold leading-none tracking-[-0.05em] text-[#fff4e8] sm:text-6xl lg:text-7xl">
                  Himalayan Spice
                </h1>
                <p className="mt-5 font-sans text-lg uppercase tracking-[0.38em] text-[#f0d5b0]">
                  Authentic Himalayan Flavors
                </p>
                <p className="mt-8 max-w-2xl font-sans text-base leading-8 text-[#f5e6d2]/88 sm:text-lg">
                  A contemporary restaurant inspired by Kathmandu&apos;s bustling food culture,
                  handcrafted momos, slow-cooked curries, and the warmth of Himalayan hospitality.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center rounded-full bg-[#7a2e2a] px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-[#fff4e8] transition hover:bg-[#642521]"
                  >
                    View Menu
                  </a>
                  <a
                    href="#reservation"
                    className="inline-flex items-center justify-center rounded-full border border-[#f0d5b0]/40 bg-white/10 px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-[#fff4e8] backdrop-blur transition hover:bg-white/15"
                  >
                    Reserve Table
                  </a>
                </div>
              </div>

              <div className="lg:justify-self-end">
                <div className="rounded-[2rem] border border-white/15 bg-[rgba(52,29,24,0.56)] p-6 shadow-2xl shadow-black/30 backdrop-blur-md">
                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {[
                      ['Signature', 'Hand-folded momos'],
                      ['Location', 'Lazimpat, Kathmandu'],
                      ['Hours', '11:00 AM - 11:00 PM'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                        <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#d4af37]">
                          {label}
                        </p>
                        <p className="mt-3 text-xl font-semibold text-[#fff4e8]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative">
                <div className="absolute -left-6 top-8 hidden h-32 w-32 rounded-full border border-[#d4af37]/35 lg:block" />
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
                  alt="Chef working in the kitchen"
                  className="relative h-[28rem] w-full rounded-[2rem] object-cover shadow-[0_28px_90px_rgba(74,39,20,0.18)]"
                />
              </div>

              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f39]">
                  About Us
                </p>
                <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#2d1c18] sm:text-5xl">
                  Himalayan traditions, retold with a modern Kathmandu rhythm.
                </h2>
                <p className="mt-6 max-w-2xl font-sans text-base leading-8 text-[#5b3a2f] sm:text-lg">
                  Himalayan Spice began with a simple idea: present the comfort of Nepali home
                  cooking in a refined dining room without losing its soul. Our kitchen works with
                  local vegetables, mountain herbs, house-ground masalas, and time-honored methods
                  that let every broth, achar, and curry develop real character.
                </p>
                <p className="mt-5 max-w-2xl font-sans text-base leading-8 text-[#5b3a2f] sm:text-lg">
                  From steamed momos to slow-braised lamb, each plate balances memory and
                  innovation, celebrating the warmth of Himalayan hospitality in the heart of
                  Kathmandu.
                </p>
              </div>
            </div>
          </section>

          <section id="features" className="bg-[#2d1c18] py-20 text-[#f8ead2]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-sans text-sm font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
                    Features
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    Crafted for guests who want warmth, elegance, and depth in every course.
                  </h2>
                </div>
                <p className="max-w-xl font-sans text-base leading-8 text-[#ead8c0]/75">
                  Clean lines, earthy textures, and subtle Nepali inspiration shape a dining
                  experience that feels both elevated and grounded.
                </p>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <div className="h-1.5 w-16 rounded-full bg-[#d4af37]" />
                    <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                    <p className="mt-4 font-sans text-base leading-8 text-[#ead8c0]/78">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f39]">
                Featured Menu
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#2d1c18] sm:text-5xl">
                Signature dishes from the Himalayan table.
              </h2>
              <p className="mt-5 font-sans text-base leading-8 text-[#5b3a2f] sm:text-lg">
                Built around bold spice, regional ingredients, and polished presentation.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {menuCategories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-[1.75rem] border border-[#8f5f39]/15 bg-[#fffaf3] p-7 shadow-[0_18px_45px_rgba(94,56,34,0.08)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-[#2d1c18]">{category.title}</h3>
                    <span className="rounded-full bg-[#d4af37]/12 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5f39]">
                      Chef&apos;s pick
                    </span>
                  </div>

                  <div className="mt-7 space-y-6">
                    {category.items.map((item) => (
                      <div key={item.name} className="border-b border-[#8f5f39]/10 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-lg font-semibold text-[#2d1c18]">{item.name}</h4>
                          <span className="font-sans text-sm font-semibold text-[#7a2e2a]">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-2 font-sans text-sm leading-7 text-[#5b3a2f]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="gallery" className="bg-[#efe2cf] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f39]">
                  Gallery
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#2d1c18] sm:text-5xl">
                  A closer look at the room, the kitchen, and the plates.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`group relative overflow-hidden rounded-[1.75rem] ${
                      index % 3 === 1 ? 'sm:translate-y-8' : ''
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(45,28,24,0.72)_100%)] opacity-80 transition group-hover:opacity-95" />
                    <p className="absolute bottom-5 left-5 right-5 font-sans text-sm font-medium tracking-[0.08em] text-[#fff4e8]">
                      {image.alt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="reservation" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f39]">
                  Reservation
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#2d1c18] sm:text-5xl">
                  Reserve your table for an evening of Himalayan flavor.
                </h2>
                <p className="mt-6 max-w-xl font-sans text-base leading-8 text-[#5b3a2f] sm:text-lg">
                  Ideal for intimate dinners, family celebrations, and business meals in a warm,
                  design-forward setting.
                </p>
              </div>

              <form
                className="rounded-[2rem] border border-[#8f5f39]/15 bg-[#fffaf3] p-6 shadow-[0_20px_50px_rgba(94,56,34,0.1)] sm:p-8"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {[
                    { label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                    { label: 'Phone', type: 'tel', placeholder: '+977 98XXXXXXXX' },
                    { label: 'Date', type: 'date', placeholder: '' },
                    { label: 'Time', type: 'time', placeholder: '' },
                    { label: 'Guests', type: 'number', placeholder: '2' },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-[#5b3a2f]">
                        {field.label}
                      </span>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        min={field.type === 'number' ? 1 : undefined}
                        className="mt-3 w-full rounded-2xl border border-[#8f5f39]/15 bg-white px-4 py-3.5 font-sans text-sm text-[#2d1c18] outline-none transition placeholder:text-[#a18472] focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/10"
                      />
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#7a2e2a] px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-[#fff4e8] transition hover:bg-[#642521]"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          </section>

          <section id="contact" className="bg-[#2d1c18] py-20 text-[#f8ead2]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                  Contact
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Visit us in Kathmandu.
                </h2>
                <div className="mt-8 space-y-5 font-sans text-base leading-8 text-[#ead8c0]/82">
                  <p>
                    Address
                    <br />
                    Durbar Marg, Kathmandu, Nepal
                  </p>
                  <p>
                    Phone
                    <br />
                    +977 1 4441234
                  </p>
                  <p>
                    Email
                    <br />
                    hello@himalayanspice.com
                  </p>
                  <p>
                    Opening Hours
                    <br />
                    Daily: 11:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3">
                <div className="flex h-full min-h-[22rem] items-center justify-center rounded-[1.5rem] border border-dashed border-[#d4af37]/35 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(255,255,255,0.04))] px-6 text-center">
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.34em] text-[#d4af37]">
                      Map Placeholder
                    </p>
                    <p className="mt-4 text-2xl font-semibold text-[#fff4e8]">
                      Himalayan Spice
                    </p>
                    <p className="mt-3 font-sans text-base leading-8 text-[#ead8c0]/78">
                      Positioned in the heart of Kathmandu with easy access for lunch meetings,
                      evening dinners, and weekend gatherings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#8f5f39]/15 bg-[#f7efe3]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7a2e2a] text-xs font-semibold uppercase tracking-[0.3em] text-[#f8ead2]">
                HS
              </div>
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f39]">
                  Himalayan Spice
                </p>
                <p className="font-sans text-sm text-[#5b3a2f]">
                  © 2026 Himalayan Spice. All rights reserved.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 font-sans text-sm font-medium text-[#5b3a2f]">
              <a href="https://instagram.com" className="transition hover:text-[#7a2e2a]">
                Instagram
              </a>
              <a href="https://facebook.com" className="transition hover:text-[#7a2e2a]">
                Facebook
              </a>
              <a href="https://x.com" className="transition hover:text-[#7a2e2a]">
                X
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
