import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rust + RISC-V first',
    Svg: require('@site/static/img/risc-rust.svg').default,
    description: (
      <>
        Modern. secure and futureproof foundation.
      </>
    ),
  },
  {
    title: 'Redox Microkernel Foundation',
    Svg: require('@site/static/img/Redox_logo_2015.svg').default,
    description: (
      <>
        A proven microkernel architecture with security and modularity at its core.
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
    title: 'Seamless ecosystem & modularity',
    Svg: require('@site/static/img/device.svg').default,
    description: (
      <>
        One OS for mobile, desktop, embedded and IoT devices.
      </>
    ),
  },
  {
    title: 'Built for devlopers & users',
    Svg: require('@site/static/img/console.svg').default,
    description: (
      <>
        Modular, hackable and open by design.
      </>
    ),
  },
  {
    title: 'Open collaboration',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
        Shape the futurewith a global community. <a href='/community'>Join us!</a>

      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('features')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section>
        <div className="feature-grid">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
    </section>
  );
}
