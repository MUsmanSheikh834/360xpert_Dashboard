import { NextResponse } from "next/server";

const pieData = [
  { name: "Confirmed", value: 50, color: "#22c55e" },
  { name: "Pending", value: 10, color: "#eab308" },
  { name: "Published", value: 20, color: "#1e3a5f" },
  { name: "Cancelled", value: 20, color: "#d1d5db" },
];

export async function GET() {
  return NextResponse.json({
    data: pieData,
    total: pieData.reduce((sum, item) => sum + item.value, 0),
  });
}
