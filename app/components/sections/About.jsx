"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MapPin, Tent, Car, Award, ChevronRight } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in cards & text
      gsap.fromTo(
        ".about-fade",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate stats
      const stats = statsRef.current.filter(Boolean);
      stats.forEach((stat) => {
        const targetVal = parseInt(stat.getAttribute("data-target"), 10);
        const suffix = stat.getAttribute("data-suffix") || "";
        const valObj = { val: 0 };

        gsap.to(valObj, {
          val: targetVal,
          duration: 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            stat.innerText = Math.floor(valObj.val).toLocaleString() + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Pristine Lawn Space", target: 85000, suffix: " Sq. Ft.", desc: "Manicured lush lawns for massive setups." },
    { label: "Guest Capacity", target: 3500, suffix: "+", desc: "Comfortably hosts massive imperial gatherings." },
    { label: "Secured Parking", target: 600, suffix: "+ Cars", desc: "Stress-free valet and self-parking spaces." },
    { label: "Luxury Guest Suites", target: 20, suffix: "+ Rooms", desc: "Fully air-conditioned luxury vanity suites." },
  ];

  const highlights = [
    {
      icon: Tent,
      title: "Spacious Event Areas",
      desc: "Features majestic open lawns, dedicated dining pavilions, separate mandap spaces, and spacious weather-proof stages.",
    },
    {
      icon: Sparkles,
      title: "Elegant Custom Decorations",
      desc: "In-house panels of elite designers rendering glass installations, royal floral layouts, and custom theme layouts.",
    },
    {
      icon: MapPin,
      title: "Premium Convenient Location",
      desc: "Nestled away from city congestion yet easily accessible via major highways with nearby luxury hotels.",
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
      ref={sectionRef}
      id="about"
      className="py-16 md:py-24 bg-[#FAFAF9] relative overflow-hidden select-none"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-100/25 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-maroon-100/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-start">
          {/* Left Column: Context Introduction */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-maroon-600 about-fade">
              <Award className="w-5 h-5 text-gold-400" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                An Oasis of Grandeur
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight mb-6 about-fade">
              A Symphony of Luxury <br />& Majestic Scale
            </h2>
            
            <p className="font-sub text-lg italic text-[#5A5A5A] mb-8 leading-relaxed about-fade">
              Designed for celebrations that deserve to be spoken about for generations. Grand Golden Wedding Lawn blends pristine nature with elite design to create premium experiences.
            </p>

            <div className="flex flex-col gap-6 mt-2">
              {highlights.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 rounded-2xl bg-white border border-gold-300/10 hover:border-gold-300/40 hover:shadow-xl hover:shadow-maroon-700/5 transition-all duration-300 group about-fade"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold-100/40 flex items-center justify-center text-gold-500 group-hover:bg-maroon-600 group-hover:text-warm-white transition-colors duration-300 shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-medium text-maroon-600 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-[#6A6A6A] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-6 lg:pl-8 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white border border-gold-300/15 rounded-2xl shadow-sm hover:shadow-md transition-all relative group overflow-hidden about-fade"
                >
                  {/* Subtle golden corner hover */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-gold-300 transition-all duration-300" />
                  
                  <div className="font-display text-3xl sm:text-4xl font-extralight text-maroon-600 mb-2 tracking-tight">
                    <span
                      ref={(el) => (statsRef.current[idx] = el)}
                      data-target={stat.target}
                      data-suffix={stat.suffix}
                    >
                      0
                    </span>
                  </div>
                  
                  <h4 className="font-display text-sm font-semibold tracking-wide text-[#3A3A3A] mb-2">
                    {stat.label}
                  </h4>
                  
                  <p className="font-body text-xs text-[#7A7A7A] leading-normal">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Conversion CTA */}
            <div className="mt-12 p-8 glassmorphism rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 about-fade">
              <div>
                <h4 className="font-display text-lg text-maroon-600 font-semibold">
                  Want to see the venue?
                </h4>
                <p className="font-body text-xs text-[#5A5A5A] mt-1">
                  Book a private tour with our event consultants today.
                </p>
              </div>
              <a
                href="#booking"
                onClick={handleScrollToBooking}
                className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest bg-maroon-600 text-warm-white px-6 py-3 rounded-full hover:bg-maroon-700 transition-all shadow-md shrink-0"
              >
                Schedule Tour
                <ChevronRight className="w-4 h-4 text-gold-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
