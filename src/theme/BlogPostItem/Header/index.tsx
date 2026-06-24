import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

// Default sub-components, reused for the list views (tag / author pages).
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';

import {formatDate} from '@site/src/utils/blog';
import styles from './styles.module.css';

// Minimal, Apple Newsroom-style header for the full article page.
function PostPageHeader(): ReactNode {
  const {metadata, assets} = useBlogPost();
  const {title, date, readingTime, tags, authors, frontMatter} = metadata;
  const subtitle = frontMatter?.subtitle as string | undefined;
  const eyebrow = tags?.[0]?.label;
  const author = authors?.[0];
  const authorImage = assets.authorsImageUrls?.[0] ?? author?.imageURL;

  return (
    <header className={styles.postHeader}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}

      <h1 className={styles.title}>{title}</h1>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      <div className={styles.meta}>
        {author && (
          <span className={styles.author}>
            {authorImage && (
              <img className={styles.avatar} src={authorImage} alt="" />
            )}
            {author.url ? (
              <Link to={author.url} className={styles.authorName}>
                {author.name}
              </Link>
            ) : (
              <span className={styles.authorName}>{author.name}</span>
            )}
          </span>
        )}
        <span className={styles.metaInfo}>
          <time dateTime={date}>{formatDate(date)}</time>
          {typeof readingTime === 'number' && (
            <>
              <span className={styles.dot}>·</span>
              {Math.max(1, Math.ceil(readingTime))} min read
            </>
          )}
        </span>
      </div>
    </header>
  );
}

export default function BlogPostItemHeader(): ReactNode {
  const {isBlogPostPage} = useBlogPost();

  // List views (tag / author pages) keep the classic Docusaurus header.
  if (!isBlogPostPage) {
    return (
      <header>
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderAuthors />
      </header>
    );
  }

  return <PostPageHeader />;
}
