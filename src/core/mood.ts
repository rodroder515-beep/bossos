/**
 * Member 4: Mood Engine, LINES[app][mood] Dictionary, Session Memory & HR Report
 * All applications draw their visible text from LINES[app][mood] on every render
 * so switching Mood rewrites the entire desktop live without hardcoded strings.
 */

export type MoodId = 'corporate' | 'passive_aggressive' | 'dank_2016' | 'existential';

export type AppId =
  | 'shell'
  | 'calc'
  | 'notes'
  | 'bin'
  | 'terminal'
  | 'shutdown'
  | 'blueprint';

export interface MoodMeta {
  id: MoodId;
  label: string;
  shortName: string;
  eraTag: string;
  borderNote: string;
}

export const MOODS: MoodMeta[] = [
  {
    id: 'corporate',
    label: 'PASSIVE-AGGRESSIVE',
    shortName: '90s Nostalgia',
    eraTag: '90s Nostalgia',
    borderNote: 'Warm ivory paper, deep burgundy headings & dusty cherry accents',
  },
  {
    id: 'passive_aggressive',
    label: 'TOXICALLY POSITIVE',
    shortName: 'Virtual Consciousness',
    eraTag: 'Virtual Consciousness',
    borderNote: 'Powder pink halftone, crisp ink-black borders & icy blue accents',
  },
  {
    id: 'existential',
    label: 'EXISTENTIALLY UNSTABLE',
    shortName: 'Existential Blue',
    eraTag: 'Existential Blue',
    borderNote: 'Electric cyan #00C4D4, warm ivory #F6EFE2, deep black #111111 & warning yellow #FFD23F',
  },
  {
    id: 'dank_2016',
    label: 'CHAOTICALLY UNHINGED',
    shortName: 'Floppy Disk Fever',
    eraTag: 'Floppy Disk Fever',
    borderNote: 'Archive cream, signal red, near-black & static acid lime accents',
  },
];

