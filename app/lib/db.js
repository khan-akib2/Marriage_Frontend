import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "bookings.json");

// Ensure the local JSON database file exists
function ensureDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2), "utf8");
  }
}

export function getBookings() {
  ensureDb();
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading bookings database:", error);
    return [];
  }
}

export function saveBookings(bookings) {
  ensureDb();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(bookings, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to bookings database:", error);
  }
}

export function createBooking(bookingData) {
  const bookings = getBookings();
  const newBooking = {
    id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    status: "PENDING",
    createdAt: new Date().toISOString(),
    ...bookingData,
  };
  bookings.push(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export function getBookingById(id) {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id);
}

export function updateBookingStatus(id, status, token) {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) {
    return { error: "BOOKING_NOT_FOUND" };
  }

  const booking = bookings[index];
  if (booking.actionToken !== token) {
    return { error: "INVALID_TOKEN" };
  }

  // Prevent duplicate final actions (CONFIRMED or REJECTED)
  if (booking.status === "CONFIRMED" || booking.status === "REJECTED") {
    return { error: "ALREADY_PROCESSED", status: booking.status };
  }

  booking.status = status;
  bookings[index] = booking;
  saveBookings(bookings);
  return { booking };
}
