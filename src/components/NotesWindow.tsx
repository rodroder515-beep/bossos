import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Trash2,
  Sparkles,
  Zap,
  FileCheck2,
  Undo2,
  AlertCircle,
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  Send,
  XCircle,
} from 'lucide-react';
import { getLine, MoodId, SessionAction } from '../core/mood';
import {
  analyzeNoteBuffer,
  transformToProfessional,
  injectSynergy,
  APPROVAL_STAGES,
  ApprovalWorkflowStage,
} from '../core/notes';

interface NotesWindowProps {
  mood: MoodId;
  onAction: (action: SessionAction) => void;
}

const DEFAULT_NOTE_TEXT =
  'MEMO: Restored Q3_Report from the Recycle Bin to verify the calculator synergy numbers. We need to finish our work before the meeting tomorrow.';

export const NotesWindow: React.FC<NotesWindowProps> = ({ mood, onAction }) => {
  // RULE COMPLIANCE: Ephemeral React state in volatile JS memory only.
  // Never reads or writes localStorage, sessionStorage, IndexedDB, or server storage.
  const [noteText, setNoteText] = useState<string>(DEFAULT_NOTE_TEXT);
  const [history, setHistory] = useState<string[]>([DEFAULT_NOTE_TEXT]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [activeApprovalStageIndex, setActiveApprovalStageIndex] = useState<number | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bannerTimeoutRef = useRef<number | null>(null);

  const metrics = analyzeNoteBuffer(noteText);

  // Helper to show temporary feedback toast in the window
  const showFeedback = (msg: string) => {
    setBannerMessage(msg);
    if (bannerTimeoutRef.current) {
      window.clearTimeout(bannerTimeoutRef.current);
    }
    bannerTimeoutRef.current = window.setTimeout(() => {
      setBannerMessage(null);
    }, 4500);
  };

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, []);

  // Push new text to undo history stack
  const pushHistory = (newText: string) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newText);
    if (updatedHistory.length > 25) {
      updatedHistory.shift();
    }
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setNoteText(newText);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    pushHistory(val);
    onAction({ type: 'EDIT_NOTE', charCount: val.length });
  };

  const handleSelectionTrack = () => {
    if (textareaRef.current) {
      setSelectionRange({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      });
    }
  };

  // FEATURE 2: MAKE IT MORE PROFESSIONAL
  const handleMakeProfessional = () => {
    const currentText = noteText;
    const start = selectionRange.start;
    const end = selectionRange.end;

    let nextText: string;
    if (end > start) {
      // Transform only the selected chunk
      const selectedChunk = currentText.slice(start, end);
      const transformedChunk = transformToProfessional(selectedChunk);
      nextText =
        currentText.slice(0, start) + transformedChunk + currentText.slice(end);
      showFeedback('Transformed selected text into C-suite corporate jargon!');
    } else {
      // Transform entire buffer
      nextText = transformToProfessional(currentText);
      showFeedback('Entire document upgraded to maximum bureaucratic verbosity!');
    }

    pushHistory(nextText);
    onAction({ type: 'EDIT_NOTE', charCount: nextText.length });

    // Restore focus to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  // FEATURE 3: ADD SYNERGY
  const handleAddSynergy = () => {
    const start = selectionRange.start;
    const end = selectionRange.end;
    const result = injectSynergy(noteText, start, end);

    pushHistory(result.text);
    onAction({ type: 'EDIT_NOTE', charCount: result.text.length });

    if (end > start) {
      showFeedback('Wrapped selection in scalable Q3 paradigm synergy!');
    } else {
      showFeedback('Injected mission-critical corporate buzz-clause at cursor!');
    }

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(result.newCursor, result.newCursor);
      }
    }, 50);
  };

  // FEATURE 4: REQUEST APPROVAL WORKFLOW
  const handleRequestApproval = () => {
    if (activeApprovalStageIndex === null) {
      setActiveApprovalStageIndex(0);
      showFeedback('Docket created! Document routed to Department of Unnecessary Documentation.');
    } else {
      const nextIndex = (activeApprovalStageIndex + 1) % APPROVAL_STAGES.length;
      setActiveApprovalStageIndex(nextIndex);
      showFeedback(`Approval status updated: ${APPROVAL_STAGES[nextIndex].badge}`);
    }
  };

  const handleDismissApproval = () => {
    setActiveApprovalStageIndex(null);
  };

  // FEATURE 6: UNDO & USER CONTROL
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevText = history[prevIndex];
      setHistoryIndex(prevIndex);
      setNoteText(prevText);
      showFeedback('Undo applied. Restored previous buffer revision.');
      onAction({ type: 'EDIT_NOTE', charCount: prevText.length });
    }
  };

  // Wipe with automatic undo save
  const handleWipe = () => {
    if (noteText.trim() === '') return;
    pushHistory('');
    onAction({ type: 'WIPE_NOTE' });
    showFeedback('RAM buffer shredded to 0 bytes. (Click Undo to restore if needed).');
  };

  // Pre-written template memos
  const handleLoadTemplate = (
    templateKey: 'templateAlibiText' | 'templateSynergyText' | 'templateApologyText'
  ) => {
    const nextText = getLine('notes', mood, templateKey);
    pushHistory(nextText);
    onAction({ type: 'EDIT_NOTE', charCount: nextText.length });
    showFeedback('Loaded official corporate template memo.');
  };

  const activeStage: ApprovalWorkflowStage | null =
    activeApprovalStageIndex !== null
      ? APPROVAL_STAGES[activeApprovalStageIndex]
      : null;

  const hasSelection = selectionRange.end > selectionRange.start;

  // Synergy level badge color mapping
  const synergyBadgeStyle =
    metrics.synergyLevel === 'Dangerously High'
      ? 'bg-[var(--pookie-warning-bg)] text-[var(--pookie-warning-text)] border-[var(--pookie-warning-border)]'
      : metrics.synergyLevel === 'Acceptable'
        ? 'bg-[var(--pookie-surface-secondary)] text-[var(--pookie-text-primary)] border-[var(--pookie-border-subtle)]'
        : 'bg-[var(--pookie-danger-bg)] text-[var(--pookie-danger-text)] border-[var(--pookie-danger-border)]';

  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* 1. PRIMARY CORPORATE DISTORTION ACTION TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-[var(--pookie-border-subtle)]">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleMakeProfessional}
            data-testid="notes-btn-professional"
            title="Translate simple human sentences into opaque C-suite corporate jargon"
            className="pookie-btn-base inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded transition-transform cursor-pointer whitespace-nowrap active:translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Make It More Professional</span>
            {hasSelection && (
              <span className="text-[10px] opacity-75 font-mono px-1 py-0.2 bg-black/10 rounded">
                Selection
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleAddSynergy}
            data-testid="notes-btn-synergy"
            title="Inject high-velocity corporate buzzwords at cursor or wrap around selection"
            className="pookie-btn-base inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-transform cursor-pointer whitespace-nowrap active:translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Add Synergy</span>
          </button>

          <button
            type="button"
            onClick={handleRequestApproval}
            data-testid="notes-btn-approval"
            title="Submit document to circular multi-department bureaucratic review"
            className="pookie-btn-base inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-transform cursor-pointer whitespace-nowrap active:translate-y-0.5"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Request Approval</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            data-testid="notes-btn-undo"
            title="Undo last text transformation"
            className="pookie-btn-base inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            type="button"
            onClick={handleWipe}
            data-testid="notes-btn-wipe"
            title="Shred volatile RAM buffer (Undoable)"
            className="pookie-btn-danger inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{getLine('notes', mood, 'wipeBtn')}</span>
          </button>
        </div>
      </div>

      {/* 2. PRE-WRITTEN ALIBI TEMPLATES BAR */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--pookie-text-secondary)]">
        <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
          Official Memos:
        </span>
        <button
          type="button"
          onClick={() => handleLoadTemplate('templateAlibiText')}
          className="pookie-surface-card px-2 py-0.5 text-[11px] font-medium rounded hover:bg-[var(--pookie-surface-raised)] cursor-pointer"
        >
          {getLine('notes', mood, 'templateAlibiBtn')}
        </button>
        <button
          type="button"
          onClick={() => handleLoadTemplate('templateSynergyText')}
          className="pookie-surface-card px-2 py-0.5 text-[11px] font-medium rounded hover:bg-[var(--pookie-surface-raised)] cursor-pointer"
        >
          {getLine('notes', mood, 'templateSynergyBtn')}
        </button>
        <button
          type="button"
          onClick={() => handleLoadTemplate('templateApologyText')}
          className="pookie-surface-card px-2 py-0.5 text-[11px] font-medium rounded hover:bg-[var(--pookie-surface-raised)] cursor-pointer"
        >
          {getLine('notes', mood, 'templateApologyBtn')}
        </button>
      </div>

      {/* 3. INTERACTIVE APPROVAL WORKFLOW BANNER (FEATURE 4) */}
      {activeStage && (
        <div
          data-testid="notes-approval-workflow"
          className="p-2.5 rounded border border-[var(--pookie-border-outer)] bg-[var(--pookie-surface-secondary)] flex flex-col gap-2 text-xs animate-in fade-in slide-in-from-top-1"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--pookie-border-subtle)] pb-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{activeStage.dept}</span>
              <span className="font-mono text-[10px] text-[var(--pookie-text-muted)]">
                [{activeStage.docket}]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-current bg-white/40">
                {activeStage.badge}
              </span>
              <button
                type="button"
                onClick={handleDismissApproval}
                aria-label="Dismiss approval banner"
                className="hover:opacity-75 cursor-pointer text-[var(--pookie-text-muted)]"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[11px] leading-relaxed">
            <p className="text-[var(--pookie-text-primary)] font-medium">
              {activeStage.explanation}
            </p>
            <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[var(--pookie-text-muted)] pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activeStage.eta}</span>
              </span>
              <span>
                Workflow Stage {activeStage.stepNumber} of {activeStage.totalSteps}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--pookie-border-subtle)]">
            <button
              type="button"
              onClick={handleRequestApproval}
              className="pookie-btn-base inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>
                {activeStage.stepNumber < activeStage.totalSteps
                  ? 'Expedite to Next Committee ↵'
                  : 'Re-Appeal Rubber Stamp ↵'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 4. TEMPORARY NOTIFICATION TOAST */}
      {bannerMessage && (
        <div
          data-testid="notes-toast-feedback"
          className="px-2.5 py-1.5 rounded bg-[var(--pookie-surface-raised)] border border-[var(--pookie-border-outer)] text-xs flex items-center gap-2 shadow-xs"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-medium text-[var(--pookie-text-primary)]">
            {bannerMessage}
          </span>
        </div>
      )}

      {/* 5. EPHEMERAL TEXTAREA WITH SELECTION DETECTION */}
      <div>
        <div className="flex items-center justify-between pb-1 text-[11px] font-mono text-[var(--pookie-text-muted)]">
          <label htmlFor="boss-ram-notepad" className="font-medium">
            Volatile Reality Distortion Buffer:
          </label>
          <span>
            {hasSelection
              ? `Selected: ${selectionRange.end - selectionRange.start} chars`
              : 'Cursor ready (no selection)'}
          </span>
        </div>
        <textarea
          ref={textareaRef}
          id="boss-ram-notepad"
          rows={6}
          value={noteText}
          onChange={handleTextChange}
          onSelect={handleSelectionTrack}
          onKeyUp={handleSelectionTrack}
          onMouseUp={handleSelectionTrack}
          placeholder={getLine('notes', mood, 'placeholder')}
          data-testid="notes-textarea"
          className="pookie-surface-inset w-full p-3 text-xs leading-relaxed font-mono rounded focus:outline-none focus:ring-2 focus:ring-[var(--pookie-focus-ring)] resize-y"
        />
      </div>

      {/* 6. FEATURE 1: CORPORATE SIGNIFICANCE ANALYSER */}
      <div
        data-testid="notes-corporate-significance"
        className="pookie-surface-card p-2.5 rounded border border-[var(--pookie-border-outer)] flex flex-col gap-2 text-xs"
      >
        <div className="flex items-center justify-between border-b border-[var(--pookie-border-subtle)] pb-1">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
            <TrendingUp className="w-3.5 h-3.5 text-[var(--pookie-accent)]" />
            <span>Corporate Significance Telemetry</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--pookie-text-muted)]">
            Live Stream v4.031
          </span>
        </div>

        {/* 2x2 Significance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Metric 1: Corporate Relevance */}
          <div className="p-2 rounded bg-[var(--pookie-surface-raised)] border border-[var(--pookie-border-subtle)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--pookie-text-secondary)]">Corporate Relevance:</span>
              <span
                data-testid="notes-metric-relevance"
                className="font-mono font-bold text-[13px] text-[var(--pookie-accent)]"
              >
                {metrics.corporateRelevance.toFixed(1)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--pookie-accent)] transition-all duration-300"
                style={{ width: `${metrics.corporateRelevance}%` }}
              />
            </div>
            <span className="text-[10px] text-[var(--pookie-text-muted)] leading-tight">
              Calculated via buzzword density & stakeholder alignment
            </span>
          </div>

          {/* Metric 2: Synergy Level */}
          <div className="p-2 rounded bg-[var(--pookie-surface-raised)] border border-[var(--pookie-border-subtle)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--pookie-text-secondary)]">Synergy Level:</span>
              <span
                data-testid="notes-metric-synergy"
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border font-mono ${synergyBadgeStyle}`}
              >
                {metrics.synergyLevel}
              </span>
            </div>
            <span className="text-[10px] text-[var(--pookie-text-muted)] leading-tight mt-1">
              {metrics.jargonCount >= 4
                ? 'Boardroom liability threshold exceeded'
                : metrics.jargonCount >= 1
                  ? 'Acceptable bureaucratic compliance'
                  : 'Alarming absence of corporate buzzwords'}
            </span>
          </div>

          {/* Metric 3: Executive Readiness */}
          <div className="p-2 rounded bg-[var(--pookie-surface-raised)] border border-[var(--pookie-border-subtle)] flex flex-col gap-1">
            <span className="text-[11px] text-[var(--pookie-text-secondary)]">
              Executive Readiness:
            </span>
            <span
              data-testid="notes-metric-readiness"
              className="font-mono font-bold text-[11px] text-[var(--pookie-text-primary)] truncate"
            >
              {metrics.executiveReadiness}
            </span>
            <span className="text-[10px] text-[var(--pookie-text-muted)] leading-tight">
              Audit resilience and plausible deniability rating
            </span>
          </div>

          {/* Metric 4: Productivity Impact */}
          <div className="p-2 rounded bg-[var(--pookie-surface-raised)] border border-[var(--pookie-border-subtle)] flex flex-col gap-1">
            <span className="text-[11px] text-[var(--pookie-text-secondary)]">
              Productivity Impact:
            </span>
            <span
              data-testid="notes-metric-productivity"
              className="font-mono font-bold text-[11px] text-[var(--pookie-text-primary)] truncate"
            >
              {metrics.productivityImpact}
            </span>
            <span className="text-[10px] text-[var(--pookie-text-muted)] leading-tight">
              Net friction introduced to the enterprise
            </span>
          </div>
        </div>

        {/* 7. FEATURE 5: CORPORATE PERFORMANCE REVIEW */}
        <div
          data-testid="notes-performance-review"
          className="mt-1 p-2 rounded bg-[var(--pookie-surface-raised)] border-l-4 border-[var(--pookie-border-outer)] flex items-start gap-2 text-[11px]"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--pookie-text-secondary)]">
              Real-Time Corporate Performance Review
            </span>
            <p className="text-[var(--pookie-text-primary)] leading-normal">
              {metrics.performanceReview}
            </p>
          </div>
        </div>
      </div>

      {/* 8. STANDARD RETRO STATUS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[var(--pookie-text-secondary)] border-t border-[var(--pookie-border-subtle)]">
        <div className="flex items-center gap-2 font-mono tabular-nums text-[11px]">
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>{metrics.charCount} chars</span>
          <span aria-hidden="true">·</span>
          <span>{metrics.wordCount} words</span>
          <span aria-hidden="true">·</span>
          <span className="font-bold">
            {getLine('notes', mood, 'jargonLabel')}: {metrics.jargonCount}
          </span>
        </div>
        <span className="font-mono tabular-nums text-[11px] text-[var(--pookie-text-muted)]">
          {getLine('notes', mood, 'memoryStatus')} ({metrics.bytesPersistedToDisk}B saved)
        </span>
      </div>
    </div>
  );
};
