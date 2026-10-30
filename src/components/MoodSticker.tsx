import React from 'react';
import { MoodId } from '../core/mood';
import {
  getStickerByZone,
  MoodStickerSpec,
  StickerPlacementZone,
} from '../core/stickers';

interface MoodStickerProps {
  mood: MoodId;
  zone: StickerPlacementZone;
  className?: string;
}

/**
 * Renders a single die-cut sticker for a given mood and placement zone
 * with tactile physical-sticker drop-shadow, rotation, and scale.
 */
export const MoodSticker: React.FC<MoodStickerProps> = ({
  mood,
  zone,
  className = '',
}) => {
  const spec = getStickerByZone(mood, zone);
  if (!spec) return null;

  return <StickerImage spec={spec} className={className} />;
};

interface StickerImageProps {
  spec: MoodStickerSpec;
  className?: string;
}

export const StickerImage: React.FC<StickerImageProps> = ({
  spec,
  className = '',
}) => {
  const minWidthPx =
    spec.zone === 'window-bin-corner'
      ? Math.max(36, Math.round(spec.widthPx * 0.78))
      : Math.max(54, Math.round(spec.widthPx * 0.62));
  const vwRatio =
    spec.zone === 'window-bin-corner'
      ? (spec.widthPx / 11.5).toFixed(2)
      : (spec.widthPx / 13.8).toFixed(2);

  return (
    <img
      src={spec.src}
      alt={spec.alt}
      data-testid={`mood-sticker-${spec.id}`}
      data-sticker-zone={spec.zone}
      draggable={false}
      style={{
        width: `clamp(${minWidthPx}px, ${vwRatio}vw, ${spec.widthPx}px)`,
        maxWidth: '100%',
        height: 'auto',
        transform: `rotate(${spec.rotateDeg}deg)`,
        filter:
          'drop-shadow(0px 1px 0px rgba(17, 17, 17, 0.35)) drop-shadow(3px 4px 0px rgba(17, 17, 17, 0.28))',
      }}
      className={`pointer-events-none select-none object-contain h-auto shrink-0 ${className}`}
    />
  );
};

interface DesktopStickerCollageProps {
  mood: MoodId;
}

/**
 * Renders an art-directed cluster of mood-matched die-cut stickers
 * across the lower desktop canvas (between the floating app windows and the
 * bottom wallpaper colophon), scaling and wrapping cleanly across all screen sizes.
 */
export const DesktopStickerCollage: React.FC<DesktopStickerCollageProps> = ({
  mood,
}) => {
  const leftSticker = getStickerByZone(mood, 'desktop-collage-left');
  const centerSticker = getStickerByZone(mood, 'desktop-collage-center');
  const rightSticker = getStickerByZone(mood, 'desktop-collage-right');
  const focalPrimary = getStickerByZone(mood, 'focal-primary');
  const focalSecondary = getStickerByZone(mood, 'focal-secondary');

  return (
    <div
      data-testid="desktop-sticker-collage"
      className="pointer-events-none select-none w-full flex flex-wrap lg:flex-nowrap items-end justify-center sm:justify-between gap-3 sm:gap-4 py-1 px-2"
    >
      <div className="flex flex-wrap sm:flex-nowrap items-end justify-center gap-3 sm:gap-4 xl:gap-6 min-w-0">
        {leftSticker && <StickerImage spec={leftSticker} />}
        {centerSticker && <StickerImage spec={centerSticker} />}
        {rightSticker && <StickerImage spec={rightSticker} />}
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-end justify-center gap-3 sm:gap-4 xl:gap-5 min-w-0">
        {focalPrimary && <StickerImage spec={focalPrimary} />}
        {focalSecondary && <StickerImage spec={focalSecondary} />}
      </div>
    </div>
  );
};

