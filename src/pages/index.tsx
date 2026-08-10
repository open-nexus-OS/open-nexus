import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const PAGE_TITLE =
  'Open Nexus — Open Source RISC-V Operating System in Rust';

const PAGE_DESCRIPTION =
  'An open source operating system for RISC-V, written in Rust — the NEURON ' +
  'capability-based microkernel, a GPU-composited desktop, and a trusted ' +
  'computing base small enough to audit.';

function StructuredData(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Open Nexus',
        description: PAGE_DESCRIPTION,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Open Nexus',
        url: `${siteUrl}/`,
        logo: `${siteUrl}/img/open-nexus.svg`,
        sameAs: ['https://github.com/open-nexus-OS'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: 'Open Nexus',
        alternateName: 'Open Nexus OS',
        applicationCategory: 'OperatingSystem',
        operatingSystem: 'Open Nexus',
        description: PAGE_DESCRIPTION,
        url: `${siteUrl}/`,
        image: `${siteUrl}/img/og-image.png`,
        processorRequirements: 'RISC-V (RV64)',
        programmingLanguage: 'Rust',
        license: 'https://github.com/open-nexus-OS',
        isAccessibleForFree: true,
        author: { '@id': `${siteUrl}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
      },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

function HeroSection(): ReactNode {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroBrand}>open nexus</span>{' '}
          <span className={styles.heroHeadline}>
            An open source RISC-V operating system, written in Rust
          </span>
        </h1>
        <p className={styles.heroDescription}>
          One OS. Many devices. NEURON, our capability-based RISC-V microkernel,
          keeps the trusted computing base small enough to audit — and drives a
          GPU-composited desktop that already runs real apps.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className={styles.primaryButton}
            to="/docs/category/the-story">
            Our Vision
          </Link>
          <Link
            className={styles.secondaryButton}
            to="/community">
            Join the Community
          </Link>
        </div>
      </div>
      <div className={styles.heroImageWrapper}>
        <div className={styles.heroShowcase}>
          <img
            className={`${styles.heroImage} ${styles.heroImageBack}`}
            src="/img/desktop-dark.png"
            alt="The Open Nexus RISC-V desktop in dark mode: layered, blurred glass windows composited on the GPU"
            loading="eager"
          />
          <img
            className={`${styles.heroImage} ${styles.heroImageFront}`}
            src="/img/desktop-light.png"
            alt="The Open Nexus RISC-V desktop in light mode with the control center open"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Built for the future.
        </h2>
        <p className={styles.sectionSubtitle}>
          A complete reimagining of what an operating system can be.
        </p>
      </div>
      <HomepageFeatures />
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      {/* Rendered after Layout's own metadata, so these win the Helmet merge
          and we avoid the "Title | open nexus" suffix on the landing page. */}
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta property="og:title" content={PAGE_TITLE} />
        <meta name="twitter:title" content={PAGE_TITLE} />
      </Head>
      <StructuredData />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
