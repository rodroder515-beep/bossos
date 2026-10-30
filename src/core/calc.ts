/**
 * Member 2: Calculator and Corporate Proofs (calc.ts)
 * Safely parses arithmetic expressions and generates mood-reactive
 * step-by-step corporate gaslighting proofs from LINES.calc[mood].
 */

import { getLine, MoodId } from './mood';

export interface CalcProofResult {
  expression: string;
  rawResult: number;
  corporateResult: number;
  formattedResult: string;
  synergyDelta: number;
  gaslightActive: boolean;
  steps: {
    stepNumber: number;
    caption: string;
    equation: string;
  }[];
  theoremName: string;
}

const THEOREMS_BY_MOOD: Record<MoodId, string> = {
  corporate: 'Theorem 4.031 (GAAP-Adjacent Shareholder Uplift Lemma)',
  passive_aggressive: 'Consensus Principle #7 (Emotional Labor Adjustment)',
  dank_2016: 'Illuminati Confirmed Postulate (3 Sides = Q3)',
  existential: 'Axiom of Arbitrary Quarterly Meaning',
};

/**
 * Safe deterministic arithmetic evaluator supporting +, -, *, /, parentheses, and decimals.
 */
export function evaluateRawArithmetic(expr: string): number {
  const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '').trim();
  if (!sanitized) return 0;

  // Tokenize numbers and operators
  const tokens = sanitized.match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);
  if (!tokens || tokens.length === 0) return 0;

  let pos = 0;

  function parseExpression(): number {
    let val = parseTerm();
    while (pos < tokens!.length && (tokens![pos] === '+' || tokens![pos] === '-')) {
      const op = tokens![pos++];
      const right = parseTerm();
      val = op === '+' ? val + right : val - right;
    }
    return val;
  }

  function parseTerm(): number {
    let val = parseFactor();
    while (pos < tokens!.length && (tokens![pos] === '*' || tokens![pos] === '/')) {
      const op = tokens![pos++];
      const right = parseFactor();
      if (op === '*') {
        val = val * right;
      } else {
        val = right === 0 ? 4031 : val / right;
      }
    }
    return val;
  }

  function parseFactor(): number {
    if (pos >= tokens!.length) return 0;
    const token = tokens![pos];
    if (token === '(') {
      pos++;
      const val = parseExpression();
      if (tokens![pos] === ')') pos++;
      return val;
    }
    if (token === '-') {
      pos++;
      return -parseFactor();
    }
    if (token === '+') {
      pos++;
      return parseFactor();
    }
    pos++;
    const num = parseFloat(token);
    return Number.isFinite(num) ? num : 0;
  }

  const result = parseExpression();
  return Number.isFinite(result) ? Math.round(result * 100) / 100 : 0;
}

export function computeCorporateCalculation(
  expression: string,
  mood: MoodId,
  gaslightActive = true
): CalcProofResult {
  const cleanExpr = expression.trim() || '2 + 2';
  const rawResult = evaluateRawArithmetic(cleanExpr);

  // Classic corporate gaslight math:
  // e.g. 2 + 2 -> raw 4 -> +1 Q3 Synergy adjustment = 5
  const synergyDelta =
    rawResult === 4
      ? 1
      : rawResult === 0
      ? 3
      : Math.max(1, Math.round(Math.abs(rawResult) * 0.25));

  const corporateResult = gaslightActive
    ? Math.round((rawResult + synergyDelta) * 100) / 100
    : rawResult;

  const step1Caption = getLine('calc', mood, 'proofAxiom1');
  const step2Caption = getLine('calc', mood, 'proofAxiom2');
  const step3Caption = getLine('calc', mood, 'proofAxiom3');

  return {
    expression: cleanExpr,
    rawResult,
    corporateResult,
    formattedResult: String(corporateResult),
    synergyDelta: gaslightActive ? synergyDelta : 0,
    gaslightActive,
    steps: [
      {
        stepNumber: 1,
        caption: step1Caption,
        equation: `${cleanExpr} = ${rawResult} (raw unaligned units)`,
      },
      {
        stepNumber: 2,
        caption: step2Caption,
        equation: gaslightActive
          ? `${rawResult} + ${synergyDelta} (Q3 Synergy Uplift) = ${corporateResult}`
          : `${rawResult} + 0 (Audit Override) = ${rawResult}`,
      },
      {
        stepNumber: 3,
        caption: step3Caption,
        equation: `∴ ${cleanExpr} ≡ ${corporateResult} [Certified]`,
      },
    ],
    theoremName: THEOREMS_BY_MOOD[mood],
  };
}

export const PRESET_EQUATIONS = [
  { label: '2 + 2 (Synergy Test)', expr: '2 + 2' },
  { label: '100 * 4 (Q3 Budget)', expr: '100 * 4' },
  { label: '40 - 8 (Overtime Hours)', expr: '40 - 8' },
  { label: '12 / 3 (Team Split)', expr: '12 / 3' },
];
