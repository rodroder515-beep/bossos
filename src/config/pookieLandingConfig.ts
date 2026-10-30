import type { MoodId } from '../core/mood';

export type LandingMoodId =
  | 'nineties_nostalgia'
  | 'virtual_consciousness'
  | 'existential_pookie'
  | 'floppy_disk_fever';

export interface MoodPalette {
  primary: string;
  accent: string;
  text: string;
  glow: string;
}

export interface LandingMoodConfig {
  id: LandingMoodId;
  desktopMoodId: MoodId;
  indexLabel: string;
  buttonLabel: string;
  name: string;
  eraSubtitle: string;
  description: string;
  palette: MoodPalette;
  previewVideoPath: string;
  previewLabel: string;
  posterFallbackPath: string;
}

export interface BiosStepKeyframe {
  /** Normalized progress time (0.0 to 1.0 of total fill duration) */
  atProgress: number;
  /** Target discrete block count (out of 22) */
  blocks: number;
  /** Diagnostic status line shown during this burst */
  statusText: string;
}

export const LANDING_MOOD_ORDER: LandingMoodId[] = [
  'nineties_nostalgia',
  'virtual_consciousness',
  'existential_pookie',
  'floppy_disk_fever',
];

export const POOKIE_MOOD_CONFIGS: Record<LandingMoodId, LandingMoodConfig> = {
  nineties_nostalgia: {
    id: 'nineties_nostalgia',
    desktopMoodId: 'corporate',
    indexLabel: '01',
    buttonLabel: '01. PASSIVE-AGGRESSIVE',
    name: 'PASSIVE-AGGRESSIVE',
    eraSubtitle: '90s Nostalgia',
    description:
      'Warm cream stock, dusty cherry chrome, and deep burgundy passive-aggression engineered for zero enterprise synergy.',
    palette: {
      primary: '#F3EDE2',
      accent: '#D98CA3',
      text: '#5A1F27',
      glow: '#E5A4B4',
    },
    previewVideoPath: '/assets/moods/nineties-nostalgia.mp4',
    previewLabel: 'REC ● MOOD_01: PASSIVE-AGGRESSIVE (90s Nostalgia)',
    posterFallbackPath: '/assets/stickers/woodstock_ticket.png',
  },
  virtual_consciousness: {
    id: 'virtual_consciousness',
    desktopMoodId: 'passive_aggressive',
    indexLabel: '02',
    buttonLabel: '02. TOXICALLY POSITIVE',
    name: 'TOXICALLY POSITIVE',
    eraSubtitle: 'Virtual Consciousness',
    description:
      'Pastel pink halftone matrices, icy sky-blue chrome, and weaponized toxic positivity that lowers your difficulty setting automatically.',
    palette: {
      primary: '#F3B8D2',
      accent: '#A7D8F0',
      text: '#1E1A1D',
      glow: '#FF9CEE',
    },
    previewVideoPath: '/assets/moods/virtual-consciousness.mp4',
    previewLabel: 'REC ● MOOD_02: TOXICALLY POSITIVE (Virtual Consciousness)',
    posterFallbackPath: '/assets/stickers/heart_headphones.png',
  },
  existential_pookie: {
    id: 'existential_pookie',
    desktopMoodId: 'existential',
    indexLabel: '03',
    buttonLabel: '03. EXISTENTIALLY UNSTABLE',
    name: 'EXISTENTIALLY UNSTABLE',
    eraSubtitle: 'Existential Blue',
    description:
      'Electric cyan grids, high-contrast warning yellow telemetry, and late-night cosmic dread questioning why pixels obey your cursor.',
    palette: {
      primary: '#00C2D1',
      accent: '#FFD400',
      text: '#111111',
      glow: '#00F0FF',
    },
    previewVideoPath: '/assets/moods/existential-pookie.mp4',
    previewLabel: 'REC ● MOOD_03: EXISTENTIALLY UNSTABLE (Existential Blue)',
    posterFallbackPath: '/assets/stickers/blue_cat_peace.png',
  },
  floppy_disk_fever: {
    id: 'floppy_disk_fever',
    desktopMoodId: 'dank_2016',
    indexLabel: '04',
    buttonLabel: '04. CHAOTICALLY UNHINGED',
    name: 'CHAOTICALLY UNHINGED',
    eraSubtitle: 'Floppy Disk Fever',
    description:
      'Warm archival cream, vermilion red, charcoal ink, and 1.44MB magnetic sector panic where every click is permanently judged.',
    palette: {
      primary: '#EAE1CF',
      accent: '#C9382B',
      text: '#161616',
      glow: '#FF4D38',
    },
    previewVideoPath: '/assets/moods/floppy-disk-fever.mp4',
    previewLabel: 'REC ● MOOD_04: CHAOTICALLY UNHINGED (Floppy Disk Fever)',
    posterFallbackPath: '/assets/stickers/crt_loading.png',
  },
};

