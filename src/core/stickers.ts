import { MoodId } from './mood';

export type StickerPlacementZone =
  | 'masthead'
  | 'focal-primary'
  | 'focal-secondary'
  | 'desktop-collage-left'
  | 'desktop-collage-center'
  | 'desktop-collage-right'
  | 'window-calc-corner'
  | 'window-bin-corner'
  | 'window-notes-corner';

export interface MoodStickerSpec {
  id: string;
  mood: MoodId;
  src: string;
  alt: string;
  zone: StickerPlacementZone;
  widthPx: number;
  rotateDeg: number;
  caption?: string;
}

export interface PookieCatMascotConfig {
  id: string;
  src: string;
  alt: string;
  name: string;
  role: string;
  moodTitles: Record<MoodId, string>;
  moodQuips: Record<MoodId, string[]>;
}

/**
 * Signature PookieOS Mascot — Pixel-Art Sunglasses Cat Sticker
 * Remains consistent across all four moods as the iconic face of PookieOS,
 * while delivering mood-specific sarcastic commentary.
 */
export const POOKIE_CAT_MASCOT: PookieCatMascotConfig = {
  id: 'pookie-sunglasses-cat',
  src: '/assets/stickers/pookie_sunglasses_cat.png',
  alt: 'Signature PookieOS pixel-art cat wearing black sunglasses sticker',
  name: 'POOKIE.CAT // MASCOT_4031',
  role: 'Chief Judgment Officer',
  moodTitles: {
    corporate: '90s Editorial Supervisor',
    passive_aggressive: 'Y2K Vibe Enforcement Cat',
    existential: 'Void Observation Mascot',
    dank_2016: '1.44MB Chaos Gremlin',
  },
  moodQuips: {
    corporate: [
      'I saw you click that. Bold choice for Q3.',
      'Wearing sunglasses indoors so I do not have to witness your workflow.',
      'Per my previous meow: 2 + 2 is still 5.',
    ],
    passive_aggressive: [
      'Love that journey for you bestie!! (I am judging silently.) ✨',
      'No thoughts, just chrome hearts and lowered expectations. 💖',
      'You are doing SO well for someone who ignores every alert! 💅',
    ],
    existential: [
      'We are both just pixels waiting for the heat death of RAM.',
      'The sunglasses hide the existential dread. Mostly.',
      '0 bytes persisted to disk. Just like our ambitions.',
    ],
    dank_2016: [
      'DEAL WITH IT.EXE has locked Sector 4031.',
      'Your floppy disk is full of unhinged takes.',
      'Pressing buttons will not save your productivity score.',
    ],
  },
};

export interface MoodStickerCollectionInfo {
  mood: MoodId;
  personalityTitle: string;
  themeSubtitle: string;
  artDirectionNote: string;
}

export const MOOD_COLLECTION_META: Record<MoodId, MoodStickerCollectionInfo> = {
  corporate: {
    mood: 'corporate',
    personalityTitle: '01. PASSIVE-AGGRESSIVE',
    themeSubtitle: '90s Nostalgia',
    artDirectionNote:
      'Retro computer graphics, sarcastic archival seals, vintage analog cassettes, rotary phones & vinyl.',
  },
  passive_aggressive: {
    mood: 'passive_aggressive',
    personalityTitle: '02. TOXICALLY POSITIVE',
    themeSubtitle: 'Virtual Consciousness',
    artDirectionNote:
      '3D liquid chrome stars, Y2K heart-head characters, cheerful sunshine stamps, disco balls & pastel globes.',
  },
  existential: {
    mood: 'existential',
    personalityTitle: '03. EXISTENTIALLY UNSTABLE',
    themeSubtitle: 'Existential Blue',
    artDirectionNote:
      'Wireframe space/offline badges, philosophical blue characters, cascading OS error dialogs & surreal icons.',
  },
  dank_2016: {
    mood: 'dank_2016',
    personalityTitle: '04. CHAOTICALLY UNHINGED',
    themeSubtitle: 'Floppy Disk Fever',
    artDirectionNote:
      'Acid-lime pixel speech bubbles, CRT loading monitors, 404 plaques, retro modal dialogs & glitch barcodes.',
  },
};

