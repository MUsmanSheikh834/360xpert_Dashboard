import { NextResponse } from "next/server";

const chartData = [
  { month: "Jan", flights: 6000, hotels: 12000 },
  { month: "Feb", flights: 5000, hotels: 25000 },
  { month: "Mar", flights: 6000, hotels: 17000 },
  { month: "Apr", flights: 5000, hotels: 30000 },
  { month: "May", flights: 5000, hotels: 7000 },
  { month: "Jun", flights: 5000, hotels: 18000 },
];

export async function GET() {
  return NextResponse.json({
    data: chartData,
    total: chartData.length,
  });
}
