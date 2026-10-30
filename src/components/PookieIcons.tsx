import React from 'react';
import { AppId, MoodId } from '../core/mood';

interface AppIconProps {
  appId: AppId;
  mood?: MoodId;
  className?: string;
}

/**
 * Custom art-directed 1999 OS vector icon family for PookieOS.
 * Replaces generic icons with bespoke retro computing illustrations
 * (CRT Calculator, Overflowing Archival Bin, Spiral RAM Pad, Monochrome Terminal, Power Key).
 */
export const PookieAppIcon: React.FC<AppIconProps> = ({
  appId,
  className = 'w-8 h-8',
}) => {
  switch (appId) {
    case 'calc':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`inline-block shrink-0 ${className}`}
        >
          {/* Retro Bevelled Calculator Casing */}
          <rect
            x="6"
            y="4"
            width="28"
            height="32"
            rx="2"
            fill="var(--pookie-surface-primary)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="2"
          />
          <rect
            x="9"
            y="7"
            width="22"
            height="8"
            fill="var(--pookie-terminal-bg)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.5"
          />
          {/* "= 5" gaslight readout */}
          <text
            x="28"
            y="13.5"
            textAnchor="end"
            fill="var(--pookie-terminal-prompt)"
            fontSize="6.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            2+2=5
          </text>
          {/* Keypad grid */}
          <rect x="9" y="18" width="5" height="4" fill="var(--pookie-btn-bg)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="16" y="18" width="5" height="4" fill="var(--pookie-btn-bg)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="23" y="18" width="8" height="4" fill="var(--pookie-accent)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="9" y="24" width="5" height="4" fill="var(--pookie-btn-bg)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="16" y="24" width="5" height="4" fill="var(--pookie-btn-bg)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="23" y="24" width="8" height="9" fill="var(--pookie-accent-soft)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
          <rect x="9" y="29.5" width="12" height="3.5" fill="var(--pookie-btn-bg)" stroke="var(--pookie-border-outer)" strokeWidth="1.2" />
        </svg>
      );

    case 'bin':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`inline-block shrink-0 ${className}`}
        >
          {/* Sticking-out Q3_Report paper */}
          <rect
            x="14"
            y="4"
            width="14"
            height="12"
            transform="rotate(8 14 4)"
            fill="var(--pookie-surface-inset)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.5"
          />
          <line x1="16" y1="8" x2="24" y2="9" stroke="var(--pookie-accent)" strokeWidth="1.5" />
          {/* Classic Mesh/Ribbed OS Trash Can */}
          <path
            d="M8 13H32L29.5 35H10.5L8 13Z"
            fill="var(--pookie-surface-secondary)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="2"
          />
          <rect
            x="6"
            y="10"
            width="28"
            height="3.5"
            fill="var(--pookie-surface-primary)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.8"
          />
          <line x1="14" y1="17" x2="15" y2="31" stroke="var(--pookie-border-outer)" strokeWidth="1.5" />
          <line x1="20" y1="17" x2="20" y2="31" stroke="var(--pookie-border-outer)" strokeWidth="1.5" />
          <line x1="26" y1="17" x2="25" y2="31" stroke="var(--pookie-border-outer)" strokeWidth="1.5" />
        </svg>
      );

    case 'notes':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`inline-block shrink-0 ${className}`}
        >
          {/* Shadowed Spiral Notepad */}
          <rect
            x="9"
            y="6"
            width="24"
            height="29"
            fill="var(--pookie-accent)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.5"
          />
          <rect
            x="7"
            y="4"
            width="24"
            height="29"
            fill="var(--pookie-surface-inset)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="2"
          />
          {/* Top header bar */}
          <rect
            x="7"
            y="4"
            width="24"
            height="5"
            fill="var(--pookie-accent-soft)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.5"
          />
          {/* Spiral rings */}
          <line x1="11" y1="2" x2="11" y2="6" stroke="var(--pookie-border-outer)" strokeWidth="2" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="var(--pookie-border-outer)" strokeWidth="2" />
          <line x1="21" y1="2" x2="21" y2="6" stroke="var(--pookie-border-outer)" strokeWidth="2" />
          <line x1="26" y1="2" x2="26" y2="6" stroke="var(--pookie-border-outer)" strokeWidth="2" />
          {/* Lined text */}
          <line x1="11" y1="14" x2="27" y2="14" stroke="var(--pookie-text-primary)" strokeWidth="1.5" />
          <line x1="11" y1="19" x2="25" y2="19" stroke="var(--pookie-text-secondary)" strokeWidth="1.5" />
          <line x1="11" y1="24" x2="22" y2="24" stroke="var(--pookie-text-muted)" strokeWidth="1.5" />
        </svg>
      );

    case 'terminal':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`inline-block shrink-0 ${className}`}
        >
          {/* Vintage CRT Monitor Frame */}
          <rect
            x="4"
            y="5"
            width="32"
            height="25"
            rx="2"
            fill="var(--pookie-surface-secondary)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="2"
          />
          <rect
            x="7"
            y="8"
            width="26"
            height="19"
            fill="var(--pookie-terminal-bg)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.5"
          />
          {/* ">_" prompt */}
          <path
            d="M11 14L15 17.5L11 21"
            stroke="var(--pookie-terminal-prompt)"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <line
            x1="17"
            y1="21"
            x2="23"
            y2="21"
            stroke="var(--pookie-terminal-output)"
            strokeWidth="2"
          />
          {/* Monitor Stand */}
          <path
            d="M14 30L12 35H28L26 30"
            fill="var(--pookie-surface-primary)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="1.8"
          />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`inline-block shrink-0 ${className}`}
        >
          <rect
            x="6"
            y="6"
            width="28"
            height="28"
            rx="3"
            fill="var(--pookie-accent)"
            stroke="var(--pookie-border-outer)"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="8"
            stroke="var(--pookie-accent-contrast)"
            strokeWidth="2.2"
          />
          <line
            x1="20"
            y1="9"
            x2="20"
            y2="19"
            stroke="var(--pookie-accent-contrast)"
            strokeWidth="2.4"
          />
        </svg>
      );
  }
};
