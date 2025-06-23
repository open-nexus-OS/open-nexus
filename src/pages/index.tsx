import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="">
          Start with us a journey to create a Rust+Microkernel (Redox based) mobile operating system, 
          for single device experience with distributed and virtual ressources in a common open source eco system on Risc-V architecture. 
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/introduction">
            Vision
          </Link>
        </div>
        <div className='spacer'></div>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/blog/2025_06-23-join-us">
            Join Us!
          </Link>
        </div>
        <div className='hero-img'></div>
         {/* <img src="img/devices.png" alt="Devices" className='hero-img' />  */}
      </div>
    </header>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Single Device experience mobile operating system <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
