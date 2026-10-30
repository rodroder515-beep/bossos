import React from 'react';
import { MoodId } from '../core/mood';

interface PookieMotifProps {
  mood: MoodId;
  variant?: 'badge' | 'watermark' | 'barcode';
  className?: string;
}

/**
 * Curated 100% offline inline SVG visual element library inspired by:
 * - Reference Group A: Liquid Chrome Y2K (metallic 4-point star, chrome heart-orbit, wireframe globe)
 * - Reference Group B: Black Geometric Ornaments (orbital rings, 8-point sparkle, ruler ticks)
 * - Reference Group C & D: Neo-Brutalist Retro UI & Technical Editorial (barcode stamp, archival disk)
 *
 * Uses zero external image files or network requests.
 */
export const PookieMotif: React.FC<PookieMotifProps> = ({
  mood,
  variant = 'badge',
  className = '',
}) => {
  if (variant === 'barcode') {
    return (
      <svg
        viewBox="0 0 88 18"
        fill="none"
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
      >
        {/* Technical Editorial Barcode (Reference Group C & D) */}
        <rect x="0" y="1" width="3" height="16" fill="currentColor" />
        <rect x="5" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="9" y="1" width="4" height="16" fill="currentColor" />
        <rect x="15" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="19" y="1" width="2.5" height="16" fill="currentColor" />
        <rect x="24" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="28" y="1" width="4.5" height="16" fill="currentColor" />
        <rect x="35" y="1" width="2" height="16" fill="currentColor" />
        <rect x="39" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="43" y="1" width="3.5" height="16" fill="currentColor" />
        <rect x="49" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="53" y="1" width="3" height="16" fill="currentColor" />
        <rect x="58" y="1" width="2" height="16" fill="currentColor" />
        <rect x="62" y="1" width="4" height="16" fill="currentColor" />
        <rect x="68" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="72" y="1" width="3" height="16" fill="currentColor" />
        <rect x="77" y="1" width="1.5" height="16" fill="currentColor" />
        <rect x="81" y="1" width="4" height="16" fill="currentColor" />
        <rect x="86.5" y="1" width="1.5" height="16" fill="currentColor" />
      </svg>
    );
  }

  const gradId = `pookie-chrome-${mood}-${variant}`;

  // Mood 1: Passive-Aggressive (Nineties Nostalgia) -> Editorial 4-Point Star & Orbital Hairline
  if (mood === 'corporate') {
    return (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#54272B" />
            <stop offset="55%" stopColor="#D98FA6" />
            <stop offset="100%" stopColor="#777782" />
          </linearGradient>
        </defs>
        <ellipse
          cx="18"
          cy="18"
          rx="15"
          ry="6.5"
          transform="rotate(-24 18 18)"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeOpacity="0.65"
        />
        <path
          d="M18 3L21 15L33 18L21 21L18 33L15 21L3 18L15 15L18 3Z"
          fill={`url(#${gradId})`}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  // Mood 2: Fake-Supportive (Virtual Consciousness) -> Liquid Chrome Y2K Heart with Orbital Ring
  if (mood === 'passive_aggressive') {
    return (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#A8D8F0" />
            <stop offset="75%" stopColor="#777782" />
            <stop offset="100%" stopColor="#F4BBD4" />
          </linearGradient>
        </defs>
        <ellipse
          cx="18"
          cy="19"
          rx="16"
          ry="6"
          transform="rotate(-18 18 19)"
          stroke="#302A31"
          strokeWidth="1.5"
        />
        <path
          d="M18 29.5C18 29.5 7 22.2 7 13.8C7 9.8 10.1 7 13.7 7C15.9 7 17.3 8.2 18 9.6C18.7 8.2 20.1 7 22.3 7C25.9 7 29 9.8 29 13.8C29 22.2 18 29.5 18 29.5Z"
          fill={`url(#${gradId})`}
          stroke="#302A31"
          strokeWidth="1.6"
        />
        <path
          d="M29 5L30.2 8.3L33.5 9.5L30.2 10.7L29 14L27.8 10.7L24.5 9.5L27.8 8.3L29 5Z"
          fill="#302A31"
        />
      </svg>
    );
  }

  // Mood 3: Existential Pookie / Cyber Blue -> Cyan Wireframe Globe & Warning Yellow 4-Point Star
  if (mood === 'existential') {
    return (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
      >
        <circle
          cx="18"
          cy="18"
          r="13"
          fill="#00C4D4"
          stroke="#111111"
          strokeWidth="1.8"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="13"
          ry="5.5"
          stroke="#111111"
          strokeWidth="1.4"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="5.5"
          ry="13"
          stroke="#111111"
          strokeWidth="1.4"
        />
        <path
          d="M18 5L20.6 15.4L31 18L20.6 20.6L18 31L15.4 20.6L5 18L15.4 15.4L18 5Z"
          fill="#FFD23F"
          stroke="#111111"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  // Mood 4: Unhinged Chaos (Floppy Disk Fever) -> Archival 3.5" Floppy & Geometric Star
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      <rect
        x="5"
        y="5"
        width="26"
        height="26"
        rx="1.5"
        fill="#242322"
        stroke="#242322"
        strokeWidth="1.6"
      />
      {/* Metallic shutter */}
      <rect
        x="11"
        y="5"
        width="13"
        height="9"
        fill="#D8CCB8"
        stroke="#242322"
        strokeWidth="1.2"
      />
      <rect x="19" y="6.5" width="3" height="6" fill="#242322" />
      {/* Signal red & cream archival label */}
      <rect
        x="9"
        y="17"
        width="18"
        height="14"
        fill="#F2E4C8"
        stroke="#242322"
        strokeWidth="1.2"
      />
      <rect x="9" y="17" width="18" height="4" fill="#B92F25" />
      <line x1="11" y1="24" x2="25" y2="24" stroke="#B92F25" strokeWidth="1.2" />
      <line x1="11" y1="27.5" x2="22" y2="27.5" stroke="#242322" strokeWidth="1.2" />
    </svg>
  );
};
