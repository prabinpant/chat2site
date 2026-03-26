import "./styles.css";

const quickFacts = [
  ["Dates", "March 26 to 28, 2026"],
  ["Venue", "Chandragiri Hills Resort"],
  ["Priority", "Follow cable car timing closely"],
  ["Meals", "Snacks, dinner, breakfast, and lunch covered"],
];

const itinerary = [
  {
    day: "Day 1",
    title: "Departure and check-in",
    summary: "We assemble early, ride up together, settle into the resort, and ease into the evening program.",
    items: [
      "07:30 AM reporting and headcount before departure",
      "09:00 AM cable car transfer window with arrival buffer built in",
      "11:00 AM resort check-in, welcome tea, and room allocation",
      "01:00 PM lunch and free time for the hilltop grounds",
      "06:30 PM sunset regroup, dinner, and team evening",
    ],
  },
  {
    day: "Day 2",
    title: "Activities and group time",
    summary: "The second day is kept flexible so everyone can mix team sessions with optional paid adventures.",
    items: [
      "07:30 AM breakfast service",
      "09:00 AM group session and photo stop",
      "11:00 AM optional adventure activity slots",
      "01:30 PM lunch break and open exploration",
      "04:30 PM return buffer begins so nobody misses the cable car cutoff",
    ],
  },
  {
    day: "Day 3",
    title: "Wrap-up and return",
    summary: "We keep the last morning light, organized, and timed around check-out plus the downhill transfer.",
    items: [
      "07:30 AM breakfast and packing",
      "09:00 AM final meet-up and room clearance",
      "10:00 AM downhill cable car target window",
      "12:00 PM lunch or highway stop based on final travel plan",
      "02:00 PM estimated return and close",
    ],
  },
];

const activities = [
  {
    name: "Zipline",
    type: "Optional add-on",
    note: "Published as one of the main adventure activities at Chandragiri Hills.",
    price: "Budget to confirm",
  },
  {
    name: "Sky Cycling",
    type: "Optional add-on",
    note: "Suitable for attendees who want a short thrill without blocking the group schedule.",
    price: "Budget to confirm",
  },
  {
    name: "Free scenic time",
    type: "Included in our plan",
    note: "View decks, group photos, and relaxed hilltop time are part of the core outing flow.",
    price: "Included",
  },
  {
    name: "Team evening",
    type: "Included in our plan",
    note: "Dinner and evening together are part of the main itinerary, not an extra purchase.",
    price: "Included",
  },
];

const payments = [
  "Resort stay, main itinerary flow, and planned group meals are covered by the outing budget unless we announce otherwise.",
  "Optional adventure activities should be treated as self-paid unless the organizer confirms a subsidy.",
  "We should complete any add-on payment collection before departure so activity check-ins stay quick on site.",
];

const snacks = [
  "Arrival tea, light welcome snacks, and evening bites are planned around check-in and regroup moments.",
  "Breakfast, lunch, and dinner are part of the trip rhythm, with menu specifics confirmed closer to departure.",
  "Anyone with dietary restrictions should share them early so the food plan is adjusted before the final headcount.",
];

