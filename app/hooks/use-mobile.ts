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

/** Lite/perf mode: tablets, touch devices, and reduced-motion preferences. */
export function usePerformanceMode(breakpoint = 1280) {
  const [perfMode, setPerfMode] = useState(true);

  useEffect(() => {
    const widthMq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchMq = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setPerfMode(widthMq.matches || motionMq.matches || touchMq.matches);
    };

    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    touchMq.addEventListener("change", update);

    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
      touchMq.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return perfMode;
}
