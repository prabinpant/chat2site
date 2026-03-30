# Appleway Florist & Greenhouse

## INTERNAL STRATEGY

### The Vision
Restore the existing Appleway Florist & Greenhouse site to a working live deployment without redesigning it and without making code changes unless a specific deployment blocker makes a minimal technical fix unavoidable. The priority is operational recovery: inspect the current project, confirm the correct build output, identify the exact deployment failure, and redeploy or reupload the latest valid version so the public site is stable again.

The live experience should remain warm, colorful, local, and dependable. Treat the current implementation as the primary asset. Preserve what already works. Focus on getting the site back online cleanly and verifying that the deployed result loads correctly across the key pages.

### Project Status
This is an existing-site recovery task.

Current assignment:
- Check the deployment status for `appleway-bloomhouse`.
- Inspect the current project files and determine whether a deployable site already exists.
- Identify the actual failure point: build error, missing asset, invalid config, wrong publish directory, environment mismatch, routing issue, or upload failure.
- Redeploy or reupload the latest valid version of the existing site.
- Avoid redesign work.
- Avoid code changes unless a concrete deployment blocker requires a minimal, targeted fix.
- If no code changes are needed, keep the implementation intact and only restore deployment.

### Brand Facts To Preserve
- Business name: Appleway Florist & Greenhouse & Flower Delivery
- Family-owned since 1952
- Address: 11006 E. Sprague Ave., Spokane, WA 99206
- Primary phone: (509) 924-5050
- Secondary phone: (888) 345-1145
- Same-day delivery is offered
- Local delivery fee: $15 per address
- Same-day order cutoff: before 1:00 p.m. in recipient's time zone
- Sunday delivery is not available
- Store hours: Monday through Friday 8:00 AM to 5:00 PM, Saturday 8:00 AM to 3:00 PM, Sunday closed
- Satisfaction guarantee: 100%
- Wedding flowers are offered
- Greenhouse size: over 30,000 square feet
- Service categories include bouquets, basket gardens, custom silks, sympathy arrangements, plants, gift baskets, fruit baskets, candles, plush animals, balloons, candy, greeting cards, and gift items

### Persona & Tone
- Warm, established, and reassuring
- Personal without sounding overly casual
- Experienced local florist, not a generic national flower marketplace
- Rich in floral color, greenhouse texture, and neighborhood trust
- Clear and caring in sympathy and memorial contexts
- Practical and welcoming in delivery, ordering, and contact language
- Confident, polished, and grounded in long-standing local service

### Visual Identity Direction
- Preserve the existing floral and greenhouse direction already built into the site
- Support the brand with fresh greens, blush, cream, soft white, and deeper natural accents
- Keep a real local-shop feeling rather than a generic ecommerce template
- Let flowers, plants, and warmth carry the visual energy
- Do not restyle the site unless a broken asset or deployment issue forces a narrowly scoped fix

### Historical Context
A previous Appleway Florist & Greenhouse site has already been created and positioned around local trust, floral abundance, sympathy work, weddings, plants, gifts, and same-day delivery. The problem is not concept development. The problem is getting that site live again.

Treat the current implementation as meaningful existing work. Before making any changes, inspect the current project and compare it against the intended Appleway direction. Preserve strong sections, existing layouts, approved content, and working assets. The task is to recover and relaunch the current site, not replace it.

### Comparative Research Directives
Use the live Appleway site as the factual source of truth for business details and compare it against the current generated project before redeploying.

Required reference targets:
- Home page: `https://www.applewayflorist.com/`
- About page: `https://www.applewayflorist.com/about-us`
- Spokane Valley florist page: `https://www.applewayflorist.com/florist-spokane-valley-wa/`
- Relevant live category pages for occasions, sympathy, plants, weddings, and gifts

Research tasks:
- Confirm the exact brand name usage shown on the live site.
- Confirm address, phone numbers, store hours, delivery fee, same-day cutoff, and Sunday delivery limitation.
- Capture the current navigation labels and service categories actually offered.
- Identify any geographic service areas named on the live site.
- Confirm how the live site describes weddings, sympathy flowers, greenhouse offerings, and gift categories.
- Compare these facts against the current generated site before redeploying.
- If the current project already contains the right facts, preserve them.
- If the project and the live business details conflict, correct only what is necessary for factual accuracy.

#### Brand Identity Extraction
- Pull the homepage headline, supporting service language, and any heritage messaging.
- Note how the business describes family ownership, local delivery, sympathy care, weddings, plants, and greenhouse inventory.
- Record the live service lists and navigation wording.
- Preserve the strongest factual language while keeping the voice natural and local.

#### Favicon
- Check `https://www.applewayflorist.com/favicon.ico`
- Inspect homepage HTML for any alternate favicon, touch icon, or app icon references.
- Use the live brand-appropriate favicon if the current deployment is missing one or pointing to a broken asset.

#### SEO Titles
Extract the real `<title>` and meta description from:
- Home page
- About page
- Spokane Valley florist page
- Key live category pages for sympathy, plants, weddings, and gifts

Record:
- Exact page titles
- Exact meta descriptions
- Patterns used for florist, flower delivery, sympathy, plants, weddings, and local geography pages

