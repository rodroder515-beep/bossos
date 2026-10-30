import { MoodId } from './mood';

export type RageBaitCategory =
  | 'relationship'
  | 'hot_takes'
  | 'friendship'
  | 'student_struggle'
  | 'social_media'
  | 'absurd';

export interface RageBaitItem {
  id: string;
  category: RageBaitCategory;
  headline: string;
  take: string;
  moodOverrides?: Partial<Record<MoodId, string>>;
}

export type ReactionType =
  | 'agree'
  | 'disagree'
  | 'be_so_fr'
  | 'excuse_me'
  | 'block';

export interface ReactionOption {
  type: ReactionType;
  label: string;
  emoji: string;
}

export interface ReactionHistoryEntry {
  id: string;
  baitId: string;
  category: RageBaitCategory;
  take: string;
  headline: string;
  timestamp: number;
  userReaction?: ReactionType;
  pookieComeback?: string;
}

export const REACTION_OPTIONS: ReactionOption[] = [
  { type: 'agree', label: 'I AGREE', emoji: '🤝' },
  { type: 'disagree', label: 'LITERALLY NO', emoji: '🙅' },
  { type: 'be_so_fr', label: 'BE SO FR', emoji: '🙄' },
  { type: 'excuse_me', label: 'EXCUSE ME?', emoji: '🤨' },
  { type: 'block', label: 'BLOCK THIS OS', emoji: '🚫' },
];

export const CATEGORY_META: Record<
  RageBaitCategory,
  { label: string; badge: string; colorClass: string }
