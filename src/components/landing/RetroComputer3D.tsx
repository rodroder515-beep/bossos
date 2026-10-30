import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  LandingMoodId,
  POOKIE_CONFIG,
} from '../../config/pookieLandingConfig';

export interface FloatingY2KStickersProps {
  selectedMood: LandingMoodId;
  enabled?: boolean;
}

/**
 * Phase 2 Extensibility Slot: Floating 3D Y2K / retro stickers around the studio computer.
 */
export const FloatingY2KStickers: React.FC<FloatingY2KStickersProps> = ({
  enabled = false,
}) => {
  if (!enabled) return null;
  return <group name="Phase2FloatingY2KStickersSlot" />;
};

export interface RetroComputer3DProps {
  selectedMood: LandingMoodId;
  stage: 'bios' | 'pullback' | 'interactive' | 'diving';
  crtFlashActive: boolean;
  onMonitorClick: () => void;
  /** Direct DOM ref to the CRT screen portal overlay; updated in useFrame with zero React re-renders */
  crtPortalRef?: React.RefObject<HTMLDivElement | null>;
  customGlbPath?: string | null;
}

interface KeycapSpec {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const CustomGlbComputer: React.FC<{ url: string }> = ({ url }) => {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
};

/**
 * Creates a crisp procedural 3D hardware nameplate texture containing:
 * - Left Badge: "POOKIE_OS" (black & silver hardware label)
 * - Right Badge: "SUPER_POOKIE // 1.44MB" (retro-striped hardware badge)
 */
function createHardwareNameplateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#151513';
    ctx.fillRect(0, 0, 512, 64);
    ctx.strokeStyle = '#3D3A35';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 510, 62);

    // Left Badge: "POOKIE_OS"
    ctx.fillStyle = '#0A0A09';
    ctx.fillRect(14, 10, 150, 44);
    ctx.strokeStyle = '#B8B4AC';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 10, 150, 44);

    ctx.fillStyle = '#D8CFC2';
    ctx.beginPath();
    ctx.moveTo(30, 22);
    ctx.lineTo(38, 32);
    ctx.lineTo(30, 42);
    ctx.lineTo(22, 32);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ECE8E0';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.textBaseline = 'middle';
    ctx.fillText(POOKIE_CONFIG.brand.hardwareLeftBadge, 46, 33);

    // Right Badge: "SUPER_POOKIE // 1.44MB"
    ctx.fillStyle = '#1C1B19';
    ctx.fillRect(276, 10, 222, 44);
    ctx.strokeStyle = '#8C877E';
    ctx.lineWidth = 2;
    ctx.strokeRect(276, 10, 222, 44);

    ctx.fillStyle = '#C9382B';
    ctx.fillRect(284, 17, 6, 30);
    ctx.fillStyle = '#FFD400';
    ctx.fillRect(290, 17, 6, 30);
    ctx.fillStyle = '#00C2D1';
    ctx.fillRect(296, 17, 6, 30);

    ctx.fillStyle = '#EAE1CF';
    ctx.font = 'bold 13px "Courier New", monospace';
    ctx.fillText(POOKIE_CONFIG.brand.hardwareRightBadge, 310, 33);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates a dynamic CRT glass backing texture so the 3D curved screen surface
 * has authentic phosphor glow, scanlines, and curvature depth in WebGL.
 */
