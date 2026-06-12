"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Star } from "lucide-react";

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".testimonials-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const reviews = [
    {
      couple: "Aishwarya & Rahul",
      type: "Destination Wedding",
      quote: "The wedding of our dreams. The team executed our floral mandate flawlessly, and the parking size allowed our 1,200 guests to arrive without a hitch. Truly majestic.",
      rating: 5,
    },
    {
      couple: "Meera & Vikram",
      type: "Imperial Reception",
      quote: "Grand Golden Wedding Lawn is a five-star venue. The suites were spacious and allowed our vanity teams to work comfortably. The lawns looked magical at dusk.",
      rating: 5,
    },
    {
      couple: "Priyah & Kunal",
      type: "Sangeet Gala",
      quote: "Every detail, from the valet coordination to the dinner lighting, was handled with maximum precision. Our families were wowed by the sheer scale and hospitality.",
      rating: 5,
    },
    {
      couple: "Aditi & Rohan",
      type: "Royal Mandap Ceremony",
      quote: "A flawless lawn. The lush green grass felt soft under the feet, and the crystal chandelier rigging on trees made the space feel like a royal destination resort.",
      rating: 5,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-16 md:py-24 bg-[#FFFDF9] relative overflow-hidden select-none"
    >
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-100/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 text-maroon-600 mb-4 bg-gold-100/50 px-4 py-1 rounded-full border border-gold-300/20">
            <MessageSquare className="w-4 h-4 text-gold-500" />
            <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
              Client Praises
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
            Loved By Couples <br />
            <span className="font-sub italic text-gold-500 font-medium">Across the Nation</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#6A6A6A] leading-relaxed mt-4">
            Hear from families and couples who hosted their landmark celebrations with us. We measure our success in the depth of their memories.
          </p>
        </div>

      </div>

      {/* Infinite Marquee Track Container (CSS Marquee for maximum performance) */}
      <div className="relative w-full flex items-center justify-center overflow-x-hidden py-4">
        {/* Track 1 */}
        <div className="flex gap-6 animate-[marquee_25s_linear_infinite] shrink-0 min-w-full">
          {reviews.concat(reviews).map((rev, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[450px] shrink-0 p-8 md:p-10 glassmorphism rounded-3xl relative flex flex-col justify-between h-[300px]"
            >
              {/* Quote marks */}
              <div className="absolute top-6 right-8 font-display text-7xl text-gold-300/20 pointer-events-none select-none">
                “
              </div>

              {/* Rating stars */}
              <div>
                <div className="flex gap-1 mb-4 text-gold-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 stroke-gold-400" />
                  ))}
                </div>

                <p className="font-body text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-gold-300/10 pt-4 flex flex-col">
                <span className="font-display text-base sm:text-lg font-medium text-maroon-600">
                  {rev.couple}
                </span>
                <span className="font-body text-[10px] text-gold-500 font-bold uppercase tracking-widest mt-0.5">
                  {rev.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
