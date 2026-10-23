# Encore Nanny Collective

**Personalized childcare and thoughtful household support in Calgary, Alberta.**

This repository contains the website for Encore Nanny Collective, built with Jekyll and deployed through GitHub Pages. The site provides an overview of care arrangements, specialist profiles, household services, pricing, service areas, and private-client enquiries.

**Website:** [encorenannycollective.com](https://encorenannycollective.com)  
**Private client enquiries:** [concierge@encorenannycollective.com](mailto:concierge@encorenannycollective.com)

## Explore the website

| Section | Path |
| --- | --- |
| Our People | `/our-people/` |
| The Encore Standard | `/the-standard/` |
| Specialist Selection | `/selection-standards/` |
| Services & Pricing | `/services/` |
| Family Continuity | `/wife-away-protocol/` |
| After Midnight Engagements | `/after-midnight/` |
| Client Experiences | `/client-stories/` |
| Service Areas | `/service-areas/` |
| Service Terms | `/service-terms/` |
| Household Assessment | `/get-matched/` |
| Private Enquiries | `/enquire/` |
| Frequently Asked Questions | `/questions/` |
| Privacy & Analytics | `/privacy/` |

## Technology

The site uses **Jekyll**, responsive **HTML/CSS**, and lightweight **JavaScript**, with deployment through **GitHub Actions and GitHub Pages**. DNS for the custom domain can be managed through Cloudflare.

The enquiry experience can be connected to **Formspree**. **Google Analytics 4** supports consent-based website analytics. This repository does not require a database or a server-side application.

## Development

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/` to preview the site. Configuration changes in `_config.yml` may require restarting the Jekyll server.

### Editing content

| Content | File or directory |
| --- | --- |
| Brand, domain and integration settings | `_config.yml` |
| Specialist profiles | `_data/people.yml` |
| Client stories | `_data/reviews.yml` |
| FAQs and service areas | `_data/faqs.yml`, `_data/areas.yml` |
| Website pages | `index.html`, individual page directories |
| Sitewide layout and navigation | `_layouts/default.html` |
| Styles | `assets/css/main.css` |
| Interactions | `assets/js/site.js` |
| Analytics consent and events | `assets/js/analytics.js` |

## Deployment

The repository uses `.github/workflows/pages.yml` to build and publish the site from the `main` branch.

1. In repository **Settings → Pages**, select **GitHub Actions** as the deployment source.
2. Configure the custom domain `encorenannycollective.com` in the same Pages settings.
3. Point the domain's DNS records to GitHub Pages through the DNS provider.
4. In `_config.yml`, set:

   ```yaml
   url: "https://encorenannycollective.com"
   baseurl: ""
   ```

5. Commit and push changes to `main`. Check the **Actions** tab for the build and deployment result.
6. When domain verification and certificate provisioning finish, enable **Enforce HTTPS** in Pages settings.

For DNS details, refer to [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Private enquiries

The public contact identity is configured as `concierge@encorenannycollective.com`. The email mailbox and any forwarding rules are managed separately from this repository.

To enable Formspree, create a form within your own Formspree account, verify the recipient address, then paste the **form ID only** into `_config.yml`:

```yaml
formspree_form_id: "YOUR_FORM_ID"
```

When the ID is blank, the site prepares a consultation brief locally instead of sending a form. A successful form submission is an enquiry acknowledgement, **not** a reservation or confirmation of availability. Do not collect sensitive information about children through the initial enquiry form.

## Website analytics

The site supports GA4 using the Measurement ID in `_config.yml`. Tracking is enabled in production builds only and is subject to visitors' optional analytics choice. Website interaction events exclude enquiry names, email addresses and messages.

Verify deployment in **Google Analytics → Reports → Realtime**, using an ordinary visit to the production website after allowing analytics.

## Maintenance

- Run `python3 scripts/check_site.py` for static source checks (requires PyYAML).
- Check GitHub Actions after each deployment.
- Review all changes at desktop and mobile sizes.
- Keep account credentials, personal information and secret tokens **out of this public repository**.
- Review service content, contact information and policies before publication.

© 2026 Encore Nanny Collective.