function createCrtBackingTexture(
  primaryHex: string,
  accentHex: string,
  label: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 90, 12, 128, 90, 150);
    grad.addColorStop(0, primaryHex);
    grad.addColorStop(0.75, accentHex);
    grad.addColorStop(1, '#090A14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 180);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let y = 0; y < 180; y += 3) {
      ctx.fillRect(0, y, 256, 1);
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px "Courier New", monospace';
    ctx.fillText(label, 12, 20);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export const RetroComputer3D: React.FC<RetroComputer3DProps> = ({
  selectedMood,
  stage,
  crtFlashActive,
  onMonitorClick,
  crtPortalRef,
  customGlbPath = POOKIE_CONFIG.brand.customGlbPath,
}) => {
  const computerGroupRef = useRef<THREE.Group>(null);
  const screenMeshRef = useRef<THREE.Mesh>(null);
  const crtLightRef = useRef<THREE.PointLight>(null);
  const { camera, size } = useThree();

  const activeMoodConfig = POOKIE_CONFIG.moods[selectedMood];

  const nameplateTexture = useMemo(() => createHardwareNameplateTexture(), []);
  const crtBackingTexture = useMemo(
    () =>
      createCrtBackingTexture(
        stage === 'bios'
          ? POOKIE_CONFIG.bios.primaryBlue
          : activeMoodConfig.palette.primary,
        stage === 'bios'
          ? POOKIE_CONFIG.bios.vignetteDarkBlue
          : activeMoodConfig.palette.accent,
        activeMoodConfig.previewLabel
      ),
    [
      stage,
      activeMoodConfig.palette.primary,
      activeMoodConfig.palette.accent,
      activeMoodConfig.previewLabel,
    ]
  );

  useEffect(() => {
    return () => {
      crtBackingTexture.dispose();
    };
  }, [crtBackingTexture]);

  const targetLightColor = useMemo(
    () => new THREE.Color(activeMoodConfig.palette.glow),
    [activeMoodConfig.palette.glow]
  );
  const biosLightColor = useMemo(() => new THREE.Color('#4A68FF'), []);

  const topLeftVec = useMemo(() => new THREE.Vector3(), []);
  const bottomRightVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (crtLightRef.current) {
      const desiredColor =
        stage === 'bios' ? biosLightColor : targetLightColor;
      crtLightRef.current.color.lerp(desiredColor, Math.min(1, delta * 5));
      const baseIntensity = crtFlashActive
        ? 6.5
        : stage === 'bios'
          ? 2.2
          : POOKIE_CONFIG.lighting.crtPointLightIntensity;
      crtLightRef.current.intensity = THREE.MathUtils.lerp(
        crtLightRef.current.intensity,
        baseIntensity,
        Math.min(1, delta * 8)
      );
    }

    if (computerGroupRef.current && stage === 'interactive') {
      const t = state.clock.getElapsedTime();
      computerGroupRef.current.position.y = Math.sin(t * 1.1) * 0.003;
    }

    // Directly update the DOM CRT overlay's position & dimensions without triggering React re-renders
    if (screenMeshRef.current && crtPortalRef?.current) {
      screenMeshRef.current.updateWorldMatrix(true, false);
      topLeftVec.set(-0.45, 0.305, 0.002);
      bottomRightVec.set(0.45, -0.305, 0.002);

      topLeftVec.applyMatrix4(screenMeshRef.current.matrixWorld);
      bottomRightVec.applyMatrix4(screenMeshRef.current.matrixWorld);

      topLeftVec.project(camera);
      bottomRightVec.project(camera);

      const x1 = (topLeftVec.x * 0.5 + 0.5) * size.width;
      const y1 = (-topLeftVec.y * 0.5 + 0.5) * size.height;
      const x2 = (bottomRightVec.x * 0.5 + 0.5) * size.width;
      const y2 = (-bottomRightVec.y * 0.5 + 0.5) * size.height;

      const left = Math.round(Math.min(x1, x2));
      const top = Math.round(Math.min(y1, y2));
      const width = Math.round(Math.max(120, Math.abs(x2 - x1)));
      const height = Math.round(Math.max(90, Math.abs(y2 - y1)));

      const el = crtPortalRef.current;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
    }
  });

  // Generate 5 rows of sculpted 3D mechanical keycaps for the integrated Commodore PET keyboard deck
  const keycaps = useMemo<KeycapSpec[]>(() => {
    const caps: KeycapSpec[] = [];
    const rows = 5;
    const cols = 14;
    const startX = -0.44;
    const endX = 0.44;
    const stepX = (endX - startX) / (cols - 1);

    for (let r = 0; r < rows; r++) {
      const rowZ = 0.46 + r * 0.062;
      const rowY = -0.205 - r * 0.017;

      if (r === rows - 1) {
        caps.push({
          id: `r${r}-mod-left`,
          position: [startX + 0.03, rowY, rowZ],
          size: [0.095, 0.034, 0.048],
          color: POOKIE_CONFIG.materials.keycapBlueAccent,
        });
        caps.push({
          id: `r${r}-alt-left`,
          position: [startX + 0.135, rowY, rowZ],
          size: [0.075, 0.034, 0.048],
          color: POOKIE_CONFIG.materials.keycapPrimaryColor,
        });
        caps.push({
          id: `r${r}-spacebar`,
          position: [0.0, rowY, rowZ],
          size: [0.42, 0.035, 0.048],
          color: POOKIE_CONFIG.materials.keycapPrimaryColor,
        });
        caps.push({
          id: `r${r}-alt-right`,
          position: [endX - 0.135, rowY, rowZ],
          size: [0.075, 0.034, 0.048],
          color: POOKIE_CONFIG.materials.keycapPrimaryColor,
        });
        caps.push({
          id: `r${r}-mod-right`,
          position: [endX - 0.03, rowY, rowZ],
          size: [0.095, 0.034, 0.048],
          color: POOKIE_CONFIG.materials.keycapRedAccent,
        });
        continue;
      }

      for (let c = 0; c < cols; c++) {
        const x = startX + c * stepX;
        let color: string = POOKIE_CONFIG.materials.keycapPrimaryColor;

        if (r === 0 && c === 0) {
          color = POOKIE_CONFIG.materials.keycapRedAccent;
        } else if ((r === 1 || r === 2) && c === 0) {
          color = POOKIE_CONFIG.materials.keycapBlueAccent;
        } else if (r === 2 && c === cols - 1) {
          color = POOKIE_CONFIG.materials.keycapRedAccent;
        } else if (r === 3 && (c === 0 || c === cols - 1)) {
          color = POOKIE_CONFIG.materials.keycapBlueAccent;
        } else if (r === 0 && c >= cols - 2) {
          color = '#3E3C38';
        }

        caps.push({
          id: `key-${r}-${c}`,
          position: [x, rowY, rowZ],
          size: [0.052, 0.034, 0.048],
          color,
        });
      }
    }
    return caps;
  }, []);

  const upperChassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: POOKIE_CONFIG.materials.chassisColor,
        roughness: POOKIE_CONFIG.materials.chassisRoughness,
        metalness: POOKIE_CONFIG.materials.chassisMetalness,
      }),
    []
  );

  const darkBezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: POOKIE_CONFIG.materials.bezelColor,
        roughness: 0.48,
        metalness: 0.14,
      }),
    []
  );

  const darkMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141413',
        roughness: 0.35,
        metalness: 0.45,
      }),
    []
  );

  const sharedKeycapGeometry = useMemo(
    () => new THREE.BoxGeometry(1, 1, 1),
    []
  );

  return (
    <group
      ref={computerGroupRef}
      position={[0.35, 0.0, 0.0]}
      name="PookieRetroComputerRoot"
    >
      {/* Dynamic Mood-Colored CRT Emission Light in front of screen glass */}
      <pointLight
        ref={crtLightRef}
        position={[0.0, 0.28, 0.62]}
        intensity={POOKIE_CONFIG.lighting.crtPointLightIntensity}
        distance={3.6}
        decay={2}
        color={activeMoodConfig.palette.glow}
      />

      {customGlbPath ? (
        <CustomGlbComputer url={customGlbPath} />
      ) : (
        <group name="ProceduralCommodorePetAllInOne">
          {/* ============================================================
              1. UPPER TRAPEZOIDAL CRT MONITOR HOUSING (AGED BEIGE #D8CFC2)
             ============================================================ */}
          <RoundedBox
            args={[1.24, 0.92, 0.56]}
            radius={0.045}
            smoothness={2}
            position={[0, 0.29, 0.04]}
            castShadow
            receiveShadow
            material={upperChassisMaterial}
          />

          <RoundedBox
            args={[1.08, 0.78, 0.54]}
            radius={0.05}
            smoothness={2}
            position={[0, 0.26, -0.34]}
            rotation={[-0.08, 0, 0]}
            material={upperChassisMaterial}
          />

          <RoundedBox
            args={[1.18, 0.12, 0.68]}
            radius={0.035}
            smoothness={2}
            position={[0, 0.72, -0.06]}
            rotation={[-0.06, 0, 0]}
            material={upperChassisMaterial}
          />

          {/* Side cooling louver slots on the upper housing */}
          {[-4, -2, 0, 2, 4].map((slotIdx) => (
            <React.Fragment key={`vent-${slotIdx}`}>
              <mesh
                position={[-0.622, 0.28 + slotIdx * 0.045, -0.04]}
                material={darkBezelMaterial}
              >
                <boxGeometry args={[0.015, 0.016, 0.28]} />
              </mesh>
              <mesh
                position={[0.622, 0.28 + slotIdx * 0.045, -0.04]}
                material={darkBezelMaterial}
              >
                <boxGeometry args={[0.015, 0.016, 0.28]} />
              </mesh>
            </React.Fragment>
          ))}

          {/* ============================================================
              2. RECESSED CHARCOAL CRT BEZEL (#1E1D1B)
             ============================================================ */}
          <RoundedBox
            args={[1.06, 0.72, 0.14]}
            radius={0.028}
            smoothness={2}
            position={[0, 0.31, 0.275]}
            material={darkBezelMaterial}
          />

          <RoundedBox
            args={[0.96, 0.65, 0.06]}
            radius={0.024}
            smoothness={2}
            position={[0, 0.31, 0.318]}
            material={darkMetalMaterial}
          />

          {/* Power LED Indicator on Bottom-Right of Bezel */}
          <mesh position={[0.44, -0.01, 0.345]}>
            <sphereGeometry args={[0.011, 10, 10]} />
            <meshBasicMaterial
              color={stage === 'bios' ? '#4A7CFF' : '#28E070'}
            />
          </mesh>

          {/* ============================================================
              3. CURVED CRT GLASS SURFACE (CLICKABLE IN 3D SPACE)
             ============================================================ */}
          <mesh
            ref={screenMeshRef}
            position={[0, 0.31, 0.336]}
            onClick={(e) => {
              e.stopPropagation();
              onMonitorClick();
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <planeGeometry args={[0.92, 0.62, 4, 4]} />
            <meshPhysicalMaterial
              map={crtBackingTexture}
              roughness={0.14}
              metalness={0.08}
              clearcoat={0.95}
              clearcoatRoughness={0.12}
              emissive={
                crtFlashActive
                  ? '#FFFFFF'
                  : stage === 'bios'
                    ? '#1B1C8F'
                    : activeMoodConfig.palette.primary
              }
              emissiveMap={crtBackingTexture}
              emissiveIntensity={crtFlashActive ? 2.5 : 0.65}
            />
          </mesh>

          {/* ============================================================
              4. HARDWARE NAMEPLATE STRIP (DIRECTLY BELOW SCREEN BEZEL)
              Left Badge: "POOKIE_OS" | Right Badge: "SUPER_POOKIE // 1.44MB"
             ============================================================ */}
          <mesh position={[0, -0.095, 0.305]} material={darkMetalMaterial}>
            <boxGeometry args={[1.14, 0.085, 0.06]} />
          </mesh>

          <mesh position={[0, -0.095, 0.337]}>
            <planeGeometry args={[1.12, 0.08]} />
            <meshStandardMaterial
              map={nameplateTexture}
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>

          {/* ============================================================
              5. INTEGRATED ANGLED KEYBOARD DECK & SCULPTED 3D KEYCAPS
             ============================================================ */}
          <RoundedBox
            args={[1.28, 0.24, 0.92]}
            radius={0.035}
            smoothness={2}
            position={[0, -0.25, 0.26]}
            castShadow
            receiveShadow
            material={upperChassisMaterial}
          />

          <RoundedBox
            args={[1.24, 0.14, 0.48]}
            radius={0.028}
            smoothness={2}
            position={[0, -0.24, 0.56]}
            rotation={[0.24, 0, 0]}
            material={upperChassisMaterial}
          />

          {/* Recessed dark charcoal keyboard well */}
          <mesh
            position={[0, -0.195, 0.575]}
            rotation={[0.24, 0, 0]}
            material={darkBezelMaterial}
          >
            <boxGeometry args={[1.04, 0.04, 0.36]} />
          </mesh>

          {/* Individual Sculpted 3D Keycap Meshes */}
          <group name="SculptedKeycapMatrix">
            {keycaps.map((key) => (
              <mesh
                key={key.id}
                geometry={sharedKeycapGeometry}
                position={key.position}
                scale={key.size}
                rotation={[0.24, 0, 0]}
              >
                <meshStandardMaterial
                  color={key.color}
                  roughness={0.52}
                  metalness={0.08}
                />
              </mesh>
            ))}
          </group>

          {/* Integrated 5.25" / 3.5" Floppy Drive Bay Slot on lower right side of chassis */}
          <mesh position={[0.36, -0.31, 0.722]} material={darkMetalMaterial}>
            <boxGeometry args={[0.32, 0.026, 0.02]} />
          </mesh>
          <mesh position={[0.48, -0.31, 0.73]} material={upperChassisMaterial}>
            <boxGeometry args={[0.04, 0.018, 0.025]} />
          </mesh>

          {/* Studio Desk Shadow Catcher Pedestal Plinth */}
          <mesh
            position={[0, -0.38, 0.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[4.5, 4.5]} />
            <meshStandardMaterial
              color="#070709"
              roughness={0.92}
              metalness={0.05}
            />
          </mesh>
        </group>
      )}

      {/* Phase 2 Extensibility Slot */}
      <FloatingY2KStickers selectedMood={selectedMood} enabled={false} />
    </group>
  );
};

export default RetroComputer3D;
