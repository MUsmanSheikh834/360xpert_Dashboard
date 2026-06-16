import { NextRequest, NextResponse } from "next/server";
import { FlightBooking } from "@/app/[locale]/(flight)/flightbooking/type";

const tableData: FlightBooking[] = Array.from({ length: 9 }, (_, i) => ({
  name: "Taha Khan",
  manually: i % 3 === 0,
  contactNo: "0324-234266",
  email: "taha@gmail.com",
  reservationNo: `RES-00${i + 1}`,
  flightNo: `TRA-30${i + 1}`,
  airportFrom: "KHI",
  airportTo: "DXB",
  departureDatetime: "19/10/2025 10:00",
  returnDate: "19/12/2025",
  class: ["Economy", "Business", "First Class"][i % 3],
  payment: ["Paid", "Partially paid", "Unpaid"][i % 3],
  status: ["Pending", "Confirmed", "Issued", "Cancelled"][i % 4],
}));

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    data: tableData,
    total: tableData.length,
    page: 1,
    pages: 1,
    count: tableData.length,
    pending: tableData.filter((b) => b.status === "Pending").length,
    pendingBadge: +11.01,
    confirmed: tableData.filter((b) => b.status === "Confirmed").length,
    confirmedBadge: 6.08,
    manual: 14000,
    manualBadge: +15.03,
    cancelled: tableData.filter((b) => b.status === "Cancelled").length,
    cancelledBadge: -5.03,
  });
}

// ─── POST ─────────────────────────────────────────────────────────────────────

interface PostBody {
  leadPassenger: {
    salutation: string;
    name: string;
    phone: string;
    email: string;
    dob: string;
    postalCode: string;
    country: string;
  };
  additionalPassengers: {
    salutation: string;
    name: string;
    phone: string;
    email: string;
    dob: string;
    postalCode: string;
    country: string;
  }[];
  tripType: "one-way" | "round-trip" | "multi-city";
  tickets: {
    from: string;
    to: string;
    date: string;
    class: string;
  }[];
}

function generateReservationNo(): string {
  const id = tableData.length + 1;
  return `RES-${String(id).padStart(3, "0")}`;
}

function generateFlightNo(): string {
  const id = tableData.length + 1;
  return `TRA-${String(id).padStart(3, "0")}`;
}

function formatDatetime(isoDate: string): string {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y} 00:00`;
}

export async function POST(req: NextRequest) {
  try {
    const body: PostBody = await req.json();
    const { leadPassenger, tripType, tickets } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!leadPassenger?.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Lead passenger full name is required" },
        { status: 400 }
      );
    }
    if (!leadPassenger?.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Lead passenger email is required" },
        { status: 400 }
      );
    }
    if (!tickets?.length || !tickets[0]?.from?.trim() || !tickets[0]?.to?.trim()) {
      return NextResponse.json(
        { success: false, error: "At least one ticket with From and To is required" },
        { status: 400 }
      );
    }
    if (!tickets[0]?.class) {
      return NextResponse.json(
        { success: false, error: "Flight class is required" },
        { status: 400 }
      );
    }

    // ── Build FlightBooking record ───────────────────────────────────────────
    const newBooking: FlightBooking = {
      name: leadPassenger.name.trim(),
      manually: false,
      contactNo: leadPassenger.phone ?? "",
      email: leadPassenger.email.trim(),
      reservationNo: generateReservationNo(),
      flightNo: generateFlightNo(),
      airportFrom: tickets[0].from.trim().toUpperCase(),
      airportTo: tickets[0].to.trim().toUpperCase(),
      departureDatetime: formatDatetime(tickets[0].date),
      returnDate:
        tripType === "round-trip" && tickets[1]?.date
          ? formatDatetime(tickets[1].date)
          : tripType === "multi-city" && tickets[tickets.length - 1]?.date
            ? formatDatetime(tickets[tickets.length - 1].date)
            : "",
      class: tickets[0].class,
      payment: "Unpaid",
      status: "Pending",
    };

    tableData.push(newBooking);

    return NextResponse.json(
      { success: true, message: "Booking created successfully", data: newBooking },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}
