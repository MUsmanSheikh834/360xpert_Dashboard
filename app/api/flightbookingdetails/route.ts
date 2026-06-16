import { NextResponse } from "next/server";

const flightBookingDetail = {
  status: "Completed",
  paymentStatus: "Paid",
  entryMethod: "Manually",

  // Image 1 — ticket card
  ticket: {
    from: "Karachi",
    fromCode: "KHI",
    to: "Dubai",
    toCode: "DXB",
    class: "Economy",
    flights: [
      {
        airline: "Turkish Airlines",
        airlineLogo: "/images/turkishlogo.png",
        departureCode: "KHI",
        departureTime: "06:00 PM",
        departureAirline: "Turkish Airline",
        stops: 2,
        stopRoute: "KHI - TRK",
        duration: "38 Hours 0 Mins",
        durationRoute: "KHI - DMM",
        arrivalCode: "DXB",
        arrivalTime: "06:00 PM",
        arrivalAirline: "Turkish Airline",
        pnr: "QWEASKJFJTF4",
        baggage: "36X48 - 30 KG",
      },
      {
        airline: "Turkish Airlines",
        airlineLogo: "/images/turkishlogo.png",
        departureCode: "DXB",
        departureTime: "06:00 PM",
        departureAirline: "Turkish Airline",
        stops: 2,
        stopRoute: "KHI - TRK",
        duration: "38 Hours 0 Mins",
        durationRoute: "KHI - DMM",
        arrivalCode: "KHI",
        arrivalTime: "06:00 PM",
        arrivalAirline: "Turkish Airline",
        pnr: "QWEASKJFJTF4",
        baggage: "36X48 - 30 KG",
      },
    ],
  },

  // Image 2 — client info
  leadPassenger: {
    name: "Taha Khan",
    email: "taha@gmail.com",
    phoneNumber: "03232354356",
    dateOfBirth: "8/10/2003",
    address: "B121, Block 2, Gulshan e Iqbal, Karachi, 7400",
    country: "Pakistan",
    passengerType: "Adult",
  },
  passengers: [
    {
      id: 1,
      name: "Huzaifa Khan",
      email: "taha@gmail.com",
      phoneNumber: "0312-35435346",
      dateOfBirth: "8/10/2003",
      contactNumber: "032354357789",
      country: "Pakistan",
      passengerType: "Adult",
    },
    {
      id: 2,
      name: "Huzaifa Khan",
      email: "taha@gmail.com",
      phoneNumber: "0312-35435346",
      dateOfBirth: "8/10/2003",
      contactNumber: "032354357789",
      country: "Pakistan",
      passengerType: "Adult",
    },
    {
      id: 3,
      name: "Huzaifa Khan",
      email: "taha@gmail.com",
      phoneNumber: "0312-35435346",
      dateOfBirth: "8/10/2003",
      contactNumber: "032354357789",
      country: "Pakistan",
      passengerType: "Adult",
    },
  ],

  // Image 3 — payment info
  paymentInfo: {
    name: "Taha Khan",
    date: "9/17/2025",
    transactionId: "342345430459",
    totalPayment: 750000,
  },
  paymentSummary: {
    payment: 750000,
    subtotal: 750000,
    discount: -40000,
    taxes: 20000,
    received: 750000,
  },
};

export async function GET() {
  return NextResponse.json(flightBookingDetail);
}
