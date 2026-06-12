import { NextResponse } from "next/server";
import { getBookingById, updateBookingStatus } from "../../../lib/db";
import { sendCustomerDelayEmail } from "../../../lib/brevo";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    if (!id || !token) {
      return NextResponse.redirect(new URL("/booking/success?status=INVALID_PARAMS", request.url));
    }

    const booking = getBookingById(id);
    if (!booking) {
      return NextResponse.redirect(new URL("/booking/success?status=NOT_FOUND", request.url));
    }

    // Attempt to update the status to UNDER_REVIEW
    const result = updateBookingStatus(id, "UNDER_REVIEW", token);

    if (result.error) {
      if (result.error === "INVALID_TOKEN") {
        return NextResponse.redirect(new URL("/booking/success?status=INVALID_TOKEN", request.url));
      }
      if (result.error === "ALREADY_PROCESSED") {
        return NextResponse.redirect(
          new URL(`/booking/success?status=ALREADY_PROCESSED&prevStatus=${result.status}`, request.url)
        );
      }
      return NextResponse.redirect(new URL(`/booking/success?status=ERROR&msg=${result.error}`, request.url));
    }

    // Send the delay/under-review email to the customer
    const emailResult = await sendCustomerDelayEmail(result.booking);
    if (!emailResult.success) {
      console.warn("Failed to send customer review notification email:", emailResult.error);
    }

    return NextResponse.redirect(
      new URL(`/booking/success?status=UNDER_REVIEW&name=${encodeURIComponent(result.booking.customerName)}&date=${encodeURIComponent(result.booking.eventDate)}&type=${encodeURIComponent(result.booking.eventType)}&guests=${result.booking.guestCount}&email=${encodeURIComponent(result.booking.email)}&phone=${encodeURIComponent(result.booking.phone || "")}&notes=${encodeURIComponent(result.booking.notes || "")}`, request.url)
    );
  } catch (error) {
    console.error("Error delaying booking:", error);
    return NextResponse.redirect(new URL("/booking/success?status=ERROR&msg=server_error", request.url));
  }
}
