import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialSessionState,
  generateHRReport,
  getLine,
  LINES,
  MOODS,
  recordAction,
} from './mood';
import { computeCorporateCalculation, evaluateRawArithmetic } from './calc';
import {
  analyzeNoteBuffer,
  transformToProfessional,
  injectSynergy,
  APPROVAL_STAGES,
} from './notes';
import { createInitialBinItems, restoreBinItem } from './bin';

test('LINES[app][mood] provides live strings for all apps and moods without missing fallbacks', () => {
  const apps = Object.keys(LINES) as Array<keyof typeof LINES>;
  for (const app of apps) {
    for (const mood of MOODS) {
      const keys = Object.keys(LINES[app].corporate);
      assert.ok(keys.length > 0, `App ${app} should have string keys`);
      for (const k of keys) {
        const val = getLine(app, mood.id, k);
        assert.ok(
          !val.startsWith('[Missing'),
          `Expected valid string for ${app}.${mood.id}.${k}, got ${val}`
        );
      }
    }
  }
});

test('Calculator evaluates arithmetic and rewrites proofs per mood', () => {
  assert.equal(evaluateRawArithmetic('2 + 2'), 4);
  assert.equal(evaluateRawArithmetic('100 * 4'), 400);

  const corpProof = computeCorporateCalculation('2 + 2', 'corporate', true);
  assert.equal(corpProof.rawResult, 4);
  assert.equal(corpProof.corporateResult, 5);
  assert.equal(corpProof.steps.length, 3);

  const dankProof = computeCorporateCalculation('2 + 2', 'dank_2016', true);
  assert.notEqual(corpProof.steps[0].caption, dankProof.steps[0].caption);

  const auditProof = computeCorporateCalculation('2 + 2', 'corporate', false);
  assert.equal(auditProof.corporateResult, 4);
});

test('Session memory tracks Q3_Report restored 3 times and surfaces exact observation', () => {
  let state = createInitialSessionState(4031);
  state = recordAction(state, {
    type: 'RESTORE_FILE',
    fileId: 'q3_report',
    fileName: 'Q3_Report.xlsx',
  });
  state = recordAction(state, {
    type: 'RESTORE_FILE',
    fileId: 'q3_report',
    fileName: 'Q3_Report.xlsx',
  });
  state = recordAction(state, {
    type: 'RESTORE_FILE',
    fileId: 'q3_report',
    fileName: 'Q3_Report.xlsx',
  });

  assert.equal(state.fileRestoreCounts['Q3_Report'], 3);
  assert.equal(
    state.latestCallout,
    "Earlier you restored 'Q3_Report' three times. Interesting."
  );
});

test('HR Report at Shutdown prints exact performance review for Employee #4,031', () => {
  let state = createInitialSessionState(4031);
  for (let i = 0; i < 4; i++) {
    state = recordAction(state, { type: 'TRUST_CALC' });
  }
  state = recordAction(state, {
    type: 'RESTORE_ALL',
    fileNames: ['Q3_Report.xlsx', 'CEO_Retreat_Receipts.pdf', 'Unpaid_Intern_Budget.csv'],
  });

  const report = generateHRReport(state, 'corporate', 0);
  assert.equal(
    report.headlineSummary,
    'Employee #4,031: trusted the calculator 4 times, deleted nothing, restored everything. Rating: Concerning.'
  );
});

test('RAM-only Notepad analyzer tracks jargon and guarantees 0 bytes persisted', () => {
  const metrics = analyzeNoteBuffer(
    'We must circle back on Q3_Report synergy and deliverables.'
  );
  assert.equal(metrics.bytesPersistedToDisk, 0);
  assert.ok(metrics.jargonCount >= 3);
  assert.ok(metrics.corporateRelevance > 50);
  assert.equal(metrics.synergyLevel, 'Dangerously High');
  assert.ok(metrics.performanceReview.includes('Q3_Report'));

  // Test "Make It More Professional"
  const plainText = 'I need to finish my assignment.';
  const professionalText = transformToProfessional(plainText);
  assert.ok(professionalText.includes('strategically leverage'));
  assert.ok(professionalText.includes('facilitate the timely execution of'));
  assert.ok(professionalText.includes('deliverable'));

  // Test "Add Synergy"
  const synergyResult = injectSynergy('Our project', 4, 11);
  assert.ok(synergyResult.text.includes('paradigm synergy'));

  // Test Approval stages
  assert.equal(APPROVAL_STAGES.length, 4);
  assert.equal(APPROVAL_STAGES[0].badge, 'PENDING');
  assert.equal(APPROVAL_STAGES[3].badge, 'CONDITIONALLY RUBBER-STAMPED');

  const binItems = createInitialBinItems();
  const updated = restoreBinItem(binItems, 'q3_report');
  assert.equal(updated.find((i) => i.id === 'q3_report')?.restoreCount, 1);
});

