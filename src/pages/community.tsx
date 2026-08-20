import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MessageSquare, Code, BookOpen, Megaphone, AtSign, Youtube, ExternalLink } from 'lucide-react';
import styles from './community.module.css';

const communityTopics = [
  {
    icon: MessageSquare,
    title: 'General Discussion',
    description: 'Ideas, feedback, and help for newcomers — our real-time hub on Discord',
    link: 'https://discord.gg/3sTZvH4PEq',
    color: '#0071e3',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Rust, microkernel architecture, RISC-V, interface design, and core contributions',
    link: '/docs/contributing',
    color: '#f5a623',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Help improve guides, translations, and learning resources',
    link: '/docs/category/the-story',
    color: '#28a745',
  },
  {
    icon: Megaphone,
    title: 'News & Announcements',
    description: 'Release notes and milestones as they happen — follow @opennexusOS on X',
    link: 'https://x.com/opennexusOS',
    color: '#7856ff',
  },
  {
    icon: AtSign,
    title: 'Fediverse',
    description: 'The same updates on Mastodon, for everyone who prefers the open network',
    link: 'https://mastodon.social/@open_nexus_os',
    color: '#00c7be',
  },
  {
    icon: Youtube,
    title: 'Demos & Walkthroughs',
    description: 'Watch the system boot, run, and evolve on real hardware',
    link: 'https://www.youtube.com/@opennexusOS',
    color: '#ff3b30',
  },
];

export default function Community() {
  return (
    <Layout
      title="Community"
      description="Join the Open Nexus community to discuss Rust, microkernel architecture, RISC-V, documentation, and contributions to an open operating system.">
      <main className={styles.communityPage}>
        {/* Compact Header */}
        <section className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Community</h1>
            <p className={styles.subtitle}>
              Connect, contribute, and help shape an open OS with a broad vision and a disciplined path.
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
                  build setup, contribution workflow, and how we move from focused first deployments toward broader device classes.
                </p>
                <div className={styles.developersButtons}>
                  <Link href="/docs/contributing" className="button button--primary button--lg">
                    Contributing Guide
                  </Link>
                  <Link href="/docs/category/architecture" className="button button--secondary button--lg">
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
                Interested in strategic collaboration, research partnerships, or supporting focused real-world deployments?
              </p>
              <Link href="mailto:jenning@open-nexus-os.io" className="button button--secondary button--lg">
                jenning@open-nexus-os.io
              </Link>
              <div className={styles.sponsorEmbed}>
                <iframe
                  src="https://github.com/sponsors/open-nexus-OS/button"
                  title="Sponsor open-nexus-OS"
                  height={32}
                  width={114}
                  style={{ border: 0, borderRadius: 6 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
