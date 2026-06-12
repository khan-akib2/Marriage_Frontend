"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Grid } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-grid-item",
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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

  const photos = [
    { src: "/images/hero-bg.png", aspect: "col-span-1 row-span-1 lg:h-[300px]", caption: "Dusk Wedding Canopy Setup", category: "Lawn" },
    { src: "/images/showcase-dining.png", aspect: "col-span-1 row-span-2 lg:h-[620px]", caption: "Champagne Glassware Setup", category: "Dining" },
    { src: "/images/story-couple.png", aspect: "col-span-1 row-span-1 lg:h-[300px]", caption: "Couple Aisle Walk Sparklers", category: "Ceremony" },
    { src: "/images/showcase-stage.png", aspect: "col-span-1 row-span-2 lg:h-[620px]", caption: "Royal Backdrop Floral Stage", category: "Stage" },
    { src: "/images/showcase-dining.png", aspect: "col-span-1 row-span-1 lg:h-[300px]", caption: "Bespoke Glass Lamp Details", category: "Decor" },
    { src: "/images/hero-bg.png", aspect: "col-span-1 row-span-1 lg:h-[300px]", caption: "Main Gate Welcome Archway", category: "Entrance" },
  ];

  const openLightbox = (index) => {
    setSelectedIdx(index);
    document.body.classList.add("overflow-hidden");
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.classList.remove("overflow-hidden");
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-16 md:py-24 bg-[#FAFAF9] relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-maroon-600 mb-4">
              <Grid className="w-4 h-4 text-gold-400" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                Visual Library
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
              Captured Moments <br />
              <span className="font-sub italic text-gold-500 font-medium">of Perfection</span>
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#6A6A6A] leading-relaxed max-w-sm">
            Click on any panel to launch a high-resolution viewer. Explore decoration finishes, table settings, and landscaping.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className={`gallery-grid-item group relative rounded-3xl overflow-hidden cursor-pointer bg-maroon-700 shadow-md hover:shadow-2xl shadow-maroon-700/5 transition-all duration-300 h-[280px] ${photo.aspect}`}
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                loading="lazy"
              />
              
              {/* Translucent overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 group-hover:from-maroon-700/80 transition-all duration-300" />

              {/* Gold borders */}
              <div className="absolute inset-3 border border-gold-300/10 group-hover:border-gold-300/40 rounded-2xl pointer-events-none transition-colors duration-500" />

              {/* Eye icon floating in top right */}
              <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-warm-white/10 backdrop-blur-sm border border-gold-300/20 flex items-center justify-center text-warm-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-gold-400 hover:text-maroon-700">
                <Eye className="w-4 h-4" />
              </div>

              {/* Text bottom left */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-body text-[9px] uppercase tracking-widest text-gold-300 font-bold block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-display text-base sm:text-lg font-light text-warm-white tracking-wide">
                  {photo.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center px-4"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-warm-white hover:text-gold-300 p-2 focus:outline-none z-10"
            aria-label="Close viewer"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 text-warm-white hover:text-gold-300 p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full focus:outline-none z-10 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Current Image inside frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[75vh] rounded-2xl overflow-hidden border border-gold-300/20 shadow-2xl flex flex-col items-center justify-center animate-[zoomIn_0.3s_ease-out]"
          >
            <img
              src={photos[selectedIdx].src}
              alt={photos[selectedIdx].caption}
              className="max-w-full max-h-[75vh] object-contain select-none pointer-events-none"
            />
            {/* Visual bottom banner */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-warm-white">
              <div>
                <span className="font-body text-[10px] uppercase tracking-widest text-gold-400 font-bold">
                  {photos[selectedIdx].category}
                </span>
                <p className="font-display text-sm sm:text-lg font-light mt-0.5">
                  {photos[selectedIdx].caption}
                </p>
              </div>
              <span className="font-body text-[10px] sm:text-xs text-gold-300/60 font-semibold uppercase tracking-widest">
                {selectedIdx + 1} / {photos.length}
              </span>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 text-warm-white hover:text-gold-300 p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full focus:outline-none z-10 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