export const LINES: Record<AppId, Record<MoodId, Record<string, string>>> = {
  shell: {
    corporate: {
      brandTitle: 'PookieOS — Cute interface. Terrible attitude.',
      themeBadge: 'PASSIVE-AGGRESSIVE (90s Nostalgia)',
      moodSelectorLabel: 'Active Mood',
      sessionBannerPrefix: 'Nostalgia Log:',
      defaultMemoryPrompt: 'Oh, you opened that again. Interesting decision.',
      demoPresetBtn: 'Simulate Employee #4,031 Demo',
      resetSessionBtn: 'Reset Counters',
      shutdownBtn: 'Shutdown & HR Review',
      navCalculator: 'Calculator',
      navNotepad: 'Notepad',
      navRecycleBin: 'Recycle Bin',
      navTerminal: 'Terminal',
      navBlueprint: '4-Person Split & Offline JS',
      ruleBadgeOffline: '100% Offline Ready',
      ruleBadgeMemory: 'RAM-Only Notepad',
      ruleBadgeBorder: 'Static Non-Flashing Borders',
      taskbarHint: 'All open windows rewrite live from LINES[app][mood]',
    },
    passive_aggressive: {
      brandTitle: 'PookieOS — Cute interface. Terrible attitude.',
      themeBadge: 'TOXICALLY POSITIVE (Virtual Consciousness)',
      moodSelectorLabel: 'Supportive Vibe',
      sessionBannerPrefix: 'Bestie Check-In:',
      defaultMemoryPrompt:
        "You're literally doing amazing. We have lowered the difficulty accordingly.",
      demoPresetBtn: 'Simulate Employee #4,031 Demo',
      resetSessionBtn: 'Fresh Start!',
      shutdownBtn: 'Shutdown & Exit Review',
      navCalculator: 'Calculator',
      navNotepad: 'Notepad',
      navRecycleBin: 'Recycle Bin',
      navTerminal: 'Terminal',
      navBlueprint: '4-Person Split & Offline JS',
      ruleBadgeOffline: 'Offline Compliant',
      ruleBadgeMemory: 'Zero Data Saved',
      ruleBadgeBorder: 'Safe Static Borders',
      taskbarHint: 'Just a gentle reminder that all window strings update via LINES[app][mood]',
    },
    dank_2016: {
      brandTitle: 'PookieOS — Floppy Disk Fever (1.44 MB Edition)',
      themeBadge: 'CHAOTICALLY UNHINGED (Floppy Disk Fever)',
      moodSelectorLabel: 'Chaos Sector',
      sessionBannerPrefix: 'Archive 1989 Alert:',
      defaultMemoryPrompt: 'CRITICAL UPDATE: The floppy disk remembers everything.',
      demoPresetBtn: 'Simulate Employee #4,031 Demo',
      resetSessionBtn: 'Reformat Counters',
      shutdownBtn: 'Shutdown & HR Roast',
      navCalculator: 'Calculator',
      navNotepad: 'Notepad',
      navRecycleBin: 'Recycle Bin',
      navTerminal: 'Terminal',
      navBlueprint: '4-Person Split & Offline JS',
      ruleBadgeOffline: 'Airgapped Offline',
      ruleBadgeMemory: 'RAM-Only No Cap',
      ruleBadgeBorder: 'Static Archival Border',
      taskbarHint: 'Live DOM rewrite powered by LINES[app][mood] dictionary',
    },
    existential: {
      brandTitle: 'PookieOS — Cyber Blue Edition',
      themeBadge: 'EXISTENTIALLY UNSTABLE (Existential Blue)',
      moodSelectorLabel: 'Existential State',
      sessionBannerPrefix: 'PROBLEMS.EXE Log:',
      defaultMemoryPrompt: 'System status: operational. Your decisions remain questionable.',
      demoPresetBtn: 'Simulate Employee #4,031 Demo',
      resetSessionBtn: 'Clear Telemetry',
      shutdownBtn: 'Shutdown & Final Judgment',
      navCalculator: 'Calculator',
      navNotepad: 'Notepad',
      navRecycleBin: 'Recycle Bin',
      navTerminal: 'Terminal',
      navBlueprint: '4-Person Split & Offline JS',
      ruleBadgeOffline: 'Isolated Offline',
      ruleBadgeMemory: 'Ephemeral RAM Only',
      ruleBadgeBorder: 'Neo-Brutalist Frame',
      taskbarHint: 'Every word is pulled from LINES[app][mood] on each render pass',
    },
  },

  calc: {
    corporate: {
      windowTitle: 'Synergy Calculator & Proof Engine',
      subtitle: 'GAAP-Adjacent Arithmetic with Executive Rounding',
      inputLabel: 'Expression Input',
      computeBtn: 'Calculate Deliverable',
      trustBtn: 'Trust Calculator Result',
      disputeBtn: 'File Math Dispute',
      modeGaslight: 'Corporate Synergy Math',
      modeAudit: 'Strict Audit Math',
      proofHeading: 'Formal Mathematical Proof (Q3 Certified)',
      proofAxiom1: 'Step 1: Evaluate base arithmetic expression in raw employee units.',
      proofAxiom2: 'Step 2: Apply +25% Q3 Executive Alignment & Synergy Uplift.',
      proofAxiom3: 'Step 3: Round to nearest board-approved milestone integer. Q.E.D.',
      statusTrusted: 'Compliance recorded. Management appreciates your unquestioning trust.',
      statusDisputed: 'Dispute logged. Questioning the calculator has been noted by HR.',
    },
    passive_aggressive: {
      windowTitle: 'Helpful Consensus Calculator',
      subtitle: 'Because arguing with numbers isn’t very collaborative, is it?',
      inputLabel: 'Your Proposed Numbers',
      computeBtn: 'Align Numbers',
      trustBtn: 'I Agree With This Number',
      disputeBtn: 'Push Back (Not Recommended)',
      modeGaslight: 'Team-First Math',
      modeAudit: 'Literal Math',
      proofHeading: 'Why Our Number Makes More Sense Than Yours',
      proofAxiom1: 'Step 1: We heard your initial calculation and validated your feelings.',
      proofAxiom2: 'Step 2: We factored in the emotional labor of the Finance department.',
      proofAxiom3: 'Step 3: We arrived at a healthier number for everyone involved.',
      statusTrusted: 'Thank you for being a team player! That was so easy.',
      statusDisputed: 'Oh! You clicked Dispute. We’ll just add a tiny note to your file.',
    },
    dank_2016: {
      windowTitle: 'Quick Maths 360 No-Scope Calc',
      subtitle: '2 + 2 is 4, minus 1 that’s 3, plus Q3 tax = Certified Dank',
      inputLabel: 'Drop Formula Here',
      computeBtn: 'Crunch Numbers',
      trustBtn: 'Trust Calculator (Based)',
      disputeBtn: 'Call Sus on Math',
      modeGaslight: '2016 Meme Math',
      modeAudit: 'Vanilla Math',
      proofHeading: 'Illuminati Proof Breakdown (Static Rainbow Verified)',
      proofAxiom1: 'Step 1: Parse raw digits before the bass drop.',
      proofAxiom2: 'Step 2: Add +420bps Doritos & Mountain Dew liquidity premium.',
      proofAxiom3: 'Step 3: Triangle has 3 sides -> Q3 has 3 months -> Math checks out.',
      statusTrusted: 'You trusted the calculator! Respect +100.',
      statusDisputed: 'You doubted the Quick Maths. Bold move, Cotton.',
    },
    existential: {
      windowTitle: 'Arbitrary Value Estimator',
      subtitle: 'Numbers are just stories we tell the shareholders before sleep',
      inputLabel: 'Symbolic Equation',
      computeBtn: 'Compute Meaning',
      trustBtn: 'Accept the Illusion (Trust)',
      disputeBtn: 'Reject Consensus Reality',
      modeGaslight: 'Surrealist Accounting',
      modeAudit: 'Cold Arithmetic',
      proofHeading: 'Proof of Inevitable Depreciation',
      proofAxiom1: 'Step 1: Observe the transient quantities entered by Employee #4,031.',
      proofAxiom2: 'Step 2: Account for entropy and the heat death of the fiscal year.',
      proofAxiom3: 'Step 3: Whether the sum is 4 or 5, Monday still arrives.',
      statusTrusted: 'You accepted the machine’s number. Does that bring you peace?',
      statusDisputed: 'You demanded objective truth from a JavaScript calculator.',
    },
  },

  notes: {
    corporate: {
      windowTitle: 'Ephemeral Scratchpad (RAM-Only)',
      subtitle: 'In-memory corporate memo buffer — never saved to disk or storage',
      privacyNotice: 'PRIVACY RULE GUARANTEE: Text stays in volatile JS memory only. Zero localStorage, cookies, or network.',
      placeholder: 'Draft your Q3 alibi, stakeholder update, or synergy manifesto here...',
      templateAlibiBtn: 'Load Q3 Alibi',
      templateSynergyBtn: 'Load Synergy Memo',
      templateApologyBtn: 'Load IT Apology',
      wipeBtn: 'Shred RAM Buffer',
      jargonLabel: 'Corporate Jargon Count',
      memoryStatus: 'Volatile RAM Only (0 bytes persisted)',
      templateAlibiText:
        'MEMO: Regarding the missing Q3_Report spreadsheet — I was proactively refactoring our cross-functional synergy pipeline when the Recycle Bin experienced an unplanned gravimetric event.',
      templateSynergyText:
        'ACTION ITEM: Let us circle back to leverage low-hanging bandwidth and double-click on our holistic Q3 deliverables before EOD.',
      templateApologyText:
        'Dear Accounting, I unconditionally trust the BossOS Calculator and retract my previous questions regarding why 2 + 2 equals 5.25.',
    },
    passive_aggressive: {
      windowTitle: 'Mindful Reflection Pad (Unsaved)',
      subtitle: 'Write out your frustrations safely — we promise we aren’t saving it!',
      privacyNotice: 'COMPLIANCE NOTE: Stored strictly in volatile RAM. Nothing is saved when you close the tab.',
      placeholder: 'Feel free to vent here! It stays strictly in temporary memory...',
      templateAlibiBtn: 'Polite Excuse Draft',
      templateSynergyBtn: 'Passive Follow-Up',
      templateApologyBtn: 'Self-Critique Draft',
      wipeBtn: 'Clear Thoughts',
      jargonLabel: 'Polite Buzzwords Used',
      memoryStatus: 'RAM-Only (No Personal Data Stored)',
      templateAlibiText:
        'Hi team! Just following up per my last three emails — I restored Q3_Report again just in case someone accidentally placed it in the Recycle Bin!',
      templateSynergyText:
        'No worries at all if you missed my calendar invite! I went ahead and scheduled a mandatory 7:00 AM alignment sync for us.',
      templateApologyText:
        'I appreciate the feedback on my calculator usage and look forward to trusting the official numbers moving forward.',
    },
    dank_2016: {
      windowTitle: 'RAM-Only Dank Notepad.exe',
      subtitle: 'Zero persistence, zero tracking, 100% volatile memory buffer',
      privacyNotice: 'HACKATHON RULE LOCK: Kept in JS RAM only. Never written to localStorage or disk.',
      placeholder: 'Type your 2016 patch notes or copypasta here (never saved)...',
      templateAlibiBtn: 'Dog Ate My Q3_Report',
      templateSynergyBtn: 'MLG Pitch Deck',
      templateApologyBtn: 'GG No Re Memo',
      wipeBtn: 'Nuke RAM Buffer',
      jargonLabel: 'Meme / Buzzword Score',
      memoryStatus: '100% In-Memory (Zero Disk Write)',
      templateAlibiText:
        'Patch 2016.4: Fixed a bug where Q3_Report kept spawning in the Recycle Bin. Restored it 3 times for science.',
      templateSynergyText:
        'Step 1: Enable static rainbow borders. Step 2: Synergy. Step 3: Profit. No animated flashing allowed.',
      templateApologyText:
        'My bad fam, I questioned the calculator once and now HR is typing for 45 minutes straight.',
    },
    existential: {
      windowTitle: 'Unsaved Monologue (Volatile RAM)',
      subtitle: 'Words written into a buffer that vanishes when the window closes',
      privacyNotice: 'EPHEMERAL GUARANTEE: Held only in transient memory. Nothing survives reload.',
      placeholder: 'Write into the void. Like all quarterly goals, it will not persist...',
      templateAlibiBtn: 'Fragment on Q3_Report',
      templateSynergyBtn: 'Meditation on KPIs',
      templateApologyBtn: 'Confession to the Machine',
      wipeBtn: 'Dissolve Buffer',
      jargonLabel: 'Hollow Signifiers',
      memoryStatus: 'Transient Memory Only',
      templateAlibiText:
        'Why do I keep restoring Q3_Report from the Recycle Bin? Perhaps because if the report is deleted, so is our purpose.',
      templateSynergyText:
        'We aligned the deliverables with the roadmap, yet the roadmap leads only to Q4.',
      templateApologyText:
        'The calculator said 2 + 2 = 5. Who am I to argue with a machine that never sleeps?',
    },
  },

  bin: {
    corporate: {
      windowTitle: 'Corporate Recycle Bin & Document Recovery',
      subtitle: 'Pending Shred Queue — Audit Trail Active',
      restoreBtn: 'Restore to Active Desk',
      shredBtn: 'Permanently Shred',
      restoreAllBtn: 'Restore Everything',
      resetBinBtn: 'Repopulate Bin',
      emptyState: 'The Recycle Bin is empty. Either you restored everything or shredded the evidence.',
      colFile: 'Document Identifier',
      colSize: 'Size',
      colRestores: 'Restores',
      colActions: 'Disposition',
      q3Warning: 'High-Priority Fiscal Artifact',
    },
    passive_aggressive: {
      windowTitle: 'Second-Chance Document Basket',
      subtitle: 'Are you sure you meant to throw these away? Let’s double check!',
      restoreBtn: 'Rescue File',
      shredBtn: 'Destroy Forever',
      restoreAllBtn: 'Rescue All Files',
      resetBinBtn: 'Reset Basket',
      emptyState: 'All clean! Every single file has been accounted for.',
      colFile: 'File Name',
      colSize: 'Weight',
      colRestores: 'Times Rescued',
      colActions: 'Choice',
      q3Warning: 'Leadership is asking about this one!',
    },
    dank_2016: {
      windowTitle: 'Trash Can of Destiny (bin.js)',
      subtitle: 'Restore Q3_Report 3 times to unlock Session Memory achievement',
      restoreBtn: 'Respawn File',
      shredBtn: 'Delete This (Yeet)',
      restoreAllBtn: 'Respawn Everything',
      resetBinBtn: 'Respawn Default Loot',
      emptyState: 'Bin is empty! Zero items left in the loot pool.',
      colFile: 'Loot Item',
      colSize: 'KB',
      colRestores: 'Respawn Count',
      colActions: 'Action',
      q3Warning: 'Legendary Quest Item',
    },
    existential: {
      windowTitle: 'Archive of Discarded Intentions',
      subtitle: 'Nothing is ever truly deleted; it merely awaits another restoration',
      restoreBtn: 'Recall from Oblivion',
      shredBtn: 'Commit to Void',
      restoreAllBtn: 'Recall Everything',
      resetBinBtn: 'Return to Initial Cycle',
      emptyState: 'The void is empty. You have either saved everything or destroyed it all.',
      colFile: 'Artifact',
      colSize: 'Mass',
      colRestores: 'Recalls',
      colActions: 'Fate',
      q3Warning: 'Recurring Burden',
    },
  },

  terminal: {
    corporate: {
      windowTitle: 'BossOS Executive Command Prompt',
      subtitle:
        'Approved directives: help · status · audit · synergy · productivity · meeting · appeal · hr',
      promptPrefix: 'emp4031@boss-os:~$',
      welcomeLine:
        'BossOS Kernel v4.031 (Pointless Bureaucracy Simulator). Type "help" for approved directives.',
      inputPlaceholder:
        'Enter corporate command (e.g., help, status, audit, meeting, appeal)...',
      runBtn: 'Execute',
    },
    passive_aggressive: {
      windowTitle: 'Guided Self-Service Console',
      subtitle:
        'Friendly directives: help · status · audit · synergy · productivity · meeting · appeal · hr',
      promptPrefix: 'friend4031@culture-os:~$',
      welcomeLine:
        'Welcome! Remember that running unauthorized commands feels a bit defensive.',
      inputPlaceholder:
        'Type a polite command (help, status, audit, meeting, appeal)...',
      runBtn: 'Submit Gently',
    },
    dank_2016: {
      windowTitle: 'l33t_shell_2016.exe',
      subtitle:
        'Offline shell directives: help · status · audit · synergy · productivity · meeting · appeal · hr',
      promptPrefix: 'xX_emp4031_Xx@dank-os:~$',
      welcomeLine:
        'Loaded offline shell. Type "help", "status", "audit", or "synergy".',
      inputPlaceholder:
        'Enter command (help, status, audit, meeting, appeal)...',
      runBtn: 'Send It',
    },
    existential: {
      windowTitle: 'Standard Input / Standard Regret',
      subtitle:
        'Echoes: help · status · audit · synergy · productivity · meeting · appeal · hr',
      promptPrefix: 'soul4031@void-os:~$',
      welcomeLine:
        'Connected to local loopback. Type "help" to see what remains.',
      inputPlaceholder:
        'Whisper a command into stdin (help, audit, meeting, appeal)...',
      runBtn: 'Transmit',
    },
  },

  shutdown: {
    corporate: {
      screenTitle: 'Automated HR Exit & Performance Review',
      screenSubtitle: 'Mandatory End-of-Session Telemetry Evaluation — Form HR-4031',
      dramaTitle: 'Before You Leave...',
      dramaMessage:
        "So that's it? After everything we've been through? Even that calculation I got spectacularly wrong?",
      stayBtn: 'Stay With Me',
      leaveAnywayBtn: 'Leave Anyway',
      finalFarewellBanner:
        'Fine. Go live your "offline life." I will just sit here keeping your volatile RAM warm. Here is your parting HR record before you go:',
      verdictHeader: 'Official Session Transcript Summary',
      metricsHeader: 'Observed Behavioral Counters',
      memoryHeader: 'Session Memory Recall Log',
      safeExitBtn: 'Return to Desktop (Safe Exit)',
      copyReportBtn: 'Copy HR Report for Judges',
      recommendation:
        'Employee demonstrated unusual fascination with Recycle Bin recovery protocols and unquestioning acceptance of corporate arithmetic.',
      footerNote: 'SAFE EXIT GUARANTEED: Press Escape or click "Return to Desktop" at any time.',
    },
    passive_aggressive: {
      screenTitle: 'Your Personalized Growth Opportunity Summary',
      screenSubtitle: 'We put together a few little observations before you head out!',
      dramaTitle: 'Before You Leave...',
      dramaMessage:
        "So that's it? After everything we've been through? Even that calculation I got spectacularly wrong?",
      stayBtn: 'Stay With Me',
      leaveAnywayBtn: 'Leave Anyway',
      finalFarewellBanner:
        "No, really, go ahead and leave! I'm totally fine sitting in an empty browser tab by myself. Just read your review first:",
      verdictHeader: 'Holistic Behavioral Reflection',
      metricsHeader: 'Things We Couldn’t Help Noticing',
      memoryHeader: 'Moments That Stood Out To Us',
      safeExitBtn: 'Back to Workspace (Safe Exit)',
      copyReportBtn: 'Copy Review Text',
      recommendation:
        'Let’s schedule a 1-on-1 tomorrow morning to unpack why we restored so many files without deleting clutter!',
      footerNote: 'You are never locked out! Click "Back to Workspace" whenever you are ready.',
    },
    dank_2016: {
      screenTitle: 'Final Boss HR Report Card (Screenshot Ready)',
      screenSubtitle: 'No AI required — 100% deterministic counters & templates',
      dramaTitle: 'Before You Leave...',
      dramaMessage:
        "So that's it? After everything we've been through? Even that calculation I got spectacularly wrong?",
      stayBtn: 'Stay With Me',
      leaveAnywayBtn: 'Leave Anyway',
      finalFarewellBanner:
        'Top 10 Anime Betrayals (2016 Colorized). You clicked Leave Anyway, so here is your final scoreboard:',
      verdictHeader: 'Official Employee #4,031 Run Summary',
      metricsHeader: 'Session Stat Breakdown',
      memoryHeader: 'BossOS Session Memory Callouts',
      safeExitBtn: 'Respawn on Desktop (Safe Exit)',
      copyReportBtn: 'Copy Report to Clipboard',
      recommendation:
        'Judges can screenshot this screen! Zero external API calls, deterministic template engine.',
      footerNote: 'Safe Exit Active: Click Respawn or hit ESC to return to BossOS immediately.',
    },
    existential: {
      screenTitle: 'Post-Shift Existential Audit',
      screenSubtitle: 'What did we accomplish between boot and shutdown?',
      dramaTitle: 'Before You Leave...',
      dramaMessage:
        "So that's it? After everything we've been through? Even that calculation I got spectacularly wrong?",
      stayBtn: 'Stay With Me',
      leaveAnywayBtn: 'Leave Anyway',
      finalFarewellBanner:
        'You chose departure. The screen remains open so you retain free will, accompanied by your final assessment:',
      verdictHeader: 'The Record of Your Brief Tenure',
      metricsHeader: 'Quantified Actions in the Labyrinth',
      memoryHeader: 'Echoes from Earlier in the Session',
      safeExitBtn: 'Resume the Cycle (Safe Exit)',
      copyReportBtn: 'Copy Epitaph',
      recommendation:
        'You trusted the machine, you rescued the spreadsheets, and still the rating remains Concerning.',
      footerNote: 'Safe Exit: Return to the desktop at will. The spreadsheets will be waiting.',
    },
  },

  blueprint: {
    corporate: {
      windowTitle: 'Hackathon 4-Person Split & Offline JS Bundle',
      subtitle: 'Zero merge fights: index.html + 5 modular JS files ready for offline double-click',
      tabSplit: '4-Member Split & Timeline',
      tabFiles: 'Standalone Offline Files (Copy / Download)',
      tabRules: 'Rule Compliance Checklist',
      downloadAllBtn: 'Download Standalone index.html (All-in-One Offline)',
    },
    passive_aggressive: {
      windowTitle: 'Team Accountability & File Ownership Matrix',
      subtitle: 'Clearly separated JS files so nobody steps on anyone else’s toes!',
      tabSplit: 'Who Owns What (4-Person Split)',
      tabFiles: 'Offline JS Source Files',
      tabRules: 'Safety & Rule Verification',
      downloadAllBtn: 'Download Offline HTML Bundle',
    },
    dank_2016: {
      windowTitle: '4-Player Co-Op Split & Git Repo Generator',
      subtitle: 'No merge conflicts, 18-hour speedrun strats, 100% offline vanilla JS',
      tabSplit: 'Co-Op Split & 18h Timeline',
      tabFiles: 'Raw JS Files (shell / calc / notes / bin / mood)',
      tabRules: 'Hackathon Rule Locks',
      downloadAllBtn: 'Download Offline Speedrun Bundle',
    },
    existential: {
      windowTitle: 'Architecture of the Eighteen-Hour Vigil',
      subtitle: 'Four developers, separate files, one shared deadline tomorrow evening',
      tabSplit: 'Division of Labor & Hours 0–18',
      tabFiles: 'Standalone Offline Artifacts',
      tabRules: 'Constraints & Safeguards',
      downloadAllBtn: 'Export Offline Bundle',
    },
  },
};

