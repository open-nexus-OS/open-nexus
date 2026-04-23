import React from 'react';
import Layout from '@theme/Layout';
import styles from './legal.module.css';

export default function Privacy() {
  return (
    <Layout
      title="Privacy"
      description="Privacy information for the Open Nexus website, including cookies, Google Tag Manager (with consent), hosting, logs, and your rights under the GDPR.">
      <main className={styles.legalPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Privacy</h1>
            <p className={styles.subtitle}>
              How we process personal data on the Open Nexus website, including cookies and analytics.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.block}>
                <h2 className={styles.heading}>Controller</h2>
                <p className={styles.text}>Jenning Schäfer</p>
                <p className={styles.text}>Durlacher Str. 111</p>
                <p className={styles.text}>69219 Mannheim</p>
                <p className={styles.text}>Germany</p>
                <p className={styles.text}>Email: jenning@open-nexus-os.io</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Website hosting and server logs</h2>
                <p className={styles.text}>
                  This website is delivered through Netlify. When you access the site, technical access data may be
                  processed by the hosting provider. This can include IP address, date and time of access, requested
                  path, referrer, browser information, and other log data required for stable and secure delivery of
                  the website.
                </p>
                <p className={styles.text}>
                  The domain itself is managed through Infomaniak. Domain registration and DNS-related processing may
                  therefore involve Infomaniak in addition to the hosting setup.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Contact by email</h2>
                <p className={styles.text}>
                  If you contact Open Nexus by email, the information you provide will be processed in order to handle
                  your request and any follow-up communication. This typically includes your email address, your
                  message, and any information you choose to send.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>External links and third-party services</h2>
                <p className={styles.text}>
                  This website links to external services such as GitHub, Discord, DOI pages, and other third-party
                  resources. When you follow those links, the privacy policies of the respective providers apply.
                </p>
                <p className={styles.text}>
                  Parts of the current site also use externally hosted images and resources. When such resources are
                  loaded directly from third-party providers, personal data such as IP address and browser metadata may
                  be transmitted to those providers as part of the request.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Cookies, consent, and Google Tag Manager</h2>
                <p className={styles.text}>
                  We use cookies and similar storage only to the extent described here. A consent banner (cookie notice)
                  lets you allow or reject non-essential use before it runs, except for strictly necessary functions.
                </p>
                <p className={styles.text}>
                  <strong>Necessary (no consent required).</strong> We store a small consent record (for example a
                  cookie named <code>cc_cookie</code> and, where applicable, related essential session data) to
                  remember your choice, prevent the banner from reappearing on every page load, and operate the site
                  securely. The legal basis is typically{' '}
                  <strong>Article 6(1)(f) GDPR</strong> (legitimate interests in a functional website, security, and
                  applying and evidencing your choices). Where applicable law imposes a duty to retain proof of
                  consent, <strong>Article 6(1)(c) GDPR</strong> may also apply in addition.
                </p>
                <p className={styles.text}>
                  <strong>Analytics (consent only).</strong> If you <strong>accept</strong> analytics in the
                  consent banner, we load <strong>Google Tag Manager (GTM)</strong> to run measurement and similar tags
                  you configure in your GTM container. Until you consent, GTM and dependent analytics or marketing
                  tags are <strong>not</strong> loaded. The legal basis is{' '}
                  <strong>Article 6(1)(a) GDPR</strong> (consent), which you can withdraw at any time with effect for
                  the future (e.g. by changing your choice in the consent settings, clearing site data, or using your
                  browser settings).
                </p>
                <p className={styles.text}>
                  <strong>Google as processor.</strong> When GTM is loaded, <strong>Google</strong> (typically Google
                  Ireland Limited, with possible involvement of Google LLC in the U.S. as processor, depending on the
                  product setup) may process data such as IP address, device and browser information, and events sent
                  through the tag. How Google uses data in Tag Manager, Analytics, and related products is described in
                  Google’s privacy policy and product documentation. Transfers to the U.S. or other third countries, if
                  any, are covered by the safeguards Google applies under the GDPR and EDPB guidance (e.g. Standard
                  Contractual Clauses and, where available, the EU–U.S. Data Privacy Framework as described by Google);{' '}
                  you can review Google’s current statements in their privacy and compliance materials.
                </p>
                <p className={styles.text}>
                  <strong>Withdrawal and change of mind.</strong> You can open the consent settings from the site’s
                  cookie notice (e.g. “Settings” or “Preferences”) to adjust categories. Withdrawing or refusing consent
                  does not affect the lawfulness of processing that occurred before the withdrawal, but we stop further
                  non-essential processing based on that consent. You can also remove cookies in your browser.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Your rights (GDPR)</h2>
                <p className={styles.text}>
                  If the GDPR applies, you have the right to <strong>access</strong> your personal data,{' '}
                  <strong>rectification</strong>, <strong>erasure</strong>, <strong>restriction of processing</strong>,{' '}
                  <strong>data portability</strong> (where applicable), and to <strong>object</strong> to processing
                  based on Article 6(1)(f) GDPR, as well as the right to <strong>withdraw consent</strong> at any time
                  where processing is based on consent (Art. 7(3) GDPR), without affecting the lawfulness of processing
                  before withdrawal. You also have the right to <strong>lodge a complaint</strong> with a supervisory
                  authority, in particular in the Member State of your habitual residence, place of work, or the place of
                  the alleged infringement.
                </p>
                <p className={styles.text}>
                  To exercise your rights, contact us at the email address under <strong>Controller</strong> above. We
                  will respond in line with statutory deadlines, subject to verification and reasonable limits for
                  manifestly unfounded or excessive requests.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Note</h2>
                <p className={styles.text}>
                  This page describes the current setup of the website (hosting, domain, GTM with consent, and contact
                  by email) and is for transparency only; it is <strong>not</strong> legal advice. If tools, services,
                  purposes of processing, or the legal structure of the project change, this text should be reviewed and
                  updated.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
