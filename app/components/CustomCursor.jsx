"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only mount on desktop devices (non-touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    let currentlyHidden = true;

    // Use gsap.quickTo for high-frequency cursor position updates to prevent layout thrashing
    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power2.out" });
    const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.25, ease: "power2.out" });
    const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.25, ease: "power2.out" });

    const onMouseMove = (e) => {
      if (currentlyHidden) {
        currentlyHidden = false;
        setHidden(false);
      }
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX - 16);
      yToRing(e.clientY - 16);
    };

    const onMouseLeave = () => {
      currentlyHidden = true;
      setHidden(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Event Delegation: Listen for hovers at document level to avoid heavy MutationObserver queries
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const interactiveEl = target.closest('a, button, select, input, textarea, [role="button"], .luxury-hover, [data-interactive="true"]');
      
      if (interactiveEl) {
        gsap.to(cursorDot, {
          scale: 2.2,
          backgroundColor: "#5B1C1C", // Maroon color matching theme
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(cursorRing, {
          scale: 1.4,
          borderColor: "#5B1C1C",
          borderWidth: "1.5px",
          backgroundColor: "rgba(223, 183, 108, 0.15)",
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;
      const interactiveEl = target.closest('a, button, select, input, textarea, [role="button"], .luxury-hover, [data-interactive="true"]');
      
      if (interactiveEl) {
        // Only reset if we aren't moving into another interactive child/element
        const relatedTarget = e.relatedTarget;
        if (relatedTarget && relatedTarget.closest('a, button, select, input, textarea, [role="button"], .luxury-hover, [data-interactive="true"]')) {
          return;
        }
        
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: "#C5A059", // Gold color matching theme
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(cursorRing, {
          scale: 1,
          borderColor: "#C5A059",
          borderWidth: "1px",
          backgroundColor: "transparent",
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] bg-gold-400 transition-opacity duration-300 hidden md:block ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-400/60 pointer-events-none z-[9998] transition-opacity duration-300 hidden md:block ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