Reuse only what is factual and brand-appropriate. Do not invent claims, rankings, awards, or service areas.

### Deployment Recovery Directives
- Inspect the current project structure and identify the production output directory.
- Check whether a previously built static output already exists.
- Review deployment configuration, publish path, routing behavior, and asset paths.
- Confirm whether the deployment failed because of missing files, invalid config, incorrect output directory, case-sensitive asset mismatches, broken absolute paths, or upload errors.
- Rebuild only if necessary to produce the exact existing site for deployment.
- Reupload or redeploy the latest valid version.
- Verify that the live deployment loads successfully on the home page and core interior pages after publish.
- Check that images, favicon references, metadata, and navigation links resolve correctly in production.
- Confirm the final deployment status for `appleway-bloomhouse` after the recovery attempt.

### Do Not Do
- Do not redesign the site.
- Do not rewrite working sections just to refresh the copy.
- Do not replace the existing implementation with a new template.
- Do not invent business history, awards, sourcing claims, or unsupported services.
- Do not leave placeholder text, broken images, dead buttons, or empty routes in the redeployed site.
- Do not make code changes unless a concrete deployment blocker requires a minimal, targeted fix.

### Content Handling Rules
- Preserve operational business facts exactly.
- Preserve the current site structure if it is coherent and on-brand.
- Prefer recovery, verification, and relaunch over revision.
- If factual mismatches are discovered, correct only what is necessary to align with the real business.
- Keep any unavoidable edits narrow and production-focused.

### Marketing Copy Strategy
If any copy must be restored, completed, or repaired during deployment recovery, keep it warm, local, and customer-facing.

Priorities:
- Lead with long-standing local trust and dependable same-day service.
- Keep flowers, sympathy, weddings, plants, and gifts easy to find.
- Use the greenhouse as a real point of distinction.
- Make calls to action direct: shop flowers, call the store, visit us, order for delivery.
- Preserve a real Spokane Valley florist voice rather than a generic ecommerce tone.

## SUGGESTED UI COPY

### Hero
**Headline:**
Flowers for Life's Special Moments

**Subheadline:**
We have been helping Spokane Valley celebrate, comfort, and connect since 1952 with fresh flowers, plants, and thoughtful gifts for every occasion.

**Primary CTA:**
Shop Flowers

**Secondary CTA:**
Call (509) 924-5050

### Intro Section
We are a family-owned florist and greenhouse with deep local roots and a love for beautiful, well-made arrangements. Whether you are sending birthday flowers, sympathy designs, anniversary blooms, or a just-because surprise, we are here to help you choose something meaningful.

### Heritage Section
**Headline:**
Serving Spokane Valley Since 1952

**Body:**
For generations, our family has created fresh floral arrangements, plants, and gifts with personal care and dependable local service. We are proud to be a florist our community can call for everyday moments, major milestones, and everything in between.

### Occasions Section
**Headline:**
Flowers for Every Occasion

**Body:**
From birthdays and anniversaries to new babies, thank-you flowers, get-well wishes, and everyday surprises, we design arrangements that feel personal and beautiful. If you have something specific in mind, we are happy to create a custom design.

### Sympathy Section
**Headline:**
Sympathy Flowers with Heart

**Body:**
When words are hard to find, we are here to help you send something thoughtful and comforting. We create sympathy and funeral arrangements with care, grace, and attention to every detail.

### Wedding Section
**Headline:**
Wedding Flowers

**Body:**
We would love to help you celebrate your day with flowers that feel right for your ceremony, reception, and personal style. From bouquets to larger arrangements, we create wedding flowers with beauty and care.

### Greenhouse Section
**Headline:**
Fresh From Our Greenhouse

**Body:**
With more than 30,000 square feet of greenhouse space, we offer a wide variety of plants, hanging baskets, and seasonal color. Stop in and see what is growing.

### Gifts Section
**Headline:**
More Than Flowers

**Body:**
Along with fresh arrangements, we offer plants, basket gardens, custom silks, gift baskets, fruit baskets, candles, plush animals, balloons, candy, greeting cards, and more.

### Delivery Section
**Headline:**
Same-Day Delivery Available

**Body:**
We offer same-day delivery for orders placed before 1:00 p.m. in the recipient's time zone. Local delivery is available throughout Spokane Valley and nearby communities.

**Fine Print Style Copy:**
A local delivery fee of $15 applies to each address. We do not offer Sunday delivery.

### Trust Section
**Headline:**
Designed with Care. Delivered with Confidence.

**Body:**
Every order matters to us. We bring experience, personal attention, and a 100% satisfaction guarantee to every arrangement we create.

### Visit Section
**Headline:**
Visit Our Shop

**Body:**
Come see us at 11006 E. Sprague Ave., Spokane, WA 99206. We are open Monday through Friday from 8:00 AM to 5:00 PM and Saturday from 8:00 AM to 3:00 PM.

### Contact CTA
**Headline:**
Let Us Help You Send Something Beautiful

**Body:**
Shop online, call us at (509) 924-5050, or stop by the store. We are here to help with flowers, plants, gifts, and local delivery.

### Footer Copy
Appleway Florist & Greenhouse & Flower Delivery  
11006 E. Sprague Ave., Spokane, WA 99206  
(509) 924-5050

Family-owned since 1952.
