"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function LuxuryLoader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const progressTrackRef = useRef(null);
  const loaderBgRef = useRef(null);

  useEffect(() => {
    // Lock scroll while loading
    document.body.classList.add("overflow-hidden");

    const duration = 2.2; // Seconds
    const countObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll after loader completes
        document.body.classList.remove("overflow-hidden");
        if (onComplete) onComplete();
      },
    });

    // Entrance animation of loader elements
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: "power3.out" }
    );

    // Number counting
    gsap.to(countObj, {
      val: 100,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        setCounter(Math.floor(countObj.val));
      },
    });

    // Loading line indicator
    gsap.fromTo(
      progressBarRef.current,
      { width: "0%" },
      { width: "100%", duration: duration, ease: "power2.out" }
    );

    // Exit animation of inner content
    tl.to([logoRef.current, textRef.current, counterRef.current, progressTrackRef.current], {
      opacity: 0,
      scale: 0.95,
      y: -15,
      duration: 0.6,
      delay: duration + 0.1,
      ease: "power3.inOut",
    });

    // Elegant fade & zoom transition of background overlay
    tl.to(
      loaderBgRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.4"
    );

    // Fully hide loader container
    tl.to(loaderRef.current, {
      display: "none",
      duration: 0.1,
    });

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none select-none"
    >
      {/* Premium Gradient Background Overlay */}
      <div
        ref={loaderBgRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3D0C0C_0%,_#140202_100%)] pointer-events-auto transform"
      />

      {/* Subtle Inset Gold Border Frame */}
      <div className="absolute inset-6 border border-gold-300/20 pointer-events-none z-0">
        <div className="absolute inset-1 border border-gold-300/5" />
      </div>

      {/* Floating Center Brand Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-auto">
        {/* Monogram Crest */}
        <div ref={logoRef} className="mb-8 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-gold-300/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(223,183,108,0.1)]">
            {/* Outer Dashed Rotating Ring */}
            <div className="absolute inset-[-6px] border border-dashed border-gold-400/40 rounded-full animate-[spin_20s_linear_infinite]" />
            
            {/* Inner Decorative Ring */}
            <div className="absolute inset-[4px] border border-gold-300/10 rounded-full" />
            
            {/* Golden Letter */}
            <span className="font-display text-3xl font-extralight text-gold-300 tracking-[0.1em] translate-x-[0.05em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              G
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="px-4">
          <h2 className="font-display text-2xl md:text-3xl font-light text-warm-white tracking-[0.4em] uppercase drop-shadow-md">
            Grand Golden
          </h2>
          <div className="w-16 h-[1px] bg-gold-300/30 mx-auto my-3" />
          <p className="font-sub text-xs md:text-sm italic text-gold-300 tracking-[0.2em] uppercase">
            Luxury Wedding Lawn & Destination
          </p>
        </div>

        {/* Percentage counter */}
        <div ref={counterRef} className="mt-8 text-warm-white font-display text-6xl md:text-7xl font-extralight tracking-[0.1em] drop-shadow-lg">
          {counter}
        </div>

        {/* Minimal progress line */}
        <div ref={progressTrackRef} className="mt-6 w-48 md:w-64 h-[1px] bg-warm-white/10 rounded-full overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-400 shadow-[0_0_8px_#DFB76C]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
