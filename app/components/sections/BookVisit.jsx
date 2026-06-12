"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, Calendar, Users, MessageSquare, ChevronDown, CheckCircle, ArrowRight, AlertTriangle, User, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BookVisit() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    guestCount: "",
    eventDate: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".book-animate",
      { opacity: 0, y: 35 },
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

  const eventOptions = [
    "Wedding",
    "Engagement",
    "Mehendi",
    "Sangeet",
    "Reception",
    "Birthday Celebration",
    "Corporate Event",
    "Family Gathering",
    "Other",
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (opt) => {
    setFormData((prev) => ({ ...prev, eventType: opt }));
    setIsDropdownOpen(false);
    if (errors.eventType) {
      setErrors((prev) => ({ ...prev, eventType: "" }));
    }
  };

  const handleDropdownKeyDown = (e) => {
    if (!isDropdownOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setIsDropdownOpen(true);
        const currentIdx = eventOptions.indexOf(formData.eventType);
        setFocusedIndex(currentIdx >= 0 ? currentIdx : 0);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsDropdownOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % eventOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + eventOptions.length) % eventOptions.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < eventOptions.length) {
        handleSelectOption(eventOptions[focusedIndex]);
      }
    } else if (e.key === "Tab") {
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Hydration-safe date limits: set via useEffect to avoid SSR/CSR mismatch
  const [dateLimits, setDateLimits] = useState({ min: "", max: "" });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minString = `${year}-${month}-${day}`;

    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 5); // 5 years future limit
    const maxY = maxDate.getFullYear();
    const maxM = String(maxDate.getMonth() + 1).padStart(2, "0");
    const maxD = String(maxDate.getDate()).padStart(2, "0");
    const maxString = `${maxY}-${maxM}-${maxD}`;

    setDateLimits({ min: minString, max: maxString });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    
    const phoneRegex = /^[0-9+-\s]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.guestCount) {
      newErrors.guestCount = "Please enter guest count";
    } else if (parseInt(formData.guestCount, 10) <= 0) {
      newErrors.guestCount = "Guest count must be positive";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Please choose a preferred date";
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxFutureDate = new Date();
      maxFutureDate.setFullYear(today.getFullYear() + 5);
      maxFutureDate.setHours(23, 59, 59, 999);

      if (isNaN(selectedDate.getTime())) {
        newErrors.eventDate = "The selected date is invalid";
      } else if (selectedDate < today) {
        newErrors.eventDate = "Preferred date cannot be in the past";
      } else if (selectedDate > maxFutureDate) {
        newErrors.eventDate = "Please select a date within the next 5 years";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount,
          notes: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#C5A059", "#5B1C1C", "#FAFAF9", "#E6D8BF", "#8C6F32"],
        });
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Failed to connect to the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="booking"
      className="py-16 md:py-24 bg-[#FAFAF9] relative overflow-hidden select-none"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-100/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-maroon-100/5 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 book-animate">
            <div className="flex items-center gap-2 text-maroon-600 mb-4">
              <Calendar className="w-5 h-5 text-gold-400" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-semibold">
                Reservations
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-maroon-600 leading-tight">
              Begin Your <br />
              <span className="font-sub italic text-gold-500 font-medium">Timeless Story</span>
            </h2>
            
            <p className="font-body text-xs sm:text-sm text-[#5A5A5A] leading-relaxed mt-6 max-w-sm">
              Spaces fill quickly for premium wedding seasons. Fill out the inquiry form, and our events consultant will contact you within 24 hours to schedule a private tour.
            </p>

            <div className="w-20 h-[1px] bg-gold-400/40 mt-8 mb-8" />

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-white border border-gold-300/20 flex items-center justify-center text-gold-500 shadow-sm group-hover:bg-maroon-600 group-hover:text-warm-white transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider">
                    Booking Desk
                  </h4>
                  <p className="font-body text-sm text-maroon-600 font-medium mt-0.5">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-white border border-gold-300/20 flex items-center justify-center text-gold-500 shadow-sm group-hover:bg-green-600 group-hover:text-warm-white transition-colors duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider">
                    WhatsApp Assist
                  </h4>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-green-700 font-semibold hover:underline mt-0.5 block"
                  >
                    Quick Chat Available
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form (Redesigned into a Luxury Invitation style) */}
          <div className="lg:col-span-7 book-animate">
            <div className="p-1 px-1.5 bg-gradient-to-b from-gold-300/40 via-gold-200/10 to-gold-400/40 rounded-[32px] shadow-2xl shadow-maroon-900/5">
              <div className="p-8 md:p-10 bg-[#FFFDF9] border border-gold-300/10 rounded-[28px] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                
                {/* Ornate inner frame overlay */}
                <div className="absolute inset-3 border border-gold-300/10 rounded-[22px] pointer-events-none z-0" />
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    
                    {/* Header Crest */}
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-full border border-gold-300/40 flex items-center justify-center mx-auto mb-3 relative bg-warm-white">
                        <span className="font-display text-lg font-light text-gold-500">G</span>
                        <div className="absolute inset-[-4px] border border-dashed border-gold-400/20 rounded-full" />
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-light text-maroon-600 tracking-wide">
                        Reserve Your Date
                      </h3>
                      <p className="font-sub text-[10px] text-gold-500 uppercase tracking-widest mt-1">
                        Luxury Wedding Venue Registration
                      </p>
                    </div>
                    
                    {/* Customer Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Name Input */}
                      <div className="relative">
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Your Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Rahul Sharma"
                            className={`w-full pl-9 pr-4 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 placeholder-gold-600/30 focus:outline-none focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              errors.name ? "border-red-400" : "border-gold-300/20"
                            }`}
                          />
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500/60 pointer-events-none" />
                        </div>
                        {errors.name && (
                          <span className="text-[9px] text-red-500 mt-1 block pl-1">{errors.name}</span>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div className="relative">
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Contact Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 99999 88888"
                            className={`w-full pl-9 pr-4 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 placeholder-gold-600/30 focus:outline-none focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              errors.phone ? "border-red-400" : "border-gold-300/20"
                            }`}
                          />
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500/60 pointer-events-none" />
                        </div>
                        {errors.phone && (
                          <span className="text-[9px] text-red-500 mt-1 block pl-1">{errors.phone}</span>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="rahul@example.com"
                            className={`w-full pl-9 pr-4 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 placeholder-gold-600/30 focus:outline-none focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              errors.email ? "border-red-400" : "border-gold-300/20"
                            }`}
                          />
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500/60 pointer-events-none" />
                        </div>
                        {errors.email && (
                          <span className="text-[9px] text-red-500 mt-1 block pl-1">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Booking Logistics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Event Type Select */}
                      <div className="relative" ref={dropdownRef}>
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Event Type
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onKeyDown={handleDropdownKeyDown}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                            className={`w-full text-left pl-9 pr-8 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              isDropdownOpen ? "border-maroon-500 ring-1 ring-maroon-500/20" : "border-gold-300/20"
                            }`}
                          >
                            {formData.eventType}
                          </button>
                          <ChevronDown className={`absolute right-4 top-3.5 w-4 h-4 text-gold-500 pointer-events-none transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                          <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500/60 pointer-events-none" />
                          
                          {isDropdownOpen && (
                            <div 
                              role="listbox"
                              data-lenis-prevent
                              className="absolute z-50 mt-1.5 left-0 right-0 max-h-60 overflow-y-auto bg-[#FFFDF9] border border-gold-300/35 rounded-xl shadow-xl py-1 animate-[slideDown_0.2s_ease-out]"
                            >
                              {eventOptions.map((opt, index) => {
                                const isSelected = formData.eventType === opt;
                                const isFocused = focusedIndex === index;
                                return (
                                  <div
                                    key={opt}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelectOption(opt)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    className={`w-full text-left pl-9 pr-4 py-2.5 font-body text-xs transition-colors duration-150 cursor-pointer ${
                                      isSelected
                                        ? "bg-maroon-500 text-white font-medium"
                                        : isFocused
                                        ? "bg-gold-50 text-gold-700"
                                        : "text-maroon-700"
                                    }`}
                                  >
                                    {opt}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Guest Count */}
                      <div className="relative">
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Guest Count
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleInputChange}
                            placeholder="e.g. 500"
                            className={`w-full pl-9 pr-4 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 placeholder-gold-600/30 focus:outline-none focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              errors.guestCount ? "border-red-400" : "border-gold-300/20"
                            }`}
                          />
                          <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-400" />
                        </div>
                        {errors.guestCount && (
                          <span className="text-[9px] text-red-500 mt-1 block pl-1">{errors.guestCount}</span>
                        )}
                      </div>

                      {/* Event Date (Strict Date Picker Constraints) */}
                      <div className="relative">
                        <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="eventDate"
                            min={dateLimits.min}
                            max={dateLimits.max}
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className={`w-full pl-9 pr-4 py-3 bg-[#FAF8F2] border rounded-xl font-body text-xs text-maroon-700 cursor-pointer focus:outline-none focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500/20 hover:border-gold-300 transition-all duration-300 ${
                              errors.eventDate ? "border-red-400" : "border-gold-300/20"
                            }`}
                          />
                          <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500/60 pointer-events-none" />
                        </div>
                        {errors.eventDate && (
                          <span className="text-[9px] text-red-500 mt-1 block pl-1">{errors.eventDate}</span>
                        )}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="relative">
                      <label className="block font-body text-[9px] uppercase tracking-widest text-gold-600 mb-1.5 font-bold">
                        Special Requests or Decor Mandates
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detail any requirements such as horizontal stage spaces, dining pavilions, mandaps, or valet requests..."
                        className="w-full px-4 py-3 bg-[#FAF8F2] border border-gold-300/20 rounded-xl font-body text-xs text-maroon-700 placeholder-gold-600/35 focus:outline-none focus:border-maroon-500 hover:border-gold-300 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Error Display */}
                    {submitError && (
                      <div className="p-4 bg-red-50/80 border border-red-200/50 text-red-700 rounded-xl font-body text-xs flex items-center gap-2 animate-[shake_0.5s_ease-in-out]">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 font-body text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-maroon-600 to-maroon-700 hover:from-maroon-500 hover:to-maroon-600 disabled:from-maroon-800 disabled:to-maroon-900 text-warm-white py-4 rounded-xl border border-gold-300/30 transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:shadow-maroon-600/20 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-gold-300 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Request Reservation
                          <ArrowRight className="w-4 h-4 text-gold-300" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Success Screen */
                  <div className="text-center py-8 flex flex-col items-center justify-center animate-[zoomIn_0.3s_ease-out] relative z-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6 border border-green-200 shadow-sm animate-bounce">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-display text-2xl md:text-3xl font-light text-maroon-600 mb-4">
                      Request Registered
                    </h3>
                    
                    <p className="font-body text-xs md:text-sm text-[#5A5A5A] max-w-sm leading-relaxed mb-8">
                      Thank you, <strong className="text-maroon-600">{formData.name}</strong>. Your luxury wedding inquiry for a <span className="font-semibold text-gold-600">{formData.eventType}</span> has been saved. Our events coordinator will contact you shortly.
                    </p>

                    <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                      <a
                        href={`https://wa.me/919876543210?text=Hi%2C%20I%20just%20submitted%20a%20booking%20request%20for%20a%20${formData.eventType}%20on%20${formData.eventDate}%20for%20${formData.guestCount}%20guests.%20My%20name%20is%20${formData.name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 py-4 rounded-xl border border-green-200 hover:bg-green-100 transition-colors shadow-sm"
                      >
                        Fast-Track via WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            eventType: "Wedding",
                            guestCount: "",
                            eventDate: "",
                            message: "",
                          });
                          setSubmitted(false);
                        }}
                        className="flex-1 font-body text-xs font-semibold uppercase tracking-widest border border-gold-300/30 text-maroon-600 py-4 rounded-xl hover:bg-ivory transition-colors shadow-sm"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
