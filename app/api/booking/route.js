import { NextResponse } from "next/server";
import { createBooking } from "../../lib/db";
import { sendAdminNotificationEmail } from "../../lib/brevo";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, eventType, eventDate, guestCount, notes } = body;

    // Server-side validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
    }
    if (!eventDate) {
      return NextResponse.json({ error: "Preferred event date is required" }, { status: 400 });
    }

    // Server-side date validation (cannot be in the past, limit to 5 years future)
    if (!eventDate || !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
      return NextResponse.json({ error: "The selected event date format is invalid" }, { status: 400 });
    }

    // Get current date/time in India (Asia/Kolkata)
    const nowInIndia = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const todayIndia = new Date(nowInIndia.getFullYear(), nowInIndia.getMonth(), nowInIndia.getDate(), 0, 0, 0, 0);

    // Parse the eventDate (e.g. "2026-06-12") in Asia/Kolkata context
    const [yearStr, monthStr, dayStr] = eventDate.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    
    const eventDateIndia = new Date(year, month - 1, day, 0, 0, 0, 0);

    if (isNaN(eventDateIndia.getTime())) {
      return NextResponse.json({ error: "The selected event date is invalid" }, { status: 400 });
    }
    
    if (eventDateIndia < todayIndia) {
      return NextResponse.json({ error: "The event date cannot be in the past" }, { status: 400 });
    }

    const maxFutureIndia = new Date(todayIndia);
    maxFutureIndia.setFullYear(todayIndia.getFullYear() + 5);

    if (eventDateIndia > maxFutureIndia) {
      return NextResponse.json({ error: "Please select a date within the next 5 years" }, { status: 400 });
    }

    if (!guestCount || parseInt(guestCount, 10) <= 0) {
      return NextResponse.json({ error: "A valid guest count is required" }, { status: 400 });
    }

    // Generate secure token for actions
    const actionToken = crypto.randomBytes(32).toString("hex");

    // Persist to database
    const booking = createBooking({
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      eventType: eventType || "Wedding",
      eventDate: eventDate,
      guestCount: parseInt(guestCount, 10),
      notes: notes ? notes.trim() : "",
      actionToken: actionToken,
    });

    // Determine the base URL dynamically from request
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    // Construct links for admin actions
    const confirmUrl = `${baseUrl}/api/booking/confirm?id=${booking.id}&token=${actionToken}`;
    const rejectUrl = `${baseUrl}/api/booking/reject?id=${booking.id}&token=${actionToken}`;
    const delayUrl = `${baseUrl}/api/booking/delay?id=${booking.id}&token=${actionToken}`;

    // Send admin notification email
    const emailResult = await sendAdminNotificationEmail(booking, confirmUrl, delayUrl, rejectUrl);
    
    if (!emailResult.success) {
      console.warn("Failed to send admin notification email, booking saved:", emailResult.error);
      // Still return success since the database record is saved successfully
      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        emailWarning: "Admin notification email delivery failed, but booking was successfully registered.",
      });
    }

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "An unexpected error occurred while saving your request." }, { status: 500 });
  }
}