document.querySelector("#app").innerHTML = `
  <div class="page-shell">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>
    <header class="hero" id="top">
      <nav class="topbar">
        <a class="brand" href="#top">Chandragiri Escape 2026</a>
        <div class="nav-links">
          <a href="#itinerary">Itinerary</a>
          <a href="#notice">Cable Car Notice</a>
          <a href="#activities">Activities</a>
          <a href="#faq">FAQ</a>
        </div>
      </nav>

      <div class="hero-grid">
        <section class="hero-copy">
          <p class="eyebrow">Office outing trip guide</p>
          <h1>We’re heading to Chandragiri Hills with the plan everyone actually needs.</h1>
          <p class="lead">
            Everything important is here first: our itinerary, the cable car timing warnings, optional activities, payment notes, and food reminders for March 26 to 28, 2026.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#itinerary">View itinerary</a>
            <a class="button button-secondary" href="#notice">Check timing notice</a>
          </div>
          <p class="hero-warning">
            We should treat the downhill and uphill cable car windows as hard planning constraints. Late arrival can disrupt transfers, activity slots, and the return flow.
          </p>
        </section>

        <aside class="hero-panel">
          <p class="panel-label">Quick facts</p>
          <div class="facts">
            ${quickFacts
              .map(
                ([label, value]) => `
                  <div class="fact">
                    <span>${label}</span>
                    <strong>${value}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="mini-note">
            <strong>Arrival rule</strong>
            <p>We should reach the base station early and keep buffer time for queues, weather, and operational changes.</p>
          </div>
        </aside>
      </div>
    </header>

    <main>
      <section class="alert-band" id="notice">
        <div>
          <p class="section-kicker">Operational notice</p>
          <h2>Cable car timing needs repeated attention throughout March 26 to 28, 2026.</h2>
        </div>
        <div class="alert-copy">
          <p>Our site plan depends on the cable car schedule, so reporting late is not a small delay. It can affect check-in, activity time, and the group return.</p>
          <p>We should follow the final organizer-issued boarding window, keep extra buffer for crowd flow, and assume the last boarding guidance is a hard cutoff.</p>
        </div>
      </section>

      <section class="section" id="itinerary">
        <div class="section-head">
          <p class="section-kicker">Three-day flow</p>
          <h2>Our itinerary is designed to be readable in under a minute.</h2>
          <p>Each day keeps the group rhythm clear while leaving room for scenic downtime and optional add-ons.</p>
        </div>
        <div class="timeline">
          ${itinerary
            .map(
              (entry) => `
                <article class="timeline-card">
                  <div class="timeline-meta">
                    <span>${entry.day}</span>
                    <h3>${entry.title}</h3>
                    <p>${entry.summary}</p>
                  </div>
                  <ul>
                    ${entry.items.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section split-layout" id="activities">
        <div class="section-head">
          <p class="section-kicker">Activities and add-ons</p>
          <h2>We can compare optional experiences without mixing them up with what is already included.</h2>
          <p>The activity list below is structured for quick decisions and can be updated as organizer confirmations come in.</p>
        </div>
        <div class="activity-grid">
          ${activities
            .map(
              (activity) => `
                <article class="activity-card">
                  <span class="pill">${activity.type}</span>
                  <h3>${activity.name}</h3>
                  <p>${activity.note}</p>
                  <strong>${activity.price}</strong>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section two-column">
        <article class="content-card">
          <p class="section-kicker">Payments</p>
          <h2>What is included and what is extra</h2>
          <ul class="plain-list">
            ${payments.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>

        <article class="content-card warm-card">
          <p class="section-kicker">Snacks and menu</p>
          <h2>Friendly food notes before we travel</h2>
          <ul class="plain-list">
            ${snacks.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </section>

      <section class="section prep-grid">
        <article class="checklist-card">
          <p class="section-kicker">Before departure</p>
          <h2>Preparation checklist</h2>
          <ul class="plain-list">
            <li>Reach the departure point early enough to protect the cable car buffer.</li>
            <li>Carry a light jacket, comfortable shoes, and anything needed for outdoor activity slots.</li>
            <li>Keep your phone charged so schedule updates remain easy to follow while traveling.</li>
            <li>Confirm any self-paid activity choices before the trip if organizers need advance counts.</li>
          </ul>
        </article>

        <article class="faq-card" id="faq">
          <p class="section-kicker">FAQ</p>
          <h2>Questions we can answer fast</h2>
          <div class="faq-item">
            <strong>Are activity prices final?</strong>
            <p>Not yet. The structure is ready, but final add-on pricing should be confirmed before collection.</p>
          </div>
          <div class="faq-item">
            <strong>Why is the cable car notice repeated so often?</strong>
            <p>Because it controls the practical start and end of the trip. Missing that window affects the whole day.</p>
          </div>
          <div class="faq-item">
            <strong>Where should final updates go?</strong>
            <p>Update the timing notice, quick facts strip, and itinerary time slots first. Those are the most time-sensitive sections.</p>
          </div>
        </article>
      </section>
    </main>
  </div>
`;
