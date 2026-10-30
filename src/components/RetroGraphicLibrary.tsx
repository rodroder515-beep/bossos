import React from 'react';

/**
 * Reusable Retro Graphic Element Library for PookieOS.
 * Provides 100% offline vector & CSS building blocks for the four mood universes:
 * - Layered retro software mini-windows with thick borders & hard offset shadows
 * - Vintage 1990s 2-column bitmap tool palettes (MacPaint / Photoshop 99 style)
 * - Segmented block progress bars & fake system indicators
 * - Pixel-art computer mascots, cursors, hourglasses, and warning symbols
 * - Archival hardware icons (Floppy, CRT PC, Modem, Joystick)
 */

interface RetroMiniWindowProps {
  title: string;
  titleBg?: string;
  titleText?: string;
  surfaceBg?: string;
  borderColor?: string;
  shadowColor?: string;
  menuItems?: string[];
  statusText?: string;
  className?: string;
  children: React.ReactNode;
}

export const RetroMiniWindow: React.FC<RetroMiniWindowProps> = ({
  title,
  titleBg = '#111111',
  titleText = '#F6EFE2',
  surfaceBg = '#F6EFE2',
  borderColor = '#111111',
  shadowColor = '#111111',
  menuItems,
  statusText,
  className = '',
  children,
}) => {
  return (
    <div
      style={{
        backgroundColor: surfaceBg,
        borderColor,
        boxShadow: `5px 5px 0px ${shadowColor}`,
      }}
      className={`border-2 flex flex-col overflow-hidden ${className}`}
    >
      {/* Retro Title Bar with Horizontal Hatch Lines & Pixel Controls */}
      <div
        style={{ backgroundColor: titleBg, color: titleText, borderColor }}
        className="flex items-center justify-between gap-2 px-2 py-1 border-b-2 text-[10px] font-mono font-bold tracking-wider uppercase"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            style={{ borderColor: titleText }}
            className="inline-block w-2.5 h-2.5 border shrink-0"
          />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span
            style={{
              backgroundColor: surfaceBg,
              color: borderColor,
              borderColor: titleText,
            }}
            className="w-3.5 h-3.5 border inline-flex items-center justify-center text-[9px] leading-none font-black"
          >
            _
          </span>
          <span
            style={{
              backgroundColor: surfaceBg,
              color: borderColor,
              borderColor: titleText,
            }}
            className="w-3.5 h-3.5 border inline-flex items-center justify-center text-[9px] leading-none font-black"
          >
            ×
          </span>
        </div>
      </div>

      {/* Optional Retro Menu Strip */}
      {menuItems && menuItems.length > 0 && (
        <div
          style={{ borderColor }}
          className="flex items-center gap-3 px-2 py-0.5 border-b text-[9.5px] font-mono font-semibold"
        >
          {menuItems.map((item, idx) => (
            <span key={item} className={idx === 0 ? 'underline' : ''}>
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Window Content */}
      <div className="p-2 flex-1">{children}</div>

      {/* Optional Bottom Micro-Status Bar */}
      {statusText && (
        <div
          style={{ borderColor }}
          className="px-2 py-0.5 border-t text-[9px] font-mono flex items-center justify-between opacity-85"
        >
          <span>{statusText}</span>
          <span>MEM:640K</span>
        </div>
      )}
    </div>
  );
};

interface RetroToolPaletteProps {
  borderColor?: string;
  surfaceBg?: string;
  activeBg?: string;
  activeText?: string;
  swatchPrimary?: string;
  swatchSecondary?: string;
  className?: string;
}

export const RetroToolPalette: React.FC<RetroToolPaletteProps> = ({
  borderColor = '#111111',
  surfaceBg = '#F6EFE2',
  activeBg = '#111111',
  activeText = '#F6EFE2',
  swatchPrimary = '#00C4D4',
  swatchSecondary = '#FFD23F',
  className = '',
}) => {
  const tools = [
    { id: 'marquee', symbol: '⬚' },
    { id: 'move', symbol: '✥' },
    { id: 'pencil', symbol: '✎', active: true },
    { id: 'brush', symbol: '✒' },
    { id: 'bucket', symbol: '◈' },
    { id: 'eraser', symbol: '▣' },
    { id: 'type', symbol: 'T' },
    { id: 'zoom', symbol: '⊕' },
  ];

  return (
    <div
      style={{
        backgroundColor: surfaceBg,
        borderColor,
        boxShadow: `3px 3px 0px ${borderColor}`,
      }}
      className={`border-2 p-1 flex flex-col gap-1 w-14 shrink-0 ${className}`}
    >
      <div
        style={{ backgroundColor: borderColor, color: surfaceBg }}
        className="text-[8px] font-mono font-bold text-center py-0.5 tracking-widest"
      >
        TOOLS
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {tools.map((t) => (
          <div
            key={t.id}
            style={{
              backgroundColor: t.active ? activeBg : surfaceBg,
              color: t.active ? activeText : borderColor,
              borderColor,
            }}
            className="h-5 border flex items-center justify-center text-[10px] font-mono font-bold"
          >
            {t.symbol}
          </div>
        ))}
      </div>
      {/* Overlapping Foreground / Background Color Swatches */}
      <div
        style={{ borderColor }}
        className="mt-0.5 pt-1 border-t relative h-8 flex items-center justify-center"
      >
        <span
          style={{ backgroundColor: swatchSecondary, borderColor }}
          className="w-4 h-4 border-2 absolute right-2 bottom-1"
        />
        <span
          style={{ backgroundColor: swatchPrimary, borderColor }}
          className="w-4 h-4 border-2 absolute left-2 top-1.5"
        />
      </div>
    </div>
  );
};

interface SegmentedProgressBarProps {
  filledBlocks?: number;
  totalBlocks?: number;
  fillColor?: string;
  emptyColor?: string;
  borderColor?: string;
  label?: string;
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  filledBlocks = 7,
  totalBlocks = 10,
  fillColor = '#111111',
  emptyColor = '#FFFFFF',
  borderColor = '#111111',
  label,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-[9.5px] font-mono font-bold">
          <span>{label}</span>
          <span>{Math.round((filledBlocks / totalBlocks) * 100)}%</span>
        </div>
      )}
      <div
        style={{ borderColor, backgroundColor: emptyColor }}
        className="border-2 p-0.5 grid grid-cols-10 gap-0.5 h-4"
      >
        {Array.from({ length: totalBlocks }).map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: idx < filledBlocks ? fillColor : 'transparent',
            }}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Pixel-Art / Vector Retro Computer Mascot for Cyber Blue & Nineties Nostalgia
 */
export const PixelComputerMascot: React.FC<{
  screenBg?: string;
  screenFgColor?: string;
  casingColor?: string;
  accentColor?: string;
  bannerTextColor?: string;
  borderColor?: string;
  shadowColor?: string;
  headline?: string;
  subline?: string;
  className?: string;
}> = ({
  screenBg = '#00C4D4',
  screenFgColor,
  casingColor = '#F6EFE2',
  accentColor = '#FFD23F',
  bannerTextColor,
  borderColor = '#111111',
  shadowColor,
  headline = 'FATAL_VIBES',
  subline = 'ERR_4031: NO_IDEAS',
  className = 'w-44 h-40',
}) => {
  const fg = screenFgColor ?? borderColor;
  const pillText = bannerTextColor ?? borderColor;
  const dropShadow = shadowColor ?? borderColor;

  return (
    <svg
      viewBox="0 0 200 176"
      fill="none"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      {/* Hard Offset Shadow for Monitor */}
      <rect x="34" y="14" width="138" height="110" fill={dropShadow} />
      {/* Monitor Outer Casing */}
      <rect
        x="28"
        y="8"
        width="138"
        height="110"
        fill={casingColor}
        stroke={borderColor}
        strokeWidth="3"
      />
      {/* Monitor Inner Bevel */}
      <rect
        x="38"
        y="18"
        width="118"
        height="74"
        fill={screenBg}
        stroke={borderColor}
        strokeWidth="2.5"
      />
      {/* Pixelated Sad / Overwhelmed Computer Face on Screen */}
      {/* Left Eye (X) */}
      <path d="M62 36L72 46M72 36L62 46" stroke={fg} strokeWidth="3" strokeLinecap="square" />
      {/* Right Eye (X) */}
      <path d="M122 36L132 46M132 36L122 46" stroke={fg} strokeWidth="3" strokeLinecap="square" />
      {/* Wavy Pixel Mouth */}
      <path
        d="M68 62H82V58H112V62H126"
        stroke={fg}
        strokeWidth="3"
        strokeLinecap="square"
      />
      {/* Screen Banner Pill */}
      <rect
        x="48"
        y="70"
        width="98"
        height="15"
        fill={accentColor}
        stroke={fg}
        strokeWidth="1.8"
      />
      <text
        x="97"
        y="80.5"
        textAnchor="middle"
        fill={pillText}
        fontSize="8.5"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {headline}
      </text>

      {/* Floppy Slot & Power LED on Monitor Chin */}
      <rect x="106" y="102" width="46" height="6" fill={ dropShadow } />
      <rect
        x="40"
        y="100"
        width="12"
        height="9"
        fill={accentColor}
        stroke={dropShadow}
        strokeWidth="2"
      />
      <text
        x="58"
        y="107.5"
        fill={dropShadow}
        fontSize="7.5"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {subline}
      </text>

      {/* Monitor Neck */}
      <rect
        x="64"
        y="118"
        width="66"
        height="12"
        fill={casingColor}
        stroke={borderColor}
        strokeWidth="2.5"
      />

      {/* Angled Chunky Mechanical Keyboard with Hard Shadow */}
      <polygon points="24,136 178,136 190,168 12,168" fill={dropShadow} />
      <polygon
        points="20,130 174,130 186,162 8,162"
        fill={casingColor}
        stroke={borderColor}
        strokeWidth="3"
      />
      {/* Keyboard Keycap Grid */}
      <line
        x1="28"
        y1="140"
        x2="166"
        y2="140"
        stroke={dropShadow}
        strokeWidth="3"
        strokeDasharray="9 4"
      />
      <line
        x1="24"
        y1="148"
        x2="170"
        y2="148"
        stroke={dropShadow}
        strokeWidth="3"
        strokeDasharray="9 4"
      />
      <line
        x1="20"
        y1="155"
        x2="174"
        y2="155"
        stroke={dropShadow}
        strokeWidth="3"
        strokeDasharray="16 4"
      />

      {/* Decorative Pixel Sparkles */}
      <path d="M12 28H20M16 24V32" stroke={fg} strokeWidth="2.5" />
      <path d="M178 44H188M183 39V49" stroke={fg} strokeWidth="2.5" />
    </svg>
  );
};

/**
 * Classic Neo-Brutalist Pixel Warning Triangle & Hourglass Icons (Reference Group C)
 */
export const PixelWarningIcon: React.FC<{ className?: string; fill?: string }> = ({
  className = 'w-8 h-8',
  fill = '#FFD23F',
}) => (
  <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
    <polygon points="20,5 35,33 5,33" fill="#111111" />
    <polygon
      points="18,3 33,31 3,31"
      fill={fill}
      stroke="#111111"
      strokeWidth="2.5"
    />
    <rect x="16.5" y="12" width="3" height="10" fill="#111111" />
    <rect x="16.5" y="24.5" width="3" height="3" fill="#111111" />
  </svg>
);

export const PixelHourglassIcon: React.FC<{
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}> = ({
  className = 'w-7 h-7',
  strokeColor = '#111111',
  fillColor = '#F6EFE2',
}) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
    <rect x="6" y="4" width="20" height="3" fill={strokeColor} />
    <rect x="6" y="25" width="20" height="3" fill={strokeColor} />
    <path
      d="M9 7V12L14 16L9 20V25H23V20L18 16L23 12V7H9Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
    />
    <polygon points="12,11 20,11 16,15" fill={strokeColor} />
    <polygon points="11,23 21,23 16,18" fill={strokeColor} />
  </svg>
);

/**
 * 4 Archival Hardware Circular Stamps for Mood 4 (Floppy Disk Fever — Reference D bottom row)
 */
export const ArchivalHardwareBadge: React.FC<{
  kind: 'store' | 'connect' | 'communicate' | 'play';
  labelJp: string;
  labelEn: string;
}> = ({ kind, labelJp, labelEn }) => (
  <div className="flex flex-col items-center text-center gap-1">
    <svg viewBox="0 0 56 56" fill="none" aria-hidden="true" className="w-12 h-12">
      <circle cx="28" cy="28" r="24" fill="#B92F25" stroke="#242322" strokeWidth="2" />
      {kind === 'store' && (
        <>
          <rect
            x="15"
            y="14"
            width="26"
            height="28"
            fill="#242322"
            stroke="#F2E4C8"
            strokeWidth="1.5"
          />
          <rect x="20" y="14" width="14" height="9" fill="#F2E4C8" />
          <rect x="18" y="27" width="20" height="12" fill="#F2E4C8" />
        </>
      )}
      {kind === 'connect' && (
        <>
          <rect
            x="14"
            y="14"
            width="28"
            height="20"
            rx="2"
            fill="#F2E4C8"
            stroke="#242322"
            strokeWidth="2"
          />
          <rect x="18" y="17" width="20" height="13" fill="#242322" />
          <polygon
            points="12,36 44,36 47,42 9,42"
            fill="#F2E4C8"
            stroke="#242322"
            strokeWidth="1.8"
          />
        </>
      )}
      {kind === 'communicate' && (
        <>
          <rect
            x="11"
            y="24"
            width="34"
            height="14"
            fill="#242322"
            stroke="#F2E4C8"
            strokeWidth="1.8"
          />
          <circle cx="17" cy="31" r="2" fill="#D7F65A" />
          <circle cx="23" cy="31" r="2" fill="#D7F65A" />
          <circle cx="29" cy="31" r="2" fill="#F2E4C8" />
          <line x1="38" y1="12" x2="38" y2="24" stroke="#242322" strokeWidth="2.5" />
          <circle cx="38" cy="12" r="2.5" fill="#242322" />
        </>
      )}
      {kind === 'play' && (
        <>
          <rect
            x="14"
            y="33"
            width="28"
            height="10"
            fill="#242322"
            stroke="#F2E4C8"
            strokeWidth="1.8"
          />
          <line x1="28" y1="18" x2="28" y2="33" stroke="#242322" strokeWidth="4" />
          <circle
            cx="28"
            cy="15"
            r="6"
            fill="#242322"
            stroke="#F2E4C8"
            strokeWidth="1.8"
          />
          <rect x="18" y="30" width="6" height="3" fill="#B92F25" />
        </>
      )}
    </svg>
    <div className="leading-none">
      <div className="text-[9px] font-mono font-bold text-[#242322]">{labelJp}</div>
      <div className="text-[9.5px] font-mono font-black tracking-wider text-[#242322]">
        {labelEn}
      </div>
    </div>
  </div>
);
