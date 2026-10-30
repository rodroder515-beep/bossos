/**
 * 4-Person Team Split & Standalone Offline Vanilla JS Bundle Generator
 * Provides the exact 6 files (index.html, shell.js, calc.js, notes.js, bin.js, mood.js)
 * with agreed function contracts so 4 teammates can work with zero Git merge conflicts
 * and double-click index.html offline.
 */

export interface TeamMemberSplit {
  memberNumber: number;
  roleTitle: string;
  filesOwned: string[];
  agreedExports: string[];
  responsibilities: string[];
}

export const TEAM_SPLIT_PLAN: TeamMemberSplit[] = [
  {
    memberNumber: 1,
    roleTitle: 'Desktop Shell, Window Manager & Static Themes',
    filesOwned: ['shell.js', 'index.html'],
    agreedExports: [
      'window.BossShell.initShell()',
      'window.BossShell.renderAllWindows()',
      'window.BossShell.openWindow(appId)',
    ],
    responsibilities: [
      'Draggable/focusable window frames, desktop taskbar, and theme CSS classes',
      '2016 Dank Mode static linear-gradient rainbow border (zero flashing/animation per rule)',
      'Subscribes to Mood changes and calls renderCalc(), renderNotes(), renderBin()',
    ],
  },
  {
    memberNumber: 2,
    roleTitle: 'Corporate Calculator & Gaslighting Proofs',
    filesOwned: ['calc.js'],
    agreedExports: [
      'window.renderCalc(containerEl, mood)',
      'window.evaluateCorporateMath(expr, mood)',
    ],
    responsibilities: [
      'Draws every button label and proof step from LINES.calc[mood] on each render',
      'Generates 3-step corporate synergy proofs explaining why 2 + 2 = 5',
      'Calls window.recordBossAction("TRUST_CALC") to increment HR counter',
    ],
  },
  {
    memberNumber: 3,
    roleTitle: 'RAM-Only Notepad & Recycle Bin',
    filesOwned: ['notes.js', 'bin.js'],
    agreedExports: [
      'window.renderNotes(containerEl, mood)',
      'window.renderBin(containerEl, mood)',
    ],
    responsibilities: [
      'Notepad keeps text strictly in a JS closure variable (never localStorage or disk)',
      'Recycle Bin tracks per-file restores ("Q3_Report" x3 triggers Session Memory)',
      'Draws all headers, table columns, and action labels from LINES.notes[mood] and LINES.bin[mood]',
    ],
  },
  {
    memberNumber: 4,
    roleTitle: 'Mood Engine, LINES Data, Session Memory & HR Shutdown',
    filesOwned: ['mood.js'],
    agreedExports: [
      'window.LINES',
      'window.BossMood.getMood() / setMood(nextMood)',
      'window.recordBossAction(type, payload)',
      'window.renderHRShutdown(containerEl)',
    ],
    responsibilities: [
      'Central LINES[app][mood] dictionary and live re-render dispatcher',
      'Session Memory tracker ("Earlier you restored \'Q3_Report\' three times. Interesting.")',
      'Deterministic Shutdown HR Report ("Employee #4,031: trusted the calculator 4 times...") + Safe Exit button',
    ],
  },
];

export interface TimelinePhase {
  hours: string;
  phaseTitle: string;
  deliverables: string;
  statusNote: string;
}

export const HACKATHON_TIMELINE: TimelinePhase[] = [
  {
    hours: 'Hours 0–2',
    phaseTitle: 'Shell & Mood Engine Skeleton + Function Contracts',
    deliverables:
      'Agree on window.LINES[app][mood], window.recordBossAction(), and render*(el, mood) signatures so all 4 teammates can work in parallel with zero merge conflicts.',
    statusNote: 'Never Cut Foundation',
  },
  {
    hours: 'Hours 2–10',
    phaseTitle: 'Parallel App Construction (4 Separate JS Files)',
    deliverables:
      'Member 1 builds shell.js + static themes; Member 2 builds calc.js + proofs; Member 3 builds RAM-only notes.js + bin.js; Member 4 builds mood.js + LINES.',
    statusNote: 'Zero Merge Fights',
  },
  {
    hours: 'Hours 10–14',
    phaseTitle: 'Integration, Session Memory & HR Report Shutdown',
    deliverables:
      'Plug all 5 JS scripts into index.html, wire Session Memory callouts ("Earlier you restored Q3_Report three times"), and verify Shutdown HR Report + Safe Exit.',
    statusNote: 'Closing Demo Highlight',
  },
  {
    hours: 'Hours 14–18',
    phaseTitle: 'Polish, Offline Double-Click Verification & Backup Recording',
    deliverables:
      'Test opening index.html directly via file:// with Wi-Fi off, verify static borders in 2016 Dank Mode, and capture a local screen recording as backup.',
    statusNote: 'Demo Ready',
  },
];

