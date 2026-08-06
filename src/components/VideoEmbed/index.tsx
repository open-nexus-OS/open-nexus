import type * as React from 'react';
import styles from './styles.module.css';

type VideoEmbedProps = {
  /** YouTube video id — the `v=` part of the watch URL. */
  id: string;
  /** Describes the video for screen readers and as the iframe's accessible name. */
  title: string;
};

/**
 * Responsive YouTube embed for blog posts.
 *
 * Uses youtube-nocookie.com so a reader who hasn't accepted analytics doesn't
 * pick up tracking cookies just by scrolling past the player.
 */
export default function VideoEmbed({ id, title }: VideoEmbedProps): React.JSX.Element {
  return (
    <div className={styles.frame}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
