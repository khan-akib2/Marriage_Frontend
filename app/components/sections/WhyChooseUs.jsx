"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Landmark, Sparkles, ShieldCheck, HeartHandshake, Compass, Smile, HelpCircle } from "lucide-react";

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const leftPinRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin left column on desktop (width >= 1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80px",
          end: "bottom bottom",
          pin: leftPinRef.current,
          pinSpacing: false,
        });
      });

      // Scroll progress line for the vertical timeline
      gsap.fromTo(
        ".timeline-progress-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 45%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );

      // Light up active timeline card as it scrolls into focus
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Landmark,
      title: "Spacious Premium Venue",
      desc: "An extensive 85,000+ sq. ft. manicured green lawn capable of hosting grand scale seating structures, separate dining pavilions, and massive stages without congestion.",
    },
    {
      icon: Sparkles,
      title: "Elegant Bespoke Ambience",
      desc: "Curated with warm uplighting, elegant gold-brushed metal fences, pristine water fountains, and gorgeous high-reaching palm trees that shape a five-star setting.",
    },
    {
      icon: ShieldCheck,
      title: "Elite In-House Management",
      desc: "A dedicated crew of five-star hospitality veterans coordinating decorators, catering setups, valet flow, and scheduling from sunrise to departure.",
    },
    {
      icon: Compass,
      title: "Prime Accessible Location",
      desc: "Exclusively situated along the premium bypass corridor, bypassing narrow city traffic while remaining connected to major highway hubs and luxury hotels.",
    },
    {
      icon: HeartHandshake,
      title: "Flexible Catering & Planning",
      desc: "Choose from our panels of award-winning chefs or coordinate with your own external decorators and catering teams for a bespoke reception setup.",
    },
    {
      icon: Smile,
      title: "Unforgettable Memories",
      desc: "Our primary metric is creating emotional, stress-free weddings that your guests recount as the benchmark of luxury hospitality for years to come.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="why-choose-us"
      className="relative py-16 md:py-24 bg-[#FAFAF9] select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-start">
          
          {/* Left Column (Pinned on Desktop) */}
          <div ref={leftPinRef} className="lg:col-span-5 flex flex-col justify-start lg:h-[70vh] why-left-pin">
            <div className="flex items-center gap-2 mb-4 text-maroon-600">
              <HelpCircle className="w-5 h-5 text-gold-400 animate-pulse" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                Why Choose Us
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
              Crafting The <br />
              Standard of <br />
              <span className="font-sub italic text-gold-500 font-medium">Luxe Celebrations</span>
            </h2>
            
            <p className="font-body text-xs sm:text-sm text-[#5A5A5A] leading-relaxed mt-6 max-w-sm">
              We do not host events. We engineer milestones. Explore the core assets that set Grand Golden Wedding Lawn in a tier of its own.
            </p>

            <div className="w-24 h-[1px] bg-gold-400/30 mt-8 mb-6" />

            <div className="hidden lg:flex items-center gap-2 text-gold-500 font-sub italic text-base">
              Scroll down to track the timeline
            </div>
          </div>

          {/* Right Column (Scrolling Timeline) */}
          <div className="lg:col-span-7 relative pl-8 md:pl-16 timeline-track">
            
            {/* Timeline Vertical Rail */}
            <div className="absolute left-[17px] md:left-[29px] top-4 bottom-4 w-[2px] bg-gold-100 rounded-full">
              {/* Progress Line */}
              <div className="timeline-progress-line w-full h-full bg-maroon-600 origin-top scale-y-0 rounded-full" />
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-12 md:gap-16">
              {features.map((feature, idx) => {
                const IconComp = feature.icon;
                return (
                  <div
                    key={idx}
                    className="timeline-card flex gap-6 relative group"
                  >
                    {/* Floating Circle Indicator */}
                    <div className="absolute left-[-26px] md:left-[-54px] top-1.5 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white border border-gold-300 flex items-center justify-center text-gold-500 z-10 shadow-md transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-warm-white group-hover:border-maroon-600">
                      <IconComp className="w-3.5 h-3.5 md:w-5 md:h-5" />
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8 bg-white border border-gold-300/10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-maroon-700/5 transition-all duration-300 flex-1">
                      <span className="font-body text-[9px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
                        Asset 0{idx + 1}
                      </span>
                      
                      <h3 className="font-display text-lg md:text-xl font-medium text-maroon-600 mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="font-body text-xs md:text-sm text-[#6A6A6A] leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
