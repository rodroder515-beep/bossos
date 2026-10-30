import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, ShieldAlert } from 'lucide-react';
import {
  generateHRReport,
  getLine,
  MoodId,
  SessionAction,
  SessionMemoryState,
} from '../core/mood';

interface TerminalWindowProps {
  mood: MoodId;
  sessionState: SessionMemoryState;
  remainingBinCount: number;
  onAction: (action: SessionAction) => void;
}

interface TermLine {
  id: number;
  command?: string;
  output: string | string[];
  isNotice?: boolean;
}

const SYNERGY_TEMPLATES = [
  'Synergy increased by 47.2%. No measurable operational change detected.',
  'Cross-functional alignment delta evaluated at 138.4%. Theoretical throughput up; actual deliverables halted pending consensus.',
  'Holistic bandwidth optimization achieved: 2 + 2 = 5 confirmed by Theorem 4.031. Zero personal data reached disk.',
  'Synergy vector rotated 90 degrees into executive quadrant. All action items converted into non-binding discussion points.',
  'Quarterly synergy index: 125.0%. Enterprise friction elevated by 314% per GAAP guidelines.',
  'Synergy equilibrium reached: 14 departments are currently waiting for 14 other departments to schedule a pre-alignment sync.',
];

let synergyCallCounter = 0;

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  mood,
  sessionState,
  remainingBinCount,
  onAction,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<TermLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal output to the newest message
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCommand = (rawCmd?: string) => {
    const cmd = (rawCmd ?? inputVal).trim().toLowerCase();
    if (!cmd) return;

    // Track command execution in session memory
    onAction({ type: 'RUN_COMMAND', command: cmd });

    // Update command history for Up/Down arrow navigation
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // 1. HELP COMMAND
    if (cmd === 'help') {
      const outputLines = [
        '======================================================================',
        'POOKIEOS COMMAND DIRECTORY // CLASSIFICATION: POINTLESS BUREAUCRACY',
        '======================================================================',
        'help          Displays this circular directory of approved directives.',
        'status        Compiles unverified operational metrics into a non-report.',
        'audit         Initiates deep surveillance into harmless session keystrokes.',
        'synergy       Calculates cross-functional alignment delta (always net zero).',
        'productivity  Produces an executive evaluation recommending no action.',
        'meeting       Schedules an emergency sync to discuss meeting necessity.',
        'appeal        Petitions the Bureau of Arbitrary Decisions for amnesty.',
        'hr            Previews Employee #4031 performance review Form HR-4031.',
        'clear         Archives screen buffer into permanent compliance vault.',
        '======================================================================',
        'Note: Executing any command constitutes binding consent to further audits.',
      ];
      appendOutput(cmd, outputLines);
    }

    // 2. STATUS COMMAND
    else if (cmd === 'status') {
      const q3Restores = sessionState.fileRestoreCounts['Q3_Report'] || 0;
      const totalRestores = sessionState.restoredFilesCount;
      const trusted = sessionState.trustedCalcCount;
      const disputed = sessionState.disputedCalcCount;
      const tabLeft = sessionState.tabLeftCount;
      const idleCount = sessionState.idleCount;

      const outputLines = [
        '======================================================================',
        'POOKIEOS CORPORATE STATUS REPORT // CLASSIFICATION: UNVERIFIED',
        '======================================================================',
        `Subject Identity:       Employee #${sessionState.employeeId}`,
        'Productivity:           Under review (Pending indefinite review)',
        'Synergy Index:          125.0% (Unverified by Theorem 4.031)',
        'Operational Efficiency: 3.41% (±0.02% error margin)',
        `Active Evidence Loops:  Q3_Report restored ${q3Restores}x (Total file restores: ${totalRestores})`,
        `Calculator Compliance:  Trusted: ${trusted}x | Disputed: ${disputed}x`,
        `Tab Loyalty Quotient:   Abandoned tab ${tabLeft} time(s) for outside distractions`,
        `Idle Friction Warnings: ${idleCount} episode(s) of unauthorized silence`,
        'Pending Reviews:        17',
        'Completed Reviews:      0',
        'Review Status:          Awaiting review of the review status protocol',
        '======================================================================',
      ];
      appendOutput(cmd, outputLines);
    }

    // 3. AUDIT COMMAND
    else if (cmd === 'audit') {
      const trusted = sessionState.trustedCalcCount;
      const disputed = sessionState.disputedCalcCount;
      const q3Restores = sessionState.fileRestoreCounts['Q3_Report'] || 0;
      const tabLeft = sessionState.tabLeftCount;
      const idleCount = sessionState.idleCount;

      const incidents: string[] = [];

      if (trusted > 0) {
        incidents.push(
          `• Incident 001: Employee trusted non-Euclidean corporate math (${trusted}x). Mathematical flexibility classified as high risk.`
        );
      }
      if (disputed > 0) {
        incidents.push(
          `• Incident 002: Employee challenged certified synergy calculations (${disputed}x). Flagged for executive skepticism.`
        );
      }
      if (q3Restores > 0) {
        incidents.push(
          `• Incident 003: Evidence tampering detected in Recycle Bin (Q3_Report restored ${q3Restores}x). Refusal to let past reports rest in peace.`
        );
      }
      if (tabLeft > 0) {
        incidents.push(
          `• Incident 004: Divided attention breach: User abandoned terminal for rival browser tabs (${tabLeft} departure(s)).`
        );
      }
      if (idleCount > 0) {
        incidents.push(
          `• Incident 005: Unproductive contemplation: ${idleCount} idle timeout event(s) logged by surveillance kernel.`
        );
      }

      // Absurd baseline incidents guaranteed to appear
      incidents.push(
        '• Incident 006: User attempted to measure operational productivity.',
        '• Incident 007: Productivity measurement procedure failed to generate measurable productivity.',
        '• Incident 008: Terminal prompt remained idle while waiting for user compliance.'
      );

      const outputLines = [
        '[AUDIT-KERNEL] Probing volatile RAM memory buffer for infractions...',
        '[AUDIT-KERNEL] Cross-referencing Employee #4031 telemetry with 1994 Shareware Accord...',
        '[AUDIT-KERNEL] COMPLIANCE INCIDENTS IDENTIFIED:',
        ...incidents,
        '----------------------------------------------------------------------',
        'RECOMMENDATION: Schedule a mandatory 3-hour pre-audit alignment sync',
        'to establish consensus on future audit scheduling frameworks.',
      ];
      appendOutput(cmd, outputLines);
    }

    // 4. SYNERGY COMMAND
    else if (cmd === 'synergy') {
      const text = SYNERGY_TEMPLATES[synergyCallCounter % SYNERGY_TEMPLATES.length];
      synergyCallCounter++;
      appendOutput(cmd, [
        `[SYNERGY] Running cross-departmental alignment calculation...`,
        `[SYNERGY] Output: ${text}`,
      ]);
    }

    // 5. PRODUCTIVITY COMMAND
    else if (cmd === 'productivity') {
      const outputLines = [
        '======================================================================',
        'EXECUTIVE PRODUCTIVITY ASSESSMENT // FORM PROD-4031',
        '======================================================================',
        `Subject: Employee #${sessionState.employeeId} | Evaluation Window: Current Fiscal Micro-Sprint`,
        'Raw Input Velocity:       14 keystrokes / minute (Theoretical Baseline: 140 wpm)',
        'Productive Value Accrued: ±0.0000 Net Currency Units',
        'Velocity Vector:          High motion detected with zero observable displacement',
        'Bottleneck Diagnostic:    Current workflow is bottle-necked by previous workflows',
        'Strategic Alignment:      100% compliant with inertia directives',
        '----------------------------------------------------------------------',
        'RECOMMENDATION: Maintain existing suboptimal trajectory until external market',
        'forces render current deliverables obsolete. Do not attempt self-improvement.',
        '======================================================================',
      ];
      appendOutput(cmd, outputLines);
    }

    // 6. MEETING COMMAND
    else if (cmd === 'meeting') {
      const outputLines = [
        '[MEETING-SCHEDULER] Initializing emergency calendar sync...',
        '[SYNC] Preparing meeting agenda (Duration: 90 mins, No Breaks allowed)...',
        '[SYNC] Requesting executive alignment across 14 competing time zones...',
        '[SYNC] Waiting for senior stakeholder calendar sign-off...',
        '----------------------------------------------------------------------',
        '[SCHEDULED] Meeting Confirmed: "Pre-Alignment Sync Regarding Terminal Performance Alignment & Agenda Optimization"',
        `Attendees: Employee #${sessionState.employeeId}, 8 Silent Observers, 1 AI Notetaker that will transcribe everything incorrectly.`,
        'Outcome: Meeting concluded that an additional follow-up meeting is required to review meeting necessity.',
      ];
      appendOutput(cmd, outputLines);
    }

    // 7. APPEAL COMMAND
    else if (cmd === 'appeal') {
      const outputLines = [
        '[APPEAL-DISPATCH] Ingesting Petition #AP-9902 regarding compliance infractions...',
        '[APPEAL-DISPATCH] Routing grievance to Appellate Subcommittee on Premature Grievances...',
        '[APPEAL-DISPATCH] Deliberating for 0.4 seconds...',
        '----------------------------------------------------------------------',
        '[VERDICT] APPEAL REJECTED: Reason Code 403-CIRCULAR:',
        '"Appeal rejected because the review process for reviewing appeals has not yet been approved by the Governance Board."',
        '----------------------------------------------------------------------',
        'Advisory Note: Further appeals will be treated as additional compliance infractions.',
      ];
      appendOutput(cmd, outputLines);
    }

    // 8. HR COMMAND (Preview Form HR-4031)
    else if (cmd === 'hr') {
      const report = generateHRReport(sessionState, mood, remainingBinCount);
      const outputLines = [
        `======================================================================`,
        `HR PERFORMANCE AUDIT // FORM HR-4031`,
        `======================================================================`,
        report.headlineSummary,
        `Performance Rating:    ${report.rating}`,
        `Attachment Callout:    ${report.attachmentCallout}`,
        `Special Observation:   ${report.specialCallout}`,
        `Mood Recommendation:   ${report.moodRecommendation}`,
        `======================================================================`,
      ];
      appendOutput(cmd, outputLines);
    }

    // 9. CLEAR COMMAND
    else if (cmd === 'clear') {
      setHistory([
        {
          id: Date.now(),
          output: [
            '[TERMINAL RESET] Screen buffer purged from local screen.',
            '[COMPLIANCE ARCHIVE] 100% of erased keystrokes have been permanently vaulted in Employee #4031\'s surveillance log.',
          ],
          isNotice: true,
        },
      ]);
      setInputVal('');
      return;
    }

    // UNKNOWN COMMAND
    else {
      const outputLines = [
        `Directive "${cmd}" not recognized by Executive Order #4031.`,
        `Syntax Error: Directive failed bureaucratic pre-screening.`,
        `Approved directives: help · status · audit · synergy · productivity · meeting · appeal · hr · clear`,
      ];
      appendOutput(cmd, outputLines);
    }

    setInputVal('');
  };

  const appendOutput = (cmd: string, output: string | string[]) => {
    setHistory((prev) => [
      ...prev.slice(-18), // Keep generous recent command history
      {
        id: Date.now(),
        command: cmd,
        output,
      },
    ]);
  };

  // Keyboard navigation for previous commands (ArrowUp / ArrowDown)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  const quickCommands = [
    'help',
    'status',
    'audit',
    'synergy',
    'productivity',
    'meeting',
    'appeal',
    'hr',
    'clear',
  ];

  return (
    <div className="flex flex-col gap-2.5 font-sans">
      {/* Top Header & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[var(--pookie-border-subtle)] pb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <p className="text-xs text-[var(--pookie-text-secondary)] font-medium">
            {getLine('terminal', mood, 'subtitle')}
          </p>
        </div>
        <span className="font-mono text-[10px] text-[var(--pookie-text-muted)]">
          Audit Loop Active
        </span>
      </div>

      {/* Quick Command Directives Bar */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--pookie-text-muted)] mr-1">
          Directives:
        </span>
        {quickCommands.map((quickCmd) => (
          <button
            key={quickCmd}
            type="button"
            data-testid={`terminal-quick-btn-${quickCmd}`}
            onClick={() => handleRunCommand(quickCmd)}
            className="pookie-btn-base px-2 py-0.5 text-xs font-mono rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:bg-[var(--pookie-surface-raised)]"
          >
            {quickCmd}
          </button>
        ))}
      </div>

      {/* Terminal Display Screen */}
      <div
        ref={screenRef}
        data-testid="terminal-screen"
        className="pookie-terminal-screen p-3 rounded font-mono text-xs space-y-2.5 max-h-56 sm:max-h-64 overflow-y-auto select-text leading-relaxed"
      >
        <div className="opacity-80 pb-1 border-b border-white/10 text-[11px]">
          {getLine('terminal', mood, 'welcomeLine')}
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="font-semibold text-[var(--pookie-terminal-prompt)] flex items-center gap-1.5">
                <span>{getLine('terminal', mood, 'promptPrefix')}</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-2 text-[var(--pookie-terminal-output)] whitespace-pre-wrap font-mono">
              {Array.isArray(item.output) ? (
                item.output.map((line, idx) => (
                  <div key={idx} className="leading-tight">
                    {line}
                  </div>
                ))
              ) : (
                <div>{item.output}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Command Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRunCommand();
        }}
        className="flex items-center gap-2 pt-1"
      >
        <label htmlFor="boss-terminal-input" className="sr-only">
          Terminal Command Input
        </label>
        <div className="relative flex-1">
          <TerminalIcon className="w-3.5 h-3.5 text-[var(--pookie-text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            id="boss-terminal-input"
            type="text"
            data-testid="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getLine('terminal', mood, 'inputPlaceholder')}
            autoComplete="off"
            spellCheck="false"
            className="pookie-surface-inset w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded focus:outline-none focus:ring-2 focus:ring-[var(--pookie-focus-ring)]"
          />
        </div>
        <button
          type="submit"
          data-testid="terminal-execute-btn"
          className="pookie-btn-accent inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 active:translate-y-0.5"
        >
          <span>{getLine('terminal', mood, 'runBtn')}</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
