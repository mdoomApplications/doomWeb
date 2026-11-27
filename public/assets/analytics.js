/* GA4 loads only after an explicit analytics choice. No pre-consent requests. */
(() => {
  const ID = 'G-FQTDFZ74VQ';
  const KEY = 'mdservices-analytics-v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const banner = document.querySelector('#analytics-consent');
  let allowed = false;
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
  function forgetCookies() {
    for (const item of document.cookie.split(';')) {
      const name = item.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; domain=www.mdoom.net', '; domain=.www.mdoom.net', '; domain=mdoom.net', '; domain=.mdoom.net']) {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
      }
    }
  }
  function apply(choice) {
    allowed = choice === 'yes';
    window['ga-disable-' + ID] = !allowed;
    gtag('consent', 'update', {analytics_storage: allowed ? 'granted' : 'denied'});
    if (!allowed) { forgetCookies(); return; }
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', ID, {allow_google_signals: false, allow_ad_personalization_signals: false, cookie_domain: 'www.mdoom.net', cookie_expires: 15552000});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(script);
  }
  let stored;
  try { stored = JSON.parse(localStorage.getItem(KEY)); } catch (_) {}
  if (stored && ['yes', 'no'].includes(stored.choice) && Number.isFinite(stored.at) && Date.now() - stored.at >= 0 && Date.now() - stored.at < MAX_AGE) {
    apply(stored.choice);
  } else {
    apply('no');
    if (banner) banner.hidden = false;
  }
  document.querySelectorAll('[data-analytics-consent]').forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.analyticsConsent;
    try { localStorage.setItem(KEY, JSON.stringify({choice, at: Date.now()})); } catch (_) {}
    apply(choice);
    if (banner) banner.hidden = true;
  }));
  document.querySelectorAll('[data-analytics-settings]').forEach(button => button.addEventListener('click', () => {
    if (!banner) return;
    banner.hidden = false;
    banner.querySelector('button')?.focus();
  }));
  document.addEventListener('click', event => {
    if (!allowed) return;
    const link = event.target.closest('a');
    if (!link) return;
    const language = document.documentElement.lang;
    if (link.protocol === 'mailto:') {
      gtag('event', 'contact_click', {language, link_location: link.closest('section')?.id || 'other', transport_type: 'beacon'});
    } else if (link.classList.contains('project')) {
      gtag('event', 'project_click', {language, link_url: link.href, transport_type: 'beacon'});
    }
  });
})();
