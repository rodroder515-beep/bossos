import React, { useEffect, useRef, useState } from 'react';
import {
  POOKIE_CONFIG,
  getBiosBlocksForElapsedMs,
} from '../../config/pookieLandingConfig';

export interface BiosBootScreenProps {
  /** Called once when the 22-block BIOS POST sequence completes */
  onBootComplete?: () => void;
  /** Optional override for deterministic testing or instant completion */
  forceBlockCount?: number;
  /** Whether the BIOS overlay is fading out during crossfade to mood preview */
  opacity?: number;
  /** Compact mode when rendered inside the 3D CRT monitor mesh */
  compact?: boolean;
}

export const BiosBootScreen: React.FC<BiosBootScreenProps> = ({
  onBootComplete,
  forceBlockCount,
  opacity = 1,
  compact = false,
}) => {
  const [filledBlocks, setFilledBlocks] = useState<number>(() =>
    typeof forceBlockCount === 'number' ? forceBlockCount : 1
  );
  const [statusText, setStatusText] = useState<string>(
    POOKIE_CONFIG.bios.stepSchedule[0].statusText
  );
  const completedRef = useRef(false);
  const onBootCompleteRef = useRef(onBootComplete);
  onBootCompleteRef.current = onBootComplete;

  useEffect(() => {
    if (typeof forceBlockCount === 'number') {
      setFilledBlocks(forceBlockCount);
      return;
    }

    const startTime = performance.now();
    const fillDurationMs = POOKIE_CONFIG.bios.fillDurationMs;
    const stageDurationMs = POOKIE_CONFIG.bios.stageDurationMs;

    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const stepState = getBiosBlocksForElapsedMs(elapsed, fillDurationMs);
      setFilledBlocks(stepState.blocks);
      setStatusText(stepState.statusText);

      if (elapsed >= stageDurationMs && !completedRef.current) {
        completedRef.current = true;
        window.clearInterval(intervalId);
        onBootCompleteRef.current?.();
      }
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [forceBlockCount]);

  const totalBlocks = POOKIE_CONFIG.bios.totalBlocks;
  const chromaticShadow =
    '-1.5px 0 rgba(255,0,80,0.4), 1.5px 0 rgba(0,220,255,0.4), 0 0 12px rgba(200,215,255,0.6)';

  return (
    <div
      data-testid="bios-boot-screen"
      aria-label="PookieOS BIOS Bootloader"
      style={{
        opacity,
        transition: 'opacity 480ms cubic-bezier(0.22, 1, 0.36, 1)',
        background: `radial-gradient(ellipse at 50% 46%, #2426A8 0%, ${POOKIE_CONFIG.bios.primaryBlue} 58%, ${POOKIE_CONFIG.bios.vignetteDarkBlue} 100%)`,
        color: POOKIE_CONFIG.bios.phosphorWhite,
        boxShadow: 'inset 0 0 90px rgba(5, 6, 38, 0.92)',
      }}
      className="relative w-full h-full overflow-hidden select-none font-mono"
    >
      {/* Inline keyframes for subtle CRT phosphor flicker */}
      <style>{`
        @keyframes crtFlicker {
          0%, 100% { filter: brightness(1.0); }
          50% { filter: brightness(0.975); }
        }
      `}</style>

      {/* Main CRT Phosphor Layer */}
      <div
        className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14"
      >
        {/* 8.3 Centered Cohesive Branding Group (Logo-Only + Bringbold Nineties Typography) */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-6 md:gap-8 z-10 pt-2 sm:pt-4 mx-auto w-full text-center">
          {/* Logo-Only Image (Retro Computer Sticker without text, matching heading height) */}
          <img
            src={POOKIE_CONFIG.brand.logoOnlyPath || '/assets/logo-only.png'}
            alt="POOKIE OS Logo"
            className={
              compact
                ? 'h-12 sm:h-16 w-auto object-contain shrink-0 drop-shadow-[0_0_16px_rgba(226,230,255,0.7)] select-none'
                : 'h-14 sm:h-20 md:h-24 lg:h-28 w-auto object-contain shrink-0 drop-shadow-[0_0_22px_rgba(226,230,255,0.75)] select-none'
            }
          />

          {/* Heading: Exact Brand Name "POOKIE OS" (No underscore, Bringbold Nineties inspired vintage high-contrast serif) */}
          <h1
            data-testid="bios-brand-wordmark"
            style={{
              fontFamily:
                "'Fraunces', 'Abril Fatface', 'Playfair Display', 'Instrument Serif', Georgia, serif",
              fontStyle: 'normal',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#E2E6FF',
              textShadow: chromaticShadow,
              lineHeight: 1.0,
            }}
            className={
              compact
                ? 'text-4xl sm:text-5xl md:text-6xl tracking-tight select-none font-black'
                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight select-none font-black'
            }
          >
            POOKIE OS
          </h1>
        </div>

        {/* 8.4 Center Bootloader Block */}
        <div className="my-auto flex flex-col items-center justify-center text-center z-10 px-2">
          <p
            style={{ textShadow: chromaticShadow }}
            className={
              compact
                ? 'text-xs sm:text-sm tracking-wide text-[#E2E6FF] mb-1 font-mono'
                : 'text-sm sm:text-lg md:text-xl tracking-wide text-[#E2E6FF] mb-1.5 font-mono'
            }
          >
            {POOKIE_CONFIG.bios.studioLine}
          </p>
          <p
            style={{ textShadow: chromaticShadow }}
            className={
              compact
                ? 'text-[11px] sm:text-xs tracking-wider text-[#E2E6FF]/95 mb-4 font-mono'
                : 'text-xs sm:text-base md:text-lg tracking-wider text-[#E2E6FF]/95 mb-5 font-mono'
            }
          >
            {POOKIE_CONFIG.bios.kernelLine}
          </p>

          {/* Stepped Progress Bar Specification: 340px x 36px, 2px solid #D0D6FF, padding 4px, 22 discrete blocks */}
          <div
            data-testid="bios-progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalBlocks}
            aria-valuenow={filledBlocks}
            style={{
              width: 'min(340px, 88vw)',
              height: '36px',
              border: `2px solid ${POOKIE_CONFIG.bios.borderLightBlue}`,
              padding: '4px',
              boxShadow:
                '0 0 14px rgba(208, 214, 255, 0.38), inset 0 0 8px rgba(208, 214, 255, 0.22)',
              backgroundColor: 'rgba(11, 12, 72, 0.55)',
            }}
            className="flex flex-row items-stretch"
          >
            <div
              style={{ gap: '3px' }}
              className="w-full h-full flex flex-row items-stretch"
            >
              {Array.from({ length: totalBlocks }).map((_, idx) => {
                const isFilled = idx < filledBlocks;
                return (
                  <div
                    key={idx}
                    data-testid={
                      isFilled ? 'bios-block-filled' : 'bios-block-empty'
                    }
                    style={{
                      width: '10px',
                      flex: '1 1 10px',
                      backgroundColor: isFilled
                        ? POOKIE_CONFIG.bios.phosphorWhite
                        : 'transparent',
                      boxShadow: isFilled
                        ? '0 0 8px rgba(226, 230, 255, 0.75)'
                        : 'none',
                    }}
                    className="h-full"
                  />
                );
              })}
            </div>
          </div>

          {/* Diagnostic POST Status Telemetry Line */}
          <p
            style={{ textShadow: chromaticShadow }}
            className="mt-3 text-[10px] sm:text-xs tracking-[0.14em] uppercase text-[#D0D6FF]/85 font-mono"
          >
            {statusText} [{Math.round((filledBlocks / totalBlocks) * 100)}%]
          </p>
        </div>

        {/* 8.5 Bottom Copyright Line */}
        <div className="w-full text-center z-10 pb-1">
          <p
            style={{ textShadow: chromaticShadow }}
            className={
              compact
                ? 'text-[10px] sm:text-xs tracking-wide text-[#E2E6FF]/90 font-mono'
                : 'text-xs sm:text-sm md:text-base tracking-wide text-[#E2E6FF]/90 font-mono'
            }
          >
            {POOKIE_CONFIG.bios.copyrightLine}
          </p>
        </div>
      </div>

      {/* 8.6 CRT Horizontal Scanlines Overlay */}
      <div
        aria-hidden="true"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px)',
        }}
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* 8.6 Curved Glass Highlight Reflection */}
      <div
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 45%)',
        }}
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* Curved CRT Corner Vignette Bevel */}
      <div
        aria-hidden="true"
        style={{
          boxShadow:
            'inset 0 0 65px rgba(0,0,0,0.65), inset 0 0 18px rgba(140,165,255,0.22)',
        }}
        className="pointer-events-none absolute inset-0 z-30 rounded-[18px]"
      />
    </div>
  );
};

export default BiosBootScreen;
