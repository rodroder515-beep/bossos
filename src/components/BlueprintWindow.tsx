import React, { useState } from 'react';
import { Users, Clock, Code2, ShieldCheck, Copy, Check, Download } from 'lucide-react';
import { getLine, MoodId } from '../core/mood';
import {
  HACKATHON_TIMELINE,
  STANDALONE_FILES,
  TEAM_SPLIT_PLAN,
} from '../core/offlineBundle';

interface BlueprintWindowProps {
  mood: MoodId;
}

export const BlueprintWindow: React.FC<BlueprintWindowProps> = ({ mood }) => {
  const [activeTab, setActiveTab] = useState<'split' | 'files' | 'rules'>('split');
  const [selectedFile, setSelectedFile] = useState<string>('mood.js');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const isDark = mood === 'dank_2016' || mood === 'existential';

  const handleCopyCode = (fileName: string, code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 1800);
  };

  const handleDownloadOfflineHtml = () => {
    const combinedScripts = Object.entries(STANDALONE_FILES)
      .map(([name, meta]) => `/* === ${name} (${meta.owner}) === */\n${meta.code}`)
      .join('\n\n');

    const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>BossOS — Standalone Offline Hackathon Build</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #0f172a; color: #f8fafc; }
    body[data-mood="dank_2016"] .win {
      border: 2px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(#1e1b2e, #151324), linear-gradient(135deg, #ff3366, #ff9933, #ffee33, #33cc66, #3399ff, #cc66ff);
    }
    .topbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #1e293b; border-radius: 8px; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .win { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; }
    button { cursor: pointer; padding: 6px 12px; border-radius: 6px; border: 1px solid #475569; background: #4f46e5; color: white; font-weight: 600; }
    textarea, input { width: 100%; box-sizing: border-box; padding: 8px; margin: 8px 0; border-radius: 4px; background: #0f172a; color: white; border: 1px solid #334155; }
    #hr-shutdown-modal { position: fixed; inset: 0; background: rgba(2,6,23,0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; }
    #hr-shutdown-modal[hidden] { display: none; }
  </style>
</head>
<body data-mood="corporate">
  <div class="topbar">
    <strong id="boss-brand">BossOS Enterprise</strong>
    <span id="boss-memory"></span>
    <div>
      <button onclick="window.setBossMood('corporate')">Corporate</button>
      <button onclick="window.setBossMood('dank_2016')">2016 Dank (Static Rainbow)</button>
      <button id="shutdown-btn" onclick="window.BossShell.toggleShutdown(true)">Shutdown</button>
    </div>
  </div>
  <div class="grid">
    <div id="win-calc" class="win"></div>
    <div id="win-bin" class="win"></div>
    <div id="win-notes" class="win"></div>
  </div>
  <div id="hr-shutdown-modal" hidden>
    <h2>Official HR Performance Review</h2>
    <p id="hr-summary-line" style="font-family: monospace; font-size: 18px; padding: 16px; border: 1px solid #4f46e5; border-radius: 8px;"></p>
    <button id="hr-safe-exit" onclick="window.BossShell.toggleShutdown(false)">Return to Desktop (Safe Exit)</button>
  </div>
  <script>
${combinedScripts}
window.BossShell.initShell();
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bossos-offline-bundle.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Sub-navigation & Offline Export */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className={`inline-flex rounded-lg p-1 border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
          role="tablist"
          aria-label="Hackathon Plan Tabs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'split'}
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'split'
                ? isDark
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-900 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{getLine('blueprint', mood, 'tabSplit')}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'files'}
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'files'
                ? isDark
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-900 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{getLine('blueprint', mood, 'tabFiles')}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'rules'}
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'rules'
                ? isDark
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-900 shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>{getLine('blueprint', mood, 'tabRules')}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleDownloadOfflineHtml}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{getLine('blueprint', mood, 'downloadAllBtn')}</span>
        </button>
      </div>

      {/* TAB 1: 4-Member Split & 18-Hour Timeline */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 4-Member Ownership Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TEAM_SPLIT_PLAN.map((member) => (
              <div
                key={member.memberNumber}
                className={`p-3 rounded-lg border ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold">
                    0{member.memberNumber}. Member {member.memberNumber}
                  </span>
                  <span className="text-xs font-mono text-indigo-500">
                    {member.filesOwned.join(' · ')}
                  </span>
                </div>
                <p
                  className={`text-xs font-medium mb-1.5 ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {member.roleTitle}
                </p>
                <ul
                  className={`text-[11px] space-y-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx}>• {resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 18-Hour Timeline + Cut List */}
          <div
            className={`lg:col-span-5 p-3 rounded-lg border flex flex-col justify-between gap-3 ${
              isDark
                ? 'bg-slate-950/70 border-slate-800'
                : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div>
              <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Timeline to Tomorrow Evening (Hours 0–18)</span>
              </h4>
              <div className="space-y-2 text-xs">
                {HACKATHON_TIMELINE.map((item) => (
                  <div
                    key={item.hours}
                    className={`pb-2 border-b last:border-b-0 ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span className="font-mono text-indigo-500">{item.hours}</span>
                      <span className="text-[11px] opacity-75">{item.statusNote}</span>
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.deliverables}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`p-2.5 rounded border text-[11px] ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong>Never Cut:</strong> Window Manager · Mood Toggle · Calculator ·
                Recycle Bin · Shutdown + Safe Exit
              </div>
              <div className="mt-1 opacity-80">
                <strong>Cut First If Tight:</strong> Terminal · Sound Effects · Boot
                Sequence
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Standalone Offline JS Files */}
      {activeTab === 'files' && (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(STANDALONE_FILES).map((fileKey) => (
                <button
                  key={fileKey}
                  type="button"
                  onClick={() => setSelectedFile(fileKey)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedFile === fileKey
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {fileKey}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                handleCopyCode(
                  selectedFile,
                  STANDALONE_FILES[selectedFile].code
                )
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {copiedFile === selectedFile ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied {selectedFile}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {selectedFile}</span>
                </>
              )}
            </button>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 pb-1.5 border-b border-slate-800">
              <span>{STANDALONE_FILES[selectedFile].owner}</span>
              <span className="font-mono">{STANDALONE_FILES[selectedFile].description}</span>
            </div>
            <pre className="text-xs font-mono text-slate-100 overflow-x-auto max-h-52 leading-relaxed">
              <code>{STANDALONE_FILES[selectedFile].code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Rule Compliance & Fixes Checklist */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
          {[
            {
              title: '01. Static Rainbow Borders in 2016 Dank Mode',
              desc: 'Implemented via a static multi-stop CSS linear-gradient border (.dank-static-rainbow-border). Zero color cycling or flashing animations to comply with guide safety rules.',
            },
            {
              title: '02. RAM-Only Notepad (Zero Personal Data)',
              desc: 'Notepad text lives strictly in volatile memory (0 bytes written to localStorage, sessionStorage, or network). Keeps the demo 100% clear of the personal-data rule.',
            },
            {
              title: '03. Dynamic LINES[app][mood] Live Rewrite',
              desc: 'Every window pulls its headers, button labels, and commentary from LINES[app][mood] on each render pass. Zero hardcoded mood strings.',
            },
            {
              title: '04. Session Memory + Deterministic HR Report',
              desc: 'Tracks per-file restores ("Earlier you restored \'Q3_Report\' three times. Interesting.") and prints the Employee #4,031 HR Review at Shutdown with an instant Safe Exit.',
            },
          ].map((rule) => (
            <div
              key={rule.title}
              className={`p-3 rounded-lg border ${
                isDark
                  ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-semibold mb-1">{rule.title}</div>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
