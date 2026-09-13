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
 * 3D basketball globe: show on tablets + desktop.
 * Hide only on phones and when the user prefers reduced motion.
 */
export function useShow3DGlobe(phoneBreakpoint = 768) {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const phoneMq = window.matchMedia(`(max-width: ${phoneBreakpoint - 1}px)`);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setShow3D(!phoneMq.matches && !motionMq.matches);
    };

    update();
    phoneMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);

    return () => {
      phoneMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, [phoneBreakpoint]);

  return show3D;
}
