import { NextResponse } from "next/server";

const hotelBookingDetail = {
  status: "Paid",
  entryMethod: "Manually",
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
  return NextResponse.json(hotelBookingDetail);
}