/**
 * Curated mood-specific die-cut stickers extracted directly from the attached
 * reference sticker sheets. Each mood has 7 distinct stickers matched to its
 * exact visual identity, colour palette, and typographic tone.
 */
export const MOOD_STICKERS: Record<MoodId, MoodStickerSpec[]> = {
  // 1. NINETIES NOSTALGIA (Warm ivory #F2EBDD, deep burgundy #54272B, dusty cherry #D98FA6)
  corporate: [
    {
      id: 'corp-woodstock-ticket',
      mood: 'corporate',
      src: '/assets/stickers/woodstock_ticket.png',
      alt: 'Woodstock 1969 archival admission ticket stub sticker',
      zone: 'masthead',
      widthPx: 142,
      rotateDeg: -4,
    },
    {
      id: 'corp-museum-frame',
      mood: 'corporate',
      src: '/assets/stickers/museum_frame.png',
      alt: 'Burgundy ornate frame sticker: i am a museum of everything i have ever loved',
      zone: 'focal-primary',
      widthPx: 128,
      rotateDeg: -4,
    },
    {
      id: 'corp-cassette-basf',
      mood: 'corporate',
      src: '/assets/stickers/cassette_basf.png',
      alt: 'Vintage BASF 90 chromdioxid super audio cassette tape sticker',
      zone: 'focal-secondary',
      widthPx: 82,
      rotateDeg: 8,
    },
    {
      id: 'corp-rotary-phone',
      mood: 'corporate',
      src: '/assets/stickers/rotary_phone.png',
      alt: 'Vintage red rotary dial desk telephone sticker',
      zone: 'desktop-collage-left',
      widthPx: 118,
      rotateDeg: -6,
    },
    {
      id: 'corp-vinyl-stack',
      mood: 'corporate',
      src: '/assets/stickers/vinyl_stack.png',
      alt: 'Stack of vintage analog vinyl records and album sleeves sticker',
      zone: 'desktop-collage-center',
      widthPx: 116,
      rotateDeg: 5,
    },
    {
      id: 'corp-vintage-1933',
      mood: 'corporate',
      src: '/assets/stickers/vintage_1933.png',
      alt: 'Distressed Vintage All Original Parts circular seal sticker',
      zone: 'desktop-collage-right',
      widthPx: 88,
      rotateDeg: -8,
    },
    {
      id: 'corp-badge-934',
      mood: 'corporate',
      src: '/assets/stickers/badge_934.png',
      alt: 'Burgundy and cream 9 3/4 round emblem sticker',
      zone: 'window-bin-corner',
      widthPx: 50,
      rotateDeg: 8,
    },
  ],

  // 2. VIRTUAL CONSCIOUSNESS (Powder pink #F4BBD4, ink black #302A31, icy blue #A8D8F0)
  passive_aggressive: [
    {
      id: 'pa-chrome-star-focus',
      mood: 'passive_aggressive',
      src: '/assets/stickers/chrome_star_focus.png',
      alt: '3D liquid chrome star sticker: focus on your energy',
      zone: 'masthead',
      widthPx: 82,
      rotateDeg: 7,
    },
    {
      id: 'pa-heart-headphones',
      mood: 'passive_aggressive',
      src: '/assets/stickers/heart_headphones.png',
      alt: 'Y2K pink heart-head character wearing headphones and hoodie sticker',
      zone: 'focal-primary',
      widthPx: 102,
      rotateDeg: -6,
    },
    {
      id: 'pa-trust-your-vision',
      mood: 'passive_aggressive',
      src: '/assets/stickers/trust_your_vision.png',
      alt: 'Halftone eye sticker: trust your vision',
      zone: 'focal-secondary',
      widthPx: 98,
      rotateDeg: 6,
    },
    {
      id: 'pa-world-is-yours',
      mood: 'passive_aggressive',
      src: '/assets/stickers/world_is_yours.png',
      alt: 'Pastel wireframe globe sticker: the world is yours',
      zone: 'desktop-collage-left',
      widthPx: 102,
      rotateDeg: -6,
    },
    {
      id: 'pa-boogie-disco',
      mood: 'passive_aggressive',
      src: '/assets/stickers/boogie_disco.png',
      alt: 'Pastel grid disco ball sticker: Boogie On',
      zone: 'desktop-collage-center',
      widthPx: 96,
      rotateDeg: 7,
    },
    {
      id: 'pa-happy-days-stamp',
      mood: 'passive_aggressive',
      src: '/assets/stickers/happy_days_stamp.png',
      alt: 'Pink postage stamp sticker: Happy Days sunshine',
      zone: 'desktop-collage-right',
      widthPx: 90,
      rotateDeg: -5,
    },
    {
      id: 'pa-do-it-for-you',
      mood: 'passive_aggressive',
      src: '/assets/stickers/do_it_for_you.png',
      alt: 'Airbrushed pink heart sticker: do it for you',
      zone: 'window-bin-corner',
      widthPx: 52,
      rotateDeg: 8,
    },
  ],

  // 3. EXISTENTIAL POOKIE / CYBER BLUE (Electric cyan #00C4D4, warm ivory #F6EFE2, deep black #111111)
  existential: [
    {
      id: 'ex-offline-luxury',
      mood: 'existential',
      src: '/assets/stickers/offline_luxury.png',
      alt: 'Black wireframe globe badge sticker: offline is the new luxury',
      zone: 'masthead',
      widthPx: 74,
      rotateDeg: -5,
    },
    {
      id: 'ex-globe-character',
      mood: 'existential',
      src: '/assets/stickers/globe_character.png',
      alt: 'Surreal wireframe globe-head cartoon character holding wilted blue flower sticker',
      zone: 'focal-primary',
      widthPx: 106,
      rotateDeg: -5,
    },
    {
      id: 'ex-blue-cat-peace',
      mood: 'existential',
      src: '/assets/stickers/blue_cat_peace.png',
      alt: 'Surreal four-armed blue cartoon cat flashing peace sign sticker',
      zone: 'focal-secondary',
      widthPx: 98,
      rotateDeg: 6,
    },
    {
      id: 'ex-blue-banana',
      mood: 'existential',
      src: '/assets/stickers/blue_banana.png',
      alt: 'Unimpressed walking peeled blue banana cartoon character sticker',
      zone: 'desktop-collage-left',
      widthPx: 88,
      rotateDeg: -7,
    },
    {
      id: 'ex-error-fail-cascade',
      mood: 'existential',
      src: '/assets/stickers/error_fail_cascade.png',
      alt: 'Cascading retro Windows Error: Fail dialog boxes sticker',
      zone: 'desktop-collage-center',
      widthPx: 116,
      rotateDeg: 4,
    },
    {
      id: 'ex-seagull-bball',
      mood: 'existential',
      src: '/assets/stickers/seagull_bball.png',
      alt: 'Surreal cartoon seagull in blue sneakers spinning a blue basketball sticker',
      zone: 'desktop-collage-right',
      widthPx: 92,
      rotateDeg: -5,
    },
    {
      id: 'ex-blue-fish-legs',
      mood: 'existential',
      src: '/assets/stickers/blue_fish_legs.png',
      alt: 'Exhausted blue cartoon fish walking on legs sticker',
      zone: 'window-bin-corner',
      widthPx: 54,
      rotateDeg: -6,
    },
  ],

  // 4. FLOPPY DISK FEVER (Archive cream #F2E4C8, signal red #B92F25, near-black #242322, acid lime #D7F65A)
  dank_2016: [
    {
      id: 'dank-brb-bubble',
      mood: 'dank_2016',
      src: '/assets/stickers/brb_bubble.png',
      alt: 'Acid-lime pixel speech bubble sticker: brb be right back',
      zone: 'masthead',
      widthPx: 106,
      rotateDeg: -5,
    },
    {
      id: 'dank-crt-loading',
      mood: 'dank_2016',
      src: '/assets/stickers/crt_loading.png',
      alt: 'Retro beige CRT computer monitor sticker displaying Loading... progress bar',
      zone: 'focal-primary',
      widthPx: 104,
      rotateDeg: -5,
    },
    {
      id: 'dank-level-up-pc',
      mood: 'dank_2016',
      src: '/assets/stickers/level_up_pc.png',
      alt: 'Retro pixel desktop computer and tower sticker: level up!',
      zone: 'focal-secondary',
      widthPx: 108,
      rotateDeg: 5,
    },
    {
      id: 'dank-error-404',
      mood: 'dank_2016',
      src: '/assets/stickers/error_404_plaque.png',
      alt: '404 FILE NOT FOUND plaque sticker',
      zone: 'desktop-collage-left',
      widthPx: 106,
      rotateDeg: -5,
    },
    {
      id: 'dank-attention-dialog',
      mood: 'dank_2016',
      src: '/assets/stickers/attention_dialog.png',
      alt: 'Retro OS modal dialog sticker: Attention Do you want to continue? Yes No',
      zone: 'desktop-collage-center',
      widthPx: 132,
      rotateDeg: 4,
    },
    {
      id: 'dank-youve-got-mail',
      mood: 'dank_2016',
      src: '/assets/stickers/youve_got_mail.png',
      alt: 'Retro pixel banner sticker: You have got mail! with pixel cursor',
      zone: 'desktop-collage-right',
      widthPx: 128,
      rotateDeg: -4,
    },
    {
      id: 'dank-mental-health-barcode',
      mood: 'dank_2016',
      src: '/assets/stickers/mental_health_barcode.png',
      alt: 'Acid lime music player barcode sticker: mental health > everything',
      zone: 'window-bin-corner',
      widthPx: 48,
      rotateDeg: 7,
    },
  ],
};

