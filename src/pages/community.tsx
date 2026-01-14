import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MessageSquare, Code, Palette, BookOpen, Megaphone, Users, ExternalLink } from 'lucide-react';
import styles from './community.module.css';

const communityTopics = [
  {
    icon: MessageSquare,
    title: 'General Discussion',
    description: 'Ideas, feedback, and open conversations about Open Nexus',
    link: 'https://discord.gg/3sTZvH4PEq',
    color: '#0071e3',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Rust, microkernel architecture, RISC-V, and core contributions',
    link: '/docs/contributing',
    color: '#f5a623',
  },
  {
    icon: Palette,
    title: 'Design & UX',
    description: 'Interface design, accessibility, user experience discussions',
    link: 'https://discord.gg/3sTZvH4PEq',
    color: '#7856ff',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Help improve guides, translations, and learning resources',
    link: '/docs/intro',
    color: '#28a745',
  },
  {
    icon: Megaphone,
    title: 'Advocacy & Outreach',
    description: 'Spread the word, organize events, grow the ecosystem',
    link: 'https://discord.gg/3sTZvH4PEq',
    color: '#ff3b30',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Help newcomers, answer questions, build a welcoming space',
    link: 'https://discord.gg/3sTZvH4PEq',
    color: '#00c7be',
  },
];

export default function Community() {
  return (
    <Layout title="Community">
      <main className={styles.communityPage}>
        {/* Compact Header */}
        <section className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Community</h1>
            <p className={styles.subtitle}>
              Connect, contribute, and shape the future of Open Nexus together.
            </p>
          </div>
        </section>

        {/* Topics Grid */}
        <section className={styles.topicsSection}>
          <div className={styles.container}>
            <div className={styles.topicsGrid}>
              {communityTopics.map((topic, idx) => {
                const Icon = topic.icon;
                const isExternal = topic.link.startsWith('http');
                
                return (
                  <Link
                    key={idx}
                    to={topic.link}
                    className={styles.topicCard}
                    style={{ '--topic-color': topic.color } as React.CSSProperties}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className={styles.topicIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className={styles.topicContent}>
                      <h3 className={styles.topicTitle}>
                        {topic.title}
                        {isExternal && <ExternalLink size={16} className={styles.externalIcon} />}
                      </h3>
                      <p className={styles.topicDescription}>{topic.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Discord Hub */}
        <section className={styles.discordSection}>
          <div className={styles.container}>
            <div className={styles.discordContent}>
              <div className={styles.discordText}>
                <h2 className={styles.discordTitle}>Join us on Discord</h2>
                <p className={styles.discordDescription}>
                  Our primary hub for real-time discussions, demos, and collaboration.
                  Whether you're contributing code, asking questions, or just exploring — you're welcome.
                </p>
                <Link
                  href="https://discord.gg/3sTZvH4PEq"
                  className={styles.discordButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={20} />
                  Open Discord
                </Link>
              </div>
              <div className={styles.discordImage}>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Community collaboration"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Developers */}
        <section className={styles.developersSection}>
          <div className={styles.container}>
            <div className={styles.developersContent}>
              <div className={styles.developersImage}>
                <img
                  src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Open source development"
                  loading="lazy"
                />
              </div>
              <div className={styles.developersText}>
                <h2 className={styles.developersTitle}>For Developers</h2>
                <p className={styles.developersDescription}>
                  Ready to contribute code? Start with our documentation: architecture overview,
                  build setup, contribution workflow, and how to submit your first PR.
                </p>
                <div className={styles.developersButtons}>
                  <Link href="/docs/contributing" className="button button--primary button--lg">
                    Contributing Guide
                  </Link>
                  <Link href="/docs/category/building-blocks" className="button button--secondary button--lg">
                    Architecture Docs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Values */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <h2 className={styles.valuesTitle}>Community Guidelines</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Open by default</h3>
                <p className={styles.valueText}>
                  Decisions, designs, and discussions happen in public. Transparency builds trust.
                </p>
              </div>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Respect & inclusivity</h3>
                <p className={styles.valueText}>
                  Welcoming environment for all backgrounds. Constructive feedback, no gatekeeping.
                </p>
              </div>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Quality over hype</h3>
                <p className={styles.valueText}>
                  Steady progress, real solutions. We ship in slices, not vaporware.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Partnerships & Sponsorship</h3>
              <p className={styles.contactText}>
                Interested in strategic collaboration, research partnerships, or supporting the project?
              </p>
              <Link href="mailto:jenning@open-nexus-os.io" className="button button--secondary button--lg">
                jenning@open-nexus-os.io
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
