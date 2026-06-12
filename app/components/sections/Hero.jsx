"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Calendar, Star } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const bgImageRef = useRef(null);
  const contentRef = useRef(null);
  const bannerRef = useRef(null);
  const rightBannerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const leftCurtain = leftCurtainRef.current;
      const rightCurtain = rightCurtainRef.current;
      const bgImage = bgImageRef.current;
      const content = contentRef.current;

      // Timeline for Curtain opening scroll-animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", // scroll length for animation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Opening curtains
      tl.to(leftCurtain, { xPercent: -100, ease: "power1.inOut" }, 0);
      tl.to(rightCurtain, { xPercent: 100, ease: "power1.inOut" }, 0);
      
      // Zooming out the background image for premium feel
      tl.fromTo(
        bgImage,
        { scale: 1.15, filter: "brightness(0.35)" },
        { scale: 1.0, filter: "brightness(0.65)", ease: "power1.out" },
        0
      );

      // Fade-in background text as curtains open
      tl.fromTo(
        content,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.1
      );

      // Initial entrance on page load (logo/crest fade-in before scroll, synced to loader complete)
      gsap.fromTo(
        [bannerRef.current, rightBannerRef.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 2.8, stagger: 0.15 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const target = document.querySelector("#booking");
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.8 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100dvh] overflow-hidden bg-maroon-700 select-none"
    >
      {/* Background Revealed Content */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImageRef}
          src="/images/hero-bg.png"
          alt="Grand Golden Lawn Luxury Wedding Setup"
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-700/80 via-black/40 to-black/60 z-1" />
      </div>

      {/* Main Core Content Faded In On Scroll */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-auto"
      >
        <div className="flex items-center gap-2 mb-4 bg-gold-300/10 border border-gold-300/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
          <Star className="w-4 h-4 fill-gold-400 stroke-gold-400" />
          <span className="font-body text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-300">
            Ultra-Premium Destination
          </span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-warm-white tracking-[0.03em] max-w-5xl leading-tight">
          Where Celebrations <br className="hidden md:block" />
          Become <span className="font-sub italic font-medium text-gold-300">Timeless Memories</span>
        </h1>
        
        <p className="font-sub text-lg sm:text-2xl italic text-gold-100/90 max-w-2xl mt-6 font-light">
          Grand Golden Wedding Lawn – A Beautiful Destination For Weddings And Special Events.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a
            href="#booking"
            onClick={handleScrollToBooking}
            className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest bg-maroon-500 hover:bg-maroon-600 border border-gold-300/40 text-warm-white px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl shadow-maroon-500/20"
          >
            <Calendar className="w-4 h-4 text-gold-300" />
            Book Venue
          </a>
          <a
            href="#booking"
            onClick={handleScrollToBooking}
            className="font-body text-xs font-semibold uppercase tracking-widest bg-transparent hover:bg-warm-white/10 border border-warm-white/40 text-warm-white px-8 py-4 rounded-full transition-all duration-300"
          >
            Schedule Visit
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-gold-300/60 animate-bounce">
          <span className="font-body text-[9px] uppercase tracking-[0.3em] font-medium">Scroll to Open Curtains</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {/* Opening Curtains Overlay (On Top initially) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex">
        {/* Left Curtain */}
        <div
          ref={leftCurtainRef}
          className="w-1/2 h-full bg-maroon-600 border-r border-gold-300/20 flex flex-col justify-center items-end pr-4 min-[360px]:pr-6 md:pr-12 pointer-events-auto relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Decorative Curtain Pattern or Subtle Lines */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div
            ref={bannerRef}
            className="flex flex-col items-end text-right select-none"
          >
            <span className="font-display text-2xl min-[360px]:text-3xl sm:text-6xl text-gold-300 font-extralight tracking-widest">
              GRAND
            </span>
            <div className="w-16 min-[360px]:w-24 h-[1px] bg-gold-300/40 mt-3 mb-1" />
            <span className="font-sub text-[9px] min-[360px]:text-xs sm:text-sm text-gold-100/60 tracking-[0.2em] uppercase italic">
              Timeless Elegance
            </span>
          </div>
        </div>

        {/* Right Curtain */}
        <div
          ref={rightCurtainRef}
          className="w-1/2 h-full bg-maroon-600 border-l border-gold-300/20 flex flex-col justify-center items-start pl-4 min-[360px]:pl-6 md:pl-12 pointer-events-auto relative shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div
            ref={rightBannerRef}
            className="flex flex-col items-start text-left select-none"
          >
            <span className="font-display text-2xl min-[360px]:text-3xl sm:text-6xl text-gold-300 font-extralight tracking-widest">
              GOLDEN
            </span>
            <div className="w-16 min-[360px]:w-24 h-[1px] bg-gold-300/40 mt-3 mb-1" />
            <span className="font-sub text-[9px] min-[360px]:text-xs sm:text-sm text-gold-100/60 tracking-[0.2em] uppercase italic">
              Wedding Lawn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
