import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { getLine, MoodId, SessionAction } from '../core/mood';
import { computeCorporateCalculation, PRESET_EQUATIONS } from '../core/calc';

interface CalcWindowProps {
  mood: MoodId;
  trustedCount: number;
  disputedCount: number;
  onAction: (action: SessionAction) => void;
}

export const CalcWindow: React.FC<CalcWindowProps> = ({
  mood,
  trustedCount,
  disputedCount,
  onAction,
}) => {
  const [expression, setExpression] = useState<string>('2 + 2');
  const [gaslightActive, setGaslightActive] = useState<boolean>(true);
  const [lastFeedback, setLastFeedback] = useState<'trusted' | 'disputed' | null>(null);

  const proof = computeCorporateCalculation(expression, mood, gaslightActive);

  const handleAppendToken = (token: string) => {
    setExpression((prev) => `${prev}${token}`);
    setLastFeedback(null);
  };

  const handlePreset = (expr: string) => {
    setExpression(expr);
    setLastFeedback(null);
    onAction({ type: 'RUN_CALC', expression: expr });
  };

  const handleTrust = () => {
    setLastFeedback('trusted');
    onAction({
      type: 'TRUST_CALC',
      expression: proof.expression,
      result: proof.formattedResult,
    });
  };

  const handleDispute = () => {
    setLastFeedback('disputed');
    onAction({
      type: 'DISPUTE_CALC',
      expression: proof.expression,
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Top Instrument Bezel: Mode Switcher & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-[var(--pookie-border-subtle)]">
        <p className="text-[11px] font-medium text-[var(--pookie-text-secondary)] truncate">
          {getLine('calc', mood, 'subtitle')}
        </p>
        <div
          className="inline-flex rounded p-0.5 border border-[var(--pookie-border-outer)] bg-[var(--pookie-surface-secondary)] shrink-0"
          role="group"
          aria-label="Calculator Math Mode"
        >
          <button
            type="button"
            onClick={() => setGaslightActive(true)}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              gaslightActive
                ? 'pookie-btn-accent'
                : 'text-[var(--pookie-text-secondary)] hover:text-[var(--pookie-text-primary)]'
            }`}
          >
            {getLine('calc', mood, 'modeGaslight')}
          </button>
          <button
            type="button"
            onClick={() => setGaslightActive(false)}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              !gaslightActive
                ? 'pookie-btn-accent'
                : 'text-[var(--pookie-text-secondary)] hover:text-[var(--pookie-text-primary)]'
            }`}
          >
            {getLine('calc', mood, 'modeAudit')}
          </button>
        </div>
      </div>

      {/* Recessed Retro LCD / LED Readout Screen & Tactile Keypad */}
      <div className="pookie-surface-card p-2.5 rounded">
        <div className="flex items-center justify-between gap-2 mb-1">
          <label
            htmlFor="boss-calc-input"
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--pookie-text-secondary)] shrink-0"
          >
            {getLine('calc', mood, 'inputLabel')}
          </label>
          <span className="text-[10px] font-mono tabular-nums text-[var(--pookie-text-muted)] truncate">
            {proof.theoremName}
          </span>
        </div>

        {/* Recessed LCD Readout Strip */}
        <div className="pookie-terminal-screen p-2 rounded flex items-center gap-2 shadow-inner">
          <input
            id="boss-calc-input"
            type="text"
            value={expression}
            onChange={(e) => {
              setExpression(e.target.value);
              setLastFeedback(null);
            }}
            aria-label={getLine('calc', mood, 'inputLabel')}
            className="w-full bg-transparent px-1.5 py-0.5 text-sm font-mono font-bold tabular-nums text-[var(--pookie-terminal-text)] focus:outline-none focus:ring-1 focus:ring-[var(--pookie-terminal-prompt)] rounded"
          />
          <span className="text-sm font-mono font-bold text-[var(--pookie-terminal-prompt)]">
            =
          </span>
          <div
            data-testid="calc-certified-output"
            className="pookie-badge-highlight px-2.5 py-0.5 rounded font-mono text-base font-black tabular-nums shrink-0"
          >
            {proof.formattedResult}
          </div>
        </div>

        {/* Tactile Calculator Keypad Grid (2 rows, zero text clipping) */}
        <div className="mt-2 grid grid-cols-4 gap-1">
          {PRESET_EQUATIONS.map((preset) => (
            <button
              key={preset.expr}
              type="button"
              onClick={() => handlePreset(preset.expr)}
              title={preset.label}
              aria-label={preset.label}
              className={`px-2 py-1 text-[11px] font-mono font-bold rounded transition-colors cursor-pointer truncate ${
                expression.trim() === preset.expr ? 'pookie-btn-accent' : 'pookie-btn-base'
              }`}
            >
              {preset.expr}
            </button>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-3 gap-1">
          {[' + 1', ' * 2', ' - 3'].map((tok) => (
            <button
              key={tok}
              type="button"
              onClick={() => handleAppendToken(tok)}
              className="pookie-btn-base px-2 py-1 text-[11px] font-mono font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
            >
              {tok.trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Archival Stamped Corporate Proof Ledger */}
      <div className="pookie-surface-raised p-2.5 rounded">
        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[var(--pookie-border-subtle)]">
          <h3 className="text-[11px] font-bold font-mono uppercase tracking-tight flex items-center gap-1.5 text-[var(--pookie-text-primary)] truncate">
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{getLine('calc', mood, 'proofHeading')}</span>
          </h3>
          <span className="text-[10px] font-mono tabular-nums text-[var(--pookie-text-secondary)] shrink-0">
            Raw: {proof.rawResult} → Cert: {proof.corporateResult}
          </span>
        </div>

        <ol className="space-y-1 text-[11px]">
          {proof.steps.map((step) => (
            <li
              key={step.stepNumber}
              className="flex items-center justify-between gap-2 py-0.5 border-b border-[var(--pookie-border-subtle)] last:border-b-0"
            >
              <span className="text-[var(--pookie-text-secondary)] truncate">
                {step.caption}
              </span>
              <code className="font-mono tabular-nums font-bold shrink-0 text-[var(--pookie-text-primary)]">
                {step.equation}
              </code>
            </li>
          ))}
        </ol>
      </div>

      {/* Trust / Dispute Action Bar (feeds Session Memory & HR Report) */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={handleTrust}
          className="pookie-btn-accent inline-flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-semibold rounded transition-colors cursor-pointer truncate"
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{getLine('calc', mood, 'trustBtn')}</span>
          <span className="font-mono tabular-nums opacity-90 shrink-0">
            ({trustedCount})
          </span>
        </button>

        <button
          type="button"
          onClick={handleDispute}
          className="pookie-btn-base inline-flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-medium rounded transition-colors cursor-pointer truncate"
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{getLine('calc', mood, 'disputeBtn')}</span>
          <span className="font-mono tabular-nums opacity-85 shrink-0">
            ({disputedCount})
          </span>
        </button>
      </div>

      {lastFeedback && (
        <p
          role="status"
          className="text-[11px] flex items-center gap-1.5 font-medium text-[var(--pookie-text-secondary)]"
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {lastFeedback === 'trusted'
              ? getLine('calc', mood, 'statusTrusted')
              : getLine('calc', mood, 'statusDisputed')}
          </span>
        </p>
      )}
    </div>
  );
};
