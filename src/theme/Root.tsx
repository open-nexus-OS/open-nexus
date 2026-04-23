import React, {useEffect} from 'react';

const GTM_ID = 'GTM-5BQJP3N2';

function loadGTM() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('gtm-script')) return;

  window['dataLayer'] = window['dataLayer'] || [];
  window['dataLayer'].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

type RunFn = (config: import('vanilla-cookieconsent').CookieConsentConfig) => Promise<unknown>;

function resolveCookieConsentRun(mod: unknown): RunFn {
  if (
    mod &&
    typeof mod === 'object' &&
    'run' in mod &&
    typeof (mod as {run: unknown}).run === 'function'
  ) {
    return (mod as {run: RunFn}).run;
  }
  const d = (mod as {default?: unknown})?.default;
  if (
    d &&
    typeof d === 'object' &&
    'run' in d &&
    typeof (d as {run: unknown}).run === 'function'
  ) {
    return (d as {run: RunFn}).run;
  }
  throw new Error(
    'vanilla-cookieconsent: could not resolve run() — check bundle / import interop',
  );
}

export default function Root({children}: {children: React.ReactNode}) {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await import('vanilla-cookieconsent/dist/cookieconsent.css');
        const mod = await import('vanilla-cookieconsent');
        if (cancelled) return;

        const run = resolveCookieConsentRun(mod);
        const isDev = process.env.NODE_ENV === 'development';
        const isHttps = window.location.protocol === 'https:';

        await run({
          hideFromBots: !isDev,
          autoShow: true,

          cookie: {
            secure: isHttps,
            sameSite: 'Lax',
            path: '/',
          },

          onConsent: ({cookie}) => {
            if (cookie.categories.includes('analytics')) {
              loadGTM();
            }
          },

          categories: {
            necessary: {
              readOnly: true,
            },
            analytics: {
              autoClear: {
                cookies: [
                  {name: /^_ga/},
                  {name: /^_gid/},
                  {name: /^_gat/},
                  {name: /^__gtm/},
                ],
              },
              services: {
                gtm: {
                  label: 'Google Tag Manager',
                  onAccept: () => loadGTM(),
                  onReject: () => {},
                },
              },
            },
          },

          language: {
            default: 'de',
            autoDetect: 'browser',
            translations: {
              de: {
                consentModal: {
                  title: 'Cookies und Einwilligung',
                  description:
                    'Wir nutzen nur die in der <a href="/privacy">Datenschutzerklärung</a> beschriebenen Cookies. Notwendige Cookies speichern Ihre Einstellung (u. a. <code>cc_cookie</code>) und den Betrieb der Seite. <strong>Google Tag Manager (GTM)</strong> und die darüber ausgeführten Mess- oder sonstigen Tags in Ihrem GTM-Container werden <strong>erst nach Ihrer Zustimmung</strong> geladen. Nicht notwendige Nutzung können Sie ablehnen oder in den Einstellungen wählen.',
                  acceptAllBtn: 'Alle akzeptieren',
                  acceptNecessaryBtn: 'Nur notwendige',
                  showPreferencesBtn: 'Einstellungen',
                  footer:
                    '<a href="/privacy">Datenschutz</a> · <a href="/imprint">Impressum</a>',
                },
                preferencesModal: {
                  title: 'Cookie-Einstellungen',
                  acceptAllBtn: 'Alle akzeptieren',
                  acceptNecessaryBtn: 'Nur notwendige',
                  savePreferencesBtn: 'Auswahl speichern',
                  closeIconLabel: 'Schließen',
                  serviceCounterLabel: 'Dienst|Dienste',
                  sections: [
                    {
                      title: 'Notwendig (ohne Einwilligung)',
                      description:
                        'Dient u. a. dazu, Ihre getroffene Auswahl in einem Consent-Record (z. B. dem Cookie <code>cc_cookie</code>) zu speichern, den Hinweis nicht bei jedem Seitenaufruf erneut zwingend einzublenden und die Website sicher betreiben zu können. Rechtsgrundlage: v. a. Art. 6 Abs. 1 lit. f DSGVO; ergänzend ggf. Art. 6 Abs. 1 lit. c DSGVO, soweit ein Nachweis der Einwilligung vorgesehen ist.',
                      linkedCategory: 'necessary',
                    },
                    {
                      title: 'Analyse (nur mit Einwilligung)',
                      description:
                        'Nur wenn Sie zustimmen, laden wir <strong>Google Tag Manager (GTM)</strong>, damit im GTM-Container konfigurierte Mess- und ggf. weitere Tags ausgeführt werden können. Dabei können u. a. IP-Adresse und Geräte- bzw. Browserdaten an Google übermittelt werden, wie in der <a href="/privacy">Datenschutzerklärung</a> erläutert. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Entscheidung in diesen Einstellungen jederzeit mit Wirkung für die Zukunft widerrufen.',
                      linkedCategory: 'analytics',
                    },
                    {
                      title: 'Hinweis & Kontakt',
                      description:
                        'Vollständige Angaben zu Zwecken, Empfängern, Drittländern und Ihren Rechten: <a href="/privacy">Datenschutz</a>. Ansprechpartner und Impressum: <a href="/imprint">Impressum</a>.',
                    },
                  ],
                },
              },
              en: {
                consentModal: {
                  title: 'Cookies and consent',
                  description:
                    'We only use the cookies and similar storage described in our <a href="/privacy">Privacy policy</a>. <strong>Necessary</strong> cookies keep your choice (including the <code>cc_cookie</code> consent record) and run the site. <strong>Google Tag Manager (GTM)</strong> and measurement or other tags from your GTM container load <strong>only after you opt in</strong>. You can reject non-essential use or choose categories in the settings below.',
                  acceptAllBtn: 'Accept all',
                  acceptNecessaryBtn: 'Necessary only',
                  showPreferencesBtn: 'Preferences',
                  footer:
                    '<a href="/privacy">Privacy policy</a> · <a href="/imprint">Imprint</a>',
                },
                preferencesModal: {
                  title: 'Cookie preferences',
                  acceptAllBtn: 'Accept all',
                  acceptNecessaryBtn: 'Necessary only',
                  savePreferencesBtn: 'Save preferences',
                  closeIconLabel: 'Close',
                  serviceCounterLabel: 'Service|Services',
                  sections: [
                    {
                      title: 'Strictly necessary (no consent required)',
                      description:
                        'Stores your choice in a consent record (e.g. the <code>cc_cookie</code> cookie), limits how often the banner is shown, and supports secure operation of the site. Legal basis: primarily <strong>Article 6(1)(f) GDPR</strong> (legitimate interests); in addition, <strong>Article 6(1)(c) GDPR</strong> where the law requires proof of consent.',
                      linkedCategory: 'necessary',
                    },
                    {
                      title: 'Analytics (consent only)',
                      description:
                        'Only if you allow this, we load <strong>Google Tag Manager (GTM)</strong> so measurement and other tags configured in the GTM container can run. This may involve Google processing data such as IP address and device or browser data, as described in the <a href="/privacy">Privacy policy</a>. Legal basis: <strong>Article 6(1)(a) GDPR</strong> (consent), which you can withdraw at any time for the future, including via these settings.',
                      linkedCategory: 'analytics',
                    },
                    {
                      title: 'More information and contact',
                      description:
                        'Full details on purposes, recipients, third-country transfers, and your rights: <a href="/privacy">Privacy policy</a>. Imprint and contact: <a href="/imprint">Imprint</a>.',
                    },
                  ],
                },
              },
            },
          },

          guiOptions: {
            consentModal: {
              layout: 'box',
              position: 'bottom right',
              equalWeightButtons: false,
              flipButtons: false,
            },
            preferencesModal: {
              layout: 'box',
              position: 'right',
              equalWeightButtons: true,
              flipButtons: false,
            },
          },
        });
      } catch (err) {
        console.error('[CookieConsent] init failed:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      {children}
    </>
  );
}
