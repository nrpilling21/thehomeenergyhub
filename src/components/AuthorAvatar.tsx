'use client';

import { useState } from 'react';

export default function AuthorAvatar({
  src,
  alt,
  initials,
  size = 40,
}: {
  src: string;
  alt: string;
  initials: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-xs font-semibold text-ink/50">{initials}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
