# Encore Nanny Collective — Jekyll parody website

**A complete, mobile-first, fictional premium childcare brand for a private joke.**

This repository contains a Jekyll site built for GitHub Pages with six local AI-generated editorial portraits and two homepage photographs, sophisticated typography, responsive navigation, configurable staff profiles, reviews, service areas, FAQ, humor-driven service packages and client-side interactions. No backend, contact collection, analytics, tracking or payments.

> **Private reveal edition:** Encore is a fictional agency created for a personal joke. Visitor-facing parody notices have been removed at the requester’s direction; see `PRIVATE_REVEAL_NOTES.md` before publishing. Never present this site to the general public as an actual childcare service.

## What's included

- `/` — editorial homepage, glamour-vs-competence humor, mock diaper counter
- `/our-people/` — six detailed fictional staff profiles and expandable credentials
- `/the-standard/` — nutrition, childcare and cleaning frameworks
- `/selection-standards/` — specialist fit, documentation and professional boundaries
- `/service-terms/` — prices, coverage, exclusions, written-terms process and privacy considerations
- `/services/` — Encore Flex, Encore Duo, Wife-Away Protocol and After Midnight Engagements
- `/wife-away-protocol/` — special father-with-four-children emergency landing page
- `/after-midnight/` — premium overnight family-continuity satire, fictional $3,950/night tariff
- `/client-stories/` — mock reviews with filter buttons for wives / husbands / children
- `/our-story/` — absurd talent-pipeline origin myth, no real business affiliation
- `/service-areas/` — Calgary-wide coverage across NW, NE, SW, SE, inner city and separately identified neighbouring communities
- `/questions/` — thoughtful answers to suspicious-wives FAQs
- `/get-matched/` — interactive, fully local household-response generator + copy button
- `/enquire/` — private enquiry and entirely local consultation-brief generator
- `/404.html` — branded missing page

**Editorial v3:** Staff biographies and reviews expanded; private-hours service introduced; see `PORTRAIT_ART_DIRECTION.md` for individual future portrait specifications. Existing portraits remain provisional.

## Editorial v12 — standards, service terms and intake decisions

The Selection & Care Standards page and Service Terms page are integrated across the existing navigation, footer, team page, services and enquiry flow. They describe reasonable verification and arrangement steps **without asserting that real personnel have been screened, certified, insured, or engaged**. See `SELECTION_TERMS_V12_NOTES.md`.

**Form handling:** Private Enquiries supports two modes. With `formspree_form_id: ""` it prepares a local-only brief. Set an account-created Formspree ID in `_config.yml` to send form submissions. Details and privacy notes are in `FORM_HANDLING_OPTIONS.md`.

## Replace the placeholder images

**No broken external image links.** The six staff portraits are WebP images in `assets/images/people/`; the hero and lifestyle images are WebP photographs inside `assets/images/`. Replace the exact path with a JPG, PNG, WebP or SVG and update the reference as needed. Good photography will materially improve the prank's credibility.

| Image | Existing file | Where |
| --- | --- | --- |
| Homepage hero | `assets/images/hero-lifestyle.webp` | Main hero right-hand portrait |
| Homepage secondary | `assets/images/household-editorial.webp` | Nutrition / domestic excellence editorial block |
| Staff headshots | `assets/images/people/{kateryna,mila,anastasia,sofia,viktoria,elena}.webp` | Team cards |
| Favicon | `assets/images/favicon.svg` | Browser tab |

For JPG/WebP headshots: (1) add them under `assets/images/people/`; (2) update the `image:` value per person in `_data/people.yml`. Replace the hero filename in `index.html` if necessary. Portrait photo compositions are expected to be **vertical, ideally 4:5 or 3:4**, with upper body/head centered. Hero expects portrait-ish 920×1120; the CSS crops via `object-fit: cover`. Use photos of consenting adults or properly licensed imagery. Avoid any real person's likeness/identity, and avoid implying an actual childcare business is available.