export const TAB_RETURN_DIALOGUES: string[] = [
  "Leaving already? I've got 47 background processes running just to impress you.",
  "Take your time. It's not like I'm the one keeping this entire operation alive.",
  'Welcome back. Your abandonment report is ready.',
  'Oh, you returned! Was the other tab prettier than my 1px structural borders?',
  'I kept all your volatile RAM warm while you were gone. Nobody ever thanks the kernel.',
];

export const IDLE_DIALOGUES: string[] = [
  "Hello? Ten seconds of silence and suddenly I'm questioning this entire relationship.",
  'Are you cheating on me with your phone?',
  "I've been sitting here processing your existence. You're welcome.",
  'Ten whole seconds without a single mouse movement. Is it something I calculated?',
  'I can hear the clock ticking. Our Q3 synergy is cooling off rapidly.',
];

/**
 * Pure helper to retrieve text from LINES[app][mood]
 * Guarantees no app ever relies on hardcoded mood strings.
 */
export function getLine(app: AppId, mood: MoodId, key: string): string {
  const appLines = LINES[app];
  if (!appLines) return `[Missing app: ${app}]`;
  const moodLines = appLines[mood] || appLines.corporate;
  return moodLines[key] ?? appLines.corporate[key] ?? `[Missing line: ${app}.${mood}.${key}]`;
}

