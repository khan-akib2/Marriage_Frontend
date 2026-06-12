"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-animate",
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: "What is the maximum guest capacity of the lawn?",
      a: "The main lawn accommodates up to 3,500 guests for banquet seating configurations and can comfortably handle up to 4,000 for floating crowds. We also have smaller configurations for micro-gatherings.",
    },
    {
      q: "Do you have dedicated parking for large gatherings?",
      a: "Yes. Our private, paved parking array sits inside the secured gates and holds over 600 vehicles. We offer dedicated valet service booths and golf carts to ferry elder guests.",
    },
    {
      q: "What are your catering guidelines? Can we bring our own chefs?",
      a: "We have panels of elite, award-winning in-house catering teams offering multiple cuisines. However, we are flexible: you may bring external certified caterers of your choice. Separate kitchen pavilions are provided.",
    },
    {
      q: "Are we allowed to bring outside decorators?",
      a: "To maintain five-star safety, structural stability, and luxury visual standards, we recommend our elite panels of decorators. If you wish to hire external design companies, they must coordinate with our venue managers.",
    },
    {
      q: "What are the event timings and music curfews?",
      a: "For morning weddings, the venue is available starting at 6:00 AM. For evening galas, entry begins at 2:00 PM. Sound curfews are governed by local civic laws, usually concluding around 10:00 PM outdoors.",
    },
    {
      q: "What is the booking process and deposit requirement?",
      a: "Booking confirmation requires a 25% non-refundable booking deposit alongside a signed venue contract. 50% is due 3 months prior to the date, and the remaining 25% must be cleared 14 days before the event.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="faq"
      className="py-16 md:py-24 bg-[#FAFAF9] relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-start">
          
          {/* Left Side Info */}
          <div className="lg:col-span-5 faq-animate">
            <div className="flex items-center gap-2 text-maroon-600 mb-4">
              <HelpCircle className="w-5 h-5 text-gold-400" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                Venue Inquiries
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
              Frequently Asked <br />
              <span className="font-sub italic text-gold-500 font-medium">Questions</span>
            </h2>
            
            <p className="font-body text-xs sm:text-sm text-[#5A5A5A] leading-relaxed mt-6 max-w-sm">
              Can't find the answers you're looking for? Reach out to our event management desk directly for a personalized venue consult.
            </p>
            
            <div className="mt-8 flex gap-4">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  window.lenis?.scrollTo("#booking", { offset: -60 });
                }}
                className="font-body text-xs font-semibold uppercase tracking-widest text-maroon-600 hover:text-gold-400 transition-colors"
              >
                Inquire Directly →
              </a>
            </div>
          </div>

          {/* Right Side Accordions */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full faq-animate">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-gold-400/60 bg-white shadow-xl shadow-maroon-700/5"
                      : "border-gold-300/10 bg-white/60 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-display text-base md:text-lg font-medium text-maroon-600 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion panel */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 border-t border-gold-300/5 pt-4">
                      <p className="font-body text-xs md:text-sm text-[#6A6A6A] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
