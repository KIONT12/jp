"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SpinningGlobeProps = {
  logoUrl: string;
  globeUrl: string;
  className?: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/**
 * Paint the user's glowing globe art onto an equirectangular map,
 * then combine a large JP logo into the continent glow.
 */
async function buildGlobeTexture(logoUrl: string, globeUrl: string): Promise<THREE.CanvasTexture> {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  // Deep navy ocean matching the glow art
  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#05122c");
  ocean.addColorStop(0.5, "#0a2f7a");
  ocean.addColorStop(1, "#030914");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  // Soft blue atmosphere
  const atmo = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, height * 0.55);
  atmo.addColorStop(0, "rgba(70, 140, 255, 0.12)");
  atmo.addColorStop(1, "transparent");
  ctx.fillStyle = atmo;
  ctx.fillRect(0, 0, width, height);

  // Lat / lon grid like the glow globe
  ctx.strokeStyle = "rgba(150, 200, 255, 0.32)";
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 12; i++) {
    const y = (height / 12) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let i = 0; i < 24; i++) {
    const x = (width / 24) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Project circular glow art (orthographic hemisphere) → equirectangular
  try {
    const art = await loadImage(globeUrl);
    const src = document.createElement("canvas");
    src.width = art.width;
    src.height = art.height;
    const sctx = src.getContext("2d", { willReadFrequently: true })!;
    sctx.drawImage(art, 0, 0);
    const srcData = sctx.getImageData(0, 0, src.width, src.height).data;

    const cx = src.width / 2;
    const cy = src.height / 2;
    const radius = Math.min(cx, cy) * 0.98;

    const dest = ctx.getImageData(0, 0, width, height);
    const dst = dest.data;

    // Two opposite views so the full spin shows continents + skyline glow
    const paintHemisphere = (lonOffset: number) => {
      for (let y = 0; y < height; y++) {
        const lat = (0.5 - y / height) * Math.PI; // +pi/2..-pi/2
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        for (let x = 0; x < width; x++) {
          let lon = (x / width) * Math.PI * 2 - Math.PI + lonOffset;
          // wrap
          while (lon > Math.PI) lon -= Math.PI * 2;
          while (lon < -Math.PI) lon += Math.PI * 2;

          // Only front-facing hemisphere of this view
          if (Math.abs(lon) > Math.PI * 0.55) continue;

          const nx = Math.sin(lon) * cosLat;
          const ny = sinLat;
          const nz = Math.cos(lon) * cosLat;
          if (nz <= 0.02) continue;

          const sx = Math.round(cx + (nx / nz) * radius * 0.92);
          const sy = Math.round(cy - (ny / nz) * radius * 0.92);
          if (sx < 0 || sy < 0 || sx >= src.width || sy >= src.height) continue;

          const dx = sx - cx;
          const dy = sy - cy;
          if (dx * dx + dy * dy > radius * radius) continue;

          const si = (sy * src.width + sx) * 4;
          const r = srcData[si];
          const g = srcData[si + 1];
          const b = srcData[si + 2];
          // Skip near-black backdrop from the art
          if (r + g + b < 28) continue;

          const di = (y * width + x) * 4;
          // Prefer brighter gold glow over ocean
          const srcLum = r * 0.3 + g * 0.59 + b * 0.11;
          const dstLum = dst[di] * 0.3 + dst[di + 1] * 0.59 + dst[di + 2] * 0.11;
          if (srcLum >= dstLum * 0.85) {
            dst[di] = r;
            dst[di + 1] = g;
            dst[di + 2] = b;
            dst[di + 3] = 255;
          }
        }
      }
    };

    paintHemisphere(0);
    paintHemisphere(Math.PI);
    ctx.putImageData(dest, 0, 0);
  } catch {
    // Fallback continents if art fails to load
    const drawLand = (cx: number, cy: number, rx: number, ry: number) => {
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, Math.max(rx, ry));
      g.addColorStop(0, "rgba(255, 220, 120, 0.95)");
      g.addColorStop(0.5, "rgba(212, 175, 55, 0.8)");
      g.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    drawLand(width * 0.28, height * 0.42, 180, 240);
    drawLand(width * 0.72, height * 0.45, 200, 200);
  }

  // Extra molten-gold bloom so continents read brightly while spinning
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(255, 190, 60, 0.08)";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";

  // Combine large JP logo into the glowing continent design (front + back)
  try {
    const logo = await loadImage(logoUrl);
    const stamp = (cx: number, cy: number, size: number) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Gold aura woven into the continent glow — no dark box/badge
      const aura = ctx.createRadialGradient(0, 0, size * 0.15, 0, 0, size * 0.72);
      aura.addColorStop(0, "rgba(255, 230, 140, 0.55)");
      aura.addColorStop(0.45, "rgba(212, 175, 55, 0.28)");
      aura.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.72, 0, Math.PI * 2);
      ctx.fill();

      // Soft ring so the mark sits in the design
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.52, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 220, 120, 0.55)";
      ctx.lineWidth = 4;
      ctx.stroke();

      const aspect = logo.width / Math.max(logo.height, 1);
      let dw = size;
      let dh = dw / aspect;
      if (dh > size * 1.05) {
        dh = size * 1.05;
        dw = dh * aspect;
      }

      // Slight dark cushion only behind the logo art for readability
      ctx.fillStyle = "rgba(2, 8, 22, 0.35)";
      ctx.beginPath();
      ctx.ellipse(0, 0, dw * 0.58, dh * 0.58, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "rgba(255, 200, 80, 0.65)";
      ctx.shadowBlur = 28;
      ctx.drawImage(logo, -dw / 2, -dh / 2, dw, dh);
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Bigger stamps centered on the glowing landmasses
    stamp(width * 0.28, height * 0.48, 420);
    stamp(width * 0.72, height * 0.48, 420);
  } catch {
    // Globe still works without logo
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export default function SpinningGlobe({ logoUrl, globeUrl, className }: SpinningGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let texture: THREE.CanvasTexture | null = null;
    const disposables: THREE.Object3D[] = [];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    // Pull camera in so the sphere fills the frame (no empty “box” around it)
    camera.position.set(0, 0.05, 2.55);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x7aa0ff, 0.7);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffe6a0, 1.55);
    key.position.set(2.8, 2.2, 3.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x4d8dff, 1.05);
    fill.position.set(-2.8, -0.8, 2.2);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffc857, 1.8, 14);
    rim.position.set(-2.2, 1.6, -2.8);
    scene.add(rim);

    const goldGlow = new THREE.PointLight(0xd4af37, 1.4, 10);
    goldGlow.position.set(2, 0.4, 2.4);
    scene.add(goldGlow);

    const ball = new THREE.Group();
    ball.rotation.x = -0.18;
    scene.add(ball);

    const resize = () => {
      if (!renderer || !mount) return;
      const w = Math.max(mount.clientWidth, 1);
      const h = Math.max(mount.clientHeight, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    (async () => {
      texture = await buildGlobeTexture(logoUrl, globeUrl);
      if (disposed) {
        texture.dispose();
        return;
      }

      const geometry = new THREE.SphereGeometry(1, 128, 128);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.28,
        metalness: 0.22,
        emissive: new THREE.Color(0x1a3a7a),
        emissiveMap: texture,
        emissiveIntensity: 0.55,
      });

      const mesh = new THREE.Mesh(geometry, material);
      ball.add(mesh);
      disposables.push(mesh);

      // Bright outer glow shell — the “glow” you can see
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x3d7cff,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.12, 64, 64), glowMat);
      ball.add(glow);
      disposables.push(glow);

      const goldShellMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      });
      const goldShell = new THREE.Mesh(new THREE.SphereGeometry(1.2, 48, 48), goldShellMat);
      ball.add(goldShell);
      disposables.push(goldShell);
    })();

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed || !renderer) return;
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      ball.rotation.y = t * 0.42;
      ball.rotation.x = -0.18 + Math.sin(t * 0.32) * 0.045;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      for (const obj of disposables) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      }
      texture?.dispose();
      renderer?.dispose();
      if (renderer?.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [logoUrl, globeUrl]);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="Live 3D spinning globe with J. Parker Sports Agency logo"
    />
  );
}
