import React, { useEffect, useRef, useState } from 'react';
import {
  Calculator,
  Trash2,
  FileText,
  Terminal as TerminalIcon,
  Power,
  Maximize2,
  Minimize2,
  Minus,
  X,
  Menu,
  Bell,
  Flame,
} from 'lucide-react';
import {
  AttentionSeekerToast,
} from './components/AttentionSeekerToast';
import {
  AttentionSeekerCenter,
  SpamFrequency,
} from './components/AttentionSeekerCenter';
import {
  RageBaitItem,
  ReactionHistoryEntry,
  ReactionType,
  getRandomRageBait,
  getLocalizedTake,
} from './core/rageBait';
import {
  AppId,
  createInitialSessionState,
  getLine,
  MoodId,
  MOODS,
  pickIdleDialogue,
  pickTabReturnDialogue,
  recordAction,
  SessionAction,
  SessionMemoryState,
} from './core/mood';
import {
  BinItem,
  createInitialBinItems,
  restoreAllBinItems,
  restoreBinItem,
  shredBinItem,
} from './core/bin';
import { CalcWindow } from './components/CalcWindow';
import { NotesWindow } from './components/NotesWindow';
import { BinWindow } from './components/BinWindow';
import { TerminalWindow } from './components/TerminalWindow';
import { HRShutdownModal } from './components/HRShutdownModal';
import {
  AttachmentNotification,
  AttachmentPopupData,
} from './components/AttachmentNotification';
import { PookieMotif } from './components/PookieMotif';
import { PookieAppIcon } from './components/PookieIcons';
import { DesktopWallpaper } from './components/DesktopWallpaper';
import { LandingExperience } from './components/landing/LandingExperience';
import {
  LandingMoodId,
  mapDesktopMoodToLandingMood,
  mapLandingMoodToDesktopMood,
} from './config/pookieLandingConfig';

/**
 * Phase 2 Extensibility Placeholders (Section 15)
 */
export const DesktopStickerLayer: React.FC<{ mood: MoodId; enabled?: boolean }> = ({
  enabled = false,
}) => {
  if (!enabled) return null;
  return <div data-testid="phase2-desktop-sticker-layer" className="pointer-events-none" />;
};

export const PookieCatAssistant: React.FC<{ mood: MoodId; enabled?: boolean }> = ({
  enabled = false,
}) => {
  if (!enabled) return null;
  return <div data-testid="phase2-pookie-cat-assistant" className="pointer-events-none" />;
};

export interface PookieDesktopProps {
  initialMood?: LandingMoodId | MoodId;
  onReturnToLanding?: (currentMood: LandingMoodId) => void;
}

interface WindowConfig {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  zIndex: number;
}

const IDLE_TIMEOUT_MS = 10000;