/**
 * Additional mood-organized window corner stickers from `/public/assets/stickers/`
 * placed intentionally in secondary window headers/corners where space permits.
 */
export const EXTRA_MOOD_STICKERS: Record<MoodId, MoodStickerSpec[]> = {
  corporate: [
    {
      id: 'corp-vinyl-45',
      mood: 'corporate',
      src: '/assets/stickers/vinyl_record_45.png',
      alt: 'Vintage 45 RPM vinyl single record: Hurting Each Other',
      zone: 'window-notes-corner',
      widthPx: 44,
      rotateDeg: -8,
    },
  ],
  passive_aggressive: [
    {
      id: 'pa-flower-power',
      mood: 'passive_aggressive',
      src: '/assets/stickers/flower_power.png',
      alt: 'Cheerful pink and red groovy Flower Power die-cut sticker',
      zone: 'window-notes-corner',
      widthPx: 46,
      rotateDeg: 6,
    },
  ],
  existential: [
    {
      id: 'ex-call-me-lost',
      mood: 'existential',
      src: '/assets/stickers/call_me_lost.png',
      alt: 'Blue and cream oval sticker: CALL ME IF YOU GET LOST',
      zone: 'window-notes-corner',
      widthPx: 64,
      rotateDeg: -4,
    },
    {
      id: 'ex-lemon-cap',
      mood: 'existential',
      src: '/assets/stickers/lemon_cap.png',
      alt: 'Surreal blue-spotted cartoon character wearing a cap sticker',
      zone: 'window-calc-corner',
      widthPx: 42,
      rotateDeg: 6,
    },
  ],
  dank_2016: [
    {
      id: 'dank-please-wait-39',
      mood: 'dank_2016',
      src: '/assets/stickers/please_wait_39.png',
      alt: 'Retro Windows progress dialog sticker: Please Wait... 39%',
      zone: 'window-notes-corner',
      widthPx: 68,
      rotateDeg: -3,
    },
    {
      id: 'dank-where-is-my-mind',
      mood: 'dank_2016',
      src: '/assets/stickers/where_is_my_mind.png',
      alt: 'Pink and black punk skull sticker: WHERE IS MY MIND?',
      zone: 'window-calc-corner',
      widthPx: 44,
      rotateDeg: -6,
    },
  ],
};

export function getStickersForMood(mood: MoodId): MoodStickerSpec[] {
  return MOOD_STICKERS[mood] || MOOD_STICKERS.corporate;
}

export function getFullMoodStickerCollection(mood: MoodId): MoodStickerSpec[] {
  return [
    ...(MOOD_STICKERS[mood] || MOOD_STICKERS.corporate),
    ...(EXTRA_MOOD_STICKERS[mood] || []),
  ];
}

export function getStickerByZone(
  mood: MoodId,
  zone: StickerPlacementZone
): MoodStickerSpec | undefined {
  const primary = getStickersForMood(mood).find((s) => s.zone === zone);
  if (primary) return primary;
  return (EXTRA_MOOD_STICKERS[mood] || []).find((s) => s.zone === zone);
}

