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
    title: 'RISC-V & Rust-Powered',
    Svg: require('@site/static/img/risc-rust.svg').default,
    description: (
      <>
        A modern microkernel operating system in <a href="https://www.rust-lang.org">Rust</a> - 
        ptimized for <a href='https://riscv.org'>RISC-V</a> hardware.
      </>
    ),
  },
  {
    title: '100% open source',
    Svg: require('@site/static/img/foundation.svg').default,
    description: (
      <>
        Transparency right from the start: Our code is <a href='https://www.apache.org/licenses/LICENSE-2.0.html'>Apache 2.0-licensed</a> and community-driven.
      </>
    ),
  },
  {
    title: 'Real Open Source Android Alternative',
    Svg: require('@site/static/img/open-nexus.svg').default,
    description: (
      <>
        A sovereign OS alternative to <a href='https://www.android.com'>Google/Android</a>, with a focus on privacy & control.
      </>
    ),
  },
  {
    title: 'Developer-First-Design',
    Svg: require('@site/static/img/bug-slash-solid.svg').default,
    description: (
      <>
        With clear APIs, modular architecture and upcoming bounty program for contributions
      </>
    ),
  },
  {
    title: 'Industry-ready & scalable',
    Svg: require('@site/static/img/chip.svg').default,
    description: (
      <>
        From smartphones to embedded: Our OS runs on minimal and powerful hardware.
      </>
    ),
  },
  {
    title: 'Community & Promotion',
    Svg: require('@site/static/img/shuttle-space-solid.svg').default,
    description: (
      <>
        Initiatives and open source enthusiasts - be part of the mission!
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
