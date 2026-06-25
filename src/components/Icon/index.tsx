/**
 * Shared line-icon registry + <Icon> component.
 * Used by the swizzled DocCard (category/page cards) and the /partners page,
 * so the colored line-icon vocabulary stays consistent and defined once.
 */
import React, {type ReactNode} from 'react';

export const ICONS: Record<string, ReactNode> = {
  book: (
    <>
      <path d="M4 4h6a2 2 0 0 1 2 2v14a3 3 0 0 0-3-3H4z" />
      <path d="M20 4h-6a2 2 0 0 0-2 2v14a3 3 0 0 1 3-3h5z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h12l-2 3 2 3H5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 13.5 13.5 8 16 10.5 10.5" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <line x1="6.5" y1="7.5" x2="9" y2="7.5" />
      <line x1="6.5" y1="16.5" x2="9" y2="16.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  file: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5" />
      <path d="M18.5 20a6 6 0 0 0-3-5.2" />
    </>
  ),
  message: (
    <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <line x1="13" y1="15" x2="17" y2="15" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  merge: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 8.5v7" />
      <path d="M15.5 9.5A9 9 0 0 1 6 13" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16" />
      <path d="M6 20h12" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.5 5a3 3 0 0 0 5 0z" />
      <path d="M19 7l-2.5 5a3 3 0 0 0 5 0z" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12l3 3 5-5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="12.5" x2="21" y2="12.5" />
    </>
  ),
  trending: (
    <>
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </>
  ),
};

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.8,
  className,
}: {
  name?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}): ReactNode {
  const glyph = (name && ICONS[name]) ?? ICONS.file;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true">
      {glyph}
    </svg>
  );
}
