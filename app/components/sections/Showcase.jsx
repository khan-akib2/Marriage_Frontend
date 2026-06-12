"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, ArrowRight } from "lucide-react";

export default function Showcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Calculate how far to scroll
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Horizontal Scroll Trigger
      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Parallax on images inside the horizontal scroll (restricted boundary to prevent white space)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const images = track.querySelectorAll(".parallax-img");
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: "Royal Stage Design",
      subtitle: "The majestic center of celebrations",
      desc: "Lavish floral setups, velvet seating, and cascading gold details setting an imperial tone.",
      image: "/images/showcase-stage.png",
      tag: "Royal Stage",
    },
    {
      title: "Imperial Dining Experience",
      subtitle: "Gourmet settings under the stars",
      desc: "White-gloved banquet tables with crystal candelabras and luxurious settings.",
      image: "/images/showcase-dining.png",
      tag: "Dining",
    },
    {
      title: "The Dream Wedding Aisle",
      subtitle: "Step into a magical path of forever",
      desc: "Covered aisle lined with golden cold sparks, roses, and custom ambient lighting.",
      image: "/images/story-couple.png",
      tag: "Mandap Pathway",
    },
    {
      title: "Vast Green Lawns",
      subtitle: "Unmatched scale and pristine nature",
      desc: "Perfect manicured carpet grass, fully leveled, hosting up to 3,500 guests with comfort.",
      image: "/images/hero-bg.png",
      tag: "Main Lawn",
    },
    {
      title: "Entrance Archways",
      subtitle: "A royal first impression",
      desc: "Luxurious entrance pillars adorned with floral structures and glowing custom chandeliers.",
      image: "/images/showcase-dining.png",
      tag: "Entrance",
    },
    {
      title: "Ambient Decor Detailing",
      subtitle: "Charming luxury in small elements",
      desc: "Bespoke glass lamps, floral backdrops, and fairy lights creating a dreamlike glow.",
      image: "/images/showcase-stage.png",
      tag: "Decor Detail",
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
    <div
      ref={containerRef}
      id="showcase"
      className="relative w-full h-[100dvh] bg-[#F4EFE6] overflow-hidden select-none"
    >
      {/* Title block fixed in horizontal layout */}
      <div className="absolute top-20 md:top-28 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-maroon-600 mb-2">
          <Camera className="w-4 h-4 text-gold-400" />
          <span className="font-body text-[10px] uppercase tracking-[0.35em] font-semibold">
            Venue Portfolios
          </span>
        </div>
        <h2 className="font-display text-xl min-[360px]:text-2xl md:text-4xl font-light text-maroon-600 tracking-wide">
          Spaces Designed <span className="font-sub italic text-gold-500 font-medium">to Wow</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="horizontal-scroll-container h-full items-center pt-20 md:pt-24 pl-12 pr-[10vw]"
      >
        {/* Intro Slide Panel */}
        <div className="w-[80vw] md:w-[35vw] flex flex-col justify-center shrink-0 pr-8 md:pr-16 h-[60vh] md:h-[60vh] lg:h-[62vh]">
          <span className="font-body text-[9px] uppercase tracking-[0.3em] text-gold-500 mb-2 font-semibold">
            Section 04 // Visual Showcase
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-light text-maroon-600 leading-tight mb-6">
            Explore Every Elegant Corner
          </h3>
          <p className="font-body text-xs md:text-sm text-[#6A6A6A] leading-relaxed mb-8">
            Scroll vertically to traverse our layout setups. Each space is tailored to merge seamlessly with high-end setups.
          </p>
          <div className="flex items-center gap-3 text-maroon-500 font-body text-xs tracking-widest uppercase font-semibold">
            Swipe or Scroll Down to start
            <ArrowRight className="w-4 h-4 animate-ping" />
          </div>
        </div>

        {/* Showcase Items */}
        {items.map((item, idx) => (
          <div
            key={idx}
            className="w-[85vw] md:w-[60vw] h-[60vh] min-[360px]:h-[58vh] md:h-[60vh] lg:h-[62vh] shrink-0 mr-8 md:mr-16 bg-white rounded-3xl overflow-hidden border border-gold-300/10 shadow-xl shadow-maroon-700/5 relative group flex flex-col md:flex-row"
          >
            {/* Image section with parallax overflow */}
            <div className="w-full md:w-3/5 h-[32%] md:h-full overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="parallax-img absolute top-0 bottom-0 left-0 md:-left-[10%] w-full md:w-[120%] h-full object-cover select-none pointer-events-none filter brightness-90"
                loading="lazy"
              />
              {/* Inner golden frame */}
              <div className="absolute inset-4 border border-gold-100/20 rounded-2xl pointer-events-none" />
              <span className="absolute top-4 left-4 bg-maroon-600 text-warm-white font-body text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-gold-300/20">
                {item.tag}
              </span>
            </div>

            {/* Description section */}
            <div className="w-full md:w-2/5 p-4 min-[360px]:p-5 sm:p-8 md:p-12 flex flex-col justify-between h-[68%] md:h-full bg-white relative">
              <div>
                <span className="font-sub italic text-gold-400 text-sm block mb-1">
                  {item.subtitle}
                </span>
                <h4 className="font-display text-lg min-[360px]:text-xl md:text-2xl font-light text-maroon-600 mb-3 md:mb-4 tracking-wide">
                  {item.title}
                </h4>
                <div className="w-8 h-[1px] bg-gold-400/40 mb-3 md:mb-4" />
                <p className="font-body text-[11px] min-[360px]:text-xs md:text-sm text-[#6A6A6A] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div>
                <a
                  href="#booking"
                  onClick={handleScrollToBooking}
                  className="font-body text-[10px] uppercase tracking-widest text-maroon-600 hover:text-gold-400 font-semibold flex items-center gap-2 transition-colors duration-300 group/link"
                >
                  Inquire About Setup
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* End Panel / Transition to next section */}
        <div className="w-[60vw] md:w-[35vw] flex flex-col justify-center items-center text-center shrink-0 px-8 md:px-12 h-[60vh] md:h-[60vh] lg:h-[62vh]">
          <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center mb-6">
            <Camera className="w-6 h-6 text-gold-500" />
          </div>
          <h4 className="font-display text-xl md:text-2xl font-light text-maroon-600 mb-4">
            Ready to design your setup?
          </h4>
          <p className="font-body text-xs text-[#6A6A6A] mb-8">
            Connect with our event curation team and customize the floor map to your liking.
          </p>
          <a
            href="#booking"
            onClick={handleScrollToBooking}
            className="font-body text-xs font-semibold uppercase tracking-widest bg-maroon-600 text-warm-white px-8 py-3.5 rounded-full border border-gold-300/30 shadow-md hover:bg-maroon-700 transition-all"
          >
            Connect Curation
          </a>
        </div>
      </div>
    </div>
  );
}
