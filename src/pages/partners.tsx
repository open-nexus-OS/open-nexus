import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Icon} from '@site/src/components/Icon';
import styles from './partners.module.css';

const EARLY = [
  {
    icon: 'compass',
    color: '#0071e3',
    title: 'Influence',
    text: "Steer the interfaces and priorities while they're still soft — toward the hardware profiles and use cases that matter to your world.",
  },
  {
    icon: 'cpu',
    color: '#ff9f0a',
    title: 'Knowledge from the inside',
    text: 'Your engineers see a from-scratch, capability-secure RISC-V system at a depth most teams never get to.',
  },
  {
    icon: 'badge',
    color: '#5e5ce6',
    title: 'Founding standing',
    text: 'On the record as having backed open digital sovereignty before it was obvious — with the credibility that earns later.',
  },
];

export default function Partners() {
  return (
    <Layout
      title="Partners"
      description="Open Nexus is an open foundation, not a product yet. The most valuable thing you can give it early isn't funding — it's signal.">
      <main className={styles.partnersPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>For partners &amp; sponsors</p>
            <h1 className={styles.heroTitle}>Be early.</h1>
            <p className={styles.heroSubtitle}>
              Open Nexus isn&apos;t a product you can buy yet. It&apos;s an open foundation —
              and the cheapest moment to matter to it is right now.
            </p>
          </div>
        </section>

        {/* Honest opener */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={`${styles.contentCard} ${styles.centeredCard}`}>
              <p className={styles.cardText}>
                Open Nexus is not a product you can buy yet. It&apos;s an open foundation: a clean,
                vertically integrated operating system built from the ground up on open RISC-V
                hardware, with a strong focus on capability-based security. The real commercial
                impact is still years away — and anyone who says otherwise is probably selling
                something.
              </p>
            </div>
          </div>
        </section>

        {/* Why talk now */}
        <section className={styles.twoColumnSection}>
          <div className={styles.container}>
            <div className={`${styles.contentCard} ${styles.centeredCard}`}>
              <h2 className={styles.cardTitle}>So why talk now?</h2>
              <p className={styles.cardText}>
                Because the most important platforms of an era are rarely shaped by the biggest
                budgets. They&apos;re shaped by the small number of people who were simply there
                early — while everything was still fluid.
              </p>
              <p className={styles.cardText}>
                You probably recognize the shape of that: the ones who end up early to something
                foundational usually aren&apos;t the ones with the most resources, just the ones who
                saw it a little sooner than everyone else. And foundations, once they take, tend to
                matter for a very long time.
              </p>
            </div>
          </div>
        </section>

        {/* What being early gets you */}
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What being early gets you</h2>
            <div className={styles.threeColumnGrid}>
              {EARLY.map((item) => (
                <div key={item.title} className={styles.contentCard}>
                  <span
                    className={styles.iconBadge}
                    style={{color: item.color, background: `${item.color}1f`}}
                    aria-hidden="true">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* It costs almost nothing — signal + real screenshot */}
        <section className={styles.twoColumnSection}>
          <div className={styles.container}>
            <div className={styles.contentWithImage}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>It costs almost nothing</h2>
                <p className={styles.cardText}>
                  Right now the most valuable thing you can give isn&apos;t funding. It&apos;s
                  signal. A good introduction. Putting the project in front of the right people
                  internally. Maybe letting me present once to the right team.
                </p>
                <p className={styles.cardText}>
                  That kind of quiet early support moves the whole thing forward more than
                  you&apos;d expect — and for us it&apos;s worth more than any sponsorship at this
                  stage. Early doesn&apos;t stay available, though: once the interfaces harden and
                  the project becomes obvious, the cost of being part of it only goes one way.
                </p>
              </div>
              <div>
                <div className={styles.imageWrapper}>
                  <img
                    src="/img/screenshot-onos.png"
                    alt="Open Nexus running on RISC-V: layered, GPU-composited windows"
                    loading="lazy"
                  />
                </div>
                <p className={styles.imageCaption}>
                  Open Nexus today — a real UI on RISC-V, composited on the GPU.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={`${styles.contentCard} ${styles.centeredCard}`}>
              <h2 className={styles.cardTitle}>The substance is public</h2>
              <p className={styles.cardText}>
                This isn&apos;t a pitch deck. The architecture, the security model, and the papers
                behind them are open — read them and judge for yourself.
              </p>
              <div className={styles.proofLinks}>
                <Link href="/docs/category/architecture">How the system works</Link>
                <Link href="/docs/architecture/research-and-papers">Papers &amp; DOIs</Link>
                <Link href="/docs/category/for-industry">The short, factual version</Link>
              </div>
            </div>
          </div>
        </section>

        {/* What this is not */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.contentCard}>
              <h2 className={styles.cardTitle}>What this is not</h2>
              <ul className={styles.list}>
                <li>No finished product yet</li>
                <li>No IP transfer</li>
                <li>No exclusivity</li>
                <li>No control over the roadmap</li>
              </ul>
              <p className={styles.cardText} style={{marginTop: '1.5rem'}}>
                Just an honest, fully open project (Apache 2.0), built in public by people who care
                about doing this right.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <p className={styles.ctaText}>
              If this quietly excites you — strategy, sovereignty, or simply because you find it
              cool — I&apos;d be happy to talk.
            </p>
            <Link href="mailto:jenning@open-nexus-os.io" className={styles.ctaButton}>
              Start a conversation
            </Link>
            <p className={styles.ctaHint}>
              Tell me who you are and why it resonates. No pressure, just a real conversation.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
