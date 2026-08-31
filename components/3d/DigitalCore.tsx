"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme, cssVar } from "@/lib/theme";

/**
 * The hero focal point (blueprint §7): a geometric digital core with
 * neural nodes and data links. Restrained — no particle explosions.
 *
 *  - Camera moves forward as the user scrolls ("camera moves, objects
 *    remain controlled").
 *  - Subtle pointer parallax.
 *  - Paused when offscreen; static when prefers-reduced-motion.
 */

type CoreColors = { accent: string; accent2: string; bg: string; panel: string; fg: string };

/** SSR-safe defaults = merah theme; refreshed from CSS vars on the client. */
const DEFAULT_COLORS: CoreColors = {
  accent: "#d21f2f",
  accent2: "#131010",
  bg: "#f8f6f4",
  panel: "#ffffff",
  fg: "#131010",
};

function buildNetwork(count = 110, minR = 1.9, spread = 1.0, linkDist = 0.95) {
  const rng = () => Math.random() * 2 - 1;
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(rng(), rng(), rng());
    if (v.lengthSq() < 0.01) v.set(1, 0, 0);
    v.normalize().multiplyScalar(minR + Math.random() * spread);
    nodes.push(v);
  }

  const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);

  const linkPositions: number[] = [];
  let links = 0;
  outer: for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < linkDist) {
        linkPositions.push(
          nodes[i].x, nodes[i].y, nodes[i].z,
          nodes[j].x, nodes[j].y, nodes[j].z,
        );
        if (++links >= 260) break outer;
      }
    }
  }
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3));

  return { nodeGeo, linkGeo };
}

function CoreScene({ animate, colors }: { animate: boolean; colors: CoreColors }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { nodeGeo, linkGeo } = useMemo(() => buildNetwork(), []);
  useEffect(() => {
    return () => {
      nodeGeo.dispose();
      linkGeo.dispose();
    };
  }, [nodeGeo, linkGeo]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const g = group.current;
    const t = state.clock.elapsedTime;

    g.rotation.y += delta * 0.07;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.12, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.current.x * 0.06, 0.04);

    if (core.current) {
      const s = 1 + Math.sin(t * 0.8) * 0.02;
      core.current.scale.setScalar(s);
    }

    // The camera moves forward as the story begins (blueprint §7).
    const p = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.4 - p * 2.2, 0.08);
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={colors.accent} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={colors.panel} transparent opacity={0.9} />
      </mesh>
      <points geometry={nodeGeo}>
        <pointsMaterial color={colors.fg} size={0.035} sizeAttenuation transparent opacity={0.85} />
      </points>
      {/* Data links carry the SECOND accent — the ungu×cyan pairing */}
      <lineSegments geometry={linkGeo}>
        <lineBasicMaterial color={colors.accent2} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

class CoreErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function DigitalCore({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [colors, setColors] = useState<CoreColors>(DEFAULT_COLORS);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [tabActive, setTabActive] = useState(true);

  // Pick up the active theme's palette from CSS variables.
  useEffect(() => {
    setColors({
      accent: cssVar("--color-accent") || DEFAULT_COLORS.accent,
      accent2: cssVar("--color-accent2") || DEFAULT_COLORS.accent2,
      bg: cssVar("--color-bg") || DEFAULT_COLORS.bg,
      panel: cssVar("--color-panel") || DEFAULT_COLORS.panel,
      fg: cssVar("--color-fg") || DEFAULT_COLORS.fg,
    });
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.02,
    });
    if (wrap.current) io.observe(wrap.current);

    const onVis = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      mq.removeEventListener("change", onMq);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = visible && tabActive && !reduced;

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <CoreErrorBoundary>
        <Canvas
          key={theme}
          frameloop={running ? "always" : "demand"}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 7.4], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <fog attach="fog" args={[colors.bg, 6, 13]} />
          <CoreScene animate={running} colors={colors} />
        </Canvas>
      </CoreErrorBoundary>
    </div>
  );
}