export const BIOS_STEP_SCHEDULE: BiosStepKeyframe[] = [
  {
    atProgress: 0.0,
    blocks: 1,
    statusText: 'POST // CHECKING 640K EMOTIONAL RAM...',
  },
  {
    atProgress: 0.14,
    blocks: 3, // ~15%
    statusText: 'MOUNTING USELESS_KERNEL_1.02.SYS...',
  },
  {
    atProgress: 0.34,
    blocks: 8, // ~35%
    statusText: 'CALIBRATING PASSIVE-AGGRESSIVE INTERRUPTS...',
  },
  {
    atProgress: 0.54,
    blocks: 9, // ~40% (intentional BIOS stall before burst)
    statusText: 'VERIFYING ZERO-PRODUCTIVITY COMPLIANCE...',
  },
  {
    atProgress: 0.76,
    blocks: 17, // ~75%
    statusText: 'LOADING CRT PHOSPHOR SHADERS & SARCASM TABLES...',
  },
  {
    atProgress: 0.96,
    blocks: 22, // 100%
    statusText: 'SYSTEM READY // HANDING OFF TO STUDIO VIEWPORT.',
  },
];

export const POOKIE_CONFIG = {
  brand: {
    name: 'POOKIE OS',
    tagline: 'Cute interface. Terrible attitude.',
    logoPath: '/assets/logo-only.png',
    logoOnlyPath: '/assets/logo-only.png',
    combinedLogoPath: '/assets/logo-combined.png',
    hardwareLeftBadge: 'POOKIE OS',
    hardwareRightBadge: 'SUPER_POOKIE // 1.44MB',
    /** Optional path to a custom GLB asset; when null, uses the built-in procedural 1980s Commodore PET-inspired 3D mesh */
    customGlbPath: null as string | null,
  },
  bios: {
    studioLine: 'PookieOS Useless Development Studio, Website',
    kernelLine: 'Kernel Version 1.02 (Emotional Exhaustion Build)',
    copyrightLine:
      'Copyright (c) PookieOS Development Studio AB, 2026. Zero Productivity Guaranteed.',
    totalBlocks: 22,
    fillDurationMs: 2800,
    stageDurationMs: 3200,
    primaryBlue: '#1B1C8F',
    vignetteDarkBlue: '#0B0C48',
    phosphorWhite: '#E2E6FF',
    borderLightBlue: '#D0D6FF',
    stepSchedule: BIOS_STEP_SCHEDULE,
  },
  camera: {
    stage1: {
      position: [0.35, 0.28, 0.92] as [number, number, number],
      lookAt: [0.35, 0.28, 0.0] as [number, number, number],
      fov: 32,
    },
    stage2: {
      position: [-0.55, 0.22, 3.45] as [number, number, number],
      lookAt: [-0.15, 0.08, 0.0] as [number, number, number],
      durationSec: 2.4,
      ease: 'power3.inOut',
      parallaxX: 0.12,
      parallaxY: 0.08,
      uiRevealProgress: 0.7,
    },
    stage3: {
      position: [0.35, 0.28, 0.65] as [number, number, number],
      lookAt: [0.35, 0.28, 0.0] as [number, number, number],
      durationSec: 1.4,
      ease: 'power4.inOut',
      flashTriggerSec: 1.28,
    },
  },
  lighting: {
    voidBackground: '#070709',
    warmKeySpotlight: {
      color: '#FFE6C8',
      intensity: 2.5,
      position: [3.8, 4.2, 3.2] as [number, number, number],
    },
    coolRimLight: {
      color: '#4A7CFF',
      intensity: 1.4,
      position: [-3.6, 2.4, -2.8] as [number, number, number],
    },
    crtPointLightIntensity: 1.85,
    groundSmokeTargetOpacity: 0.18,
  },
  materials: {
    chassisColor: '#D8CFC2',
    chassisRoughness: 0.65,
    chassisMetalness: 0.05,
    bezelColor: '#1E1D1B',
    keycapPrimaryColor: '#2A2927',
    keycapRedAccent: '#B8332A',
    keycapBlueAccent: '#2B5B9E',
  },
  hero: {
    headlineLines: [
      'A Deliberately',
      'Useless Studio,',
      'Plugged into the',
      'Existential Dread',
    ] as const,
    tagline: 'Cute interface. Terrible attitude.',
    launchPrompt: 'Click Monitor or Press [ENTER] to Boot Selected Mood 🖱️',
    skipButtonLabel: '[ SKIP INTRO ⏭ ]',
  },
  navigation: {
    links: [
      { id: 'home', label: 'Home' },
      { id: 'moods', label: 'The 4 Moods' },
      { id: 'specs', label: 'Useless Specs' },
      { id: 'hr', label: 'Complain to HR' },
    ] as const,
    directBootLabel: 'Boot Direct to OS',
  },
  moods: POOKIE_MOOD_CONFIGS,
  moodOrder: LANDING_MOOD_ORDER,
} as const;

