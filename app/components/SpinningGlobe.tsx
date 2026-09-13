"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SpinningGlobeProps = {
  logoUrl: string;
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

/** Equirectangular basketball-globe texture with JP logos stamped on the surface */
async function buildGlobeTexture(logoUrl: string): Promise<THREE.CanvasTexture> {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Deep ocean base
  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#071530");
  ocean.addColorStop(0.45, "#0b2a6e");
  ocean.addColorStop(1, "#040b18");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  // Soft polar glow
  const polar = ctx.createRadialGradient(width / 2, height * 0.15, 20, width / 2, height * 0.15, height * 0.35);
  polar.addColorStop(0, "rgba(120, 180, 255, 0.18)");
  polar.addColorStop(1, "transparent");
  ctx.fillStyle = polar;
  ctx.fillRect(0, 0, width, height);

  // Latitude / longitude grid
  ctx.strokeStyle = "rgba(140, 190, 255, 0.28)";
  ctx.lineWidth = 2;
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

  // Glowing gold landmasses (stylized continents)
  const drawLand = (cx: number, cy: number, rx: number, ry: number, rot = 0) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    const g = ctx.createRadialGradient(0, 0, 4, 0, 0, Math.max(rx, ry));
    g.addColorStop(0, "rgba(255, 220, 120, 0.95)");
    g.addColorStop(0.45, "rgba(212, 175, 55, 0.85)");
    g.addColorStop(1, "rgba(212, 175, 55, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Americas / Atlantic side
  drawLand(width * 0.28, height * 0.42, 160, 220, -0.25);
  drawLand(width * 0.32, height * 0.62, 90, 140, 0.2);
  drawLand(width * 0.22, height * 0.34, 70, 50, 0.1);
  // Europe / Africa / Asia wrap
  drawLand(width * 0.55, height * 0.38, 70, 90, 0.15);
  drawLand(width * 0.58, height * 0.55, 100, 160, -0.1);
  drawLand(width * 0.72, height * 0.4, 180, 120, 0.05);
  drawLand(width * 0.88, height * 0.55, 90, 140, 0.3);
  // wrap-around Americas hint
  drawLand(width * 0.98, height * 0.42, 80, 160, -0.2);
  drawLand(width * 0.04, height * 0.42, 80, 160, -0.2);

  // City-light speckles
  ctx.fillStyle = "rgba(255, 230, 150, 0.85)";
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * width;
    const y = height * 0.18 + Math.random() * height * 0.64;
    const r = Math.random() * 1.8 + 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Basketball-style seam curves (on-surface, not Saturn rings)
  ctx.strokeStyle = "rgba(212, 175, 55, 0.72)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // Vertical meridian seams
  for (const u of [0.125, 0.375, 0.625, 0.875]) {
    ctx.beginPath();
    ctx.moveTo(width * u, 0);
    ctx.lineTo(width * u, height);
    ctx.stroke();
  }

  // Classic basketball curved seams across the equator band
  const drawCurve = (x0: number, y0: number, x1: number, y1: number, bulge: number) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + bulge, x1, y1);
    ctx.stroke();
  };
  drawCurve(0, height * 0.5, width, height * 0.5, 0);
  drawCurve(width * 0.05, height * 0.22, width * 0.45, height * 0.78, 180);
  drawCurve(width * 0.55, height * 0.22, width * 0.95, height * 0.78, 180);
  drawCurve(width * 0.05, height * 0.78, width * 0.45, height * 0.22, -180);
  drawCurve(width * 0.55, height * 0.78, width * 0.95, height * 0.22, -180);

  // Stamp JP logo on front + back of the sphere
  try {
    const logo = await loadImage(logoUrl);
    const stamp = (cx: number, cy: number, size: number) => {
      const badge = size * 1.08;
      ctx.save();
      ctx.translate(cx, cy);

      // Circular badge so it reads clearly on the ball
      ctx.beginPath();
      ctx.arc(0, 0, badge / 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(4, 10, 24, 0.88)";
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.95)";
      ctx.stroke();

      const aspect = logo.width / logo.height;
      let dw = size * 0.78;
      let dh = dw / aspect;
      if (dh > size * 0.78) {
        dh = size * 0.78;
        dw = dh * aspect;
      }
      ctx.drawImage(logo, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
    };

    stamp(width * 0.25, height * 0.5, 260);
    stamp(width * 0.75, height * 0.5, 260);
  } catch {
    // Globe still works without logo if load fails
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export default function SpinningGlobe({ logoUrl, className }: SpinningGlobeProps) {
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
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.12, 3.35);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x6a8cff, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffe6a0, 1.35);
    key.position.set(3.2, 2.4, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x4d7dff, 0.85);
    fill.position.set(-3, -1.2, 2.5);
    scene.add(fill);

    const rim = new THREE.PointLight(0xd4af37, 1.1, 12);
    rim.position.set(-2.5, 1.8, -3);
    scene.add(rim);

    const ball = new THREE.Group();
    ball.rotation.x = -0.22;
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
      texture = await buildGlobeTexture(logoUrl);
      if (disposed) {
        texture.dispose();
        return;
      }

      const geometry = new THREE.SphereGeometry(1, 96, 96);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.42,
        metalness: 0.18,
        emissive: new THREE.Color(0x12264a),
        emissiveIntensity: 0.22,
      });

      const mesh = new THREE.Mesh(geometry, material);
      ball.add(mesh);
      disposables.push(mesh);

      // Soft outer glow shell
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x2f6adf,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.08, 48, 48), glowMat);
      ball.add(glow);
      disposables.push(glow);
    })();

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed || !renderer) return;
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      ball.rotation.y = t * 0.45;
      ball.rotation.x = -0.22 + Math.sin(t * 0.35) * 0.04;
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
  }, [logoUrl]);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="Live 3D spinning globe with J. Parker Sports Agency logo"
    />
  );
}
