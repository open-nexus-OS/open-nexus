import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './partners.module.css';

export default function Partners() {
  return (
    <Layout title="Strategic Partnerships">
      <main className={styles.partnersPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Strategic Partnerships</h1>
            <p className={styles.heroSubtitle}>
              We're not asking for donations. We're building an open platform for the next era of computing.
            </p>
          </div>
        </section>

        {/* Positioning */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentWithImage}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Who this is for</h2>
                <p className={styles.cardText}>
                  Leaders who want to co-build a secure, open, and sovereign OS platform—
                  not as a marketing badge, but as a real capability across devices and industries.
                </p>
                <ul className={styles.list}>
                  <li>Device makers (mobile, desktop, automotive, IoT)</li>
                  <li>Industrial and public-sector platforms</li>
                  <li>Infrastructure and semiconductor partners</li>
                  <li>Research labs and universities</li>
                </ul>
              </div>
              <div className={styles.imageWrapper}>
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Strategic collaboration"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What we offer & look for */}
        <section className={styles.twoColumnSection}>
          <div className={styles.container}>
            <div className={styles.twoColumnGrid}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>What we offer</h2>
                <ul className={styles.list}>
                  <li><strong>Co-building the core</strong> — Rust + neuron microkernel, RISC-V first</li>
                  <li><strong>Early access</strong> — roadmaps, SDKs, reference designs</li>
                  <li><strong>Pilot programs</strong> — from prototypes to production paths</li>
                  <li><strong>Compliance-first thinking</strong> — privacy, security, and auditability</li>
                  <li><strong>Influence</strong> — a voice in standards and long-term direction</li>
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>What we look for</h2>
                <ul className={styles.list}>
                  <li>Shared conviction: open ecosystems outlast closed ones</li>
                  <li>Meaningful investment: capital, talent, or hardware access</li>
                  <li>Real use-cases: mobility, edge, industrial, public sector</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <p className={styles.ctaText}>
              If you're exploring a serious collaboration, let's talk.
            </p>
            <Link href="mailto:jenning@open-nexus-os.io" className={styles.ctaButton}>
              Contact: jenning@open-nexus-os.io
            </Link>
            <p className={styles.ctaHint}>
              Short intro, problem you want to solve, and the scale you have in mind.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentWithImage}>
              <div className={styles.imageWrapper}>
                <img
                  src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Building infrastructure"
                  loading="lazy"
                />
              </div>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Our stance</h2>
                <p className={styles.cardText}>
                  We don't run a donation jar or sell merchandise. We build enduring infrastructure.
                  Partners are here to move the needle with us — from first boot to fleet deployments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
