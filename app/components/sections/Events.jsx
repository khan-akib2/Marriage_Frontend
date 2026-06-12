"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarRange, Sparkles } from "lucide-react";

export default function Events() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const eventTypes = [
    {
      title: "Royal Weddings",
      desc: "Imperial lawn layouts, monumental stages, and traditional setups hosting up to 3,500 guests with luxury.",
      image: "/images/hero-bg.png",
      tag: "1,000 - 3,500 Guests",
    },
    {
      title: "Grand Engagements",
      desc: "Elegant rings exchanges in charming outdoor gazebos surrounded by family, petals, and fairy lights.",
      image: "/images/story-couple.png",
      tag: "300 - 1,000 Guests",
    },
    {
      title: "Vibrant Sangeet",
      desc: "High-octane sound stages, majestic ambient lighting, dance floors, and elite cocktail lounges.",
      image: "/images/showcase-stage.png",
      tag: "500 - 1,500 Guests",
    },
    {
      title: "Intimate Mehendi",
      desc: "Champagne seating, bohemian tents, and flower installations matching the traditional colors of mehendi.",
      image: "/images/showcase-dining.png",
      tag: "150 - 500 Guests",
    },
    {
      title: "Lavish Receptions",
      desc: "Fine dining banquets under massive crystal chandeliers, gourmet catering, and red-carpet photography zones.",
      image: "/images/showcase-dining.png",
      tag: "1,000 - 3,500 Guests",
    },
    {
      title: "Birthday Celebrations",
      desc: "Luxurious birthday galas, themed balloon arches, catering arrays, and ambient lounge seating.",
      image: "/images/story-couple.png",
      tag: "100 - 400 Guests",
    },
    {
      title: "Corporate Events",
      desc: "Distinguished galas, product launches, corporate luncheons, staging, and parking arrays.",
      image: "/images/hero-bg.png",
      tag: "200 - 1,200 Guests",
    },
    {
      title: "Family Gatherings",
      desc: "Timeless golden reunions, anniversary dinners, and community gatherings supported by elite managers.",
      image: "/images/showcase-stage.png",
      tag: "200 - 1,000 Guests",
    },
  ];

  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const target = document.querySelector("#booking");
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.5 });
    }
  };

  return (
    <section
      ref={containerRef}
      id="events"
      className="py-16 md:py-24 bg-[#FFFDF9] relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 text-maroon-600 mb-4 bg-gold-100/50 px-4 py-1 rounded-full border border-gold-300/20">
            <CalendarRange className="w-4 h-4 text-gold-500" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] font-semibold">
              Occasions
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
            Events We Elevate <br />
            <span className="font-sub italic text-gold-500 font-medium">Into Legends</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#6A6A6A] leading-relaxed mt-4">
            From regal destination weddings to high-profile corporate galas, our spaces adjust to represent the true weight of your milestone celebrations.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((event, idx) => (
            <div
              key={idx}
              className="event-card group h-[40vh] rounded-3xl overflow-hidden relative border border-gold-300/10 shadow-lg shadow-maroon-700/5 cursor-pointer bg-maroon-700"
            >
              {/* Image background with hover zooms */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-50 group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gold gradient borders */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-maroon-700/90 transition-colors duration-500" />
              
              {/* Inner floating border */}
              <div className="absolute inset-3 border border-gold-100/20 rounded-2xl pointer-events-none group-hover:border-gold-300/40 transition-colors duration-500" />

              {/* Title & Tag initially visible */}
              <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-10px] z-10">
                <span className="font-body text-[9px] uppercase tracking-widest text-gold-300 font-semibold bg-maroon-600/40 border border-gold-300/25 px-3 py-1 rounded-full backdrop-blur-xs">
                  {event.tag}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-light text-warm-white tracking-wide mt-3 group-hover:text-gold-300 transition-colors">
                  {event.title}
                </h3>
                
                {/* Description sliding up */}
                <p className="font-body text-[11px] text-warm-white/70 leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-500">
                  {event.desc}
                </p>
              </div>

              {/* CTA link overlay */}
              <a
                href="#booking"
                onClick={handleScrollToBooking}
                className="absolute inset-0 z-20"
                aria-label={`Inquire about ${event.title}`}
              />
            </div>
          ))}
        </div>

        {/* Quick Inquiry prompt */}
        <div className="mt-16 text-center">
          <p className="font-sub text-base italic text-[#5A5A5A]">
            Planning a custom layout or bespoke event format?{" "}
            <a
              href="#booking"
              onClick={handleScrollToBooking}
              className="text-maroon-600 font-semibold font-body text-xs uppercase tracking-widest hover:text-gold-500 underline ml-2 transition-colors inline-flex items-center gap-1.5"
            >
              Inquire Custom Events
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