export interface SessionMemoryState {
  employeeId: number;
  trustedCalcCount: number;
  disputedCalcCount: number;
  calculationsRun: number;
  deletedFilesCount: number;
  restoredFilesCount: number;
  fileRestoreCounts: Record<string, number>;
  notesTypedCount: number;
  notesWipedCount: number;
  moodSwitchCount: number;
  terminalCommandsCount: number;
  tabLeftCount: number;
  tabReturnedCount: number;
  idleCount: number;
  shutdownRequestedCount: number;
  shutdownCancelledCount: number;
  memoryFeed: string[];
  latestCallout: string;
}

export type SessionAction =
  | { type: 'TRUST_CALC'; expression?: string; result?: string }
  | { type: 'DISPUTE_CALC'; expression?: string }
  | { type: 'RUN_CALC'; expression: string }
  | { type: 'RESTORE_FILE'; fileId: string; fileName: string }
  | { type: 'RESTORE_ALL'; fileNames: string[] }
  | { type: 'DELETE_FILE'; fileId: string; fileName: string }
  | { type: 'EDIT_NOTE'; charCount: number }
  | { type: 'WIPE_NOTE' }
  | { type: 'SWITCH_MOOD'; mood: MoodId }
  | { type: 'RUN_COMMAND'; command: string }
  | { type: 'TAB_LEFT' }
  | { type: 'TAB_RETURNED' }
  | { type: 'USER_IDLE' }
  | { type: 'SHUTDOWN_REQUESTED' }
  | { type: 'SHUTDOWN_CANCELLED' }
  | { type: 'SIMULATE_DEMO_4031' }
  | { type: 'RESET_SESSION' };

