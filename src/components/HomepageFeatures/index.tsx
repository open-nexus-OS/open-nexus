import type * as React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  /** Accent used for the glow behind a mark. Unused on screenshot cards. */
  accent: string;
  description: React.ReactNode;
  /** A card shows either a mark on an accent wash… */
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  /** …or a real screenshot that bleeds off the bottom edge. */
  image?: string;
  /**
   * Set when the mark carries its own brand colours. Inverting those in dark
   * mode would swap them for the wrong hues, so they get flattened to white.
   */
  branded?: boolean;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rust + RISC-V first',
    Svg: require('@site/static/img/risc-rust.svg').default,
    accent: '#ff9f0a',
    branded: true,
    description: (
      <>
        Modern, secure, and futureproof foundations for systems that need control, auditability, and long-term adaptability.
      </>
    ),
  },
  {
    title: 'neuron Microkernel',
    Svg: require('@site/static/img/neuron-logo.svg').default,
    accent: '#0071e3',
    description: (
      <>
        A capability-based microkernel that enforces security at the architecture level, not in policy layers.
      </>
    ),
  },
  {
    title: 'Security by architecture',
    Svg: require('@site/static/img/open-nexus.svg').default,
    accent: '#30d158',
    description: (
      <>
        Capability-based isolation and a low-trust design keep the trusted computing base small and explicit.
      </>
    ),
  },
  {
    title: 'Focused first deployments',
    image: '/img/tablet-light.png',
    accent: '#5856d6',
    description: (
      <>
        We start where these properties matter most: industrial HMIs, kiosks, and specialized connected devices.
      </>
    ),
  },
  {
    title: 'Built for Developers',
    image: '/img/desktop-launcher.png',
    accent: '#af52de',
    description: (
      <>
        Modular, hackable, and open by design, with a long-term path toward broader device classes.
      </>
    ),
  },
  {
    title: 'Open Collaboration',
    Svg: require('@site/static/img/community.svg').default,
    accent: '#ff375f',
    description: (
      <>
        Shape the future with a global community. <a href='/community'>Join us!</a>
      </>
    ),
  },
];

function FeatureCard({ title, Svg, image, accent, branded, description, wide }: FeatureItem & { wide?: boolean }): React.JSX.Element {
  const cardClasses = [styles.featureCard];
  if (wide) cardClasses.push(styles.featureCardWide);
  if (image) cardClasses.push(styles.featureCardShot);

  return (
    <article className={cardClasses.join(' ')} style={{ '--accent': accent } as React.CSSProperties}>
      <div className={styles.copy}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
      <div className={styles.artwork}>
        {image ? (
          <div className={styles.shotFrame}>
            <img className={styles.shot} src={image} alt="" loading="lazy" />
          </div>
        ) : (
          <Svg
            className={branded ? `${styles.featureSvg} ${styles.featureSvgBranded}` : styles.featureSvg}
            role="img"
            aria-hidden="true"
          />
        )}
      </div>
    </article>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <div className={styles.bento}>
      {FeatureList.map((props, idx) => (
        // the closing card runs the full width, artwork beside the copy
        <FeatureCard {...props} wide={idx === FeatureList.length - 1} key={idx} />
      ))}
    </div>
  );
}
