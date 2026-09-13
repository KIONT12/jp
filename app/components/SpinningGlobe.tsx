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

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches || navigator.maxTouchPoints > 2;
}

/**
 * Equirectangular globe map: glow continents + grid + JP logo stamps.
 * Lower resolution on phones so first paint stays smooth.
 */
async function buildGlobeTexture(
  logoUrl: string,
  globeUrl: string,
  mobile: boolean
): Promise<THREE.CanvasTexture> {
  const width = mobile ? 1024 : 2048;
  const height = mobile ? 512 : 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#04101f");
  ocean.addColorStop(0.45, "#0a2a6a");
  ocean.addColorStop(1, "#02070f");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  const atmo = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, height * 0.55);
  atmo.addColorStop(0, "rgba(70, 140, 255, 0.14)");
  atmo.addColorStop(1, "transparent");
  ctx.fillStyle = atmo;
  ctx.fillRect(0, 0, width, height);

  // Tech lat/lon grid
  ctx.strokeStyle = "rgba(150, 205, 255, 0.28)";
  ctx.lineWidth = mobile ? 1 : 1.5;
  const latLines = mobile ? 8 : 12;
  const lonLines = mobile ? 16 : 24;
  for (let i = 1; i < latLines; i++) {
    const y = (height / latLines) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let i = 0; i < lonLines; i++) {
    const x = (width / lonLines) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Faint scan arcs
  ctx.strokeStyle = "rgba(212, 175, 55, 0.18)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const y = height * (0.28 + i * 0.22);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(width * 0.5, y + height * 0.04, width, y);
    ctx.stroke();
  }

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
    const step = mobile ? 2 : 1;

    const paintHemisphere = (lonOffset: number) => {
      for (let y = 0; y < height; y += step) {
        const lat = (0.5 - y / height) * Math.PI;
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        for (let x = 0; x < width; x += step) {
          let lon = (x / width) * Math.PI * 2 - Math.PI + lonOffset;
          while (lon > Math.PI) lon -= Math.PI * 2;
          while (lon < -Math.PI) lon += Math.PI * 2;
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
          if (r + g + b < 28) continue;

          const writePixel = (px: number, py: number) => {
            if (px >= width || py >= height) return;
            const di = (py * width + px) * 4;
            const srcLum = r * 0.3 + g * 0.59 + b * 0.11;
            const dstLum = dst[di] * 0.3 + dst[di + 1] * 0.59 + dst[di + 2] * 0.11;
            if (srcLum >= dstLum * 0.85) {
              dst[di] = r;
              dst[di + 1] = g;
              dst[di + 2] = b;
              dst[di + 3] = 255;
            }
          };

          writePixel(x, y);
          if (step > 1) {
            writePixel(x + 1, y);
            writePixel(x, y + 1);
            writePixel(x + 1, y + 1);
          }
        }
      }
    };

    paintHemisphere(0);
    paintHemisphere(Math.PI);
    ctx.putImageData(dest, 0, 0);
  } catch {
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
    drawLand(width * 0.28, height * 0.42, width * 0.09, height * 0.24);
    drawLand(width * 0.72, height * 0.45, width * 0.1, height * 0.2);
  }

  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(255, 190, 60, 0.08)";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";

  try {
    const logo = await loadImage(logoUrl);
    const stamp = (cx: number, cy: number, size: number) => {
      ctx.save();
      ctx.translate(cx, cy);

      const aura = ctx.createRadialGradient(0, 0, size * 0.12, 0, 0, size * 0.75);
      aura.addColorStop(0, "rgba(255, 230, 140, 0.58)");
      aura.addColorStop(0.4, "rgba(212, 175, 55, 0.3)");
      aura.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.75, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.54, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 220, 120, 0.6)";
      ctx.lineWidth = mobile ? 2.5 : 4;
      ctx.stroke();

      // Inner tech ring
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(165, 28, 36, 0.45)";
      ctx.lineWidth = mobile ? 1.5 : 2;
      ctx.stroke();

      const aspect = logo.width / Math.max(logo.height, 1);
      let dw = size;
      let dh = dw / aspect;
      if (dh > size * 1.05) {
        dh = size * 1.05;
        dw = dh * aspect;
      }

      ctx.fillStyle = "rgba(2, 8, 22, 0.4)";
      ctx.beginPath();
      ctx.ellipse(0, 0, dw * 0.58, dh * 0.58, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "rgba(255, 200, 80, 0.7)";
      ctx.shadowBlur = mobile ? 16 : 28;
      ctx.drawImage(logo, -dw / 2, -dh / 2, dw, dh);
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const logoSize = mobile ? 240 : 440;
    stamp(width * 0.28, height * 0.48, logoSize);
    stamp(width * 0.72, height * 0.48, logoSize);
  } catch {
    // Globe still works without logo
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = mobile ? 4 : 8;
  texture.needsUpdate = true;
  return texture;
}

function makeRing(radius: number, tube: number, color: number, opacity: number, tilt: number) {
  const geo = new THREE.TorusGeometry(radius, tube, 10, 96);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = tilt;
  return ring;
}

export default function SpinningGlobe({ logoUrl, globeUrl, className }: SpinningGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId = 0;
    let visible = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let texture: THREE.CanvasTexture | null = null;
    const disposables: THREE.Object3D[] = [];
    const mobile = isMobileDevice();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.05, 2.55);

    renderer = new THREE.WebGLRenderer({
      antialias: !mobile,
      alpha: true,
      powerPreference: mobile ? "low-power" : "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x7aa0ff, 0.72);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffe6a0, 1.5);
    key.position.set(2.8, 2.2, 3.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x4d8dff, 1.0);
    fill.position.set(-2.8, -0.8, 2.2);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffc857, 1.6, 14);
    rim.position.set(-2.2, 1.6, -2.8);
    scene.add(rim);

    const goldGlow = new THREE.PointLight(0xd4af37, 1.25, 10);
    goldGlow.position.set(2, 0.4, 2.4);
    scene.add(goldGlow);

    const ball = new THREE.Group();
    ball.rotation.x = -0.18;
    scene.add(ball);

    // High-tech orbital rings (brand red + gold)
    const orbits = new THREE.Group();
    const ringA = makeRing(1.28, 0.012, 0xc41e3a, 0.55, Math.PI / 2.35);
    const ringB = makeRing(1.38, 0.008, 0xd4af37, 0.42, Math.PI / 2.9);
    const ringC = makeRing(1.48, 0.006, 0x5aa0ff, 0.28, Math.PI / 1.85);
    orbits.add(ringA, ringB, ringC);
    scene.add(orbits);
    disposables.push(ringA, ringB, ringC);

    const resize = () => {
      if (!renderer || !mount) return;
      const w = Math.max(mount.clientWidth, 1);
      const h = Math.max(mount.clientHeight, 1);
      const dprCap = mobile ? 1.35 : 2;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    (async () => {
      texture = await buildGlobeTexture(logoUrl, globeUrl, mobile);
      if (disposed) {
        texture.dispose();
        return;
      }

      const segs = mobile ? 64 : 128;
      const geometry = new THREE.SphereGeometry(1, segs, segs);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.28,
        metalness: 0.24,
        emissive: new THREE.Color(0x1a3a7a),
        emissiveMap: texture,
        emissiveIntensity: 0.58,
      });

      const mesh = new THREE.Mesh(geometry, material);
      ball.add(mesh);
      disposables.push(mesh);

      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x3d7cff,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.1, mobile ? 32 : 64, mobile ? 32 : 64), glowMat);
      ball.add(glow);
      disposables.push(glow);

      const goldShellMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      });
      const goldShell = new THREE.Mesh(
        new THREE.SphereGeometry(1.18, mobile ? 24 : 48, mobile ? 24 : 48),
        goldShellMat
      );
      ball.add(goldShell);
      disposables.push(goldShell);
    })();

    const clock = new THREE.Clock();
    const spinSpeed = mobile ? 0.36 : 0.42;

    const animate = () => {
      if (disposed || !renderer) return;
      frameId = requestAnimationFrame(animate);
      if (!visible) return;

      const t = clock.getElapsedTime();
      ball.rotation.y = t * spinSpeed;
      ball.rotation.x = -0.18 + Math.sin(t * 0.32) * 0.04;
      orbits.rotation.y = t * 0.18;
      orbits.rotation.z = Math.sin(t * 0.22) * 0.08;
      ringA.rotation.z = t * 0.35;
      ringB.rotation.z = -t * 0.28;
      ringC.rotation.z = t * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
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
