import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hotelAndFlight: {
      flights: 3700,
      hotels: 3650,
      badge: 11.01,
    },
    activeFlightAndRooms: {
      activeFlights: 3650,
      occupiedRooms: 3650,
      badge: 6.08,
    },
    revenue: {
      total: 15040,
      badge: 15.03,
    },
    completed: {
      total: 316,
      badge: 6.08,
    },
  });
}
