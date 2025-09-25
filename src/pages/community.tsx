import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Community() {
  return (
    <Layout title="Community">
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '3rem 1.25rem' }}>
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Join the Open Nexus Community</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)', margin: 0 }}>
            One OS. Many Devices. Built in the open — and built to last.
          </p>
        </header>

        {/* Why join */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Why join?</h2>
          <p>
            Open Nexus is an ambitious, open-source operating system built in Rust on a Redox microkernel.
            The community is where ideas become designs, and designs become code. Whether you write Rust or not,
            you can help shape an open ecosystem that puts people — not platforms — first.
          </p>
          <ul>
            <li>Be part of a global movement for an open, privacy-first ecosystem</li>
            <li>Help define the experience across mobile, desktop, and IoT</li>
            <li>Get early access to plans, prototypes, and community events</li>
          </ul>
        </section>

        {/* Ways to participate without coding */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Not a developer? Still essential.</h2>
          <ul>
            <li><strong>Testing & feedback</strong> — try builds, file issues, influence priorities</li>
            <li><strong>Design reviews</strong> — UX/UI critique, copy, accessibility checks</li>
            <li><strong>Docs & translations</strong> — make the project easier to use worldwide</li>
            <li><strong>Advocacy</strong> — share the vision, invite partners, grow the ecosystem</li>
          </ul>
        </section>

        {/* Primary CTA: Discord */}
        <section style={{ marginBottom: '2rem' }}>
          <h3>Join our Discord</h3>
          <p>Serious work, friendly tone. Discord is where decisions take shape, demos happen, and new contributors get onboarded.</p>
          <Link
            href="https://discord.gg/3sTZvH4PEq"
            className="button button--primary button--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </Link>
        </section>

        {/* Secondary contact */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3>Prefer email?</h3>
          <p>
            Interested in partnerships, research, or sponsoring? Let’s talk.
          </p>
          <Link href="mailto:jenning@open-nexus-os.io" className="button button--secondary">
            jenning@open-nexus-os.io
          </Link>
        </section>

        {/* For developers: route to Contributing docs (not external GH link spam) */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Developers</h2>
          <p>
            Ready to build? Start with our docs: codebase overview, setup, workflow, and how to ship changes.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/docs/contributing" className="button button--secondary">Contributing</Link>
            <Link href="/docs/development" className="button button--secondary">Development</Link>
            <Link href="/docs/governance" className="button button--secondary">Governance</Link>
          </div>
        </section>

        {/* Community values */}
        <section>
          <h2>Community values</h2>
          <ul>
            <li><strong>Open by default</strong> — decisions and designs in the open</li>
            <li><strong>Respect</strong> — inclusive, welcoming, and constructive</li>
            <li><strong>Quality</strong> — steady progress over hype; ship in slices</li>
          </ul>
        </section>

        <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>
          <p>Open Nexus is young and growing. Whether you build, test, write, or simply care — there’s a place for you here.</p>
        </footer>
      </main>
    </Layout>
  );
}