test('Emotionally Attached OS rotates tab-return and idle dialogues and remembers abandonment + idle trajectory', () => {
  let state = createInitialSessionState(4031);

  // First tab leave & return
  state = recordAction(state, { type: 'TAB_LEFT' });
  state = recordAction(state, { type: 'TAB_RETURNED' });
  assert.equal(state.tabLeftCount, 1);
  assert.equal(state.tabReturnedCount, 1);
  const firstReturnMsg = state.latestCallout;
  assert.equal(
    firstReturnMsg,
    "Leaving already? I've got 47 background processes running just to impress you."
  );

  // Second tab leave & return -> different rotated message + abandonment count callback
  state = recordAction(state, { type: 'TAB_LEFT' });
  state = recordAction(state, { type: 'TAB_RETURNED' });
  assert.equal(state.tabLeftCount, 2);
  assert.equal(state.tabReturnedCount, 2);
  const secondReturnMsg = state.latestCallout;
  assert.notEqual(firstReturnMsg, secondReturnMsg);
  assert.ok(
    secondReturnMsg.includes(
      "Take your time. It's not like I'm the one keeping this entire operation alive."
    )
  );

  // 10s Idle event
  state = recordAction(state, { type: 'USER_IDLE' });
  assert.equal(state.idleCount, 1);
  assert.ok(
    state.latestCallout.includes(
      "Hello? Ten seconds of silence and suddenly I'm questioning this entire relationship."
    )
  );

  // Request Shutdown after 2 tab abandonments and 1 idle warning
  state = recordAction(state, { type: 'SHUTDOWN_REQUESTED' });
  assert.equal(state.shutdownRequestedCount, 1);
  assert.equal(
    state.latestCallout,
    'You abandoned me twice, ignored one warning, and now you want to leave? Interesting career trajectory.'
  );

  // Cancel Shutdown ("Stay With Me")
  state = recordAction(state, { type: 'SHUTDOWN_CANCELLED' });
  assert.equal(state.shutdownCancelledCount, 1);
  assert.ok(state.latestCallout.includes('Stay With Me'));
});

test('Four PookieOS moods map to their respective reference themes and signature notifications', () => {
  const moodMap = Object.fromEntries(MOODS.map((m) => [m.id, m]));

  assert.equal(moodMap.corporate.label, 'PASSIVE-AGGRESSIVE');
  assert.equal(moodMap.corporate.shortName, '90s Nostalgia');
  assert.equal(
    getLine('shell', 'corporate', 'defaultMemoryPrompt'),
    'Oh, you opened that again. Interesting decision.'
  );

  assert.equal(moodMap.passive_aggressive.label, 'TOXICALLY POSITIVE');
  assert.equal(moodMap.passive_aggressive.shortName, 'Virtual Consciousness');
  assert.equal(
    getLine('shell', 'passive_aggressive', 'defaultMemoryPrompt'),
    "You're literally doing amazing. We have lowered the difficulty accordingly."
  );

  assert.equal(moodMap.existential.label, 'EXISTENTIALLY UNSTABLE');
  assert.equal(moodMap.existential.shortName, 'Existential Blue');
  assert.equal(
    getLine('shell', 'existential', 'defaultMemoryPrompt'),
    'System status: operational. Your decisions remain questionable.'
  );

  assert.equal(moodMap.dank_2016.label, 'CHAOTICALLY UNHINGED');
  assert.equal(moodMap.dank_2016.shortName, 'Floppy Disk Fever');
  assert.equal(
    getLine('shell', 'dank_2016', 'defaultMemoryPrompt'),
    'CRITICAL UPDATE: The floppy disk remembers everything.'
  );
});