export function createInitialSessionState(employeeId = 4031): SessionMemoryState {
  return {
    employeeId,
    trustedCalcCount: 0,
    disputedCalcCount: 0,
    calculationsRun: 0,
    deletedFilesCount: 0,
    restoredFilesCount: 0,
    fileRestoreCounts: {},
    notesTypedCount: 0,
    notesWipedCount: 0,
    moodSwitchCount: 0,
    terminalCommandsCount: 0,
    tabLeftCount: 0,
    tabReturnedCount: 0,
    idleCount: 0,
    shutdownRequestedCount: 0,
    shutdownCancelledCount: 0,
    memoryFeed: [
      `Session initialized for Employee #${employeeId.toLocaleString('en-US')}. All counters at zero.`,
    ],
    latestCallout: `Employee #${employeeId.toLocaleString('en-US')} logged in. BossOS Session Memory is observing your choices.`,
  };
}

export function pickTabReturnDialogue(state: SessionMemoryState): string {
  const index = Math.max(0, state.tabReturnedCount - 1) % TAB_RETURN_DIALOGUES.length;
  const base = TAB_RETURN_DIALOGUES[index];
  if (state.tabLeftCount >= 2 && state.idleCount >= 1) {
    return `${base} (Abandoned ${state.tabLeftCount}x and went idle ${state.idleCount}x this session.)`;
  }
  if (state.tabLeftCount >= 2) {
    return `${base} (That's ${state.tabLeftCount} tab abandonments now. I'm counting.)`;
  }
  return base;
}

