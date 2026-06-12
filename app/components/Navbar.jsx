"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const drawerRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial state: hidden
    gsap.set(navRef.current, { y: -100, opacity: 0, pointerEvents: "none" });

    // ScrollTrigger tied to Hero curtains opening animation
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "+=120%", // Matches the pinning scroll height in Hero.jsx
      onUpdate: (self) => {
        if (self.progress > 0.15) {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            pointerEvents: "none",
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      },
    });

    // ScrollTrigger to handle navbar style changes on scroll without triggering React re-renders
    const borderTrigger = ScrollTrigger.create({
      start: "top -50px", // When page scrolls past 50px
      onToggle: (self) => {
        if (self.isActive) {
          navRef.current?.classList.add("py-4", "shadow-md");
          navRef.current?.classList.remove("py-6", "shadow-sm");
        } else {
          navRef.current?.classList.remove("py-4", "shadow-md");
          navRef.current?.classList.add("py-6", "shadow-sm");
        }
      },
    });

    return () => {
      trigger.kill();
      borderTrigger.kill();
    };
  }, []);

  // GSAP animation for mobile drawer items when opened
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: "power2.out", delay: 0.05 }
      );
    }
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(id);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.5 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#booking" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 glassmorphism border-b border-gold-300/10 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Monogram / Brand logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border border-gold-300 flex items-center justify-center relative transition-transform duration-500 group-hover:rotate-180">
            <span className="font-display text-sm font-semibold text-gold-400">G</span>
            <div className="absolute inset-[-2px] border border-dashed border-gold-400/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm min-[360px]:text-base tracking-[0.2em] font-medium text-maroon-600 uppercase">
              Grand Golden
            </span>
            <span className="font-sub text-[9px] min-[360px]:text-[10px] tracking-[0.1em] text-gold-500 uppercase italic">
              Wedding Lawn
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-xs uppercase tracking-widest text-[#4A4A4A] hover:text-maroon-600 transition-colors duration-300 relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://wa.me/919876543210?text=I%27m%20interested%20in%20booking%20the%20Grand%20Golden%20Wedding%20Lawn%20for%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-4 py-2.5 rounded-full border border-green-200/50 hover:bg-green-100 hover:border-green-300 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            WhatsApp Inquiry
          </a>
          <a
            href="#booking"
            onClick={(e) => handleNavClick(e, "#booking")}
            className="font-body text-xs font-semibold uppercase tracking-widest bg-maroon-600 hover:bg-maroon-700 text-warm-white px-6 py-3 rounded-full border border-gold-300/30 transition-all duration-300 hover:shadow-lg shadow-maroon-600/10"
          >
            Book Venue
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="#booking"
            onClick={(e) => handleNavClick(e, "#booking")}
            className="sm:hidden font-body text-[10px] font-semibold uppercase tracking-widest bg-maroon-600 text-warm-white px-4 py-2.5 rounded-full border border-gold-300/30"
          >
            Book
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-maroon-600 hover:text-gold-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={drawerRef}
          className="lg:hidden fixed inset-0 top-[70px] glassmorphism z-40 border-t border-gold-300/10 flex flex-col justify-between py-12 px-8 transition-all duration-300 shadow-2xl"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                ref={(el) => (linksRef.current[idx] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-2xl font-light text-maroon-600 hover:text-gold-400 transition-colors py-2 block border-b border-gold-300/5 opacity-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center flex items-center justify-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-green-700 bg-green-50 py-4 rounded-full border border-green-200"
            >
              Contact on WhatsApp
            </a>
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, "#booking")}
              className="w-full text-center font-body text-sm font-semibold uppercase tracking-widest bg-maroon-600 text-warm-white py-4 rounded-full border border-gold-300/30"
            >
              Book Venue
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
