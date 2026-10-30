/**
 * Ephemeral RAM-Only Notepad & Corporate Reality Distortion Engine (notes.ts)
 * Keeps text strictly in volatile JS memory and never persists to localStorage,
 * sessionStorage, IndexedDB, or network to comply with the personal-data rule.
 */

import { MoodId } from './mood';

export const CORPORATE_BUZZWORDS = [
  'synergy',
  'q3',
  'q4',
  'deliverable',
  'deliverables',
  'bandwidth',
  'circle',
  'holistic',
  'pipeline',
  'stakeholder',
  'leverage',
  'alignment',
  'action',
  'memo',
  'report',
  'calculator',
  'kpi',
  'audit',
  'paradigm',
  'touchpoint',
  'ideate',
  'scalable',
  'accretive',
  'governance',
  'compliance',
  'optimize',
  'streamline',
  'cross-functional',
  'bandwidth-constrained',
];

export type SynergyLevel =
  | 'Depleted'
  | 'Critically Insufficient'
  | 'Acceptable'
  | 'Dangerously High';

export interface NoteMetrics {
  charCount: number;
  wordCount: number;
  jargonCount: number;
  bytesPersistedToDisk: 0;
  // Reality Distortion Metrics
  corporateRelevance: number; // percentage (0.0 to 99.9)
  synergyLevel: SynergyLevel;
  executiveReadiness: string;
  productivityImpact: string;
  performanceReview: string;
}

export interface ApprovalWorkflowStage {
  id: 'submitted' | 'executive_alignment' | 'returned_for_review' | 'approved_pending';
  stepNumber: number;
  totalSteps: number;
  label: string;
  dept: string;
  docket: string;
  badge: string;
  explanation: string;
  eta: string;
}

export const APPROVAL_STAGES: ApprovalWorkflowStage[] = [
  {
    id: 'submitted',
    stepNumber: 1,
    totalSteps: 4,
    label: 'Submitted for Review',
    dept: 'Department of Unnecessary Documentation',
    docket: 'DOC-4031-ALPHA',
    badge: 'PENDING',
    explanation:
      'Your document has been forwarded to the Department of Unnecessary Documentation. It has been placed in an unread queue between two non-urgent calendar invites.',
    eta: 'Est. turnaround: 6–8 business quarters',
  },
  {
    id: 'executive_alignment',
    stepNumber: 2,
    totalSteps: 4,
    label: 'Awaiting Executive Alignment',
    dept: 'Office of Circular Governance',
    docket: 'DOC-4031-BETA',
    badge: 'STALLED IN COMMITTEE',
    explanation:
      'Currently buried in a Senior VP’s 4,219 unread inbox threads. Three cross-functional steering subcommittees must schedule an offsite alignment sync first.',
    eta: 'Status: Blocked by lack of stakeholder consensus',
  },
  {
    id: 'returned_for_review',
    stepNumber: 3,
    totalSteps: 4,
    label: 'Returned for Additional Review',
    dept: 'Bureau of Redundant Compliance',
    docket: 'DOC-4031-GAMMA',
    badge: 'REVISION REQUIRED',
    explanation:
      'Audit rejection: Document failed the clarity threshold. Reviewers noted "Font choice lacks sufficient synergy" and demanded an executive summary of the executive summary.',
    eta: 'Action required: Add 42% more bullet points',
  },
  {
    id: 'approved_pending',
    stepNumber: 4,
    totalSteps: 4,
    label: 'Approved Pending Further Approval',
    dept: 'Supreme Board of Indecision',
    docket: 'DOC-4031-FINAL',
    badge: 'CONDITIONALLY RUBBER-STAMPED',
    explanation:
      'Conditionally stamped by the Committee on Circular Approvals, subject to immediate de-authorization by the Oversight Council of Unactionable Memorandums.',
    eta: 'Valid until next organizational restructure (approx. 47 minutes)',
  },
];

/**
 * Analyses text buffer and returns corporate reality distortion metrics
 */
