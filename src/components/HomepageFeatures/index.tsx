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
        Modern, secure, and futureproof foundations for systems that need control, auditability, and long-term adaptability.
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
    title: 'Security by architecture',
    Svg: require('@site/static/img/open-nexus.svg').default,
    description: (
      <>
        Capability-based isolation and a low-trust design keep the trusted computing base small and explicit.
      </>
    ),
  },
  {
    title: 'Focused first deployments',
    Svg: require('@site/static/img/device.svg').default,
    description: (
      <>
        We start where these properties matter most: industrial HMIs, kiosks, and specialized connected devices.
      </>
    ),
  },
  {
    title: 'Built for Developers',
    Svg: require('@site/static/img/console.svg').default,
    description: (
      <>
        Modular, hackable, and open by design, with a long-term path toward broader device classes.
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
