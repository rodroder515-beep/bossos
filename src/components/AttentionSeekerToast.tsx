import React, { useState } from 'react';
import { Flame, X, MessageSquare, AlertCircle } from 'lucide-react';
import { MoodId } from '../core/mood';
import {
  CATEGORY_META,
  REACTION_OPTIONS,
  RageBaitItem,
  ReactionType,
  getLocalizedTake,
  getRageBaitComeback,
} from '../core/rageBait';
import { PookieMotif } from './PookieMotif';

interface AttentionSeekerToastProps {
  item: RageBaitItem;
  mood: MoodId;
  onReact: (baitId: string, reaction: ReactionType, comeback: string) => void;
  onDismiss: () => void;
}

export const AttentionSeekerToast: React.FC<AttentionSeekerToastProps> = ({
  item,
  mood,
  onReact,
  onDismiss,
}) => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [comeback, setComeback] = useState<string | null>(null);

  const localizedText = getLocalizedTake(item, mood);
  const categoryInfo = CATEGORY_META[item.category] || CATEGORY_META.hot_takes;

  const handleSelectReaction = (reaction: ReactionType) => {
    setSelectedReaction(reaction);
    const reply = getRageBaitComeback(reaction, mood);
    setComeback(reply);
    onReact(item.id, reaction, reply);
  };

  return (
    <aside
      role="status"
      aria-live="assertive"
      aria-label="Attention Seeker Notification"
      data-testid="attention-seeker-toast"
      className={`fixed top-12 sm:top-14 right-2 sm:right-5 z-50 w-[calc(100vw-16px)] max-w-sm sm:max-w-md rounded shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-4 ${
        mood === 'dank_2016'
          ? 'dank-static-rainbow-border bg-black text-lime-400 font-mono'
          : 'pookie-dialog-box'
      }`}
    >
      {/* Title Bar */}
      <div className="pookie-titlebar-active flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-bold border-b border-[var(--pookie-border-outer)] select-none">
        <div className="flex items-center gap-1.5 min-w-0">
          <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />
          <span className="truncate font-display tracking-wide uppercase text-[11px] sm:text-xs">
            ATTENTION SEEKER 4031
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border leading-none ${categoryInfo.colorClass}`}
          >
            {categoryInfo.badge}
          </span>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss Rage Bait Notification"
            className="pookie-win-ctrl-btn hover:bg-rose-500 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Body Area */}
      <div className="p-3.5 text-xs space-y-3 bg-[var(--pookie-surface-primary)] text-[var(--pookie-text-primary)]">
        <div className="flex items-start gap-2.5">
          <PookieMotif mood={mood} variant="badge" className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--pookie-text-muted)] flex items-center gap-1">
              <span>{item.headline}</span>
              <span aria-hidden="true">•</span>
              <span className="italic">Bait Level: Lethal</span>
            </div>
            <p
              data-testid="attention-seeker-text"
              className="text-sm font-semibold leading-snug tracking-tight text-[var(--pookie-text-primary)] select-text"
            >
              “{localizedText}”
            </p>
          </div>
        </div>

        {/* Reaction Comeback Bubble (if user reacted) */}
        {comeback ? (
          <div
            data-testid="attention-seeker-comeback"
            className="p-3 rounded border border-[var(--pookie-border-outer)] bg-[var(--pookie-surface-secondary)] space-y-2 animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--pookie-text-secondary)]">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-indigo-400" />
                PookieOS Rebuttal
              </span>
              <span className="pookie-btn-accent px-1.5 py-0.5 rounded text-[9px]">
                BURN DELIVERED
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed italic text-[var(--pookie-text-primary)]">
              "{comeback}"
            </p>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={onDismiss}
                className="pookie-btn-accent px-3 py-1 text-xs font-semibold rounded cursor-pointer"
              >
                Acknowledge Defeat
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reaction Buttons */
          <div className="space-y-1.5 pt-1 border-t border-[var(--pookie-border-subtle)]">
            <div className="text-[10px] font-mono text-[var(--pookie-text-secondary)] flex items-center justify-between">
              <span>HOW DARE YOU RESPOND:</span>
              <span className="text-[9px] opacity-75">Click to counter</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {REACTION_OPTIONS.map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  data-testid={`react-btn-${opt.type}`}
                  onClick={() => handleSelectReaction(opt.type)}
                  className="pookie-btn-base flex items-center justify-center gap-1 px-2 py-1.5 text-[10.5px] sm:text-[11px] font-bold rounded cursor-pointer hover:border-[var(--pookie-focus-ring)] active:scale-95 transition-transform"
                >
                  <span aria-hidden="true">{opt.emoji}</span>
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={onDismiss}
                className="pookie-btn-base opacity-70 hover:opacity-100 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-mono rounded cursor-pointer"
              >
                <span>[LEAVE ON READ]</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