export function analyzeNoteBuffer(text: string): NoteMetrics {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      charCount: 0,
      wordCount: 0,
      jargonCount: 0,
      bytesPersistedToDisk: 0,
      corporateRelevance: 0,
      synergyLevel: 'Depleted',
      executiveReadiness: 'N/A (Sub-Pencil Draft)',
      productivityImpact: 'Static Inertia (0.0 hr delta)',
      performanceReview:
        'CRITICAL DEFICIT: Buffer is entirely empty. While zero words minimize executive liability, productivity optics remain deeply concerning.',
    };
  }

  const words = trimmed.split(/\s+/);
  let jargonCount = 0;
  const lowerText = text.toLowerCase();

  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (CORPORATE_BUZZWORDS.includes(clean) || clean.includes('q3_report')) {
      jargonCount++;
    }
  }

  // Calculate Corporate Relevance (0.0 - 99.9%)
  const densityBonus = (jargonCount / Math.max(1, words.length)) * 120;
  const lengthBonus = Math.min(25, text.length * 0.1);
  const jargonWeight = jargonCount * 8.5;
  const rawRelevance = 12 + densityBonus + lengthBonus + jargonWeight;
  const corporateRelevance = Math.min(99.9, Math.max(4.2, Math.round(rawRelevance * 10) / 10));

  // Determine Synergy Level
  let synergyLevel: SynergyLevel = 'Critically Insufficient';
  if (jargonCount === 0) {
    synergyLevel = 'Critically Insufficient';
  } else if (jargonCount <= 3) {
    synergyLevel = 'Acceptable';
  } else {
    synergyLevel = 'Dangerously High';
  }

  // Determine Executive Readiness
  let executiveReadiness = 'Tier 4: Sub-Intern';
  if (jargonCount >= 6 || (corporateRelevance > 85 && words.length >= 15)) {
    executiveReadiness = 'Executive Grade A+ (Zero Accountability)';
  } else if (jargonCount >= 3 || corporateRelevance > 60) {
    executiveReadiness = 'Tier 2: VP-Adjacent (Pending Alignment)';
  } else if (jargonCount >= 1 || words.length >= 8) {
    executiveReadiness = 'Tier 3: Middle-Management Plausible';
  }

  // Determine Productivity Impact
  let productivityImpact = '-4.5 hrs (Meeting required to explain this)';
  if (lowerText.includes('asap') || lowerText.includes('urgent')) {
    productivityImpact = 'High Panic Multiplier (+3 Jira tickets spawned)';
  } else if (jargonCount >= 5) {
    productivityImpact = '+240% Theoretical Output (Negative Real Value)';
  } else if (words.length > 25) {
    productivityImpact = '-18.2 hrs (Forwarded to 9 cross-functional committees)';
  } else if (jargonCount === 0) {
    productivityImpact = 'Dangerous Candor (-100% Plausible Deniability)';
  }

  // Sarcastic Corporate Performance Review based on actual text
  let performanceReview = '';
  if (lowerText.includes('q3_report')) {
    performanceReview =
      'AUDIT SENSITIVE: Explicit mention of "Q3_Report" detected. Legal compliance has blind-carbon-copied 14 internal auditors to observe your keystrokes.';
  } else if (jargonCount === 0) {
    performanceReview =
      'CRITICAL AUDIT DEFICIT: Document contains alarming quantities of plain English. HR flagged this draft as an unsanctioned attempt at genuine communication.';
  } else if (jargonCount >= 1 && jargonCount <= 2) {
    performanceReview =
      'MARGINAL COMPLIANCE: Found trace buzzwords. Recommendation: Insert at least three occurrences of "bandwidth" or "holistic alignment" before C-suite distribution.';
  } else if (jargonCount >= 3 && jargonCount <= 5) {
    performanceReview =
      'BUREAUCRATICALLY SOUND: Document successfully obscures all underlying operational reality. Ready for middle-management distribution and polite head-nodding.';
  } else {
    performanceReview =
      'EXECUTIVE MASTERPIECE: Pure unadulterated boardroom gibberish. You have achieved total immunity from actionable accountability.';
  }

  return {
    charCount: text.length,
    wordCount: words.length,
    jargonCount,
    bytesPersistedToDisk: 0, // Strict zero-persistence guarantee
    corporateRelevance,
    synergyLevel,
    executiveReadiness,
    productivityImpact,
    performanceReview,
  };
}

/**
 * Transformation rules dictionary for "Make It More Professional"
 */
interface ReplacementRule {
  pattern: RegExp;
  replacement: string;
}

