import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import Heading from '@theme/Heading';

import type {Props} from '@theme/BlogLayout';
import styles from './styles.module.css';

function useShowBlogHero(): boolean {
  const {pathname} = useLocation();
  return (
    pathname === '/blog' ||
    pathname === '/blog/' ||
    pathname.startsWith('/blog/page/') ||
    pathname.startsWith('/blog/tags') ||
    pathname.startsWith('/blog/authors')
  );
}

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const showHero = useShowBlogHero();

  return (
    <Layout {...layoutProps}>
      {showHero && (
        <header className={styles.blogHero}>
          <div className={styles.blogHeroInner}>
            <Heading as="h1" className={styles.blogTitle}>
              Blog
            </Heading>
            <p className={styles.blogSubtitle}>
              Project updates, architecture notes, and milestones.
            </p>
          </div>
        </header>
      )}

      <div className={clsx('container', showHero ? styles.containerTightTop : 'margin-vert--lg')}>
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}>
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}