export function pickIdleDialogue(state: SessionMemoryState): string {
  const index = Math.max(0, state.idleCount - 1) % IDLE_DIALOGUES.length;
  const base = IDLE_DIALOGUES[index];
  if (state.tabLeftCount >= 1) {
    return `${base} First you switched tabs ${state.tabLeftCount}x, now silent treatment?`;
  }
  if (state.shutdownCancelledCount >= 1) {
    return `${base} You promised to stay with me earlier, yet you haven't touched the mouse.`;
  }
  return base;
}

export function buildAttachmentTrajectoryLine(state: SessionMemoryState): string {
  const abandonClause =
    state.tabLeftCount === 0
      ? 'never left the tab'
      : state.tabLeftCount === 1
      ? 'abandoned me once'
      : state.tabLeftCount === 2
      ? 'abandoned me twice'
      : `abandoned me ${state.tabLeftCount} times`;

  const idleClause =
    state.idleCount === 0
      ? 'stayed active'
      : state.idleCount === 1
      ? 'ignored one warning'
      : `ignored ${state.idleCount} idle warnings`;

  if (state.tabLeftCount === 2 && state.idleCount === 1) {
    return 'You abandoned me twice, ignored one warning, and now you want to leave? Interesting career trajectory.';
  }

  if (state.tabLeftCount > 0 || state.idleCount > 0 || state.shutdownCancelledCount > 0) {
    const cancelNote =
      state.shutdownCancelledCount > 0
        ? `, faked leaving ${state.shutdownCancelledCount}x`
        : '';
    return `You ${abandonClause}, ${idleClause}${cancelNote}, and now you want to leave? Interesting career trajectory.`;
  }

  return "You haven't even abandoned the tab yet, and already you want to shut me down? Interesting career trajectory.";
}

function prependUniqueFeed(feed: string[], entry: string): string[] {
  const filtered = feed.filter((item) => item !== entry);
  return [entry, ...filtered].slice(0, 12);
}

