import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HeroSection(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {siteConfig.title}
        </h1>
        <p className={styles.heroTagline}>
          {siteConfig.tagline}
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
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Built for the future
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
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title={siteConfig.title}
      description="One OS. Many Devices. Modern, secure, and open mobile operating system.">
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
