import React from 'react';
import Layout from '@theme/Layout';
import styles from './legal.module.css';

export default function Privacy() {
  return (
    <Layout
      title="Privacy"
      description="Privacy information for the Open Nexus website, including hosting, logs, email contact, and external services.">
      <main className={styles.legalPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Privacy</h1>
            <p className={styles.subtitle}>
              Privacy information for the Open Nexus website.
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
                <h2 className={styles.heading}>Cookies and analytics</h2>
                <p className={styles.text}>
                  Based on the current repository state, no dedicated analytics or marketing tracking setup is
                  documented in the website source. If analytics, tracking, or marketing tools are added later, this
                  section should be updated before deployment.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Your rights</h2>
                <p className={styles.text}>
                  Depending on the applicable law, you may have rights of access, rectification, erasure, restriction
                  of processing, objection, and data portability. You may also have the right to lodge a complaint with
                  a supervisory authority.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Important implementation note</h2>
                <p className={styles.text}>
                  This page reflects the current known setup of the site, but it is not legal advice. If hosting,
                  analytics, embedded services, contact flows, or legal ownership change, this text should be reviewed
                  and updated.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