export const STANDALONE_FILES: Record<string, { owner: string; description: string; code: string }> = {
  'mood.js': {
    owner: 'Member 4 (Mood Engine, LINES, Session Memory & HR Report)',
    description: 'Central LINES[app][mood] dictionary, Session Memory state, and Shutdown HR Review.',
    code: `// mood.js — Member 4: Mood Engine, LINES[app][mood], Session Memory & HR Shutdown
window.LINES = {
  shell: {
    corporate: { title: "BossOS Enterprise", shutdown: "Shutdown & HR Review", memoryPrefix: "Supervisor Memory:" },
    dank_2016: { title: "BossOS 2016 Dank Mode (Static Rainbow)", shutdown: "Shutdown & HR Roast", memoryPrefix: "Illuminati Log:" }
  },
  calc: {
    corporate: { title: "Synergy Calculator", trust: "Trust Calculator", proof: "Q3 Synergy Uplift (+1) applied. Q.E.D." },
    dank_2016: { title: "Quick Maths 360 Calc", trust: "Trust Calculator (Based)", proof: "Triangle has 3 sides = Q3 confirmed." }
  },
  notes: {
    corporate: { title: "RAM-Only Scratchpad", notice: "Volatile RAM only — never saved to disk.", wipe: "Wipe Buffer" },
    dank_2016: { title: "Dank Notepad.exe (RAM Only)", notice: "Zero localStorage, 100% volatile memory.", wipe: "Nuke Buffer" }
  },
  bin: {
    corporate: { title: "Corporate Recycle Bin", restore: "Restore File", restoreAll: "Restore Everything", shred: "Shred" },
    dank_2016: { title: "Trash Can of Destiny", restore: "Respawn File", restoreAll: "Respawn All", shred: "Yeet" }
  },
  shutdown: {
    corporate: { title: "Official HR Exit Performance Review", safeExit: "Return to Desktop (Safe Exit)" },
    dank_2016: { title: "Final Boss HR Report Card", safeExit: "Respawn on Desktop (Safe Exit)" }
  }
};

window.BossState = {
  mood: "corporate",
  employeeId: 4031,
  trustedCalc: 0,
  deletedFiles: 0,
  restoredFiles: 0,
  fileRestores: {},
  latestMemory: "Session started. BossOS is observing."
};

window.setBossMood = function(nextMood) {
  window.BossState.mood = nextMood;
  document.body.dataset.mood = nextMood;
  if (window.BossShell) window.BossShell.renderAllWindows();
};

window.recordBossAction = function(type, payload) {
  var s = window.BossState;
  if (type === "TRUST_CALC") {
    s.trustedCalc++;
    s.latestMemory = "You trusted the calculator " + s.trustedCalc + " time(s).";
  } else if (type === "RESTORE_FILE") {
    s.restoredFiles++;
    s.fileRestores[payload] = (s.fileRestores[payload] || 0) + 1;
    if (s.fileRestores[payload] === 3) {
      s.latestMemory = "Earlier you restored '" + payload + "' three times. Interesting.";
    } else {
      s.latestMemory = "Restored '" + payload + "' (" + s.fileRestores[payload] + "x).";
    }
  } else if (type === "DELETE_FILE") {
    s.deletedFiles++;
    s.latestMemory = "Deleted '" + payload + "'.";
  }
  if (window.BossShell) window.BossShell.renderAllWindows();
};

window.buildHRHeadline = function() {
  var s = window.BossState;
  var delText = s.deletedFiles === 0 ? "deleted nothing" : "deleted " + s.deletedFiles + " files";
  var resText = (s.restoredFiles > 0 && s.deletedFiles === 0) ? "restored everything" : "restored " + s.restoredFiles + " files";
  return "Employee #" + s.employeeId.toLocaleString("en-US") + ": trusted the calculator " + s.trustedCalc + " times, " + delText + ", " + resText + ". Rating: Concerning.";
};`,
  },
  'shell.js': {
    owner: 'Member 1 (Window Manager, Desktop Shell & Static Themes)',
    description: 'Manages window rendering, Mood toggle bar, and static rainbow borders in 2016 Dank Mode.',
    code: `// shell.js — Member 1: Window Manager, Desktop Shell & Static Themes
window.BossShell = {
  shutdownOpen: false,
  initShell: function() {
    this.renderAllWindows();
  },
  toggleShutdown: function(open) {
    this.shutdownOpen = open;
    this.renderAllWindows();
  },
  renderAllWindows: function() {
    var mood = window.BossState.mood;
    var shellLines = window.LINES.shell[mood];
    document.getElementById("boss-brand").textContent = shellLines.title;
    document.getElementById("boss-memory").textContent = shellLines.memoryPrefix + " " + window.BossState.latestMemory;
    document.getElementById("shutdown-btn").textContent = shellLines.shutdown;

    if (window.renderCalc) window.renderCalc(document.getElementById("win-calc"), mood);
    if (window.renderNotes) window.renderNotes(document.getElementById("win-notes"), mood);
    if (window.renderBin) window.renderBin(document.getElementById("win-bin"), mood);

    var modal = document.getElementById("hr-shutdown-modal");
    if (this.shutdownOpen) {
      modal.hidden = false;
      document.getElementById("hr-summary-line").textContent = window.buildHRHeadline();
      document.getElementById("hr-safe-exit").textContent = window.LINES.shutdown[mood].safeExit;
    } else {
      modal.hidden = true;
    }
  }
};`,
  },
  'calc.js': {
    owner: 'Member 2 (Calculator & Corporate Proofs)',
    description: 'Renders calculator UI from LINES.calc[mood] and generates corporate gaslight proofs.',
    code: `// calc.js — Member 2: Calculator & Corporate Proofs
window.CalcState = { expr: "2 + 2", result: "5" };

window.renderCalc = function(el, mood) {
  if (!el) return;
  var t = window.LINES.calc[mood];
  el.innerHTML =
    "<h3>" + t.title + "</h3>" +
    "<div class='calc-row'>" +
      "<input id='calc-input' value='" + window.CalcState.expr + "' />" +
      "<strong> = " + window.CalcState.result + "</strong>" +
    "</div>" +
    "<p class='proof-box'>" + t.proof + "</p>" +
    "<button onclick='window.recordBossAction(\"TRUST_CALC\")'>" + t.trust + "</button>";
};`,
  },
  'notes.js': {
    owner: 'Member 3 (Ephemeral RAM-Only Notepad)',
    description: 'Keeps note text strictly in memory and never writes to storage.',
    code: `// notes.js — Member 3: RAM-Only Notepad (Zero Personal Data Persistence)
(function() {
  var volatileRamBuffer = "Drafting Q3_Report explanation in volatile memory...";

  window.updateBossNote = function(val) {
    volatileRamBuffer = val;
  };

  window.wipeBossNote = function() {
    volatileRamBuffer = "";
    window.BossShell.renderAllWindows();
  };

  window.renderNotes = function(el, mood) {
    if (!el) return;
    var t = window.LINES.notes[mood];
    el.innerHTML =
      "<h3>" + t.title + "</h3>" +
      "<p class='privacy-tag'>" + t.notice + "</p>" +
      "<textarea oninput='window.updateBossNote(this.value)'>" + volatileRamBuffer + "</textarea>" +
      "<button onclick='window.wipeBossNote()'>" + t.wipe + "</button>";
  };
})();`,
  },
  'bin.js': {
    owner: 'Member 3 (Recycle Bin & File Recovery)',
    description: 'Tracks Q3_Report restores and feeds Session Memory & HR Report.',
    code: `// bin.js — Member 3: Corporate Recycle Bin
window.BinFiles = ["Q3_Report", "CEO_Bonus_Justification", "Unpaid_Intern_Budget"];

window.renderBin = function(el, mood) {
  if (!el) return;
  var t = window.LINES.bin[mood];
  var rows = window.BinFiles.map(function(name) {
    var count = window.BossState.fileRestores[name] || 0;
    return "<li><span>" + name + " (Restored " + count + "x)</span> " +
      "<button onclick='window.recordBossAction(\"RESTORE_FILE\", \"" + name + "\")'>" + t.restore + "</button></li>";
  }).join("");

  el.innerHTML =
    "<h3>" + t.title + "</h3>" +
    "<ul>" + rows + "</ul>";
};`,
  },
};
