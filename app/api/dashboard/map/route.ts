import { NextResponse } from "next/server";

const countriesData = [
  { id: "784", code: "UAE", name: "UAE", flag: "🇦🇪", percentage: 48, color: "#1D9E75" },
  { id: "124", code: "CAN", name: "Canada", flag: "🇨🇦", percentage: 27, color: "#378ADD" },
  { id: "586", code: "PAK", name: "Pakistan", flag: "🇵🇰", percentage: 18, color: "#D85A30" },
  { id: "826", code: "UK", name: "UK", flag: "🇬🇧", percentage: 7, color: "#D4537E" },
];

export async function GET() {
  return NextResponse.json({
    total: 10000,
    badge: 4,
    data: countriesData,
  });
}
