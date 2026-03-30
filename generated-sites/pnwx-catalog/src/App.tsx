const popularProducts = [
  {
    name: 'Fastest Shipping Lead Apparel.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/Aprons/Infab/LightningFast/',
  },
  {
    name: 'Resolution Test Tools/Phantoms.',
    href: 'http://www.pnwx.com/Accessories/Phantoms/Test/Fluoroscopy/',
  },
  {
    name: 'Most Comfortable Aprons.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/Aprons/Infab/Revolution/',
  },
  {
    name: 'X-Ray Merchant Boards.',
    href: 'http://www.pnwx.com/Accessories/PatAsst/MerchantBoards/',
  },
  {
    name: 'Surgical Radiation Reducing Gloves.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/Gloves/Proguard/',
  },
  {
    name: 'ACR accredited Medium MRI Phantom.',
    href: 'http://www.pnwx.com/Accessories/Phantoms/MRI/Pro-Project/ACR-Medium/',
  },
  {
    name: 'Line-Pair Resolution Test Phantoms.',
    href: 'http://www.pnwx.com/Accessories/Phantoms/Test/LinePair/',
  },
  {
    name: 'Small Animal Immobilizers.',
    href: 'http://www.pnwx.com/Accessories/PosAides/Pet-Sitioner/',
  },
  {
    name: 'Lead Glass.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/Windows/',
  },
  {
    name: 'Mobile Lead Barriers.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/MobileBarriers/Infab/',
  },
  {
    name: 'System Test Phantoms.',
    href: 'http://www.pnwx.com/Accessories/Phantoms/Test/',
  },
  {
    name: 'X-Ray Table Pads.',
    href: 'http://www.pnwx.com/Accessories/PatAsst/TablePads/X-Ray/',
  },
  {
    name: 'Lead Curtains.',
    href: 'http://www.pnwx.com/Accessories/LeadProducts/Blockers-Shields/Curtains/',
  },
  {
    name: 'Silver Recovery Systems.',
    href: 'http://www.pnwx.com/Equipment/DarkEquip/Rotex/',
  },
  {
    name: 'X-Ray Grids.',
    href: 'http://www.pnwx.com/Parts/Grids/',
  },
]

const productDirectories = [
  { name: 'Film Identification Markers (ID)', href: 'http://www.pnwx.com/Accessories/Markers/' },
  { name: 'Leaded Glass, Windows and Frames.', href: 'http://www.pnwx.com/Accessories/LeadProducts/Windows/' },
  { name: 'Ultrasound Accessories.', href: 'http://www.pnwx.com/Ultrasound/' },
  { name: 'Ultrasound Gel.', href: 'http://www.pnwx.com/Supplies/Ultrasound/' },
  {
    name: 'Ultrasound Test & Training Phantoms.',
    href: 'http://www.pnwx.com/Accessories/Phantoms/Radiology/Ultrasound/',
  },
  { name: 'Veterinary Specific Products!', href: 'http://www.pnwx.com/Veterinary/' },
  {
    name: 'Equine Cassette Holders.',
    href: 'http://www.pnwx.com/Accessories/Cassettes/Holders/Veterinary/',
  },
  { name: 'X-Ray Portables.', href: 'http://www.pnwx.com/Equipment/VetXray/' },
]

const paymentMethods = [
  'Using your Credit card. We accept:',
  'Using your open account already established with us.',
  'Pay by Money Order.',
  'Pay by check.',
  'Wire Transfer',
]

const policies = [
  {
    title: 'Warranties',
    body:
      'It is important to note that Pacific Northwest X-Ray Inc, manufactures very little of what we sell. Warranties are between you the purchaser and the manufacture of the products you purchase. We will do everything we can to assist you in any and all warranty claims including repair/replacement. But the process by which any warranty situation is handled is determined by the manufacture and not Pacific Northwest X-Ray Inc.',
  },
  {
    title: 'Cancellations/Returns',
    body:
      'Due to the nature of our products, changes or cancellations to an order can only be accepted the day the order is placed, and may require written notice of such action. However, "rush" or same day shipping of an item per the customers request, is an exception to this policy, and NO changes or cancellations are accepted.',
  },
  {
    title: 'Refusal of Shipment',
    body:
      'If for any reason a buyer decides to refuse delivery of ordered goods. Return shipping charges and re-stocking fees will be withheld from any monies that would be credited back to the buyer.',
  },
  {
    title: 'Delivery, setup and usage of purchased products.',
    body:
      'Pacific Northwest X-Ray Inc. is a retailer of radiology and other medical products to the general public. We sell products to you, delivered with a variety of shipping methods.',
  },
]

