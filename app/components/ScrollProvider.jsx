"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger for mobile to prevent jumpy layout recalculations
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Disable default browser scroll restoration on reload
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Reset scroll positions immediately
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    lenisRef.current = lenis;

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Synchronize Lenis with GSAP's ticker
    const updateLenis = (time) => {
      // gsap.ticker passes time in seconds. lenis.raf expects time in milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Disable lag smoothing in GSAP ScrollTrigger
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for scroll navigation
    window.lenis = lenis;

    // Refresh scroll triggers on load
    ScrollTrigger.refresh();

    // Refresh again after loader finishes to guarantee accurate scroll trigger calculations
    const loaderTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 3500);

    return () => {
      clearTimeout(loaderTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
