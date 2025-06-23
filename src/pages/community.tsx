import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Community() {
  return (
    <Layout>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <h1>Join the Open Nexus OS Community</h1>
        <p>
          Welcome to the heart of Open Nexus OS! We are building a modern, secure, and open mobile operating system based on Rust, Redox OS, and COSMIC.
          Whether you’re an experienced developer, designer, or just curious about our vision — we want you to join us on this exciting journey.
        </p>

        <h2>Why Join?</h2>
        <ul>
          <li>Contribute to a cutting-edge open-source mobile OS project</li>
          <li>Collaborate with passionate developers and UX/UI experts</li>
          <li>Help shape the future of privacy-focused, modular operating systems</li>
          <li>Learn and grow your skills in Rust, low-level systems, and UI design</li>
        </ul>

        <h2>Get Started</h2>
        <p>
          We’re currently in the design and planning phase and actively looking for contributors in development, design, documentation, and more.
        </p>

        <h3>💬 Join our Discord community</h3>
        <p>
          Chat, ask questions, share ideas, and get real-time help from the team and other contributors.
        </p>
        <Link
          href="https://discord.gg/3sTZvH4PEq"
          className="button button--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Discord
        </Link>

        <h3>📖 Explore our Design and Development Docs on GitHub</h3>
        <p>
          Dive into the project’s architecture, design decisions, and contribution guidelines.
        </p>
        <Link
          href="https://github.com/open-nexus-OS/open-nexus/wiki/Design-Doc"
          className="button button--secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Design Docs
        </Link>

        <h2>How to Contribute</h2>
        <p>
          New contributors are always welcome! Check out our{' '}
          <Link href="https://github.com/open-nexus-OS/open-nexus/wiki/Contributing" target="_blank" rel="noopener noreferrer">
            Contribution Guidelines
          </Link>{' '}
          and look for <code>good first issues</code> to get started easily.
        </p>

        <p>
          Your ideas, skills, and enthusiasm will help make Open Nexus OS a success.
        </p>

        <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#666' }}>
          <p>We value a respectful, inclusive, and collaborative community. Everyone is welcome.</p>
        </footer>
      </main>
    </Layout>
  );
}
