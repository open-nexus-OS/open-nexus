import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './partners.module.css';

export default function Partners() {
  return (
    <Layout
      title="Strategic Partnerships"
      description="Strategic partnerships with Open Nexus focus on a demonstrable Apache-2.0 system stack for dedicated RISC-V kiosk and HMI devices, backed by public architecture papers and a published software artifact.">
      <main className={styles.partnersPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Strategic Partnerships</h1>
            <p className={styles.heroSubtitle}>
              We offer a focused, sponsor-aligned path to a demonstrable Apache-2.0 system stack for dedicated RISC-V display devices.
            </p>
          </div>
        </section>

        {/* Positioning */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentWithImage}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Why this matters</h2>
                <p className={styles.cardText}>
                  Many dedicated device platforms become harder to control the moment a real deployment starts:
                  one custom driver, one special workflow, one tighter security requirement, one longer lifecycle.
                  Complexity spreads, costs rise, and the system becomes harder to trust over time.
                </p>
                <ul className={styles.list}>
                  <li>Higher long-term maintenance cost</li>
                  <li>Slower customization for specialized deployments</li>
                  <li>More integration risk when hardware or workflows change</li>
                  <li>Less control in regulated or sovereignty-sensitive environments</li>
                </ul>
              </div>
              <div className={styles.imageWrapper}>
                <img
                  src="https://images.pexels.com/photos/3582392/pexels-photo-3582392.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Industrial control panel for dedicated device environments"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.twoColumnSection}>
          <div className={styles.container}>
            <div className={styles.twoColumnGrid}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Why Open Nexus is different</h2>
                <p className={styles.cardText}>
                  Open Nexus is not built as one large, tightly coupled stack. It is built around a Rust-based
                  microkernel, capability-governed isolation, explicit service boundaries, and a development process
                  designed to stay testable and documented as the system grows.
                </p>
                <ul className={styles.list}>
                  <li>Easier to adapt for kiosk, HMI, and other dedicated device profiles</li>
                  <li>Easier to keep maintainable over long lifecycle deployments</li>
                  <li>Stronger isolation for security-sensitive environments</li>
                  <li>Clearer integration paths for specialized hardware and driver work</li>
                  <li>Built with distributed device workflows in mind, not just isolated single endpoints</li>
                  <li>Better fit for audit, review, and controlled rollouts</li>
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Why this is credible</h2>
                <p className={styles.cardText}>
                  These are not generic platform claims. The core architecture is already described in public papers
                  and tied to a published software artifact. The goal is not to hide complexity behind slogans, but to
                  make system boundaries, trade-offs, and implementation choices inspectable.
                </p>
                <ul className={styles.list}>
                  <li>Published architecture papers with DOI references</li>
                  <li>Public software artifact linked to the implementation work</li>
                  <li>Deterministic build-and-test workflow instead of ad hoc integration</li>
                  <li>Documented design decisions, interfaces, and boundaries</li>
                  <li>Current work backed by running kernel and service foundations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What we offer & look for */}
        <section className={styles.twoColumnSection}>
          <div className={styles.container}>
            <div className={styles.twoColumnGrid}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>What we can deliver by year-end</h2>
                <ul className={styles.list}>
                  <li><strong>Demonstrable system stack</strong> — Apache-2.0 licensed and built for dedicated RISC-V display devices</li>
                  <li><strong>Runnable prototype</strong> — on defined target hardware or QEMU plus a reference board path</li>
                  <li><strong>Boot to simple UI</strong> — a working path from boot to a basic interface or application surface</li>
                  <li><strong>Microkernel-based isolation</strong> — process and service separation on top of the NEURON architecture</li>
                  <li><strong>Documented build and test flow</strong> — so the result is inspectable, repeatable, and reviewable</li>
                  <li><strong>Defined kiosk/HMI demos</strong> — concrete use-cases instead of abstract platform claims</li>
                  <li><strong>Distributed workflow path</strong> — room for managed multi-device or cross-session scenarios where they fit the agreed scope</li>
                  <li><strong>Architecture and integration docs</strong> — enough to understand boundaries, interfaces, and next steps</li>
                  <li><strong>Regular milestone demos</strong> — visible progress throughout the engagement</li>
                  <li><strong>Requirement exchange</strong> — close discussion within the agreed scope</li>
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Partner benefits</h2>
                <ul className={styles.list}>
                  <li>Early access to results as they land</li>
                  <li>Insight into the roadmap and delivery path</li>
                  <li>Influence on priorities within the agreed scope</li>
                  <li>Regular reviews and milestone demos</li>
                  <li>Founding Sponsor recognition, if desired</li>
                  <li>A reference setup relevant to the partner's use-case</li>
                  <li>Optional limited support or consulting time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentCard}>
              <h2 className={styles.cardTitle}>Evidence and references</h2>
              <p className={styles.cardText}>
                If you want to validate the technical claims internally, start with the references below. They explain
                the system model in plain terms and link architectural claims back to code and published artifacts.
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Overview of the paper set</strong> —{' '}
                  <Link href="/blog/from-microkernel-to-methodology">From Microkernel to Methodology</Link>
                </li>
                <li>
                  <strong>Deterministic capability microkernel</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18935402">DOI: 10.5281/zenodo.18935402</Link>
                </li>
                <li>
                  <strong>Explicit control-plane / data-plane split</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18935755">DOI: 10.5281/zenodo.18935755</Link>
                </li>
                <li>
                  <strong>Governed service architecture</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18938789">DOI: 10.5281/zenodo.18938789</Link>
                </li>
                <li>
                  <strong>Userspace device-service substrate</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18939217">DOI: 10.5281/zenodo.18939217</Link>
                </li>
                <li>
                  <strong>Contract-governed development workflow</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18941284">DOI: 10.5281/zenodo.18941284</Link>
                </li>
                <li>
                  <strong>Published software artifact</strong> —{' '}
                  <Link href="https://doi.org/10.5281/zenodo.18934993">DOI: 10.5281/zenodo.18934993</Link>
                </li>
                <li>
                  <strong>Technical framing for the kernel</strong> —{' '}
                  <Link href="/blog/neuron-a-microkernel-you-can-measure">NEURON: A Microkernel You Can Measure</Link>
                </li>
                <li>
                  <strong>Distributed layer progress</strong> —{' '}
                  <Link href="/blog/proof-over-luck">Proof Over Luck</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.twoColumnGrid}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>What this does not mean</h2>
                <p className={styles.cardText}>
                  A strategic partnership accelerates an open-source reference stack.
                  It does not transfer the project itself.
                </p>
                <ul className={styles.list}>
                  <li>No transfer of the entire IP</li>
                  <li>No exclusive usage rights to the open-source stack</li>
                  <li>No market exclusivity</li>
                  <li>No full control over the long-term roadmap</li>
                  <li>No permanent custom support entitlement</li>
                  <li>No promise of &quot;everything you want by year-end&quot;</li>
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>A typical scoped package</h2>
                <ul className={styles.list}>
                  <li><strong>Target device</strong> — kiosk or HMI-class system</li>
                  <li><strong>Target platform</strong> — RISC-V on defined hardware or emulator plus reference board</li>
                  <li><strong>Target outcome</strong> — a demonstrable system, not a slide deck</li>
                  <li><strong>Scope</strong> — defined core functions and agreed demo use-cases</li>
                  <li><strong>Out of scope</strong> — no full consumer OS, no app store, no broad hardware support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <p className={styles.ctaText}>
              The trust lever is Apache 2.0. The commercial offer is a faster, better-scoped, partner-informed prototype.
            </p>
            <Link href="mailto:jenning@open-nexus-os.io" className={styles.ctaButton}>
              Contact: jenning@open-nexus-os.io
            </Link>
            <p className={styles.ctaHint}>
              Send a short intro, your device/use-case, preferred target platform, and the level of involvement you have in mind.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentWithImage}>
              <div className={styles.imageWrapper}>
                <img
                  src="/img/chip.svg"
                  alt="Hardware and systems foundation for dedicated RISC-V devices"
                  loading="lazy"
                />
              </div>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>Three ways to engage</h2>
                <p className={styles.cardText}>
                  We structure collaboration so the open-source model stays clear while the sponsor still gets tangible value.
                </p>
                <ul className={styles.list}>
                  <li><strong>Sponsor</strong> — fund delivery through year-end; everything stays open source, with visibility and prioritized alignment</li>
                  <li><strong>Development partner</strong> — fund a reference build shaped around a concrete kiosk/HMI use-case</li>
                  <li><strong>Angel</strong> — back the company or pre-company structure; the Apache-2.0 stack is part of the story, not the whole consideration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