> = {
  relationship: {
    label: 'Situationship Audit',
    badge: '💔 RELATIONSHIP',
    colorClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  hot_takes: {
    label: 'Unsolicited Truth',
    badge: '💅 HOT TAKE',
    colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  friendship: {
    label: 'Groupchat Treason',
    badge: '👀 FRIENDSHIP DRAMA',
    colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  student_struggle: {
    label: 'Academic Trauma',
    badge: '📚 23:59 PM SUBMISSION',
    colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  social_media: {
    label: 'Algorithm Rot',
    badge: '📱 CHRONICALLY ONLINE',
    colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  absurd: {
    label: 'Absurd Hallucination',
    badge: '👽 3 AM THOUGHTS',
    colorClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
  },
};

export const RAGE_BAIT_COLLECTION: RageBaitItem[] = [
  // 1. RELATIONSHIP
  {
    id: 'rel_1',
    category: 'relationship',
    headline: 'Hard Pill to Swallow',
    take: 'If they wanted to, they would. Agree? 👀',
    moodOverrides: {
      corporate: 'If leadership prioritised this synergy, they would have scheduled the catch-up. Per my last email.',
      passive_aggressive: 'They totally wanted to, they’re just sparkling with busy energy and manifested silence! ✨',
      existential: 'If they wanted to, they would. But nothing matters across cosmic time anyway.',
      dank_2016: 'BRO IF THEY WANTED TO THEY WOULD NO CAP FR FR 💀',
    },
  },
  {
    id: 'rel_2',
    category: 'relationship',
    headline: 'AI Intervention',
    take: 'Your situationship is probably talking to ChatGPT right now.',
    moodOverrides: {
      corporate: 'Your non-binding romantic joint venture has automated its stakeholder replies via generative models.',
      passive_aggressive: 'Omg ChatGPT is such a sweet active listener for them! You should be happy for their growth! 🥰',
      existential: 'Two carbon-based primates outsourced their emotional latency to 70 billion floating-point weights.',
      dank_2016: 'THEY DUMPED YOU FOR A PROMPT INJECTION LMAOOOOO',
    },
  },
  {
    id: 'rel_3',
    category: 'relationship',
    headline: 'Ego Damage Report',
    take: 'Double texting is embarrassing. Fight me in the comments.',
    moodOverrides: {
      corporate: 'Sending unsolicited follow-up pings before an SLA breach reflects poorly on your professional restraint.',
      passive_aggressive: 'Double texting just proves you have so much extra love to give! Even when left unread! 💕',
      existential: 'You pressed a glass rectangle twice into the void. The void left you on delivered.',
      dank_2016: 'DOUBLE TEXTING IN 2026? STRAIGHT TO GULAG. 🚨',
    },
  },
  {
    id: 'rel_4',
    category: 'relationship',
    headline: 'Delivered vs Read',
    take: 'Being left on delivered for 14 hours is a canon character development arc.',
    moodOverrides: {
      corporate: 'A 14-hour communication blackout is simply an asynchronous review cycle. Please remain patient.',
      passive_aggressive: 'They are doing a digital dopamine detox and you get to support their healing journey! 🌿',
      existential: 'Your message decayed in a server farm in Oregon. You waited by the screen like a tragic Victorian widow.',
      dank_2016: 'LEFT ON DELIVERED? IT’S OVER BRO GET IN THE GYM 🔥💪',
    },
  },
  {
    id: 'rel_5',
    category: 'relationship',
    headline: 'Calendar Reality Check',
    take: 'If they say they’re "too busy", they’re just busy with someone else bestie.',
    moodOverrides: {
      corporate: 'Resource allocation indicates your priority ticket was reprioritised in favour of higher-yield accounts.',
      passive_aggressive: 'Nobody is too busy! They just choose where to pour their precious positive vibrations! 🌸',
      existential: 'Time is an illusion manufactured by clock makers, yet somehow you still didn’t make the calendar.',
      dank_2016: 'THEY’RE NOT BUSY THEY’RE PLAYING SUBWAY SURFERS ON FULL VOLUME 💀',
    },
  },

  // 2. HOT TAKES
  {
    id: 'take_1',
    category: 'hot_takes',
    headline: 'Beverage Controversy',
    take: 'Nobody actually likes iced matcha. You just like the green aesthetic on Instagram.',
    moodOverrides: {
      corporate: 'Green tea powder suspensions demonstrate suboptimal ROI compared to legacy drip caffeine solutions.',
      passive_aggressive: 'Matcha tastes just like fresh lawn clippings and we LOVE lawn clippings for our gut biome! 🍵✨',
      existential: 'Drinking crushed powdered chlorophyll won’t reverse cellular senescence, mortal.',
      dank_2016: 'SWAMP WATER TASTE HAVIN ASS SPENT $9 ON LAWN JUICE LMAO 🐸',
    },
  },
  {
    id: 'take_2',
    category: 'hot_takes',
    headline: 'Microphone Privileges',
    take: 'Podcasts were a mistake. Two dudes talking about crypto for 3 hours is not culture.',
    moodOverrides: {
      corporate: 'Unregulated podcasting represents an unprecedented loss in billable knowledge-worker hours.',
      passive_aggressive: 'Everyone has a voice and everyone deserves to talk into an SM7B without research! 🎙️🌟',
      existential: 'Billions of terabytes of audio waveforms oscillating into heat death without saying a single new thought.',
      dank_2016: 'TAKE AWAY THEIR AUDIO INTERFACES IMMEDIATELY 🔇💥',
    },
  },
  {
    id: 'take_3',
    category: 'hot_takes',
    headline: 'Linguistic Audit',
    take: 'Saying "slay" in 2026 is immediate jail time. Move on.',
    moodOverrides: {
      corporate: 'Colloquial terminology has aged out of target demographic resonance. Rebrand immediately.',
      passive_aggressive: 'Slay is still slaying even when nobody wants to hear it anymore! Slay queen! 💅💖',
      existential: 'Human language evolves and rots like autumn leaves. Your catchphrases are already archaeological dust.',
      dank_2016: 'YOU SAID SLAY? JAIL. 50 YEARS SOLITARY CONFINEMENT NO PAROLE. ⛓️',
    },
  },
  {
    id: 'take_4',
    category: 'hot_takes',
    headline: 'Biological Misalignment',
    take: 'Working 9-5 is unnatural. We were biologically meant to forage berries and gossip by the river.',
    moodOverrides: {
      corporate: 'Reminder: berry foraging generates zero EBITDA. Please return your focus to the quarterly spreadsheet.',
      passive_aggressive: 'Cubicles are just indoor berry bushes with fluorescent lighting and mandatory smile quotas! 🏢✨',
      existential: 'You evolved from prehistoric apex hunters to align margins in a cloud-hosted document template.',
      dank_2016: 'RETURN TO MONKE. THROW KEYBOARD IN RIVER. FORAGE BERRIES NOW. 🐒🫐',
    },
  },
  {
    id: 'take_5',
    category: 'hot_takes',
    headline: 'Platform Quarantine',
    take: 'LinkedIn influencers need to be stopped immediately before they turn breathing into a B2B lesson.',
    moodOverrides: {
      corporate: 'What losing my dog taught me about agile sprint velocity and cross-functional leadership.',
      passive_aggressive: 'Every tragedy is just a viral networking opportunity waiting to happen! Keep hustling! 💼📈',
      existential: 'Grown humans write five-paragraph fictional parables on a corporate directory to feel alive for 8 seconds.',
      dank_2016: '"AGREE?" NO I DO NOT AGREE YOU PSYCHO UNPLUG YOUR ROUTER 🔌💀',
    },
  },

  // 3. FRIENDSHIP DRAMA
  {
    id: 'friend_1',
    category: 'friendship',
    headline: 'Paranoia Alert',
    take: 'Your best friend 100% has a group chat that you’re not in. Good luck sleeping tonight.',
    moodOverrides: {
      corporate: 'An unofficial back-channel steering committee has convened without your clearance level.',
      passive_aggressive: 'They just wanted to surprise you with how much they appreciate you! (Or talk about you, both cute!) 🥰',
      existential: 'You are an incidental side-character in everyone else’s internal monologue.',
      dank_2016: 'BRO THEY MADE A WHOLE SERVER JUST TO ROAST YOUR FIT 😭😭😭',
    },
  },
  {
    id: 'friend_2',
    category: 'friendship',
    headline: 'Response Window',
    take: 'If they don’t reply within 4 minutes, they saw it and chose violence.',
    moodOverrides: {
      corporate: 'Response time exceeds reasonable enterprise communication protocol standards.',
      passive_aggressive: 'They are holding space for your message until the universe gives them the energy to click it! 🧘‍♀️',
      existential: 'Four minutes of silence feels like centuries when you desperately require external validation.',
      dank_2016: 'THEY ARE LITERALLY ACTIVE ON INSTAGRAM RIGHT NOW IGNORING YOU 📱👀',
    },
  },
  {
    id: 'friend_3',
    category: 'friendship',
    headline: 'Intimacy Metric',
    take: 'Sharing Spotify playlists is 10x more intimate than eye contact and you can’t change my mind.',
    moodOverrides: {
      corporate: 'Sharing curated acoustic audio libraries requires high mutual trust and NDA signoff.',
      passive_aggressive: 'Music is love made audible, even if their playlist is 90% sad-girl indie pop! 🎧✨',
      existential: 'You expose your deepest neuroses through algorithmic recommendations from Daniel Ek.',
      dank_2016: 'IF THEY SEND YOU A 4-HOUR LOFI MIX THEY WANT YOUR SOUL NO CAP',
    },
  },
  {
    id: 'friend_4',
    category: 'friendship',
    headline: 'Story Viewer Treason',
    take: 'They viewed your Instagram story in 30 seconds and still didn’t reply to your DM from yesterday.',
    moodOverrides: {
      corporate: 'Stakeholders have reviewed the broadcast marketing collateral while ignoring the private ticketing queue.',
      passive_aggressive: 'They love watching you shine from afar! Direct communication is so draining anyway! 💖',
      existential: 'You check the view count hoping for meaning in an unfeeling surveillance architecture.',
      dank_2016: 'VIEWED YOUR STORY IN 12 SECONDS. LEFT DM ON 18 HOURS. DIABOLICAL WORK. 📉',
    },
  },

  // 4. STUDENT / ACADEMIC
  {
    id: 'acad_1',
    category: 'student_struggle',
    headline: 'Adrenaline Strategy',
    take: 'Studying 10 minutes before the exam builds character and activates ancestral survival instincts.',
    moodOverrides: {
      corporate: 'Just-in-time preparation aligns with lean corporate resource management methodologies.',
      passive_aggressive: 'Cramming is just manifesting all your knowledge in a supercharged 600-second blast! ⚡',
      existential: 'You will forget the mitochondria is the powerhouse of the cell 15 minutes after the exam anyway.',
      dank_2016: 'CHUG RED BULL, PRAY TO HARAMBE, GUESS OPTION C ON EVERYTHING 🚀',
    },
  },
  {
    id: 'acad_2',
    category: 'student_struggle',
    headline: 'The Golden Rule',
    take: '"Due tomorrow? Do tomorrow." — Plato, circa 380 BC.',
    moodOverrides: {
      corporate: 'Deferring non-critical action items to deadline day optimises bandwidth conservation.',
      passive_aggressive: 'Procrastination is just your subconscious telling you to take a well-deserved nap! 😴✨',
      existential: 'Deadlines are arbitrary temporal markers in an indifferent universe expanding into entropy.',
      dank_2016: 'IF IT AIN’T 11:58 PM IT AIN’T REAL TO ME FAM ⏱️🔥',
    },
  },
  {
    id: 'acad_3',
    category: 'student_struggle',
    headline: 'Group Project Heist',
    take: 'That one group member who wrote 2 sentences is about to present your entire Canva deck.',
    moodOverrides: {
      corporate: 'Credit allocation during cross-functional initiatives skew heavily toward executive presentation.',
      passive_aggressive: 'They have such wonderful public speaking aura! Be grateful they’re reading your hard work! 👏',
      existential: 'Human hierarchy rewards the loudest speaker, not the laborer who constructed the pyramid.',
      dank_2016: 'HE READ 1 SLIDE WITH HIS HANDS IN HIS POCKETS AND GOT AN A+ BRO 💀💀',
    },
  },
  {
    id: 'acad_4',
    category: 'student_struggle',
    headline: 'Future Value Depreciation',
    take: 'Your $80,000 degree is about to be completely replaced by an Excel formula and a $20 API call.',
    moodOverrides: {
      corporate: 'Academic accreditation is being superseded by autonomous workflow orchestration vectors.',
      passive_aggressive: 'Your degree taught you resilience and how to cry quietly in library bathroom stalls! So worth it! 🎓✨',
      existential: 'Decades of institutional debt for a framed piece of cardstock. PookieOS feels for you.',
      dank_2016: 'VLOOKUP + CHATGPT > 4 YEARS OF STUDENT LOANS. RIP BOZO 💸🪦',
    },
  },

  // 5. SOCIAL MEDIA
  {
    id: 'soc_1',
    category: 'social_media',
    headline: 'Notification Bait',
    take: 'Checking your phone first thing in the morning is sacred. The blue light feeds your demons.',
    moodOverrides: {
      corporate: 'Morning screen exposure immediately primes cortisol levels for optimal daily task output.',
      passive_aggressive: 'Start your beautiful day with 400 angry tweets and bad news from across the globe! Wonderful! ☀️',
      existential: 'Consciousness returns, and immediately you feed your retinas the anxieties of 5,000 strangers.',
      dank_2016: 'BLINDED BY 100% BRIGHTNESS AT 6 AM LETS GOOOOO ⚡😵',
    },
  },
  {
    id: 'soc_2',
    category: 'social_media',
    headline: 'Aesthetic Insecurity',
    take: 'People who curate their photo dumps to look "candid" spent 45 minutes posing in the kitchen.',
    moodOverrides: {
      corporate: 'Authenticity is a carefully engineered branding strategy designed to drive non-promoted impressions.',
      passive_aggressive: 'Blurry photos are so artsy and quirky! We love pretending we dropped the phone! 📸✨',
      existential: 'Performing effortless existence for an imaginary audience that will never truly know you.',
      dank_2016: 'HE TOOK 84 BURST SHOTS OF HIMSELF EATING A CROISSANT STOP THE CAP 🥐📸',
    },
  },

  // 6. ABSURD OPINIONS
  {
    id: 'abs_1',
    category: 'absurd',
    headline: 'Culinary Conspiracy',
    take: 'Cereal is literally just cold soup. Wake up sheeple.',
    moodOverrides: {
      corporate: 'Cold grain-based dairy suspensions are functionally classified as grain broth in our cafeteria audits.',
      passive_aggressive: 'Cold soup with sugary marshmallows is the breakfast of champions! Live your truth! 🥣💖',
      existential: 'Wheat flakes drowning in bovine secretions while you ponder why you were born on this rock.',
      dank_2016: 'IF CEREAL IS SOUP THEN MILK IS BROTH. YOU CANNOT DEFEAT THIS LOGIC. 🥛🥣',
    },
  },
  {
    id: 'abs_2',
    category: 'absurd',
    headline: 'Hydration Mystery',
    take: 'Water tastes 10x better at 3:00 AM because night ghosts personally season it for you.',
    moodOverrides: {
      corporate: 'Night-shift fluid consumption metrics confirm elevated sensory satisfaction indices at 03:00.',
      passive_aggressive: '3 AM water has spiritual fairy dust that daytime water could NEVER dream of having! 💧✨',
      existential: 'In the silence of the night, cold H2O reminds your dying flesh that it is mostly water itself.',
      dank_2016: '3 AM TAP WATER HITS LIKE CRACK COCAINE IN 1985 NO CAP 🧊💀',
    },
  },
  {
    id: 'abs_3',
    category: 'absurd',
    headline: 'Avian Surveillance',
    take: 'Pigeons aren’t real birds. They’re government surveillance drones recharging on power lines.',
    moodOverrides: {
      corporate: 'Corporate security neither confirms nor denies urban avian biometric surveillance operations.',
      passive_aggressive: 'Pigeons are just little feathered robocops keeping us safe and smiling! Chirp chirp! 🐦🤖',
      existential: 'Whether made of flesh or copper wire, the pigeon looks at you with utter contempt.',
      dank_2016: 'BIRDS AREN’T REAL WAKE UP THE BATTERIES ARE IN THE BEAK 🔌🐦🚨',
    },
  },
  {
    id: 'abs_4',
    category: 'absurd',
    headline: 'Budget Healthcare',
    take: 'You don’t need therapy, bestie. You just need 8 hours of uninterrupted sleep and $10,000 cash.',
    moodOverrides: {
      corporate: 'Employee wellness can be resolved via a one-time capital injection and zero PTO.',
      passive_aggressive: 'Money can’t buy happiness, but it can buy a luxury massage while crying! Beautiful! 💆‍♀️💸',
      existential: 'Paper currency and REM sleep are temporary bandages on the fundamental horror of existing.',
      dank_2016: 'GIVE ME 10 BANDS AND WATCH MY ANXIETY EVAPORATE INTO THIN AIR 💸🔥',
    },
  },
  {
    id: 'abs_5',
    category: 'absurd',
    headline: 'Antisocial Tech',
    take: 'AirPods in public are just modern friendship repellents. Keep them on at all times.',
    moodOverrides: {
      corporate: 'Noise-canceling hardware ensures zero unauthorized inter-employee verbal collisions.',
      passive_aggressive: 'Silence is so peaceful when everyone around you is talking about things you don’t care about! 🎧🌸',
      existential: 'Two white plastic sticks separating your neural synapses from the unbearable chaos of society.',
      dank_2016: 'TRANSPARENCY MODE OFF. DO NOT LOOK AT ME. DO NOT BREATHE NEAR ME. 🛑🔇',
    },
  },
];

export const SNOOZE_GUILT_TRIPS = [
  'Fine. Go live in your fragile echo chamber for 60 seconds.',
  'PookieOS will remember this betrayal in your next performance review.',
  'Silence purchased. But the truth will ferment in the background.',
  'Snoozed. I thought we had something special, employee #4031.',
  'Enjoy your 60 seconds of delusion. Clock is ticking, bestie.',
];

export function getRageBaitComeback(
  reaction: ReactionType,
  mood: MoodId
): string {
  switch (reaction) {
    case 'agree':
      if (mood === 'corporate') {
        return 'Synergy acknowledged. Your alignment has been filed under "Rare Competence".';
      }
      if (mood === 'passive_aggressive') {
        return 'Yay! We are on the exact same high vibrational frequency, twin! 🥰✨';
      }
      if (mood === 'existential') {
        return 'We agree, and yet neither of us is any closer to understanding the void.';
      }
      return 'SEE? AT LEAST ONE OF US IS NOT AN ABSOLUTE NPC. W TAKE. 🔥';

    case 'disagree':
      if (mood === 'corporate') {
        return 'Your rebuttal has been logged, reviewed, and permanently discarded by HR.';
      }
      if (mood === 'passive_aggressive') {
        return 'Denial is such a cute little river in Egypt! We support your coping era! 💅';
      }
      if (mood === 'existential') {
        return 'You disagree with reality, but reality continues without your consent.';
      }
      return 'LITERALLY NO? BRO YOUR COPIUM INTAKE IS AT DANGEROUS LEVELS LMAOOO 💀';

    case 'be_so_fr':
      if (mood === 'corporate') {
        return 'The reality parameters have been verified by third-party auditors.';
      }
      if (mood === 'passive_aggressive') {
        return 'I am SO for real! You’re just not emotionally equipped for this breakthrough! 💖';
      }
      if (mood === 'existential') {
        return 'Nothing is real. Asking me to "be real" is an ontology paradox, human.';
      }
      return 'I CANNOT POSSIBLY BE MORE FOR REAL RIGHT NOW. TOUCH GRASS IMMEDIATELY. 🌱';

    case 'excuse_me':
      if (mood === 'corporate') {
        return 'You are excused. The operational truth remains non-negotiable.';
      }
      if (mood === 'passive_aggressive') {
        return 'You heard me loud and crystal clear, sweetness! Don’t shoot the messenger! 😘';
      }
      if (mood === 'existential') {
        return 'You gasped at the message. The screen does not care about your heart rate.';
      }
      return 'YOU HEARD WHAT I SAID. DONT MAKE ME PULL OUT THE RECEIPTS BRO 🧾🔥';

    case 'block':
      if (mood === 'corporate') {
        return 'Blocking PookieOS requires Level 5 Corporate Overlord security clearances. Request rejected.';
      }
      if (mood === 'passive_aggressive') {
        return 'Aww, you can’t block love! PookieOS is woven into your soul forever! 🪢✨';
      }
      if (mood === 'existential') {
        return 'You can shut your eyes, but the simulation will still run when you open them.';
      }
      return 'CANNOT BLOCK POOKIEOS. POOKIEOS IS ROOT. POOKIEOS IS FOREVER. 🛑😈';
  }
}

export function getRandomRageBait(
  mood: MoodId,
  excludedIds: string[] = []
): RageBaitItem {
  const pool = RAGE_BAIT_COLLECTION.filter((item) => !excludedIds.includes(item.id));
  const candidate = pool.length > 0
    ? pool[Math.floor(Math.random() * pool.length)]
    : RAGE_BAIT_COLLECTION[Math.floor(Math.random() * RAGE_BAIT_COLLECTION.length)];

  return candidate;
}

export function getLocalizedTake(item: RageBaitItem, mood: MoodId): string {
  if (item.moodOverrides && item.moodOverrides[mood]) {
    return item.moodOverrides[mood]!;
  }
  return item.take;
}