function App() {
  return (
    <div className="bg-fog text-ink">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-sm text-white md:px-8">
          <div>
            <p className="font-display text-lg font-semibold tracking-[0.18em] uppercase">
              Pacific Northwest X-Ray Inc.
            </p>
            <p className="mt-1 text-white/72">Gresham, Oregon</p>
          </div>
          <div className="hidden text-right md:block">
            <p>Phone: 503-667-3000</p>
            <p>Toll Free U.S.A: 800-827-9729</p>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen overflow-hidden bg-ink text-white">
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center bg-no-repeat hero-image"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,18,25,.88) 0%, rgba(6,18,25,.64) 42%, rgba(6,18,25,.24) 100%), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,193,93,0.20),_transparent_28%)]" />
          <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
            <div className="max-w-2xl">
              <p className="animate-rise text-sm uppercase tracking-[0.24em] text-mist/85">
                Search for X-Ray Products.
              </p>
              <h1 className="animate-rise-delay mt-5 max-w-2xl font-display text-5xl font-semibold leading-[0.94] md:text-7xl">
                Pacific Northwest X-Ray Inc.
              </h1>
              <p className="animate-rise-slow mt-6 max-w-xl text-xl leading-relaxed text-mist md:text-2xl">
                X-Ray - radiology equipment, supplies, parts and accessories!
              </p>
              <p className="animate-rise-slow mt-4 max-w-lg text-base leading-7 text-white/76 md:text-lg">
                This web site is our catalog! No printed catalog is available.
              </p>

              <form
                action="http://www.pnwx.com/Search/"
                method="post"
                className="animate-rise-slow mt-10 flex max-w-xl flex-col gap-3 md:flex-row"
              >
                <input
                  type="text"
                  name="SearchWords"
                  placeholder="Search by Product Name, Brand Name, Stock Number and more!"
                  className="min-h-14 flex-1 border border-white/20 bg-white/10 px-5 text-base text-white outline-none backdrop-blur-sm transition focus:border-signal focus:bg-white/14"
                />
                <button
                  type="submit"
                  className="min-h-14 bg-signal px-8 font-semibold text-ink transition hover:bg-[#ffd47f]"
                >
                  Go!
                </button>
              </form>

              <div className="mt-10 grid gap-4 border-t border-white/15 pt-6 text-sm text-white/82 md:grid-cols-3">
                <div>
                  <p className="text-white">Phone Lines open...</p>
                  <p>8am - 5pm Monday-Friday</p>
                  <p>(Pacific/West Coast Time)</p>
                </div>
                <div>
                  <p className="text-white">Telephone</p>
                  <a className="block hover:text-signal" href="tel:15036673000">
                    Phone: 1-503-667-3000
                  </a>
                  <a className="block hover:text-signal" href="tel:18008279729">
                    Toll-Free (US): 800-827-XRAY (800-827-9729)
                  </a>
                </div>
                <div>
                  <p className="text-white">Fax Your Order 24 Hours a day!</p>
                  <p>1-503-666-8855</p>
                  <p>P.O. Box 625 * Gresham, OR 97030 U.S.A.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-20 px-5 pb-20 md:px-8">
          <div className="mx-auto max-w-7xl bg-white px-6 py-8 shadow-soft md:px-10 md:py-12">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mt-2 font-display text-3xl font-semibold md:text-5xl">
                  ...Or select from some of our most popular....
                </h2>
              </div>
              <a
                className="text-sm font-semibold uppercase tracking-[0.14em] text-steel transition hover:text-ink"
                href="http://www.pnwx.com/Accessories/"
                target="_blank"
                rel="noreferrer"
              >
                Browse Catalog
              </a>
            </div>

            <div className="mt-8 grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
              {popularProducts.map((product, index) => (
                <a
                  key={product.name}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-28 items-end justify-between bg-white px-5 py-5 transition hover:bg-fog"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-3 max-w-xs text-lg leading-snug text-slate-800 transition group-hover:text-steel">
                      {product.name}
                    </p>
                  </div>
                  <span className="translate-y-0 text-2xl text-slate-300 transition group-hover:-translate-y-1 group-hover:text-steel">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                Search by Product Name, Brand Name, Stock Number and more!
              </h2>
              <div className="mt-10 grid gap-y-4 border-t border-slate-300 pt-6 md:grid-cols-2 md:gap-x-10">
                {productDirectories.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-slate-200 py-4 text-lg text-slate-800 transition hover:border-steel"
                  >
                    <span>{item.name}</span>
                    <span className="text-slate-400 transition group-hover:text-steel">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] overflow-hidden">
              <div
                className="sticky top-8 h-[560px] w-full bg-cover bg-center bg-no-repeat grayscale-[10%] motion-safe:animate-drift"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(16,51,69,0.10), rgba(9,20,28,0.35)), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/82 to-transparent p-6 text-white">
                <p className="mt-3 max-w-sm text-2xl font-medium leading-tight">
                  Simply call 800-827-9729 (503-667-3000) to place your order.
                </p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/78">
                  E-Mail your order to: salesD@pnwx.com. Download our order form and then Fax your order
                  to: (503) 666-8855.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-steel px-5 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-mist/70">Order Methods</p>
                <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                  How to place an order with us and our policies.
                </h2>
                <div className="mt-8 space-y-5 text-base leading-8 text-mist">
                  <p>
                    <strong>Simply call 800-827-9729 (503-667-3000) to place your order.</strong> Be sure
                    to see all our contact numbers at the bottom of this page.
                  </p>
                  <p>
                    Please note that our offices are on the west coast of the United States, and are on
                    Pacific Time. We are open Monday through Friday 8am to 5pm.
                  </p>
                  <p>
                    <strong>E-Mail your order to:</strong>{' '}
                    <a className="text-signal hover:text-white" href="mailto:salesD@pnwx.com">
                      salesD@pnwx.com
                    </a>
                    .
                  </p>
                  <p>
                    <a
                      className="text-signal hover:text-white"
                      href="http://www.pnwx.com/PNWX-OrderForm.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download our order form
                    </a>{' '}
                    and then <strong>Fax your order to: (503) 666-8855.</strong>
                  </p>
                  <p>
                    <a
                      className="text-signal hover:text-white"
                      href="http://www.pnwx.com/PNWX-OrderForm.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download our order form
                    </a>{' '}
                    and then <strong>Mail your order in.</strong> Please mail your order to ATTN: Order
                    Processing. Pacific Northwest X-Ray Inc. P.O. Box 625 Gresham, OR 97030 USA.
                  </p>
                </div>
              </div>

              <div className="grid gap-10">
                <div className="grid gap-px bg-white/20">
                  {paymentMethods.map((method) => (
                    <div key={method} className="bg-white/6 px-5 py-5 backdrop-blur-sm transition hover:bg-white/10">
                      <p className="text-lg">{method}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-6 text-sm leading-7 text-mist">
                  <p>
                    Note: $30.00 Product minimum applies to all orders. International orders over $5,000
                    USD require wire transfer only!
                  </p>
                  <p>
                    If you already have an open account with us, you may fax your PO to 503-666-8855 24
                    hours a day, 7 days a week. Sorry, we can not accept PO&apos;s from anyone outside of
                    the United States.
                  </p>
                  <p>
                    Please note that we DO NOT accept attachments of types other than graphics files or
                    Acrobat PDF files. This means MS-Word, Excel and other such files will be deleted
                    automatically and not processed.
                  </p>
                  <p>
                    Please note that we require the first opening order on open credit accounts to be $500
                    USD or more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 border-b border-slate-300 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                  How to place an order with us and our policies.
                </h2>
              </div>
              <a
                href="http://www.pnwx.com/Buy/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-steel transition hover:text-ink"
              >
                View Full Policy Page
              </a>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {policies.map((policy) => (
                <article key={policy.title} className="border-t border-slate-300 py-6">
                  <h3 className="font-display text-2xl font-semibold text-ink">{policy.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-700">{policy.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-6 border-t border-slate-300 pt-8 text-base leading-8 text-slate-700 lg:grid-cols-2">
              <p>
                Any authorized product return is subject to a restocking fee. This amount will range from
                20% to as much as 50%, depending on the manufactures policies. In addition, the customer is
                responsible for all freight charges in both directions.
              </p>
              <p>
                It is also the buyers responsibility to note any and all damages to the shipping container,
                i.e. boxes, before signing and accepting your shipment.
              </p>
              <p>
                We suggest consulting your local yellow pages under &quot;X-Ray Service&quot;. But this is
                the buyers responsibility to acquire and pay for said services.
              </p>
              <p>
                Usage of x-ray equipment on live humans without the proper credentials and/or licenses is a
                serious crime in many countries.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-mist/60">Pacific Northwest X-Ray Inc.</p>
              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                P.O. Box 625 * Gresham, OR 97030 U.S.A.
              </h2>
              <div className="mt-8 space-y-3 text-lg leading-8 text-mist">
                <p>Phone: 1-503-667-3000</p>
                <p>Toll-Free (US): 800-827-XRAY (800-827-9729)</p>
                <p>Fax Your Order 24 Hours a day! 1-503-666-8855</p>
                <p>
                  E-Mail your order to:{' '}
                  <a className="text-signal hover:text-white" href="mailto:salesD@pnwx.com">
                    salesD@pnwx.com
                  </a>
                </p>
              </div>
            </div>

            <div className="border border-white/12 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mt-5 space-y-4 text-sm leading-7 text-mist">
                <p>This web site is our catalog, no printed catalog is available.</p>
                <p>Please keep checking back, changes to this site are made daily.</p>
                <p>
                  Every effort is made on our part to keep all posted prices up to date, however we can not
                  guarantee the accuracy due to notification delays by the manufacturers.
                </p>
                <p>
                  Purchase Orders accepted only upon approval of credit - Min. $500 opening order for new
                  open CHARGE accounts.
                </p>
                <p>All other orders (Cash, Credit Card, etc) subject only to a $30 product minimum order!</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="http://www.pnwx.com/PNWX-OrderForm.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-signal px-5 py-3 text-center font-semibold text-ink transition hover:bg-[#ffd47f]"
                >
                  Download Order Form
                </a>
                <a
                  href="http://www.pnwx.com/Buy/"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/20 px-5 py-3 text-center font-semibold text-white transition hover:border-signal hover:text-signal"
                >
                  Order Methods and Policies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
