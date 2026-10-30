import React from 'react';
import { HeartCrack, Clock, X } from 'lucide-react';
import { MoodId } from '../core/mood';
import { PookieMotif } from './PookieMotif';

export interface AttachmentPopupData {
  id: number;
  kind: 'tab_return' | 'idle';
  title: string;
  message: string;
  statsSubtext: string;
}

interface AttachmentNotificationProps {
  notification: AttachmentPopupData | null;
  mood: MoodId;
  onDismiss: () => void;
}

export const AttachmentNotification: React.FC<AttachmentNotificationProps> = ({
  notification,
  mood,
  onDismiss,
}) => {
  if (!notification) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      data-testid="attachment-notification"
      className={`fixed bottom-24 sm:bottom-14 right-2 sm:right-5 z-40 w-[calc(100vw-16px)] max-w-80 sm:max-w-96 rounded overflow-hidden transition-opacity duration-150 ${
        mood === 'dank_2016'
          ? 'dank-static-rainbow-border'
          : 'pookie-dialog-box'
      }`}
    >
      {/* Mood-Themed Title Bar */}
      <div className="pookie-titlebar-active flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-bold border-b border-[var(--pookie-border-outer)]">
        <div className="flex items-center gap-1.5 truncate">
          {notification.kind === 'tab_return' ? (
            <HeartCrack className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Clock className="w-3.5 h-3.5 shrink-0" />
          )}
          <span data-testid="attachment-notification-title" className="truncate font-display">
            {notification.title}
          </span>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss Notification"
          className="pookie-win-ctrl-btn"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 text-xs space-y-2.5 bg-[var(--pookie-surface-primary)] text-[var(--pookie-text-primary)]">
        <div className="flex items-start gap-2.5">
          <PookieMotif mood={mood} variant="badge" className="w-5 h-5 mt-0.5" />
          <p
            data-testid="attachment-notification-message"
            className="leading-relaxed font-medium flex-1"
          >
            “{notification.message}”
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--pookie-border-subtle)] text-[11px] font-mono tabular-nums text-[var(--pookie-text-secondary)]">
          <span>{notification.statsSubtext}</span>

          <button
            type="button"
            onClick={onDismiss}
            className="pookie-btn-accent px-2.5 py-1 text-xs font-semibold rounded cursor-pointer whitespace-nowrap shrink-0"
          >
            I’m Still Here
          </button>
        </div>
      </div>
    </aside>
  );
};
