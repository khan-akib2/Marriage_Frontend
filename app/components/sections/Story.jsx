"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Story() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean);
      if (!slides || slides.length === 0) return;

      // Pin the main container while transitioning through frames
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${slides.length * 100}%`, // scroll size based on frame count
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each slide in sequence (parent-level animations)
      slides.forEach((slide, index) => {
        if (index === 0) return; // Keep slide 1 visible initially

        const prevSlide = slides[index - 1];

        // Fade out previous slide
        tl.to(
          prevSlide,
          {
            opacity: 0,
            y: -80,
            pointerEvents: "none",
            duration: 0.8,
            ease: "power2.inOut",
          },
          `+=0.2` // Small buffer between animations
        )
        // Fade in current slide
        .fromTo(
          slide,
          { opacity: 0, y: 80, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 1.0,
            ease: "power2.out",
          },
          "-=0.3" // Overlap slightly with previous fade out
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const storyFrames = [
    {
      title: "A Dream Begins",
      desc: "Every timeless love story starts with a vision—a beautiful promise of forever whispered under a canopy of stars and sweet anticipation.",
      image: "/images/hero-bg.png",
      tag: "Frame 01 // Vision",
    },
    {
      title: "Families Come Together",
      desc: "Generations unite, traditions blend, and smiles reflect the deep warmth of relationships finding a new home. Two stories merge into one grand legacy.",
      image: "/images/showcase-dining.png",
      tag: "Frame 02 // Unity",
    },
    {
      title: "Moments Become Memories",
      desc: "The soft rustle of silk, the sudden shower of petals, and the spark in each other's eyes become immortalized in hearts forever.",
      image: "/images/story-couple.png",
      tag: "Frame 03 // Eternity",
    },
    {
      title: "The Perfect Venue Matters",
      desc: "Because the canvas for your masterpiece celebration demands details that match the weight of your love. A five-star backdrop for a five-star promise.",
      image: "/images/showcase-stage.png",
      tag: "Frame 04 // Canvas",
    },
    {
      title: "Grand Golden Wedding Lawn",
      desc: "Where your dreams are woven into majestic realities. Discover an ultra-premium, cinematic lawn designed exclusively for luxury destination weddings and elite gatherings.",
      image: "/images/hero-bg.png",
      tag: "Frame 05 // Destination",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="story"
      className="relative w-full h-[100dvh] bg-[#FFFDF9] overflow-hidden select-none"
    >
      {/* Decorative Champagne Gold Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      {/* Grid container spanning full screen */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className="w-full h-[85vh] relative">
          {storyFrames.map((frame, index) => (
            <div
              key={index}
              ref={(el) => (slidesRef.current[index] = el)}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-16 items-center pt-12 sm:pt-20 lg:pt-0"
              style={{
                opacity: index === 0 ? 1 : 0,
                transform: index === 0 ? "translateY(0)" : "translateY(80px)",
                pointerEvents: index === 0 ? "auto" : "none",
              }}
            >
              {/* Text Area */}
              <div className="story-text lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-500 mb-1.5 sm:mb-4 block">
                  {frame.tag}
                </span>
                <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-maroon-600 leading-tight mb-2 sm:mb-6">
                  {frame.title}
                </h2>
                <div className="w-12 h-[1px] bg-gold-400/40 mb-2 sm:mb-6" />
                <p className="font-body text-xs sm:text-sm lg:text-base leading-relaxed text-[#5A5A5A] max-w-md">
                  {frame.desc}
                </p>
              </div>

              {/* Visual Area */}
              <div className="story-img lg:col-span-7 w-full h-[40vh] sm:h-[45vh] lg:h-[65vh] overflow-hidden rounded-2xl relative order-1 lg:order-2 shadow-2xl shadow-maroon-700/5">
                <img
                  src={frame.image}
                  alt={frame.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />
                {/* Visual Glass overlay/vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-700/20 to-transparent" />
                <div className="absolute inset-4 border border-gold-300/25 rounded-xl pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
