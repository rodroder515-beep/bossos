import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import {
  LANDING_MOOD_ORDER,
  LandingMoodId,
  POOKIE_CONFIG,
} from '../../config/pookieLandingConfig';
import { BiosBootScreen } from './BiosBootScreen';
import { RetroComputer3D } from './RetroComputer3D';

gsap.ticker.lagSmoothing(0);

export type LandingStage = 'bios' | 'pullback' | 'interactive' | 'diving';
type NavDrawerId = 'moods' | 'specs' | 'hr' | null;

export interface LandingExperienceProps {
  initialMood?: LandingMoodId;
  onSelectMood?: (mood: LandingMoodId) => void;
  onLaunchOS: (selectedMood: LandingMoodId) => void;
}

interface CameraRigProps {
  stage: LandingStage;
  onPullBackProgress: (progress: number) => void;
  onPullBackComplete: () => void;
  onDiveFlash: () => void;
  onDiveComplete: () => void;
}

/**
 * Generates a soft procedural radial smoke texture on an HTML5 Canvas
 * so atmospheric ground smoke works 100% offline with zero external image dependencies.
 */
function createProceduralSmokeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, 'rgba(218, 226, 255, 0.95)');
    grad.addColorStop(0.38, 'rgba(175, 195, 245, 0.48)');
    grad.addColorStop(0.72, 'rgba(110, 135, 200, 0.14)');
    grad.addColorStop(1, 'rgba(7, 7, 9, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * 3–4 translucent drifting ground smoke planes positioned near the lower-left
 * and center base of the computer (`opacity: 0.18`).
 */
const AtmosphericGroundSmoke: React.FC<{ visible: boolean }> = ({ visible }) => {
  const smokeGroupRef = useRef<THREE.Group>(null);
  const smokeTexture = useMemo(() => createProceduralSmokeTexture(), []);

  const planes = useMemo(
    () => [
      {
        id: 'smoke-left-low',
        basePos: [-0.85, -0.32, 1.05] as [number, number, number],
        scale: [2.5, 1.35, 1] as [number, number, number],
        speed: 0.22,
        phase: 0.0,
        tint: '#9BB8FF',
      },
      {
        id: 'smoke-center-front',
        basePos: [-0.1, -0.34, 1.25] as [number, number, number],
        scale: [2.8, 1.4, 1] as [number, number, number],
        speed: 0.17,
        phase: 1.7,
        tint: '#D8CFC2',
      },
      {
        id: 'smoke-left-mid',
        basePos: [-1.25, -0.18, 0.65] as [number, number, number],
        scale: [2.3, 1.25, 1] as [number, number, number],
        speed: 0.14,
        phase: 3.1,
        tint: '#6F98FF',
      },
      {
        id: 'smoke-right-base',
        basePos: [0.55, -0.33, 0.95] as [number, number, number],
        scale: [2.2, 1.2, 1] as [number, number, number],
        speed: 0.19,
        phase: 4.5,
        tint: '#FFE6C8',
      },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!smokeGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetOpacity = visible
      ? POOKIE_CONFIG.lighting.groundSmokeTargetOpacity
      : 0;

    smokeGroupRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      const spec = planes[idx];
      if (!spec) return;
      mesh.position.x =
        spec.basePos[0] + Math.sin(t * spec.speed + spec.phase) * 0.16;
      mesh.position.y =
        spec.basePos[1] + Math.cos(t * spec.speed * 0.8 + spec.phase) * 0.03;

      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          targetOpacity,
          Math.min(1, delta * 2.5)
        );
      }
    });
  });

  return (
    <group ref={smokeGroupRef} name="AtmosphericGroundSmokePlanes">
      {planes.map((p) => (
        <mesh
          key={p.id}
          position={p.basePos}
          scale={p.scale}
          rotation={[-0.18, 0, 0]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={smokeTexture}
            color={p.tint}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Orchestrates the 3-Stage GSAP Camera Choreography & Mouse Parallax:
 * - Stage 1 (0.0s–3.2s): Close-up `[0.35, 0.28, 0.92]`, `fov: 32`
 * - Stage 2 (3.2s–5.6s): Pull-back `[-0.55, 0.22, 3.45]` looking at `[-0.15, 0.08, 0]` (`power3.inOut`)
 * - Stage 3 (1.4s): Dive into CRT `[0.35, 0.28, 0.65]` (`power4.inOut`)
 */
const CinematicCameraRig: React.FC<CameraRigProps> = ({
  stage,
  onPullBackProgress,
  onPullBackComplete,
  onDiveFlash,
  onDiveComplete,
}) => {
  const { camera, pointer, size } = useThree();
  const lookAtTarget = useRef(
    new THREE.Vector3(...POOKIE_CONFIG.camera.stage1.lookAt)
  );
  const baseCameraPos = useRef(
    new THREE.Vector3(...POOKIE_CONFIG.camera.stage1.position)
  );
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const flashFiredRef = useRef(false);

  const onPullBackProgressRef = useRef(onPullBackProgress);
  onPullBackProgressRef.current = onPullBackProgress;
  const onPullBackCompleteRef = useRef(onPullBackComplete);
  onPullBackCompleteRef.current = onPullBackComplete;
  const onDiveFlashRef = useRef(onDiveFlash);
  onDiveFlashRef.current = onDiveFlash;
  const onDiveCompleteRef = useRef(onDiveComplete);
  onDiveCompleteRef.current = onDiveComplete;

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = aspect < 0.9 ? 42 : aspect < 1.3 ? 36 : POOKIE_CONFIG.camera.stage1.fov;
      camera.updateProjectionMatrix();
    }
    camera.position.set(...POOKIE_CONFIG.camera.stage1.position);
    lookAtTarget.current.set(...POOKIE_CONFIG.camera.stage1.lookAt);
    camera.lookAt(lookAtTarget.current);
  }, [camera, size.width, size.height]);

  useEffect(() => {
    if (stage === 'pullback') {
      timelineRef.current?.kill();
      const proxy = {
        px: camera.position.x,
        py: camera.position.y,
        pz: camera.position.z,
        lx: lookAtTarget.current.x,
        ly: lookAtTarget.current.y,
        lz: lookAtTarget.current.z,
      };

      const aspect = size.width / Math.max(1, size.height);
      const isPortrait = aspect < 1.2;
      const zScale = isPortrait ? Math.min(1.48, 1.25 / Math.max(0.46, aspect)) : 1;
      const targetX = isPortrait ? -0.1 : POOKIE_CONFIG.camera.stage2.position[0];
      const targetY = isPortrait ? 0.32 : POOKIE_CONFIG.camera.stage2.position[1];
      const targetZ = POOKIE_CONFIG.camera.stage2.position[2] * zScale;
      const [lookX, lookY, lookZ] = isPortrait
        ? [-0.05, 0.12, 0]
        : POOKIE_CONFIG.camera.stage2.lookAt;

      const tl = gsap.timeline({
        onUpdate: () => {
          baseCameraPos.current.set(proxy.px, proxy.py, proxy.pz);
          camera.position.copy(baseCameraPos.current);
          lookAtTarget.current.set(proxy.lx, proxy.ly, proxy.lz);
          camera.lookAt(lookAtTarget.current);
          onPullBackProgressRef.current(tl.progress());
        },
        onComplete: () => {
          baseCameraPos.current.set(targetX, targetY, targetZ);
          lookAtTarget.current.set(lookX, lookY, lookZ);
          onPullBackProgressRef.current(1);
          onPullBackCompleteRef.current();
        },
      });

      tl.to(proxy, {
        px: targetX,
        py: targetY,
        pz: targetZ,
        lx: lookX,
        ly: lookY,
        lz: lookZ,
        duration: POOKIE_CONFIG.camera.stage2.durationSec,
        ease: POOKIE_CONFIG.camera.stage2.ease,
      });

      timelineRef.current = tl;
    } else if (stage === 'diving') {
      timelineRef.current?.kill();
      flashFiredRef.current = false;

      const proxy = {
        px: camera.position.x,
        py: camera.position.y,
        pz: camera.position.z,
        lx: lookAtTarget.current.x,
        ly: lookAtTarget.current.y,
        lz: lookAtTarget.current.z,
      };

      const [diveX, diveY, diveZ] = POOKIE_CONFIG.camera.stage3.position;
      const [lookX, lookY, lookZ] = POOKIE_CONFIG.camera.stage3.lookAt;
      const totalDuration = POOKIE_CONFIG.camera.stage3.durationSec;
      const flashRatio =
        POOKIE_CONFIG.camera.stage3.flashTriggerSec / totalDuration;

      const tl = gsap.timeline({
        onUpdate: () => {
          camera.position.set(proxy.px, proxy.py, proxy.pz);
          lookAtTarget.current.set(proxy.lx, proxy.ly, proxy.lz);
          camera.lookAt(lookAtTarget.current);

          if (!flashFiredRef.current && tl.progress() >= flashRatio) {
            flashFiredRef.current = true;
            onDiveFlashRef.current();
          }
        },
        onComplete: () => {
          if (!flashFiredRef.current) {
            flashFiredRef.current = true;
            onDiveFlashRef.current();
          }
          onDiveCompleteRef.current();
        },
      });

      tl.to(proxy, {
        px: diveX,
        py: diveY,
        pz: diveZ,
        lx: lookX,
        ly: lookY,
        lz: lookZ,
        duration: totalDuration,
        ease: POOKIE_CONFIG.camera.stage3.ease,
      });

      timelineRef.current = tl;
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [stage, camera]);

  // Subtle damped mouse parallax once Stage 2 pull-back completes
  useFrame((_, delta) => {
    if (stage === 'interactive') {
      const targetX =
        POOKIE_CONFIG.camera.stage2.position[0] +
        pointer.x * POOKIE_CONFIG.camera.stage2.parallaxX;
      const targetY =
        POOKIE_CONFIG.camera.stage2.position[1] +
        pointer.y * POOKIE_CONFIG.camera.stage2.parallaxY;
      const targetZ = POOKIE_CONFIG.camera.stage2.position[2];

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        targetX,
        Math.min(1, delta * 4.5)
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        targetY,
        Math.min(1, delta * 4.5)
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        targetZ,
        Math.min(1, delta * 4.5)
      );
      camera.lookAt(lookAtTarget.current);
    }
  });

  return null;
};

export const LandingExperience: React.FC<LandingExperienceProps> = ({
  initialMood = 'nineties_nostalgia',
  onSelectMood,
  onLaunchOS,
}) => {
  const [selectedMood, setSelectedMood] = useState<LandingMoodId>(initialMood);
  const [stage, setStage] = useState<LandingStage>('bios');
  const [uiVisible, setUiVisible] = useState(false);
  const [crtFlashActive, setCrtFlashActive] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<NavDrawerId>(null);
  const [hrComplaintText, setHrComplaintText] = useState('');
  const [hrTicketNotice, setHrTicketNotice] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  const crtPortalRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasLaunchedRef = useRef(false);
  const isDivingRef = useRef(false);
  const selectedMoodRef = useRef<LandingMoodId>(selectedMood);
  selectedMoodRef.current = selectedMood;
  const onLaunchOSRef = useRef(onLaunchOS);
  onLaunchOSRef.current = onLaunchOS;

  const activeMoodConfig = POOKIE_CONFIG.moods[selectedMood];

  useEffect(() => {
    setVideoError(false);
    const vid = videoRef.current;
    if (vid) {
      vid.load();
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Graceful fallback if autoplay is blocked
        });
      }
    }
  }, [selectedMood, activeMoodConfig.previewVideoPath]);

  const handleMoodSelect = useCallback(
    (mood: LandingMoodId) => {
      setSelectedMood(mood);
      selectedMoodRef.current = mood;
      onSelectMood?.(mood);
    },
    [onSelectMood]
  );

  const handleBiosComplete = useCallback(() => {
    setStage((prev) => (prev === 'bios' ? 'pullback' : prev));
  }, []);

  const handlePullBackProgress = useCallback((progress: number) => {
    if (progress >= POOKIE_CONFIG.camera.stage2.uiRevealProgress) {
      setUiVisible(true);
    }
  }, []);

  const handlePullBackComplete = useCallback(() => {
    setUiVisible(true);
    setStage((prev) => (prev === 'pullback' ? 'interactive' : prev));
  }, []);

  // Deterministic stage progression timers
  useEffect(() => {
    if (stage === 'bios') {
      const tBios = window.setTimeout(() => {
        setStage((prev) => (prev === 'bios' ? 'pullback' : prev));
      }, POOKIE_CONFIG.bios.stageDurationMs + 50);
      return () => window.clearTimeout(tBios);
    }

    if (stage === 'pullback') {
      const revealMs =
        POOKIE_CONFIG.camera.stage2.durationSec *
        POOKIE_CONFIG.camera.stage2.uiRevealProgress *
        1000;
      const completeMs = POOKIE_CONFIG.camera.stage2.durationSec * 1000;

      const t1 = window.setTimeout(() => setUiVisible(true), revealMs);
      const t2 = window.setTimeout(() => {
        setUiVisible(true);
        setStage((prev) => (prev === 'pullback' ? 'interactive' : prev));
      }, completeMs + 60);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    if (stage === 'diving') {
      const flashMs = POOKIE_CONFIG.camera.stage3.flashTriggerSec * 1000;
      const completeMs = POOKIE_CONFIG.camera.stage3.durationSec * 1000;

      const tFlash = window.setTimeout(() => setCrtFlashActive(true), flashMs);
      const tDone = window.setTimeout(() => {
        if (!hasLaunchedRef.current) {
          hasLaunchedRef.current = true;
          onLaunchOSRef.current(selectedMoodRef.current);
        }
      }, completeMs + 60);

      return () => {
        window.clearTimeout(tFlash);
        window.clearTimeout(tDone);
      };
    }
  }, [stage]);

  const triggerDiveIntoOS = useCallback((overrideMood?: LandingMoodId) => {
    if (isDivingRef.current || hasLaunchedRef.current) return;
    if (overrideMood) {
      selectedMoodRef.current = overrideMood;
      setSelectedMood(overrideMood);
    }
    isDivingRef.current = true;
    setActiveDrawer(null);
    setUiVisible(false);
    setStage('diving');
  }, []);

  const handleDiveFlash = useCallback(() => {
    setCrtFlashActive(true);
  }, []);

  const handleDiveComplete = useCallback(() => {
    if (hasLaunchedRef.current) return;
    hasLaunchedRef.current = true;
    onLaunchOSRef.current(selectedMoodRef.current);
  }, []);

  // Keyboard [ENTER] listener to launch OS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        !activeDrawer &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'INPUT'
      ) {
        e.preventDefault();
        triggerDiveIntoOS();
      } else if (e.key === 'Escape' && activeDrawer) {
        setActiveDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDrawer, triggerDiveIntoOS]);

  // Scroll-down trigger during Stage 2 interactive studio view
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (stage === 'interactive' && !activeDrawer && e.deltaY > 28) {
        triggerDiveIntoOS();
      }
    },
    [stage, activeDrawer, triggerDiveIntoOS]
  );

  return (
    <div
      data-testid="pookie-landing-experience"
      onWheel={handleWheel}
      style={{ backgroundColor: POOKIE_CONFIG.lighting.voidBackground }}
      className="relative w-screen h-screen overflow-hidden select-none"
    >
      {/* ==================================================================
          FULL-VIEWPORT 3D WEBGL STUDIO SCENE (@react-three/fiber Canvas)
         ================================================================== */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows="percentage"
          dpr={[1, 1.5]}
          camera={{
            position: POOKIE_CONFIG.camera.stage1.position,
            fov: POOKIE_CONFIG.camera.stage1.fov,
            near: 0.05,
            far: 30,
          }}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl, scene }) => {
            scene.background = new THREE.Color(
              POOKIE_CONFIG.lighting.voidBackground
            );
            scene.fog = new THREE.FogExp2(
              POOKIE_CONFIG.lighting.voidBackground,
              0.14
            );
            const debugInfo = gl
              .getContext()
              .getExtension('WEBGL_debug_renderer_info');
            const rendererStr = debugInfo
              ? gl
                  .getContext()
                  .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
              : '';
            const isSoftwareGl = /SwiftShader|llvmpipe|softpipe/i.test(
              String(rendererStr)
            );
            if (isSoftwareGl) {
              gl.setPixelRatio(1);
              gl.shadowMap.enabled = false;
            }
          }}
        >
          {/* Ambient studio fill */}
          <ambientLight intensity={0.42} color="#D8D4EC" />

          {/* 9.2 Warm Key Spotlight from Top-Right (#FFE6C8, intensity 2.5) */}
          <spotLight
            position={POOKIE_CONFIG.lighting.warmKeySpotlight.position}
            intensity={POOKIE_CONFIG.lighting.warmKeySpotlight.intensity}
            color={POOKIE_CONFIG.lighting.warmKeySpotlight.color}
            angle={0.58}
            penumbra={0.75}
            distance={14}
            decay={1.4}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />

          {/* 9.2 Cool Cyber Rim Light from Back-Left (#4A7CFF, intensity 1.4) */}
          <spotLight
            position={POOKIE_CONFIG.lighting.coolRimLight.position}
            intensity={POOKIE_CONFIG.lighting.coolRimLight.intensity}
            color={POOKIE_CONFIG.lighting.coolRimLight.color}
            angle={0.72}
            penumbra={0.85}
            distance={14}
            decay={1.4}
          />

          {/* Secondary subtle front studio fill for keyboard keycap definition */}
          <directionalLight
            position={[-1.2, 1.8, 2.8]}
            intensity={0.55}
            color="#FFF5E4"
          />

          {/* 3-Stage GSAP Camera Rig */}
          <CinematicCameraRig
            stage={stage}
            onPullBackProgress={handlePullBackProgress}
            onPullBackComplete={handlePullBackComplete}
            onDiveFlash={handleDiveFlash}
            onDiveComplete={handleDiveComplete}
          />

          {/* 10. Hero 3D Retro All-in-One Computer */}
          <RetroComputer3D
            selectedMood={selectedMood}
            stage={stage}
            crtFlashActive={crtFlashActive}
            onMonitorClick={() => triggerDiveIntoOS()}
            crtPortalRef={crtPortalRef}
          />

          {/* 9.3 Atmospheric Ground Smoke / Fog Planes */}
          <AtmosphericGroundSmoke visible={stage !== 'bios'} />
        </Canvas>
      </div>

      {/* ==================================================================
          PROJECTED 3D CRT SCREEN PORTAL & HARDWARE NAMEPLATE OVERLAY
          Updated directly via crtPortalRef in useFrame with zero React re-renders.
         ================================================================== */}
      <div
        ref={crtPortalRef}
        style={{
          left: '740px',
          top: '210px',
          width: '410px',
          height: '280px',
          opacity: stage === 'bios' ? 0 : 1,
          transition: 'opacity 500ms ease-out',
        }}
        className="fixed z-10 pointer-events-auto"
      >
        {/* Interactive Curved CRT Glass Screen */}
        <div
          data-testid="crt-monitor-screen"
          role="button"
          tabIndex={0}
          aria-label={`Boot PookieOS in ${activeMoodConfig.name} mood`}
          onClick={() => triggerDiveIntoOS()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerDiveIntoOS();
            }
          }}
          style={{
            backgroundColor: activeMoodConfig.palette.primary,
            boxShadow: `0 0 26px ${activeMoodConfig.palette.glow}44, inset 0 0 36px rgba(0,0,0,0.82)`,
          }}
          className="relative w-full h-full rounded-[14px] overflow-hidden border-2 border-[#D0D6FF]/30 cursor-pointer flex flex-col justify-between group"
        >
          {!videoError ? (
            <video
              ref={videoRef}
              key={activeMoodConfig.previewVideoPath}
              src={activeMoodConfig.previewVideoPath}
              poster={activeMoodConfig.posterFallbackPath}
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              style={{
                backgroundColor: activeMoodConfig.palette.primary,
                color: activeMoodConfig.palette.text,
              }}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 text-center"
            >
              <img
                src={activeMoodConfig.posterFallbackPath}
                alt={activeMoodConfig.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <div className="font-serif italic font-bold text-lg">
                {activeMoodConfig.name}
              </div>
            </div>
          )}

          {/* Top CRT On-Screen Display (OSD) Telemetry Overlay */}
          <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-black/85 via-black/50 to-transparent text-white font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span
                style={{
                  backgroundColor: activeMoodConfig.palette.accent,
                  boxShadow: `0 0 8px ${activeMoodConfig.palette.accent}`,
                }}
                className="inline-block w-2 h-2 rounded-full shrink-0"
              />
              <span
                data-testid="crt-osd-label"
                className="font-bold tracking-wider text-[#F3EDE2] truncate"
              >
                {activeMoodConfig.previewLabel}
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] text-white/75 shrink-0 ml-2">
              60Hz
            </span>
          </div>

          {/* Bottom CRT Launch Strip */}
          <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white font-mono text-[10px]">
            <span className="truncate text-white/85">
              {activeMoodConfig.eraSubtitle}
            </span>
            <span
              style={{ borderColor: activeMoodConfig.palette.accent }}
              className="px-1.5 py-0.5 border bg-black/70 uppercase tracking-wider font-bold text-[#FFF8EE] group-hover:bg-white group-hover:text-black transition-colors shrink-0 ml-2"
            >
              [ BOOT ]
            </span>
          </div>

          {/* CRT Scanlines & Curved Glass Specular Reflection */}
          <div
            aria-hidden="true"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.26) 0px, rgba(0,0,0,0.26) 1px, transparent 1px, transparent 3px)',
            }}
            className="pointer-events-none absolute inset-0 z-20"
          />
          <div
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 45%)',
            }}
            className="pointer-events-none absolute inset-0 z-20"
          />
        </div>

        {/* Physical Hardware Nameplate Strip Directly Below Screen Bezel */}
        <div
          data-testid="hardware-nameplate-strip"
          style={{
            marginTop: '10px',
          }}
          className="w-full h-7 px-2.5 flex items-center justify-between bg-[#141413]/95 border border-[#3D3A35] rounded-[2px] shadow-md pointer-events-none"
        >
          {/* Left Badge: "POOKIE_OS" */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#0A0A09] border border-[#9E9B95]">
            <span className="inline-block w-1.5 h-1.5 bg-[#D8CFC2] rotate-45" />
            <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[0.16em] text-[#E6E2DA]">
              {POOKIE_CONFIG.brand.hardwareLeftBadge}
            </span>
          </div>

          {/* Right Badge: "SUPER_POOKIE // 1.44MB" */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#1C1B19] border border-[#78746C]">
            <div className="flex items-center h-2.5 overflow-hidden">
              <span className="w-1 h-full bg-[#C9382B]" />
              <span className="w-1 h-full bg-[#FFD400]" />
              <span className="w-1 h-full bg-[#00C2D1]" />
            </div>
            <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[0.12em] text-[#EAE1CF]">
              {POOKIE_CONFIG.brand.hardwareRightBadge}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================
          STAGE 1 FULL-SCREEN CRT BIOS FRAMING LAYER (0.0s – 3.2s)
          Guarantees edge-to-edge CRT curved screen framing on every viewport
          aspect ratio during Stage 1 and dissolves cleanly as camera pulls back.
         ================================================================== */}
      <div
        data-testid="stage1-bios-fullscreen-layer"
        style={{
          opacity: stage === 'bios' ? 1 : 0,
          pointerEvents: stage === 'bios' ? 'auto' : 'none',
          transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="fixed inset-0 z-15 flex items-center justify-center bg-[#070709] p-1.5 sm:p-3"
      >
        <div
          style={{
            boxShadow:
              '0 0 0 12px #1E1D1B, 0 0 0 16px #2E2C28, 0 0 90px rgba(27, 28, 143, 0.75)',
          }}
          className="w-full h-full rounded-[22px] sm:rounded-[30px] overflow-hidden relative"
        >
          <BiosBootScreen onBootComplete={handleBiosComplete} />
        </div>
      </div>

      {/* ==================================================================
          STAGE 2 EDITORIAL HTML OVERLAY (FADES IN AT ~70% CAMERA PULL-BACK)
         ================================================================== */}
      <div
        data-testid="stage2-editorial-overlay"
        style={{
          opacity: uiVisible && stage !== 'diving' ? 1 : 0,
          pointerEvents: uiVisible && stage !== 'diving' ? 'auto' : 'none',
          transition: 'opacity 500ms ease-out',
        }}
        className="fixed inset-0 z-20 flex flex-col justify-between pointer-events-none"
      >
        {/* 12.1 Top Navigation Bar */}
        <header
          data-testid="landing-top-nav"
          className="fixed top-0 inset-x-0 h-20 px-4 sm:px-8 lg:px-12 flex items-center justify-between z-20 pointer-events-auto bg-gradient-to-b from-[#070709]/90 via-[#070709]/55 to-transparent"
        >
          {/* Left: Combined Logo Image (Sticker artwork with POOKIE OS included, no duplicate text) */}
          <button
            type="button"
            data-testid="landing-nav-brand-btn"
            onClick={() => setActiveDrawer(null)}
            className="flex items-center text-left group cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="POOKIE OS Home"
          >
            <img
              src={POOKIE_CONFIG.brand.combinedLogoPath}
              alt="POOKIE OS"
              className="h-10 sm:h-12 md:h-14 w-auto max-w-[210px] sm:max-w-[270px] md:max-w-[320px] object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] select-none"
            />
          </button>

          {/* Center: Underlined Retro Serif Links */}
          <nav
            aria-label="PookieOS Studio Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-9"
          >
            {POOKIE_CONFIG.navigation.links.map((item) => {
              const isCurrent =
                (item.id === 'home' && activeDrawer === null) ||
                activeDrawer === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`nav-link-${item.id}`}
                  onClick={() => {
                    if (item.id === 'home') {
                      setActiveDrawer(null);
                    } else {
                      setActiveDrawer((prev) =>
                        prev === item.id ? null : (item.id as NavDrawerId)
                      );
                    }
                  }}
                  style={{
                    fontFamily:
                      "'Instrument Serif', 'Playfair Display', 'Times New Roman', Georgia, serif",
                    color: isCurrent
                      ? activeMoodConfig.palette.accent
                      : '#FFF8EE',
                  }}
                  className="text-base lg:text-lg underline underline-offset-4 decoration-[#FFF8EE]/50 hover:decoration-[#FFF8EE] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Retro Telephone Icon "☎" + Underlined CTA "Boot Direct to OS" */}
          <button
            type="button"
            data-testid="boot-direct-to-os-btn"
            onClick={() => triggerDiveIntoOS()}
            style={{
              fontFamily:
                "'Instrument Serif', 'Playfair Display', 'Times New Roman', Georgia, serif",
              color: '#FFF8EE',
              textShadow: '0 0 20px rgba(255, 215, 170, 0.5)',
            }}
            className="flex items-center gap-2 text-base sm:text-lg lg:text-xl cursor-pointer group"
          >
            <span
              aria-hidden="true"
              className="text-lg sm:text-xl text-[#FFE6C8] group-hover:scale-110 transition-transform"
            >
              ☎
            </span>
            <span className="underline underline-offset-4 decoration-[#FFF8EE]/75 group-hover:decoration-[#FFE6C8]">
              {POOKIE_CONFIG.navigation.directBootLabel}
            </span>
          </button>
        </header>

        {/* 12.2 Left Editorial Hero Block */}
        <div className="my-auto pt-20 pb-12 max-w-xl pl-6 sm:pl-12 md:pl-24 pr-6 z-10 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 border border-[#FFF8EE]/25 bg-black/55 backdrop-blur-xs">
            <span
              style={{ backgroundColor: activeMoodConfig.palette.accent }}
              className="w-2 h-2 rounded-full"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFF8EE]/85">
              MAD HACKS 2026 // THEME 3: USELESS SOFTWARE
            </span>
          </div>

          {/* Primary 4-Line High-Contrast Editorial Serif Headline */}
          <h1
            data-testid="landing-hero-headline"
            style={{
              fontFamily:
                "'Instrument Serif', 'Playfair Display', 'Times New Roman', Georgia, serif",
              color: '#FFF8EE',
              textShadow: '0 0 28px rgba(255, 215, 170, 0.45)',
              lineHeight: 0.96,
            }}
            className="text-4xl sm:text-6xl lg:text-[68px] font-normal tracking-[-0.02em] mb-4"
          >
            {POOKIE_CONFIG.hero.headlineLines.map((line, i) => (
              <span
                key={line}
                className={`block ${i === 1 || i === 3 ? 'italic' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Brand Tagline Subtext */}
          <p
            data-testid="landing-hero-tagline"
            className="font-mono text-sm sm:text-base text-[#EAE1CF]/90 tracking-wide mb-5 border-l-2 border-[#FFE6C8]/60 pl-3"
          >
            &ldquo;{POOKIE_CONFIG.hero.tagline}&rdquo; —{' '}
            <span className="text-[#FFE6C8]">{activeMoodConfig.name}</span>
          </p>

          {/* Interactive Mood Selector Bar (Below Tagline) */}
          <div
            role="group"
            aria-label="Select PookieOS Boot Mood"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 max-w-lg"
          >
            {LANDING_MOOD_ORDER.map((moodId) => {
              const moodCfg = POOKIE_CONFIG.moods[moodId];
              const isSelected = selectedMood === moodId;
              return (
                <button
                  key={moodId}
                  type="button"
                  data-testid={`landing-mood-btn-${moodId}`}
                  aria-pressed={isSelected}
                  onMouseEnter={() => handleMoodSelect(moodId)}
                  onClick={() => handleMoodSelect(moodId)}
                  style={{
                    backgroundColor: isSelected
                      ? moodCfg.palette.primary
                      : 'rgba(16, 16, 20, 0.78)',
                    color: isSelected ? moodCfg.palette.text : '#FFF8EE',
                    borderColor: isSelected
                      ? moodCfg.palette.accent
                      : 'rgba(255, 248, 238, 0.28)',
                    boxShadow: isSelected
                      ? `3px 3px 0px ${moodCfg.palette.accent}, 0 0 18px ${moodCfg.palette.glow}44`
                      : '2px 2px 0px rgba(0, 0, 0, 0.85)',
                  }}
                  className="px-3.5 py-2 text-left font-mono border-2 transition-all cursor-pointer flex items-center justify-between min-w-0"
                >
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="font-bold text-xs sm:text-[13px] tracking-wider leading-tight">
                      {moodCfg.buttonLabel}
                    </span>
                    <span className="text-[10px] sm:text-[11px] opacity-80 font-normal tracking-normal leading-tight mt-0.5">
                      {moodCfg.eraSubtitle}
                    </span>
                  </div>
                  <span
                    style={{
                      backgroundColor: moodCfg.palette.accent,
                    }}
                    className="w-2.5 h-2.5 rounded-full shrink-0 ml-2 border border-black/40"
                  />
                </button>
              );
            })}
          </div>

          {/* Primary Boot CTA + Bottom Launch Instruction */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              data-testid="hero-launch-os-btn"
              onClick={() => triggerDiveIntoOS()}
              style={{
                backgroundColor: activeMoodConfig.palette.accent,
                color: '#111111',
                boxShadow: '4px 4px 0px #FFF8EE',
              }}
              className="px-5 py-2.5 font-mono text-xs sm:text-sm font-black uppercase tracking-[0.14em] border-2 border-[#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-transform cursor-pointer w-fit"
            >
              BOOT {activeMoodConfig.name.toUpperCase()} ↵
            </button>

            <p
              data-testid="landing-launch-instruction"
              className="font-mono text-xs text-[#FFF8EE]/85 tracking-wide"
            >
              {POOKIE_CONFIG.hero.launchPrompt}
            </p>
          </div>
        </div>

        {/* Interactive Navigation Drawers (The 4 Moods / Useless Specs / Complain to HR) */}
        {activeDrawer && (
          <div
            data-testid={`landing-drawer-${activeDrawer}`}
            className="fixed inset-x-4 top-22 sm:left-auto sm:right-10 sm:w-[440px] z-30 pointer-events-auto bg-[#121216]/95 border-2 border-[#FFF8EE]/70 text-[#FFF8EE] p-5 shadow-[8px_8px_0px_rgba(0,0,0,0.9)] font-mono"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#FFF8EE]/25">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFE6C8]">
                {activeDrawer === 'moods' && 'POOKIE OS // THE 4 MOOD UNIVERSES'}
                {activeDrawer === 'specs' &&
                  'HARDWARE MANIFEST // SUPER_POOKIE 1.44MB'}
                {activeDrawer === 'hr' && 'HR DEPARTMENT // COMPLAINT TERMINAL'}
              </span>
              <button
                type="button"
                onClick={() => setActiveDrawer(null)}
                className="px-2 py-0.5 text-xs border border-[#FFF8EE]/40 hover:bg-[#FFF8EE] hover:text-black cursor-pointer"
              >
                [X]
              </button>
            </div>

            {activeDrawer === 'moods' && (
              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {LANDING_MOOD_ORDER.map((mId) => {
                  const m = POOKIE_CONFIG.moods[mId];
                  return (
                    <div
                      key={mId}
                      className="p-2.5 border border-[#FFF8EE]/25 bg-black/50 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col min-w-0 pr-1">
                          <span className="font-bold text-xs text-[#FFE6C8]">
                            {m.buttonLabel}
                          </span>
                          <span className="text-[10px] text-[#FFF8EE]/70 font-mono">
                            {m.eraSubtitle}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerDiveIntoOS(mId)}
                          className="px-2 py-0.5 text-[11px] bg-[#FFF8EE] text-black font-bold cursor-pointer hover:bg-[#FFE6C8]"
                        >
                          Boot Mood →
                        </button>
                      </div>
                      <p className="text-[11px] text-[#FFF8EE]/80 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeDrawer === 'specs' && (
              <div className="space-y-2 text-xs text-[#FFF8EE]/90">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">CHASSIS MODEL:</span>
                  <span>SUPER_POOKIE // PET-1989 ABS BEIGE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">KERNEL BUILD:</span>
                  <span>v1.02 (Emotional Exhaustion)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">STORAGE CAPACITY:</span>
                  <span>1.44 MB High-Density Sarcasm</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">CALCULATOR ACCURACY:</span>
                  <span>Gaslights on the 3rd computation</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">NOTEPAD PERSISTENCE:</span>
                  <span>100% Volatile RAM (Zero Save Policy)</span>
                </div>
                <div className="pt-2 text-[11px] text-[#FFE6C8]">
                  Guaranteed 0.0% enterprise productivity or double your dread
                  back.
                </div>
              </div>
            )}

            {activeDrawer === 'hr' && (
              <div className="space-y-3 text-xs">
                <p className="text-[#FFF8EE]/80 leading-relaxed">
                  Have a grievance about PookieOS&apos;s terrible attitude? File
                  an official report below so our HR printer can shred it
                  immediately.
                </p>
                <textarea
                  rows={3}
                  value={hrComplaintText}
                  onChange={(e) => setHrComplaintText(e.target.value)}
                  placeholder="Describe why the calculator hurt your feelings..."
                  className="w-full p-2 bg-black border border-[#FFF8EE]/40 text-[#FFF8EE] text-xs focus:outline-none"
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHrTicketNotice(
                        'TICKET #404-IGND FILED DIRECTLY INTO /dev/null. HAVE A DAY.'
                      );
                      setHrComplaintText('');
                    }}
                    className="px-3 py-1.5 bg-[#FFE6C8] text-black font-bold uppercase cursor-pointer"
                  >
                    Submit to /dev/null
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerDiveIntoOS()}
                    className="underline text-[#FFF8EE]/80 hover:text-white cursor-pointer"
                  >
                    Open Full HR Review in OS →
                  </button>
                </div>
                {hrTicketNotice && (
                  <div className="p-2 border border-[#FFD400] bg-[#FFD400]/15 text-[#FFD400] text-[11px]">
                    {hrTicketNotice}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ==================================================================
          12.3 DEVELOPMENT / JUDGE CONVENIENCE SKIP BUTTON
          Always accessible in the bottom-right corner ("[ SKIP INTRO ⏭ ]")
         ================================================================== */}
      <button
        type="button"
        data-testid="skip-intro-btn"
        onClick={() => {
          hasLaunchedRef.current = true;
          onLaunchOS(selectedMoodRef.current);
        }}
        className="fixed bottom-5 right-6 z-30 px-3.5 py-1.5 font-mono text-xs font-bold tracking-widest text-[#FFF8EE]/90 bg-[#070709]/85 hover:bg-[#FFF8EE] hover:text-[#070709] border border-[#FFF8EE]/45 transition-colors cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,0.85)]"
      >
        {POOKIE_CONFIG.hero.skipButtonLabel}
      </button>

      {/* Fullscreen CRT Flash Overlay at ~1.3s of Stage 3 Dive */}
      <div
        aria-hidden="true"
        style={{
          opacity: crtFlashActive ? 0.92 : 0,
          pointerEvents: 'none',
          transition: 'opacity 140ms ease-out',
          background:
            'radial-gradient(circle, #FFFFFF 0%, #E2E6FF 55%, #1B1C8F 100%)',
        }}
        className="fixed inset-0 z-40"
      />
    </div>
  );
};

export default LandingExperience;