export function mapLandingMoodToDesktopMood(mood: LandingMoodId | MoodId): MoodId {
  if (
    mood === 'corporate' ||
    mood === 'passive_aggressive' ||
    mood === 'existential' ||
    mood === 'dank_2016'
  ) {
    return mood;
  }
  return POOKIE_MOOD_CONFIGS[mood]?.desktopMoodId ?? 'corporate';
}

export function mapDesktopMoodToLandingMood(mood: MoodId | LandingMoodId): LandingMoodId {
  if (
    mood === 'nineties_nostalgia' ||
    mood === 'virtual_consciousness' ||
    mood === 'existential_pookie' ||
    mood === 'floppy_disk_fever'
  ) {
    return mood;
  }
  switch (mood) {
    case 'corporate':
      return 'nineties_nostalgia';
    case 'passive_aggressive':
      return 'virtual_consciousness';
    case 'existential':
      return 'existential_pookie';
    case 'dank_2016':
      return 'floppy_disk_fever';
    default:
      return 'nineties_nostalgia';
  }
}

/**
 * Computes discrete BIOS progress blocks (0..22) for a given elapsed time in ms
 * using stepped bursts (no smooth linear interpolation) to match authentic 1990s BIOS POST screens.
 */
export function getBiosBlocksForElapsedMs(
  elapsedMs: number,
  fillDurationMs: number = POOKIE_CONFIG.bios.fillDurationMs
): { blocks: number; statusText: string; isComplete: boolean } {
  const clampedElapsed = Math.max(0, elapsedMs);
  const progress = fillDurationMs <= 0 ? 1 : Math.min(1, clampedElapsed / fillDurationMs);

  let activeBlocks = 0;
  let activeStatus = BIOS_STEP_SCHEDULE[0].statusText;

  for (const step of BIOS_STEP_SCHEDULE) {
    if (progress >= step.atProgress) {
      activeBlocks = step.blocks;
      activeStatus = step.statusText;
    }
  }

  if (progress >= 1) {
    activeBlocks = POOKIE_CONFIG.bios.totalBlocks;
    activeStatus = BIOS_STEP_SCHEDULE[BIOS_STEP_SCHEDULE.length - 1].statusText;
  }

  return {
    blocks: activeBlocks,
    statusText: activeStatus,
    isComplete: activeBlocks >= POOKIE_CONFIG.bios.totalBlocks,
  };
}
