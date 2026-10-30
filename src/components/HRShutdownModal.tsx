import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Award,
  History,
  HeartHandshake,
  DoorOpen,
} from 'lucide-react';
import {
  buildAttachmentTrajectoryLine,
  generateHRReport,
  getLine,
  MoodId,
  SessionAction,
  SessionMemoryState,
} from '../core/mood';

interface HRShutdownModalProps {
  open: boolean;
  mood: MoodId;
  sessionState: SessionMemoryState;
  remainingBinCount: number;
  onSafeExit: () => void;
  onStayWithMe: () => void;
  onAction: (action: SessionAction) => void;
}

export const HRShutdownModal: React.FC<HRShutdownModalProps> = ({
  open,
  mood,
  sessionState,
  remainingBinCount,
  onSafeExit,
  onStayWithMe,
  onAction,
}) => {
  const [copied, setCopied] = useState(false);
  // Two-stage integrated flow:
  // 'confirm' -> Dramatic "Before You Leave..." confirmation window
  // 'farewell' -> Final funny farewell message + full HR Performance Review & Safe Exit
  const [stage, setStage] = useState<'confirm' | 'farewell'>('confirm');

  useEffect(() => {
    if (open) {
      setStage('confirm');
    }
  }, [open]);

  // Safe exit via Escape key at any time
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSafeExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onSafeExit]);

  if (!open) return null;

  const report = generateHRReport(sessionState, mood, remainingBinCount);
  const trajectoryLine = buildAttachmentTrajectoryLine(sessionState);

  const handleCopyReport = () => {
    const fullText = `${report.headlineSummary}\nSession Memory: ${report.specialCallout}\nAttachment Note: ${trajectoryLine}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hr-shutdown-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      {stage === 'confirm' ? (
        /* STAGE 1: Dramatic Confirmation Window ("Before You Leave...") */
        <div
          data-testid="shutdown-drama-window"
          className={`w-full max-w-lg rounded overflow-hidden ${
            mood === 'dank_2016' ? 'dank-static-rainbow-border' : 'pookie-window-frame'
          }`}
        >
          {/* Mood-Themed Title Bar */}
          <div className="pookie-titlebar-active flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-bold border-b border-[var(--pookie-border-outer)]">
            <span id="hr-shutdown-title" data-testid="shutdown-drama-title" className="font-display">
              {getLine('shutdown', mood, 'dramaTitle')}
            </span>
            <button
              type="button"
              onClick={onStayWithMe}
              aria-label="Close Farewell Dialog"
              className="pookie-btn-base px-1.5 py-0.5 text-xs font-mono rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 bg-[var(--pookie-surface-primary)] text-[var(--pookie-text-primary)]">
            <p
              data-testid="shutdown-drama-message"
              className="text-sm sm:text-base font-semibold leading-relaxed"
            >
              “{getLine('shutdown', mood, 'dramaMessage')}”
            </p>

            {/* Session Memory Callback */}
            <div
              data-testid="shutdown-memory-trajectory"
              className="p-3 rounded border border-[var(--pookie-warning-border)] bg-[var(--pookie-warning-bg)] text-[var(--pookie-warning-text)] text-xs font-mono leading-relaxed"
            >
              <strong>Session Memory:</strong> “{trajectoryLine}”
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onStayWithMe}
                data-testid="shutdown-stay-btn"
                className="pookie-btn-accent inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{getLine('shutdown', mood, 'stayBtn')}</span>
              </button>

              <button
                type="button"
                onClick={() => setStage('farewell')}
                data-testid="shutdown-leave-anyway-btn"
                className="pookie-btn-base inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <DoorOpen className="w-4 h-4" />
                <span>{getLine('shutdown', mood, 'leaveAnywayBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STAGE 2: Final Funny Farewell Message + HR Performance Review Card */
        <div
          className={`w-full max-w-3xl rounded-lg overflow-hidden my-auto ${
            mood === 'dank_2016' ? 'dank-static-rainbow-border' : 'pookie-window-frame'
          }`}
        >
          {/* Window Title Bar */}
          <div className="pookie-titlebar-active flex items-center justify-between px-4 py-2 text-xs sm:text-sm font-bold border-b border-[var(--pookie-border-outer)]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span className="font-mono">FORM HR-4031 · DETERMINISTIC PERFORMANCE REVIEW</span>
            </div>
            <button
              type="button"
              onClick={onSafeExit}
              aria-label="Close Review Dialog"
              className="pookie-btn-base px-1.5 py-0.5 text-xs font-mono rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-[var(--pookie-surface-primary)] text-[var(--pookie-text-primary)]">
            {/* Final Farewell Message Banner */}
            <div
              data-testid="shutdown-final-farewell"
              className="mb-4 p-3 rounded border border-[var(--pookie-warning-border)] bg-[var(--pookie-warning-bg)] text-[var(--pookie-warning-text)] text-xs sm:text-sm font-medium leading-relaxed"
            >
              <strong className="font-mono mr-2">
                Parting Message:
              </strong>
              “{getLine('shutdown', mood, 'finalFarewellBanner')}”
            </div>

            {/* Top Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--pookie-border-subtle)]">
              <div>
                <h2
                  id="hr-shutdown-title"
                  className="text-xl sm:text-2xl font-bold font-display tracking-tight"
                >
                  {getLine('shutdown', mood, 'screenTitle')}
                </h2>
                <p className="text-xs text-[var(--pookie-text-secondary)] mt-0.5">
                  {getLine('shutdown', mood, 'screenSubtitle')}
                </p>
              </div>

              {/* Primary Safe Exit CTA at Top Right */}
              <button
                type="button"
                onClick={onSafeExit}
                data-testid="hr-safe-exit-btn"
                className="pookie-btn-accent inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{getLine('shutdown', mood, 'safeExitBtn')}</span>
              </button>
            </div>

            {/* Screenshot-Ready Headline Verdict Box */}
            <div className="my-4 p-4 rounded pookie-surface-card">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--pookie-text-secondary)] mb-2">
                <span className="font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>{getLine('shutdown', mood, 'verdictHeader')}</span>
                </span>
                <span className="font-mono tabular-nums">
                  Employee {report.employeeFormatted} · Rating: {report.rating}
                </span>
              </div>

              <p
                data-testid="hr-headline-summary"
                className="text-base sm:text-xl font-mono font-bold leading-relaxed text-[var(--pookie-text-primary)] select-all"
              >
                “{report.headlineSummary}”
              </p>

              <div className="mt-4 pt-3 border-t border-[var(--pookie-border-subtle)] flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1 text-xs font-mono text-[var(--pookie-text-secondary)]">
                  <p>
                    Session Memory Recall: “{report.specialCallout}”
                  </p>
                  <p>
                    Attachment Verdict: “{report.attachmentCallout}”
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAction({ type: 'SIMULATE_DEMO_4031' })}
                    className="pookie-btn-accent inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Exact #4,031 Demo Counters</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="pookie-btn-base inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{getLine('shutdown', mood, 'copyReportBtn')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Column Breakdown: Behavioral Counters & Session Memory Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded pookie-surface-raised">
                <h3 className="text-xs font-semibold text-[var(--pookie-text-primary)] mb-2.5">
                  {getLine('shutdown', mood, 'metricsHeader')}
                </h3>
                <ul className="space-y-2 text-xs text-[var(--pookie-text-secondary)] font-mono tabular-nums">
                  {report.behavioralBullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded pookie-surface-raised">
                <h3 className="text-xs font-semibold text-[var(--pookie-text-primary)] mb-2.5 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  <span>{getLine('shutdown', mood, 'memoryHeader')}</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-[var(--pookie-text-secondary)] max-h-36 overflow-y-auto">
                  {sessionState.memoryFeed.slice(0, 6).map((entry, idx) => (
                    <li key={idx} className="font-mono leading-relaxed">
                      {idx + 1}. {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Safe Exit Bar */}
            <div className="mt-5 pt-4 border-t border-[var(--pookie-border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--pookie-text-muted)]">
                {getLine('shutdown', mood, 'footerNote')}
              </p>
              <button
                type="button"
                onClick={onSafeExit}
                className="pookie-btn-base px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {getLine('shutdown', mood, 'safeExitBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
