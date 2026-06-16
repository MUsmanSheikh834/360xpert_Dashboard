import { NextResponse } from "next/server";
import { HotelBooking } from "@/app/[locale]/(hotel)/hotelbooking/type";

const tableData: HotelBooking[] = Array.from({ length: 9 }, (_, i) => ({
  name: "Taha Khan",
  manually: i % 3 === 0,
  contactNo: "0324-234266",
  email: "taha@gmail.com",
  bookingId: `BK-0012${i + 1}`,
  roomNo: "AF-11",
  checkInDate: "19/10/2025",
  checkOutDate: "19/12/2025",
  nights: 10,
  paymentStatus: ["Paid", "Partially paid", "Unpaid"][i % 3],
  status: ["Ahead", "Done", "On-Going", "Pending"][i % 4],
}));

export async function GET() {
  return NextResponse.json({
    data: tableData,
    total: tableData.length,
    page: 1,
    pages: 1,
    count: tableData.length,
    totalbookings: 3781,
    totalbookingsbadge: 11.01,
    occupied: 1234,
    occupiedbadge: 6.08,
    checkin: 754,
    checkinbadge: 15.03,
    checkout: 480,
    checkoutbadge: 7.08,
  });
}
