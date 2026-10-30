import React from 'react';
import { Brain, RotateCcw, Sparkles } from 'lucide-react';
import {
  getLine,
  MoodId,
  SessionAction,
  SessionMemoryState,
} from '../core/mood';
import { PookieMotif } from './PookieMotif';
import {
  ArchivalHardwareBadge,
  PixelComputerMascot,
  PixelHourglassIcon,
  PixelWarningIcon,
  RetroMiniWindow,
  RetroToolPalette,
  SegmentedProgressBar,
} from './RetroGraphicLibrary';
import { DesktopStickerCollage, MoodSticker } from './MoodSticker';

interface DesktopWallpaperProps {
  mood: MoodId;
  sessionState: SessionMemoryState;
  onAction: (action: SessionAction) => void;
  children?: React.ReactNode;
}

/**
 * Art-directed desktop wallpaper & right-side focal composition for PookieOS.
 * Establishes three distinct levels of visual hierarchy across all screen sizes:
 * - Primary: Main wallpaper typographic masthead + right-side centerpiece illustration
 * - Secondary: Supporting theme-specific retro micro-window / tool palette
 * - Tertiary: Unboxed technical annotations, die-cut sticker collage, and colophon
 */
export const DesktopWallpaper: React.FC<DesktopWallpaperProps> = ({
  mood,
  sessionState,
  onAction,
  children,
}) => {
  const renderMasthead = () => {
    if (mood === 'corporate') {
      return (
        <div className="border-b border-[#54272B]/60 pb-1.5 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[10px] font-mono tracking-widest text-[#54272B]/80 mb-0.5">
              <span className="font-bold text-[#54272B]">01. OS PERSONALITY</span>
              <span aria-hidden="true">·</span>
              <span>EDITORIAL ARCHIVE</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">300 DPI PROOF</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div className="flex flex-col min-w-0">
                <h1 className="font-display text-2xl sm:text-3xl xl:text-[40px] font-black tracking-tight text-[#54272B] leading-none">
                  PASSIVE-AGGRESSIVE
                </h1>
                <span className="text-xs sm:text-sm font-serif italic text-[#54272B]/85 tracking-wide mt-0.5">
                  90s Nostalgia
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-serif italic text-[#54272B]/85 self-end pb-0.5">
                “Of course you clicked that. I expected nothing less.”
              </p>
            </div>
          </div>
          <MoodSticker
            mood={mood}
            zone="masthead"
            className="shrink-0 mr-1"
          />
        </div>
      );
    }

    if (mood === 'passive_aggressive') {
      return (
        <div className="border-b-2 border-[#302A31] pb-1.5 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold tracking-widest text-[#302A31] mb-0.5">
              <span>02. OS PERSONALITY</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">THEORY OF SIMULATED CONSCIOUSNESS</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <div className="flex flex-col min-w-0">
                <h1 className="font-display text-2xl sm:text-3xl xl:text-[40px] font-black tracking-tight text-[#302A31] leading-none">
                  TOXICALLY POSITIVE
                </h1>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#302A31]/80 tracking-wide mt-0.5">
                  Virtual Consciousness
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono font-bold text-[#302A31] self-end pb-0.5">
                “You’re doing amazing! We lowered our expectations.”
              </p>
            </div>
          </div>
          <MoodSticker
            mood={mood}
            zone="masthead"
            className="shrink-0 mr-1"
          />
        </div>
      );
    }

    if (mood === 'existential') {
      return (
        <div className="border-b-2 border-[#111111] pb-1.5 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[10px] font-mono font-bold tracking-widest text-[#111111] mb-1">
              <span className="px-1.5 py-0.5 bg-[#111111] text-[#F6EFE2]">
                03. OS PERSONALITY
              </span>
              <span className="px-1.5 py-0.5 bg-[#FFD23F] text-[#111111] border border-[#111111]">
                ERR_CODE: 0x00004031
              </span>
              <span className="hidden md:inline">
                ELECTRIC CYAN · WARM IVORY
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <h1 className="font-mono text-xl sm:text-2xl xl:text-[34px] font-black tracking-tight text-[#111111] leading-none">
                  EXISTENTIALLY UNSTABLE
                </h1>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]/85 tracking-wide mt-0.5">
                  Existential Blue
                </span>
              </div>
              <div className="px-2 py-0.5 bg-[#F6EFE2] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] text-[10.5px] sm:text-xs font-mono font-bold text-[#111111]">
                “I thought we were making progress.”
              </div>
            </div>
          </div>
          <MoodSticker
            mood={mood}
            zone="masthead"
            className="shrink-0 mr-1"
          />
        </div>
      );
    }

    // mood === 'dank_2016'
    return (
      <div className="border-b-2 border-[#242322] pb-1.5 flex items-center justify-between gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold tracking-widest text-[#242322] mb-0.5">
            <span className="px-1.5 py-0.2 bg-[#242322] text-[#F2E4C8]">
              04. OS PERSONALITY
            </span>
            <span>DATA ARCHIVE 1989</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">1.44 MB FLOPPY DISK FEVER</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <div className="flex flex-col min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl xl:text-[40px] font-black tracking-tight leading-none text-[#242322]">
                CHAOTICALLY UNHINGED
              </h1>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#242322]/85 tracking-wide mt-0.5">
                Floppy Disk Fever
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-mono font-bold text-[#242322]">
              “The calculator has developed opinions about you.”
            </p>
          </div>
        </div>
        <MoodSticker
          mood={mood}
          zone="masthead"
          className="shrink-0 mr-1"
        />
      </div>
    );
  };

  const renderFocalComposition = () => {
    if (mood === 'corporate') {
      return (
        <>
          {/* Primary Focal Anchor: Vintage Macintosh Editorial Spread + PageMaker Tool Strip */}
          <div className="flex items-start gap-2 min-w-0">
            <div className="hidden sm:block shrink-0">
              <RetroToolPalette
                borderColor="#54272B"
                surfaceBg="#F8F4EC"
                activeBg="#54272B"
                activeText="#F2EBDD"
                swatchPrimary="#D98FA6"
                swatchSecondary="#54272B"
              />
            </div>

            <div className="flex-1 min-w-0 bg-[#F8F4EC] border-2 border-[#54272B] shadow-[4px_4px_0px_#54272B] p-2.5 relative">
              <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-mono text-[#54272B]/80 border-b border-[#54272B]/25 pb-1 mb-1.5">
                <span className="font-bold text-[#54272B]">FIG. 01 · MACINTOSH CLASSIC II</span>
                <span>68030 · 16 MHz · 4 MB SIMM</span>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-2.5">
                {/* Detailed Vintage 1990s Beige CRT Computer & Angled Keyboard */}
                <svg
                  viewBox="0 0 220 195"
                  fill="none"
                  aria-hidden="true"
                  className="w-28 h-24 xl:w-32 xl:h-28 shrink-0"
                >
                  <circle cx="112" cy="95" r="76" fill="#D98FA6" fillOpacity="0.3" />
                  <rect
                    x="38"
                    y="10"
                    width="136"
                    height="114"
                    rx="6"
                    fill="#E3D5BA"
                    stroke="#54272B"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="52"
                    y="22"
                    width="108"
                    height="72"
                    rx="4"
                    fill="#2B1E20"
                    stroke="#54272B"
                    strokeWidth="2"
                  />
                  <text
                    x="106"
                    y="52"
                    textAnchor="middle"
                    fill="#D98FA6"
                    fontSize="11.5"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                  >
                    PookieOS 99
                  </text>
                  <text
                    x="106"
                    y="68"
                    textAnchor="middle"
                    fill="#F2EBDD"
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    STATUS: JUDGING YOU
                  </text>
                  <rect x="114" y="106" width="44" height="5" fill="#54272B" />
                  <rect
                    x="54"
                    y="104"
                    width="12"
                    height="8"
                    fill="#D98FA6"
                    stroke="#54272B"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M50 124H162L170 142H42L50 124Z"
                    fill="#D4C4A5"
                    stroke="#54272B"
                    strokeWidth="2.2"
                  />
                  <polygon
                    points="24,152 184,144 202,180 12,188"
                    fill="#E8DCC4"
                    stroke="#54272B"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="34"
                    y1="160"
                    x2="176"
                    y2="153"
                    stroke="#54272B"
                    strokeWidth="2.2"
                    strokeDasharray="8 3"
                  />
                  <line
                    x1="28"
                    y1="170"
                    x2="182"
                    y2="163"
                    stroke="#54272B"
                    strokeWidth="2.2"
                    strokeDasharray="8 3"
                  />
                  <line
                    x1="22"
                    y1="179"
                    x2="190"
                    y2="172"
                    stroke="#54272B"
                    strokeWidth="2.2"
                    strokeDasharray="12 3"
                  />
                </svg>

                {/* Editorial Serif Column */}
                <div className="space-y-1 text-left text-[#54272B] min-w-0 flex-1">
                  <div className="font-display text-lg xl:text-xl leading-none">
                    Exploring the 90’s{' '}
                    <span className="italic font-normal">Vintage Vibe</span>
                  </div>
                  <p className="text-[10px] leading-snug text-[#54272B]/85">
                    From the tactile clatter of beige mechanical keyboards to 1.44 MB
                    quarterly spreadsheets and polite corporate hostility.
                  </p>
                  <div className="pt-1 flex items-center justify-between gap-2 border-t border-[#54272B]/20 text-[9px] font-mono">
                    <span>FOLIO 04 · GARAMOND</span>
                    <PookieMotif
                      mood={mood}
                      variant="barcode"
                      className="w-16 h-3 text-[#54272B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Supporting Element: MAC_WRITE_99.DOC Proof Window */}
          <div className="sm:pl-6">
            <RetroMiniWindow
              title="MAC_WRITE_99.DOC — PAGE LAYOUT PROOF"
              titleBg="#54272B"
              titleText="#F2EBDD"
              surfaceBg="#FCF9F4"
              borderColor="#54272B"
              shadowColor="rgba(84, 39, 43, 0.55)"
              menuItems={['File', 'Edit', 'Type', 'Utilities']}
            >
              <div className="space-y-1 text-[#54272B]">
                <div className="pookie-ruler-ticks" />
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display italic text-[11px] leading-snug">
                    “Per my previous three carrier pigeons, the Q3 numbers remain 5.”
                  </p>
                  <PookieMotif mood={mood} variant="badge" className="w-5 h-5 shrink-0" />
                </div>
                <SegmentedProgressBar
                  filledBlocks={8}
                  totalBlocks={10}
                  fillColor="#54272B"
                  emptyColor="#F2EBDD"
                  borderColor="#54272B"
                  label="EDITORIAL NOSTALGIA BUFFER"
                />
              </div>
            </RetroMiniWindow>
          </div>

          {/* Tertiary Technical Colophon */}
          <div className="sm:pl-6 flex flex-wrap items-center justify-between gap-1 text-[9px] font-mono text-[#54272B]/75">
            <span>CMYK REGISTRATION · PANTONE 490C</span>
            <span>RAM BUFFER: 0 BYTES PERSISTED</span>
          </div>
        </>
      );
    }

    if (mood === 'passive_aggressive') {
      return (
        <>
          {/* Primary Focal Anchor: "Time To Pick Your Avatar." + Dual Wireframe Globes + Chrome Butterfly */}
          <div className="bg-[#FFF1D6] border-2 border-[#302A31] shadow-[4px_4px_0px_#302A31] p-2.5">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pb-1.5 mb-2 border-b-2 border-[#302A31]">
              <div className="space-y-0.5 text-left min-w-0">
                <div className="text-[9px] font-mono font-bold text-[#302A31]/80">
                  AVATAR_SELECTOR.EXE · Y2K EDITION
                </div>
                <div className="font-display text-lg sm:text-xl font-black tracking-tight text-[#302A31] leading-none">
                  Time To Pick Your Avatar.
                </div>
                <div className="text-[9px] font-mono font-bold text-[#302A31]">
                  THE SIMULATION IS READY TO LAUNCH
                </div>
              </div>

              {/* Dual Wireframe Globes with Orbital Arrows */}
              <svg viewBox="0 0 150 64" fill="none" aria-hidden="true" className="w-24 sm:w-28 h-12 shrink-0">
                <circle cx="40" cy="32" r="22" fill="#F4BBD4" stroke="#302A31" strokeWidth="2" />
                <ellipse cx="40" cy="32" rx="10" ry="22" stroke="#302A31" strokeWidth="1.3" />
                <ellipse cx="40" cy="32" rx="22" ry="9" stroke="#302A31" strokeWidth="1.3" />
                <line x1="18" y1="32" x2="62" y2="32" stroke="#302A31" strokeWidth="1.3" />
                <path
                  d="M14 20C20 6 54 4 66 20"
                  stroke="#302A31"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="108" cy="32" r="22" fill="#A8D8F0" stroke="#302A31" strokeWidth="2" />
                <ellipse cx="108" cy="32" rx="10" ry="22" stroke="#302A31" strokeWidth="1.3" />
                <ellipse cx="108" cy="32" rx="22" ry="9" stroke="#302A31" strokeWidth="1.3" />
                <line x1="86" y1="32" x2="130" y2="32" stroke="#302A31" strokeWidth="1.3" />
                <path
                  d="M82 44C92 58 122 58 134 42"
                  stroke="#302A31"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Halftone CRT Workstation + Liquid Chrome Butterfly & Heart Cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <div className="sm:col-span-7 flex items-center justify-center bg-[#F4BBD4] border-2 border-[#302A31] p-1.5 relative">
                <svg viewBox="0 0 210 130" fill="none" aria-hidden="true" className="w-full h-20">
                  <circle cx="34" cy="24" r="8" fill="#302A31" />
                  <path
                    d="M34 34V62M34 40L16 54M34 40L52 54M34 62L22 86M34 62L46 86"
                    stroke="#302A31"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <rect
                    x="74"
                    y="8"
                    width="122"
                    height="76"
                    rx="5"
                    fill="#302A31"
                    stroke="#302A31"
                    strokeWidth="2"
                  />
                  <rect
                    x="82"
                    y="16"
                    width="106"
                    height="60"
                    fill="#FFF1D6"
                    stroke="#302A31"
                    strokeWidth="1.5"
                  />
                  <circle cx="108" cy="42" r="15" stroke="#302A31" strokeWidth="1.5" />
                  <line x1="93" y1="42" x2="123" y2="42" stroke="#302A31" strokeWidth="1.2" />
                  <line x1="108" y1="27" x2="108" y2="57" stroke="#302A31" strokeWidth="1.2" />
                  <rect x="132" y="28" width="46" height="8" fill="#302A31" />
                  <rect x="132" y="41" width="38" height="6" fill="#A8D8F0" stroke="#302A31" strokeWidth="1" />
                  <rect x="132" y="52" width="46" height="14" fill="#F4BBD4" stroke="#302A31" strokeWidth="1" />
                  <polygon points="64,92 196,92 206,120 54,120" fill="#302A31" />
                  <line
                    x1="72"
                    y1="102"
                    x2="188"
                    y2="102"
                    stroke="#FFF1D6"
                    strokeWidth="3"
                    strokeDasharray="7 3"
                  />
                  <line
                    x1="66"
                    y1="111"
                    x2="194"
                    y2="111"
                    stroke="#FFF1D6"
                    strokeWidth="3"
                    strokeDasharray="10 3"
                  />
                  <ellipse cx="32" cy="106" rx="14" ry="10" fill="#302A31" />
                </svg>
              </div>

              {/* Chrome Butterfly & Heart-Orbit Motif Card */}
              <div className="sm:col-span-5 flex flex-col gap-1.5">
                <div className="bg-[#A8D8F0] border-2 border-[#302A31] p-1.5 flex items-center justify-between">
                  <svg viewBox="0 0 64 52" fill="none" className="w-10 h-8 shrink-0">
                    <defs>
                      <linearGradient id="y2k-bfly" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F4BBD4" />
                        <stop offset="100%" stopColor="#302A31" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M32 18C20 2 4 6 8 22C11 30 22 31 30 31C20 34 12 44 19 49C26 54 31 42 32 34C33 42 38 54 45 49C52 44 44 34 34 31C42 31 53 30 56 22C60 6 44 2 32 18Z"
                      fill="url(#y2k-bfly)"
                      stroke="#302A31"
                      strokeWidth="2.2"
                    />
                  </svg>
                  <div className="text-right font-mono text-[#302A31]">
                    <div className="text-[8.5px] font-bold">CHROME_MOTH</div>
                    <div className="text-[9.5px] font-black">Y2K_GLOSS</div>
                  </div>
                </div>

                <div className="bg-[#302A31] text-[#FFF1D6] p-1.5 font-mono text-[9px] leading-snug">
                  <span className="text-[#A8D8F0] font-bold">REMEMBER:</span> DON’T WASTE YOUR
                  DAYS AGAIN.
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Supporting Element: EMOTIONAL_LABOR.SYS Status Window */}
          <div className="sm:pl-4">
            <RetroMiniWindow
              title="EMOTIONAL_LABOR.SYS — BESTIE MONITOR"
              titleBg="#302A31"
              titleText="#FFF1D6"
              surfaceBg="#FCE4EE"
              borderColor="#302A31"
              shadowColor="#302A31"
            >
              <div className="space-y-1 text-[#302A31]">
                <SegmentedProgressBar
                  filledBlocks={9}
                  totalBlocks={10}
                  fillColor="#302A31"
                  emptyColor="#FFF1D6"
                  borderColor="#302A31"
                  label="ARTIFICIAL FRIENDLINESS LEVEL"
                />
                <div className="flex items-center justify-between gap-2 text-[9px] font-mono font-bold">
                  <span>WE SUPPORT YOUR CHOICES (EVEN THE WRONG ONES)</span>
                  <PookieMotif mood={mood} variant="badge" className="w-4 h-4 shrink-0" />
                </div>
              </div>
            </RetroMiniWindow>
          </div>

          {/* Tertiary Technical Colophon */}
          <div className="sm:pl-4 flex flex-wrap items-center justify-between gap-1 text-[9px] font-mono font-bold text-[#302A31]/80">
            <span>PLAY BY THE RULES · BREAK THE RULES</span>
            <span>PASSIVE TONE: 99.4%</span>
          </div>
        </>
      );
    }

    if (mood === 'existential') {
      return (
        <>
          {/* Row 1: Retro Tool Palette + CREATIVE-PAIN.PSD @ 200% (RGB/8) */}
          <div className="flex items-start gap-2 min-w-0">
            <div className="hidden sm:block shrink-0">
              <RetroToolPalette
                borderColor="#111111"
                surfaceBg="#F6EFE2"
                activeBg="#111111"
                activeText="#F6EFE2"
                swatchPrimary="#00C4D4"
                swatchSecondary="#FFD23F"
              />
            </div>

            <RetroMiniWindow
              title="CREATIVE-PAIN.PSD @ 200% (RGB/8)"
              titleBg="#111111"
              titleText="#F6EFE2"
              surfaceBg="#F6EFE2"
              borderColor="#111111"
              shadowColor="#111111"
              menuItems={['File', 'Edit', 'Image', 'Layer', 'Filter', 'Panic']}
              statusText="DOC: 1.44M / 0B SAVED"
              className="flex-1 min-w-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-6 bg-[#FFFFFF] border-2 border-[#111111] p-1 flex items-center justify-center">
                  <PixelComputerMascot
                    screenBg="#00C4D4"
                    casingColor="#F6EFE2"
                    accentColor="#FFD23F"
                    borderColor="#111111"
                    headline="SYSTEM_PANIC"
                    subline="IDEAS: 0 FOUND"
                    className="w-32 h-24 xl:w-34 xl:h-28"
                  />
                </div>

                <div className="sm:col-span-6 flex flex-col gap-1.5">
                  <div className="bg-[#FFD23F] border-2 border-[#111111] p-1.5 font-mono text-[#111111]">
                    <div className="flex items-center justify-between text-[8.5px] font-bold border-b border-[#111111] pb-0.5 mb-0.5">
                      <span>CREATIVE-WATCH</span>
                      <span>99:59</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PixelHourglassIcon className="w-4 h-4 shrink-0" />
                      <div className="text-[8.5px] font-black leading-tight">
                        DEADLINE: NOW
                        <br />
                        WILLPOWER: 4%
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFFFF] border-2 border-[#111111] font-mono text-[8.5px] text-[#111111]">
                    <div className="px-1.5 py-0.5 border-b border-[#111111] font-bold bg-[#F6EFE2]">
                      LAYERS (3)
                    </div>
                    <div className="px-1.5 py-0.5 border-b border-[#111111] bg-[#00C4D4] font-bold flex items-center justify-between">
                      <span>● Existential_Dread</span>
                      <span>100%</span>
                    </div>
                    <div className="px-1.5 py-0.5 flex items-center justify-between">
                      <span>● Q3_Synergy_Mask</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </RetroMiniWindow>
          </div>

          {/* Row 2: IDEAS_MISSING.EXE + BURNOUT.TXT */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-7">
              <RetroMiniWindow
                title="IDEAS_MISSING.EXE"
                titleBg="#111111"
                titleText="#FFD23F"
                surfaceBg="#F6EFE2"
                borderColor="#111111"
                shadowColor="#111111"
              >
                <div className="space-y-1 text-[#111111]">
                  <div className="flex items-start gap-1.5">
                    <PixelWarningIcon className="w-6 h-6 shrink-0" fill="#FFD23F" />
                    <div className="font-mono text-[9px] leading-tight">
                      <div className="font-black">SERIOUS ERROR: NO_INSPIRATION</div>
                      <div>Brain sector 04 returned 0 usable thoughts.</div>
                    </div>
                  </div>
                  <SegmentedProgressBar
                    filledBlocks={3}
                    totalBlocks={10}
                    fillColor="#111111"
                    emptyColor="#FFFFFF"
                    borderColor="#111111"
                    label="REBOOTING MOTIVATION..."
                  />
                </div>
              </RetroMiniWindow>
            </div>

            <div className="sm:col-span-5">
              <RetroMiniWindow
                title="BURNOUT.TXT"
                titleBg="#111111"
                titleText="#F6EFE2"
                surfaceBg="#FFFFFF"
                borderColor="#111111"
                shadowColor="#111111"
              >
                <div className="space-y-1 font-mono text-[9px] text-[#111111]">
                  <span className="inline-block px-1 py-0.2 bg-[#FF5A52] text-[#111111] border border-[#111111] font-bold text-[8.5px]">
                    PROBLEMS.EXE
                  </span>
                  <div className="font-bold leading-snug">
                    1. 2+2 still equals 5
                    <br />
                    2. Q3_Report is back
                  </div>
                  <div className="pt-0.5 border-t border-[#111111] flex items-center justify-between text-[8px] font-bold">
                    <span>EOF</span>
                    <PookieMotif
                      mood={mood}
                      variant="barcode"
                      className="w-12 h-2.5 text-[#111111]"
                    />
                  </div>
                </div>
              </RetroMiniWindow>
            </div>
          </div>

          {/* Row 3: PANIC.SYS Bar */}
          <div className="bg-[#F6EFE2] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] px-2 py-1 flex flex-wrap items-center justify-between gap-1.5 font-mono text-[9px] font-bold text-[#111111]">
            <span className="px-1.5 py-0.2 bg-[#111111] text-[#FFD23F]">PANIC.SYS</span>
            <span className="flex-1 min-w-0 truncate">
              SOUL_BUFFER: 12% FREE · IRQ CONFLICT IN SECTOR 4031
            </span>
            <span className="px-1.5 py-0.2 bg-[#00C4D4] border border-[#111111] shrink-0">
              OK / CANCEL
            </span>
          </div>
        </>
      );
    }

    // mood === 'dank_2016'
    return (
      <>
        {/* Primary Focal Anchor: 3.5" Floppy Disk on Signal-Red Sun Disc + 1989 Spec Sheet */}
        <div className="bg-[#F7EFE0] border-2 border-[#242322] shadow-[4px_4px_0px_#242322] p-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <svg
              viewBox="0 0 210 185"
              fill="none"
              aria-hidden="true"
              className="w-30 h-26 xl:w-34 xl:h-30 shrink-0"
            >
              <circle cx="105" cy="94" r="74" fill="#B92F25" />
              <line x1="6" y1="112" x2="204" y2="112" stroke="#F7EFE0" strokeWidth="3.5" />
              <line x1="6" y1="123" x2="204" y2="123" stroke="#F7EFE0" strokeWidth="3.5" />
              <line x1="6" y1="134" x2="204" y2="134" stroke="#F7EFE0" strokeWidth="3.5" />

              <rect
                x="38"
                y="16"
                width="134"
                height="146"
                rx="4"
                fill="#242322"
                stroke="#242322"
                strokeWidth="2.5"
              />
              <rect
                x="66"
                y="16"
                width="70"
                height="44"
                fill="#C8BFA8"
                stroke="#242322"
                strokeWidth="2"
              />
              <rect x="112" y="23" width="14" height="30" fill="#242322" />
              <rect
                x="52"
                y="74"
                width="106"
                height="76"
                fill="#F2E4C8"
                stroke="#242322"
                strokeWidth="2"
              />
              <rect x="52" y="74" width="106" height="16" fill="#B92F25" />
              <text
                x="58"
                y="85"
                fill="#F2E4C8"
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                FORMATTED · Q3_ARCHIVE
              </text>
              <line x1="58" y1="102" x2="150" y2="102" stroke="#B92F25" strokeWidth="1.5" />
              <line x1="58" y1="116" x2="150" y2="116" stroke="#B92F25" strokeWidth="1.5" />
              <line x1="58" y1="130" x2="150" y2="130" stroke="#B92F25" strokeWidth="1.5" />
              <text
                x="58"
                y="143"
                fill="#242322"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
              >
                HIGH DENSITY · 1.44 MB
              </text>
            </svg>

            {/* Right Archival Data Table */}
            <div className="w-full flex-1 border-2 border-[#242322] bg-[#F2E4C8] p-2 font-mono text-[#242322]">
              <div className="text-[8.5px] font-bold border-b border-[#242322] pb-0.5">
                データ・アーカイブ · DATA ARCHIVE
              </div>
              <div className="text-xl font-black text-[#B92F25] leading-none py-0.5 border-b border-[#242322]">
                1989
              </div>
              <ul className="py-1 space-y-0.5 text-[9px] font-bold">
                <li>● 720 KB / 1.44 MB</li>
                <li>● SHAREWARE KERNEL</li>
                <li>● BBS NETWORK</li>
                <li>● COPY &amp; SAVE</li>
              </ul>
              <div className="pt-0.5 border-t border-[#242322] flex items-center justify-between text-[8.5px] font-black">
                <span>DOUBLE SIDED</span>
                <span className="px-1 bg-[#D7F65A] border border-[#242322]">135 TPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Supporting Panel: 4 Archival Hardware Stamps + Compatibility Matrix */}
        <div className="bg-[#F7EFE0] border-2 border-[#242322] shadow-[4px_4px_0px_#242322] p-2 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
          <div className="sm:col-span-8 grid grid-cols-4 gap-1 sm:border-r-2 border-[#242322] sm:pr-2">
            <ArchivalHardwareBadge kind="store" labelJp="記憶する" labelEn="STORE" />
            <ArchivalHardwareBadge kind="connect" labelJp="接続する" labelEn="CONNECT" />
            <ArchivalHardwareBadge
              kind="communicate"
              labelJp="通信する"
              labelEn="MODEM"
            />
            <ArchivalHardwareBadge kind="play" labelJp="遊ぶ" labelEn="PLAY" />
          </div>

          <div className="sm:col-span-4 font-mono text-[#242322] text-left space-y-0.5 sm:pl-1">
            <div className="text-[8px] font-bold border-b border-[#242322] pb-0.5">
              互換性 / COMPATIBLE
            </div>
            <div className="text-[9px] font-black leading-tight">
              DOS · WIN 2.0
              <br />
              MACINTOSH
              <br />
              AMIGA · POOKIE
            </div>
            <div className="text-[8px] font-bold text-[#B92F25]">
              THE FUTURE IS ON DISK.
            </div>
          </div>
        </div>

        {/* Tertiary Unboxed Technical Label & Barcode */}
        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#242322]">
          <span>SECTOR 04 · WRITE-PROTECT: LOCKED</span>
          <PookieMotif mood={mood} variant="barcode" className="w-18 h-3 text-[#242322]" />
        </div>
      </>
    );
  };

  const renderBottomColophon = () => {
    if (mood === 'corporate') {
      return (
        <>
          <div className="max-w-[392px] flex items-center justify-between text-[9.5px] font-mono text-[#54272B]/80 border-b border-[#54272B]/25 pb-0.5">
            <span className="font-serif italic text-[11px] text-[#54272B] truncate">
              “Simplicity, serif typography, and 1.44 MB of corporate dread.”
            </span>
            <span className="shrink-0 ml-2">FIG. 02</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-mono text-[#54272B]/75 border-t border-[#54272B]/40 pt-0.5">
            <span>NINETIES NOSTALGIA · EDITORIAL DESKTOP ENVIRONMENT</span>
            <span className="hidden sm:inline">
              WARM CREAM #F2EBDD · DUSTY CHERRY #D98FA6 · DEEP BURGUNDY #54272B
            </span>
          </div>
        </>
      );
    }

    if (mood === 'passive_aggressive') {
      return (
        <>
          <div className="max-w-[392px] flex items-center justify-between text-[9.5px] font-mono font-bold text-[#302A31] border-b border-[#302A31]/40 pb-0.5">
            <span className="truncate">✦ Y2K SIMULATION NODE · CHROME_HEART_ORBIT</span>
            <span className="shrink-0 ml-2">☺ 100%</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-mono font-bold text-[#302A31] border-t-2 border-[#302A31] pt-0.5">
            <span>VIRTUAL CONSCIOUSNESS · Y2K DESKTOP SIMULATION</span>
            <span className="hidden sm:inline">
              POWDER PINK #F4BBD4 · INK BLACK #302A31 · ICY BLUE #A8D8F0
            </span>
          </div>
        </>
      );
    }

    if (mood === 'existential') {
      return (
        <>
          <div className="max-w-[540px] bg-[#F6EFE2] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] px-2 py-0.5 flex flex-wrap items-center justify-between gap-1.5 text-[9px] font-mono font-bold text-[#111111]">
            <span className="min-w-0 flex-1 truncate">
              ▲ KERNEL ALERT: All open windows &amp; fake proofs update live via
              LINES[app][mood].
            </span>
            <span className="px-1.5 py-0.2 bg-[#FFD23F] border border-[#111111] shrink-0">
              OFFLINE_MODE: LOCKED
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-mono font-bold text-[#111111] border-t-2 border-[#111111] pt-0.5">
            <span>
              THEME 03 // CYBER BLUE · CREATIVE-PAIN.PSD · IDEAS_MISSING.EXE · BURNOUT.TXT
            </span>
            <span className="hidden sm:inline">
              ELECTRIC CYAN #00C4D4 · DEEP BLACK #111111 · WARM IVORY #F6EFE2
            </span>
          </div>
        </>
      );
    }

    // mood === 'dank_2016'
    return (
      <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-mono font-bold text-[#242322] border-t-2 border-[#242322] pt-0.5">
        <span>STORE · CONNECT · COMMUNICATE · THE FUTURE IS ON DISK</span>
        <span className="hidden sm:inline">
          ARCHIVE CREAM #F2E4C8 · SIGNAL RED #B92F25 · ACID LIME #D7F65A
        </span>
      </div>
    );
  };

  return (
    <div className="relative flex-1 w-full min-h-0 z-0 flex flex-col justify-between gap-3 p-2.5 sm:p-4 lg:pt-2 lg:pb-1.5 lg:pl-24 xl:pl-28 lg:pr-4 xl:pr-5 lg:h-full lg:overflow-hidden">
      {/* 1. Primary Mood Masthead (Top-Left on Desktop, Top on Mobile/Tablet) */}
      <div className="pointer-events-none select-none w-full lg:max-w-[calc(100%-370px)] xl:max-w-[calc(100%-445px)] shrink-0">
        {renderMasthead()}
      </div>

      {/* 2. Interactive Session Memory Telemetry Plaque (Top-Right on Desktop, 2nd on Mobile/Tablet) */}
      <aside
        aria-label="Desktop Session Memory Telemetry"
        className="pointer-events-auto w-full lg:w-[354px] xl:w-[430px] lg:absolute lg:top-2 lg:right-4 xl:right-5 z-20 rounded pookie-window-frame overflow-hidden shrink-0"
      >
        <div className="pookie-titlebar-active flex items-center justify-between gap-2 px-3 py-1 text-[11px] font-mono font-bold border-b border-[var(--pookie-border-outer)]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Brain className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{getLine('shell', mood, 'sessionBannerPrefix')}</span>
          </div>
          <span data-testid="active-theme-name" className="shrink-0">
            Theme: {getLine('shell', mood, 'themeBadge')}
          </span>
        </div>

        <div className="p-2 space-y-1.5 text-xs bg-[var(--pookie-surface-primary)]">
          <p
            data-testid="session-memory-callout"
            className="font-mono text-[10.5px] sm:text-[11px] font-semibold leading-snug px-2 py-1 rounded border border-[var(--pookie-warning-border)] bg-[var(--pookie-warning-bg)] text-[var(--pookie-warning-text)]"
          >
            {sessionState.latestCallout}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <button
              type="button"
              onClick={() => onAction({ type: 'SIMULATE_DEMO_4031' })}
              className="pookie-btn-accent flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="truncate">{getLine('shell', mood, 'demoPresetBtn')}</span>
            </button>

            <button
              type="button"
              onClick={() => onAction({ type: 'RESET_SESSION' })}
              className="pookie-btn-base inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3 h-3 shrink-0" />
              <span>{getLine('shell', mood, 'resetSessionBtn')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Interactive Desktop Shortcuts + Application Windows ({children}) */}
      <div className="w-full lg:absolute lg:inset-0 z-10 lg:pointer-events-none min-w-0">
        {children}
      </div>

      {/* 4. Right-Side Mood Focal Composition (Right column on Desktop, below windows on Mobile/Tablet) */}
      <div className="pointer-events-none select-none w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto lg:mt-6 xl:mt-8 lg:mb-auto lg:w-[354px] xl:w-[430px] flex flex-col gap-1.5 relative shrink-0">
        {renderFocalComposition()}
      </div>

      {/* 5. Bottom Die-Cut Sticker Collage + Mood Colophon */}
      <div className="pointer-events-none select-none w-full space-y-1 shrink-0 mt-auto">
        <DesktopStickerCollage mood={mood} />
        {renderBottomColophon()}
      </div>
    </div>
  );
};