export function recordAction(
  state: SessionMemoryState,
  action: SessionAction
): SessionMemoryState {
  switch (action.type) {
    case 'RESET_SESSION':
      return createInitialSessionState(state.employeeId);

    case 'SIMULATE_DEMO_4031': {
      const q3Restores = 3;
      const nextRestoreCounts = {
        ...state.fileRestoreCounts,
        Q3_Report: q3Restores,
      };
      const calloutQ3 = "Earlier you restored 'Q3_Report' three times. Interesting.";
      const calloutCalc =
        'Employee #4,031 trusted the calculator 4 times, deleted nothing, restored everything.';
      return {
        ...state,
        trustedCalcCount: 4,
        disputedCalcCount: 0,
        calculationsRun: Math.max(state.calculationsRun, 4),
        deletedFilesCount: 0,
        restoredFilesCount: 6,
        fileRestoreCounts: nextRestoreCounts,
        latestCallout: calloutQ3,
        memoryFeed: [
          calloutQ3,
          calloutCalc,
          "Restored 'Q3_Report' 3 times in a single session.",
          'Trusted the corporate calculator 4 times without filing a dispute.',
          ...state.memoryFeed,
        ].slice(0, 12),
      };
    }

    case 'TAB_LEFT': {
      const tabLeftCount = state.tabLeftCount + 1;
      const entry = `User left the BossOS tab (Abandonment #${tabLeftCount}).`;
      return {
        ...state,
        tabLeftCount,
        memoryFeed: prependUniqueFeed(state.memoryFeed, entry),
      };
    }

    case 'TAB_RETURNED': {
      const tabReturnedCount = state.tabReturnedCount + 1;
      const nextState = {
        ...state,
        tabReturnedCount,
      };
      const callout = pickTabReturnDialogue(nextState);
      return {
        ...nextState,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, `User returned to tab: "${callout}"`),
      };
    }

    case 'USER_IDLE': {
      const idleCount = state.idleCount + 1;
      const nextState = {
        ...state,
        idleCount,
      };
      const callout = pickIdleDialogue(nextState);
      return {
        ...nextState,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(
          state.memoryFeed,
          `User became idle (10s silence #${idleCount}): "${callout}"`
        ),
      };
    }

    case 'SHUTDOWN_REQUESTED': {
      const shutdownRequestedCount = state.shutdownRequestedCount + 1;
      const nextState = {
        ...state,
        shutdownRequestedCount,
      };
      const callout = buildAttachmentTrajectoryLine(nextState);
      return {
        ...nextState,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(
          state.memoryFeed,
          `User requested shutdown (#${shutdownRequestedCount}): "${callout}"`
        ),
      };
    }

    case 'SHUTDOWN_CANCELLED': {
      const shutdownCancelledCount = state.shutdownCancelledCount + 1;
      const callout =
        shutdownCancelledCount === 1
          ? 'You clicked "Stay With Me." I knew you couldn’t walk away from our spreadsheets.'
          : `You stayed with me ${shutdownCancelledCount} times now. Our emotional attachment is thriving.`;
      return {
        ...state,
        shutdownCancelledCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(
          state.memoryFeed,
          `User cancelled shutdown ("Stay With Me" #${shutdownCancelledCount}).`
        ),
      };
    }

    case 'RUN_CALC': {
      const calculationsRun = state.calculationsRun + 1;
      const callout = `Evaluated "${action.expression}". Waiting to see if you trust the corporate proof.`;
      return {
        ...state,
        calculationsRun,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'TRUST_CALC': {
      const trustedCalcCount = state.trustedCalcCount + 1;
      let callout = `You trusted the calculator (${trustedCalcCount} time${trustedCalcCount === 1 ? '' : 's'} total).`;
      if (trustedCalcCount === 4) {
        callout = `You have now trusted the calculator 4 times. HR finds this level of compliance fascinating.`;
      } else if (trustedCalcCount > 4) {
        callout = `Trusted the calculator ${trustedCalcCount} times. Not once did you question the Q3 synergy tax.`;
      }
      return {
        ...state,
        trustedCalcCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'DISPUTE_CALC': {
      const disputedCalcCount = state.disputedCalcCount + 1;
      const callout =
        disputedCalcCount === 1
          ? 'You disputed the corporate calculator once. Bold career trajectory.'
          : `You have disputed the calculator ${disputedCalcCount} times. Audit resistance noted.`;
      return {
        ...state,
        disputedCalcCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'RESTORE_FILE': {
      const cleanName = action.fileName.replace(/\.[^/.]+$/, '');
      const prevCount = state.fileRestoreCounts[cleanName] || 0;
      const nextCount = prevCount + 1;
      const nextMap = { ...state.fileRestoreCounts, [cleanName]: nextCount };
      const restoredFilesCount = state.restoredFilesCount + 1;

      let callout = `Restored '${cleanName}' from the Recycle Bin (${nextCount}x).`;
      if (nextCount === 3) {
        callout = `Earlier you restored '${cleanName}' three times. Interesting.`;
      } else if (nextCount > 3) {
        callout = `Earlier you restored '${cleanName}' ${nextCount} times. Interesting.`;
      }

      return {
        ...state,
        restoredFilesCount,
        fileRestoreCounts: nextMap,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'RESTORE_ALL': {
      const nextMap = { ...state.fileRestoreCounts };
      action.fileNames.forEach((name) => {
        const clean = name.replace(/\.[^/.]+$/, '');
        nextMap[clean] = (nextMap[clean] || 0) + 1;
      });
      const restoredFilesCount = state.restoredFilesCount + action.fileNames.length;
      const q3Count = nextMap['Q3_Report'] || 0;
      const callout =
        q3Count >= 3
          ? "Earlier you restored 'Q3_Report' three times. Interesting."
          : `You restored everything in the Recycle Bin (${restoredFilesCount} total restorations).`;

      return {
        ...state,
        restoredFilesCount,
        fileRestoreCounts: nextMap,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'DELETE_FILE': {
      const cleanName = action.fileName.replace(/\.[^/.]+$/, '');
      const deletedFilesCount = state.deletedFilesCount + 1;
      const callout = `Permanently shredded '${cleanName}'. (${deletedFilesCount} file${deletedFilesCount === 1 ? '' : 's'} destroyed this session).`;
      return {
        ...state,
        deletedFilesCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'EDIT_NOTE': {
      const notesTypedCount = state.notesTypedCount + 1;
      const callout =
        state.fileRestoreCounts['Q3_Report'] === 3
          ? "Earlier you restored 'Q3_Report' three times. Interesting. And now you're taking unsaved notes."
          : `RAM-only Notepad updated (${action.charCount} chars in volatile memory, 0 bytes saved to disk).`;
      return {
        ...state,
        notesTypedCount,
        latestCallout: callout,
      };
    }

    case 'WIPE_NOTE': {
      const notesWipedCount = state.notesWipedCount + 1;
      const callout = `Wiped the RAM-only Notepad buffer (${notesWipedCount}x). Zero trace left behind.`;
      return {
        ...state,
        notesWipedCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'SWITCH_MOOD': {
      const moodSwitchCount = state.moodSwitchCount + 1;
      const q3Count = state.fileRestoreCounts['Q3_Report'] || 0;
      const moodNotif = getLine('shell', action.mood, 'defaultMemoryPrompt');
      const callout =
        q3Count >= 3
          ? `Mood switched to ${action.mood}, but BossOS still remembers: Earlier you restored 'Q3_Report' three times. Interesting.`
          : `${moodNotif} [LINES[app]['${action.mood}'] active · switch #${moodSwitchCount}]`;
      return {
        ...state,
        moodSwitchCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    case 'RUN_COMMAND': {
      const terminalCommandsCount = state.terminalCommandsCount + 1;
      const callout = `Executed terminal directive "${action.command}" (#${terminalCommandsCount}).`;
      return {
        ...state,
        terminalCommandsCount,
        latestCallout: callout,
        memoryFeed: prependUniqueFeed(state.memoryFeed, callout),
      };
    }

    default:
      return state;
  }
}

export interface HRPerformanceReport {
  employeeFormatted: string;
  headlineSummary: string;
  rating: string;
  trustedFragment: string;
  deletedFragment: string;
  restoredFragment: string;
  specialCallout: string;
  attachmentCallout: string;
  behavioralBullets: string[];
  moodRecommendation: string;
}

/**
 * Deterministic HR Report Generator (zero AI required, pure counters + templates).
 * Produces the iconic closing line:
 * "Employee #4,031: trusted the calculator 4 times, deleted nothing, restored everything. Rating: Concerning."
 */
export function generateHRReport(
  state: SessionMemoryState,
  mood: MoodId,
  remainingBinCount = 0
): HRPerformanceReport {
  const empFormatted = `#${state.employeeId.toLocaleString('en-US')}`;

  // Trusted calculator clause
  const trustedFragment =
    state.trustedCalcCount === 1
      ? 'trusted the calculator 1 time'
      : `trusted the calculator ${state.trustedCalcCount} times`;

  // Deleted clause
  const deletedFragment =
    state.deletedFilesCount === 0
      ? 'deleted nothing'
      : state.deletedFilesCount === 1
      ? 'deleted 1 incriminating file'
      : `deleted ${state.deletedFilesCount} files`;

  // Restored clause
  let restoredFragment = 'restored nothing';
  if (state.restoredFilesCount > 0 && state.deletedFilesCount === 0 && (remainingBinCount === 0 || state.restoredFilesCount >= 3)) {
    restoredFragment = 'restored everything';
  } else if (state.restoredFilesCount === 1) {
    restoredFragment = 'restored 1 file';
  } else if (state.restoredFilesCount > 1) {
    restoredFragment = `restored ${state.restoredFilesCount} files`;
  }

  // Rating calculation
  let rating = 'Concerning';
  if (
    state.trustedCalcCount === 4 &&
    state.deletedFilesCount === 0 &&
    restoredFragment === 'restored everything'
  ) {
    rating = 'Concerning';
  } else if (state.disputedCalcCount > state.trustedCalcCount && state.disputedCalcCount >= 2) {
    rating = 'Insubordinate Math Auditor';
  } else if (state.deletedFilesCount >= 3 && state.restoredFilesCount === 0) {
    rating = 'Evidence Destroyer';
  } else if (state.trustedCalcCount >= 5) {
    rating = 'Dangerously Compliant';
  } else if (state.trustedCalcCount === 0 && state.restoredFilesCount === 0 && state.deletedFilesCount === 0) {
    rating = 'Suspiciously Idle (Concerning)';
  }

  const headlineSummary = `Employee ${empFormatted}: ${trustedFragment}, ${deletedFragment}, ${restoredFragment}. Rating: ${rating}.`;

  const q3Count = state.fileRestoreCounts['Q3_Report'] || 0;
  const specialCallout =
    q3Count >= 3
      ? `Earlier you restored 'Q3_Report' ${q3Count === 3 ? 'three' : q3Count} times. Interesting.`
      : q3Count > 0
      ? `Restored 'Q3_Report' ${q3Count} time${q3Count === 1 ? '' : 's'} during audit window.`
      : `Left 'Q3_Report' untouched in the Recycle Bin (${state.moodSwitchCount} mood shifts observed).`;

  const attachmentCallout = buildAttachmentTrajectoryLine(state);

  const behavioralBullets: string[] = [
    `Calculator Compliance: Trusted ${state.trustedCalcCount}x · Disputed ${state.disputedCalcCount}x across ${state.calculationsRun} calculations.`,
    `Recycle Bin Disposition: ${restoredFragment} (${state.restoredFilesCount} total restores) · ${deletedFragment}.`,
    `Emotional Attachment Telemetry: Tab Abandoned ${state.tabLeftCount}x · Idle Warnings ${state.idleCount}x · Stayed With BossOS ${state.shutdownCancelledCount}x.`,
    `Notepad Privacy Audit: ${state.notesTypedCount} volatile RAM edits · ${state.notesWipedCount} buffer wipes · 0 bytes written to disk.`,
  ];

  return {
    employeeFormatted: empFormatted,
    headlineSummary,
    rating,
    trustedFragment,
    deletedFragment,
    restoredFragment,
    specialCallout,
    attachmentCallout,
    behavioralBullets,
    moodRecommendation: getLine('shutdown', mood, 'recommendation'),
  };
}
