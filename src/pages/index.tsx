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

const RUNS_TODAY = [
  {
    title: 'A capability microkernel',
    body: `NEURON boots with capability-based IPC, process isolation and W^X memory,
      over a 14-syscall baseline ABI. Capabilities are task-local, rights are derived
      by intersection and can never escalate, and anything without an explicit grant
      is rejected at the syscall boundary.`,
  },
  {
    title: 'Core services, as separate processes',
    body: `A service manager, a policy engine, a bundle manager, a virtual filesystem,
      a keystore and a logging authority — each its own userspace process. The kernel
      moves handles and memory between them without ever parsing a message.`,
  },
  {
    title: 'A desktop on the GPU',
    body: `Rendering runs over virtio-gpu, accelerated with virgl, with opacity, blur
      and shadow, driven by a full input-to-output loop on real interrupts. Dragging a
      window is a transform, not a redraw.`,
  },
  {
    title: 'Applications that are programs',
    body: `The shell, the launcher, the greeter, Settings, the file manager and the
      on-screen keyboard are each written in NeX — our own interface language — then
      compiled and run as separate processes.`,
  },
  {
    title: 'Text input across scripts',
    body: `Japanese romaji→kana→kanji, Korean 2-set jamo composition and Chinese
      pinyin, on an identity-gated input path where the kernel says who sent a
      keystroke. Switching the system language re-renders running apps in place.`,
  },
];

function RunsTodaySection(): ReactNode {
  return (
    <section className={styles.proseSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What runs today.</h2>
        <p className={styles.sectionSubtitle}>
          All of it boots — in QEMU, on emulated RISC-V, not yet on a board on your
          desk. That is the honest scope, and it is real code you can clone and run.
        </p>
      </div>
      <div className={styles.proseContainer}>
        <dl className={styles.runsList}>
          {RUNS_TODAY.map((item) => (
            <div className={styles.runsItem} key={item.title}>
              <dt className={styles.runsTitle}>{item.title}</dt>
              <dd className={styles.runsBody}>{item.body}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.proseNote}>
          What does not exist yet is worth stating just as plainly: there is no power
          service, no audio service and no notification service. Parts of the shell in
          our screenshots are deliberately a mockup — we go through exactly which parts
          on the <Link to="/risc-v-desktop">RISC-V desktop page</Link>.
        </p>
      </div>
    </section>
  );
}

function WhySection(): ReactNode {
  return (
    <section className={styles.whySection}>
      <div className={`${styles.proseContainer} ${styles.whyGrid}`}>
        <article className={styles.whyColumn}>
          <h2 className={styles.whyTitle}>Why RISC-V only</h2>
          <p className={styles.whyBody}>
            Most systems treat RISC-V as a port target: a third architecture added
            after x86 and ARM, inheriting assumptions made for hardware that works
            differently. Open Nexus starts at the other end. There is no compatibility
            layer to preserve, so the memory model, the trap path and the boot
            sequence are designed for the architecture rather than adapted to it.
          </p>
          <p className={styles.whyBody}>
            That costs us an existing driver ecosystem. It buys something we think
            matters more: on an open instruction set, what a device is allowed to do
            can be decided by its hardware and its owner.
          </p>
        </article>
        <article className={styles.whyColumn}>
          <h2 className={styles.whyTitle}>Why Rust</h2>
          <p className={styles.whyBody}>
            In a microkernel system most code lives outside the kernel — drivers,
            filesystems, networking and the graphics stack all run as ordinary
            userspace processes. Rust's compile-time guarantees apply to exactly that
            majority, and the userspace libraries holding the domain logic are marked{' '}
            <code>#![forbid(unsafe_code)]</code>.
          </p>
          <p className={styles.whyBody}>
            This is a position, not a proof. The security posture is capability-based
            and microkernel-hard in the seL4 tradition, but we are not betting the
            project on formal verification as a first milestone — and NEURON is not
            formally verified.
          </p>
        </article>
      </div>
    </section>
  );
}

function ExploreSection(): ReactNode {
  return (
    <section className={styles.exploreSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Start anywhere.</h2>
      </div>
      <div className={`${styles.proseContainer} ${styles.exploreGrid}`}>
        <Link className={styles.exploreCard} to="/risc-v-operating-system">
          <span className={styles.exploreTitle}>The operating system</span>
          <span className={styles.exploreBody}>
            How the three tiers fit together, and what we hold ourselves to.
          </span>
        </Link>
        <Link className={styles.exploreCard} to="/capability-microkernel">
          <span className={styles.exploreTitle}>The microkernel</span>
          <span className={styles.exploreBody}>
            Capabilities, the 14-syscall baseline, Sv39 and W^X, and the messages the
            kernel never reads.
          </span>
        </Link>
        <Link className={styles.exploreCard} to="/risc-v-desktop">
          <span className={styles.exploreTitle}>The desktop</span>
          <span className={styles.exploreBody}>
            GPU-composited windows, apps written in NeX — and an honest line between
            what is real and what is a mockup.
          </span>
        </Link>
        <Link className={styles.exploreCard} to="/docs/contributing/development/setup">
          <span className={styles.exploreTitle}>Build it yourself</span>
          <span className={styles.exploreBody}>
            Clone it, build it, and boot the whole system in QEMU.
          </span>
        </Link>
      </div>
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
        <RunsTodaySection />
        <WhySection />
        <ExploreSection />
      </main>
    </Layout>
  );
}
