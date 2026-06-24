import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import type {Props} from '@theme/BlogListPage';

import styles from './styles.module.css';

// Soft, Apple-ish gradients used for posts that ship without a cover image.
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #0071e3 0%, #5856d6 100%)',
  'linear-gradient(135deg, #1d1d1f 0%, #434348 100%)',
  'linear-gradient(135deg, #2997ff 0%, #0a84ff 100%)',
  'linear-gradient(135deg, #5e5ce6 0%, #bf5af2 100%)',
  'linear-gradient(135deg, #ff9f0a 0%, #ff375f 100%)',
  'linear-gradient(135deg, #30b0c7 0%, #0071e3 100%)',
];

function gradientFor(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type CardItem = Props['items'][number];

function StoryCard({
  content,
  featured = false,
  index = 0,
}: {
  content: CardItem['content'];
  featured?: boolean;
  index?: number;
}): ReactNode {
  const {metadata} = content;
  // assets.image is the bundler-generated path; frontMatter.image is the raw URL.
  const image =
    (content as {assets?: {image?: string}}).assets?.image ??
    (metadata.frontMatter?.image as string | undefined);
  const summary =
    (metadata.frontMatter?.subtitle as string | undefined) ??
    metadata.description;
  const eyebrow = metadata.tags?.[0]?.label ?? 'Update';
  const readingTime = (metadata as {readingTime?: number}).readingTime;

  return (
    <Link
      to={metadata.permalink}
      className={clsx(styles.card, featured && styles.featured)}
      style={{animationDelay: `${Math.min(index, 6) * 0.07}s`}}>
      {image ? (
        <div className={styles.media}>
          <img src={image} alt="" loading={featured ? 'eager' : 'lazy'} />
        </div>
      ) : (
        <div
          className={clsx(styles.media, styles.mediaFallback)}
          style={{background: gradientFor(metadata.permalink)}}>
          <span className={styles.fallbackMark}>open nexus</span>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h2 className={styles.title}>{metadata.title}</h2>
        {summary && <p className={styles.summary}>{summary}</p>}
        <div className={styles.meta}>
          <span>{formatDate(metadata.date)}</span>
          {typeof readingTime === 'number' && (
            <>
              <span className={styles.dot}>·</span>
              <span>{Math.max(1, Math.ceil(readingTime))} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items, sidebar} = props;
  const isFirstPage = !metadata.page || metadata.page === 1;
  const [featured, ...rest] = items;
  const showFeatured = isFirstPage && Boolean(featured);

  return (
    <BlogLayout sidebar={sidebar}>
      <div className={styles.newsroom}>
        <div className={styles.grid}>
          {showFeatured && (
            <StoryCard content={featured.content} featured index={0} />
          )}
          {(showFeatured ? rest : items).map((item, i) => (
            <StoryCard
              key={item.content.metadata.permalink}
              content={item.content}
              index={i + (showFeatured ? 1 : 0)}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginatorWrap}>
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
