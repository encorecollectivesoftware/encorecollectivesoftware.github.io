# Encore private enquiries — deployment notes

This is an internal setup document (excluded from the built site).

## Implementation

- The visitor-facing address is configured by `concierge_email` in `_config.yml`, default `concierge@encorenannycollective.com`. The domain/mailbox must actually be owned and configured if you want direct email to work.
- A Formspree endpoint is tied to a **form ID**, NOT an email address. Configure its verified recipient / forwarding address in your Formspree dashboard.
- `formspree_form_id: ""` = local-only care brief. A nonblank valid ID (`abcdefgh`) = POST to `https://formspree.io/f/abcdefgh` with Fetch/FormData and `Accept: application/json`.
- Live mode requires contact name, adult email, and explicit checkbox consent. It submits general household preferences only. No real appointments are created.
- If Formspree fails, the page shows an error and offers retry. A successful response shows a sent confirmation, not a booking confirmation.
- No secret or private account token belongs in the Jekyll site; the public form ID is designed to be embedded in browser HTML.
- For spam controls, enable Formspree domain restrictions after your GitHub Pages / custom hostname is known. An optional `_gotcha` honeypot is included. Do not use automatic autoresponses that imply a care reservation.
- For the private reveal: only share the website with the intended recipient; the static site itself is public if GitHub Pages serves it. Do not collect children's private details.

Official documentation:
- https://help.formspree.io/articles/building-your-form/building-an-html-form/
- https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering
