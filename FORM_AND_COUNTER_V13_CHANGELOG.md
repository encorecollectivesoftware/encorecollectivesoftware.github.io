# v13 — Enquiry delivery and continuous diaper counter

- Site-level email identity and optional Formspree endpoint ID in `_config.yml`.
- Formspree-ready enquiry page; local-only when no endpoint is configured.
- Live submission includes adult name/email and a clear consent checkbox. Sends via AJAX and handles success/failure without false booking confirmation.
- No medical, child identity, or precise address fields.
- Diaper counter revised from ~8.47 million with capped on-page ticks to a ~128,640 reference count, increasing deterministically based on UTC time across deployment/reloads.
- Jekyll-only build; GitHub Pages compatible; no database or scheduled task.
- Setup and customization documented in README.md and FORM_HANDLING_OPTIONS.md.
