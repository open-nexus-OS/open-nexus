import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/BlogPostPage';

import {gradientFor, formatDate} from '@site/src/utils/blog';
import styles from './styles.module.css';

const MAX_RECENT = 3;

// Apple Newsroom-style "Recent posts" grid shown below the article.
function RecentPosts({
  sidebar,
  currentPermalink,
}: {
  sidebar: Props['sidebar'];
  currentPermalink: string;
}): ReactNode {
  const items =
    sidebar?.items
      ?.filter((item) => item.permalink !== currentPermalink)
      .slice(0, MAX_RECENT) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.recent}>
      <h2 className={styles.recentHeading}>Recent posts</h2>
      <div className={styles.recentGrid}>
        {items.map((item) => (
          <Link key={item.permalink} to={item.permalink} className={styles.card}>
            <div
              className={styles.cardMedia}
              style={{background: gradientFor(item.permalink)}}>
              <span className={styles.cardMark}>open nexus</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.cardDate}>{formatDate(item.date)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BlogPostPageContent({
  sidebar,
  children,
}: {
  sidebar: Props['sidebar'];
  children: ReactNode;
}): ReactNode {
  const {metadata, toc} = useBlogPost();
  const {nextItem, prevItem, frontMatter, permalink} = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  return (
    <BlogLayout
      // No sidebar on the article: a centered, Newsroom-style reading column.
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }>
      <ContentVisibility metadata={metadata} />

      <BlogPostItem>{children}</BlogPostItem>

      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}

      <RecentPosts sidebar={sidebar} currentPermalink={permalink} />
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