## Edit everything without coding

- **Brand / tagline:** `_config.yml`
- **Person names / profile stories / qualifications:** `_data/people.yml`
- **Customer reviews:** `_data/reviews.yml`
- **FAQs:** `_data/faqs.yml`
- **Neighborhoods:** `_data/areas.yml`
- **Home page:** `index.html`
- **Other pages:** `PAGE-NAME/index.html`
- **Main color and fonts:** `assets/css/main.css` (`:root` CSS variables)
- **Interactions and assessment thresholds:** `assets/js/site.js`

Use valid YAML indentation and wrap any newly inserted copy containing colons in quotes. These are text fixtures; they do not represent real testimonials, qualifications or statistics.

## Preview locally (full Jekyll)

You need Ruby, Bundler, and internet access for the initial Ruby dependency download.

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000/>. If you set a nonempty `baseurl`, the preview will appear under that subpath.

## Publish through GitHub Pages (recommended: GitHub Actions)

1. Create a GitHub repository, e.g. `encore-nanny-collective`.
2. Put all the **contents** of this folder in the repository root and push/commit to `main`. The workflow lives at `.github/workflows/pages.yml`.
3. Edit `_config.yml`: for a **project site** at `https://USERNAME.github.io/encore-nanny-collective/`, set `baseurl: "/encore-nanny-collective"` and `url: "https://USERNAME.github.io"`. For a **user site** (`USERNAME.github.io` repo) or custom-domain root, leave `baseurl: ""` and set the actual `url` (optional).
4. GitHub repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Open **Actions** → `Publish Encore site` to watch the build. On success, visit the published URL from GitHub's Pages settings.

`relative_url` is used for all internal links and image references so a correctly configured `baseurl` works for both project pages and custom domains. The supplied workflow uses official `actions/jekyll-build-pages` and `actions/deploy-pages` actions; no paid hosting or backend needed.

Important: A repository used for GitHub Pages is often public depending on GitHub plan/settings, so don't include identifiable personal data or anything you wouldn't want publicly accessible.

## Run static checks

From the project folder: `python3 scripts/check_site.py` (requires PyYAML). The script validates content inputs, expected files/links, front matter and placeholder paths. A Jekyll build in GitHub Actions remains the authoritative compatibility check.

## Site features and safety boundaries

- The diaper counter is a fictional, deterministic wall-clock estimate. Its three configuration values are in `_config.yml`. It continues increasing across reloads and deployments without a backend.
- The customer review filters and parental assessment run locally; **the form does not submit**.
- The copy-assessment button uses browser clipboard APIs or a legacy fallback. It does not contact a server.
- No overt fictional-status disclosure appears in visitor-facing content. The footer states that online reservations and payments are unavailable. For private use only; the repository README and `PRIVATE_REVEAL_NOTES.md` state the actual status.
- No functional booking, real payment, actual contact address, fabricated real-life childcare certifications or child safety assurance is offered.
- Third-party Google Fonts are optional; system-font fallbacks are provided in CSS. To make the page 100% offline, remove the CSS `@import` line.

### Tone guide

Treat it as a luxury nanny brand first. The wife should notice the suspiciously glamorous portrait photography, then discover that the woman apparently has more nutritional expertise, housekeeping discipline, and toddler stamina than any normal human. Fathers are preposterously enthusiastic, wives are skeptical but reluctantly impressed, and the fake startup's metrics are unfathomably earnest. **The entertainment is in the contrast, not in explicit sexual content.**

## Portrait asset note

The six fictional team portraits are AI-generated and cropped as independently generated images. Each exported WebP file has an exact canvas of **1400×1740 pixels** to match the site’s cards. Because the starting contact sheet contains six photographs, the effective image detail is lower than a separately generated full-resolution portrait. For large print or full-screen use, regenerate each portrait independently at native resolution. They are fictional people, not real caregivers or verified qualifications.

## Editorial v2 updates (2026-10-21)

