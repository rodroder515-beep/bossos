import React from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Clock,
  Trash2,
  Sparkles,
  X,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';
import { MoodId } from '../core/mood';
import {
  CATEGORY_META,
  ReactionHistoryEntry,
  REACTION_OPTIONS,
  SNOOZE_GUILT_TRIPS,
} from '../core/rageBait';

export type SpamFrequency = 'chill' | 'normal' | 'unhinged';

interface AttentionSeekerCenterProps {
  isOpen: boolean;
  mood: MoodId;
  history: ReactionHistoryEntry[];
  isMuted: boolean;
  frequency: SpamFrequency;
  snoozedUntil: number | null;
  onClose: () => void;
  onToggleMute: () => void;
  onChangeFrequency: (freq: SpamFrequency) => void;
  onSnooze: (guiltTrip: string) => void;
  onClearHistory: () => void;
  onSpamNow: () => void;
}

export const AttentionSeekerCenter: React.FC<AttentionSeekerCenterProps> = ({
  isOpen,
  mood,
  history,
  isMuted,
  frequency,
  snoozedUntil,
  onClose,
  onToggleMute,
  onChangeFrequency,
  onSnooze,
  onClearHistory,
  onSpamNow,
}) => {
  if (!isOpen) return null;

  const isCurrentlySnoozed = snoozedUntil !== null && snoozedUntil > Date.now();
  const secondsLeft = isCurrentlySnoozed
    ? Math.max(0, Math.ceil((snoozedUntil! - Date.now()) / 1000))
    : 0;

  const handleSnoozeClick = () => {
    const randomGuilt =
      SNOOZE_GUILT_TRIPS[Math.floor(Math.random() * SNOOZE_GUILT_TRIPS.length)];
    onSnooze(randomGuilt);
  };

  const getReactionLabel = (type?: string) => {
    if (!type) return 'LEFT ON READ 📭';
    const match = REACTION_OPTIONS.find((r) => r.type === type);
    return match ? `${match.emoji} ${match.label}` : type;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Attention Seeker Notification Center"
      data-testid="attention-seeker-center"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div
        className={`w-full max-w-xl max-h-[90vh] flex flex-col rounded shadow-2xl overflow-hidden ${
          mood === 'dank_2016'
            ? 'dank-static-rainbow-border bg-black text-lime-300 font-mono'
            : 'pookie-dialog-box'
        }`}
      >
        {/* Title Bar */}
        <div className="pookie-titlebar-active flex items-center justify-between gap-2 px-3.5 py-2 border-b border-[var(--pookie-border-outer)] select-none shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Flame className="w-4 h-4 text-rose-500 animate-pulse shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold font-display uppercase tracking-wide truncate">
              ATTENTION SEEKER 4031 — DRAMA LOG & RAGE CONTROLS
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Attention Seeker Center"
            className="pookie-win-ctrl-btn hover:bg-rose-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Control Bar */}
        <div className="p-3 bg-[var(--pookie-surface-secondary)] border-b border-[var(--pookie-border-subtle)] space-y-3 shrink-0 text-xs">
          {/* Top row: Mute & Frequency */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Frequency selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[var(--pookie-text-secondary)]">
                Spam Cadence:
              </span>
              {(['chill', 'normal', 'unhinged'] as SpamFrequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  data-testid={`freq-btn-${f}`}
                  onClick={() => onChangeFrequency(f)}
                  className={`px-2 py-1 text-[10px] sm:text-[11px] uppercase font-bold rounded cursor-pointer transition-colors ${
                    frequency === f ? 'pookie-btn-accent' : 'pookie-btn-base'
                  }`}
                >
                  {f === 'chill'
                    ? 'Chill (~45s)'
                    : f === 'normal'
                    ? 'Normal (~20s)'
                    : 'Unhinged (~8s) 🔥'}
                </button>
              ))}
            </div>

            {/* Mute button */}
            <button
              type="button"
              data-testid="toggle-mute-btn"
              onClick={onToggleMute}
              className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1.5 cursor-pointer ${
                isMuted ? 'pookie-btn-accent' : 'pookie-btn-base'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Unmute Engine</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mute Drama</span>
                </>
              )}
            </button>
          </div>

          {/* Action Row: Snooze & Instant Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--pookie-border-subtle)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-testid="snooze-drama-btn"
                onClick={handleSnoozeClick}
                disabled={isCurrentlySnoozed}
                className="pookie-btn-base px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isCurrentlySnoozed
                    ? `Snoozed (${secondsLeft}s left)`
                    : 'STOP BOTHERING ME (60s)'}
                </span>
              </button>

              <button
                type="button"
                data-testid="spam-me-now-btn"
                onClick={() => {
                  onSpamNow();
                  onClose();
                }}
                className="pookie-btn-accent px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>RAGE BAIT ME NOW</span>
              </button>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                data-testid="clear-history-btn"
                onClick={onClearHistory}
                className="pookie-btn-base px-2 py-1 text-[10.5px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Purge Ammo ({history.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[var(--pookie-surface-primary)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--pookie-text-secondary)]">
            <span className="font-bold uppercase tracking-wider">
              Delivered Takes & Confrontation Log
            </span>
            <span>Total Delivered: {history.length}</span>
          </div>

          {history.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2 border border-dashed border-[var(--pookie-border-outer)] rounded">
              <AlertTriangle className="w-8 h-8 text-[var(--pookie-text-muted)] mx-auto opacity-60" />
              <p className="text-xs font-bold text-[var(--pookie-text-primary)]">
                No Drama Logged in Session
              </p>
              <p className="text-[11px] text-[var(--pookie-text-secondary)] max-w-sm mx-auto">
                PookieOS is silently gathering controversial takes from Twitter/X and
                corporate town halls. Click "RAGE BAIT ME NOW" to provoke it early.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {history.map((entry) => {
                const cat = CATEGORY_META[entry.category] || CATEGORY_META.hot_takes;
                return (
                  <div
                    key={entry.id}
                    className="p-3 rounded border border-[var(--pookie-border-outer)] bg-[var(--pookie-surface-secondary)] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded border leading-none shrink-0 ${cat.colorClass}`}
                        >
                          {cat.badge}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--pookie-text-muted)] truncate">
                          {entry.headline}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--pookie-text-secondary)] shrink-0">
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs font-semibold leading-relaxed text-[var(--pookie-text-primary)]">
                      “{entry.take}”
                    </p>

                    <div className="pt-2 border-t border-[var(--pookie-border-subtle)] flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-[var(--pookie-text-secondary)]">
                          Your Stance:
                        </span>
                        <span className="font-bold text-[var(--pookie-text-primary)]">
                          {getReactionLabel(entry.userReaction)}
                        </span>
                      </div>

                      {entry.pookieComeback && (
                        <div className="w-full mt-1 p-2 rounded bg-[var(--pookie-surface-primary)] border border-[var(--pookie-border-subtle)] text-[11px] italic text-[var(--pookie-text-secondary)] flex items-start gap-1.5">
                          <MessageCircle className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                          <span>PookieOS: “{entry.pookieComeback}”</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 px-4 bg-[var(--pookie-surface-secondary)] border-t border-[var(--pookie-border-outer)] flex items-center justify-between text-[11px] font-mono text-[var(--pookie-text-secondary)] shrink-0">
          <span>PookieOS Rage Engine 4031 • Gen-Z Satire Certified</span>
          <button
            type="button"
            onClick={onClose}
            className="pookie-btn-base px-3 py-1 font-semibold rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