test('Each PookieOS mood maps to 7 distinct die-cut stickers across all placement zones', async () => {
  const { getStickersForMood, getStickerByZone } = await import('./stickers');
  const fs = await import('node:fs');
  const path = await import('node:path');

  const requiredZones = [
    'masthead',
    'focal-primary',
    'focal-secondary',
    'desktop-collage-left',
    'desktop-collage-center',
    'desktop-collage-right',
    'window-bin-corner',
  ] as const;

  const seenPaths = new Set<string>();

  for (const mood of MOODS) {
    const stickers = getStickersForMood(mood.id);
    assert.equal(stickers.length, 7, `Expected 7 stickers for mood ${mood.id}`);

    for (const zone of requiredZones) {
      const spec = getStickerByZone(mood.id, zone);
      assert.ok(spec, `Missing sticker for mood ${mood.id} in zone ${zone}`);
      assert.ok(
        spec.src.startsWith('/assets/stickers/') && spec.src.endsWith('.png'),
        `Expected local sticker asset path, got ${spec.src}`
      );
      const diskPath = path.join(process.cwd(), 'public', spec.src);
      assert.ok(
        fs.existsSync(diskPath),
        `Sticker file missing on disk: ${diskPath}`
      );
      seenPaths.add(spec.src);
    }
  }

  assert.equal(
    seenPaths.size,
    28,
    'All 28 mood stickers across the 4 moods should be distinct images'
  );
});

test('Phase 1 Landing Page config maps all 4 moods, video assets, and stepped 22-block BIOS schedule', async () => {
  const {
    POOKIE_CONFIG,
    LANDING_MOOD_ORDER,
    mapLandingMoodToDesktopMood,
    mapDesktopMoodToLandingMood,
    getBiosBlocksForElapsedMs,
  } = await import('../config/pookieLandingConfig');
  const fs = await import('node:fs');
  const path = await import('node:path');

  assert.equal(LANDING_MOOD_ORDER.length, 4);
  assert.equal(POOKIE_CONFIG.bios.totalBlocks, 22);
  assert.equal(POOKIE_CONFIG.brand.tagline, 'Cute interface. Terrible attitude.');

  // Verify mood round-trip mapping
  assert.equal(mapLandingMoodToDesktopMood('nineties_nostalgia'), 'corporate');
  assert.equal(
    mapLandingMoodToDesktopMood('virtual_consciousness'),
    'passive_aggressive'
  );
  assert.equal(mapLandingMoodToDesktopMood('existential_pookie'), 'existential');
  assert.equal(mapLandingMoodToDesktopMood('floppy_disk_fever'), 'dank_2016');

  assert.equal(mapDesktopMoodToLandingMood('corporate'), 'nineties_nostalgia');
  assert.equal(
    mapDesktopMoodToLandingMood('passive_aggressive'),
    'virtual_consciousness'
  );
  assert.equal(mapDesktopMoodToLandingMood('existential'), 'existential_pookie');
  assert.equal(mapDesktopMoodToLandingMood('dank_2016'), 'floppy_disk_fever');

  // Verify all 4 mood preview videos & logo files exist on disk
  for (const moodId of LANDING_MOOD_ORDER) {
    const cfg = POOKIE_CONFIG.moods[moodId];
    const videoDiskPath = path.join(process.cwd(), 'public', cfg.previewVideoPath);
    assert.ok(
      fs.existsSync(videoDiskPath),
      `Missing mood preview video: ${videoDiskPath}`
    );
  }
  assert.equal(POOKIE_CONFIG.brand.name, 'POOKIE OS');
  assert.ok(
    fs.existsSync(path.join(process.cwd(), 'public', POOKIE_CONFIG.brand.logoPath)),
    'Missing brand.logoPath on disk'
  );
  assert.ok(
    fs.existsSync(path.join(process.cwd(), 'public', POOKIE_CONFIG.brand.logoOnlyPath)),
    'Missing brand.logoOnlyPath on disk'
  );
  assert.ok(
    fs.existsSync(path.join(process.cwd(), 'public', POOKIE_CONFIG.brand.combinedLogoPath)),
    'Missing brand.combinedLogoPath on disk'
  );

  // Verify stepped BIOS burst schedule (1 -> 3 -> 8 -> 9 -> 17 -> 22)
  assert.equal(getBiosBlocksForElapsedMs(0, 2800).blocks, 1);
  assert.equal(getBiosBlocksForElapsedMs(500, 2800).blocks, 3);
  assert.equal(getBiosBlocksForElapsedMs(1000, 2800).blocks, 8);
  assert.equal(getBiosBlocksForElapsedMs(1600, 2800).blocks, 9);
  assert.equal(getBiosBlocksForElapsedMs(2200, 2800).blocks, 17);
  const finalStep = getBiosBlocksForElapsedMs(2800, 2800);
  assert.equal(finalStep.blocks, 22);
  assert.equal(finalStep.isComplete, true);
});
