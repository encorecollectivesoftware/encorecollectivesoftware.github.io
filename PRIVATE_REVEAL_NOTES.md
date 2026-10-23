# Private reveal setup and scope (v10)

The website content is **fictional** and intended for a consensual personal prank with an in-person reveal, not a functioning nanny agency.

## Visitor-facing changes

- Removed all explicit fictional/parody declarations from the shared footer, FAQ, and household planning results.
- Preserved the serious agency language, six AI-generated adult portraits, pricing, and fictional reviews.
- No real booking, payment, account, contact form, or data collection is implemented. The planning questionnaire runs entirely in the browser.
- Added `noindex, nofollow, noarchive, nosnippet, noimageindex` HTML metadata and a `robots.txt` exclusion to discourage discovery. **This does not make GitHub Pages private**, and noindex isn't a guarantee of removal from search results.

## How to share responsibly

1. For the in-person joke, prefer showing the local site or sharing an otherwise unadvertised staging URL only with the intended viewer.
2. Do not advertise to the public, buy ads, submit to directories or enable booking/payment collection.
3. Take the site offline after the reveal. Do not leave an accessible mock business available for someone genuinely looking for childcare.
4. Avoid impersonating any existing agency or claiming affiliation with real casino/hospitality employers. All staff profiles and testimonials are AI-created fiction.

## Audit observations

- Homepage: consistent positioning; standout fiction is the very large cumulative diaper counter and precise child/cleaning metrics. They're intentionally absurd and retained per the project concept.
- Staff: 6 approved, differently styled portraits; career histories appear in expanded bios. No sourced claims of childcare screening or certifications were added.
- Services: Flex $69/hr, Duo $129/hr, Family Continuity $2,195/weekend for up to 20 scheduled hours, Reserve $295/month, overnight $1,795, Private Residence $3,950.
- Reviews: 12 invented customer stories presented in editorial style. Do not repurpose for an actual childcare business.
- Assessment: simulated recommendation, never an actual care confirmation.
- Footer: branding/navigation and a neutral no-online-booking note.
- Search/privacy: discoverability discouraged, but static pages remain public if hosted on standard GitHub Pages.

## Editing

- For the footer, edit `_layouts/default.html`.
- For FAQs, edit `_data/faqs.yml`.
- For the care planner, edit `get-matched/index.html` and `assets/js/site.js`.
- The original v9 files are unchanged in earlier archives.
