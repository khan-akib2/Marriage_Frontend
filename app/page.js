"use client";

import { useState } from "react";
import LuxuryLoader from "./components/LuxuryLoader";
import CustomCursor from "./components/CustomCursor";
import ScrollProvider from "./components/ScrollProvider";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Story from "./components/sections/Story";
import About from "./components/sections/About";
import Showcase from "./components/sections/Showcase";
import Events from "./components/sections/Events";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Experience from "./components/sections/Experience";
import Gallery from "./components/sections/Gallery";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import BookVisit from "./components/sections/BookVisit";
import Location from "./components/sections/Location";
import Footer from "./components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Luxury Cinematic Loader */}
      <LuxuryLoader onComplete={() => setIsLoading(false)} />

      {/* Main App Content - always mounted so GSAP ScrollTrigger calculates heights correctly */}
      <ScrollProvider>
        {/* Custom Golden Ring Floating Cursor Follower */}
        <CustomCursor />

        {/* Floating Glassmorphism Navbar */}
        <Navbar />

        <main className="relative min-h-screen w-full">
          {/* 1. Fullscreen Hero (Curtain Reveal) */}
          <Hero />

          {/* 2. Story of Celebrations (Pinned 5-Frame Narrative) */}
          <Story />

          {/* 3. About the Venue (Metrics & Cards) */}
          <About />

          {/* 4. Venue Showcase (Horizontal Scrolling Setups) */}
          <Showcase />

          {/* 5. Events We Host (Interactive Categories) */}
          <Events />

          {/* 6. Why Choose Us (Scroll Timeline Track) */}
          <WhyChooseUs />

          {/* 7. Venue Experience (Day progression Cards Stacking) */}
          <Experience />

          {/* 8. Gallery (Masonry Grid + Custom Lightbox) */}
          <Gallery />

          {/* 9. Testimonials (Infinite Glassmorphism Marquee) */}
          <Testimonials />

          {/* 10. FAQ Accordions (Capacity, Parking, Catering) */}
          <FAQ />

          {/* 11. Book a Visit Form (Validation, Confetti, WhatsApp Link) */}
          <BookVisit />

          {/* 12. Location Connectivity (Accessibility Landmarks & Maps) */}
          <Location />

          {/* 13. Final CTA & Footer */}
          <Footer />
        </main>
      </ScrollProvider>
    </>
  );
}
