"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Compass, Navigation, Car, Landmark } from "lucide-react";

export default function Location() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".location-animate",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const checkpoints = [
    {
      icon: Landmark,
      title: "Key Landmark References",
      desc: "Conveniently situated opposite Bharat Ghare on Huda Park Road in Kausa, Mumbra.",
    },
    {
      icon: Car,
      title: "Transit & Toll Accessibility",
      desc: "Directly accessible via the Mumbra Bypass Road with smooth, broad roads for coaches and fleets.",
    },
    {
      icon: Navigation,
      title: "Transit Timelines",
      desc: "Excellent highway connectivity to Thane center, Navi Mumbai, and Mumbai airports.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="location"
      className="py-16 md:py-24 bg-[#FAFAF9] relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-center">
          
          {/* Map Column */}
          <div className="lg:col-span-7 h-[40vh] lg:h-[55vh] rounded-3xl overflow-hidden shadow-2xl relative border-2 border-gold-300/30 order-2 lg:order-1 location-animate">
            <iframe
              src="https://maps.google.com/maps?q=GRAND%20GOLDEN%20WEDDING%20HALL,%20Huda%20Park%20Rd,%20Kausa,%20Mumbra,%20Thane&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(0.9) grayscale(0.1)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grand Golden Wedding Hall Map Location"
            />
            
            {/* Subtle glassmorphism indicator */}
            <div className="absolute bottom-6 left-6 right-6 p-4 glassmorphism rounded-2xl flex items-center justify-between pointer-events-auto">
              <div>
                <h4 className="font-display text-sm font-semibold text-maroon-600">
                  Grand Golden Wedding Hall
                </h4>
                <p className="font-body text-[10px] text-[#5A5A5A] mt-0.5">
                  Huda Park Rd, Kausa, Mumbra, Thane, MH 400612
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/gyAHVQRDsykijeZd7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-maroon-600 flex items-center justify-center text-warm-white hover:bg-gold-400 hover:text-maroon-700 transition-colors"
                aria-label="Open in Google Maps"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 order-1 lg:order-2 location-animate">
            <div className="flex items-center gap-2 text-maroon-600 mb-4">
              <Compass className="w-5 h-5 text-gold-400" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                Connectivity
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
              A Seamless <br />
              Arrival <span className="font-sub italic text-gold-500 font-medium">Experience</span>
            </h2>
            
            <p className="font-body text-xs sm:text-sm text-[#5A5A5A] leading-relaxed mt-6 mb-8">
              We selected our location specifically to allow easy transit flow. Guests avoid narrow local city corridors, arriving straight from express highway flyovers.
            </p>

            <div className="flex flex-col gap-6">
              {checkpoints.map((pt, idx) => {
                const IconComp = pt.icon;
                return (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gold-100/40 border border-gold-300/10 flex items-center justify-center text-gold-500 shrink-0 group-hover:bg-maroon-600 group-hover:text-warm-white transition-colors duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-maroon-600 mb-1">
                        {pt.title}
                      </h4>
                      <p className="font-body text-xs text-[#6A6A6A] leading-relaxed">
                        {pt.desc}
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
