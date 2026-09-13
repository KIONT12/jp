"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Lite/perf mode: smaller screens and reduced-motion (not touch alone — many laptops are touch). */
export function usePerformanceMode(breakpoint = 1280) {
  const [perfMode, setPerfMode] = useState(true);

  useEffect(() => {
    const widthMq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPerfMode(widthMq.matches || motionMq.matches);
    };

    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);

    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return perfMode;
}

/**
 * 3D basketball globe: show everywhere except reduced-motion preference.
 * Phones get a lighter CSS variant; they still see the globe.
 */
export function useShow3DGlobe() {
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow3D(!motionMq.matches);
    update();
    motionMq.addEventListener("change", update);
    return () => motionMq.removeEventListener("change", update);
  }, []);

  return show3D;
}