const PROFESSIONAL_RULES: ReplacementRule[] = [
  {
    pattern: /\b(?:i need to|i have to|we need to|we have to)\b/gi,
    replacement: 'we must strategically leverage our available resources to',
  },
  {
    pattern: /\b(?:i want to|we want to)\b/gi,
    replacement: 'our executive intent is focused on proactively mobilizing to',
  },
  {
    pattern: /\b(?:finish|complete|do)\b/gi,
    replacement: 'facilitate the timely execution of',
  },
  {
    pattern: /\b(?:my assignment|assignment|task|work|job)\b/gi,
    replacement: 'the designated high-priority deliverable',
  },
  {
    pattern: /\b(?:help|assist)\b/gi,
    replacement: 'provide cross-functional synergy enablement',
  },
  {
    pattern: /\b(?:problem|bug|issue|error|mistake)\b/gi,
    replacement: 'strategic optimization opportunity',
  },
  {
    pattern: /\b(?:fix|repair|patch)\b/gi,
    replacement: 're-architect and seamlessly remediate',
  },
  {
    pattern: /\b(?:send|email|write)\b/gi,
    replacement: 'transmit via asynchronous stakeholder alignment channels',
  },
  {
    pattern: /\b(?:meeting|talk|chat|call)\b/gi,
    replacement: 'synchronous high-bandwidth touchpoint',
  },
  {
    pattern: /\b(?:think|decide|guess)\b/gi,
    replacement: 'synthesize holistic stakeholder consensus',
  },
  {
    pattern: /\b(?:later|tomorrow|next week)\b/gi,
    replacement: 'in a subsequent operational sprint pending bandwidth review',
  },
  {
    pattern: /\b(?:now|today|asap|urgent)\b/gi,
    replacement: 'with immediate mission-critical velocity',
  },
  {
    pattern: /\b(?:good|great|nice|cool)\b/gi,
    replacement: 'maximally synergistic and value-accretive',
  },
  {
    pattern: /\b(?:bad|terrible|awful|broken)\b/gi,
    replacement: 'sub-optimal with respect to executive baseline expectations',
  },
  {
    pattern: /\b(?:boss|manager|lead)\b/gi,
    replacement: 'senior leadership steering apparatus',
  },
  {
    pattern: /\b(?:tired|exhausted|bored)\b/gi,
    replacement: 'experiencing cognitive bandwidth depletion during throughput cycles',
  },
  {
    pattern: /\b(?:money|budget|cost|price)\b/gi,
    replacement: 'capital expenditure allocation bandwidth',
  },
  {
    pattern: /\b(?:stop|cancel|quit|drop)\b/gi,
    replacement: 'deprioritize in strict alignment with shifting strategic paradigms',
  },
  {
    pattern: /\b(?:start|begin|launch)\b/gi,
    replacement: 'initiate the phased enterprise deployment of',
  },
  {
    pattern: /\b(?:don't know|dont know|idk|not sure)\b/gi,
    replacement: 'require additional data telemetry before establishing our posture',
  },
  {
    pattern: /\b(?:bye|goodbye|see ya)\b/gi,
    replacement: 'transitioning to offline status per Q3 operational protocol',
  },
];

/**
 * Transforms plain language into absurdly verbose corporate jargon.
 */
export function transformToProfessional(input: string): string {
  if (!input.trim()) {
    return 'We must strategically leverage our available academic resources to facilitate the timely execution of the designated deliverable.';
  }

  let transformed = input;
  let matchesCount = 0;

  for (const rule of PROFESSIONAL_RULES) {
    if (rule.pattern.test(transformed)) {
      transformed = transformed.replace(rule.pattern, rule.replacement);
      matchesCount++;
    }
  }

  // If input was already formal or didn't match specific replacement rules,
  // apply a corporate reality distortion wrapper to guarantee absurdity.
  if (matchesCount === 0) {
    const trimmed = input.trim();
    const cleanPunctuation = trimmed.replace(/[.!?]+$/, '');
    transformed = `Per our holistic governance paradigm, we are proactively positioned to ${cleanPunctuation.charAt(0).toLowerCase() + cleanPunctuation.slice(1)}, thereby driving accretive value across all core Q3 deliverables.`;
  } else {
    // Ensure first character is capitalized
    transformed = transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }

  return transformed;
}

/**
 * Curated list of corporate buzz-phrases for "Add Synergy"
 */
const SYNERGY_INSERTS = [
  ' [holistically aligned with cross-functional Q3 deliverables] ',
  ' [leveraging scalable synergy touchpoints per executive mandate] ',
  ' [actionable bandwidth optimization protocol active] ',
  ' [contingent on stakeholder consensus and governance sign-off] ',
  ' [driving double-digit accretive paradigm velocity] ',
  ' [seamlessly integrated into the enterprise ecosystem] ',
  ' [benchmarked against industry-standard best-practice matrices] ',
];

let synergyInsertIndex = 0;

/**
 * Injects corporate synergy into the text.
 * If text is selected, transforms/wraps the selection.
 * If no text is selected, inserts a rotating buzz-phrase at the cursor.
 */
export function injectSynergy(
  fullText: string,
  selectionStart: number,
  selectionEnd: number
): { text: string; newCursor: number } {
  // If user selected a range of text
  if (selectionEnd > selectionStart) {
    const selected = fullText.slice(selectionStart, selectionEnd);
    const wrapped = `holistically optimized ${selected} (leveraging cross-functional paradigm synergy)`;
    const newText =
      fullText.slice(0, selectionStart) + wrapped + fullText.slice(selectionEnd);
    return {
      text: newText,
      newCursor: selectionStart + wrapped.length,
    };
  }

  // Cursor insertion (or end of text if invalid indices)
  const insertPos = Math.max(0, Math.min(selectionStart, fullText.length));
  const phrase = SYNERGY_INSERTS[synergyInsertIndex % SYNERGY_INSERTS.length];
  synergyInsertIndex++;

  const newText = fullText.slice(0, insertPos) + phrase + fullText.slice(insertPos);
  return {
    text: newText,
    newCursor: insertPos + phrase.length,
  };
}
