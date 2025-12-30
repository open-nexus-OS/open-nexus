import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Partners() {
  return (
    <Layout title="Partners">
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '3rem 1.25rem' }}>
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Strategic Partnerships</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--ifm-color-emphasis-700)', margin: 0 }}>
            We’re not asking for donations. We’re building an open platform for the next era of computing.
          </p>
        </header>

        {/* Positioning */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Who this is for</h2>
          <p>
            Leaders who want to co-build a secure, open, and sovereign OS platform—
            not as a marketing badge, but as a real capability across devices and industries.
          </p>
          <ul>
            <li>Device makers (mobile, desktop, automotive, IoT)</li>
            <li>Industrial and public-sector platforms</li>
            <li>Infrastructure and semiconductor partners</li>
            <li>Research labs and universities</li>
          </ul>
        </section>

        {/* What we offer */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>What we offer</h2>
          <ul>
            <li><strong>Co-building the core</strong> — Rust + neuron microkernel, RISC-V first</li>
            <li><strong>Early access</strong> — roadmaps, SDKs, reference designs</li>
            <li><strong>Pilot programs</strong> — from prototypes to production paths</li>
            <li><strong>Compliance-first thinking</strong> — privacy, security, and auditability</li>
            <li><strong>Influence</strong> — a voice in standards and long-term direction</li>
          </ul>
        </section>

        {/* What we look for */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>What we look for</h2>
          <ul>
            <li>Shared conviction: open ecosystems outlast closed ones</li>
            <li>Meaningful investment: capital, talent, or hardware access</li>
            <li>Real use-cases: mobility, edge, industrial, public sector</li>
          </ul>
        </section>

        {/* Call to action */}
        <section style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ fontSize: '1.05rem' }}>
            If you’re exploring a serious collaboration, let’s talk.
          </p>
          <Link href="mailto:jenning@open-nexus-os.io" className="button button--primary button--lg">
            Contact: jenning@open-nexus-os.io
          </Link>
          <p style={{ marginTop: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}>
            Short intro, problem you want to solve, and the scale you have in mind.
          </p>
        </section>

        {/* Philosophy */}
        <section style={{ marginTop: '3rem' }}>
          <h2>Our stance</h2>
          <p>
            We don’t run a donation jar or sell merchandise. We build enduring infrastructure.
            Partners are here to move the needle with us — from first boot to fleet deployments.
          </p>
        </section>
      </main>
    </Layout>
  );
}
