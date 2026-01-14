import type * as React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rust + RISC-V first',
    Svg: require('@site/static/img/risc-rust.svg').default,
    description: (
      <>
        Modern, secure and futureproof foundation.
      </>
    ),
  },
  {
    title: 'neuron Microkernel',
    Svg: require('@site/static/img/neuron-logo.svg').default,
    description: (
      <>
        A capability-based microkernel that enforces security at the architecture level, not in policy layers.
      </>
    ),
  },
  {
    title: 'Real Android Alternative',
    Svg: require('@site/static/img/open-nexus.svg').default,
    description: (
      <>
        Open, privacy-focused and independent mobile OS.
      </>
    ),
  },
  {
    title: 'Seamless Ecosystem',
    Svg: require('@site/static/img/device.svg').default,
    description: (
      <>
        One OS for mobile, desktop, embedded and IoT devices.
      </>
    ),
  },
  {
    title: 'Built for Developers',
    Svg: require('@site/static/img/console.svg').default,
    description: (
      <>
        Modular, hackable and open by design.
      </>
    ),
  },
  {
    title: 'Open Collaboration',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
        Shape the future with a global community. <a href='/community'>Join us!</a>
      </>
    ),
  },
];

function FeatureCard({ title, Svg, description }: FeatureItem): React.JSX.Element {
  return (
    <article className={styles.featureCard}>
      <div className={styles.iconWrapper}>
        <Svg className={styles.featureSvg} role="img" aria-hidden="true" />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </article>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <div className="feature-grid">
      {FeatureList.map((props, idx) => (
        <FeatureCard {...props} key={idx} />
      ))}
    </div>
  );
}