- Redesigned homepage narrative: serious opening, service pillars, recruitment reveal, mock metrics, then testimonials and Wife-Away Protocol.
- Service-area concept now covers all four Calgary quadrants and inner-city communities; nearby areas outside Calgary are listed separately.
- Updated secondary-page openings, FAQs, service descriptions, sitewide wording and review labels to reduce premature fourth-wall breaks.
- Hero and supporting section use image assets previously created for this project, with the existing roster portraits unchanged until individual identities are approved.
- No working reservation or real customer-contact functionality; the private-reveal documentation identifies the service as parody; visitor-facing footer language remains in character.

## Editorial v8 — Wife-Away Protocol

See `WIFE_AWAY_V8_CHANGELOG.md` for the signature service rewrite and weekend case-plan details.

## v13 — Set up the private enquiry (Formspree)

**The website is Formspree-ready, but cannot send until you create a real Formspree form.**

1. Register or sign into [Formspree](https://formspree.io/). Create a new form named `Encore – Private Client Enquiry`.
2. Set its **target/notification email** in the Formspree dashboard to an inbox you own and can verify. If you own `encorenannycollective.com`, create `concierge@encorenannycollective.com` and verify it as the recipient, or route that mailbox to your designated family address. You cannot configure or verify the recipient by editing the website alone.
3. From Formspree's **Integration** tab, copy the endpoint of the form (`https://formspree.io/f/abcdefgh`) and take only the final ID (`abcdefgh`).
4. Open `_config.yml` and replace `formspree_form_id: ""` with `formspree_form_id: "abcdefgh"` (using YOUR actual ID). Keep `concierge_email: "concierge@encorenannycollective.com"` if you control that mailbox; otherwise change it to a working address.
5. Restart Jekyll after editing `_config.yml` (config edits do not reliably hot-reload): `bundle exec jekyll serve`.
6. Open `/enquire/` to confirm the button reads **Send private enquiry** and that contact name, email and consent fields appear. Test once with your own address, check the Formspree dashboard and the verified destination inbox, and ensure messages are not marked as spam. After the published domain is known, enable **Restrict to Domain** in Formspree settings.

The live form sends only the adult's name, email, household-size bracket, area, care timing/type and selected priorities. Do not ask for children's names, birth dates, medical history, street address, or other private care information. The site cannot confirm reservations. A submit success means Formspree accepted a message, not that a real provider has accepted a booking.

**Recipient routing:** The browser POST goes to your Formspree form ID; the destination address is selected and verified in the Formspree account. A displayed `concierge@...` address is not a functioning mailbox until you create it and control the domain.

## v13 — Diaper counter

In `_config.yml`:

```yaml
diaper_counter_base: 128640
diaper_counter_reference_utc: "2026-10-23T00:00:00Z"
diaper_counter_interval_seconds: 240
```

The base represents an invented cumulative history since 2021, at a scale plausible for a growing Calgary collective over ~5.5 years. The counter adds **one per four minutes after the reference moment**, based on each visitor's current clock. It animates the last 18 counts when first displayed (unless reduced motion is preferred). There is **no server-side state**: values will continue after deployments, across browsers and after long periods offline. If you want faster, more visibly frequent increments for demonstration, change `diaper_counter_interval_seconds` to `30` temporarily. Note that shortening the interval permanently increases the implied ongoing volume. The result is intentionally not an actual count of caregiving events.

The counter uses the visitor device clock; incorrect clocks can alter the display, and perfectly synchronized audited global increments would require a backend. For a private joke website, this is usually preferable to a hosted counter service.


## v14 — Google Analytics 4

Measurement ID **G-8P4G87C6C2** is preconfigured. Analytics loads **only in production after optional visitor consent**. Refer to [GA4_SETUP_V14.md](GA4_SETUP_V14.md) for detailed setup, event map, privacy handling and verification in Google Analytics Realtime. The Formspree endpoint remains optional and separate.
