/* Encore optional Google Analytics 4: basic consent mode, no pre-consent requests. */
(function () {
  'use strict';
  var current = document.currentScript;
  var id = current && current.dataset ? current.dataset.ga4Id : '';
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  var key = 'encore_analytics_consent_v1';
  var status = 'unknown';
  var initialized = false;
  var scriptRequested = false;
  var allowedEvents = new Set([
    'specialist_profile_open', 'review_filter_selected', 'service_interest',
    'assessment_started', 'assessment_completed', 'enquiry_started',
    'enquiry_brief_prepared', 'generate_lead'
  ]);

  function readChoice() {
    try { var choice = window.localStorage.getItem(key); return choice === 'granted' || choice === 'denied' ? choice : 'unknown'; }
    catch (e) { return 'unknown'; }
  }
  function saveChoice(choice) {
    try { window.localStorage.setItem(key, choice); } catch (e) { /* Storage unavailable; session-only selection. */ }
  }
  function gtag() { window.dataLayer.push(arguments); }
  function initialize() {
    if (initialized) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied',
      ad_personalization: 'denied', analytics_storage: 'denied'
    });
    gtag('js', new Date());
  }
  function activate() {
    initialize();
    gtag('consent', 'update', {analytics_storage: 'granted'});
    if (!scriptRequested) {
      scriptRequested = true;
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(script);
    }
    gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true
    });
  }
  function withdraw() {
    if (initialized) gtag('consent', 'update', {analytics_storage: 'denied'});
  }
  function track(name, params) {
    if (status !== 'granted' || !allowedEvents.has(name)) return;
    initialize();
    // Only fixed, non-identifying event parameters from our own code are permitted.
    gtag('event', name, Object.assign({send_to: id}, params || {}));
  }
  window.EncoreAnalytics = {track: track};

  function ready() {
    var bar = document.getElementById('analytics-choice');
    var manage = document.querySelector('[data-analytics-manage]');
    if (!bar) return;
    status = readChoice();
    if (status === 'granted') activate();
    else if (status === 'unknown') bar.hidden = false;

    function decide(choice) {
      status = choice;
      saveChoice(choice);
      if (choice === 'granted') activate(); else withdraw();
      bar.hidden = true;
    }
    var accept = bar.querySelector('[data-analytics-accept]');
    var reject = bar.querySelector('[data-analytics-reject]');
    if (accept) accept.addEventListener('click', function () { decide('granted'); });
    if (reject) reject.addEventListener('click', function () { decide('denied'); });
    if (manage) manage.addEventListener('click', function () { bar.hidden = false; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
