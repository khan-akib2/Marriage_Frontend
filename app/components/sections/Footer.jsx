"use client";

import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin, ArrowUp, Send, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".cta-animate",
      { opacity: 0, scale: 0.96, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleScrollToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo("#hero", { duration: 2.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToBooking = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo("#booking", { offset: -60, duration: 1.5 });
    } else {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-maroon-700 text-warm-white relative overflow-hidden select-none select-none">
      
      {/* Decorative Golden Line Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
      
      {/* Section 13: Final CTA Banner */}
      <div
        ref={ctaRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center flex flex-col items-center border-b border-gold-300/10"
      >
        <span className="cta-animate font-body text-[10px] uppercase tracking-[0.35em] text-gold-300 font-bold mb-4 block">
          Section 13 // Invitation
        </span>
        
        <h2 className="cta-animate font-display text-4xl sm:text-6xl font-light tracking-wide max-w-4xl leading-tight">
          Let’s Create Your <br />
          <span className="font-sub italic text-gold-300 font-medium">Perfect Celebration</span>
        </h2>
        
        <p className="cta-animate font-sub text-lg sm:text-xl text-gold-100/70 italic max-w-xl mt-6 leading-relaxed">
          Grand Golden Wedding Lawn – Where dreams become timeless memories.
        </p>

        <div className="cta-animate flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="#booking"
            onClick={handleScrollToBooking}
            className="font-body text-xs font-semibold uppercase tracking-widest bg-gold-400 hover:bg-gold-500 text-maroon-700 px-8 py-4.5 rounded-full border border-gold-300/20 shadow-lg shadow-gold-500/10 transition-all duration-300"
          >
            Book Your Event Today
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 font-body text-xs font-semibold uppercase tracking-wider bg-transparent border border-warm-white/30 hover:border-warm-white hover:bg-warm-white/5 text-warm-white px-8 py-4.5 rounded-full transition-all"
          >
            Connect on WhatsApp
          </a>
        </div>
      </div>

      {/* Main Footer Links Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Logo and Address */}
        <div className="md:col-span-5 flex flex-col items-start">
          <a href="#hero" onClick={handleScrollToTop} className="flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 rounded-full border border-gold-300 flex items-center justify-center relative transition-transform duration-500 group-hover:rotate-180">
              <span className="font-display text-sm font-semibold text-gold-300">G</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-base tracking-[0.2em] font-medium text-warm-white uppercase">
                Grand Golden
              </span>
              <span className="font-sub text-[10px] tracking-[0.1em] text-gold-400 uppercase italic">
                Wedding Lawn
              </span>
            </div>
          </a>
          
          <p className="font-body text-xs text-warm-white/70 leading-relaxed max-w-sm mb-6">
            An ultra-premium, five-star destination wedding lawn configured to handle imperial marriages, receptions, and sangeet stages.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-warm-white/60 hover:text-gold-300 transition-colors">
              <MapPin className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span className="font-body text-xs">Premium Bypass Road, Mumbai, MH, 400001</span>
            </div>
            <div className="flex items-center gap-3 text-warm-white/60 hover:text-gold-300 transition-colors">
              <Phone className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span className="font-body text-xs">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-warm-white/60 hover:text-gold-300 transition-colors">
              <Mail className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span className="font-body text-xs">concierge@grandgoldenlawn.com</span>
            </div>
          </div>
        </div>

        {/* Navigation Map */}
        <div className="md:col-span-3 flex flex-col items-start">
          <h4 className="font-display text-xs font-semibold text-gold-300 uppercase tracking-widest mb-6">
            Explore Links
          </h4>
          <div className="flex flex-col gap-3">
            {["Home", "About", "Experience", "Gallery", "FAQ", "Booking"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(`#${link.toLowerCase()}`);
                  if (target) window.lenis?.scrollTo(target, { offset: -60 });
                }}
                className="font-body text-xs text-warm-white/60 hover:text-gold-300 hover:translate-x-1 transition-all duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Operating Timings */}
        <div className="md:col-span-4 flex flex-col items-start">
          <h4 className="font-display text-xs font-semibold text-gold-300 uppercase tracking-widest mb-6">
            Concierge Hours
          </h4>
          <p className="font-body text-xs text-warm-white/70 leading-relaxed mb-4">
            Our site consultants are available for physical tours and walkthroughs throughout the week.
          </p>
          <div className="w-full flex justify-between border-b border-white/5 py-2">
            <span className="font-body text-xs text-warm-white/50">Mon – Sat</span>
            <span className="font-body text-xs text-gold-300">09:00 AM – 07:00 PM</span>
          </div>
          <div className="w-full flex justify-between py-2">
            <span className="font-body text-xs text-warm-white/50">Sunday</span>
            <span className="font-body text-xs text-gold-300">10:00 AM – 04:00 PM</span>
          </div>
        </div>

      </div>

      {/* Footer Bottom / Copyright */}
      <div className="w-full bg-black/30 py-6 text-center select-none text-warm-white/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] tracking-wide">
            © {new Date().getFullYear()} Grand Golden Wedding Lawn. All Rights Reserved. Crafted for Timeless Memories.
          </p>
          
          <a
            href="#hero"
            onClick={handleScrollToTop}
            className="flex items-center gap-1 font-body text-[10px] uppercase tracking-widest hover:text-gold-300 transition-colors"
          >
            Back to Top
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>

    </footer>
  );
}
