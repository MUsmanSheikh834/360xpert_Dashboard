import { NextResponse } from "next/server";
import { RecentBooking } from "@/app/[locale]/dashboard/types";

const tableData: RecentBooking[] = [
  {
    name: "Taha Khan",
    contactNo: "0324-342356",
    email: "taha@gmail.com",
    code: "LHR-312",
    airportFrom: "Karachi",
    airportTo: "London",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Pending",
  },
  {
    name: "Usman Ali",
    contactNo: "0324-342356",
    email: "usman@gmail.com",
    code: "PK-312",
    airportFrom: "Lahore",
    airportTo: "USA",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Confirmed",
  },
  {
    name: "Ahmad Raza",
    contactNo: "0324-342356",
    email: "raza@gmail.com",
    code: "CDG-312",
    airportFrom: "Karachi",
    airportTo: "Germany",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Confirmed",
  },
  {
    name: "Abdullah",
    contactNo: "0324-342356",
    email: "Abdullah@gmail.com",
    code: "FRA-312",
    airportFrom: "Karachi",
    airportTo: "France",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Published",
  },
  {
    name: "Rizwan Ahmed",
    contactNo: "0324-342356",
    email: "Rizwan@gmail.com",
    code: "NYC-312",
    airportFrom: "Karachi",
    airportTo: "Canada",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Published",
  },
  {
    name: "M.Shafique",
    contactNo: "0324-342356",
    email: "Shafique@gmail.com",
    code: "NYC-312",
    airportFrom: "Karachi",
    airportTo: "Yemen",
    departure: "9:00 AM",
    arrival: "10:00 PM",
    status: "Published",
  },
];

export async function GET() {
  return NextResponse.json({
    data: tableData,
    total: tableData.length,
    page: 1,
    pages: 1,
    count: tableData.length,
  });
}
