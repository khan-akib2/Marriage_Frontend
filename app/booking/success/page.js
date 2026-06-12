"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import {
  User,
  Calendar,
  Users,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Lock,
  Home,
  Copy,
  Send,
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

/* ──────────────────────────────────────
   ADMIN RESPONSE CONSOLE PAGE
   Light theme matching website aesthetic
   ────────────────────────────────────── */

// ── Generate template message based on status ──
function getTemplateMessage(status, name, type, date, guests) {
  switch (status) {
    case "CONFIRMED":
      return `Dear ${name || "Valued Client"},

We are pleased to confirm your booking for ${type || "your event"} at Grand Golden Wedding Lawn.

Your reservation for ${date || "the selected date"} has been officially approved for ${guests ? guests + " guests" : "your party"}. Our events coordination team has reviewed your specifications and is finalizing the premium arrangements.

We will contact you shortly to confirm venue setup details, catering preferences, décor customization, and the event day schedule.

If you have any urgent changes or additional specifications, please feel free to reply to this email or contact us directly.

Warm Regards,
Grand Golden Wedding Lawn Management`;

    case "UNDER_REVIEW":
      return `Dear ${name || "Valued Client"},

Thank you for your interest in hosting ${type || "your event"} at Grand Golden Wedding Lawn.

We are writing to inform you that your booking request for ${date || "the selected date"} is currently Under Review. Our scheduling and catering departments are checking detailed slot configurations and availability to accommodate your requirements for ${guests ? guests + " guests" : "your party"}.

No further action is required from you at this time. We will contact you with a final availability update within the next 24 to 48 hours.

Kind Regards,
Grand Golden Wedding Lawn Management`;

    case "REJECTED":
      return `Dear ${name || "Valued Client"},

Thank you for your interest in hosting ${type || "your event"} at Grand Golden Wedding Lawn.

We regret to inform you that we are unable to accommodate your booking request for the date of ${date || "the selected date"} due to scheduling conflicts or prior commitments on the venue.

If your dates are flexible or you wish to explore alternative arrangements, please do not hesitate to contact our booking office. We would be honored to assist you with alternative openings.

With Apologies,
Grand Golden Wedding Lawn Management`;

    default:
      return `Dear ${name || "Client"},

Your booking action has been processed. The current status is: ${status || "Unknown"}.

Thank you for choosing Grand Golden Wedding Lawn.`;
  }
}

function ConsoleContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "ERROR";
  const name = searchParams.get("name") || "";
  const date = searchParams.get("date") || "";
  const type = searchParams.get("type") || "";
  const guests = searchParams.get("guests") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const notes = searchParams.get("message") || searchParams.get("notes") || "";
  const prevStatus = searchParams.get("prevStatus") || "";
  const [hasConfettiFired, setHasConfettiFired] = useState(false);

  // Active tab tracking (visual only — action already processed)
  const activeStatus = ["CONFIRMED", "UNDER_REVIEW", "REJECTED"].includes(status) ? status : "CONFIRMED";

  // Editable message
  const [message, setMessage] = useState("");
  const textAreaRef = useRef(null);

  // Sending states
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [copied, setCopied] = useState("");

  // System time
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setMessage(getTemplateMessage(status, name, type, date, guests));
  }, [status, name, type, date, guests]);

  // Confetti for confirmed
  useEffect(() => {
    if (status === "CONFIRMED" && !hasConfettiFired) {
      setHasConfettiFired(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#C5A059", "#5B1C1C", "#FFFDF9", "#E6D8BF", "#8C6F32"],
      });
    }
  }, [status, hasConfettiFired]);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy to clipboard
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(""), 2000);
    } catch {}
  };

  // Dispatch email
  const handleSendEmail = async () => {
    if (!email) return;
    setEmailSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setEmailSending(false);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
  };

  // WhatsApp dispatch
  const handleWhatsApp = () => {
    const phoneNumber = phone?.replace(/\D/g, "") || "";
    const waMessage = encodeURIComponent(message);
    const waUrl = phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${waMessage}`
      : `https://wa.me/?text=${waMessage}`;
    window.open(waUrl, "_blank");
    setWhatsappOpened(true);
    setTimeout(() => setWhatsappOpened(false), 3000);
  };

  // Status-specific config
  const statusConfig = {
    CONFIRMED: {
      tabIcon: CheckCircle,
      tabLabel: "Confirm",
      badgeText: "CONFIRMED",
      badgeClass: "bg-green-50 text-green-700 border-green-200",
    },
    UNDER_REVIEW: {
      tabIcon: Clock,
      tabLabel: "Delayed",
      badgeText: "UNDER REVIEW",
      badgeClass: "bg-gold-50 text-gold-600 border-gold-200",
    },
    REJECTED: {
      tabIcon: XCircle,
      tabLabel: "Decline",
      badgeText: "DECLINED",
      badgeClass: "bg-red-50 text-red-600 border-red-200",
    },
  };

  const isErrorState = ["INVALID_TOKEN", "INVALID_PARAMS", "NOT_FOUND", "ERROR"].includes(status);
  const isLocked = status === "ALREADY_PROCESSED";
  const config = statusConfig[status] || statusConfig.CONFIRMED;

  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] flex flex-col select-none">

      {/* ─── TOP HEADER BAR ─── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-3.5 bg-[#FFFDF9]/90 backdrop-blur-xl border-b border-gold-300/15 shadow-sm">
        <div className="flex items-center gap-3.5">
          <a
            href="/"
            className="w-9 h-9 rounded-full border border-gold-300/25 bg-[#FAF8F2] flex items-center justify-center text-gold-500 hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div>
            <h1 className="font-display text-sm md:text-[15px] font-semibold tracking-[3px] text-maroon-600 leading-tight">
              GRAND GOLDEN
            </h1>
            <p className="font-body text-[8px] md:text-[9px] font-semibold tracking-[2px] text-gold-500 uppercase">
              BOOKING ADMIN RESPONSE CONSOLE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-gold-300/15 bg-[#FAF8F2]">
          <span className="w-[7px] h-[7px] rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.4)] inline-block" />
          <span className="font-body text-[9px] font-semibold tracking-[1.5px] text-gold-600 uppercase">
            System Online
          </span>
        </div>
      </header>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex flex-1 flex-col lg:flex-row gap-0 p-5 md:p-7 max-w-[1400px] mx-auto w-full">

        {/* ── LEFT PANEL: Client Request Details ── */}
        <div className="flex-shrink-0 w-full lg:w-[420px] lg:pr-7 mb-6 lg:mb-0">
          <p className="font-body text-[9px] font-bold tracking-[2px] text-gold-500 uppercase mb-1">
            Inquiry Profile
          </p>
          <h2 className="font-display text-lg font-medium text-maroon-600 tracking-wide mb-5">
            Client Request Details
          </h2>

          {/* Client Name */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Client Name
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {name || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Event Type */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Event Type
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {type || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Event Date */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Event Date
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {date || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <Users className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Guest Count
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {guests ? `${guests} Guests` : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Phone Number
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {phone || "—"}
                </div>
              </div>
              {phone && (
                <button
                  onClick={() => handleCopy(phone, "phone")}
                  className="p-1.5 rounded-lg hover:bg-[#FAF8F2] text-gold-500/40 hover:text-gold-500 transition-all cursor-pointer flex-shrink-0"
                  title="Copy phone"
                >
                  {copied === "phone" ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="group bg-[#FFFDF9] border border-gold-300/12 rounded-xl p-3.5 mb-2.5 hover:border-gold-300/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F2] border border-gold-300/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase">
                  Email Address
                </div>
                <div className="font-body text-sm font-medium text-maroon-700 truncate">
                  {email || "—"}
                </div>
              </div>
              {email && (
                <button
                  onClick={() => handleCopy(email, "email")}
                  className="p-1.5 rounded-lg hover:bg-[#FAF8F2] text-gold-500/40 hover:text-gold-500 transition-all cursor-pointer flex-shrink-0"
                  title="Copy email"
                >
                  {copied === "email" ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Client Notes */}
          {notes && (
            <>
              <p className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase mt-4 mb-1.5">
                Client&apos;s Original Specifications
              </p>
              <div className="bg-[#FAF8F2] border border-gold-300/12 rounded-xl p-3.5 font-body text-xs text-maroon-700 leading-relaxed">
                {notes}
              </div>
            </>
          )}

          {/* Exit Console Button */}
          <a
            href="/"
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-gold-300/15 bg-[#FFFDF9] hover:bg-[#FAF8F2] hover:border-gold-300/30 font-body text-[10px] font-semibold tracking-[2px] text-gold-600 uppercase transition-all duration-200 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            Exit Response Console
          </a>
        </div>

        {/* ── RIGHT PANEL: Notification Center ── */}
        <div className="flex-1 min-w-0 bg-[#FFFDF9] rounded-2xl border border-gold-300/12 p-6 md:p-7 flex flex-col shadow-sm">
          <p className="font-body text-[9px] font-bold tracking-[2px] text-gold-500 uppercase mb-1">
            Notification Center
          </p>
          <h2 className="font-display text-lg font-medium text-maroon-600 tracking-wide mb-5">
            Draft & Dispatch Message
          </h2>

          {/* ── Error / Lock State ── */}
          {(isErrorState || isLocked) && (
            <div className={`flex items-start gap-4 p-5 rounded-xl border mb-5 ${
              isLocked 
                ? "bg-gold-50/50 border-gold-200" 
                : "bg-red-50/50 border-red-200"
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isLocked ? "bg-gold-100 text-gold-600" : "bg-red-100 text-red-500"
              }`}>
                {isLocked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className={`font-display text-base font-medium mb-1 ${
                  isLocked ? "text-gold-600" : "text-red-600"
                }`}>
                  {isLocked
                    ? "Already Processed"
                    : status === "NOT_FOUND"
                    ? "Booking Not Found"
                    : status === "INVALID_TOKEN" || status === "INVALID_PARAMS"
                    ? "Verification Failed"
                    : "An Error Occurred"}
                </h3>
                <p className="font-body text-xs text-[#5A5A5A] leading-relaxed">
                  {isLocked
                    ? `This booking has already been finalized as "${prevStatus}". Security protocols prevent modifying a completed action.`
                    : status === "NOT_FOUND"
                    ? "The booking reference could not be located in our database records."
                    : status === "INVALID_TOKEN" || status === "INVALID_PARAMS"
                    ? "The secure action token is invalid or expired."
                    : "An unexpected error occurred while processing this action."}
                </p>
              </div>
            </div>
          )}

          {/* ── Action Status Tabs ── */}
          {!isErrorState && !isLocked && (
            <>
              <p className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase mb-2.5">
                Select Action Status
              </p>
              <div className="flex border-b border-gold-300/12 mb-5">
                {["CONFIRMED", "UNDER_REVIEW", "REJECTED"].map((s) => {
                  const cfg = statusConfig[s];
                  const isActive = activeStatus === s;
                  const TabIcon = cfg.tabIcon;
                  return (
                    <div
                      key={s}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all duration-200 ${
                        isActive
                          ? "border-maroon-500 bg-maroon-50/30 opacity-100"
                          : "border-transparent opacity-35"
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5 text-maroon-600" />
                      <span className="font-body text-[10px] font-semibold tracking-[1.5px] text-maroon-600 uppercase">
                        {cfg.tabLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ── Status Badge ── */}
              <div className="flex justify-center mb-5">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[1.5px] border uppercase ${config.badgeClass}`}>
                  {config.badgeText}
                </span>
              </div>

              {/* ── Text Writing Area ── */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-[8px] font-bold tracking-[1px] text-gold-600/50 uppercase">
                  Text Writing Area (Personalized Client Message)
                </span>
                <span className="font-body text-[8px] font-bold tracking-[1px] text-gold-500 uppercase">
                  Live Template Auto-Fill
                </span>
              </div>
              <textarea
                ref={textAreaRef}
                className="w-full min-h-[200px] p-4 rounded-xl border border-gold-300/15 bg-[#FAF8F2] font-body text-xs text-maroon-700 leading-[1.7] resize-vertical outline-none focus:border-maroon-500/30 focus:ring-1 focus:ring-maroon-500/10 hover:border-gold-300/30 transition-all duration-200 mb-5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
              />
            </>
          )}

          {/* ── Dispatch Channels ── */}
          {!isErrorState && !isLocked && (
            <>
              <p className="font-body text-[8px] font-bold tracking-[1.5px] text-gold-600/50 uppercase mb-2.5">
                Dispatch Channels
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <button
                  onClick={handleSendEmail}
                  disabled={emailSending || !email}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-body text-[10px] font-bold tracking-[1.2px] uppercase transition-all duration-200 cursor-pointer border ${
                    emailSent
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gradient-to-r from-maroon-600 to-maroon-700 text-[#FFFDF9] border-maroon-700 hover:from-maroon-500 hover:to-maroon-600 hover:shadow-md hover:shadow-maroon-600/15 active:scale-[0.98]"
                  } ${!email ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {emailSending
                    ? "Sending..."
                    : emailSent
                    ? "Email Sent"
                    : "Send Professional Email"}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-body text-[10px] font-bold tracking-[1.2px] uppercase transition-all duration-200 cursor-pointer border ${
                    whatsappOpened
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-maroon-600 border-gold-300/25 hover:bg-[#FAF8F2] hover:border-gold-300/40 hover:shadow-sm active:scale-[0.98]"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {whatsappOpened ? "WhatsApp Opened" : "Send via WhatsApp"}
                </button>
              </div>
            </>
          )}

          {/* ── Timestamp ── */}
          <div className="flex items-center justify-between pt-4 border-t border-gold-300/10 mt-auto">
            <span className="font-body text-[8px] font-bold tracking-[1px] text-gold-600/30 uppercase">
              Console Time (IST)
            </span>
            <span className="font-body text-[11px] font-medium text-gold-600/50 tracking-wider tabular-nums">
              {currentTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9]">
          <div className="w-10 h-10 rounded-full border-2 border-gold-300/20 border-t-gold-500 animate-spin mb-4" />
          <p className="font-body text-[10px] font-semibold tracking-[3px] text-gold-500 uppercase">
            Initializing Response Console...
          </p>
        </div>
      }
    >
      <ConsoleContent />
    </Suspense>
  );
}
