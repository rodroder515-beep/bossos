import React from 'react';
import { RotateCcw, Trash2, FolderSync } from 'lucide-react';
import { getLine, MoodId } from '../core/mood';
import { BinItem } from '../core/bin';
import { MoodSticker } from './MoodSticker';

interface BinWindowProps {
  mood: MoodId;
  items: BinItem[];
  onRestoreItem: (item: BinItem) => void;
  onShredItem: (item: BinItem) => void;
  onRestoreAll: () => void;
  onResetBin: () => void;
}

/**
 * Classic OS File Folder / Icon-List View for the PookieOS Recycle Bin.
 * Replaces the enterprise table with a tactile 1999 desktop folder view
 * while preserving all sample files, individual Restore/Shred, Restore All,
 * Repopulate, and the 3x Q3_Report.xlsx Session Memory trigger.
 */
export const BinWindow: React.FC<BinWindowProps> = ({
  mood,
  items,
  onRestoreItem,
  onShredItem,
  onRestoreAll,
  onResetBin,
}) => {
  const activeItems = items.filter((item) => item.status !== 'shredded');

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Classic OS Folder Address & Toolbar Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-[var(--pookie-border-subtle)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 text-[11px] font-mono rounded pookie-surface-inset text-[var(--pookie-text-secondary)] truncate">
            C:\POOKIE_OS\RECYCLE.BIN ({activeItems.length} objects)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={onRestoreAll}
            className="pookie-btn-accent inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <FolderSync className="w-3.5 h-3.5" />
            <span>{getLine('bin', mood, 'restoreAllBtn')}</span>
          </button>

          <button
            type="button"
            onClick={onResetBin}
            className="pookie-btn-base inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{getLine('bin', mood, 'resetBinBtn')}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2.5 px-0.5">
        <p className="text-[11px] text-[var(--pookie-text-secondary)] flex-1 min-w-0 leading-snug">
          {getLine('bin', mood, 'subtitle')}
        </p>
        <MoodSticker
          mood={mood}
          zone="window-bin-corner"
          className="shrink-0 mr-1"
        />
      </div>

      {/* Classic OS Folder Icon & List Presentation */}
      {activeItems.length === 0 ? (
        <div className="pookie-surface-inset p-6 text-center rounded text-xs">
          <p className="mb-3 text-[var(--pookie-text-secondary)]">
            {getLine('bin', mood, 'emptyState')}
          </p>
          <button
            type="button"
            onClick={onResetBin}
            className="pookie-btn-accent px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer"
          >
            {getLine('bin', mood, 'resetBinBtn')}
          </button>
        </div>
      ) : (
        <div
          role="list"
          aria-label="Recycle Bin Files"
          className="pookie-surface-inset p-2.5 rounded grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto"
        >
          {activeItems.map((item) => {
            const isQ3 = item.baseName === 'Q3_Report';
            return (
              <div
                key={item.id}
                role="listitem"
                className={`p-2.5 rounded flex flex-col justify-between gap-2 border transition-colors ${
                  isQ3
                    ? 'bg-[var(--pookie-surface-primary)] border-[var(--pookie-border-outer)]'
                    : 'bg-[var(--pookie-surface-raised)] border-[var(--pookie-border-subtle)]'
                }`}
              >
                {/* Top File Icon + File Metadata */}
                <div className="flex items-start gap-2.5">
                  {/* Custom Pixel-Vector Retro File Icon */}
                  <svg
                    viewBox="0 0 32 36"
                    fill="none"
                    aria-hidden="true"
                    className="w-7 h-8 shrink-0 mt-0.5"
                  >
                    <path
                      d="M4 2H21L28 9V34H4V2Z"
                      fill="var(--pookie-surface-inset)"
                      stroke="var(--pookie-border-outer)"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 2V10H28"
                      fill="var(--pookie-surface-secondary)"
                      stroke="var(--pookie-border-outer)"
                      strokeWidth="1.8"
                    />
                    <rect
                      x="7"
                      y="14"
                      width="18"
                      height="5"
                      fill={isQ3 ? 'var(--pookie-accent)' : 'var(--pookie-surface-secondary)'}
                    />
                    <line x1="7" y1="23" x2="24" y2="23" stroke="var(--pookie-border-outer)" strokeWidth="1.5" />
                    <line x1="7" y1="28" x2="20" y2="28" stroke="var(--pookie-border-outer)" strokeWidth="1.5" />
                  </svg>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs font-bold text-[var(--pookie-text-primary)] truncate">
                        {item.fileName}
                      </span>
                      <span
                        data-testid={`restore-count-${item.baseName}`}
                        className="font-mono text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded pookie-badge-highlight shrink-0"
                      >
                        {item.restoreCount}x
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono tabular-nums text-[var(--pookie-text-muted)] mt-0.5">
                      <span>{item.sizeKb.toLocaleString('en-US')} KB</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.status === 'restored' ? 'RESTORED' : 'IN BIN'}</span>
                    </div>

                    <p className="text-[11px] leading-snug text-[var(--pookie-text-secondary)] mt-1 line-clamp-2">
                      {item.descriptions[mood]}
                    </p>
                  </div>
                </div>

                {/* File Action Controls */}
                <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-[var(--pookie-border-subtle)]">
                  <button
                    type="button"
                    onClick={() => onRestoreItem(item)}
                    aria-label={`Restore ${item.baseName}`}
                    className={`flex-1 px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                      isQ3 && item.restoreCount < 3
                        ? 'pookie-btn-accent'
                        : 'pookie-btn-base'
                    }`}
                  >
                    {getLine('bin', mood, 'restoreBtn')}
                  </button>

                  <button
                    type="button"
                    onClick={() => onShredItem(item)}
                    aria-label={`Shred ${item.baseName}`}
                    title={getLine('bin', mood, 'shredBtn')}
                    className="pookie-btn-danger px-2 py-1 text-[11px] rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline-block" />
                    <span className="sr-only">{getLine('bin', mood, 'shredBtn')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
