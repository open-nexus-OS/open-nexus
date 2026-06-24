// Shared helpers for the Apple Newsroom-style blog theme components.

// Soft, Apple-ish gradients used for posts that ship without a cover image.
export const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #0071e3 0%, #5856d6 100%)',
  'linear-gradient(135deg, #1d1d1f 0%, #434348 100%)',
  'linear-gradient(135deg, #2997ff 0%, #0a84ff 100%)',
  'linear-gradient(135deg, #5e5ce6 0%, #bf5af2 100%)',
  'linear-gradient(135deg, #ff9f0a 0%, #ff375f 100%)',
  'linear-gradient(135deg, #30b0c7 0%, #0071e3 100%)',
];

// Deterministic gradient pick so a given post always gets the same tile.
export function gradientFor(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
