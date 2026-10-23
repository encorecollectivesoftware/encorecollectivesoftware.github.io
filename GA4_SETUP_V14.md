# Encore Google Analytics 4 — release v14

## Measurement ID
`G-8P4G87C6C2` is already set as `ga4_measurement_id` in `_config.yml`.

GA4 runs **only on production Jekyll builds**, **only after an explicit Allow analytics selection**. The site does not request Google's tag before consent. Decline means no GA4 library is downloaded. Users can change their decision via **Analytics preferences** in the footer. Consent preferences are saved in browser localStorage when available; ads/personalization consent remains denied.

## Publish and verify
1. Upload this project to GitHub; configure Pages to publish through the included GitHub Actions workflow. The included GitHub Actions workflow explicitly sets `JEKYLL_ENV: production`. Confirm the live pages contain `/assets/js/analytics.js` (it will be included only for a production build).
2. Visit the *actual published site*, preferably in a fresh private/incognito window with extensions disabled. Before accepting analytics, in browser DevTools > Network, search for `googletagmanager` or `google-analytics.com`; no requests should appear.
3. Select **Allow analytics**. The site should fetch `gtag/js?id=G-8P4G87C6C2` and send a page view.
4. In Google Analytics > Reports > Realtime, look for the page view. Realtime reporting may have a delay and may not work if tracking is blocked. To see detailed parameters use DebugView / event custom dimensions if configured.
5. Try Our People > **Experience & approach**, filter client reviews, visit Services, generate a household care assessment, and complete an enquiry with your *own test data*. Verify events as appropriate.
6. Select **Analytics preferences > Decline**. Further custom events will not be queued or sent. Refresh: the analytics script should not load in a fresh window with declined preference. (A script previously loaded in the same tab can remain cached, but events stop after withdrawal.)
7. To avoid polluting your numbers, use a separate browser/profile for development, decline analytics there, or omit analytics in development entirely.

## Tracked events (no form contents or personal details)
- `page_view`: automatic on an accepted GA4 load / subsequent page navigation
- `specialist_profile_open`: fixed first-name slug only
- `review_filter_selected`: filter category only
- `service_interest`: fixed service identifier on service CTA links
- `assessment_started`: first interaction with care assessment
- `assessment_completed`: general care tier only, **not** children count, ages or answers
- `enquiry_started`: first focus on the private enquiry form
- `enquiry_brief_prepared`: local-only brief generated
- `generate_lead`: **only after** Formspree returns a successful HTTP response; parameter `method=formspree`

GA4 may require registering custom event parameters as custom dimensions for use in explorations. The recommended `generate_lead` event can be marked as a key event in Google Analytics if desired.

## Configuration
```yaml
ga4_measurement_id: "G-8P4G87C6C2"
analytics_enabled: true
```
Set `analytics_enabled: false` to disable the integration completely, then rebuild and redeploy.

If you build locally for production QA use `JEKYLL_ENV=production bundle exec jekyll serve` (only when dependencies are installed); do **not** use that for routine work or clicks will reach your real GA4 property when you consent. Normal `bundle exec jekyll serve` does not load GA4.

## Privacy and limitations
- The live website includes a Privacy & Website Analytics page and a small consent banner.
- No names, emails, form answers, addresses, free-text messages, or children-specific information are passed as GA4 event parameters.
- Formspree submission is **separate** from GA4 and requires its own endpoint setup. Do not send sensitive family information through a novelty service form.
- GA4 is intended for aggregate visitor engagement, not identifying or following an individual. Privacy blockers or the visitor declining consent mean you may see no activity.
- Keep the website unadvertised for the intended private reveal and unpublish it afterward. A GitHub Pages URL is not access controlled.

Docs: https://developers.google.com/tag-platform/gtagjs/reference and https://support.google.com/analytics/answer/9267735