export function PookieDesktop({
  initialMood = 'corporate',
  onReturnToLanding,
}: PookieDesktopProps) {
  const [mood, setMood] = useState<MoodId>(() =>
    mapLandingMoodToDesktopMood(initialMood)
  );
  const [sessionState, setSessionState] = useState<SessionMemoryState>(() =>
    createInitialSessionState(4031)
  );

  useEffect(() => {
    const mapped = mapLandingMoodToDesktopMood(initialMood);
    setMood(mapped);
  }, [initialMood]);
  const [binItems, setBinItems] = useState<BinItem[]>(() =>
    createInitialBinItems()
  );
  const [shutdownOpen, setShutdownOpen] = useState<boolean>(false);
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [focusedWindow, setFocusedWindow] = useState<AppId>('calc');
  const [topZ, setTopZ] = useState<number>(25);
  const [attachmentPopup, setAttachmentPopup] =
    useState<AttachmentPopupData | null>(null);

  // Attention Seeker 4031 — Gen-Z Rage Bait Engine State
  const [activeRageBait, setActiveRageBait] = useState<RageBaitItem | null>(null);
  const [rageBaitHistory, setRageBaitHistory] = useState<ReactionHistoryEntry[]>([]);
  const [isAttentionSeekerMuted, setIsAttentionSeekerMuted] = useState<boolean>(false);
  const [spamFrequency, setSpamFrequency] = useState<SpamFrequency>('normal');
  const [snoozedUntil, setSnoozedUntil] = useState<number | null>(null);
  const [isAttentionCenterOpen, setIsAttentionCenterOpen] = useState<boolean>(false);
  const [unreadDramaCount, setUnreadDramaCount] = useState<number>(0);

  const [viewport, setViewport] = useState<{ width: number; height: number }>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Refs for clean, single-reaction-per-period tab & idle tracking
  const sessionStateRef = useRef<SessionMemoryState>(sessionState);
  sessionStateRef.current = sessionState;
  const shutdownOpenRef = useRef<boolean>(shutdownOpen);
  shutdownOpenRef.current = shutdownOpen;
  const hasLeftTabRef = useRef<boolean>(false);
  const isCurrentlyIdleRef = useRef<boolean>(false);
  const idleTimerRef = useRef<number | null>(null);

  // Dragging state ref for smooth pointer-based window movement
  const dragStateRef = useRef<{
    appId: AppId;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Initial floating window arrangement:
  // Calculator (Primary active window, compact 392px width at y=88) and
  // Recycle Bin (Secondary explorer window, wider 426px width staggered at y=122)
  // preserve generous wallpaper visibility and the right-side focal composition.
  const [windows, setWindows] = useState<Record<AppId, WindowConfig>>({
    shell: {
      id: 'shell',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 0,
      y: 0,
      width: 0,
      zIndex: 1,
    },
    calc: {
      id: 'calc',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 108,
      y: 88,
      width: 392,
      zIndex: 22,
    },
    bin: {
      id: 'bin',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 512,
      y: 122,
      width: 426,
      zIndex: 21,
    },
    notes: {
      id: 'notes',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 156,
      y: 138,
      width: 512,
      zIndex: 19,
    },
    terminal: {
      id: 'terminal',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 472,
      y: 162,
      width: 512,
      zIndex: 18,
    },
    blueprint: {
      id: 'blueprint',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 160,
      width: 420,
      zIndex: 15,
    },
    shutdown: {
      id: 'shutdown',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 260,
      y: 140,
      width: 500,
      zIndex: 30,
    },
  });

  // Centralized synchronous state updater so rapid events (like visibilitychange
  // hidden -> visible) never read a stale sessionStateRef.current
  const applySessionAction = (action: SessionAction): SessionMemoryState => {
    const nextState = recordAction(sessionStateRef.current, action);
    sessionStateRef.current = nextState;
    setSessionState(nextState);
    return nextState;
  };

  // 1. Tab Switching Detection (visibilitychange)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hasLeftTabRef.current = true;
        applySessionAction({ type: 'TAB_LEFT' });
      } else if (document.visibilityState === 'visible' && hasLeftTabRef.current) {
        hasLeftTabRef.current = false;
        const nextState = applySessionAction({ type: 'TAB_RETURNED' });
        const message = pickTabReturnDialogue(nextState);
        setAttachmentPopup({
          id: Date.now(),
          kind: 'tab_return',
          title: 'PookieOS Attachment Alert — Tab Return Detected',
          message,
          statsSubtext: `Tab Left: ${nextState.tabLeftCount}x · Idle: ${nextState.idleCount}x`,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 2. Idle Detection (10 seconds of inactivity, max 1 reaction per idle period)
  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleCheck = () => {
      clearIdleTimer();
      idleTimerRef.current = window.setTimeout(() => {
        if (isCurrentlyIdleRef.current) return;
        if (document.visibilityState === 'hidden') return;

        isCurrentlyIdleRef.current = true;
        const nextState = applySessionAction({ type: 'USER_IDLE' });
        const message = pickIdleDialogue(nextState);
        setAttachmentPopup({
          id: Date.now(),
          kind: 'idle',
          title: 'PookieOS Inactivity Monitor (10s Silence)',
          message,
          statsSubtext: `Idle Warnings: ${nextState.idleCount}x · Tab Left: ${nextState.tabLeftCount}x`,
        });
      }, IDLE_TIMEOUT_MS);
    };

    const handleUserActivity = () => {
      isCurrentlyIdleRef.current = false;
      scheduleIdleCheck();
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      'keydown',
      'pointerdown',
      'pointermove',
      'mousedown',
      'touchstart',
    ];

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    scheduleIdleCheck();

    return () => {
      clearIdleTimer();
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
    };
  }, []);

  // 3. Global pointer move/up listeners for dragging floating windows
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      const nextX = Math.max(8, Math.min(window.innerWidth - 260, drag.origX + dx));
      const nextY = Math.max(8, Math.min(window.innerHeight - 96, drag.origY + dy));
      setWindows((prev) => ({
        ...prev,
        [drag.appId]: {
          ...prev[drag.appId],
          x: nextX,
          y: nextY,
        },
      }));
    };

    const handlePointerUp = () => {
      dragStateRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const bringToFront = (appId: AppId) => {
    setFocusedWindow(appId);
    setTopZ((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [appId]: {
          ...prev[appId],
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
  };

  const handleTitleBarPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    appId: AppId
  ) => {
    if ((e.target as HTMLElement).closest('button')) return;
    bringToFront(appId);
    const win = windows[appId];
    if (win.isMaximized) return;
    dragStateRef.current = {
      appId,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
  };

  const handleDispatchAction = (action: SessionAction) => {
    if (action.type === 'SIMULATE_DEMO_4031') {
      setBinItems((prev) =>
        prev.map((item) => ({
          ...item,
          status: 'restored',
          restoreCount:
            item.baseName === 'Q3_Report' ? 3 : Math.max(1, item.restoreCount),
        }))
      );
    } else if (action.type === 'RESET_SESSION') {
      setBinItems(createInitialBinItems());
      setAttachmentPopup(null);
    }
    applySessionAction(action);
  };

  const handleRequestShutdown = () => {
    setStartMenuOpen(false);
    applySessionAction({ type: 'SHUTDOWN_REQUESTED' });
    setShutdownOpen(true);
  };

  const handleStayWithMe = () => {
    applySessionAction({ type: 'SHUTDOWN_CANCELLED' });
    setShutdownOpen(false);
  };

  const handleMoodChange = (nextMood: MoodId) => {
    setMood(nextMood);
    applySessionAction({ type: 'SWITCH_MOOD', mood: nextMood });
  };

  const handleOpenOrFocusWindow = (appId: AppId) => {
    setTopZ((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [appId]: {
          ...prev[appId],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
    setFocusedWindow(appId);
    setStartMenuOpen(false);
  };

  const handleMinimizeWindow = (appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: !prev[appId].isMinimized,
      },
    }));
  };

  const handleMaximizeWindow = (appId: AppId) => {
    bringToFront(appId);
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized,
        isMinimized: false,
      },
    }));
  };

  const handleCloseWindow = (appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false,
        isMaximized: false,
      },
    }));
  };

  // Recycle Bin handlers wired to Session Memory
  const handleRestoreBinItem = (item: BinItem) => {
    setBinItems((prev) => restoreBinItem(prev, item.id));
    handleDispatchAction({
      type: 'RESTORE_FILE',
      fileId: item.id,
      fileName: item.fileName,
    });
  };

  const handleShredBinItem = (item: BinItem) => {
    setBinItems((prev) => shredBinItem(prev, item.id));
    handleDispatchAction({
      type: 'DELETE_FILE',
      fileId: item.id,
      fileName: item.fileName,
    });
  };

  const handleRestoreAllBin = () => {
    const activeNames = binItems
      .filter((i) => i.status !== 'shredded')
      .map((i) => i.fileName);
    setBinItems((prev) => restoreAllBinItems(prev));
    handleDispatchAction({
      type: 'RESTORE_ALL',
      fileNames: activeNames,
    });
  };

  const handleResetBin = () => {
    setBinItems(createInitialBinItems());
  };

  // Attention Seeker 4031 — Logic & Interval Spawner
  const activeRageBaitRef = useRef<RageBaitItem | null>(activeRageBait);
  activeRageBaitRef.current = activeRageBait;
  const isMutedRef = useRef(isAttentionSeekerMuted);
  isMutedRef.current = isAttentionSeekerMuted;
  const snoozedUntilRef = useRef(snoozedUntil);
  snoozedUntilRef.current = snoozedUntil;
  const spamFrequencyRef = useRef(spamFrequency);
  spamFrequencyRef.current = spamFrequency;
  const rageBaitHistoryRef = useRef(rageBaitHistory);
  rageBaitHistoryRef.current = rageBaitHistory;
  const moodRef = useRef(mood);
  moodRef.current = mood;

  const triggerRageBaitNow = () => {
    const recentIds = rageBaitHistoryRef.current.slice(0, 5).map((e) => e.baitId);
    const item = getRandomRageBait(moodRef.current, recentIds);
    const entry: ReactionHistoryEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      baitId: item.id,
      category: item.category,
      headline: item.headline,
      take: getLocalizedTake(item, moodRef.current),
      timestamp: Date.now(),
    };
    setActiveRageBait(item);
    setRageBaitHistory((prev) => [entry, ...prev.slice(0, 49)]);
    setUnreadDramaCount((c) => c + 1);
  };

  useEffect(() => {
    const cadenceMap: Record<SpamFrequency, number> = {
      chill: 45000,
      normal: 20000,
      unhinged: 8000,
    };

    const initialTimer = setTimeout(() => {
      if (
        !isMutedRef.current &&
        (!snoozedUntilRef.current || snoozedUntilRef.current <= Date.now()) &&
        !activeRageBaitRef.current
      ) {
        triggerRageBaitNow();
      }
    }, 6000);

    const interval = setInterval(() => {
      if (
        !isMutedRef.current &&
        (!snoozedUntilRef.current || snoozedUntilRef.current <= Date.now()) &&
        !activeRageBaitRef.current
      ) {
        triggerRageBaitNow();
      }
    }, cadenceMap[spamFrequency]);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [spamFrequency]);

  const handleReactToRageBait = (
    baitId: string,
    reaction: ReactionType,
    comeback: string
  ) => {
    setRageBaitHistory((prev) =>
      prev.map((entry) =>
        entry.baitId === baitId && !entry.userReaction
          ? { ...entry, userReaction: reaction, pookieComeback: comeback }
          : entry
      )
    );
  };

  const handleDismissRageBait = () => {
    setActiveRageBait(null);
  };

  const handleSnoozeDrama = (_guiltTrip: string) => {
    const until = Date.now() + 60000;
    setSnoozedUntil(until);
    setActiveRageBait(null);
  };

  const remainingInBinCount = binItems.filter((i) => i.status === 'in_bin').length;

  const windowSurfaceClass = (appId: AppId) => {
    const isFocused = focusedWindow === appId;
    if (mood === 'dank_2016') {
      return `dank-static-rainbow-border rounded ${
        isFocused ? 'ring-1 ring-[var(--pookie-focus-ring)]' : ''
      }`;
    }
    return `pookie-window-frame rounded ${
      isFocused ? 'ring-1 ring-[var(--pookie-focus-ring)]' : ''
    }`;
  };

  const windowTitleBarClass = (appId: AppId) => {
    return focusedWindow === appId
      ? 'pookie-titlebar-active'
      : 'pookie-titlebar-inactive';
  };

  const desktopApps: Array<{
    id: AppId;
    iconId: 'calc' | 'bin' | 'notes' | 'terminal';
    label: string;
    smallIcon: React.ReactNode;
  }> = [
    {
      id: 'calc',
      iconId: 'calc',
      label: getLine('shell', mood, 'navCalculator'),
      smallIcon: <Calculator className="w-3.5 h-3.5" />,
    },
    {
      id: 'bin',
      iconId: 'bin',
      label: getLine('shell', mood, 'navRecycleBin'),
      smallIcon: <Trash2 className="w-3.5 h-3.5" />,
    },
    {
      id: 'notes',
      iconId: 'notes',
      label: getLine('shell', mood, 'navNotepad'),
      smallIcon: <FileText className="w-3.5 h-3.5" />,
    },
    {
      id: 'terminal',
      iconId: 'terminal',
      label: getLine('shell', mood, 'navTerminal'),
      smallIcon: <TerminalIcon className="w-3.5 h-3.5" />,
    },
  ];

  const isDesktop = viewport.width >= 1024;

  const getFloatingWindowStyle = (win: WindowConfig): React.CSSProperties => {
    if (!isDesktop) {
      return {
        zIndex: win.zIndex,
      };
    }

    if (win.isMaximized) {
      return {
        left: 96,
        top: 12,
        width: `${Math.max(320, viewport.width - 112)}px`,
        maxHeight: `${Math.max(240, viewport.height - 62)}px`,
        zIndex: win.zIndex + 20,
      };
    }

    // Reserve space on the right for the mood focal composition when window hasn't been manually dragged over it
    const rightPanelReserve = viewport.width < 1280 ? 372 : 452;
    const usableRightEdge = Math.max(460, viewport.width - rightPanelReserve);

    const widthScale =
      viewport.width < 1180 ? 0.81 : viewport.width < 1400 ? 0.91 : 1;
    const effectiveWidth = Math.min(
      Math.round(win.width * widthScale),
      Math.max(300, viewport.width - 116)
    );

    let effectiveX = win.x;
    if (viewport.width < 1400) {
      if (win.id === 'calc' && win.x === 108) {
        effectiveX = 92;
      } else if (win.id === 'bin' && win.x === 512) {
        effectiveX =
          viewport.width < 1280
            ? Math.max(180, usableRightEdge - effectiveWidth - 4)
            : 462;
      }
    }
    effectiveX = Math.max(
      92,
      Math.min(effectiveX, Math.max(92, viewport.width - effectiveWidth - 16))
    );

    const minTop = viewport.width < 1280 ? 108 : 88;
    const maxTopForHeight = Math.max(minTop, viewport.height - 465);
    const effectiveY = Math.max(
      minTop,
      Math.min(win.y, viewport.height < 820 ? maxTopForHeight : viewport.height - 140)
    );
    const availableMaxHeight = Math.max(220, viewport.height - effectiveY - 52);

    return {
      left: `${effectiveX}px`,
      top: `${effectiveY}px`,
      width: `${effectiveWidth}px`,
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: `${availableMaxHeight}px`,
      zIndex: win.zIndex,
    };
  };

  return (
    <div
      data-mood={mood}
      className="pookie-desktop-canvas min-h-dvh w-full overflow-x-hidden lg:h-dvh lg:overflow-hidden flex flex-col relative select-none transition-colors duration-150"
    >
      {/* ====================================================================
       * 1. DESKTOP SURFACE (Wallpaper + Desktop Icons + Windows)
       * ==================================================================== */}
      <main
        id="desktop"
        aria-label={getLine('shell', mood, 'brandTitle')}
        onClick={() => {
          if (startMenuOpen) setStartMenuOpen(false);
        }}
        className="relative flex-1 w-full min-h-0 flex flex-col lg:block lg:h-full lg:overflow-hidden"
      >
        {/* Art-Directed Mood Wallpaper, Top-Right Session Telemetry Plaque, and Workspace Children */}
        <DesktopWallpaper
          mood={mood}
          sessionState={sessionState}
          onAction={handleDispatchAction}
        >
          <div className="flex flex-col gap-3 w-full lg:block lg:h-full">
            {/* Desktop Application Shortcuts (5-col bar on mobile/tablet, left vertical rail on desktop) */}
            <nav
              aria-label="Desktop Shortcuts"
              className="pointer-events-auto w-full grid grid-cols-5 gap-1 sm:gap-2 lg:w-22 xl:w-24 lg:flex lg:flex-col lg:items-center lg:gap-2.5 lg:absolute lg:top-3 lg:left-2 z-10"
            >
              {desktopApps.map((app) => {
                const isOpen = windows[app.id].isOpen && !windows[app.id].isMinimized;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleOpenOrFocusWindow(app.id)}
                    data-testid={`desktop-icon-${app.id}`}
                    className={`group w-full lg:w-22 xl:w-24 min-w-0 flex flex-col items-center gap-1 p-0.5 sm:p-1 rounded text-center cursor-pointer transition-transform active:scale-95 ${
                      isOpen
                        ? 'bg-[var(--pookie-accent-soft)]/90 ring-1 ring-[var(--pookie-border-outer)] shadow-sm'
                        : 'hover:bg-[var(--pookie-surface-primary)]/75'
                    }`}
                  >
                    <PookieAppIcon appId={app.iconId} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm shrink-0" />
                    <span className="px-1 sm:px-1.5 py-0.5 rounded text-[8.5px] sm:text-[10.5px] font-bold leading-tight whitespace-nowrap text-[var(--pookie-text-primary)] bg-[var(--pookie-surface-primary)]/95 border border-[var(--pookie-border-outer)] shadow-2xs">
                      {app.label}
                    </span>
                  </button>
                );
              })}

              {/* Desktop Shutdown Shortcut Icon */}
              <button
                type="button"
                onClick={handleRequestShutdown}
                data-testid="desktop-icon-shutdown"
                className="group w-full lg:w-22 xl:w-24 min-w-0 flex flex-col items-center gap-1 p-0.5 sm:p-1 rounded text-center cursor-pointer transition-transform active:scale-95 hover:bg-[var(--pookie-surface-primary)]/75"
              >
                <PookieAppIcon appId="shutdown" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm shrink-0" />
                <span className="px-1 sm:px-1.5 py-0.5 rounded text-[8.5px] sm:text-[10.5px] font-bold leading-tight whitespace-nowrap text-[var(--pookie-text-primary)] bg-[var(--pookie-surface-primary)]/95 border border-[var(--pookie-border-outer)] shadow-2xs">
                  Shutdown
                </span>
              </button>
            </nav>

            {/* Open Application Windows (Stacked on <1024px, Floating Draggable on >=1024px) */}
            <div className="flex flex-col gap-3 w-full lg:contents">
              {/* WINDOW 1: CALCULATOR */}
              {windows.calc.isOpen && (
                <section
                  aria-label={getLine('calc', mood, 'windowTitle')}
                  onMouseDown={() => bringToFront('calc')}
                  style={getFloatingWindowStyle(windows.calc)}
                  className={`pointer-events-auto relative w-full lg:w-auto lg:absolute flex flex-col ${windowSurfaceClass(
                    'calc'
                  )} overflow-hidden`}
                >
                  {mood === 'dank_2016' && (
                    <div className="h-1 w-full dank-static-rainbow-bar shrink-0" />
                  )}
                  <div
                    onPointerDown={(e) => isDesktop && handleTitleBarPointerDown(e, 'calc')}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 border-b border-[var(--pookie-border-outer)] lg:cursor-move shrink-0 ${windowTitleBarClass(
                      'calc'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Calculator className="w-3.5 h-3.5 shrink-0" />
                      <h2
                        data-testid="window-title-calc"
                        className="text-xs font-bold font-display truncate"
                      >
                        {getLine('calc', mood, 'windowTitle')}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMinimizeWindow('calc');
                        }}
                        aria-label="Toggle Calculator Body"
                        className="pookie-win-ctrl-btn"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMaximizeWindow('calc');
                        }}
                        aria-label="Maximize Calculator Window"
                        className="pookie-win-ctrl-btn"
                      >
                        {windows.calc.isMaximized ? (
                          <Minimize2 className="w-3 h-3" />
                        ) : (
                          <Maximize2 className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseWindow('calc');
                        }}
                        aria-label="Close Calculator Window"
                        className="pookie-win-ctrl-btn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {!windows.calc.isMinimized && (
                    <div className="p-2.5 sm:p-3 overflow-y-auto flex-1 min-h-0">
                      <CalcWindow
                        mood={mood}
                        trustedCount={sessionState.trustedCalcCount}
                        disputedCount={sessionState.disputedCalcCount}
                        onAction={handleDispatchAction}
                      />
                    </div>
                  )}
                </section>
              )}

              {/* WINDOW 2: RECYCLE BIN (Folder Explorer) */}
              {windows.bin.isOpen && (
                <section
                  aria-label={getLine('bin', mood, 'windowTitle')}
                  onMouseDown={() => bringToFront('bin')}
                  style={getFloatingWindowStyle(windows.bin)}
                  className={`pointer-events-auto relative w-full lg:w-auto lg:absolute flex flex-col ${windowSurfaceClass(
                    'bin'
                  )} overflow-hidden`}
                >
                  {mood === 'dank_2016' && (
                    <div className="h-1 w-full dank-static-rainbow-bar shrink-0" />
                  )}
                  <div
                    onPointerDown={(e) => isDesktop && handleTitleBarPointerDown(e, 'bin')}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 border-b border-[var(--pookie-border-outer)] lg:cursor-move shrink-0 ${windowTitleBarClass(
                      'bin'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Trash2 className="w-3.5 h-3.5 shrink-0" />
                      <h2
                        data-testid="window-title-bin"
                        className="text-xs font-bold font-display truncate"
                      >
                        {getLine('bin', mood, 'windowTitle')}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMinimizeWindow('bin');
                        }}
                        aria-label="Toggle Recycle Bin Body"
                        className="pookie-win-ctrl-btn"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMaximizeWindow('bin');
                        }}
                        aria-label="Maximize Recycle Bin Window"
                        className="pookie-win-ctrl-btn"
                      >
                        {windows.bin.isMaximized ? (
                          <Minimize2 className="w-3 h-3" />
                        ) : (
                          <Maximize2 className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseWindow('bin');
                        }}
                        aria-label="Close Recycle Bin Window"
                        className="pookie-win-ctrl-btn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {!windows.bin.isMinimized && (
                    <div className="p-2.5 sm:p-3 overflow-y-auto flex-1 min-h-0 relative">
                      <BinWindow
                        mood={mood}
                        items={binItems}
                        onRestoreItem={handleRestoreBinItem}
                        onShredItem={handleShredBinItem}
                        onRestoreAll={handleRestoreAllBin}
                        onResetBin={handleResetBin}
                      />
                    </div>
                  )}
                </section>
              )}

              {/* WINDOW 3: EPHEMERAL RAM-ONLY NOTEPAD */}
              {windows.notes.isOpen && (
                <section
                  aria-label={getLine('notes', mood, 'windowTitle')}
                  onMouseDown={() => bringToFront('notes')}
                  style={getFloatingWindowStyle(windows.notes)}
                  className={`pointer-events-auto relative w-full lg:w-auto lg:absolute flex flex-col ${windowSurfaceClass(
                    'notes'
                  )} overflow-hidden`}
                >
                  {mood === 'dank_2016' && (
                    <div className="h-1 w-full dank-static-rainbow-bar shrink-0" />
                  )}
                  <div
                    onPointerDown={(e) => isDesktop && handleTitleBarPointerDown(e, 'notes')}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 border-b border-[var(--pookie-border-outer)] lg:cursor-move shrink-0 ${windowTitleBarClass(
                      'notes'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <h2
                        data-testid="window-title-notes"
                        className="text-xs font-bold font-display truncate"
                      >
                        {getLine('notes', mood, 'windowTitle')}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMinimizeWindow('notes');
                        }}
                        aria-label="Toggle Notepad Body"
                        className="pookie-win-ctrl-btn"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMaximizeWindow('notes');
                        }}
                        aria-label="Maximize Notepad Window"
                        className="pookie-win-ctrl-btn"
                      >
                        {windows.notes.isMaximized ? (
                          <Minimize2 className="w-3 h-3" />
                        ) : (
                          <Maximize2 className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseWindow('notes');
                        }}
                        aria-label="Close Notepad Window"
                        className="pookie-win-ctrl-btn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-2.5 sm:p-3 overflow-y-auto flex-1 min-h-0 ${
                      windows.notes.isMinimized ? 'hidden' : 'block'
                    }`}
                  >
                    <NotesWindow mood={mood} onAction={handleDispatchAction} />
                  </div>
                </section>
              )}

              {/* WINDOW 4: TERMINAL */}
              {windows.terminal.isOpen && (
                <section
                  aria-label={getLine('terminal', mood, 'windowTitle')}
                  onMouseDown={() => bringToFront('terminal')}
                  style={getFloatingWindowStyle(windows.terminal)}
                  className={`pointer-events-auto relative w-full lg:w-auto lg:absolute flex flex-col ${windowSurfaceClass(
                    'terminal'
                  )} overflow-hidden`}
                >
                  {mood === 'dank_2016' && (
                    <div className="h-1 w-full dank-static-rainbow-bar shrink-0" />
                  )}
                  <div
                    onPointerDown={(e) => isDesktop && handleTitleBarPointerDown(e, 'terminal')}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 border-b border-[var(--pookie-border-outer)] lg:cursor-move shrink-0 ${windowTitleBarClass(
                      'terminal'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TerminalIcon className="w-3.5 h-3.5 shrink-0" />
                      <h2
                        data-testid="window-title-terminal"
                        className="text-xs font-bold font-display truncate"
                      >
                        {getLine('terminal', mood, 'windowTitle')}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMinimizeWindow('terminal');
                        }}
                        aria-label="Toggle Terminal Body"
                        className="pookie-win-ctrl-btn"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMaximizeWindow('terminal');
                        }}
                        aria-label="Maximize Terminal Window"
                        className="pookie-win-ctrl-btn"
                      >
                        {windows.terminal.isMaximized ? (
                          <Minimize2 className="w-3 h-3" />
                        ) : (
                          <Maximize2 className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseWindow('terminal');
                        }}
                        aria-label="Close Terminal Window"
                        className="pookie-win-ctrl-btn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-2.5 sm:p-3 overflow-y-auto flex-1 min-h-0 ${
                      windows.terminal.isMinimized ? 'hidden' : 'block'
                    }`}
                  >
                    <TerminalWindow
                      mood={mood}
                      sessionState={sessionState}
                      remainingBinCount={remainingInBinCount}
                      onAction={handleDispatchAction}
                    />
                  </div>
                </section>
              )}
            </div>
          </div>
        </DesktopWallpaper>
      </main>

      {/* ====================================================================
       * 2. START MENU POPUP (Triggered from Taskbar Start Button)
       * ==================================================================== */}
      {startMenuOpen && (
        <div
          role="menu"
          aria-label="PookieOS Start Menu"
          data-testid="pookie-start-menu"
          className="pookie-start-menu fixed bottom-12 left-2 sm:left-3 z-50 w-[min(310px,calc(100vw-16px))] max-h-[calc(100dvh-76px)] overflow-y-auto rounded"
        >
          <div className="pookie-titlebar-active flex items-center justify-between px-3 py-2 text-xs font-bold border-b border-[var(--pookie-border-outer)]">
            <div className="flex items-center gap-1.5 min-w-0">
              <PookieMotif mood={mood} variant="badge" className="w-4 h-4 shrink-0" />
              <span className="font-display truncate">
                {getLine('shell', mood, 'brandTitle')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStartMenuOpen(false)}
              aria-label="Close Start Menu"
              className="pookie-win-ctrl-btn"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="p-2 space-y-1 text-xs">
            <div className="px-2 py-1 text-[11px] font-mono text-[var(--pookie-text-muted)]">
              Applications
            </div>
            {desktopApps.map((app) => (
              <button
                key={app.id}
                type="button"
                role="menuitem"
                onClick={() => handleOpenOrFocusWindow(app.id)}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-left hover:bg-[var(--pookie-surface-secondary)] cursor-pointer whitespace-nowrap"
              >
                <span className="pookie-icon-box">{app.smallIcon}</span>
                <span className="font-medium truncate">{app.label}</span>
              </button>
            ))}

            <div className="my-1 border-t border-[var(--pookie-border-subtle)]" />
            <div className="px-2 py-1 text-[11px] font-mono text-[var(--pookie-text-muted)]">
              {getLine('shell', mood, 'moodSelectorLabel')}
            </div>
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  handleMoodChange(m.id);
                  setStartMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded text-left cursor-pointer ${
                  mood === m.id
                    ? 'bg-[var(--pookie-accent-soft)] font-semibold'
                    : 'hover:bg-[var(--pookie-surface-secondary)]'
                }`}
              >
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs font-bold leading-tight">{m.label}</span>
                  <span className="text-[10px] font-mono text-[var(--pookie-text-secondary)] opacity-80 leading-tight">
                    {m.shortName}
                  </span>
                </div>
              </button>
            ))}

            <div className="my-1 border-t border-[var(--pookie-border-subtle)]" />
            {onReturnToLanding && (
              <button
                type="button"
                role="menuitem"
                data-testid="return-to-3d-landing-btn"
                onClick={() => {
                  setStartMenuOpen(false);
                  onReturnToLanding(mapDesktopMoodToLandingMood(mood));
                }}
                className="pookie-btn-base w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded font-semibold cursor-pointer mb-1"
              >
                <span>Reboot 3D CRT Studio</span>
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={handleRequestShutdown}
              className="pookie-btn-accent w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded font-semibold cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              <span>{getLine('shell', mood, 'shutdownBtn')}</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
       * 3. PERSISTENT BOTTOM OS TASKBAR
       * Contains: Start button · Open-app window tabs · Mood Selector · System Tray & Shutdown
       * Wraps cleanly on narrow screens so zero buttons are ever clipped off-screen
       * ==================================================================== */}
      <footer className="pookie-taskbar-surface sticky bottom-0 lg:relative z-40 px-2 sm:px-3 py-1.5 border-t text-xs shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          {/* Left Zone: Start Button + Application Window Tabs */}
          <div className="flex flex-wrap items-center gap-1 min-w-0">
            <button
              type="button"
              onClick={() => setStartMenuOpen((prev) => !prev)}
              aria-expanded={startMenuOpen}
              data-testid="taskbar-start-btn"
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                startMenuOpen ? 'pookie-btn-accent' : 'pookie-btn-base'
              }`}
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Start</span>
            </button>

            <div className="hidden sm:block h-4 w-px bg-[var(--pookie-border-outer)]/40 mx-0.5" />

            {/* Taskbar Window Launcher / Focus Tabs */}
            <div
              role="group"
              aria-label="Desktop Applications"
              className="flex flex-wrap items-center gap-1 min-w-0"
            >
              {desktopApps.map((app) => {
                const win = windows[app.id];
                const isActive =
                  win.isOpen && !win.isMinimized && focusedWindow === app.id;
                return (
                  <button
                    key={app.id}
                    type="button"
                    data-testid={`taskbar-btn-${app.id}`}
                    onClick={() => handleOpenOrFocusWindow(app.id)}
                    className={`px-2 py-1 text-[11px] sm:text-xs rounded inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'pookie-btn-accent font-semibold'
                        : win.isOpen
                        ? 'pookie-desktop-icon-active font-medium'
                        : 'pookie-btn-base opacity-85'
                    }`}
                  >
                    {app.smallIcon}
                    <span>{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Zone: Integrated 4-Mood Switcher */}
          <div
            role="group"
            aria-label="Select BossOS Mood"
            className="flex flex-wrap items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--pookie-border-outer)] bg-[var(--pookie-surface-primary)] min-w-0"
          >
            <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider px-1 text-[var(--pookie-text-secondary)]">
              Mood:
            </span>
            {MOODS.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleMoodChange(m.id)}
                  aria-pressed={active}
                  title={`${m.label} · ${m.shortName}`}
                  className={`px-1.5 sm:px-2 py-0.5 text-left rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active ? 'pookie-btn-accent' : 'pookie-btn-base'
                  }`}
                >
                  <span className="block text-[9.5px] sm:text-[10px] font-bold leading-tight">{m.label}</span>
                  <span className="block text-[8px] sm:text-[8.5px] font-mono opacity-80 leading-tight">{m.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Right Zone: System Tray Telemetry + Primary Shutdown Trigger */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto xl:ml-0">
            <div className="hidden 2xl:flex items-center gap-1.5 px-2 py-1 rounded pookie-surface-inset text-[11px] font-mono tabular-nums">
              <span>#{sessionState.employeeId.toLocaleString('en-US')}</span>
              <span aria-hidden="true">·</span>
              <span>Calc:{sessionState.trustedCalcCount}x</span>
              <span aria-hidden="true">·</span>
              <span>
                Q3:{sessionState.fileRestoreCounts['Q3_Report'] || 0}x
              </span>
            </div>

            {/* Attention Seeker Drama Trigger & Badge */}
            <button
              type="button"
              data-testid="attention-seeker-tray-btn"
              onClick={() => {
                setIsAttentionCenterOpen((prev) => !prev);
                setUnreadDramaCount(0);
              }}
              aria-label="Attention Seeker Drama Center"
              title="Attention Seeker 4031 — Drama Engine"
              className={`pookie-btn-base inline-flex items-center gap-1.5 px-2 py-1 text-[11px] sm:text-xs font-semibold rounded cursor-pointer whitespace-nowrap shrink-0 relative ${
                isAttentionCenterOpen ? 'pookie-btn-accent' : ''
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span className="hidden sm:inline">Drama</span>
              {unreadDramaCount > 0 && (
                <span
                  data-testid="drama-unread-badge"
                  className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-rose-600 text-white animate-bounce leading-tight"
                >
                  {unreadDramaCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleRequestShutdown}
              data-testid="open-shutdown-btn"
              className="pookie-btn-accent inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded cursor-pointer whitespace-nowrap shrink-0"
            >
              <Power className="w-3.5 h-3.5" />
              <span>{getLine('shell', mood, 'shutdownBtn')}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ATTENTION SEEKER 4031 — GEN-Z RAGE BAIT NOTIFICATION */}
      {activeRageBait && (
        <AttentionSeekerToast
          item={activeRageBait}
          mood={mood}
          onReact={handleReactToRageBait}
          onDismiss={handleDismissRageBait}
        />
      )}

      {/* ATTENTION SEEKER CENTER DRAWER / LOG */}
      <AttentionSeekerCenter
        isOpen={isAttentionCenterOpen}
        mood={mood}
        history={rageBaitHistory}
        isMuted={isAttentionSeekerMuted}
        frequency={spamFrequency}
        snoozedUntil={snoozedUntil}
        onClose={() => setIsAttentionCenterOpen(false)}
        onToggleMute={() => setIsAttentionSeekerMuted((m) => !m)}
        onChangeFrequency={(freq) => setSpamFrequency(freq)}
        onSnooze={handleSnoozeDrama}
        onClearHistory={() => setRageBaitHistory([])}
        onSpamNow={triggerRageBaitNow}
      />

      {/* RETRO WINDOWS 98 EMOTIONAL ATTACHMENT NOTIFICATION (Tab Return & 10s Idle) */}
      <AttachmentNotification
        notification={attachmentPopup}
        mood={mood}
        onDismiss={() => setAttachmentPopup(null)}
      />

      {/* SHUTDOWN DRAMA ("Before You Leave...") & HR PERFORMANCE REVIEW MODAL */}
      <HRShutdownModal
        open={shutdownOpen}
        mood={mood}
        sessionState={sessionState}
        remainingBinCount={remainingInBinCount}
        onSafeExit={() => setShutdownOpen(false)}
        onStayWithMe={handleStayWithMe}
        onAction={handleDispatchAction}
      />

      {/* Phase 2 Extensibility Slots */}
      <DesktopStickerLayer mood={mood} enabled={false} />
      <PookieCatAssistant mood={mood} enabled={false} />
    </div>
  );
}

export default function App() {
  const [bootedIntoOS, setBootedIntoOS] = useState<boolean>(false);
  const [selectedLandingMood, setSelectedLandingMood] =
    useState<LandingMoodId>('nineties_nostalgia');

  if (!bootedIntoOS) {
    return (
      <LandingExperience
        initialMood={selectedLandingMood}
        onSelectMood={setSelectedLandingMood}
        onLaunchOS={(moodToBoot) => {
          setSelectedLandingMood(moodToBoot);
          setBootedIntoOS(true);
        }}
      />
    );
  }

  return (
    <PookieDesktop
      initialMood={selectedLandingMood}
      onReturnToLanding={(currentLandingMood) => {
        setSelectedLandingMood(currentLandingMood);
        setBootedIntoOS(false);
      }}
    />
  );
}
