"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sunrise, Palette, UserCheck, Flame, Heart } from "lucide-react";

export default function Experience() {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const intro = introRef.current;
      if (!cards || cards.length === 0 || !intro) return;

      // Set initial state for cards to avoid inline style transform parsing conflicts
      gsap.set(cards, { yPercent: 100, opacity: 0 });

      // Pin the experience container and run slide-stack timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(cards.length + 1) * 100}%`, // scroll duration based on cards count
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Fade out the intro text first
      tl.to(intro, {
        opacity: 0,
        y: -60,
        duration: 0.8,
        ease: "power2.inOut",
      });

      // 2. Slide up and overlay cards in sequence
      cards.forEach((card, index) => {
        tl.fromTo(
          card,
          { yPercent: 100, opacity: 0, pointerEvents: "none" },
          {
            yPercent: 0,
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          },
          `-=${index === 0 ? 0.3 : 0.6}` // Overlap transition with previous slide
        );

        // Hold card on screen before next card rises (except the last card)
        if (index < cards.length - 1) {
          tl.to(card, {
            yPercent: 0, // Dummy hold duration
            duration: 0.8,
          });
          // Set pointer-events back to none on the covered card as the next one comes up
          tl.to(card, {
            pointerEvents: "none",
            duration: 0.1,
          }, ">-0.1");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      time: "08:00 AM",
      phase: "Morning Setup",
      title: "The Canvas Takes Shape",
      desc: "Fresh floral truckloads arrive at dawn. Our styling crew grooms the grass, steam-presses the premium ivory linens, and maps out the structural seating in pristine symmetry.",
      icon: Sunrise,
      bgClass: "bg-ivory border-t border-gold-300/20 text-maroon-700",
      image: "/images/hero-bg.png",
      tag: "Phase 01 // Morning"
    },
    {
      time: "12:00 PM",
      phase: "Decoration",
      title: "Adorning the Grandeur",
      desc: "Luxurious chandeliers are suspended from the trees. Decorators align crystal structures, red-carpet backdrops, and fresh jasmine vines, casting a luxurious aroma across the site.",
      icon: Palette,
      bgClass: "bg-[#FAFAF9] border-t border-gold-300/20 text-maroon-700",
      image: "/images/showcase-dining.png",
      tag: "Phase 02 // Afternoon"
    },
    {
      time: "04:00 PM",
      phase: "Guest Arrival",
      title: "A Grand Royal Welcome",
      desc: "Valets coordinate incoming luxury sedans. Traditional welcoming instrumentals play softly from the foyer as guests step under the illuminated flower archways for the first time.",
      icon: UserCheck,
      bgClass: "bg-beige border-t border-gold-300/30 text-maroon-700",
      image: "/images/story-couple.png",
      tag: "Phase 03 // Dusk"
    },
    {
      time: "07:00 PM",
      phase: "Celebration",
      title: "Under the Golden Canopy",
      desc: "Warm sparks erupt as the couple traverses the aisle. Laughter, dynamic sangeet dances, champagne toasts, and imperial buffet spreads illuminate the night sky.",
      icon: Flame,
      bgClass: "bg-maroon-600 text-warm-white border-t border-gold-300/20",
      image: "/images/showcase-stage.png",
      tag: "Phase 04 // Evening"
    },
    {
      time: "11:00 PM",
      phase: "Memories",
      title: "Written in the Stars",
      desc: "The music winds down to soft violin notes. The newlyweds take portraits against the glowing venue structures, packing away a lifetime of memories in a single timeless day.",
      icon: Heart,
      bgClass: "bg-maroon-700 text-warm-white border-t border-gold-400/25",
      image: "/images/hero-bg.png",
      tag: "Phase 05 // Midnight"
    },
  ];

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full h-[100dvh] bg-[#FFFDF9] overflow-hidden select-none"
    >
      {/* Intro section that scrolls normal */}
      <div
        ref={introRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 z-10"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold block mb-4">
          Section 07 // Chronology
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600">
          The Wedding Day <span className="font-sub italic text-gold-500 font-medium">Evolution</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#6A6A6A] leading-relaxed max-w-2xl mx-auto mt-4">
          Scroll down to see the transformation of our venue from a quiet morning setup into a grand night of glowing celebrations.
        </p>
      </div>

      {/* Stacked Cards Area */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-auto ${step.bgClass}`}
              style={{ opacity: 0 }}
            >
              {/* Inner card content wrapper */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-16 items-center pt-12 sm:pt-20 lg:pt-0">
                
                {/* Details column */}
                <div className="lg:col-span-5 flex flex-col">
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 mb-1.5 sm:mb-4 block">
                    {step.tag}
                  </span>
                  
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gold-300/10 border border-gold-300/30 flex items-center justify-center text-gold-400 shrink-0">
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-lg sm:text-2xl font-light tracking-wide">
                        {step.phase}
                      </span>
                      <span className="font-body text-[10px] sm:text-xs text-[#7A7A7A] tracking-wider uppercase font-semibold">
                        {step.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-light leading-tight mb-2 sm:mb-6">
                    {step.title}
                  </h3>
                  
                  <div className="w-12 sm:w-16 h-[1px] bg-gold-400/40 mb-2 sm:mb-6" />
                  
                  <p className="font-body text-[11px] sm:text-xs lg:text-sm leading-relaxed opacity-80 max-w-md">
                    {step.desc}
                  </p>
                </div>

                {/* Picture Column */}
                <div className="lg:col-span-7 h-[20vh] sm:h-[30vh] lg:h-[60vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl relative border border-gold-300/10">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover select-none pointer-events-none filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-6 right-6 font-display text-4xl lg:text-6xl font-extralight text-gold-300 tracking-wider">
                    0{idx + 1}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
