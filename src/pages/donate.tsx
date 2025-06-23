import React from 'react';
import Layout from '@theme/Layout';

/* export default function MyReactPage() {
  return (
    <Layout>
      <div className="layout">
        <h1>Donate</h1>
        <p>Upcoming soon</p>
      </div>
    </Layout>
  );
} */


import Link from '@docusaurus/Link';

export default function DonateMerch() {
  return (
    <Layout>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <h1>Support Open Nexus OS</h1>
        <p>
          We’re excited to announce that support options, including donations and merchandise, will be available soon!
        </p>

        <h2>Why Support Us?</h2>
        <ul>
          <li>Help accelerate development and bring Open Nexus OS to life</li>
          <li>Contribute to building a privacy-focused, open-source mobile OS</li>
          <li>Support community growth and outreach activities</li>
        </ul>

        <h2>Coming Soon</h2>
        <p>
          We’re working on setting up easy ways for you to contribute financially and get exclusive Open Nexus OS merchandise.
        </p>
        <p>
          Stay tuned here and on our <Link href="https://discord.gg/3sTZvH4PEq" target="_blank" rel="noopener noreferrer">Discord</Link> for updates!
        </p>

        <h2>Get Involved Now</h2>
        <p>
          In the meantime, you can support us by contributing code, spreading the word, or joining our community.
        </p>

        <Link
          href="https://github.com/open-nexus-os"
          className="button button--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our GitHub
        </Link>

        <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#666' }}>
          <p>Thank you for your support and enthusiasm for Open Nexus OS!</p>
        </footer>
      </main>
    </Layout>
  );
}
